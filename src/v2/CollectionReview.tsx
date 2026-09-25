import { useEffect, useState } from 'react'
import { LandscapeArtwork } from './LandscapeArtwork'
import { landscapeCollection, type LandscapeDream } from './landscapeCollection'
import './collectionReview.css'

// Development-only: the exact production compositor, enlarged at each answer.
export default function CollectionReview() {
  const params = new URLSearchParams(location.search)
  const [index, setIndex] = useState(() => Math.max(0, Math.min(119, Number(params.get('card') || 1) - 1)))
  const [full, setFull] = useState(false)
  const dream = landscapeCollection[index]
  return <main className="collection-review">
    <nav><button disabled={index === 0} onClick={() => setIndex(Math.max(0, index - 2))}>Previous</button><label>Card <input type="number" min="1" max="120" value={index + 1} onChange={e => setIndex(Math.max(0, Math.min(119, Number(e.target.value) - 1)))}/></label><button disabled={index >= 119} onClick={() => setIndex(Math.min(119, index + 2))}>Next</button><button onClick={() => setFull(!full)}>{full ? 'Hide' : 'Show'} whole paintings</button><a href={`?dream=${dream.id}`}>Play this card</a><a href="./">Daily game</a></nav>
    {landscapeCollection.slice(index, index + 2).map(card => <ReviewCard key={card.id} dream={card} full={full}/>)}
  </main>
}

function ReviewCard({ dream, full }: { dream: LandscapeDream; full: boolean }) {
  const [loaded, setLoaded] = useState('')
  useEffect(() => {
    let active = true
    Promise.all([...new Set([dream.original, dream.altered, ...dream.edits.flatMap(e => e.source ? [e.source] : [])])].map(src => new Promise<void>((resolve, reject) => { const image = new Image(); image.onload = () => resolve(); image.onerror = reject; image.src = src }))).then(() => { if (active) setLoaded(dream.id) }, () => { if (active) setLoaded('error') })
    return () => { active = false }
  }, [dream])
  return <article>
    <h1>{dream.id} · {dream.title}</h1><span role="status">{loaded === dream.id ? 'Artwork ready' : loaded === 'error' ? 'Artwork failed' : 'Loading artwork'}</span>
    {full && <div className="review-full">{[false, true].map(changed => <LandscapeArtwork key={String(changed)} dream={dream} changed={changed}/>)}</div>}
    <p>Original above · actual playable composite below. Each column shows one answer with surrounding context.</p>
    <div className="review-crops">{dream.edits.map(edit => {
      const b = edit.box
      const w = Math.max(75, b.width * 1672 * 1.4), h = Math.max(75, b.height * 941 * 1.4)
      const size = Math.max(w, h)
      const viewBox = `${(b.left + b.width / 2) * 1672 - size / 2} ${(b.top + b.height / 2) * 941 - size / 2} ${size} ${size}`
      return <section key={edit.id}><h2>{edit.id}</h2><LandscapeArtwork dream={dream} changed={false} viewBox={viewBox}/><LandscapeArtwork dream={dream} changed viewBox={viewBox}/><p>{edit.label}</p></section>
    })}</div>
  </article>
}
