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

<div class="row">
	<a href="/"><h1 style="margin-top: 12px;">StudyJam Assignment</h1></a>

	{#if $page.data.session}
		<form action="/my">
			<button disabled={loading} type="submit">My Submission</button>
		</form>
		<form action="/submit">
			<button disabled={loading} type="submit">Submit</button>
		</form>
		<form action="/logout" method="post" use:enhance={handleLogout}>
			<button disabled={loading} type="submit">Logout</button>
		</form>
	{:else}
		<form action="/signin">
			<button type="submit">Login</button>
		</form>
	{/if}
</div>

<slot />
