import { useState } from 'react'
import type { RoomView } from '../../shared/rooms'
import { playerAccents } from '../data/playerAccents'

export default function RoomLobby({ room, connection }: { room: RoomView; connection: string }) {
  const [copyStatus, setCopyStatus] = useState('')
  const invite = new URL(window.location.origin)
  invite.searchParams.set('play', 'rooms')
  invite.searchParams.set('invite', room.inviteCode)
  const closed = room.phase === 'closed' || room.phase === 'expired'
  async function copyInvite() {
    try { await navigator.clipboard.writeText(invite.href); setCopyStatus('Invitation copied.') }
    catch { setCopyStatus('Select the invitation below to copy it.') }
  }
  return <section className="room-lobby" aria-labelledby="room-title">
    <p className="eyebrow">A place for shared dreams</p>
    <h1 id="room-title">{closed ? `This room is ${room.phase}.` : 'Your friends gather here.'}</h1>
    <p className="room-invitation">{closed ? 'Ask your friends for a new invitation.' : 'A different world in every mind.'}</p>
    <p className="room-count" role="status">{room.members.length} of 6 places filled</p>
    <ul className="room-roster">
      {room.members.map((member) => <li key={member.playerId} data-player-accent={playerAccents[member.accentSlot]}>
        <span className="room-seat" aria-hidden="true">{member.accentSlot + 1}</span>
        <span className="player-name">{member.displayName}</span>
        <span className="room-member-label">{[member.playerId === room.selfId ? 'You' : '', member.playerId === room.hostId ? 'Host' : ''].filter(Boolean).join(' · ')}</span>
      </li>)}
    </ul>
    <p className="room-note">{closed ? 'Your place is kept in this room’s record.' : room.members.length === 1
      ? 'Invite at least one friend to share your Dream Week.' : 'Your room is saved. There is room for up to six dreamers.'}</p>
    {!closed && room.phase === 'lobby' && <div className="room-share">
      <p>Invitation code <strong className="room-code">{room.inviteCode}</strong></p>
      <button type="button" className="quiet-button" onClick={() => { void copyInvite() }}>Copy invitation</button>
      <label htmlFor="room-invite-link">Or share this link</label>
      <input id="room-invite-link" readOnly value={invite.href} onFocus={(event) => event.target.select()} />
      <p className="room-copy-status" role="status">{copyStatus}</p>
    </div>}
    <p className="room-connection" role="status">{connection || 'Your place is saved in this browser.'}</p>
  </section>
}
