import { signInSchema } from "$lib/schemas/auth";
import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import { setFlash } from "sveltekit-flash-message/server";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions } from "./$types"

export const actions: Actions = {
    default: async ({ request, locals: { supabase }, cookies }) => {
        const form = await superValidate(request, zod(signInSchema));

        if (!form.valid) {
            setFlash({ type: "error", "message": "Gagal memproses! Input tidak valid." }, cookies);
            return fail(400, { form });
        }

        let email = form.data.username;
        {
            const { data, error } = await supabase.rpc("get_user_email_by_keys", {
                keys: form.data.username
            })

            if (error) console.error(error);

            if (data.length < 1) {
                setFlash({ type: "error", "message": `NIM/Email atau password salah!` }, cookies);
                return fail(400, { form })
            }

            email = data[0].email;
        }


        const { error } = await supabase.auth.signInWithPassword({
            email,
            password: form.data.password
        });

        if (error) {
            console.error(error);

            if (error instanceof AuthApiError && error.status === 400) {
                setFlash({ type: "error", "message": "NIM/Email atau password salah!" }, cookies);
                return fail(400, { form })
            }

            setFlash({ type: "error", "message": "Terjadi kesalahan pada sisi server! Silahkan coba lagi." }, cookies);
            return fail(500, { form })
        }

        redirect(303, '/');
    }
};