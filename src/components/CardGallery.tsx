import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { Card, CardId } from '../game/types.ts'
import type { PlayerAccent } from '../data/playerAccents.ts'

interface CardGalleryProps {
  cards: readonly Card[]
  onChoose?: (cardId: CardId) => void
  label?: string
  choiceKey?: string
  confirmLabel?: string
  selectionLabel?: string
  prompt?: string
  action?: ReactNode
  locks?: ReadonlyMap<CardId, string>
  lockAccents?: ReadonlyMap<CardId, PlayerAccent | undefined>
  ownAccent?: PlayerAccent
  onUnlock?: (cardId: CardId) => void
  ownCardId?: CardId
  revealedOwners?: ReadonlyMap<CardId, string>
  imageLoading?: 'eager' | 'lazy'
  canConfirm?: boolean
  busy?: boolean
}

export default function CardGallery({ cards, onChoose, label = 'Your six dream cards', choiceKey,
  confirmLabel = 'Remember this dream', selectionLabel = 'Selected', prompt, action, locks, lockAccents, ownAccent, onUnlock, ownCardId, revealedOwners, imageLoading, canConfirm = true, busy = false }: CardGalleryProps) {
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
  }, [cards, choiceKey, busy])

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
          <li key={card.id} data-player-accent={card.id === ownCardId ? ownAccent : locks?.has(card.id) ? lockAccents?.get(card.id) : undefined}>
            <div className="card-frame">
            <button
              className={`card-preview${card.id === ownCardId ? ' own-card' : ''}${locks?.has(card.id) ? ' locked-card' : ''}`}
              aria-label={`${onChoose && card.id !== ownCardId && !locks?.has(card.id) ? 'Choose' : 'Look closer'}: ${card.description}${card.id === ownCardId ? ' Your Dream, view only.' : ''}${revealedOwners && card.id !== ownCardId ? ` ${revealedOwners.get(card.id) ?? 'A Stranger’s Dream'}.` : ''}${selected?.id === card.id ? ` ${selectionLabel}.` : ''}${locks?.has(card.id) ? ` Your guess for ${locks.get(card.id)}${revealedOwners ? '.' : ', locked.'}` : ''}`}
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
                if (onChoose && card.id !== ownCardId && !locks?.has(card.id)) {
                  if (!busy) setChoice({ card: selected?.id === card.id ? null : card, key: choiceKey })
                }
                else setInspected(card)
              }}
            >
              <img src={card.artwork} alt={card.description} width="320" height="400" decoding="async" loading={imageLoading} draggable={false}
                onLoad={(event) => event.currentTarget.classList.add('artwork-ready')} />
              {(ownCardId || onChoose) && (
                <span className="card-caption">
                  {card.id === ownCardId && <span className="own-card-marker">Your Dream <span>View only</span></span>}
                  {revealedOwners && card.id !== ownCardId && <span className="revealed-marker">{revealedOwners.get(card.id) ?? 'A Stranger’s Dream'}</span>}
                  {onChoose && selected?.id === card.id && <span className="chosen-marker">{selectionLabel}</span>}
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
                  <button className="unlock-guess" disabled={busy} aria-label={`Unlock ${locks.get(card.id)}’s guess`} onClick={() => onUnlock(card.id)}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                      <rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V6a4 4 0 0 1 8 0M12 14v3" />
                    </svg>
                    <span>Unlock guess</span>
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
                disabled={!selected || !canConfirm || busy}
                onClick={() => {
                  if (!selected || !canConfirm || committed.current) return
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
        aria-label="A closer look at your dream card"
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
