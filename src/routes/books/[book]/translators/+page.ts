import { error } from '@sveltejs/kit';
import type { TranslationInfo } from '$lib/types';
import type { PageLoad } from './$types';

interface TranslatorsFileModule {
	default: {
		[id: string]: Omit<TranslationInfo, 'id'>;
	};
}

export const load: PageLoad = async ({ params }) => {
	const book = params.book;

	try {
		const module = (await import(
			`../../../../lib/data/${book}/translators.json`
		)) as TranslatorsFileModule;

		const translatorsArray: TranslationInfo[] = Object.entries(module.default).map(
			([id, details]) => ({ id, ...details })
		);

		if (translatorsArray.length === 0 && book) {
			// Optionally, you might want to throw a 404 if a specific book is expected to have translators
			// but the file is empty or doesn't exist for that book.
			// For now, we'll allow an empty array to be returned, meaning "no translators listed for this book".
		}

		return {
			translators: translatorsArray,
			book: book // Pass the book param along if the component might need it for context
		};
	} catch (err: any) {
		if (err.code === 'MODULE_NOT_FOUND') {
			throw error(404, `Translator data not found for book: ${book}`);
		}
		throw error(
			500,
			`Failed to load translator data for ${book}: ${err.message || 'Unknown error'}`
		);
	}
};
