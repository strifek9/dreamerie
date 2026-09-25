# Working on DREAMERIE

## V3 dream ritual — current development

Publication update: V3 `cb15010` is live on `dreamerie-playtest.onrender.com` after explicit approval. See docs/HOSTING.md. The service is still configured to main, so future approved V3 deployments must select the exact V3 commit; do not deploy latest main accidentally. V2 remains unchanged. Earlier local/not-yet-published instructions below describe the pre-release milestone; do not publish further changes automatically.

The user approved trying the first design-review package as Version 3: bespoke vector crescent-D/wandering-star identity, five explicit guess fragments, clearer miss/repeat feedback, kind score-aware results, and optional paired close-up answer inspection after completion only. No postcard/journal yet. V3 is developed on `prototype/v3-dream-ritual`, based on V2 `561a064`; V2 remains preserved on `prototype/v2-landscape` and V1 on `prototype/version-1` / main (`4952a01`).

Planned publication destination is the existing V1 site `dreamerie-playtest.onrender.com`, replacing its frontend, NOT the V2 static playtest site. This overrides older V2-only destination instructions. Do not deploy, change Render settings, remove disks/data, or alter hosting plans during this local milestone; wait for explicit publication approval. No automatic commit/push.

Keep the same catalogue, geometry, five-confirmation rules, accuracy/time ranking, no-pause deadline and V2 collection storage namespace. A visual version bump must not reset an existing collection attempt. V1 storage is separate and must not be cleared or interpreted as a landscape attempt. Storage is origin-specific; V2-site progress cannot automatically follow to the V1 URL. V3 entry/UI live in `src/v3/`, sharing V2 artwork/compositor/styles and the existing game engine. Previous full V2 UI is retained in its branch, not duplicated. Production does not expose V1 via query parameters; dev comparison remains available.

Paired answer crops must use identical native-image coordinates and the actual five-region compositor (including correction sources), never the raw altered-source image. All 600 regions must fit their crops. Dialog opens only after results, traps focus, closes with X/Escape and returns focus without scrolling; selection must not modify guesses or scoring. Small decorative motion respects reduced motion. Keep artwork dimensions stable through completion and scrolling. Run all tests/typecheck/build plus affected mobile/desktop UI checks before handoff.

## V2 daily landscape collection — current branch

Publication update: the full-stage inspection and transparent landing-button refinement below is live as `9973755`, following explicit commit/push/deploy approval. Current automated suite: 41 tests. See docs/HOSTING.md for verification. Earlier “not yet published” wording is historical; do not redeploy automatically.

Latest local refinement (not yet published): the Start/Continue/View result container is transparent, with no separate dark-blue panel. All V2 enlarged viewers use the full available inspection area rather than clipping zoom to the original fitted painting rectangle. At 100% the entire painting is fitted; zoomed artwork can grow into the surrounding space. Empty letterbox taps do not place guesses. Pan/zoom anchors, markers and hit detection remain artwork-relative; short landscape viewers keep controls in an adjacent rail, outside the artwork. Resize updates fitted dimensions and pan limits without changing guesses or the deadline. V1 callers retain the existing default viewer geometry. This supersedes the earlier preview-only landscape sizing instructions.

Publication update: the latest poem/copy/landscape-preview revision below is now live as `0b3680f`, following explicit approval. See docs/HOSTING.md for verification. Its “not yet published” wording is historical; do not redeploy automatically.

Latest local revision (not yet published): use “Can you spot the differences between the dream and the memory?” and “The dream is fading...”. Daily quoted poems stay short, use clear end-rhymes, and suggest a shifting or unreliable dream without revealing answer locations. There is no strict sentence-count limit; the current set uses two brief lines per artwork. In short landscape viewports, the landing image viewer gives the uncropped painting nearly the full available height, with the title/hint in a slim side rail and the 44px close control beside the artwork. Portrait preview and gameplay/result viewers retain their existing layout. Rotation and click-to-zoom do not reset or pause a running attempt. These directions supersede older copy and two-sentence restrictions below.

Publication update: the refinement below is now live on V2 as `a38350e`, following explicit commit/push/deploy approval on September 25, 2026. The quoted daily poems contain at most two sentences. All 39 tests, typecheck, build and collection validation passed; see `docs/HOSTING.md` for release verification. Earlier “not yet published” wording below records the pre-release milestone.

