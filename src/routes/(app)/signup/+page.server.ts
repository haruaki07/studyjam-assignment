import { signUpSchema } from '$lib/schemas/auth.js';
import { AuthApiError } from '@supabase/supabase-js';
import { fail } from '@sveltejs/kit';
import { redirect, setFlash } from 'sveltekit-flash-message/server';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';

export const actions: Actions = {
	async default({ request, locals: { supabase }, cookies }) {
		const form = await superValidate(request, zod(signUpSchema));

		if (!form.valid) {
			setFlash({ type: 'error', message: 'Gagal memproses! Input tidak valid.' }, cookies);
			return fail(400, { form });
		}

		{
			const { data, error } = await supabase.rpc('check_user_exists', {
				email: form.data.email,
				nim: form.data.nim
			});
			if (error) console.error(error);

			if (data) {
				setFlash({ type: 'error', message: `NIM atau alamat email sudah terdaftar!` }, cookies);
				return fail(400, { form });
			}
		}

		const { error } = await supabase.auth.signUp({
			email: form.data.email,
			password: form.data.password,
			options: { data: { name: form.data.name, nim: form.data.nim } }
		});

		if (error) {
			console.error(error);

			if (error instanceof AuthApiError && error.status === 400) {
				setFlash({ type: 'error', message: 'Invalid credentials!' }, cookies);
				return fail(400, { form });
			}

			setFlash(
				{ type: 'error', message: 'Terjadi kesalahan pada sisi server! Silahkan coba lagi.' },
				cookies
			);
			return fail(500, { form });
		}

		redirect('/', { type: 'success', message: 'Akun Anda telah berhasil didaftarkan!' }, cookies);
	}
};
