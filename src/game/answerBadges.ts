import type { DifferenceBox } from './dailyRecall.ts'

export interface ScreenRect { left: number; top: number; width: number; height: number }
export interface BadgeTarget { id: string; box: DifferenceBox }
export interface BadgePlacement { id: string; box: ScreenRect; badge: ScreenRect; anchor: { x: number; y: number }; moved: boolean }
const right = (r: ScreenRect) => r.left + r.width
const bottom = (r: ScreenRect) => r.top + r.height
const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n))
function intersection(a: ScreenRect, b: ScreenRect): ScreenRect {
  const left = Math.max(a.left,b.left), top = Math.max(a.top,b.top)
  return { left,top,width:Math.max(0,Math.min(right(a),right(b))-left),height:Math.max(0,Math.min(bottom(a),bottom(b))-top) }
}

/** Move labels only. Boxes and their source geometry are never changed. */
export function placeAnswerBadges(targets: readonly BadgeTarget[], artwork: ScreenRect, viewport: ScreenRect, scale = 1): BadgePlacement[] {
  if (![artwork.left,artwork.top,artwork.width,artwork.height,viewport.left,viewport.top,viewport.width,viewport.height,scale].every(Number.isFinite) || scale <= 0) return []
  const clip=intersection(artwork,viewport), size=20*scale, gap=3*scale, inset=4*scale
  if (clip.width<size+inset*2 || clip.height<size+inset*2) return []
  const placed:BadgePlacement[]=[]
  for(const target of targets){
    const b=target.box, box={left:artwork.left+b.left*artwork.width,top:artwork.top+b.top*artwork.height,width:b.width*artwork.width,height:b.height*artwork.height}
    const visible=intersection(box,clip)
    if(!visible.width||!visible.height)continue // Do not float labels for offscreen clues.
    const preferred={left:box.left,top:box.top-gap-size}
    const candidates=[preferred,{left:right(box)-size,top:preferred.top},{left:box.left,top:bottom(box)+gap},{left:box.left,top:box.top},{left:right(box)+gap,top:box.top},{left:box.left-size-gap,top:box.top}]
    // Nearby clues can share a preferred corner. Offer small neighboring slots
    // before accepting an overlap; a leader keeps each number tied to its clue.
    for(const dx of [-1,1])for(const dy of [-1,0,1])candidates.push({left:preferred.left+dx*(size+gap),top:preferred.top+dy*(size+gap)})
    const ranked=candidates.map(p=>{
      const badge={left:clamp(p.left,clip.left+inset,right(clip)-inset-size),top:clamp(p.top,clip.top+inset,bottom(clip)-inset-size),width:size,height:size}
      const overlap=placed.reduce((sum,other)=>{const hit=intersection(badge,other.badge);return sum+hit.width*hit.height},0)
      const distance=(badge.left-preferred.left)**2+(badge.top-preferred.top)**2
      return {badge,score:overlap*1e6+distance}
    }).sort((a,b)=>a.score-b.score)
    const badge=ranked[0].badge,cx=badge.left+size/2,cy=badge.top+size/2
    placed.push({id:target.id,box,badge,anchor:{x:clamp(cx,visible.left,right(visible)),y:clamp(cy,visible.top,bottom(visible))},moved:Math.abs(badge.left-preferred.left)>.5||Math.abs(badge.top-preferred.top)>.5})
  }
  return placed
}
