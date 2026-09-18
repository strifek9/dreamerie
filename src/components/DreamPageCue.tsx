/** A decorative page turn marks a new prompt without moving the card gallery. */
export default function DreamPageCue({ pageKey, children }: { pageKey: string; children: React.ReactNode }) {
  return <p className="dream-page-cue">
    <span key={pageKey} className="dream-book" aria-hidden="true"><span className="dream-book-leaf" /></span>
    <span>{children}</span>
  </p>
}
