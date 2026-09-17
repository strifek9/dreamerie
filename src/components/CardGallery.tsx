import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { Card, CardId } from '../game/types.ts'

interface CardGalleryProps {
  cards: readonly Card[]
  onChoose?: (cardId: CardId) => void
  label?: string
  choiceKey?: string
  confirmLabel?: string
  prompt?: string
  action?: ReactNode
  locks?: ReadonlyMap<CardId, string>
  onUnlock?: (cardId: CardId) => void
  ownCardId?: CardId
  revealedOwners?: ReadonlyMap<CardId, string>
}

export default function CardGallery({ cards, onChoose, label = 'Your six image cards', choiceKey,
  confirmLabel = 'Remember this dream', prompt, action, locks, onUnlock, ownCardId, revealedOwners }: CardGalleryProps) {
  const [inspected, setInspected] = useState<Card | null>(null)
  const [choice, setChoice] = useState<{ card: Card | null; key: string | undefined }>({ card: null, key: choiceKey })
  // Reset on a new friend or changed commitments, including returning to an unlocked friend.
  if (choice.key !== choiceKey) setChoice({ card: null, key: choiceKey })
  const selected = choice.key === choiceKey && choice.card && choice.card.id !== ownCardId && !locks?.has(choice.card.id) ? choice.card : null
  const dialog = useRef<HTMLDialogElement>(null)
  const returnButton = useRef<HTMLButtonElement>(null)
  const opener = useRef<HTMLButtonElement | null>(null)
  const committed = useRef(false)
  const press = useRef<{ pointerId: number; x: number; y: number; started: number } | null>(null)
  const suppressClick = useRef(false)

  useEffect(() => {
    // A rejected commitment rerenders the hand and permits a deliberate retry.
    committed.current = false
    press.current = null
    suppressClick.current = false
  }, [cards, choiceKey])

  useEffect(() => {
    if (inspected && dialog.current && !dialog.current.open) {
      dialog.current.showModal()
      returnButton.current?.focus()
    }
  }, [inspected])

  return (
    <>
      <ul className={`card-gallery${ownCardId ? ' guessing-gallery' : onChoose ? ' choosing-gallery' : ''}`} aria-label={label}>
        {cards.map((card) => (
          <li key={card.id}>
            <div className="card-frame">
            <button
              className={`card-preview${card.id === ownCardId ? ' own-card' : ''}`}
              aria-label={`${onChoose && card.id !== ownCardId && !locks?.has(card.id) ? 'Choose' : 'Look closer'}: ${card.description}${card.id === ownCardId ? ' Your Dream, view only.' : ''}${revealedOwners && card.id !== ownCardId ? ` ${revealedOwners.get(card.id) ?? 'Decoy'}.` : ''}${locks?.has(card.id) ? ` Your guess for ${locks.get(card.id)}${revealedOwners ? '.' : ', locked.'}` : ''}`}
              aria-pressed={onChoose && card.id !== ownCardId && !locks?.has(card.id) ? selected?.id === card.id : undefined}
              onPointerDown={(event) => {
                suppressClick.current = false
                if (!event.isPrimary || event.button !== 0) { press.current = null; return }
                press.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, started: performance.now() }
              }}
              onPointerMove={(event) => {
                const start = press.current
                if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 10) {
                  press.current = null
                  suppressClick.current = true
                }
              }}
              onPointerCancel={() => { press.current = null; suppressClick.current = true }}
              onPointerLeave={() => { press.current = null }}
              onPointerUp={(event) => {
                const start = press.current
                press.current = null
                if (!start || start.pointerId !== event.pointerId || performance.now() - start.started < 450) return
                // Inspect on release, with no timer or change to the tentative choice.
                suppressClick.current = true
                opener.current = event.currentTarget
                setInspected(card)
              }}
              onContextMenu={(event) => { event.preventDefault() }}
              onClick={(event) => {
                if (event.detail > 0 && suppressClick.current) { suppressClick.current = false; return }
                opener.current = event.currentTarget
                if (onChoose && card.id !== ownCardId && !locks?.has(card.id)) setChoice({ card: selected?.id === card.id ? null : card, key: choiceKey })
                else setInspected(card)
              }}
            >
              <img src={card.artwork} alt={card.description} width="320" height="400" decoding="async" draggable={false}
                onLoad={(event) => event.currentTarget.classList.add('artwork-ready')} />
              {(ownCardId || onChoose) && (
                <span className="card-caption">
                  {card.id === ownCardId && <span className="own-card-marker">Your Dream <span>View only</span></span>}
                  {revealedOwners && card.id !== ownCardId && <span className="revealed-marker">{revealedOwners.get(card.id) ?? 'Decoy'}</span>}
                  {onChoose && selected?.id === card.id && <span className="chosen-marker">Chosen</span>}
                  {locks?.has(card.id) && <span className="locked-marker">{revealedOwners ? `Your guess: ${locks.get(card.id)}` : `${locks.get(card.id)} · Locked`}</span>}
                </span>
              )}
            </button>
            {(ownCardId || onChoose) && (
              <button className="inspect-card" aria-label={`Look closer: ${card.description}`} title="Look closer" onClick={(event) => {
                opener.current = event.currentTarget
                setInspected(card)
              }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <circle cx="10" cy="10" r="6" /><path d="m14.5 14.5 5 5M7 10h6m-3-3v6" />
                </svg>
              </button>
            )}
            </div>
            {ownCardId && (
              <div className="card-revision">
                {onUnlock && locks?.has(card.id) && (
                  <button className="text-button unlock-guess" onClick={() => onUnlock(card.id)}>
                    Unlock {locks.get(card.id)}’s guess
                  </button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      {(onChoose || action) && (
        <div className={`inline-choice${revealedOwners ? ' revealed-choice' : ''}`}>
          {!revealedOwners && <p className="choice-prompt" role="status"><span key={prompt} className="dream-prompt-text">{prompt ?? '\u00a0'}</span></p>}
          {onChoose ? (
            <>
              <button
                className="quiet-button remember-dream"
                disabled={!selected}
                onClick={() => {
                  if (!selected || committed.current) return
                  committed.current = true
                  onChoose(selected.id)
                }}
              >{confirmLabel}</button>
            </>
          ) : <div className="final-choice">{action}</div>}
        </div>
      )}
      <dialog
        ref={dialog}
        className="artwork-dialog"
        aria-label="A closer look at your image card"
        onClose={() => {
          setInspected(null)
          opener.current?.focus({ preventScroll: true })
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
