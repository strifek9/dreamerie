import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { dealInitialHands, recordExposure } from '../src/game/allocation.ts'
import { cards } from '../src/data/cards.ts'
import { concepts } from '../src/data/concepts.ts'
import { CURRENT_PLAYER_ID, players } from '../src/data/players.ts'

test('fixtures provide six concepts, three players, and 60 visually distinct local assets', () => {
  assert.equal(concepts.length, 6)
  assert.equal(new Set(concepts.map((concept) => concept.id)).size, 6)
  assert.equal(players.length, 3)
  assert.equal(cards.length, 60)
  assert.equal(new Set(cards.map((card) => card.id)).size, 60)
  const assets = cards.map((card) => {
    assert.ok(card.description.length > 0)
    const svg = readFileSync(new URL(`../public${card.artwork}`, import.meta.url), 'utf8')
    assert.ok(svg.includes('viewBox="0 0 320 400"'))
    assert.ok(!svg.includes('<text'))
    return svg
  })
  assert.equal(new Set(assets).size, 60)
})

test('three hands have six cards each, with a disjoint available pool and private exposure', () => {
  for (const random of [() => 0, () => 0.5, () => 0.99999, Math.random]) {
    const state = dealInitialHands('week-fixture', cards, players, random)
    const dealt = [...state.hands.values()].flat()
    assert.equal(dealt.length, 18)
    assert.equal(new Set(dealt).size, 18)
    assert.equal(state.reserved.size, 18)
    assert.equal(state.available.length, 42)
    assert.equal(new Set([...dealt, ...state.available]).size, 60)
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
