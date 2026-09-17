import { useEffect, useRef, useState } from 'react'
import type { Card, CardId } from '../game/types.ts'

interface CardGalleryProps {
  cards: readonly Card[]
  onChoose?: (cardId: CardId) => void
  label?: string
  choiceKey?: string
  confirmLabel?: string
  locks?: ReadonlyMap<CardId, string>
  onUnlock?: (cardId: CardId) => void
  ownCardId?: CardId
  revealedOwners?: ReadonlyMap<CardId, string>
}

export default function CardGallery({ cards, onChoose, label = 'Your six image cards', choiceKey,
  confirmLabel = 'Remember this dream', locks, onUnlock, ownCardId, revealedOwners }: CardGalleryProps) {
  const [inspected, setInspected] = useState<Card | null>(null)
  const [choice, setChoice] = useState<{ card: Card | null; key: string | undefined }>({ card: null, key: choiceKey })
  // Reset on a new friend or changed commitments, including returning to an unlocked friend.
  if (choice.key !== choiceKey) setChoice({ card: null, key: choiceKey })
  const selected = choice.key === choiceKey && choice.card && choice.card.id !== ownCardId && !locks?.has(choice.card.id) ? choice.card : null
  const dialog = useRef<HTMLDialogElement>(null)
  const returnButton = useRef<HTMLButtonElement>(null)
  const opener = useRef<HTMLButtonElement | null>(null)
  const committed = useRef(false)

  useEffect(() => {
    // A rejected commitment rerenders the hand and permits a deliberate retry.
    committed.current = false
  }, [cards, choiceKey])

  useEffect(() => {
    if (inspected && dialog.current && !dialog.current.open) {
      dialog.current.showModal()
      returnButton.current?.focus()
    }
  }, [inspected])

  return (
    <>
      <ul className="card-gallery" aria-label={label}>
        {cards.map((card) => (
          <li key={card.id}>
            <button
              className={`card-preview${card.id === ownCardId ? ' own-card' : ''}`}
              aria-label={`${onChoose && card.id !== ownCardId && !locks?.has(card.id) ? 'Choose' : 'Look closer'}: ${card.description}${card.id === ownCardId ? ' Your Dream, view only.' : ''}${revealedOwners && card.id !== ownCardId ? ` ${revealedOwners.get(card.id) ?? 'Decoy'}.` : ''}${locks?.has(card.id) ? ` Your guess for ${locks.get(card.id)}${revealedOwners ? '.' : ', locked.'}` : ''}`}
              aria-pressed={onChoose && card.id !== ownCardId && !locks?.has(card.id) ? selected?.id === card.id : undefined}
              onClick={(event) => {
                opener.current = event.currentTarget
                if (onChoose && card.id !== ownCardId && !locks?.has(card.id)) setChoice({ card: selected?.id === card.id ? null : card, key: choiceKey })
                else setInspected(card)
              }}
            >
              <img src={card.artwork} alt={card.description} width="320" height="400" decoding="async" />
              {card.id === ownCardId && <span className="own-card-marker">Your Dream <span>View only</span></span>}
              {revealedOwners && card.id !== ownCardId && <span className="revealed-marker">{revealedOwners.get(card.id) ?? 'Decoy'}</span>}
              {onChoose && selected?.id === card.id && <span className="chosen-marker">Chosen</span>}
              {locks?.has(card.id) && <span className="locked-marker">{revealedOwners ? `Your guess: ${locks.get(card.id)}` : `${locks.get(card.id)} · Locked`}</span>}
            </button>
            {onUnlock && locks?.has(card.id) && (
              <button className="text-button unlock-guess" onClick={() => onUnlock(card.id)}>
                Unlock {locks.get(card.id)}’s guess
              </button>
            )}
          </li>
        ))}
      </ul>
      {onChoose && (
        <div className="inline-choice">
          <button
            className="quiet-button remember-dream"
            disabled={!selected}
            onClick={() => {
              if (!selected || committed.current) return
              committed.current = true
              onChoose(selected.id)
            }}
          >{confirmLabel}</button>
          {selected && (
            <button className="text-button" onClick={(event) => {
              opener.current = event.currentTarget
              setInspected(selected)
            }}>Look closer</button>
          )}
        </div>
      )}
      <dialog
        ref={dialog}
        className="artwork-dialog"
        aria-label="A closer look at your image card"
        onClose={() => {
          setInspected(null)
          opener.current?.focus()
        }}
      >
        {inspected && (
          <>
            <img src={inspected.artwork} alt={inspected.description} width="320" height="400" decoding="async" />
            <button ref={returnButton} className="quiet-button" onClick={() => dialog.current?.close()}>
              Return to your cards
            </button>
          </>
        )}
      </dialog>
    </>
  )
}
