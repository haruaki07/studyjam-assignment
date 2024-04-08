import { X_ADMIN_CREDENTIALS } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, locals, request, setHeaders }) => {
	const auth = request.headers.get('Authorization');

	if (auth !== `Basic ${btoa(':' + X_ADMIN_CREDENTIALS)}`) {
		setHeaders({
			'WWW-Authenticate': 'Basic realm="User Visible Realm", charset="UTF-8"'
		});
		error(401, 'Unauthorized');
	}

	return {};
};
