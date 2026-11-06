# Wanderlust Explorer

Multi-page Next.js app for browsing a catalog of 100 travel experiences. Search and filters live in the URL, and favorites are kept in React state for the current visit.

## Design References

The layout takes cues from three public discovery products:

- [Airbnb Experiences](https://www.airbnb.com/experiences) — image cards, a heart control for saving, and a simple path from a grid to a detail page.
- [GetYourGuide](https://www.getyourguide.com/) — a search field stacked with category and destination filters, plus price and rating on every card.
- [Atlas Obscura](https://www.atlasobscura.com/) — a direct path from a short home introduction into a catalog, without a second competing call to action in the hero.

## Run

Requirements: Node.js 22 and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other commands:

```bash
npm run lint
npm run build
npm start
npm run verify
```

`npm run verify` checks the dataset shape, the filter rules (regex search, independent category and destination filters, and the combination of all three), and the SHA-256 hashes of the SIGNAL token files and footer lockup.

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Hero and a link to the explorer |
| `/experiences` | Full catalog, search, and filters |
| `/experiences/[id]` | One experience from the local dataset |
| `/favorites` | Experiences saved during this visit |
| `/profile` | Mock traveler profile and the current favorites count |

Shared links look like `/experiences?search=sailing&category=adventure&destination=Croatia`. The explorer reads those parameters on load, fills the inputs, and shows the matching cards.

## Structure

```text
src/app/                  routes, including not-found and error views
src/components/           Navbar, SearchBar, FilterBar, ExperienceCard, page views
src/data/experiences.ts   100 experiences and the Experience values
src/hooks/useExperiences.ts  filtering hook
src/hooks/useFilters.ts   URL query read/write
src/lib/filterExperiences.ts  pure title/category/destination filter
src/lib/motion-runtime.ts    reduced-motion preference and animation cleanup
src/styles/signal/        SIGNAL tokens and motion values, copied unchanged
src/types/experience.ts   Experience interface
public/images/            local placeholder photos
public/brand/lockups/     footer lockup, copied byte for byte
brand/originals/          source marks kept for provenance, not shown in the UI
```

## Technical decisions

- The app was scaffolded with `create-next-app` (TypeScript, Tailwind CSS, ESLint, App Router, `src/`, import alias `@/*`).
- The catalog in `src/data/experiences.ts` was generated with an AI coding assistant. Every record has `id`, `title`, `description`, `category`, `destination`, `price`, `rating`, and `imageUrl`. Categories are Adventure, Culture, Food, Wellness, and Nature.
- Title search uses a case-insensitive regular expression. The typed term is escaped before `new RegExp(term, "i")` so characters such as `(` do not throw. Category and destination filters are case-insensitive, apply on their own, and combine with the search.
- Query updates use `useSearchParams`, `usePathname`, and `router.replace`. Replacing the URL keeps the address shareable without adding a history entry per keystroke.
- Favorite ids live in `useState` inside `AppShell`, which stays mounted across client navigations. Pages read that state through a small built-in React context and pass `isFavorite` and `onToggleFavorite` into `ExperienceCard`. No external state library is used. Favorites are not written to `localStorage`; a refresh clears them.
- `useEffect` updates `document.title` on the explorer when the query changes, and on the detail page when the experience changes. Dependency arrays list only those values.
- The detail page also lists up to three other experiences in the same country. Those cards receive the same favorite props as the explorer.
- Card photos are local placeholders in `public/images`. They are not photographs of the named destinations.
- The interface uses the SIGNAL academic tokens: Arial and Helvetica, the light palette in `src/styles/signal/tokens.css`, and an 8px radius on controls and cards. No remote fonts are loaded.
- The footer shows the 4Geeks × Divinivid lockup as an academic visual credit. It is not an official partnership, and the files are the originals named in `brand/README.md`.
- Favorites stay in `useState` for the visit. The assignment leaves `localStorage` out of scope, so a refresh clears the list on purpose.
