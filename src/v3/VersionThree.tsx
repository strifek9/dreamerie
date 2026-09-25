import { useEffect, useMemo, useRef, useState } from 'react'
import { DreamCanvas, DreamViewer } from '../components/InspectableDream'
import { createShareText, formatClock, getAnswerReveals, getRemainingGuesses } from '../game/dailyRecall'
import { RESTING_VIEW, zoomAt, type ImageView } from '../game/imageInspection'
import { useDailySession } from '../game/useDailySession'
import { LandscapeArtwork } from '../v2/LandscapeArtwork'
import { verseForDream } from '../v2/dreamVerses'
import { differencesFor, landscapeCollection, landscapeDay, landscapeForDay, LANDSCAPE_SESSION_OPTIONS, type LandscapeDream } from '../v2/landscapeCollection'
import { AnswerInspection } from './AnswerInspection'
import { MemoryFragments } from './MemoryFragments'
import { guessFeedback, resultVerse } from './dreamRitual'
import '../v2/versionTwo.css'
import './versionThree.css'

export default function VersionThree() {
  const [run, setRun] = useState(0)
  const [today] = useState(() => landscapeDay())
  const requested = import.meta.env.DEV ? new URLSearchParams(location.search).get('dream') : null
  const selected = landscapeCollection.find(card => card.id === requested)
  const [index, setIndex] = useState(() => landscapeCollection.indexOf(selected ?? landscapeForDay(today)))
  const playtest = Boolean(selected) || run > 0
  const dream = landscapeCollection[index]
  return <Round key={`${dream.id}-${run}`} dream={dream} day={playtest ? index + 1 : today} playtest={playtest} onNew={() => { setIndex(value => (value + 1) % landscapeCollection.length); setRun(value => value + 1) }}/>
}

