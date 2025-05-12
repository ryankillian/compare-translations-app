<script lang="ts">
	let { data = [] } = $props();

	const maxAppearances = Math.max(...data.map((d) => d.appearances));
</script>

<div class="space-y-4">
	{#each data as { name, wins, ties, losses, appearances, winRate }}
		<div>
			<!-- 📘 Translator Name -->
			<p class="text-base font-semibold text-gray-800">{name}</p>

			<!-- 📊 Stats block -->
			<div
				class="flex flex-col text-sm text-gray-700 sm:flex-row sm:items-center sm:justify-between"
			>
				<p>
					{wins} Wins, {ties} Tie{ties === 1 ? '' : 's'}, {losses} Loss{losses === 1 ? '' : 'es'}
				</p>
				<p>{appearances} Appearances ({Math.round(winRate * 100)}% win rate)</p>
			</div>

			<!-- 📊 Bar -->
			<div class="mt-1 h-5 w-full overflow-hidden rounded bg-gray-200">
				<div
					class="h-5 rounded bg-blue-600 transition-all duration-500"
					style={`width: ${(winRate || 0) * 100}%`}
				></div>
			</div>
		</div>
	{/each}
</div>
