# Prototype 0.2: shared browser playtest

## Status and authority

**Planning authorized; implementation has not started.** Prototype 0.1 is complete and user-approved. The user wants people to play together from their own phones and desktop browsers and has authorized this plan. This does not authorize provisioning services, choosing a paid plan, publishing the app or beginning implementation.

[PROTOTYPE_PLAN.md](PROTOTYPE_PLAN.md) is the scope and milestone index. [GAME_DESIGN.md](GAME_DESIGN.md) remains the source of truth for confirmed gameplay rules; [ART_DIRECTION.md](ART_DIRECTION.md) governs presentation and writing. The proposed policies below are not confirmed gameplay rules. Record the user's decisions in GAME_DESIGN.md before implementing affected behavior.

## Goal

Let groups of 2–6 people play one complete Dream Week using real dream clues, dream cards and guesses, each from their own browser. Players can join a private room or enter a separate lobby with other solo players. Learn whether people understand the instructions, enjoy interpreting each other's clues, and understand the scoring. Retain the existing artwork, mobile layout and continuous selection/guessing flow.

The proposed experience is: join through a private invite or the solo lobby, enter a group with a display name, prepare six dream-clue/card pairs, play six guessing days, reveal results, and review the week. The host can progress the game manually; the server must also advance it when the next day is due without requiring the host to be online. The precise clock and cutoff policy remains to be decided. Nobody needs to install an app.

## Repository findings

- React, TypeScript and Vite already serve the complete local prototype; there is no server, room service, database or session system.
- `src/game/` contains allocation, selection, assignment, scoring and recap functions that can be reused. Keep these rules separate from network handlers and React.
- `src/game/board.ts` currently rejects any roster with other than two friends and selects exactly three decoys. Supporting more players requires rule changes and tests, not just extra names in the UI.
- `src/game/localGame.ts` coordinates one human and simulated friends in local memory. Its object-reference checks are local guards, not network concurrency controls.
- `src/App.tsx` uses Charlie, Nancy and Song, generates simulated selections, and has fixed 12/18-point maxima. Several components resolve accents from the static roster. A connected game must receive its identity, roster and scores from the room.
- The deck has 120 bundled illustrations. The interface already has six accent slots and a reveal summary tested with five friends, but real six-player play has not been implemented.
- There is no hosted playtest URL. The current development command binds to this computer's loopback address; sharing that address does not connect someone else's phone to the same game.

## Confirmed playtest direction

- Support **2–6 players total**, including the room creator. The minimum is now two; the previously agreed six-player maximum remains. This is a Prototype 0.2 limit, not a permanent production limit.
- **Solo players enter a separate lobby with other solo players**, from which playable groups are formed. A one-person game with simulated opponents is not the requested solo experience. Grouping, wait duration and host selection still need decisions.
- The **host can manually control progression**, normally after everyone is ready. **Day progression must also happen automatically when the next day is due** if the host does not advance it. This replaces the earlier manual-only proposal; automatic progression must work without an open browser or an online host.
- The user also requested a missed-day exception: **if the day advances without a player, use a decoy and give that player zero points for the day**. This supersedes the earlier recommendation to wait indefinitely. The exact deadline/host override, treatment of an already-prepared Dream and recognition denominator are still being clarified below. Do not implement the incomplete exception by guessing these details.

## Remaining scope proposed for approval

Keep the first connected game focused on personal dream clues and the existing recognition scoring. Preserve both local Prototype 0.1 modes for comparison; adding online shared-word mode is outside this first playtest.

Include private invite links/room codes, a separate solo-player lobby and basic grouping, display names, a room waiting screen, a fixed roster for the week, private preparation, per-player guessing boards, shared readiness, reveal, host controls, scheduled day progression, each player's scores and recap, missed-day handling and recovery after refresh or a temporary disconnect. A display name is presentation, not proof of identity: a private browser session identifies the player.

