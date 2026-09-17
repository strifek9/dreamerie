# Prototype 0.1 plan

## Prototype 0.2 planning

Prototype 0.1 is complete and approved. The user has authorized planning shared games across phone and desktop browsers: 2–6 players, private rooms, a separate solo-player lobby, host controls and automatic daily progression. See [PROTOTYPE_0_2_PLAN.md](PROTOTYPE_0_2_PLAN.md) for the scope, unresolved policies and separately numbered 0.2 milestones, including group formation and scheduling. This file remains the scope index; the linked plan is its 0.2 supplement. Only planning is authorized so far. The exclusions and local assumptions below continue to describe Prototype 0.1, not a claim that connected play already exists.

## Starting point and scope

**Current authorized experiment:** Add personal clues and mutual recognition scoring while retaining the original shared-word mode. The user chose six clue-and-card pairs per person on Day 1. This is one reversible prototype experiment, not authorization for another milestone or production infrastructure. Historical milestone notes below describe their implementation at the time.

Inspection found one tracked minimal README, one initial commit, a clean working tree, and no application, tooling, assets, or existing architecture. This task creates documentation only. Bootstrap happens in a later implementation task.

The paragraph above records the initial planning inspection. All 12 milestones are implemented and approved. The user completed the final full-week playtest and approved Prototype 0.1, including the personal-clue experiment, recognition scoring and subsequent presentation refinements. Historical validation and handoff notes below retain the status at the time; this final acceptance supersedes their pending-testing statements. See the README for current run instructions. Agree on the scope of a real-person playtest before further implementation; acceptance does not authorize new milestones or infrastructure.

Build a local React + TypeScript + Vite browser game, mobile-first and responsive. Demonstrate Charlie choosing six Dreams and recognizing Nancy/Song Dreams using local artwork. The user has requested a visual refresh with 120 generated illustrations before the remaining polish milestones. Follow [GAME_DESIGN.md](GAME_DESIGN.md), including its explicitly labeled prototype assumptions.

No authentication, backend, PostgreSQL, cloud storage, Discord code, push notifications, matchmaking, monetization, in-app AI artwork generation, production scheduling, real multiplayer networking, or native apps. Offline development generation of bundled artwork is now authorized by the user. Do not expand scope to resolve open production questions.

## Simple architecture direction

Create directories only as needed:

```text
src/
  App.tsx          # compose screens and local state
  components/      # prompts, galleries, assignment and reveal views
  game/            # types, transitions, allocation, boards, scoring
  data/            # concepts, players, local card metadata
  styles/          # mobile-first layout and visual tokens
public/
  artwork/         # bundled illustrations and asset provenance
```

Start with domain types in `game/`; a separate `types/` directory is unnecessary until there is a concrete reason. Use stable IDs for cards, players, concepts, weeks, and rounds. Card metadata needs an asset reference and useful visual description without revealing ownership or prescribing a concept.

Core state represents the week concepts and hidden round order, player hands, reserved cards, selected Dreams, seen-card sets, current round, stable board, assignments, and accumulated score. Make selection, guessing, and revealed phases explicit in types.

Use small TypeScript functions for legal transitions and checks. React renders results and dispatches actions. Keep selection/replacement atomic, reject duplicate assignments, and score each completed round once. Supply randomness for reproducible checks. Simulated players use the same rules as Charlie.

Give views only phase-appropriate data: no daily schedule in the introduction and no answer markers while guessing. A local browser necessarily contains simulated answers; these boundaries prevent accidental UI leaks, not adversarial cheating. Real multiplayer will need an authoritative service later.

In-memory local state is enough. Do not introduce repositories, service containers, platform interfaces, or a backend abstraction before they are needed. Separating rules from rendering allows future storage/network integrations to reuse them.

## Milestones

Each milestone leaves a checkable local result. Selection and replacement are one milestone because splitting their implementation into working milestones would temporarily violate the six-card hand rule.

