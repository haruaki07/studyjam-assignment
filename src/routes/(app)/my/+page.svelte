<script lang="ts">
	import Flash from '$lib/components/Flash.svelte';
	import ReviewResult from '$lib/components/ReviewResult.svelte';
	import { SubmissionStatus } from '$lib/supabase';
	import type { PageData } from './$types';
	import stars1Img from '$lib/assets/stars1.png';
	import stars2Img from '$lib/assets/stars2.png';
	import stars3Img from '$lib/assets/stars3.png';

	export let data: PageData;

	const statusMap: Record<SubmissionStatus, string> = {
		pending: 'Menunggu review',
		rejected: 'Ditolak',
		completed: 'Diterima'
	};
</script>

<Flash />

{#if data.submission}
	{#if data.submission.status === SubmissionStatus.Completed}
		<br />
		{#if data.submission.stars === 1}
			<img src={stars1Img} alt="One Star Badge" class="star-badge" />
		{:else if data.submission.stars === 2}
			<img src={stars2Img} alt="Two Stars Badge" class="star-badge" />
		{:else if data.submission.stars === 3}
			<img src={stars3Img} alt="Three Stars Badge" class="star-badge" />
		{/if}

		<p>
			Halo <strong>{data.user.user_metadata.name}</strong>, Selamat! Anda telah berhasil
			menyelesaikan
			<strong>Proyek Akhir StudyJam Web Programming Advanced: MusicShelf API</strong>.
		</p>
		<p>
			Mohon tunggu informasi selanjutnya mengenai sertifikat dan hal-hal lainnya. Terima kasih atas
			kehadiran dan kontribusi Anda dalam kelas StudyJam ini.
		</p>
	{/if}

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

	{#if data.submission.status !== SubmissionStatus.Pending && data.submission.reviews}
		<ReviewResult review={data.submission.reviews} />
	{/if}
{:else}
	<p class="red">Anda belum pernah mengumpulkan berkas submission!</p>
{/if}

<style>
	.star-badge {
		width: 80px;
		object-fit: cover;
		object-position: bottom;
	}
</style>
