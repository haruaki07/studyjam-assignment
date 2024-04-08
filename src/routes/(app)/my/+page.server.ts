import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Review, Submission } from '$lib/supabase';
import { SUPABASE_BUCKET_ID } from '$env/static/private';

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
	const { session } = await safeGetSession();
	if (!session) redirect(303, '/');

	try {
		// get the latest submissions
		const { data, error } = await supabase
			.from('submissions')
			.select('*,reviews(*)')
			.eq('user_id', session.user.id)
			.order('attempt', { ascending: false })
			.maybeSingle();
		if (error) throw error;

		let fileUrl: string | undefined;
		if (data) {
			const { data: objData, error } = await supabase.storage
				.from(SUPABASE_BUCKET_ID)
				.createSignedUrl(data.file_url, 60);
			fileUrl = objData?.signedUrl;
			if (error) console.error(error);
		}

		return {
			submission: data as (Submission & { reviews: Review[] }) | null,
			fileUrl,
			user: session?.user!
		};
	} catch (e) {
		if (e instanceof Error) {
			console.error("failed to find user's submission: ", e);
		}

		error(500, { message: 'Terjadi kesalahan pada sisi server! Silahkan coba lagi.' });
	}
};
