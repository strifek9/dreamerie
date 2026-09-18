import { useRef, useState } from 'react'
import type { RoomView } from '../../shared/rooms'

export default function RoomClose({ room, blocked, onClose }: { room: RoomView; blocked: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const cancel = useRef<HTMLButtonElement>(null)
  const [revision, setRevision] = useState(room.revision)
  return <div className="room-close">
    <button ref={trigger} className="quiet-button" disabled={blocked} onClick={() => {
      setRevision(room.revision)
      dialog.current?.showModal()
      cancel.current?.focus()
    }}>Close this room</button>
    <dialog ref={dialog} className="scoring-help-dialog" aria-labelledby="close-room-title" onClose={() => trigger.current?.focus({ preventScroll: true })}>
      <h2 id="close-room-title">End this Dream Week?</h2>
      <p>This closes the room for everyone. It cannot be reopened.</p>
      <p>Only already revealed Dreams and points will be kept, for seven days. The unfinished day ends without revealing cards or awarding new points.</p>
      {revision !== room.revision && <p role="status">The room changed. Return and review it before closing.</p>}
      <div className="room-close-actions">
        <button ref={cancel} className="quiet-button" onClick={() => dialog.current?.close()}>Keep dreaming</button>
        <button className="quiet-button" disabled={blocked || revision !== room.revision} onClick={() => {
          dialog.current?.close()
          onClose()
        }}>Close for everyone</button>
      </div>
    </dialog>
  </div>
}
