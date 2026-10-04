# V4 first-batch review — October 4, 2026

Work remains local on feature/v4-harder-dreams, starting from c381f96. No commit, push, merge or deployment was performed. Main/V3, published/saved IDs, private backups, the legacy suspended service and Find Edwin were untouched.

## Completed in this pass

Cards 016, 018 and 020 now have technical visual review of their full five-region composite and all five paired answer crops at 1440px desktop and 390px phone layout. The earlier seventeen cards' review is recorded in V4_DIFFICULTY.md. This closes the three previously unreviewed drafts; it does not approve the first batch's subjective difficulty or publish it.

- 016: corrected the ornament clue to describe the actual leafy scroll crossing the diamond.
- 018: rejected the disconnected rail clip. Generated one targeted native raster source for a reversed bracket spiral; kept the existing rail, support post and keyhole intact. Recorded exact prompt and SHA-256 in V4_CARD_018_PROVENANCE.json. Other clues/sources stay intact.
- 012: expanded the offcut clip by 22 native pixels to prevent its feathered boundary exposing a blue remnant. Re-inspected all five paired crops and desktop/phone composites; no raster changes.
- 020: all five paired changes are visually present, with no required source replacement.
- Review toolbar: wraps controls and constrains its card selector so every control remains within 320, 390, 844 and 1440px viewports.
- Added a regression across all 27 V4 proofs for five distinct center hits, fifth-guess completion, no sixth guess, and repeats consuming a guess without another award.

## Verification

- npm test: 93/93 passed on the final code (Node 22.18.0, Windows).
- npm run build: typecheck and production build passed; existing large-chunk advisory remains.
- V4 preview metadata gate: passed for 27 proofs, each with five nonoverlapping regions; 383 current and 558 published/historical cards preserved.
- Legacy landscape validator: passed, 120 reviewed pairs / 240 unique native PNG sources.
- Lossless delivery check: passed for all 383 current cards / 2,298 files, exact decoded RGBA, no resize.
- Headless Edge with CDP touch events: Start consumes no guess; marking consumes none; pending marker resumes after reload; rapid double confirmation consumes one; repeated hit consumes another; Home/Continue preserves start/deadline; fifth confirmation ends with expected accuracy; completed result survives reload; View result and inspection/Escape preserve the attempt; an interrupted attempt expires at two minutes. These checks use an isolated localhost profile.
- Preview perfect rounds: 012, 016, 018 and 020 complete with 5/5 on their five authored centers and fit phone result layouts. Desktop/phone screenshots inspected. No browser JavaScript exceptions.
- Built production smoke checks repeat persistence, confirmation/repeat, deadline and inspection flows; no development replay control and V4 query overrides ignored.

Evidence is under .validation/v4-20261004/ (ignored local PNGs, QA script and final test log). Raster refinement was made with the built-in image_gen tool, not a paid API or external image service. Source: public/artwork/v4/collection/dream-018-rail-scroll-source-v4b.png.

## Still required

The full release gate deliberately fails: all 383 published-card keep/revise decisions remain pending. Only 27 isolated V4 proofs exist; the production rotation remains V3. No V4 delivery catalogue or complete collection is ready. Physical-phone gesture checks and human difficulty/frustration calibration remain unrun; simulated touch does not replace them. No new cards 021-040 were authored. Additional technical QA below covers seven already-existing isolated proofs, not a new collection batch. Do not mark these editorial proofs production-approved or deploy them as a complete V4 release.

Suggested next review: play the first twenty proofs with the existing two-minute/five-confirmation rules, record difficulty feedback, then continue the collection decisions and revisions. Publication remains a separate exact-release decision.

## Additional source-ready proofs completed in the same pass

The existing proofs 074, 133, 155, 173, 197, 237 and 270 have now had all seven full pairs and all 35 paired answer crops inspected at desktop and phone layout. Each also passed five mobile touch-event center hits alternating both paintings, 5/5 completion, result inspection/Escape, and no browser JavaScript exceptions. No new raster correction was needed in this set. Two labels on 173 now describe the visible flat puzzle piece and hollow triangular shadow; 237's book label describes its curled leaves rather than an unrealized literal sunburst. Native sources, geometry and IDs are unchanged.

All 27 source-ready proofs can now be handed to human reviewers: 001-020, 074, 133, 155, 173, 197, 237 and 270. Eleven pairs /55 paired crops were inspected or rechecked in this pass; the other sixteen first-batch pairs have prior recorded desktop/phone five-crop QA. This is technical source/composite readiness, not difficulty approval. Card 155's subtle cuff and comparable extreme clues especially need actual player feedback.

