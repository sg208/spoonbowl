# components/

Reusable React components. Route files own screen composition; components provide the building blocks.

## Structure

- **Top level** — shared components used across multiple routes (e.g. `RecipeCard`, `Navbar`, `Footer`)
- **`ui/`** — shadcn/ui primitives. Add via `npx shadcn add <component>`; keep edits minimal
- **`cuisine/`** — components specific to the cuisine filter/listing feature
- **`legal/`** — components for legal pages (privacy, terms, disclaimer). Ask before editing — GDPR/CCPA notices

## Naming

PascalCase for all component files (e.g. `RecipeCard.tsx`, `ThemeProvider.tsx`).
