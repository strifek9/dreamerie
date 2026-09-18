# Prototype 0.2: shared browser playtest

## Status and authority

**Milestone 0.2.6 is implemented and awaiting user testing.** Shared play through 0.2.5 is approved by the user’s instruction to proceed. The user accepted all recommended timing options: full calendar-day windows for preparation and manual day opening, immediate automatic reveal/advancement, and catch-up of every overdue day after downtime. Prototype 0.1 remains available separately.

The host can start, open guessing days, reveal results and finish a week with 2–6 actual players. Late joiners prepare unopened Dreams and begin guessing the next day. Missing preparation or incomplete guesses earn zero total points under the confirmed policy in GAME_DESIGN.md. Automatic midnight progression is implemented; room cleanup/closure and hosting remain separate work. No hosted services have been provisioned or purchased.

[PROTOTYPE_PLAN.md](PROTOTYPE_PLAN.md) is the scope and milestone index. [GAME_DESIGN.md](GAME_DESIGN.md) remains the source of truth for confirmed gameplay rules; [ART_DIRECTION.md](ART_DIRECTION.md) governs presentation and writing. The confirmed shared-play policies are recorded in GAME_DESIGN.md. The timing decisions below are confirmed; the remaining lifecycle recommendations still need decisions.

## Goal

Let groups of 2–6 people play one complete Dream Week using real dream clues, dream cards and guesses, each from their own browser. Players join private rooms. The user has deferred solo play and matchmaking. Learn whether people understand the instructions, enjoy interpreting each other's clues, and understand the scoring. Retain the existing artwork, mobile layout and continuous selection/guessing flow.

The proposed experience is: join through a private invite, enter a group with a display name, prepare six dream-clue/card pairs, play six guessing days, reveal results, and review the week. The host can progress the game manually; the server must also advance it when the next day is due without requiring the host to be online. The confirmed cutoff is midnight America/Chicago; the preparation, manual advancement and recovery policies below are confirmed. Nobody needs to install an app.

## Repository findings

- React, TypeScript and Vite serve the complete local prototype; `server/` now supplies persistent private rooms and browser sessions through Fastify and SQLite.
- `src/game/` contains allocation, selection, assignment, scoring and recap functions that can be reused. Keep these rules separate from network handlers and React.
- `src/game/board.ts` now supports 2–6 players, selecting `6 - N` decoys for `N` players. Shared preparation queries live in `src/game/preparation.ts`, independently of local simulation. This rule support does not add a room UI.
- `src/game/localGame.ts` coordinates one human and simulated friends in local memory. Its object-reference checks are local guards, not network concurrency controls.
- `src/App.tsx` separates the room entry path from the existing Charlie/Nancy/Song local demo. `src/rooms/` receives identities and fixed accent slots from the service and does not initialize a simulated week. The joined-room path now connects human preparation, fixed boards, lock/unlock, shared reveal and private results; the practice link explicitly identifies its simulated players.
- The deck has 120 bundled illustrations. The interface has six accent slots and a reveal summary tested with five friends. Six-player rules have full-week automated coverage; connected service tests also complete whole weeks with two and six actual player sessions.
- There is no hosted playtest URL. The current development command binds to this computer's loopback address; sharing that address does not connect someone else's phone to the same game.

## Confirmed playtest direction

- Support **2–6 players total**, including the room creator. The minimum is now two; the previously agreed six-player maximum remains. This is a Prototype 0.2 limit, not a permanent production limit.
- **Solo play is deferred.** The user wants to figure it out later. Do not implement solo entry, queues or matchmaking in Prototype 0.2.
- The **host can manually control progression**, normally after everyone is ready. **Day progression happens automatically at midnight in America/Chicago** if the host does not advance it. The user confirmed this shared cutoff for the initial playtest. Automatic progression must work without an open browser or an online host; manual day opening grants a fresh full-calendar-day window as specified below.
- The approved missed-day policy gives an absent or unfinished player zero total points, retains any prepared Dream as a target, excludes partial guesses from recognition, and counts only completed guessers toward “everyone.” Missing Dreams are replaced with anonymous decoys when the day opens. Host-confirmed early closure and next-day late joining are implemented; a disconnect alone does not forfeit accepted complete work.