The continuous preparation flow is now the presentation direction: overview, current Dream, and hand share one page, with inline confirmation and optional enlargement. Later milestones extend that flow rather than restoring separate setup/gallery pages. Guessing should likewise keep one stable board while advancing friend prompts in place; reveal follows all assignments, without a separate page for each friend. Preserve small milestone boundaries and stop for user testing after each one.

The latest user-requested revisions to this flow allow unselecting tentative choices and unlocking guesses before reveal, remove return-to-beginning navigation, pin Charlie's own Dream in the first slot of the six-card board through guessing and reveal, and add a complete current-week recap at the ending. They revise Milestones 7–10; the user has now authorized Milestone 11, including stationary cards, less scrolling and a blue/violet welcome theme. Earlier validation notes below describe the controls present when those checks ran.

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
- **Completion:** After the sixth confirmation, Charlie has six distinct selected Dreams and six cards left in hand, including the final replacement. The completion state appears in place and offers no seventh choice. Do not add guessing controls before the required later milestones supply that experience.
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

- **Status:** Implemented with the requested revisions; the user approved proceeding to Milestone 11.
- **Goal:** Create a stable, eligible board for one concept.
- **Scope:** Charlie's own Dream first, Nancy/Song actual Dreams, three fresh eligible decoys, shuffle of the other five slots, exposure updates, and a development control to advance from Day 1 preparation to Day 2 guessing. Render one round workspace; assignment behavior is covered by Milestone 8.
- **Completion:** Day 1 shows no friend guessing prompts. The development “Next day” action becomes available only after all six choices and opens Day 2. Six distinct images include Charlie's labeled, inspectable own Dream in slot one, both friend targets and three decoys. Only the other five images can be guessed; no friend ownership is shown before reveal. Decoys were unseen by Charlie. Rerendering does not regenerate the board. Insufficient candidates fail without weakening eligibility. Viewing or enlarging a board image does not commit an assignment.
- **Implementation:** A top-right “Dev · Day 1” control offers “Next day” once preparation is complete. It opens Day 2 with Nancy's individual prompt. A pure board builder takes Nancy's and Song's actual Dreams for the first hidden-order concept, adds three distinct unallocated cards unseen by Charlie, shuffles those five images, and prepends Charlie's own Dream. Only Charlie's exposure is updated. Decoys stay unallocated; exposure excludes them from Charlie's later eligible pool. The board and its stable round ID are stored on entry, with a pure local reducer rejecting repeated entry and stale selection. The view receives the current concept, uniform card metadata, friend identities, and player-chosen locks, without friends' actual ownership or correctness. Optional inspection preserves card order. Charlie's own Dream is first within the six cards and is inspectable but cannot be assigned; return-to-beginning controls have been removed. The requested assignment flow is recorded under Milestone 8; reveal, scoring, and full-week progression are recorded under Milestones 9–10.
- **Validation:** TypeScript checks, production build, and all 30 tests passed. New tests cover actual targets, Charlie exclusion, private exposure, strict eligibility, duplicate/seen/invalid candidates, exhaustion, reproducible shuffling, atomic failures, repeated/stale entry, and presentation data without answers. Headless Edge rechecked all six preparation choices and completion, then the board at 320, 375, 390, 430, 768, and 1440 CSS-pixel widths. Keyboard/touch inspection, Escape/focus return, entry focus, double activation, no Charlie hand images, and stable return navigation passed without runtime errors or horizontal overflow. Phone and desktop board screenshots were visually reviewed.

### 8. Assignment locking

