# Working on DREAMERIE

## Version 4 technical review follow-up - October 4, 2026

The three outstanding first-batch drafts (016, 018, 020) have desktop/phone composite and all five paired-crop QA. Corrections and remaining gates are in docs/V4_BATCH_REVIEW_20261004.md. All 93 tests/build, preview gate and complete V3 lossless checks pass; isolated mobile/desktop development and production browser flows pass. The 383-card release ledger remains pending. Technical review does not constitute human difficulty approval or a complete V4. No commit/push/merge/deployment occurred. Keep these proofs isolated while the first twenty receive human playtesting.

Additional existing proofs 074/133/155/173/197/237/270 also have full desktop/phone five-crop QA and successful mobile touch-event rounds. All 27 proofs are source-ready for human review; the other 356 cards need retain/revise decisions, not an assumed 356 regenerations. See docs/artwork/V4_READINESS_20261004.json. No new 021-040 batch or ledger approval was made.

## Version 4 harder dreams — active, September 30, 2026

The owner authorized a full current-card difficulty revision, selective enrichment of sparse paintings, and commit/push/deployment after the complete Version 4 collection is playable and validated. Work on `feature/v4-harder-dreams`; current Version 3 on `main` and Render remains stable until the final release. There are 383 current cards / 1,915 clues. Keep published IDs and artwork for saved attempts, original game rules and the generous overlap circle. Do not publish a partial V4 or treat generated full-frame concept edits as finished clues. The owner rejected the umbrella handle example; preserve the liked chessboard handoff direction. See `docs/V4_DIFFICULTY.md` and `docs/CARD_CREATION_GUIDE.md`.

## Launch-readiness pass — LIVE, September 29, 2026

COMPLETE: owner-approved release `83a4078` is pushed on main and live via Render `dep-dau61f5g1s2s73bjfkcg` (September 29, 8:09:09 PM CDT). All 90 tests and typecheck/build passed locally and on Render; secure npm audit reports zero known vulnerabilities. Live bundle, image zoom/close, Copy, Home/View result and preserved 4/5 · 2:00 result/two-day streak are verified without errors or resetting a hosted attempt. See docs/HOSTING.md. Physical-phone and owner-selected support/privacy checks remain in docs/LAUNCH_READINESS.md. Preserve artwork, saves, rules, hosting settings and other services. Do not repeat this completed deployment; future publication needs new authorization.

## Permanent mode and maintenance — September 29, 2026

COMPLETE: cleanup release `e68a177` is pushed on main and live via Render `dep-dau5i86gekts73d23qhg` (September 29, 7:36:38 PM CDT). Production now tracks main with manual deploys retained. All 80 tests/typecheck/build passed locally and on Render; all 2,298 retained delivery files passed exact-pixel verification. Live saved 4/5 · 2:00 result and two-day streak survived reload, and enlargement/close worked without browser errors. Do not repeat this completed deployment; future publication requires new approval. Details: docs/HOSTING.md.

The owner confirmed the current daily spot-the-difference game is the permanent direction and explicitly authorized removing unused legacy social/portrait code, committing, pushing, merging into main and deploying this cleanup. Main now contains the V3 history. Older milestones below are historical, not instructions to restore retired modes or deploy old branches.

- Preserve the current UI, five confirmed guesses total, misses/repeats consuming guesses, circle-overlap hit detection, unpausable two-minute deadline, accuracy-first/whole-second time comparison, sharing and streaks.
- Preserve the exact collection storage namespace and all 558 current/historical landscape card IDs, pixels and geometry. Never clear or migrate saved attempts as part of a refactor.
- Legacy social server/rooms/weekly scoring, portrait UI and sample logic are retired from main. Their recoverable source is on the preserved prototype branches and commit `74a3589`. No backend, database, account or multiplayer code is needed for this game.
- Current artwork remains 365 regular +18 holiday cards. Only audited unused files may be removed; `scripts/auditArtwork.ts` protects current delivery copies AND masters needed by historical saves. Recovery ledger: docs/artwork/RETIRED_ASSETS_20260929.json. Private databases/backups and the suspended service/disk are out of scope.
- Use `npm test`, `npm run build`, `node scripts/validateLandscapeCollection.mjs`, and affected browser flows before publishing. Deploy only the verified main commit to existing Static Site `srv-data2gvpn0mc73bgfhc0` (dreamerie.onrender.com), without plan changes or touching V2/legacy services. Future releases still require authorization.
- Existing artwork direction in docs/CARD_CREATION_GUIDE.md and docs/ART_DIRECTION.md remains in effect. Shared `src/v2/` artwork utilities/styles and saved-card metadata are active compatibility code, not another selectable game mode.

