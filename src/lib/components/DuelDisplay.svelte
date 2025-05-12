<script lang="ts">
	import { page } from '$app/state';
	import { getDuelHistory, recordDuel } from '$lib/data/duelHistory.svelte';
	import TranslationCard from './ComparisonPassageCard.svelte';
	import type { DuelRecord, SampleTextEntry, TranslationInfo, TranslationSample } from '$lib/types';

	let {
		sample,
		translatorsInfoMap
	}: { sample: TranslationSample; translatorsInfoMap: Map<string, TranslationInfo> } = $props();

	const bookSlug = $derived(page.params.book);
	let historyCount = $state(getDuelHistory(page.params.book).length);

	const duelPair = $derived(() => {
		if (!sample || sample.translations?.length !== 2) {
			return null;
		}
		if (!translatorsInfoMap || translatorsInfoMap.size === 0) {
			// Check translatorsInfoMap
			return null;
		}
		const left = sample.translations[0];
		const right = sample.translations[1];

		const leftInfo = translatorsInfoMap.get(left.translation_id);
		const rightInfo = translatorsInfoMap.get(right.translation_id);
		if (!leftInfo || !rightInfo) {
			return null;
		}

		return { left, right, leftInfo, rightInfo };
	});

	let hasVoted = $state(false);
	let winnerId: string | null = $state(null);

	function handleVote(winner: string | null) {
		const currentDuel = duelPair();
		if (!currentDuel) {
			console.error('Cannot record vote: Duel data is not valid.');
			return;
		}

		const duelRecord: DuelRecord = {
			sampleId: sample.sample_id,
			book: sample.book,
			bookSlug: bookSlug,
			description: sample.description,
			lines: sample.lines,
			left: currentDuel.left.translation_id,
			right: currentDuel.right.translation_id,
			leftName: currentDuel.leftInfo.name,
			rightName: currentDuel.rightInfo.name,
			leftYear: currentDuel.leftInfo.year,
			rightYear: currentDuel.rightInfo.year,
			winner,
			leftText: currentDuel.left.text,
			rightText: currentDuel.right.text,
			timestamp: new Date().toISOString()
		};
		recordDuel(bookSlug, duelRecord);

		hasVoted = true;
		winnerId = winner;
		historyCount += 1;
	}

	function reloadPage() {
		window.location.reload();
	}
</script>

{#if !duelPair()}
	<p class="text-center text-red-600">
		Error: Could not prepare duel data. Please check console or try again.
	</p>
{:else}
	<div class="space-y-6">
		<div class="mb-4 space-y-1 text-sm text-gray-700">
			<p>Read both versions of the passage and choose the one you prefer.</p>
			<p>Translator names will be revealed after you vote.</p>
		</div>

		<div class="mt-4 rounded border border-gray-300 bg-gray-50 px-4 py-2 text-center">
			<p class="text-sm font-semibold text-gray-800">
				Book {sample.book}, Lines {sample.lines[0]}–{sample.lines[1]}
			</p>
			<p class="text-sm text-gray-600 italic">{sample.description}</p>
		</div>

		<div class="grid items-stretch gap-4 md:grid-cols-2">
			<div class="flex h-full flex-col space-y-4">
				<p class="mb-1 text-sm font-bold text-gray-600 uppercase">A</p>
				<TranslationCard
					text={duelPair()!.left.text}
					isWinner={hasVoted && winnerId === duelPair()!.left.translation_id}
					class="min-h-[28rem]"
				/>
				<div class="min-h-[2.5rem] text-center text-sm text-gray-700">
					{#if hasVoted}
						<p class="italic">
							{duelPair()!.leftInfo.name}
							{#if duelPair()!.leftInfo.year}({duelPair()!.leftInfo.year}){/if}
						</p>
					{/if}
				</div>
			</div>

			<div class="flex h-full flex-col space-y-4">
				<p class="mb-1 text-sm font-bold text-gray-600 uppercase">B</p>
				<TranslationCard
					text={duelPair()!.right.text}
					isWinner={hasVoted && winnerId === duelPair()!.right.translation_id}
					class="min-h-[28rem]"
				/>
				<div class="min-h-[2.5rem] text-center text-sm text-gray-700">
					{#if hasVoted}
						<p class="italic">
							{duelPair()!.rightInfo.name}
							{#if duelPair()!.rightInfo.year}({duelPair()!.rightInfo.year}){/if}
						</p>
					{/if}
				</div>
			</div>
		</div>

		<div class="space-y-4">
			<div class="grid grid-cols-3 gap-4">
				<button
					onclick={() => handleVote(duelPair()!.left.translation_id)}
					disabled={hasVoted}
					class="rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
				>
					A is better
				</button>

				<button
					onclick={() => handleVote(null)}
					disabled={hasVoted}
					class="rounded border border-gray-400 bg-white py-2 text-sm text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
				>
					Tie
				</button>

				<button
					onclick={() => handleVote(duelPair()!.right.translation_id)}
					disabled={hasVoted}
					class="rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
				>
					B is better
				</button>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<button
					onclick={reloadPage}
					class="rounded border border-gray-300 bg-white px-4 py-2 text-sm transition hover:bg-gray-100"
				>
					New Round
				</button>

				<a
					href={`/books/${bookSlug}/results`}
					class="rounded border border-green-600 px-4 py-2 text-sm text-green-600 transition hover:bg-green-50"
				>
					View Results ({historyCount})
				</a>
			</div>
		</div>
	</div>
{/if}
