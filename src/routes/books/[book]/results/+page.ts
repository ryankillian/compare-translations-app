import type { PageLoad } from './$types';
import { books } from '$lib/data/books';

export const ssr = true;

export const load: PageLoad = ({ params }) => {
	const bookSlug = params.book;
	const bookData = books.find((b) => b.slug === bookSlug);
	const bookName =
		bookData?.title ||
		(bookSlug ? bookSlug.charAt(0).toUpperCase() + bookSlug.slice(1).replace(/-/g, ' ') : 'Book');

	const pageTitle = `Your ${bookName} Translation Results`; // Root layout adds "| Compare Translations"
	const pageDescription = `View your personal voting history and translation preferences for ${bookName}.`;

	return {
		title: pageTitle,
		description: pageDescription,
		bookDisplayInfo: {
			name: bookName,
			slug: bookSlug
		}
	};
};
