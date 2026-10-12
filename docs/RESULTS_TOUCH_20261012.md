# Results first-pinch repair — local candidate

Baseline: live `aecbf0a645ce57816e04b3fa7e76b98ac5646a52`. The owner reported a physical Samsung Chrome results-screen bug: pinch/pan did not work until pressing Zoom in. This task authorizes local repair/testing/commit only, not publication. Branch: `fix/results-first-pinch`.

## Confirmed cause / before and after

This was not zoom-state initialization. At fitted results (`scale <= 1`), VersionThree deliberately supplied no `onView` callback. DreamCanvas therefore could not change image scale, and its default `touch-action: pan-y pinch-zoom` delegated gestures to the browser. Supported Chromium CDP two-touch input reproduced scale **1** after the first pinch, including browser `pointercancel` delivery. After pressing Zoom in, the callback/inspect class returned and the same gesture reached **3.08**.

With the candidate, the same first pinch goes directly from **1 to 2.2** without any zoom button. Both paintings share that image scale; the browser viewport remains scale 1.

## Narrow repair

- Keep the existing image-view callback available for results at fit.
- Add a results-only fitted-scroll mode: `touch-action: pan-y` preserves native one-finger page scrolling and excludes browser viewport pinch zoom. Non-passive native touch listeners claim two-finger image pinch, and claim one-finger image pan only when already zoomed. Results touch handling bypasses pointer capture; existing game/expanded-view pointer handling remains unchanged.
- Keep gesture state across a pinch changing fit/zoom classes; reset it on touch cancellation, resize and blur. Remaining fingers rebase on the current image view after a finger lifts.
- Pinching down to fit or pressing Fit restores page scrolling on the next gesture. Ordinary fitted desktop wheel scrolling remains native; image zoom/pan still works when zoomed.
- Update the existing accessible fitted-results description to mention pinch. No new button or visible layout element.

Preferred painting sizes/layout, controls, source pixels, clue/difficulty geometry, answer markers, five deliberate guesses, score ordering, original deadline, storage schema, IDs and saved records are unchanged. No switching/overlay comparison, redesign, ads, hosting/security/billing/domain/migration or other-project changes.

## Verification

- **106** full unit/regression tests passed, zero failed/cancelled/skipped. Normal production build and TypeScript passed; 383-card release gate passed. Existing large JS chunk advisory remains.
- Historical artwork check passed 120 reviewed pairs / 240 native PNGs. Existing delivery/master hash and native-dimension regression checks passed.
- Dedicated **Microsoft Edge / Chromium** headless browser on Windows, supported CDP `Input.dispatchTouchEvent`, local production preview 5190 and development StrictMode 5191, disposable contexts, controlled date. This is Chromium mobile touch emulation, not testing Samsung Chrome hardware.
- Newly completed round reached results through five real CDP touch placements and Remember confirmations. First pinch, shared image zoom, unchanged browser viewport scale, zoomed single-finger pan, pinch back to fit and native one-finger vertical scroll passed.
- Fit/reset/re-pinch; pinching over visible answer markers; hidden markers; restored completed results at DPR3; native pointercancel AND touchcancel delivery followed by a clean new pinch; no lingering long-press dialog; orientation change during touch followed by landscape pinch passed.
- Native fitted desktop wheel scrolling remains functional. Completed localStorage record was byte-identical before/after gestures and reload.
- Focused gesture regressions passed production preview and development StrictMode with no JS exceptions.
- Separate restored-layout/gameplay checks passed five viewport/DPR combinations: 320×568/1,390×844/3,844×390/2,1440×900/1,2560×1440/1. Native SVG source placement/aspect, no horizontal overflow, exact touch-to-clue coordinates, pending/reload/Continue, five-lock cap, result reload, paired answer inspection, historical saved card and expiry inside expanded viewer passed. 320 fitted painting remains 224×126.06 CSS px; no size redesign.
- Execution transport briefly disconnected and dropped the earlier preview server; a harness then timed out connecting to that server. Restarting the local server allowed the strengthened cancellation assertions to pass. These were tooling interruptions, not a game failure.

Evidence: `docs/results-touch-20261012/`, including before/after reproduction logs, full checks and targeted browser regression harnesses. Harnesses use this PC's absolute repo/CDP/local-server paths; they are local regression evidence rather than portable CI.

## Limits / publication

Physical Samsung Chrome confirmation is still required, especially fingers landing at slightly different times, actual orientation/browser chrome and background behavior. Physical iPhone/Android, actual native sharing/clipboard and a full accessibility study are not claimed. No production visit/real player data was used. No push or deployment; publication requires separate approval.
