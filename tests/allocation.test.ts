import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { test } from 'node:test'
import { dealInitialHands, recordExposure } from '../src/game/allocation.ts'
import { cards } from '../src/data/cards.ts'
import { concepts } from '../src/data/concepts.ts'
import { CURRENT_PLAYER_ID, players } from '../src/data/players.ts'

test('fixtures provide six concepts, three players, and 120 unique local illustrations', () => {
  assert.equal(concepts.length, 6)
  assert.equal(new Set(concepts.map((concept) => concept.id)).size, 6)
  assert.equal(players.length, 3)
  assert.equal(cards.length, 120)
  assert.equal(new Set(cards.map((card) => card.id)).size, 120)
  const assets = cards.map((card) => {
    assert.ok(card.description.length > 0)
    assert.match(card.artwork, /^\/artwork\/dreams\/card-\d{3}\.jpg$/)
    const asset = readFileSync(new URL(`../public${card.artwork}`, import.meta.url))
    assert.equal(asset.readUInt16BE(0), 0xffd8, `${card.id} must be a JPEG`)
    assert.equal(asset.readUInt16BE(asset.length - 2), 0xffd9)
    const provenance = JSON.parse(readFileSync(new URL(`../public${card.artwork.replace('.jpg', '.provenance.json')}`, import.meta.url), 'utf8').replace(/^\uFEFF/, ''))
    const hash = createHash('sha256').update(asset).digest('hex')
    assert.equal(hash, provenance.sha256)
    assert.equal(asset.length, provenance.bytes)
    assert.ok(provenance.width >= 800 && provenance.height >= 1000)
    assert.ok(Math.abs(provenance.width / provenance.height - 0.8) < 0.02)
    return hash
  })
  assert.equal(new Set(assets).size, 120, 'Every card needs a distinct illustration')
})

test('three hands have six cards each, with a disjoint available pool and private exposure', () => {
  for (const random of [() => 0, () => 0.5, () => 0.99999, Math.random]) {
    const state = dealInitialHands('week-fixture', cards, players, random)
    const dealt = [...state.hands.values()].flat()
    assert.equal(dealt.length, 18)
    assert.equal(new Set(dealt).size, 18)
    assert.equal(state.reserved.size, 18)
    assert.equal(state.available.length, cards.length - 18)
    assert.equal(new Set([...dealt, ...state.available]).size, cards.length)
    for (const player of players) {
      const hand = state.hands.get(player.id)
      assert.equal(hand?.length, 6)
      assert.deepEqual(state.seen.get(player.id), new Set(hand))
    }
  }
})

test('the same injected randomness reproduces the deal without changing input fixtures', () => {
  const before = JSON.stringify({ cards, players })
  assert.deepEqual(
    dealInitialHands('week-fixture', cards, players, () => 0.25),
    dealInitialHands('week-fixture', cards, players, () => 0.25),
  )
  assert.equal(JSON.stringify({ cards, players }), before)
})

test('exhaustion fails before drawing or partially dealing, and fixtures remain intact', () => {
  const shortDeck = cards.slice(0, 17)
  const before = JSON.stringify(shortDeck)
  let randomCalls = 0
  assert.throws(() => dealInitialHands('week-fixture', shortDeck, players, () => {
    randomCalls++
    return 0
  }), /need 18, have 17/)
  assert.equal(randomCalls, 0)
  assert.equal(JSON.stringify(shortDeck), before)
})

test('an exactly sufficient deck deals completely, and invalid fixture IDs are rejected', () => {
  assert.equal(dealInitialHands('week-fixture', cards.slice(0, 18), players).available.length, 0)
  assert.throws(() => dealInitialHands('week-fixture', [...cards, cards[0]!], players), /duplicate IDs/)
  assert.throws(() => dealInitialHands('week-fixture', cards, [...players, players[0]!]), /duplicate IDs/)
})

test('invalid random values fail without mutating fixtures', () => {
  const before = JSON.stringify(cards)
  for (const value of [-0.1, 1, NaN, Infinity]) {
    assert.throws(() => dealInitialHands('week-fixture', cards, players, () => value), /Randomness/)
  }
  assert.equal(JSON.stringify(cards), before)
})

test('exposure is per-player, deduplicated, immutable, and independent of allocation', () => {
  const state = dealInitialHands('week-fixture', cards, players, () => 0.5)
  const unseen = state.available[0]!
  const updated = recordExposure(state, CURRENT_PLAYER_ID, [unseen, unseen])
  assert.equal(state.seen.get(CURRENT_PLAYER_ID)?.size, 6)
  assert.equal(updated.seen.get(CURRENT_PLAYER_ID)?.size, 7)
  assert.ok(updated.seen.get(CURRENT_PLAYER_ID)?.has(unseen))
  assert.equal(updated.seen.get('player-nancy')?.size, 6)
  assert.equal(updated.available, state.available)
  assert.equal(updated.reserved, state.reserved)
  assert.equal(updated.hands, state.hands)
  assert.throws(() => recordExposure(state, 'player-missing', [unseen]), /unknown player/)
  assert.throws(() => recordExposure(state, CURRENT_PLAYER_ID, [unseen, 'card-missing']), /unknown card/)
  assert.equal(state.seen.get(CURRENT_PLAYER_ID)?.size, 6)
})