- **Status:** Implemented with the requested revisions; the user approved proceeding to Milestone 11.
- **Goal:** Associate different images with Nancy and Song.
- **Scope:** Sequential friend prompts and inline confirmation in the same round workspace, committed assignments, reversible locks before reveal, and a ready-for-reveal phase after both guesses. Enlargement stays optional.
- **Completion:** Nancy's committed card is unavailable for Song while locked; core rules reject duplicate assignments too. Before reveal, either guess can be unlocked without erasing the other. The released card becomes available and reveal is disabled until both guesses are confirmed. Friend prompts update in place on the same board. No correctness appears until both guesses are complete and reveal is requested. No separate navigation or modal is required to commit or unlock a guess.
- **Implementation:** Each guessing day begins with “Nancy dreamt of [concept]. Select their Dream Card.” Marking a card and confirming “Remember Nancy’s dream” locks it and changes the prompt to Song's for the same concept. Gender-neutral “their” is used for all friends. Locked cards remain inspectable and offer an explicit unlock action before reveal; they cannot be assigned elsewhere while locked. A pure assignment transition rejects out-of-order, duplicate, own-player, off-board, and completed guesses. The local reducer guards stale round actions and stores an explicit ready-for-reveal phase after both confirmations. Unlocking returns to the first unassigned friend and preserves the other guess, board, and exposure. Correctness and scores remain hidden until the reveal action; revealed results cannot be edited.
- **Validation of revised Milestones 7–8:** Build and TypeScript checks plus all 35 tests passed. Rule tests cover sequential assignments, immutable board order, invalid/duplicate/stale actions, lock preservation, and completion without answers. Headless Edge verified the Day 1 boundary, disabled early day advance, Day 2 entry, Nancy-to-Song prompts without remounting the board, keyboard/touch selection, optional inspection including locked cards, focus, double activation, navigation persistence, and both locked guesses. Preparation, Nancy, Song, and completed-guess layouts passed at six phone/tablet/desktop widths with no runtime errors or horizontal overflow. Phone and desktop screenshots were visually reviewed.

### 9. Reveal and scoring

- **Status:** Implemented as part of the full-week flow; the user approved proceeding to Milestone 11.
- **Goal:** Reveal answers and award simple points.
- **Scope:** After all assignments, show chosen/actual cards and results in the same round workspace; separate +1-per-correct scoring function. No intermediate correctness feedback or per-friend reveal pages.
- **Completion:** Zero, one, and two correct answers produce 0, 1, and 2 points. Repeated reveal cannot score twice. Results do not rely solely on color.
- **Implementation:** “Reveal their dreams” appears only after both assignments. A pure scoring function validates complete, distinct guesses and awards +1 per match. The reducer stores each result once, with round IDs guarding repeated/stale events. Only the revealed view receives actual answers. The same six-card board stays mounted and in order, with actual owner/decoy labels and player-guess labels added only after reveal. Textual results, round points and accumulated score appear below. Image pairs remain in the end-of-week recap.
- **Validation:** All 40 tests and the build/type checks passed. New tests cover 0/1/2-point rounds, incomplete/duplicate/invalid guesses, early reveal, exactly-once scoring, stale actions, and reveal metadata. Browser checks compare displayed guesses and answers against correctness text and score totals, including double reveal and return navigation. Reveal layouts passed at all six documented sizes; phone and desktop screenshots were visually reviewed.

### 10. Local week progression and restart

