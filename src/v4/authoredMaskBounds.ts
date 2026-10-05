import type { LandscapeDream } from '../v2/landscapeCollection.ts'

export interface MaskBounds { left: number; top: number; right: number; bottom: number }

// Authored clue masks use the native 1672 × 941 coordinate space. A mask
// controls visible pixels, so its full extent must fit the accepted hit region.
// Unsupported curve/arc commands fail explicitly rather than underestimating bounds.
export function authoredMaskBounds(path: string): MaskBounds {
  const tokens = path.match(/[a-zA-Z]|[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g) ?? []
  const remainder = path.replace(/[a-zA-Z]|[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g, '').replace(/[\s,]/g, '')
  if (remainder || !tokens.length) throw new Error('Invalid authored mask syntax')
  let i = 0, command = '', x = 0, y = 0, startX = 0, startY = 0, moved = false
  const points: [number, number][] = []
  const number = () => {
    const token = tokens[i++]
    if (token === undefined || /^[a-zA-Z]$/.test(token) || !Number.isFinite(Number(token))) throw new Error('Missing finite authored mask coordinate')
    return Number(token)
  }
  while (i < tokens.length) {
    if (/^[a-zA-Z]$/.test(tokens[i])) command = tokens[i++]
    if (!/^[MLHVZmlhvz]$/.test(command)) throw new Error(`Unsupported authored mask command: ${command || '(missing)'}`)
    if (!moved && command.toUpperCase() !== 'M') throw new Error('Authored mask must begin with M')
    const relative = command === command.toLowerCase()
    const kind = command.toUpperCase()
    if (kind === 'Z') {
      x = startX; y = startY; points.push([x, y]); command = ''; continue
    }
    if (kind === 'M' || kind === 'L') {
      const a = number(), b = number()
      x = relative ? x + a : a; y = relative ? y + b : b
      if (kind === 'M') { startX = x; startY = y; moved = true; command = relative ? 'l' : 'L' }
    } else if (kind === 'H') { const a = number(); x = relative ? x + a : a }
    else if (kind === 'V') { const a = number(); y = relative ? y + a : a }
    if (!Number.isFinite(x) || !Number.isFinite(y)) throw new Error('Nonfinite authored mask position')
    points.push([x, y])
  }
  if (!points.length) throw new Error('Empty authored mask')
  return { left: Math.min(...points.map(p => p[0])), top: Math.min(...points.map(p => p[1])), right: Math.max(...points.map(p => p[0])), bottom: Math.max(...points.map(p => p[1])) }
}

export function authoredMaskProblem(edit: LandscapeDream['edits'][number]): string | null {
  if (!edit.maskPath) return null
  try {
    const b = authoredMaskBounds(edit.maskPath), box = edit.box, tolerance = 1e-6
    if (b.left < box.left * 1672 - tolerance || b.top < box.top * 941 - tolerance ||
      b.right > (box.left + box.width) * 1672 + tolerance || b.bottom > (box.top + box.height) * 941 + tolerance) {
      return `Visible authored mask bounds ${JSON.stringify(b)} extend outside accepted hit rectangle ${JSON.stringify(box)}`
    }
    return null
  } catch (error) { return error instanceof Error ? error.message : String(error) }
}