Publication complete: the full 37-card Revisit refresh is live as `3a7ff3c`, Render deployment `dep-dau54t893c1s73cp3kgg`, September 29 at 7:08:36 PM CDT. All 80 tests/typecheck/build passed locally and on Render; all 2,298 lossless files passed exact pixel/color checks; live bundle and six current-day asset hashes match. Previous pairs/saves are preserved. See docs/HOSTING.md. Do not regenerate or redeploy this completed milestone due to historical pending notes. Future publication requires new authorization.

## Revisit refresh — September 29, 2026

Owner selected 37 Revisit cards (35 ordinary +2 holidays) and authorized commit, push and deployment AFTER the full refresh. All 37 redesigned originals, full five-region composites and 185 paired answer crops passed visual review. Versioned runtime IDs are `revisit-dream-*`; previous 37 painted IDs/pixels/geometry remain resolvable. Current rotation is still 365 +18, with 558 total resolvable IDs. No changes to storage, timing, streaks, scoring, V2 or hosting plans. Metadata/prompts/corrections/hashes: docs/artwork/REVISIT_PROVENANCE.json; native masters: public/artwork/v3/collection-revisit-v1/. Publish only after tests/build/lossless and affected browser checks pass; verify exact commit on existing Static Site srv-data2gvpn0mc73bgfhc0.

Latest density direction: richer scenes mean more interesting connected happenings, secondary discoveries, whimsical relationships and movement—not literal workshops everywhere, unrelated prop piles, grain or maximal clutter. Preserve the scene's core impossible idea and varied composition. Earlier full-year milestone is complete at 79abeeec404f19cbbd3cfe32012e0e2cd96cd78d, deploy dep-dau2ifvavr4c73fef2ng; historical restrictions below do not override this explicit refresh authorization.


## Full-year expansion — current release scope, September 29, 2026

Owner approved all 245 remaining ordinary pairs (121–365), then commit/push/deploy the complete validated collection to the existing `dreamerie.onrender.com` Static Site, branch `prototype/v3-dream-ritual`. No partial publication, plan changes, legacy-service resumption or V2 deployment. Current catalogue: 365 regular +18 holiday pairs; 138 legacy IDs remain resolvable (521 total). New work appends IDs without altering old pixels/geometry/storage/deadlines/streaks. Regular rotation now wraps after 365 days; holiday overrides do not shift it. Saved attempts take priority.

All 245 new full composites and 1,225 paired answer crops passed visual review. Metadata/provenance: docs/artwork/YEAR_EXPANSION_PROVENANCE.json; runtime: src/v3/yearExpansion.generated.ts; native masters: public/artwork/v3/collection-year-v1/. Dream 214 is The Laundry of Borrowed Shadows, replacing the explicitly rejected grey-tentacle teapot. Old teapot and unsuccessful sources remain nonshipping workspace backups; never reselect them. Preserve all existing release assets. Native dimensions may vary by one pixel; do not resize masters. Runtime uses the reviewed 1672×941 coordinate space.

All 79 tests/typecheck/build and legacy validation pass; all 2,298 lossless delivery files passed exact RGBA/ICC comparison. Existing JavaScript chunk advisory is nonblocking. Before reporting published, verify the exact commit on Render and the live bundle/assets. See docs/artwork/YEAR_EXPANSION_RELEASE.md and docs/HOSTING.md. Earlier milestone restrictions below are historical and superseded only for this owner-approved collection release.

Publication complete (September 28, 2026): UI release `e2edd36` is committed/pushed and live at https://dreamerie.onrender.com, Render `dep-datbphvavr4c73ctojd0`. All 77 tests/typecheck/build passed locally, on GitHub and Render. Live landscape View result aligns exactly with the image bottom; the saved perfect result displays “You remembered the dream.” in gold, preserving score/time/history. No new hosted attempt, storage reset or infrastructure changes. Earlier local UI refinement notes below are historical. See docs/HOSTING.md; future publication needs new authorization.

Local UI refinement (September 28, 2026; not committed/deployed): V3 landscape welcome copy uses a single right-hand column; the primary button aligns with the left artwork's bottom edge, including completed-day View result. Keep natural height/scrolling for longer text and errors, portrait stacking, and V2 unchanged. Perfect 5/5 results alone say “You remembered the dream.” in warm gold serif type with matching score/stars, without new animation, rules, share fields or saved-state changes. All 77 tests/typecheck/build and affected browser checks pass. Await new publication approval.

Publication complete (September 28, 2026): owner-approved lossless delivery release `6396977` is live at https://dreamerie.onrender.com, exact-commit deploy `dep-datbi4hsrm7s7382ln80`. All 77 tests/typecheck/build passed locally, on GitHub and Render; all 828 files passed offline pixel verification. Live bundle and six current-day artwork hashes match the release; existing saved result/history survived reload and image enlargement/zoom/close worked without browser errors. No new hosted attempt, storage reset, plan change or change to V2/suspended legacy hosting. See docs/HOSTING.md and docs/PERFORMANCE.md. Earlier local/not-published notes below are historical. Future publication needs new authorization.

