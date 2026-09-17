# DREAMERIE

**How well do you understand the way your friends see the world?**

Dreamerie is a standalone, asynchronous social game about interpreting abstract concepts through surreal images. Players choose images that express their Dreams; later, friends try to recognize those choices. The social reward is discovering why someone saw TIME, LOVE, or HOME in a strange piece of art.

The product is mobile-first and responsive for mobile and desktop web. Artwork leads the experience, supported by a calm interface and short, atmospheric language.

## Current status

Milestones 1–6 are approved. Milestones 7–10, including the requested full-week test flow, are implemented and awaiting user testing. Day 1 is preparation; the top-right development control advances through six guessing days. Each day has Nancy's prompt followed by Song's on one stable board, locked guesses, an explicit reveal, and +1 point per correct answer. After Day 7, finish the week to see Charlie's total and begin a fresh week. Nancy's and Song's random valid choices are local fixtures, not a model of personal interpretation.

Prototype 0.1 uses **React, TypeScript, and Vite**. Charlie is the human; Nancy and Song are simulated players. The complete local week is playable, with responsive/accessibility polish and gentle transitions still planned.

The latest requested revisions add clearing/unlocking guesses before reveal, Charlie's own Dream in the first board slot, and a complete end-of-week recap. The “Return to the beginning” controls have been removed. These changes are awaiting user testing.

## Run locally

Use Node.js 22.12+ and npm (validated with Node 22.18.0 and npm 11.5.2). This satisfies [Vite's Node.js requirements](https://vite.dev/guide/).

```powershell
npm ci
npm run dev
```

Open the local URL printed in the terminal, normally `http://127.0.0.1:5173/`. Press Ctrl+C to stop the server. Choose **Enter your Dream Week** to see TIME, LOVE, FREEDOM, HOME, FEAR, and CHANGE. The top-right development controls show the local test day; the randomized concept schedule remains hidden.

The weekly overview, current prompt, and six cards share one preparation page. It starts with **You dream of TIME. What does that look like to you?** Tap a card to mark it as chosen, then use **Remember this dream** to commit it. The image is replaced in the same slot, and the prompt advances to LOVE in place. **Look closer** optionally enlarges the marked image; **Return to your cards** or Escape closes inspection without committing it. No gallery or setup-page navigation is required between choices. After six choices, **Your dreams are remembered.** appears in place with no further choice controls. The displayed cards are the images left in your hand, not the selected Dreams; they can still be enlarged without changing anything.

You remain on **Day 1** after completing preparation. Use **Next day →** in the top-right development controls to simulate **Day 2**. This is available only after six choices; no clock or real day wait is involved. The first concept comes from the hidden randomized order and may differ from TIME. First, **Nancy dreamt of [concept]. What did their dream look like?** Mark a card and confirm **Remember Nancy’s dream**. Your guess locks, and Song's prompt appears on the same board. Choose a different image and confirm **Remember Song’s dream**. Both guesses then remain locked until you choose **Reveal their dreams**.

Reveal keeps the same six cards in position, labels friends' actual Dreams and decoys, and shows your guesses on their cards. Text below explains each result and adds +1 per match to your total. **Next day →** becomes available after reveal. Repeat through **Days 2–7**, one concept per day, then choose **Finish week** to see **The dream fades.** and your total out of 12. **Begin a new week** clears the previous week and returns to Day 1 with fresh hands, friend selections, and a hidden order. There are no simulated friend scores or standings.

Tap a marked card again to clear an unconfirmed selection. Before reveal, use **Unlock Nancy’s guess** or **Unlock Song’s guess** to change that guess. The other friend's choice and board order stay intact; both guesses must be confirmed again before reveal. Once revealed, the results are final.

Your own Dream for the current concept is always the first of the six cards during guessing and reveal, with a teal border and “Your Dream · View only” label. It cannot be assigned to a friend. The other five cards contain Nancy's and Song's Dreams plus three fresh decoys. **Look closer** optionally enlarges a marked image without committing it. Your own Dream and locked images remain inspectable by tapping them; Escape or **Return to your cards** closes inspection. The week ends with all six concepts, your own Dreams, Nancy's and Song's actual Dreams, your final guesses, and results. Refreshing or **Begin a new week** clears that recap and resets to Day 1.

```powershell
npm run typecheck
npm test
npm run build
npm run preview
```

The build includes TypeScript checks and writes production assets to `dist/`. Preview serves that build locally. Tests use Node's built-in runner and TypeScript stripping, with no added test dependency. Forty-five tests cover dealing, exposure, selection/replacement, simulated friends, strict decoys, stable boards, assignment locking/unlocking, delayed reveal, 0/1/2-point scoring, all six rounds, complete recaps, and fresh restart, including invalid/repeated commands and exhaustion. Browser checks cover six phone/tablet/desktop widths, touch/keyboard interaction, clearing and revising guesses, focus, own-Dream references, all six days, recap images against played results, and restart.

The requested visual refresh uses **120 distinct local illustrations**, a separate illustrated welcome scene, and a parchment, teal and plum interface. The cards span vivid colors, quiet pastels, light and dark moods, funny scenes, and more abstract visual puzzles. They draw on the user's illustrated references and Dixit's associative storytelling with original compositions. The full card image remains visible in play and inspection. Selection and lock labels sit below the artwork.

Artwork was generated during development with the built-in image-generation tool; the game has no live generation API or external image service. See [asset provenance and synchronization](public/artwork/README.md) and the [recorded prompt set](docs/artwork/prompts.json). The original SVG fixtures are archived and no longer dealt. All 120 illustrations were visually reviewed and decoded successfully in the browser. The 45 tests, TypeScript checks, production build and full-week browser checks at six viewport widths pass with the new deck. This visual refresh precedes Milestone 11 and awaits user testing; the remaining accessibility and transition milestones are still separate.

## Documentation

- [Game design](docs/GAME_DESIGN.md): confirmed rules, prototype assumptions, unresolved questions, and future ideas.
- [Prototype plan](docs/PROTOTYPE_PLAN.md): milestones, completion criteria, and architecture direction.
- [Art direction](docs/ART_DIRECTION.md): visual identity, mobile presentation, writing, and animation.
- [Agent instructions](AGENTS.md): guidance for future contributors and Codex sessions.

Dreamerie owns its game rules and player data. Accounts, groups, networking, and production infrastructure come later. PWA installation, native apps, and Discord are possible future directions; Discord is an optional integration and never a requirement for play.
