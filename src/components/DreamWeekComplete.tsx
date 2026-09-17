import { useEffect, useRef } from 'react'
import type { WeekRecapEntry } from '../game/types'
import OwnDream from './OwnDream'
import DreamRoundReveal from './DreamRoundReveal'

export default function DreamWeekComplete({ score, recap, onRestart, personal = false, maxScore = 12 }: { score: number; recap: readonly WeekRecapEntry[]; onRestart: () => void; personal?: boolean; maxScore?: number }) {
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => { heading.current?.focus({ preventScroll: true }); heading.current?.scrollIntoView({ block: 'start' }) }, [])
  return (
    <main className="gallery-page week-complete gallery-heading">
      <p className="eyebrow">Six shared dreams</p>
      <h1 ref={heading} tabIndex={-1}>The dream fades.</h1>
      <p className="invitation">You remembered {recap.reduce((total, entry) => total + entry.reveal.guesses.filter((guess) => guess.correct).length, 0)} of 12 Dreams.</p>
      <p className="week-score">Your week: {score} / {maxScore} points</p>
      <p className="gallery-hint">Tap any dream card to look closer.</p>
      <div className="week-recap">
        {recap.map(({ concept, ownDream, ownClue, reveal }) => (
          <section className="recap-round" key={concept.id} aria-labelledby={`recap-${concept.id}`}>
            <h2 id={`recap-${concept.id}`}>{concept.label}</h2>
            <p className="gallery-hint">{reveal.guesses.filter((guess) => guess.correct).length} of 2 Dreams remembered.{personal ? ` ${reveal.points} points earned.` : ''}</p>
            <div className="dream-context">
              <OwnDream card={ownDream} concept={ownClue ?? concept.label} />
              <DreamRoundReveal reveal={reveal} headingLevel="h3" showRecognition={personal} />
            </div>
          </section>
        ))}
      </div>
      <button className="quiet-button restart-week" onClick={onRestart}>Begin a new week</button>
    </main>
  )
}
