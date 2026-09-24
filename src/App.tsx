import { useEffect, useMemo, useState } from 'react'
import { cards } from './data/cards'
import { authoredDreams } from './data/authoredDreams'
import { DreamCanvas, DreamViewer } from './components/InspectableDream'
import { useDailySession } from './game/useDailySession'
import {
  GAME_CONFIG,
  createDifferences,
  createPlayUrl,
  createShareText,
  formatClock,
  getRemainingGuesses,
  getNextAuthoredDream,
  getAnswerReveals,
  type Difference,
  type Point,
} from './game/dailyRecall'

type Side = 'original' | 'changed'

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

function Brand({ onHome }: { onHome: () => void }) {
  return <header className="brand"><a href={import.meta.env.BASE_URL} aria-label="Dreamerie home" onClick={(event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    onHome()
  }}><span aria-hidden="true">☾</span><span>Dreamerie</span></a></header>
}

export default function App() {
  const [daily, setDaily] = useState(getDailyDream)

  useEffect(() => {
    const refreshDay = () => setDaily((current) => {
      if (current.playtest) return current
      const next = getDailyDream()
      return next.dreamNumber === current.dreamNumber ? current : next
    })
    const timer = window.setInterval(refreshDay, 30_000)
    window.addEventListener('focus', refreshDay)
    return () => { clearInterval(timer); window.removeEventListener('focus', refreshDay) }
  }, [])

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
  const { phase: sessionPhase, recallLeft, recall, result, pendingSide, dispatch, storageError, busy } = useDailySession(daily.dreamNumber, daily.card.id, differences, daily.playtest)
  const [showHome, setShowHome] = useState(false)
  const phase = showHome ? 'rules' : sessionPhase
  const [inspecting, setInspecting] = useState<Side | null>(null)
  const [shareStatus, setShareStatus] = useState('')
  const [manualCopy, setManualCopy] = useState(false)
  const [showAnswers, setShowAnswers] = useState(true)
  const playUrl = createPlayUrl(window.location.href)
  const localPlayUrl = ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)
  const shareText = result
    ? `${daily.playtest ? 'Playtest · ' : ''}${createShareText(daily.dreamNumber, result, differences, recall.foundDifferenceIds, playUrl)}`
    : ''

  useEffect(() => {
    setInspecting(null)
    if (phase === 'play' || phase === 'rules') window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [phase])

  function goHome() {
    setInspecting(null)
    setShowHome(true)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }

  function begin() {
    setShowHome(false)
    setShareStatus('')
    setManualCopy(false)
    setShowAnswers(true)
    setInspecting(null)
    void dispatch({ type: 'start' })
  }

  function placeGuess(point: Point, side: Side) {
    if (phase !== 'play') return
    void dispatch({ type: 'mark', point, side })
  }

  function remember() {
    if (phase !== 'play' || !recall.pending || recall.confirmed.length >= GAME_CONFIG.maxGuesses) return
    void dispatch({ type: 'confirm', expectedCount: recall.confirmed.length, point: recall.pending, side: pendingSide })
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

  const artworkContent = (side: Side) => <>
    <DreamImage artwork={daily.card.artwork} description={daily.card.description} differences={differences} editedArtwork={side === 'changed' ? daily.authored.editedArtwork : undefined} />
    {phase !== 'rules' && markerContent(side)}
  </>
  const confirmation = <div className="guess-confirmation">
    <span>{recall.confirmed.length} / {GAME_CONFIG.maxGuesses}</span>
    <button className="primary-action" disabled={busy || !recall.pending || Boolean(inspecting && pendingSide !== inspecting)} onClick={remember}>Remember</button>
  </div>

  return (
    <main className={`app phase-${phase}`} style={{ '--guess-diameter': `${GAME_CONFIG.guessRadius * 200}%` } as React.CSSProperties}>
      {storageError && <p className="storage-warning" role="alert">{storageError}</p>}
      {phase !== 'rules' && <Brand onHome={goHome} />}
      {import.meta.env.DEV && <nav className="dev-controls" aria-label="Playtest controls">
        <span>Playtest · Day {daily.dreamNumber} · {daily.card.id}</span>
        <button className="text-action" onClick={onNewDay}>New day →</button>
      </nav>}

      {phase === 'rules' ? (
        <section className="rules" aria-labelledby="rules-title">
          <div className="dream-preview">
            <Brand onHome={goHome} />
            <h1 id="rules-title" className="eyebrow">Daily Dream · No. {daily.dreamNumber}</h1>
            <div className="daily-card">
              <DreamCanvas label="Expand today's dream card" onTap={() => setInspecting('original')} onExpand={() => setInspecting('original')}>
                {artworkContent('original')}
              </DreamCanvas>
            </div>
          </div>
          <div className="rules-intro">
            <p className="dream-prose">Lost within a reverie, nothing stays where it should be. Glance away, then look once more—the moon has left its silver shore.</p>
            <p className="rules-copy">Find the five differences before the dream fades. Tap either image, then <strong>remember</strong> your choice. You have five guesses and two minutes.</p>
            <div className="landing-start"><button className="primary-action" disabled={busy} onClick={begin}>{sessionPhase === 'result' ? 'View result' : sessionPhase === 'play' ? 'Resume' : 'Start'}</button></div>
          </div>
        </section>
      ) : (
        <section className="game" aria-live="polite">
          <div className="game-toolbar">
            <div className="game-heading">
              <p>{phase === 'play' ? `${getRemainingGuesses(recall)} guesses left` : 'The dream fades.'}</p>
              {phase === 'play' && <time aria-label={`${recallLeft} seconds remaining`}>{formatClock(recallLeft)}</time>}
            </div>

            {phase === 'result' && <button className="text-action" aria-pressed={showAnswers} onClick={() => setShowAnswers((shown) => !shown)}>{showAnswers ? 'Hide markers' : 'Show markers'}</button>}
            <p className="inspection-hint">{phase === 'play' ? 'Tap to mark. Hold or expand to look closer.' : 'Expand to look closer.'}</p>
          </div>

          <div className="comparison">
            {(['original', 'changed'] as const).map((side) => (
              <figure className="dream-panel" key={side}>
                <figcaption className={phase === 'result' ? `result-caption result-caption--${side}` : undefined}>
                  <span>{phase === 'result' ? (side === 'original' ? 'Found · Green' : 'Missed · Red') : (side === 'original' ? 'The Dream' : 'The Memory')}</span>
                  <button className="expand-card" aria-label={`Expand ${side === 'original' ? 'original' : 'changed'} dream`} onClick={() => setInspecting(side)}><span aria-hidden="true">⤢</span> Expand</button>
                </figcaption>
                <div className="card-frame">
                  <DreamCanvas label={`${side === 'original' ? 'Original' : 'Changed'} dream. ${phase === 'play' ? 'Tap to place a guess; hold to expand.' : 'Open to inspect differences.'}`}
                    selectable={phase === 'play'}
                    onTap={phase === 'play' ? (point) => placeGuess(point, side) : () => setInspecting(side)} onExpand={() => setInspecting(side)}>
                    {artworkContent(side)}
                  </DreamCanvas>
                </div>
              </figure>
            ))}
          </div>

          {phase === 'play' && (
            <div className="floating-action">{confirmation}</div>
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
              {!daily.playtest && <p className="share-note">Today’s dream is saved. A new dream awaits tomorrow.</p>}
            </section>
          )}
        </section>
      )}
      {inspecting && <DreamViewer key={`${phase}-${inspecting}`} title={phase === 'rules' ? 'Today’s Dream' : inspecting === 'original' ? 'The Dream' : 'The Memory'} simpleZoom={phase === 'rules'}
        onClose={() => setInspecting(null)} onTap={phase === 'play' ? (point) => placeGuess(point, inspecting) : undefined}
        status={phase === 'play' ? <><span>{getRemainingGuesses(recall)} guesses left</span><time>{formatClock(recallLeft)}</time></> : undefined}
        action={<>{storageError && <p className="storage-warning" role="alert">{storageError}</p>}{phase === 'play' ? confirmation : phase === 'result' ? <button className="text-action" aria-pressed={showAnswers} onClick={() => setShowAnswers((shown) => !shown)}>{showAnswers ? 'Hide markers' : 'Show markers'}</button> : undefined}</>}>
        {artworkContent(inspecting)}
      </DreamViewer>}
    </main>
  )
}
