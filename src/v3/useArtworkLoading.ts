import { useEffect, useState } from 'react'
import { preloadArtwork, type ArtworkStatus } from '../game/artworkLoading'
import type { LandscapeDream } from '../v2/landscapeCollection'
import { artworkSources } from './artworkDelivery'

export function useArtworkLoading(dream: LandscapeDream) {
  const [attempt, setAttempt] = useState(0)
  const [status, setStatus] = useState<ArtworkStatus>('loading')
  useEffect(() => preloadArtwork(artworkSources(dream), setStatus), [dream, attempt])
  return { status, retry: () => { setStatus('loading'); setAttempt(value => value + 1) } }
}