- **Status:** Implemented as part of the full-week flow; the user approved proceeding to Milestone 11.
- **Goal:** Exercise all six concepts without a calendar.
- **Scope:** Extend the development day control beyond the existing Day 1-to-Day 2 transition, advancing to later rounds in hidden order only after the current reveal. Keep the existing workspace, Charlie's accumulated score, “The dream fades,” and explicit fresh-state restart. Keep calendar scheduling excluded.
- **Completion:** Six rounds complete; Charlie's score is 0–12. Restart clears hands, selections, boards, exposure, assignments, and scores. Do not fabricate friends' standings or a competitive winner; these require more simulation later.
- **Requested ending revision:** Include all six concepts in played order, each showing Charlie's own Dream and Nancy/Song actual Dreams beside Charlie's final guesses and textual results. Keep this recap in the current local session only and clear it on restart or refresh.
- **Implementation:** Day 1 prepares the week; test Days 2–7 each use the next hidden-order concept. “Next day” is enabled after the current reveal, and “Finish week” replaces it for the final day. Each new board gets a distinct round ID and three fresh eligible decoys; exposure and accumulated results persist while assignments reset. “The dream fades.” shows Charlie's total out of 12. “Begin a new week” creates a new week ID, fresh allocations and simulated Dreams, clears Charlie's choices/exposure and all boards/results, and returns to Day 1. No friend standings, real scheduling, or skipped-round scoring rules were introduced.
- **Validation:** All 40 tests and the build/type checks passed. A complete six-round rule test verifies hidden order, 24 distinct unseen decoys, 12-point maximum, retained hands/Dreams, guarded advancement, and fresh restart. Further tests cover later-day exhaustion and invalid indices. Headless Edge played all six rounds with 36 distinct board images, checked reveal totals and duplicate actions, finished Day 7, and restarted on Day 1. Preparation, guessing, reveal, and ending layouts passed at six phone/tablet/desktop widths; no runtime errors were reported.

- **Validation of requested choice/reference/recap revisions:** All 44 rule tests and build/type checks passed. Tests cover independent and repeated unlocks, stale commands, reveal gating, revised-choice scoring, own-Dream exclusion from candidates, and complete recap mappings. Headless Edge tested clearing tentative preparation/guess choices, unlocking during guessing and after both confirmations, preserving other guesses and board order, keyboard/touch reassignment, focus, own-Dream inspection, removal of back links, all six rounds, recap contents against actual revealed results, and clean restart. Guessing, ready, reveal, and recap layouts passed at six phone/tablet/desktop widths without runtime errors. Phone and desktop screenshots were visually reviewed.

### Requested first-slot own-Dream revision

- **Status:** Implemented and validated; the user approved proceeding to Milestone 11. This revision originally preceded that milestone.
- **Scope:** Six total board cards: own Dream pinned first, two friend Dreams and three fresh decoys shuffled into the remaining five slots. Own Dream is inspectable but unassignable in both UI and core rules. Keep the board and order through reveal, adding owner/decoy and guess labels only then. Preserve unlocks, scoring and the complete recap.
- Earlier validation notes describe the board and controls present at that time; references to four decoys or an external own-Dream reference are historical.
- **Validation:** All 45 tests, TypeScript checks and the production build pass. Tests verify own Dream first, three unseen decoys, 18 distinct decoys across the week, rejected own-card assignments and forged own-card scoring, stable boards and unchanged 0/1/2 scoring. Edge played all six rounds through recap and restart, checked own-card inspection without assignment, unlock/reassignment, no premature friend/decoy labels, exactly six unchanged board images through reveal, and recap comparisons. Layouts passed at 320, 375, 390, 430, 768 and 1440 CSS-pixel widths; phone and desktop screenshots were visually reviewed.

### Requested visual refresh (before Milestone 11)

