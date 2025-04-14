<script lang="ts">
	import { onMount } from 'svelte';
	import { getRandomDuel } from '$lib/utils/duel';
	import DuelDisplay from '$lib/components/DuelDisplay.svelte';
	import type { TranslationSample } from '$lib/types';

	import { page } from '$app/state';
	const book = page.params.book;

	let sample: TranslationSample | null = null;

	async function loadSample() {
		sample = await getRandomDuel(book);
	}

	async function handleVote(winnerId: string | null) {
		console.log('Vote:', winnerId);
		await loadSample();
	}

	onMount(loadSample);
</script>

{#if sample}
	<DuelDisplay {sample} onVote={handleVote} />
{:else}
	<p>Loading duel...</p>
{/if}