function Round({ dream, day, playtest, onNew }: { dream: LandscapeDream; day: number; playtest: boolean; onNew: () => void }) {
  const verse = verseForDream(dream.id)
  const differences = useMemo(() => differencesFor(dream), [dream])
  const { phase, recall, result, recallLeft, pendingSide, dispatch, storageError, busy } = useDailySession(day, dream.id, differences, playtest, LANDSCAPE_SESSION_OPTIONS)
  const [home, setHome] = useState(false)
  const [hintOpen, setHintOpen] = useState(false)
  const [assetsReady, setAssetsReady] = useState(false)
  const [assetError, setAssetError] = useState(false)
  const [view, setView] = useState<ImageView>(RESTING_VIEW)
  const [previewZoom, setPreviewZoom] = useState(false)
  const [expandedSide, setExpandedSide] = useState<'original' | 'changed' | null>(null)
  const [answerIndex, setAnswerIndex] = useState<number | null>(null)
  const [markers, setMarkers] = useState(true)
  const [shareStatus, setShareStatus] = useState('')
  const landing = phase === 'rules' || home
  // Fitted result images belong to the scrolling page. Zoom in explicitly to inspect.
  const scrollResults = Boolean(result) && view.scale <= 1
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [landing, phase])
  useEffect(() => {
    let active = true
    const sources = new Set([dream.original, dream.altered, ...dream.edits.flatMap(edit => edit.source ? [edit.source] : [])])
    Promise.all([...sources].map(src => new Promise<void>((resolve, reject) => {
      const image = new Image(); image.onload = () => resolve(); image.onerror = reject; image.src = src
    }))).then(() => { if (active) setAssetsReady(true) }, () => { if (active) setAssetError(true) })
    return () => { active = false }
  }, [dream])
  useEffect(() => { if (phase === 'result') { setHome(false); setPreviewZoom(false); setHintOpen(false); setExpandedSide(null) } }, [phase])
  const shareText = result ? createShareText(day, result, differences, recall.foundDifferenceIds, location.href).replace(`Dreamerie #${day}`, `Dreamerie V3 · ${playtest ? 'Playtest' : 'Daily Dream'} #${day}`) : ''
  async function share(copy = false) {
    try {
      if (!copy && navigator.share) { await navigator.share({ text: shareText }); setShareStatus('Shared.') }
      else { await navigator.clipboard.writeText(shareText); setShareStatus('Copied. Send it to someone you dream with.') }
    } catch { setShareStatus('You can select and copy the message below.') }
  }
  function updateView(next: ImageView) { setView(next) }
  function artwork(side: 'original' | 'changed') {
    return <>
      <LandscapeArtwork dream={dream} changed={side === 'changed'}/>
      {!result && recall.confirmed.map((guess, i) => <span key={i} className={`dream-marker ${guess.correct ? 'dream-marker--found' : 'dream-marker--false'}`} style={{ left: `${guess.point.x * 100}%`, top: `${guess.point.y * 100}%` }}>{guess.correct ? '✓' : '×'}</span>)}
      {!result && recall.pending && <span className="dream-marker dream-marker--pending" style={{ left: `${recall.pending.x * 100}%`, top: `${recall.pending.y * 100}%` }}/>}
      {result && markers && getAnswerReveals(differences, recall.foundDifferenceIds, side).map(({ difference: d, number, found }) => <span key={d.id} className={`answer-outline ${found ? 'answer-found' : ''}`} style={{ left: `${d.box.left * 100}%`, top: `${d.box.top * 100}%`, width: `${d.box.width * 100}%`, height: `${d.box.height * 100}%` }}><span>{number}</span></span>)}
    </>
  }
  const guessAction = <div className="v3-guess-action"><MemoryFragments guesses={recall.confirmed}/><button className="primary-action" disabled={!recall.pending || busy || Boolean(storageError)} onClick={() => { if (recall.pending) void dispatch({ type: 'confirm', point: recall.pending, side: pendingSide, expectedCount: recall.confirmed.length }) }}>Remember</button></div>
  const revealAction = <button className="text-action" onClick={() => setMarkers(!markers)}>{markers ? 'Hide' : 'Show'} markers</button>
  return <main className={`v2-app v3-app ${landing ? 'v2-landing' : 'v2-round'} ${result ? 'v2-finished' : ''}`}>
    <header className="v2-header"><div className="v2-brand-row"><a href="./" aria-label="Dreamerie home" onClick={event => { event.preventDefault(); setHome(true) }}><img className="v3-brand-mark" src="/dreamerie-mark.svg" alt=""/><span>Dreamerie</span></a><button className="v2-hint-toggle" aria-label="How to play" aria-haspopup="dialog" onClick={() => setHintOpen(true)}>?</button></div><span>Version 3 · {playtest ? 'Playtest' : 'Daily Dream'} #{day}</span></header>
    {storageError && <p role="alert" className="storage-warning">{storageError}</p>}
    {landing ? <section className="v2-welcome">
      <p className="eyebrow">{dream.title}</p>
      <button className="v2-preview" onClick={() => setPreviewZoom(true)} aria-label="Enlarge the dream preview"><img src={dream.original} alt={dream.title}/></button>
      <p className="v2-poem">“{verse[0]}<br/>{verse[1]}”</p>
      <h1>Can you spot the differences between the dream and the memory?</h1>
      <p className="v2-rules">2 minutes · No pauses<span className="v3-rules-limit">Five guesses total—including misses.</span>Tap to guess, <strong>Remember</strong> to confirm.</p>
      {phase === 'play' && <p role="status">The dream is fading... <strong>{formatClock(recallLeft)}</strong> left · {getRemainingGuesses(recall)} guesses left.</p>}
      {assetError && <p role="alert">The paintings couldn’t load. Refresh before starting.</p>}
      <div className="v2-start"><button className="primary-action" disabled={busy || Boolean(storageError) || !assetsReady} onClick={() => { setHome(false); if (phase === 'rules') void dispatch({ type: 'start' }) }}>{phase === 'rules' ? 'Start' : result ? 'View result' : 'Continue'}</button></div>
    </section> : <>
      {result ? <section className="v2-result" aria-labelledby="result-title"><p className="eyebrow">{resultVerse(result.accuracy)}</p><h1 id="result-title">{result.accuracy}/5 <span>· {formatClock(result.elapsedSeconds)}</span></h1><div className="v3-result-stars" role="img" aria-label={`${result.accuracy} of 5 differences found`}>{differences.map(d => <span key={d.id} aria-hidden="true" className={recall.foundDifferenceIds.includes(d.id) ? 'star-found' : ''}>{recall.foundDifferenceIds.includes(d.id) ? '✦' : '◇'}</span>)}</div><div className="v2-share"><button className="primary-action" onClick={() => void share()}>Share result</button><button className="text-action" onClick={() => void share(true)}>Copy</button></div><p role="status">{shareStatus}</p></section>
      : <div className="v2-status"><strong>{getRemainingGuesses(recall)} guesses left</strong><time aria-label="Time remaining">{formatClock(recallLeft)}</time><span>{recall.foundDifferenceIds.length}/5 found</span></div>}
      <section className="v2-board" aria-label="Compare both paintings">
        {(['original', 'changed'] as const).map(side => <figure key={side}><figcaption>{side === 'original' ? 'The Dream' : 'The Memory'}<div className="v2-caption-actions">{result && <span>{side === 'original' ? 'Found · Green' : 'Missed · Red'}</span>}<button className="v2-expand" aria-label={`Expand ${side === 'original' ? 'The Dream' : 'The Memory'}`} title="Hold the painting or expand" onClick={() => setExpandedSide(side)}>⤢</button></div></figcaption>
          <DreamCanvas label={`${side === 'original' ? 'The Dream' : 'The Memory'}. ${result ? 'Inspect the answers.' : 'Tap to mark, then Remember to confirm.'} Hold to expand. ${scrollResults ? 'Swipe to scroll the page. Use Zoom in to examine details.' : 'Zoom and drag move both paintings.'}`} onExpand={() => setExpandedSide(side)} view={view} onView={scrollResults ? undefined : updateView} selectable={!result} pendingPoint={recall.pending} onTap={result ? undefined : point => { void dispatch({ type: 'mark', point, side }) }}>
            {artwork(side)}
          </DreamCanvas>
        </figure>)}
      </section>
      <footer className="v2-controls">
        <div className="v2-zoom" aria-label="Zoom both paintings"><button aria-label="Zoom out both paintings" disabled={view.scale <= 1} onClick={() => setView(zoomAt(view, view.scale / 1.4, { x: .5, y: .5 }))}>−</button><button onClick={() => setView(RESTING_VIEW)}>Fit</button><button aria-label="Zoom in both paintings" disabled={view.scale >= 4} onClick={() => setView(zoomAt(view, view.scale * 1.4, recall.pending ?? { x: .5, y: .5 }))}>+</button></div>
        {result ? revealAction : guessAction}
        <p role="status">{result ? 'Zoom to examine every difference.' : guessFeedback(recall, differences, dream.aspectRatio)}</p>
        <small>{result ? scrollResults ? 'Swipe to scroll · hold to expand' : 'Hold to expand · Fit to scroll the page' : 'Hold to expand · pinch or scroll to zoom'}</small>
      </footer>
      {result && <section className="v2-answers"><h2>What was different?</h2><p className="v3-answer-invitation">Choose a detail for a closer look.</p><ol>{differences.map((d, i) => <li key={d.id}><button className="v3-answer-link" aria-haspopup="dialog" onClick={() => setAnswerIndex(i)}><span className="v3-answer-number" aria-hidden="true">{i + 1}</span><span>{d.label}<small>{recall.foundDifferenceIds.includes(d.id) ? '✓ Found' : '○ Missed'} · {d.difficulty}</small></span><span aria-hidden="true">⤢</span></button></li>)}</ol><details><summary>Your share message</summary><textarea aria-label="Share message" readOnly value={shareText} rows={6}/></details>{['localhost', '127.0.0.1'].includes(location.hostname) && <p>This is a local preview. Its link won’t open on someone else’s device.</p>}<p>A new dream each day. Come back tomorrow.</p></section>}
    </>}
    {previewZoom && landing && <DreamViewer fitAspectRatio={dream.aspectRatio} title={dream.title} onClose={() => setPreviewZoom(false)} simpleZoom status={phase === 'play' ? <span>{formatClock(recallLeft)} left · timer running</span> : undefined}><LandscapeArtwork dream={dream} changed={false}/></DreamViewer>}
    {expandedSide && !landing && <DreamViewer fitAspectRatio={dream.aspectRatio} title={expandedSide === 'original' ? 'The Dream' : 'The Memory'} onClose={() => setExpandedSide(null)} onTap={result ? undefined : point => { void dispatch({ type: 'mark', point, side: expandedSide }) }} status={result ? <span>{result.accuracy}/5 · {formatClock(result.elapsedSeconds)}</span> : <span>{getRemainingGuesses(recall)} guesses left · {formatClock(recallLeft)} · timer running</span>} action={result ? revealAction : <>{guessAction}<p className="v3-viewer-feedback" role="status">{guessFeedback(recall, differences, dream.aspectRatio)}</p></>}>{artwork(expandedSide)}</DreamViewer>}
    {hintOpen && <GameHint onClose={() => setHintOpen(false)} timeLeft={phase === 'play' ? recallLeft : undefined}/>}
    {result && !landing && answerIndex !== null && <AnswerInspection dream={dream} differences={differences} foundIds={recall.foundDifferenceIds} index={answerIndex} onSelect={setAnswerIndex} onClose={() => setAnswerIndex(null)}/>}
    {import.meta.env.DEV && <div className="v2-dev"><button className="text-action" onClick={onNew}>New day (dev only)</button><a href="?version=1">Compare Version 1</a><a href="?review=1">Review all 120</a><span>{dream.id}</span></div>}
  </main>
}

function GameHint({ onClose, timeLeft }: { onClose: () => void; timeLeft?: number }) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const element = dialog.current!
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    element.showModal()
    return () => { element.close(); if (opener?.isConnected) opener.focus({ preventScroll: true }) }
  }, [])
  return <dialog className="v2-hint" ref={dialog} aria-labelledby="v2-hint-title" onCancel={event => { event.preventDefault(); onClose() }}>
    <h2 id="v2-hint-title">How to play</h2>
    <p>Find five differences between <strong>The Dream</strong> and <strong>The Memory</strong>.</p>
    <p>Tap either painting to place a circle. Tap again to move it. Only <strong>Remember</strong> confirms your guess.</p>
    <p>You have <strong>five guesses total</strong>. Wrong guesses count too.</p>
    <p>Hold a painting or choose ⤢ to expand it. You can still mark a guess and Remember in the enlarged view. Pinch or use +/− to zoom.</p>
    <p className="v2-hint-timer">{timeLeft === undefined ? 'Two minutes once you press Start. No pauses.' : `${formatClock(timeLeft)} left · The timer is still running.`}</p>
    <button autoFocus className="primary-action" onClick={onClose}>Got it</button>
  </dialog>
}
