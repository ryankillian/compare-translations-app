<script lang="ts">
	import { page } from '$app/state';
	import StartVotingButton from '$lib/components/StartVotingButton.svelte';
	import ViewResultsButton from '$lib/components/ViewResultsButton.svelte';

	const book = page.params.book;
</script>

<ul class="list-inside list-disc space-y-2">
	<StartVotingButton href={`/books/${book}/vote`} />
	<ViewResultsButton href={`/books/${book}/results`} />
</ul>
