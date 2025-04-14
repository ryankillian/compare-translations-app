<script lang="ts">
	import { page } from '$app/state';

	let current = $derived(() => page.url.pathname);
	let book = $derived(() => page.params.book);

	let { children } = $props();

	const navLinks = [
		{ href: `/books/${page.params.book}/vote`, label: 'Start Voting' },
		{ href: `/books/${page.params.book}/results`, label: 'View Results' },
		{ href: `/books/${page.params.book}/translators`, label: 'Translators' }
	];

	const isActive = (href: string) => current() === href;

	const formatSegment = (segment: string) => segment.charAt(0).toUpperCase() + segment.slice(1);
</script>

<!-- 🧭 Breadcrumb + Navigation -->
<nav class="mt-4 mb-6 text-sm text-gray-700">
	<div class="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
		<!-- Breadcrumb -->
		<div class="flex items-center gap-2">
			<a href="/" class="text-blue-600 hover:underline">Home</a>
			<span>→</span>
			<a href={`/books/${book()}`} class="text-blue-600 capitalize hover:underline">{book()}</a>

			{#if current().split('/').length > 3}
				<span>→</span>
				<span class="text-gray-600 capitalize">
					{formatSegment(current().split('/').at(-1) || '')}
				</span>
			{/if}
		</div>

		<!-- Navigation buttons -->
		<div class="flex gap-2">
			{#each navLinks as { href, label }}
				{#if !isActive(href)}
					<a
						{href}
						class="rounded border border-blue-600 px-3 py-1 text-sm text-blue-600 transition hover:bg-blue-50"
					>
						{label}
					</a>
				{/if}
			{/each}
		</div>
	</div>
</nav>

<!-- 🔽 Render page content -->
<main class="space-y-6">
	{@render children()}
</main>
