import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"

const distArgIndex = process.argv.indexOf("--dist")
const dist = distArgIndex > -1 ? process.argv[distArgIndex + 1] : "dist"
const failures = []
const notes = []

const fail = (message) => failures.push(message)
const read = (path) => readFileSync(join(dist, path), "utf8")
const has = (path) => existsSync(join(dist, path))
const slugify = (value) => String(value).toLowerCase().replace(/\s+/g, "-")
const count = (text, pattern) => text.match(pattern)?.length ?? 0

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })

const readJson = (path) => {
  try {
    return JSON.parse(read(path))
  } catch {
    fail(`${path} missing or not valid JSON`)
    return null
  }
}

const recipePath = (entry) => {
  const raw = entry.path ?? entry.url ?? `/recipe/${entry.id}/${entry.slug}/`
  return String(raw).replace(/^https?:\/\/[^/]+/, "")
}

const checkRecipes = (index) => {
  index.forEach((entry) => {
    const path = recipePath(entry).replace(/^\/|\/$/g, "")
    if (!has(`${path}/index.html`)) fail(`missing recipe page ${path}/`)
  })
  const built = has("recipe")
    ? walk(join(dist, "recipe")).filter((file) => file.endsWith("index.html")).length
    : 0
  if (built !== index.length) {
    fail(`recipe pages ${built} != search-index entries ${index.length}`)
  }
}

const listFromIndex = (index, field) => {
  const values = index.flatMap((entry) => [entry[field]].flat()).filter(Boolean)
  return [...new Set(values.map(slugify))]
}

const checkListings = (index) => {
  const groups = [
    ["cuisine", "cuisine"],
    ["meal-type", "mealType"],
    ["tag", "tags"],
    ["difficulty", "difficulty"],
  ]
  groups.forEach(([dir, field]) => {
    const fromIndex = listFromIndex(index, field)
    const dirPath = join(dist, "recipes", dir)
    if (fromIndex.length === 0) {
      notes.push(`index has no "${field}" field; checked recipes/${dir}/* dirs are non-empty only`)
      const dirs = existsSync(dirPath) ? readdirSync(dirPath) : []
      if (dirs.length === 0) fail(`no listing pages under recipes/${dir}/`)
      dirs.forEach((name) => {
        if (!has(`recipes/${dir}/${name}/index.html`))
          fail(`missing recipes/${dir}/${name}/index.html`)
      })
      return
    }
    fromIndex.forEach((slug) => {
      if (!has(`recipes/${dir}/${slug}/index.html`)) fail(`missing listing recipes/${dir}/${slug}/`)
    })
  })
}

