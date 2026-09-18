import assert from 'node:assert/strict'
import { test } from 'node:test'
import { cards } from '../src/data/cards.ts'
import { createDreamWeek } from '../src/game/week.ts'
import { assignDream } from '../src/game/assignments.ts'
import { addSharedPlayer, nextSharedDream, openSharedDay, saveSharedDream, scoreSharedDay, unfinishedSharedDay, type SharedWeek } from '../src/game/sharedWeek.ts'
import { roomConcepts } from '../server/gamePreparation.ts'
import { decodeGame, encodeGame } from '../server/gameState.ts'
import type { Player, PlayerId } from '../src/game/types.ts'

function fresh(count: number): SharedWeek {
  const roster: Player[] = Array.from({ length: count }, (_, index) => ({ id: `player-${index}`, name: `Dreamer ${index}` }))
  return { week: createDreamWeek('week-shared', roomConcepts, cards, roster, () => 0.25, 'personal'), roundIndex: -1, rounds: [], dayPlayerIds: [] }
}
function prepare(game: SharedWeek, player: PlayerId): SharedWeek {
  let next
  while ((next = nextSharedDream(game, player))) game = saveSharedDream(game, player, next.id, game.week.allocation.hands.get(player)![0], `${player}: ${next.label}`)
  return game
}
function complete(game: SharedWeek, player: PlayerId, correct: boolean): SharedWeek {
  let round = game.rounds.find((round) => round.guesserId === player)!
  const answers = round.targetPlayerIds.map((target) => game.week.dreams.get(target)!.get(round.conceptId)!)
  const options = round.cardIds.filter((id) => id !== round.ownDreamId)
  for (const target of round.targetPlayerIds) {
    const actual = game.week.dreams.get(target)!.get(round.conceptId)!
    const card = correct ? actual : options.find((card) => card !== actual && !answers.includes(card) && ![...round.assignments.values()].includes(card))
      ?? options.find((card) => card !== actual && ![...round.assignments.values()].includes(card))!
    round = assignDream(round, target, card)
  }
  return { ...game, rounds: game.rounds.map((item) => item.guesserId === player ? round : item) }
}

for (const count of [2, 3, 4, 5, 6]) test(`${count} real players complete six shared days with persisted fixed boards and once-per-day results`, () => {
  let game = fresh(count)
  for (const player of game.week.dreams.keys()) game = prepare(game, player)
  const decoysSeen = new Map<PlayerId, Set<string>>()
  for (let day = 0; day < 6; day++) {
    game = openSharedDay(game, () => 0.37)
    const boards = game.rounds.map((round) => round.cardIds)
    for (const round of game.rounds) {
      assert.equal(round.cardIds.length, 6)
      assert.equal(new Set(round.cardIds).size, 6)
      assert.equal(round.cardIds[0], round.ownDreamId)
      assert.equal(round.targetPlayerIds.length, count - 1)
      const decoys = round.cardIds.filter((id) => !game.week.allocation.reserved.has(id))
      assert.equal(decoys.length, 6 - count)
      const seen = decoysSeen.get(round.guesserId) ?? new Set()
      assert.ok(decoys.every((id) => !seen.has(id)))
      decoys.forEach((id) => seen.add(id)); decoysSeen.set(round.guesserId, seen)
      game = complete(game, round.guesserId, true)
    }
    assert.deepEqual(game.rounds.map((round) => round.cardIds), boards)
    assert.deepEqual(unfinishedSharedDay(game), [])
    const outcomes = scoreSharedDay(game)
    assert.ok(outcomes.every((outcome) => !outcome.missed && outcome.result.points === count - 1 && outcome.result.recognitionPoints === 0))
    assert.deepEqual(decodeGame(encodeGame(game)), game)
  }
  assert.throws(() => openSharedDay(game), /already opened/)
})

