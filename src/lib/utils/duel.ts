import type { TranslationSample } from '$lib/types';

export async function getRandomDuel(book: string): Promise<TranslationSample> {
	const meta = await import(`../data/${book}/meta.json`);

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
