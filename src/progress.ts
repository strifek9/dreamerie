import { playableDreams } from './v3/dailyDream'
import { landscapeDay } from './v2/landscapeCollection'
import { dailyStorageKey } from './game/dailySession'
import { exportProgress, readProgress, reviewProgress, importMissingProgress, type ProgressFile } from './game/progressTransfer'
const known = new Set(playableDreams.map(d => d.id))
const message = document.getElementById('message')!
const review = document.getElementById('review')!
const restore = document.getElementById('import') as HTMLButtonElement
let selected: ProgressFile | null = null
function error(value: unknown) { message.textContent = value instanceof Error ? value.message : 'Progress could not be read.' }
document.getElementById('export')!.addEventListener('click', () => {
  try {
    const file = exportProgress(localStorage, known, landscapeDay(), Date.now())
    const url = URL.createObjectURL(new Blob([JSON.stringify(file)], { type: 'application/json' }))
    const link = document.createElement('a'); link.href = url; link.download = `dreamerie-progress-${new Date().toISOString().slice(0, 10)}.json`; link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    message.textContent = `Saved ${file.entries.length} puzzle days. No browser data was changed.`
  } catch (e) { error(e) }
})
document.getElementById('file')!.addEventListener('change', async event => {
  selected = null; restore.disabled = true; review.textContent = ''; message.textContent = ''
  try {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (!file) return
    if (file.size > 2_000_000) throw new Error('Progress file is too large.')
    selected = readProgress(await file.text(), known, landscapeDay(), Date.now())
    const plan = reviewProgress(selected, localStorage)
    review.textContent = `${plan.missing.length} missing days can be restored. ${plan.identical.length} matching and ${plan.conflicts.length} different existing days will be kept.`
    restore.disabled = !plan.missing.length
  } catch (e) { selected = null; error(e) }
})
restore.addEventListener('click', async () => {
  const file = selected
  if (!file) return
  restore.disabled = true
  try {
    if (!navigator.locks) throw new Error('Use a current browser with site storage allowed.')
    // Same locks as gameplay, in stable order. All records are rechecked under
    // these locks so another tab cannot be overwritten between preview and import.
    const days = [...file.entries].sort((a, b) => a.day - b.day)
    async function locked(index: number): Promise<ReturnType<typeof importMissingProgress>> {
      if (index === days.length) return importMissingProgress(readProgress(JSON.stringify(file), known, landscapeDay(), Date.now()), localStorage)
      return navigator.locks.request(dailyStorageKey(days[index].day), () => locked(index + 1))
    }
    const result = await locked(0)
    message.textContent = `Restored ${result.imported} missing days. Kept ${result.kept} existing days. Return to Dreamerie to check your progress.`
    selected = null
  } catch (e) { error(e); restore.disabled = false }
})

;(document.getElementById('export') as HTMLButtonElement).disabled = false
;(document.getElementById('file') as HTMLInputElement).disabled = false
message.textContent = ''
