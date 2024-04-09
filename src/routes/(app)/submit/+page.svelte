<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { ZipReader, BlobReader } from '@zip.js/zip.js';

	let submitting = false;
	let processing = false;
	let success = false;
	let fileError = '';
	let error = '';

	const handleChange = async (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		let reader: ZipReader<unknown> | undefined = undefined;
		try {
			processing = true;
			fileError = '';
			const input = e.currentTarget;
			const file = input.files?.[0];
			if (!file) return;

			if (file.type !== 'application/zip') throw new Error('invalid_file_type');
			if (file.size > 1000000) throw new Error('exceeded_file_size');

			reader = new ZipReader(new BlobReader(file));

			// get all entries from the zip
			const entries = await reader.getEntries();
			const dirty = entries.some(
				(entry) =>
					(/^.*(vendor\/)$/.test(entry.filename) && entry.directory) ||
					(/^.*(node_modules\/)$/.test(entry.filename) && entry.directory)
			);

			if (dirty) {
				input.value = '';
				throw new Error('dirty_file');
			}
		} catch (err) {
			if (err instanceof Error) {
				if (err.message === 'dirty_file') {
					fileError =
						'Berkas submission tidak boleh terdapat folder `node_modules` atau `vendor`! Silahkan upload berkas kembali sesuai dengan ketentuan.';
				} else if (err.message === 'invalid_file_type') {
					fileError = 'Berkas submission harus dalam format ZIP!';
				} else if (err.message === 'exceeded_file_size') {
					fileError = 'Berkas submission tidak boleh melebihi 1MB!';
				}
			}
			console.error(err);
		} finally {
			processing = false;
			// close the ZipReader
			if (reader) await reader.close();
		}
	};

	const handleReset = () => {
		fileError = '';
	};
</script>

<h2>Submission MusicShelf API</h2>

<ul>
	<li>Masukkan submisson Anda ke dalam format <strong>ZIP</strong> sebelum mengirimkannya.</li>
	<li>
		Pastikan berkas telah sesuai dengan <a href="/?tab=lainnya#ketentuan-berkas">
			ketentuan tugas submission
		</a>.
	</li>
	<li>
		Berkas yang tidak sesuai dengan ketentuan tugas submission berpotensi ditolak oleh Reviewer.
	</li>
</ul>

{#if error}<p class="red">{error}</p>{/if}

<form
	method="post"
	on:reset={handleReset}
	enctype="multipart/form-data"
	use:enhance={() => {
		submitting = true;

		return async ({ result }) => {
			try {
				if (result.type === 'error') {
					error = result.error.message;
					return;
				} else if (result.type !== 'failure') {
					success = true;
				}

				await applyAction(result);
			} finally {
				submitting = false;
			}
		};
	}}
>
	<label for="file"><strong>Upload berkas</strong></label>
	<input
		type="file"
		on:change={handleChange}
		id="file"
		name="file"
		disabled={processing || submitting}
	/>
	{#if fileError}<span class="input-err">{fileError}</span>{/if}

	<label for="notes"><strong>Catatan untuk reviewer (bila ada)</strong></label>
	<textarea name="notes" id="notes" placeholder="Ketik..." disabled={submitting}></textarea>

	<button type="submit" disabled={processing || submitting || success}>Submit</button>
	<button type="reset" disabled={processing || submitting || success}>Batal</button>
</form>
