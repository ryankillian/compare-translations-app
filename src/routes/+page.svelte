<script lang="ts">
	import StartVotingButton from '$lib/components/LinkButton.svelte';
	import { books } from '$lib/data/books';
</script>

<nav class="mt-4 mb-6 text-sm text-gray-700">
	<div class="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
		<a href="/" class="text-blue-600 hover:underline">Home</a>
		<a
			href="/about"
			class="rounded border border-blue-600 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50"
		>
			About
		</a>
	</div>
</nav>

<section class="my-8 space-y-4 text-center md:my-12">
	<h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">Which translation is right for you?</h1>
	<div class="mx-auto max-w-xl space-y-2 text-sm text-gray-600 sm:text-base">
		<p>
			Unsure which English translation of <i>The Iliad</i> or <i>The Odyssey</i> to pick?
		</p>
		<p>Compare short, anonymous passages from various translators side-by-side.</p>
		<p>Vote for the style you prefer. See which translators best match your taste.</p>
	</div>
</section>

<h2 class="mb-6 text-2xl font-bold">Available Works</h2>

<ul class="space-y-3">
	{#each books as book}
		<li class="rounded border bg-white px-4 py-3 shadow-sm">
			<div class="flex flex-wrap items-center justify-between gap-2 text-sm">
				<a
					href={`/books/${book.slug}`}
					class="text-lg font-semibold text-gray-800 transition hover:text-blue-700"
				>
					{book.title}
				</a>
				<div class="flex items-center gap-4">
					<a
						href={`/books/${book.slug}/translators`}
						class="text-gray-600 transition hover:text-blue-600"
					>
						{book.translators} translations available
					</a>
					<StartVotingButton href={`/books/${book.slug}/vote`} label="Start Comparing →" />
				</div>
			</div>
		</li>
	{/each}
</ul>

<section class="mt-8 border-t border-gray-200 pt-6 text-center">
	<div
		class="mx-auto max-w-2xl rounded-md border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700"
	>
		<p class="font-medium">Please Note:</p>
		<p class="mt-1">
			This site is currently in active development. Your votes are stored locally on your device
			only. More features and aggregated results are planned for the future! For more details, see
			our <a href="/about" class="font-semibold text-blue-800 hover:underline">About page</a>.
		</p>
	</div>
</section>
