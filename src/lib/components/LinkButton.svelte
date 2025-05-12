<!-- <script lang="ts">
	let {
		href,
		label,
		class: extraClasses = ''
	} = $props<{
		href: string;
		label: string;
		class?: string;
	}>();

	const baseClasses =
		'inline-block whitespace-nowrap rounded border border-blue-600 px-4 py-1.5 text-sm text-blue-600 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50';
</script>

<a {href} class="{baseClasses} {extraClasses}">
	{label}
</a> -->

<script lang="ts">
	let {
		href,
		label,
		class: extraClasses = ''
	} = $props<{
		href: string;
		label: string;
		class?: string;
	}>();

	const baseClasses =
		'inline-block whitespace-nowrap rounded border border-blue-600 px-3 py-1 text-sm text-blue-600 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 no-underline hover:no-underline';
</script>

<a {href} class="{baseClasses} {extraClasses}">
	{label}
</a>
