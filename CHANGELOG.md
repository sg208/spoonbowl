# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- `recipeKeys.detail` usage in `RecipeSearch` replaced with the correct `recipeDetailKeys.detail` factory, so hover-prefetch populates the right query cache key.
- `useRecipeSearch` now trims the query before normalising to lowercase, preventing whitespace-padded inputs from bypassing the 3-character minimum and producing false-negative results.

### Changed

- `handleKeyDown` in `useRecipeCombobox` wrapped in `useCallback` with explicit deps to stabilise the function reference across renders.
- `RecipeSearch.tsx` split into three focused units: `useRecipeCombobox` hook (combobox state, keyboard, outside-click), `RecipeSearchList` presentational component (list rendering, match highlighting), and a thin `RecipeSearch` composition layer.
- `<li role="option">` items in `RecipeSearchList` now carry `tabIndex={-1}` and an `onKeyDown` handler so AT users in application mode can activate results directly.
- "No recipes found" message `role="status"` removed from the conditionally-mounted node; the persistent sr-only `aria-live` region now carries the full no-results announcement instead.

### Added

- **Autocomplete recipe search** on the home page between the featured recipe and recipe grid. Filters the existing `allRecipes` cache client-side (no extra API calls), requires 3+ characters, searches across name, cuisine, tags, meal types, and ingredients. Results render in a keyboard-navigable dropdown (arrow keys, Enter, Escape) with bold match highlighting and colour-coded difficulty badges. Includes animated rotating placeholder hints and a session-stable dynamic heading (50 options each).
- Search results pre-populate the TanStack Query detail cache via `setQueryData` on hover (`onMouseEnter`), enabling instant navigation to recipe detail pages without a network request.
- Live region (`role="status" aria-live="polite"`) announces result counts to screen readers as the user types.

### Changed

- Home route now persists a session-stable hero heading and recipes-section heading via `getSessionRandomText`, and narrows the homepage recipe grid to four session-stable picks (excluding the featured recipe when available).
- Browse navigation links now use trailing slashes in `src/lib/navigationLinks.ts` so shared `Navbar`/`Footer` links align with index route paths (`/recipes/tags/`, `/recipes/meal-types/`, `/recipes/cuisines/`).
- Unified primary browse navigation links in `src/lib/navigationLinks.ts` and refactored `Navbar`/`Footer` to render from that shared source of truth (including cuisines prefetch behavior and redundant list-role cleanup).
- Home route now preloads a single `allRecipes` query and derives both featured recipe and grid from that cache; featured selection is stabilized per session using `sessionStorage` and `FeaturedRecipe` layout was tightened for large screens.
- Home route featured selection now keeps `useMemo` pure by moving `sessionStorage`-touching featured-id resolution into a `useEffect` with local featured state.
- Home featured section no longer treats transient `featured === null` as an error; error UI now renders only for fetch errors, with skeleton fallback while featured state initializes.
- Reworked legal and accessibility copy for clarity and consistency across `/privacy`, `/terms`, `/disclaimer`, and `/accessibility`; legal `Last updated` dates are aligned to **April 11, 2026**.
- Privacy regional notices were consolidated into a single global rights section and core privacy sections were simplified into scannable bullet lists while preserving Cloudflare disclosure.
- Extracted `RecipeCardSkeleton` and `EmptyRecipes` into their own files (`src/components/RecipeCardSkeleton.tsx`, `src/components/EmptyRecipes.tsx`) to keep `RecipeCard.tsx` under the ~120-line soft cap; updated all consumers.
- Extracted shared `usePrefetchRecipeDetail` hook (`src/hooks/use-prefetch-recipe-detail.ts`) from inline prefetch logic in `RecipeCard` and `$tag`; both callers now use the single hook.
- Fixed stale JSDoc comment in `usePrefetchRecipeDetail` to reference the correct route path `/recipe/$recipeId/$slug` instead of `/recipe/$recipeId`.
- Removed internal branch-merge note from `[0.0.6]` changelog entry.

## [0.0.6] - 2026-04-10

### Added

- Prefetch on hover and keyboard focus (`onMouseEnter` + `onFocus`) for all navigable `<Link>` components that load data: tag index cards and SEO pills (`/recipes/tags/`), tag SEO recipe links (`/recipes/tag/$tag`), `RecipeCard` (recipe detail prefetch on every listing page), and missing `onFocus` on meal-type index SEO pills and "Other Meal Types" pills.
- **Route announcer (`RouteAnnouncer`):** visually-hidden `aria-live="polite"` region that announces the page title (or pathname fallback) to screen readers on every TanStack Router navigation; mounted in `RootLayout`.

### Fixed

- **RouteAnnouncer:** clear the live-region string synchronously before re-setting it so repeated navigations to the same page title are always re-announced by screen readers (fixes silent navigations when `document.title` is unchanged).
- Privacy policy (`PrivacyCoreSections`): add screen-reader-only `h2#privacy-intro` so the intro section’s `aria-labelledby="privacy-intro"` resolves to an accessible name.

### Changed

- **Privacy:** merged former `/gdpr` page into `/privacy` (single policy + regional notices); `/gdpr` now redirects to `/privacy`. Footer and Terms §1 link only to Privacy Policy. Split body into `src/components/legal/PrivacyCoreSections.tsx` and `src/components/legal/PrivacyRegionalNotices.tsx`. One Cloudflare privacy-policy link (in §3). Updated `PROJECT.md`, `README.md`, and `.github/copilot-instructions.md` to match.
- Incorporated RouteAnnouncer accessibility feature and fixes.

[0.0.6]: https://github.com/sg208/spoonbowl/compare/v0.0.5...v0.0.6

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
- **GDPR (`/gdpr` — historical):** CCPA categories table on the former GDPR page — mark IP and network-activity collection as **Yes** (Cloudflare edge logs only), consistent with edge logging disclosure elsewhere. Content is now under `/privacy`; `/gdpr` redirects to `/privacy`.
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
