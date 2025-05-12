<script lang="ts">
	import { page } from '$app/state';
	import StartVotingButton from '$lib/components/LinkButton.svelte';
	import ViewResultsButton from '$lib/components/LinkButton.svelte';

	const book = page.params.book;
</script>

<ul class="list-inside list-disc space-y-2">
	<StartVotingButton href={`/books/${book}/vote`} label={'Start Voting →'} />
	<ViewResultsButton href={`/books/${book}/results`} label={'View Results →'} />
</ul>

<div class="mt-8 rounded-md border border-blue-300 bg-blue-50 p-4 text-blue-700">
	<h3 class="mb-2 text-lg font-medium text-blue-800">Site Status & Your Data</h3>
	<p class="text-sm">
		Thank you for visiting the page for <i class="capitalize">{book}</i>. This site is actively
		being developed.
	</p>
	<ul class="mt-2 list-inside list-disc space-y-1 text-sm">
		<li>Future updates will include global comparison results and more features for this book.</li>
		<li>
			Currently, your votes help create a personalized preference profile stored only on your
			computer.
		</li>
	</ul>
</div>
