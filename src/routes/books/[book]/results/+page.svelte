<script lang="ts">
	import { page } from '$app/state';
	import { getDuelHistory, getWinStats, clearHistory } from '$lib/data/duelHistory.svelte';
	import BarChart from '$lib/components/BarChart.svelte';
	import TranslationCard from '$lib/components/TranslationCard.svelte';

	const bookSlug = $derived(page.params.book);
	const history = $derived(() => getDuelHistory(bookSlug));
	const winStats = $derived(() => getWinStats(bookSlug));
</script>

{#if history().length === 0}
	<p class="text-gray-600">You haven't voted yet. Try a passage!</p>
{:else}
	<div class="space-y-10">
		<!-- 📊 Chart -->
		<section class="rounded border bg-white p-4 shadow-sm">
			<h2 class="mb-2 text-lg font-semibold">Top Translators (by your votes)</h2>
			<BarChart data={winStats()} />
		</section>

		<!-- 📋 Vote History -->
		<section>
			<h2 class="mb-3 text-lg font-semibold">Past Votes</h2>

			<ul class="divide-y rounded border bg-white text-sm">
				{#each [...history()].reverse() as duel, i}
					<details class="group px-4 py-3">
						<summary
							class="flex cursor-pointer list-none items-center justify-between hover:font-medium"
						>
							<span>
								#{history().length - i} —
								{#if duel.winner === duel.left}
									<strong>{duel.leftName}</strong> 🏆 vs {duel.rightName}
								{:else if duel.winner === duel.right}
									{duel.leftName} vs <strong>{duel.rightName}</strong> 🏆
								{:else}
									{duel.leftName} vs {duel.rightName}
									<span class="text-gray-500 italic">(tie)</span>
								{/if}
							</span>
							<span class="text-gray-400 transition-transform group-open:rotate-180">▼</span>
						</summary>

						<!-- Expanded Vote -->
						<div class="mt-3 space-y-4 text-gray-700">
							<p class="text-xs text-gray-500 italic">
								Book {duel.book}, Lines {duel.lines[0]}–{duel.lines[1]}
							</p>
							<div class="grid gap-4 md:grid-cols-2">
								<TranslationCard
									translatorName={duel.leftName}
									text={duel.leftText}
									showTranslator={true}
									isWinner={duel.winner === duel.left}
								/>
								<TranslationCard
									translatorName={duel.rightName}
									text={duel.rightText}
									showTranslator={true}
									isWinner={duel.winner === duel.right}
								/>
							</div>
							<p class="text-right text-xs text-gray-500 italic">
								{new Date(duel.timestamp).toLocaleString()}
							</p>
						</div>
					</details>
				{/each}
			</ul>

			<!-- 🧹 Clear History -->
			<div class="mt-6 flex justify-end">
				<button
					onclick={() => clearHistory(bookSlug)}
					class="rounded border border-red-600 px-3 py-1 text-sm text-red-600 transition hover:bg-red-50"
				>
					Clear History
				</button>
			</div>
		</section>
	</div>
{/if}
