export type CardId = `card-${string}`
export type PlayerId = `player-${string}`
export type ConceptId = `concept-${string}`
export type WeekId = `week-${string}`

export interface Card {
  readonly id: CardId
  readonly artwork: string
  readonly description: string
}

export interface Player {
  readonly id: PlayerId
  readonly name: string
}

export interface DreamConcept {
  readonly id: ConceptId
  readonly label: string
}

export interface WeekAllocation {
  readonly weekId: WeekId
  readonly cardIds: readonly CardId[]
  readonly available: readonly CardId[]
  readonly reserved: ReadonlySet<CardId>
  readonly hands: ReadonlyMap<PlayerId, readonly CardId[]>
  readonly seen: ReadonlyMap<PlayerId, ReadonlySet<CardId>>
}

export interface DreamWeek {
  readonly id: WeekId
  readonly concepts: readonly DreamConcept[]
  readonly setupOrder: readonly ConceptId[]
  readonly roundOrder: readonly ConceptId[]
  readonly allocation: WeekAllocation
}

/** Public introduction data deliberately has no daily schedule. */
export interface WeekIntroduction {
  readonly concepts: readonly DreamConcept[]
}
