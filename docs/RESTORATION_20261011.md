# Previous-version restoration — local candidate

The owner requested full restoration of the version before October 11's usability update, with fixes only for confirmed resolution issues. Publication is not authorized by this request. This candidate restores application and regression-test files exactly to `f660bcf4090414c914ed1d4ae7bd64731191c1e9`, using a new branch/commit rather than resetting published history. October 11's usability evidence remains in the repository and the released update remains on `main` and `feat/mobile-comparison-cancel` until separate release approval.

## Resolution investigation

No resolution defect was confirmed, so no speculative image or layout fix was added. Native lossless delivery, source dimensions/checksums, crop padding/placements, SVG source coordinate systems, fitted aspect ratios, shared original/changed answer-crop coordinates, zoom source continuity, and actual touch-to-source coordinate mapping were checked. No blur filter, full-image crop, aspect distortion or delivery downsampling was observed in the sampled browser flows. The smaller painting at 320 × 568 is the prior layout's intentional fit (224 × 126.06 CSS pixels), not damaged source resolution. Zooming beyond a finite source's native detail cannot create new detail.

The current sample original is 1672 × 941 native pixels; its five changed-region deliveries retain native source crops. All current/historical delivery hashes and dimensions passed the existing full regression suite. Artwork, authored clues, masks, difficulty, card IDs and delivery maps are unchanged.

## Verification

- 106 regression tests passed; zero failed, cancelled or skipped. The two Cancel-specific tests were removed with that feature as part of the exact prior-code restoration.
- TypeScript and the normal production build passed; 383-card metadata gate passed. Existing large-JavaScript-chunk advisory remains.
- Historical validator passed 120 pairs / 240 native PNGs.
- `git diff f660bcf -- src tests package.json vite.config.ts public` was empty.
- Production-preview browser QA used only a dedicated headless Edge profile, port 9340, local server 5190 and disposable contexts. Viewports/DPR: 320 × 568 / 1, 390 × 844 / 3, 844 × 390 / 2, 1440 × 900 / 1, 2560 × 1440 / 1.
- Verified restored controls; no Cancel or simultaneous comparison; full-image fit; exact crop placements; zoom/reset; touch mapping; unconfirmed-marker reload; Continue; five correct actual touches and confirmations; five-lock cap; automatic results; completed reload; paired answer crop; historical `v4-dream-012` saved marker/art/deadline continuity; expiry in the expanded viewer at the original unpaused 2:00 deadline. No JavaScript exceptions in the successful run.
- A first harness run used the current catalogue to locate a historical card. Correcting the fixture to use publishedDreams resolved that harness assertion; no product fix was needed.

Physical iPhone/Android, actual native sharing/clipboard and a full physical accessibility audit remain unrun. Desktop Chrome and Piece Together/Find Edwin were untouched. No real user storage was changed. No push, deployment, domain, analytics, security or billing change.

Evidence: `docs/restoration-20261011/`. Prior usability evidence is preserved under `docs/usability-20261011/`.
