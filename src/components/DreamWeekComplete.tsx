import { useEffect, useRef } from 'react'

export default function DreamWeekComplete({ score, onRestart }: { score: number; onRestart: () => void }) {
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => { heading.current?.focus({ preventScroll: true }); heading.current?.scrollIntoView({ block: 'start' }) }, [])
  return (
    <main className="gallery-page week-complete gallery-heading">
      <p className="eyebrow">Six shared dreams</p>
      <h1 ref={heading} tabIndex={-1}>The dream fades.</h1>
      <p className="invitation">You remembered {score} of 12 Dreams.</p>
      <p className="week-score">Your week: {score} / 12 points</p>
      <button className="quiet-button restart-week" onClick={onRestart}>Begin a new week</button>
    </main>
  )
}
