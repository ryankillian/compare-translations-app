<script lang="ts">
	import { getDuelHistory, recordDuel } from '$lib/data/duelHistory.svelte';
	import TranslationCard from './TranslationCard.svelte';
	import { setPassageInfo } from '$lib/state/passageInfo.svelte';
	import type { TranslationSample } from '$lib/types';

	import { page } from '$app/state';

	const book = $derived(page.params.book);
	let historyCount = $state(getDuelHistory(page.params.book).length);

	let { sample, onVote }: { sample: TranslationSample; onVote: (winnerId: string | null) => void } =
		$props();

	const [left, right] = sample.translations;

	let hasVoted = $state(false);
	let winnerId: string | null = $state(null);

	function handleVote(winner: string | null) {
		recordDuel(book, {
			sampleId: sample.sample_id,
			book: sample.book,
			bookSlug: book, // ← you'll get this from the slug
			description: sample.description,
			lines: sample.lines,
			left: left.translator_id,
			right: right.translator_id,
			leftName: left.translator_name,
			rightName: right.translator_name,
			winner,
			leftText: left.text,
			rightText: right.text,
			timestamp: new Date().toISOString()
		});

		hasVoted = true;
		winnerId = winner;
		onVote(winner);

		historyCount += 1;

		setPassageInfo(`Book ${sample.book}, Lines ${sample.lines[0]}–${sample.lines[1]}`);
	}
</script>

<div class="space-y-6">
	<!-- 📢 Short instructions -->
	<div class="mb-4 space-y-1 text-sm text-gray-700">
		<p>Read both versions of the passage and choose the one you prefer.</p>
		<p>Translator names will be revealed after you vote.</p>
	</div>

	<!-- 🔁 Duel options -->
	<div class="grid items-stretch gap-4 md:grid-cols-2">
		<!-- Left Translation -->
		<div class="flex h-full flex-col space-y-4">
			<p class="mb-1 text-xs text-gray-500 uppercase">A</p>
			<TranslationCard
				translatorName={left.translator_name}
				text={left.text}
				isWinner={hasVoted && winnerId === left.translator_id}
				showTranslator={false}
				class="min-h-[28rem]"
			/>
			<!-- Always reserved space -->
			<div class="min-h-[2.5rem] text-center text-sm text-gray-700">
				{#if hasVoted}
					<p class="italic">{left.translator_name}</p>
				{/if}
			</div>
		</div>

		<!-- Right Translation -->
		<div class="flex h-full flex-col space-y-4">
			<p class="mb-1 text-xs text-gray-500 uppercase">B</p>
			<TranslationCard
				translatorName={right.translator_name}
				text={right.text}
				isWinner={hasVoted && winnerId === right.translator_id}
				showTranslator={false}
				class="min-h-[28rem]"
			/>
			<div class="min-h-[2.5rem] text-center text-sm text-gray-700">
				{#if hasVoted}
					<p class="italic">{right.translator_name}</p>
				{/if}
			</div>
		</div>
	</div>

	<!-- Voting & Control Buttons (always visible) -->
	<div class="space-y-4">
		<!-- Voting buttons -->
		<div class="grid grid-cols-3 gap-4">
			<button
				onclick={() => handleVote(left.translator_id)}
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
				onclick={() => handleVote(right.translator_id)}
				disabled={hasVoted}
				class="rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
			>
				B is better
			</button>
		</div>

		<!-- Navigation buttons -->
		<div class="grid grid-cols-2 gap-4">
			<button
				onclick={() => location.reload()}
				class="rounded border border-gray-300 bg-white px-4 py-2 text-sm transition hover:bg-gray-100"
			>
				New Round
			</button>

			<a
				href={`/books/${book}/results`}
				class="rounded border border-green-600 px-4 py-2 text-sm text-green-600 transition hover:bg-green-50"
			>
				View Results ({historyCount})
			</a>
		</div>
	</div>
</div>
