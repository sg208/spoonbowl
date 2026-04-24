# PROJECT.md — Spoonbowl

Repository mini-memory and shared context for planning, onboarding, and **AI-assisted development** (IDE-integrated assistants and similar tools). Humans should treat it the same way: paths, conventions, and where to change things.

**GitHub Copilot:** a condensed mirror for repository-wide instructions lives in [`.github/copilot-instructions.md`](.github/copilot-instructions.md) (stays under Copilot code review’s character limit). **This file (`PROJECT.md`) is canonical** for the full tree, tables, and TanStack patterns.

**Claude Code:** [`CLAUDE.md`](CLAUDE.md) is the token-efficient source of truth Claude reads first — file map, route map, data-fetching decisions, and hard rules. Keep it aligned when architecture changes.

**Maintenance:** When you change architecture, commands, or major conventions here, update [`CLAUDE.md`](CLAUDE.md) and [`.github/copilot-instructions.md`](.github/copilot-instructions.md) so all mirrors stay aligned.

---

## Quick facts

| Key               | Value                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Stack**         | Vite + React 19 + TypeScript + Tailwind CSS v4                                                                                                                                                                                                                                                                                                                                                 |
| **Router**        | TanStack Router — file-based routes in `src/routes/*`; generated tree in `src/routeTree.gen.ts`                                                                                                                                                                                                                                                                                                |
| **Server state**  | TanStack React Query — global defaults in `src/lib/queryClient.ts`                                                                                                                                                                                                                                                                                                                             |
| **UI primitives** | shadcn-style (Radix-based), source-owned in `src/components/ui/*` — CLI config in `components.json`                                                                                                                                                                                                                                                                                            |
| **PWA**           | `vite-plugin-pwa` + Workbox runtime caching (see `vite.config.ts`)                                                                                                                                                                                                                                                                                                                             |
| **Deploy**        | **Cloudflare** (DNS + network) → **Bunny.net** (storage + CDN); GitHub Actions on push to `main` (`.github/workflows/deploy.yml`). Aligns with `src/routes/about.tsx`, `privacy.tsx`, `terms.tsx`, and `disclaimer.tsx`. Informational routes: `src/routes/about.tsx`, `privacy.tsx`, `terms.tsx`, `accessibility.tsx`, `disclaimer.tsx`; `src/routes/gdpr.tsx` redirects `/gdpr` → `/privacy` |
| **Path alias**    | `@` → `./src` (`vite.config.ts` + `tsconfig.app.json` `paths`)                                                                                                                                                                                                                                                                                                                                 |

