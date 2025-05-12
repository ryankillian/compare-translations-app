<script lang="ts">
	import LinkButton from '$lib/components/LinkButton.svelte';

	let formSubmitted = $state(false);
	let submitError = $state<string | null>(null);

	let name = $state('');
	let email = $state('');
	let message = $state('');

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		submitError = null;

		const googleFormBaseUrl =
			'https://docs.google.com/forms/d/e/1FAIpQLSd8QsU5JFBJn_Ajku1t0Jayf12PD1iEBI-IaJYdnsUtO15VeA/formResponse';
		const nameEntryId = 'entry.1642150429';
		const emailEntryId = 'entry.1801923590';
		const messageEntryId = 'entry.1436677598';

		const prefilledLink = `${googleFormBaseUrl}?usp=pp_url&${nameEntryId}=${encodeURIComponent(
			name
		)}&${emailEntryId}=${encodeURIComponent(email)}&${messageEntryId}=${encodeURIComponent(
			message
		)}&submit=Submit`;

		try {
			await fetch(prefilledLink, { mode: 'no-cors' });
			formSubmitted = true;
		} catch (e) {
			console.error('Error submitting to Google Form:', e);
			submitError = 'There was an issue sending your message. Please try again later.';
			formSubmitted = false;
		}
	}
</script>

<div>
	<div class="prose prose-sm sm:prose-base mb-8 max-w-none">
		<h1>Contact Us</h1>
		<p>Have questions, feedback, or suggestions? Please let us know using the form below.</p>
	</div>

	{#if formSubmitted}
		<div class="mx-auto rounded-md bg-green-50 p-4">
			<div class="flex">
				<div class="flex-shrink-0">
					<svg
						class="h-5 w-5 text-green-400"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
				<div class="ml-3">
					<h3 class="text-sm font-medium text-green-800">Message Sent!</h3>
					<div class="mt-2 text-sm text-green-700">
						<p>Thank you for your feedback. We've received your message.</p>
					</div>
					<div class="mt-4">
						<LinkButton href="/" label="Back to Home" />
					</div>
				</div>
			</div>
		</div>
	{:else}
		<form onsubmit={handleSubmit} class="space-y-6">
			<div>
				<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
				<input
					bind:value={name}
					type="text"
					id="name"
					name="name"
					required
					class="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
				/>
			</div>

			<div>
				<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
				<input
					bind:value={email}
					type="email"
					id="email"
					name="email"
					required
					class="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
				/>
			</div>

			<div>
				<label for="message" class="block text-sm font-medium text-gray-700">Message</label>
				<textarea
					bind:value={message}
					id="message"
					name="message"
					rows="4"
					required
					class="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
				></textarea>
			</div>

			{#if submitError}
				<p class="text-sm text-red-600">{submitError}</p>
			{/if}

			<div class="flex items-center justify-between">
				<button
					type="submit"
					class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
				>
					Send Message
				</button>
				<LinkButton href="/about" label="← Back to About" />
			</div>
		</form>
	{/if}
</div>
