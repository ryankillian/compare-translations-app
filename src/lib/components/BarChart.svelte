<script lang="ts">
	let { data = [] } = $props();

	const maxAppearances = Math.max(...data.map((d) => d.appearances));
</script>

<div class="space-y-4">
	{#each data as { name, wins, appearances, winRate }}
		<div>
			<!-- 📘 Label row -->
			<div class="flex justify-between text-sm font-medium text-gray-700">
				<span>{name}</span>
				<span class="text-right">
					{wins} / {appearances} wins
					<span class="text-gray-500">({Math.round(winRate * 100)}%)</span>
				</span>
			</div>

			<!-- 📊 Bar -->
			<div class="mt-1 h-5 w-full overflow-hidden rounded bg-gray-200">
				<div
					class="h-5 rounded transition-all duration-500"
					style={`width: ${(winRate || 0) * 100}%`}
					class:bg-green-600={winRate > 0.7}
					class:bg-blue-600={winRate <= 0.7}
				></div>
			</div>
		</div>
	{/each}
</div>
