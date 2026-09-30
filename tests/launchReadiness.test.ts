import assert from 'node:assert/strict'
import test from 'node:test'
import { preloadArtwork, type ArtworkStatus } from '../src/game/artworkLoading.ts'
import { shareResult } from '../src/game/sharing.ts'
import { confirmGuess, createRecallState, remainingGuessLabel } from '../src/game/dailyRecall.ts'

class FakeImage extends EventTarget { src = '' }
function loading(sources = ['original', 'one', 'two', 'three', 'four', 'five'], timeoutMs = 1_000) {
  const images: FakeImage[] = []
  const states: ArtworkStatus[] = []
  const stop = preloadArtwork(sources, state => states.push(state), {
    timeoutMs,
    createImage: () => { const image = new FakeImage(); images.push(image); return image },
  })
  return { images, states, stop }
}

test('start readiness waits for the original and every changed region', () => {
  const { images, states, stop } = loading()
  try {
    images.slice(0, -1).forEach(image => image.dispatchEvent(new Event('load')))
    assert.deepEqual(states, ['loading'])
    images.at(-1)!.dispatchEvent(new Event('load'))
    assert.deepEqual(states, ['loading', 'ready'])
    images[0].dispatchEvent(new Event('error'))
    assert.deepEqual(states, ['loading', 'ready'])
  } finally { stop() }
})

test('shared artwork URLs load once and cannot count duplicate load events', () => {
  const { images, states, stop } = loading(['original', 'patch', 'patch'])
  try {
    assert.equal(images.length, 2)
    images[0].dispatchEvent(new Event('load'))
    images[0].dispatchEvent(new Event('load'))
    assert.deepEqual(states, ['loading'])
    images[1].dispatchEvent(new Event('load'))
    assert.deepEqual(states, ['loading', 'ready'])
  } finally { stop() }
})

test('a failed image remains failed despite late loads; a fresh retry can succeed', () => {
  const first = loading(['original', 'patch'])
  first.images[0].dispatchEvent(new Event('error'))
  first.images.forEach(image => image.dispatchEvent(new Event('load')))
  assert.deepEqual(first.states, ['loading', 'error'])
  first.stop()
  const retry = loading(['original', 'patch'])
  retry.images.forEach(image => image.dispatchEvent(new Event('load')))
  assert.deepEqual(retry.states, ['loading', 'ready'])
  retry.stop()
})

test('stalled loading offers recovery instead of disabling Start indefinitely', async () => {
  const stalled = loading(['original'], 5)
  try {
    await new Promise(resolve => setTimeout(resolve, 20))
    assert.deepEqual(stalled.states, ['loading', 'error'])
    stalled.images[0].dispatchEvent(new Event('load'))
    assert.deepEqual(stalled.states, ['loading', 'error'])
  } finally { stalled.stop() }
})

test('unmount/StrictMode cleanup ignores obsolete loads and timeouts', async () => {
  const cancelled = loading(['original'], 5)
  cancelled.stop()
  cancelled.images[0].dispatchEvent(new Event('load'))
  cancelled.images[0].dispatchEvent(new Event('error'))
  await new Promise(resolve => setTimeout(resolve, 20))
  assert.deepEqual(cancelled.states, ['loading'])
})

test('empty artwork and image creation failure surface recoverable errors', () => {
  const empty = loading([])
  assert.deepEqual(empty.states, ['loading', 'error'])
  empty.stop()
  const states: ArtworkStatus[] = []
  const stop = preloadArtwork(['original'], state => states.push(state), { createImage: () => { throw new Error('unavailable') } })
  assert.deepEqual(states, ['loading', 'error'])
  stop()
})

test('native sharing and explicit Copy deliver the exact spoiler-free message', async () => {
  const text = 'Dreamerie #6\n4/5 · 1:07\nhttps://dreamerie.onrender.com/'
  const calls: string[] = []
  const actions = { share: async (data: { text: string }) => { calls.push('share:' + data.text) }, copy: async (value: string) => { calls.push('copy:' + value) } }
  assert.equal(await shareResult(text, false, actions), 'shared')
  assert.equal(await shareResult(text, true, actions), 'copied')
  assert.deepEqual(calls, ['share:' + text, 'copy:' + text])
  assert.equal(await shareResult(text, false, { copy: actions.copy }), 'copied')
})

test('cancelling a share sheet is not an error and does not silently copy', async () => {
  let copied = false
  assert.equal(await shareResult('result', false, {
    share: async () => { throw new DOMException('User cancelled', 'AbortError') },
    copy: async () => { copied = true },
  }), 'cancelled')
  assert.equal(copied, false)
})

test('denied/unavailable sharing and clipboard offer manual-copy fallback', async () => {
  assert.equal(await shareResult('result', false, {}), 'fallback')
  assert.equal(await shareResult('result', false, { share: async () => { throw new Error('denied') } }), 'fallback')
  assert.equal(await shareResult('result', true, { copy: async () => { throw new DOMException('denied', 'NotAllowedError') } }), 'fallback')
})

test('remaining guesses uses the singular only when one confirmation remains', () => {
  let state = createRecallState()
  assert.equal(remainingGuessLabel(state), '5 guesses left')
  for (let i = 0; i < 4; i++) state = confirmGuess(state, { x: .5, y: .5 }, i + 1, []).state
  assert.equal(remainingGuessLabel(state), '1 guess left')
  state = confirmGuess(state, { x: .5, y: .5 }, 5, []).state
  assert.equal(remainingGuessLabel(state), '0 guesses left')
})
