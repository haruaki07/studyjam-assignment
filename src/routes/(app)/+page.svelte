<script lang="ts">
	import Flash from '$lib/components/Flash.svelte';
	import InstructionTabs from '$lib/components/InstructionTabs.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const contentComponents = {
		criteria: () => import('$lib/components/Criteria.svelte'),
		recommendation: () => import('$lib/components/Recommendation.svelte')
	};
</script>

<Flash />

<InstructionTabs tabs={data.tabs} currentTab={data.tab} />

{#key data.tab}
	{#await contentComponents[data.tab]() then { default: LazyComponent }}
		<LazyComponent />
	{/await}
{/key}
