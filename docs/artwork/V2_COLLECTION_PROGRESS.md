# V2 collection — 120 playable landscape puzzles

Completed September 25, 2026, following the user's explicit request for 120 NEW original/counterpart pairs and approval to finish all 120 before committing, pushing and deploying. Release publication is authorized only for the existing V2 Static Site; consult ../HOSTING.md for actual deployment status.

## Artwork and review

- 120 new originals and 120 selected edited sources: 240 unique native PNGs, 582.4 MiB before six correction sources.
- Originals are 1672×941. Altered sources are the same except dream-084 at 1671×941; it is aligned to the shared viewBox and its five rendered details were visually checked.
- Six single-clue corrections: 035 square eyelet, 085 straight cuff, 087 straight lampshade, 091 repaired chair crack, 104 silver hinge and 117 silver bell. The last two replace ambiguous removal attempts with clearly visible changes to those existing objects.
- All 600 answers were visually inspected in enlarged crops using the exact production compositor. Failed/partial edits, stray fragments, cut shadows, mislocated regions and zero-size boxes were corrected and rechecked. Narrow edge fades soften source texture joins without blurring the artwork.
- Every Memory starts from the original and overlays only its five authored regions. Full edited sources are NOT displayed directly, because they contain incidental generation drift. Some nested details sit within a larger changed object; hit priority and independent reachability are tested.
- Built-in imagegen was used for originals and raster edits, guided by the existing painted-card references. Original-resolution PNGs were retained without lossy recompression or artificial enlargement. V1 portrait art and the first V2 sample remain untouched.

Runtime: public/artwork/v2/collection/ and src/v2/landscapeCollection.ts. Final labels, geometry, shape masks and correction prompts: V2_PLAYABLE_AUDIT.json. Generation prompts/source paths and historical source review: V2_COLLECTION_MANIFEST.json. Original scene plan: V2_COLLECTION_SCENE_PLAN.json.

The original-generation prompt for dream-001 was not retained; its source paths and edit prompt are recorded. Do not invent that missing provenance. Other available prompts are preserved. The obsolete raw-source gallery is archived as source-review.html; use the real development review route instead. Neither the gallery nor prompt manifest is shipped in public.

## Daily gameplay

120 cards rotate by local calendar date, epoch September 24, 2026 (day 1). Artwork wraps after 120 days while saved attempts stay keyed by absolute day. An open round retains its day until reload. The new collection namespace preserves the prior V2 sample and V1 browser records without clearing/migrating them.

Two visible stacked paintings, synchronized inspection, two minutes and no pause. Tap/reposition never submits; Remember consumes one of five total guesses. Misses and repeats consume guesses but cannot add duplicate scores. Accuracy first, then whole-second time. Results reveal all five clues, support normal fitted-image page scrolling and provide spoiler-free sharing.

Only today's original/edited sources and any applicable correction source load before Start. The collection does not preload the entire deck. Native image transfer is several MiB per day; slower connections may wait at the disabled Start button while artwork loads.

## Local testing

Run npm run dev. Default route is the saved daily game. Development-only controls:

- /?review=1 — all 120 playable composites, five enlarged comparisons per card, optional whole paintings.
- /?dream=dream-120 — a selected in-memory playtest.
- New day (dev only) — next card; wraps 120 → 1, without altering real saved attempts.

Production omits all three and has no replay button. Clearing only the site's storage permits another attempt, as already specified by the user.

## Verification

- npm test: all 38 tests pass. Collection-wide tests cover all 120 perfect finishes, five distinct/reachable positive-size regions, native source dimensions, audit/catalogue parity, duplicate score prevention, five-guess ceiling, frozen results after serialization/reload and expiry.
- npm run typecheck and npm run build: pass.
- node scripts/validateLandscapeCollection.mjs: 120 reviewed records, 240 unique source PNGs, dimensions/provenance and five intended edits validated.
- Production preview landing at 320×568, 390×844, 844×390, 768×1024 and 1440×900: Start visible; document size matches viewport, no empty scroll overflow.
- Active production round at the same five sizes: document size also matches viewport and Remember stays visible. Development-only review controls are intentionally excluded from these production layout checks.
- Browser daily flow at 390×844: preview click zoom, tap leaves all five guesses, confirmation yields 4 left and 1 found, reload retains original deadline, expiry yields 1/5 · 2:00 and five revealed answers.
- Both paintings have identical zoom transforms. Help shows the continuing timer, never pauses. Fitted results allow native vertical touch behavior and page scroll from an image; unchanged score remains available. Share text includes day, accuracy, whole-second time, five tiles and clean play URL without answers.
- Last-card browser test: five repeated confirmations finish at 1/5, not 5/5; no sixth confirmation. New day wraps to card 1. No browser errors captured.

## Limitations / acceptance

Difficulty categories are editorial estimates from size/salience, not results from 120 human rounds. Some late clues deliberately require zoom. A desktop browser viewport check is not a physical iPhone/Android test; real pinch, mobile browser bars and native share sheets still need owner acceptance. No backend, global leaderboard, auth, Discord, infrastructure or hosting-plan change was introduced.

## Publication

User explicitly authorized Conventional Commit, push of prototype/v2-landscape, and deployment after completion. Do not force push, rewrite history, or deploy V1. Follow docs/HOSTING.md for the final release result.
