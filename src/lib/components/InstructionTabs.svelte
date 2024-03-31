<script lang="ts">
	import { capitalizeFirstLetter } from '$lib/utils';

	export let tabs: readonly string[];
	export let currentTab: string;
</script>

<div>
	{#each tabs as tab, i}
		{#if tab === currentTab}
			<span>{capitalizeFirstLetter(tab)}</span>
		{:else}
			<a href="?tab={tab}">{capitalizeFirstLetter(tab)}</a>
		{/if}
		{#if i !== tabs.length - 1}|&nbsp;{/if}
	{/each}
</div>
