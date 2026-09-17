# Dreamerie game design

This is the primary gameplay source of truth. **Confirmed rules** express the supplied product vision. **Prototype assumptions** are limited local demonstration choices, not settled production rules. **Unresolved questions** require a later decision. **Future ideas** are outside Prototype 0.1.

**Prototype 0.2:** The user wants shared playtests across phone and desktop browsers. [PROTOTYPE_0_2_PLAN.md](PROTOTYPE_0_2_PLAN.md) records the scope, proposed policies and decisions needed before their implementation. Milestone 0.2.1 implements core rules for 2–6 fully participating players; the visible local game still uses Charlie, Nancy and Song. Connected rooms, missed-day handling and automatic progression are not implemented. The local assumptions below remain scoped to the accepted Prototype 0.1.

- **2–6 players total:** Two is the minimum; the previously approved maximum of six remains. This is a prototype limit, not a permanent production cap.
- **Solo entry deferred:** The user explicitly postponed solo play. Do not implement a lobby or matchmaking in Prototype 0.2. Their idea of random solo opponents with only the player’s correct-guess points carrying into a weekly total remains a future thought, not an approved scoring change.
- **Progression:** The host can manually progress the game. The user confirmed automatic daily rollover at **midnight in America/Chicago** for the initial playtest, including while the host is offline. All room members share this cutoff regardless of their device timezone. The first preparation deadline, reveal timing and interaction with early manual advancement still require decisions. Use calendar midnights rather than assuming every day lasts exactly 24 hours.
- **Missed day:** Use a decoy and give the missing player zero points for that day when it advances. Whether to retain an already-prepared Dream, when the host may close an unfinished day early, and how missing players affect the recognition denominator remain unresolved. Do not infer these details or treat disconnecting alone as forfeiture.
- **Two-player scoring consequence:** With the existing everyone-correct exception, the author receives no recognition points when their sole opponent guesses correctly. Therefore recognition is always zero in a fully participating two-player game, with up to one guessing point per player per day. No special scoring exception has been authorized.

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
- Players prepare images before the relevant daily guessing/reveal cycle. Exact calendar boundaries and deadlines remain unresolved.
- Day 1 is for preparing Dreams. Friends' guessing prompts begin on Day 2, rather than immediately after the final preparation choice. The prototype advances days manually; this does not establish production deadlines or timezone rules.

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
- Do not reveal correctness after an individual guess. Reveal only after all required assignments are complete, then calculate the score.
- At the end of the week, show all six concepts with the user's own Dreams, friends' actual Dreams, the user's guesses, and results.
- With one slot reserved for the user's Dream, a six-card board has at most five slots for friends' Dreams and decoys. Larger-group behavior is unresolved; do not infer a confirmed group-size cap.

### Decoys

Decoys must not leak ownership information. Ideally, they are images the guessing player has not previously seen that week. Track per-player card exposure as part of the intended direction. Exact production eligibility, reuse, and pool-exhaustion policies remain open.

### Midweek joining

Late joiners prepare and participate only in remaining concepts. They do not participate retroactively or receive points for earlier rounds. Give them six cards and apply the same selection/replacement rule for each remaining concept. Exact join deadlines, eligibility boundaries, and standings effects remain unresolved.

### Competition

Scores accumulate across the Dream Week. At the end, show final standings and a weekly winner under “The dream fades.” Prototype 0.1 uses **+1 per correctly identified Dream**. Final production scoring and tie handling remain unresolved; add no bonuses, penalties, or tie-breakers without a decision.

**Confirmed experimental scoring addition:** The user has resolved the amount: +1 per other player who correctly identifies your Dream, except when everyone does. This is active in personal-clue mode. How missed participation affects “everyone” remains a production question.

Both runnable modes simulate Nancy/Song guesses. Original mode preserves its 2-point round and 12-point week maxima; personal-clue mode includes recognition points and uses maxima of 3 and 18.

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
- Treatment of missing guesses in the “everyone” condition. Local friends simulate all required guesses, so missing participation is not part of the prototype. Whether to adopt personal clues as the main game remains subject to user testing.
- Exact weekly timing, setup deadlines, daily boundaries, and timezones.
- When Sunday's Dream is guessed and how final reveal relates to the next week.
- Production minimum and maximum group size beyond the confirmed 2–6-player Prototype 0.2 range.
- Whether six displayed guessing cards remain constant for larger groups.
- How weekly concepts are selected and whether they repeat.
- Exact decoy selection/generation, exposure, reuse, and exhaustion rules.
- How late joiners affect standings/fairness and become eligible for rounds.
- Missing selections, skipped guesses, and players leaving a group.
- Whether prepared Dreams can be revised and whether players choose setup concept order.
- Artwork recurrence across weeks and the precise meaning of a fresh deal.
- Whether Dream History becomes permanent and who can see it.
- Eventual artwork sourcing/generation, licensing, and review strategy.
- Account system.
- How players create/join Dream groups.
- Invite links.
- Whether PWA installation is worthwhile.
- Future notification strategy.

No existing repository implementation resolves these questions.

## Future ideas

Accounts, friend groups, invitations, real asynchronous multiplayer, production scheduling, full weekly leaderboards, and Dream History come later. PWA installation and native apps may be evaluated later.

Discord login, invitations, notifications, an Activity, and server/channel connections are optional future entry points. They must not own core state or be required to play. Prototype 0.1 contains no Discord-specific code.

Production backend, PostgreSQL, cloud image storage, push notifications, matchmaking, monetization, in-app AI image generation, real networking, and native applications are excluded from Prototype 0.1. The user has authorized generating static local artwork during development; this does not add a generation service to the game.
