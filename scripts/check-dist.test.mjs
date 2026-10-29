import { spawnSync } from "node:child_process"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { afterAll, describe, expect, it } from "vitest"

const script = join(dirname(fileURLToPath(import.meta.url)), "check-dist.mjs")
const roots = []

const write = (root, path, content) => {
  const file = join(root, path)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, content)
}

const pwaHead =
  '<link rel="manifest" href="/manifest.webmanifest" /><script src="/registerSW.js"></script>'

const page = (title, { skip = true, h1 = 1, main = 1, pwa = true } = {}) =>
  `<!doctype html><html><head><title>${title}</title>${pwa ? pwaHead : ""}</head><body>` +
  (skip ? '<a href="#main">Skip</a>' : '<a href="/x">x</a>') +
  '<main id="main">'.repeat(main) +
  "<h1>H</h1>".repeat(h1) +
  "</main>".repeat(main) +
  "</body></html>"

const sw = (recipeCount) =>
  "self.skipWaiting();clientsClaim();/^https:\\/\\/cdn\\.dummyjson\\.com/;[" +
  Array.from({ length: recipeCount }, (_, i) => `{url:"recipe/${i + 1}/s/index.html"}`).join(",") +
  ',{url:"search-index.json"}]'

const makeDist = () => {
  const root = mkdtempSync(join(tmpdir(), "check-dist-"))
  roots.push(root)
  const index = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    slug: "s",
    cuisine: "Italian",
    tags: ["Pasta"],
    mealType: ["Dinner"],
    difficulty: "Easy",
  }))
  write(root, "search-index.json", JSON.stringify(index))
  index.forEach((entry) =>
    write(root, `recipe/${entry.id}/s/index.html`, page(`Recipe ${entry.id} | Spoonbowl`))
  )
  write(root, "index.html", page("Home | Spoonbowl"))
  ;["about", "privacy", "terms", "disclaimer", "accessibility"].forEach((name) =>
    write(root, `${name}/index.html`, page(`${name} | Spoonbowl`))
  )
  write(root, "404.html", page("Not found | Spoonbowl"))
  write(root, "gdpr/index.html", '<meta http-equiv="refresh" content="0;url=/privacy/">')
  ;["cuisines", "meal-types", "tags", "difficulties"].forEach((name) =>
    write(root, `recipes/${name}/index.html`, page(`${name} | Spoonbowl`))
  )
  write(root, "recipes/cuisine/italian/index.html", page("Italian | Spoonbowl"))
  write(root, "recipes/meal-type/dinner/index.html", page("Dinner | Spoonbowl"))
  write(root, "recipes/tag/pasta/index.html", page("Pasta | Spoonbowl"))
  write(root, "recipes/difficulty/easy/index.html", page("Easy | Spoonbowl"))
  write(
    root,
    "manifest.webmanifest",
    JSON.stringify({
      name: "Spoonbowl - Recipe Discovery",
      theme_color: "#f97316",
      background_color: "#fffbeb",
      icons: [
        { src: "/icons/icon-192x192.png", sizes: "192x192" },
        { src: "/icons/icon-512x512.png", sizes: "512x512" },
        { src: "/icons/icon-512x512.png", sizes: "512x512", purpose: "any maskable" },
      ],
    })
  )
  write(root, "icons/icon-192x192.png", "x")
  write(root, "icons/icon-512x512.png", "x")
  write(root, "sw.js", sw(50))
  write(root, "sitemap-index.xml", "<sitemapindex/>")
  write(root, "robots.txt", "Sitemap: https://spoonbowl.gint.ing/sitemap-index.xml\n")
  return root
}

const run = (dist) => spawnSync("node", [script, "--dist", dist], { encoding: "utf8" })

afterAll(() => roots.forEach((root) => rmSync(root, { recursive: true, force: true })))

describe("check-dist", () => {
  it("exits 0 on a complete dist", () => {
    const result = run(makeDist())
    expect(result.stderr).toBe("")
    expect(result.status).toBe(0)
  })

  it("exits 1 and lists each failure on a broken dist", () => {
    const root = makeDist()
    rmSync(join(root, "recipe/7"), { recursive: true })
    write(root, "about/index.html", page("Home | Spoonbowl"))
    write(root, "sw.js", sw(3))
    write(root, "index.html", page("Home | Spoonbowl", { skip: false, h1: 2 }))
    write(root, "robots.txt", "User-agent: *\n")
    write(root, "gdpr/index.html", "<p>no redirect</p>")
    write(root, "recipes/cuisines/index.html", page("cuisines | Spoonbowl", { pwa: false }))
    const result = run(root)
    expect(result.status).toBe(1)
    ;[
      "recipe/7/s/",
      "duplicate title",
      "precache",
      "skip link",
      "h1",
      "robots.txt",
      "gdpr",
      "listing page: missing PWA hook",
    ].forEach((fragment) => expect(result.stderr).toContain(fragment))
  })
})
