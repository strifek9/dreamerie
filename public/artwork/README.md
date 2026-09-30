# Dreamerie artwork

The daily game contains 365 ordinary paintings and 18 holiday specials. Current and historical landscape metadata lives in `src/v2/` and `src/v3/`; historical pairs remain available for saved attempts.

Keep native PNG originals, altered sources and per-detail corrections. The current 383 pairs also have exact, lossless WebP originals and five clue crops for delivery. Only authored regions are composited over the original.

Before removing files, run `node --experimental-strip-types scripts/auditArtwork.ts`. It protects all 558 resolvable card IDs and current delivery files. The cleanup ledger in `docs/artwork/RETIRED_ASSETS_20260929.json` records unused portrait/sample art and superseded delivery copies removed from main; commit `74a3589` preserves them. Historical portrait provenance JSON remains as reference material, not playable artwork.

Creation rules and provenance are in `docs/CARD_CREATION_GUIDE.md` and `docs/artwork/`. Use the image-generation skill for new or edited art, and validate each original plus five-region counterpart together. Never overwrite published pixels or geometry needed by a saved round.