Local refinement (not yet published): hold either painting for 450ms or use its quiet 44px-target expand icon beside the caption, outside the artwork, to open fitted full-screen inspection during play or results. In play, marking/Remember still work in the viewer and the deadline never pauses; fifth confirmation or expiry closes it. Result inspection retains found/missed overlays and Hide markers, and Fit on the comparison page restores scrolling. Keep both paintings stacked; on sufficiently wide, short screens use distinct header/status/control sidebar rows, never overlapping grid cells. Other sizes retain the centered stack, and results retain the centered score/share/answer flow. The answer heading is “What was different?”. The landing instruction is “Find the differences between the Dream and the Memory.” Each of the 120 card IDs has its own original, spoiler-free rhyming couplet in src/v2/dreamVerses.ts; the verse follows the daily artwork, remains stable on reload, and repeats with the 120-card rotation. No network quote service or storage migration.

The user authorized finishing all 120 NEW landscape cards, then committing, pushing and deploying to the existing V2 Static Site. Do not publish a partial collection. This section overrides older V1/sample instructions below for V2.

Current V2 has 120 playable native-resolution landscape pairs and 600 authored answers. Preserve V1, the portrait catalogue, the teacup sample, generation provenance and all saved attempts. Sources are in `public/artwork/v2/collection/`; the typed runtime catalogue is `src/v2/landscapeCollection.ts`; final geometry/correction provenance is in `docs/artwork/V2_PLAYABLE_AUDIT.json`. Generation manifest and source review live under docs and must not be copied into public.

Daily rotation uses the local calendar (September 24, 2026 = day 1), wraps artwork after 120 days and keys saved attempts by absolute day. Do not reorder published IDs or alter scoring geometry without considering saved attempts. The collection storage namespace is separate from V1 and the retired sample; never clear them. Dev-only review/card selection/New day rounds are in-memory; production has no reset. Day remains fixed during an open round until reload.

Keep both wide paintings stacked, fitted and synchronized in zoom/pan. No image swapping, practice gate, hold requirement or pause. Start waits for current artwork. Optional ? help, Home and reload never pause the deadline. Tap only marks; Remember consumes one of exactly five total guesses. Accuracy first, whole-second time only for ties. Results show all five answers; fitted result images allow normal scrolling from either image, with explicit +/Fit for inspection.

Every pair needs five actual theme-fitting edits, not arbitrary color overlays. Only five authored source regions are composited over the untouched original, with narrow edge blending when needed. Preserve native PNG detail. Difficulty labels are estimates pending human calibration. Use the imagegen skill for new raster artwork/corrections, not programmatic painting.

Before publishing run `npm test`, `npm run typecheck`, `npm run build` and `node scripts/validateLandscapeCollection.mjs`; inspect composites and affected mobile/desktop flows. Current automated suite has 38 tests. See README and collection progress for review controls and limitations.

Only commit/push branch `prototype/v2-landscape` and deploy existing service `dreamerie-v2-playtest` (`srv-daqp97vlk1mc73ejvdk0`). V1 service/branches, database, plans and infrastructure stay untouched. Use Conventional Commits; no force push or history rewrite. Current explicit authorization supersedes older no-publication milestone text below.

## Historical V1 and original-prototype guidance


## Current product direction

### Daily attempt persistence and landing controls

Save the real daily attempt in browser localStorage, keyed by day: original start time, confirmed guesses and pending marker. Refresh, reopening, and a second tab must retain the same attempt and original two-minute deadline; time away still counts. Persist before accepting an action, serialize cross-tab updates with Web Locks, and fail clearly if storage is unavailable or damaged. Never silently grant a new attempt. Completed results remain available with sharing and answer inspection; remove Dream again. Clearing this site's data permits replay, and different browsers/devices remain independent; this is not server-enforced anti-cheat. Development review/New day sessions are in-memory and must not overwrite the real daily attempt.

The untimed landing viewer has click/tap zoom in/out and no guess selection or zoom toolbar. Emphasize **remember** in the instructions, keep Start visible without scrolling on narrow or short screens, label the pair **The Dream** / **The Memory**, and place the viewer X immediately above the artwork's top-right edge. These refinements supersede conflicting inspection wording below.

### Current image-inspection interaction

The landing card opens a fitted full-screen viewer on click/tap or a 450ms hold. During play a short tap still only places a pending guess; hold a card or use its visible Expand button to inspect it. Zoom/pan is available only inside the viewer, not on the comparison page. The viewer has an X/Escape close, focus containment/return, pinch/wheel and visible zoom controls, and Remember during play. Inspection never pauses or resets the timer, consumes a guess, or clears a pending selection. Expiry/final confirmation closes the viewer to reveal results. Results can be expanded with the existing marker visibility toggle. No instant version-switching/flicker control. The responsive pair stays side by side when there is room, including portrait tablets above 40rem; only narrow portrait screens stack. These rules supersede the earlier synchronized inline-zoom wording below.

