import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createDreamWeek, getWeekIntroduction } from '../src/game/week.ts'
import { cards } from '../src/data/cards.ts'
import { concepts } from '../src/data/concepts.ts'
import { players } from '../src/data/players.ts'

test('a week has a separate reproducible round permutation and untouched setup order', () => {
  const original = JSON.stringify(concepts)
  const week = createDreamWeek('week-fixture', concepts, cards, players, () => 0)
  assert.equal(week.roundOrder.length, 6)
  assert.equal(new Set(week.roundOrder).size, 6)
  assert.deepEqual(new Set(week.roundOrder), new Set(concepts.map((concept) => concept.id)))
  assert.deepEqual(week.setupOrder, concepts.map((concept) => concept.id))
  assert.notEqual(week.roundOrder, week.setupOrder)
  assert.equal(JSON.stringify(concepts), original)
  assert.deepEqual(week, createDreamWeek('week-fixture', concepts, cards, players, () => 0))
  assert.equal(week.allocation.weekId, week.id)
  assert.equal(week.allocation.reserved.size, 18)
})

test('public introduction is independent of hidden schedule and contains only concepts', () => {
  const first = createDreamWeek('week-fixture', concepts, cards, players, () => 0)
  const second = createDreamWeek('week-fixture', concepts, cards, players, () => 0.9999)
  assert.notDeepEqual(first.roundOrder, second.roundOrder)
  assert.deepEqual(getWeekIntroduction(first), getWeekIntroduction(second))
  assert.deepEqual(Object.keys(getWeekIntroduction(first)), ['concepts'])
  assert.deepEqual(getWeekIntroduction(first).concepts, concepts)
  assert.notEqual(getWeekIntroduction(first).concepts, first.concepts)
  assert.ok(!JSON.stringify(getWeekIntroduction(first)).includes('roundOrder'))
})

test('a random permutation may coincidentally match display order without biasing the shuffle', () => {
  const week = createDreamWeek('week-fixture', concepts, cards, players, () => 0.9999)
  assert.deepEqual(week.roundOrder, week.setupOrder)
})

test('weeks reject invalid concept collections without modifying them', () => {
  assert.throws(() => createDreamWeek('week-fixture', concepts.slice(0, 5), cards, players), /exactly six/)
  const duplicateId = [...concepts.slice(0, 5), concepts[0]!]
  assert.throws(() => createDreamWeek('week-fixture', duplicateId, cards, players), /unique IDs/)
  const duplicateLabel = concepts.map((concept, index) => index === 1 ? { ...concept, label: ' time ' } : concept)
  assert.throws(() => createDreamWeek('week-fixture', duplicateLabel, cards, players), /distinct/)
  const emptyLabel = concepts.map((concept, index) => index === 1 ? { ...concept, label: ' ' } : concept)
  assert.throws(() => createDreamWeek('week-fixture', emptyLabel, cards, players), /non-empty/)
  const before = JSON.stringify(concepts)
  assert.throws(() => createDreamWeek('week-fixture', concepts, cards, players, () => 1), /Randomness/)
  assert.equal(JSON.stringify(concepts), before)
})
