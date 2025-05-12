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
