<script lang="ts">
	import type { PageData } from './$types';
	import DuelDisplay from '$lib/components/DuelDisplay.svelte';
	import { page } from '$app/state';
	import { books } from '$lib/data/books'; // To get full book title

	const { data } = $props() as { data: PageData };

	const bookSlug = $derived(page.params.book);
	const bookData = $derived(books.find((b) => b.slug === bookSlug));
	const bookName = $derived(
		bookData?.title ||
			(bookSlug ? bookSlug.charAt(0).toUpperCase() + bookSlug.slice(1).replace(/-/g, ' ') : 'Book')
	);

	const pageTitle = $derived(`Compare ${bookName} Translations | Compare Translations`);
	const pageDescription = $derived(
		`Vote on anonymous passages from ${bookName} to find your preferred translation style.`
	);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<link rel="canonical" href={page.url.href} />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	{#if data.sample && data.translatorsInfoMap && data.translatorsInfoMap.size > 0}
		{#key data.sample.sample_id}
			<DuelDisplay sample={data.sample} translatorsInfoMap={data.translatorsInfoMap} />
		{/key}
	{:else}
		<p class="text-center text-gray-500">Loading comparison data or no data available...</p>
	{/if}
</div>
