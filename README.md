# DREAMERIE

## Version 2 — 120 daily landscape dreams

Publication update: the scrolling fix below and shorter help tip are live as `84176e4`. All 41 tests and release checks passed; hosted results retain their size while scrolling and preserve saved progress. See `docs/HOSTING.md`. Test actual collapsing browser bars on a physical phone.

Local scroll-stability fix (not yet published): inline paintings use stable small-viewport height in play and results, so phone browser bars hiding/showing do not resize the pair while scrolling. Expanded inspection, scoring and saved attempts are unchanged. Suggested commit: `fix(v2): keep paintings stable during result scrolling`.

Checks: all 41 tests, typecheck and build pass (existing bundle-size advisory only). At 390×664, the pair stayed 277.17px wide during play, after the fifth guess, at the bottom of results and back at the top. Landscape 844×390 and desktop 1440×900 still adapt without horizontal overflow. Browser error logs were empty. Desktop viewport emulation cannot reproduce a physical phone's collapsing browser bars; check that behavior on-device after publication.

After explicit approval:

```powershell
git add src/v2/versionTwo.css README.md docs/ART_DIRECTION.md
git commit -m "fix(v2): keep paintings stable during result scrolling"
git push origin prototype/v2-landscape
```

Publication update: the full-stage inspection and transparent landing-button refinement below is now live as `9973755`. All 41 tests, typecheck, build and collection validation passed; hosted phone-size zoom and saved-result persistence were verified. See `docs/HOSTING.md`. Earlier “not yet published” wording records the pre-release milestone.

Latest local refinement (not yet published): the Start/Continue/View result container is transparent, with no separate dark-blue panel. All V2 enlarged viewers use the full available inspection area rather than clipping zoom to the original fitted painting rectangle. At 100% the entire painting is fitted; zoomed artwork can grow into the surrounding space. Empty letterbox taps do not place guesses. Pan/zoom anchors, markers and hit detection remain artwork-relative; short landscape viewers keep controls in an adjacent rail, outside the artwork. Resize updates fitted dimensions and pan limits without changing guesses or the deadline. V1 callers retain the existing default viewer geometry. This supersedes the earlier preview-only landscape sizing instructions.

Validation: 41 tests, typecheck and production build pass. Added full-window pan/rotation and zoomed-area coordinate regressions. Browser checks covered 320×568 through 1440×900, including 568×320 landscape; controls stayed on screen and outside the artwork. Verified background taps ignored, pending marker centered on a tap outside the old fitted frame, pan preserving the marker, confirmation consuming one guess, fifth-guess exit, result inspection and Reset. Start and View result backing both compute as transparent. Actual hardware long-press/pinch remains an owner check. Build emits a non-blocking bundle-size advisory (about 500.5 kB minified / 132.3 kB gzip); no dependencies were added.

Suggested commit after review: `fix(v2): use full inspection area and remove landing button panel`. To publish after explicit approval: stage `AGENTS.md README.md docs/ART_DIRECTION.md docs/GAME_DESIGN.md docs/PROTOTYPE_PLAN.md src/components/InspectableDream.tsx src/game/imageInspection.ts src/v2/VersionTwo.tsx src/v2/versionTwo.css tests/dailyRecall.test.ts`, commit with that message, then push `prototype/v2-landscape`.

Latest release: `0b3680f` is live on the V2 playtest site, including revised rhymes, new landing/fading wording and the larger landscape preview. All release checks passed; see [deployment verification](docs/HOSTING.md). The local-revision notes below now describe this published release.

Latest local revision (not yet published): use “Can you spot the differences between the dream and the memory?” and “The dream is fading...”. Daily quoted poems stay short, use clear end-rhymes, and suggest a shifting or unreliable dream without revealing answer locations. There is no strict sentence-count limit; the current set uses two brief lines per artwork. In short landscape viewports, the landing image viewer gives the uncropped painting nearly the full available height, with the title/hint in a slim side rail and the 44px close control beside the artwork. Portrait preview and gameplay/result viewers retain their existing layout. Rotation and click-to-zoom do not reset or pause a running attempt. These directions supersede older copy and two-sentence restrictions below.

Revision checks: all 39 tests and typecheck/build pass. Browser checks covered open-viewer rotation at 390×844, 844×390, 568×320, 640×360, 1024×600, 768×1024 and 1440×900; no artwork/control overlap or horizontal overflow. At 844×390 the fitted painting grows from about 412px to 651px wide. Click zoom in/out survives rotation; Home shows the new fading message with the deadline still running. Short-screen landing spacing keeps Start visible at 568×320. Physical device rotation/pinch remains an owner check. Suggested commit after approval: `fix(v2): refine dream verses and landscape preview`.

Publication update: the refinement below is now live on V2 as `a38350e`, following explicit commit/push/deploy approval on September 25, 2026. The quoted daily poems contain at most two sentences. All 39 tests, typecheck, build and collection validation passed; see `docs/HOSTING.md` for release verification. Earlier “not yet published” wording below records the pre-release milestone.

The V2 collection now contains **120 new playable landscape pairs**, with **five authored differences each (600 answers)**. The original portrait collection and the first V2 teacup sample are preserved. **Play online:** https://dreamerie-v2-playtest.onrender.com — release `0d46364`, deployed and verified September 25, 2026. All 246 published artwork sources are reachable, release checks passed, and V1 remains unchanged. See [hosting verification](docs/HOSTING.md).

Each day's painting follows the existing painterly, surreal card style. The Memory uses five carefully bounded areas from its edited counterpart over the unchanged Dream; incidental generation drift outside those areas is excluded. Native PNGs are preserved, with six targeted correction sources. Every answer has been inspected in enlarged production-rendered crops. Difficulty labels are editorial estimates; real-player calibration remains useful.

### Play and review locally

Run `npm install`, then `npm run dev`. Open http://127.0.0.1:5173/.