Local pre-launch performance pass (September 28, 2026; not committed/deployed): current cards use lossless native-resolution WebP originals plus five padded crops via src/v3/artworkDelivery.ts and its generated manifest. Keep PNG masters/catalogue IDs/geometry/legacy fallback intact; never replace a delivery file in place with different pixels. Generate/verify offline with scripts/prepareArtworkDeliveryV1.py; npm test checks source/delivery hashes and placements. Every crop includes interpolation padding and retains any per-edit correction source. All 828 decoded files passed exact RGBA/ICC comparison. See docs/PERFORMANCE.md for measurements, test coverage and remaining real-device checks. Do not publish or delete historical assets without new authorization.

Legacy hosting retirement COMPLETE (September 28, 2026): the owner approved backing up private databases to `D:/Kou/Dreamerie/backups/2026-09-28-retirement/`. Both downloaded snapshots match server hashes and passed local integrity/schema/gameplay validation; a separate restore-copy rehearsal passed. Old `dreamerie-playtest` now shows Suspended by you; its 1 GB /var/data disk remains attached, nothing deleted. New https://dreamerie.onrender.com and V2 remain HTTP 200; old URL returns 503, without redirect. Do not resume the paid service, delete its disk/backups, or redeploy without new authorization. See docs/HOSTING.md and the private backup README. Pending-retirement/running-server descriptions below are historical and superseded. Retirement documentation remains local/uncommitted pending approval.

Hosting status (September 28, 2026): https://dreamerie.onrender.com is LIVE at `0417c55`, deployment `dep-data5e59fdbs738ai790`; 74 tests/typecheck/build passed, browser artwork/preview/Start and HTTP checks succeeded. The new origin loads its own Cloudflare registration. Old paid `dreamerie-playtest` is still RUNNING, retaining its disk and existing charges: suspension notice did not document retention and an independent database backup remains unverified. No disk/service deletion or suspension occurred. Do not describe account costs as zero or retirement as complete. See docs/HOSTING.md; historical live-host references below are superseded by this paragraph. New site's future releases still require authorization.

Current authorized hosting move (September 28, 2026): the owner approved a new no-base-fee Render Static Site and publishing the address-only analytics update. New service `srv-data2gvpn0mc73bgfhc0` has the exact address https://dreamerie.onrender.com and uses `prototype/v3-dream-ritual`, Node 24, the existing test/build command, publish directory `dist`, and manual deploys. Cloudflare has a separate new-host registration; keep the old site's analytics history. Verify the new release before retiring the old paid server. Preserve its 1 GB disk and all historical assets/data/branches; no deletion, storage migration or reset is authorized. Browser-local attempts/streaks do not transfer between origins. V2 stays untouched. Root render.yaml describes the LEGACY paid service, not the new static site; do not sync it to create or alter resources. Record final verified status in docs/HOSTING.md. Older existing-service-only publication directions below are superseded for this move only.

Cloudflare analytics milestone (September 28, 2026, LIVE): owner-approved release `9eaad35` is deployed on the existing Render service (`dep-dat94aojo6nc73eobp4g`). All 74 tests and build/typecheck passed locally, on GitHub and Render. The live page installs one optional asynchronous official script; Cloudflare reports 2 visits / 2 page views after verification. `src/analytics/cloudflare.ts` runs only on production HTTPS `dreamerie-playtest.onrender.com`, excluding preview query parameters. Never send saved attempts, guesses, scores, streaks or identifiers as custom data, and never make gameplay depend on analytics. No hosting/DNS/domain, artwork or saved-progress changes. See docs/ANALYTICS.md and docs/HOSTING.md. This milestone is complete; future publication and other trackers still require authorization.

Publication complete (September 28, 2026): full painted collection release `04f739e` is live at https://dreamerie-playtest.onrender.com, Render deployment `dep-dat8b78jo6nc73elf9ig` succeeded. All 70 tests, build/typecheck, legacy validation and affected browser checks passed; GitHub checks also succeeded. Old assets/saves and the separate V2 site are unchanged. See docs/HOSTING.md. This milestone is complete; do not re-generate or re-deploy it because historical notes below say unfinished. Future changes still need their own authorization.

Latest publication authorization (September 27, 2026): the owner requested commit, push and deploy ONLY AFTER all 120 ordinary cards have completed painted cleanup and playable-pair validation. Complete holidays first, then all 120; no partial-collection publication. Preserve backups and saved attempts. This supersedes the earlier no-publication wording for this completed artwork milestone only. Do not force-push or rewrite history.

