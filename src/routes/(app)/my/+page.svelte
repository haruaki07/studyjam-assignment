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
{/if}
