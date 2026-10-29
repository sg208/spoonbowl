# Spoonbowl — GitHub Copilot instructions

Repository-wide context for Copilot Chat, PR review, and coding agents. This file is intentionally short (GitHub Copilot code review reads only the first ~4,000 characters). **Full detail:** [`PROJECT.md`](../PROJECT.md) at the repo root is canonical.

## Quick facts

| Key       | Value                                                                        |
| --------- | ---------------------------------------------------------------------------- |
| Stack     | Astro 5.18 static (`build.format: directory`) + TypeScript + Tailwind CSS v4 |
| Pages     | `src/pages/*` (file routes); layout `src/layouts/BaseLayout.astro`           |
| Data      | Build time only — `src/lib/api.ts` `fetchAllRecipes`, `src/lib/catalog.ts`   |
| Client JS | Vanilla TS only — `src/scripts/{theme,cook-mode,search}.ts`                  |
| PWA       | `@vite-pwa/astro` — `astro.config.mjs` Workbox                               |
| Hosting   | **Cloudflare** (DNS / network edge) + **Bunny.net** (storage + CDN)          |
| Tooling   | pnpm 10.34.8, vitest 4, Zod 4; alias `@` → `./src`                           |

## Commands

| Script            | Purpose                                    |
| ----------------- | ------------------------------------------ |
| `pnpm dev`        | Dev server                                 |
| `pnpm build`      | Static build to `dist/`                    |
| `pnpm check:dist` | Assert the built `dist/` (run after build) |
| `pnpm typecheck`  | `astro check`                              |
| `pnpm test`       | vitest                                     |
| `pnpm check`      | lint + typecheck + format:check + test     |
| `pnpm fix`        | lint:fix then format — before commit       |

## Key paths

- **Pages:** file-based; dynamic segments use `[param]` (e.g. `[cuisine]`, `[id]`).
- **API:** `src/lib/api.ts` — the only `fetch` site; never fetch recipe data at runtime.
- **SEO titles:** `BaseLayout.astro` with `formatPageTitle()` / `formatRecipeTitle()` from `src/lib/seo.ts`; one unique `<title>` per page.
- **404 copy:** `src/lib/config/not-found-messages.ts`.
- **Legal pages:** `src/pages/{about,privacy,terms,accessibility,disclaimer}.astro`; `/gdpr` redirects to `/privacy` (`src/pages/gdpr.astro`). Ask before editing.

## Guardrails

- **TS:** No `enum` (use const or unions); no bare `any`.
- **Components:** ~120 lines/file soft cap; a11y before layout polish; `event` not `e` for DOM.
- **Motion:** respect `prefers-reduced-motion`.
- **Repo:** run `pnpm fix` before push; `pnpm check:dist` must pass after `pnpm build`.

Full tables, tree, and patterns: **[`PROJECT.md`](../PROJECT.md)**.
