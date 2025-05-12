import type { PageLoad } from './$types';

export const ssr = true; // Default, but good to be explicit for clarity

export const load: PageLoad = () => {
	const pageTitle = 'About Compare Translations';
	const pageDescription =
		'Learn about the purpose of Compare Translations, how it helps you find your preferred literary translation style, and details on data privacy and copyright.';

	return {
		title: pageTitle,
		description: pageDescription
	};
};