Daily Dream Recall is the primary mode. Two versions of one daily surreal art card remain visible for two minutes: stacked on phone portrait screens, side by side in landscape and on desktop, never swipe-swapped. The player may tap either image and zoom with touch or mouse. Only reviewed, authored image pairs enter rotation: 120 cards, card-001 through card-120. Every playable pair needs exactly five actual object-level changes that preserve its theme, brushwork, palette, and visual logic. Choose changes individually for each painting: expressions, patterns, flowers, architecture, missing details and existing-object colors. Red bows and gold details are examples, not a deck-wide formula. Do not add unrelated props or use generic discoloration/filter patches as differences. Keep generation prompts and provenance. The full answer ledger and review limitations are in `docs/ARTWORK_REVIEW.md`. The whole visible guess circle counts when it overlaps an answer region. Its radius is 4% of artwork width on every device and scales with zoom. Nearest-region priority favors center hits, then smaller nested regions; include found regions when choosing so repeats cannot fall through to score another answer. The player receives exactly five confirmed guesses total. A pointer action only places or repositions a pending marker; only **Remember** submits and consumes a guess. Accuracy out of five is primary, and whole-second elapsed time breaks accuracy ties. Results reveal found differences in green on the original image (top/left) and missed differences in red on the changed image (bottom/right), with numbered outlines that gently fade fully out and back in (static with reduced motion), plus a Hide markers control with written Found/Missed explanations, keep zoom available, and support a spoiler-free Wordle-style text share.

A development-only New day control advances the catalogue and displayed day, resetting the round to the rules screen; it does not change the real date and is absent from production. Simulated/review shares are labeled Playtest.

Keep the current implementation deliberately small: React, TypeScript, Vite, local prototype data, and straightforward CSS. Do not add a six-card interface, dashboard, backend, authentication, Discord integration, multiplayer, hosted leaderboard, global state library, or complex infrastructure unless explicitly requested in a later task.

The former social/card-selection prototype and its pre-redesign working state are preserved on `prototype/social-dreams`. Historical sections in the documentation describe that alternate/future mode and do not override the Daily Dream Recall rules above.

For current work, read the top **Current primary mode** section in `docs/GAME_DESIGN.md`, **Current scope** in `docs/PROTOTYPE_PLAN.md`, and **Daily Dream Recall direction** in `docs/ART_DIRECTION.md`. Run `npm run typecheck`, `npm test`, and `npm run build` after implementation. Do not commit or push redesign work without explicit user approval.

## Read first

The current welcome screen previews the day's original artwork above the reverie poem, with an untimed preview and a Start action. Results have five square tiles, Share/Copy controls and a selectable message fallback. Share day/accuracy/time/grid plus the current site's clean play URL, never answer locations or URL queries/fragments. Localhost is not a public invitation; warn clearly, and do not deploy without authorization.

Read [README.md](README.md) for project context. Treat [GAME_DESIGN.md](docs/GAME_DESIGN.md) as the source of truth for confirmed gameplay rules and [PROTOTYPE_PLAN.md](docs/PROTOTYPE_PLAN.md) as the source of truth for prototype scope and milestones. Read both before modifying gameplay. Read [ART_DIRECTION.md](docs/ART_DIRECTION.md) before making UI or writing decisions. Inspect existing work and preserve unrelated changes.

The initial task is documentation only: do not bootstrap or implement the application during that task. Future implementation should follow the milestone requested by the user.

## Rules and scope

- Do not invent gameplay rules. Keep confirmed rules, prototype assumptions, unresolved questions, and future ideas distinct.
- Follow documented prototype assumptions only within their stated scope; do not promote them to confirmed production rules. If project documents conflict, surface the conflict and obtain clarification before implementing the affected behavior.
- Flag unclear rules instead of silently deciding. Explain the implementation impact and continue independent work where possible; seek clarification if affected behavior cannot follow a documented prototype assumption.
- Update documentation when a confirmed rule changes. User-approved changes take precedence; update affected assumptions and completion criteria too.
- Do not implement future features unless explicitly requested.
- Do not introduce backend, database, or authentication infrastructure until explicitly requested.
- Do not introduce Discord dependencies or Discord-specific code during Prototype 0.1.
- Prototype 0.1 is a local browser demonstration: Charlie is the human, Nancy and Song are simulated, and progression is manual. Do not add real multiplayer networking, production scheduling, cloud image storage, push notifications, matchmaking, monetization, or native apps. Follow the plan's exclusions unless the user explicitly changes scope.
- Dreamerie must remain standalone and platform-independent. Its accounts, groups, cards, Dream Weeks, scores, and player data belong to Dreamerie. Treat Discord only as a possible future integration, never as the foundation of the game.

