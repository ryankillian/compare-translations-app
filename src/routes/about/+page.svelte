<script lang="ts">
	// Optional: logic or props
</script>

<!-- 🧭 Breadcrumb + Top Navigation -->
<nav class="mt-4 mb-6 text-sm text-gray-700">
	<div class="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
		<!-- Breadcrumb -->
		<div class="flex items-center gap-2">
			<a href="/" class="text-blue-600 hover:underline">Home</a>
			<span>/</span>
			<span>About</span>
		</div>

		<!-- Optional nav (Home already in breadcrumb, so About could be removed or disabled) -->
		<a
			href="/"
			class="rounded border border-blue-600 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50"
		>
			← Back to Home
		</a>
	</div>
</nav>

<!-- 🧾 About Content -->
<section class="space-y-4 text-gray-800">
	<h1 class="text-2xl font-bold">About</h1>
	<p>
		This site helps you compare different translations of classical texts, starting with Homer’s
		<i>Iliad</i> and <i>Odyssey</i>.
	</p>
	<p>
		You vote on side-by-side samples from different translators, and we use that input to help you
		find your preferred style.
	</p>
</section>
