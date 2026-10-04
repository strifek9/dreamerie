# V4 production release — October 4, 2026

The owner approved promoting the complete 383-card V4 collection to the main Dreamerie site at 21:16:38 UTC, source `Sentinel_6eb6db8149ec819186b799bc3b23d779`. The previously published playtest commit is `83401207d6c4ab38d410bdb8843e47514aa9456b`.

## Selection and saved rounds

New daily rounds select 365 ordinary V4 cards in the existing rotation and 18 V4 holiday cards through the existing calendar. IDs use `v4-dream-*`. All 558 previously published card IDs remain available, bringing the resolvable catalogue to 941. Saved card IDs take precedence over the current schedule, preserving the original art, hit geometry, pending marker, confirmed guesses, start time, deadline and completed result. No storage migration or second attempt is granted.

The five-lock limit, misses/repeats consuming guesses, generous circle-overlap hit detection, unpausable two-minute deadline, accuracy-first/time tie-break, streaks and canonical share links are unchanged. Production excludes development/playtest choosers, replay controls and the private V4 review entry.

## Delivery and preservation

V4 uses a separate set of 2,298 native-resolution lossless WebP delivery files: 383 originals and 1,915 padded single-clue crops. Their 794,499,784 bytes are 60.7% smaller than the 2,021,310,880 source bytes. Both generation and an independent check verified exact decoded RGBA, dimensions and ICC profiles. No artwork was resized.

All 2,298 existing V3 delivery files independently passed the same preservation checks. Their assets, manifest and audit are unchanged. Native V4 masters, older originals, clue geometry and retired provenance sources remain intact. `prepareArtworkDeliveryV1.py` now explicitly exports the historical V3 catalogue, while `prepareArtworkDeliveryV4.py` creates/checks the separate current V4 catalogue, preventing a future builder run from replacing older delivery paths.

## Validation

- All 100 unit/integration tests passed, including every historical card's pending/completed saved-round resolution, all current targets, release selection and 20 years of holiday routing.
- TypeScript checking, production build and the 383-card production release gate passed.
- Production browser QA passed 28 scheduled cards: all 18 holidays and 10 ordinary/fairness examples. Each used five actual mobile touch locks, native V4 delivery, two-minute initial timer, result inspection/Escape, 320/390/844/1440 widths, persisted completed results, no preview controls and no JavaScript exceptions.
- Additional production browser migration, interruption, repeated-confirm and expiry evidence is recorded in the accompanying release audit.
- All 4,596 current/historical delivery files passed independent exact pixel/profile verification.

Human timed difficulty ratings and physical-phone checks have **not** been performed. Those approvals remain `pending` for every card in `V4_DECISIONS.json`; the explicit owner release approval is separate. Browser mobile emulation is not a physical-phone check.

## Deployment handoff

Commit and push the tested production promotion to main, then verify the exact remote SHA. The parent task deploys that SHA to existing Render Static Site `srv-data2gvpn0mc73bgfhc0` (`dreamerie.onrender.com`), workspace `tea-damka3h42hec739eroag`, with auto-deploy disabled and existing `npm ci --include=dev && npm test && npm run build` / `dist` settings. No plan changes, other services, Find Edwin, V2 or social-branch changes are included. Verify live assets and persisted rounds after deployment. This document records preparation; it does not claim a production deployment has completed.
