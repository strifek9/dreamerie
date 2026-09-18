import type { ReactNode } from 'react'
import type { WeekIntroduction } from '../game/types.ts'

interface DreamWeekIntroductionProps {
  introduction: WeekIntroduction
  children: ReactNode
  personal?: boolean
  completedDreams?: number
}

export default function DreamWeekIntroduction({
  introduction,
  children,
  personal = false,
  completedDreams = 0,
}: DreamWeekIntroductionProps) {
  return (
    <main className="gallery-page week-preparation">
      {personal ? <header className="preparation-summary">
      <p className="saved-dream" role="status" aria-atomic="true">
        {completedDreams > 0 && <span key={completedDreams}><span aria-hidden="true">✓ </span>Your dream clue and dream card are remembered.</span>}
      </p>
      <p className="eyebrow preparation-progress">
        {completedDreams < introduction.concepts.length
          ? `Dream ${completedDreams + 1} of ${introduction.concepts.length}`
          : `${introduction.concepts.length} of ${introduction.concepts.length} Dreams remembered`}
      </p>
      </header> : <header className="week-overview">
      <p className="eyebrow">A new Dream Week</p>
      <h1>This week, you will dream of...</h1>
      <ul className="concept-list" aria-label="This week's six Dream concepts">
        {introduction.concepts.map((concept) => (
          <li key={concept.id}>{concept.label}</li>
        ))}
      </ul>
      <p className="gallery-note">Choose one card for each word today. From Day 2, you’ll guess one word each day. Their order is still a mystery.</p>
      <p className="eyebrow">{completedDreams} of 6 Dreams remembered</p>
      </header>}
      {children}
    </main>
  )
}
