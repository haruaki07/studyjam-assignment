import { SUPABASE_BUCKET_ID } from '$env/static/private';
import { error, json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const file_url = url.searchParams.get('file_url')!;

	const { data, error: err } = await supabase.storage
		.from(SUPABASE_BUCKET_ID)
		.createSignedUrl(file_url, 60);

	if (!data) {
		return error(404);
	}

	redirect(301, data.signedUrl);
};
