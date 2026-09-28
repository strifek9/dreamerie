# Pre-launch artwork delivery

September 28, 2026. **Published with owner approval** as `6396977` at https://dreamerie.onrender.com, Render deployment `dep-datbi4hsrm7s7382ln80`. Local, GitHub and Render checks passed; live current-day artwork checksums, zoom and existing saved-result persistence were verified. See [hosting verification](HOSTING.md). The implementation notes and real-device checklist below remain applicable.

## What changed

The game previously loaded the original PNG, the full altered PNG and any full-size correction PNGs. Its SVG compositor displays only five authored regions from those altered sources.

Current cards now load one full-size **lossless WebP original** and five **lossless, native-pixel source crops**, with 32 pixels of padding around each authored rectangle where image boundaries permit. There is no resizing, repainting or lossy quality setting. Placements use each source's actual dimensions (including 1671-pixel sources), then map to the existing 1672 × 941 SVG coordinate system. Existing clipping paths and edge masks stay unchanged.

Landing preview, preload, gameplay, full-screen viewer, answer inspection and development review share the same delivery mapping. Start still waits for all six files. Unknown/legacy IDs retain their original full-frame sources. No new runtime dependency, cache service, backend, storage migration, timer or scoring change was introduced. PNG masters and prior saved-card support remain intact.

Also fixed a browser-observed resize/close race in `DreamCanvas`: its resize callback now captures the measured elements and ignores detached nodes rather than dereferencing cleared React refs.

## Measurements

| Artwork payload | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| Sum across 138 current cards | 748,233,433 bytes | 320,998,368 bytes | 57.1% |
| House That Walked Away (card 005) | 5,457,501 bytes | 2,467,120 bytes | 54.8% |

These are exact local file sizes summed over each round's unique preloaded artwork sources, not measured phone load times, complete website traffic or a claim that a player downloads the entire catalogue. Each of the 138 cards is smaller. The six-file approach increases request count relative to an ordinary two-source pair; actual mobile-network latency still needs measurement after an approved preview publication. Browser caching may reduce repeat transfers.

Preserving masters means the repository/build keeps historical assets **and** approximately 321 MB of derived assets. This improves transfer per game, not checkout/build storage size. Two unused full-frame trial encodings are kept outside public assets in ignored `.validation/delivery-experiments/`. Do not remove master/backups as part of this milestone.

The production build reports a >500 kB JavaScript-chunk warning (671.90 kB raw / 158.03 kB gzip in this pass). This pass targets artwork transfer; catalogue/code splitting is a separate possible follow-up, not hidden by raising the warning limit.

## Verification and regeneration

Normal development/build still only needs the existing Node toolchain. Python/Pillow is an **offline maintenance tool**, not a Render build dependency. This generation used Pillow 10.3.0 with WebP support and Node 22.18.0. Existing outputs are verified rather than overwritten; use a new versioned delivery directory for future changed artwork.

```powershell
npm test
npm run build
node scripts/validateLandscapeCollection.mjs
python scripts/prepareArtworkDeliveryV1.py --check
```

To generate missing derived files from the current immutable PNG masters, run `python scripts/prepareArtworkDeliveryV1.py` without `--check`. The generated manifest and `artwork/DELIVERY_LOSSLESS_V1.json` record crop bounds, source/delivery hashes, pixel hashes, dimensions and byte counts. Do not hand-edit them. `--sample` checks/creates only card 005 and does not replace the full manifest or audit.

Completed checks:

- 77 automated tests, TypeScript and production build pass; existing 120-pair legacy validator passes.
- All 828 WebP files decode to exactly the source crop's RGBA pixels and preserve any ICC profile; source PNG hashes remain unchanged.
- Automated coverage verifies all 690 source choices and placements, full-size originals, file hashes/lossless dimensions, size reduction and legacy fallback. Existing tests continue to cover five guesses, overlap hits, duplicates, deadline, ranking and persistence.
- Local Chromium browser: desktop 1440 × 900; phone-sized 390 × 844; landscape 844 × 390; review 1280 × 800. Verified preview enlargement, zoom, landing Start visibility, current ordinary/holiday artwork, full five-confirmation round, correct/repeat/miss feedback, immediate results and smallest paired answer close-up.
- Card 028 review exercises 1671-pixel sources. Card 002 review exercises a separate per-edit correction source. Browser checks are sampling, not a fresh artistic/difficulty review of every clue.
- Repeated resize/close checks after the detached-node guard produced no new occurrence of the observed callback error.

## Next checkpoint: real devices

The release is now available on the live site for actual iPhone Safari and Android Chrome checks, not just narrow desktop viewports:

1. Cold load over cellular/slow Wi-Fi: artwork arrives intact and the clock does not start before Start.
2. Long-press, pinch, drag, orientation change and close: clear clues, no accidental confirmation, no pause.
3. Correct, wrong and repeated clues; five total confirmations; expiry while backgrounded.
4. Reload/second tab keep the same attempt, timer, result and streak; no reset or data loss.
5. Results scroll from images, all answer close-ups render, and native Share/Copy works in a messaging app.
6. Returning next local-calendar day and a holiday keep the expected daily schedule.

Record device/browser, puzzle ID, connection, failure and reproduction. Do not describe physical gestures, Safari or production-network speed as verified by desktop viewport checks. No live attempt was used for this pass.

## Historical publication handoff (completed with approval)

Suggested commit: `perf(artwork): deliver lossless originals and native clue crops`.

These commands describe the reviewed release workflow. The owner subsequently approved publication, and release `6396977` also includes the previously verified hosting-retirement documentation. No private backup/database files were included.

```powershell
git add package.json src/v2/CollectionReview.tsx src/v2/LandscapeArtwork.tsx src/v3/VersionThree.tsx src/v3/artworkDelivery.ts src/v3/artworkDelivery.generated.ts src/components/InspectableDream.tsx tests/artworkDelivery.test.ts scripts/prepareArtworkDeliveryV1.py docs/artwork/DELIVERY_LOSSLESS_V1.json docs/PERFORMANCE.md public/artwork/v3/delivery-lossless-v1
git add -p README.md AGENTS.md
git diff --cached --stat
git commit -m "perf(artwork): deliver lossless originals and native clue crops"
git push origin prototype/v3-dream-ritual
```

This release was explicitly deployed to the current Render Static Site. Future publication needs new authorization. Do not resume or modify the suspended legacy paid service or the separate V2 site.
