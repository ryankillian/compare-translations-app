<script lang="ts">
	import { page } from '$app/state'; // Using $app/state as per your preference
	import '../app.css';
	let { children } = $props();

	const siteName = 'Compare Translations';
	const defaultDescription =
		'Compare literary translations and find your preferred style for classics like The Iliad and The Odyssey.';
</script>

<svelte:head>
	<title>{page.data?.title ? `${page.data.title} | ${siteName}` : siteName}</title>

	{#if page.data?.description}
		<meta name="description" content={page.data.description} />
	{:else}
		<meta name="description" content={defaultDescription} />
	{/if}
	<link rel="canonical" href={page.url.href} />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<main class="mx-auto w-full max-w-7xl flex-grow px-4 py-6">
		{@render children()}
	</main>

	<footer class="mt-auto w-full">
		<div class="mx-auto max-w-7xl px-4 py-8">
			<div class="text-center text-xs text-gray-500">
				<p>Compare Translations © {new Date().getFullYear()}</p>
			</div>
		</div>
	</footer>
</div>
