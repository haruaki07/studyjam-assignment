import { error } from '@sveltejs/kit';
import type { Actions } from './$types';
import { redirect } from 'sveltekit-flash-message/server';
import { SUPABASE_BUCKET_ID } from '$env/static/private';

export const actions: Actions = {
	default: async ({ request, cookies, locals: { supabase } }) => {
		const formData = await request.formData();

		const file = formData.get('file') as File | null;
		const notes = formData.get('notes') as string | null;

		if (!file) return error(400, { message: 'Berkas submission harus diisi!' });
		if (file.size > 1000000)
			return error(400, { message: 'Berkas submission tidak boleh melebihi 1MB!' });
		if (file.type !== 'application/zip')
			return error(400, { message: 'Berkas submission harus dalam format ZIP!' });

		const {
			data: { user }
		} = await supabase.auth.getUser();
		const fileName = `${Date.now()}_submission_${user?.id}.zip`;

		try {
			const { data, error: err } = await supabase.storage
				.from(SUPABASE_BUCKET_ID)
				.upload(`submissions/${fileName}`, file, { upsert: true });
			if (err) throw err;

			const { error: err2 } = await supabase.from('submissions').insert({
				user_id: user?.id,
				notes,
				file_url: data.path
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