Keep the six-card hand and board, all six prepared pairs, hidden daily order, unique allocations, replacement after every commitment, own Dream first and unassignable, reversible guesses before reveal, and immutable results after reveal. Everyone's clues and guesses must be human-authored in the connected room.

The requested solo lobby and automatic daily progression are now in the plan. Exclude ranked/skill-based matchmaking, region filters, account signup, email/password flows, social login, Discord integration, native apps, PWA installation, push notifications, chat, new artwork generation, permanent Dream History, ranked standings and tie-breakers. No spectator or midweek-join UI is proposed. Basic room deadlines are in scope; recurring tournaments and calendar features beyond the approved Dream Week are not. These exclusions are prototype limits, not changes to the larger game vision.

## Decisions to settle

The directions above are confirmed. Recommendations in this table are **pending user confirmation**. Follow-up questions about day timing, solo grouping and the missed-day exception have been asked in the conversation. Do not infer approval from silence.

| Decision | Recommended playtest policy | Implementation impact |
| --- | --- | --- |
| What defines the next day? | Use a daily cutoff in one room timezone shared by all participants; exact time and timezone selection need approval. The alternative is 24 hours from each round's start. | Store authoritative deadlines, including the Day 1 preparation deadline. Device clocks/timezones must not independently advance the game. Define daylight-saving behavior if using calendar boundaries. |
| How does manual advancement affect the next deadline? | For a daily-cutoff policy, give the newly opened round a full scheduled day rather than closing it again at an imminent cutoff. Exact rescheduling needs approval. | Define the deadline after every manual transition so the host and timer cannot unexpectedly skip two days in quick succession. |
| When may an unfinished day close? | At the approved scheduled deadline; recommend that early host closure also requires explicit confirmation naming players who would receive zero points. | Automatic progression is confirmed; early closure of an unfinished day still needs approval. A disconnect alone must not immediately forfeit a player's day. |
| When does a solo group form? | Aim for six players, then form a group of 2–6 at a waiting cutoff. Starting immediately at two is the alternative. The wait duration remains undecided. | Define the grouping trigger, ordering, one-player wait state, cancellation and whether matched players must confirm before starting preparation. Do not silently fill empty seats with bots. |
| Who hosts a solo-formed room? | Propose the first joined player, with the same manual controls as a private-room host. | Host assignment is unresolved; define it before exposing controls. Automatic day progression cannot depend on this person staying online. |
| What does the decoy replace? | Retain an already-prepared Dream and valid guesses about it; use a decoy only if that Dream is missing. | The alternative is removing the absent player's Dream and scoring target. That could change an already-shown board and invalidate other players' locked guesses. Obtain a decision before changing either. |
| Who counts as “everyone” after a skip? | Count players who finished that day, excluding the Dream's author. | The alternative is counting the fixed roster. These give different recognition awards; neither is established by the zero-points instruction. |
| Joining or leaving after start? | Lock the roster when preparation starts. Reconnecting resumes an existing seat; it is not a late join. | Avoids introducing unresolved midweek allocation and fairness rules. Voluntary departure does not silently remove a player or change scores. |
| Guess readiness and unlocking? | A player is ready when every required friend's guess is locked. Unlocking before shared reveal makes them unready again; no additional final-submit button. | Resolve unlock/reveal races atomically. A reveal accepted first closes editing; an unlock accepted first blocks normal reveal or requires a new missed-day confirmation. |
| Host disconnects or the room cannot finish? | Keep the host role with its original session while scheduled progression continues. Propose an explicit host action to abandon a room, with confirmation and no unfinished-round points. | Host-transfer policy remains open, particularly for solo-formed rooms. A missing host must not stop scheduled progression. Abandoning a room is distinct from missing a day. |
| Returning to a game? | Resume the same seat in the same browser after refresh or reconnect. Cross-device transfer and recovery after clearing browser data are outside the first playtest. | Persist room state and use a protected session credential. Invite links must never grant someone an existing player's seat. |
| Prepared-pair editing? | Retain 0.1 behavior: a saved clue/card pair cannot be edited after replacement. | Avoids silently inventing card-return or replacement rules. Unsaved text and tentative card choices remain editable. |
| Room lifetime and replay? | Propose keeping completed/abandoned rooms for seven days, then expiring them. A new week uses a new room. Decide lobby and active-room retention separately. | An inactivity cleanup must not delete an active scheduled week. Background polling must not keep recaps alive indefinitely. No permanent history or destructive reset of another player's active week. |
| How much of the recap is shared? | Each player sees their own complete results, the actual dreams they guessed, and friends' guesses about their own Dream, as in 0.1. | Do not add a room-wide ranking, winner, or unrestricted matrix of everyone's guesses without a decision. |
| What if the service misses several deadlines? | Record each due transition and preserve each day's results/missed status; agree whether to catch up all overdue days or pause after recovery. | Prevent duplicate scores and silent loss of days. The catch-up policy cannot be inferred from the scheduler's restart behavior. |

