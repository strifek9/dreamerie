/// <reference lib="dom" />

// Public site identifier from Cloudflare's installation snippet, NOT an API key.
const SITE_TOKEN = 'b184fc0494ec43e981f99c33a66fb2a5'
const LIVE_ORIGIN = 'https://dreamerie.onrender.com'
const SCRIPT_ID = 'dreamerie-web-analytics'

export function shouldLoadAnalytics(production: boolean, href: string): boolean {
  if (!production) return false
  try {
    const url = new URL(href)
    return url.origin === LIVE_ORIGIN &&
      !['dream', 'review', 'version'].some(key => url.searchParams.has(key))
  } catch {
    return false
  }
}

// Optional and independent of React/game state: blocked analytics never blocks play.
export function installCloudflareAnalytics(doc: Document, production: boolean, href: string): void {
  if (!shouldLoadAnalytics(production, href)) return
  try {
    if (doc.getElementById(SCRIPT_ID)) return
    const script = doc.createElement('script')
    script.id = SCRIPT_ID
    script.type = 'module'
    script.async = true
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js'
    script.setAttribute('data-cf-beacon', JSON.stringify({ token: SITE_TOKEN }))
    doc.body.appendChild(script)
  } catch {
    // Analytics is best-effort; never read or alter saved attempts as a fallback.
  }
}
