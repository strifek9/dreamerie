import { useEffect, useRef } from 'react'
import type { CardId, GuessingBoardView, PlayerId, RoundRevealView } from '../game/types'
import CardGallery from './CardGallery'
import DreamRoundReveal from './DreamRoundReveal'

interface DreamGuessingBoardProps {
  board: GuessingBoardView
  onReturn: () => void
  onAssign: (playerId: PlayerId, cardId: CardId) => void
  error: string | null
  reveal?: RoundRevealView
  onReveal?: () => void
  totalScore: number
}

export default function DreamGuessingBoard({ board, onReturn, onAssign, error, reveal, onReveal, totalScore }: DreamGuessingBoardProps) {
  const heading = useRef<HTMLHeadingElement>(null)
  const friend = board.currentFriend
  useEffect(() => {
    heading.current?.focus({ preventScroll: true })
    heading.current?.scrollIntoView({ block: 'start' })
  }, [friend?.id, board.concept.id, reveal !== undefined])

  return (
    <main className="gallery-page guessing-page" aria-labelledby="round-concept">
      <header className="gallery-heading">
        <p className="eyebrow">{reveal ? board.concept.label : 'A shared dream'}</p>
        <h1 id="round-concept" ref={heading} tabIndex={-1}>
          {reveal ? 'The dream comes into focus.' : friend ? `${friend.name} dreamt of ${board.concept.label}.` : 'Your guesses are remembered.'}
        </h1>
        <p className="invitation">{reveal ? `${reveal.points} of 2 Dreams remembered.` : friend ? 'What did their dream look like?' : 'Two Dreams, held in mind.'}</p>
        {reveal ? <p className="week-score">Your week: {totalScore} / 12 points</p> : !friend && <p className="gallery-hint">Their meanings are still hidden.</p>}
      </header>
      {error && <p className="selection-error" role="alert">{error}</p>}
      {reveal ? <DreamRoundReveal reveal={reveal} /> : <CardGallery
        cards={board.cards}
        label="Six images in this dream"
        choiceKey={friend?.id ?? 'complete'}
        onChoose={friend ? (cardId) => onAssign(friend.id, cardId) : undefined}
        confirmLabel={friend ? `Remember ${friend.name}’s dream` : undefined}
        locks={board.locks}
      />}
      {onReveal && <button className="quiet-button reveal-dreams" onClick={onReveal}>Reveal their dreams</button>}
      <button className="text-button" onClick={onReturn}>Return to the beginning</button>
    </main>
  )
}