### Remaining missed-day details

Before implementing skips, record exactly when a player is marked missed and whether that means missing preparation, incomplete guesses, or both. Zero points applies to that player's day; specify that it overrides both guessing and recognition awards. Decide whether their partial guesses can contribute recognition points to others, whether they remain a target, and how to present previously locked guesses against a removed target.

Define what happens when nobody or only one player finishes, including a recognition denominator of zero. Define how a player who missed preparation returns for later days without violating allocations or exposing future clues, and whether a closed day can ever be completed retroactively. Keep the fixed room roster separate from day-specific participation. Record missed status explicitly so it is distinguishable from a completed day with zero correct guesses.

Do not secretly choose a random card on behalf of the player. The requested substitute is a decoy, not a human-authored Dream. Resolve replacement timing before implementing the affected board: inserting or replacing a card after others have started guessing could violate stable-card and locked-assignment rules. Revisit the pool budget for the final substitute policy and fail atomically if eligible cards are exhausted.

### Consequences of the confirmed player range

For a fixed roster of `N` fully participating players, the existing six-card board implies one own Dream, `N - 1` friends' Dreams and `6 - N` decoys. Six fully participating players means no decoys. Missing-Dream substitutions require the separate policy above.

Preserving the strict local decoy policy means reserving `12N` cards for initial hands and six replacements per player. Each player needs `6(6 - N)` unseen decoys across the week; those decoys may recur for different players, but not for the same player. A sufficient pool is `12N + 6(6 - N)` cards, or 48–72 for 2–6 players. The 120-card deck is sufficient under these assumptions. Test allocation and exposure across every approved room size; never fall back to known cards on exhaustion.

Recognition is calculated separately for each card's author. If `c` of the other `N - 1` players guess it correctly, that author receives `c` recognition points unless `c = N - 1`, when they receive zero. Each correct guesser still earns one point. With all players participating, an individual's maximum is `2N - 3` per day and `6(2N - 3)` for the week. These are consequences of the existing experimental scoring, not new bonuses. Do not hardcode the current 3/18 maxima into online views. This calculation does not resolve recognition when someone misses a day.

**Two-player consequence:** One own Dream, one opponent's Dream and four decoys fill the board. Under the existing everyone-correct exception, recognition points are always zero: the sole opponent guessing correctly means everyone guessed correctly. Each player can earn at most one guessing point per day, six for the week. Supporting two players does not authorize a new scoring exception; flag this consequence for user review and test it explicitly.

## Technical direction to review before implementation

Keep React + TypeScript + Vite and the bundled illustrations. Use a small TypeScript service as the authority for rooms and gameplay, with durable room storage. Choose the runtime, storage, transport and hosting arrangement in milestone 0.2.0 after confirming the required playtest lifetime and access. No dependency or provider is selected by this document.

Start with simple commands and a player-specific state endpoint; short polling is a reasonable first transport to evaluate. A socket framework is not inherently required. Decide based on the actual hosting environment and reconnect needs, without building a general networking framework.

