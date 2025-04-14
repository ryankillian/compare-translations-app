<script lang="ts">
	import '../app.css';

	let { children } = $props();

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' }
	];
</script>

<!-- <nav class="mb-8 bg-white shadow-sm">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
		<a href="/" class="text-lg font-bold tracking-tight text-gray-800 hover:text-blue-700">
			Classic Compare
		</a>
		<ul class="flex gap-6 text-sm text-gray-600">
			{#each links as link}
				<li>
					<a href={link.href} class="font-medium transition hover:text-blue-600">{link.label}</a>
				</li>
			{/each}
		</ul>
	</div>
</nav> -->

<main class="mx-auto w-full max-w-7xl px-4">
	{@render children()}
</main>