- **Goal:** Replace geometric placeholders with 120 distinct illustrated cards and give the interface a magical, artful identity.
- **Scope:** Static local artwork, meaningful visual descriptions, generation provenance, a richer responsive theme, and a separate welcome illustration. Preserve all existing game rules and the continuous preparation/guessing/reveal/recap flow. Do not use deck artwork as welcome decoration, which would expose potential decoys before play.
- **Art direction:** Follow the user's storybook references and Dixit-inspired associative storytelling with original imagery. No hyperrealism. Broad colors, varied emotions (happy, sad, funny, unsettling and mixed), and both readable surreal scenes and more abstract, puzzling compositions. Production moods must never become runtime answers or categories.
- **Completion:** All 120 distinct local assets load; metadata and descriptions match them; no early ownership hints or duplicate artwork. Build, type and rule checks pass, and the complete week works with the new deck. Review phone, tablet and desktop layouts. Stop for user testing after this refresh.
- **Status:** Implemented; the user approved proceeding to Milestone 11, with a further welcome/theme refinement. The deck remains unchanged by that refinement.
- **Implementation:** 120 independently generated illustrations with reviewed visual descriptions, stored as full-composition JPEGs with checksums and recorded prompts. The initial refresh used a separate welcome illustration, parchment surfaces, teal surroundings, plum controls, consistent artwork frames and labels below images to establish the presentation. Milestone 11 supersedes the interface palette and welcome illustration. The placeholder generator can no longer overwrite the active deck. Rule functions and gameplay behavior are unchanged by this refresh.
- **Validation:** All 44 tests pass, including checks for 120 unique local image files and their provenance hashes. TypeScript checks and the production build pass. Edge decoded all 120 cards and the separate welcome illustration. Browser checks passed at 320, 375, 390, 430, 768 and 1440 CSS-pixel widths for welcome, preparation, guessing, locked guesses, reveal and recap, including keyboard/touch interaction, unlocking, own-Dream references, all six rounds and restart. All 120 compositions were visually reviewed in contact sheets; phone and desktop interface screenshots were also reviewed. One remaining test assumption about the old 60-card pool was updated to derive availability from deck size.

### 11. Responsive and accessibility polish

- **Status:** Approved by the user; proceeding to Milestone 12 was authorized.
- **Goal:** Make artwork and primary interactions comfortable on phones.
- **Scope:** Polish the continuous preparation and round workspaces, optional image inspection, touch targets, focus/scroll position between prompts, keyboard flow, contrast, and locked/reveal states using the refreshed illustrated theme. Include raster-image loading and long recap scrolling. The user also requested stationary cards when selecting or clearing, less scrolling, and a more dreamlike blue/purple welcome illustration and palette. Keep artwork large enough to appreciate; do not force all content into one phone viewport.
- **Completion:** Check selection, guessing, and reveal at 320, 375, 390, and 430 CSS-pixel widths, tablet, and desktop. No hover dependence, clipped prompts, or tiny controls. Enlargement must not commit a guess. Artwork remains dominant.

- **Implementation:** Reserved card-caption and unlock-control space, stable prompt heights and scrollbar gutter, focus without automatic scrolling between prompts, and a compact sticky confirmation area that repeats the current Dream, with separate magnifiers beneath the cards. Compact overview, two-column phone and three-column tablet/desktop galleries, tighter recap spacing, and scroll clearance for keyboard focus. New separate moonlit welcome illustration with recorded prompt/provenance, indigo surroundings and muted periwinkle/violet surfaces. The 120-card deck, game rules and dependencies are unchanged.
- **Validation:** All 45 tests, TypeScript checks and production build passed. Edge played the full six-round week, checked recap against revealed guesses and restarted. Welcome, preparation, guessing, ready, reveal and recap layouts passed at 320x568, 375x667, 390x844, 430x932, 768x1024 and 1440x900 with no horizontal overflow, clipped text, undersized controls or runtime errors. Separate geometry checks confirmed stable card rectangles and scroll position during selection/deselection, replacement, Nancy/Song locks, unlocking and reveal at each size. Small-phone keyboard checks confirmed all six cards remain visible when focused, Enter selection, Escape inspection closure and focus/scroll restoration with reduced motion enabled. Phone and desktop screenshots were visually reviewed.

- **User-requested refinement:** Restore larger three-per-row desktop cards, soften pale surfaces to muted periwinkle, and center a compact confirmation button. Each card has a 44px magnifier beneath the artwork, usable without selecting a card. An optional hold-and-release gesture (450ms) opens the same inspection; movement, pointer cancellation or leaving the card cancels the hold. Inspection preserves tentative choices. This remains Milestone 11, not the animation milestone.
- **Refinement validation:** Build/type checks and all 45 tests passed. Full-week browser and stationary-card geometry checks passed again at all six sizes. At 320px, all twelve card/magnifier keyboard targets were reachable and unobscured, Enter/Escape restored focus and scroll, and real touch events verified hold/release, preserved selection, cancelled scrolling/pointers, and normal tap toggling. Phone and desktop screenshots were reviewed. Physical iOS/Android testing remains with the user.

