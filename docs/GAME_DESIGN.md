# Dreamerie game design

This is the primary gameplay source of truth. **Confirmed rules** express the supplied product vision. **Prototype assumptions** are limited local demonstration choices, not settled production rules. **Unresolved questions** require a later decision. **Future ideas** are outside Prototype 0.1.

## Intent

**How well do you understand the way your friends see the world?**

Players give surreal images personal meaning, then try to recognize their friends' interpretations. A correct guess identifies the image a particular friend chose; there is no objectively correct illustration of TIME or LOVE. Conversations about those associations are the social reward.

Dreamerie is standalone, asynchronous, and mobile-first for mobile and desktop web. Game rules and player data belong to Dreamerie. See [ART_DIRECTION.md](ART_DIRECTION.md) for atmosphere and voice.

## Confirmed rules

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
- Keep all six images in their positions through guessing, unlocking and reveal. Reveal labels the friends' actual Dreams, the user's guesses and the decoys on that same board, with textual results below. There is no separate own-Dream sidebar during a round.
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

## Prototype assumptions

These choices support a small local demonstration and must be revisited before production scheduling or real multiplayer.

| Area | Local choice |
| --- | --- |
| Players | Charlie is the human; Nancy and Song are simulated. No login or group creation. |
| Concepts | Use the six example concepts as fixtures. Setup/display order is separate from the hidden shuffled round order. |
| Progression | Day 1 is preparation only. A top-right development “Next day” control advances to Day 2 once all six choices are complete. Days 2–7 demonstrate the six concepts in hidden order, with Nancy's prompt then Song's on each board. Both guesses and an explicit reveal are required before advancing. After the sixth reveal, “Finish week” shows Charlie's total and “Begin a new week” resets the demonstration. These are local test-day labels, not production scheduling rules. No wall-clock waits, timezone policy, or scheduling service. |
| Week demonstration | Demonstrate all six guessing rounds and Charlie's accumulated score. Do not simulate Nancy/Song guesses or standings. |
| Friends' selections | Use the same allocation/selection rules as Charlie, avoiding hardcoded overlapping cards. At local week initialization, Nancy and Song randomly choose valid cards from their current hands for all six concepts. These reproducible fixture choices do not model personal interpretations; their Dreams remain hidden during Charlie's preparation. |
| Allocation | Reserve every card dealt to a player, including replacement draws, in a shared per-week pool. Never return a reserved card to that week's deal pool. |
| Decoys | Use distinct unallocated cards unseen by Charlie that week; exclude all players' dealt/reserved cards. Track images shown in hands and boards. Provision enough fresh decoys for every round; do not fall back to known images. |
| Randomness | Supply randomness to rule functions so verification can reproduce fixture scenarios. No randomness framework is needed. |
| Commitment | Tap an unconfirmed selection again to clear it. Before reveal, an explicit unlock removes that guess only and returns to the first unassigned friend. The released image becomes available again; reveal is unavailable until both guesses are reconfirmed. Revealed/scored rounds cannot be changed. Prepared Dream revisions after replacement remain unresolved. |
| Persistence | In-memory state and explicit restart. Refresh resets the demonstration. |
| Late joining | Document the rule and allow models to represent remaining concepts. Interactive joining is outside the initial selection/guessing flows. |
| Week ending | Show Charlie's accumulated score and a recap of all six concepts in played order: Charlie's Dream, Nancy/Song actual Dreams, Charlie's final guesses, and results. The recap belongs to this local week only. Full standings/winner require additional simulated or real scores later. |

A sufficient fixture budget is **54 unique cards**: three players consume six starting cards plus six replacements each (36 reserved); six Charlie guessing boards consume three fresh decoys each (18). Charlie's first-slot Dream was already reserved during preparation. The actual deck contains **120 illustrations**. These are local planning choices, not a production minimum. Insufficient fixture data must cause a clear failure without partial state changes.

These assumptions must preserve six-card hands, unique player allocations, hidden daily order, one-to-one assignments, delayed reveal, and +1 scoring.

## Unresolved questions

- Final scoring system; tie handling and weekly winners.
- Exact weekly timing, setup deadlines, daily boundaries, and timezones.
- When Sunday's Dream is guessed and how final reveal relates to the next week.
- Minimum and maximum group size.
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
