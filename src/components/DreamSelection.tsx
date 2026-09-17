import { useEffect, useRef } from 'react'
import CardGallery from './CardGallery'
import type { Card, CardId, DreamConcept } from '../game/types.ts'

interface DreamSelectionProps {
  concept: DreamConcept
  hand: readonly Card[]
  error: string | null
  remembered: string | null
  onChoose: (cardId: CardId) => void
}

export default function DreamSelection({ concept, hand, error, remembered, onChoose }: DreamSelectionProps) {
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    heading.current?.focus({ preventScroll: true })
  }, [concept.id])

  return (
    <section className="selection-page" aria-labelledby="dream-prompt">
      <div className="gallery-heading">
        <h2 id="dream-prompt" ref={heading} tabIndex={-1}>You dream of <span className="dream-word">{concept.label}</span>.</h2>
        <p className="invitation">What does that look like to you?</p>
        <p className="gallery-hint">Tap to choose. Hold to look closer.</p>
      </div>
      <p className="selection-feedback" role="status">
        {remembered ? `Your ${remembered} dream is remembered.` : ''}
      </p>
      {error && <p className="selection-error" role="alert">{error}</p>}
      <CardGallery cards={hand} choiceKey={concept.id} prompt={`You dream of ${concept.label}.`} onChoose={onChoose} />
    </section>
  )
}
