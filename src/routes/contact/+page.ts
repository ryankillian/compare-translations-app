import type { PageLoad } from './$types';

export const ssr = true; // Default, but good for clarity

export const load: PageLoad = () => {
	const pageTitle = 'Contact Us - Compare Translations';
	const pageDescription =
		'Send your feedback, questions, or suggestions about the Compare Translations website.';

	return {
		title: pageTitle,
		description: pageDescription
	};
};
