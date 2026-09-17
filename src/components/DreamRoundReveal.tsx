import type { RoundRevealView } from '../game/types'

export default function DreamRoundReveal({ reveal, headingLevel = 'h2', showImages = true }: { reveal: RoundRevealView; headingLevel?: 'h2' | 'h3'; showImages?: boolean }) {
  const Heading = headingLevel
  return (
    <div className="round-results">
      {reveal.guesses.map(({ player, chosen, actual, correct }) => (
        <section className="friend-result" key={player.id} aria-label={`${player.name}'s result`}>
          <Heading>{player.name}</Heading>
          <p className="result-message">{correct ? 'You remembered.' : 'The dream escaped you.'} <span>{correct ? '+1 point' : '0 points'}</span></p>
          {showImages && <div className="reveal-pair">
            <figure><figcaption>Your guess</figcaption><img src={chosen.artwork} alt={chosen.description} width="320" height="400" loading="lazy" decoding="async" /></figure>
            <figure><figcaption>Their Dream</figcaption><img src={actual.artwork} alt={actual.description} width="320" height="400" loading="lazy" decoding="async" /></figure>
          </div>}
        </section>
      ))}
    </div>
  )
}
