# Holiday dream calendar

Completed V3 catalogue: 18 painted special pairs, 90 authored differences, plus 120 painted ordinary pairs (138 current puzzles). Every special has an original rhyming couplet and native artwork mapped to the common 1672 × 941 artboard (one altered source is one pixel narrower). All ordinary cleanup and pair validation is complete; publication of the full milestone is owner-authorized. Old artwork/geometry remains available for saved attempts without changing the ordinary rotation or storage namespace. See HOSTING.md for deployment status.

## Annual schedule

| Occasion | Date | Preview ID |
| --- | --- | --- |
| New Year’s Day | January 1 | holiday-painted-new-years |
| Martin Luther King Jr. Day | Third Monday in January | holiday-painted-mlk |
| Valentine’s Day | February 14 | holiday-painted-valentines |
| Presidents’ Day (federal Washington’s Birthday) | Third Monday in February | holiday-painted-presidents |
| St. Patrick’s Day | March 17 | holiday-painted-st-patricks |
| Easter | Gregorian/Western Easter Sunday | holiday-painted-easter |
| Mother’s Day | Second Sunday in May | holiday-painted-mothers |
| Memorial Day | Last Monday in May | holiday-painted-memorial |
| Juneteenth | June 19 | holiday-painted-juneteenth |
| Father’s Day | Third Sunday in June; see collision rule | holiday-painted-fathers |
| Independence Day | July 4 | holiday-painted-independence |
| Labor Day | First Monday in September | holiday-painted-labor |
| Indigenous Peoples’ Day / Columbus Day | Second Monday in October | holiday-painted-october-observance |
| Halloween | October 31 | holiday-painted-halloween |
| Veterans Day | November 11 | holiday-painted-veterans |
| Thanksgiving | Fourth Thursday in November | holiday-painted-thanksgiving |
| Christmas | December 25 | holiday-painted-christmas |
| New Year’s Eve | December 31 | holiday-painted-new-years-eve |

Scope assumption awaiting owner feedback: all 11 nationwide federal holidays plus seven popular celebrations. This is not every U.S. religious, cultural, state or regional observance. Indigenous Peoples’ Day recognition varies; the October card uses a respectful natural landscape, without historical reenactment or borrowed sacred imagery. Memorial Day and Veterans Day scenes are reflective, not party-themed.

## Selection and saved progress

- Use the player’s actual local calendar date, fixed on page open; not UTC midnight and not substitute Friday/Monday bank-holiday dates. Different time zones can therefore reach a special at different moments.
- Specials replace only that day’s selection. The published 120-card order and absolute daily numbering do not shift, and ordinary selection resumes afterward. Holiday art repeats annually until replacements are authored.
- Collision assumption awaiting owner feedback: when June 19 is also Father’s Day (for example 2033), Juneteenth retains June 19 and the Father’s Day **puzzle** appears June 20. This does not redefine the holiday itself. Each of the 18 specials appears once per year.
- A valid already-started saved card always wins over a changed schedule. Preserve guesses, original deadline and result; never clear storage or give a second attempt on release. Damaged storage still blocks play.
- Fixed holidays and weekday rules were checked against [OPM’s federal holiday calendar](https://www.opm.gov/policy-data-oversight/pay-leave/federal-holidays/). Easter uses the integer Gregorian algorithm published by the [U.S. Naval Observatory](https://aa.usno.navy.mil/faq/easter). No runtime calendar service is used.

## Local testing

Run `npm run dev`, then use `http://127.0.0.1:5173/?dream=holiday-painted-valentines`, or choose **Preview a holiday** in the development footer. Every preview is disposable/in-memory; production ignores query overrides and hides the selector. Full answer review starts at `?review=1&card=121` and includes all 18 holiday pairs through card 138.

Run `npm test`, `npm run build` (includes typecheck), and `node scripts/validateLandscapeCollection.mjs`. Holiday tests cover the 400-year calendar cycle, Easter exceptions, actual versus observed dates, collision policy, saved attempts, native image dimensions, crop containment and unchanged gameplay invariants. The existing validator covers the untouched ordinary 120 pairs.

Artwork generation used the built-in image tool; no raster painting scripts or live generation service. See `artwork/HOLIDAY_PROMPTS.md` / `HOLIDAY_MANIFEST.json` for the first three, and `artwork/HOLIDAY_EXPANSION_PROMPTS.json` / `HOLIDAY_EXPANSION_MANIFEST.json` for the additional fifteen. Only five bounded source regions are composited into each Memory; raw altered sources are not the playable image.


## Painted replacements

All 18 painted holiday pairs use `holiday-painted-*` IDs and `public/artwork/v3/holidays-painted-v1/`. Old holiday data/assets remain for saved-attempt compatibility only, never scheduled for new rounds. `currentDreams` drives development review and New day; `playableDreams` additionally resolves legacy IDs. All 90 answer crops and full playable composites passed visual inspection. All 66 automated tests, typecheck/build and unchanged 120-card validation pass. Physical-device difficulty calibration remains owner acceptance. No release has occurred.
