# Launch-readiness audit

September 29, 2026. Changes on `main`, based on `4cb74bf`; the owner has explicitly approved commit, push and deployment. Publication verification is pending and will be recorded in docs/HOSTING.md. This is a bounded reliability pass, not a new game mode or app-installation project.

## Assessment

The core game passes its automated regression suite and sampled desktop-browser checks. It is a good candidate for a small real-device launch trial. Do not treat this as a full accessibility certification, vulnerability clearance, load test or proof of iPhone/Android behavior.

Before a broad public launch, complete the physical-device checklist below, choose a public support contact and review the public privacy explanation. The dependency-audit connection issue has been resolved safely. No account, backend, notification system or native app is required for these steps.

## Fixed in this pass

- Start says “Loading the dream…” while waiting for all six artwork files. A failed or stalled request offers Try again; timeout is 60 seconds. Retrying only reloads artwork and cannot reset a round, change saved progress or pause its deadline. Existing results and Continue remain reachable during a loading problem.
- Native share cancellation is quiet, rather than reported as an error. Unavailable/denied sharing or copying opens, focuses and selects the existing manual-copy message. No new share content or gameplay analytics is sent.
- Keyboard arrow movement in the expanded image starts from the existing pending circle, rather than jumping back to the center.
- Results receive keyboard focus when the round ends. Dialog Escape/focus-return behavior remains intact.
- The final remaining confirmation reads “1 guess left.” Landing artwork reserves its aspect ratio while loading.
- Removed an empty duplicate favicon; added basic Open Graph text metadata and a no-JavaScript explanation. A branded social-preview image is still optional follow-up work, not provided by text metadata alone.

## Verification

- `npm test`: **90/90 pass**, including ten new loading/sharing/copy tests. Existing coverage protects five total confirmations, taps versus confirmation, overlap hits, repeats, expiry, stale/double confirmation, storage failures, saved-round replay, accuracy-first/time-second ordering, streaks, calendar/holiday scheduling and all current/historical assets.
- `npm run build`: TypeScript and production build pass. No dependency added; no artwork, answer geometry, catalogue, storage namespace, timer or score-rule changes.
- `node scripts/validateLandscapeCollection.mjs`: all 120 historical reviewed pairs / 240 source files pass. The automated artwork checks also verify current delivery/master checksums. No image regeneration was necessary.
- Browser: local in-memory development rounds only, without modifying the owner's real daily attempt. Tested 320×568, 390×844, 844×390, 768×1024, 1024×768 and 1365×768. Landing Start is visible at these sizes; play/results have no horizontal overflow. Results retain the same painting widths/heights as play. Results intentionally scroll to accommodate answer explanations. At 320×568 the bottom instructional hint needs slight scrolling; the confirmation action remains reachable.
- Browser: tap/reposition consumes nothing; expanded-image keyboard movement retains the selection; viewer confirmation uses one guess; fifth confirmation immediately shows the fixed result; Copy reports success; answer navigation, dialog keyboard containment, Escape and focus return work. Landscape landing enlargement uses the available image area. No browser console errors observed in those flows.
- Browser: a separate round expired at 2:00 with the viewer open, automatically closing inspection and showing 0/5 · 2:00. This exposed a result-focus race with dialog cleanup; the correction was verified by finishing all five guesses inside the viewer, then opening/closing result inspection again. Result focus is announced once; later inspection returns focus to its own opener.
- Loading errors/timeouts and native cancellation/permission-denied outcomes are exercised with controlled unit-test fakes, not a real phone share sheet or browser network fault injection.

## Outstanding checks and decisions

### Before broad launch

1. **Physical iPhone Safari and Android Chrome**, preferably one older/smaller phone: cold-load on cellular; portrait/landscape; long-press, pinch, pan, image close and page scrolling from result images; tap without submitting; five confirmations; background/reopen past the deadline; reload/second tab retaining the attempt; Share/Copy into a real messaging app and open its link. Record device, browser, puzzle and reproduction. Browser viewport resizing is not device emulation of touch, Safari or mobile browser chrome.
2. **Public support destination:** owner chooses a dedicated email/contact link for broken puzzles and technical issues. Do not publish a personal/account email inferred from tools. A useful report asks for puzzle day, device/browser and what happened, not the player's whole stored history.
3. **Brief public privacy explanation:** describe browser-local attempts/streaks, their loss when site data is cleared, no account/cross-device sync, and optional Cloudflare traffic/performance analytics. Have the owner review the actual disclosure before publishing; this audit does not determine legal compliance. Current integration sends no custom guesses/scores/streaks and never gates gameplay.
4. **Dependency audit — passed:** the initial `npm audit --json` request failed because Node did not use Windows' trusted certificate store. Retrying with `node --use-system-ca "D:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" audit --json` succeeded and reported **zero known vulnerabilities**, including development dependencies. TLS verification remains enabled; no package or permanent trust settings changed. This is a point-in-time registry check, not a guarantee of security. Rerun for future releases.
5. **First-time-user check:** ask 5–10 people unfamiliar with Dreamerie to play without explanation. Confirm they understand five guesses total and Remember before committing their first guess. Gather difficulty/fairness feedback across several days, including visually dense and simpler cards.

### Measure before optimizing further

- Current 383-card delivery ledger: per-round artwork is **1.46–3.46 MB**, median **2.04 MB** (decimal units), across one original and five lossless native-resolution clue crops. These are local asset sizes, not measured cellular latency. A player does not download the entire 803 MB catalogue.
- Current build: JavaScript **1,206.24 kB raw / 249.42 kB gzip**, CSS **30.22 kB / 7.18 kB gzip**. The existing >500 kB chunk advisory remains. Catalogue lazy-loading is a possible separate optimization after real-device measurement; raising the warning threshold would not improve load time.
- Cloudflare currently provides traffic/performance, not gameplay completion or retention events. Check its dashboard after launch; additional gameplay instrumentation needs separate scope and privacy review.
- A branded share-preview image and an installable web app can follow. Neither is a substitute for the device/first-time-player checks above.

## Local review and publication

Run `npm run dev`; use `http://127.0.0.1:5173/?dream=revisit-dream-006` for an isolated development round. New day is development-only. Do not clear real localStorage or use a live daily attempt as disposable test data.

The owner has approved this release. Its publication commands are:

```powershell
git add AGENTS.md README.md docs/LAUNCH_READINESS.md index.html package.json src/components/InspectableDream.tsx src/game/artworkLoading.ts src/game/dailyRecall.ts src/game/sharing.ts src/v2/versionTwo.css src/v3/VersionThree.tsx src/v3/useArtworkLoading.ts tests/launchReadiness.test.ts
git diff --cached --stat
git commit -m "fix(launch): improve artwork recovery sharing and keyboard flow"
git push origin main
```

Deploy the exact approved commit to the existing Dreamerie Static Site, following docs/HOSTING.md; manual deployments stay enabled, and V2/private backups/suspended legacy hosting remain untouched. Verify the live bundle, image loading, share link and preserved saved result afterward. Record the final verified deployment separately rather than assuming a successful push is a live release.
