import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'

export default defineConfig(({ mode }) => {
  const pages = mode === 'pages'
  const cloudflare = mode === 'cloudflare' || pages
  const origin = pages ? process.env.DREAMERIE_PUBLIC_ORIGIN : 'https://dreamerie.kouvang0109.workers.dev'
  if (pages && (!origin || !/^https:\/\/[a-z0-9-]+\.pages\.dev$/.test(origin))) throw new Error('Set DREAMERIE_PUBLIC_ORIGIN to the verified Pages project origin before publishing.')
  const input: Record<string, string> = { app: 'index.html', progress: 'progress.html' }
  if (mode === 'playtest') input.review = 'v4-review.html'
  const manifest = cloudflare ? JSON.parse(readFileSync('.validation/cloudflare-assets.json', 'utf8')) : null
  const mapping = new Map<string, string>(manifest?.files.map((f: { source: string; target: string }) => [f.source, f.target]) ?? [])
  const escaped = [...mapping.keys()].map(s => s.replaceAll('.', '\.'))
  const paths = cloudflare ? new RegExp(escaped.join('|'), 'g') : null
  return {
    plugins: [react(), {
      name: 'dreamerie-static-delivery',
      transform(code: string, id: string) {
        if (cloudflare && id.includes('analytics') && id.includes('cloudflare.ts')) return code.replaceAll('https://dreamerie.onrender.com', origin!)
      },
      renderChunk(code: string) { if (paths) return { code: code.replace(paths, source => mapping.get(source)!), map: null } },
      transformIndexHtml(html: string) {
        if (!cloudflare) return html
        const canonical = html.replace('content="https://dreamerie.onrender.com/"', `content="${origin}/"`)
        return pages ? canonical.replace('href="https://dreamerie.kouvang0109.workers.dev/progress.html"', `href="${origin}/progress.html"`) : canonical
      },
    }],
    publicDir: cloudflare ? false : 'public',
    server: { strictPort: true },
    build: {
      ...(cloudflare ? { outDir: pages ? '.validation/pages-dist' : '.validation/cloudflare-dist' } : {}),
      rollupOptions: { input },
    },
  }
})
