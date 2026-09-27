import type { PlayStats as Stats } from '../game/playStats'

export function PlayStats({ stats }: { stats: Stats | null }) {
  if (!stats) return <p className="v3-stats-note">Play history is unavailable in this browser.</p>
  return <div className="v3-play-history">
    <dl className="v3-play-stats" aria-label="Your play history">
      <div><dt>Day streak</dt><dd>{stats.current}</dd></div>
      <div><dt>Best streak</dt><dd>{stats.best}</dd></div>
      <div><dt>Dreams played</dt><dd>{stats.played}</dd></div>
    </dl>
    <p className="v3-stats-note">Every finished dream counts. Saved in this browser.</p>
  </div>
}
