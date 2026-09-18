import { existsSync, realpathSync } from 'node:fs'
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path'

// Resolve existing ancestors too, so a symlink cannot put the database in served assets.
function physicalPath(path: string): string {
  if (existsSync(path)) return realpathSync(path)
  const parent = dirname(path)
  return parent === path ? path : resolve(physicalPath(parent), relative(parent, path))
}

export function serviceConfig(env: NodeJS.ProcessEnv = process.env) {
  const production = env.NODE_ENV === 'production'
  const port = Number(env.PORT ?? 3001)
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be between 1 and 65535.')
  if (production && (!env.APP_ORIGIN || !env.DATABASE_PATH || !isAbsolute(env.DATABASE_PATH))) {
    throw new Error('Production requires explicit HTTPS APP_ORIGIN and an absolute persistent DATABASE_PATH.')
  }
  const databasePath = env.DATABASE_PATH ?? resolve('data/dreamerie.sqlite')
  if (databasePath !== ':memory:') {
    const database = physicalPath(resolve(databasePath))
    for (const directory of ['public', 'dist']) {
      const path = relative(physicalPath(resolve(directory)), database)
      if (path === '' || (!isAbsolute(path) && path !== '..' && !path.startsWith(`..${sep}`))) throw new Error('DATABASE_PATH must stay outside public/ and dist/.')
    }
  }
  return {
    port, host: env.HOST ?? '127.0.0.1', production, databasePath,
    origin: env.APP_ORIGIN ?? `http://127.0.0.1:${env.SERVE_STATIC === '1' ? port : 5173}`,
    staticRoot: production || env.SERVE_STATIC === '1' ? resolve('dist') : undefined,
  }
}