## Approved connected scope and later milestones

Keep the first connected game focused on personal dream clues and the existing recognition scoring. Preserve both local Prototype 0.1 modes for comparison; adding online shared-word mode is outside this first playtest.

Include private invite links/room codes, display names, a room waiting screen, a roster of up to six with next-day late joining, private preparation, per-player guessing boards, shared readiness, reveal, host controls, scheduled day progression, each player's scores and recap, missed-day handling and recovery after refresh or a temporary disconnect. A display name is presentation, not proof of identity: a private browser session identifies the player.

Keep the six-card hand and board, all six prepared pairs, hidden daily order, unique allocations, replacement after every commitment, own Dream first and unassignable, reversible guesses before reveal, and immutable results after reveal. Everyone's clues and guesses must be human-authored in the connected room.

Automatic daily progression remains in scope. Exclude solo play and matchmaking, region filters, account signup, email/password flows, social login, Discord integration, native apps, PWA installation, push notifications, chat, new artwork generation, permanent Dream History, ranked standings and tie-breakers. Midweek joining is supported until the last guessing day opens; spectator mode is excluded. Basic room deadlines are in scope; recurring tournaments and calendar features beyond the approved Dream Week are not. These exclusions are prototype limits, not changes to the larger game vision.

**Future thought, not a confirmed rule:** The user suggested pairing solo players with random other solo players and carrying only their own correct-guess points toward a weekly total. Pairing frequency, identity continuity and scoring are undecided. Keep this idea separate from private-room recognition scoring and implement none of it now.

## Decisions to settle

The gameplay decisions below are settled for this playtest:

- Late joins are allowed until the last guessing day opens, within six-player capacity. Joining during Day 1 allows Day 2 participation; later joins prepare only unopened Dreams and begin guessing next day. Existing day membership and boards never change.
- The host may close preparation or guessing early after confirming unfinished players. Incomplete preparation lists do not disclose the hidden next slot. An accepted complete set of guesses remains valid while disconnected.
- A missing current-day Dream means no guessing board and zero points; anonymous decoys fill other players’ six-card boards. A prepared Dream remains a target even if its author does not finish guessing.
- Required guesses are ready when all are locked; unlocking makes the player unready. Incomplete guesses earn zero total points, including recognition, and never contribute recognition to others. Only completed guessers count toward “everyone”; no completed guessers means zero recognition. Correct finished guessers keep their points.
- Nobody prepared means everyone misses. One prepared player has no required guesses and scores zero. Missing preparation can be completed only for unopened future Dreams, with no retroactive editing.
- Saved clue/card pairs remain immutable after replacement. Personal recaps show actual cards, clues, submitted and unanswered guesses, received completed guesses, points and missed status. No unrestricted guess matrix or room ranking is added.
- Same-browser credentials resume an existing seat. Invite links cannot recover another person’s seat. A new week uses a new room without erasing the previous one.

The user approved these scheduling policies for 0.2.6:

- A newly started week or manually opened guessing day closes at midnight after the next full Chicago calendar day (Monday evening → Wednesday 12:00 AM). Automatically opened days close at the following midnight. Use calendar arithmetic through daylight-saving changes, not elapsed 24-hour additions.
- Automatic preparation expiry opens Day 2. Guessing expiry reveals and scores the day, then opens the next immediately; Day 7 finishes the week. Prior results remain accessible. A manual reveal does not extend the current cutoff; a manual next-day action resets it to a fresh full-day window.
- After downtime, process every overdue deadline using the same missed-day policy, anchored to the persisted schedule. No client timestamp or open browser is needed. Existing manual rooms get one fresh current-phase deadline on upgrade, with no retroactive missed days.

