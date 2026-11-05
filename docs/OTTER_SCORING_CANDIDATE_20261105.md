# Otter emblem scoring — local candidate, November 5

**Combined zoom + two-emblem scoring release approved; paddle excluded.** Isolated worktree
`C:/Users/Kou/Documents/Codex/2026-11-05/task/dreamerie-scoring-review`, branch
`fix/otter-scoring-20261105`, base `b81b266`. Initial work was local-only; the
owner subsequently approved this exact combined scope in
`Sentinel_03e2af6fca2c8191b15086552cb0784c`. The approval gate records that
authorization. No paddle/artwork/advisory-design changes are included.

The current `v4-dream-043` scorer reproduces both reported false positives:

| Native point | Visually unchanged object | Published answer accepted |
|---|---|---|
| (1600, 500) | Blueberries in right basket | change-3, cup crescent emblem |
| (850, 610) | Lemon peel below bucket | change-2, bucket emblem |

I visually inspected native original crops with those points marked. Internal
evidence is in the release checkout:
`.validation/scene-coverage/otter-scoring-repro-points.png`. The actual rendered
pair was also inspected there. Both points lie outside the composited authored
regions and touch unchanged objects. Their nearest emblem rectangles are about
47.2 and 50 native pixels away, respectively; the existing 0.04-width allowance
reaches 66.88 native pixels.

The candidate creates `v4-fairness-dream-043-v1` for fresh November 5/day-43
rounds. Only change-2 and change-3 receive `guessRadius: 8/1672`, following the
existing Apricot small-emblem precedent. The authored rectangles, labels,
five actual pixel changes and all other clue allowances remain unchanged.
Eight pixels is a proposed local tolerance, not a claim of human acceptance.

Historical `v4-dream-043` saves keep the old generous scoring and exact original
start time. A replay with the three other correct answers plus these two false
positives remains 5/5 on the old ID, while the new version scores 3/5. Both
versions still score all five legitimate centers and retain duplicate handling.
No stored record is rewritten or migrated. The paddle remains the old art:
the approved connection PNG is still absent, and this candidate does not claim
to repair it.

The established lossless delivery generator creates six versioned candidate
delivery assets; decoded art is unchanged from the old card. Old immutable
sources/crops remain intact. The decision ledger selects the new local version,
but `validateV4Release.mjs` explicitly rejects normal publication unless a
separate `ownerOtterScoringPublicationApproval.sourceId` is provided. No such
approval is invented or inherited from the zoom/paddle release. Local validation
uses `npm run build:local-repair`.

Focused tests cover both exact false positives, all five centers, eight/nine
pixel edge boundaries, duplicate locks, only-two-tolerance scope, saved 5/5
versus new 3/5, pending save identity/start and original deadline expiry.

Validation completed:

- Full `npm test`: **121 passed**, zero failures/skips (117 existing + four new).
- `npm run build:local-repair`: typecheck, local metadata gate and production
  build passed. Only the existing large-chunk advisory remains.
- Normal publication gate intentionally exits 1 with the explicit missing Otter
  scoring approval message; old collection/fairness approvals do not release it.
- Established delivery generator verified 410 retained V4 versions / 2,460
  files, native RGBA/ICC exact. All six new Otter delivery files are also
  **byte-identical** to the retained historical Otter deliveries. No art changed.
- `scripts/qaOtterScoring.mjs` passed four real-click/touch browser rounds on
  local built output: fresh desktop/touch score 3/5; historical desktop/touch
  retain 5/5 for the same five points. All preserve their original stored start,
  five confirmations and full stored record across reload. Zooming before the
  last confirmation still fits both images on completion.
- `scripts/qaOtterCoordinates.mjs` separately passed **16 landmark mapping
  checks**: bucket/cup emblem centers on desktop and touch, each fitted,
  zoomed/panned, after orientation resize, and scrolled. Each actual image tap
  maps back within six native pixels of its intended point and consumes zero
  guesses. Evidence: `.validation/otter-scoring/coordinate-mapping.json`.
  The pure-scorer repro does not use a browser transform at all, corroborating
  that these two false positives originate in scoring reach, not mapping.
- Internal evidence: `.validation/otter-scoring/browser-qa.json`,
  `asset-identity.json`, `tests.log`, `build.log`, `delivery-check.log`,
  `publication-gate.log`, and desktop/touch fresh/historical screenshots.
  Fresh touch and historical desktop screenshots were visually inspected.
- `git diff --check` passed. Physical phones/Safari, human tolerance acceptance,
  hosted behavior and the still-missing paddle repair remain unverified.

The earlier zoom-only Pages deployment was rejected before execution. This new
approval explicitly permits the combined zoom and two scoring fixes now, with
the paddle following later. Final release results are recorded separately;
the previous local-only test results above remain a historical verification
record rather than publication evidence.

Final combined release preparation:

- Rechecked remote main at `b81b266` and the still-old public bundle before
  integration; no previous deployment of this scope had executed.
- Recorded the exact owner approval in the dedicated decision-ledger gate.
  Normal production validation, 121 tests, typecheck/build, Pages build and
  historical 120-pair validator all pass.
- Pages artifact audit: 383 current / 968 retained IDs; 4,620 files;
  1,599,628,775 bytes; native lossless assets and calendar coverage through 2046.
- Exact Pages output on local port 4182 passed six scoring/result browser
  rounds (fresh negatives 3/5, real emblem positives 5/5, historical 5/5, each
  desktop/touch), 16 completion-fit scenarios using the new card, 16 coordinate
  checks and four single-activation checks. Evidence snapshots are under
  `.validation/combined-local/`.
- The paddle source, five rendered pixel differences, other clue tolerances,
  approved masters, global guess rules and original saved deadlines are
  unchanged. No collection/advisory design work is in this release.
- Expected Pages bundles: `app-Cc4f6sL6.js`, `dailyDream-Cm0CONzV.js` and unchanged
  `app-BGrzP-d5.css`. Hosted commit, deployment and checks will be reported only
  after confirmed publication, with evidence under `.validation/combined-live/`.
