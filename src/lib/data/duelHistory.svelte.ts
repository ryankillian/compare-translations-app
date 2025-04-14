import type { DuelRecord } from '$lib/types';

const STORAGE_PREFIX = 'duelHistory:';

// Helpers
function getStorageKey(bookSlug: string) {
	return `${STORAGE_PREFIX}${bookSlug}`;
}

// Read duel history
export function getDuelHistory(bookSlug: string): DuelRecord[] {
	if (typeof localStorage === 'undefined') return [];
	const raw = localStorage.getItem(getStorageKey(bookSlug));
	return raw ? JSON.parse(raw) : [];
}

// Save duel history
export function saveDuelHistory(bookSlug: string, history: DuelRecord[]) {
	localStorage.setItem(getStorageKey(bookSlug), JSON.stringify(history));
}

// Record new duel
export function recordDuel(bookSlug: string, entry: DuelRecord) {
	const history = getDuelHistory(bookSlug);
	history.push(entry);
	saveDuelHistory(bookSlug, history);
}

// Clear duel history
export function clearHistory(bookSlug: string) {
	localStorage.removeItem(getStorageKey(bookSlug));
}

// Stats
export function getWinStats(bookSlug: string) {
	const history = getDuelHistory(bookSlug);

	const appearances: Record<string, number> = {};
	const wins: Record<string, number> = {};

	for (const duel of history) {
		// Track appearances
		appearances[duel.leftName] = (appearances[duel.leftName] || 0) + 1;
		appearances[duel.rightName] = (appearances[duel.rightName] || 0) + 1;

		// Track wins
		if (duel.winner) {
			const name = duel.winner === duel.left ? duel.leftName : duel.rightName;
			wins[name] = (wins[name] || 0) + 1;
		}
	}

	const uniqueNames = new Set([...Object.keys(appearances), ...Object.keys(wins)]);

	return Array.from(uniqueNames)
		.map((name) => {
			const total = appearances[name] || 0;
			const won = wins[name] || 0;
			return {
				name,
				wins: won,
				appearances: total,
				winRate: total > 0 ? won / total : 0
			};
		})
		.sort((a, b) => b.winRate - a.winRate || b.appearances - a.appearances);
}
