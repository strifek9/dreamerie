# Bounded launch-readiness pass — local candidate

Baseline: restored live release `0e42efc364f3ae79bc8bb285484d28683689dd1d`. User authorized continued launch-readiness work; this candidate is local only and needs separate publication approval. Branch: `fix/launch-daily-continuity`.

## Confirmed findings and fixes

1. **Daily return was stuck on the previous date.** Reproduced in a disposable production-preview context: after advancing from October 11 to October 12 and choosing Home, the header still said Daily Dream #18 and the button offered View result. The date was captured only on initial mount. The existing Home flow now resolves the current local day and its saved card; an idle landing checks on focus/visibility and a one-minute interval. Start also checks the day before creating an attempt. Active rounds keep their original day/card/deadline, and results remain readable until Home. Date is included in the round key so repeated scheduled cards cannot reuse another day's session. There is no new button, prompt, comparison layout or visual treatment.
2. **Share text exposed the outdated internal V3 label.** Removed that label without changing score, time, outcome grid, streak or public URL. No clue labels, locations, source images or private URL parameters are shared.
3. **Perfect results said Missed · Red above an image with no misses.** That existing caption now says All found for 5/5 only. Missed · Red remains for imperfect results. This is a copy correction, not a result/layout redesign.

Only application file changed: `src/v3/VersionThree.tsx`. CSS, painting size, current/historical artwork, native delivery, clues/masks/geometry, old viewers, controls, storage schema/namespace, score ordering and five confirmed guesses are unchanged. No Cancel, simultaneous fullscreen comparison, temporal picture switching, flip, blink or overlay was added.

## Behavior verified before editing

The restored landing already stated two minutes, five guesses total, misses count and Remember to confirm. A simulated failed crop request blocked Start without creating an attempt; retry loaded the art without starting the clock. A failed active reload retained the pending marker, original start and Continue; retry did not pause/reset the round. Simulated background/foreground expiry showed 0/5 · 2:00 and focused the result. Share/copy adapters delivered a spoiler-free message, native-cancel was quiet, and denied copying focused/selected the manual fallback. These flows did not need a redesign or speculative fix.

This verifies the copy/interaction mechanics, not that unfamiliar humans understand them on their first play.

## Verification after the fixes

- All **106** unit/regression tests passed; zero failed/cancelled/skipped. Full TypeScript/production build passed; 383-card metadata validation passed. Existing large-chunk advisory remains.
- Historical validator passed 120 reviewed pairs / 240 native PNGs; existing full delivery/checksum/dimension tests passed.
- Dedicated headless Edge on Windows, local production preview port 5190 and development StrictMode port 5191, CDP 9340, disposable contexts. No production visit or real player storage/clipboard/share destination was used.
- Simulated request failure/recovery before Start and during an active saved reload; zero guesses from marker placement; original start retained; Continue/retry and expiry/result focus.
- Share/native-cancel/denied-copy adapters and selected/focused manual fallback; no answer labels/IDs/coordinates in the share message. Actual native sharing and clipboard are unrun.
- Midnight during an active round preserves its day, card, deadline and Continue. Expired previous result stays visible until Home. Home restores today's already saved result instead of granting a new round. Idle focus and accelerated interval select the next local day without starting a timer. Midnight Start without focus/interval loads today's art before a deliberate Start and creates no obsolete-day attempt.
- Daily rollover checks passed on both production preview and development StrictMode.
- Five viewport/DPR regressions: 320 × 568 / 1, 390 × 844 / 3, 844 × 390 / 2, 1440 × 900 / 1, 2560 × 1440 / 1. Painting sizes exactly match the restored baseline; 320 portrait is 224 × 126.06 CSS px. No horizontal overflow, crop/distortion/filter or native-delivery degradation observed.
- Actual simulated touches map to the original source coordinates and reach five correct confirmed guesses; cap, completed reload, answer inspection, historical saved card/pending/start and unpaused expiry inside viewer passed. Perfect caption and version-free share assertions passed. No JavaScript exceptions in successful browser runs.

Evidence: `docs/launch-continuity-20261011/` includes baseline reproduction, successful post-fix logs, screenshot samples and browser regression harnesses. Harnesses use this PC's absolute paths/CDP/local ports and controlled dates; accelerated idle interval is explicitly simulated. They are supporting local regression evidence, not portable CI or physical-phone certification.

## Remaining launch priorities / separate choices

1. **Physical iPhone Safari and Android Chrome**, including cellular cold load, gestures/orientation, actual native Share/Copy and background suspension/reopen. Simulated viewport/DPR and Date changes do not prove those behaviors.
2. **5–10 unfamiliar players across several daily cards** to assess first-time comprehension, fairness and motivation to return. Automated checks cannot establish retention or human difficulty.
3. **Owner-selected public support and privacy copy.** No contact was invented. Current facts: attempts/streaks are browser-local, site-data clearing loses them, no account/cross-device sync, optional existing production Cloudflare traffic/performance analytics, no custom guesses/scores/streak events from this integration. This pass adds no data collection and does not determine legal compliance.
4. **Measure cellular startup before optimizing.** Native artwork delivery is retained. The initial JS bundle remains approximately 1.97 MB raw / 383 KB gzip; catalogue splitting is separate scope, not a reason to change the preferred layout.
5. **Optional spoiler-free social preview:** current Open Graph title/description correctly describe the daily game, but no og:image is provided. A fixed card using the existing mark, existing palette and short daily-game text could improve shared links without showing today's artwork or solutions. Creating/approving that graphic is a separate visual choice; no new brand or artwork was invented here.

No ads, archive, subscription, migration, domain, analytics activation, credential, billing/security change, push or deployment. October 25 remains a planning reminder. Piece Together/Find Edwin and desktop Chrome untouched.
