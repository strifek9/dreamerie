export type CardId = `card-${string}`
export type PlayerId = `player-${string}`
export type ConceptId = `concept-${string}`
export type WeekId = `week-${string}`
export type RoundId = `round-${string}`

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
  readonly dreams: ReadonlyMap<PlayerId, ReadonlyMap<ConceptId, CardId>>
}

/** Public introduction data deliberately has no daily schedule. */
export interface WeekIntroduction {
  readonly concepts: readonly DreamConcept[]
}

/** Ready round metadata without a displayed board. */
export interface PreparedRound {
  readonly conceptId: ConceptId
  readonly guesserId: PlayerId
  readonly targetPlayerIds: readonly PlayerId[]
}

/** Stored once on entry. Only own ownership is public; friends' Dreams stay private until reveal. */
export interface GuessingRound extends PreparedRound {
  readonly id: RoundId
  readonly ownDreamId: CardId
  readonly cardIds: readonly CardId[]
  readonly assignments: ReadonlyMap<PlayerId, CardId>
}

/** Presentation data contains no answer mapping or future schedule. */
export interface GuessingBoardView {
  readonly concept: DreamConcept
  readonly ownDream: Card
  readonly cards: readonly Card[]
  readonly friends: readonly Player[]
  readonly currentFriend: Player | null
  /** Player guesses only, never actual ownership or correctness. */
  readonly locks: ReadonlyMap<CardId, string>
}

export interface RoundResult {
  readonly roundId: RoundId
  readonly conceptId: ConceptId
  readonly points: number
  readonly guesses: readonly {
    readonly playerId: PlayerId
    readonly chosenCardId: CardId
    readonly actualCardId: CardId
    readonly correct: boolean
  }[]
}

export interface RoundRevealView {
  readonly points: number
  readonly guesses: readonly {
    readonly player: Player
    readonly chosen: Card
    readonly actual: Card
    readonly correct: boolean
  }[]
}

export interface WeekRecapEntry {
  readonly concept: DreamConcept
  readonly ownDream: Card
  readonly reveal: RoundRevealView
}
