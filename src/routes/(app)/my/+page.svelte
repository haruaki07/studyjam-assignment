<script lang="ts">
	import Flash from '$lib/components/Flash.svelte';
	import { SubmissionStatus } from '$lib/supabase';
	import type { PageData } from './$types';

	export let data: PageData;

	const statusMap: Record<SubmissionStatus, string> = {
		pending: 'Menunggu review',
		rejected: 'Ditolak',
		completed: 'Diterima'
	};

	const checklists: Record<string, string> = {
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

	const user_checklist: Record<string, boolean> = Object.keys(checklists).reduce(
		(prev, c) => ({
			...prev,
			[c]: data.submission?.reviews[0].criteria_checklist.includes(c) ?? false
		}),
		{}
	);
</script>

<Flash />

{#if data.submission}
	<h2>Info Submission</h2>

	<p><strong>Nama peserta:</strong> {data.user.user_metadata.name}</p>
	<p><strong>Kelas:</strong> StudyJam Web Programming Advanced</p>
	<p><strong>Submission:</strong> Final Project</p>
	<p><strong>Submission ID:</strong> {data.submission.id}</p>
	<p><strong>Dikirim pada:</strong> {new Date(data.submission.created_at).toLocaleString()}</p>
	<p>
		<strong>Status:</strong>
		<span
			class:amber={data.submission.status === SubmissionStatus.Pending}
			class:red={data.submission.status === SubmissionStatus.Rejected}
			class:green={data.submission.status === SubmissionStatus.Completed}
		>
			{statusMap[data.submission.status]}
		</span>
	</p>
	<details>
		<summary><strong>Catatan peserta:</strong> (Klik untuk melihat)</summary>
		{data.submission.notes}
	</details>
	<p>
		Berkas submission:
		<a href={data.fileUrl} download>
			{data.submission.file_url}
		</a>
	</p>

	{#if data.submission.status !== SubmissionStatus.Pending}
		<h2>Hasil Review</h2>

		<h3>Checklist</h3>
		{#each Object.entries(user_checklist) as [key, checked] (key)}
			<div class:green={checked} class:red={!checked}>
				<input type="checkbox" {checked} readonly />
				{checklists[key]}
			</div>
		{/each}

		<h3>Catatan dari Reviewer</h3>
		<details>
			<summary><strong>Catatan peserta:</strong> (Klik untuk melihat)</summary>
			<div style="white-space: pre;">{data.submission.reviews[0].notes || '-'}</div>
		</details>
	{/if}
{:else}
	<p class="red">Anda belum pernah mengumpulkan berkas submission!</p>
{/if}

<style>
	input[type='checkbox'][readonly] {
		pointer-events: none;
	}
</style>
