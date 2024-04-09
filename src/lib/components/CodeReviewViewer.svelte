<script lang="ts">
	import { BlobReader, TextWriter, ZipReader } from '@zip.js/zip.js';

	export let file: Blob;

	let entryMap: Record<string, string | undefined> = {};

	const loadFile = async () => {
		const reader = new ZipReader(new BlobReader(file));

		const entries = await reader.getEntries();

		for (const entry of entries) {
			entryMap[entry.filename] = await entry.getData?.(new TextWriter('utf-8'));
		}
	};
</script>

{#await loadFile() then _}
	{#each Object.keys(entryMap) as fileName}
		<details>
			<summary>
				{fileName}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					style="stroke:var(--color-amber);margin-left: 4px;vertical-align:middle;"
					width="20"
					height="20"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
					/>
				</svg>
			</summary>
			{@html entryMap[fileName]}
		</details>
	{/each}
{/await}

<style>
	:global(.shiki, .shiki *) {
		box-sizing: border-box;
	}

	:global(.shiki) {
		position: relative;
		z-index: 1;
		margin: 0;
		background: transparent;
		overflow-x: auto;
	}

	:global(.shiki code) {
		background: transparent;
		display: block;
		padding: 10px 24px;
		width: fit-content;
		min-width: 100%;
		transition: color 0.5s;
	}

	:global(.shiki .line[data-line]::before) {
		content: attr(data-line);
		width: 1rem;
		margin-right: 1.5rem;
		display: inline-block;
		text-align: right;
		color: rgba(115, 138, 148, 0.4);
	}

	:global(.shiki .line.commented) {
		background-color: rgb(101 117 133 / 16%);
		margin: 0 -24px;
		padding: 0 24px;
		width: calc(100% + 48px);
		display: inline-block;
	}

	:global(.shiki .comment) {
		background-color: rgba(0, 0, 0, 0.2);
		color: var(--color-amber);
		margin: 0 -24px;
		padding: 6px 24px;
		width: calc(100% + 48px);
		white-space: pre-wrap;
	}
</style>
