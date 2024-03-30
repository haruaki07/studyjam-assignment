import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { signUpSchema } from '$lib/schemas/auth';

export const load: PageLoad = async ({ parent }) => {
    const form = await superValidate(zod(signUpSchema));
    const { session } = await parent();
    if (session) redirect(303, '/');

    return { form }
};