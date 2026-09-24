import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cards } from './data/cards'
import { authoredDreams } from './data/authoredDreams'
import {
  GAME_CONFIG,
  confirmGuess,
  createDifferences,
  createRecallState,
  createPlayUrl,
  createShareText,
  formatClock,
  getRemainingGuesses,
  getNextAuthoredDream,
  getAnswerReveals,
  type Difference,
  type Point,
  type RecallResult,
} from './game/dailyRecall'

type Phase = 'rules' | 'play' | 'result'
type Side = 'original' | 'changed'
type View = { scale: number; x: number; y: number }
const PORTRAIT_COMPARISON = '(max-width: 48rem) and (orientation: portrait)'

const DAY_MS = 86_400_000
const DREAM_EPOCH = Date.UTC(2026, 0, 1)

function getDailyDream() {
  const today = new Date()
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
  const dreamNumber = Math.max(1, Math.floor((todayUtc - DREAM_EPOCH) / DAY_MS) + 1)
  const reviewId = import.meta.env.DEV ? new URLSearchParams(window.location.search).get('review') : null
  const authored = authoredDreams.find((dream) => dream.id === reviewId) ?? authoredDreams[(dreamNumber - 1) % authoredDreams.length]
  const card = cards.find((item) => item.id === authored.id)
  if (!card) throw new Error('The reviewed Dream artwork is missing.')
  return { dreamNumber, card, authored, playtest: Boolean(reviewId) }
}

function DreamImage({ artwork, description, differences, editedArtwork }: {
  artwork: string
  description: string
  differences: readonly Difference[]
  editedArtwork?: string
}) {
  return (
    <svg className="dream-image" viewBox="0 0 100 125" role="img" aria-label={description}>
      <image href={artwork} width="100" height="125" preserveAspectRatio="none" />
      {editedArtwork && differences.map((difference) => (
        <svg key={difference.id}
          x={difference.box.left * 100} y={difference.box.top * 125}
          width={difference.box.width * 100} height={difference.box.height * 125}
          viewBox={`${difference.box.left * 100} ${difference.box.top * 125} ${difference.box.width * 100} ${difference.box.height * 125}`}
          overflow="hidden">
          <image href={editedArtwork} width="100" height="125" preserveAspectRatio="none" />
        </svg>
      ))}
    </svg>
  )
}

function AnswerOutline({ difference, number, found }: { difference: Difference; number: number; found: boolean }) {
  const box = difference.box
  return <span className={`answer-outline ${found ? 'answer-found' : 'answer-missed'}`}
    style={{ left: `${box.left * 100}%`, top: `${box.top * 100}%`, width: `${box.width * 100}%`, height: `${box.height * 100}%` }}
    aria-hidden="true"><span>{number}</span></span>
}

function Marker({ point, kind }: { point: Point; kind: 'pending' | 'found' | 'false' }) {
  return (
    <span className={`dream-marker dream-marker--${kind}`}
      style={{ left: `${point.x * 100}%`, top: `${point.y * 100}%` }} aria-hidden="true">
      {kind === 'found' ? '✓' : kind === 'false' ? '×' : ''}
    </span>
  )
}

function Brand() {
  return <header className="brand" aria-label="Dreamerie"><span aria-hidden="true">☾</span><span>Dreamerie</span></header>
}

export default function App() {
  const [daily, setDaily] = useState(getDailyDream)

  function newDay() {
    if (!import.meta.env.DEV) return
    setDaily((current) => {
      const authored = getNextAuthoredDream(current.card.id)
      const card = cards.find((item) => item.id === authored.id)
      if (!card) throw new Error('The next Dream artwork is missing.')
      return { dreamNumber: current.dreamNumber + 1, card, authored, playtest: true }
    })
  }

  // A fresh round remount clears the timer, guesses, markers, zoom and gestures.
  return <DreamRound key={`${daily.dreamNumber}-${daily.card.id}`} daily={daily} onNewDay={newDay} />
}