Painted collection release candidate (September 28, 2026): ALL 120 ordinary pairs / 600 answer crops and ALL 18 holiday pairs / 90 answer crops plus full composites have passed visual review and are integrated. Current schedule/review uses 138 versioned painted cards; playableDreams also resolves all 138 legacy IDs for saved rounds. Old assets/data remain intact. All 70 automated tests, typecheck/build and legacy collection validation pass. The owner authorized publication of this completed milestone; earlier incomplete/no-publication notes below are historical, not current status.

Standing owner-approved art target: include Dixit-inspired associative visual storytelling in Dreamerie's MAIN direction going forward. Read the core target in docs/ART_DIRECTION.md and production rules in docs/CARD_CREATION_GUIDE.md. Mix expressive character interactions, interiors, still lifes, overhead and abstract compositions with scenery; use coherent impossible relationships, varied emotions and open-ended narratives. Retain our own visibly painted, grain-free finish and original compositions, not copied card art. Narrative ambiguity never excuses ambiguous differences. This applies to new cards and authorized redesigns, not unsolicited changes to existing finish-only cleanup.

Latest owner exception: KEEP the Washington/Lincoln presidential-portrait bookend original in workspace holiday-completion-05/presidents-day-painted-v1.png. Its rejection is revoked; the paper-animal town replacement is an unused alternate. This exception applies only to that card; all other representation safeguards remain. Mix non-scenic subjects and viewpoints (characters, rooms, still lifes, overhead and abstract scenes), retaining wide image dimensions. Review Dixit for broad storytelling/composition inspiration, never copy an individual card. Read the latest top section of docs/CARD_CREATION_GUIDE.md; it supersedes conflicting blanket portrait restrictions below.

## Latest owner safeguard: nonpolitical, stereotype-free artwork

Read the current safeguards in docs/CARD_CREATION_GUIDE.md before any generation. No actual people/public figures or recognizable likenesses, including portraits, statues, bookends and background murals. No partisan, campaign, government-power or militaristic imagery. Express civic holidays through universal values and fantastical symbolism, not named figures or demographic stereotypes. In particular, the MLK portrait, presidential busts and Juneteenth picnic draft are rejected and must never be selected for release. Use black-and-white faceless paper cutouts holding hands for togetherness, and abstract open horizons for freedom. Diverse fictional people remain welcome in other scenes; do not equate identity with stereotyped foods, jobs, costumes or behavior. Preserve rejected sources only as clearly labeled nonshipping backups. This overrides earlier civic-draft directions below.

Latest owner override: complete all 18 holiday cards and clean up all 120 current ordinary cards WITHOUT review-batch pauses. Keep old assets/data and generated drafts as recoverable backups, work in separate versioned new files, and defer production cleanup/publication. No commit/push/deploy authorization. Vary subjects: turkeys having Thanksgiving and elves opening Christmas presents replace the human-family versions; mix humans, animals, fantasy beings, machines and object-led scenes rather than people everywhere. Read the latest top section of docs/CARD_CREATION_GUIDE.md. Older stop-for-review instructions below are superseded.

## Latest artwork finish and batch-review direction

The owner approved all five activity-led holiday originals in workspace artwork-review/holiday-activities-03 and asked to continue. Track remaining work in workspace artwork-review/CLEANUP_PROGRESS.md; batch 04 covers Easter, Thanksgiving, Mother's Day and New Year's Day. Continue small-batch reviews before ordinary cleanup. No new painted-style playable pairs have been integrated and no publication is authorized.

Latest refinement supersedes the overly smooth finish below: the owner approved the visible-brushstroke, matte painted orchard sample without grain. Holiday scenes must center recognizable activities: children trick-or-treating / opening presents, adult lovers holding hands, fireworks, and a leprechaun with gold, with fantastical dream logic. Review those five redesigned originals first, then continue all-card cleanup in small batches. See docs/CARD_CREATION_GUIDE.md and workspace artwork-review/holiday-activities-03. No production pairs were replaced by these review samples.

The owner approved the smoother digital-painting finish in the Halloween, Christmas and Valentine's samples, and requested extending grain cleanup to all 120 current ordinary landscape cards and 18 holiday cards in small owner-reviewed batches. Read docs/CARD_CREATION_GUIDE.md: pervasive grain/speckles are rejected; subtle brushwork is fine. Future scenes must mix quiet, medium-detail and busy compositions, keeping five fair readable clues. Holiday themes should be clearly recognizable within surreal scenes. Do not replace live originals alone or reuse stale altered sources/geometry. Preserve historical assets and saved attempts, validate complete pairs, and stop at review checkpoints. No new publication authorization. Batch review files/prompts currently live in the ChatGPT project workspace under artwork-review/smooth-batch-01 and smooth-batch-02; these are originals only, not playable replacements.

Publication update (September 27, 2026): the streak-only release `b0eea84` is now live at https://dreamerie-playtest.onrender.com after explicit approval. All 55 isolated release tests, typecheck/build and artwork validation passed. See docs/HOSTING.md. The local/not-deployed streak wording below records development history; unfinished holiday work remains excluded and unpublished. No future publication is authorized automatically.

