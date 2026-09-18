# Growing Dreamerie

## Direction and current boundary

The user wants Dreamerie to be able to reach a large audience. This is a scalability requirement for the product's direction, not a claim that the current prototype can already serve millions, and not permission to provision unbounded paid infrastructure. Milestone 0.2.8 prepares the first hosted human playtest. The steps below are proposed follow-up work with explicit validation points.

Preserve React/TypeScript presentation, pure game rules in `src/game`, stable IDs, private per-player views and transactional command semantics. Keep hosting integrations out of those rules. Existing SQLite persistence is concrete SQL across service handlers; moving databases requires real persistence work and migration tests, not changing an environment variable.

| Stage | Architecture/work | Evidence before increasing access |
| --- | --- | --- |
| Supervised playtest, now | One application process, SQLite on persistent storage, bundled art, manual releases, tested backup/restore. | Real phone/desktop weeks, durable restarts, midnight operation, privacy checks and actual operating cost. |
| Measure the workload | Capture request latency, error rate, event-loop delay, memory, database write time, disk growth, payload size, artwork bandwidth and due-job delay without private content. Test increasing concurrent users on an isolated representative environment. | A declared concurrency target and measured headroom; no advertised player count based on a laptop test. |
| Shared persistence | Move authoritative rooms, seats, sessions, receipts, schedules and results to managed PostgreSQL. Preserve current IDs, hidden order and results with a rehearsed import and rollback/cutover procedure. | Full old/new rule-parity suite, transactional races, restart and recovery tests; verified backups and restore objectives. |
| Multiple application servers | Stateless request workers behind a load balancer, shared authoritative storage and shared abuse/rate-limit state. Claim due work with row locks or expiring leases, so more than one worker can recover jobs without scoring twice. | Concurrency and worker-kill tests; duplicate jobs and lost responses never duplicate a draw, reveal or award. |
| Broader public release | Versioned artwork through object storage/CDN, efficient update transport, deliberate account/recovery design, abuse controls and operating alerts. | A representative load test, staged rollout, rollback plan, a supported budget and human playtests. Account recovery or changed game rules still need separate design approval. |

These are successive engineering checkpoints, not microservices to build immediately. A modular application backed by a shared database can remain simple; add more moving parts only when they solve a measured problem.

## Constraints to address

- **One writer and one disk:** the selected Render disk attaches to one instance and cannot be shared across scaled workers. SQLite serializes writes. Adding replicas to this deployment would not create one shared authoritative game. Migrate storage before horizontal scaling. [Render disk limits](https://render.com/docs/disks), [SQLite deployment guidance](https://www.sqlite.org/whentouse.html).
- **Current polling:** each visible player polls roughly every three seconds, so 1,000 simultaneously visible players imply about 333 room reads/second before commands, reconnects or session requests. This is arithmetic, not measured throughput. Current reads reconstruct private game views and reconcile deadlines; even an unchanged room can consume database/CPU work. Measure before choosing revision-only responses, adaptive polling or push updates. Every transport must retain authorization and privacy.
- **Midnight concentration:** Chicago midnight makes many rooms due at once. The current loop scans/processes them synchronously in one service. Measure delay and move to bounded batches/claimed jobs as volume grows; do not change the confirmed cutoff or silently skip days to reduce load. PostgreSQL row locks can coordinate workers, but unique outcome/receipt constraints and transaction boundaries must remain the final correctness guards. [PostgreSQL locking](https://www.postgresql.org/docs/current/explicit-locking.html).
- **State and metadata growth:** live private data expires, but room/membership/retry records remain. Decide a bounded archival/tombstone policy before public scale, preserving replay protection and honest expiry messages. Large session-room lists and JSON state copies also need measurement and eventual pagination/index review.
- **Abuse and identity:** display names and shared invitations are not user accounts. The current limiter is process-local and proxy-address behavior must be verified on the chosen host. Public release needs deliberate identity/recovery, abuse budgets and shared limiting; Redis is an option if needed, not a prerequisite for every small playtest.
- **Artwork bandwidth:** do not expose private cards through shared caches of API responses. Static artwork itself can be cached using versioned paths independently of ownership. Move delivery only when the bandwidth/latency evidence supports it.

## Preserve correctness during a database transition

Keep one atomic operation for selection plus replacement; one consistent board snapshot per day; revision/week/round guards; room/session-scoped idempotency receipts; and exactly one outcome per room/day/player. A transaction should lock the affected room, not the entire population. Shared jobs must re-read the current phase/deadline after acquiring ownership and tolerate retries or worker death. Do not use cache state as the only authority for scores or choices.

The migration rehearsal should compare all saved hands, allocations/exposure, clues, boards, locks, outcomes, identities, schedules and expiries. Test 2–6 players, late joins, missing preparation, incomplete guesses, close-versus-midnight races, stale retries and the all-correct recognition exception on the new storage. Keep the old snapshot until cutover is accepted; never run old and new writable authorities for the same room without a designed replication protocol.

Before starting the next scaling implementation, agree on peak simultaneous players, typical sessions per day, acceptable response/cutoff delay, operating budget and recovery objectives. “Millions of registered players” and “millions online together” are different workloads. The first hosted test should inform those targets.