- The server owns the roster, deal, replacement draws, hidden order, per-player exposure, boards, saved clues, assignments and revealed results. The browser sends an intended action, not replacement state or claimed points.
- Apply each accepted command atomically, including persistence. Use explicit room/week/round identity, a state revision and retry identifiers. Retries return the prior outcome instead of drawing again, joining twice or scoring twice. Stale/conflicting actions receive a clear response and fresh permitted state.
- Generate each player's board once per round. Refresh, polling and retries must not reshuffle it or record extra exposure. Preparing a day for all players must either succeed together or leave the room unchanged.
- Authorize access using a private session bound to room membership. A room code or display name alone must not authorize another player's actions. Check host-only actions on the server. Keep session credentials out of shared invite URLs and ordinary logs.
- Return only information the recipient may currently see. Never send the full `DreamWeek`, opponents' hands, future clues/order, ownership mappings, private assignments, RNG seeds or early correctness to the browser. The host receives the same restricted gameplay view as any player.
- Public artwork files can remain available to every browser; it is the secret allocation and clue-to-card associations that must stay private. Hiding labels in React is insufficient for an online room.
- Make the distinction between saving, saved and disconnected clear. Only acknowledge a commitment after the server accepts it. Retry safely after uncertain responses. Do not queue offline gameplay that pretends to be accepted.
- Persist seats, accepted preparation, fixed boards, guesses, phase and results so refresh, a suspended phone tab and a service restart do not reset the week. Document limits for lost browser credentials separately from network recovery.
- Persist solo-lobby membership and group assignment. Joining, leaving, matching and reconnecting must not put one session into two groups or exceed six seats. Form a room and reserve its members atomically. Keep private invite rooms separate from the solo pool unless the user explicitly requests otherwise.
- Store deadlines and run due transitions on the server with no connected clients required. Manual actions and scheduled jobs must use the same atomic phase transition and exactly-once scoring path. Reject stale jobs for an already-advanced round. Recover pending jobs after restart; verify the selected host supports work while every browser is closed.
- At a deadline, close the current day's guesses, resolve its confirmed missing-player policy, store results and open the next phase consistently. Keep previous results accessible to players who return after automatic advancement. Decide how long the reveal remains current before the next day opens; do not require everyone to click a reveal button to unblock a due transition.
- Before remote hosting, verify transport protection, session handling, request validation, room isolation and basic limits on room creation/join attempts. Select exact mechanisms with the service design, not by inventing account infrastructure.

The proposed room phases are lobby, preparation, guessing, revealed and complete, with an explicit closed/expired state. The solo waiting pool exists before room assignment and is separate from the room lobby. Readiness belongs to players within a phase. Visibility, legal commands, deadlines and host controls must be written down for each phase before handlers are implemented.

## Milestones

These are new **0.2 milestones**, not continuations of the completed 0.1 numbering. All are pending. Implement only the explicitly requested milestone, run its checks, and stop for user testing and approval.

### 0.2.0 — Confirm playtest policies and service design

**Deliverable:** Record answers to the decision table, the phase/action/visibility/deadline contract, the solo grouping policy, and a concrete service/storage/hosting proposal with actual costs or limits checked at selection time. Recommend a stronger reasoning model before the authority, privacy, scheduling and concurrency work if it would materially help; leave the choice to the user.

**Expected files:** This plan, GAME_DESIGN.md and the scope index; a short technical decision document only if needed to keep the plan readable.

**Completion:** Each affected policy has an explicit decision. Implementation commands, dependencies and likely file additions for 0.2.1 are reviewable. No services are provisioned and no app code is changed in this milestone.

### 0.2.1 — Support the approved roster in game rules

**Deliverable:** Replace three-player assumptions in the shared rules with the approved roster, while preserving the playable local modes. Use test fixtures for real-player inputs; do not add a room UI or networking yet.