function DreamRound({ daily, onNewDay }: { daily: ReturnType<typeof getDailyDream>; onNewDay: () => void }) {
  const differences = useMemo(() => createDifferences(daily.card.id), [daily.card.id])
  const [phase, setPhase] = useState<Phase>('rules')
  const [recallLeft, setRecallLeft] = useState<number>(GAME_CONFIG.recallSeconds)
  const [recall, setRecall] = useState(createRecallState)
  const [result, setResult] = useState<RecallResult | null>(null)
  const [pendingSide, setPendingSide] = useState<Side>('changed')
  const [view, setView] = useState<View>({ scale: 1, x: 0, y: 0 })
  const [shareStatus, setShareStatus] = useState('')
  const [manualCopy, setManualCopy] = useState(false)
  const [showAnswers, setShowAnswers] = useState(true)
  const playUrl = createPlayUrl(window.location.href)
  const localPlayUrl = ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)
  const shareText = result
    ? `${daily.playtest ? 'Playtest · ' : ''}${createShareText(daily.dreamNumber, result, differences, recall.foundDifferenceIds, playUrl)}`
    : ''
  const startedAt = useRef<number | null>(null)
  const comparisonRef = useRef<HTMLDivElement>(null)
  const pointers = useRef(new Map<number, Point>())
  const gestureTarget = useRef<HTMLButtonElement | null>(null)
  const gesture = useRef({ startView: view, startPoint: { x: 0, y: 0 }, distance: 0, midpoint: { x: 0, y: 0 }, moved: false })

  const finish = useCallback((nextResult: RecallResult) => {
    setResult(nextResult)
    setView({ scale: 1, x: 0, y: 0 })
    pointers.current.clear()
    setPhase('result')
  }, [])

  useEffect(() => {
    if (phase !== 'play') return
    const update = () => {
      if (startedAt.current === null) return
      const elapsed = (performance.now() - startedAt.current) / 1000
      setRecallLeft(Math.max(0, Math.ceil(GAME_CONFIG.recallSeconds - elapsed)))
      if (elapsed >= GAME_CONFIG.recallSeconds) {
        finish({ accuracy: recall.foundDifferenceIds.length, elapsedSeconds: GAME_CONFIG.recallSeconds, reason: 'time' })
      }
    }
    const id = window.setInterval(update, 100)
    update()
    return () => window.clearInterval(id)
  }, [finish, phase, recall.foundDifferenceIds.length])

  useEffect(() => {
    const element = comparisonRef.current
    if (!element) return
    const zoom = (event: WheelEvent) => {
      // In a stacked layout ordinary wheel/trackpad movement scrolls the page.
      if (window.matchMedia(PORTRAIT_COMPARISON).matches && !event.ctrlKey && !event.metaKey) return
      event.preventDefault()
      setView((current) => {
        const scale = Math.min(GAME_CONFIG.maxZoom, Math.max(1, current.scale * (event.deltaY < 0 ? 1.16 : 0.86)))
        return { ...current, scale, ...(scale === 1 ? { x: 0, y: 0 } : {}) }
      })
    }
    element.addEventListener('wheel', zoom, { passive: false })
    return () => element.removeEventListener('wheel', zoom)
  }, [phase])

  useEffect(() => {
    const cancelGesture = () => {
      pointers.current.clear()
      gesture.current.moved = true
    }
    window.addEventListener('resize', cancelGesture)
    return () => window.removeEventListener('resize', cancelGesture)
  }, [])

  useEffect(() => {
    if (phase === 'play') window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [phase])

  function begin() {
    setRecall(createRecallState())
    setResult(null)
    setShareStatus('')
    setManualCopy(false)
    setShowAnswers(true)
    pointers.current.clear()
    setRecallLeft(GAME_CONFIG.recallSeconds)
    setView({ scale: 1, x: 0, y: 0 })
    startedAt.current = performance.now()
    setPhase('play')
  }

  function setZoom(nextScale: number) {
    setView((current) => ({ ...current, scale: Math.min(GAME_CONFIG.maxZoom, Math.max(1, nextScale)), ...(nextScale <= 1 ? { x: 0, y: 0 } : {}) }))
  }

  function handlePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    if (phase === 'rules') return
    if (pointers.current.size && gestureTarget.current !== event.currentTarget) return
    gestureTarget.current = event.currentTarget
    event.currentTarget.setPointerCapture(event.pointerId)
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    const values = [...pointers.current.values()]
    gesture.current = {
      startView: view,
      startPoint: values[0],
      distance: values.length === 2 ? Math.hypot(values[1].x - values[0].x, values[1].y - values[0].y) : 0,
      midpoint: values.length === 2 ? { x: (values[0].x + values[1].x) / 2, y: (values[0].y + values[1].y) / 2 } : values[0],
      moved: values.length > 1,
    }
  }

  function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (!pointers.current.has(event.pointerId)) return
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    const values = [...pointers.current.values()]
    const width = event.currentTarget.clientWidth
    const height = event.currentTarget.clientHeight
    if (values.length === 2) {
      const distance = Math.hypot(values[1].x - values[0].x, values[1].y - values[0].y)
      const midpoint = { x: (values[0].x + values[1].x) / 2, y: (values[0].y + values[1].y) / 2 }
      const scale = Math.min(GAME_CONFIG.maxZoom, Math.max(1, gesture.current.startView.scale * distance / Math.max(1, gesture.current.distance)))
      gesture.current.moved = true
      setView({ scale,
        x: scale === 1 ? 0 : gesture.current.startView.x + (midpoint.x - gesture.current.midpoint.x) / width,
        y: scale === 1 ? 0 : gesture.current.startView.y + (midpoint.y - gesture.current.midpoint.y) / height })
    } else if (values.length === 1) {
      const deltaX = values[0].x - gesture.current.startPoint.x
      const deltaY = values[0].y - gesture.current.startPoint.y
      if (Math.hypot(deltaX, deltaY) > 4) gesture.current.moved = true
      if (view.scale > 1) setView({ ...view, x: gesture.current.startView.x + deltaX / width, y: gesture.current.startView.y + deltaY / height })
    }
  }

  function handlePointerUp(event: React.PointerEvent<HTMLButtonElement>, side: Side) {
    const wasTap = pointers.current.has(event.pointerId) && pointers.current.size === 1 && !gesture.current.moved
    pointers.current.delete(event.pointerId)
    if (pointers.current.size === 1) {
      gesture.current = { ...gesture.current, startView: view, startPoint: [...pointers.current.values()][0], moved: true }
    }
    if (!wasTap || phase !== 'play') return
    const layer = event.currentTarget.querySelector<HTMLElement>('.zoom-layer')
    if (!layer) return
    const bounds = layer.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    if (x < 0 || x > 1 || y < 0 || y > 1) return
    setPendingSide(side)
    setRecall((current) => ({ ...current, pending: { x, y } }))
  }

  function remember() {
    if (phase !== 'play' || !recall.pending || recall.confirmed.length >= GAME_CONFIG.maxGuesses) return
    const elapsedSeconds = startedAt.current === null ? 0 : Math.min(GAME_CONFIG.recallSeconds, Math.floor((performance.now() - startedAt.current) / 1000))
    if (elapsedSeconds >= GAME_CONFIG.recallSeconds) {
      finish({ accuracy: recall.foundDifferenceIds.length, elapsedSeconds: GAME_CONFIG.recallSeconds, reason: 'time' })
      return
    }
    const outcome = confirmGuess(recall, recall.pending, elapsedSeconds, differences)
    setRecall(outcome.state)
    if (outcome.result) finish(outcome.result)
  }

  async function copyResult() {
    if (!shareText) return
    try {
      await navigator.clipboard.writeText(shareText)
      setManualCopy(false)
      setShareStatus('Score, time and play link copied.')
    } catch {
      setManualCopy(true)
      setShareStatus('Select and copy the message below to share it.')
    }
  }

  async function shareResult() {
    if (!shareText) return
    setShareStatus('')
    if (!navigator.share) return copyResult()
    try {
      await navigator.share({ text: shareText })
      setShareStatus('Shared.')
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      await copyResult()
    }
  }

  const foundDifferences = differences.filter((difference) => recall.foundDifferenceIds.includes(difference.id))
  const markerContent = (side: Side) => (
    <>
      {phase === 'result'
        ? showAnswers && getAnswerReveals(differences, recall.foundDifferenceIds, side).map((answer) => <AnswerOutline key={answer.difference.id} {...answer} />)
        : foundDifferences.map((difference) => <Marker key={difference.id} point={difference} kind="found" />)}
      {phase === 'play' && recall.confirmed.filter((guess) => !guess.correct).map((guess, index) => <Marker key={`false-${index}`} point={guess.point} kind="false" />)}
      {phase === 'play' && recall.pending && pendingSide === side && <Marker point={recall.pending} kind="pending" />}
    </>
  )

  return (
    <main className={`app phase-${phase}`}>
      {phase !== 'rules' && <Brand />}
      {import.meta.env.DEV && <nav className="dev-controls" aria-label="Playtest controls">
        <span>Playtest · Day {daily.dreamNumber} · {daily.card.id}</span>
        <button className="text-action" onClick={onNewDay}>New day →</button>
      </nav>}

      {phase === 'rules' ? (
        <section className="rules" aria-labelledby="rules-title">
          <div className="dream-preview">
            <Brand />
            <h1 id="rules-title" className="eyebrow">Daily Dream · No. {daily.dreamNumber}</h1>
            <img className="daily-card" src={daily.card.artwork} alt={daily.card.description} width="1122" height="1402" />
          </div>
          <div className="rules-intro">
            <p className="dream-prose">Lost within a reverie, nothing stays where it should be. Glance away, then look once more—the moon has left its silver shore.</p>
            <p className="rules-copy">Find the five differences before the dream fades. Tap either image, then remember your choice. You have five guesses and two minutes.</p>
            <button className="primary-action" onClick={begin}>Start</button>
          </div>
        </section>
      ) : (
        <section className="game" aria-live="polite">
          <div className="game-toolbar">
            <div className="game-heading">
              <p>{phase === 'play' ? `${getRemainingGuesses(recall)} guesses left` : 'The dream fades.'}</p>
              {phase === 'play' && <time aria-label={`${recallLeft} seconds remaining`}>{formatClock(recallLeft)}</time>}
            </div>

            <div className="zoom-controls" aria-label="Image zoom">
              <button onClick={() => setZoom(view.scale / 1.25)} disabled={view.scale <= 1} aria-label="Zoom out">−</button>
              <span>{Math.round(view.scale * 100)}%</span>
              <button onClick={() => setZoom(view.scale * 1.25)} disabled={view.scale >= GAME_CONFIG.maxZoom} aria-label="Zoom in">+</button>
              <button onClick={() => setView({ scale: 1, x: 0, y: 0 })}>Reset</button>
              {phase === 'result' && <button aria-pressed={showAnswers} onClick={() => setShowAnswers((shown) => !shown)}>{showAnswers ? 'Hide markers' : 'Show markers'}</button>}
            </div>

            <p className="portrait-hint">{view.scale > 1 ? 'Drag to explore. Reset zoom to scroll between images.' : 'Turn sideways for a wider view.'}</p>
          </div>

          <div ref={comparisonRef} className={`comparison${view.scale > 1 ? ' is-zoomed' : ''}`} style={{ '--zoom': view.scale, '--pan-x': `${view.x * 100}%`, '--pan-y': `${view.y * 100}%`, '--guess-diameter': `${GAME_CONFIG.guessRadius * 200}%` } as React.CSSProperties}>
            {(['original', 'changed'] as const).map((side) => (
              <figure className="dream-panel" key={side}>
                <figcaption className={phase === 'result' ? `result-caption result-caption--${side}` : undefined}>{phase === 'result' ? (side === 'original' ? 'Found · green' : 'Missed · red') : (side === 'original' ? 'The dream' : 'The memory')}</figcaption>
                <button className="dream-canvas" type="button"
                  aria-label={`${side === 'original' ? 'Original' : 'Changed'} dream. ${phase === 'result' ? `Zoom to inspect ${side === 'original' ? 'found' : 'missed'} differences.` : 'Tap to place or move your guess.'}`}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={(event) => handlePointerUp(event, side)}
                  onPointerCancel={() => { pointers.current.clear(); gesture.current.moved = true }}>
                  <span className="zoom-layer">
                    <DreamImage artwork={daily.card.artwork} description={daily.card.description} differences={differences} editedArtwork={side === 'changed' ? daily.authored.editedArtwork : undefined} />
                    {markerContent(side)}
                  </span>
                </button>
              </figure>
            ))}
          </div>

          {phase === 'play' && (
            <div className="floating-action">
              <span>{recall.confirmed.length} / {GAME_CONFIG.maxGuesses}</span>
              <button className="primary-action" disabled={!recall.pending} onClick={remember}>Remember</button>
            </div>
          )}

          {phase === 'result' && result && (
            <section className="result" aria-labelledby="result-title">
              <p className="eyebrow">{daily.playtest ? 'Playtest · ' : ''}Dreamerie · No. {daily.dreamNumber}</p>
              <h1 id="result-title">{result.accuracy}/5 <span>·</span> {formatClock(result.elapsedSeconds)}</h1>
              <div className="result-grid" role="img" aria-label={`Differences from easy to difficult: ${differences.map((difference) => recall.foundDifferenceIds.includes(difference.id) ? 'found' : 'missed').join(', ')}`}>
                {differences.map((difference) => <span key={difference.id} className={recall.foundDifferenceIds.includes(difference.id) ? 'result-tile found' : 'result-tile'} aria-hidden="true" title={difference.difficulty}>{recall.foundDifferenceIds.includes(difference.id) ? '✓' : '—'}</span>)}
              </div>
              <div className="share-actions">
                <button className="primary-action" onClick={shareResult}>Share result</button>
                <button className="text-action" onClick={copyResult}>Copy result</button>
              </div>
              <p className="share-status" role="status">{shareStatus}</p>
              {localPlayUrl && <p className="share-note">Local playtest: this link only works on this computer. A public site is needed for friends to play.</p>}
              <details className="share-preview" open={manualCopy || undefined}>
                <summary>Preview share text</summary>
                <textarea aria-label="Share message" readOnly value={shareText} rows={6} onFocus={(event) => event.currentTarget.select()} />
              </details>
              <div className="answer-key">
                <h2>What changed</h2>
                <p>Found in the dream. Missed in the memory. Markers gently fade; hide them for a clear view.</p>
                <ol>{differences.map((difference, index) => (
                  <li key={difference.id}>
                    <span className="answer-number">{index + 1}</span>
                    <span>{difference.label}<small>{recall.foundDifferenceIds.includes(difference.id) ? 'Found' : 'Missed'}</small></span>
                  </li>
                ))}</ol>
              </div>
              <button className="text-action" onClick={begin}>Dream again</button>
            </section>
          )}
        </section>
      )}
    </main>
  )
}
