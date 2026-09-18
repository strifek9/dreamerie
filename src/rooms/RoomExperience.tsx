import { useState } from 'react'
import RoomLobby from './RoomLobby'
import RoomPlay from './RoomPlay'
import { useRoomConnection } from './useRoomConnection'
import '../styles/rooms.css'

export default function RoomExperience() {
  const state = useRoomConnection()
  const [action, setAction] = useState<'create' | 'join'>(() => new URLSearchParams(window.location.search).has('invite') ? 'join' : 'create')
  const [name, setName] = useState('')
  const [code, setCode] = useState(() => new URLSearchParams(window.location.search).get('invite') ?? '')
  if (state.room && state.session) return <RoomPlay key={state.room.id} room={state.room} csrf={state.session.csrfToken} accept={state.accept} connection={state.connection} />
  return <div className="dreamerie-shell">
    <header className="masthead">
      <p className="wordmark"><span aria-hidden="true">☾</span> Dreamerie</p>
      <a className="room-demo-link" href="/?mode=personal">Solo practice · simulated players</a>
    </header>
    <main className="introduction room-page">
      <div className="welcome-art" aria-hidden="true"><img src="/artwork/dreamerie-moonlight.jpg" alt="" width="1122" height="1402" /></div>
      <div className="room-content">
        {state.room ? <RoomLobby room={state.room} connection={state.connection} /> : <>
          <p className="eyebrow">A private invitation</p>
          <h1>Gather your dreamers.</h1>
          <p className="room-invitation">Make a room for your friends, or follow their invitation.</p>
          {state.connecting ? <p role="status">Finding your place…</p> : state.session ? <>
            {state.pending ? <div className="room-pending">
              <p role="status">{state.busy ? 'Saving your place…' : 'Your last request still needs confirmation.'}</p>
              <button className="quiet-button" disabled={state.busy} onClick={() => { if (state.pending) void state.submit(state.pending) }}>
                {state.busy ? 'Checking your place…' : 'Retry your request'}
              </button>
            </div> : <form className="room-entry" onSubmit={(event) => {
              event.preventDefault()
              void state.submit({ action, body: { requestId: crypto.randomUUID(), displayName: name, ...(action === 'join' ? { inviteCode: code.trim().toUpperCase() } : {}) } })
            }}>
              <fieldset className="room-options" disabled={state.busy}>
                <legend>Your invitation</legend>
                <label><input type="radio" name="room-action" checked={action === 'create'} onChange={() => setAction('create')} />Create a room</label>
                <label><input type="radio" name="room-action" checked={action === 'join'} onChange={() => setAction('join')} />Join a room</label>
              </fieldset>
              <label htmlFor="room-name">Your display name</label>
              <input id="room-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="nickname" required maxLength={24} disabled={state.busy} aria-describedby="room-name-hint" />
              <p id="room-name-hint" className="room-note">Use a name your friends know. Each name in a room is distinct.</p>
              {action === 'join' && <>
                <label htmlFor="room-code">Invitation code</label>
                <input id="room-code" value={code} onChange={(event) => setCode(event.target.value)} required maxLength={10} pattern="[0-9a-fA-F]{10}" autoCapitalize="characters" spellCheck={false} disabled={state.busy} />
              </>}
              <button className="quiet-button" type="submit" disabled={state.busy}>{state.busy ? 'Saving your place…' : action === 'create' ? 'Create your room' : 'Join your friends'}</button>
            </form>}
            {!state.pending && state.session.rooms.length > 0 && <section className="room-return" aria-label="Your saved rooms">
              <h2>Your saved rooms</h2>
              {state.session.rooms.map((room) => <button className="text-button" key={room.id} onClick={() => state.enter(room)}>
                Return to {room.members.find((member) => member.playerId === room.hostId)?.displayName}’s room · {room.inviteCode}
              </button>)}
            </section>}
          </> : <button className="quiet-button" onClick={state.retryConnection}>Try connecting again</button>}
        </>}
        {state.error && <div className="room-error"><p role="alert">{state.error}</p>
          {!state.pending && state.session && <button className="text-button" onClick={state.retryConnection}>Reconnect</button>}
        </div>}
      </div>
    </main>
    <footer className="footer"><p>Private rooms · shared Dream Weeks</p></footer>
  </div>
}
