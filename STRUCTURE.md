# Project Structure

## Quick Navigation

| Looking for…           | Go to                                                            |
| ---------------------- | ---------------------------------------------------------------- |
| Pages / routes         | `src/routes/`                                                    |
| Shared components      | `src/components/`                                                |
| Data fetching hooks    | `src/hooks/useRecipeQueries.ts`                                  |
| UI state hooks         | `src/hooks/useRecipeSearch.ts`, `src/hooks/useRecipeCombobox.ts` |
| API client + types     | `src/lib/api.ts`                                                 |
| Query key factories    | `src/lib/keys/recipeKeys.ts`                                     |
| Domain utilities       | `src/lib/utils/{cuisine,difficulty,mealType,tag}Utils.ts`        |
| App-wide constants     | `src/lib/config/`                                                |
| shadcn/ui primitives   | `src/components/ui/`                                             |
| Global styles + tokens | `src/index.css`                                                  |
| React Query config     | `src/lib/queryClient.ts`                                         |

## Folder Map

```text
src/
├── main.tsx              Entry point
├── index.css             Tailwind v4 entry + @theme design tokens
├── routeTree.gen.ts      Auto-generated — never edit by hand
│
├── routes/               TanStack Router file-based routes
├── components/           Shared UI components
│   └── ui/               shadcn/ui primitives (add via npx shadcn add)
├── hooks/                Custom React hooks (data + UI state)
└── lib/
    ├── api.ts            All DummyJSON API calls + response types
    ├── queryClient.ts    TanStack Query global defaults
    ├── utils.ts          cn(), slugify()
    ├── keys/             Query key factories
    ├── utils/            Domain utilities (cuisine, difficulty, mealType, tag)
    └── config/           Constants (navigation, headings, legal dates, 404 messages)
```

## Key Conventions

- **Components**: PascalCase filenames (`RecipeCard.tsx`, `ThemeProvider.tsx`)
- **Hooks**: camelCase filenames (`useRecipeQueries.ts`, `useMobile.ts`)
- **Routes**: kebab-case folders, `$` prefix for dynamic segments (`$recipeId`, `$cuisine`)
- **Imports**: always use `@/` alias, never relative `../../`
- **Data fetching**: always via hooks in `src/hooks/` — no raw `useQuery` in route files
- **Styling**: Tailwind classes via `cn()` — no inline styles
