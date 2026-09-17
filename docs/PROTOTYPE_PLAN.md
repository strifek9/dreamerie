# Prototype 0.1 plan

## Starting point and scope

Inspection found one tracked minimal README, one initial commit, a clean working tree, and no application, tooling, assets, or existing architecture. This task creates documentation only. Bootstrap happens in a later implementation task.

The paragraph above records the initial planning inspection. Milestones 1–6 are approved. Milestones 7–8 include the requested Day 1/Day 2 boundary and sequential Nancy/Song choices. The user's request to test the full week also authorized Milestones 9–10: reveal, scoring, all six rounds, ending, and restart. Milestones 7–10 are implemented and awaiting user testing. See their statuses below and the README for current run instructions. Milestones 11–12 remain incomplete.

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

The continuous preparation flow is now the presentation direction: overview, current Dream, and hand share one page, with inline confirmation and optional enlargement. Later milestones extend that flow rather than restoring separate setup/gallery pages. Guessing should likewise keep one stable board while advancing friend prompts in place; reveal follows all assignments, without a separate page for each friend. Preserve small milestone boundaries and stop for user testing after each one.

### 1. Bootstrap and mobile shell

- **Status:** Approved by the user; proceeding to Milestone 2 was authorized.
- **Goal:** Establish a runnable local browser project.
- **Scope:** Vite, React, TypeScript, minimal Dreamerie shell, mobile-first styles; document actual install/dev/build commands.
- **Completion:** Shell runs locally, type/build checks pass, and phone/desktop layouts have no horizontal overflow. No excluded integrations.
- **Validation:** `npm run typecheck` and `npm run build` passed; the dev server started successfully. Headless Edge checks passed at 320×568, 375×667, 390×844, 430×932, 768×1024, and 1440×900, with no horizontal overflow, clipped text, or runtime errors. Phone and desktop screenshots were visually inspected. No unit-test suite is needed for this static shell; gameplay tests remain for later milestones. No gameplay or artwork fixtures were added.

### 2. Fixtures and card allocation

- **Status:** Approved by the user; proceeding to Milestone 3 was authorized.
- **Goal:** Establish reliable data and unique hands.
- **Scope:** Stable domain IDs, six concepts, three players, sufficient local placeholder cards, shared week pool, six-card dealing, exposure tracking.
- **Completion:** Each initial hand has six distinct cards with no player overlap. Exhaustion fails clearly without partial dealing. A simple gallery permits fixture inspection.
- **Implementation:** Stable domain IDs, six concept fixtures, Charlie/Nancy/Song, 60 original local SVG fixtures with documented provenance, pure atomic dealing, and immutable per-player exposure updates. Only Charlie's six cards appear in the gallery. Inspection is separate from selection and does not expose friends' hands or the unused pool. No later-milestone gameplay was implemented.
- **Validation:** TypeScript checks, production build, and seven Node built-in tests passed. Tests cover unique/disjoint hands and pool, private exposure, exhaustion before allocation, duplicate IDs, invalid randomness, reproducibility, and all 60 asset files. Headless Edge checked six phone/tablet/desktop viewports, loaded images, keyboard opening, Escape closure, focus return, and stable hands across inspection/navigation. Phone and desktop screenshots were visually reviewed.

### 3. Weekly introduction and hidden order

- **Status:** Approved by the user; proceeding to Milestone 4 was authorized.
- **Goal:** Introduce six Dreams without revealing daily order.
- **Scope:** “This week, you will dream of...” view; separate setup/display order from randomized round order.
- **Completion:** All six concepts appear once; visible order does not disclose the schedule. A reproducible rule check verifies the hidden order is a permutation.
- **Implementation:** A pure week constructor keeps concepts, setup order, shuffled round order, and card allocation in one local week. Shared shuffling retains injectable randomness. A public introduction projection provides only concept metadata to its React view. Navigation from the beginning to the weekly introduction and gallery preserves the week; no daily schedule, selection, or guessing controls are shown. An unbiased shuffle can occasionally match display order by chance; the display is never derived from the shuffle.
- **Validation:** TypeScript checks, production build, and all 11 rule tests passed. New tests cover the reproducible six-concept permutation, untouched setup order, identical public introductions for different hidden schedules, and invalid concept fixtures. Headless Edge checks passed at the six documented phone/tablet/desktop sizes for the introduction and gallery, including keyboard entry, all six visible concepts exactly once, no displayed schedule, stable hands across navigation, and existing inspection/closure/focus behavior. Phone and desktop screenshots were visually inspected. No runtime errors were reported; a missing favicon request was resolved with an empty inline icon reference.

### 4. Selection and replacement

