# Prototype 0.2 technical design

## Status

Milestone **0.2.0** service-design deliverable. The user approved moving forward with the [0.2 plan](PROTOTYPE_0_2_PLAN.md). This document selects an implementation direction and proposes hosting; it does not provision anything. No application code, dependencies or infrastructure have been changed.

The user confirmed automatic rollover at **midnight in America/Chicago** for the first playtest. Solo play is deferred. Incomplete-day scoring and private-room lifecycle details still need decisions. [GAME_DESIGN.md](GAME_DESIGN.md) remains authoritative; open policies must not be supplied by a default in server code.

## Selected implementation direction

Use the existing React + TypeScript + Vite frontend, a **Node.js 24 LTS / Fastify 5** service, and **SQLite through better-sqlite3**. Use one repository and one service process. Shared pure game functions stay in `src/game/`; the service handles identity, storage, permitted views and commands. Recheck and lock exact compatible package versions when the server milestone starts. Node 24 is an LTS line, and Fastify documents support against Node LTS releases. [Node releases](https://nodejs.org/en/about/previous-releases), [Fastify support policy](https://fastify.dev/docs/latest/Reference/LTS/).

The service will serve the built frontend and bundled artwork from the same origin as `/api`. During development, Vite will proxy `/api` to the local service. This keeps browser cookies and API requests on one origin. Add `@fastify/static` and `@fastify/cookie` when those capabilities are implemented. Add a rate-limiting plugin before remote join/create endpoints are exposed. No ORM, Redis, socket framework or external authentication provider is needed for this bounded design.

SQLite stores a small room's complete authoritative state in a transaction. Use `better-sqlite3` for explicit synchronous transactions and backups; its installation depends on a supported Node version and platform binary availability, so validate installation on Windows and the deployment environment before pinning. [Library documentation](https://github.com/WiseLibs/better-sqlite3).

Use ordinary HTTP commands and poll the current player's view approximately every three seconds while visible. Fetch immediately after a command, on reconnect and on foregrounding a tab; use bounded backoff on failures and stop unnecessary hidden-tab polling. Polling is a transport choice, never the clock that advances a room. Reconcile views by revision and preserve focus, scroll and unchanged cards. Do not blindly retry a stale action after refreshing its revision.

## Hosting proposal and limits

Propose **one paid Render web service plus a 1 GB persistent disk**, with the SQLite database under `/var/data/dreamerie.sqlite`. The published smallest paid compute price is approximately **$7/month**, and persistent disk storage is **$0.25/GB/month**: roughly **$7.25/month for compute plus this disk**, before bandwidth, build usage, taxes or any workspace charges. This is an estimate checked on 2026-09-17, not a purchased plan or a fixed total bill. Confirm the actual plan name, checkout price and budget before provisioning. [Render pricing](https://render.com/pricing).

Paid compute does not spin down on idle. Free Render web services sleep after 15 minutes without incoming traffic and cannot attach a persistent disk, so they do not satisfy this design's unattended scheduler and SQLite persistence requirements. [Render FAQ](https://render.com/docs/faq), [free-service limits](https://render.com/docs/free).

A persistent disk is available to one service instance, cannot be read by a separate cron service, and prevents zero-downtime deployment. Therefore run the small deadline loop in the same service, accept brief deployment interruptions for this playtest, and recover work after restart. Store the database only under the mounted path. Use SQLite-consistent backups and test restoration before a hosted playtest; do not assume filesystem snapshots alone are a validated database recovery procedure. [Disk constraints](https://render.com/docs/disks).

This is a small-playtest design, not high availability. Measure memory, database latency and image bandwidth during the hosted check; the quoted instance size is not a tested capacity promise. Keep migrations and game logic portable so changing hosts does not change rules. No Render account, subscription, disk, domain or deployment is created by this document.

## Identity and storage boundaries

Give each browser an opaque, cryptographically random session credential in an HttpOnly cookie, with Secure in hosted HTTPS and SameSite=Lax. Store only its hash server-side. Display names and invite codes do not authenticate a player. The service derives the acting player from the session and membership, never from a client-supplied actor ID. A shared invite may grant a new seat only while joining is permitted; it never restores someone else's seat.

Validate Origin and a session-bound anti-CSRF token on mutations. Validate command bodies against explicit schemas, including clue length and IDs, before running rules. Bound body sizes, reject unexpected fields, and limit room creation/join attempts. Keep secrets and private game state out of logs. Authorized player views use `Cache-Control: no-store`; the static artwork can be cached. A local HTTP cookie exception applies only to development, never to the hosted configuration.

Keep the initial schema small:

| Record | Stored purpose and constraints |
| --- | --- |
| Sessions | Credential hash, stable session ID and expiry; no real-world account profile. |
| Rooms | Room ID, host membership ID, phase, revision, current round ID, policy version, timezone, next deadline, schema version and private game-state JSON. |
| Memberships | Room/player/session association, display name and fixed accent slot; enforce one seat per session per room. |
| Command receipts | Unique actor plus request ID, request fingerprint and accepted outcome/revision. Retain for the associated room's lifetime. |
| Round outcomes | Unique room/round/player result, or an explicit missed status, committed with the room transition. Never reconstruct points from mutable UI state. |

Use explicit encoders/decoders for the existing Maps and Sets, schema versions and validation on load. Never JSON-serialize a Map and assume its entries survived. Store enough room state to restore allocations, exposure, fixed boards, assignments, past results and deadlines without drawing again. Bound state size. Keep public response types separate from stored state types.

Use foreign keys, prepared statements and short transactions. No network I/O or asynchronous side effects inside a transaction. Use a write-ahead log with the database and sidecar files on the persistent disk. Apply migrations at service startup before accepting traffic, since that is when the mounted database is available. Backup/restore tests must include pending deadlines and command receipts.

## Command and concurrency contract

Use a small HTTP surface:

- `POST /api/session` establishes a browser session; `GET /api/session` resumes it and reports permitted room membership.
- `POST /api/rooms` creates a private room; `POST /api/rooms/join` accepts an invite/code and display name under approved lobby rules.
- `GET /api/rooms/:roomId` returns a filtered player view, revision, server time and permitted deadline information.
- `POST /api/rooms/:roomId/commands` accepts a typed command: start preparation, save pair, lock/unlock guess, reveal, advance or close room. Enable each command only when its milestone and policy are implemented.

Room commands carry `requestId`, `expectedRevision`, `weekId` and the applicable `roundId`, plus the action payload. Save-pair payloads contain the expected preparation slot, chosen card ID and clue; a retry must not silently commit into the next slot. Target player IDs identify the friend being guessed, not the actor.

Inside one write transaction: authenticate and authorize; check the request receipt and fingerprint; validate phase, revision, IDs and deadline eligibility; apply pure rules; persist the new state, any outcomes, receipt and next deadline; then commit. A duplicate accepted request returns its acceptance receipt without applying the action again. A reused request ID with a different payload is rejected. Never replay an old response containing private state: return minimal receipt metadata and generate a fresh permitted view.

Return clear unauthenticated, forbidden, stale-state and invalid-action responses. For a conflict, refresh permitted state and let the player retry deliberately where necessary. A timeout is an unknown outcome until reconciled by the same request ID or accepted state; do not display a successful save just because a request was sent.

Every reveal, host advance and scheduled transition uses the same room transaction. A unique outcome key is the second guard against duplicate scoring. A host does not gain access to hidden answers. Concurrent joins reserve seats atomically and cannot exceed six members.

## Phase, action and visibility contract

All rows describe intended behavior; policy-dependent transitions remain unavailable until their policy is confirmed.

| Phase | Member can see | Player actions | Phase control |
| --- | --- | --- | --- |
| Room lobby | Room roster, display names, accents, own identity and host identity; private-room invite for authorized sharing. | Join/reconnect; lobby leave if approved. | Host starts the private room at 2–6 members. |
| Preparation | Own hand and saved pairs, own next slot, other players' completion status, room time/deadline. | Save a valid pair atomically; inspect own cards. | Host starts guessing after readiness, or deadline resolution applies the approved missing-preparation policy. |
| Guessing | Own six-card board, own Dream marker, current friend's current-day clue, own locks, public readiness and deadline; earlier revealed results remain accessible. | Lock/unlock own guesses; inspect current cards. | Host can request normal reveal when ready. Early incomplete closure remains pending. At cutoff, the service resolves the day using confirmed rules. |
| Revealed | Actual current-day ownership, own correctness/points and friends' guesses about own Dream; no future hands, clues or order. | Inspect results; no edits to resolved guesses. | Host advances, or the service opens the next phase at its due transition. Reveal dwell and early-advance timing remain pending. |
| Complete | Own full-week recap and allowed per-friend results; no extra standings. | Inspect recap and enter another game under approved lifecycle policy. | No more daily transitions. Cleanup follows the approved retention policy. |
| Closed/expired | Clear final room status and only retained, permitted data. | Return to entry flow. | No game writes or revival of stale commands. |

Never send an opponent's preparation, private assignments before reveal, unexposed board, answer mapping, random seed or future schedule. Do not expose how many unused cards a specific opponent holds. The bundled deck itself is public; its hidden associations are not. The online client must not initialize the current local simulation or receive its complete `DreamWeek` state.

## Scheduling contract

The confirmed cutoff is local midnight in **America/Chicago**, shared by the room, not each device's timezone. Persist deadlines as UTC instants together with the room timezone and policy version. Calendar days across daylight-saving changes are not always 24 hours; use a timezone-aware conversion and test both changes. Do not add 86,400,000 milliseconds to implement a calendar-day boundary.

Run a lightweight service loop, for example every 15 seconds, querying persisted due rooms. Also check for due transitions on startup and before accepting time-sensitive commands. A server-side clock determines eligibility; client timestamps cannot admit a late guess. A delayed background loop must not create a grace period accidentally. The intended normal-operation resolution latency is one polling interval, not an exact-at-the-millisecond guarantee.

Each due job identifies the room, round, phase and expected deadline. A stale job after host advancement is a no-op. Persist the result and replacement deadline in the same transaction. A guess accepted before cutoff participates according to policy; one processed at or after cutoff is handled as late. Test boundary ordering with an injected clock.

Still pending: the first preparation deadline; how early host progression changes the next cutoff; whether scheduled resolution opens the next day immediately or retains a reveal phase; and whether a multi-day outage catches up every elapsed day or pauses for recovery. These affect gameplay, not the choice of hosting product. Do not implement timer defaults for these decisions yet. Catch-up infrastructure can enumerate due work without deciding its game outcomes.

## First coding milestone: exact scope

Milestone **0.2.1** generalizes the pure game rules for 2–6 fully participating players. Its roster, board, allocation and existing scoring work is independent of unresolved deadline-transition and missed-day policies. No new dependency is needed for that work. Keep missed-day logic explicitly gated by its outstanding decisions; do not introduce synthetic completion to make existing tests pass.

Expected files to review/change:

- `src/game/board.ts`: one own card, `N - 1` actual friends' cards and `6 - N` eligible decoys; handle the zero-decoy case without a hardcoded three-card error.
- `src/game/week.ts` and `src/game/types.ts`: enforce the approved week roster range and valid stable IDs without changing generic allocation unnecessarily.
- `src/game/simulation.ts`: move the non-simulation preparation query into a focused shared helper if needed; keep local simulated actions out of online entry paths.
- `src/game/scoring.ts` and `src/game/recap.ts`: validate all actual participants and results; preserve two-player zero recognition. Rename simulation-specific parameters where they accept any complete player rounds.
- `src/data/playerAccents.ts`: verify stable roster-based mapping for all approved sizes; avoid a UI redesign.
- `tests/board.test.ts`, `tests/week.test.ts`, `tests/personal.test.ts` and a focused `tests/roster.test.ts`: 2–6-player full-week fixtures, invalid actions, exhausted pools, unique allocations, private exposure and per-player scoring/recaps. Update the test command only if a new test file is added.
- README and the plan: state exactly which rule support exists; the local UI remains Charlie, Nancy and Song until a room milestone connects it.

Completion checks are `npm run typecheck`, `npm test` and `npm run build`, plus local-mode regression playthroughs. No dependency install, server startup, paid account or deployment is needed for 0.2.1. Stop after it for user testing and approval.

## Later service files and commands

For 0.2.2, start with `server/index.ts`, `server/http.ts`, `server/store.ts`, `server/sessions.ts`, `server/rooms.ts`, `server/views.ts`, an initial SQL migration and service tests. Add serialization helpers only as needed. Share API-only types through a small `shared/` module, not by exporting the private stored room type to React. Add `server/scheduler.ts` in 0.2.6, not in the first server milestone. No solo-lobby code, endpoints or tables are planned.

Add a separate server TypeScript configuration and build output (`dist-server/`), while Vite continues to build `dist/`. Compile the service and shared rules as Node-compatible ESM; explicitly handle the existing `.ts` import extensions in emitted output. Keep one lockfile and avoid reorganizing the app into workspaces without a demonstrated need.

The future server milestone should introduce documented scripts such as `dev:server`, `build:server`, `test:server` and `start`. They do not exist yet. During local testing use one terminal for Vite and one for the service; production `start` serves the built assets and API. Ignore local database/WAL files and private environment files. A checked-in environment example contains names and safe placeholders only.

Before provisioning, prepare a reviewable deployment configuration: chosen Node version, install/build/start commands, health endpoint, origin setting, persistent disk path, migration and backup procedure, measured resource needs and current estimated cost. Purchase and publication remain later actions requiring authorization.

## Review outcome

The architecture and first coding scope are concrete. Midnight America/Chicago is confirmed. Milestone 0.2.0 remains **in progress** until affected game-policy decisions are recorded; documenting a recommendation does not mark it accepted. Independent 2–6-player rule work can be reviewed separately, but no subsequent milestone has been implemented in this documentation pass.
