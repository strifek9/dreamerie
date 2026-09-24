import { GAME_CONFIG, type Point } from './dailyRecall.ts'

export type ImageView = { scale: number; x: number; y: number }
export const RESTING_VIEW: ImageView = { scale: 1, x: 0, y: 0 }
export const HOLD_MS = 450
export const MOVE_THRESHOLD = 8

// Keep the painting covering its viewport, even after a pinch or rotation.
export function constrainView(view: ImageView): ImageView {
  const scale = Math.min(GAME_CONFIG.maxZoom, Math.max(1, view.scale))
  if (scale === 1) return { ...RESTING_VIEW }
  const limit = (scale - 1) / 2
  return { scale, x: Math.max(-limit, Math.min(limit, view.x)), y: Math.max(-limit, Math.min(limit, view.y)) }
}

// Anchor wheel/pinch zoom to the detail under the pointer, not the image center.
export function zoomAt(view: ImageView, nextScale: number, anchor: Point): ImageView {
  const scale = constrainView({ ...view, scale: nextScale }).scale
  const ratio = scale / view.scale
  return constrainView({ scale,
    x: anchor.x - .5 - (anchor.x - .5 - view.x) * ratio,
    y: anchor.y - .5 - (anchor.y - .5 - view.y) * ratio,
  })
}

export function imagePoint(point: Point, bounds: { left: number; top: number; width: number; height: number }): Point | null {
  if (bounds.width <= 0 || bounds.height <= 0) return null
  const x = (point.x - bounds.left) / bounds.width
  const y = (point.y - bounds.top) / bounds.height
  return x >= 0 && x <= 1 && y >= 0 && y <= 1 ? { x, y } : null
}