## Play streaks — September 27, 2026, local only

V3 derives current streak, best streak and dreams played from valid completed collection attempts already saved in this browser. Completion means five confirmations OR the original two-minute deadline expiring, any score including zero. Count each puzzle's absolute local-calendar day once; yesterday's streak remains current until today is missed. Overnight rounds belong to their original puzzle day. Existing history counts; no migration, new counter store, writes, clearing or cross-device sync. Ignore preview/legacy/unknown-card/future records; damaged relevant history makes optional stats unavailable, not a new attempt. Refresh on completion, other-tab storage events, focus and calendar rollover. No stats during active guessing or development previews. Keep a quiet landing streak, compact result history below answers, and one share line only for a completed-today streak of two or more. Preserve scoring, timers, artwork size and unfinished holiday work. Not committed or deployed; await approval.

## Holiday art revision — current instruction

Before generating ANY future cards, read docs/CARD_CREATION_GUIDE.md. It is the standing owner brief: varied subjects (including robots, aliens, mermaids, ninjas, cowboys, computers and PG monsters), varied emotions/palettes/compositions, surreal or abstract dream logic, never a repetitive default of flowers/moons/birds or cozy woodland scenes. Examples are possibilities, not a fixed checklist. Preserve elegant painterly quality and fair readable differences.

The user requested reworking ALL 18 holiday cards: more abstract, fantastical, weird and impossible, with varied emotions (spooky, scary, happy, sad, mad, angry, tender and mysterious), always PG. Avoid making every image realistic, cozy, cute or golden. Keep the established painterly quality and readable, fair five-difference gameplay. Rebuild and visually inspect new original/altered pairs, regions and answer labels together; no stale geometry. Current uncommitted holiday drafts are superseded, not approved final art. Preserve ordinary 120 cards and saved attempts. Share invitation is now “Your turn to dream.” No commit/push/deploy authorization.

## Holiday specials — latest local milestone

V3 now has 18 seasonal pairs (90 answers), supplementing the unchanged 120 ordinary puzzles. Coverage: all 11 nationwide federal holidays plus Valentine’s Day, St. Patrick’s Day, Easter, Mother’s Day, Father’s Day, Halloween and New Year’s Eve. See docs/HOLIDAY_CALENDAR.md for dates and scope assumptions. Civic scenes are respectful; October uses a natural landscape for Indigenous Peoples’ Day / Columbus Day.

Metadata is src/v3/holidayDreams.ts, recurrence rules holidayCalendar.ts, selector dailyDream.ts; assets are public/artwork/v3/holidays/. Use actual local dates (not observed bank-holiday dates), fixed at page open. Easter uses the documented USNO Gregorian algorithm. On the rare June 19/Father’s Day collision, Juneteenth keeps June 19 and the Father’s puzzle appears June 20; this policy awaits owner feedback. Specials repeat annually, replace only that date and never reorder/shift the ordinary rotation.

Preserve any valid already-started card from the existing storage key, including regular cards begun before holiday deployment. Never clear/overwrite progress or reset the deadline. Invalid storage blocks play. No gameplay, pause, scoring, storage namespace, infrastructure or edge-decoration changes.

Development-only ?dream=holiday-… previews and the holiday picker are in-memory; review cards 121–138 contain all specials. Production exposes no overrides/reset. Only five authored regions are composited; individual correction sources are clipped to their single region. Prompts/hashes are under docs/artwork/HOLIDAY_*; preserve native detail and generation provenance. Validate npm test, typecheck/build, the old 120-pair validator, every new composite crop and affected mobile/desktop flows. Await approval before commit/push/deploy. This artwork scope supersedes older “same catalogue” directions, not scoring/persistence constraints.

## V3 dream ritual — current development

Publication update: the decoration removal below is live as `d55483c` after explicit approval; all 44 tests and release checks passed. See docs/HOSTING.md. Preserve the undecorated background; local/awaiting-approval wording below is historical. Further changes still require publication approval.

Latest local direction: the user rejected artwork-themed edge decorations. Remove their component/theme helper/styles and keep the quiet undecorated page background. Preserve the crescent/star logo and every other approved UI refinement. This overrides the historical marginalia direction below; do not reintroduce it. Await approval before committing/pushing/deploying this removal.

Publication update: the crescent/simplified-UI refinement below is now live as `66ed2ce` after explicit approval. All 45 tests and release checks passed; see docs/HOSTING.md. Its local/awaiting-review wording is historical. Do not publish further changes without approval.

