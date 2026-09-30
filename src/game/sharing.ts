export type ShareStatus = 'shared' | 'copied' | 'cancelled' | 'fallback'
export interface ShareActions {
  share?: (data: { text: string }) => Promise<void>
  copy?: (text: string) => Promise<void>
}

export async function shareResult(text: string, copy: boolean, actions: ShareActions): Promise<ShareStatus> {
  try {
    if (!copy && actions.share) {
      await actions.share({ text })
      return 'shared'
    }
    if (actions.copy) {
      await actions.copy(text)
      return 'copied'
    }
  } catch (error) {
    // Closing the native sheet is an intentional choice, not a failed game.
    if (!copy && actions.share && error instanceof Error && error.name === 'AbortError') return 'cancelled'
  }
  return 'fallback'
}
