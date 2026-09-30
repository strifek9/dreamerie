export type ArtworkStatus = 'loading' | 'ready' | 'error'
export interface ArtworkImage extends Pick<EventTarget, 'addEventListener' | 'removeEventListener'> { src: string }

// Loading is independent of the session: retrying must never start, pause or
// reset a round. A stalled request eventually offers a useful recovery action.
export function preloadArtwork(
  sources: readonly string[],
  onStatus: (status: ArtworkStatus) => void,
  options: { createImage?: () => ArtworkImage; timeoutMs?: number } = {},
): () => void {
  const urls = [...new Set(sources)]
  const images: Array<{ image: ArtworkImage; loaded: () => void; failed: () => void }> = []
  let remaining = urls.length
  let stopped = false
  let timer: ReturnType<typeof setTimeout> | undefined
  const cleanup = () => {
    clearTimeout(timer)
    for (const { image, loaded, failed } of images) {
      image.removeEventListener('load', loaded)
      image.removeEventListener('error', failed)
    }
  }
  const finish = (status: ArtworkStatus) => {
    if (stopped) return
    stopped = true
    cleanup()
    onStatus(status)
  }
  onStatus('loading')
  if (!remaining) finish('error')
  else {
    timer = setTimeout(() => finish('error'), options.timeoutMs ?? 60_000)
    try {
      for (const src of urls) {
        if (stopped) break
        const image = options.createImage?.() ?? new Image()
        const loaded = () => { if (--remaining === 0) finish('ready') }
        const failed = () => finish('error')
        images.push({ image, loaded, failed })
        image.addEventListener('load', loaded, { once: true })
        image.addEventListener('error', failed, { once: true })
        image.src = src
      }
    } catch { finish('error') }
  }
  return () => { stopped = true; cleanup() }
}
