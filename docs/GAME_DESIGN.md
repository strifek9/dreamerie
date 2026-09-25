# Dreamerie game design

## Version 3 — current local milestone

The core V2 daily landscape game is unchanged. Exactly five confirmed guesses total; misses and repeats consume a guess, no duplicate scoring, no pause, and accuracy first with whole-second time breaking ties. V3 makes this visible through five guess fragments and distinct correct/repeat/miss feedback. Results use kind score-aware language without changing factual accuracy/time. After completion only, any answer opens identical enlarged crops of Dream/Memory with Previous/Next; no pre-result hints or flicker comparison. Keep the existing collection namespace to preserve attempts and never clear V1 storage. Brand identity and the result presentation change, not the puzzle data. Postcard/journal are deferred.

## Current V2 collection — September 25, 2026

Latest local refinement (not yet published): the Start/Continue/View result container is transparent, with no separate dark-blue panel. All V2 enlarged viewers use the full available inspection area rather than clipping zoom to the original fitted painting rectangle. At 100% the entire painting is fitted; zoomed artwork can grow into the surrounding space. Empty letterbox taps do not place guesses. Pan/zoom anchors, markers and hit detection remain artwork-relative; short landscape viewers keep controls in an adjacent rail, outside the artwork. Resize updates fitted dimensions and pan limits without changing guesses or the deadline. V1 callers retain the existing default viewer geometry. This supersedes the earlier preview-only landscape sizing instructions.

Latest local revision (not yet published): use “Can you spot the differences between the dream and the memory?” and “The dream is fading...”. Daily quoted poems stay short, use clear end-rhymes, and suggest a shifting or unreliable dream without revealing answer locations. There is no strict sentence-count limit; the current set uses two brief lines per artwork. In short landscape viewports, the landing image viewer gives the uncropped painting nearly the full available height, with the title/hint in a slim side rail and the 44px close control beside the artwork. Portrait preview and gameplay/result viewers retain their existing layout. Rotation and click-to-zoom do not reset or pause a running attempt. These directions supersede older copy and two-sentence restrictions below.

Local refinement (not yet published): hold either painting for 450ms or use its quiet 44px-target expand icon beside the caption, outside the artwork, to open fitted full-screen inspection during play or results. In play, marking/Remember still work in the viewer and the deadline never pauses; fifth confirmation or expiry closes it. Result inspection retains found/missed overlays and Hide markers, and Fit on the comparison page restores scrolling. Keep both paintings stacked; on sufficiently wide, short screens use distinct header/status/control sidebar rows, never overlapping grid cells. Other sizes retain the centered stack, and results retain the centered score/share/answer flow. The answer heading is “What was different?”. The landing instruction is “Find the differences between the Dream and the Memory.” Each of the 120 card IDs has its own original, spoiler-free rhyming couplet in src/v2/dreamVerses.ts; the verse follows the daily artwork, remains stable on reload, and repeats with the 120-card rotation. No network quote service or storage migration.

The user approved all 120 new landscape pairs as playable daily puzzles, followed by commit, push and deployment to the existing V2 site. This supersedes the historical single-sample/practice milestones below. V1 and the sample assets/data remain preserved.

The runtime catalogue contains 120 native-resolution pairs with five visually reviewed, scene-fitting changes each. Only authored edited regions are overlaid on the untouched original. See [collection QA](artwork/V2_COLLECTION_PROGRESS.md), [final answer audit](artwork/V2_PLAYABLE_AUDIT.json) and [source provenance](artwork/V2_COLLECTION_MANIFEST.json). Difficulty remains an editorial estimate, not measured player performance.

Use the local calendar for one daily card (September 24, 2026 = day 1), wrapping artwork after 120 days with independent per-date attempts. Keep the open round's date fixed until reload. The new collection has its own storage namespace; never erase V1 or previous sample attempts. Review/card overrides and New day are development-only, in-memory controls.

No practice round, no pause: optional ? instructions, exactly five confirmed guesses total, two minutes, circle-overlap hit detection, accuracy first and whole-second time only for ties. Keep both landscape paintings stacked with synchronized zoom/pan and controls outside the artwork. Results reveal all five answers, allow fitted-image page scrolling, and share score/time without spoilers. Preserve the established painterly style and full-resolution PNGs; no new infrastructure or dependencies.

