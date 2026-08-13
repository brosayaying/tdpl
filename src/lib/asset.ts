/**
 * Prefix a public-directory path with the app base URL so images work when
 * the site is served from a subpath (e.g. a GitHub project page). Vite only
 * rewrites bundled asset URLs, not string literals pointing at `public/`.
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const suffix = path.startsWith('/') ? path : `/${path}`
  return `${base}${suffix}`
}
