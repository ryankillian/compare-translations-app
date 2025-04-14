import type { TranslationSample } from '$lib/types';

// Utility to pick a random sample and two translators
// export async function getRandomDuel(): Promise<TranslationSample> {
// 	const books = ['book05', 'book09', 'book10'];
// 	const randomBook = books[Math.floor(Math.random() * books.length)];
// 	const data = await import(`../data/iliad/samples/${randomBook}.json`);
// 	const sample = data.default;

// 	const translations = [...sample.translations];
// 	const selected = translations.sort(() => 0.5 - Math.random()).slice(0, 2);

// 	return {
// 		...sample,
// 		translations: selected
// 	};
// }

export async function getRandomDuel(book: string): Promise<TranslationSample> {
	const meta = await import(`../data/${book}/meta.json`);
	console.log('meta', meta);
	const sampleIds = meta.samples;

	const randomId = sampleIds[Math.floor(Math.random() * sampleIds.length)];

	const sample = await import(`../data/${book}/samples/${randomId}.json`);
	const translations = [...sample.default.translations];

	const selected = translations.sort(() => 0.5 - Math.random()).slice(0, 2);

	return {
		...sample.default,
		translations: selected
	};
}