- Default route: the actual daily card and saved daily attempt.
- Development-only `?review=1`: inspect all 120 playable composites, answer close-ups and whole paintings.
- Development-only `?dream=dream-120`: an in-memory playtest of a chosen card.
- **New day (dev only)**: advance through all 120 without changing real saved progress.
- `?version=1`: preserved portrait version.

Production has no review route, card override or replay/reset button. One card is selected by the device's local calendar date; September 24, 2026 is Daily Dream #1. After 120 days the artwork repeats, but each date has its own saved attempt. An open round keeps its date until reload. This is a local prototype calendar, not server-enforced anti-cheat.

### Rules and persistence

Local refinement (not yet published): hold either painting for 450ms or use its quiet 44px-target expand icon beside the caption, outside the artwork, to open fitted full-screen inspection during play or results. In play, marking/Remember still work in the viewer and the deadline never pauses; fifth confirmation or expiry closes it. Result inspection retains found/missed overlays and Hide markers, and Fit on the comparison page restores scrolling. Keep both paintings stacked; on sufficiently wide, short screens use distinct header/status/control sidebar rows, never overlapping grid cells. Other sizes retain the centered stack, and results retain the centered score/share/answer flow. The answer heading is “What was different?”. The landing instruction is “Find the differences between the Dream and the Memory.” Each of the 120 card IDs has its own original, spoiler-free rhyming couplet in src/v2/dreamVerses.ts; the verse follows the daily artwork, remains stable on reload, and repeats with the 120-card rotation. No network quote service or storage migration.

Latest validation: 39 tests, typecheck and build pass. Browser checks cover 320px phones through desktop, including 640×360, 844×390, 1024×600 and 1280×720 intermediate layouts without horizontal overflow or status/control overlap. Expanded-view marking, one-guess confirmation, fifth-guess exit, natural two-minute expiry, result overlays, Hide markers, Escape/focus return and daily verse replacement were checked. Caption icons and viewer close controls remain outside the painting. Physical-phone long-press/pinch still need owner acceptance; browser checks exercised the accessible Expand path. No publication is included in this refinement.

Suggested commit: `feat(v2): restore art inspection and add daily dream verses`. After approval, stage `AGENTS.md README.md docs/GAME_DESIGN.md docs/PROTOTYPE_PLAN.md docs/ART_DIRECTION.md src/v2/VersionTwo.tsx src/v2/versionTwo.css src/v2/dreamVerses.ts tests/landscape.test.ts`, commit with that message, and push `prototype/v2-landscape`.

Published refinement (`2adf4ee`, September 25, 2026): the opening now reads “Spot the differences.” and “Tap to guess, Remember to confirm.” Finishing a round keeps the same painting dimensions and synchronized zoom/pan instead of switching to a narrower result layout and resetting zoom. Following feedback, the earlier centered score, tiles and Share/Copy block is restored above the pair, with readable answer explanations below. Results return to the top so the score is visible: the paintings move down to accommodate it, but do not shrink. The short-landscape gameplay sidebar becomes the same centered result flow. Fit still restores ordinary scrolling over either result image. The answer heading reads “The Five Differences”; the heading, list as a group, share-message toggle and footer are centered, with individual descriptions left-aligned.

Validation: all 38 tests, typecheck and build pass. The revised centered result flow was checked with five-confirmation rounds at 390×844 and 1440×1200, retaining identical artwork dimensions and the selected zoom. The desktop answer column is 608px wide, rather than squeezed into the gameplay sidebar. Physical phone gestures remain a separate acceptance check. After testing and explicit approval, the suggested publication commands are:

```powershell
git add src/v2/VersionTwo.tsx src/v2/versionTwo.css README.md docs/ART_DIRECTION.md
git commit -m "fix(v2): keep artwork size and zoom stable in results"
git push origin prototype/v2-landscape
```

Both images remain stacked and share zoom/pan. Tap either to place or move a pending circle; **Remember** alone confirms. Exactly five guesses total, including misses/repeats, and two minutes with no pause. The whole circle counts for overlap. Accuracy always ranks first; only tied accuracy compares whole-second recall time. Results reveal all five differences and offer spoiler-free score/time sharing.

The collection uses `dreamerie:v2:daily-collection:v1` storage, independent of V1 and the previous single-sample attempt. Existing stored data is never cleared or migrated. Reload, Home, help and backgrounding retain the deadline. Clearing site data permits replay; devices/browsers remain independent.

### Validation and artwork records

Run `npm test`, `npm run typecheck`, `npm run build`, and `node scripts/validateLandscapeCollection.mjs`.

All 38 tests and typecheck/build pass. Collection tests exercise all 120 cards: five reachable answers, valid geometry/native assets, tapping without submission, perfect completion, duplicate scoring protection, five-guess ceiling, expiry and result restoration. Shared rule tests cover circle overlap, accuracy/time ordering, share text and storage failure behavior.

[Collection QA and limitations](docs/artwork/V2_COLLECTION_PROGRESS.md) · [generation provenance](docs/artwork/V2_COLLECTION_MANIFEST.json) · [final answer audit](docs/artwork/V2_PLAYABLE_AUDIT.json).

The source-only review gallery and prompt manifest are archived under docs, not shipped as public game pages. Runtime images are under `public/artwork/v2/collection/`. Only today's two sources (plus a targeted correction when needed) are loaded, not the entire collection. Native files total roughly 600 MiB for the new collection, so initial daily image loading can take longer on slow connections; Start waits for the paintings.

### Version 1 release notes (historical/current public site)


Dreamerie is now a mobile-first daily spot-the-difference game. Two visions of one surreal Dream stay visible together—stacked in phone portrait, side by side in landscape and on desktop; use exactly five confirmed guesses to find five changes before the two-minute timer ends. Accuracy is the score, and elapsed time breaks ties.