### 12. Gentle transitions

- **Status:** Implemented, validated and approved by the user after the final full-week playtest. Prototype 0.1 is complete.
- **Goal:** Add atmosphere after gameplay works.
- **Scope:** Restrained opacity/color changes for in-place prompts, replacements and reveals, with reduced-motion support. Preserve the stationary card positions established in Milestone 11; no translation, resizing or grid reflow. Avoid introducing page transitions or animation dependencies without clear need.
- **Completion:** Transitions preserve state/focus, reject duplicate actions, and do not reveal early or delay essential input. Reduced-motion mode remains playable.

- **Implementation:** CSS-only 140-260ms opacity and color/shadow effects for prompt changes, loaded preparation images, selection feedback, lock/owner labels and revealed results. Prompt text is keyed inside stable focused headings; card IDs preserve unchanged images. Loading an incoming image starts its fade without hiding or disabling it. No transforms, layout transitions, staggered delays, animation dependencies or animation-driven game state. Effects are opt-in under `prefers-reduced-motion: no-preference`; reduced motion renders immediate feedback.
- **Validation:** TypeScript checks, production build and all 45 tests passed. Edge replayed the entire six-round week, recap and restart with normal and reduced motion at 320x568, 375x667, 390x844, 430x932, 768x1024 and 1440x900. Card rectangles and scroll position stayed stable during selecting, clearing, replacement, locking/unlocking and reveal. Touch/keyboard zoom checks passed. Dedicated checks verified stable heading focus, only the replacement image animating, visible artwork throughout the effect, rapid double confirmation/toggling, no early answers, immediate next-day availability and cancellation of active effects when reduced motion is enabled. Final user testing remains pending.

## Validation and handoffs

### Requested player accents and unlock-button refinement

- **Status:** Implemented and validated; awaiting user testing as part of Prototype 0.1 review.
- **Scope:** Rose Nancy and blue Song name accents, matching borders and labels on confirmed guesses, and tinted “Unlock guess” buttons with open-lock icons and accessible friend-specific names. Preserve the existing own-Dream accent, reserved control space and all assignment rules. Guess colors persist after reveal and do not claim correctness or actual ownership.
- **Validation:** Build, TypeScript checks and all 45 tests passed. Full-week browser checks and stationary-card geometry checks passed at all six documented widths. A focused 320px keyboard/reduced-motion check verified matching name/border/label/button colors, no card colors before assignment, 44px controls, removal of only the unlocked friend's border, and focus restoration. Phone and desktop screenshots were reviewed.

Use meaningful rule tests for allocation uniqueness, atomic replacement, six-card invariants, decoy eligibility, one-to-one assignments, delayed reveal, and scoring once. Include invalid actions and insufficient data. Run available project checks and manually play affected milestones; documentation alone has no runtime tests.

### Requested six-slot palette and scoring help

- **Status:** Implemented and validated; awaiting user testing as part of Prototype 0.1 review.
- **Scope:** Replace name-specific accent selectors with six reusable presentation slots (indigo, rose, blue, amber, forest, plum), resolved from player IDs in stable roster order. Keep the three-player simulation and existing game rules. Add a top-left “?” button opening a scoring explanation: +1 per correct guess, 0 for a miss, own card reference only, reveal after all guesses, unlock before reveal, and prototype-specific maxima of 2 per guessing day and 12 per week.
- **Validation:** Build, TypeScript checks and all 45 tests passed. Full-week and stationary-card browser checks passed at the six documented widths. Dedicated checks verified six distinct accents unaffected by renaming, text contrast of at least 4.5:1 on the main and tinted surfaces, current-player color mapping, dialog layout at six widths, keyboard access, inert background controls, Escape/close focus return, and unchanged choices, locks, day and scroll position. Phone and desktop help screenshots were reviewed. Final physical-device testing remains with the user.

