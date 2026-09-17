import { useEffect, useRef, useState } from 'react'

export default function ScoringHelp({ personal = false }: { personal?: boolean }) {
  const [open, setOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (open && dialog.current && !dialog.current.open) {
      dialog.current.showModal()
      heading.current?.focus({ preventScroll: true })
      dialog.current.scrollTop = 0
    }
  }, [open])

  return (
    <>
      <button ref={trigger} className="scoring-help-button" aria-label="How scoring works" aria-haspopup="dialog" onClick={() => setOpen(true)}>
        <span aria-hidden="true">?</span>
      </button>
      {open && (
        <dialog ref={dialog} className="scoring-help-dialog" aria-labelledby="scoring-help-title" onClose={() => {
          setOpen(false)
          trigger.current?.focus({ preventScroll: true })
        }}>
          <p className="eyebrow">Recognizing a friend's dream</p>
          <h2 id="scoring-help-title" ref={heading} tabIndex={-1}>How scoring works</h2>
          <p>You are a Dreamier, someone who can see others’ dreams.</p>
          <ul>
            <li><strong>+1 point</strong> for each friend whose Dream you guess correctly.</li>
            <li><strong>0 points</strong> for a missed guess. You never lose points.</li>
            <li>Your own Dream is a reference; it does not earn a guessing point.</li>
            {personal && <li>You also earn <strong>+1 point for each friend who recognizes your Dream</strong>, unless everyone recognizes it. If everyone does, you earn <strong>0 recognition points</strong>; their correct guesses still earn points.</li>}
          </ul>
          <p>Confirm a guess for each friend, then reveal their Dreams to see your points. You can unlock a guess before the reveal.</p>
          <p>Nancy and Song make random guesses in this prototype. Their choices stay hidden until you reveal.</p>
          <p className="scoring-help-total">In this prototype: two friends, up to <strong>{personal ? 3 : 2} points per guessing day</strong> and <strong>{personal ? 18 : 12} points across the six days</strong>.</p>
          <button className="quiet-button" onClick={() => dialog.current?.close()}>Back to dreaming</button>
        </dialog>
      )}
    </>
  )
}
