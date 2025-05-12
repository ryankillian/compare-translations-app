<script lang="ts">
	let { children } = $props();
</script>

<nav class="mt-4 mb-6 text-sm text-gray-700">
	<div class="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
		<div class="flex items-center gap-2">
			<a href="/" class="text-blue-600 hover:underline">Home</a>
			<span class="text-gray-400">/</span>
			<span class="font-medium text-gray-800">Contact</span>
		</div>

		<a
			href="/"
			class="rounded border border-blue-600 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50"
		>
			← Back to Home
		</a>
	</div>
</nav>

<main>
	{@render children()}
</main>