**Play online:** https://dreamerie-playtest.onrender.com — Home-navigation release `991a597`, deployed and checked September 23, 2026. Open this HTTPS address on your phone or browser; localhost is only for development. All 31 release tests, GitHub checks and Render build passed. See [hosting verification](docs/HOSTING.md).

The current prototype is intentionally local and small: React, TypeScript, Vite, straightforward CSS, and local artwork. The 120 original illustrations are preserved; **all 120 cards now have individually authored, object-edited pairs**, with five declared answers each (600 total). Automatic circular color/shift effects are no longer used. No account, multiplayer, Discord, database, or production service is required.

## Play locally

### Home navigation polish (live)

Click Dreamerie to return to the landing screen. Resume returns to an active attempt and View result reopens a completed score; neither resets guesses or the original deadline. Result captions now read **Found · Green** and **Missed · Red**. The user approved publication; release `991a597` is verified live. These commands record the completed publication, not a request to repeat it:

```powershell
git add src/App.tsx src/styles/global.css README.md docs/GAME_DESIGN.md docs/ART_DIRECTION.md
git commit -m "fix(ui): add Dreamerie home navigation and capitalize result labels"
git push origin main
```

Hosted checks verified click and keyboard home navigation, View result preserving the existing score/time, the capitalized labels, and no browser errors. Local checks also covered Resume retaining the pending marker and running deadline. No site data or hosting settings were changed.

### Saved daily attempts and simpler landing controls (live)

The landing viewer now toggles zoom on click/tap without a selection ring or zoom toolbar. **remember** is bold in the rules. Start stays at the bottom of narrow/short screens without needing to scroll; the painting and poem can still scroll normally. The viewer X sits immediately above the artwork's top-right edge. The comparison labels are **The Dream** and **The Memory**.

The real daily attempt is saved in this browser, including its original start time, guesses and pending marker. Refreshing, reopening or using another tab resumes the same attempt, not a fresh timer. Time away counts toward the two minutes. A finished game returns to its saved score/time, share controls and answer reveal; **Dream again** is removed. A new local calendar day opens a new puzzle. Clearing this site's stored data permits replay; this is per browser/profile/device, not account-based anti-cheat. Storage must be available in a current HTTPS/localhost browser with Web Locks; failures show a warning rather than accepting unsaved play. Development review/New day rounds stay in memory and do not alter the saved daily attempt.

Verification: 31 tests cover round rules plus saved pending guesses/deadlines, five-guess result restoration, stale/duplicate confirmations, cross-tab re-reads, invalid records and failed writes. Typecheck, tests and build pass. Browser checks confirmed click-to-toggle preview without markers, a reachable Start at 320×568, close placement above the artwork, live cross-tab updates, resumed countdown/guesses after reload, and unchanged completed/expired results after reload. Real-device touch acceptance remains recommended.

The user approved publication. Release `79bcf49` is verified live; these commands record the completed publication, not a request to repeat it:

```powershell
git add AGENTS.md README.md docs/GAME_DESIGN.md docs/PROTOTYPE_PLAN.md docs/ART_DIRECTION.md src/App.tsx src/components/InspectableDream.tsx src/game/dailySession.ts src/game/useDailySession.ts src/styles/global.css tests/dailyRecall.test.ts
git commit -m "feat(game): save daily attempts and simplify landing controls"
git push origin main
```

Hosted Chrome checks at 390×844 confirmed visible Start, bold remember, click-to-zoom in/out without guess markers, the X above the artwork, correct labels, tap without submission, one guess consumed by confirmation, and continued timer/guess state after refresh. No New day control or browser errors appeared. The test attempt remains saved in the checking browser; no site data was cleared. Hosting settings are unchanged.

### Full-screen artwork inspection (earlier release)

Click/tap or hold the landing painting to view it fitted to the screen. During play, tap to mark a guess; hold or choose **Expand** to look closer. Zoom/pan lives only in the viewer, using pinch/wheel/drag or +/−/Reset. The visible X or Escape returns to the pair without losing a pending guess. Remember remains available in the viewer; the two-minute timer keeps running, and expiry/final confirmation returns to the results. Expanded result images retain Hide/Show markers. Side-by-side is used on wider screens and portrait tablets; narrow portrait phones stack. No instant version-swap control is added.

The user approved committing, pushing and deploying this update. Release `95aee6a` is verified live. Publication commands below are a record, not a request to repeat the commit:

```powershell
git add AGENTS.md README.md docs/GAME_DESIGN.md docs/PROTOTYPE_PLAN.md docs/ART_DIRECTION.md src/App.tsx src/components/InspectableDream.tsx src/game/imageInspection.ts src/styles/global.css tests/dailyRecall.test.ts
git commit -m "feat(game): add full-screen dream inspection"
git push origin main
```

The earlier mobile release notes below describe the former inline-zoom implementation, now superseded by the live viewer above.

Viewer verification: 24 automated tests cover the existing round rules plus bounded pan/reset, anchored zoom and coordinate mapping at different sizes/zoom levels. Browser checks covered 320×568 and 390×844 phones, 768×1024 portrait tablet, 844×390 landscape and 1280×800 desktop, with no horizontal overflow. Verified landing click-to-open, stationary mouse hold without a guess, Expand, wheel/+ zoom, drag without a pending guess, pending selection preserved on close/reopen, one guess per confirmation, automatic close after five confirmations and timer expiry, result marker hiding, keyboard arrow selection, Escape and focus return. Controls are outside the artwork. Browser errors were empty. Actual phone long-press/pinch and native sharing still need physical-device acceptance. Run `npm run typecheck`, `npm test`, and `npm run build` to repeat the automated checks.

**Earlier mobile refinement (historical):** portrait stacking, wider landscape comparison and whole-circle overlap scoring. The circle has the same artwork-relative size on every device; touching an answer region is enough, but repeat hits cannot score again. This release used synchronized inline pan/zoom, now replaced by the viewer above. Automated coverage includes edge/corner overlap, multiple-target priority and device/zoom scaling. Physical two-finger gestures still need owner testing.

