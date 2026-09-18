import { useEffect, useRef, useState } from 'react'

export default function ScoringHelp({ personal = false, playerCount = 3, online = false, ranked = false }: { personal?: boolean; playerCount?: number; online?: boolean; ranked?: boolean }) {
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
          {ranked ? <>
            <p><strong>Word of the Day</strong> rewards how often friends recognize your dream card.</p>
            <ul>
              <li>Most correct guesses: <strong>3 points</strong>. Second place: <strong>2</strong>. Third place: <strong>1</strong>. Other places: 0.</li>
              <li>A card with <strong>zero correct guesses earns 0</strong>, whatever its place.</li>
              <li>Ties share their place and take up those places: two tied for first earn 3 each; the next card earns 1.</li>
              <li>Making a correct guess earns no points itself. A card guessed by everyone can still earn 3.</li>
            </ul>
          </> : <ul>
            <li><strong>+1 point</strong> for each friend whose Dream you guess correctly.</li>
            <li><strong>0 points</strong> for a missed guess. You never lose points.</li>
            <li>Your own Dream is a reference; it does not earn a guessing point.</li>
            {personal && <li>You also earn <strong>+1 point for each friend who recognizes your Dream</strong>, unless everyone recognizes it. If everyone does, you earn <strong>0 recognition points</strong>; their correct guesses still earn points.</li>}
          </ul>}
          <p>Confirm a guess for each friend, then reveal their Dreams to see your points. You can unlock a guess before the reveal.</p>
          {online ? <p>{personal ? 'Your room’s players write their own clues and choose dream cards.' : 'Your room receives the same six words. Choose one dream card per word during preparation; everyone guesses the same word each day.'} The host can reveal early. At the displayed midnight deadline, results are revealed and the next day opens automatically; earlier results stay available.</p>
            : <p>Nancy and Song make random guesses in this prototype. Their choices stay hidden until you reveal.</p>}
          {online && <p>If a day closes before you finish, you receive 0 total points. Your unfinished guesses do not earn points for anyone. A prepared Dream stays on the board; a missing Dream is replaced by an anonymous card. {ranked ? 'Only players who finish are eligible for ranked awards, and only their completed guesses count.' : 'Only friends who finish count toward “everyone.”'}</p>}
          <p className="scoring-help-total">Up to <strong>{ranked ? 3 : personal ? 2 * Math.max(2, playerCount) - 3 : Math.max(1, playerCount - 1)} points per guessing day</strong> and <strong>{6 * (ranked ? 3 : personal ? 2 * Math.max(2, playerCount) - 3 : Math.max(1, playerCount - 1))} points across the six days</strong>.</p>
          {online && playerCount === 2 && !ranked && <p>With two players, recognition points are always zero: one correct friend means everyone recognized your Dream. Your correct guesses still earn points.</p>}
          <button className="quiet-button" onClick={() => dialog.current?.close()}>Back to dreaming</button>
        </dialog>
      )}
    </>
  )
}
