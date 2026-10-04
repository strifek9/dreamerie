import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync, readdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { currentDreams, playableDreams, v3PlayableDreams } from '../src/v3/dailyDream.ts'
import { confirmGuess, createRecallState, getRemainingGuesses } from '../src/game/dailyRecall.ts'
import { differencesFor } from '../src/v2/landscapeCollection.ts'
import { v4PreviewDreams } from '../src/v4/previewDreams.ts'
import { previewHolidayForDream } from '../src/v4/previewHoliday.ts'
import { holidayDreams } from '../src/v3/holidayDreams.ts'

test('selected V4 cards have five bounded clues and preserve historical ID isolation', () => {
  assert.ok(v4PreviewDreams.length > 0)
  assert.equal(currentDreams.length, 383)
  assert.equal(playableDreams.length, 941)
  assert.equal(v3PlayableDreams.length, 558)
  for (const dream of v4PreviewDreams) {
    assert.ok(currentDreams.some(card => card.id === dream.id))
    assert.ok(!v3PlayableDreams.some(card => card.id === dream.id))
    assert.equal(dream.edits.length, 5)
    assert.equal(new Set(dream.edits.map(edit => edit.id)).size, 5)
    for (const edit of dream.edits) {
      const { left, top, width, height } = edit.box
      assert.ok(left >= 0 && top >= 0 && width > 0 && height > 0)
      assert.ok(left + width <= 1 && top + height <= 1)
      assert.ok((edit.source ?? dream.altered).startsWith('/artwork/v4/collection/'))
    }
    for (let i = 0; i < dream.edits.length; i++) for (let j = i + 1; j < dream.edits.length; j++) {
      const a = dream.edits[i].box, b = dream.edits[j].box
      assert.ok(a.left + a.width <= b.left + 1e-12 || b.left + b.width <= a.left + 1e-12 ||
        a.top + a.height <= b.top + 1e-12 || b.top + b.height <= a.top + 1e-12, `${dream.edits[i].id} overlaps ${dream.edits[j].id}`)
    }
  }
})

test('V4 proof retains its native-resolution, versioned generated source files', () => {
  const paths = readdirSync(new URL('../docs/artwork/', import.meta.url))
    .filter(path => /^V4_(?:PREVIEW|CARD_[a-z0-9-]+)_PROVENANCE\.json$/.test(path))
  assert.equal(paths.length, v4PreviewDreams.length)
  for (const path of paths) {
    const provenance = JSON.parse(readFileSync(new URL(`../docs/artwork/${path}`, import.meta.url), 'utf8'))
    const dream = v4PreviewDreams.find(card => card.id === provenance.cardId)
    assert.ok(dream, `${path} has no matching V4 preview card`)
    const assets = [provenance.original, provenance.alteredSource, ...provenance.refinedSources]
    assert.deepEqual(assets.map(asset => asset.path).sort(),
      [...new Set([dream.original, dream.altered, ...dream.edits.map(edit => edit.source ?? dream.altered)])].sort())
    for (const asset of assets) {
      const bytes = readFileSync(new URL(`../public${asset.path}`, import.meta.url))
      assert.equal(createHash('sha256').update(bytes).digest('hex').toUpperCase(), asset.sha256)
      assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a')
      // Built-in image edits may retain the source framing while varying the
      // raster width by one or two pixels; V3 masters use the same allowance.
      assert.ok(bytes.readUInt32BE(16) >= 1670 && bytes.readUInt32BE(16) <= 1672)
      assert.ok(bytes.readUInt32BE(20) >= 940 && bytes.readUInt32BE(20) <= 941)
    }
  }
})

test('every V4 preview completes with five distinct center hits and repeats spend a guess', () => {
  for (const dream of v4PreviewDreams) {
    const differences = differencesFor(dream)
    let state = createRecallState()
    const centers = differences.map(({ box }) => ({ x: box.left + box.width / 2, y: box.top + box.height / 2 }))
    for (let i = 0; i < centers.length; i++) {
      const next = confirmGuess(state, centers[i], i + 1, differences, dream.aspectRatio)
      assert.equal(next.state.confirmed[i].differenceId, differences[i].id, dream.id)
      assert.equal(next.result?.accuracy ?? null, i === 4 ? 5 : null, dream.id)
      state = next.state
    }
    assert.equal(getRemainingGuesses(state), 0, dream.id)
    assert.equal(confirmGuess(state, centers[0], 10, differences, dream.aspectRatio).state, state)
    const first = confirmGuess(createRecallState(), centers[0], 1, differences, dream.aspectRatio)
    const repeated = confirmGuess(first.state, centers[0], 2, differences, dream.aspectRatio)
    assert.equal(repeated.state.confirmed.length, 2, dream.id)
    assert.equal(repeated.state.confirmed[1].correct, false, dream.id)
    assert.equal(repeated.state.foundDifferenceIds.length, 1, dream.id)
  }
})

test('Seamstress fish clue changes and awards only one selectable fish', () => {
  const card = v4PreviewDreams.find(card => card.id === 'v4-dream-002')!
  assert.equal(card.edits.length, 5)
  const fish = card.edits.find(edit => edit.id === 'paper-fish')!
  assert.equal(fish.box.left, 975 / 1672)
  assert.equal(fish.box.top, 355 / 941)
  assert.equal(fish.box.width, 56 / 1672)
  assert.equal(fish.box.height, 47 / 941)
  const differences = differencesFor(card)
  const changed = confirmGuess(createRecallState(), {x:1003/1672,y:378/941}, 1, differences, card.aspectRatio)
  assert.equal(changed.state.confirmed[0].differenceId, 'paper-fish')
  for (const point of [{x:1080/1672,y:467/941},{x:1117/1672,y:562/941}]) {
    const unchanged = confirmGuess(createRecallState(), point, 1, differences, card.aspectRatio)
    assert.equal(unchanged.state.confirmed[0].correct, false)
    assert.equal(unchanged.state.foundDifferenceIds.length, 0)
  }
})

test('all eighteen isolated holiday IDs resolve their existing verses without mixing New Year dates', () => {
  assert.equal(holidayDreams.length, 18)
  for (const holiday of holidayDreams) {
    const slug = holiday.id.replace(/^(holiday-painted-|revisit-dream-)/, '')
    assert.equal(previewHolidayForDream('v4-dream-' + slug), holiday)
    assert.equal(holiday.verse.length, 2)
    assert.ok(holiday.verse.every(line => line.length > 0))
  }
  assert.equal(previewHolidayForDream('v4-dream-358'), undefined)
  assert.equal(previewHolidayForDream('painted-dream-001'), undefined)
  assert.notEqual(previewHolidayForDream('v4-dream-new-years'), previewHolidayForDream('v4-dream-new-years-eve'))
})
