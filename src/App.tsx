import { useReducer, useState } from 'react'
import DreamSelectionComplete from './components/DreamSelectionComplete'
import DreamWeekIntroduction from './components/DreamWeekIntroduction'
import DreamSelection from './components/DreamSelection'
import DreamGuessingBoard from './components/DreamGuessingBoard'
import DreamWeekComplete from './components/DreamWeekComplete'
import { cards } from './data/cards'
import { concepts } from './data/concepts'
import { CURRENT_PLAYER_ID, players } from './data/players'
import { createDreamWeek, getWeekIntroduction } from './game/week'
import { getNextDreamConcept } from './game/selection'
import { prepareSimulatedDreams } from './game/simulation'
import { getGuessingBoardView } from './game/board'
import { createLocalGame, getLocalDay, localGameReducer, prepareGuessingAction } from './game/localGame'
import { getRoundRevealView, getTotalScore } from './game/scoring'
import { getWeekRecap } from './game/recap'

function freshWeek() {
  return prepareSimulatedDreams(createDreamWeek(`week-${crypto.randomUUID()}`, concepts, cards, players), CURRENT_PLAYER_ID)
}

export default function App() {
  const [game, commit] = useReducer(localGameReducer, undefined, () => createLocalGame(freshWeek(), CURRENT_PLAYER_ID))
  const { week } = game
  const day = getLocalDay(game)
  const totalScore = getTotalScore(game.results)
  const revealedResult = game.phase === 'revealed' ? game.results.find((result) => result.roundId === game.round.id) : undefined
  const [screen, setScreen] = useState<'beginning' | 'week'>('beginning')
  const currentConcept = getNextDreamConcept(week, CURRENT_PLAYER_ID)
  const handIds = week.allocation.hands.get(CURRENT_PLAYER_ID)
  const hand = handIds?.map((id) => {
    const card = cards.find((entry) => entry.id === id)
    if (!card) throw new Error(`Missing artwork metadata for ${id}.`)
    return card
  })
  if (!hand) throw new Error('Charlie has not received a hand.')
  function beginGuessing() {
    try {
      if (game.phase === 'revealed' && day === 7) commit({ type: 'finish-week', roundId: game.round.id })
      else commit(prepareGuessingAction(game))
      setScreen('week')
    } catch (error) {
      commit({ type: 'error', message: error instanceof Error ? error.message : 'This dream could not be opened.' })
    }
  }
  function restartWeek() {
    if (game.phase !== 'complete') return
    commit({ type: 'restart', sourceWeek: game.week, week: freshWeek() })
    setScreen('week')
  }
  return (
    <div className="dreamerie-shell">
      <header className="masthead">
        <p className="wordmark"><span aria-hidden="true">☾</span> Dreamerie</p>
        <aside className="dev-day-controls" aria-label="Development day controls">
          <span>Dev · {game.phase === 'complete' ? 'Week complete' : `Day ${day}`}</span>
          {game.phase !== 'complete' && (
            <button className="quiet-button next-day"
              disabled={game.phase === 'preparation' ? !game.firstRound : game.phase !== 'revealed'} onClick={beginGuessing}>
              {day === 7 ? 'Finish week' : 'Next day →'}
            </button>
          )}
        </aside>
      </header>

      {screen === 'week' ? (
        game.phase === 'complete' ? <DreamWeekComplete score={totalScore}
          recap={getWeekRecap(week, game.results, CURRENT_PLAYER_ID, cards, players)} onRestart={restartWeek} /> : game.phase !== 'preparation' ? (
          <DreamGuessingBoard
            board={getGuessingBoardView(week, game.round, cards, players)}
            onUnlock={game.phase === 'guessing' || game.phase === 'ready-for-reveal'
              ? (cardId) => commit({ type: 'unassign', roundId: game.round.id, cardId }) : undefined}
            error={game.error}
            onAssign={(playerId, cardId) => commit({ type: 'assign', roundId: game.round.id, playerId, cardId })}
            onReveal={game.phase === 'ready-for-reveal' ? () => commit({ type: 'reveal', roundId: game.round.id }) : undefined}
            reveal={revealedResult ? getRoundRevealView(revealedResult, cards, players) : undefined}
            totalScore={totalScore}
          />
        ) : (
        <DreamWeekIntroduction
          introduction={getWeekIntroduction(week)}
        >
        {currentConcept ? (
        <DreamSelection
          concept={currentConcept}
          hand={hand}
          error={game.error}
          remembered={game.remembered}
          onChoose={(cardId) => commit({ type: 'choose', conceptId: currentConcept.id, cardId })}
        />
        ) : (
          <DreamSelectionComplete
            remainingHand={hand}
            error={game.error}
          />
        )}
        </DreamWeekIntroduction>
        )
      ) : (
      <main className="introduction">
        <div className="welcome-art" aria-hidden="true">
          <img src="/artwork/dreamerie-moonlight.jpg" alt="" width="1122" height="1402" />
        </div>
        <div className="welcome-copy">
        <p className="eyebrow">A quiet place for shared dreams</p>
        <h1>A new Dreamerie begins.</h1>
        <p className="invitation">
          How well do you understand the way your friends see the world?
        </p>
        <div className="closing-note">
          <span className="divider" aria-hidden="true" />
          <p>Six dreams. A different world in every mind.</p>
        </div>
        <button className="quiet-button enter-week" onClick={() => setScreen('week')}>
          Enter your Dream Week
        </button>
        </div>
      </main>
      )}

      <footer className="footer">
        <p>Local prototype · 0.1</p>
      </footer>
    </div>
  )
}