All 38 automated tests, typecheck and build pass. Final browser/deployment verification is recorded in the collection QA and hosting documents. Physical touch gestures and human difficulty calibration remain owner acceptance checks.

## Historical milestones (superseded where they conflict with the collection above)

## V2 landscape playtest (current experimental branch)

Publication update: the refinement below is now live on the separate V2 site at commit `60ea989`, following explicit user approval. See `docs/HOSTING.md` (or `HOSTING.md` from this directory) for verification; earlier awaiting-publication/practice wording is historical. V1 remains unchanged.

Current refinement: remove the practice round completely. Start is immediately available after artwork loads, with no practice gate or completion flag. A small ? / How to play button opens concise instructions in a keyboard-accessible dialog before or during play. Help never starts, pauses or resets the timer, or changes guesses; it shows the active remaining time and closes on expiry. Remove unused landing bottom padding and use the visible dynamic viewport height for V2, without V1's larger 100vh body floor. Keep scrolling for real overflow (results, enlarged text and small help dialogs), not empty background. V1 is unaffected. Older practice wording below is historical; this local refinement awaits publication.

V1 remains the published game, preserved locally on `prototype/version-1` at `4952a01`. On `prototype/v2-landscape`, the default entry is a single sample called A Sea in a Teacup; `?version=1` retains the old interface. This section overrides conflicting V1 comparison/inspection details below for V2 only.

Before starting, players complete one untimed practice: mark the changed moon, reposition if needed, then Remember. Practice is separate from the real attempt. Explain five differences, exactly five total guesses, two minutes, wrong guesses consume guesses, and no pause. Start begins the saved deadline only after both paintings load.

Keep both landscape paintings stacked and visible together during play. Their zoom and pan are synchronized; corresponding pending circles appear on both, but only one confirmation is recorded. Controls occupy their own space, beside the pair on short landscape viewports. There is no swapping, hold-to-open requirement or pause. Home displays remaining time and Continue; time away and reload count. The V2 sample uses separate saved storage from V1. Dev-only New playtest is explicitly in-memory.

All core scoring/guess rules below remain: circle overlap, exactly five confirmations, no duplicate score, accuracy primary, whole-second time only breaks ties. Results appear above the answer reveal. Retain spoiler-free sharing and found/green versus missed/red fading markers. Difficulty and first-time understanding need human testing before expanding the sample.


## Current primary mode: Daily Dream Recall

This section supersedes the historical social-mode design below for the primary prototype.

The Dreamerie wordmark returns to the landing screen without resetting the daily attempt or pausing its deadline. The landing action becomes Resume for an active attempt or View result for a finished one. Result captions read **Found · Green** and **Missed · Red**.

**Current daily-attempt rule:** save the day's original start time, confirmed guesses and pending marker in browser storage. Refresh/reopen/another tab continues the same two-minute deadline, including time away. Five confirmations or expiry still ends the round; the saved result cannot be restarted with Dream again (that action is removed). Keep sharing and answer inspection. The next local calendar day opens its own attempt. Clearing site data permits replay; different browsers/profiles/devices are independent. This is a local safeguard, not an account or secure leaderboard. Storage failures must not silently create or accept an unsaved attempt. Development review/New day rounds are separate in-memory playtests.

**Current landing refinement:** click/tap the preview to expand, then click/tap the painting to toggle zoom in/out, with no guessing ring or extra zoom toolbar. Keep **remember** bold in the instructions and Start visible without scrolling on narrow/short screens. The X sits just above the artwork's top-right edge in every viewer. Pair labels read **The Dream** and **The Memory**. These details supersede the older landing Expand/toolbar wording below; game inspection and confirmation remain unchanged.

