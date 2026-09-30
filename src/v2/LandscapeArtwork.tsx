import { useId } from 'react'
import type { LandscapeDream } from './landscapeCollection'
import { changedArtwork, originalArtwork } from '../v3/artworkDelivery'

// Only authored regions use edited pixels; incidental generation drift is excluded.
export function LandscapeArtwork({ changed, dream, viewBox = '0 0 1672 941' }: { changed: boolean; dream: LandscapeDream; viewBox?: string }) {
  const clip = useId().replaceAll(':', '')
  return <svg viewBox={viewBox} className="dream-image" aria-hidden="true">
    <image href={originalArtwork(dream)} width="1672" height="941" preserveAspectRatio="none"/>
    {changed && dream.edits.map(edit => {
      const { id, box, maskPath, edgeFade } = edit
      const placement = changedArtwork(dream, edit)
      const key = `${clip}-${id}`, x = box.left * 1672, y = box.top * 941, w = box.width * 1672, h = box.height * 941
      // Fade just the patch boundary, never the painting detail. No pixels outside
      // the authored region are changed.
      const feather = Math.min(edgeFade ?? 4, w / 6, h / 6)
      return <g key={id}>
        <defs>
          <clipPath id={key}>{maskPath ? <path d={maskPath}/> : <rect x={x} y={y} width={w} height={h}/>}</clipPath>
          {feather > 0 && <>
            <linearGradient id={`${key}-x`}><stop stopColor="white" stopOpacity="0"/><stop offset={feather / w} stopColor="white"/><stop offset={1 - feather / w} stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0"/></linearGradient>
            <linearGradient id={`${key}-y`} x2="0" y2="1"><stop stopColor="white" stopOpacity="0"/><stop offset={feather / h} stopColor="white"/><stop offset={1 - feather / h} stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0"/></linearGradient>
            <mask id={`${key}-my`} maskUnits="userSpaceOnUse" x={x} y={y} width={w} height={h}><rect x={x} y={y} width={w} height={h} fill={`url(#${key}-y)`}/></mask>
            <mask id={`${key}-mx`} maskUnits="userSpaceOnUse" x={x} y={y} width={w} height={h}><rect x={x} y={y} width={w} height={h} fill={`url(#${key}-x)`} mask={`url(#${key}-my)`}/></mask>
          </>}
        </defs>
        <image href={placement.src} x={placement.x} y={placement.y} width={placement.width} height={placement.height} preserveAspectRatio="none" clipPath={`url(#${key})`} mask={feather > 0 ? `url(#${key}-mx)` : undefined}/>
      </g>
    })}
  </svg>
}
