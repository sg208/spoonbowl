# Spoonbowl

Recipe discovery **PWA** built with **Astro** as a static site, featuring a cook mode, offline access to the whole catalogue, and a polished, accessible UI.

- **Browse recipes** on the home feed and open rich recipe detail pages
- **Explore by category (tags)**, **meal type**, and **cuisine**
- **Cook mode** on every recipe: ingredient checklist, servings stepper, step-by-step pager, and screen wake lock
- **Search** with an accessible combobox over a build-time index
- **PWA + offline-friendly caching**: the whole catalogue is precached; images are cached at runtime
- **Light/Dark/System** theme toggle

## Demo

- **Live demo**: (add link)

## Tech stack

- **Production**: **Cloudflare** (DNS + network) → **Bunny.net** (storage + CDN); deployed via GitHub Actions on push to `main`
- **Astro 5** static output (`build.format: directory`), file-based pages in `src/pages/`
- **Vanilla TypeScript** for client scripts (`src/scripts/`); no UI framework
- **Tailwind CSS v4** (design tokens in `src/styles/global.css`)
- **Zod 4** validates the DummyJSON response at build time
- **PWA**: `@vite-pwa/astro` + Workbox (configured in `astro.config.mjs`)
- **pnpm 10** and **vitest 4**

## Quick start

```bash
pnpm install
pnpm dev
```

Open the printed local URL (typically `http://localhost:4321`).

### Scripts

```bash
pnpm dev          # start dev server
pnpm build        # production build (fetches DummyJSON once)
pnpm preview      # preview the built dist
pnpm typecheck    # astro check
pnpm lint         # eslint
pnpm test         # vitest
pnpm check:dist   # assert the built dist (run after pnpm build)
pnpm check        # lint + typecheck + format:check + test
pnpm fix          # lint:fix + format
pnpm deploy       # build, then wrangler deploy (Cloudflare)
```

## App routes

These are generated from `src/pages/`:

- `/` — recipe feed
- `/recipe/:id/:slug` — recipe detail
- `/recipes/tags` and `/recipes/tag/:tag` — browse by category
- `/recipes/meal-types` and `/recipes/meal-type/:mealType` — browse by meal type
- `/recipes/cuisines` and `/recipes/cuisine/:cuisine` — browse by cuisine
- `/recipes/difficulties` and `/recipes/difficulty/:difficulty` — browse by difficulty
- `/about` — how the site works
- `/privacy`, `/terms`, `/disclaimer`, `/accessibility` — policy/accessibility pages (`/privacy` includes GDPR/CCPA/CalOPPA notices; `/gdpr` redirects to `/privacy`)

## Data source

Spoonbowl reads recipes from **DummyJSON** once, at build time:

- Request: `https://dummyjson.com/recipes?limit=0`
- No API keys or environment variables required.
- No recipe data is requested at runtime; images load from `cdn.dummyjson.com`.

See `fetchAllRecipes` in `src/lib/api.ts` and `getCatalog()` in `src/lib/catalog.ts`.

## Caching & PWA behavior

PWA setup lives in `astro.config.mjs` and uses Workbox:

- **Pages and `search-index.json`**: precached, so the whole catalogue works offline
- **Recipe images CDN** (`https://cdn.dummyjson.com`): `CacheFirst` at runtime
- Offline navigation falls back to `/404.html`

In development, caches can make changes feel “sticky.” If you notice odd behavior, try a hard refresh or unregister the service worker in DevTools.

## Project structure

- `src/pages/` — pages (Astro file routes)
- `src/layouts/` — `BaseLayout.astro`
- `src/lib/` — API, catalogue, slugs, SEO, cook-mode and search logic
- `src/components/` — Astro components (navbar, cards, cook mode, etc.)
- `src/scripts/` — vanilla TS client scripts
- `public/icons/` — PWA icons

## Theming

Theme is controlled by `src/scripts/theme.ts` and stored in localStorage under:

- `spoonbowl-theme`

## Accessibility notes

- `BaseLayout.astro` provides a skip link to the focusable `main` region (`#main`) for keyboard navigation.
- Navigation is a full page load, so each new page `<title>` is announced natively by screen readers.