**Current inspection refinement:** the landing artwork opens a full-screen fitted viewer by click/tap, hold, or its visible Expand control; it remains untimed. During play a quick tap marks a guess, while a 450ms stationary hold or Expand opens that image. The page itself scrolls normally and has no inline zoom controls. Inside the viewer, use wheel/pinch, drag, or visible +/−/Reset; pan is bounded to the painting and wheel/pinch zoom follows the chosen detail. The X or Escape returns to the unchanged comparison and pending selection. The running timer and remaining guesses remain visible, and Remember can submit a pending guess on the viewed side; inspecting never submits. The timer continues without pause; expiry or the fifth confirmation closes the viewer into results. Result images can be inspected with Hide/Show markers. There is no instant swap between versions. Narrow portrait screens up to 40rem stack; wider tablets (including portrait) and landscape/desktop use side-by-side, with card size bounded by available screen space. This supersedes the earlier inline synchronized zoom and 48rem layout threshold below.

Before play, show the day's original card (not the altered card) as the main focal point, with Dreamerie and the day number grouped directly above it. Below the card on phones, or alongside it on desktop, show: “Lost within a reverie, nothing stays where it should be. Glance away, then look once more—the moon has left its silver shore.” The instruction begins “Find the five differences before the dream fades.” The preview has no time limit; **Start** begins the two-minute comparison round.

A Dream is selected each day from the reviewed, authored image pairs. The catalogue now contains all 120 original cards with five authored answers each. The original and altered visions remain visible for a configurable two-minute round: stacked at portrait widths up to 48rem, side by side otherwise. Do not add swipe-swapping or flicker comparison. A quiet portrait hint suggests turning sideways. Both images are valid places to mark a difference. Players can zoom with a mouse wheel, pinch and drag on touchscreens, or use visible zoom controls.

The player has exactly five confirmed guesses total. A tap or click only places or repositions a pending circle and never submits. The floating **Remember** action confirms the current marker and consumes one guess. The full circle, including an edge overlap, can hit a declared answer rectangle; it is not a center-only test. Render and hit-test the same circle with radius 4% of artwork width, correcting for the 4:5 aspect ratio. This footprint is identical across devices and scales with the painting when zooming. A correct confirmation marks one unfound difference; that difference cannot score again. An incorrect confirmation, including a repeated confirmation on an already-found region, is a false memory and still consumes the guess.

Each playable pair has exactly five stable declared object-level differences, with intended difficulty from **Easy** through **Dreamlike** (difficulty still needs human playtesting). Changes must fit the original card's theme and painterly art direction, not add arbitrary unrelated props or circular discoloration. Pick varied, image-specific changes rather than repeating red bows and gold details across the deck. The altered view composites edited artwork within five declared answer regions; everything outside them remains identical. When a circle overlaps several regions, choose the nearest rectangle (center-inside wins); ties favor the smaller region, then stable ID. Include already-found regions in this choice, so a repeated hit cannot score a nearby unfound region. A small detail may be nested inside a larger changed object; the smallest center-containing region retains priority. If that smaller region was already found, the duplicate is a false memory rather than scoring the enclosing object. The round ends immediately when all five confirmations are used, all five differences are found, or the timer expires. Accuracy is the number of unique differences found out of five. Results display accuracy and whole-second elapsed time, such as `4/5 · 1:07`.

Every ending reveals all five answers across the pair: found answers have green numbered outlines only on the original image (top/left), missed answers have red outlines only on the changed image (bottom/right). The outlines fade fully out and back in over six seconds, without moving the artwork. Hide markers clears all overlays; reduced-motion users get static outlines with that same control. Written descriptions and Found/Missed status stay visible below. Players can continue zooming and panning to inspect the answers, but cannot place or confirm further guesses. Sharing includes the result and difficulty grid, not the answer descriptions or locations.

Comparison is lexicographic: higher accuracy always wins; only equal accuracy compares elapsed time, where faster wins. Equal accuracy and equal measured time are tied. There is no weighted point formula.

Results show five square tiles and can be shared in a compact Wordle-style message: day number, accuracy, whole-second time, five purple/black squares by difficulty, and a clean link to play on the current site. Friends see the result in the message; the link starts the current daily game, not an archived puzzle or score page. Native share, copy, and selectable-text fallback must not expose answer locations/descriptions or URL query/fragment data. A local-only address is clearly labeled; public sharing requires public hosting. The prototype has no dashboard, six-card hand, account, backend, multiplayer, Discord integration, leaderboard service, or global state library. The former social interpretation mode is preserved on `prototype/social-dreams` as an alternate/future direction.