- **Status:** Approved by the user; proceeding to Milestone 5 was authorized.
- **Goal:** Choose a Dream while maintaining a six-card hand.
- **Scope:** Concept prompt, selectable hand, commitment, reserve chosen card, draw replacement, advance setup concept.
- **Completion:** A valid choice is recorded once, removed, and replaced by an unallocated card. Hands stay disjoint. Invalid/double actions or exhaustion leave state unchanged. Tap/keyboard actions work.
- **Implementation:** Pure per-player Dream selection in setup order, an atomic same-slot replacement from the shuffled shared pool, retained selected-card reservations, and replacement exposure. Stale concepts, absent cards, unknown players, and exhausted/invalid replacements are rejected before changes. At the user's request, preparation stays on one continuous page containing the six-concept overview, current prompt, and hand. Tapping a card marks it; inline “Remember this dream” confirms it, guards repeated activation, and advances the prompt in place. Enlargement is optional. The sixth choice keeps the same page and offers no seventh choice; the dedicated atmospheric completion screen and any transition to guessing remain for Milestone 5 and later milestones.
- **Validation:** Type checks, production build, and all 17 rule tests passed. New tests cover exact replacement and exposure, input immutability, stale/double commands, invalid choices, exhaustion, and all six transitions including the final replacement. Headless Edge verified the selection view at the six documented widths, keyboard inspection/commitment, Escape and focus return, unchanged hands after inspection/navigation, double activation committing once, stable five unaffected slots, six-card hands, and the final boundary. Phone and desktop screenshots were visually inspected; no runtime errors were reported.
- **Continuous-page revision:** Build, type checks, and all 17 rule tests passed. Headless Edge confirmed all six concepts and the current hand coexist at six viewport sizes, keyboard marking, optional inspection without commitment, double activation committing once, and six same-slot replacements while the preparation page stays mounted. No runtime errors were reported.

### 5. Selection completion

- **Status:** Approved by the user; proceeding to Milestone 6 was authorized.
- **Goal:** Give the already-working six-choice sequence an atmospheric ending.
- **Scope:** Replace the minimal end-of-selection note with “Your dreams are remembered.” in the same preparation page. Do not rebuild selection or add another required navigation step. Handle focus and remove obsolete choice controls.
- **Completion:** After the sixth confirmation, Charlie has six distinct selected Dreams and six cards left in hand, including the final replacement. The completion state appears in place, offers no seventh choice, and survives returning to the beginning. Do not add guessing controls before the required later milestones supply that experience.
- **Implementation:** A small presentation component replaces the temporary note with “Your dreams are remembered.” and focuses/scrolls to that heading. The weekly overview and preparation page stay mounted. The remaining six-card hand is clearly identified and permits inspection only; selection controls and stale selection feedback are removed. No game-rule changes, new dependencies, simulated selections, or guessing controls.
- **Validation:** TypeScript checks, production build, and all 17 existing rule tests passed. Headless Edge exercised six choices with same-slot replacements and checked completion focus, removal of choice controls, no seventh choice, and preservation of completion/hand after returning to the beginning. Completion layouts and keyboard inspection/Escape/focus return passed at all six documented widths; phone and desktop screenshots were visually inspected. No browser runtime errors were reported.

### 6. Simulated friends' Dreams

- **Status:** Approved by the user; proceeding to Milestone 7 was authorized.
- **Goal:** Supply valid Nancy/Song targets.
- **Scope:** Local simulation using shared allocation/selection rules; prepare the first hidden-order concept in local state. Keep friends' choices out of preparation views. No incomplete guessing screen or extra setup pages.
- **Completion:** Friends each have six selected Dreams with no shared allocations, including their replacement draws. Charlie's prepared Dreams and remaining hand stay intact. The first round concept is available for Milestone 7; Charlie is never a guessing target. No clock/networking needed.
- **Implementation:** A pure local simulation chooses valid cards from Nancy's and Song's current hands using the existing atomic selection/replacement function and injectable randomness. It runs at week initialization, skips completed choices, and preserves Charlie's hand, Dreams, and exposure. Once Charlie also completes preparation, local state holds the first hidden-order concept, Charlie as guesser, and only Nancy/Song as targets. No guessing board, assignments, scoring, or extra screens were added. After all preparation, 36 unique cards are reserved and 24 remain for later decoys.
- **Validation:** TypeScript checks, production build, and all 22 rule tests passed. New tests cover disjoint selected Dreams and remaining hands, private exposure, unchanged Charlie state, reproducibility, partial/completed simulation, exhaustion, invalid randomness without input mutation, and first-round readiness. Headless Edge rechecked the continuous preparation and completion flow at all six documented widths, including keyboard selection, optional inspection, double activation, six same-slot replacements, completion focus, and preserved state after return navigation. No runtime errors were reported.

### 7. Six-card guessing board

