import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import Fastify from 'fastify'
import staticFiles from '@fastify/static'

// Serve only the built daily game. Never start the legacy room service or open its database.
export async function createStaticApp(root = fileURLToPath(new URL('../dist/', import.meta.url))) {
  if (!existsSync(resolve(root, 'index.html'))) throw new Error('Build the game before starting it: npm run build')
  const app = Fastify({ logger: false })
  await app.register(staticFiles, { root, maxAge: 0, dotfiles: 'deny' })
  app.get('/api/health', async () => ({ ok: true }))
  return app
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const app = await createStaticApp()
  const port = Number(process.env.PORT ?? 3000)
  for (const signal of ['SIGINT', 'SIGTERM'] as const) process.once(signal, () => { void app.close() })
  await app.listen({ port, host: process.env.HOST ?? '0.0.0.0' })
  console.log(`Dreamerie daily game listening on port ${port}.`)
}
