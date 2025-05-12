import { error } from '@sveltejs/kit';
import { getRandomDuel } from '$lib/utils/duel';
import { getTranslatorsForBook } from '$lib/stores/translatorsStore';
import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = async ({ params, depends }) => {
	const book = params.book;

	depends(`app:book:${book}`);

	if (!book) {
		throw error(400, 'Book parameter not found for loading duel data.');
	}

	try {
		const [sampleData, bookSpecificTranslatorsMap] = await Promise.all([
			getRandomDuel(book),
			getTranslatorsForBook(book)
		]);

		if (!sampleData || !bookSpecificTranslatorsMap || bookSpecificTranslatorsMap.size === 0) {
			throw error(404, `Duel data or translator info not found for book: ${book}`);
		}

		return {
			sample: sampleData,
			translatorsInfoMap: bookSpecificTranslatorsMap,
			book: book
		};
	} catch (err: any) {
		console.error(`[+page.ts CLIENT LOAD] Failed to load duel page data for book "${book}":`, err);
		if (err.status && err.body) {
			throw err;
		}
		if (
			err.message?.includes('Failed to fetch dynamically imported module') ||
			err.message?.includes('NETWORK_ERROR')
		) {
			throw error(
				404,
				`Could not load data files for "${book}". Please check network or file paths.`
			);
		}
		throw error(
			err.status || 500,
			`Could not load duel: ${err.message || 'An unexpected error occurred'}`
		);
	}
};

// src/routes/books/[book]/vote/+page.ts
// import { error } from '@sveltejs/kit';
// import { getRandomDuel } from '$lib/utils/duel';
// import type { TranslationInfo, TranslationSample } from '$lib/types';
// import { getTranslatorsForBook } from '$lib/stores/translatorsStore';
// import { books } from '$lib/data/books'; // Import your books data
// import type { PageLoad } from './$types';

// export const ssr = false;

// export const load: PageLoad = async ({ params, depends }) => {
// 	const bookSlug = params.book; // Renamed for clarity

// 	depends(`app:book:${bookSlug}`);

// 	if (!bookSlug) {
// 		throw error(400, 'Book parameter not found for loading comparison data.');
// 	}

// 	try {
// 		const [sampleData, bookSpecificTranslatorsMap] = await Promise.all([
// 			getRandomDuel(bookSlug),
// 			getTranslatorsForBook(bookSlug)
// 		]);

// 		if (!sampleData || !bookSpecificTranslatorsMap || bookSpecificTranslatorsMap.size === 0) {
// 			throw error(404, `Comparison data or translator info not found for book: ${bookSlug}`);
// 		}

// 		// Get the full book name for titles/descriptions
// 		const bookData = books.find((b) => b.slug === bookSlug);
// 		const bookName =
// 			bookData?.title ||
// 			(bookSlug
// 				? bookSlug.charAt(0).toUpperCase() + bookSlug.slice(1).replace(/-/g, ' ')
// 				: 'Selected Book');

// 		const pageTitle = `Compare ${bookName} Translations`;
// 		const pageDescription = `Vote on anonymous passages from ${bookName} to find your preferred translation style.`;

// 		return {
// 			title: pageTitle,
// 			description: pageDescription,
// 			sample: sampleData,
// 			translatorsInfoMap: bookSpecificTranslatorsMap,
// 			book: bookSlug
// 		};
// 	} catch (err: any) {
// 		const bookDataForError = books.find((b) => b.slug === bookSlug);
// 		const bookNameForError =
// 			bookDataForError?.title ||
// 			(bookSlug
// 				? bookSlug.charAt(0).toUpperCase() + bookSlug.slice(1).replace(/-/g, ' ')
// 				: 'the selected book');

// 		console.error(
// 			`[+page.ts VOTE PAGE CLIENT LOAD] Failed to load data for "${bookNameForError}":`,
// 			err
// 		);
// 		if (err.status && err.body) {
// 			throw err;
// 		}
// 		if (
// 			err.message?.includes('Failed to fetch dynamically imported module') ||
// 			err.message?.includes('NETWORK_ERROR')
// 		) {
// 			throw error(
// 				404,
// 				`Could not load data files for "${bookNameForError}". Please check network or file paths.`
// 			);
// 		}
// 		throw error(
// 			err.status || 500,
// 			`Could not load comparison: ${err.message || 'An unexpected error occurred'}`
// 		);
// 	}
// };
