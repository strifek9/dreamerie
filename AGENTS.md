# Working on DREAMERIE

## Read first

Read [GAME_DESIGN.md](docs/GAME_DESIGN.md) and [PROTOTYPE_PLAN.md](docs/PROTOTYPE_PLAN.md) before modifying gameplay. Read [ART_DIRECTION.md](docs/ART_DIRECTION.md) before changing presentation or copy. Inspect existing work and preserve unrelated changes.

The initial task is documentation only: do not bootstrap or implement the application during that task. Future implementation should follow the milestone requested by the user.

## Rules and scope

- Do not invent gameplay rules. Keep confirmed rules, prototype assumptions, unresolved questions, and future ideas distinct.
- Flag unclear rules instead of silently deciding. Explain the implementation impact and continue independent work where possible; seek clarification if affected behavior cannot follow a documented prototype assumption.
- Update documentation when a confirmed rule changes. User-approved changes take precedence; update affected assumptions and completion criteria too.
- Do not implement future features unless explicitly requested.
- Do not introduce backend infrastructure during Prototype 0.1 unless explicitly requested.
- Do not introduce Discord dependencies or Discord-specific code during Prototype 0.1.
- Dreamerie must remain standalone. Its accounts, groups, cards, Dream Weeks, scores, and player data belong to Dreamerie.

## Implementation

- Keep dealing, Dream selection, replacement, decoys, assignment locking, and scoring separate from React presentation; do not put the whole game in `App.tsx`.
- Keep platform-specific integrations out of core game models and rules.
- Prefer simple functions and explicit state over premature abstractions.
- Keep React components reasonably small and focused.
- Maintain TypeScript type safety; avoid unchecked casts or untyped state that bypass invariants.
- Add dependencies only when they provide clear value to the current milestone.
- Keep the prototype easy to run locally; document actual commands when tooling exists.
- Verify the milestone's completion criteria. Use meaningful tests for rule invariants and invalid actions rather than tests that merely mirror implementation.

## Experience and handoff

- Design mobile-first and progressively enhance for larger screens.
- Primary interactions must work by tapping and without hover. Support keyboard use, visible focus, and clear selection/locked states.
- Artwork remains the visual focus; avoid tiny controls and dense dashboards.
- Preserve short, understandable Dreamerie language. Do not replace immersive prompts with generic software text; essential errors must still be clear.
- Prioritize gameplay over animation; respect reduced-motion preferences.
- Report changes, checks, and limitations. Keep the README accurate about what actually runs, and record open questions instead of turning assumptions into permanent rules.
