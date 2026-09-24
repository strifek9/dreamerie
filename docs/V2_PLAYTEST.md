# V2 landscape sample — September 24, 2026

## State and scope

Hosted preview verified September 24: https://dreamerie-v2-playtest.onrender.com (`34b34df`). See `HOSTING.md` for deployment and hosted acceptance evidence. The original V1 site is unchanged.

V1 is preserved locally on `prototype/version-1` at `4952a01`; main and the original public Render release are unchanged. V2 work is on `prototype/v2-landscape`. After local review, the user approved publishing a separate V2 phone-testing site; see `HOSTING.md` for verified deployment status. `?version=1` selects the previous interface; the default entry is V2.

One new composition follows the existing card style, using card-001 as reference. Both native 1672×941 PNGs and the built-in imagegen prompts/provenance are in `public/artwork/v2`. Five object changes are composited into declared regions so the remainder stays pixel-identical. This is a sample for acceptance, not a completed landscape deck. Fine-detail difficulty is not calibrated yet.

## Checks performed

- TypeScript checking, all 35 tests, and production build passed.
- Browser viewport checks: 320×568, 390×844, 768×1024, 844×390, and 1280×800. No horizontal overflow observed. The active pair is stacked; short landscape puts controls alongside it. Very short screens necessarily show smaller fitted paintings; shared zoom is available.
- Untimed practice: tapping marks, Remember confirms, successful practice enables Start. Practice changes no real attempt or timer. Keyboard arrow marking works.
- Landing artwork opens a fitted landscape viewer, tap toggles zoom without a guess marker, close restores focus.
- Tapping a moon placed a pending marker while leaving five guesses. Confirmation found it and consumed one guess. Reload retained the running deadline and pending state. Home visibly retained remaining time and the active attempt expired there at two minutes.
- A separate development round ended immediately after five incorrect confirmations, showing `0/5 · 0:30` and all five answers. No sixth confirmation control remained. Automated tests also cover duplicates, stale confirmations, and accuracy/time ordering.
- Zoom and drag changed both artwork transforms identically. Dragging did not place or consume a guess; Fit reset both.
- Result shows score/time above the paintings; share message contains a five-square grid and a clean play URL, without answers. Local link warning is present. No external message was sent.
- Hide markers removed the result overlays. Version 1's route still opened its original daily-card interface. Browser error logs were empty. Temporary viewport overrides were reset after checking.

## Still needs real people / real devices

- Physical iPhone/Android pinch, drag, browser toolbar changes, and native share sheet.
- Ask a first-time player to explain the five-guess limit before Start. Can they find and use Remember without coaching?
- Ask whether synchronized zoom helps them track the corresponding detail. Check the smallest spoon engraving and lantern change for fair difficulty and any distracting composite edges at zoom.
- Test whether the extra practice step feels helpful or too slow. Do not expand to the other cards or publish until approved.

Run with `npm run dev`. Use the development-only New playtest button for another attempt; it does not overwrite the default sample's saved attempt. The original five-guess/two-minute rules and whole-second accuracy-first scoring are unchanged. No pause, backend, authentication, Discord, dependencies, or leaderboard were added.
