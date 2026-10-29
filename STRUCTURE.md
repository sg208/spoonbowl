# Project Structure

## Quick Navigation

| Looking for…           | Go to                                     |
| ---------------------- | ----------------------------------------- |
| Pages / routes         | `src/pages/`                              |
| Document shell + head  | `src/layouts/BaseLayout.astro`            |
| Shared components      | `src/components/`                         |
| Client scripts         | `src/scripts/{theme,cook-mode,search}.ts` |
| API client + types     | `src/lib/api.ts`                          |
| Catalogue (build time) | `src/lib/catalog.ts`                      |
| Slugs / recipe paths   | `src/lib/utils/slug.ts`                   |
| Cook mode logic        | `src/lib/cook/`                           |
| Search filter          | `src/lib/search/filterRecipes.ts`         |
| App-wide config        | `src/lib/config/`                         |
| Global styles + tokens | `src/styles/global.css`                   |
| PWA + sitemap config   | `astro.config.mjs`                        |
| Dist assertions        | `scripts/check-dist.mjs`                  |

## Folder Map

```text
src/
├── pages/                Astro file routes (see CLAUDE.md § Route map)
│   ├── recipe/[id]/[slug].astro
│   ├── recipes/          cuisine(s), meal-type(s), tag(s), difficulty/difficulties
│   └── search-index.json.ts   build-time search index endpoint
├── layouts/              BaseLayout.astro
├── components/           Astro components (cards, listing, cook mode, search, nav)
├── scripts/              Vanilla TS client scripts
├── styles/global.css     Tailwind v4 entry + design tokens
└── lib/
    ├── api.ts            fetchAllRecipes (sole fetch site) + Zod schema
    ├── catalog.ts        memoised getCatalog()
    ├── seo.ts            formatPageTitle, formatRecipeTitle, toAbsoluteUrl
    ├── cook/             pager, scale, wakeLock (+ tests)
    ├── search/           filterRecipes (+ test)
    ├── utils/slug.ts     slugify + slug <-> name helpers
    ├── config/           listing copy, navigation links, 404 messages
    └── __fixtures__/     test fixtures
scripts/                  check-dist.mjs (+ test)
public/                   robots.txt, icons/
```

## Key Conventions

- **Components**: PascalCase `.astro` filenames (`RecipeCard.astro`)
- **Pages**: kebab-case folders, `[param]` for dynamic segments (`[id]`, `[cuisine]`)
- **Imports**: use the `@/` alias (`src/`)
- **Data fetching**: build time only, via `src/lib/api.ts` and `getCatalog()`; no runtime recipe fetches
- **Client JS**: vanilla TS in `src/scripts/`; no UI framework
- **Titles**: `BaseLayout.astro` with `formatPageTitle()` / `formatRecipeTitle()`
