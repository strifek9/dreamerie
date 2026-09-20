import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { createStaticApp } from '../scripts/serve.ts'

test('production serves only the built game and health, never legacy rooms or private files', async () => {
  const fixture = await mkdtemp(join(tmpdir(), 'dreamerie-hosting-'))
  const root = join(fixture, 'dist')
  await mkdir(root)
  await writeFile(join(root, 'index.html'), '<!doctype html><title>Dreamerie</title>')
  await writeFile(join(root, 'app.js'), 'console.log("Dreamerie")')
  await writeFile(join(root, '.env'), 'not-public')
  await writeFile(join(fixture, 'private.txt'), 'not-public')
  const app = await createStaticApp(root)
  try {
    const home = await app.inject({ method: 'GET', url: '/' })
    assert.equal(home.statusCode, 200)
    assert.match(home.headers['content-type'] ?? '', /text\/html/)
    assert.match(home.body, /Dreamerie/)
    assert.match(home.headers['cache-control'] ?? '', /max-age=0/)
    assert.deepEqual((await app.inject('/api/health')).json(), { ok: true })
    assert.equal((await app.inject('/app.js')).statusCode, 200)
    for (const url of ['/api/rooms', '/.env', '/%2e%2e/private.txt', '/missing.png']) {
      const response = await app.inject(url)
      assert.equal(response.statusCode, url === '/.env' ? 403 : 404, url)
      assert.ok(!response.body.includes('not-public'))
    }
  } finally {
    await app.close()
    await rm(fixture, { recursive: true, force: true })
  }
})

test('production refuses to start without a built homepage', async () => {
  const root = await mkdtemp(join(tmpdir(), 'dreamerie-unbuilt-'))
  try {
    await assert.rejects(createStaticApp(root), /Build the game/)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})
