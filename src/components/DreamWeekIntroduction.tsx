import type { WeekIntroduction } from '../game/types.ts'

interface DreamWeekIntroductionProps {
  introduction: WeekIntroduction
  onVisitCards: () => void
  onReturn: () => void
}

export default function DreamWeekIntroduction({
  introduction,
  onVisitCards,
  onReturn,
}: DreamWeekIntroductionProps) {
  return (
    <main className="introduction week-introduction">
      <p className="eyebrow">A new Dream Week</p>
      <h1>This week, you will dream of...</h1>
      <ul className="concept-list" aria-label="This week's six Dream concepts">
        {introduction.concepts.map((concept) => (
          <li key={concept.id}>{concept.label}</li>
        ))}
      </ul>
      <p className="gallery-note">Their order is still a mystery.</p>
      <button className="quiet-button visit-cards" onClick={onVisitCards}>
        Visit your cards
      </button>
      <button className="text-button" onClick={onReturn}>
        Return to the beginning
      </button>
    </main>
  )
}
