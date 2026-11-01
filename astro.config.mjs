import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import AstroPWA from "@vite-pwa/astro"

export default defineConfig({
  site: "https://spoonbowl.engg.app",
  output: "static",
  build: { format: "directory" },
  integrations: [
    sitemap(),
    AstroPWA({
      registerType: "autoUpdate",
      injectRegister: "script",
      includeAssets: ["icons/favicon.svg", "icons/apple-touch-icon.png"],
      manifest: {
        name: "Spoonbowl - Recipe Discovery",
        short_name: "Spoonbowl",
        description: "Discover delicious recipes from around the world",
        theme_color: "#16110e",
        background_color: "#16110e",
        display: "standalone",
        orientation: "portrait-primary",
        start_url: "/",
        icons: [
          { src: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{html,js,css,json,svg,png,woff2,webmanifest}"],
        skipWaiting: true,
        clientsClaim: true,
        navigateFallback: "/404.html",
        directoryIndex: "index.html",
        // Keep literal `x/index.html` precache urls; the integration's default rewrites them to
        // slashless `x`, which misses `/x/` requests and makes install fetch URLs the host may not serve.
        manifestTransforms: [async (entries) => ({ manifest: entries, warnings: [] })],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn\.dummyjson\.com/,
            handler: "CacheFirst",
            options: {
              cacheName: "recipe-images-cache",
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 7 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
