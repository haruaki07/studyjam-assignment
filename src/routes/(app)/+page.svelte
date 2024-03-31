<script lang="ts">
	import Criteria from '$lib/components/Criteria.svelte';
	import Flash from '$lib/components/Flash.svelte';
	import InstructionTabs from '$lib/components/InstructionTabs.svelte';
	import Recommendation from '$lib/components/Recommendation.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Flash />

<InstructionTabs tabs={data.tabs} currentTab={data.tab} />

{#if data.tab === 'kriteria'}
	<Criteria />
{:else if data.tab === 'saran'}
	<Recommendation />
{/if}
