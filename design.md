# design.md — Spoonbowl

## Architecture

- **Shape**: Astro 5 static site (`output: static`, `build.format: directory`) — `astro.config.mjs`
- **Pages**: `src/pages/**` → one HTML file per route; dynamic routes via `getStaticPaths` from the catalogue
- **Client JS**: vanilla TS only — `src/scripts/{theme,cook-mode,search,showcase}.ts`; no UI framework
- **Styles**: Tailwind v4 + tokens `src/styles/global.css`; motion `src/styles/motion.css`; cook mode `src/styles/cook.css`
- **PWA**: `@vite-pwa/astro` in `astro.config.mjs`; hooks hand-linked in `src/layouts/BaseLayout.astro`

## Data flow

1. Build → `getCatalog()` (`src/lib/catalog.ts`, memoised) → `fetchAllRecipes()` (`src/lib/api.ts`, one `limit=0` fetch, Zod parse)
2. Catalogue → derived cuisines / tags / meal types / difficulties + slugs (`src/lib/utils/slug.ts`)
3. Pages render static HTML; `src/pages/search-index.json.ts` emits the slim search index
4. Runtime: browser loads HTML + `/search-index.json`; images from `cdn.dummyjson.com`
5. Service worker precaches every HTML page + search index; images CacheFirst at runtime

## Key decisions

- **Build-time data**: one fetch per build; a failed fetch fails the build. WHY: fast delivery, no runtime API dependency; deploy never uploads a broken build. `src/lib/api.ts`
- **No ClientRouter / RouteAnnouncer / view transitions**: MPA reloads announce the new `<title>` natively. `@view-transition` was removed (jittered against reveal entrances). `src/styles/motion.test.ts`
- **Plain `<img>` to cdn.dummyjson.com**: `astro:assets` remote optimisation would add ~50 files per Bunny deploy (one curl each) for little offline gain
- **Vanilla TS over islands**: cook mode + search are ~100–150 lines each; a framework runtime is not worth it
- **Directory URLs + identity `manifestTransforms`**: keeps `/x/` URLs from the SPA and makes `/x/` hit the precache. `astro.config.mjs`
- **Astro pinned to 5.x**: `@vite-pwa/astro` 1.2 peers Astro ≤5
- **Cook mode scaling**: DummyJSON ingredients have no quantities (0/417), so servings + kcal scale and the page says so. `src/lib/cook/scale.ts`

## Design system

- **Direction**: taste-skill `one-motif` (seed 1426093563) — the bowl half-disc is the only shape: hero, photo masks, button, bullets. `.taste-skill/notes.md`
- **Type**: Jost (self-hosted, `@fontsource/jost`)
- **Palette**: brand orange accent on dark ground; light theme stone ground. Roles in `src/styles/global.css`
- **Gate**: taste-skill `inspect.mjs` 0 FAIL at 1440/768/390 for `/`, `/recipes/cuisines/`, a recipe page
