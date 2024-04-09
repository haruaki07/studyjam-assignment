<script lang="ts">
	import { page } from '$app/stores';
	import CodeReviewViewer from '$lib/components/CodeReviewViewer.svelte';
	import type { Review } from '$lib/supabase';

	export let review: Review;

	let codeReviewFile: any;

	$: ({ supabase } = $page.data);

	const checklistMap: Record<string, string> = {
		c1: 'Kriteria 1: Menggunakan Laravel',
		c2: 'Kriteria 2: Menggunakan MySQL sebagai database',
		c3: 'Kriteria 3: Menggunakan database migration',
		c4: 'Kriteria 4: Menggunakan API Routes',
		c5: 'Kriteria 5: API dapat menyimpan musik',
		c6: 'Kriteria 6: API dapat menampilkan seluruh musik',
		c7: 'Kriteria 7: API dapat menampilkan detail musik',
		c8: 'Kriteria 8: API dapat mengubah data musik',
		c9: 'Kriteria 9: API dapat menghapus musik'
	};

	const user_checklist: Record<string, boolean> = Object.keys(checklistMap).reduce(
		(prev, c) => ({
			...prev,
			[c]: review.criteria_checklist.includes(c) ?? false
		}),
		{}
	);

	const getCodeReviewFile = async (url: string) => {
		codeReviewFile = await fetch(url).then((res) => res.blob());
	};
</script>

<h2>Hasil Review</h2>

<h3>Checklist</h3>
{#each Object.entries(user_checklist) as [key, checked] (key)}
	<div class:green={checked} class:red={!checked}>
		<input type="checkbox" {checked} readonly />
		{checklistMap[key]}
	</div>
{/each}

<details>
	<summary><strong>Catatan dari Reviewer:</strong> (Klik untuk melihat)</summary>
	<div style="white-space: pre;">{review.notes || '-'}</div>
</details>

{#if review.code_review_url}
	<h3>Code Review</h3>
	{#await getCodeReviewFile(review.code_review_url)}
		getting File...
	{:then}
		<CodeReviewViewer file={codeReviewFile} />
	{:catch err}
		{err}
	{/await}
{/if}

<style>
	input[type='checkbox'][readonly] {
		pointer-events: none;
	}

	.green input[type='checkbox'] {
		accent-color: var(--color-green);
	}

	.red input[type='checkbox'] {
		accent-color: var(--color-red);
	}
</style>
