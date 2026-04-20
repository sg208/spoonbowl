# Spoonbowl — GitHub Copilot instructions

Repository-wide context for Copilot Chat, PR review, and coding agents. This file is intentionally short (GitHub Copilot code review reads only the first ~4,000 characters). **Full detail:** [`PROJECT.md`](../PROJECT.md) at the repo root is canonical.

## Quick facts

| Key          | Value                                                                        |
| ------------ | ---------------------------------------------------------------------------- |
| Stack        | Vite + React 19 + TypeScript + Tailwind CSS v4                               |
| Router       | TanStack Router — `src/routes/*`; tree in `src/routeTree.gen.ts` (generated) |
| Server state | TanStack React Query — `src/lib/queryClient.ts`                              |
| UI           | shadcn-style in `src/components/ui/*` — `components.json`, `npx shadcn add`  |
| PWA          | `vite-plugin-pwa` — `vite.config.ts` Workbox                                 |
| Hosting      | Production: **Cloudflare Pages** (see `README.md`)                           |
| Alias        | `@` → `./src`                                                                |

**Queries:** Many routes use inline `queryKey` arrays. Prefer key factories under `src/lib/keys/` when adding or refactoring queries.

## Commands

| Script              | Purpose                                 |
| ------------------- | --------------------------------------- |
| `npm run dev`       | Dev server                              |
| `npm run build`     | Production build (no `tsc`)             |
| `npm run preview`   | Build + Wrangler local preview (`dist`) |
| `npm run deploy`    | Build + `wrangler deploy`               |
| `npm run typecheck` | `tsc --noEmit`                          |
| `npm run check`     | lint + typecheck + format:check         |
| `npm run fix`       | lint:fix then format — before commit    |

## Key paths

- **Generated:** `src/routeTree.gen.ts` — never edit.
- **Root route:** `src/routes/__root.tsx` → `RootLayout`, 404.
- **Route announcer:** `src/components/RouteAnnouncer.tsx` — `aria-live` SPA a11y; mounted in `RootLayout`.
- **Routes:** file-based; dynamic segments use `$` (e.g. `$cuisine`, `$recipeId`).
- **API:** `src/lib/api.ts` — typed wrappers only; avoid raw `fetch` in components.
- **404 copy:** `src/lib/config/not-found-messages.ts`.

## Where to change (short)

| Area                 | Location                                                                                                    |
| -------------------- | ----------------------------------------------------------------------------------------------------------- |
| Shell / nav / footer | `RootLayout.tsx`, `Navbar.tsx`, `Footer.tsx`                                                                |
| Legal / info copy    | `routes/about.tsx`, `privacy.tsx`, `terms.tsx`, `accessibility.tsx`, `disclaimer.tsx`; `/gdpr` → `/privacy` |
| New route            | `src/routes/**`                                                                                             |
| Recipe UI            | `RecipeCard.tsx`, `RecipeCardSkeleton.tsx`, `EmptyRecipes.tsx`, `FeaturedRecipe.tsx`                        |
| Domain helpers       | `src/lib/config/headings.ts`, `src/lib/utils/*Utils.ts`                                                     |
| Styles / tokens      | `src/index.css`                                                                                             |
| PWA caching          | `vite.config.ts`                                                                                            |

## Guardrails

- **Router:** `<Link>` / `useNavigate` for in-app navigation; search params as source of truth for filters. Optional: `validateSearch`, `loader`, `ensureQueryData`; invalid `params` → `throw notFound()` in the loader when the UI should 404.
- **Data:** React Query for server state; no `useEffect`+`useState` fetch for that.
- **TS:** No `enum` (use const or unions); no bare `any`.
- **Components:** ~120 lines/file soft cap; a11y before layout polish; `event` not `e` for DOM.
- **Repo:** ESLint ignores `routeTree.gen.ts`; run `npm run fix` before push.

## TanStack (summary)

- Keys: prefer `src/lib/keys/*` factories; invalidate at appropriate scope.
- Global defaults in `queryClient.ts`: `staleTime` 5m, `gcTime` 6m, `retry` 2, `refetchOnWindowFocus` false.
- shadcn: add via CLI; `cn()` from `src/lib/utils.ts`.

Full tables, tree, and patterns: **[`PROJECT.md`](../PROJECT.md)**.
