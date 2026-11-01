import { describe, expect, it } from "vitest"
import {
  isSlashlessNavigation,
  redirectToTrailingSlash,
  slashlessPagePattern,
} from "./trailingSlash.mjs"

const origin = "https://spoonbowl.engg.app"

const context = (path: string, { mode = "navigate", sameOrigin = true } = {}) => ({
  url: new URL(path, origin),
  request: { mode },
  sameOrigin,
})

const pathAndSearch = (path: string) => {
  const url = new URL(path, origin)
  return url.pathname + url.search
}

const slashless = ["/accessibility", "/privacy", "/recipes/cuisines", "/terms?ref=a.b/c"]
const notSlashless = ["/", "/privacy/", "/nope/?q=1", "/search-index.json", "/sw.js"]

describe("service worker trailing-slash routing", () => {
  it.each(slashless)("redirects the %s navigation and keeps it off the 404 fallback", (path) => {
    expect(isSlashlessNavigation(context(path))).toBe(true)
    expect(slashlessPagePattern.test(pathAndSearch(path))).toBe(true)
  })

  it.each(notSlashless)("leaves %s to the precache and 404 fallback", (path) => {
    expect(isSlashlessNavigation(context(path))).toBe(false)
    expect(slashlessPagePattern.test(pathAndSearch(path))).toBe(false)
  })

  it("ignores non-navigation and cross-origin requests", () => {
    expect(isSlashlessNavigation(context("/privacy", { mode: "cors" }))).toBe(false)
    expect(isSlashlessNavigation(context("/privacy", { sameOrigin: false }))).toBe(false)
  })

  it("redirects to the slashed URL and keeps the query", async () => {
    const response = await redirectToTrailingSlash(context("/terms?ref=x"))
    expect(response.status).toBe(301)
    expect(response.headers.get("location")).toBe(`${origin}/terms/?ref=x`)
  })
})
