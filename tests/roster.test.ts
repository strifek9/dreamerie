import assert from 'node:assert/strict'
import { test } from 'node:test'
import { cards } from '../src/data/cards.ts'
import { concepts } from '../src/data/concepts.ts'
import { getPlayerAccent } from '../src/data/playerAccents.ts'
import { createDreamWeek, getWeekIntroduction } from '../src/game/week.ts'
import { chooseDream } from '../src/game/selection.ts'
import { getPreparedFirstRound } from '../src/game/preparation.ts'
import { createGuessingBoard, getGuessingBoardView } from '../src/game/board.ts'
import { assignDream, getNextGuessTarget, unassignDream } from '../src/game/assignments.ts'
import { getTotalScore, scoreRound } from '../src/game/scoring.ts'
import { getWeekRecap } from '../src/game/recap.ts'
import type { Card, DreamMode, DreamWeek, GuessingRound, Player, PlayerId, RoundResult } from '../src/game/types.ts'

const roster = (count: number): Player[] => Array.from({ length: count }, (_, i) => ({ id: `player-${i + 1}`, name: `Friend ${i + 1}` }))
function random(seed: number): () => number {
  let value = seed
  return () => ((value = (Math.imul(value, 1664525) + 1013904223) >>> 0) / 2 ** 32)
}

/** Explicit human-style choices; no simulated Dream or guess functions. */
function prepare(players: readonly Player[], mode: DreamMode = 'personal', deck: readonly Card[] = cards): DreamWeek {
  let week = createDreamWeek('week-roster', concepts, deck, players, random(17), mode)
  const selected = new Set<string>()
  assert.equal(getPreparedFirstRound(week, players[0]!.id), null)
  for (const [slot, concept] of concepts.entries()) {
    for (const player of players) {
      const hand = week.allocation.hands.get(player.id)!
      const chosen = hand[slot]!
      const before = structuredClone(week)
      const updated = chooseDream(week, player.id, concept.id, chosen, `Clue ${player.id} ${concept.id}`)
      const replacement = updated.allocation.hands.get(player.id)!
      assert.equal(replacement.length, 6)
      assert.equal(replacement[slot], week.allocation.available[0])
      hand.forEach((cardId, i) => { if (i !== slot) assert.equal(replacement[i], cardId) })
      assert.ok(!replacement.includes(chosen))
      assert.ok(!selected.has(chosen))
      selected.add(chosen)
      assert.deepEqual(week, before)
      week = updated
    }
  }
  assert.equal(selected.size, 6 * players.length)
  assert.equal(week.allocation.reserved.size, 12 * players.length)
  const allHands = [...week.allocation.hands.values()].flat()
  assert.equal(new Set(allHands).size, 6 * players.length)
  assert.ok(allHands.every((id) => !selected.has(id)))
  for (const player of players) assert.ok(getPreparedFirstRound(week, player.id))
  return week
}

function fill(week: DreamWeek, round: GuessingRound, correct: boolean): GuessingRound {
  const answers = round.targetPlayerIds.map((id) => week.dreams.get(id)!.get(round.conceptId)!)
  const loneMiss = round.cardIds.find((id) => id !== round.ownDreamId && id !== answers[0])!
  return round.targetPlayerIds.reduce((next, id, index) => assignDream(next, id,
    correct ? answers[index]! : answers.length === 1 ? loneMiss : answers[(index + 1) % answers.length]!), round)
}

function dayBoards(input: DreamWeek, players: readonly Player[], day: number): { week: DreamWeek; rounds: GuessingRound[] } {
  let week = input
  const rounds: GuessingRound[] = []
  for (const player of players) {
    const prepared = createGuessingBoard(week, player.id, day, random(day + rounds.length + 2))
    week = prepared.week
    rounds.push(prepared.round)
  }
  return { week, rounds }
}

