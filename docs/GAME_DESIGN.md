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

### Hands and selection

- Each player begins with six image cards.
- Cards are unique between players within a Dream Week: two players must not receive the same image card that week.
- For each concept, choose one image from a six-card hand. It becomes that player's Dream and leaves the hand.
- Draw one new unique card so the hand returns to six. Repeat for every applicable concept; replacement also follows the final selection under the stated rule.
- A selected card cannot be selected again from the hand. Example: select C from A/B/C/D/E/F for TIME; draw G; continue with A/B/G/D/E/F.

### Weekly reset

Hands do not carry between weeks. Unused cards disappear, and previous selections cannot simply be carried forward as new selections. Deal a fresh hand every week. Whether an image can be drawn again in another week is unresolved; within-week uniqueness is not a permanent reuse ban.

Prototype 0.1 resets cards without a player-facing Dream History feature.

### Guessing and reveal

- Guess other players' Dreams, never your own.
- The stated guessing experience displays six images: relevant friends' actual Dreams plus enough decoys to fill the board.
- For Charlie guessing TIME, include Nancy's TIME Dream, Song's TIME Dream, and four decoys. Exclude Charlie's own Dream.
- Assign one image to each required other player. A committed image is locked and cannot be assigned to another player.
- Do not reveal correctness after an individual guess. Reveal only after all required assignments are complete, then calculate the score.
- A six-card board cannot contain more than six other players' distinct Dreams. Larger-group behavior is unresolved; do not infer a confirmed group-size cap.

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
| Progression | Explicit local progression through selection, guessing, reveal, and the next round. No wall-clock waits, timezone policy, or scheduling service. |
| Week demonstration | Demonstrate one complete guessing round, then extend to all six rounds and Charlie's accumulated score. Initially do not simulate Nancy/Song guesses or standings. |
| Friends' selections | Use the same allocation/selection rules as Charlie, avoiding hardcoded overlapping cards. |
| Allocation | Reserve every card dealt to a player, including replacement draws, in a shared per-week pool. Never return a reserved card to that week's deal pool. |
| Decoys | Use distinct unallocated cards unseen by Charlie that week; exclude all players' dealt/reserved cards. Track images shown in hands and boards. Provision enough fresh decoys for every round; do not fall back to known images. |
| Randomness | Supply randomness to rule functions so verification can reproduce fixture scenarios. No randomness framework is needed. |
| Commitment | A committed assignment cannot be edited during the round. A deliberate tap/confirmation flow can prevent accidental commitment; its exact UI is not a gameplay rule. |
| Persistence | In-memory state and explicit restart. Refresh resets the demonstration. |
| Late joining | Document the rule and allow models to represent remaining concepts. Interactive joining is outside the initial selection/guessing flows. |
| Week ending | Show Charlie's accumulated score and completion. Full standings/winner require additional simulated or real scores later. |

A simple fixture budget is **60 unique cards**: three players consume six starting cards plus six replacements each (36 reserved); six Charlie guessing boards consume four fresh decoys each (24). This is a local planning budget, not a production minimum. Insufficient fixture data must cause a clear failure without partial state changes.

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

Production backend, PostgreSQL, cloud image storage, push notifications, matchmaking, monetization, AI image generation, real networking, and native applications are excluded from Prototype 0.1.