The approved publication commands were:

```powershell
git add AGENTS.md README.md docs/GAME_DESIGN.md docs/PROTOTYPE_PLAN.md docs/ART_DIRECTION.md src/App.tsx src/styles/global.css src/game/dailyRecall.ts tests/dailyRecall.test.ts
git commit -m "fix(game): improve mobile comparison and circle hit detection"
git push origin main
```

The user approved committing, pushing and deploying this earlier refinement on September 23, 2026. Release `f0e2a43` was verified live before the viewer release; see the hosting notes for the deployment record. These commands are a record, not a request to repeat the commit.

Mobile-refinement browser checks passed at 320×568 and 390×844 portrait, 844×390 landscape and 1280×800 desktop: larger stacked cards, no horizontal overflow, reachable confirmation, sticky portrait controls, ordinary portrait scrolling without a guess, synchronized zoom/pan through rotation, and no browser errors. An outside-center moon overlap scored correctly at 100% and 125% zoom; four repeats consumed the remaining guesses without extra credit (1/5). Timer expiry also revealed the correct one-found/four-missed split. These emulated checks do not replace physical-phone touch testing.

Use Node.js 22.18+ or 24+ and npm.

```powershell
npm ci
npm run dev
```

Open the URL Vite prints, normally `http://127.0.0.1:5173/`.

```powershell
npm run typecheck
npm test
npm run build
npm run preview
```

The puzzle catalogue and answer regions live in `src/data/authoredDreams.ts` and `src/data/authoredExpansion.ts`; scoring, sharing, timing settings, and hit detection live in `src/game/dailyRecall.ts`. The opening shows the day's original artwork above the reverie poem and short rules; no timer runs during this preview. **Start** opens both images and starts the two-minute timer. Tapping either image only moves the pending circle; **Remember** consumes one of five guesses. Mouse-wheel zoom, touch pinch/drag, and visible zoom controls keep fine changes inspectable.

Each painting gets its own changes: expressions, moon phases, fabric patterns, plants, architecture, missing pieces, and existing-object colors. Red bows and gold buttons are not a repeated formula. Generated edits are clipped to five declared regions over the untouched original, keeping everything outside those regions identical. Source prompts and provenance are stored beside the edited artwork in `public/artwork/differences/`. Every ending shows found answers in green on the original (top/left) and missed answers in red on the changed image (bottom/right). Numbered outlines gently fade completely out and back in; Hide markers clears them manually. Reduced-motion users get static outlines and the same hide control. All five descriptions remain visible below, and zoom stays available.

The result format is `accuracy · elapsed time`, for example `4/5 · 1:07`. Higher accuracy always ranks first. Faster time matters only when accuracy ties; equal accuracy and equal time are tied.

### Sharing a result

The landing artwork is now the focal point: Dreamerie sits directly above the daily number and large card. Desktop places the poem and Start alongside the painting; phones stack them below. Testing controls move to the bottom on this screen only. The layout was checked at 1280px, 390px and 320px widths, with no horizontal overflow and Start still usable.

Results show five Wordle-style tiles ordered by difficulty, plus **Share result**, **Copy result**, and an expandable message preview. Native sharing is used when available; copying is the fallback, with selectable text if clipboard access fails. The shared message contains the day number, accuracy, elapsed time, five purple/black squares, and a link to play, without answer locations or descriptions. The link uses the current site's address/path, removing review parameters, other query data, fragments and credentials. It opens the current daily game, not a saved score page or archived puzzle. Friends see the score and time in the message itself.

Localhost links only work on the same computer; the result screen warns about this. On a public host, shares automatically use that public address. The user has now approved deployment to the existing Render service; see [current hosting notes](docs/HOSTING.md) for setup and release verification. `npm start` serves the built game and health check only, leaving the legacy room database untouched. Native operating-system share destinations still need a physical-device check; no message was sent to anyone during verification.

The previous social/card-selection game, including the uncommitted reset notes that preceded this redesign, is preserved on `prototype/social-dreams` at commit `c6b1cbd`.

### Artwork review

In development only, open `http://127.0.0.1:5173/?review=card-120` to inspect a specific card (001–120). Production ignores this override. Use the development-only **New day →** control at the top to advance to another card and reset to the rules screen. It advances the displayed test day without changing the real date, wraps after all 120 cards, and resets on page refresh. Review/simulated-day shares are prefixed Playtest; production has no New day control. The spoiler-containing [answer ledger](docs/ARTWORK_REVIEW.md) lists all five changes for every card. The gallery remains one daily pair, not a card-selection dashboard.

### Review and handoff

Checks passed: twenty-one rule/catalogue/sharing/overlap/hosting tests, TypeScript checking, production build, and Git whitespace checks. The catalogue tests require all 120 IDs, original/edited assets and provenance, five reachable answers per card, valid normalized regions, and correct nested-hit priority. Share tests cover score/time, perfect and expired grids, spoiler-free text and clean play URLs. See `docs/ARTWORK_REVIEW.md` for the artwork review and limitations. Browser checks covered desktop and 390px phone-sized layouts, pending-marker repositioning across both images without submission, one guess per confirmation, duplicate-found consumption without a second score, immediate five-guess completion, timer-expiry reveal, and wheel zoom after results without further scoring. The latest opening/share check verified the original artwork, exact new poem, Start, five-confirmation results, copy-success feedback, complete share preview, and New day's artwork replacement. Physical multi-touch pinch still needs a real-device playtest. Difficulty labels are editorial estimates, not calibrated player data.

Changed areas: `src/App.tsx`, `src/styles/global.css`, `src/game/dailyRecall.ts`, `src/data/authoredDreams.ts`, `src/data/authoredExpansion.ts`, `tests/dailyRecall.test.ts`, 120 edited assets and their provenance under `public/artwork/differences/`, frontend package scripts, `.gitignore`, and the five primary project/design documents and the new full answer ledger. Original deck artwork is untouched. The discarded automatic discoloration/position generator is removed; its output is not used.