Remaining recommendations require decisions before the affected lifecycle milestone:

| Decision | Pending recommendation | Implementation impact |
| --- | --- | --- |
| Host disconnect, departure or abandonment | Keep the original host while scheduled progression continues; explicit room abandonment could be added later. | No host transfer, seat removal or close-room action is implemented. |
| Room retention | Seven days for completed/abandoned rooms is proposed; lobby/active retention is separate. | Do not silently delete active weeks or implement an expiry schedule without approval. |

Day participation is stored separately from room membership. Substitute cards are anonymous decoys, never fabricated human clues or selections. Boards and exposure are committed together; insufficient eligible cards fail without partial changes.

### Consequences of the confirmed player range

For a fixed roster of `N` fully participating players, the existing six-card board implies one own Dream, `N - 1` friends' Dreams and `6 - N` decoys. Six fully participating players means no decoys. For a day with P prepared Dreams, each eligible player sees their own Dream, P - 1 targets and 6 - P anonymous decoys. Missing or late players never insert cards into an existing board.

Preserving the strict local decoy policy means reserving `12N` cards for initial hands and six replacements per player. Each player needs `6(6 - N)` unseen decoys across the week; those decoys may recur for different players, but not for the same player. A sufficient pool is `12N + 6(6 - N)` cards, or 48–72 for 2–6 players. The 120-card deck is sufficient under these assumptions. Test allocation and exposure across every approved room size; never fall back to known cards on exhaustion.

Recognition is calculated separately for each card's author. If `c` of the other `N - 1` players guess it correctly, that author receives `c` recognition points unless `c = N - 1`, when they receive zero. Each correct guesser still earns one point. With all players participating, an individual's maximum is `2N - 3` per day and `6(2N - 3)` for the week. These are consequences of the existing experimental scoring, not new bonuses. Do not hardcode the current 3/18 maxima into online views. With missed participation, use the completed-guesser denominator and zero-total override above.

**Two-player consequence:** One own Dream, one opponent's Dream and four decoys fill the board. Under the existing everyone-correct exception, recognition points are always zero: the sole opponent guessing correctly means everyone guessed correctly. Each player can earn at most one guessing point per day, six for the week. Supporting two players does not authorize a new scoring exception; flag this consequence for user review and test it explicitly.

## Technical direction to review before implementation

Keep React + TypeScript + Vite and the bundled illustrations. The selected Fastify 5 / better-sqlite3 service and ordinary HTTP polling are installed in 0.2.2. Node 24 remains the hosting target; local Windows checks use Node 22.18. [The technical design](PROTOTYPE_0_2_TECHNICAL_DESIGN.md) contains the contracts and a paid Render service/disk proposal. Hosting has not been purchased or provisioned.

Start with simple commands and a player-specific state endpoint; short polling is a reasonable first transport to evaluate. A socket framework is not inherently required. Decide based on the actual hosting environment and reconnect needs, without building a general networking framework.

