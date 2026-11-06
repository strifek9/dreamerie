# Result number clipping — local fix, November 5

Status: **local implementation; not committed, pushed or published.**
Worktree `C:/Users/Kou/Documents/Codex/2026-11-05/task/dreamerie-badge-review`,
branch `fix/result-badges-20261105`, based on live release
`a4ab9be53d5c216a097762bc041c38d9e8a0eddd`.

The preceding zoom/two-emblem scoring release is complete on Cloudflare Pages,
deployment `becfb3b8-0abd-49b6-bb97-e89f7211b0a7`, public
`https://dreamerie.pages.dev`. Its live proof is in the scoring checkout at
`.validation/combined-live/release-proof.json`. This new badge fix is separate;
no deployment of it has been attempted or authorized.

## Reproduction and cause

The live Otter's upper-leaf badge (number 5) was measured on a 390px touch layout:
its top was 543.08 CSS px while the artwork clip began at 558.91, so roughly
15.83 px of its 20px circle was clipped. Evidence:
`.validation/badges/reproduction.json` and `production-before-otter.png`.

The outline is correctly attached to the authored difference box. Its numbered
child is placed above it with `bottom: calc(100% + 3px)`, regardless of whether
that position lies inside the painting. The canvas correctly uses
`overflow:hidden` for zoom/pan; the number therefore disappears above a top
clue or beyond a narrow border target. Enlarged/panned views can create the
same problem at any viewport edge. The fix does not relax that clipping.

## Proposed behavior

- Keep every outline and hit rectangle exactly on the existing source geometry.
- Measure the actual transformed artwork and visible canvas intersection.
  Clamp only the complete number circle inside that area, retaining its existing
  size/zoom scaling and found/missed colors.
- Keep the ordinary above-clue position when it fits. When moved, use a short
  leader to the true visible clue box if the number no longer touches it.
- Give nearby labels separate slots when space permits. Hide labels for wholly
  offscreen clues rather than floating unrelated numbers at the viewport edge.
- Update for inline and viewer zoom/pan and resize. Decoration remains
  pointer-transparent and hidden from assistive technology; the existing
  numbered answer list remains the accessible written explanation.

`src/game/answerBadges.ts` contains pure placement geometry;
`src/v3/AnswerOverlays.tsx` observes the canvas transform and size and renders
the unchanged boxes with repositioned badges. No scoring, guess, storage,
deadline, artwork or published card definition changes are included.

## Verification scope

Four new unit tests cover all edges/corners, partial/offscreen zoomed targets,
nearby-label separation, unchanged inputs, ordinary placement and unusable
geometry. Full suite: **125 tests pass**. Typecheck and normal production build
pass; the existing large-chunk advisory remains.

Browser QA uses eight actual cards at desktop 1440px and narrow touch-emulated
320px: 043 upper leaf, 188 near top-left, 013 top/right, 350 bottom-left,
308 bottom-right, 170 left, 132 right and 316 bottom. Synthetic local-only
fixtures add exact four edges, four corners and nearby tiny targets using the
real DreamCanvas, AnswerOverlays and DreamViewer components. Fixtures are not
imported by the production application.

The enhanced browser pass additionally checks expiry auto-fit with original
save/deadline preserved, marker toggle, pointer transparency, result scrolling,
viewer zoom/pan/orientation resize, Escape dismissal and focus return. Results
are in `.validation/badges/browser-qa.json` after a completed pass.
`scripts/qaCompletionFit.mjs` separately checks both completion conditions and
interrupted gestures with the new overlays. Final counts are recorded below.

An early browser-only fixture had TypeScript syntax in the Node-only test
project; converting it to a standalone JSX fixture resolved the build issue.
The native Escape test needed CDP's virtual-key code. One overlapping browser
runner was stopped; final browser runs are sequential in the disposable QA
profile. No live artifact or real player's storage was changed by local tests.

Final sequential pass completed: **37 badge layouts** passed with zero JavaScript
exceptions, including expiry, all eight real cards, all edge/corner fixtures,
nearby labels, pointer transparency, scrolling, marker restoration, viewer
zoom/pan/orientation and Escape/focus return. All **16 completion-fit scenarios**
also passed on the new code, with zero JavaScript exceptions. Unit suite remains
125/125; production typecheck/build and `git diff --check` pass.
Evidence: `.validation/badges/browser-qa.json`, `tests.log`, `build.log`,
`touch-otter-after.png`, `touch-fixture-corners.png`, and
`.validation/completion-fit/browser-qa.json`. Both touch screenshots were
visually inspected; number 5 is fully readable at the upper image edge.

Limits: Chromium desktop/touch emulation is not physical Samsung or Safari.
The existing result fade is preserved; browser screenshots use reduced motion
for legible inspection. No publication, paddle repair or wider art revision is
included. The parent should obtain a separate publication decision after review.
