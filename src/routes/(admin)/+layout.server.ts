import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { LayoutServerLoad } from './$types';
import { X_ADMIN_CREDENTIALS } from '$env/static/private';
import { error, fail } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies, locals, request, setHeaders }) => {
	const supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { cookies },
		options: { global: { headers: { 'X-Admin-Credentials': X_ADMIN_CREDENTIALS } } }
	});

	locals.supabase = supabase;

	const auth = request.headers.get('Authorization');

	if (auth !== `Basic ${btoa(':' + X_ADMIN_CREDENTIALS)}`) {
		setHeaders({
			'WWW-Authenticate': 'Basic realm="User Visible Realm", charset="UTF-8"'
		});
		error(401, 'Unauthorized');
	}

	return {};
};