- The server owns the roster, deal, replacement draws, hidden order, per-player exposure, boards, saved clues, assignments and revealed results. The browser sends an intended action, not replacement state or claimed points.
- Apply each accepted command atomically, including persistence. Use explicit room/week/round identity, a state revision and retry identifiers. Retries return the prior outcome instead of drawing again, joining twice or scoring twice. Stale/conflicting actions receive a clear response and fresh permitted state.
- Generate each player's board once per round. Refresh, polling and retries must not reshuffle it or record extra exposure. Preparing a day for all players must either succeed together or leave the room unchanged.
- Authorize access using a private session bound to room membership. A room code or display name alone must not authorize another player's actions. Check host-only actions on the server. Keep session credentials out of shared invite URLs and ordinary logs.
- Return only information the recipient may currently see. Never send the full `DreamWeek`, opponents' hands, future clues/order, ownership mappings, private assignments, RNG seeds or early correctness to the browser. The host receives the same restricted gameplay view as any player.
- Public artwork files can remain available to every browser; it is the secret allocation and clue-to-card associations that must stay private. Hiding labels in React is insufficient for an online room.
- Make the distinction between saving, saved and disconnected clear. Only acknowledge a commitment after the server accepts it. Retry safely after uncertain responses. Do not queue offline gameplay that pretends to be accepted.
- Persist seats, accepted preparation, fixed boards, guesses, phase and results so refresh, a suspended phone tab and a service restart do not reset the week. Document limits for lost browser credentials separately from network recovery.
- Store deadlines and run due transitions on the server with no connected clients required. Manual actions and scheduled jobs must use the same atomic phase transition and exactly-once scoring path. Reject stale jobs for an already-advanced round. Recover pending jobs after restart; verify the selected host supports work while every browser is closed.
- At a deadline, close the current day's guesses, resolve its confirmed missing-player policy, store results and open the next phase consistently. Keep previous results accessible to players who return after automatic advancement. Automatic reveal immediately opens the next day; do not require everyone to click a reveal button to unblock a due transition.
- Before remote hosting, verify transport protection, session handling, request validation, room isolation and basic limits on room creation/join attempts. Select exact mechanisms with the service design, not by inventing account infrastructure.

The proposed room phases are lobby, preparation, guessing, revealed and complete, with an explicit closed/expired state. Readiness belongs to players within a phase. Visibility, legal commands, deadlines and host controls must be written down for each phase before handlers are implemented.

## Milestones

These are new **0.2 milestones**, not continuations of the completed 0.1 numbering. 0.2.1–0.2.5 are approved. Milestone 0.2.6 adds automatic progression under the user-confirmed timing policy and awaits testing. Historical validation below records earlier handoffs; current status takes precedence.

### 0.2.0 — Confirm playtest policies and service design

**Status:** Service design is documented. Midnight America/Chicago, late joining and missed-day scoring are confirmed. Solo play is deferred; private-room lifecycle questions remain open, so this milestone is not yet fully complete.

**Deliverable:** Record answers to the decision table, the phase/action/visibility/deadline contract, and a concrete service/storage/hosting proposal with actual costs or limits checked at selection time. Recommend a stronger reasoning model before the authority, privacy, scheduling and concurrency work if it would materially help; leave the choice to the user.

**Expected files:** This plan, GAME_DESIGN.md and the scope index; a short technical decision document only if needed to keep the plan readable.

**Completion:** Each affected policy has an explicit decision. Implementation commands, dependencies and likely file additions for 0.2.1 are reviewable. No services are provisioned and no app code is changed in this milestone.

### 0.2.1 — Support the approved roster in game rules

**Status:** Implemented and user-approved. Scope is fully participating players. Missing-player scoring and deadlines remain later work; waiting-room infrastructure is in 0.2.2.

**Implementation:** Validate 2–6 distinct, nonempty player IDs before randomness. Build a six-card board with the own Dream first, all other players' Dreams and enough eligible decoys, including zero at six players. Extract preparation readiness from simulation. Validate the complete participant roster, week/round identity and board before scoring; record the guesser's ID with each result. Reject mixed-player/duplicate score totals and wrong-player/wrong-week recaps. Keep existing local modes and their UI.

**Validation:** All 70 tests and build/type checks pass. New tests cover both modes at every size through six full rounds per player with the minimum sufficient card pool, replacement through the sixth choice, independent exposure, current-clue privacy, unlocking, recognition outcomes, zero-decoy boards, malformed rosters/rounds, exhaustion and individual recaps. Headless Edge replayed both local modes through preparation, all six guessing days, recap and restart at 320, 375, 390, 430, 768 and 1440px, including image inspection and stable card/scroll checks. Larger rosters are verified in rule tests; the browser still presents three players.

