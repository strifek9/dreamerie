import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { GAME_CONFIG, type Point } from '../game/dailyRecall'
import { constrainView, HOLD_MS, imagePoint, MOVE_THRESHOLD, RESTING_VIEW, zoomAt, type ImageView } from '../game/imageInspection'

type CanvasProps = {
  children: ReactNode
  label: string
  onTap?: (point: Point) => void
  onExpand?: () => void
  view?: ImageView
  onView?: (view: ImageView) => void
  selectable?: boolean
  pendingPoint?: Point | null
}

/** The page scrolls normally; only an explicitly expanded painting captures pan/zoom. */
export function DreamCanvas({ children, label, onTap, onExpand, view = RESTING_VIEW, onView, selectable = false, pendingPoint }: CanvasProps) {
  const canvas = useRef<HTMLButtonElement>(null)
  const layer = useRef<HTMLSpanElement>(null)
  const hold = useRef<ReturnType<typeof setTimeout> | null>(null)
  const points = useRef(new Map<number, Point>())
  const keyboardPoint = useRef<Point>({ x: .5, y: .5 })
  if (pendingPoint) keyboardPoint.current = pendingPoint
  const currentView = useRef(view)
  currentView.current = view
  const gesture = useRef({ origin: { x: 0, y: 0 }, view, distance: 0, moved: false })

  function clearHold() {
    if (hold.current !== null) clearTimeout(hold.current)
    hold.current = null
  }

  useEffect(() => {
    const cancel = () => { clearHold(); points.current.clear(); gesture.current.moved = true }
    window.addEventListener('resize', cancel)
    window.addEventListener('blur', cancel)
    return () => { cancel(); window.removeEventListener('resize', cancel); window.removeEventListener('blur', cancel) }
  }, [])

  useEffect(() => {
    const element = canvas.current
    if (!element || !onView) return
    const wheel = (event: WheelEvent) => {
      event.preventDefault()
      const bounds = element.getBoundingClientRect()
      onView(zoomAt(currentView.current, currentView.current.scale * (event.deltaY < 0 ? 1.16 : .86), { x: (event.clientX - bounds.left) / bounds.width, y: (event.clientY - bounds.top) / bounds.height }))
    }
    element.addEventListener('wheel', wheel, { passive: false })
    return () => element.removeEventListener('wheel', wheel)
  }, [onView])

  function start(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0 || points.current.size >= 2) return
    clearHold()
    event.currentTarget.setPointerCapture(event.pointerId)
    points.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    const values = [...points.current.values()]
    const first = values[0]
    const second = values[1]
    gesture.current = {
      origin: second ? { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 } : first,
      view: currentView.current,
      distance: second ? Math.hypot(first.x - second.x, first.y - second.y) : 0,
      moved: values.length > 1,
    }
    if (onExpand && values.length === 1) hold.current = setTimeout(() => {
      gesture.current.moved = true
      hold.current = null
      onExpand()
    }, HOLD_MS)
  }

  function move(event: PointerEvent<HTMLButtonElement>) {
    if (!points.current.has(event.pointerId)) return
    points.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    const [first, second] = [...points.current.values()]
    const midpoint = second ? { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 } : first
    const dx = midpoint.x - gesture.current.origin.x
    const dy = midpoint.y - gesture.current.origin.y
    if (second || Math.hypot(dx, dy) > MOVE_THRESHOLD) { clearHold(); gesture.current.moved = true }
    if (!onView || !gesture.current.moved) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const scale = second ? gesture.current.view.scale * Math.hypot(first.x - second.x, first.y - second.y) / Math.max(1, gesture.current.distance) : gesture.current.view.scale
    const zoomed = zoomAt(gesture.current.view, scale, { x: (gesture.current.origin.x - bounds.left) / bounds.width, y: (gesture.current.origin.y - bounds.top) / bounds.height })
    onView(constrainView({ ...zoomed, x: zoomed.x + dx / bounds.width, y: zoomed.y + dy / bounds.height }))
  }

  function end(event: PointerEvent<HTMLButtonElement>) {
    clearHold()
    const tap = points.current.has(event.pointerId) && points.current.size === 1 && !gesture.current.moved
    points.current.delete(event.pointerId)
    if (points.current.size) {
      gesture.current = { origin: [...points.current.values()][0], view: currentView.current, distance: 0, moved: true }
    }
    if (tap && layer.current) {
      const point = imagePoint({ x: event.clientX, y: event.clientY }, layer.current.getBoundingClientRect())
      if (point) { keyboardPoint.current = point; onTap?.(point) }
    }
  }

  return <button ref={canvas} type="button" className={`dream-canvas${onView ? ' dream-canvas--inspect' : ''}`}
    aria-label={`${label}${selectable ? ' Arrow keys move your marker.' : ''}`} onPointerDown={start} onPointerMove={move} onPointerUp={end}
    onPointerCancel={() => { clearHold(); points.current.clear(); gesture.current.moved = true }}
    onLostPointerCapture={(event) => { if (points.current.has(event.pointerId)) { clearHold(); points.current.clear(); gesture.current.moved = true } }}
    onContextMenu={(event) => event.preventDefault()} onDragStart={(event) => event.preventDefault()}
    onClick={(event) => { if (event.detail === 0) onTap?.(keyboardPoint.current) }}
    onKeyDown={(event) => {
      if (!selectable || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return
      event.preventDefault()
      const step = event.shiftKey ? .005 : .025
      const point = {
        x: Math.max(0, Math.min(1, keyboardPoint.current.x + (event.key === 'ArrowLeft' ? -step : event.key === 'ArrowRight' ? step : 0))),
        y: Math.max(0, Math.min(1, keyboardPoint.current.y + (event.key === 'ArrowUp' ? -step : event.key === 'ArrowDown' ? step : 0))),
      }
      keyboardPoint.current = point
      onTap?.(point)
      if (onView) onView(constrainView({ ...currentView.current, x: (.5 - point.x) * currentView.current.scale, y: (.5 - point.y) * currentView.current.scale }))
    }}
    style={{ '--zoom': view.scale, '--pan-x': `${view.x * 100}%`, '--pan-y': `${view.y * 100}%` } as CSSProperties}>
    <span className="zoom-layer" ref={layer}>{children}</span>
  </button>
}

