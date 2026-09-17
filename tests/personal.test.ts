import assert from 'node:assert/strict'
import { test } from 'node:test'
import { cards } from '../src/data/cards.ts'
import { concepts } from '../src/data/concepts.ts'
import { CURRENT_PLAYER_ID, players } from '../src/data/players.ts'
import { normalizeClue, MAX_CLUE_LENGTH } from '../src/game/clues.ts'
import { chooseDream } from '../src/game/selection.ts'
import { createDreamWeek } from '../src/game/week.ts'
import { prepareSimulatedDreams } from '../src/game/simulation.ts'
import { createGuessingBoard, getGuessingBoardView } from '../src/game/board.ts'
import { assignDream } from '../src/game/assignments.ts'
import { getRecognitionPoints, scoreRound } from '../src/game/scoring.ts'
import { createLocalGame, localGameReducer, prepareGuessingAction } from '../src/game/localGame.ts'
import type { LocalGame } from '../src/game/localGame.ts'
import { getWeekRecap } from '../src/game/recap.ts'
import type { DreamMode, DreamWeek, GuessingRound } from '../src/game/types.ts'

function prepared(mode: DreamMode = 'personal'): DreamWeek {
  let week = prepareSimulatedDreams(createDreamWeek('week-test', concepts, cards, players, () => 0.3, mode), CURRENT_PLAYER_ID, () => 0.2)
  for (const concept of concepts) week = chooseDream(week, CURRENT_PLAYER_ID, concept.id,
    week.allocation.hands.get(CURRENT_PLAYER_ID)![0]!, `My words for ${concept.label}`)
  return week
}

function guesses(week: DreamWeek, round: GuessingRound, hits: number): GuessingRound {
  const decoys = round.cardIds.filter((id) => !week.allocation.reserved.has(id))
  let next = round
  for (const [index, playerId] of round.targetPlayerIds.entries()) {
    next = assignDream(next, playerId, index < hits ? week.dreams.get(playerId)!.get(round.conceptId)! : decoys[index]!)
  }
  return next
}

test('clues require meaningful bounded text; card and clue commit atomically', () => {
  assert.equal(normalizeClue('  A\n small\t dream  '), 'A small dream')
  assert.equal(normalizeClue('W'.repeat(MAX_CLUE_LENGTH)).length, MAX_CLUE_LENGTH)
  const week = createDreamWeek('week-test', concepts, cards, players, () => 0, 'personal')
  const card = week.allocation.hands.get(CURRENT_PLAYER_ID)![0]!
  const before = structuredClone(week)
  for (const clue of [undefined, '', ' \n\t', 'W'.repeat(MAX_CLUE_LENGTH + 1)]) {
    assert.throws(() => chooseDream(week, CURRENT_PLAYER_ID, concepts[0]!.id, card, clue), /word|characters/)
    assert.deepEqual(week, before)
  }
  const short = { ...week, allocation: { ...week.allocation, available: [] } }
  assert.throws(() => chooseDream(short, CURRENT_PLAYER_ID, concepts[0]!.id, card, 'A valid clue'), /No new dream cards/)
  assert.equal(short.clues.get(CURRENT_PLAYER_ID)!.size, 0)
  const chosen = chooseDream(week, CURRENT_PLAYER_ID, concepts[0]!.id, card, '  A small dream  ')
  assert.equal(chosen.clues.get(CURRENT_PLAYER_ID)!.get(concepts[0]!.id), 'A small dream')
  assert.equal(chosen.dreams.get(CURRENT_PLAYER_ID)!.get(concepts[0]!.id), card)
  assert.equal(chosen.allocation.hands.get(CURRENT_PLAYER_ID)!.length, 6)
  assert.ok(!chosen.allocation.hands.get(CURRENT_PLAYER_ID)!.includes(card))
  assert.deepEqual(week, before)
})

test('each player owns six clues; guessing exposes only the current friend’s clue', () => {
  const week = prepared()
  for (const player of players) assert.equal(week.clues.get(player.id)!.size, 6)
  const { round } = createGuessingBoard(week, CURRENT_PLAYER_ID, 0, () => 0)
  const view = getGuessingBoardView(week, round, cards, players)
  assert.equal(view.currentClue, week.clues.get('player-nancy')!.get(round.conceptId))
  assert.ok(!JSON.stringify(view).includes(week.clues.get('player-song')!.get(round.conceptId)!))
  const next = assignDream(round, 'player-nancy', round.cardIds[1]!)
  assert.equal(getGuessingBoardView(week, next, cards, players).currentClue, week.clues.get('player-song')!.get(round.conceptId))
  assert.equal(next.cardIds, round.cardIds)
})

