# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.5] - 2026-04-10

### Added

- CodeRabbit integration config (`.coderabbit.yaml`) for automated PR reviews.
- (v0.0.5) Browse recipes by cuisine: `/recipes/cuisines` and `/recipes/cuisine/:cuisine` (DummyJSON cuisine list + filtered recipes), `cuisineUtils`, navbar link, and prefetch on hover/focus for the cuisines index query.
- Custom not-found UI (`NotFoundPage`, random recipe teaser) and root layout moved to `src/components/RootLayout.tsx`.

### Changed

- `PROJECT.md`: expanded repo mini-memory for onboarding and AI-assisted work — command table, “where to change X”, TanStack Router/Query conventions, shadcn/Tailwind/PWA notes.
- TanStack Router: enable `scrollRestoration` on `createRouter` instead of the deprecated `<ScrollRestoration />` component.
- (v0.0.5) Fix 404 random recipe teaser React Query key to be stable (enables caching).
- (v0.0.5) Cuisine browsing: only fetch cuisine recipes after cuisines list is fetched; prefetch cuisine results on keyboard focus (parity with hover).

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
