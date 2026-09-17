# DREAMERIE

**How well do you understand the way your friends see the world?**

Dreamerie is a standalone, asynchronous social game about interpreting abstract concepts through surreal images. Players choose images that express their Dreams; later, friends try to recognize those choices. The social reward is discovering why someone saw TIME, LOVE, or HOME in a strange piece of art.

The product is mobile-first and responsive for mobile and desktop web. Artwork leads the experience, supported by a calm interface and short, atmospheric language.

## Current status

**Prototype 0.2:** [The plan](docs/PROTOTYPE_0_2_PLAN.md) covers private rooms for 2–6 players on phone and desktop browsers. Milestone **0.2.2 is implemented and awaiting user testing**: create a room, share an invitation, join with distinct names, and return to the same seat after refresh or a service restart. The waiting room shows all six player accents and host identity. It stops before dealing cards; connected gameplay, scheduling and hosting are not yet implemented. The complete local Prototype 0.1 remains available.

Milestone **0.2.1 is approved**: the game rules support 2–6 fully participating players, with the correct decoy count, private exposure, scoring and individual recaps. Results carry the guessing player's ID; scoring rejects incomplete/foreign rosters and recaps reject another player's or week's results. Rule tests play complete personal and classic weeks for every supported size, including two-player zero recognition and six-player boards without decoys. The local demo still uses Charlie, Nancy and Song.

The [technical design](docs/PROTOTYPE_0_2_TECHNICAL_DESIGN.md) describes the Fastify/SQLite service and later private gameplay/scheduling. Midnight America/Chicago is confirmed for future rollover. Detailed lifecycle and missed-day policies remain open; this milestone sets no room-expiry schedule, skips or timers. Solo play and matchmaking are deferred. No hosting has been purchased or provisioned.

Round results now appear between **The dream comes into focus.** and **Dreams remembered**, above the dream cards. The summary includes each friend's dream clue, your guess result and points, followed by friends' recognition of your Dream and its points. It wraps across two columns on phones, up to three on tablets and up to five on wider screens. Five-friend layouts are checked with presentation fixtures; the playable prototype still uses Charlie, Nancy and Song.

Player-facing text now consistently calls the text **dream clues** and the illustrations **dream cards**. Saved pairs are confirmed above the preparation progress with **Your dream clue and dream card are remembered.** Friends' dream clues are larger, headed **Nancy’s Dream Clue** (or Song's), with **Select their Dream Card.** underneath.

The latest experiment is **Your own dream clues**: prepare six personal clue-and-card pairs instead of matching shared concepts. Write up to 80 characters for each Dream, choose its image, and confirm them together. Nancy and Song use a mix of single-word and longer fixture clues with random valid cards/guesses. Their individual clues guide the same sequential guessing board.

Personal slots are named **First Dream** through **Sixth Dream**. The softer input hint reads **Tell us about your dream... but leave some to the imagination.** The heading is **First Dream**, advancing through all six Dreams. The prominent instruction **Write a dream clue and choose its dream card.** sits beneath it; the tap/hold hint sits immediately above the cards. A compact **Dream 1 of 6** progress line replaces the repeated personal-mode overview. Tentative guesses say **Selected for Nancy** or **Selected for Song**; after reveal, decoy images are labeled **A Stranger’s Dream**. The rules and reversible mode switch are unchanged.

In this mode, each correct guess earns you 1 point. You also earn 1 point for each friend who recognizes your Dream, **except when both friends recognize it**, when your recognition award is 0. They keep their correct-guess points. The local maximum is 3 points per day / 18 per week. Recaps retain the clues, images, guesses and recognition results.

**Easy comparison:** choose **Original shared words** on the welcome screen, or use the footer's **Try original shared words · starts a new week** button. You can also open `http://127.0.0.1:5173/?mode=classic`; use `?mode=personal` for the experiment. Switching starts a fresh week and clears current local progress. Original mode retains TIME/LOVE/etc., the same artwork and interactions, and its existing guessing-only scoring. No Git rollback is needed. The run-through below describes that original mode; both modes use the same Day 1 preparation and Day 2–7 guessing controls.