const checkStatic = () => {
  ;["index", "about", "privacy", "terms", "disclaimer", "accessibility"].forEach((name) => {
    const file = name === "index" ? "index.html" : `${name}/index.html`
    if (!has(file)) fail(`missing page ${file}`)
  })
  if (!has("404.html") && !has("404/index.html")) fail("missing 404 page")
  ;["cuisines", "meal-types", "tags", "difficulties"].forEach((name) => {
    if (!has(`recipes/${name}/index.html`)) fail(`missing recipes/${name}/index.html`)
  })
  if (!has("gdpr/index.html")) return fail("missing gdpr/index.html")
  if (!/http-equiv=["']refresh["'][^>]*\/privacy/i.test(read("gdpr/index.html"))) {
    fail("gdpr page does not redirect to /privacy")
  }
}

const checkManifest = () => {
  const manifest = readJson("manifest.webmanifest")
  if (!manifest) return
  if (manifest.name !== "Spoonbowl - Recipe Discovery") fail("manifest name mismatch")
  if (manifest.theme_color !== "#16110e") fail("manifest theme_color mismatch")
  if (manifest.background_color !== "#16110e") fail("manifest background_color mismatch")
  const icons = manifest.icons ?? []
  if (icons.length !== 3) fail(`manifest has ${icons.length} icons, expected 3`)
  icons.forEach((icon) => {
    if (!has(String(icon.src).replace(/^\//, "")))
      fail(`manifest icon missing on disk: ${icon.src}`)
  })
}

const checkServiceWorker = () => {
  if (!has("sw.js")) return fail("missing sw.js")
  const sw = read("sw.js")
  ;["skipWaiting", "clientsClaim", "cdn", "search-index.json"].forEach((needle) => {
    if (!sw.includes(needle)) fail(`sw.js missing ${needle}`)
  })
  if (!/cdn\\?\.dummyjson\\?\.com/.test(sw)) fail("sw.js missing cdn.dummyjson.com runtime rule")
  // Pages build to `x/index.html`; without the redirect, slashless `/x` navigations get the 404 page.
  if (!/denylist:/.test(sw) || !/Response\.redirect\(/.test(sw)) {
    fail("sw.js missing the slashless /x → /x/ navigation redirect")
  }
  const precached = count(sw, /url:\s*["']recipe\//g)
  if (precached < 50) fail(`sw.js precache has ${precached} recipe/ urls, expected >= 50`)
}

const checkSitemap = () => {
  if (!has("sitemap-index.xml")) fail("missing sitemap-index.xml")
  const sitemapLines = has("robots.txt")
    ? read("robots.txt")
        .split("\n")
        .filter((line) => /^sitemap:/i.test(line))
    : []
  if (sitemapLines.length !== 1 || !sitemapLines[0].includes("sitemap-index.xml")) {
    fail("robots.txt must have exactly one Sitemap line naming sitemap-index.xml")
  }
}

const checkAssets = (files) => {
  files
    .filter((file) => /\.(html|js)$/.test(file))
    .forEach((file) => {
      if (readFileSync(file, "utf8").includes("dummyjson.com/recipes")) {
        fail(`${file} references dummyjson.com/recipes`)
      }
    })
}

const checkTitles = (htmlFiles) => {
  const seen = new Map()
  htmlFiles.forEach((file) => {
    const html = readFileSync(file, "utf8")
    if (/http-equiv=["']refresh["']/i.test(html)) return // redirect stubs carry no real title
    const titles = [...html.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/g)].map((match) => match[1])
    if (titles.length !== 1) return fail(`${file}: expected 1 <title>, found ${titles.length}`)
    if (!titles[0].includes(" | Spoonbowl")) fail(`${file}: title lacks " | Spoonbowl"`)
    if (seen.has(titles[0]))
      fail(`duplicate title "${titles[0]}": ${seen.get(titles[0])} and ${file}`)
    seen.set(titles[0], file)
  })
}

const FOOTER_LINKS = ["/accessibility/", "/privacy/", "/terms/", "/disclaimer/"]
const REPO_URL = "https://github.com/sg208/spoonbowl"
const REPO_LABEL = "Source code on GitHub (opens in a new tab)"
const GITHUB_LINK = /<a\s[^>]*href=["']https:\/\/github\.com[^"']*["'][^>]*>/gi

// Site chrome carries exactly one GitHub link: the footer icon to the repo.
const checkRepoLink = (label, html, footer) => {
  const chrome = html.replace(/<main[\s>][\s\S]*<\/main>/, "")
  const chromeLinks = chrome.match(GITHUB_LINK) ?? []
  if (chromeLinks.length !== 1)
    return fail(
      `${label}: expected exactly 1 GitHub link outside <main>, found ${chromeLinks.length}`
    )
  const footerLink = footer.match(GITHUB_LINK)?.[0]
  if (!footerLink?.includes(`href="${REPO_URL}"`))
    return fail(`${label}: footer missing link to ${REPO_URL}`)
  if (!footerLink.includes(`aria-label="${REPO_LABEL}"`))
    fail(`${label}: footer GitHub link needs aria-label="${REPO_LABEL}"`)
}

const checkLandmarks = (label, path) => {
  if (!has(path)) return
  const html = read(path)
  const body = html.slice(Math.max(html.indexOf("<body"), 0))
  const first = body.match(
    /<(?:a\s[^>]*href|button|input|select|textarea|[a-z]+\s[^>]*tabindex)[^>]*>/i
  )
  if (!first || !/^<a\s[^>]*href=["']#main["']/i.test(first[0])) {
    fail(`${label}: first focusable is not the skip link href="#main"`)
  }
  const h1 = count(html, /<h1[\s>]/g)
  const main = count(html, /<main[\s>]/g)
  if (h1 !== 1) fail(`${label}: expected 1 h1, found ${h1}`)
  if (main !== 1) fail(`${label}: expected 1 main, found ${main}`)
  // @vite-pwa/astro does not inject into Astro HTML; BaseLayout.astro must link both.
  ;['rel="manifest"', "/registerSW.js"].forEach((needle) => {
    if (!html.includes(needle))
      fail(`${label}: missing PWA hook ${needle} — add it to src/layouts/BaseLayout.astro <head>`)
  })
  const footer = html.match(/<footer[\s>][\s\S]*<\/footer>/)?.[0] ?? ""
  FOOTER_LINKS.forEach((href) => {
    if (!footer.includes(`href="${href}"`)) fail(`${label}: footer missing link to ${href}`)
  })
  checkRepoLink(label, html, footer)
}

const run = () => {
  if (!existsSync(dist)) return fail(`dist directory not found: ${dist}`)
  const files = walk(dist)
  const index = readJson("search-index.json")
  if (Array.isArray(index)) {
    checkRecipes(index)
    checkListings(index)
    checkLandmarks(
      "recipe page",
      recipePath(index[0] ?? {}).replace(/^\/|\/$/g, "") + "/index.html"
    )
  } else if (index) {
    fail("search-index.json is not an array")
  }
  checkStatic()
  checkManifest()
  checkServiceWorker()
  checkSitemap()
  checkAssets(files)
  checkTitles(files.filter((file) => file.endsWith(".html")))
  checkLandmarks("home", "index.html")
  checkLandmarks("listing page", "recipes/cuisines/index.html")
  ;["accessibility", "privacy", "terms", "disclaimer"].forEach((name) =>
    checkLandmarks(`${name} page`, `${name}/index.html`)
  )
}

run()
if (notes.length > 0) process.stdout.write(`${[...new Set(notes)].join("\n")}\n`)
if (failures.length > 0) {
  process.stderr.write(`check-dist: ${failures.length} failure(s)\n- ${failures.join("\n- ")}\n`)
  process.exit(1)
}
process.stdout.write("check-dist: ok\n")