**Expected files:** Relevant files in `src/game/`, roster/score presentation helpers in `src/data/`, and rule tests in `tests/`. Modify local call sites only where needed for compatibility.

**Completion:** Every size from two through six can prepare six pairs and construct six valid boards per player; cards remain unique, own cards are excluded from assignments, decoys follow private exposure rules, and hidden order stays hidden. Test invalid sizes, exhausted pools, incomplete assignments, recognition for none/some/everyone, two-player zero recognition and complete per-player recaps. Implement and test only the missed-day semantics resolved in 0.2.0, including the zero-point override and chosen denominator. Existing 0.1 behavior and tests still pass.

### 0.2.2 — Private rooms, sessions and a waiting room

**Deliverable:** Implement the chosen minimal service and storage, room creation/invites, joining by display name, stable player IDs and accents, host identity and refresh recovery. Provide a browser waiting room. This milestone stops before dealing cards.

**Expected files:** A small `server/` directory and server tests; focused room/session client code and waiting-room components in `src/`; package/config changes required by the selected stack; README run instructions. Final paths are specified in 0.2.0.

**Completion:** Separate browser sessions join the same room, receive the correct identities, and resume after refresh. Joining a full, started, closed or expired room gives clear feedback under approved policies. Duplicate requests and duplicate names cannot impersonate a player; rooms cannot read or mutate each other. Decide a clear duplicate-display-name policy before the join UI is finalized. State survives the chosen service restart test.

### 0.2.3 — Solo-player lobby and group formation

**Deliverable:** Add a solo entry point and a separate shared waiting pool. Form rooms of 2–6 using the approved grouping, start and host policies; let a waiting player cancel or reconnect without duplicating their seat. Do not mix solo entrants into private rooms.

**Expected files:** Focused queue/grouping functions and service handlers, durable membership records, lobby components and concurrency tests.

**Completion:** A lone player sees a waiting state, never a playable one-person game. Group formation respects the approved trigger and capacity, assigns each session once and directs all members to the same room. Test concurrent joins, cancellation against matching, reconnect, duplicate requests and a service restart. No bots, ranking or additional matchmaking criteria.

### 0.2.4 — Private preparation shared across devices

**Deliverable:** Start the fixed-roster week and connect the existing six-pair preparation flow to authoritative saving and replacement. Show who has finished without exposing their clues or cards. Preserve local comparison modes separately.

**Expected files:** Room command/view handlers, storage serialization, focused browser state integration, preparation components, `src/App.tsx` composition and tests. Do not move game rules into App.

**Completion:** Every player has a distinct hand and can save six valid pairs. Concurrent choices, repeated taps and response loss cannot duplicate cards or commitments. “Remembered” appears only after acceptance. Refresh resumes accepted work. Day 2 follows the approved readiness/missing-preparation policy. Network payload tests prove opponents' preparation remains private.

### 0.2.5 — Guessing, unlocking and shared readiness

**Deliverable:** Open each guessing day on all devices using fixed private boards and sequential friend prompts. Connect lock/unlock actions, progress and waiting states. This milestone stops before releasing answers.

**Expected files:** Room transitions and player views; client synchronization; `DreamGuessingBoard`, `CardGallery`, roster accents and tests as needed.

**Completion:** A player can change guesses until reveal under the approved policy. Other players see only permitted readiness, not their choices. Reconnect restores the same board and guesses. Polling and remote updates do not move cards, erase unsaved local interaction unnecessarily, or steal focus. Own-card, duplicate assignment, stale-day and out-of-order commands are rejected server-side.

### 0.2.6 — Shared reveal and exactly-once scoring

**Deliverable:** Implement the shared transition used by host controls and the upcoming scheduler. Gate normal early reveal on complete assignments; apply the explicitly approved missed-day closure policy when applicable. Store all players' round results and missed statuses together and show each person their results in the existing header above the cards. Open the next day only after the current day has been resolved.

**Expected files:** Room reveal/advance handlers, scoring integration, result views, scoring help and tests.

