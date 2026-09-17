import type { ReactNode } from 'react'
import type { WeekIntroduction } from '../game/types.ts'

interface DreamWeekIntroductionProps {
  introduction: WeekIntroduction
  onReturn: () => void
  children: ReactNode
}

export default function DreamWeekIntroduction({
  introduction,
  onReturn,
  children,
}: DreamWeekIntroductionProps) {
  return (
    <main className="gallery-page week-preparation">
      <header className="week-overview">
      <p className="eyebrow">A new Dream Week</p>
      <h1>This week, you will dream of...</h1>
      <ul className="concept-list" aria-label="This week's six Dream concepts">
        {introduction.concepts.map((concept) => (
          <li key={concept.id}>{concept.label}</li>
        ))}
      </ul>
      <p className="gallery-note">Their order is still a mystery.</p>
      </header>
      {children}
      <button className="text-button" onClick={onReturn}>
        Return to the beginning
      </button>
    </main>
  )
}