- **Status:** Revised at the user's request alongside the sequential assignment flow from Milestone 8; awaiting user testing and approval.
- **Goal:** Create a stable, eligible board for one concept.
- **Scope:** Nancy/Song actual Dreams, four fresh eligible decoys, shuffle, exposure updates, and a development control to advance from Day 1 preparation to Day 2 guessing. Render one round workspace; assignment behavior is covered by Milestone 8.
- **Completion:** Day 1 shows no friend guessing prompts. The development “Next day” action becomes available only after all six choices and opens Day 2. Six distinct images include both targets and no Charlie Dream or answer styling. Decoys were unseen by Charlie. Rerendering does not regenerate the board. Insufficient candidates fail without weakening eligibility. Viewing or enlarging a board image does not commit an assignment.
- **Implementation:** A top-right “Dev · Day 1” control offers “Next day” once preparation is complete. It opens Day 2 with Nancy's individual prompt. A pure board builder takes Nancy's and Song's actual Dreams for the first hidden-order concept, adds four distinct unallocated cards unseen by Charlie, shuffles, and records all six as exposed only to Charlie. Decoys stay unallocated; exposure excludes them from Charlie's later eligible pool. The board and its stable round ID are stored on entry, with a pure local reducer rejecting repeated entry and stale selection. The view receives the current concept, uniform card metadata, friend identities, and player-chosen locks, without actual ownership or correctness. Optional inspection and return navigation preserve card order. The requested assignment flow is recorded under Milestone 8; reveal, scoring, and full-week progression are recorded under Milestones 9–10.
- **Validation:** TypeScript checks, production build, and all 30 tests passed. New tests cover actual targets, Charlie exclusion, private exposure, strict eligibility, duplicate/seen/invalid candidates, exhaustion, reproducible shuffling, atomic failures, repeated/stale entry, and presentation data without answers. Headless Edge rechecked all six preparation choices and completion, then the board at 320, 375, 390, 430, 768, and 1440 CSS-pixel widths. Keyboard/touch inspection, Escape/focus return, entry focus, double activation, no Charlie hand images, and stable return navigation passed without runtime errors or horizontal overflow. Phone and desktop board screenshots were visually reviewed.

### 8. Assignment locking

- **Status:** Implemented at the user's request for Nancy-then-Song guessing; awaiting user testing alongside the requested full-week flow.
- **Goal:** Associate different images with Nancy and Song.
- **Scope:** Sequential friend prompts and inline confirmation in the same round workspace, committed assignments, locked presentation, and a ready-for-reveal phase after both guesses. Enlargement stays optional.
- **Completion:** Nancy's committed card is unavailable for Song; core rules reject duplicate assignments too. Song's prompt replaces Nancy's in place while the same board and locks remain. No correctness appears until both guesses are complete. No separate navigation or modal is required to commit each assignment.
- **Implementation:** Each guessing day begins with “Nancy dreamt of [concept]. What did their dream look like?” Marking a card and confirming “Remember Nancy’s dream” locks it and changes the prompt to Song's for the same concept. Gender-neutral “their” is used for all friends. Locked cards remain inspectable but cannot be selected again. A pure assignment transition rejects out-of-order, duplicate, own-player, off-board, and completed guesses. The local reducer guards stale round actions and stores an explicit ready-for-reveal phase after Song's confirmation. Both locks and board order survive navigation; correctness and scores remain hidden until the reveal action.
- **Validation of revised Milestones 7–8:** Build and TypeScript checks plus all 35 tests passed. Rule tests cover sequential assignments, immutable board order, invalid/duplicate/stale actions, lock preservation, and completion without answers. Headless Edge verified the Day 1 boundary, disabled early day advance, Day 2 entry, Nancy-to-Song prompts without remounting the board, keyboard/touch selection, optional inspection including locked cards, focus, double activation, navigation persistence, and both locked guesses. Preparation, Nancy, Song, and completed-guess layouts passed at six phone/tablet/desktop widths with no runtime errors or horizontal overflow. Phone and desktop screenshots were visually reviewed.

### 9. Reveal and scoring

- **Status:** Implemented as part of the user's request to test the full week; awaiting user testing and approval.
- **Goal:** Reveal answers and award simple points.
- **Scope:** After all assignments, show chosen/actual cards and results in the same round workspace; separate +1-per-correct scoring function. No intermediate correctness feedback or per-friend reveal pages.
- **Completion:** Zero, one, and two correct answers produce 0, 1, and 2 points. Repeated reveal cannot score twice. Results do not rely solely on color.
- **Implementation:** “Reveal their dreams” appears only after both assignments. A pure scoring function validates complete, distinct guesses and awards +1 per match. The reducer stores each result once, with round IDs guarding repeated/stale events. Only the revealed view receives actual answers. Both friends' chosen/actual image pairs, textual results, round points, and accumulated score appear in the same workspace.
- **Validation:** All 40 tests and the build/type checks passed. New tests cover 0/1/2-point rounds, incomplete/duplicate/invalid guesses, early reveal, exactly-once scoring, stale actions, and reveal metadata. Browser checks compare displayed guesses and answers against correctness text and score totals, including double reveal and return navigation. Reveal layouts passed at all six documented sizes; phone and desktop screenshots were visually reviewed.

