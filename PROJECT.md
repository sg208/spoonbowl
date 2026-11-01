# PROJECT.md — Spoonbowl

Repository mini-memory and shared context for planning, onboarding, and **AI-assisted development**. Humans should treat it the same way: paths, conventions, and where to change things.

**GitHub Copilot:** a condensed mirror lives in [`.github/copilot-instructions.md`](.github/copilot-instructions.md) (stays under Copilot code review's character limit). **This file is canonical** for the full tree and tables.

**Maintenance:** When you change architecture, commands, or major conventions here, update [`.github/copilot-instructions.md`](.github/copilot-instructions.md) too.

---

## Quick facts

| Key            | Value                                                                                                                         |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Stack**      | Astro 7.4 static (`output: static`, `build.format: directory`) + TypeScript + Tailwind CSS v4 (Vite plugin)                   |
| **Pages**      | File-based in `src/pages/*`; shell in `src/layouts/BaseLayout.astro`                                                          |
| **Data**       | Build time only: `src/lib/api.ts` `fetchAllRecipes` (one `limit=0` fetch, Zod 4 parse) → `src/lib/catalog.ts` `getCatalog()`  |
| **Client JS**  | Vanilla TS only: `src/scripts/{theme,cook-mode,search}.ts`                                                                    |
| **PWA**        | `@vite-pwa/astro` 1.2 — manifest + Workbox in `astro.config.mjs`; `navigateFallback` `/404.html`                              |
| **SEO**        | `@astrojs/sitemap` → `/sitemap-index.xml`; `public/robots.txt` points to it                                                   |
| **Tooling**    | pnpm 10.34.8 (`packageManager`), vitest 5, ESLint 10 (+ astro, jsx-a11y), Prettier (+ astro plugin)                           |
| **Deploy**     | Cloudflare Worker static assets (`wrangler.jsonc`) at spoonbowl.engg.app; `pnpm run deploy`. `deploy.yml` (Bunny) is separate |
| **Path alias** | `@` → `./src` (`tsconfig.json`, `vitest.config.ts`)                                                                           |
| **Design**     | One-motif direction (bowl half-disc) — `design.md`; competitive report `docs/competitive-report.md`                           |

Astro 7 runs with `@vite-pwa/astro` 1.2 via a `pnpm.peerDependencyRules` override (1.2 peers Astro ≤5; 2.0 emits a broken `sw.js`).

---

## Commands

| Script            | Purpose                                                     |
| ----------------- | ----------------------------------------------------------- |
| `pnpm install`    | Install (CI uses `--frozen-lockfile`)                       |
| `pnpm dev`        | `astro dev` (service worker bypassed)                       |
| `pnpm build`      | `astro build` → `dist/`                                     |
| `pnpm preview`    | `astro preview`                                             |
| `pnpm typecheck`  | `astro check`                                               |
| `pnpm lint`       | `eslint .`                                                  |
| `pnpm test`       | `vitest run` (`src/**/*.test.ts`, `scripts/**/*.test.mjs`)  |
| `pnpm check:dist` | `scripts/check-dist.mjs` — post-build assertions on `dist/` |
| `pnpm check`      | lint + typecheck + format:check + test                      |
| `pnpm fix`        | lint:fix + format — before commit                           |
| `pnpm run deploy` | `pnpm build` + `wrangler deploy`                            |

---

## Project tree

```text
src/
├── pages/                  index, about, privacy, terms, disclaimer, accessibility, 404
│   ├── gdpr.astro          meta-refresh redirect → /privacy
│   ├── search-index.json.ts build-time search index endpoint
│   ├── recipe/[id]/[slug].astro
│   └── recipes/            cuisines/ cuisine/[cuisine] meal-types/ meal-type/[mealType]
│                           tags/ tag/[tag] difficulties/ difficulty/[difficulty]
├── layouts/BaseLayout.astro
├── components/             Navbar, Footer, RecipeCard, RecipeGrid, EmptyRecipes, ListingPage,
│                           ListingHeader, IndexList, PageHeader, PageHeadPhotos, RecipeMeta, RecipeJsonLd,
│                           CookMode, SearchBox, ThemeToggle (all .astro)
├── scripts/                theme.ts, cook-mode.ts, search.ts
├── styles/global.css       Tailwind v4 entry + design tokens
└── lib/
    ├── api.ts catalog.ts seo.ts listing.ts
    ├── cook/               pager, scale, wakeLock (+ tests)
    ├── search/             filterRecipes (+ test)
    ├── utils/slug.ts time.ts
    ├── config/             listingCopy, navigationLinks, not-found-messages
    └── __fixtures__/
scripts/                    check-dist.mjs (+ test)
public/                     robots.txt, icons/
```

---

## Where to change X

See the project tree above and the folder map in [`STRUCTURE.md`](STRUCTURE.md).

---

## Conventions & guardrails

### Data fetching

- Build time only. One `limit=0` fetch, Zod-parsed; a failed fetch fails the build (no snapshot fallback).
- Never fetch recipe data at runtime. Client search reads `/search-index.json`.
- `src/lib/api.ts` is the sole `fetch` site.
- DummyJSON ingredients carry no quantities (0/417), so cook-mode scaling changes servings and kcal only.

### SEO (document titles)

- Titles come from `BaseLayout.astro` using `formatPageTitle()` / `formatRecipeTitle()` (`src/lib/seo.ts`).
- Exactly one `<title>` per page, unique across the site; `pnpm check:dist` asserts it.
- Listing titles: "X Cuisine Recipes", "X Meal Recipes".

### Accessibility

- Skip link `href="#main"` is the first focusable element; one `h1` and one `main` per page.
- No route announcer: navigation is a full document load, so the new `<title>` is announced natively.
- Search is an ARIA combobox; cook mode has a plain no-JS fallback (full ingredient and step lists).
- Non-essential motion respects `prefers-reduced-motion`.

### TypeScript

- No `enum` (use `const` object or string union); no `any` without an inline reason.
- Arrow functions; `const` always; no `console.log`.
- Booleans prefixed `is`/`has`/`can`/`should`; DOM event parameter named `event`.

### Components

- ~120 lines per file soft cap; split by responsibility.
- Conditional classes with plain template strings or arrays.

### Repo hygiene

- Run `pnpm fix` before pushing; `pnpm check:dist` must pass after `pnpm build`.
- Legal pages (`privacy`, `terms`, `disclaimer`, `accessibility`, `about`): ask before editing.

### PWA

- Configured in `astro.config.mjs`. Pages and `search-index.json` are precached; `cdn.dummyjson.com` images use runtime `CacheFirst`.
- `manifestTransforms` is an identity function so precache URLs stay `x/index.html` and `/x/` requests hit the cache.
- Test offline behaviour with `pnpm build && pnpm preview`; the dev server bypasses the SW.

### Deploy risks

- Bunny upload (`deploy.yml`) is not the live host; if it is used, the pull zone must serve `/x/` → `x/index.html`.
- `/sitemap.xml` is replaced by `/sitemap-index.xml`.