The user approved committing, pushing and deploying the full redesign on September 20, 2026. The earlier handoff commands below cover the frontend; deployment additionally includes `scripts/serve.ts`, `tests/staticHosting.test.ts`, `render.yaml` and `docs/HOSTING.md`. Run release checks before any future publication.

```powershell
git add .gitignore AGENTS.md README.md docs/ART_DIRECTION.md docs/GAME_DESIGN.md docs/PROTOTYPE_PLAN.md docs/ARTWORK_REVIEW.md index.html package.json src/App.tsx src/styles/global.css src/game/dailyRecall.ts src/data/authoredDreams.ts src/data/authoredExpansion.ts tests/dailyRecall.test.ts public/artwork/differences
git commit -m "feat(dreams): add daily difference game with 120 authored art pairs"
git push origin main
```

If the opening/sharing refinement is committed separately after the base redesign, its suggested message is `feat(dreams): add daily artwork welcome and shareable results`.

For the subsequent landing-layout refinement, after the earlier redesign is committed and this change is approved:

```powershell
git add src/App.tsx src/styles/global.css README.md docs/ART_DIRECTION.md docs/GAME_DESIGN.md
git commit -m "style(dreams): make daily artwork the landing focal point"
git push origin main
```

## Historical social prototype notes

Everything below describes the preserved social prototype and is not authoritative for the current Daily Dream Recall mode.

**Former premise:** How well do you understand the way your friends see the world?

## Current status

**Local update ready for testing, not yet deployed:** New rooms default to **Word of the Day** (choose cards for supplied words). Creators can select **Your own dream clues** instead; invitees see and join that fixed mode. Existing rooms retain personal clues and old scoring. Both modes still prepare six Dreams on Day 1. A small book cue marks the next preparation prompt, and personal clues now include examples and appear on a clue card with **Which was [name]'s Dream?**

Word of the Day awards 3/2/1 points for the most-recognized eligible cards, with ties consuming places (3, 3, 1). Zero correct guesses earns zero; everyone recognizing a card is allowed. There are no guessing points. Personal mode keeps its previous guessing/recognition rules. Hints and results follow the room mode. The separate original shared-word solo comparison retains historical guessing-only points. The following deployed-status notes describe the previous release.

**Prototype 0.2.8 is deployed for initial hosted testing.** Work through 0.2.7 is approved by the instruction to proceed. Dreamerie is live at https://dreamerie-playtest.onrender.com. HTTPS health, room creation and refresh persistence pass; full hosted multiplayer, phone testing and backup/recovery acceptance remain pending. Approved access is anyone with the site link, without a shared password; individual rooms still use invitations and protected browser sessions. Private rooms already support 2–6 actual players through preparation, guessing, host or scheduled reveal, and a retained full-week recap; both local practice modes remain separate.

The host can advance before everyone finishes after confirming unfinished players. Missing preparation or incomplete guesses earn zero total points; a prepared Dream remains a target, and unfinished guesses do not contribute recognition. Only completed guessers count toward “everyone.” Late joiners prepare unopened Dreams and begin guessing the next day, without changing existing boards. With two players, recognition is always zero; correct guesses still earn one point.

Days now progress automatically at midnight **America/Chicago**, even with no browser open, while the room service is running. Starting a week or manually opening a day gives the remainder of today plus all of tomorrow: Monday evening → Wednesday at 12:00 AM. Automatic days then last until the next Chicago midnight. At each cutoff, results are revealed and the next day opens immediately; Day 7 ends the week. After downtime, the service catches up every overdue day using the approved missed-day policy.

Hosts can explicitly close a room for everyone. Only already revealed results remain; the unfinished day is not revealed or awarded points. Completed and closed rooms retain their personal recaps for seven days. Waiting rooms expire 24 hours after creation unless the host starts the week. Disconnecting never transfers the host role or stops scheduled progression.

See [the plan](docs/PROTOTYPE_0_2_PLAN.md), [hosting instructions](docs/HOSTING.md) and [scaling roadmap](docs/SCALING_PLAN.md). The first deployment uses one server and a persistent SQLite disk; a large public audience will need measured capacity and shared persistence before adding servers. Solo matchmaking is deferred. Deployment preparation is not completion of the hosted human playtest.

Round results now appear between **The dream comes into focus.** and **Dreams remembered**, above the dream cards. The summary includes each friend's dream clue, your guess result and points, followed by friends' recognition of your Dream and its points. It wraps across two columns on phones, up to three on tablets and up to five on wider screens. Shared rooms use the actual roster and support five friends. Long result text scrolls within the reserved summary area so the cards stay stationary.

Player-facing text now consistently calls the text **dream clues** and the illustrations **dream cards**. Saved pairs are confirmed above the preparation progress with **Your dream clue and dream card are remembered.** Friends' dream clues are larger, headed **Nancy’s Dream Clue** (or Song's), with **Select their Dream Card.** underneath.

The local comparison experiment is **Your own dream clues**: prepare six personal clue-and-card pairs instead of matching shared concepts. Write up to 80 characters for each Dream, choose its image, and confirm them together. Nancy and Song use a mix of single-word and longer fixture clues with random valid cards/guesses. Their individual clues guide the same sequential guessing board.

Personal slots are named **First Dream** through **Sixth Dream**. The softer input hint reads **Tell us about your dream... but leave some to the imagination.** The heading is **First Dream**, advancing through all six Dreams. The prominent instruction **Write a dream clue and choose its dream card.** sits beneath it; the tap/hold hint sits immediately above the cards. A compact **Dream 1 of 6** progress line replaces the repeated personal-mode overview. Tentative guesses say **Selected for Nancy** or **Selected for Song**; after reveal, decoy images are labeled **A Stranger’s Dream**. The rules and reversible mode switch are unchanged.

