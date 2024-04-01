<script lang="ts">
	import Criteria from '$lib/components/Criteria.svelte';
	import Flash from '$lib/components/Flash.svelte';
	import InstructionTabs from '$lib/components/InstructionTabs.svelte';
	import Introduction from '$lib/components/Introduction.svelte';
	import Others from '$lib/components/Others.svelte';
	import Recommendation from '$lib/components/Recommendation.svelte';
	import Testing from '$lib/components/Testing.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Flash />

<InstructionTabs tabs={data.tabs} currentTab={data.tab} />

{#if data.tab === 'pengantar'}
	<Introduction />
{:else if data.tab === 'kriteria'}
	<Criteria />
{:else if data.tab === 'pengujian'}
	<Testing />
{:else if data.tab === 'saran'}
	<Recommendation />
{:else if data.tab === 'lainnya'}
	<Others />
{/if}
