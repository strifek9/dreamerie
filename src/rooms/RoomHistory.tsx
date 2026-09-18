import type { DayReview } from '../../shared/game'
import type { Player } from '../game/types'
import DreamRoundReveal from '../components/DreamRoundReveal'
import OwnDream from '../components/OwnDream'

export default function RoomHistory({ days, roster, complete = false, total }: { days: DayReview[]; roster: Player[]; complete?: boolean; total: number }) {
  return <section className="room-history" aria-label="Your revealed Dreams">
    {complete && <><h1>The dream fades.</h1><p className="week-score">Your week: {total} points</p></>}
    <p className="gallery-hint">Your revealed Dreams stay here. Tap a dream card to look closer.</p>
    {days.length === 0 && <p className="gallery-note">No days have been revealed for you yet.</p>}
    {days.map((day) => <details className="recap-round" key={day.day} open={complete || undefined}>
      <summary>Day {day.day} · {day.concept.label} · {day.missed ? 'Missed · 0 points' : `${day.reveal.points} points`}</summary>
      {day.ownDream ? <OwnDream card={day.ownDream} concept={day.ownClue ?? day.concept.label} /> : <p className="gallery-note">You had no Dream prepared for this day.</p>}
      <DreamRoundReveal reveal={day.reveal} roster={roster} showRecognition headingLevel="h3" />
    </details>)}
    {complete && <a className="text-button" href="/?play=rooms">Gather in another room</a>}
  </section>
}