Milestones 1–6 are approved. Milestones 7–10, including the requested full-week test flow, are implemented, and the user approved proceeding to Milestone 11. Day 1 is preparation; the top-right development control advances through six guessing days. Each day has Nancy's prompt followed by Song's on one stable board, locked guesses, an explicit reveal, and +1 point per correct answer. After Day 7, finish the week to see Charlie's total and begin a fresh week. Nancy's and Song's random valid choices are local fixtures, not a model of personal interpretation.

Prototype 0.1 uses **React, TypeScript, and Vite**. Charlie is the human; Nancy and Song are simulated players. All 12 planned milestones and the subsequent personal-clue, scoring and presentation refinements are implemented and approved. Open the local demo to play a complete week while connected preparation remains the next milestone.

The latest requested revisions add clearing/unlocking guesses before reveal, Charlie's own Dream in the first board slot, and a complete end-of-week recap. The “Return to the beginning” controls have been removed. The user approved moving on to the responsive polish step.

The user confirmed +1 per friend who recognizes your Dream, except when everyone does. This is implemented in personal-clue mode. Both modes simulate friends' guesses, and scoring help follows the selected mode.

## Run locally

Use Node.js **22.18+ on the 22.x line, or 24+**, and npm. Node 24 LTS remains the intended hosting runtime; this implementation and native SQLite installation were tested on the existing Windows Node 22.18.0 / npm 11.5.2 environment. The development service uses Node's built-in TypeScript support.

### Private waiting rooms (0.2.2)

Install the new dependencies once, then start the room service:

```powershell
npm install
npm run dev:server
```

In a second terminal:

```powershell
npm run dev
```

Open **http://127.0.0.1:5173/?play=rooms**, or choose **Gather friends in a private room** on the welcome page. Use this exact address (not `localhost`) with the default origin setting. If Vite was already running during package installation, restart it. Stop either process with **Ctrl+C** in its terminal.

Create a room, copy its invitation, and open it in a different browser or an InPrivate/incognito window. Join with another display name. Ordinary tabs in the same browser share a seat; private windows can also share one private session with each other. To test six distinct players, use separate browser profiles. Refresh both windows and restart the room service to check that the roster, colors, host and identities remain. A seventh player and a duplicate name should receive clear feedback. **There is no Start button or card dealing in this milestone.**

Names use 1–24 characters after trimming/collapsing whitespace; case and Unicode compatibility differences do not make a duplicate name distinct. Add an initial if needed. A name or invitation never recovers another player's seat. Session cookies last 30 days; clearing browser data, closing the last private window, switching profiles/devices or losing the cookie loses access to that seat. There is no account recovery or seat-removal flow yet.

The service stores local rooms in ignored `data/dreamerie.sqlite` with SQLite sidecar files. These are separate from the in-memory local demo. Room expiry/cleanup is not scheduled while retention policy remains undecided. `.env.example` lists optional settings; no `.env` is needed for the defaults. Never put the database under `dist/` or `public/`, which contain public assets.

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

The build includes frontend/server TypeScript checks and writes frontend assets to `dist/` and the service to `dist-server/`. Tests use Node's built-in runner and TypeScript stripping. All **81 tests** pass: 70 gameplay tests and 11 service tests covering session isolation, duplicate requests/names, concurrent capacity, invalid input, CSRF/origin protection, state guards, restart persistence, credential expiry, HTTPS cookies and rate limits. Use `npm run test:server` for just the service tests. Browser checks cover six independent room sessions, invitation entry, full/duplicate-room errors, refresh, lost-response retry across refresh, disconnect/reconnect and preserved focus at 320, 375, 390, 430, 768 and 1440px. Both local modes also pass full-week preparation, guessing, reveal, inspection, recap and restart checks. Real-device and hosted validation remain later work.

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
