# Spoonbowl

Live at https://spoonbowl.engg.app. Source: https://github.com/sg208/spoonbowl.

Spoonbowl is a recipe site you can cook from. It is a static Astro build that works as a PWA, so once it is installed the whole catalogue is available offline. Every recipe page has a cook mode with an ingredient checklist, a servings stepper, a one-step-at-a-time pager and a screen wake lock so the phone stays on while your hands are busy.

You can browse recipes from the home feed, or by category (tags), meal type, cuisine and difficulty. A search box built on an accessible combobox looks recipes up in an index generated at build time. The theme follows your system setting, and you can switch it to light or dark yourself.

## Stack

- Astro 7, static output with `build.format: directory`; pages are file routes in `src/pages/`
- TypeScript, with plain TS for the client scripts in `src/scripts/` (there is no UI framework)
- Tailwind CSS 4 through its Vite plugin; design tokens are in `src/styles/global.css`
- Zod 4 checks the recipe data when the site is built
- `@vite-pwa/astro` and Workbox handle the service worker, configured in `astro.config.mjs`
- pnpm 10 (pinned in `packageManager`), Vitest 5, ESLint 10 and Prettier

You need Node 24 (CI builds on 24) and pnpm. If you have Corepack, `corepack enable` picks up the pinned pnpm version.

## Running it

```bash
pnpm install
pnpm dev
```

The dev server prints a local URL, usually `http://localhost:4321`. The service worker does not run in dev. To try offline behaviour, build the site and preview it:

```bash
pnpm build && pnpm preview
```

## Scripts

| Command             | What it does                                                |
| ------------------- | ----------------------------------------------------------- |
| `pnpm dev`          | Start the Astro dev server                                  |
| `pnpm build`        | Build the static site into `dist/` (fetches DummyJSON once) |
| `pnpm preview`      | Serve the built `dist/` locally                             |
| `pnpm typecheck`    | Run `astro check`                                           |
| `pnpm lint`         | Run ESLint, including the Astro accessibility rules         |
| `pnpm lint:fix`     | ESLint with `--fix`                                         |
| `pnpm format`       | Format everything with Prettier                             |
| `pnpm format:check` | Check formatting without writing                            |
| `pnpm fix`          | `lint:fix`, then `format`                                   |
| `pnpm test`         | Run the Vitest suite once                                   |
| `pnpm check:dist`   | Check the built `dist/` (run it after `pnpm build`)         |
| `pnpm check`        | Lint, typecheck, format check and tests in one go           |
| `pnpm run deploy`   | Build, then `wrangler deploy` to Cloudflare                 |

## Tests

The tests use Vitest and sit next to the code they cover as `src/**/*.test.ts`. They cover the API client and its Zod parsing, the catalogue, listing pages, slugs, time totals, SEO titles, search filtering, and the cook-mode pager, servings scaling and wake lock. One more test, `scripts/check-dist.test.mjs`, checks the dist checker itself.

`pnpm check:dist` runs after a build. It confirms that every page has exactly one unique `<title>`, that the manifest and service worker are linked, and that the service worker precaches the recipe pages and caches images from `cdn.dummyjson.com`.

Before you push, run:

```bash
pnpm check && pnpm build && pnpm check:dist
```

## Data

The recipes come from DummyJSON. The build makes one request to `https://dummyjson.com/recipes?limit=0` and turns the result into static pages. If that request fails, the build fails; there is no snapshot to fall back on. Visitors' browsers never request recipe data, only the images from `cdn.dummyjson.com`. The fetch code is `fetchAllRecipes` in `src/lib/api.ts`, and `getCatalog()` in `src/lib/catalog.ts` builds the catalogue from it.

Building the site needs no API keys or environment variables.

## Routes

- `/` is the recipe feed
- `/recipe/:id/:slug` is a recipe page with cook mode
- `/recipes/tags` and `/recipes/tag/:tag` list recipes by category
- `/recipes/meal-types` and `/recipes/meal-type/:mealType` list them by meal type
- `/recipes/cuisines` and `/recipes/cuisine/:cuisine` list them by cuisine
- `/recipes/difficulties` and `/recipes/difficulty/:difficulty` list them by difficulty
- `/about` explains how the site works
- `/privacy`, `/terms`, `/disclaimer` and `/accessibility` are the policy pages, linked from the footer; `/gdpr` redirects to `/privacy`

## Offline and caching

Every page and `search-index.json` are precached, so the full catalogue works offline after the first visit. Images from `cdn.dummyjson.com` are cached the first time they load (CacheFirst). An offline navigation the cache can't answer gets `/404.html`.

If the site seems stuck on an old version while you work on it, do a hard refresh or unregister the service worker in DevTools.

## Deploying

The live site is a Cloudflare Worker that serves `dist/` as static assets. The config is in `wrangler.jsonc`, and DNS for engg.app is on Cloudflare. To deploy:

```bash
pnpm run deploy
```

That builds the site and runs `wrangler deploy`. It needs wrangler 4 and the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` environment variables.

Two GitHub workflows run on pushes to `main`. `deploy.yml` lints, typechecks, tests, builds and runs `check:dist`, then uploads `dist/` to Bunny Storage and purges the Bunny pull zone. That upload is separate from the live site. It reads four repository secrets: `BUNNY_STORAGE_ZONE_NAME`, `BUNNY_STORAGE_ACCESS_KEY`, `BUNNY_PULL_ZONE_ID` and `BUNNY_PULL_ZONE_KEY`. `release.yml` reads the `[Unreleased]` section of `CHANGELOG.md` and, when it has entries, bumps the version, tags a GitHub release and opens a PR that brings the bump back to `develop`.

## Project layout

- `src/pages/` holds the routes
- `src/layouts/BaseLayout.astro` is the shared layout, and it also links the manifest and the service worker
- `src/components/` holds the Astro components
- `src/lib/` holds the API client, catalogue, listing, SEO, search and cook-mode logic
- `src/scripts/` holds the browser scripts for the theme, cook mode, search and the home showcase
- `scripts/check-dist.mjs` is the post-build checker
- `public/` holds the icons and `robots.txt`

## Accessibility

`BaseLayout.astro` has a skip link to the main region (`#main`). Moving between pages loads a full new document, so screen readers announce each page's `<title>` without extra code. ESLint runs the strict `jsx-a11y` rules on every `.astro` file.

## More docs

- `design.md` covers the architecture and the main decisions
- `CHANGELOG.md` lists the releases

## License

The code is MIT licensed (see `LICENSE`). Recipe text and photos come from DummyJSON and belong to their owners.
