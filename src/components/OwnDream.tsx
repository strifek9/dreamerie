import type { Card } from '../game/types'
import CardGallery from './CardGallery'

export default function OwnDream({ card, concept }: { card: Card; concept: string }) {
  return (
    <aside className="own-dream" aria-label={`Your Dream of ${concept}`}>
      <div><p className="eyebrow">Your Dream</p><p className="own-concept">{concept}</p></div>
      <CardGallery cards={[card]} label={`Your remembered image for ${concept}`} />
    </aside>
  )
}
