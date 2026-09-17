import { resolve } from 'node:path'
import { createService } from './http.ts'

const production = process.env.NODE_ENV === 'production'
const port = Number(process.env.PORT ?? 3001)
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be between 1 and 65535.')
if (production && (!process.env.APP_ORIGIN || !process.env.DATABASE_PATH)) {
  throw new Error('Production requires explicit APP_ORIGIN and DATABASE_PATH settings.')
}
const app = await createService({
  databasePath: process.env.DATABASE_PATH ?? resolve('data/dreamerie.sqlite'),
  origin: process.env.APP_ORIGIN ?? `http://127.0.0.1:${process.env.SERVE_STATIC === '1' ? port : 5173}`,
  production,
  staticRoot: production || process.env.SERVE_STATIC === '1' ? resolve('dist') : undefined,
})
for (const signal of ['SIGINT', 'SIGTERM'] as const) process.once(signal, () => { void app.close() })
await app.listen({ port, host: process.env.HOST ?? '127.0.0.1' })
console.log(`Dreamerie room service listening on port ${port}.`)
