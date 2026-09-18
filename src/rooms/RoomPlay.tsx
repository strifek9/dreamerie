import { useEffect, useRef, useState } from 'react'
import type { GameAction } from '../../shared/game'
import type { RoomView } from '../../shared/rooms'
import { playerId } from '../../shared/parse'
import { RoomModeDescription } from './RoomModeChoice'
import { playerAccents } from '../data/playerAccents'
import DreamSelection from '../components/DreamSelection'
import DreamGuessingBoard from '../components/DreamGuessingBoard'
import ScoringHelp from '../components/ScoringHelp'
import RoomLobby from './RoomLobby'
import RoomHistory from './RoomHistory'
import RoomDeadline from './RoomDeadline'
import RoomEnded from './RoomEnded'
import RoomRetention from './RoomRetention'
import RoomClose from './RoomClose'
import { useRoomCommands } from './useRoomCommands'

export default function RoomPlay({ room, csrf, accept, connection }: { room: RoomView; csrf: string; accept: (room: RoomView) => void; connection: string }) {
  const commands = useRoomCommands(room, csrf, accept)
  const game = room.game
  const personal = room.mode === 'personal'
  const host = room.selfId === room.hostId
  const roster = room.members.map((member) => ({ id: playerId(member.playerId), name: member.displayName }))
  const self = roster.find((player) => player.id === room.selfId)
  const [confirm, setConfirm] = useState<{ action: GameAction; names: string[]; revision: number }>()
  const [prepareLater, setPrepareLater] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const cancel = useRef<HTMLButtonElement>(null)
  const advanceButton = useRef<HTMLButtonElement>(null)
  useEffect(() => { if (confirm && dialog.current && !dialog.current.open) { dialog.current.showModal(); cancel.current?.focus() } }, [confirm])
  useEffect(() => { setPrepareLater(false) }, [game?.roundId])
  const blocked = commands.blocked || !!connection
  const nextAction: GameAction = room.phase === 'lobby' ? { type: 'start' } : room.phase === 'preparation' ? { type: 'open-day' }
    : room.phase === 'guessing' ? { type: 'reveal' } : { type: 'advance' }
  const label = room.phase === 'lobby' ? 'Start Dream Week' : room.phase === 'preparation' ? 'Open Day 2'
    : room.phase === 'guessing' ? 'Reveal dreams' : game?.day === 7 ? 'Finish week' : 'Next day'
  function progress() {
    const missing = room.phase === 'guessing' ? game?.unfinishedPlayerIds ?? []
      : room.phase === 'preparation' || (room.phase === 'revealed' && game?.day !== 7) ? game?.preparingPlayerIds ?? [] : []
    if (missing.length && (nextAction.type === 'open-day' || nextAction.type === 'reveal' || nextAction.type === 'advance')) setConfirm({ action: { ...nextAction, confirmMissing: missing }, revision: room.revision,
      names: room.members.filter((member) => missing.includes(playerId(member.playerId))).map((member) => member.displayName) })
    else commands.act(nextAction)
  }
  const showPreparation = !!game && (room.phase === 'preparation' || (room.phase !== 'complete' && (!game.board || prepareLater)))
  const active = room.phase !== 'closed' && room.phase !== 'expired' && room.phase !== 'complete'
  const invitation = `${window.location.origin}/?play=rooms&invite=${room.inviteCode}`
  return <div className="dreamerie-shell shared-room">
    <header className="masthead">
      <div className="masthead-start"><ScoringHelp personal={personal} ranked={!personal} online playerCount={roster.length} /><p className="wordmark"><span aria-hidden="true">☾</span> Dreamerie</p></div>
      <aside className="dev-day-controls room-day-controls" aria-label="Shared Dream Week controls">
        <span>{self?.name} · {room.phase === 'closed' ? 'Room closed' : room.phase === 'expired' ? 'Room expired' : game ? room.phase === 'complete' ? 'Week complete' : `Day ${game.day}` : 'Waiting room'}</span>
        {host && active && <button ref={advanceButton} className="quiet-button room-progress" disabled={blocked || room.members.length < 2} onClick={progress}>{label}</button>}
        {!host && active && <span>{roster.find((player) => player.id === room.hostId)?.name} is your host</span>}
      </aside>
    </header>
    <RoomDeadline room={room} />
    <RoomRetention room={room} />
    <div className="room-sync" role="status">{connection || (commands.busy ? 'Saving your choice…' : commands.pending ? 'Your last choice needs confirmation.' : '')}</div>
    {commands.error && <p className="room-error" role="alert">{commands.error}</p>}
    {commands.pending && !commands.busy && <div className="room-retry"><button className="quiet-button" onClick={commands.retry}>Check your last choice</button></div>}
    {room.phase === 'closed' || room.phase === 'expired' ? <RoomEnded room={room} /> : !game ? <main className="introduction room-page">
      <div className="welcome-art" aria-hidden="true"><img src="/artwork/dreamerie-moonlight.jpg" alt="" width="1122" height="1402" /></div>
      <div className="room-content"><RoomLobby room={room} connection={connection} />
        {room.phase === 'lobby' && <RoomModeDescription mode={room.mode} />}
        {room.phase === 'lobby' && <p className="room-note">{host ? 'When your friends have joined, start the Dream Week above.' : 'Your host will start the Dream Week when you are ready.'}</p>}
      </div>
    </main> : <>
      <details className="room-player-details"><summary>{room.members.length} dreamers{room.phase === 'preparation' || room.phase === 'guessing' ? ` · ${game.readiness.filter((status) => status.ready).length} ready` : ''} · View players</summary>
      <div className="room-status-strip" aria-label="Players in your room">
        {room.members.map((member) => <span key={member.playerId} data-player-accent={playerAccents[member.accentSlot]}>
          <span className="player-name">{member.displayName}{member.playerId === room.selfId ? ' (you)' : ''}</span>
          {room.phase === 'preparation' || room.phase === 'guessing' ? ` · ${game.readiness.find((status) => status.playerId === member.playerId)?.ready ? 'Ready' : 'Not ready'}` : ''}
        </span>)}
      </div>
      </details>
      {game.waitingForNextDay && active && <p className="room-shared-note">You joined after this day opened. Prepare your remaining Dreams; you’ll begin guessing next day.</p>}
      {!game.waitingForNextDay && room.phase === 'guessing' && !game.canGuess && <p className="room-shared-note">You had no Dream prepared for this day, so it will score 0. You can still prepare your later Dreams.</p>}
      {room.phase === 'revealed' && !game.board && game.reveal?.missed && <p className="room-shared-note">This day is closed. You missed it and received 0 points. Your results are below; you can still prepare later Dreams.</p>}
      {game.board && game.preparation.next && active && <button className="room-prepare-toggle text-button" onClick={() => setPrepareLater(!prepareLater)}>
        {prepareLater ? 'Return to this day’s dream cards' : 'Prepare your remaining Dreams'}
      </button>}
      {room.phase === 'complete' ? <main className="gallery-page"><RoomHistory days={game.history} roster={roster} complete total={game.totalScore} ranked={!personal} /></main>
        : showPreparation ? <main className="gallery-page week-preparation">
          <div className="preparation-summary"><p className="saved-dream" role="status">{game.preparation.saved.length > 0 ? personal ? '✓ Your dream clue and dream card are remembered.' : '✓ Your dream card is remembered.' : '\u00a0'}</p>
            <p className="eyebrow">{personal ? 'Your own dream clues' : 'Word of the Day'} · {game.preparation.saved.length} of 6 Dreams remembered</p>
            {game.preparation.next && <p className="gallery-note room-preparation-guide">{game.day === 1
              ? personal ? 'Prepare six clues and cards today, one at a time. From Day 2, your friends will guess one of your Dreams each day.' : 'Choose one card for each of the six words today. From Day 2, everyone guesses the same word each day. The order is a surprise.'
              : 'Choose cards for your remaining unopened Dreams. Days already opened cannot be changed.'}</p>}
          </div>
          {game.preparation.next ? <DreamSelection concept={game.preparation.next} hand={game.preparation.hand} personal={personal} completedDreams={game.preparation.saved.length} remembered={null} error={null} busy={blocked}
            onChoose={(cardId, clue) => commands.act({ type: 'save', conceptId: game.preparation.next!.id, cardId, ...(personal ? { clue } : {}) })} />
            : <section className="gallery-heading"><h1>Your Dreams are remembered.</h1><p className="invitation">{host ? 'Open the next day early when you’re ready.' : 'The next day opens at the time above, or when your host advances.'}</p></section>}
          {room.phase === 'revealed' && game.reveal && <RoomHistory days={game.history.filter((day) => day.day === game.day)} roster={roster} total={game.totalScore} ranked={!personal} />}
        </main> : game.board ? <DreamGuessingBoard board={{ ...game.board, locks: new Map(game.board.locks) }} roster={roster} selfId={playerId(room.selfId)} personal={personal} ranked={!personal}
          totalScore={game.totalScore} maxScore={personal ? 6 * (2 * roster.length - 3) : 18} reveal={game.reveal} busy={blocked} error={null}
          onAssign={(playerId, cardId) => commands.act({ type: 'lock', playerId, cardId })}
          onUnlock={room.phase === 'guessing' ? (cardId) => commands.act({ type: 'unlock', cardId }) : undefined} />
          : <main className="gallery-page"><RoomHistory days={game.history} roster={roster} total={game.totalScore} ranked={!personal} /></main>}
      {room.phase !== 'complete' && game.history.length > 0 && <details className="room-past"><summary>Earlier Dreams · your week: {game.totalScore} points</summary><RoomHistory days={game.history} roster={roster} total={game.totalScore} ranked={!personal} /></details>}
      {active && game.day < 7 && <details className="room-invite"><summary>Invite a friend</summary><p>Late joiners begin guessing on the next unopened day.</p><label htmlFor="active-invitation">Share this invitation</label><input id="active-invitation" readOnly value={invitation} onFocus={(event) => event.target.select()} /></details>}
    </>}
    {host && active && <RoomClose room={room} blocked={blocked} onClose={() => commands.act({ type: 'close', confirmed: true })} />}
    <footer className="footer"><p>{active ? 'Shared room · days turn at midnight, Chicago time' : 'A shared Dream Week'}</p></footer>
    {active && <dialog className="scoring-help-dialog" ref={dialog} aria-labelledby="missing-title" onClose={() => { setConfirm(undefined); advanceButton.current?.focus({ preventScroll: true }) }}>
      <h2 id="missing-title">Some Dreams are unfinished.</h2>
      <p>{confirm?.names.join(', ')}</p>
      <p>{room.phase === 'guessing' ? 'These players will receive 0 total points for this day. Their unfinished guesses will not earn points for anyone. Prepared Dreams stay on the board.'
        : 'These players still have Dreams to prepare. Anyone missing the next day’s Dream will receive 0 points for that day; an anonymous dream card fills their place.'}</p>
      {confirm && confirm.revision !== room.revision && <p role="status">The room changed. Return and review the players before continuing.</p>}
      <button ref={cancel} className="quiet-button" onClick={() => dialog.current?.close()}>Keep waiting</button>
      <button className="text-button confirm-early" disabled={blocked || confirm?.revision !== room.revision} onClick={() => {
        if (confirm) commands.act(confirm.action)
        dialog.current?.close()
      }}>Continue and close this day’s choices</button>
    </dialog>}
  </div>
}
