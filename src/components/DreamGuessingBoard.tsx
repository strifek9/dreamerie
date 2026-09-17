import { useEffect, useRef } from 'react'
import type { CardId, GuessingBoardView, PlayerId, RoundRevealView } from '../game/types'
import CardGallery from './CardGallery'
import DreamRoundReveal from './DreamRoundReveal'

interface DreamGuessingBoardProps {
  board: GuessingBoardView
  onUnlock?: (cardId: CardId) => void
  onAssign: (playerId: PlayerId, cardId: CardId) => void
  error: string | null
  reveal?: RoundRevealView
  onReveal?: () => void
  totalScore: number
}

export default function DreamGuessingBoard({ board, onUnlock, onAssign, error, reveal, onReveal, totalScore }: DreamGuessingBoardProps) {
  const heading = useRef<HTMLHeadingElement>(null)
  const friend = board.currentFriend
  useEffect(() => {
    heading.current?.focus({ preventScroll: true })
  }, [friend?.id, board.concept.id, board.locks.size, reveal !== undefined])

  return (
    <main className="gallery-page guessing-page" aria-labelledby="round-concept">
      <header className="gallery-heading">
        <p className="eyebrow">{reveal ? board.concept.label : 'A shared dream'}</p>
        <h1 id="round-concept" ref={heading} tabIndex={-1}>
          <span key={`${board.concept.id}:${reveal ? 'revealed' : friend?.id ?? 'ready'}`} className="dream-prompt-text">
          {reveal ? 'The dream comes into focus.' : friend ? <>{friend.name} dreamt of <span className="dream-word">{board.concept.label}</span>.</> : 'Your guesses are remembered.'}
          </span>
        </h1>
        <p className="invitation">{reveal ? `${reveal.points} of 2 Dreams remembered.` : friend ? 'What did their dream look like?' : 'Two Dreams, held in mind.'}</p>
        <p className={`round-note${reveal ? ' week-score' : ''}`}>{reveal ? `Your week: ${totalScore} / 12 points` : !friend ? 'Their meanings are still hidden.' : '\u00a0'}</p>
      </header>
      {error && <p className="selection-error" role="alert">{error}</p>}
      <div className="round-board friends-dreams">
      <CardGallery
        cards={board.cards}
        ownCardId={board.ownDream.id}
        revealedOwners={reveal ? new Map(reveal.guesses.map(({ player, actual }) => [actual.id, `${player.name}’s Dream`])) : undefined}
        label="Six images in this dream"
        choiceKey={`${board.concept.id}:${friend?.id ?? 'complete'}:${JSON.stringify([...board.locks])}`}
        onChoose={!reveal && friend ? (cardId) => onAssign(friend.id, cardId) : undefined}
        confirmLabel={friend ? `Remember ${friend.name}’s dream` : undefined}
        prompt={friend ? `${friend.name} dreamt of ${board.concept.label}.` : 'Your guesses are remembered.'}
        action={reveal ? <DreamRoundReveal reveal={reveal} showImages={false} /> : onReveal && <button className="quiet-button reveal-dreams" onClick={onReveal}>Reveal their dreams</button>}
        locks={board.locks}
        onUnlock={onUnlock}
      />
      </div>
    </main>
  )
}
