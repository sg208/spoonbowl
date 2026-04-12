# hooks/

Custom React hooks. Data-fetching hooks wrap `useQuery`/`useMutation` from TanStack Query — never fetch raw in components.

## Naming

camelCase: `useRecipeSearch.ts`, `useRecipeQueries.ts`, `usePrefetchRecipeDetail.ts`

## Key hooks

| Hook                          | Purpose                                               |
| ----------------------------- | ----------------------------------------------------- |
| `useRecipeQueries.ts`         | All `useQuery`/`useMutation` wrappers for recipe data |
| `useRecipeSearch.ts`          | Search input state + debounce logic                   |
| `useRecipeCombobox.ts`        | Combobox UI state for recipe search                   |
| `usePrefetchRecipeDetail.ts`  | Hover-triggered prefetch for recipe detail            |
| `usePrefetchCuisinesIndex.ts` | Hover-triggered prefetch for cuisine index            |
| `useMobile.ts`                | Responsive breakpoint detection                       |