**Deliverable:** Replace three-player assumptions in the shared rules with the approved roster, while preserving the playable local modes. Use test fixtures for real-player inputs; do not add a room UI or networking yet.

**Expected files:** Relevant files in `src/game/`, roster/score presentation helpers in `src/data/`, and rule tests in `tests/`. Modify local call sites only where needed for compatibility.

**Completion:** Every size from two through six can prepare six pairs and construct six valid boards per player; cards remain unique, own cards are excluded from assignments, decoys follow private exposure rules, and hidden order stays hidden. Test invalid sizes, exhausted pools, incomplete assignments, recognition for none/some/everyone, two-player zero recognition and complete per-player recaps. Implement and test only the missed-day semantics resolved in 0.2.0, including the zero-point override and chosen denominator. Existing 0.1 behavior and tests still pass.

### 0.2.2 — Private rooms, sessions and a waiting room

**Status:** Implemented and approved by the user’s request to connect gameplay. At this milestone, no dealing, start/leave/close controls, automatic expiry, gameplay commands or scheduling were added. The subsequent shared-play work adds start and gameplay commands.

**Implementation policy:** Display names are 1–24 normalized characters, unique per room ignoring case, repeated whitespace and Unicode compatibility differences. Names never authenticate or rename a seat. A browser's protected 30-day session resumes its existing membership; no cross-device/lost-cookie recovery is provided. All members can share the private invitation. New rooms have no expiry deadline while retention remains undecided. Defensive started/closed/expired join checks are tested using stored-state fixtures; no transition into those phases is available yet.

**Validation:** Build/type checks and all 81 tests pass. Eleven service tests cover distinct seats, six-slot capacity under concurrent requests, safe retries, name collisions, room isolation, request validation, origin/CSRF controls, restart persistence and credential expiry. Six isolated Edge browser sessions tested invitations, refresh, full-room and duplicate-name feedback, lost-response retry after refresh, offline/reconnect and stable focus. Entry and six-player waiting layouts pass 320, 375, 390, 430, 768 and 1440px checks. Both local modes still pass full-week browser regressions. Windows native SQLite installation and compiled service/static frontend are validated locally; hosted and physical-device checks remain 0.2.8.

**Deliverable:** Implement the chosen minimal service and storage, room creation/invites, joining by display name, stable player IDs and accents, host identity and refresh recovery. Provide a browser waiting room. This milestone stops before dealing cards.

**Expected files:** A small `server/` directory and server tests; focused room/session client code and waiting-room components in `src/`; package/config changes required by the selected stack; README run instructions. Final paths are specified in 0.2.0.

**Completion:** Separate browser sessions join the same room, receive the correct identities, and resume after refresh. Joining a full, started, closed or expired room gives clear feedback under approved policies. Duplicate requests and duplicate names cannot impersonate a player; rooms cannot read or mutate each other. Decide a clear duplicate-display-name policy before the join UI is finalized. State survives the chosen service restart test.

### 0.2.3 — Private preparation shared across devices

**Status:** Implemented in the user-authorized combined shared-play handoff and approved by the instruction to proceed. Server-owned dealing and replacement, private saved pairs, actual player names, readiness, same-seat recovery, safe command retries, and remaining-Dream preparation for missing/late players.

**Deliverable:** Start the shared week and connect the existing six-pair preparation flow to authoritative saving and replacement. Show who has finished without exposing their clues or cards. Preserve local comparison modes separately.

**Expected files:** Room command/view handlers, storage serialization, focused browser state integration, preparation components, `src/App.tsx` composition and tests. Do not move game rules into App.

**Completion:** Every player has a distinct hand and can save six valid pairs. Concurrent choices, repeated taps and response loss cannot duplicate cards or commitments. “Remembered” appears only after acceptance. Refresh resumes accepted work. Day 2 follows the approved readiness/missing-preparation policy. Network payload tests prove opponents' preparation remains private.