test('recognition awards each correct guesser’s author a point except when everyone recognizes it', () => {
  assert.deepEqual([0, 1, 2].map((count) => getRecognitionPoints(count, 2)), [0, 1, 0])
  assert.deepEqual([0, 1, 2, 3, 4, 5].map((count) => getRecognitionPoints(count, 5)), [0, 1, 2, 3, 4, 0])
  for (const value of [-1, 3, 0.5, NaN]) assert.throws(() => getRecognitionPoints(value, 2), /Invalid/)
  for (const value of [0, -1, 1.5, NaN]) assert.throws(() => getRecognitionPoints(0, value), /Invalid/)
})

test('combined scoring covers every guessing/recognition combination and preserves classic scores', () => {
  for (const mode of ['personal', 'classic'] as const) {
    const week = prepared(mode)
    const rounds = players.map((player) => createGuessingBoard(week, player.id, 0, () => 0).round)
    for (const ownHits of [0, 1, 2]) for (const receivedHits of [0, 1, 2]) {
      const human = guesses(week, rounds[0]!, ownHits)
      // Both friends target Charlie first; zero hits chooses decoys for both targets.
      const friends = rounds.slice(1).map((round, index) => guesses(week, round, index < receivedHits ? 1 : 0))
      const before = structuredClone({ week, human, friends })
      const result = scoreRound(week, human, friends)
      const expectedRecognition = mode === 'personal' && receivedHits === 1 ? 1 : 0
      assert.equal(result.points, ownHits + expectedRecognition)
      assert.equal(result.recognitionPoints, expectedRecognition)
      assert.equal(result.guesses.filter((guess) => guess.correct).length, ownHits)
      assert.equal(result.receivedGuesses.filter((guess) => guess.correct).length, receivedHits)
      assert.deepEqual({ week, human, friends }, before)
    }
  }
})

test('everyone-correct keeps every guesser’s points but removes each author’s recognition award', () => {
  const week = prepared()
  const rounds = players.map((player) => guesses(week, createGuessingBoard(week, player.id, 0, () => 0).round, 2))
  for (const round of rounds) {
    const result = scoreRound(week, round, rounds.filter((other) => other.guesserId !== round.guesserId))
    assert.equal(result.points, 2)
    assert.equal(result.recognitionPoints, 0)
  }
  assert.throws(() => scoreRound(week, rounds[0]!), /Each friend/)
})

test('personal week reveals once, retains all clue/card associations, and restarts without old clues', () => {
  let state: LocalGame = createLocalGame(prepared(), CURRENT_PLAYER_ID)
  for (let day = 0; day < 6; day++) {
    state = localGameReducer(state, prepareGuessingAction(state, () => 0.4))
    assert.ok(state.phase === 'guessing')
    const complete = guesses(state.week, state.round, 2)
    for (const [playerId, cardId] of complete.assignments) {
      state = localGameReducer(state, { type: 'assign', roundId: complete.id, playerId, cardId })
    }
    assert.ok(state.phase === 'ready-for-reveal')
    const action = { type: 'reveal' as const, roundId: state.round.id }
    state = localGameReducer(state, action)
    assert.ok(state.phase === 'revealed')
    assert.equal(localGameReducer(state, action), state)
    assert.equal(state.results.length, day + 1)
  }
  const recap = getWeekRecap(state.week, state.results, CURRENT_PLAYER_ID, cards, players)
  for (const entry of recap) {
    assert.equal(entry.ownClue, state.week.clues.get(CURRENT_PLAYER_ID)!.get(entry.concept.id))
    for (const guess of entry.reveal.guesses) {
      assert.equal(guess.clue, state.week.clues.get(guess.player.id)!.get(entry.concept.id))
      assert.equal(guess.actual.id, state.week.dreams.get(guess.player.id)!.get(entry.concept.id))
    }
  }
  assert.ok(state.phase === 'revealed')
  state = localGameReducer(state, { type: 'finish-week', roundId: state.round.id })
  const fresh = createDreamWeek('week-fresh', concepts, cards, players, () => 0, 'personal')
  state = localGameReducer(state, { type: 'restart', sourceWeek: state.week, week: fresh })
  assert.equal(state.phase, 'preparation')
  assert.equal(state.week.clues.get(CURRENT_PLAYER_ID)!.size, 0)
  assert.equal(state.results.length, 0)
})
