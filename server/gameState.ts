import type { DreamWeek, GuessingRound, RoundResult } from '../src/game/types.ts'
import * as p from '../shared/parse.ts'
import type { Store } from './store.ts'
import type { SharedOutcome, SharedWeek } from '../src/game/sharedWeek.ts'

export type StoredGame = SharedWeek

export function encodeGame(game: StoredGame): string {
  const { week } = game
  return JSON.stringify({ version: 1, roundIndex: game.roundIndex, dayPlayerIds: game.dayPlayerIds,
    week: { ...week,
      allocation: { ...week.allocation, reserved: [...week.allocation.reserved], hands: [...week.allocation.hands],
        seen: [...week.allocation.seen].map(([player, cards]) => [player, [...cards]]) },
      dreams: [...week.dreams].map(([player, dreams]) => [player, [...dreams]]),
      clues: [...week.clues].map(([player, clues]) => [player, [...clues]]),
    }, rounds: game.rounds.map((round) => ({ ...round, assignments: [...round.assignments] })),
  })
}

export function decodeGame(json: string): StoredGame {
  if (json.length > 256_000) throw new Error('Stored game is too large.')
  const root = p.object(JSON.parse(json))
  if (root.version !== 1) throw new Error('Unsupported game format.')
  const value = p.object(root.week), allocation = p.object(value.allocation)
  if (value.mode !== 'personal' && value.mode !== 'classic') throw new Error('Unsupported room game mode.')
  const week: DreamWeek = {
    id: p.weekId(value.id), mode: value.mode,
    concepts: p.array(value.concepts, (item) => { const concept = p.object(item); return { id: p.conceptId(concept.id), label: p.text(concept.label) } }, 6),
    setupOrder: p.array(value.setupOrder, p.conceptId, 6), roundOrder: p.array(value.roundOrder, p.conceptId, 6),
    allocation: {
      weekId: p.weekId(allocation.weekId), cardIds: p.array(allocation.cardIds, p.cardId, 120),
      available: p.array(allocation.available, p.cardId, 120), reserved: new Set(p.array(allocation.reserved, p.cardId, 120)),
      hands: p.entries(allocation.hands, p.playerId, (items) => p.array(items, p.cardId, 6)),
      seen: p.entries(allocation.seen, p.playerId, (items) => new Set(p.array(items, p.cardId, 120))),
    },
    dreams: p.entries(value.dreams, p.playerId, (items) => p.entries(items, p.conceptId, p.cardId)),
    clues: p.entries(value.clues, p.playerId, (items) => p.entries(items, p.conceptId, p.text)),
  }
  const rounds = p.array(root.rounds, (item): GuessingRound => {
    const round = p.object(item)
    return { id: p.roundId(round.id), guesserId: p.playerId(round.guesserId), conceptId: p.conceptId(round.conceptId),
      targetPlayerIds: p.array(round.targetPlayerIds, p.playerId, 5), ownDreamId: p.cardId(round.ownDreamId),
      cardIds: p.array(round.cardIds, p.cardId, 6), assignments: p.entries(round.assignments, p.playerId, p.cardId) }
  }, 6)
  const players = [...week.dreams.keys()]
  const dealt = [...week.allocation.hands.values()].flat().concat([...week.dreams.values()].flatMap((dreams) => [...dreams.values()]))
  const known = new Set(week.allocation.cardIds)
  if (players.length < 2 || players.length > 6 || week.concepts.length !== 6 || week.setupOrder.length !== 6 || week.roundOrder.length !== 6
    || new Set(week.setupOrder).size !== 6 || new Set(week.roundOrder).size !== 6
    || week.roundOrder.some((id) => !week.setupOrder.includes(id)) || week.concepts.some((concept) => !week.setupOrder.includes(concept.id))
    || week.allocation.weekId !== week.id || known.size !== week.allocation.cardIds.length
    || week.allocation.hands.size !== players.length || week.clues.size !== players.length || week.allocation.seen.size !== players.length
    || players.some((id) => week.allocation.hands.get(id)?.length !== 6 || !week.clues.has(id) || !week.allocation.seen.has(id))
    || new Set(dealt).size !== dealt.length || dealt.some((id) => !known.has(id) || !week.allocation.reserved.has(id))
    || week.allocation.reserved.size !== dealt.length || week.allocation.available.some((id) => !known.has(id) || week.allocation.reserved.has(id))
    || new Set(week.allocation.available).size !== week.allocation.available.length
    || week.allocation.available.length + dealt.length !== known.size
    || new Set(rounds.map((round) => round.guesserId)).size !== rounds.length
    || rounds.some((round) => !players.includes(round.guesserId))) {
    throw new Error('Stored game invariants do not match.')
  }
  const dayPlayerIds = p.array(root.dayPlayerIds, p.playerId, 6)
  if (new Set(dayPlayerIds).size !== dayPlayerIds.length || dayPlayerIds.some((id) => !players.includes(id))) throw new Error('Invalid day membership.')
  return { week, rounds, dayPlayerIds, roundIndex: p.integer(root.roundIndex, -1, 5) }
}

export function readGame(db: Store, roomId: string): StoredGame | undefined {
  const row = db.prepare<[string], { state_json: string }>('SELECT state_json FROM room_games WHERE room_id = ?').get(roomId)
  return row ? decodeGame(row.state_json) : undefined
}

export function decodeResult(json: string): RoundResult {
  const result = p.object(JSON.parse(json))
  const guesses = (value: unknown) => p.array(value, (item) => {
    const guess = p.object(item)
    return { playerId: p.playerId(guess.playerId), chosenCardId: p.cardId(guess.chosenCardId), actualCardId: p.cardId(guess.actualCardId), correct: p.boolean(guess.correct) }
  }, 5)
  return { guesserId: p.playerId(result.guesserId), roundId: p.roundId(result.roundId), conceptId: p.conceptId(result.conceptId),
    points: p.integer(result.points, 0, 9), recognitionPoints: p.integer(result.recognitionPoints, 0, 4), guesses: guesses(result.guesses), receivedGuesses: guesses(result.receivedGuesses) }
}
export function readResults(db: Store, roomId: string, player: string): SharedOutcome[] {
  return db.prepare<[string, string], { result_json: string }>('SELECT result_json FROM round_outcomes WHERE room_id = ? AND player_id = ? ORDER BY day_index')
    .all(roomId, player).map((row) => {
      const value = p.object(JSON.parse(row.result_json))
      return { result: decodeResult(JSON.stringify(value.result)), missed: p.boolean(value.missed), unanswered: p.array(value.unanswered, p.playerId, 5) }
    })
}
