<script lang="ts">
	import Flash from '$lib/components/Flash.svelte';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { signInSchema } from '$lib/schemas/auth';

	export let data: PageData;

	const { form, errors, constraints, enhance } = superForm(data.form, {
		validators: zodClient(signInSchema)
	});
</script>

<h2>Login</h2>

<Flash />

<form method="post" use:enhance>
	<label for="username">NIM/Email</label>
	<input
		type="text"
		name="username"
		id="username"
		placeholder="Nim atau Email"
		bind:value={$form.username}
		{...$constraints.username}
	/>
	{#if $errors.username}<span class="input-err">{$errors.username}</span>{/if}

	<label for="password">Password</label>
	<input
		type="password"
		name="password"
		id="password"
		bind:value={$form.password}
		{...$constraints.password}
	/>
	{#if $errors.password}<span class="input-err">{$errors.password}</span>{/if}

	<button type="submit">Login</button>
</form>

<p>Belum punya akun? silahkan daftar <a href="/signup">disini</a>.</p>
