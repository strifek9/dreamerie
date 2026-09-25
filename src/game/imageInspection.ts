import { GAME_CONFIG, type Point } from './dailyRecall.ts'

export type ImageView = { scale: number; x: number; y: number }
export const RESTING_VIEW: ImageView = { scale: 1, x: 0, y: 0 }
export const HOLD_MS = 450
export const MOVE_THRESHOLD = 8

// Bound panning to the visible window; center any axis smaller than that window.
export function constrainView(view: ImageView, viewport: Point = { x: 1, y: 1 }): ImageView {
  const scale = Math.min(GAME_CONFIG.maxZoom, Math.max(1, view.scale))
  if (scale === 1) return { ...RESTING_VIEW }
  // A full-stage viewer can show more than the fitted image's original bounds.
  const limitX = Math.max(0, (scale - viewport.x) / 2)
  const limitY = Math.max(0, (scale - viewport.y) / 2)
  return { scale, x: limitX ? Math.max(-limitX, Math.min(limitX, view.x)) : 0, y: limitY ? Math.max(-limitY, Math.min(limitY, view.y)) : 0 }
}

// Anchor wheel/pinch zoom to the detail under the pointer, not the image center.
export function zoomAt(view: ImageView, nextScale: number, anchor: Point, viewport?: Point): ImageView {
  const scale = constrainView({ ...view, scale: nextScale }).scale
  const ratio = scale / view.scale
  return constrainView({ scale,
    x: anchor.x - .5 - (anchor.x - .5 - view.x) * ratio,
    y: anchor.y - .5 - (anchor.y - .5 - view.y) * ratio,
  }, viewport)
}

export function imagePoint(point: Point, bounds: { left: number; top: number; width: number; height: number }): Point | null {
  if (bounds.width <= 0 || bounds.height <= 0) return null
  const x = (point.x - bounds.left) / bounds.width
  const y = (point.y - bounds.top) / bounds.height
  return x >= 0 && x <= 1 && y >= 0 && y <= 1 ? { x, y } : null
}
