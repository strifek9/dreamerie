# Working on DREAMERIE

## Read first

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
- Keep imagery symbolic and open to multiple interpretations; develop Dreamerie's own identity rather than copying an existing commercial game's exact style. Use local placeholder artwork in Prototype 0.1, record its provenance and permitted use, and do not generate AI artwork. Do not visually distinguish decoys from real Dreams or expose ownership/answers before reveal.
- Check affected layouts at the phone widths listed in the prototype plan as well as tablet and desktop sizes. Image inspection must not commit a choice; provide visual descriptions without prescribing meaning, and do not rely solely on color for locks or correctness.
- Preserve short, understandable Dreamerie language. Do not replace immersive prompts with generic software text; essential errors must still be clear.
- Prioritize gameplay over animation; respect reduced-motion preferences.
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
