import { useEffect, useRef } from 'react'
import type { Difference } from '../game/dailyRecall'
import { LandscapeArtwork } from '../v2/LandscapeArtwork'
import type { LandscapeDream } from '../v2/landscapeCollection'
import { answerCrop } from './dreamRitual'

export function AnswerInspection({ dream, differences, foundIds, index, onSelect, onClose }: {
  dream: LandscapeDream
  differences: readonly Difference[]
  foundIds: readonly string[]
  index: number
  onSelect: (index: number) => void
  onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const element = dialog.current!
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    element.showModal()
    return () => {
      element.close()
      document.body.style.overflow = overflow
      if (opener?.isConnected) opener.focus({ preventScroll: true })
    }
  }, [])
  const difference = differences[index]
  const crop = answerCrop(difference.box)
  const viewBox = `${crop.x} ${crop.y} ${crop.width} ${crop.height}`
  return <dialog ref={dialog} className="v3-answer-dialog" aria-labelledby="answer-inspection-title" onCancel={event => { event.preventDefault(); onClose() }}
    onKeyDown={event => {
      if (event.key !== 'Tab') return
      const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'))
      const first = buttons[0], last = buttons.at(-1)
      if (event.shiftKey && document.activeElement === first && last) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last && first) { event.preventDefault(); first.focus() }
    }}>
    <header><h2 id="answer-inspection-title">What was different?</h2><button autoFocus className="v3-close" aria-label="Close answer inspection" onClick={onClose}>×</button></header>
    <div className="v3-answer-pair">
      {(['original', 'changed'] as const).map(side => <figure key={side}>
        <figcaption>{side === 'original' ? 'The Dream' : 'The Memory'}</figcaption>
        <div className="v3-answer-crop" role="img" aria-label={`${side === 'original' ? 'Original' : 'Altered'} detail ${index + 1}: ${difference.label}`}>
          <LandscapeArtwork dream={dream} changed={side === 'changed'} viewBox={viewBox}/>
        </div>
      </figure>)}
    </div>
    <div className="v3-answer-description" aria-live="polite" aria-atomic="true"><p>{difference.label}</p><span>{foundIds.includes(difference.id) ? '✓ Found' : '○ Missed'}</span></div>
    <nav aria-label="Inspect differences"><button aria-disabled={index === 0} onClick={() => { if (index > 0) onSelect(index - 1) }}>← Previous</button><span>{index + 1} / {differences.length}</span><button aria-disabled={index === differences.length - 1} onClick={() => { if (index < differences.length - 1) onSelect(index + 1) }}>Next →</button></nav>
  </dialog>
}
