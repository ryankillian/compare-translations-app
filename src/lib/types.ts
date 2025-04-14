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
	winner: string | null;
	leftText: string[];
	rightText: string[];
	timestamp: string;
}

export interface Translation {
	translator_id: string; // e.g. "pope", "chapman-1611"
	translator_name: string; // e.g. "George Chapman (1611)"
	year: number;
	form?: 'verse' | 'prose';
	public_domain?: boolean;
	source?: string;
	links?: {
		view?: string;
		buy?: string;
	};
	version?: string; // optional, like "1611" or "modern"
	text: string[]; // array of lines
}

export interface TranslationSample {
	book: number;
	sample_id: string;
	lines: [number, number];
	description: string;
	translations: Translation[];
}

export interface Translator {
	id: string;
	name: string;
	year: number;
	form: 'verse' | 'prose';
	description?: string;
	public_domain?: boolean;
	source?: string;
	links?: {
		view?: string;
		buy?: string;
	};
}
