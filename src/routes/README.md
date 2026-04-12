# routes/

TanStack Router file-based routes. Each file maps 1:1 to a URL segment.

## Conventions

- Dynamic segments use `$` prefix: `$recipeId`, `$cuisine`, `$tag`
- `__root.tsx` — root layout (providers, Navbar, Footer, RouteAnnouncer)
- `index.tsx` inside a folder maps to the folder's index route

## Structure

```
routes/
├── __root.tsx           → layout shell
├── index.tsx            → / (home)
├── recipe/$recipeId/$slug.tsx  → /recipe/:id/:slug
└── recipes/
    ├── cuisines/        → /recipes/cuisines (index listing)
    ├── cuisine/$cuisine → /recipes/cuisine/:cuisine (filtered)
    ├── tags/            → /recipes/tags
    ├── tag/$tag         → /recipes/tag/:tag
    ├── difficulties/    → /recipes/difficulties
    ├── difficulty/$difficulty
    ├── meal-types/      → /recipes/meal-types
    └── meal-type/$mealType
```

## Note

`src/routeTree.gen.ts` is auto-generated — never hand-edit it.