Before expanding into interactive late joining, deadlines, competitive standings, persistence, accounts, or networking, review open questions and agree on affected behavior. Manual progression, strict decoy fixtures, and three-player setup are prototype assumptions, not permanent production rules.

### Requested recognition scoring, Dreamier help and recap inspection

- **Confirmed rule direction:** Award points when other people recognize your Dream, except when everyone does. The user approved simulated guesses, then confirmed +1 per correct guesser as part of the personal-clue experiment below. The original mode keeps guessing-only totals for comparison.
- **Approved simulation refinement:** Prepare Nancy's and Song's random valid assignments once on day entry using the same board and assignment functions as Charlie. Track unseen decoys per guesser, exclude their own Dream, and preserve distinct assignments. Preparation is atomic across all three boards. Unlocking, repeated commands and reveal never reroll friend choices. Publish their recognition results only after explicit reveal; include inspectable images of their guesses about Charlie in the final recap. Keep competitive standings outside scope. This extends the earlier Milestone 7 human-only exposure and Milestone 10 recap descriptions without starting a new milestone.
- **Simulation validation:** Build/type checks and all 49 tests passed. New checks cover every friend's six days of private exposure, distinct legal guesses, immutable failure after partial preparation, hidden presentation, stable guesses through revisions, and incomplete/duplicate/stale simulated results. Edge played the full week and restart, checked recognition against recap artwork, and opened all 36 guessed/actual recap images with preserved focus, scroll and results. Stationary cards and responsive/help checks passed at all six documented widths; phone and desktop reveal screenshots were reviewed. At that handoff, recognition points were still pending the user's amount decision; the personal-clue experiment below resolves it.
- **Implemented independent work:** Add the Dreamier introduction to scoring help. Reuse the existing image gallery inspection for every guessed and actual Dream in the final recap, with lazy loading, keyboard/touch access, Escape/close and focus/scroll restoration.
- **Validation:** Build/type checks and all 45 tests passed. Browser checks played the entire week and verified all 24 guessed/actual recap images against their enlarged artwork, alternating Escape and close-button actions, without changing recap results, focus or scroll. Responsive layouts and help behavior passed at the six documented sizes.

## Personal-clue experiment handoff

- **Scope:** Six personal clue/card pairs, 80-character validated text, atomic choice/replacement, per-friend clues on the existing board, and +1 per correct guess plus +1 per recognition unless all friends recognize the card. Preserve hidden order, six-card invariants, unlocks, delayed reveal, simulated guesses, full recap and image inspection.
- **Reversibility:** Welcome screen mode picker and an explicitly labeled footer action starting a fresh week in the other mode. `?mode=classic` opens original shared words with original scoring; `?mode=personal` opens the experiment. Rules stay fixed for the current week. No backend, persistence, dependency, automatic commit or history rewrite.
- **Completion criteria:** Blank/overlong text cannot commit a card; input does not reset tentative selection; long text wraps on phones without horizontal overflow; prompt changes preserve card geometry; each clue stays attached to the correct owner/card; scoring distinguishes guesses from recognition and withholds only the author's award when everyone is correct; repeated reveal cannot add points again. Play both modes through a complete week and restart, check all six viewport widths, and run build/type/tests. Stop for the user's comparison and approval.
- **Validation:** All 55 tests, TypeScript checks and the production build passed. The original mode passed its complete week, recap, all 36 image inspections and restart checks. The personal mode passed six-pair preparation, blank/80-character input, preserved tentative selections during typing, six guessing days, per-friend clue changes, point totals including recognition, recap clue/card associations, text rendered as text, image inspection, restart and switching back to original rules. Layout and stationary-card checks passed at 320, 375, 390, 430, 768 and 1440px; 80-character unbroken Latin/CJK clues wrapped without horizontal overflow. Help showed the correct mode's rules. Phone and desktop screenshots were reviewed. Physical-device testing and acceptance remain with the user.

