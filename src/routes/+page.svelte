<script lang="ts">
	import StartVotingButton from '$lib/components/StartVotingButton.svelte';
	import { books } from '$lib/data/books';
</script>

<nav class="mt-4 mb-6 text-sm text-gray-700">
	<div class="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
		<!-- Breadcrumb: just Home -->
		<a href="/" class="text-blue-600 hover:underline">Home</a>

		<!-- Optional About link -->
		<a
			href="/about"
			class="rounded border border-blue-600 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50"
		>
			About
		</a>
	</div>
</nav>

<!-- Hero section -->
<section class="mb-8 space-y-2 text-center">
	<h2 class="text-3xl font-bold text-gray-900">Which translation is right for you?</h2>
	<p class="mx-auto max-w-xl text-sm text-gray-600">
		Choose between translations of <i>The Iliad</i>, <i>The Odyssey</i>, and more.
	</p>
</section>

<!-- Book list -->
<h2 class="mb-6 text-2xl font-bold">Available Works</h2>

<ul class="space-y-3">
	{#each books as book}
		<li class="rounded border bg-white px-4 py-3 shadow-sm">
			<div class="flex flex-wrap items-center justify-between gap-2 text-sm">
				<!-- Book title (clickable) -->
				<a
					href={`/books/${book.slug}`}
					class="text-lg font-semibold text-gray-800 transition hover:text-blue-700"
				>
					{book.title}
				</a>

				<!-- Right side: translations + voting -->
				<div class="flex items-center gap-4">
					<a
						href={`/books/${book.slug}/translators`}
						class="text-gray-600 transition hover:text-blue-600"
					>
						{book.translators.length} translations available
					</a>

					<StartVotingButton href={`/books/${book.slug}/vote`} />
				</div>
			</div>
		</li>
	{/each}
</ul>
