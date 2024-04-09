import { SubmissionStatus } from '$lib/supabase';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { SUPABASE_BUCKET_ID } from '$env/static/private';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: submissions } = await supabase
		.from('submissions')
		.select(`id, attempt, status, profiles(id,nim,name), file_url, notes, created_at`)
		.eq('status', SubmissionStatus.Pending)
		.order('created_at', { ascending: true });

	type SubmissionsWithProfile = (Omit<NonNullable<typeof submissions>[0], 'profiles'> & {
		profiles: NonNullable<typeof submissions>[0]['profiles'][0];
	})[];

	return { submissions: (submissions ?? []) as unknown as SubmissionsWithProfile };
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const data = {
			submission_id: formData.get('submission_id') as string,
			checklist: formData.getAll('checklist') as string[],
			notes: formData.get('notes') as string,
			file: formData.get('file') as File,
			status: formData.get('status') as string,
			stars: formData.get('stars') ? +(formData.get('stars') as string) : undefined
		};

		try {
			let code_review_url = null;
			if (data.file.size > 0) {
				code_review_url = `/reviews/${Date.now()}_review_${data.submission_id}.zip`;
				const { error } = await supabase.storage
					.from(SUPABASE_BUCKET_ID)
					.upload(code_review_url, data.file);
				if (error) throw error;
			}

			await supabase
				.from('reviews')
				.insert({
					submission_id: data.submission_id,
					criteria_checklist: data.checklist,
					notes: data.notes,
					code_review_url
				})
				.throwOnError();

			await supabase
				.from('submissions')
				.update({
					status: data.status,
					updated_at: new Date(),
					...(data.status === SubmissionStatus.Completed ? { stars: data.stars } : {})
				})
				.eq('id', data.submission_id)
				.throwOnError();
		} catch (e) {
			if (e instanceof Error) {
				console.error('failed to review: ', e);
				return fail(500, { message: 'Internal Server Error: ' + e.message });
			}
		}

		return {};
	}
};
