import { dealInitialHands } from './allocation.ts'
import { shuffle } from './random.ts'
import type { Card, DreamConcept, DreamMode, DreamWeek, Player, WeekId, WeekIntroduction } from './types.ts'

export function createDreamWeek(
  id: WeekId,
  concepts: readonly DreamConcept[],
  cards: readonly Card[],
  players: readonly Player[],
  random: () => number = Math.random,
  mode: DreamMode = 'classic',
): DreamWeek {
  if (concepts.length !== 6) throw new Error('A Dream Week must contain exactly six concepts.')
  if (new Set(concepts.map((concept) => concept.id)).size !== 6) {
    throw new Error('Dream Week concepts must have unique IDs.')
  }
  const labels = concepts.map((concept) => concept.label.trim().toUpperCase())
  if (labels.some((label) => label.length === 0) || new Set(labels).size !== 6) {
    throw new Error('Dream Week concepts must have distinct, non-empty labels.')
  }
  const weekConcepts = concepts.map((concept) => ({ ...concept }))
  const setupOrder = weekConcepts.map((concept) => concept.id)
  const roundOrder = shuffle(setupOrder, random)
  return {
    mode,
    id,
    concepts: weekConcepts,
    setupOrder,
    roundOrder,
    allocation: dealInitialHands(id, cards, players, random),
    dreams: new Map(players.map((player) => [player.id, new Map()])),
    clues: new Map(players.map((player) => [player.id, new Map()])),
  }
}

export function getWeekIntroduction(week: DreamWeek): WeekIntroduction {
  // Copy only public concept metadata. Never derive this list from roundOrder.
  return { concepts: week.concepts.map(({ id, label }) => ({ id, label })) }
}