The follow-up wording refinement uses First Dream through Sixth Dream, the softer “What was your dream?” placeholder, single-word and longer simulated clues, “Selected for [friend]” tentative labels, and “A Stranger’s Dream” reveal labels. Reserved caption space keeps the longer labels stationary. Build/type checks and all 55 tests passed; full personal-week browser checks and classic selection/lock/unlock/reveal geometry checks passed at all six documented widths. User testing remains pending.

The personal preparation header is now a single progress line (“Dream 1 of 6”) above “Interpret your first dream.” The repeated overview, slot list, instruction and divider are removed; the clue placeholder is “Tell us about your dream...”. Progress ends with “6 of 6 Dreams remembered.” The main prompt/completion uses an accessible page heading, while the original shared-word overview remains. A fixed concise confirmation caption prevents ordinal names from changing its height. Build/type checks and all 55 tests pass; browser checks confirmed six-step progress, completion, heading focus, no horizontal overflow and stationary card/scroll positions at all six documented widths. Phone and desktop screenshots were reviewed.

Latest preparation refinement: use “First Dream” through “Sixth Dream” as the heading, with a larger “Write a dream clue and choose its dream card.” instruction directly beneath. The placeholder reads “Tell us about your dream... but leave some for the imagination.”; its field accommodates the full text on small phones. Keep the counter below the field and the tap/hold hint immediately above the cards. Build/type checks and all 55 tests passed; six-width browser checks verified instruction placement, unclipped placeholder, progress, focus and stable card/scroll positions. These presentation changes await user testing.

The dream-clue/card terminology refinement updates visible and accessible copy, preparation confirmation, error wording and the personal-mode name. A polite saved status above preparation progress reports each committed pair and remains present after the sixth; its reserved space prevents layout shifts. Friends' active dream clues use 24–32px text with “Select their Dream Card.” as the instruction. Build/type checks and all 55 tests passed. Preparation, saved status, full-week guessing/recap/restart, and original-mode stationary-card checks passed at all six documented viewport widths. Phone screenshots were reviewed; user testing remains pending.

The requested round-summary refinement moves each friend's clue, guess result and points, plus recognition results, into the header between “The dream comes into focus.” and “Dreams remembered.” Results are no longer repeated below the cards. Responsive columns accommodate up to five friends' results, with reserved space for stable cards; the local game remains Charlie, Nancy and Song. Build/type checks and all 55 tests passed, along with the full personal week and classic stationary-card checks at all six documented widths. A separate five-friend presentation fixture verified wrapping, long clues, result placement and no horizontal overflow at those widths. Phone and desktop screenshots were reviewed. User testing remains pending.

## Coding model checkpoints

These are workflow recommendations, not implementation requirements or gameplay rules. Recheck current model guidance when needed and recommend a switch to the user before starting a milestone; do not change their chosen model automatically.

- **Milestone 5:** A focused presentation change; no stronger model is necessary just to finish the in-place completion state.
- **Before Milestone 7:** Recommended checkpoint for GPT-6 Astra if available. Decoy eligibility combines shared reservations, per-player exposure, true targets, stable boards, and failure handling; Milestones 8–10 add locking, delayed reveal, and exactly-once scoring across rounds. A stronger reasoning model can be useful for implementing and reviewing these interactions.
- **Milestones 11–12:** Routine layout/copy/transition work can stay on the user's usual coding model. Recommend a stronger model if accessibility, focus, or state bugs remain difficult to resolve.
- **Future real multiplayer/backend work:** Recommend a fresh architecture and model review before implementation; this work remains outside Prototype 0.1.

OpenAI describes [GPT-6 Astra](https://developers.openai.com/api/docs/models/gpt-6-astra) as its most capable model for complex reasoning and coding. The milestone checkpoints above are project-specific judgment, not official claims about Dreamerie performance. Model choice never expands milestone scope or replaces tests and user approval.
