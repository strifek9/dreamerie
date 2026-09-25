import { GAME_CONFIG, type ConfirmedGuess } from '../game/dailyRecall'

export function MemoryFragments({ guesses }: { guesses: readonly ConfirmedGuess[] }) {
  return <ol className="v3-fragments" aria-label="Your five guesses">
    {Array.from({ length: GAME_CONFIG.maxGuesses }, (_, i) => {
      const guess = guesses[i]
      return <li key={i} className={guess ? `fragment-used ${guess.correct ? 'fragment-found' : 'fragment-missed'}` : ''}
        aria-label={`Guess ${i + 1}: ${guess ? guess.correct ? 'correct' : 'incorrect' : 'remaining'}`}>
        <span aria-hidden="true">{guess ? guess.correct ? '✓' : '×' : '·'}</span>
      </li>
    })}
  </ol>
}
