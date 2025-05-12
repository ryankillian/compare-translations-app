export interface DuelRecord {
	sampleId: string;
	book: number;
	bookSlug: string;
	description: string;
	lines: [number, number];
	left: string;
	right: string;
	leftName: string;
	rightName: string;
	leftYear?: string;
	rightYear?: string;
	winner: string | null;
	leftText: string[];
	rightText: string[];
	timestamp: string;
}

interface LinkInfo {
	url: string;
	label: string;
}

interface Quote {
	text: string; // Can contain simple HTML like <i>
	attribution: string;
}

// --- Core Types ---

/**
 * Represents the definitive information about a specific translation
 * featured for a given book (e.g., the chosen Pope edition for the Odyssey).
 * This is the object stored in your `translators.json`.
 */
export interface TranslationInfo {
	id: string; // Unique ID for this translator's entry (e.g., "pope", "chapman", "wilson")
	name: string; // Translator's full name (e.g., "Alexander Pope")
	year: string; // Publication year of the specific edition used
	form: 'verse' | 'prose';
	publisher?: string;
	public_domain?: boolean;
	description?: string; // Description of this specific translation/edition
	sample_source?: LinkInfo; // Link to the source text used for samples
	notes?: string; // Notes about this specific translation/edition
	buy_link?: LinkInfo; // Optional link to purchase this edition
	reviews?: Quote[]; // Reviews relevant to this translation/edition
}

/**
 * Represents the text lines from one specific translation within a sample passage.
 * It links back to the main TranslationInfo object.
 */
export interface SampleTextEntry {
	translation_id: string; // ID linking back to TranslationInfo.id (e.g., "pope", "chapman")
	text: string[]; // The actual lines for this specific sample passage
}

/**
 * Represents a specific sample passage comparing multiple translations.
 */
export interface TranslationSample {
	sample_id: string; // Unique ID for the sample passage (e.g., "odyssey-1-1-10")
	book: number; // e.g., 1 for Odyssey Book 1
	lines: [number, number]; // Line range [start, end]
	description: string; // Description of the passage context
	translations: SampleTextEntry[]; // Array linking translations and their sample text
}