Current local refinement (awaiting review, not published): replace the crescent-D with a delicate crescent and single star to the left of Dreamerie. Static, noninteractive edge motifs follow only the public artwork title (water/clouds/leaves/stars); never infer them from answers, add particles over clues, or let decoration create scrolling. Remove player-facing difficulty labels but preserve authored metadata. Keep the smaller 30px visible help circle inside a 44px target. Use concise landing copy and contextual instructions; main-page guess fragments live beside the timer, with no redundant found count. Keep five-total/misses-count/Remember guidance, no-pause deadline and saved attempts unchanged. Compact narrow-landscape rails must use the same stable painting dimensions in play/results. Do not commit, push or deploy without approval.

Publication update: V3 `cb15010` is live on `dreamerie-playtest.onrender.com` after explicit approval. See docs/HOSTING.md. The service is still configured to main, so future approved V3 deployments must select the exact V3 commit; do not deploy latest main accidentally. V2 remains unchanged. Earlier local/not-yet-published instructions below describe the pre-release milestone; do not publish further changes automatically.

The user approved trying the first design-review package as Version 3: bespoke vector crescent-D/wandering-star identity, five explicit guess fragments, clearer miss/repeat feedback, kind score-aware results, and optional paired close-up answer inspection after completion only. No postcard/journal yet. V3 is developed on `prototype/v3-dream-ritual`, based on V2 `561a064`; V2 remains preserved on `prototype/v2-landscape` and V1 on `prototype/version-1` / main (`4952a01`).

Planned publication destination is the existing V1 site `dreamerie-playtest.onrender.com`, replacing its frontend, NOT the V2 static playtest site. This overrides older V2-only destination instructions. Do not deploy, change Render settings, remove disks/data, or alter hosting plans during this local milestone; wait for explicit publication approval. No automatic commit/push.

Keep the same catalogue, geometry, five-confirmation rules, accuracy/time ranking, no-pause deadline and V2 collection storage namespace. A visual version bump must not reset an existing collection attempt. V1 storage is separate and must not be cleared or interpreted as a landscape attempt. Storage is origin-specific; V2-site progress cannot automatically follow to the V1 URL. V3 entry/UI live in `src/v3/`, sharing V2 artwork/compositor/styles and the existing game engine. Previous full V2 UI is retained in its branch, not duplicated. Production does not expose V1 via query parameters; dev comparison remains available.

Paired answer crops must use identical native-image coordinates and the actual five-region compositor (including correction sources), never the raw altered-source image. All 600 regions must fit their crops. Dialog opens only after results, traps focus, closes with X/Escape and returns focus without scrolling; selection must not modify guesses or scoring. Small decorative motion respects reduced motion. Keep artwork dimensions stable through completion and scrolling. Run all tests/typecheck/build plus affected mobile/desktop UI checks before handoff.

## V2 daily landscape collection — current branch

Publication update: the full-stage inspection and transparent landing-button refinement below is live as `9973755`, following explicit commit/push/deploy approval. Current automated suite: 41 tests. See docs/HOSTING.md for verification. Earlier “not yet published” wording is historical; do not redeploy automatically.

Latest local refinement (not yet published): the Start/Continue/View result container is transparent, with no separate dark-blue panel. All V2 enlarged viewers use the full available inspection area rather than clipping zoom to the original fitted painting rectangle. At 100% the entire painting is fitted; zoomed artwork can grow into the surrounding space. Empty letterbox taps do not place guesses. Pan/zoom anchors, markers and hit detection remain artwork-relative; short landscape viewers keep controls in an adjacent rail, outside the artwork. Resize updates fitted dimensions and pan limits without changing guesses or the deadline. V1 callers retain the existing default viewer geometry. This supersedes the earlier preview-only landscape sizing instructions.

Publication update: the latest poem/copy/landscape-preview revision below is now live as `0b3680f`, following explicit approval. See docs/HOSTING.md for verification. Its “not yet published” wording is historical; do not redeploy automatically.

Latest local revision (not yet published): use “Can you spot the differences between the dream and the memory?” and “The dream is fading...”. Daily quoted poems stay short, use clear end-rhymes, and suggest a shifting or unreliable dream without revealing answer locations. There is no strict sentence-count limit; the current set uses two brief lines per artwork. In short landscape viewports, the landing image viewer gives the uncropped painting nearly the full available height, with the title/hint in a slim side rail and the 44px close control beside the artwork. Portrait preview and gameplay/result viewers retain their existing layout. Rotation and click-to-zoom do not reset or pause a running attempt. These directions supersede older copy and two-sentence restrictions below.

Publication update: the refinement below is now live on V2 as `a38350e`, following explicit commit/push/deploy approval on September 25, 2026. The quoted daily poems contain at most two sentences. All 39 tests, typecheck, build and collection validation passed; see `docs/HOSTING.md` for release verification. Earlier “not yet published” wording below records the pre-release milestone.

