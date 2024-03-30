<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { signUpSchema } from '$lib/schemas/auth';
	import Flash from '$lib/components/Flash.svelte';

	export let data: PageData;

	const { form, errors, constraints, enhance, submitting } = superForm(data.form, {
		validators: zodClient(signUpSchema)
	});
</script>

<svelte:head>
	<title>Daftar Akun - StudyJam Assignment</title>
</svelte:head>

<h2>Daftar Akun</h2>

<Flash />

<form method="post" use:enhance>
	<label for="name">Nama Lengkap</label>
	<input
		type="text"
		name="name"
		id="name"
		placeholder="Nama Lengkap"
		bind:value={$form.name}
		{...$constraints.name}
	/>
	{#if $errors.name}<span class="input-err">{$errors.name}</span>{/if}

	<label for="nim">NIM</label>
	<input
		type="text"
		name="nim"
		id="nim"
		placeholder="202020202"
		bind:value={$form.nim}
		{...$constraints.nim}
	/>
	{#if $errors.nim}<span class="input-err">{$errors.nim}</span>{/if}

	<label for="email">Email</label>
	<input
		type="email"
		name="email"
		id="email"
		placeholder="rehan@mail.com"
		bind:value={$form.email}
		{...$constraints.email}
	/>
	{#if $errors.email}<span class="input-err">{$errors.email}</span>{/if}

	<label for="password">Password</label>
	<input
		type="password"
		name="password"
		id="password"
		placeholder="••••••••"
		bind:value={$form.password}
		{...$constraints.password}
	/>
	{#if $errors.password}<span class="input-err">{$errors.password}</span>{/if}

	<button type="submit" disabled={$submitting}>Daftar</button>
</form>

<p>Sudah punya akun? <a href="/signin">login</a>.</p>