Development only: New day advances one catalogue entry and displayed day (wrapping after 120), remounts a clean round at the rules screen, and labels simulated/review shares Playtest. It does not change the actual date or production daily selection. Refresh restores the real day or explicit review URL.

## Historical social-mode design

## Confirmed room modes (September 2026)

These rules supersede older personal-only connected-play scope below. New rooms default to **Word of the Day**; creators may instead choose **Your own dream clues**. Invitees see the creator's mode and scoring before joining and cannot change it. A room's mode stays fixed. Existing rooms retain personal clues and their original scoring on upgrade.

- Both modes prepare six Dreams on Day 1, one for each of six guessing days in hidden order. Word of the Day supplies shared words and asks only for cards; personal mode asks for a clue (1–80 characters) and card. Examples may be single words or phrases; they suggest possibilities, not correct meanings.
- **Word of the Day:** Count correct guesses from completed players for each eligible author's card. Award first place 3 points, second 2, third 1, and other places 0. Zero correct guesses always earns 0. Ties share their occupied rank and consume places: 3, 3, 1. A card recognized by everyone remains eligible. There are no guessing points. Maximum 3 per day / 18 per week.
- **Your own dream clues:** Keep +1 per correct guess and +1 per completed friend who recognizes your card, except when every completed friend recognizes it, when recognition earns 0. Correct guessers keep their points. In a two-player room recognition is therefore 0; this exception does not apply to Word of the Day.
- Missed-day rules apply to both modes: incomplete players earn 0, their partial guesses count for nobody, and prepared cards remain targets. Only completed authors participate in ranked awards. No completed guesses means no award.
- These ranked awards apply to shared online Word of the Day rooms. The separately labeled **Original shared words · guessing points** solo comparison retains its historical guessing-only scoring. Personal solo practice retains its recognition scoring.

Personal guessing presents the clue itself on a dream clue card and asks **Which was [name]'s Dream?** Scoring help and revealed results follow the room mode. A small decorative book cue marks preparation progress without moving the cards; reduced motion disables its animation.

This is the primary gameplay source of truth. **Confirmed rules** express the supplied product vision. **Prototype assumptions** are limited local demonstration choices, not settled production rules. **Unresolved questions** require a later decision. **Future ideas** are outside Prototype 0.1.

**Prototype 0.2:** Shared play, scheduling and lifecycle through 0.2.7 are approved by the instruction to proceed. Milestone 0.2.8 is preparing hosting without changing gameplay rules. Private rooms use actual players, persistent browser seats, host controls, automatic rollover and inspectable results. Deployment and physical-device acceptance remain pending. [PROTOTYPE_0_2_PLAN.md](PROTOTYPE_0_2_PLAN.md) records scope and remaining decisions. The separate local demo still uses Charlie, Nancy and Song; its assumptions below remain scoped to Prototype 0.1.