test('late joining leaves the current day untouched and prepares only unopened Dreams', () => {
  let game = fresh(2)
  for (const player of game.week.dreams.keys()) game = prepare(game, player)
  game = openSharedDay(game)
  const before = encodeGame(game)
  const rounds = game.rounds
  game = addSharedPlayer(game, 'player-late')
  assert.deepEqual(game.rounds, rounds)
  assert.deepEqual(game.dayPlayerIds, ['player-0', 'player-1'])
  assert.equal(game.week.allocation.hands.get('player-late')!.length, 6)
  assert.throws(() => saveSharedDream(game, 'player-late', game.week.roundOrder[0], game.week.allocation.hands.get('player-late')![0], 'Too late'), /no longer/)
  game = prepare(game, 'player-late')
  assert.equal(game.week.dreams.get('player-late')!.size, 5)
  assert.equal(scoreSharedDay(game).length, 2, 'late player gets no retroactive day result')
  game = openSharedDay(game)
  assert.equal(game.rounds.length, 3)
  assert.equal(game.rounds[0].targetPlayerIds.length, 2)
  assert.equal(decodeGame(before).week.dreams.size, 2, 'input snapshot was not mutated')
})

test('missing preparation is replaced by decoys; future preparation cannot change today', () => {
  let game = prepare(fresh(3), 'player-0')
  game = openSharedDay(game)
  assert.equal(game.rounds.length, 1)
  assert.equal(game.rounds[0].targetPlayerIds.length, 0)
  assert.equal(game.rounds[0].cardIds.filter((card) => !game.week.allocation.reserved.has(card)).length, 5)
  const board = game.rounds[0].cardIds
  game = prepare(game, 'player-1')
  assert.deepEqual(game.rounds[0].cardIds, board)
  assert.equal(game.week.dreams.get('player-1')!.size, 5)
  const outcomes = scoreSharedDay(game)
  assert.deepEqual(outcomes.map((outcome) => outcome.missed), [false, true, true])
  assert.ok(outcomes.every((outcome) => outcome.result.points === 0))
  assert.equal(openSharedDay(game).rounds.length, 2)
})

test('incomplete guesses earn no guessing or recognition points; finished guessers define everyone', () => {
  let game = fresh(4)
  for (const player of game.week.dreams.keys()) game = prepare(game, player)
  game = openSharedDay(game)
  game = complete(game, 'player-0', true)
  game = complete(game, 'player-1', true)
  game = complete(game, 'player-2', false)
  const partial = game.rounds[3]
  const target = partial.targetPlayerIds[0]
  game = { ...game, rounds: game.rounds.map((round) => round === partial ? assignDream(partial, target, game.week.dreams.get(target)!.get(partial.conceptId)!) : round) }
  const outcomes = scoreSharedDay(game)
  assert.equal(outcomes[3].missed, true)
  assert.equal(outcomes[3].result.points, 0)
  assert.equal(outcomes[3].result.recognitionPoints, 0)
  assert.equal(outcomes[3].unanswered.length, 2)
  assert.equal(outcomes[0].result.recognitionPoints, 1)
  assert.equal(outcomes[1].result.recognitionPoints, 1)
  assert.equal(outcomes[2].result.recognitionPoints, 0, 'all other finished guessers identified this Dream')
  assert.equal(outcomes[0].result.receivedGuesses.length, 2, 'partial guess is excluded from recognition')
})

test('nobody or only one finished player closes without inventing points', () => {
  let empty = openSharedDay(fresh(2))
  assert.ok(scoreSharedDay(empty).every((outcome) => outcome.missed && outcome.result.points === 0))
  empty = openSharedDay(empty)
  assert.equal(empty.rounds.length, 0)
  let game = fresh(2)
  for (const player of game.week.dreams.keys()) game = prepare(game, player)
  game = complete(openSharedDay(game), 'player-0', true)
  const outcomes = scoreSharedDay(game)
  assert.equal(outcomes[0].result.points, 1)
  assert.equal(outcomes[0].result.recognitionPoints, 0)
  assert.equal(outcomes[1].result.points, 0)
  assert.equal(outcomes[1].result.receivedGuesses.length, 1)
})
