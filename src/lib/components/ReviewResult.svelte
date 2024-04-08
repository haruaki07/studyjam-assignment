<script lang="ts">
	import type { Review } from '$lib/supabase';

	export let review: Review;

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
</script>

<h2>Hasil Review</h2>

<h3>Checklist</h3>
{#each Object.entries(user_checklist) as [key, checked] (key)}
	<div class:green={checked} class:red={!checked}>
		<input type="checkbox" {checked} readonly />
		{checklistMap[key]}
	</div>
{/each}

<h3>Catatan dari Reviewer</h3>
<details>
	<summary><strong>Catatan peserta:</strong> (Klik untuk melihat)</summary>
	<div style="white-space: pre;">{review.notes || '-'}</div>
</details>

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