- **2–6 players total:** Two is the minimum; the previously approved maximum of six remains. This is a prototype limit, not a permanent production cap.
- **Hosted playtest entry:** Anyone with the site link may enter and create a room without a shared password. Joining a specific room still requires its invitation/code. Browser sessions identify seats; public entry does not grant other players' private state or host controls. No public room directory or matchmaking is added.
- **Solo entry deferred:** The user explicitly postponed solo play. Do not implement a lobby or matchmaking in Prototype 0.2. Their idea of random solo opponents with only the player’s correct-guess points carrying into a weekly total remains a future thought, not an approved scoring change.
- **Progression, approved timing:** All automatic cutoffs use midnight in **America/Chicago**, regardless of device timezone. Starting a week or manually opening a guessing day allows the remainder of the current date plus one full calendar day: Monday evening closes Wednesday at 12:00 AM. A calendar day may contain 23 or 25 hours across daylight-saving changes. Automatically opened days close at the next Chicago midnight.
- **Automatic reveal:** At the deadline, close preparation and open Day 2, or reveal/score the current guessing day and immediately open the next. Day 7’s deadline finishes the week. Previous results remain accessible. A host reveal by itself keeps the current deadline; a manual next-day action starts a fresh full-day window. No browser or online host is required, but the room service must be running.
- **Downtime:** Catch up every overdue deadline on recovery, applying the approved missed-day rules separately to each day. Anchor each next cutoff to the preceding scheduled cutoff, not the recovery time. Persist results and transitions atomically so no day is scored twice. Commands received at or after a cutoff cannot change the closed day.
- **Existing playtest rooms:** Rooms created before scheduling have no historical deadlines. On upgrade, grant their current active phase one fresh full-day window without inventing past missed days. Preserve that deadline across future restarts. Completed rooms and waiting rooms receive no running deadline.
- **Missed day, approved policy:** Missing that day's prepared Dream or leaving required guesses incomplete earns **0 total points**, overriding guessing and recognition. A prepared Dream stays on the board as a target; only a missing Dream is replaced with an anonymous decoy when the boards open. The missing player has no guessing board for that day. Partial guesses remain in their review but earn points for nobody. Disconnecting alone is not forfeiture: accepted complete guesses still count.
- **Recognition after a missed day:** Only other players who finished their required guesses count toward “everyone.” A finished author earns +1 per correct completed guesser unless all completed guessers identify their Dream. With no completed guessers, recognition is zero. Correct completed guessers keep their points even when the author misses the day. With no prepared Dreams, everyone misses; with only one prepared Dream, that player has no guessing targets and earns zero.
- **Early closure:** The host may open or reveal a day before everyone finishes, after explicit confirmation listing unfinished players. Missing preparation is decided when the boards open; incomplete guesses are decided at reveal. Readiness means every required guess is locked; unlocking makes the player unready again. Results are immutable after reveal. When opening a day, report unfinished preparation without exposing which hidden slot comes next.
- **Two-player scoring consequence:** With the existing everyone-correct exception, the author receives no recognition points when their sole opponent guesses correctly. Therefore recognition is always zero in a fully participating two-player game, with up to one guessing point per player per day. No special scoring exception has been authorized.
- **Late joining, approved policy:** Give a new player six cards and let them prepare only unopened Dreams. A player joining during preparation can participate on Day 2; one joining after a guessing day opens begins guessing the next day. Joining never changes existing boards, targets or scores, and grants no earlier results or points. No new seats are accepted once the last guessing day has opened. Existing members can reconnect. The six-player capacity remains in force.
- **Returning after missing preparation:** Prepare remaining unopened Dreams with the same selection/replacement rule. Never fill in or edit an already-opened day retroactively. Saved pairs remain immutable after replacement, as in the accepted local flow. Scores and missed status remain in each player's own recap; no shared ranking or winner is added.
- **Host identity:** Keep the original host when they disconnect or stop playing; automatic progression continues while the service runs. No host transfer or seat removal is included.
- **Room closure:** The host may explicitly confirm closing a waiting or active room for everyone. Keep only already revealed results and points; end an unfinished day without revealing it or awarding new points. A closed room cannot reopen, accept new members or accept gameplay changes. A due day is resolved before processing a close request; a stale confirmation must be reviewed again.
- **Retention:** A waiting room expires 24 elapsed hours after creation unless started; joining/polling never extends it. Starting removes lobby expiry and starts the normal day schedule. Completed or explicitly closed rooms retain each player's permitted recap for seven elapsed days from completion/closure. Scheduled completion uses its scheduled end, not the time the server catches up. After expiry, remove private game data and results and reject gameplay/new joins. Minimal room, membership and retry records remain to explain old links and prevent duplicate room creation; this is not permanent Dream History or complete database deletion. Existing ended rooms without a recorded end receive one fresh seven-day window on upgrade; older waiting rooms use creation plus 24 hours. Starting another room never erases an unexpired recap.

## Intent

**How well do you understand the way your friends see the world?**

Players give surreal images personal meaning, then try to recognize their friends' interpretations. A correct guess identifies the image a particular friend chose; there is no objectively correct illustration of TIME or LOVE. Conversations about those associations are the social reward.

