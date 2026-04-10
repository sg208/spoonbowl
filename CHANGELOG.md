# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.5] - 2026-04-10

### Added

- **Wrangler (from `develop`):** `wrangler.jsonc` for static assets from `dist` (Cloudflare Workers / Pages-style local preview); `wrangler` devDependency; `npm run deploy` (`build` + `wrangler deploy`).
- `.github/copilot-instructions.md`: condensed repo context for GitHub Copilot (under code review character limits); canonical detail remains in `PROJECT.md`.
- CodeRabbit integration config (`.coderabbit.yaml`) for automated PR reviews.
- (v0.0.5) Browse recipes by cuisine: `/recipes/cuisines` and `/recipes/cuisine/:cuisine` (DummyJSON cuisine list + filtered recipes), `cuisineUtils`, navbar link, and prefetch on hover/focus for the cuisines index query.
- Custom not-found UI (`NotFoundPage`, random recipe teaser) and root layout moved to `src/components/RootLayout.tsx`.

### Changed

- Legal pages (`/privacy`, `/gdpr`, `/terms`, `/disclaimer`): name **Cloudflare Pages** and Cloudflare’s network for hosting and edge logs; link to Cloudflare’s privacy policy; align effective/last-updated dates (April 10, 2026) on privacy, terms, and GDPR; add **Site availability** on disclaimer and **Infrastructure** under Terms §7.
- Cuisine recipe route (`/recipes/cuisine/$cuisine`): route `loader` loads the cuisines list with `ensureQueryData`, validates the `:cuisine` slug, and throws `notFound()` for unknown slugs; the page uses `Route.useLoaderData()` for `cuisine` and `allCuisines` (no client `useCuisines` gate before fetching recipes).
- `CuisineRecipesSeoAndRelated`: SEO paragraph uses `total ?? recipes.length` when the API omits `total`.
- `PROJECT.md`: “where to change” table — correct `NotFoundRandomRecipe` path under `src/components/`.
- Merged `origin/develop` into this branch; resolved overlapping `CHANGELOG` entries for CodeRabbit/Copilot work and React Query / TanStack Router / cuisine refactors from `develop`.
- CodeRabbit (`.coderabbit.yaml`): `auto_review.base_branches` includes `develop` so PRs into `develop` get automatic reviews (the repo default branch is still always in scope).
- CodeRabbit (`.coderabbit.yaml`): enable `request_changes_workflow` so reviews can request changes via the GitHub workflow.
- `PROJECT.md`: cross-links to `.github/copilot-instructions.md` and a maintenance note to keep the condensed Copilot mirror aligned when architecture or conventions change.
- React Query: hierarchical key factories in `src/lib/keys/recipeKeys.ts` and shared hooks in `src/hooks/use-recipe-queries.ts` for home grid, featured recipe, cuisine/tag/meal-type lists, recipe detail, and 404 random recipe; cuisine index prefetch uses `recipeMetaKeys.cuisines()`.
- TanStack Router: root route uses `createRootRouteWithContext` with `queryClient`; home route `loader` calls `ensureQueryData` for featured + grid queries; `main.tsx` passes `queryClient` on router context.
- Cuisine recipe page split into `src/components/cuisine/*` (breadcrumb, header, grid/error/empty, SEO and related cuisines); `src/lib/queryClient.ts` exports `STALE_TIME_5M_MS` for prefetch `staleTime` alignment.
- `PROJECT.md`: expanded repo mini-memory for onboarding and AI-assisted work — command table, “where to change X”, TanStack Router/Query conventions, shadcn/Tailwind/PWA notes.
- TanStack Router: enable `scrollRestoration` on `createRouter` instead of the deprecated `<ScrollRestoration />` component.
- (v0.0.5) Fix 404 random recipe teaser React Query key to be stable (enables caching).
- (v0.0.5) Cuisine browsing: only fetch cuisine recipes after cuisines list is fetched; prefetch cuisine results on keyboard focus (parity with hover).
- Merged latest `origin/develop`: `npm run preview` is `build` then `wrangler dev`; `.gitignore` ignores Wrangler cache (`.wrangler`), `.dev.vars*`, and `.env*` (with `!.env.example` / `!.dev.vars.example` kept).
- GDPR (`/gdpr`): CCPA categories table — mark IP and network-activity collection as **Yes** (Cloudflare edge logs only), consistent with edge logging disclosure elsewhere.
- `PROJECT.md`: Deploy row lists legal routes with full `src/routes/*.tsx` paths.

[0.0.5]: https://github.com/sg208/spoonbowl/compare/v0.0.4...v0.0.5

## [0.0.4] - 2026-04-10

### Changed

- Skip link visually-hidden styles use `clip-path` only; removed deprecated `clip` / `clip: auto` in `src/index.css`.

[0.0.4]: https://github.com/sg208/spoonbowl/compare/v0.0.3...v0.0.4

## [0.0.3] - 2026-04-10

### Removed

- Bolt.new references: `.bolt/config.json`, README demo link, and default Bolt OG/Twitter image URLs in `index.html`.

### Changed

- Privacy policy “Hosting Provider” section uses generic deployment/CDN language instead of naming a specific host.
- `PopoverTitle` renders as `<h2>` for correct heading semantics in popovers.

[0.0.3]: https://github.com/sg208/spoonbowl/compare/v0.0.2...v0.0.3

## [0.0.2] - 2026-04-10

### Added

- Disclaimer route (`/disclaimer`) with legal-style copy.
- ESLint flat config (`eslint.config.js`) with React, Hooks, jsx-a11y, and Prettier integration.
- Prettier config (`.prettierrc`, `.prettierignore`).
- `PROJECT.md` repo map (commands, tree, conventions).

### Changed

- README, index metadata, and legal/accessibility pages refreshed for consistency.
- TanStack Router routes and shared components updated; UI primitives reformatted for lint/style alignment.
- Dependencies updated for ESLint 9, Prettier 3, and related tooling.

[0.0.2]: https://github.com/sg208/spoonbowl/compare/v0.0.1...v0.0.2
