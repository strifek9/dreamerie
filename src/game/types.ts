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
