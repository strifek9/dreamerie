import { useId } from 'react'
import { landscapeDifferences, landscapeDream } from './landscapeDream'

export function LandscapeArtwork({ changed }: { changed: boolean }) {
  const clip = useId().replaceAll(':', '')
  return <svg viewBox="0 0 1672 941" className="dream-image" aria-hidden="true">
    <image href={landscapeDream.original} width="1672" height="941" preserveAspectRatio="none"/>
    {changed && <><defs><clipPath id={clip}>{landscapeDifferences.map(({ id, box }) => <rect key={id} x={box.left * 1672} y={box.top * 941} width={box.width * 1672} height={box.height * 941}/>)}</clipPath></defs><image href={landscapeDream.altered} width="1672" height="941" preserveAspectRatio="none" clipPath={`url(#${clip})`}/></>}
  </svg>
}
