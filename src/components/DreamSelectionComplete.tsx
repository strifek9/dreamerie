import { useEffect, useRef } from 'react'
import CardGallery from './CardGallery'
import type { Card } from '../game/types.ts'

interface DreamSelectionCompleteProps {
  remainingHand: readonly Card[]
  error: string | null
  personal?: boolean
}

export default function DreamSelectionComplete({ remainingHand, error, personal = false }: DreamSelectionCompleteProps) {
  const Heading = personal ? 'h1' : 'h2'
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    heading.current?.focus({ preventScroll: true })
    heading.current?.scrollIntoView({ block: 'start' })
  }, [])

  return (
    <section className="selection-complete" aria-labelledby="dreams-remembered">
      <span className="completion-mark" aria-hidden="true">✧</span>
      <Heading id="dreams-remembered" ref={heading} tabIndex={-1}>
        Your dreams are remembered.
      </Heading>
      <p className="invitation">Six Dreams, each your own.</p>
      <p className="gallery-hint">Rest here. Your friends’ dreams arrive tomorrow.</p>
      {error && <p className="selection-error" role="alert">{error}</p>}
      <p className="gallery-hint">You can still wander through the dream cards left in your hand.</p>
      <CardGallery cards={remainingHand} />
    </section>
  )
}
