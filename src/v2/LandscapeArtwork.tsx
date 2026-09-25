import { useId } from 'react'
import { landscapeDream, sampleEdits } from './landscapeDream'
import type { LandscapeDream } from './landscapeCollection'

const sample = { ...landscapeDream, edits: sampleEdits }

// Only authored regions use edited pixels; incidental generation drift is excluded.
export function LandscapeArtwork({ changed, dream = sample, viewBox = '0 0 1672 941' }: { changed: boolean; dream?: LandscapeDream; viewBox?: string }) {
  const clip = useId().replaceAll(':', '')
  return <svg viewBox={viewBox} className="dream-image" aria-hidden="true">
    <image href={dream.original} width="1672" height="941" preserveAspectRatio="none"/>
    {changed && dream.edits.map(({ id, box, maskPath, source, edgeFade }) => {
      const key = `${clip}-${id}`, x = box.left * 1672, y = box.top * 941, w = box.width * 1672, h = box.height * 941
      // Fade just the patch boundary, never the painting detail. No pixels outside
      // the authored region are changed. The published sample stays untouched.
      const feather = dream.id === sample.id ? 0 : Math.min(edgeFade ?? 4, w / 6, h / 6)
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
        <image href={source ?? dream.altered} width="1672" height="941" preserveAspectRatio="none" clipPath={`url(#${key})`} mask={feather > 0 ? `url(#${key}-mx)` : undefined}/>
      </g>
    })}
  </svg>
}
