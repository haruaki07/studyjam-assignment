<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import type { SubmitFunction } from '@sveltejs/kit';

	let loading = false;

	const handleLogout: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			await invalidate('supabase:auth');
			await applyAction(result);
			loading = false;
		};
	};
</script>

<svelte:head>
	<title>Email and Password Demo - Supabase Auth Helpers</title>
</svelte:head>

<div class="row">
	<h1 style="margin-top: 12px;">StudyJam Assignment</h1>

	{#if $page.data.session}
		<form action="/logout" method="post" use:enhance={handleLogout}>
			<button disabled={loading} type="submit" style="margin: 0">Logout</button>
		</form>
    {:else}
		<form action="/signin">
			<button type="submit" style="margin: 0">Login</button>
		</form>
	{/if}
</div>

<slot />
