import type { RoomView } from '../../shared/rooms'

const expiryFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Chicago', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
})

export default function RoomRetention({ room }: { room: RoomView }) {
  if (room.expiresAt === undefined || !['lobby', 'closed', 'complete'].includes(room.phase)) return null
  return <p className="room-retention">
    {room.phase === 'lobby' ? 'Start this week before' : 'Revealed Dreams are available until'}{' '}
    <time dateTime={new Date(room.expiresAt).toISOString()}>{expiryFormat.format(room.expiresAt)}</time> · Chicago time.
    {room.phase === 'lobby' ? ' Otherwise, this waiting room expires.' : ' After that, the cards, clues and results are removed.'}
  </p>
}