for (const count of [2, 3, 4, 5, 6]) {
  for (const mode of ['personal', 'classic'] as const) {
    test(`${count} players complete a ${mode} week with minimum card supply, private exposure and individual recaps`, () => {
      const players = roster(count)
      // Exact supply: every dealt/replacement card plus six days of unseen decoys.
      const deck = cards.slice(0, 12 * count + 6 * (6 - count))
      let week = prepare(players, mode, deck)
      const results = new Map<PlayerId, RoundResult[]>(players.map((player) => [player.id, []]))
      const expectedTotals = new Map(players.map((player) => [player.id, 0]))
      const decoysSeen = new Map(players.map((player) => [player.id, new Set<string>()]))
      assert.deepEqual(Object.keys(getWeekIntroduction(week)), ['concepts'])
      assert.equal(new Set(players.map((player) => getPlayerAccent(player.id, players))).size, count)
      for (let day = 0; day < 6; day++) {
        const rounds: GuessingRound[] = []
        const correctPlayers = players.filter((_, index) => day % 3 === 0 || (day % 3 === 2 && index % 2 === 0))
        for (const player of players) {
          const before = structuredClone(week)
          const prepared = createGuessingBoard(week, player.id, day, random(day * 7 + rounds.length + 1))
          const { round } = prepared
          const actuals = round.targetPlayerIds.map((id) => week.dreams.get(id)!.get(round.conceptId)!)
          assert.equal(round.targetPlayerIds.length, count - 1)
          assert.equal(new Set(round.cardIds).size, 6)
          assert.equal(round.cardIds[0], week.dreams.get(player.id)!.get(round.conceptId))
          assert.ok(actuals.every((id) => round.cardIds.includes(id)))
          const decoys = round.cardIds.filter((id) => id !== round.ownDreamId && !actuals.includes(id))
          assert.equal(decoys.length, 6 - count)
          for (const id of decoys) {
            assert.ok(!week.allocation.reserved.has(id))
            assert.ok(!week.allocation.seen.get(player.id)!.has(id))
            assert.ok(!decoysSeen.get(player.id)!.has(id))
            decoysSeen.get(player.id)!.add(id)
          }
          for (const other of players.filter((entry) => entry.id !== player.id)) {
            assert.equal(prepared.week.allocation.seen.get(other.id), week.allocation.seen.get(other.id))
          }
          assert.deepEqual(week, before)
          week = prepared.week
          const view = getGuessingBoardView(week, round, deck, players)
          assert.deepEqual(Object.keys(view).sort(), [
            'cards', 'concept', ...(mode === 'personal' ? ['currentClue'] : []), 'currentFriend', 'friends', 'locks', 'ownDream',
          ].sort())
          assert.equal(view.friends.length, count - 1)
          assert.equal(view.cards[0]!.id, round.ownDreamId)
          if (mode === 'personal') {
            const serialized = JSON.stringify(view)
            for (const [ownerId, clues] of week.clues) for (const [conceptId, clue] of clues) {
              if (ownerId !== view.currentFriend!.id || conceptId !== round.conceptId) assert.ok(!serialized.includes(clue))
            }
          }
          const complete = fill(week, round, correctPlayers.some((entry) => entry.id === player.id))
          assert.equal(getNextGuessTarget(complete), null)
          assert.equal(complete.cardIds, round.cardIds)
          assert.equal(new Set(complete.assignments.values()).size, count - 1)
          const firstTarget = round.targetPlayerIds[0]!
          const firstGuess = complete.assignments.get(firstTarget)!
          const unlocked = unassignDream(complete, firstGuess)
          assert.equal(unlocked.cardIds, round.cardIds)
          assert.equal(unlocked.assignments.size, count - 2)
          for (const [id, cardId] of complete.assignments) if (id !== firstTarget) assert.equal(unlocked.assignments.get(id), cardId)
          assert.deepEqual(assignDream(unlocked, firstTarget, firstGuess), complete)
          assert.throws(() => assignDream(unlocked, firstTarget, round.ownDreamId), /reference/)
          rounds.push(complete)
        }
        for (const round of rounds) {
          const received = correctPlayers.filter((player) => player.id !== round.guesserId).length
          const ownCorrect = correctPlayers.some((player) => player.id === round.guesserId)
          const recognition = mode === 'personal' && received < count - 1 ? received : 0
          const expected = (ownCorrect ? count - 1 : 0) + recognition
          const before = structuredClone({ week, rounds })
          const result = scoreRound(week, round, rounds.filter((entry) => entry.guesserId !== round.guesserId))
          assert.equal(result.guesserId, round.guesserId)
          assert.equal(result.points, expected)
          assert.equal(result.recognitionPoints, recognition)
          assert.equal(result.guesses.filter((entry) => entry.correct).length, ownCorrect ? count - 1 : 0)
          assert.equal(result.receivedGuesses.filter((entry) => entry.correct).length, received)
          assert.equal(result.receivedGuesses.length, count - 1)
          assert.deepEqual({ week, rounds }, before)
          results.get(round.guesserId)!.push(result)
          expectedTotals.set(round.guesserId, expectedTotals.get(round.guesserId)! + expected)
        }
      }
      for (const player of players) {
        assert.equal(decoysSeen.get(player.id)!.size, 6 * (6 - count))
        const ownResults = results.get(player.id)!
        assert.equal(getTotalScore(ownResults), expectedTotals.get(player.id))
        const recap = getWeekRecap(week, ownResults, player.id, deck, players)
        assert.deepEqual(recap.map((entry) => entry.concept.id), week.roundOrder)
        assert.equal(recap.length, 6)
        for (const entry of recap) {
          assert.equal(entry.ownDream.id, week.dreams.get(player.id)!.get(entry.concept.id))
          assert.equal(entry.ownClue, mode === 'personal' ? week.clues.get(player.id)!.get(entry.concept.id) : undefined)
          assert.equal(entry.reveal.guesses.length, count - 1)
          for (const guess of entry.reveal.guesses) {
            assert.equal(guess.actual.id, week.dreams.get(guess.player.id)!.get(entry.concept.id))
            assert.equal(guess.clue, mode === 'personal' ? week.clues.get(guess.player.id)!.get(entry.concept.id) : undefined)
          }
        }
        const otherPlayer = players.find((entry) => entry.id !== player.id)!
        assert.throws(() => getWeekRecap(week, ownResults, otherPlayer.id, deck, players), /different player/)
        assert.throws(() => getWeekRecap({ ...week, id: 'week-another' }, ownResults, player.id, deck, players), /different Dream Week/)
        assert.throws(() => getTotalScore([...ownResults, ownResults[0]!]), /once/)
        assert.throws(() => getTotalScore([ownResults[0]!, { ...ownResults[1]!, guesserId: otherPlayer.id }]), /same player/)
      }
    })
  }
}

