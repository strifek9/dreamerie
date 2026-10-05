import { authoredMaskProblem } from '../src/v4/authoredMaskBounds.ts'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { currentDreams, playableDreams, v3PlayableDreams, publishedDreams } from '../src/v3/dailyDream.ts'
import { v4PreviewDreams } from '../src/v4/previewDreams.ts'

const preview = process.argv.includes('--preview')
const localRepair = process.argv.includes('--local-repair')
const cards = preview ? v4PreviewDreams : currentDreams
const expectedCount = 383
const errors = []
const ledger = JSON.parse(readFileSync(new URL('../docs/artwork/V4_DECISIONS.json', import.meta.url), 'utf8'))

function expect(condition, message) { if (!condition) errors.push(message) }
function overlaps(a, b) {
  return a.left < b.left + b.width - 1e-12 && b.left < a.left + a.width - 1e-12 &&
    a.top < b.top + b.height - 1e-12 && b.top < a.top + a.height - 1e-12
}
function exists(path) {
  return typeof path === 'string' && path.startsWith('/artwork/v4/') &&
    existsSync(new URL(`../public${path}`, import.meta.url))
}

if (preview) expect(cards.length > 0, 'No unreleased Version 4 preview cards are defined')
else expect(cards.length === expectedCount, `${cards.length}/${expectedCount} Version 4 cards are selected`)
expect(new Set(cards.map(card => card.id)).size === cards.length, 'Duplicate Version 4 card IDs')
expect(ledger.decisions.length === 383 && ledger.baselineCardCount === 383, 'Version 4 decision ledger does not cover the full baseline')
expect(new Set(ledger.decisions.map(row => row.id)).size === 383, 'Duplicate baseline IDs in Version 4 decision ledger')
if (preview) {
  expect(currentDreams.length === 383, 'Preview changed the 383-card daily rotation')
  expect(v3PlayableDreams.length === 558, 'The 558 pre-V4 saved IDs were not preserved')
  for (const card of cards) expect(!v3PlayableDreams.some(current => current.id === card.id), `${card.id}: V4 ID collides with a pre-V4 saved ID`)
} else {
  expect(typeof ledger.ownerCollectionReleaseApproval?.sourceId === 'string', 'Missing explicit owner collection release approval')
  const corrected = cards.filter(card => card.id.startsWith('v4-fairness-'))
  if (corrected.length && !localRepair) expect(typeof ledger.ownerFairnessPublicationApproval?.sourceId === 'string', 'Fairness repair publication is not authorized; use --local-repair for investigation validation only')
  expect(publishedDreams.length === 941, 'The 941 published saved IDs were not preserved')
  for (const old of publishedDreams) expect(playableDreams.some(card => card.id === old.id), `${old.id}: original published card missing`)
  const selectedIds = new Set(cards.map(card => card.id))
  const playableIds = new Set(playableDreams.map(card => card.id))
  const pending = ledger.decisions.filter(row => row.decision === 'pending')
  const revised = ledger.decisions.filter(row => row.decision === 'revise')
  expect(pending.length === 0, `${pending.length} cards still await a keep-or-revise decision`)
  expect(playableIds.size === playableDreams.length, 'Duplicate playable IDs')
  for (const row of ledger.decisions) {
    expect(playableIds.has(row.id), `${row.id}: published/saved version missing`)
    if (row.decision === 'retain') expect(selectedIds.has(row.id), `${row.id}: retained card is not current`)
    else if (row.decision === 'revise') {
      expect(typeof row.replacementId === 'string' && row.replacementId.startsWith('v4-'), `${row.id}: missing versioned replacement ID`)
      expect(selectedIds.has(row.replacementId), `${row.id}: replacement is not current`)
      expect(!selectedIds.has(row.id), `${row.id}: old card remains current after revision`)
    } else if (row.decision !== 'pending') expect(false, `${row.id}: unknown decision ${row.decision}`)
  }
  expect(cards.filter(card => card.id.startsWith('v4-')).length === revised.length,
    'Current Version 4 count does not match the decision ledger')
  expect(playableDreams.length >= 558 + revised.length, 'Published/saved-card IDs were not retained alongside revised cards')
}

for (const card of cards.filter(card => card.id.startsWith('v4-'))) {
  expect(card.id.startsWith('v4-'), `${card.id}: ID is not versioned`)
  expect(exists(card.original), `${card.id}: missing V4 original ${card.original}`)
  expect(card.edits.length === 5, `${card.id}: expected five clues, got ${card.edits.length}`)
  expect(new Set(card.edits.map(edit => edit.id)).size === 5, `${card.id}: duplicate clue IDs`)
  for (const edit of card.edits) {
    const maskProblem = authoredMaskProblem(edit)
    if (!preview) expect(!maskProblem, `${card.id}/${edit.id}: ${maskProblem}`)
    const { left, top, width, height } = edit.box
    expect(Number.isFinite(left) && Number.isFinite(top) && Number.isFinite(width) && Number.isFinite(height) &&
      left >= 0 && top >= 0 && width > 0 && height > 0 && left + width <= 1 && top + height <= 1,
    `${card.id}/${edit.id}: invalid hit region`)
    expect(exists(edit.source ?? card.altered), `${card.id}/${edit.id}: missing V4 altered source`)
  }
  for (let i = 0; i < card.edits.length; i++) for (let j = i + 1; j < card.edits.length; j++) {
    expect(!overlaps(card.edits[i].box, card.edits[j].box), `${card.id}: ${card.edits[i].id} and ${card.edits[j].id} overlap`)
  }
}

if (errors.length) {
  console.error(`Version 4 ${preview ? 'preview' : localRepair ? 'local repair (not authorized for publication)' : 'release'} is not ready:\n- ${errors.join('\n- ')}`)
  process.exitCode = 1
} else {
  if (!preview) assert.equal(cards.length, expectedCount)
  console.log(`Version 4 ${preview ? 'preview' : localRepair ? 'local repair (not authorized for publication)' : 'release'} metadata gate passed: ${cards.length} card(s), five nonoverlapping clues each, versioned sources present; published catalogue preserved.`)
}
