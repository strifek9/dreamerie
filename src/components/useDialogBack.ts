import { useEffect, useRef } from 'react'

// A same-URL entry lets device/browser Back dismiss inspection before leaving.
export function useDialogBack(onClose: () => void) {
  const close = useRef(onClose)
  close.current = onClose
  useEffect(() => {
    const marker = crypto.randomUUID()
    // Defer the entry so StrictMode's rehearsal cleanup cancels it safely.
    const timer = window.setTimeout(() => history.pushState({ ...history.state, dreamerieDialog: marker }, ''), 0)
    const back = () => { if (history.state?.dreamerieDialog !== marker) close.current() }
    window.addEventListener('popstate', back)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('popstate', back)
      if (history.state?.dreamerieDialog === marker) history.back()
    }
  }, [])
}
