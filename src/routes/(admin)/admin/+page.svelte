<script lang="ts">
	import { enhance } from '$app/forms';
	import { SubmissionStatus } from '$lib/supabase';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageData } from './$types';

	export let data: PageData;

	let dialogEl: HTMLDialogElement;
	let submissionId: string | undefined;
	let checkAllEl: HTMLInputElement;
	let submitterNotesDialogEl: HTMLDialogElement;
	let submitterNotes = '';
	let message = '';

	let checklist: string[] = [];
	let notes: string = '';
	let status = '';
	let stars: number | undefined;

	const handleOpenDialog = (id: string) => {
		submissionId = id;
		dialogEl.showModal();
	};

	const handleCheckAll = (
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		if (!e.currentTarget.checked) {
			checklist = [];
		} else {
			checklist = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'];
		}
	};

	const enhancer: SubmitFunction = ({}) => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				dialogEl.close();
			} else if (result.type === 'failure') {
				message = (result.data?.message ?? '') as string;
			}
			await update();
		};
	};

	const handleShowSubmitterNotes = (notes: string) => {
		submitterNotes = notes;
		submitterNotesDialogEl.showModal();
	};

	$: if (checklist.length > 0 && checklist.length < 9) {
		checkAllEl.indeterminate = true;
	} else if (checkAllEl) {
		checkAllEl.indeterminate = false;
	}
</script>

<h1>Submissions</h1>

<table>
	<thead>
		<tr>
			<th>Submitter</th>
			<th>Attempt</th>
			<th>Submited At</th>
			<th>File</th>
			<th>Notes</th>
			<th>Action</th>
		</tr>
	</thead>
	<tbody>
		{#each data.submissions as submission (submission.id)}
			<tr>
				<td>{submission.profiles.name}</td>
				<td>{submission.attempt}</td>
				<td>{new Date(submission.created_at).toLocaleString()}</td>
				<td>
					<a href="/admin/dl?file_url={submission.file_url}" target="_blank" download>Download</a>
				</td>
				<td>
					<button type="button" on:click={() => handleShowSubmitterNotes(submission.notes)}>
						Show
					</button>
				</td>
				<td>
					<button type="button" on:click={() => handleOpenDialog(submission.id)}>Review</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<dialog id="dialog" bind:this={dialogEl}>
	<header>Review Submission</header>
	<form use:enhance={enhancer} method="post" enctype="multipart/form-data">
		<input type="hidden" name="submission_id" value={submissionId} />

		<fieldset>
			<legend>Criteria Checklist</legend>
			<div>
				<input type="checkbox" id="all" on:change={handleCheckAll} bind:this={checkAllEl} />
				<label for="all">Select All</label>
			</div>
			<div>
				<input type="checkbox" id="c1" name="checklist" bind:group={checklist} value="c1" />
				<label for="c1">Kriteria 1: Menggunakan Laravel</label>
			</div>
			<div>
				<input type="checkbox" id="c2" name="checklist" bind:group={checklist} value="c2" />
				<label for="c2">Kriteria 2: Menggunakan MySQL sebagai database</label>
			</div>
			<div>
				<input type="checkbox" id="c3" name="checklist" bind:group={checklist} value="c3" />
				<label for="c3">Kriteria 3: Menggunakan database migration</label>
			</div>
			<div>
				<input type="checkbox" id="c4" name="checklist" bind:group={checklist} value="c4" />
				<label for="c4">Kriteria 4: Menggunakan API Routes</label>
			</div>
			<div>
				<input type="checkbox" id="c5" name="checklist" bind:group={checklist} value="c5" />
				<label for="c5">Kriteria 5: API dapat menyimpan musik</label>
			</div>
			<div>
				<input type="checkbox" id="c6" name="checklist" bind:group={checklist} value="c6" />
				<label for="c6">Kriteria 6: API dapat menampilkan seluruh musik</label>
			</div>
			<div>
				<input type="checkbox" id="c7" name="checklist" bind:group={checklist} value="c7" />
				<label for="c7">Kriteria 7: API dapat menampilkan detail musik</label>
			</div>
			<div>
				<input type="checkbox" id="c8" name="checklist" bind:group={checklist} value="c8" />
				<label for="c8">Kriteria 8: API dapat mengubah data musik</label>
			</div>
			<div>
				<input type="checkbox" id="c9" name="checklist" bind:group={checklist} value="c9" />
				<label for="c9">Kriteria 9: API dapat menghapus musik</label>
			</div>
		</fieldset>

		<label for="review-notes">Review Notes</label>
		<textarea placeholder="Type..." name="notes" id="review-notes" bind:value={notes}></textarea>

		<label for="review-file">Code Review File</label>
		<input type="file" name="file" id="review-file" accept="application/zip" />

		<label for="status">Mark as <small class="red">*</small></label>
		<select name="status" id="status" required bind:value={status}>
			<option hidden value="">Please select</option>
			<option value={SubmissionStatus.Rejected}>Rejected</option>
			<option value={SubmissionStatus.Completed}>Approved</option>
		</select>

		{#if status === SubmissionStatus.Completed}
			<fieldset>
				<legend>Stars <small class="red">*</small></legend>
				<label>
					<input bind:group={stars} type="radio" name="stars" value={1} required /> 1
				</label>
				<label>
					<input bind:group={stars} type="radio" name="stars" value={2} required /> 2
				</label>
				<label>
					<input bind:group={stars} type="radio" name="stars" value={3} required /> 3
				</label>
			</fieldset>
		{/if}

		{#if message}
			<br />
			<p class="red">{message}</p>
		{/if}
		<br />
		<button type="submit" formmethod="post">Review</button>
		<button type="submit" formmethod="dialog" formnovalidate>Cancel</button>
	</form>
</dialog>

<dialog bind:this={submitterNotesDialogEl}>
	<header>Submitter Notes</header>

	<form method="dialog">
		<p style="white-space: pre">
			{submitterNotes}
		</p>
		<button type="submit">Close</button>
	</form>
</dialog>
