<script lang="ts">
	import type { PageData } from './$types';
	import DuelDisplay from '$lib/components/DuelDisplay.svelte';

	const { data } = $props() as { data: PageData };
</script>

<div class="container mx-auto px-4 py-8">
	{#if data.sample && data.translatorsInfoMap && data.translatorsInfoMap.size > 0}
		{#key data.sample.sample_id}
			<DuelDisplay sample={data.sample} translatorsInfoMap={data.translatorsInfoMap} />
		{/key}
	{:else}
		<p class="text-center text-gray-500">Loading comparison data or no data available...</p>
	{/if}
</div>
