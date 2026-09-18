import type { DreamMode } from '../game/types'

export function RoomModeDescription({ mode }: { mode: DreamMode }) {
  return <div className="room-mode-description">
    <strong>{mode === 'classic' ? 'Word of the Day' : 'Your own dream clues'}</strong>
    <p>{mode === 'classic' ? 'Everyone gets the same six words. Choose a dream card for each; no writing needed. Cards earn ranked awards of 3, 2 or 1 points. Correct guesses do not earn points themselves.'
      : 'Write six clues and choose a card for each. Earn 1 point per correct guess, plus 1 per friend who recognizes your card, unless everyone does.'}</p>
  </div>
}

export default function RoomModeChoice({ mode, onChange, disabled }: { mode: DreamMode; onChange: (mode: DreamMode) => void; disabled: boolean }) {
  return <fieldset className="mode-picker room-mode-picker" disabled={disabled}>
    <legend>Choose your room’s Dream Week</legend>
    <label><input type="radio" name="room-mode" checked={mode === 'classic'} onChange={() => onChange('classic')} />Word of the Day · recommended</label>
    <label><input type="radio" name="room-mode" checked={mode === 'personal'} onChange={() => onChange('personal')} />Your own dream clues</label>
    <RoomModeDescription mode={mode} />
    <p>Everyone joins the creator’s mode. It stays the same for the whole week.</p>
  </fieldset>
}
