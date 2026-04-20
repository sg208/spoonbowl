# lib/

Utilities, configuration, and infrastructure. No React — pure TS only.

## Structure

| Path             | Purpose                                                                                   |
| ---------------- | ----------------------------------------------------------------------------------------- |
| `api.ts`         | All DummyJSON API calls + response types (`Recipe`, `RecipesResponse`, etc.)              |
| `queryClient.ts` | TanStack Query global defaults (staleTime, gcTime, retry)                                 |
| `utils.ts`       | Shared helpers: `cn()` (class merging), `slugify()`                                       |
| `keys/`          | TanStack Query key factories — import from here, never inline                             |
| `utils/`         | Domain-specific utilities: `cuisineUtils`, `difficultyUtils`, `mealTypeUtils`, `tagUtils` |
| `config/`        | App-wide constants: `navigationLinks`, `headings`, `not-found-messages`                   |
