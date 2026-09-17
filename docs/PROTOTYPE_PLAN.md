# Prototype 0.1 plan

## Starting point and scope

Inspection found one tracked minimal README, one initial commit, a clean working tree, and no application, tooling, assets, or existing architecture. This task creates documentation only. Bootstrap happens in a later implementation task.

Build a local React + TypeScript + Vite browser game, mobile-first and responsive. Demonstrate Charlie choosing six Dreams and recognizing Nancy/Song Dreams using placeholder artwork. Follow [GAME_DESIGN.md](GAME_DESIGN.md), including its explicitly labeled prototype assumptions.

No authentication, backend, PostgreSQL, cloud storage, Discord code, push notifications, matchmaking, monetization, AI artwork generation, production scheduling, real multiplayer networking, or native apps. Do not expand scope to resolve open production questions.

## Simple architecture direction

Create directories only as needed:

```text
src/
  App.tsx          # compose screens and local state
  components/      # prompts, galleries, assignment and reveal views
  game/            # types, transitions, allocation, boards, scoring
  data/            # concepts, players, placeholder card metadata
  styles/          # mobile-first layout and visual tokens
public/
  artwork/         # temporary local placeholder assets
```

Start with domain types in `game/`; a separate `types/` directory is unnecessary until there is a concrete reason. Use stable IDs for cards, players, concepts, weeks, and rounds. Card metadata needs an asset reference and useful visual description without revealing ownership or prescribing a concept.

Core state represents the week concepts and hidden round order, player hands, reserved cards, selected Dreams, seen-card sets, current round, stable board, assignments, and accumulated score. Make selection, guessing, and revealed phases explicit in types.

Use small TypeScript functions for legal transitions and checks. React renders results and dispatches actions. Keep selection/replacement atomic, reject duplicate assignments, and score each completed round once. Supply randomness for reproducible checks. Simulated players use the same rules as Charlie.

Give views only phase-appropriate data: no daily schedule in the introduction and no answer markers while guessing. A local browser necessarily contains simulated answers; these boundaries prevent accidental UI leaks, not adversarial cheating. Real multiplayer will need an authoritative service later.

In-memory local state is enough. Do not introduce repositories, service containers, platform interfaces, or a backend abstraction before they are needed. Separating rules from rendering allows future storage/network integrations to reuse them.

## Milestones

Each milestone leaves a checkable local result. Selection and replacement are one milestone because splitting their implementation into working milestones would temporarily violate the six-card hand rule.

### 1. Bootstrap and mobile shell

- **Goal:** Establish a runnable local browser project.
- **Scope:** Vite, React, TypeScript, minimal Dreamerie shell, mobile-first styles; document actual install/dev/build commands.
- **Completion:** Shell runs locally, type/build checks pass, and phone/desktop layouts have no horizontal overflow. No excluded integrations.

### 2. Fixtures and card allocation

- **Goal:** Establish reliable data and unique hands.
- **Scope:** Stable domain IDs, six concepts, three players, sufficient local placeholder cards, shared week pool, six-card dealing, exposure tracking.
- **Completion:** Each initial hand has six distinct cards with no player overlap. Exhaustion fails clearly without partial dealing. A simple gallery permits fixture inspection.

### 3. Weekly introduction and hidden order

- **Goal:** Introduce six Dreams without revealing daily order.
- **Scope:** “This week, you will dream of...” view; separate setup/display order from randomized round order.
- **Completion:** All six concepts appear once; visible order does not disclose the schedule. A reproducible rule check verifies the hidden order is a permutation.

### 4. Selection and replacement

- **Goal:** Choose a Dream while maintaining a six-card hand.
- **Scope:** Concept prompt, selectable hand, commitment, reserve chosen card, draw replacement, advance setup concept.
- **Completion:** A valid choice is recorded once, removed, and replaced by an unallocated card. Hands stay disjoint. Invalid/double actions or exhaustion leave state unchanged. Tap/keyboard actions work.

### 5. Selection completion

- **Goal:** Finish preparing the week.
- **Scope:** Repeat for six concepts; show “Your dreams are remembered.”
- **Completion:** Charlie has six distinct selected Dreams and six cards left in hand, including the final replacement. No seventh choice is possible; guessing progression is deliberate.

### 6. Simulated friends' Dreams

- **Goal:** Supply valid Nancy/Song targets.
- **Scope:** Local simulation using shared allocation/selection rules; explicit progression to the first hidden-order concept.
- **Completion:** Friends each have six selected Dreams with no shared allocations. Charlie is never a guessing target. No clock/networking needed.

### 7. Six-card guessing board

- **Goal:** Create a stable, eligible board for one concept.
- **Scope:** Nancy/Song actual Dreams, four fresh eligible decoys, shuffle, exposure updates.
- **Completion:** Six distinct images include both targets and no Charlie Dream or answer styling. Decoys were unseen by Charlie. Rerendering does not regenerate the board. Insufficient candidates fail without weakening eligibility.

### 8. Assignment locking

- **Goal:** Associate different images with Nancy and Song.
- **Scope:** Sequential prompts, committed assignments, locked presentation, transition after both guesses.
- **Completion:** Nancy's committed card is unavailable for Song; core rules reject duplicate assignments too. No correctness appears until both guesses are complete.

### 9. Reveal and scoring

- **Goal:** Reveal answers and award simple points.
- **Scope:** Show chosen/actual cards; separate +1-per-correct scoring function.
- **Completion:** Zero, one, and two correct answers produce 0, 1, and 2 points. Repeated reveal cannot score twice. Results do not rely solely on color.

### 10. Local week progression and restart

- **Goal:** Exercise all six concepts without a calendar.
- **Scope:** Manual progression in hidden round order, Charlie's accumulated score, “The dream fades,” explicit fresh-state restart.
- **Completion:** Six rounds complete; Charlie's score is 0–12. Restart clears hands, selections, boards, exposure, assignments, and scores. Do not fabricate friends' standings or a competitive winner; these require more simulation later.

### 11. Responsive and accessibility polish

- **Goal:** Make artwork and primary interactions comfortable on phones.
- **Scope:** Gallery, image inspection if useful, touch targets, focus, keyboard flow, contrast, locked/reveal states.
- **Completion:** Check selection, guessing, and reveal at 320, 375, 390, and 430 CSS-pixel widths, tablet, and desktop. No hover dependence, clipped prompts, or tiny controls. Enlargement must not commit a guess. Artwork remains dominant.

### 12. Gentle transitions

- **Goal:** Add atmosphere after gameplay works.
- **Scope:** Restrained fades, replacement entry, reveals, reduced-motion support.
- **Completion:** Transitions preserve state/focus, reject duplicate actions, and do not reveal early or delay essential input. Reduced-motion mode remains playable.

## Validation and handoffs

Use meaningful rule tests for allocation uniqueness, atomic replacement, six-card invariants, decoy eligibility, one-to-one assignments, delayed reveal, and scoring once. Include invalid actions and insufficient data. Run available project checks and manually play affected milestones; documentation alone has no runtime tests.

Before expanding into interactive late joining, deadlines, competitive standings, persistence, accounts, or networking, review open questions and agree on affected behavior. Manual progression, strict decoy fixtures, and three-player setup are prototype assumptions, not permanent production rules.