export function DreamViewer({ children, title, onClose, onTap, status, action, simpleZoom = false }: {
  children: ReactNode
  title: string
  onClose: () => void
  onTap?: (point: Point) => void
  status?: ReactNode
  action?: ReactNode
  simpleZoom?: boolean
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [view, setView] = useState(RESTING_VIEW)
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

  return <dialog ref={dialog} className={`dream-viewer${simpleZoom ? ' dream-viewer--preview' : ''}`} aria-labelledby="viewer-title"
    onCancel={(event) => { event.preventDefault(); onClose() }}>
    <header className="viewer-header">
      <h2 id="viewer-title">{title}</h2>
      <div className="viewer-status">{status}</div>
    </header>
    <div className="viewer-stage">
      <div className="viewer-artwork">
        <button className="viewer-close" autoFocus aria-label="Close image viewer" onClick={onClose}>×</button>
        <DreamCanvas label={simpleZoom ? `${title}. Click to ${view.scale > 1 ? 'zoom out' : 'zoom in'}.` : `${title}. ${onTap ? 'Tap to place a guess. ' : ''}Pinch or scroll to zoom; drag to explore.`}
          view={view} onView={setView} onTap={simpleZoom ? (point) => setView(view.scale > 1 ? RESTING_VIEW : zoomAt(view, 2, point)) : onTap} selectable={!simpleZoom && Boolean(onTap)}>
          {children}
        </DreamCanvas>
      </div>
    </div>
    <footer className="viewer-footer">
      {simpleZoom ? <p className="inspection-hint">Click or tap to zoom {view.scale > 1 ? 'out' : 'in'}.</p> : <div className="zoom-controls" aria-label="Image zoom">
        <button aria-label="Zoom out" disabled={view.scale <= 1} onClick={() => setView(constrainView({ ...view, scale: view.scale / 1.25 }))}>−</button>
        <span>{Math.round(view.scale * 100)}%</span>
        <button aria-label="Zoom in" disabled={view.scale >= GAME_CONFIG.maxZoom} onClick={() => setView(constrainView({ ...view, scale: view.scale * 1.25 }))}>+</button>
        <button onClick={() => setView(RESTING_VIEW)}>Reset</button>
      </div>}
      {action}
    </footer>
  </dialog>
}