In this mode, each correct guess earns you 1 point. You also earn 1 point for each friend who recognizes your Dream, **except when both friends recognize it**, when your recognition award is 0. They keep their correct-guess points. The local maximum is 3 points per day / 18 per week. Recaps retain the clues, images, guesses and recognition results.

**Easy comparison:** choose **Original shared words** on the welcome screen, or use the footer's **Try original shared words · starts a new week** button. You can also open `http://127.0.0.1:5173/?mode=classic`; use `?mode=personal` for the experiment. Switching starts a fresh week and clears current local progress. Original mode retains TIME/LOVE/etc., the same artwork and interactions, and its existing guessing-only scoring. No Git rollback is needed. The run-through below describes that original mode; both modes use the same Day 1 preparation and Day 2–7 guessing controls.

Milestones 1–6 are approved. Milestones 7–10, including the requested full-week test flow, are implemented, and the user approved proceeding to Milestone 11. Day 1 is preparation; the top-right development control advances through six guessing days. Each day has Nancy's prompt followed by Song's on one stable board, locked guesses, an explicit reveal, and +1 point per correct answer. After Day 7, finish the week to see Charlie's total and begin a fresh week. Nancy's and Song's random valid choices are local fixtures, not a model of personal interpretation.

Prototype 0.1 uses **React, TypeScript, and Vite**. Charlie is the human; Nancy and Song are simulated players. All 12 planned milestones and the subsequent personal-clue, scoring and presentation refinements are implemented and approved. Open the local demo for solo practice; choose private rooms for a shared week.

The latest requested revisions add clearing/unlocking guesses before reveal, Charlie's own Dream in the first board slot, and a complete end-of-week recap. The “Return to the beginning” controls have been removed. The user approved moving on to the responsive polish step.

The user confirmed +1 per friend who recognizes your Dream, except when everyone does. This is implemented in personal-clue mode. Both modes simulate friends' guesses, and scoring help follows the selected mode.

## Run locally

For the proposed hosted setup, use [HOSTING.md](docs/HOSTING.md) and record actual-host/device checks in [PLAYTEST_RECORD.md](docs/PLAYTEST_RECORD.md). `render.yaml` specifies manual deployments and has maintenance mode disabled for the approved public entry; importing it provisions paid resources and a successful deployment opens the site. The GitHub workflow checks Linux/Node 24 but never deploys. Production requires an absolute database path outside served asset directories; backup, verify and restore commands are documented in the hosting guide. Local run commands below stay the same.

Use Node.js **22.18+ on the 22.x line, or 24+**, and npm. Node 24 LTS remains the intended hosting runtime; this implementation and native SQLite installation were tested on the existing Windows Node 22.18.0 / npm 11.5.2 environment. The development service uses Node's built-in TypeScript support.

### Shared private Dream Weeks (0.2.7)

Install dependencies if needed, then start the room service:

```powershell
npm install
npm run dev:server
```

In a second terminal:

```powershell
npm run dev
```

Open **http://127.0.0.1:5173/?play=rooms**, or choose **Gather friends in a private room** on the welcome page. Use this exact address (not `localhost`) with the default origin setting. If Vite was already running during package installation, restart it. Stop either process with **Ctrl+C** in its terminal.

Create a room, copy its invitation, and open it in a different browser or an InPrivate/incognito window. Join with another display name. Ordinary tabs in the same browser share a seat; private windows can also share one private session. Use separate profiles to test six distinct players. The room creator chooses **Start Dream Week** in the top-right corner once at least two people have joined.

Create a new room and choose its mode before inviting friends. In Word of the Day, each player selects six cards for supplied words; personal mode asks for six clues and cards. The host chooses **Open Day 2**, everyone guesses their actual friends’ cards, and the host chooses **Reveal dreams**, then **Next day**. Repeat through Day 7 and **Finish week** to review the week. Guesses can be unlocked until reveal. Refresh or restart the service to check that accepted choices and results remain; a rejected stale choice requires a deliberate retry rather than silently applying it to a new day.

To check the missed-day policy, let the host progress while a player is unfinished and confirm the named players. Missing preparation gives that player no board and zero points. Incomplete guesses give zero total points; the prepared Dream stays available for others to guess. A late invitation starts a new seat on the next unopened day, with remaining preparation available immediately. No new player can join after Day 7 opens. Readiness is under **View players**; results remain under **Earlier Dreams**.

The date above the room shows its authoritative cutoff in Chicago time. A host reveal keeps that deadline; **Next day** creates a new full-day window. Earlier results remain inspectable after automatic advancement. Restarting the service preserves deadlines and catches up overdue days. Existing active rooms without deadlines receive one fresh window on their first scheduling upgrade. Waiting rooms display a separate expiry time, 24 hours from creation; joining or refreshing does not extend it. Starting clears that lobby expiry.

To test closure, use the host's **Close this room** button below the game. **Keep dreaming** or Escape cancels; **Close for everyone** ends the week permanently, preserving only revealed days and their points for seven elapsed days. Both players see a read-only recap with inspectable cards and **Gather in another room**. Creating another room leaves the earlier recap intact. A changed room invalidates an open confirmation; review it again. At an elapsed day deadline, the server resolves that due day before accepting a new close request.

An expired room shows a clear ending with no gameplay controls or recap cards; a new visitor's old invitation is rejected. Temporary network loss preserves accepted work and reconnects; an ended browser session hides cached gameplay and offers a new-room path. It cannot restore a lost seat.

For an immediate scheduling check without waiting for midnight, run `npm run test:server`: its controlled clock checks cutoff behavior, daylight-saving changes and recovery. There is no public clock-changing endpoint. Stopping `npm run dev:server` stops the timer until the service restarts.

Only **Solo practice · simulated players** leads to Nancy and Song. Staying inside the joined room uses the shared game.

