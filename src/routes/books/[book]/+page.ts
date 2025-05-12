import type { PageLoad } from './$types';
import { books } from '$lib/data/books'; // Your array of book objects

// load only used for page metadata
export const load: PageLoad = ({ params }) => {
	const bookSlug = params.book;
	const bookData = books.find((b) => b.slug === bookSlug);

	// Construct a more user-friendly book name, defaulting to capitalized slug
	const bookName =
		bookData?.title ||
		(bookSlug
			? bookSlug.charAt(0).toUpperCase() + bookSlug.slice(1).replace(/-/g, ' ')
			: 'Selected Book');

	const pageTitle = `${bookName} Overview`; // The root layout will add "| Compare Translations"
	const pageDescription = `Explore comparison options, translator details, and your personal results for ${bookName}.`;

	return {
		title: pageTitle,
		description: pageDescription,
		bookDisplayInfo: {
			name: bookName,
			slug: bookSlug
		}
	};
};
