<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

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
