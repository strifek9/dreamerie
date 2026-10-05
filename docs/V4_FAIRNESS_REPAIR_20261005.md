# Dreamerie fairness repair — 5 October 2026

Publication approved at 15:35 UTC on 5 October 2026 (`Sentinel_18db498b489881919a7a0dbacaf13dc1`). The owner approved commit, safe promotion to main, push, and deployment to the existing main site after being told that existing saved rounds retain their original version. The sections below record the pre-publication handoff; their pending-publication statements are historical. The parent handles the actual deployment after this executor verifies the remote main commit. Human timed and physical-phone checks remain unperformed.

Local, tested changes on `fix/v4-single-change-fairness`, based on production commit `5920a05202f66ce0542bb4c2cfbbd4af3f2e212a`. No commit, merge, push, or deployment has been performed. Repository: `D:\Dreamerie`, remote `https://github.com/strifek9/dreamerie.git`.

The Tailor of a Cloth River originally removed a floating offcut and added a separate river curl under one answer. Its revision changes only the river curl; the floating offcut remains exactly as in the original. Each answer now represents one localized perceived change. The generous existing acceptance circle is unchanged, so a nearby unchanged pixel can still fall inside that circle; this repair does not impose pixel-perfect tapping.

## Scope and evidence

All 383 current cards, including all 18 holidays, and all 1,915 clues received AI visual review of actual native browser composites and five paired clue crops. Confirmed defects were repaired in 29 clues across 25 ordinary cards: 003, 009, 012, 016, 024, 042, 048, 107, 108, 112, 116, 126, 129, 143, 150, 152, 154, 155, 177, 209, 215, 222, 237, 270, and 344. All five clues of each revised card were visually checked again. Unchanged cards remain selected with their original IDs.

The canonical per-card reconciliation is [V4_FAIRNESS_AUDIT_20261005.json](artwork/V4_FAIRNESS_AUDIT_20261005.json). [Evidence](artwork/v4-fairness-20261005/) includes original review records, final verification records, 25 actual-composite contact sheets, native pixel results, and salient touch points. Workspace native exports remain at `C:\Users\Kou\Documents\Codex\2026-10-04\task\fairness-corrected-pairs` and `review-deliverables`; hashes are recorded in the audit. These reviews do not constitute a human timed difficulty study or physical-phone playtest.

## Compatibility and implementation

The repair adds 25 separately versioned card IDs, nine selected source PNGs and 150 lossless delivery WebPs. All 941 published IDs, original artwork, geometry and delivery paths remain resolvable and unchanged; the catalogue now resolves 966 IDs. The daily calendar still selects 383 cards. Saved games honor their stored card ID: existing pending or completed games retain their published version and original deadline, while fresh games select the corrected version. Consequently, an already-started old game intentionally retains its old artwork rather than silently changing mid-attempt.

The existing five differences, five confirmed guesses, two-minute deadline, repeated-guess lock consumption, scoring and tie-break behavior are unchanged. Current SVG mask bounds now have a regression check against accepted answer regions. Historical card 155 remains immutable; its revised card restores the connecting cord outside the target region. The source catalogue and delivery generator retain historical versions rather than overwriting them.

## Verification

- 106 tests passed, zero failures or skips; typecheck passed.
- `npm run build:local-repair` passed the local release validator and built production assets. Vite reported only its existing large-chunk warning.
- The legacy landscape validator passed: 120 pairs / 240 unique native source PNGs.
- Independent lossless delivery checks passed: V4 408 cards / 2,448 files; V3 383 cards / 2,298 files. Source/delivery decoded pixels and ICC profiles match.
- All 383 current native composites passed the pixel audit: original RGBA exact and zero salient changed pixels outside accepted rectangles, using channel delta greater than eight and a one-pixel raster allowance. This numerical check corroborates, but does not replace, visual review.
- Local production browser QA passed 50 complete rounds: all 25 revised cards fitted and zoomed/panned, 250 actual changed-pixel touches, five successful locks per round, completion reload, and widths 320, 390, 844 and 1440 without horizontal overflow. Production preview controls remain unavailable.
- Production browser checks passed for historical V4 cards 012, 155, 237 and 344: old deliveries, pending confirmation, old geometry, preserved start/deadline, interrupted reload and completed state. Revised 012 passed repeated-hit consumption, zoom/pan without lock consumption, pending reload, expiry and completed reload without another attempt. No JavaScript exceptions in successful runs. QA used disposable browser contexts and controlled dates, without touching user saves.
- `git diff --check` passed. Main, social and playtest branch pointers remain unchanged.

Browser and test logs are included in the evidence directory. Two initial browser-script assertions were corrected: completed rounds intentionally remove markers and close the viewer. The fitted run and all zoomed rounds were then completed successfully; these were harness errors, not product failures.

## Publication remains gated

Implementation authorization: `Sentinel_f5f271ba34948191a17ad8a8e3b61e43`; diagnosis confirmation: `Sentinel_8dbef185cee08191bd7451b13e182901`. Neither authorizes publication. Normal production builds require a separate `ownerFairnessPublicationApproval.sourceId` in the ledger; the local-repair build explicitly does not confer that approval. Human timed and physical-phone checks remain unperformed. No paid services, accounts, service configuration, Find Edwin changes or social-game changes are included.

Suggested commit after explicit approval: `fix(artwork): localize ambiguous daily differences and preserve saved versions`. Parent should obtain release scope approval, record the actual approval source, run the normal production build, review and commit the intended files, and then separately perform the authorized push/deployment to the existing service. A handoff document or suggested command does not authorize those actions.

After explicit approval, review `git diff` and stage only the task-owned paths:

```powershell
git add AGENTS.md docs/artwork/V4_DECISIONS.json docs/artwork/V4_DELIVERY_LOSSLESS_V1.json docs/artwork/V4_FAIRNESS_AUDIT_20261005.json docs/artwork/v4-fairness-20261005 docs/V4_FAIRNESS_REPAIR_20261005.md package.json scripts/prepareArtworkDeliveryV4.py scripts/validateV4Release.mjs src/v3/VersionThree.tsx src/v3/dailyDream.ts src/v4/artworkDelivery.generated.ts src/v4/releasedCollection.ts src/v4/authoredMaskBounds.ts src/v4/fairnessCorrections*.ts tests/artworkDelivery.test.ts tests/assetInventory.test.ts tests/holidays.test.ts tests/paintedCollection.test.ts tests/v4Preview.test.ts tests/v4Release.test.ts tests/authoredMaskBounds.test.ts tests/fixtures/publishedDreams-5920a05.json public/artwork/v4/fairness public/artwork/v4/delivery-lossless-v1/v4-fairness-*.webp
git diff --cached --stat
git commit -m "fix(artwork): localize ambiguous daily differences and preserve saved versions"
# Only after separate push authorization:
git push -u origin fix/v4-single-change-fairness
```
