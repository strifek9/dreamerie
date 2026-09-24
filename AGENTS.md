# Working on DREAMERIE

## Version 2 landscape experiment — current branch

User-approved V2 work is isolated on `prototype/v2-landscape`; V1 is preserved at local branch `prototype/version-1` (`4952a01`). The public V1 release remains unchanged. This experiment overrides conflicting V1 layout/inspection instructions below only for V2. Keep V1 components and all 120 original pairs intact.

V2 starts with ONE new wide painting in the style of the existing cards, not a conversion of the catalogue. Preserve original-resolution PNGs and generation provenance. Show the pair stacked at every size, fit both within the playing viewport, and synchronize pan/zoom. On very short landscape screens controls sit beside the stacked pair. Teach tap → pending circle → Remember with one untimed example before Start. Exactly five total guesses, two minutes, accuracy then whole-second time, no pauses. Home and inspection never pause; retain the original deadline through reload/backgrounding. V2 uses an independent storage namespace. A dev-only New playtest creates an in-memory test run; no production reset.

Do not commit, push, deploy, or expand to more cards until user review. Follow the existing validation and handoff requirements below.


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