Names use 1–24 characters after trimming/collapsing whitespace; case and Unicode compatibility differences do not make a duplicate name distinct. Add an initial if needed. A name or invitation never recovers another player's seat. Session cookies last 30 days; clearing browser data, closing the last private window, switching profiles/devices or losing the cookie loses access to that seat. There is no account recovery or seat-removal flow yet.

The service stores local rooms, private gameplay and results in ignored `data/dreamerie.sqlite` with SQLite sidecar files, separately from the in-memory local demo. Startup preserves seats and invitations; schedule migration 003 adds persisted deadlines. Lifecycle handling uses the existing expiry field, without another schema migration. Expiry runs at startup, every 15 seconds, and on room access while the service runs. Seven elapsed days after completion/closure, private game state (including clues, cards and guesses), results and schedules are removed. Room identity, invitation, memberships/display names and command receipts remain so old links explain expiry and retries cannot recreate a room. This is not a full database erasure. Automatic completion retention starts at the scheduled end, even after downtime. Older completed/closed rooms without expiry receive one fresh seven-day window on upgrade; older waiting rooms expire from their original creation time. `.env.example` lists optional settings; no `.env` is needed for the defaults. Never put the database under `dist/` or `public/`, which contain public assets.

This loopback URL works only on this computer. A shared phone/remote-browser URL and HTTPS hosting come in the later hosted-playtest milestone. `npm run preview` serves only the local demo assets; use the two-terminal setup above for rooms.

To check the compiled service serving the frontend on one local origin:

```powershell
npm run build
$env:SERVE_STATIC='1'
$env:APP_ORIGIN='http://127.0.0.1:3001'
npm start
```

Open `http://127.0.0.1:3001/?play=rooms` after stopping any service already on port 3001. These settings apply to this terminal; use a fresh terminal for the default development commands. Production configuration requires HTTPS and an explicit persistent database path; it has not been deployed.

### Local game demo (0.1)

```powershell
npm ci
npm run dev
```

Open the local URL printed in the terminal, normally `http://127.0.0.1:5173/`. Press Ctrl+C to stop the server. Choose **Enter your Dream Week** to see TIME, LOVE, FREEDOM, HOME, FEAR, and CHANGE. The top-right development controls show the local test day; the randomized concept schedule remains hidden.

The weekly overview, current prompt, and six cards share one preparation page. It starts with **You dream of TIME. What does that look like to you?** Tap a card to mark it as chosen, then use **Remember this dream** to commit it. The image is replaced in the same slot, and the prompt advances to LOVE in place. The magnifier beneath each card, labeled **Look closer**, enlarges it without selecting it; holding and releasing the image does the same. **Return to your cards** or Escape closes inspection without committing it. No gallery or setup-page navigation is required between choices. After six choices, **Your dreams are remembered.** appears in place with no further choice controls. The displayed cards are the images left in your hand, not the selected Dreams; they can still be enlarged without changing anything.

You remain on **Day 1** after completing preparation. Use **Next day →** in the top-right development controls to simulate **Day 2**. This is available only after six choices; no clock or real day wait is involved. The first concept comes from the hidden randomized order and may differ from TIME. First, **Nancy dreamt of [concept]. Select their Dream Card.** Mark a card and confirm **Remember Nancy’s dream**. Your guess locks, and Song's prompt appears on the same board. Choose a different image and confirm **Remember Song’s dream**. Both guesses then remain locked until you choose **Reveal their dreams**.

Reveal keeps the same six cards in position, labels friends' actual Dreams and decoys, and shows your guesses on their cards. The summary above the cards explains each result and adds +1 per match to your total. **Next day →** becomes available after reveal. Repeat through **Days 2–7**, one concept per day, then choose **Finish week** to see **The dream fades.** and your total out of 12. **Begin a new week** clears the previous week and returns to Day 1 with fresh hands, friend selections, and a hidden order. There are no simulated friend scores or standings.

Tap a marked card again to clear an unconfirmed selection. Before reveal, use **Unlock guess** beneath Nancy's or Song's locked card to change that guess. Nancy uses a rose accent and Song a blue accent, matching their prompt/result names, locked-card borders, lock labels and tinted unlock buttons. Each unlock button has an open-lock icon and an accessible label naming the friend. The other friend's choice and board order stay intact; both guesses must be confirmed again before reveal. Once revealed, the results are final. Colored borders continue to identify your guesses, not actual ownership or correctness.

The palette supports six player slots: **indigo, rose, blue, amber, forest and plum**. Accents follow player IDs in the stable roster order rather than display names. Charlie, Nancy and Song use the first three; the other colors are available for future players. The prototype still runs with three players, and this palette does not establish a production group-size limit.

Use the **?** button beside Dreamerie in the top-left corner for **How scoring works**: +1 for each correct guess, 0 for a miss, and no guessing points from your own reference card. With two friends and six guessing days, this prototype offers up to 2 points per day and 12 per week. The dialog also explains that guesses can be unlocked before reveal. Escape or **Back to dreaming** closes it and returns focus without changing choices, locks, score, day or page position.

Your own Dream for the current concept is always the first of the six cards during guessing and reveal, with an indigo border and “Your Dream · View only” label. It cannot be assigned to a friend. The other five cards contain Nancy's and Song's Dreams plus three fresh decoys. Each card has a **Look closer** magnifier beneath its artwork; you can also hold and release the image to inspect it without choosing or committing a guess. Your own Dream and locked images remain inspectable by tapping them; Escape or **Return to your cards** closes inspection. The week ends with all six concepts, your own Dreams, Nancy's and Song's actual Dreams, your final guesses, and results. Refreshing or **Begin a new week** clears that recap and resets to Day 1.

```powershell
npm run typecheck
npm test
npm run build
npm run preview
```