Local refinement (not yet published): hold either painting for 450ms or use its quiet 44px-target expand icon beside the caption, outside the artwork, to open fitted full-screen inspection during play or results. In play, marking/Remember still work in the viewer and the deadline never pauses; fifth confirmation or expiry closes it. Result inspection retains found/missed overlays and Hide markers, and Fit on the comparison page restores scrolling. Keep both paintings stacked; on sufficiently wide, short screens use distinct header/status/control sidebar rows, never overlapping grid cells. Other sizes retain the centered stack, and results retain the centered score/share/answer flow. The answer heading is “What was different?”. The landing instruction is “Find the differences between the Dream and the Memory.” Each of the 120 card IDs has its own original, spoiler-free rhyming couplet in src/v2/dreamVerses.ts; the verse follows the daily artwork, remains stable on reload, and repeats with the 120-card rotation. No network quote service or storage migration.

The user authorized finishing all 120 NEW landscape cards, then committing, pushing and deploying to the existing V2 Static Site. Do not publish a partial collection. This section overrides older V1/sample instructions below for V2.

Current V2 has 120 playable native-resolution landscape pairs and 600 authored answers. Preserve V1, the portrait catalogue, the teacup sample, generation provenance and all saved attempts. Sources are in `public/artwork/v2/collection/`; the typed runtime catalogue is `src/v2/landscapeCollection.ts`; final geometry/correction provenance is in `docs/artwork/V2_PLAYABLE_AUDIT.json`. Generation manifest and source review live under docs and must not be copied into public.

Daily rotation uses the local calendar (September 24, 2026 = day 1), wraps artwork after 120 days and keys saved attempts by absolute day. Do not reorder published IDs or alter scoring geometry without considering saved attempts. The collection storage namespace is separate from V1 and the retired sample; never clear them. Dev-only review/card selection/New day rounds are in-memory; production has no reset. Day remains fixed during an open round until reload.

Keep both wide paintings stacked, fitted and synchronized in zoom/pan. No image swapping, practice gate, hold requirement or pause. Start waits for current artwork. Optional ? help, Home and reload never pause the deadline. Tap only marks; Remember consumes one of exactly five total guesses. Accuracy first, whole-second time only for ties. Results show all five answers; fitted result images allow normal scrolling from either image, with explicit +/Fit for inspection.

Every pair needs five actual theme-fitting edits, not arbitrary color overlays. Only five authored source regions are composited over the untouched original, with narrow edge blending when needed. Preserve native PNG detail. Difficulty labels are estimates pending human calibration. Use the imagegen skill for new raster artwork/corrections, not programmatic painting.

Before publishing run `npm test`, `npm run typecheck`, `npm run build` and `node scripts/validateLandscapeCollection.mjs`; inspect composites and affected mobile/desktop flows. Current automated suite has 38 tests. See README and collection progress for review controls and limitations.

Only commit/push branch `prototype/v2-landscape` and deploy existing service `dreamerie-v2-playtest` (`srv-daqp97vlk1mc73ejvdk0`). V1 service/branches, database, plans and infrastructure stay untouched. Use Conventional Commits; no force push or history rewrite. Current explicit authorization supersedes older no-publication milestone text below.

## Historical V1 and original-prototype guidance


## Current product direction

### Daily attempt persistence and landing controls

Save the real daily attempt in browser localStorage, keyed by day: original start time, confirmed guesses and pending marker. Refresh, reopening, and a second tab must retain the same attempt and original two-minute deadline; time away still counts. Persist before accepting an action, serialize cross-tab updates with Web Locks, and fail clearly if storage is unavailable or damaged. Never silently grant a new attempt. Completed results remain available with sharing and answer inspection; remove Dream again. Clearing this site's data permits replay, and different browsers/devices remain independent; this is not server-enforced anti-cheat. Development review/New day sessions are in-memory and must not overwrite the real daily attempt.

The untimed landing viewer has click/tap zoom in/out and no guess selection or zoom toolbar. Emphasize **remember** in the instructions, keep Start visible without scrolling on narrow or short screens, label the pair **The Dream** / **The Memory**, and place the viewer X immediately above the artwork's top-right edge. These refinements supersede conflicting inspection wording below.

### Current image-inspection interaction

The landing card opens a fitted full-screen viewer on click/tap or a 450ms hold. During play a short tap still only places a pending guess; hold a card or use its visible Expand button to inspect it. Zoom/pan is available only inside the viewer, not on the comparison page. The viewer has an X/Escape close, focus containment/return, pinch/wheel and visible zoom controls, and Remember during play. Inspection never pauses or resets the timer, consumes a guess, or clears a pending selection. Expiry/final confirmation closes the viewer to reveal results. Results can be expanded with the existing marker visibility toggle. No instant version-switching/flicker control. The responsive pair stays side by side when there is room, including portrait tablets above 40rem; only narrow portrait screens stack. These rules supersede the earlier synchronized inline-zoom wording below.

