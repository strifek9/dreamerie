# Full-year expansion release candidate

Owner scope: complete all 245 remaining regular cards, then publish the whole validated collection. No partial release.

- Current: 365 regular +18 holiday pairs; 1,915 answers total.
- New: 245 full composites and 1,225 paired answer crops visually reviewed.
- Dream 214: The Laundry of Borrowed Shadows; rejected teapot remains workspace backup-only.
- Import: `node scripts/importYearExpansion.mjs <review-directory>`; mechanically copies selected native masters and records exact prompts/provenance. It refuses changed originals or overwriting different pixels.
- Source plans: artwork-review/expansion-playable-121-365 in the ChatGPT project workspace. Preserve this workspace and its nonshipping alternatives.
- 555 new PNG masters, unchanged native pixels (some originals differ by one pixel in height); runtime retains the reviewed 1672×941 coordinate system.
- Runtime appends cards 121–365. Published first 120 and all holidays/legacy cards are unchanged; all saved attempts retain their own card/deadline.
- Lossless delivery: 2,298 files / 383 cards. All decoded RGBA and ICC profiles match masters/crops exactly; no resizing. 800,855,742 total delivery bytes vs 1,993,335,067 selected PNG bytes (59.8% reduction).
- Validation: all 79 tests, typecheck, production build and old 120-pair validator pass. Tests cover every new region/correction/hash/verse, all 1,825 regular answers, five-confirmation cap, stale/double confirms, repeats, overlap/nesting, expiry, accuracy-first ranking, whole-second ties, 365-day wrap and saved-card priority.
- Browser: replacement's 390×844 five-guess flow, correct/repeat/miss feedback, fifth-guess results, zoom/close and paired missed-answer inspection pass. Share fallback shows score/time, five spoiler-free tiles and clean URL. Card 365 loads its own verse/artwork and expands to fit 844×390 landscape; click zoom/close works. Production compositor spot-check of 357/358 retains nested corrected knobs, candle and other selected changes; no browser errors.
- Compatibility: all 828 previously published delivery records are exactly unchanged, including SHA-256 hashes and placement. No existing public asset was modified.
- Existing bundle advisory: JavaScript 1,156.64 kB uncompressed / 240.20 kB gzip. No unrelated architecture changes; deferred code splitting is a future performance improvement.
- Physical-device pinch/long-press and subjective difficulty remain human testing, not simulated-device claims.

Publication pending exact-commit verification in docs/HOSTING.md. Preserve suspended old service/disk/backups, V2 and all historical branches. Do not sync the legacy render.yaml.
