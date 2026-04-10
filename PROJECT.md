# PROJECT.md — Spoonbowl (repo mini-memory)

Default reference for planning: paths, conventions, “where is X?”.

## Quick facts

- **Stack**: Vite + React 19 + TypeScript + Tailwind CSS v4
- **Router**: TanStack Router (file-based routes in `src/routes/*`; generated tree in `src/routeTree.gen.ts`)
- **Server state**: TanStack React Query (global defaults in `src/lib/queryClient.ts`)
- **PWA**: `vite-plugin-pwa` + Workbox runtime caching (see `vite.config.ts`)
- **Path alias**: `@` → `./src` (see `vite.config.ts`)

## Commands

- **dev**: `npm run dev`
- **build**: `npm run build`
- **preview**: `npm run preview`
- **preview:4000**: `npm run preview:4000` (preview on port 4000, strict)
- **build:preview:4000**: `npm run build:preview:4000` (build then preview on 4000)
- **typecheck**: `npm run typecheck`
- **lint**: `npm run lint`
- **lint:fix**: `npm run lint:fix`
- **format**: `npm run format`
- **format:check**: `npm run format:check`
- **fix**: `npm run fix` (runs `lint:fix` then `format`)

## Project tree (deep but pruned)

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
    │   ├── gdpr.tsx
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
    │       └── tag/
    │           └── $tag.tsx
    ├── components/
    │   ├── RootLayout.tsx             # app shell: Navbar/Footer/Outlet + Toaster
    │   ├── NotFoundPage.tsx
    │   ├── NotFoundRandomRecipe.tsx
    │   ├── Navbar.tsx
    │   ├── Footer.tsx
    │   ├── FeaturedRecipe.tsx
    │   ├── RecipeCard.tsx
    │   ├── mode-toggle.tsx
    │   ├── theme-provider.tsx
    │   └── ui/
    │       ├── ... shadcn-style primitives (Button, Dialog, Select, etc.)
    │       └── sonner.tsx             # toaster wrapper
    ├── hooks/
    │   ├── use-mobile.ts
    │   └── use-prefetch-cuisines-index.ts
    └── lib/
        ├── api.ts                     # typed fetch wrappers (DummyJSON recipes)
        ├── queryClient.ts             # React Query defaults (staleTime/gcTime/retry)
        ├── not-found-messages.ts      # 404 copy pool + random picker
        ├── utils.ts                   # cn() / class merging utilities
        ├── headings.ts
        ├── mealTypeUtils.ts
        ├── cuisineUtils.ts
        └── tagUtils.ts
```

## Where to change X (token-saver map)

- **App shell / layout**: `src/components/RootLayout.tsx` (wired from `src/routes/__root.tsx`)
- **Top navigation**: `src/components/Navbar.tsx`
- **Footer**: `src/components/Footer.tsx`
- **Theme / dark mode**: `src/components/theme-provider.tsx`, `src/components/mode-toggle.tsx`
- **Routing / new page**: add a file under `src/routes/**` (route tree auto-generated into `src/routeTree.gen.ts`)
- **Recipe cards / list UI**: `src/components/RecipeCard.tsx`, `src/components/FeaturedRecipe.tsx`
- **API calls**: `src/lib/api.ts` (prefer adding a typed wrapper here)
- **React Query defaults**: `src/lib/queryClient.ts` (already set: staleTime 5m, gcTime 6m, retry 2, no refetch-on-focus)
- **PWA / caching rules**: `vite.config.ts` (`VitePWA({ workbox: { runtimeCaching: [...] } })`)
- **Global styles**: `src/index.css`
- **UI primitives**: `src/components/ui/*` (shadcn-style components)
- **Lint rules**: `eslint.config.js`
- **Prettier**: `.prettierrc`, `.prettierignore`
- **Lint + format in one go**: `npm run fix`

## Conventions / guardrails

- **Don’t edit generated router output**: `src/routeTree.gen.ts` is auto-generated and overwritten.
- **Prefer central API wrappers**: add/adjust endpoints in `src/lib/api.ts` rather than scattering `fetch`.
- **Prefer React Query for remote data**: global defaults already configured in `src/lib/queryClient.ts`.
- **Keep route files focused**: route component owns screen composition; reusable UI in `src/components/*`.
- **ESLint** ignores generated `src/routeTree.gen.ts` (see `eslint.config.js`); don’t remove that ignore.
- **`npm run fix`**: ESLint `--fix` first, then Prettier — matches `eslint-config-prettier` workflow.
