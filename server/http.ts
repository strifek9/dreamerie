import Fastify, { type FastifyRequest } from 'fastify'
import cookie from '@fastify/cookie'
import rateLimit from '@fastify/rate-limit'
import staticFiles from '@fastify/static'
import type { RoomRequest, SessionView } from '../shared/rooms.ts'
import { RoomError } from './errors.ts'
import { enterRoom } from './rooms.ts'
import { COOKIE_NAME, SESSION_SECONDS, createSession, csrfToken, findSession, validCsrf } from './sessions.ts'
import { openStore } from './store.ts'
import { roomView, sessionRooms } from './views.ts'

interface ServiceOptions {
  databasePath: string
  origin: string
  production?: boolean
  staticRoot?: string
  now?: () => number
  rateLimits?: boolean
}

const requestId = { type: 'string', pattern: '^[0-9a-fA-F-]{36}$' }
const displayName = { type: 'string', minLength: 1, maxLength: 80 }
const emptyBody = { type: 'object', additionalProperties: false, properties: {} }

export async function createService(options: ServiceOptions) {
  const origin = new URL(options.origin)
  if (origin.origin !== options.origin || origin.username || origin.password) throw new Error('APP_ORIGIN must be an exact origin, without a path.')
  if (options.production && origin.protocol !== 'https:') throw new Error('Production requires an HTTPS APP_ORIGIN.')
  if (!options.production && origin.protocol !== 'https:' && !['127.0.0.1', 'localhost', '[::1]'].includes(origin.hostname)) {
    throw new Error('Plain HTTP is supported only for local development.')
  }
  const db = openStore(options.databasePath)
  const now = options.now ?? Date.now
  const app = Fastify({
    logger: false, bodyLimit: 4096,
    ajv: { customOptions: { removeAdditional: false, coerceTypes: false } },
  })
  app.addHook('onClose', async () => { db.close() })
  try {
    await app.register(cookie)
    await app.register(rateLimit, { global: false })
    app.addHook('onRequest', async (request, reply) => {
      reply.header('X-Content-Type-Options', 'nosniff').header('Referrer-Policy', 'no-referrer')
      if (request.url.startsWith('/api/')) {
        reply.header('Cache-Control', 'no-store')
        if (!['GET', 'HEAD'].includes(request.method) && request.headers.origin !== options.origin) {
          throw new RoomError(403, 'ORIGIN_REJECTED', 'Open Dreamerie from its usual address and try again.')
        }
      }
    })
    app.setErrorHandler((error, _request, reply) => {
      if (error instanceof RoomError) return reply.code(error.statusCode).send({ code: error.code, message: error.message })
      const status = error instanceof Error && 'statusCode' in error && typeof error.statusCode === 'number' ? error.statusCode : 500
      if (status === 400 || status === 415 || status === 413) {
        return reply.code(status).send({ code: 'INVALID_REQUEST', message: 'Check your name and invitation code, then try again.' })
      }
      if (status === 429) return reply.code(429).send({ code: 'TOO_MANY_REQUESTS', message: 'Too many attempts. Wait a minute before trying again.' })
      return reply.code(500).send({ code: 'SERVICE_ERROR', message: 'The room could not be saved. Please try again.' })
    })
    function authenticate(request: FastifyRequest, mutation = false) {
      const credential = request.cookies[COOKIE_NAME]
      const session = findSession(db, credential, now())
      if (!session || !credential) throw new RoomError(401, 'SESSION_REQUIRED', 'This browser session has ended. Your old seat cannot be recovered here.')
      if (mutation && !validCsrf(credential, request.headers['x-dreamerie-csrf'])) {
        throw new RoomError(403, 'CSRF_REJECTED', 'Refresh Dreamerie before trying again.')
      }
      return { session, credential }
    }
    const limit = (max: number) => ({ rateLimit: options.rateLimits === false ? false as const : { max, timeWindow: '1 minute' } })
    app.get('/api/health', async () => ({ ok: true }))
    app.post('/api/session', { schema: { body: emptyBody }, config: limit(30) }, async (request, reply): Promise<SessionView> => {
      let credential = request.cookies[COOKIE_NAME]
      let session = findSession(db, credential, now())
      if (!session || !credential) {
        const created = createSession(db, now())
        session = created.session
        credential = created.credential
        reply.setCookie(COOKIE_NAME, credential, {
          httpOnly: true, secure: origin.protocol === 'https:', sameSite: 'lax', path: '/', maxAge: SESSION_SECONDS,
        })
      }
      return { csrfToken: csrfToken(credential), expiresAt: session.expires_at, rooms: sessionRooms(db, session.id, now()) }
    })
    app.get('/api/session', async (request): Promise<SessionView> => {
      const { session, credential } = authenticate(request)
      return { csrfToken: csrfToken(credential), expiresAt: session.expires_at, rooms: sessionRooms(db, session.id, now()) }
    })
    app.get<{ Params: { roomId: string } }>('/api/rooms/:roomId', {
      schema: { params: { type: 'object', required: ['roomId'], properties: { roomId: { type: 'string', maxLength: 64 } } } },
    }, async (request) => roomView(db, request.params.roomId, authenticate(request).session.id, now()))
    for (const action of ['create', 'join'] as const) {
      app.post<{ Body: RoomRequest }>(action === 'create' ? '/api/rooms' : '/api/rooms/join', {
        config: limit(action === 'create' ? 10 : 30),
        schema: { body: {
          type: 'object', additionalProperties: false,
          required: action === 'create' ? ['requestId', 'displayName'] : ['requestId', 'displayName', 'inviteCode'],
          properties: action === 'create' ? { requestId, displayName } : {
            requestId, displayName, inviteCode: { type: 'string', pattern: '^\\s*[0-9a-fA-F]{10}\\s*$' },
          },
        } },
      }, async (request) => enterRoom(db, authenticate(request, true).session.id, action, request.body, now()))
    }
    if (options.staticRoot) {
      await app.register(staticFiles, { root: options.staticRoot })
    }
    app.setNotFoundHandler((_request, reply) => reply.code(404).send({ code: 'NOT_FOUND', message: 'That page could not be found.' }))
    await app.ready()
    return app
  } catch (error) {
    await app.close()
    throw error
  }
}
