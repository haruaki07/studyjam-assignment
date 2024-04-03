import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Submission } from '$lib/supabase';

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) redirect(303, '/');

	try {
		// get the latest submissions
		const { data, error } = await supabase
			.from('submissions')
			.select('*')
			.eq('user_id', session.user.id)
			.order('attempt', { ascending: false })
			.limit(1);
		if (error) throw error;

		return { submission: data.length > 0 ? (data[0] as Submission) : null, user: session?.user! };
	} catch (e) {
		if (e instanceof Error) {
			console.error("failed to find user's submission: ", e);
		}

		error(500, { message: 'Terjadi kesalahan pada sisi server! Silahkan coba lagi.' });
	}
};
