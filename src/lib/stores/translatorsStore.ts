// src/lib/stores/translatorsStore.ts (from previous example - still good)
import { writable } from 'svelte/store';
import type { TranslationInfo } from '$lib/types';

interface BookTranslatorsCache {
	[bookSlug: string]: Map<string, TranslationInfo>;
}

const store = writable<BookTranslatorsCache>({}); // The actual Svelte store

// This is the public API for your cache
export async function getTranslatorsForBook(
	bookSlug: string
): Promise<Map<string, TranslationInfo>> {
	let currentCacheValue: BookTranslatorsCache = {};
	const unsubscribe = store.subscribe((value) => {
		// Get current value from store
		currentCacheValue = value;
	});
	unsubscribe(); // Immediately unsubscribe as we only need the current value

	if (currentCacheValue[bookSlug]) {
		// console.log(`[TranslatorsCache] Cache HIT for ${bookSlug}`);
		return currentCacheValue[bookSlug];
	}

	// console.log(`[TranslatorsCache] Cache MISS for ${bookSlug}. Fetching...`);
	try {
		// Path needs to be relative to where this module is if dynamic import is used
		// Or use a fixed path from $lib if possible, but dynamic imports need relative/absolute paths
		const translatorsFileModule = await import(`../data/${bookSlug}/translators.json`); // Adjust path based on this file's location

		const newMap = new Map<string, TranslationInfo>();
		const translatorEntries = Object.entries((translatorsFileModule as any).default) as [
			string,
			Omit<TranslationInfo, 'id'>
		][];
		translatorEntries.forEach(([id, info]) => newMap.set(id, { ...info, id }));

		store.update((cachedData) => {
			// Update the Svelte store
			cachedData[bookSlug] = newMap;
			return cachedData;
		});
		return newMap;
	} catch (e) {
		console.error(`[TranslatorsCache] Failed to load translators.json for ${bookSlug}`, e);
		throw e;
	}
}

// Optional: Function to clear the cache if needed
export function clearTranslatorsCache() {
	store.set({});
}
