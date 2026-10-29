import js from "@eslint/js"
import globals from "globals"
import { defineConfig } from "eslint/config"
import tseslint from "typescript-eslint"
import astro from "eslint-plugin-astro"
import eslintConfigPrettier from "eslint-config-prettier"

export default defineConfig(
  {
    ignores: [
      "dist/**",
      ".astro/**",
      "node_modules/**",
      "coverage/**",
      ".claude/**",
      ".taste-skill/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  ...astro.configs["jsx-a11y-strict"],
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  eslintConfigPrettier
)
