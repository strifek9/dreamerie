Current production promotion: see [V4_PRODUCTION_RELEASE_20261004.md](V4_PRODUCTION_RELEASE_20261004.md). Historical milestones below retain their original approval scope.

# V4 expansion technical handoff — October 4, 2026

All 356 authorized remaining current cards (338 ordinary and 18 holidays) have isolated five-clue V4 proofs and completed root technical QA. Together with the 27 existing proofs, the preview now contains 383 pairs / 1,915 clues. This completes the authorized artwork implementation and technical review; human timed difficulty, physical-phone review, production selection and publication remain pending.

## Verification

Every expansion original is byte-identical to its exact current published original, including the special revisited Veterans and October Observance paintings. Native dimensions were preserved; occasional generated-only one-pixel correction is documented with raw sources and hashes. Actual browser SVG composites were exported at each original's native size. Original browser rendering, unchanged pixels outside the union of the five regions, nonzero changes in each region, and ten pairwise nonoverlap checks passed. Root visually inspected every full pair and all five actual paired crops before marking DONE.

Each of the 356 proofs passed actual mobile touch-event five-lock 5/5 completion, two-minute timer, answer inspection and Escape, 320/390/844/1440 widths without horizontal overflow, fresh isolated-preview attempts after reload, and no JavaScript exceptions. Existing baseline QA separately covers pending/interrupted reload, repeated guesses and double confirmation, expired/completed states, normal daily resumption and result persistence. Preview attempts intentionally stay in memory; daily persistence rules are unchanged. Physical-device and human timed difficulty testing have not been performed.

The browser discovered missing holiday verses under isolated V4 IDs. Development/playtest-only holiday resolution now reuses the existing holiday theme/verse. A regression covers all eighteen mappings, distinct New Year/New Year's Eve and ordinary-card exclusion. Exactly adjacent normalized clue rectangles now use a 1e-12 validation tolerance to avoid a floating-point false overlap; integer native boxes remain disjoint and no gameplay tolerance changed.

The single-object fairness rule is documented in CARD_CREATION_GUIDE.md. Corrections preserve one fish on002, cabinet badge on011, cabinet butterfly on020, rear panel on074, and noon tick on197; surrounding selectable objects remain original. Full-frame generation mistakes, multi-object changes and unfulfilled cues were rejected or refined. Rejected raw sources/prompts remain recoverable in the worker folders. The generous hit radius is unchanged.

Fresh final checks passed96/96 tests (zero failed/skipped),383-proof preview metadata gate, dedicated playtest build/typecheck, ordinary build/typecheck and git diff whitespace. The ordinary JS/CSS filenames are exactly unchanged: index-D8kbJytP.js and index-D73TnmoS.css; its output contains no v4-review.html. A final clean-browser sweep passed all18 holiday games after the verse fix, with no JavaScript exceptions. The final output directory is the ordinary build. The existing large-chunk advisory remains nonblocking.

Logs: C:/Users/Kou/Documents/Codex/2026-10-04/task/tests-expansion-final.log, build-playtest-final.log, build-production-final.log and final-holidays-browser.log.

## Deliverables and recovery

- Authoritative progress: artwork/V4_EXPANSION_PROGRESS_20261004.json (356 DONE, zero queued/in-progress/blocked).
- Independent final native-original inventory: artwork/V4_EXPANSION_FINAL_20261004.json.
- Runtime proofs: src/v4/previewDreams.ts; native originals and selected sources: public/artwork/v4/collection/.
- Per-card prompt/source/hash/correction provenance: artwork/V4_CARD_*_PROVENANCE.json; historical002 is V4_PREVIEW_PROVENANCE.json.
- Native exported A/B pairs, five-crop montages, pixel assertions, phone previews and mappings: C:/Users/Kou/Documents/Codex/2026-10-04/task/review-deliverables/.
- Raw/rejected sources, prompts and isolated worker assemblies: C:/Users/Kou/Documents/Codex/2026-10-04/task/workers/.
- Reproduction tools in the same workspace: export-review.mjs, batch-pixel-qa.py, fast-game-qa.mjs, integrate-worker.py, finalize-qa.py, finish-expansion-inventory.py. Root alone owns shared repository integration and CDP; do not run competing browser jobs.

## Release boundary

Current383 daily cards,558 resolvable saved-card IDs, V3 original artwork, session rules and383 pending release decisions remain preserved. The social prototype branch remains recoverable at c6b1cbd61ec16f0e6ea795cbf2c68e3bc50588c4. Main production remains unchanged. The owner authorized committing/pushing this complete expansion and its fairness fixes to feature/v4-harder-dreams, then updating only the existing V4 playtest. Main production publication remains outside this approval. The earlier dedicated public playtest still contains the initial27 proofs at3883f412ae19cded1dc7d2bbaf1aa030d573a153; the parent will deploy this expansion after verifying the pushed commit. Do not report the full V4 as publicly released or difficulty-approved. Historical first27 readiness reports are retained as dated snapshots.

## Playtest publication authorization

At20:41:02UTC on October4, the owner explicitly approved commit, push and update of the complete383-card collection to the existing V4 playtest. This authorizes no main-production deployment and grants no human difficulty, physical-phone or production-card approval. The executor commits/pushes; the parent owns Render deployment and live verification.