The machine-readable inventory is docs/artwork/V4_READINESS_20261004.json. It independently maps the 383 baseline IDs to 27 proofs with 135 clues, 21 originals identical to current V3 and six versioned originals. The remaining 356 current cards have no selected V4 proof (338 ordinary +18 holiday). These are undecided retain/revise items, not 356 proven image-generation tasks: retaining a current pair needs no new raster; revising it needs a selected five-clue V4 pair. No known technical raster blocker remains among the reviewed 27. Human difficulty, physical-phone and production approvals are all zero; all 383 release decisions remain pending. No release ledger decision was changed.

Final code checks again passed 93/93 tests, typecheck/build and 27-proof metadata validation. The emitted production JS/CSS filenames remain identical to the initial baseline: index-D8kbJytP.js and index-D73TnmoS.css. Proof 018's clue entries again run easy through extreme after moving its new subtler bracket spiral to the final entry.

Reproducible local evidence:

- .validation/v4-20261004/tests-final.log and build-final.log
- .validation/v4-20261004/qa-dreamerie.mjs: isolated Edge CDP on 9334; development server 5175, production preview 5176. Commands: node qa-dreamerie.mjs review 074,133,155,173,197,237,270; node qa-dreamerie.mjs proofs; node qa-dreamerie.mjs layouts; node qa-dreamerie.mjs flows. For production: set DREAMERIE_QA_ORIGIN=http://127.0.0.1:5176, then node --experimental-strip-types qa-dreamerie.mjs production. Use an isolated headless profile; the flow clears only its own localhost test attempts.
- .validation/v4-20261004/inventory-v4.mjs regenerates the snapshot on this PC with node --experimental-strip-types; it never alters V4_DECISIONS.json.
- review-NNN-desktop.png, review-NNN-phone.png and review-NNN-clue-1..5.png retain actual compositor/crop screenshots; game-v4-NNN-completed-phone.png retains successful rounds.

Suggested reviewed change commit, when separately authorized: fix(v4): finish source-ready proof reviews and repair clipped clues.

## Human visual review — card 197

On 2026-10-04 the user reviewed the spoiler-free native A/B artwork for v4-dream-197, The Hour That Fell Out, and replied “looks good” (message Sentinel_5dad21deaac48191ae3c1f45ae97f8f4). This records visual artwork approval for that proof only. It does not establish a timed five-guess difficulty result, physical-phone gesture approval, a retain/revise release decision, or production approval. All existing release gates and pending ledger decisions remain unchanged. Review attachments preserve native artwork pixels and contain no answer markers or clue labels.

## Accepted visual artwork and dedicated playtest — October 4

The user accepted 270 ("yes looks great", Sentinel_af13c72bac3c81918f02bd76349e3b62), then accepted all three reviewed 197/270/074 pairs and their changes ("Yes these all look great. I approve of all your supposed changes", Sentinel_233a3a26101881919061e4428f423fec). Structured visualArtworkAcceptance records and the count of three are in V4_READINESS_20261004.json. Timed difficulty, physical-phone gestures, production selection and all 383 release decisions remain pending.

The user separately authorized commit, push and deployment to the existing Dreamerie playtest (Sentinel_cb55c735fbc88191a20df9331dc6ddbc). Dedicated `npm run build:playtest` exposes V4 query selection, replay controls and `v4-review.html`, leaving the normal production build gated. The review page contains spoilers; use `/?dream=v4-dream-197` (or 270/074) for blind gameplay. Point only the existing V2 playtest Static Site at `feature/v4-harder-dreams`; publish `dist`, auto-deploy off. Build: `npm ci --include=dev && npm test && node --experimental-strip-types scripts/validateV4Release.mjs --preview && npm run build:playtest`. Do not sync render.yaml, repoint the main V3 site, or represent this as a complete V4 release. Parent owns exact-commit deployment and hosted checks.

Deployment destination clarification: the user subsequently approved a separate free `dreamerie-v4-playtest` Static Site because authenticated settings access for the existing V2 site was unavailable. Parent will create/deploy that dedicated site with the playtest build command above. Existing V2, V3 main and the suspended legacy service stay unchanged. Source branch remains feature/v4-harder-dreams; no branch workaround or Blueprint sync is needed. The dedicated build includes a V4 card chooser and an explicitly labeled answer-review link. Built mobile smoke checks passed for 197/270/074 and the review page at 390px, with no overflow or JavaScript exceptions. Both build modes pass; ordinary production still emits the original index-D8kbJytP.js/index-D73TnmoS.css and excludes v4-review.html. Full collection decisions and difficulty/physical-device gates remain pending.