Dreamerie is standalone, asynchronous, and mobile-first for mobile and desktop web. Game rules and player data belong to Dreamerie. See [ART_DIRECTION.md](ART_DIRECTION.md) for atmosphere and voice.

## Confirmed rules

### Reversible experiment: personal clues

The user approved testing this alternative alongside the original shared-concept game. **Your own dream clues** is the default prototype mode; **Original shared words** retains the earlier six concepts and guessing-only scoring for comparison. A mode belongs to a whole week and cannot change its rules midway. Switching modes explicitly starts a fresh local week; nothing is committed to Git or discarded from the source to switch back.

- On Day 1, each person prepares **six clue-and-card pairs**. Write a word or short sentence and choose a card from the current six-card hand. Save them together, then replace the selected card in the same slot, including after the sixth choice.
- The implementation limit is **80 characters** (the browser's UTF-16 `maxlength` units). Trim and collapse whitespace; reject blank or overlong clues in the game logic as well as the form. This limit is adjustable presentation policy, not a permanent production rule.
- The six Dream slots, named First Dream through Sixth Dream, replace shared words. Their daily order remains shuffled and hidden. Each guessing day uses the corresponding prepared slot for every player; each player has their own words for that slot.
- Show Nancy's clue while guessing Nancy's card, then Song's clue while guessing Song's card. Keep the same six-card board and all existing selection, unlock, own-card and delayed-reveal rules. Never label an unrevealed image with its owner's clue. Do not expose future clues in the preparation overview.
- For every correct identification, the guesser earns **1 point** and the card's author earns **1 recognition point**. If **all other players** correctly identify that card, the author earns **0 recognition points** for it. Correct guessers keep their points. If nobody recognizes it, the author earns 0. A wrong guess has no penalty.
- In this three-player prototype, a player can earn up to **2 guessing points + 1 recognition point per day**, or **18 points over six days**. The recap must distinguish Dreams correctly guessed from total points.
- Nancy and Song prepare six authored fixture clues, mixing single words, phrases and sentences, paired with random legal cards and make random valid guesses. These fixtures demonstrate the flow, not semantic understanding or live AI generation. Full standings remain outside this experiment.
- Final review keeps each person's clue attached to their actual card and shows Charlie's guesses, friends' guesses about Charlie, correctness and recognition points. Images remain inspectable.

The sections below describe the **original shared-concept mode** and unchanged common rules. The personal-clue experiment overrides its shared concepts and scoring as stated above; retaining the original mode does not revoke the experimental rules.

### Dream Week

- Each Dream Week contains six concepts. TIME, LOVE, FREEDOM, HOME, FEAR, and CHANGE are an example set, not a fixed production vocabulary.
- Show all six at the beginning: “This week, you will dream of...”
- Daily order is randomized and hidden. The visible concept list must not disclose the daily schedule.
- Players prepare images before the relevant daily guessing/reveal cycle. Prototype 0.2 follows the calendar policy above; broader production timing remains unresolved.
- Day 1 is for preparing Dreams. Friends' guessing prompts begin on Day 2, rather than immediately after the final preparation choice. Prototype 0.1 advances days manually. Shared Prototype 0.2 follows the confirmed scheduling rules above.

### Hands and selection

- Each player begins with six image cards.
- Cards are unique between players within a Dream Week: two players must not receive the same image card that week.
- For each concept, choose one image from a six-card hand. It becomes that player's Dream and leaves the hand.
- Draw one new unique card so the hand returns to six. Repeat for every applicable concept; replacement also follows the final selection under the stated rule.
- A selected card cannot be selected again from the hand. Example: select C from A/B/C/D/E/F for TIME; draw G; continue with A/B/G/D/E/F.

### Weekly reset

Hands do not carry between weeks. Unused cards disappear, and previous selections cannot simply be carried forward as new selections. Deal a fresh hand every week. Whether an image can be drawn again in another week is unresolved; within-week uniqueness is not a permanent reuse ban.

Prototype 0.1 shows a recap of the just-completed week, then clears it on restart or refresh. It has no persistent Dream History feature.

### Guessing and reveal

- Guess other players' Dreams, never your own.
- The guessing experience displays six images: the user's own Dream, friends' actual Dreams, and enough decoys to fill the board.
- For Charlie guessing TIME, pin Charlie's TIME Dream to the first slot. Shuffle Nancy's TIME Dream, Song's TIME Dream and three fresh decoys into the other five slots. Mark Charlie's card “Your Dream · View only”: it can be enlarged but cannot be assigned to a friend.
- Keep all six images in their positions through guessing, unlocking and reveal. Reveal labels the friends' actual Dreams, the user's guesses and the decoys on that same board. Put textual results above the cards, between “The dream comes into focus.” and the “Dreams remembered” count. There is no separate own-Dream sidebar during a round.
- Assign one image to each required other player. A committed image cannot be assigned to another player while locked. Players can unlock a guess to change it before reveal, preserving any other friend's guess.
- Prompt for one friend at a time on the same board: Nancy first, then Song for the same concept after Nancy's guess is confirmed.
- Do not reveal correctness after an individual guess. Normal reveal follows complete assignments. In shared rooms, the approved early-closure policy above also permits a host-confirmed reveal with missed-day outcomes.
- At the end of the week, show all six concepts with the user's own Dreams, friends' actual Dreams, the user's guesses, and results.
- With one slot reserved for the user's Dream, a six-card board has at most five slots for friends' Dreams and decoys. Larger-group behavior is unresolved; do not infer a confirmed group-size cap.

### Decoys

Decoys must not leak ownership information. Ideally, they are images the guessing player has not previously seen that week. Track per-player card exposure as part of the intended direction. Exact production eligibility, reuse, and pool-exhaustion policies remain open.

### Midweek joining

Late joiners prepare and participate only in remaining concepts. They do not participate retroactively or receive points for earlier rounds. Give them six cards and apply the same selection/replacement rule for each remaining concept. Prototype 0.2 uses the approved next-unopened-day boundary above. Production standings and fairness effects remain unresolved.

### Competition

Scores accumulate across the Dream Week. At the end, show final standings and a weekly winner under “The dream fades.” Prototype 0.1 uses **+1 per correctly identified Dream**. Final production scoring and tie handling remain unresolved; add no bonuses, penalties, or tie-breakers without a decision.

**Confirmed experimental scoring addition:** The user has resolved the amount: +1 per other player who correctly identifies your Dream, except when everyone does. This is active in personal-clue mode. How missed participation affects “everyone” remains a production question.

Both local modes simulate Nancy/Song guesses. Original mode preserves its 2-point round and 12-point week maxima; local personal-clue mode includes recognition points and uses maxima of 3 and 18. Connected rooms use human choices and the actual roster, with the approved missed-day override above.

## Prototype assumptions

These choices support a small local demonstration and must be revisited before production scheduling or real multiplayer.

| Area | Local choice |
| --- | --- |
| Players | Charlie is the human; Nancy and Song are simulated. No login or group creation. |
| Concepts | Use the six example concepts as fixtures. Setup/display order is separate from the hidden shuffled round order. |
| Progression | Day 1 is preparation only. A top-right development “Next day” control advances to Day 2 once all six choices are complete. Days 2–7 demonstrate the six concepts in hidden order, with Nancy's prompt then Song's on each board. Both guesses and an explicit reveal are required before advancing. After the sixth reveal, “Finish week” shows Charlie's total and “Begin a new week” resets the demonstration. These are local test-day labels, not production scheduling rules. No wall-clock waits, timezone policy, or scheduling service. |
| Week demonstration | Demonstrate all six guessing rounds and Charlie's accumulated guessing score. Nancy and Song each make two random, distinct valid assignments on their own six-card board when a day begins. Their own Dream is unassignable; the other five images contain both friends' Dreams and three decoys. Freeze their guesses through Charlie's revisions and reveal. Show their guesses about Charlie only after reveal and retain those choices in the recap. No friend standings. |
| Friends' selections | Use the same allocation/selection rules as Charlie, avoiding hardcoded overlapping cards. At local week initialization, Nancy and Song randomly choose valid cards from their current hands for all six concepts. These reproducible fixture choices do not model personal interpretations; their Dreams remain hidden during Charlie's preparation. |
| Allocation | Reserve every card dealt to a player, including replacement draws, in a shared per-week pool. Never return a reserved card to that week's deal pool. |
| Decoys | Use distinct unallocated cards unseen by the guessing player that week; exclude all players' dealt/reserved cards. Track images shown in hands and boards separately for Charlie, Nancy and Song. Decoys may recur across different players' boards, but never for the same player. Provision enough fresh decoys for every round; do not fall back to known images. |
| Randomness | Supply randomness to rule functions so verification can reproduce fixture scenarios. No randomness framework is needed. |
| Commitment | Tap an unconfirmed selection again to clear it. Before reveal, an explicit unlock removes that guess only and returns to the first unassigned friend. The released image becomes available again; reveal is unavailable until both guesses are reconfirmed. Revealed/scored rounds cannot be changed. Prepared Dream revisions after replacement remain unresolved. |
| Persistence | In-memory state and explicit restart. Refresh resets the demonstration. |
| Late joining | Document the rule and allow models to represent remaining concepts. Interactive joining is outside the initial selection/guessing flows. |
| Week ending | Show Charlie's accumulated score and a recap of all six concepts in played order: Charlie's Dream, Nancy/Song actual Dreams, Charlie's final guesses, friends' guesses about Charlie, and results. Every recap image is inspectable. The recap belongs to this local week only. Full standings/winner remain outside this prototype revision. |

A sufficient fixture budget is **54 unique cards**: three players consume six starting cards plus six replacements each (36 reserved); each player's six guessing boards need 18 distinct unallocated decoys. Those 18 can be reused across different players because exposure is private. Each player's first-slot Dream was already reserved during preparation. The actual deck contains **120 illustrations**. These are local planning choices, not a production minimum. Preparing all three boards and simulated guesses must succeed together; insufficient fixture data causes a clear failure without partial state changes.

These assumptions must preserve six-card hands, unique player allocations, hidden daily order, one-to-one assignments, delayed reveal, and +1 scoring.

## Unresolved questions

- Final scoring system; tie handling and weekly winners.
- Whether to adopt personal clues and the Prototype 0.2 completed-guesser recognition policy as permanent production rules.
- Production-wide timing beyond the confirmed Prototype 0.2 Chicago calendar policy.
- When Sunday's Dream is guessed and how final reveal relates to the next week.
- Production minimum and maximum group size beyond the confirmed 2–6-player Prototype 0.2 range.
- Whether six displayed guessing cards remain constant for larger groups.
- How weekly concepts are selected and whether they repeat.
- Exact decoy selection/generation, exposure, reuse, and exhaustion rules.
- How late joiners affect production standings/fairness beyond the approved 0.2 next-day eligibility.
- Players voluntarily leaving a group, host transfer and production room lifecycle beyond the approved 0.2 policies above.
- Whether prepared Dreams can be revised and whether players choose setup concept order.
- Artwork recurrence across weeks and the precise meaning of a fresh deal.
- Whether Dream History becomes permanent and who can see it.
- Eventual artwork sourcing/generation, licensing, and review strategy.
- Account system.
- Permanent group management and account-based invitations beyond the implemented private-room links.
- Whether PWA installation is worthwhile.
- Future notification strategy.

The implemented private playtest does not resolve these broader production questions.

## Future ideas

Permanent accounts and friend groups, production scheduling, full weekly leaderboards, and Dream History come later. Prototype 0.2 now has private invitations and shared host-led browser play; scheduled progression is implemented and remote hosting remains pending. PWA installation and native apps may be evaluated later.

Discord login, invitations, notifications, an Activity, and server/channel connections are optional future entry points. They must not own core state or be required to play. Prototype 0.1 contains no Discord-specific code.

Production backend, PostgreSQL, cloud image storage, push notifications, matchmaking, monetization, in-app AI image generation, real networking, and native applications are excluded from Prototype 0.1. The user has authorized generating static local artwork during development; this does not add a generation service to the game.
