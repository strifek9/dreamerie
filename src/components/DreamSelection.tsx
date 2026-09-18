import { useEffect, useRef, useState } from 'react'
import { MAX_CLUE_LENGTH } from '../game/clues'
import CardGallery from './CardGallery'
import DreamPageCue from './DreamPageCue'
import type { Card, CardId, DreamConcept } from '../game/types.ts'

interface DreamSelectionProps {
  concept: DreamConcept
  hand: readonly Card[]
  error: string | null
  remembered: string | null
  personal?: boolean
  busy?: boolean
  completedDreams?: number
  onChoose: (cardId: CardId, clue?: string) => void
}

export default function DreamSelection({ concept, hand, error, remembered, personal = false, onChoose, busy = false, completedDreams = 0 }: DreamSelectionProps) {
  const Heading = personal ? 'h1' : 'h2'
  const heading = useRef<HTMLHeadingElement>(null)
  const [draft, setDraft] = useState({ id: concept.id, text: '' })
  if (draft.id !== concept.id) setDraft({ id: concept.id, text: '' })
  const clue = draft.id === concept.id ? draft.text : ''
  useEffect(() => {
    heading.current?.focus({ preventScroll: true })
  }, [concept.id])

  return (
    <section className="selection-page" aria-labelledby="dream-prompt">
      <div className="gallery-heading">
        <DreamPageCue pageKey={concept.id}>{completedDreams > 0 ? 'Your next Dream' : 'Your first Dream'} · {personal ? 'Write a clue and choose a card' : 'Choose a dream card'}</DreamPageCue>
        <Heading id="dream-prompt" ref={heading} tabIndex={-1}>
          <span key={concept.id} className="dream-prompt-text">{personal ? concept.label : <>You dream of <span className="dream-word">{concept.label}</span>.</>}</span>
        </Heading>
        {personal ? <p id="clue-guidance" className="preparation-instruction">Write a dream clue and choose its dream card.</p>
          : <p className="invitation">What does that look like to you?</p>}
      </div>
      {personal && <div className="clue-editor">
        <label htmlFor="dream-clue" className="preparation-priority">Describe Your Dream Clue</label>
        <textarea id="dream-clue" rows={2} maxLength={MAX_CLUE_LENGTH} value={clue} readOnly={busy}
          aria-describedby="clue-guidance clue-examples clue-count" onChange={(event) => setDraft({ id: concept.id, text: event.target.value })}
          placeholder="Tell us about your dream... but leave some to the imagination." />
        <p id="clue-examples" className="gallery-note">Try a word like “Hope,” a phrase like “Borrowed courage,” or a sentence like “Somewhere I used to belong.” Choose a dream card that fits your clue; leave room for your friends to interpret it.</p>
        <p id="clue-count" className="clue-counter">{clue.length} / {MAX_CLUE_LENGTH}</p>
      </div>}
      {!personal && <p className="selection-feedback" role="status">
        {remembered ? `Your ${remembered} dream is remembered.` : ''}
      </p>}
      {error && <p className="selection-error" role="alert">{error}</p>}
      {personal && <p className="preparation-priority">Select a Dream Card</p>}
      <p className="gallery-hint">Tap to choose. Hold to look closer.</p>
      <CardGallery cards={hand} choiceKey={concept.id} prompt={personal ? 'Your clue and card' : `You dream of ${concept.label}.`}
        canConfirm={!personal || clue.trim().length > 0} busy={busy}
        onChoose={(cardId) => onChoose(cardId, personal ? clue : undefined)} />
    </section>
  )
}
