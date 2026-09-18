import { useEffect, useRef } from 'react'
import type { RoomView } from '../../shared/rooms'
import { playerId } from '../../shared/parse'
import RoomHistory from './RoomHistory'

export default function RoomEnded({ room }: { room: RoomView }) {
  const expired = room.phase === 'expired'
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => { heading.current?.focus() }, [room.phase])
  const roster = room.members.map((member) => ({ id: playerId(member.playerId), name: member.displayName }))
  return <main className="gallery-page room-ended" aria-labelledby="room-ended-title">
    <p className="eyebrow">A shared Dream Week</p>
    <h1 ref={heading} tabIndex={-1} id="room-ended-title">{expired ? 'This room has faded.' : 'This room is closed.'}</h1>
    <p className="invitation">{expired ? 'This invitation has expired. Gather in a new room to dream again.' : 'No more choices can be made here. Your revealed Dreams are kept below.'}</p>
    {!expired && room.game && <p className="week-score">Your revealed days: {room.game.totalScore} points</p>}
    {!expired && room.game && <RoomHistory days={room.game.history} roster={roster} total={room.game.totalScore} />}
    <a className="quiet-button room-new-link" href="/?play=rooms">Gather in another room</a>
  </main>
}
