import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'

export default defineConfig(({ mode }) => {
  const cloudflare = mode === 'cloudflare'
  const origin = 'https://dreamerie.kouvang0109.workers.dev'
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
        if (cloudflare && id.replaceAll('\\', '/').endsWith('/src/analytics/cloudflare.ts')) return code.replace("const LIVE_ORIGIN = 'https://dreamerie.onrender.com'", `const LIVE_ORIGIN = '${origin}'`)
      },
      renderChunk(code: string) { if (paths) return { code: code.replace(paths, source => mapping.get(source)!), map: null } },
      transformIndexHtml(html: string) { return cloudflare ? html.replace('content="https://dreamerie.onrender.com/"', `content="${origin}/"`) : html },
    }],
    publicDir: cloudflare ? false : 'public',
    server: { strictPort: true },
    build: {
      ...(cloudflare ? { outDir: '.validation/cloudflare-dist' } : {}),
      rollupOptions: { input },
    },
  }
})
