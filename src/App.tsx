import { useState } from 'react'
import CardGallery from './components/CardGallery'
import { cards } from './data/cards'
import { CURRENT_PLAYER_ID, players } from './data/players'
import { dealInitialHands } from './game/allocation'

export default function App() {
  const [allocation] = useState(() => dealInitialHands('week-prototype', cards, players))
  const [galleryOpen, setGalleryOpen] = useState(false)
  const handIds = allocation.hands.get(CURRENT_PLAYER_ID)
  const hand = handIds?.map((id) => {
    const card = cards.find((entry) => entry.id === id)
    if (!card) throw new Error(`Missing artwork metadata for ${id}.`)
    return card
  })
  if (!hand) throw new Error('Charlie has not received a hand.')
  return (
    <div className="dreamerie-shell">
      <header className="masthead">
        <p className="wordmark">Dreamerie</p>
      </header>

      {galleryOpen ? (
        <main className="gallery-page">
          <div className="gallery-heading">
            <p className="eyebrow">Charlie’s cards</p>
            <h1>Dreams taking shape.</h1>
            <p className="invitation">Six images, waiting for meaning.</p>
            <p className="gallery-hint">Tap an image to look closer.</p>
          </div>
          <CardGallery cards={hand} />
          <p className="gallery-note">For now, simply wander. Your Dream Week comes next.</p>
          <button className="quiet-button" onClick={() => setGalleryOpen(false)}>
            Return to the beginning
          </button>
        </main>
      ) : (
      <main className="introduction">
        <div className="night-mark" aria-hidden="true">
          <span className="moon" />
          <span className="star star-one" />
          <span className="star star-two" />
          <span className="star star-three" />
        </div>
        <p className="eyebrow">A quiet place for shared dreams</p>
        <h1>A new Dreamerie begins.</h1>
        <p className="invitation">
          How well do you understand the way your friends see the world?
        </p>
        <div className="closing-note">
          <span className="divider" aria-hidden="true" />
          <p>The first dreams are still taking shape.</p>
        </div>
        <button className="quiet-button enter-gallery" onClick={() => setGalleryOpen(true)}>
          Enter the gallery
        </button>
      </main>
      )}

      <footer className="footer">
        <p>Local prototype · 0.1</p>
      </footer>
    </div>
  )
}
