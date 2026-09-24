import { useState } from 'react'
import { DreamCanvas } from '../components/InspectableDream'
import { findDifference, type Point } from '../game/dailyRecall'

export function Practice({ onReady }: { onReady: () => void }) {
  const [point, setPoint] = useState<Point | null>(null)
  const [message, setMessage] = useState('Tap the moon that changed. Tap again to move your circle.')
  const [done, setDone] = useState(false)
  function confirm() {
    if (!point) return
    if (findDifference(point, [], [{ id: 'practice', x: .7, y: .5, radius: 22 / 300, difficulty: 'Easy', label: 'The moon changes color.', box: { left: 188 / 300, top: .28, width: 44 / 300, height: .44 } }], 3)) {
      setDone(true); setMessage('That’s it! Only Remember uses a guess.'); onReady()
    } else { setMessage('Try the moon on the right, then press Remember. Practice costs no guesses.'); setPoint(null) }
  }
  return <section className="v2-practice" aria-labelledby="practice-title">
    <h2 id="practice-title">One tiny practice</h2>
    <div className="v2-practice-pair">{[false, true].map(changed => <DreamCanvas key={String(changed)} label={`Practice ${changed ? 'Memory' : 'Dream'}. Tap the changed moon.`} onTap={done ? undefined : setPoint} selectable={!done} pendingPoint={point}>
      <svg viewBox="0 0 300 100" className="dream-image" aria-hidden="true"><rect width="300" height="100" fill="#242842"/><path d="M0 90 Q70 30 150 90 T300 80 V100 H0" fill="#4b4968"/><circle cx="210" cy="50" r="22" fill={changed ? '#9fbee8' : '#efd7a5'}/><path d="m60 22 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" fill="#efd7a5"/></svg>
      {point && <span className="dream-marker dream-marker--pending" style={{ left: `${point.x * 100}%`, top: `${point.y * 100}%` }}>{done ? '✓' : ''}</span>}
    </DreamCanvas>)}</div>
    <p role="status">{message}</p>
    {!done && <button className="primary-action" disabled={!point} onClick={confirm}>Remember</button>}
  </section>
}
