import { useReducer, useState } from 'react'
import DreamSelectionComplete from './components/DreamSelectionComplete'
import DreamWeekIntroduction from './components/DreamWeekIntroduction'
import DreamSelection from './components/DreamSelection'
import { cards } from './data/cards'
import { concepts } from './data/concepts'
import { CURRENT_PLAYER_ID, players } from './data/players'
import { createDreamWeek, getWeekIntroduction } from './game/week'
import { chooseDream, getNextDreamConcept } from './game/selection'
import type { CardId, ConceptId, DreamWeek } from './game/types'

interface LocalGame {
  week: DreamWeek
  error: string | null
  remembered: string | null
}

function commitChoice(state: LocalGame, action: { conceptId: ConceptId; cardId: CardId }): LocalGame {
  try {
    const week = chooseDream(state.week, CURRENT_PLAYER_ID, action.conceptId, action.cardId)
    const remembered = state.week.concepts.find((concept) => concept.id === action.conceptId)?.label ?? null
    return { week, error: null, remembered }
  } catch (error) {
    return { ...state, error: error instanceof Error ? error.message : 'Your choice could not be remembered.' }
  }
}

export default function App() {
  const [game, commit] = useReducer(commitChoice, undefined, () => ({
    week: createDreamWeek('week-prototype', concepts, cards, players),
    error: null,
    remembered: null,
  }))
  const { week } = game
  const [screen, setScreen] = useState<'beginning' | 'week'>('beginning')
  const currentConcept = getNextDreamConcept(week, CURRENT_PLAYER_ID)
  const handIds = week.allocation.hands.get(CURRENT_PLAYER_ID)
  const hand = handIds?.map((id) => {
    const card = cards.find((entry) => entry.id === id)
    if (!card) throw new Error(`Missing artwork metadata for ${id}.`)
    return card
  })
  if (!hand) throw new Error('Charlie has not received a hand.')
  return (
    <div className="dreamerie-shell">
      <header className="masthead">
        <p className="wordmark">Dreamerie</p>
      </header>

      {screen === 'week' ? (
        <DreamWeekIntroduction
          introduction={getWeekIntroduction(week)}
          onReturn={() => setScreen('beginning')}
        >
        {currentConcept ? (
        <DreamSelection
          concept={currentConcept}
          hand={hand}
          error={game.error}
          remembered={game.remembered}
          onChoose={(cardId) => commit({ conceptId: currentConcept.id, cardId })}
        />
        ) : (
          <DreamSelectionComplete remainingHand={hand} />
        )}
        </DreamWeekIntroduction>
      ) : (
      <main className="introduction">
        <div className="night-mark" aria-hidden="true">
          <span className="moon" />
          <span className="star star-one" />
          <span className="star star-two" />
          <span className="star star-three" />
        </div>
        <p className="eyebrow">A quiet place for shared dreams</p>
        <h1>A new Dreamerie begins.</h1>
        <p className="invitation">
          How well do you understand the way your friends see the world?
        </p>
        <div className="closing-note">
          <span className="divider" aria-hidden="true" />
          <p>The first dreams are still taking shape.</p>
        </div>
        <button className="quiet-button enter-week" onClick={() => setScreen('week')}>
          Enter your Dream Week
        </button>
      </main>
      )}

      <footer className="footer">
        <p>Local prototype · 0.1</p>
      </footer>
    </div>
  )
}
