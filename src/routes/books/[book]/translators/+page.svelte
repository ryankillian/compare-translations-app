<script lang="ts">
	import { page } from '$app/state';
	import type { Translator } from '$lib/types';

	// Get the book slug from the URL
	const book = $derived(page.params.book);

	// Properly typed reactive state
	let translators: Translator[] = $state([]);

	// Load translator data for this book on change
	$effect(() => {
		async function load() {
			if (!book) return;
			try {
				const module = await import(`../../../../lib/data/${book}/translators.json`);
				// If using object format { id: { name, ... } }, convert to array
				translators = Object.entries(module.default).map(([id, details]: [string, any]) => ({
					id,
					...details
				}));
			} catch (err) {
				console.error('Failed to load translators for', book, err);
			}
		}

		load();
	});
</script>

<!-- 🔽 Render list of translators -->
{#if translators.length}
	<ul class="space-y-4">
		{#each translators as translator}
			<li class="rounded border p-4">
				<h3 class="text-lg font-semibold">{translator.name}</h3>
				<p class="mb-1 text-sm text-gray-600">
					{translator.year} • {translator.form}
				</p>
				{#if translator.description}
					<p class="text-sm text-gray-700">{translator.description}</p>
				{/if}

				{#if translator.links}
					<div class="mt-2 space-x-4 text-sm">
						{#if translator.links.view}
							<a
								href={translator.links.view}
								class="text-blue-600 hover:underline"
								target="_blank"
								rel="noopener">View</a
							>
						{/if}
						{#if translator.links.buy}
							<a
								href={translator.links.buy}
								class="text-blue-600 hover:underline"
								target="_blank"
								rel="noopener">Buy</a
							>
						{/if}
					</div>
				{/if}
			</li>
		{/each}
	</ul>
{:else}
	<p class="text-gray-500">Loading translator details...</p>
{/if}
