import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { setFlash } from 'sveltekit-flash-message/server';

export const actions: Actions = {
    async default({ locals: { supabase }, cookies }) {
        await supabase.auth.signOut();
        setFlash({ type: "success", message: "Anda telah logout dari akun. Harap login kembali untuk melanjutkan" }, cookies);
        redirect(303, '/');
    }
};