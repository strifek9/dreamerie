import { createService } from './http.ts'
import { serviceConfig } from './config.ts'

const { port, host, ...options } = serviceConfig()
const app = await createService(options)
for (const signal of ['SIGINT', 'SIGTERM'] as const) process.once(signal, () => { void app.close() })
await app.listen({ port, host })
console.log(`Dreamerie room service listening on port ${port}.`)
