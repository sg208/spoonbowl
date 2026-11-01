// Pages build to `x/index.html`, and Workbox only maps `/x/` onto that precache key. Without these,
// a slashless `/x` navigation falls through to the `/404.html` navigateFallback. Plain JS, no
// shared consts: Workbox stringifies each callback into sw.js, so each must be self-contained.

// navigateFallbackDenylist tests `pathname + search`: keep slashless page paths off the 404 fallback.
export const slashlessPagePattern = /\/[^/.?]+(\?.*)?$/

// Same-origin navigation whose last path segment has no trailing slash and no file extension.
export const isSlashlessNavigation = ({ request, url, sameOrigin }) =>
  sameOrigin && request.mode === "navigate" && /\/[^/.]+$/.test(url.pathname)

// Mirror the host's `/x` → `/x/` redirect so it also works offline; `/x/` then hits the precache.
export const redirectToTrailingSlash = async ({ url }) =>
  Response.redirect(`${url.origin}${url.pathname}/${url.search}`, 301)
