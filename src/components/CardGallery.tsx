import { useEffect, useRef, useState } from 'react'
import type { Card } from '../game/types.ts'

interface CardGalleryProps {
  cards: readonly Card[]
}

export default function CardGallery({ cards }: CardGalleryProps) {
  const [inspected, setInspected] = useState<Card | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (inspected && dialog.current && !dialog.current.open) {
      dialog.current.showModal()
    }
  }, [inspected])

  return (
    <>
      <ul className="card-gallery" aria-label="Your six image cards">
        {cards.map((card) => (
          <li key={card.id}>
            <button
              className="card-preview"
              aria-label={`Look closer: ${card.description}`}
              onClick={(event) => {
                opener.current = event.currentTarget
                setInspected(card)
              }}
            >
              <img src={card.artwork} alt={card.description} width="320" height="400" />
            </button>
          </li>
        ))}
      </ul>
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
            <img src={inspected.artwork} alt={inspected.description} width="320" height="400" />
            <button className="quiet-button" onClick={() => dialog.current?.close()} autoFocus>
              Return to your cards
            </button>
          </>
        )}
      </dialog>
    </>
  )
}
