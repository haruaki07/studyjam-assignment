import { setFlash } from 'sveltekit-flash-message/server';
import type { Actions } from './$types';

export const actions: Actions = {
	async default({ locals: { supabase }, cookies }) {
		await supabase.auth.signOut();
		setFlash(
			{
				type: 'success',
				message: 'Anda telah logout dari akun. Harap login kembali untuk melanjutkan.'
			},
			cookies
		);
	}
};
