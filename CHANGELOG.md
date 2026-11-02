# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.2.2] - 2026-11-02

### Changed

- **Quieter source link**: the footer's "Source on GitHub" text link is now a small GitHub icon next to the copyright, the only GitHub link in the site chrome. `pnpm check:dist` checks there is exactly one.

## [2.2.1] - 2026-11-01

### Changed

- **Deploys run the full gate first**: `pnpm run deploy` now runs `pnpm check`, builds, runs `pnpm check:dist` and only then `wrangler deploy`, so nothing ships without passing lint, typecheck and tests.
- **No more Bunny deploy on push**: the `.github/workflows/deploy.yml` workflow is gone. Pushing to `main` only runs `release.yml`; the live site is deployed with `pnpm run deploy`.
- **Privacy page covers error reports**: `/privacy/` now says that Cloudflare asks your browser to report failed connections (Network Error Logging).

### Fixed

- **Links without a trailing slash work again**: once the service worker was installed, opening `/accessibility` or `/privacy` (no trailing slash) showed "Page not found". The service worker now redirects them to the slashed address (`/accessibility/`), offline too, and ignores query strings when it looks up a cached page.

## [2.2.0] - 2026-11-01

### Added

- **Accessibility, privacy and terms pages**: `/accessibility/`, `/privacy/` and `/terms/` describe what the site does today: the WCAG 2.2 AA target and its known gaps, the two localStorage keys, the service worker cache, and as-is terms of use. The footer links all three.
- **Source on GitHub**: the footer links the public repository, and the code is MIT-licensed (`LICENSE`).

### Changed

- **New address, spoonbowl.engg.app**: a Cloudflare Worker serves the site (`wrangler.jsonc`), deployed with `pnpm run deploy`. Canonical URLs, the sitemap and `robots.txt` use the new domain.
- **About and disclaimer pages**: the hosting copy names Cloudflare only, and questions go to the GitHub issue tracker.

## [2.1.0] - 2026-11-01

### Added

- **Cook mode remembers your ticks**: ingredient ticks are saved per recipe on the device, with a "2 of 6 gathered" count and a Clear ticks button.
- **Step mode progress and keys**: a segmented progress bar, larger Previous/Next buttons that stay in reach on phones, and Esc to leave step mode.
- **Phone menu**: below 640px the header fits in two rows, with the links behind a Menu button. Escape closes it and returns focus, search stays visible, and the links still show without JavaScript.
- **Search clear button**: the search box has a labelled clear button you can reach with the keyboard. It empties the query, closes the list and puts focus back in the input.

### Security

- **Astro 7**: Astro moves from 5.18 to 7.4, which clears the critical and high advisories `pnpm audit` reported for `astro`, `sharp`, `zod` and `esbuild`. `@vite-pwa/astro` stays on 1.2 through a `pnpm.peerDependencyRules` override, because 2.0 builds a broken service worker.

### Changed

- **Tooling**: ESLint 10 with `eslint-plugin-astro` 3, Vitest 5, and `@types/node` 24 to match the Node 24 runtime.
- **Design refresh**: a quieter, warmer look. Sentence-case Jost headings, a saffron accent on warm charcoal and stone grounds, and the bowl motif at a smaller scale. App icons follow the new palette.
- **Home page leads with cook mode**: the hero holds a real dish and links into cook mode, a walkthrough built from a real recipe shows how it works, and every recipe header has a Cook this recipe link.
- **Release workflow no longer uses npm**: `release.yml` bumps the `package.json` version with Node and stops staging the missing `package-lock.json`, which made the release step fail. It now does nothing when `[Unreleased]` is empty, creates releases with `gh release create`, and skips the backport PR if one is already open.

## [2.0.1] - 2026-10-31

### Changed

- **CI builds on Node 24**: `.github/workflows/deploy.yml` sets `node-version: 24` (was 22), so the deploy build runs on the same Node major as local development.

## [2.0.0] - 2026-10-30

### Breaking changes

