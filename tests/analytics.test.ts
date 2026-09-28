import assert from 'node:assert/strict'
import test from 'node:test'
import { installCloudflareAnalytics, shouldLoadAnalytics } from '../src/analytics/cloudflare.ts'

const live = 'https://dreamerie-playtest.onrender.com/'

test('analytics runs only on the exact HTTPS production origin', () => {
  assert.equal(shouldLoadAnalytics(true, live), true)
  assert.equal(shouldLoadAnalytics(false, live), false)
  for (const href of ['http://127.0.0.1:5173/', 'http://localhost:5187/',
    'http://192.168.1.2:5173/', 'https://dreamerie-v2-playtest.onrender.com/',
    'http://dreamerie-playtest.onrender.com/', 'https://dreamerie-playtest.onrender.com:8443/',
    'https://dreamerie-playtest.onrender.com.example.org/', 'not a URL']) {
    assert.equal(shouldLoadAnalytics(true, href), false, href)
  }
})

test('review links stay untracked while ordinary shared visits are included', () => {
  for (const query of ['?dream=painted-dream-001', '?review=1', '?version=1', '?review=']) {
    assert.equal(shouldLoadAnalytics(true, live + query), false)
  }
  assert.equal(shouldLoadAnalytics(true, live + '?utm_source=family#hello'), true)
})

test('installs exactly one nonblocking vendor script with only the public site token', () => {
  const appended: Array<{id: string; type: string; async: boolean; src: string; attributes: Record<string, string>}> = []
  const doc = {
    getElementById: (id: string) => appended.find(element => element.id === id),
    createElement: (tag: string) => {
      assert.equal(tag, 'script')
      return { id: '', type: '', async: false, src: '', attributes: {} as Record<string, string>,
        setAttribute(name: string, value: string) { this.attributes[name] = value } }
    },
    body: { appendChild: (script: typeof appended[number]) => appended.push(script) },
  } as unknown as Document
  installCloudflareAnalytics(doc, true, live)
  installCloudflareAnalytics(doc, true, live)
  assert.equal(appended.length, 1)
  assert.equal(appended[0].type, 'module')
  assert.equal(appended[0].async, true)
  assert.equal(appended[0].src, 'https://static.cloudflareinsights.com/beacon.min.js')
  assert.deepEqual(JSON.parse(appended[0].attributes['data-cf-beacon']), {
    token: '1a8a88c8b9e341e58653cb2af0132599',
  })
})

test('disabled tracking touches no DOM, and installation failures never escape into gameplay', () => {
  const unavailable = { getElementById() { throw new Error('blocked') } } as unknown as Document
  assert.doesNotThrow(() => installCloudflareAnalytics(unavailable, true, live))
  const forbidden = new Proxy({}, { get() { assert.fail('development must not touch the DOM') } }) as Document
  installCloudflareAnalytics(forbidden, false, live)
  installCloudflareAnalytics(forbidden, true, 'http://localhost:5173/')
})