### 10. Local week progression and restart

- **Status:** Implemented as part of the user's request to test the full week; awaiting user testing and approval before Milestone 11.
- **Goal:** Exercise all six concepts without a calendar.
- **Scope:** Extend the development day control beyond the existing Day 1-to-Day 2 transition, advancing to later rounds in hidden order only after the current reveal. Keep the existing workspace, Charlie's accumulated score, “The dream fades,” and explicit fresh-state restart. Keep calendar scheduling excluded.
- **Completion:** Six rounds complete; Charlie's score is 0–12. Restart clears hands, selections, boards, exposure, assignments, and scores. Do not fabricate friends' standings or a competitive winner; these require more simulation later.
- **Implementation:** Day 1 prepares the week; test Days 2–7 each use the next hidden-order concept. “Next day” is enabled after the current reveal, and “Finish week” replaces it for the final day. Each new board gets a distinct round ID and four fresh eligible decoys; exposure and accumulated results persist while assignments reset. “The dream fades.” shows Charlie's total out of 12. “Begin a new week” creates a new week ID, fresh allocations and simulated Dreams, clears Charlie's choices/exposure and all boards/results, and returns to Day 1. No friend standings, real scheduling, or skipped-round scoring rules were introduced.
- **Validation:** All 40 tests and the build/type checks passed. A complete six-round rule test verifies hidden order, 24 distinct unseen decoys, 12-point maximum, retained hands/Dreams, guarded advancement, and fresh restart. Further tests cover later-day exhaustion and invalid indices. Headless Edge played all six rounds with 36 distinct board images, checked reveal totals and duplicate actions, finished Day 7, and restarted on Day 1. Preparation, guessing, reveal, and ending layouts passed at six phone/tablet/desktop widths; no runtime errors were reported.

### 11. Responsive and accessibility polish

- **Goal:** Make artwork and primary interactions comfortable on phones.
- **Scope:** Polish the continuous preparation and round workspaces, optional image inspection, touch targets, focus/scroll position between prompts, keyboard flow, contrast, and locked/reveal states. Keep artwork large enough to appreciate; do not force all content into one phone viewport.
- **Completion:** Check selection, guessing, and reveal at 320, 375, 390, and 430 CSS-pixel widths, tablet, and desktop. No hover dependence, clipped prompts, or tiny controls. Enlargement must not commit a guess. Artwork remains dominant.

### 12. Gentle transitions

- **Goal:** Add atmosphere after gameplay works.
- **Scope:** Restrained in-place prompt changes, replacement entry, reveals, and reduced-motion support. Avoid introducing page transitions or animation dependencies without clear need.
- **Completion:** Transitions preserve state/focus, reject duplicate actions, and do not reveal early or delay essential input. Reduced-motion mode remains playable.

## Validation and handoffs

Use meaningful rule tests for allocation uniqueness, atomic replacement, six-card invariants, decoy eligibility, one-to-one assignments, delayed reveal, and scoring once. Include invalid actions and insufficient data. Run available project checks and manually play affected milestones; documentation alone has no runtime tests.

Before expanding into interactive late joining, deadlines, competitive standings, persistence, accounts, or networking, review open questions and agree on affected behavior. Manual progression, strict decoy fixtures, and three-player setup are prototype assumptions, not permanent production rules.

## Coding model checkpoints

These are workflow recommendations, not implementation requirements or gameplay rules. Recheck current model guidance when needed and recommend a switch to the user before starting a milestone; do not change their chosen model automatically.

- **Milestone 5:** A focused presentation change; no stronger model is necessary just to finish the in-place completion state.
- **Before Milestone 7:** Recommended checkpoint for GPT-6 Astra if available. Decoy eligibility combines shared reservations, per-player exposure, true targets, stable boards, and failure handling; Milestones 8–10 add locking, delayed reveal, and exactly-once scoring across rounds. A stronger reasoning model can be useful for implementing and reviewing these interactions.
- **Milestones 11–12:** Routine layout/copy/transition work can stay on the user's usual coding model. Recommend a stronger model if accessibility, focus, or state bugs remain difficult to resolve.
- **Future real multiplayer/backend work:** Recommend a fresh architecture and model review before implementation; this work remains outside Prototype 0.1.

OpenAI describes [GPT-6 Astra](https://developers.openai.com/api/docs/models/gpt-6-astra) as its most capable model for complex reasoning and coding. The milestone checkpoints above are project-specific judgment, not official claims about Dreamerie performance. Model choice never expands milestone scope or replaces tests and user approval.
