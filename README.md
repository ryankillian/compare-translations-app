# Compare Translations

A web application to help you choose which English translation of literary classics best fits your personal reading preference.

## 🎯 Purpose

Navigating the many translations of works like _The Iliad_ or _The Odyssey_ can be challenging. This tool aims to simplify that decision by allowing users to:

- Directly compare brief, anonymous text passages from different translators side-by-side.
- Vote for the style they prefer.
- View results based on their votes to identify translators whose style consistently resonates with them.

## ✅ Core Features

- Side-by-side anonymous passage comparison for selected works.
- Voting mechanism to indicate preference.
- Local storage of voting history and preference statistics per book.
- Information page for available translators for each work.

**Currently Featuring:**

- _The Iliad_
- _The Odyssey_

## 🛠️ Tech Stack

- **Framework:** SvelteKit (with Svelte 5)
- **Styling:** Tailwind CSS
- **Client-Side Storage:** Browser `localStorage` (for user votes and preferences)
- **Deployment:** Vercel

## 🚀 Live Site

Deployed at: [https://comparetranslations.vercel.app/](https://comparetranslations.vercel.app/)

## 🗂️ Project Structure & Page Types

The site utilizes different SvelteKit features for page rendering and data loading:

- **`src/routes/`**

  - `+page.svelte`: **Homepage.**
    - Static content with client-side dynamic elements.
    - `<title>` and `<meta name="description">` set directly in the component.
  - `about/+page.svelte` & `about/+page.ts`: **About Page.**
    - Static content.
    - `+page.ts` provides `title` and `description` for SSR via the root layout.
  - `contact/+page.svelte` & `contact/+page.ts`: **Contact Page.**
    - Client-side form submission logic.
    - `+page.ts` provides `title` and `description` for SSR via the root layout.
  - `+layout.svelte`: **Root Layout.**
    - Provides global structure (e.g., footer).
    - Handles templating for `<title>` and `<meta name="description">` based on data from `+page.ts` files or page-level defaults.

- **`src/routes/books/[book]/`**

  - `+layout.svelte`: **Book-Specific Layout.**
    - Provides navigation (Vote, Results, Translators) and breadcrumbs for a specific book.
  - `+page.svelte` & `+page.ts`: **Book Overview Page.**
    - Displays a notice about site status.
    - `+page.ts` provides `title`, `description`, and book name for SSR.
  - `vote/+page.svelte` & `vote/+page.ts`: **Passage Comparison (Vote) Page.**
    - Core interactive feature.
    - `+page.ts` has `export const ssr = false;` - its `load` function runs client-side to fetch passage and translator data.
    - `<title>` and `<meta name="description">` are set dynamically within `vote/+page.svelte` due to client-side data loading.
  - `results/+page.svelte` & `results/+page.ts`: **Results Page.**
    - Displays user's local voting history and statistics (from `localStorage`).
    - `+page.ts` provides `title`, `description`, and book name for SSR. Main data is client-side.
  - `translators/+page.svelte` & `translators/+page.ts`: **Translators List Page.**
    - `+page.ts` loads translator data (from local JSON files) and provides `title` and `description` for SSR.

- **`src/lib/`**

  - `components/`: Reusable Svelte components (e.g., `LinkButton.svelte`, `ComparisonPassageCard.svelte`).
  - `data/`:
    - `books.ts`: Defines available books.
    - `duelHistory.svelte.ts`: Utilities for `localStorage` interaction.
    - `[book_slug]/meta.json`: Lists sample passage IDs for a book.
    - `[book_slug]/translators.json`: Contains metadata for translators of a book.
    - `[book_slug]/samples/`: Contains JSON files with text excerpts for comparison. _(Note: Most of these are kept private locally and only a few are in the public repository for demonstration)._
  - `stores/`: Client-side stores/caches (e.g., `translatorsStore.ts`).
  - `types.ts`: TypeScript type definitions.
  - `utils/`: Utility functions (e.g., `getRandomDuel.ts`).

- **`static/`**: Favicons, default Open Graph image.

## 🔮 Future Enhancements

- Addition of more sample passages for existing works.
- Expansion to include more literary works.
- Implementation of a global results table using a backend (e.g., Supabase) and potentially an Elo rating system for translations.
- User accounts (optional, for syncing results across devices).

## 📄 License

- **Code:** MIT License
- **Data Samples:** The curated literary excerpts are subject to the copyright of their respective translators and publishers. Their use on this site is for limited, non-commercial educational and comparative purposes under the principles of 'fair use'. The excerpt data itself is not licensed for reuse from this repository. See the About page on the live site for more details.
