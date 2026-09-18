import type { Player, RoundRevealView } from '../game/types'
import { getPlayerAccent } from '../data/playerAccents'
import CardGallery from './CardGallery'

export default function DreamRoundReveal({ reveal, headingLevel = 'h2', showImages = true, showRecognition = false, compact = false, roster, ranked = false }: { reveal: RoundRevealView; headingLevel?: 'h2' | 'h3'; showImages?: boolean; showRecognition?: boolean; compact?: boolean; roster?: readonly Player[]; ranked?: boolean }) {
  const Heading = headingLevel
  const correctReceived = reveal.receivedGuesses.filter((guess) => guess.correct).length
  return (
    <div className={`round-results${compact ? ' round-results-summary' : ''}`}>
      {reveal.missed && <p className="missed-day-note">You missed this day. 0 total points. Unfinished guesses did not earn points for anyone.</p>}
      {reveal.guesses.map(({ player, chosen, actual, correct, clue }) => (
        <section className="friend-result" key={player.id} aria-label={`${player.name}'s result`}>
          <Heading><span className="player-name" data-player-accent={getPlayerAccent(player.id, roster)}>{player.name}</span></Heading>
          {clue && <p className="clue-text result-clue">“{clue}”</p>}
          <p className="result-message">{correct ? 'You remembered.' : 'The dream escaped you.'} <span>{ranked ? 'No guessing points in this mode.' : correct && !reveal.missed ? '+1 point' : '0 points'}</span></p>
          {showImages && <div className="reveal-pair">
            <figure><figcaption>Your guess</figcaption><CardGallery cards={[chosen]} label={`Your guess for ${player.name}`} imageLoading="lazy" /></figure>
            <figure><figcaption>Their Dream</figcaption><CardGallery cards={[actual]} label={`${player.name}'s actual Dream`} imageLoading="lazy" /></figure>
          </div>}
        </section>
      ))}
      {reveal.unanswered?.map(({ player, actual, clue }) => <section className="friend-result" key={player.id}>
        <Heading><span className="player-name" data-player-accent={getPlayerAccent(player.id, roster)}>{player.name}</span></Heading>
        {clue && <p className="clue-text result-clue">“{clue}”</p>}
        <p className="result-message">No guess remembered. <span>0 points</span></p>
        {showImages && <CardGallery cards={[actual]} label={`${player.name}'s actual Dream`} imageLoading="lazy" />}
      </section>)}
      {(reveal.receivedGuesses.length > 0 || ranked) && <section className="received-guesses" aria-label="Friends' guesses about your Dream">
        {showImages && <Heading>Your Dream through their eyes</Heading>}
        <p className="result-message">{reveal.receivedGuesses.map(({ player, correct }) => (
          <span key={player.id}><span className="player-name" data-player-accent={getPlayerAccent(player.id, roster)}>{player.name}</span> {correct ? 'recognized your Dream.' : 'chose another dream.'}{' '}</span>
        ))}</p>
        {showRecognition && <p className="recognition-score">
          {reveal.missed ? 'A missed day earns no recognition points.' : ranked ? `${correctReceived} correct ${correctReceived === 1 ? 'guess' : 'guesses'} for your Dream. Ranked award: ${reveal.recognitionPoints} ${reveal.recognitionPoints === 1 ? 'point' : 'points'}.` : reveal.recognitionPoints > 0 ? `+${reveal.recognitionPoints} ${reveal.recognitionPoints === 1 ? 'point' : 'points'} for your Dream.` :
            reveal.receivedGuesses.every((guess) => guess.correct) ? `${reveal.missed !== undefined ? 'Everyone who finished' : 'Everyone'} recognized your Dream. 0 recognition points.` : 'No one recognized your Dream. 0 recognition points.'}
        </p>}
        {showImages && <div className="reveal-pair">
          {reveal.receivedGuesses.map(({ player, chosen }) => (
            <figure key={player.id}><figcaption>{player.name}’s guess for you</figcaption><CardGallery cards={[chosen]} label={`${player.name}'s guess for your Dream`} imageLoading="lazy" /></figure>
          ))}
        </div>}
      </section>}
    </div>
  )
}