**Completion:** All devices agree on the phase and their scores. Before reveal, responses contain no answers; after reveal, no assignment can change. Race an unlock against reveal, two reveal requests against each other, a last submission against missed-day closure, and retries against advancement. Verify one stored outcome per player per round, atomic recognition calculations, zero points for a missed day and no score changes on refresh/reconnect. Test nobody/one person finishing according to the approved policy.

### 0.2.7 — Automatic daily progression

**Deliverable:** Persist and display room deadlines, run server-side due transitions without open browsers, and reconcile host advancement with the approved clock, missed-day and rescheduling policies. Preserve each resolved day's results for later viewing.

**Expected files:** Small scheduling integration in the service, persisted deadline/transition records, deadline and previous-results UI, clock-controlled tests and hosting/run documentation.

**Completion:** Advance a due room with all browsers closed and the host offline. Test Day 1's preparation boundary, every guessing-day boundary and the final-week transition. Use a controllable clock to verify host-versus-timer races, repeated jobs, last-moment guesses, empty/incomplete days, service downtime and catch-up. Check room-timezone/daylight-saving boundaries if the approved policy uses them. No round is resolved or scored twice, and early manual progression does not accidentally shorten the next day contrary to policy.

### 0.2.8 — Complete the week and recovery paths

**Deliverable:** Play all six guessing days through each player's inspectable recap. Finish the approved close/expiry/new-room flow and clear messages for disconnected, abandoned or expired sessions. Verify recovery across every phase, extending the refresh support already required in earlier milestones.

**Expected files:** Room lifecycle handlers/storage, recap and connection UI, end-to-end checks and README limitations.

**Completion:** Complete real-input weeks through both private invitations and solo grouping; all recap clues, cards, guesses and totals match stored results. Exercise both host-driven and scheduled progression. Interrupt preparation, guessing and reveal, then reconnect without rerolling or losing accepted work. A backgrounded phone catches up and can inspect results from days advanced while it was away. Expiry/closure cannot leave actionable stale controls. Starting another room does not silently erase someone else's recap.

### 0.2.9 — Hosted phone-and-desktop playtest

**Deliverable:** Prepare a concrete reviewed deployment and operating instructions, then publish when authorized. Provide a playtest URL with private-room and solo-lobby entry, reachable from separate devices and networks, and verify scheduled work on that host. Agree on playtest access before publishing; a local development server alone is not completion.

**Expected files:** Deployment configuration for the selected host, server/environment documentation, README playtest instructions and a short feedback record. Keep credentials out of committed files.

**Completion:** Play complete weeks with human participants on physical phones and desktop browsers, including two-player and six-player rooms and solo entry. Check the documented 320, 375, 390, 430, 768 and 1440px layouts, mobile Safari and Android Chrome where available, keyboard interaction, hold/zoom, focus and reduced motion. Exercise refresh, background/resume, network loss and automatic advancement without the host. Report unavailable device checks explicitly. Record whether people understand clue creation, recognition scoring, the two-player consequence and the all-correct exception, and enjoy the reveals. Stop for user acceptance.

## Validation and handoff

After implementation milestones, run the project's build, TypeScript checks and tests, plus any service checks introduced by the approved stack. Add meaningful tests for authority, privacy, invariants, concurrency and recovery. Check network responses, not only rendered screens. Use distinct browser sessions so tests cannot accidentally share one player's identity. Keep the accepted local demo working.

Preserve the illustrated theme, six-card geometry, three-card desktop/two-card phone layout, large active dream clues, matching player accents, explicit unlock controls and results above the cards. Loading and waiting states should explain what the player can do without dominating the artwork. Controls must work without hover.

At each milestone, report what runs, what remains simulated or unavailable, how to test it and the relevant Conventional Commit commands, including push. Never commit or push automatically. This documentation pass needs link/content review and `git diff --check`, not runtime tests.

**Next action:** Review this plan and resolve 0.2.0. No implementation milestone is authorized by completion of this document alone.