### 0.2.4 — Guessing, unlocking and shared readiness

**Status:** Implemented in the user-authorized combined shared-play handoff and approved by the instruction to proceed. Fixed per-player six-card boards, current friend clues, server-authorized lock/unlock, private readiness, immutable day membership and next-day late-join eligibility.

**Deliverable:** Open each guessing day on all devices using fixed private boards and sequential friend prompts. Connect lock/unlock actions, progress and waiting states. Its guessing deliverable is now connected to 0.2.5 reveal in this combined handoff.

**Expected files:** Room transitions and player views; client synchronization; `DreamGuessingBoard`, `CardGallery`, roster accents and tests as needed.

**Completion:** A player can change guesses until reveal under the approved policy. Other players see only permitted readiness, not their choices. Reconnect restores the same board and guesses. Polling and remote updates do not move cards, erase unsaved local interaction unnecessarily, or steal focus. Own-card, duplicate assignment, stale-day and out-of-order commands are rejected server-side.

### 0.2.5 — Shared reveal and exactly-once scoring

**Status:** Implemented in the user-authorized combined shared-play handoff and approved by the instruction to proceed. Host reveal/advance, explicit early-closure confirmation, zero missed-day totals, completed-guesser recognition, atomic stored outcomes, persistent personal recaps and inspection.

**Deliverable:** Implement the shared transition used by host controls and the upcoming scheduler. Gate normal early reveal on complete assignments; apply the explicitly approved missed-day closure policy when applicable. Store all players' round results and missed statuses together and show each person their results in the existing header above the cards. Open the next day only after the current day has been resolved.

**Expected files:** Room reveal/advance handlers, scoring integration, result views, scoring help and tests.

**Completion:** All devices agree on the phase and their scores. Before reveal, responses contain no answers; after reveal, no assignment can change. Race an unlock against reveal, two reveal requests against each other, a last submission against missed-day closure, and retries against advancement. Verify one stored outcome per player per round, atomic recognition calculations, zero points for a missed day and no score changes on refresh/reconnect. Test nobody/one person finishing according to the approved policy.

### 0.2.6 — Automatic daily progression

**Status:** Implemented; awaiting user testing. A persisted schedule, shared host/timer transitions, a 15-second server loop, startup catch-up and deadline checks on room access/commands implement the approved timing policies. The UI shows the cutoff in Chicago time and retains prior results.

**Validation:** 109 tests and build/type checks pass. Scheduling tests cover both DST changes, leap/year boundaries, no-browser advancement, exact-cutoff commands, stale jobs, host reveal/advance and receipt retries, full-week downtime catch-up, empty days, late joins at the final day, upgrade/restart preservation and transaction rollback/retry. Independent Edge sessions pass automatic preparation, guessing and final rollover, missed-day history/inspection, stable lock/unlock layouts, and six responsive sizes (320, 375, 390, 430, 768, 1440px). The displayed Chicago deadline stays correct with the browser set to Tokyo. Physical devices and hosted unattended operation remain later validation.

**Deliverable:** Persist and display room deadlines, run server-side due transitions without open browsers, and reconcile host advancement with the approved clock, missed-day and rescheduling policies. Preserve each resolved day's results for later viewing.

**Expected files:** Small scheduling integration in the service, persisted deadline/transition records, deadline and previous-results UI, clock-controlled tests and hosting/run documentation.

**Completion:** Advance a due room with all browsers closed and the host offline. Test Day 1's preparation boundary, every guessing-day boundary and the final-week transition. Use a controllable clock to verify host-versus-timer races, repeated jobs, last-moment guesses, empty/incomplete days, service downtime and catch-up. Check room-timezone/daylight-saving boundaries if the approved policy uses them. No round is resolved or scored twice, and early manual progression does not accidentally shorten the next day contrary to policy.

