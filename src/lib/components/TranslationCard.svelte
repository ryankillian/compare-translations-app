<script lang="ts">
	let {
		translatorName,
		text,
		year,
		form = 'verse', // default to 'verse' if not provided
		isWinner = false,
		showTranslator = false,
		class: className = ''
	} = $props<{
		translatorName: string;
		year?: string;
		text: string[];
		form?: 'verse' | 'prose';
		isWinner?: boolean;
		showTranslator?: boolean;
		class?: string;
	}>();
</script>

<div
	class={`mt-0 rounded border p-4 ${isWinner ? 'border-green-500' : 'border-gray-300'} ${className}`}
>
	{#if showTranslator}
		<p class="mb-2 text-sm text-gray-600 italic">{translatorName}</p>
	{/if}

	{#if form === 'prose'}
		<p class="text-base leading-relaxed">{@html text[0]}</p>
	{:else}
		<div class="space-y-1 text-base leading-relaxed">
			{#each text as line}
				<p>{@html line}</p>
			{/each}
		</div>
	{/if}
</div>