- **Astro static site replaces the React SPA**: Vite + React + TanStack Router/Query are gone. The site is Astro 5.18 static output (`build.format: directory`), and client JS is vanilla TypeScript in `src/scripts/`. The host must serve `/x/` from `x/index.html`.
- **pnpm only**: npm is replaced by pnpm 10.34.8 (`packageManager` is pinned). `npm install` / `npm ci` and `package-lock.json` no longer apply.
- **Sitemap URL moved**: `/sitemap.xml` is replaced by `/sitemap-index.xml`, and `robots.txt` points to it. Resubmit it in Search Console.
- **Build needs DummyJSON**: recipes are fetched once at build time (`fetchAllRecipes`, one `limit=0` request, Zod-parsed). A failed fetch fails the build, and there is no snapshot fallback.
- **Wrong-slug recipe links 404**: old SPA links with a wrong slug (for example `/recipe/38/anything`) are no longer redirected.

### Added

- **Cook mode**: recipe pages have an ingredient checklist, a servings stepper, a step pager and a screen wake lock. The stepper changes servings and kcal only, because DummyJSON ingredients carry no quantities.
- **Search**: an accessible combobox searches the build-time `/search-index.json`.
- **Offline catalogue**: every recipe page and the search index are precached, so the whole catalogue works offline.
- **Tests**: a vitest suite (`pnpm test`) and a post-build gate (`pnpm check:dist`).

### Changed

- **No runtime data calls**: the browser makes no DummyJSON data requests. Images still load from `cdn.dummyjson.com`.
- **PWA**: now built with `@vite-pwa/astro`. The manifest and Workbox config live in `astro.config.mjs`, and offline navigation falls back to `/404.html`.
- **Titles**: cuisine and meal-type listing titles are unique ("X Cuisine Recipes", "X Meal Recipes").
- **Route announcements**: `RouteAnnouncer` is removed. Full-page navigation announces the new `<title>` natively.
- **CI**: `deploy.yml` uses `pnpm/action-setup` with a frozen lockfile and runs lint, typecheck, test, build and `check:dist` before the Bunny upload.
- **Design**: the site is redesigned around a bowl half-disc motif.

## [1.5.0] - 2026-04-24

### Added

- **Page transitions:** Smooth cross-fade on every route change using the View Transitions API (`defaultViewTransition: true` on the router) and CSS `::view-transition-*` pseudo-elements (duration-only; no translate/keyframe slide rules). Automatically disabled for users who prefer reduced motion.
- **Page title helper:** `src/lib/seo.ts` (`formatPageTitle`) for consistent per-route document titles (e.g. `About | Spoonbowl`) without duplicate `<title>` tags.
- **Route-specific title formats:** Filter pages (`/recipes/tag/*`, `/recipes/meal-type/*`, `/recipes/cuisine/*`, `/recipes/difficulty/*`) now use `"%s | Spoonbowl"`, and recipe detail pages use `"%s Recipe | Spoonbowl"`.
- **Meta descriptions for listing routes:** `<title>` and `<meta name="description">` added to `/recipes/cuisines`, `/recipes/difficulties`, `/recipes/meal-types`, and `/recipes/tags` index pages (previously missing).

### Fixed

- **Duplicate document titles in production:** Removed the static `<title>` from `index.html` and standardised Helmet `title` usage (most routes via `formatPageTitle()`, recipe detail via `formatRecipeTitle()`).

## [1.4.1] - 2026-04-24

## [1.4.0] - 2026-04-24

### Added

- **SEO foundations:** `public/robots.txt` and `public/sitemap.xml` (static routes) for crawler discovery.
- **`react-helmet-async`:** Added as a dependency; `HelmetProvider` wraps the app in `src/main.tsx`.
- **Per-route meta tags:** All dynamic routes (homepage, recipe detail, cuisine, tag, difficulty, meal-type, about) now set a unique `<title>`, `<meta name="description">`, `<link rel="canonical">`, and Open Graph / Twitter Card tags via `<Helmet>`.
- **JSON-LD Recipe schema:** Recipe detail pages (`/recipe/$recipeId/$slug`) emit a `application/ld+json` block with full `Recipe` structured data (ingredients, instructions, ratings, nutrition, timing).
- **Improved base OG tags in `index.html`:** Added `og:type`, `og:site_name`, `og:title`, `og:description`, `twitter:title`, and `twitter:description` as fallbacks for routes not yet rendering JS.

### Security

- **JSON-LD XSS mitigation:** `JSON.stringify` output is sanitised with `.replace(/</g, "\\u003c")` before injection into `<script type="application/ld+json">`, preventing `</script>` breakout from external API data.

### Fixed