Daily Dream Recall is the primary mode. Two versions of one daily surreal art card remain visible for two minutes: stacked on phone portrait screens, side by side in landscape and on desktop, never swipe-swapped. The player may tap either image and zoom with touch or mouse. Only reviewed, authored image pairs enter rotation: 120 cards, card-001 through card-120. Every playable pair needs exactly five actual object-level changes that preserve its theme, brushwork, palette, and visual logic. Choose changes individually for each painting: expressions, patterns, flowers, architecture, missing details and existing-object colors. Red bows and gold details are examples, not a deck-wide formula. Do not add unrelated props or use generic discoloration/filter patches as differences. Keep generation prompts and provenance. The full answer ledger and review limitations are in `docs/ARTWORK_REVIEW.md`. The whole visible guess circle counts when it overlaps an answer region. Its radius is 4% of artwork width on every device and scales with zoom. Nearest-region priority favors center hits, then smaller nested regions; include found regions when choosing so repeats cannot fall through to score another answer. The player receives exactly five confirmed guesses total. A pointer action only places or repositions a pending marker; only **Remember** submits and consumes a guess. Accuracy out of five is primary, and whole-second elapsed time breaks accuracy ties. Results reveal found differences in green on the original image (top/left) and missed differences in red on the changed image (bottom/right), with numbered outlines that gently fade fully out and back in (static with reduced motion), plus a Hide markers control with written Found/Missed explanations, keep zoom available, and support a spoiler-free Wordle-style text share.

A development-only New day control advances the catalogue and displayed day, resetting the round to the rules screen; it does not change the real date and is absent from production. Simulated/review shares are labeled Playtest.

Keep the current implementation deliberately small: React, TypeScript, Vite, local prototype data, and straightforward CSS. Do not add a six-card interface, dashboard, backend, authentication, Discord integration, multiplayer, hosted leaderboard, global state library, or complex infrastructure unless explicitly requested in a later task.

The former social/card-selection prototype and its pre-redesign working state are preserved on `prototype/social-dreams`. Historical sections in the documentation describe that alternate/future mode and do not override the Daily Dream Recall rules above.

For current work, read the top **Current primary mode** section in `docs/GAME_DESIGN.md`, **Current scope** in `docs/PROTOTYPE_PLAN.md`, and **Daily Dream Recall direction** in `docs/ART_DIRECTION.md`. Run `npm run typecheck`, `npm test`, and `npm run build` after implementation. Do not commit or push redesign work without explicit user approval.

## Read first

The current welcome screen previews the day's original artwork above the reverie poem, with an untimed preview and a Start action. Results have five square tiles, Share/Copy controls and a selectable message fallback. Share day/accuracy/time/grid plus the current site's clean play URL, never answer locations or URL queries/fragments. Localhost is not a public invitation; warn clearly, and do not deploy without authorization.

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
- Keep imagery symbolic and open to multiple interpretations. The user has authorized replacing the placeholders with 120 locally stored, AI-generated illustrations. Record generation prompts and provenance; do not add a live image-generation service to the app. Use Dixit as inspiration for associative visual storytelling while creating original compositions. Follow the user's illustrated references: no photorealism, broad color variety, varied emotions (including happy, sad, funny, tender and unsettling), and some abstract or deliberately puzzling imagery. Do not impose one palette or make every card cozy. Before reveal, do not visually distinguish decoys from friends' real Dreams or expose friends' ownership/answers. The user's own Dream is the intentional exception: show it first in the six-card board, labeled and inspectable but unassignable.
- Check affected layouts at the phone widths listed in the prototype plan as well as tablet and desktop sizes. Image inspection must not commit a choice; provide visual descriptions without prescribing meaning, and do not rely solely on color for locks or correctness.
- Preserve short, understandable Dreamerie language. Do not replace immersive prompts with generic software text; essential errors must still be clear.
- Keep card positions and dimensions stable when choosing, clearing, locking, unlocking or revealing. Reserve state-label space, preserve scroll position between prompts, and keep confirmation reachable without hiding keyboard focus. Reduce unnecessary scrolling while preserving appreciable artwork.
- Prioritize gameplay over animation; respect reduced-motion preferences. Future transitions must not move or reflow the cards.
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
- Include terminal commands for staging the intended files, committing with that message, and pushing so the user can run them after testing and approval. Providing commands does not authorize running them automatically.

## Model recommendations

At milestone boundaries, flag when a stronger coding/reasoning model could materially help, using the checkpoints in [PROTOTYPE_PLAN.md](docs/PROTOTYPE_PLAN.md). Recommend the switch before beginning affected work, especially before decoy selection and the guessing/scoring state transitions. Explain the concrete benefit, verify current official model guidance when making product claims, and leave model selection to the user. Do not expand scope or change models automatically.
