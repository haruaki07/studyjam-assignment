import { SUPABASE_BUCKET_ID } from '$env/static/private';
import { SubmissionStatus, type Submission } from '$lib/supabase';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: submissions } = await supabase
		.from('submissions')
		.select(`id, attempt, status, profiles(id,nim,name), file_url, created_at`)
		.eq('status', SubmissionStatus.Pending)
		.order('created_at', { ascending: true });

	type SubmissionsWithProfile = (Omit<NonNullable<typeof submissions>[0], 'profiles'> & {
		profiles: NonNullable<typeof submissions>[0]['profiles'][0];
	})[];

	return { submissions: (submissions ?? []) as unknown as SubmissionsWithProfile };
};
