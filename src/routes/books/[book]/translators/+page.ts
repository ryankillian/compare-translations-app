import { error } from '@sveltejs/kit';
import type { TranslationInfo } from '$lib/types';
import type { PageLoad } from './$types';
import { books } from '$lib/data/books'; // Import your books data

interface TranslatorsFileModule {
	default: {
		[id: string]: Omit<TranslationInfo, 'id'>;
	};
}

export const load: PageLoad = async ({ params }) => {
	const bookSlug = params.book;

	try {
		const module = (await import(
			`../../../../lib/data/${bookSlug}/translators.json`
		)) as TranslatorsFileModule;

		const translatorsArray: TranslationInfo[] = Object.entries(module.default).map(
			([id, details]) => ({ id, ...details })
		);

		const bookData = books.find((b) => b.slug === bookSlug);
		const bookName =
			bookData?.title ||
			(bookSlug
				? bookSlug.charAt(0).toUpperCase() + bookSlug.slice(1).replace(/-/g, ' ')
				: 'Selected Book');

		const pageTitle = `${bookName} Translators`;
		const pageDescription = `Browse a list of translators and their publication details for ${bookName}.`;
		return {
			title: pageTitle,
			description: pageDescription,
			translators: translatorsArray,
			book: bookSlug // Pass the original slug as 'book' if the page component uses it
		};
	} catch (err: any) {
		// Attempt to get bookName for error message even if import fails, if bookSlug was valid
		const bookDataForError = books.find((b) => b.slug === bookSlug);
		const bookNameForError =
			bookDataForError?.title ||
			(bookSlug
				? bookSlug.charAt(0).toUpperCase() + bookSlug.slice(1).replace(/-/g, ' ')
				: 'the selected book');

		// Check for common dynamic import failure, often related to missing files
		if (
			err.message?.includes('Failed to fetch dynamically imported module') ||
			err.code === 'MODULE_NOT_FOUND'
		) {
			throw error(404, `Translator data file not found for ${bookNameForError}.`);
		}
		// General error
		throw error(
			err.status || 500, // Use error status if available, else 500
			`Could not load translator data for ${bookNameForError}: ${err.message || 'Unknown error'}`
		);
	}
};
