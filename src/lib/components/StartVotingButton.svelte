<script lang="ts">
	let { href } = $props<{ href: string }>();
</script>

<a
	{href}
	class="rounded border border-blue-600 px-4 py-1.5 text-sm text-blue-600 transition hover:bg-blue-50"
>
	Start Voting →
</a>
