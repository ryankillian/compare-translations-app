<script lang="ts">
	import type { PageData } from './$types';
	const { data } = $props() as { data: PageData };
	// data will be { translators: TranslationInfo[], book: string }
</script>

{#if data.translators.length > 0}
	<ul class="space-y-8">
		{#each data.translators as translator (translator.id)}
			<li class="rounded border border-gray-200 bg-white p-5 shadow-sm">
				<div>
					<h3 class="text-xl font-semibold text-gray-800">{translator.name}</h3>
					<p class="mb-2 text-sm text-gray-500">
						<span>{translator.year}</span>
						<span class="mx-1">•</span>
						<span>{translator.form}</span>
						{#if translator.publisher}
							<span class="mx-1">•</span>
							<span class="text-gray-600">{translator.publisher}</span>
						{/if}
						{#if translator.public_domain}
							<span
								class="ml-2 rounded bg-green-100 px-1.5 py-0.5 align-middle text-xs font-medium text-green-700"
								>Public Domain</span
							>
						{/if}
					</p>
				</div>

				{#if translator.description}
					<p class="mb-4 text-base text-gray-700">{translator.description}</p>
				{/if}

				{#if translator.notes || translator.reviews || translator.sample_source || translator.buy_link}
					<div class="mt-4 space-y-4 border-t border-gray-200 pt-4 text-sm">
						{#if translator.notes}
							<div class="text-gray-600">
								<strong class="font-medium text-gray-700">Notes:</strong>
								{translator.notes}
							</div>
						{/if}

						{#if translator.reviews}
							<div class="space-y-2">
								{#each translator.reviews as review (review.text)}
									<blockquote class="border-l-4 border-gray-300 pl-3 text-gray-600">
										<span class="italic">{@html review.text}</span>
										{#if review.attribution}
											<footer class="mt-1 block text-right text-xs text-gray-500">
												— {review.attribution}
											</footer>
										{/if}
									</blockquote>
								{/each}
							</div>
						{/if}

						{#if translator.sample_source}
							<div>
								<span class="font-medium text-gray-700">Sample Source:</span>
								<a
									href={translator.sample_source.url}
									target="_blank"
									rel="noopener noreferrer"
									class="ml-1 break-words text-blue-600 hover:underline"
								>
									{translator.sample_source.label}
								</a>
							</div>
						{/if}

						{#if translator.buy_link}
							<div class="pt-2">
								<a
									href={translator.buy_link.url}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-block rounded bg-blue-600 px-4 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
								>
									{translator.buy_link.label || 'Buy Now'}
								</a>
							</div>
						{/if}
					</div>
				{/if}
			</li>
		{/each}
	</ul>
{:else if data.book}
	<p class="text-gray-500">
		No translator details listed for <span class="font-medium">{data.book}</span>.
	</p>
{:else}
	<p class="text-gray-500">Loading translator details or book not specified...</p>
{/if}