- **Recipe detail a11y:** Removed invalid `aria-label` from the step-number `<span>` inside `<ol>` instructions; step position is now conveyed by native list semantics.
- **Recipe detail Helmet coverage:** Loading and error states now also render a `<Helmet>` with appropriate titles (`"Loading recipe… – Spoonbowl"` / `"Recipe not found – Spoonbowl"`).

## [1.3.1] - 2026-04-23

## [1.3.0] - 2026-04-20

### Added

- **`/about` route** (`src/routes/about.tsx`): short project overview; infrastructure (Cloudflare DNS, Railway) described in plain language aligned with other info pages.

### Changed

- **Legal / info copy:** Rewrote `accessibility`, `privacy`, `terms`, and `disclaimer` in a plain, site-wide tone (similar to Mindful-style transparency pages): Spoonbowl referred to as an informal project; privacy describes Cloudflare (DNS/network) and Railway (hosting), bundled fonts, optional PWA/service-worker cache, localStorage theme key (`spoonbowl-theme`), optional `sidebar_state` cookie when the sidebar primitive is used, third-party recipe data, and a **Last updated** line sourced from `PRIVACY_LAST_UPDATED_ISO`; accessibility points to **GitHub Issues** for reports (keyboard-focusable link + `aria-label`).
- **Docs:** `PROJECT.md`, `README.md`, and `.github/copilot-instructions.md` now describe production as **Cloudflare** (DNS / network edge) + **Railway** (app host), matching info routes; Copilot “Legal / info copy” row uses full `src/routes/...` paths and `/gdpr` → `/privacy`.
- **Footer & mobile menu:** Merged former “Legal” and “Accessibility” into a single **Information** column; `navigationLinks` now exports one **`siteLinks`** list (About, Privacy, Terms of use, Disclaimer, Accessibility). Desktop footer grid uses four columns on large screens.
- **`MobileBottomNav`:** Home, Search, and Menu icons are grouped, centered, ~1.5× size, inside a **width-fit** centered pill (`left-1/2 -translate-x-1/2 w-fit`) instead of a full-width bar with `justify-between`.
- **`src/lib/README.md`:** Dropped obsolete `legalDates` mention from the config table.
- **Tooling:** ESLint and Prettier ignore local editor and worktree folders so they do not break `npm run check`.

### Fixed

- **WCAG 2.4.2 Page Title:** All five info/legal routes (`/about`, `/accessibility`, `/disclaimer`, `/privacy`, `/terms`) now set a unique `document.title` via `useEffect`, so the `RouteAnnouncer` announces distinct page names on navigation.
- **`Footer` return type:** Added explicit `: JSX.Element` return type to satisfy the exported-function rule.

### Removed

- **`src/lib/config/legalDates.ts`** and split privacy components **`PrivacyCoreSections.tsx`**, **`PrivacyRegionalNotices.tsx`** — privacy body is inline in `privacy.tsx` only.

## [1.2.0] - 2026-04-12

### Added

- `MobileBottomNav` component: iOS-style floating pill fixed at the bottom of the screen (`md:hidden`), with Home, Search, and Menu icon buttons. Menu opens a full-screen Dialog with Browse, Legal, and Accessibility nav sections plus a Theme toggle. Safe-area-aware positioning via `bottom-nav-safe` CSS utility.
- `MobileSearchModal` component: full-screen search Dialog for mobile, reusing `useRecipeCombobox`, `RecipeSearchList`, and hover-prefetch pattern from the desktop `RecipeSearch`.

### Changed

- `Navbar`: removed mobile hamburger dropdown and associated state/refs/effects; logo centred on mobile via flex utilities; `ModeToggle` hidden on mobile (moved to `MobileBottomNav` menu).
- `Footer`: Browse, Legal, and Accessibility nav sections hidden on mobile (`hidden md:block`); branding column centred on mobile.
- `RootLayout`: added `<MobileBottomNav />`; footer gains `mb-20 md:mb-0` to clear the floating nav bar on mobile.
- `routes/index.tsx`: `RecipeSearch` section wrapped in `hidden md:block` — replaced by `MobileSearchModal` on mobile.
- `FeaturedRecipe`: CTA button is full-width on mobile (`w-full sm:w-auto`), calorie text centred on mobile; button label changed from "View Recipe" to "Let's Cook!".
- `RecipeCard` + `RecipeCardSkeleton`: image aspect ratio changed from `4/3` to `16/9` to match `FeaturedRecipe`.
- `ThemeProvider`: dynamically updates `theme-color` meta tags on every theme change so the browser status bar blends with the app background.
- `index.html`: replaced single `theme-color` with two media-query-targeted values (light/dark); `apple-mobile-web-app-status-bar-style` set to `black-translucent`.
- `index.css`: added `.bottom-nav-safe` utility class for iOS safe-area-aware bottom positioning.

