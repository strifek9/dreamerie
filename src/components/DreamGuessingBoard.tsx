import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import type { CardId, GuessingBoardView, Player, PlayerId, RoundRevealView } from '../game/types'
import CardGallery from './CardGallery'
import DreamRoundReveal from './DreamRoundReveal'
import { getPlayerAccent } from '../data/playerAccents'
import { CURRENT_PLAYER_ID } from '../data/players'

interface DreamGuessingBoardProps {
  board: GuessingBoardView
  onUnlock?: (cardId: CardId) => void
  onAssign: (playerId: PlayerId, cardId: CardId) => void
  error: string | null
  reveal?: RoundRevealView
  onReveal?: () => void
  totalScore: number
  personal?: boolean
  maxScore?: number
  roster?: readonly Player[]
  selfId?: PlayerId
  busy?: boolean
}

export default function DreamGuessingBoard({ board, onUnlock, onAssign, error, reveal, onReveal, totalScore, personal = false, maxScore = 12, roster, selfId = CURRENT_PLAYER_ID, busy = false }: DreamGuessingBoardProps) {
  const heading = useRef<HTMLHeadingElement>(null)
  const friend = board.currentFriend
  const friendCount = board.friends.length
  const summaryCount = Math.max(1, friendCount)
  const summaryStyle: CSSProperties & Record<`--summary-${string}`, number> = {
    '--summary-phone-columns': Math.min(2, summaryCount),
    '--summary-tablet-columns': Math.min(3, summaryCount),
    '--summary-wide-columns': Math.min(5, summaryCount),
    '--summary-phone-rows': Math.ceil(summaryCount / 2),
    '--summary-tablet-rows': Math.ceil(summaryCount / 3),
    '--summary-wide-rows': Math.ceil(summaryCount / 5),
  }
  useEffect(() => {
    heading.current?.focus({ preventScroll: true })
  }, [friend?.id, board.concept.id, board.locks.size, reveal !== undefined])

  return (
    <main className={`gallery-page guessing-page${personal ? ' personal-guessing' : ''}`} aria-labelledby="round-concept">
      <header className="gallery-heading">
        <p className="eyebrow">{reveal ? board.concept.label : 'A shared dream'}</p>
        <h1 id="round-concept" ref={heading} tabIndex={-1}>
          <span key={`${board.concept.id}:${reveal ? 'revealed' : friend?.id ?? 'ready'}`} className="dream-prompt-text">
          {reveal ? 'The dream comes into focus.' : friend ? <><span className="player-name" data-player-accent={getPlayerAccent(friend.id, roster)}>{friend.name}</span>{personal ? '’s Dream Clue' : <> dreamt of <span className="dream-word">{board.concept.label}</span>.</>}</> : 'Your guesses are remembered.'}
          </span>
        </h1>
        <div className="round-summary-slot" style={summaryStyle} tabIndex={roster ? 0 : undefined} role={roster ? 'region' : undefined} aria-label={roster ? reveal ? 'This day’s results' : 'Current dream clue' : undefined}>
          {reveal ? <DreamRoundReveal reveal={reveal} showImages={false} showRecognition={personal} compact roster={roster} />
            : personal && <p className="current-clue clue-text">{board.currentClue ? `“${board.currentClue}”` : '\u00a0'}</p>}
        </div>
        <p className="invitation">{reveal ? `${reveal.guesses.filter((guess) => guess.correct).length} of ${friendCount} Dreams remembered.` : friend ? 'Select their Dream Card.' : 'Your guesses are held in mind.'}</p>
        <p className={`round-note${reveal ? ' week-score' : ''}`}>{reveal ? `Your week: ${totalScore} / ${maxScore} points` : !friend ? 'Their meanings are still hidden.' : '\u00a0'}</p>
      </header>
      {error && <p className="selection-error" role="alert">{error}</p>}
      <div className="round-board friends-dreams">
      <CardGallery
        cards={board.cards}
        ownCardId={board.ownDream.id}
        ownAccent={getPlayerAccent(selfId, roster)}
        busy={busy}
        revealedOwners={reveal ? new Map([...reveal.guesses, ...(reveal.unanswered ?? [])].map(({ player, actual }) => [actual.id, `${player.name}’s Dream`])) : undefined}
        label="Six dream cards in this dream"
        choiceKey={`${board.concept.id}:${friend?.id ?? 'complete'}:${JSON.stringify([...board.locks])}`}
        onChoose={!reveal && friend ? (cardId) => onAssign(friend.id, cardId) : undefined}
        confirmLabel={friend ? `Remember ${friend.name}’s dream` : undefined}
        selectionLabel={friend ? `Selected for ${friend.name}` : undefined}
        prompt={friend ? personal ? `${friend.name}: ${board.currentClue}` : `${friend.name} dreamt of ${board.concept.label}.` : 'Your guesses are remembered.'}
        action={reveal ? <span aria-hidden="true" /> : onReveal && <button className="quiet-button reveal-dreams" disabled={busy} onClick={onReveal}>Reveal their dreams</button>}
        locks={board.locks}
        lockAccents={new Map([...board.locks].map(([cardId, name]) => [cardId, getPlayerAccent(board.friends.find((player) => player.name === name)?.id, roster)]))}
        onUnlock={onUnlock}
      />
      </div>
    </main>
  )
}
