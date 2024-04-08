import { error } from '@sveltejs/kit';
import type { Actions } from './$types';
import { redirect } from 'sveltekit-flash-message/server';
import { SUPABASE_BUCKET_ID } from '$env/static/private';
import { SubmissionStatus } from '$lib/supabase';

export const actions: Actions = {
	default: async ({ request, cookies, locals: { supabase, safeGetSession } }) => {
		const { session } = await safeGetSession();
		if (!session) return redirect(303, '/');

		const formData = await request.formData();

		const file = formData.get('file') as File | null;
		const notes = formData.get('notes') as string | null;

		if (!file) return error(400, { message: 'Berkas submission harus diisi!' });
		if (file.size > 1000000)
			return error(400, { message: 'Berkas submission tidak boleh melebihi 1MB!' });
		if (file.type !== 'application/zip')
			return error(400, { message: 'Berkas submission harus dalam format ZIP!' });

		const user = session.user;
		const fileName = `${Date.now()}_submission_${user?.id}.zip`;

		const { data: submission } = await supabase
			.from('submissions')
			.select('user_id,status,attempt,created_at')
			.eq('user_id', user.id)
			.order('created_at', { ascending: false })
			.limit(1);
		if (submission && submission.length > 0) {
			if (submission[0].status === SubmissionStatus.Pending) {
				return error(400, {
					message: 'Anda masih memiliki berkas submission yang menunggu direview!'
				});
			} else if (submission[0].status === SubmissionStatus.Completed) {
				return error(400, {
					message:
						'Anda sudah pernah mengumpulkan berkas submission dan review sudah selesai! Anda tidak perlu melakukan submission lagi.'
				});
			}
		}

		try {
			const { data, error: err } = await supabase.storage
				.from(SUPABASE_BUCKET_ID)
				.upload(`submissions/${fileName}`, file, { upsert: true });
			if (err) throw err;

			const { error: err2 } = await supabase.from('submissions').insert({
				user_id: user?.id,
				notes,
				file_url: data.path,
				attempt: (submission?.[0].attempt ?? 0) + 1
			});

			if (err2) throw err2;
		} catch (e) {
			console.error('failed to save submission: ', e);
			return error(500, { message: 'Terjadi kesalahan pada sisi server! Silahkan coba lagi.' });
		}

		redirect(
			'/my',
			{ type: 'success', message: 'Submission Anda telah diupload! Mohon tunggu untuk direview.' },
			cookies
		);
	}
};
