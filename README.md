# Compare Translations

A minimalist web app that helps you decide which translation of a classical work best fits your style.

## 🎯 Goal

Help readers choose the right translation for them by comparing short, side-by-side excerpts from major translators.

## ✅ Features

- View excerpts from multiple translations of a passage
- Vote for your preferred version
- Track your voting history and translator win stats
- Browse available translators per book

Currently available:

- **The Iliad**
- **The Odyssey**

## 🧱 Tech Stack

- Svelte 5
- SvelteKit
- Tailwind CSS
- LocalStorage (for vote tracking)

## 🚀 Deployment

The site is live at:

🌐 [https://which-translation.vercel.app/](https://which-translation.vercel.app/)

## 🗂 Structure

```
/src/routes/books/[book]/
  vote/         → Voting interface
  results/      → Local results page
  translators/  → Translator info

/data/
  iliad/
  odyssey/
  meta.json     → Passage metadata

/lib/
  components/   → UI components
  data/         → Local storage utilities
```

## 🔮 Future Work

- Global ranking using Elo rating
- Supabase backend for vote syncing
- Addition of more sample passages
- Expansion to more works (e.g. Aeneid, Don Quixote)

## ⚠️ Data Usage

The `/data/` folder contains curated sample passages assembled with significant editorial effort.

> Please do **not reuse or redistribute** this data without permission.

## 📄 License

- Code: MIT License
- Sample data: Not licensed for reuse. See `/data/NOTICE.txt`