### 0.2.7 — Complete the week and recovery paths

**Status:** Personal full-week recap, card inspection, accepted-command recovery and a separate new-room entry are already supplied by the authorized shared-play handoff. Scheduled catch-up is now supplied by 0.2.6; remaining close/expiry and room-lifecycle work is pending; this milestone is not complete.

**Deliverable:** Play all six guessing days through each player's inspectable recap. Finish the approved close/expiry/new-room flow and clear messages for disconnected, abandoned or expired sessions. Verify recovery across every phase, extending the refresh support already required in earlier milestones.

**Expected files:** Room lifecycle handlers/storage, recap and connection UI, end-to-end checks and README limitations.

**Completion:** Complete real-input weeks through private invitations; all recap clues, cards, guesses and totals match stored results. Exercise both host-driven and scheduled progression. Interrupt preparation, guessing and reveal, then reconnect without rerolling or losing accepted work. A backgrounded phone catches up and can inspect results from days advanced while it was away. Expiry/closure cannot leave actionable stale controls. Starting another room does not silently erase someone else's recap.

### 0.2.8 — Hosted phone-and-desktop playtest

**Deliverable:** Prepare a concrete reviewed deployment and operating instructions, then publish when authorized. Provide a playtest URL with private-room entry, reachable from separate devices and networks, and verify scheduled work on that host. Agree on playtest access before publishing; a local development server alone is not completion.

**Expected files:** Deployment configuration for the selected host, server/environment documentation, README playtest instructions and a short feedback record. Keep credentials out of committed files.

**Completion:** Play complete weeks with human participants on physical phones and desktop browsers, including two-player and six-player rooms. Check the documented 320, 375, 390, 430, 768 and 1440px layouts, mobile Safari and Android Chrome where available, keyboard interaction, hold/zoom, focus and reduced motion. Exercise refresh, background/resume, network loss and automatic advancement without the host. Report unavailable device checks explicitly. Record whether people understand clue creation, recognition scoring, the two-player consequence and the all-correct exception, and enjoy the reveals. Stop for user acceptance.

## Validation and handoff

For this shared-play handoff, 100 automated tests and frontend/server build/type checks pass. Tests cover full two- and six-person HTTP weeks, 2–6-player allocation/exposure, private payloads, migration, missed-day scoring, late joins, concurrent commands, unlock/reveal ordering, retries and restart persistence. Independent Edge sessions complete shared preparation through six reveals and inspectable recaps; a second scenario checks missing preparation and next-day joining. Layout checks cover 320, 375, 390, 430, 768 and 1440px, including six players with 24-character names/80-character clues and incomplete reveals. Both local modes pass full-week, recap-inspection and stable-layout regressions. A deliberately lost save response survives refresh and a same-command retry without an extra commitment or replacement. These are desktop browser sessions and emulated widths, not physical-phone or hosted tests.

After implementation milestones, run the project's build, TypeScript checks and tests, plus any service checks introduced by the approved stack. Add meaningful tests for authority, privacy, invariants, concurrency and recovery. Check network responses, not only rendered screens. Use distinct browser sessions so tests cannot accidentally share one player's identity. Keep the accepted local demo working.

Preserve the illustrated theme, six-card geometry, three-card desktop/two-card phone layout, large active dream clues, matching player accents, explicit unlock controls and results above the cards. Loading and waiting states should explain what the player can do without dominating the artwork. Controls must work without hover.

At each milestone, report what runs, what remains simulated or unavailable, how to test it and the relevant Conventional Commit commands, including push. Never commit or push automatically. Documentation-only edits need link/content review; gameplay changes require the runtime checks above.

**Next action:** User-test the displayed deadline, normal host controls and preserved results. The scheduler checks use an injected clock for immediate verification. After acceptance, agree on the remaining 0.2.7 room lifecycle policies before implementing them. Physical phone/remote-browser play still needs the later hosted setup.