## Implementation

- Use React + TypeScript + Vite for Prototype 0.1. Keep it simple and implement only the requested milestone.
- Keep dealing, Dream selection, replacement, decoys, assignment locking, and scoring separate from React presentation; do not put the whole game in `App.tsx`.
- Keep platform-specific integrations out of core game models and rules.
- Prefer simple functions and explicit state over premature abstractions.
- Keep React components reasonably small and focused.
- Maintain TypeScript type safety; avoid unchecked casts or untyped state that bypass invariants.
- Add dependencies only when they provide clear value to the current milestone.
- Keep the prototype easy to run locally; document actual commands when tooling exists.
- After implementation, run the project's build, TypeScript type checks, and tests, and verify the milestone's completion criteria. Use meaningful tests for rule invariants and invalid actions rather than tests that merely mirror implementation. Report results and any unavailable checks; do not claim checks passed when tooling does not yet exist.
- Manually exercise affected selection, guessing, and reveal flows where available. Validate rule invariants and invalid actions, including atomic replacement, unique allocations, eligible decoys, locked assignments, delayed reveal, and scoring each round once. Documentation-only changes do not require runtime checks.

## Experience and handoff

- Design mobile-first and progressively enhance for larger screens.
- Primary interactions must work by tapping and without hover. Support keyboard use, visible focus, and clear selection/locked states.
- Artwork remains the visual focus; avoid generic mobile-game styling, tiny controls, and dense dashboards.
- Keep imagery symbolic and open to multiple interpretations. The user has authorized replacing the placeholders with 120 locally stored, AI-generated illustrations. Record generation prompts and provenance; do not add a live image-generation service to the app. Use Dixit as inspiration for associative visual storytelling while creating original compositions. Follow the user's illustrated references: no photorealism, broad color variety, varied emotions (including happy, sad, funny, tender and unsettling), and some abstract or deliberately puzzling imagery. Do not impose one palette or make every card cozy. Before reveal, do not visually distinguish decoys from friends' real Dreams or expose friends' ownership/answers. The user's own Dream is the intentional exception: show it first in the six-card board, labeled and inspectable but unassignable.
- Check affected layouts at the phone widths listed in the prototype plan as well as tablet and desktop sizes. Image inspection must not commit a choice; provide visual descriptions without prescribing meaning, and do not rely solely on color for locks or correctness.
- Preserve short, understandable Dreamerie language. Do not replace immersive prompts with generic software text; essential errors must still be clear.
- Keep card positions and dimensions stable when choosing, clearing, locking, unlocking or revealing. Reserve state-label space, preserve scroll position between prompts, and keep confirmation reachable without hiding keyboard focus. Reduce unnecessary scrolling while preserving appreciable artwork.
- Prioritize gameplay over animation; respect reduced-motion preferences. Future transitions must not move or reflow the cards.
- Report changes, checks, and limitations. Keep the README accurate about what actually runs, and record open questions instead of turning assumptions into permanent rules.
- Stop after each milestone for user testing and approval. Do not begin the next milestone until the user approves proceeding.

## Git

Use Conventional Commits: `type: description` or `type(scope): description` when a scope helps explain the change.

Supported types:

- `feat:` new functionality
- `fix:` bug fixes
- `docs:` documentation
- `refactor:` code restructuring without changing behavior
- `style:` visual styling or formatting
- `test:` tests
- `chore:` maintenance and tooling
- `perf:` performance improvements

Examples:

```text
feat(dreams): add weekly dream selection
feat(cards): draw replacement card after selection
fix(cards): prevent duplicate cards
docs(game): clarify dream week rules
style(dreams): improve mobile card layout
```

- Do not commit automatically. Wait for the user to test and approve changes before committing; create a commit only when explicitly authorized.
- Do not push automatically. Push only when explicitly authorized.
- Do not force push.
- Do not rewrite Git history.
- After completing work, suggest an appropriate Conventional Commit message and stop for user review.
- Include terminal commands for staging the intended files, committing with that message, and pushing so the user can run them after testing and approval. Providing commands does not authorize running them automatically.

## Model recommendations

At milestone boundaries, flag when a stronger coding/reasoning model could materially help, using the checkpoints in [PROTOTYPE_PLAN.md](docs/PROTOTYPE_PLAN.md). Recommend the switch before beginning affected work, especially before decoy selection and the guessing/scoring state transitions. Explain the concrete benefit, verify current official model guidance when making product claims, and leave model selection to the user. Do not expand scope or change models automatically.
