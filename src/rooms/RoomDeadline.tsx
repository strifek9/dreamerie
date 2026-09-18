import type { RoomView } from '../../shared/rooms'

const deadlineFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Chicago', weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
})

export default function RoomDeadline({ room }: { room: RoomView }) {
  if (!room.schedule || !['preparation', 'guessing', 'revealed'].includes(room.phase)) return null
  const { deadline } = room.schedule
  const label = room.phase === 'preparation' ? 'Preparation closes' : room.game?.day === 7 ? 'Your week ends' : 'The next day opens'
  return <p className="room-deadline">
    {label} <time dateTime={new Date(deadline).toISOString()}>{deadlineFormat.format(deadline)} at 12:00 AM</time> · Chicago time
  </p>
}
