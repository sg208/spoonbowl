# Spoonbowl

Recipe discovery **PWA** built with **Vite + React**, featuring fast navigation, caching, and a polished, accessible UI.

- **Browse recipes** on the home feed and open rich recipe detail pages
- **Explore by category (tags)** and **meal type**
- **PWA + offline-friendly caching** for API responses and images
- **Light/Dark/System** theme toggle

## Demo

- **Live demo**: (add link)

## Tech stack

- **Vite** + **React 19**
- **TanStack Router** (file-based routing in `src/routes/`)
- **TanStack React Query** (server-state caching)
- **Tailwind CSS v4** (design tokens in `src/index.css`)
- **PWA**: `vite-plugin-pwa` + Workbox runtime caching

## Quick start

```bash
npm ci
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

### Scripts

```bash
npm run dev        # start dev server
npm run build      # production build
npm run preview    # serve built app locally
npm run typecheck  # TypeScript check (no emit)
```

## App routes

These are defined via TanStack Router’s file-based routing:

- `/` — recipe feed
- `/recipe/:recipeId/:slug` — recipe detail
- `/recipes/tags` and `/recipes/tag/:tag` — browse by category
- `/recipes/meal-types` and `/recipes/meal-type/:mealType` — browse by meal type
- `/privacy`, `/terms`, `/disclaimer`, `/gdpr`, `/accessibility` — policy/accessibility pages

## Data source

Spoonbowl reads recipes from **DummyJSON**:

- Base: `https://dummyjson.com/recipes`
- No API keys or environment variables required.

See the fetchers in `src/lib/api.ts`.

## Caching & PWA behavior

PWA setup lives in `vite.config.ts` and uses Workbox runtime caching:

- **Recipe tags API** (`https://dummyjson.com/recipes/tags`): `StaleWhileRevalidate`
- **Recipes API** (e.g. `https://dummyjson.com/recipes`, `.../recipes/tag/:tag`): `NetworkFirst`
- **Recipe images CDN** (`https://cdn.dummyjson.com`): `CacheFirst`

In development, caches can make changes feel “sticky.” If you notice odd behavior, try a hard refresh or unregister the service worker in DevTools.

## Project structure

- `src/routes/` — pages (TanStack Router file routes)
- `src/lib/` — API + shared utilities (e.g. `api.ts`, `queryClient.ts`)
- `src/components/` — app components (navbar, cards, etc.)
- `src/components/ui/` — reusable UI primitives (shadcn-style)
- `public/icons/` — PWA icons

## Theming

Theme is controlled by `src/components/theme-provider.tsx` and stored in localStorage under:

- `spoonbowl-theme`

## Accessibility notes

- The root layout provides a focusable `main` region (`#main-content`) to support keyboard navigation and focus management.
