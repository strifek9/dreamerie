import { useEffect, useRef, type ReactNode } from 'react'
import { DreamCanvas } from '../components/InspectableDream'
import { useDialogBack } from '../components/useDialogBack'
import { RESTING_VIEW, zoomAt, type ImageView } from '../game/imageInspection'
import type { Point } from '../game/dailyRecall'
import type { DreamSide } from '../game/dailySession'

export function ComparisonViewer({ aspectRatio, view, onView, onClose, onTap, pendingPoint, status, action, feedback, artwork }: {
  aspectRatio: number; view: ImageView; onView: (view: ImageView) => void; onClose: () => void
  onTap?: (point: Point, side: DreamSide) => void; pendingPoint: Point | null
  status: string; action: ReactNode; feedback?: string; artwork: (side: DreamSide) => ReactNode
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  useDialogBack(onClose)
  useEffect(() => {
    const element = dialog.current!
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    element.showModal()
    return () => { element.close(); document.body.style.overflow = overflow; if (opener?.isConnected) opener.focus({ preventScroll: true }) }
  }, [])
  return <dialog ref={dialog} className="v3-comparison" aria-labelledby="comparison-title" onCancel={event => { event.preventDefault(); onClose() }}>
    <header><h2 id="comparison-title">Compare both paintings</h2><span>{status}</span><button autoFocus className="v3-close" aria-label="Close comparison" onClick={onClose}>×</button></header>
    <section className="v3-comparison-pair">
      {(['original', 'changed'] as const).map(side => <figure key={side} data-side={side}><figcaption>{side === 'original' ? 'The Dream' : 'The Memory'}</figcaption>
        <DreamCanvas fitAspectRatio={aspectRatio} label={`${side === 'original' ? 'The Dream' : 'The Memory'}. Both paintings zoom and pan together.`} view={view} onView={onView} pendingPoint={pendingPoint} selectable={Boolean(onTap)} onTap={onTap ? point => onTap(point, side) : undefined}>{artwork(side)}</DreamCanvas>
      </figure>)}
    </section>
    <footer><div className="v2-zoom"><button aria-label="Zoom out both paintings" disabled={view.scale <= 1} onClick={() => onView(zoomAt(view, view.scale / 1.4, { x: .5, y: .5 }))}>−</button><button onClick={() => onView(RESTING_VIEW)}>Fit</button><button aria-label="Zoom in both paintings" disabled={view.scale >= 4} onClick={() => onView(zoomAt(view, view.scale * 1.4, pendingPoint ?? { x: .5, y: .5 }))}>+</button></div>{action}{feedback && <p role="status">{feedback}</p>}</footer>
  </dialog>
}
