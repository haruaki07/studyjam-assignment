<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../global.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { initFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';

	export let data: LayoutData;

	$: ({ supabase, session } = data);

	initFlash(page, {
		clearOnNavigate: true
	});

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>StudyJam Assignment</title>
</svelte:head>

<ProgressBar color="#41adff" />

<slot />
