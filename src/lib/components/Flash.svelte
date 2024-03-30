<script lang="ts">
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';

	const flash = getFlash(page);
</script>

{#if $flash}
	<div
		class:red={$flash.type === 'error'}
		class:green={$flash.type === 'success'}
		style:margin-bottom="10px"
	>
		{$flash.message}
	</div>
{/if}