The build includes frontend/server TypeScript checks and writes frontend assets to `dist/` and the service to `dist-server/`. Tests use Node's built-in runner and TypeScript stripping. All **122 tests** pass, including full shared weeks, privacy, allocation/scoring, authorization, concurrency, retries, scheduling, lifecycle, online backup/restore and production path guards. The public-entry HTTPS test verifies anonymous page access, session creation, invitation joining, host-only controls and private clues. Use `npm run test:server` for service tests with controlled time. The compiled app passes a same-origin browser run through a two-person week, refresh, lock/unlock, six reveals, recap inspection, early progression and late joins at the six documented widths. This local smoke test uses loopback HTTP; production Secure-cookie behavior is separately covered by service tests. The Render Blueprint passes local validation against Render's published schema, and the CI YAML parses. Actual Render provisioning, Linux/Node 24 CI execution, physical phones and hosted midnight/backup operation remain unverified; see the playtest record. Earlier validation covered both local modes and full two- and six-player weeks.

Nancy and Song each receive a private six-card board and make two random valid guesses when a day begins. They cannot choose their own Dream or reuse an image for both friends. Their choices stay fixed while you choose or unlock guesses. After reveal, see whether each friend recognized your Dream; the final recap includes their guessed images under **Your Dream through their eyes**. Tap those images to inspect them. These are local random fixtures, not an AI interpretation of the artwork; no friend standings are shown.

The requested visual refresh uses **120 distinct local illustrations**, a separate illustrated welcome scene, and a muted periwinkle, indigo and violet interface. The cards span vivid colors, quiet pastels, light and dark moods, funny scenes, and more abstract visual puzzles. They draw on the user's illustrated references and Dixit's associative storytelling with original compositions. The full card image remains visible in play and inspection. Selection and lock labels sit below the artwork.

Artwork was generated during development with the built-in image-generation tool; the game has no live generation API or external image service. See [asset provenance and synchronization](public/artwork/README.md) and the [recorded prompt set](docs/artwork/prompts.json). The original SVG fixtures are archived and no longer dealt. All 120 illustrations were visually reviewed and decoded successfully in the browser. The 45 tests, TypeScript checks, production build and full-week browser checks at six viewport widths pass with the new deck. The original visual refresh preceded Milestone 11; the deck retains its broad palette.

## Milestone 11: calmer choices and less scrolling

Cards keep their positions when you select, clear, lock, unlock or reveal a choice. Captions, revision controls and prompt space are reserved; changing a friend or preparation concept focuses its heading without scrolling the page. The current prompt also appears above the confirmation controls, which stay within reach while scrolling. A magnifier beneath each card opens inspection independently of selection. Holding for about half a second and releasing also opens inspection; moving to scroll cancels the hold. Neither method changes a tentative choice. The centered confirmation button remains compact and separate from inspection. Keyboard focus scrolls clear of the action area.

The weekly overview and spacing are more compact. Phones keep two columns; tablets and desktops show three larger cards per row. Muted periwinkle surfaces soften the contrast with the indigo background. Small screens can still scroll so illustrations remain readable. The complete week recap remains visible with tighter spacing. A new separate moonlit doorway illustration and indigo/violet surroundings replace the teal welcome theme.

Validation: all 45 rule tests, TypeScript checks and the production build pass. Edge exercised the full week, recap and restart at 320x568, 375x667, 390x844, 430x932, 768x1024 and 1440x900. Dedicated geometry checks verified unchanged card rectangles and scroll position on selection, deselection, replacement, lock/unlock and reveal at all six sizes. Keyboard checks cover visible focus, unobscured cards, inspection/Escape and scroll restoration at the smallest phone size, with reduced motion enabled. Phone and desktop screenshots were reviewed. The follow-up revision rechecked these layouts and stationary cards with three desktop columns, plus all twelve card/zoom keyboard targets at 320px, real touch holds, preserved tentative choices, scroll/pointer cancellation and normal tap toggling. The user approved proceeding to Milestone 12 after this refinement.

## Milestone 12: gentle transitions

Dream prompts fade into place briefly as the concept or friend changes. Incoming preparation cards fade after their image loads; the five unchanged cards stay mounted and do not replay the effect. Selection frames ease their color, and chosen/locked labels and reveal results appear softly. The effects last 140-260ms and change only opacity, color or shadow, never card position or dimensions.

Choices, focus, confirmation, unlocking and day progression update immediately without animation timers or waiting for an effect to finish. Answers still appear only after explicit reveal. With the system's reduced-motion preference enabled, every new effect is absent and all feedback appears immediately; changing that preference during an effect cancels it.

Validation: TypeScript checks, production build and all 45 tests passed. Browser checks replayed the complete week, recap and restart both with normal motion and with reduced motion at the six documented screen sizes. Card-position checks and touch/keyboard inspection passed. Dedicated transition checks verified preserved heading focus, only the new replacement image animating, rapid double confirmation/toggle handling, no early answer labels, immediate progression during reveal and live reduced-motion cancellation. Please play a full week and approve the feel before we close Prototype 0.1.

## Dreamier help and recap inspection

The scoring hint introduces the player as a **Dreamier**, someone who can see others' dreams. In the final recap, both **Your guess** and **Their Dream** images can now be tapped, held or opened with the keyboard for the same inspection as **Your Dream**. Escape or **Return to your cards** closes the image without changing results or scroll position. All 24 guessed/actual recap images were checked, alongside full-week play, responsive layouts, build/type checks and all 45 tests.

## Documentation

- [Game design](docs/GAME_DESIGN.md): confirmed rules, prototype assumptions, unresolved questions, and future ideas.
- [Prototype plan](docs/PROTOTYPE_PLAN.md): milestones, completion criteria, and architecture direction.
- [Art direction](docs/ART_DIRECTION.md): visual identity, mobile presentation, writing, and animation.
- [Agent instructions](AGENTS.md): guidance for future contributors and Codex sessions.

Dreamerie owns its game rules and player data. Accounts, groups, networking, and production infrastructure come later. PWA installation, native apps, and Discord are possible future directions; Discord is an optional integration and never a requirement for play.
