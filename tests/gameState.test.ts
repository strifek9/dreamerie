import assert from 'node:assert/strict'
import { test } from 'node:test'
import { cards } from '../src/data/cards.ts'
import { players } from '../src/data/players.ts'
import { concepts } from '../src/data/concepts.ts'
import { createDreamWeek } from '../src/game/week.ts'
import { chooseDream } from '../src/game/selection.ts'
import { createGuessingBoard } from '../src/game/board.ts'
import { assignDream } from '../src/game/assignments.ts'
import { decodeGame, encodeGame } from '../server/gameState.ts'
import { newRoomGame } from '../server/gamePreparation.ts'
import { openStore } from '../server/store.ts'
import Database from 'better-sqlite3'
import { lobbySchema } from '../server/migrations/001-lobbies.ts'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

test('stored game round-trips private Maps/Sets without drawing again or losing guesses', () => {
  let week = createDreamWeek('week-persistence', concepts, cards, players, () => 0.4, 'personal')
  const initial = encodeGame({ week, roundIndex: -1, rounds: [], dayPlayerIds: [] })
  assert.deepEqual(decodeGame(initial).week, week)
  for (const player of players) for (const concept of concepts) {
    week = chooseDream(week, player.id, concept.id, week.allocation.hands.get(player.id)![0], `${player.name}: ${concept.label}`)
  }
  const rounds = players.map((player) => {
    const opened = createGuessingBoard(week, player.id, 0, () => 0.3)
    week = opened.week
    return assignDream(opened.round, opened.round.targetPlayerIds[0], opened.round.cardIds[1])
  })
  const state = { week, roundIndex: 0, rounds, dayPlayerIds: players.map((player) => player.id) }
  assert.deepEqual(decodeGame(encodeGame(state)), state)
  assert.deepEqual(decodeGame(initial).week.allocation.reserved.size, 18)
})

test('stored state rejects unknown versions, duplicate entries and invalid allocations', () => {
  const state = { week: createDreamWeek('week-validation', concepts, cards, players, () => 0.4, 'personal'), roundIndex: -1, rounds: [], dayPlayerIds: [] }
  const encoded = encodeGame(state)
  const badVersion = JSON.parse(encoded); badVersion.version = 200
  assert.throws(() => decodeGame(JSON.stringify(badVersion)), /format/)
  const duplicate = JSON.parse(encoded); duplicate.week.dreams.push(duplicate.week.dreams[0])
  assert.throws(() => decodeGame(JSON.stringify(duplicate)), /Duplicate/)
  const badHand = JSON.parse(encoded); badHand.week.allocation.hands[0][1][0] = badHand.week.allocation.hands[1][1][0]
  assert.throws(() => decodeGame(JSON.stringify(badHand)), /invariants/)
  const missing = JSON.parse(encoded); missing.week.allocation.reserved = []
  assert.throws(() => decodeGame(JSON.stringify(missing)), /invariants/)
})

test('new room games deal only to the actual roster and make no simulated choices', () => {
  const roster = [{ id: 'player-host' as const, name: 'Kou' }, { id: 'player-tester' as const, name: 'Tester' }]
  const game = newRoomGame(roster)
  assert.deepEqual([...game.week.dreams.keys()], roster.map((player) => player.id))
  assert.ok([...game.week.dreams.values()].every((dreams) => dreams.size === 0))
  assert.ok([...game.week.clues.values()].every((clues) => clues.size === 0))
  assert.equal(new Set([...game.week.allocation.hands.values()].flat()).size, 12)
  assert.equal(game.week.allocation.available.length, 108)
  assert.deepEqual(decodeGame(encodeGame(game)), game)
})

test('gameplay migration preserves existing waiting rooms, sessions and receipts', (t) => {
  const directory = mkdtempSync(join(tmpdir(), 'dreamerie-migration-test-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  const path = join(directory, 'room.sqlite')
  const original = new Database(path)
  original.exec(lobbySchema)
  original.prepare('INSERT INTO sessions VALUES (?, ?, ?)').run('session-existing', 'hash-existing', 999999)
  original.prepare('INSERT INTO rooms (id, invite_code, host_id, created_at) VALUES (?, ?, ?, ?)').run('room-existing', 'ABCDEF0123', 'player-existing', 100)
  original.prepare('INSERT INTO memberships VALUES (?, ?, ?, ?, ?, ?)').run('player-existing', 'room-existing', 'session-existing', 'Kou', 'kou', 0)
  original.prepare('INSERT INTO command_receipts VALUES (?, ?, ?, ?)').run('session-existing', 'request-existing', 'fingerprint', 'room-existing')
  original.close()
  const migrated = openStore(path)
  try {
    assert.equal(migrated.pragma('user_version', { simple: true }), 2)
    assert.deepEqual(migrated.prepare('SELECT player_id, display_name FROM memberships').get(), { player_id: 'player-existing', display_name: 'Kou' })
    assert.equal(migrated.prepare('SELECT * FROM command_receipts').all().length, 1)
    assert.deepEqual(migrated.prepare('SELECT * FROM room_games').all(), [])
    assert.deepEqual(migrated.prepare('SELECT * FROM round_outcomes').all(), [])
    assert.deepEqual(migrated.pragma('foreign_key_check'), [])
  } finally { migrated.close() }
})