**Today’s codebase note:** recipe-related screens use **`src/lib/keys/recipeKeys.ts`** and **`src/hooks/useRecipeQueries.ts`**. For new queries, extend those (or add a new key file) instead of new inline-only keys (see [TanStack conventions](#tanstack-conventions)).

---

## Commands

| Script                       | What it does                                                               |
| ---------------------------- | -------------------------------------------------------------------------- |
| `npm run dev`                | Start dev server                                                           |
| `npm run build`              | Production build (`vite build` only — does **not** run `tsc`)              |
| `npm run preview`            | Build, then local preview via **Wrangler** (`wrangler dev`, `dist` assets) |
| `npm run preview:4000`       | Preview on port 4000 (`vite preview`, `--strictPort`)                      |
| `npm run build:preview:4000` | Build then preview on port 4000                                            |
| `npm run deploy`             | Build then **`wrangler deploy`** (Cloudflare)                              |
| `npm run typecheck`          | `tsc --noEmit`                                                             |
| `npm run check`              | `lint` + `typecheck` + `format:check` (good before CI / push)              |
| `npm run lint`               | ESLint (report only)                                                       |
| `npm run lint:fix`           | ESLint auto-fix                                                            |
| `npm run format`             | Prettier write                                                             |
| `npm run format:check`       | Prettier check (CI)                                                        |
| `npm run fix`                | `lint:fix` → `format` (use before committing)                              |

---

## Project tree (deep but pruned)

Dynamic route segments use the `$` prefix (e.g. `$cuisine`, `$recipeId`).

```
.
├── CHANGELOG.md
├── README.md
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── eslint.config.js
├── .prettierrc
├── .prettierignore
├── components.json
├── public/
│   └── icons/
│       └── favicon.svg
└── src/
    ├── main.tsx
    ├── index.css
    ├── routeTree.gen.ts              # generated; don't edit (will be overwritten)
    ├── routes/
    │   ├── __root.tsx                # root route: RootLayout + notFoundComponent
    │   ├── index.tsx
    │   ├── accessibility.tsx
    │   ├── about.tsx
    │   ├── gdpr.tsx                # redirect → /privacy (bookmarks)
    │   ├── privacy.tsx
    │   ├── disclaimer.tsx
    │   ├── terms.tsx
    │   ├── recipe/
    │   │   └── $recipeId/
    │   │       └── $slug.tsx
    │   └── recipes/
    │       ├── meal-types/
    │       │   └── index.tsx
    │       ├── meal-type/
    │       │   └── $mealType.tsx
    │       ├── cuisines/
    │       │   └── index.tsx
    │       ├── cuisine/
    │       │   └── $cuisine.tsx
    │       ├── tags/
    │       │   └── index.tsx
    │       ├── tag/
    │       │   └── $tag.tsx
    │       ├── difficulties/
    │       │   └── index.tsx
    │       └── difficulty/
    │           └── $difficulty.tsx
    ├── components/
    │   ├── RootLayout.tsx             # app shell: Navbar/Footer/Outlet + Toaster + RouteAnnouncer
    │   ├── RouteAnnouncer.tsx         # aria-live route-change announcer (SPA a11y)
    │   ├── NotFoundPage.tsx
    │   ├── NotFoundRandomRecipe.tsx
    │   ├── cuisine/                 # cuisine listing page sections (breadcrumb, header, grid, SEO)
    │   ├── Navbar.tsx
    │   ├── Footer.tsx
    │   ├── FeaturedRecipe.tsx
    │   ├── RecipeCard.tsx
    │   ├── RecipeCardSkeleton.tsx     # skeleton placeholder for recipe cards
    │   ├── EmptyRecipes.tsx           # empty-state UI for recipe grids
    │   ├── ModeToggle.tsx
    │   ├── ThemeProvider.tsx
    │   └── ui/
    │       ├── ... shadcn-style primitives (Button, Dialog, Select, etc.)
    │       └── sonner.tsx             # toaster wrapper
    ├── hooks/
    │   ├── useMobile.ts
    │   ├── usePrefetchCuisinesIndex.ts
    │   ├── usePrefetchRecipeDetail.ts  # prefetch a recipe detail query on hover/focus
    │   └── useRecipeQueries.ts        # shared useQuery wrappers + keys from lib/keys
    └── lib/
        ├── keys/
        │   └── recipeKeys.ts          # React Query key factories (recipes, meta lists, 404)
        ├── api.ts                     # typed fetch wrappers (DummyJSON recipes)
        ├── queryClient.ts             # React Query defaults (staleTime/gcTime/retry) + STALE_TIME export
        ├── utils.ts                   # cn() / class merging utilities
        ├── config/
        │   ├── headings.ts            # page/section heading copy
        │   ├── navigationLinks.ts     # browse + siteLinks (footer / mobile menu)
        │   └── not-found-messages.ts  # 404 copy pool + random picker
        └── utils/
            ├── cuisineUtils.ts
            ├── difficultyUtils.ts
            ├── mealTypeUtils.ts
            └── tagUtils.ts
```

---

## Where to change X

| What                                                                  | Where                                                                                                                                                 |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| App shell / layout                                                    | `src/components/RootLayout.tsx` (wired from `src/routes/__root.tsx`)                                                                                  |
| Screen-reader route announcements                                     | `src/components/RouteAnnouncer.tsx`                                                                                                                   |
| Top navigation                                                        | `src/components/Navbar.tsx`                                                                                                                           |
| Footer                                                                | `src/components/Footer.tsx`                                                                                                                           |
| Privacy / terms / accessibility / about / disclaimer                  | `src/routes/privacy.tsx`, `terms.tsx`, `accessibility.tsx`, `about.tsx`, `disclaimer.tsx`                                                             |
| Theme / dark mode                                                     | `src/components/ThemeProvider.tsx`, `src/components/ModeToggle.tsx`                                                                                   |
| New page / route                                                      | Add a file under `src/routes/**` (tree regenerates into `src/routeTree.gen.ts`)                                                                       |
| Recipe cards / list UI                                                | `src/components/RecipeCard.tsx`, `src/components/RecipeCardSkeleton.tsx`, `src/components/EmptyRecipes.tsx`, `src/components/FeaturedRecipe.tsx`      |
| 404 page / random recipe                                              | `src/components/NotFoundPage.tsx`, `src/components/NotFoundRandomRecipe.tsx`, copy pool `src/lib/config/not-found-messages.ts`                        |
| Domain helpers (headings, filters, labels)                            | `src/lib/config/headings.ts`, `src/lib/utils/mealTypeUtils.ts`, `src/lib/utils/cuisineUtils.ts`, `src/lib/utils/tagUtils.ts`                          |
| API calls                                                             | `src/lib/api.ts` — add a typed wrapper; avoid scattering `fetch` in components                                                                        |
| React Query defaults / shared recipe queries                          | `src/lib/queryClient.ts`, `src/lib/keys/recipeKeys.ts`, `src/hooks/useRecipeQueries.ts`                                                               |
| PWA / cache rules                                                     | `vite.config.ts` → `VitePWA({ workbox: { runtimeCaching: […] } })`                                                                                    |
| Global styles                                                         | `src/index.css`                                                                                                                                       |
| UI primitives                                                         | `src/components/ui/*` — add via `npx shadcn add <component>`; don’t hand-copy from docs                                                               |
| Lint rules                                                            | `eslint.config.js`                                                                                                                                    |
| Prettier                                                              | `.prettierrc`, `.prettierignore`                                                                                                                      |
| Type-safe search params / loaders (when adding or refactoring routes) | In the route file: `validateSearch` (e.g. Zod), optional `loader` + `ensureQueryData` to prefetch (see [TanStack conventions](#tanstack-conventions)) |

---

## Conventions & guardrails

### Router

- `src/routeTree.gen.ts` is **auto-generated**; never edit it by hand.
- Route files own **screen composition**; reusable UI lives in `src/components/*`.
- Dynamic segments use the `$` prefix (`$recipeId`, `$cuisine`, etc.).
- **Optional refactor / new routes:** put `validateSearch` and loaders next to the route component for typed search params and prefetch; many existing routes use `useQuery` in the component only — that is fine until you choose to consolidate.

### Data fetching

- Prefer **typed wrappers** in `src/lib/api.ts` for all network calls.
- Prefer **React Query** for remote data; avoid `useEffect` + `useState` fetch patterns for server state.
- **Preferred when introducing or refactoring queries:** central **query key factories** in `src/lib/keys/` and thin hooks in `src/hooks/` (see below). Existing code may still use inline keys until migrated.

### TypeScript

- No `enum`; use a `const` object or string union instead.
- No `any` without a short comment explaining why.
- Prefer explicit return types on exported functions and hooks.

### Functions — fat arrow (new / edited code)

- **Prefer arrow functions** for components, hooks, helpers, handlers, and callbacks. Older files may still use `function`; align when you touch them.
- Default exports are allowed for route modules (TanStack Router); the **route component** should still be an arrow function when you add or rewrite it.

```ts
// Preferred
export const MyComponent = (): JSX.Element => {
  /* … */
}
const handleClick = () => {
  /* … */
}

// Route file pattern
export const Route = createFileRoute("/")({
  component: HomePage,
})
const HomePage = (): JSX.Element => {
  /* … */
}
```

### Components & hooks

- **≤ ~120 lines per file** (soft cap); split by responsibility.
- Accessibility before responsive layout (labels, keyboard, focus order).
- Declarative UI from data/state; avoid long imperative chains in templates.
- Named handlers for non-trivial logic; one-line inline handlers are OK for trivial wiring.
- No single-letter names except loop indices; use `event` (not `e`) for DOM events.

### Repo hygiene

- **ESLint** ignores `src/routeTree.gen.ts` — keep that ignore in `eslint.config.js`.
- **`npm run fix`** before push: ESLint `--fix`, then Prettier (`eslint-config-prettier` order).

---

## TanStack conventions

### Current vs preferred

| Area           | Today                                                                 | Preferred for new work / refactors                                                                    |
| -------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Query keys     | Legacy inline keys in some places                                     | `recipeKeys` / `recipeMetaKeys` / `recipeDetailKeys` in `src/lib/keys/recipeKeys.ts` for recipe flows |
| Queries        | `useQuery` inside route components                                    | Optional: wrap in `src/hooks/use*.ts`; keep side-effects (toasts, invalidation) in the hook           |
| Router context | Root uses `createRootRouteWithContext` — **`queryClient` on context** | Loaders can use `context.queryClient` (e.g. home `ensureQueryData`)                                   |
| Loaders        | Not used everywhere                                                   | Recommended when adding routes or fixing double-fetch: `loader` + `ensureQueryData`                   |

### React Query — query key factory (preferred pattern)

Introduce files under `src/lib/keys/` as you consolidate keys. Keys are plain `const` objects returning arrays — no classes.

```ts
// src/lib/keys/recipeKeys.ts (example shape)
export const recipeKeys = {
  all: () => ["recipes"] as const,
  lists: () => [...recipeKeys.all(), "list"] as const,
  list: (filters: RecipeFilters) => [...recipeKeys.lists(), filters] as const,
  details: () => [...recipeKeys.all(), "detail"] as const,
  detail: (id: number) => [...recipeKeys.details(), id] as const,
}
```

- Import the factory; avoid hard-coded duplicate key arrays in components.
- Invalidate at the broadest useful scope: `recipeKeys.all()` clears recipe scope; `recipeKeys.detail(id)` targets one.

### React Query — query / mutation wrappers (preferred)

```ts
export const useRecipe = (id: number) =>
  useQuery({
    queryKey: recipeKeys.detail(id),
    queryFn: () => api.getRecipe(id),
    staleTime: 5 * 60 * 1000,
  })

export const useUpdateRecipe = () =>
  useMutation({
    mutationFn: api.updateRecipe,
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.detail(id) })
    },
  })
```

- Prefer hooks calling `useRecipe(id)` over raw `useQuery({ queryKey: […] })` in pages once keys exist.
- Keep `onSuccess` / `onError` side-effects in the hook when using this pattern.

### React Query — optimistic updates (when needed)

Use `onMutate` + `onError` rollback for list mutations; skip for detail-only updates unless latency hurts.

### React Query — global defaults (`src/lib/queryClient.ts`)

| Option                 | Value   | Reason                                 |
| ---------------------- | ------- | -------------------------------------- |
| `staleTime`            | 5 min   | Fewer redundant background refetches   |
| `gcTime`               | 6 min   | Cache stays warm slightly past stale   |
| `retry`                | 2       | Fast failure for non-transient errors  |
| `refetchOnWindowFocus` | `false` | Avoids jarring refetches on tab switch |

Override per-query when a resource must be fresher (e.g. `staleTime: 0`).

### TanStack Router — route conventions

- **Dynamic params:** when a bad slug or id should show the app 404, validate in a `loader` and `throw notFound()` (e.g. `/recipes/cuisine/$cuisine` loads cuisines via `ensureQueryData` + `recipeMetaKeys.cuisines()`, checks `cuisineToSlug`, then resolves `cuisine` for the component).
- **Links:** use `<Link to="…" params={…} search={…} />` for internal navigation — not raw `<a href>` for in-app routes.
- **Programmatic:** `useNavigate()` with a fully typed destination.
- **Search params:** source of truth for filters/pagination; sync with `navigate({ search: … })`. Avoid duplicating URL state in `useState` when it belongs in the URL.
- **Optional pattern** for new or heavy routes:

```ts
export const Route = createFileRoute("/recipes")({
  validateSearch: z.object({ page: z.number().catch(1), q: z.string().optional() }),
  loaderDeps: ({ search }) => ({ search }),
  loader: ({ context, deps }) => context.queryClient.ensureQueryData(/* … */),
  component: RecipesPage,
})
```

`context.queryClient` applies only **after** root context is wired; until then, keep using module-level `queryClient` or queries in components.

### TanStack Router — optional root context

If you adopt `createRootRouteWithContext<{ queryClient: QueryClient }>()`, pass `queryClient` from the router setup so every loader can read `context.queryClient` without prop drilling.

---

### shadcn/ui

- Add components via `npx shadcn add <component>` — do not hand-copy from the docs.
- Source lives in `src/components/ui/*`; keep edits minimal to ease upgrades.
- `components.json` controls aliases, style, base color.

### Tailwind v4

- Entry: `@import "tailwindcss"` in `src/index.css` (no separate `tailwind.config.*` required for basics).
- Design tokens (`@theme { … }`) live in `src/index.css` as needed.
- Use `cn()` from `src/lib/utils.ts` for conditional classes.

### PWA

- Service worker registration is via `vite-plugin-pwa` — do not hand-roll a custom SW unless you replace the plugin.
- Adjust caching in `vite.config.ts` under `workbox.runtimeCaching`.
- Test offline with `npm run preview` (build + Wrangler) or `npm run build:preview:4000`; the dev server bypasses the SW.

### Linting & formatting

- Run `npm run fix` before pushing.
- Prettier owns formatting; ESLint owns correctness and a11y rules.
- Keep `src/routeTree.gen.ts` in ESLint ignore list.
