import { useEffect, useState } from 'react'
import { DreamCanvas, DreamViewer } from '../components/InspectableDream'
import { createShareText, formatClock, getAnswerReveals, getRemainingGuesses } from '../game/dailyRecall'
import { RESTING_VIEW, zoomAt, type ImageView } from '../game/imageInspection'
import { useDailySession } from '../game/useDailySession'
import { LandscapeArtwork } from './LandscapeArtwork'
import { landscapeDifferences as differences, landscapeDream as dream, V2_SESSION_OPTIONS } from './landscapeDream'
import { Practice } from './Practice'
import './versionTwo.css'

export default function VersionTwo() {
  const [run, setRun] = useState(0)
  return <Round key={run} run={run} onNew={() => setRun(value => value + 1)}/>
}

function Round({ run, onNew }: { run: number; onNew: () => void }) {
  const { phase, recall, result, recallLeft, pendingSide, dispatch, storageError, busy } = useDailySession(1, dream.id, differences, run > 0, V2_SESSION_OPTIONS)
  const [home, setHome] = useState(false)
  const [ready, setReady] = useState(false)
  const [teaching, setTeaching] = useState(false)
  const [assetsReady, setAssetsReady] = useState(false)
  const [assetError, setAssetError] = useState(false)
  const [view, setView] = useState<ImageView>(RESTING_VIEW)
  const [previewZoom, setPreviewZoom] = useState(false)
  const [markers, setMarkers] = useState(true)
  const [shareStatus, setShareStatus] = useState('')
  const landing = phase === 'rules' || home
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [landing, phase])
  useEffect(() => {
    let active = true
    Promise.all([dream.original, dream.altered].map(src => new Promise<void>((resolve, reject) => {
      const image = new Image(); image.onload = () => resolve(); image.onerror = reject; image.src = src
    }))).then(() => { if (active) setAssetsReady(true) }, () => { if (active) setAssetError(true) })
    return () => { active = false }
  }, [])
  useEffect(() => { if (phase === 'result') { setHome(false); setPreviewZoom(false); setView(RESTING_VIEW) } }, [phase])
  const shareText = result ? createShareText(1, result, differences, recall.foundDifferenceIds, location.href).replace('Dreamerie #1', 'Dreamerie V2 · Playtest 1') : ''
  async function share(copy = false) {
    try {
      if (!copy && navigator.share) { await navigator.share({ text: shareText }); setShareStatus('Shared.') }
      else { await navigator.clipboard.writeText(shareText); setShareStatus('Copied. Send it to someone you dream with.') }
    } catch { setShareStatus('You can select and copy the message below.') }
  }
  function updateView(next: ImageView) { setView(next) }
  return <main className={`v2-app ${landing ? 'v2-landing' : 'v2-round'} ${result ? 'v2-finished' : ''}`}>
    <header className="v2-header"><a href="./" onClick={event => { event.preventDefault(); setTeaching(false); setHome(true) }}>☾ Dreamerie</a><span>Version 2 · Playtest</span></header>
    {storageError && <p role="alert" className="storage-warning">{storageError}</p>}
    {landing ? <section className="v2-welcome">
      <p className="eyebrow">{dream.title}</p>
      {!teaching && <><button className="v2-preview" onClick={() => setPreviewZoom(true)} aria-label="Enlarge the dream preview"><img src={dream.original} alt="A sailboat crosses a sea inside a teacup, beside a sleeping cat under a moonlit sky."/></button>
      <p className="v2-poem">Lost within a reverie, nothing stays where it should be.<br/>Glance away, then look once more—the moon has left its silver shore.</p></>}
      <h1>Find the five differences.</h1>
      <p className="v2-rules"><strong>5 guesses. 2 minutes. No pauses.</strong><br/>Tap either image, then <strong>Remember</strong> to confirm.<br/>Wrong guesses count too.</p>
      {phase === 'rules' && teaching && <Practice onReady={() => setReady(true)}/>}
      {phase === 'play' && <p role="status">Your dream is still fading. <strong>{formatClock(recallLeft)}</strong> left · {getRemainingGuesses(recall)} guesses left.</p>}
      {assetError && <p role="alert">The paintings couldn’t load. Refresh before starting.</p>}
      <div className="v2-start"><button className="primary-action" disabled={busy || Boolean(storageError) || !assetsReady || (phase === 'rules' && teaching && !ready)} onClick={() => { if (phase === 'rules' && !teaching) { setTeaching(true); return } setHome(false); if (phase === 'rules') void dispatch({ type: 'start' }) }}>{phase === 'rules' ? teaching ? 'Start · 2 minutes' : 'Try a quick practice' : result ? 'View result' : 'Continue'}</button>{phase === 'rules' && !ready && <small>{teaching ? 'Try the practice above first. No timer yet.' : 'Learn one guess before the clock starts.'}</small>}</div>
    </section> : <>
      {result ? <section className="v2-result" aria-labelledby="result-title"><p className="eyebrow">{result.reason === 'time' ? 'The dream has faded' : 'Your dream, remembered'}</p><h1 id="result-title">{result.accuracy}/5 <span>· {formatClock(result.elapsedSeconds)}</span></h1><p className="v2-tiles" aria-label={`${result.accuracy} of 5 differences found`}>{differences.map(d => recall.foundDifferenceIds.includes(d.id) ? '🟪' : '⬛').join('')}</p><div className="v2-share"><button className="primary-action" onClick={() => void share()}>Share result</button><button className="text-action" onClick={() => void share(true)}>Copy</button></div><p role="status">{shareStatus}</p></section>
      : <div className="v2-status"><strong>{getRemainingGuesses(recall)} guesses left</strong><time aria-label="Time remaining">{formatClock(recallLeft)}</time><span>{recall.foundDifferenceIds.length}/5 found</span></div>}
      <section className="v2-board" aria-label="Compare both paintings">
        {(['original', 'changed'] as const).map(side => <figure key={side}><figcaption>{side === 'original' ? 'The Dream' : 'The Memory'}{result && <span>{side === 'original' ? 'Found · Green' : 'Missed · Red'}</span>}</figcaption>
          <DreamCanvas label={`${side === 'original' ? 'The Dream' : 'The Memory'}. ${result ? 'Inspect the answers.' : 'Tap to mark, then Remember to confirm.'} Zoom and drag move both paintings.`} view={view} onView={updateView} selectable={!result} pendingPoint={recall.pending} onTap={result ? undefined : point => { void dispatch({ type: 'mark', point, side }) }}>
            <LandscapeArtwork changed={side === 'changed'}/>
            {!result && recall.confirmed.map((guess, i) => <span key={i} className={`dream-marker ${guess.correct ? 'dream-marker--found' : 'dream-marker--false'}`} style={{ left: `${guess.point.x * 100}%`, top: `${guess.point.y * 100}%` }}>{guess.correct ? '✓' : '×'}</span>)}
            {!result && recall.pending && <span className="dream-marker dream-marker--pending" style={{ left: `${recall.pending.x * 100}%`, top: `${recall.pending.y * 100}%` }}/>}
            {result && markers && getAnswerReveals(differences, recall.foundDifferenceIds, side).map(({ difference: d, number, found }) => <span key={d.id} className={`answer-outline ${found ? 'answer-found' : ''}`} style={{ left: `${d.box.left * 100}%`, top: `${d.box.top * 100}%`, width: `${d.box.width * 100}%`, height: `${d.box.height * 100}%` }}><span>{number}</span></span>)}
          </DreamCanvas>
        </figure>)}
      </section>
      <footer className="v2-controls">
        <div className="v2-zoom" aria-label="Zoom both paintings"><button aria-label="Zoom out both paintings" disabled={view.scale <= 1} onClick={() => setView(zoomAt(view, view.scale / 1.4, { x: .5, y: .5 }))}>−</button><button onClick={() => setView(RESTING_VIEW)}>Fit</button><button aria-label="Zoom in both paintings" disabled={view.scale >= 4} onClick={() => setView(zoomAt(view, view.scale * 1.4, recall.pending ?? { x: .5, y: .5 }))}>+</button></div>
        {result ? <button className="text-action" onClick={() => setMarkers(!markers)}>{markers ? 'Hide' : 'Show'} markers</button> : <button className="primary-action" disabled={!recall.pending || busy || Boolean(storageError)} onClick={() => { if (recall.pending) void dispatch({ type: 'confirm', point: recall.pending, side: pendingSide, expectedCount: recall.confirmed.length }) }}>Remember</button>}
        <p role="status">{result ? 'Zoom to examine every difference.' : recall.pending ? 'Circle placed. Remember uses 1 guess.' : recall.confirmed.length ? `${recall.confirmed.at(-1)?.correct ? 'Found!' : 'Not a new difference.'} Tap your next guess.` : 'Tap a difference in either image.'}</p>
        <small>Pinch or scroll to zoom · drag to explore both</small>
      </footer>
      {result && <section className="v2-answers"><h2>The five differences</h2><ol>{differences.map(d => <li key={d.id}>{d.label}<small>{recall.foundDifferenceIds.includes(d.id) ? 'Found' : 'Missed'} · {d.difficulty}</small></li>)}</ol><details><summary>Your share message</summary><textarea aria-label="Share message" readOnly value={shareText} rows={6}/></details>{['localhost', '127.0.0.1'].includes(location.hostname) && <p>This is a local preview. Its link won’t open on someone else’s device.</p>}<p>One landscape sample for testing—not the full daily collection.</p></section>}
    </>}
    {previewZoom && landing && <DreamViewer title={dream.title} onClose={() => setPreviewZoom(false)} simpleZoom status={phase === 'play' ? <span>{formatClock(recallLeft)} left · timer running</span> : undefined}><LandscapeArtwork changed={false}/></DreamViewer>}
    {import.meta.env.DEV && <div className="v2-dev"><button className="text-action" onClick={onNew}>New playtest (dev only)</button><a href="?version=1">Compare Version 1</a></div>}
  </main>
}