### Fixed

- WCAG 2.1/2.2 AA contrast violations in light theme: darkened `--primary` (`0.65` → `0.57 L`) and `--spoon-amber` (`0.78` → `0.55 L`) for ≥4.5:1 on near-white backgrounds; Hard difficulty badge changed to `text-red-800` on light `bg-destructive/10`; search-list difficulty badges now use dark text on light backgrounds in light mode.
- `RecipeSearchList` selected-item highlight changed from `bg-orange-500/15 text-orange-100` (failing contrast in light mode) to `bg-primary/10 text-foreground`.
- `MobileSearchModal`: replaced bare `<h2>` with `<DialogTitle>` so Radix wires `aria-labelledby` correctly.
- `MobileBottomNav`: removed `aria-controls` referencing a conditionally-mounted Radix portal (broken reference when dialog is closed); removed redundant `role="banner"` from `<header>` in Navbar.
- `RootLayout`: removed duplicate `flex-1` class on `<main>`.
- `Footer`: removed redundant `role="contentinfo"` from `<footer>` (implicit semantic).
- Inline `style` prop in `MobileBottomNav` (CSP `unsafe-inline` risk) replaced with `.bottom-nav-safe` CSS utility class.
- Fixed broken route link in `$tag.tsx` SEO section: recipe links now correctly point to `/recipe/$recipeId/$slug` with both required params.
- Removed redundant `role="list"` from `<ol>` elements in recipe detail, tag, and meal-type pages (implicit list semantics).
- Removed invalid `aria-labelledby` from standalone `<header>` elements in cuisine, tags, and tag pages.
- Fixed `focus:ring-orange-500` to `focus-visible:ring-ring` in `RecipeSearch` for consistent design-system focus styling.
- Wrapped inline prefetch callbacks in `useCallback` in cuisine and tags pages to stabilise references across renders.

### Changed

- Renamed kebab-case hook files to camelCase (`use-recipe-queries.ts` → `useRecipeQueries.ts`, `use-mobile.ts` → `useMobile.ts`, `use-prefetch-recipe-detail.ts` → `usePrefetchRecipeDetail.ts`, `use-prefetch-cuisines-index.ts` → `usePrefetchCuisinesIndex.ts`); updated all import sites.
- Renamed `theme-provider.tsx` → `ThemeProvider.tsx` and `mode-toggle.tsx` → `ModeToggle.tsx` for consistent PascalCase component filenames.
- Reorganised `src/lib/` — domain utilities moved to `src/lib/utils/` (`cuisineUtils`, `difficultyUtils`, `mealTypeUtils`, `tagUtils`) and app-wide constants moved to `src/lib/config/` (`headings`, `legalDates`, `navigationLinks`, `not-found-messages`); all import paths updated.
- Ignored local editor config folders in `.gitignore`.

### Added

- `STRUCTURE.md` at project root: quick-reference navigation table and folder map for the codebase.
- Folder-level `README.md` in `src/components/`, `src/hooks/`, `src/lib/`, and `src/routes/` documenting each folder's purpose and conventions.

## [1.1.1] - 2026-04-12

## [1.1.0] - 2026-04-12

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

- Bolt.new references: the Bolt config file, README demo link, and default Bolt OG/Twitter image URLs in `index.html`.

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
[2.2.1]: https://github.com/sg208/spoonbowl/compare/v2.2.0...v2.2.1
[2.2.0]: https://github.com/sg208/spoonbowl/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/sg208/spoonbowl/compare/v2.0.1...v2.1.0
[2.0.1]: https://github.com/sg208/spoonbowl/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/sg208/spoonbowl/compare/v1.5.0...v2.0.0
[1.5.0]: https://github.com/sg208/spoonbowl/compare/v1.4.1...v1.5.0
[1.4.1]: https://github.com/sg208/spoonbowl/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/sg208/spoonbowl/compare/v1.3.1...v1.4.0
[1.3.1]: https://github.com/sg208/spoonbowl/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/sg208/spoonbowl/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/sg208/spoonbowl/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/sg208/spoonbowl/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/sg208/spoonbowl/compare/v1.0.0...v1.1.0