test('week roster rejects invalid size, empty/whitespace IDs and duplicate IDs before drawing', () => {
  const invalid = [roster(0), roster(1), roster(7),
    [{ id: 'player-' as const, name: 'Empty' }, roster(2)[1]!],
    [{ id: 'player- white space' as const, name: 'Space' }, roster(2)[1]!],
    [{ id: 'player-trailing\n' as const, name: 'Newline' }, roster(2)[1]!],
    [roster(2)[0]!, roster(2)[0]!]]
  for (const players of invalid) {
    const before = structuredClone(players)
    let calls = 0
    assert.throws(() => createDreamWeek('week-invalid', concepts, cards, players, () => { calls++; return 0 }), /2 to 6|player ID|duplicate IDs/)
    assert.equal(calls, 0)
    assert.deepEqual(players, before)
  }
})

test('too few eligible decoys reject the entire board for every size needing decoys', () => {
  for (const count of [2, 3, 4, 5]) {
    const players = roster(count)
    const week = prepare(players)
    const short = { ...week, allocation: { ...week.allocation, available: week.allocation.available.slice(0, 5 - count) } }
    const before = structuredClone(short)
    let calls = 0
    assert.throws(() => createGuessingBoard(short, players[0]!.id, 0, () => { calls++; return 0 }), /Not enough unseen/)
    assert.equal(calls, 0)
    assert.deepEqual(short, before)
  }
})

test('six-player board works without any unallocated cards and shuffles only the five friends', () => {
  const players = roster(6)
  const week = prepare(players, 'personal', cards.slice(0, 72))
  assert.equal(week.allocation.available.length, 0)
  let calls = 0
  const { round } = createGuessingBoard(week, players[0]!.id, 0, () => { calls++; return 0.2 })
  assert.equal(calls, 4)
  assert.ok(round.cardIds.every((id) => week.allocation.reserved.has(id)))
})

test('scoring requires the full roster and rejects forged boards, days and participant lists', () => {
  const players = roster(6)
  const { week, rounds } = dayBoards(prepare(players), players, 0)
  const complete = rounds.map((round) => fill(week, round, true))
  const own = complete[0]!
  const others = complete.slice(1)
  const before = structuredClone({ week, complete })
  const invalid: GuessingRound[] = [
    { ...own, guesserId: 'player-unknown' },
    { ...own, id: 'round-old-week-1' },
    { ...own, conceptId: 'concept-unknown' },
    { ...own, targetPlayerIds: own.targetPlayerIds.slice(1), assignments: new Map([...own.assignments].slice(1)) },
    { ...own, targetPlayerIds: own.targetPlayerIds.map(() => own.targetPlayerIds[0]!) },
    { ...own, targetPlayerIds: [own.guesserId, ...own.targetPlayerIds.slice(1)] },
    { ...own, ownDreamId: own.cardIds[1]! },
    { ...own, cardIds: own.cardIds.slice(1) },
    { ...own, cardIds: own.cardIds.map(() => own.ownDreamId) },
    { ...own, assignments: new Map([...own.assignments].slice(1)) },
  ]
  for (const forged of invalid) assert.throws(() => scoreRound(week, forged, others))
  assert.throws(() => scoreRound(week, own, others.slice(1)), /Each friend/)
  assert.throws(() => scoreRound(week, own, others.map(() => others[0]!)), /Each friend/)
  assert.throws(() => scoreRound(week, own, [{ ...others[0]!, guesserId: 'player-stranger' }, ...others.slice(1)]), /same Dream day/)
  assert.throws(() => scoreRound(week, own, [{ ...others[0]!, targetPlayerIds: [own.guesserId],
    assignments: new Map([[own.guesserId, own.ownDreamId]]) }, ...others.slice(1)]), /week and its players/)
  assert.deepEqual({ week, complete }, before)
})

test('every recognition count is scored for each approved roster, including the two-player exception', () => {
  const awards = [[0, 0], [0, 1, 0], [0, 1, 2, 0], [0, 1, 2, 3, 0], [0, 1, 2, 3, 4, 0]]
  for (const count of [2, 3, 4, 5, 6]) {
    const players = roster(count)
    const { week, rounds } = dayBoards(prepare(players), players, 0)
    const own = fill(week, rounds[0]!, true)
    for (let hits = 0; hits < count; hits++) {
      const friends = rounds.slice(1).map((round, index) => fill(week, round, index < hits))
      const result = scoreRound(week, own, friends)
      assert.equal(result.recognitionPoints, awards[count - 2]![hits])
      assert.equal(result.points, count - 1 + awards[count - 2]![hits]!)
    }
  }
})
