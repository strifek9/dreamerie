# DREAMERIE

**How well do you understand the way your friends see the world?**

Dreamerie is a standalone, asynchronous social game about interpreting abstract concepts through surreal images. Players choose images that express their Dreams; later, friends try to recognize those choices. The social reward is discovering why someone saw TIME, LOVE, or HOME in a strange piece of art.

The product is mobile-first and responsive for mobile and desktop web. Artwork leads the experience, supported by a calm interface and short, atmospheric language.

## Current status

Milestones 1–6 are approved. Milestones 7–10, including the requested full-week test flow, are implemented and awaiting user testing. Day 1 is preparation; the top-right development control advances through six guessing days. Each day has Nancy's prompt followed by Song's on one stable board, locked guesses, an explicit reveal, and +1 point per correct answer. After Day 7, finish the week to see Charlie's total and begin a fresh week. Nancy's and Song's random valid choices are local fixtures, not a model of personal interpretation.

Prototype 0.1 uses **React, TypeScript, and Vite**. Charlie is the human; Nancy and Song are simulated players. The complete local week is playable, with responsive/accessibility polish and gentle transitions still planned.

## Run locally

Use Node.js 22.12+ and npm (validated with Node 22.18.0 and npm 11.5.2). This satisfies [Vite's Node.js requirements](https://vite.dev/guide/).

```powershell
npm ci
npm run dev
```

Open the local URL printed in the terminal, normally `http://127.0.0.1:5173/`. Press Ctrl+C to stop the server. Choose **Enter your Dream Week** to see TIME, LOVE, FREEDOM, HOME, FEAR, and CHANGE. The top-right development controls show the local test day; the randomized concept schedule remains hidden.

The weekly overview, current prompt, and six cards share one preparation page. It starts with **You dream of TIME. What does that look like to you?** Tap a card to mark it as chosen, then use **Remember this dream** to commit it. The image is replaced in the same slot, and the prompt advances to LOVE in place. **Look closer** optionally enlarges the marked image; **Return to your cards** or Escape closes inspection without committing it. No gallery or setup-page navigation is required between choices. After six choices, **Your dreams are remembered.** appears in place with no further choice controls. The displayed cards are the images left in your hand, not the selected Dreams; they can still be enlarged without changing anything.

You remain on **Day 1** after completing preparation. Use **Next day →** in the top-right development controls to simulate **Day 2**. This is available only after six choices; no clock or real day wait is involved. The first concept comes from the hidden randomized order and may differ from TIME. First, **Nancy dreamt of [concept]. What did their dream look like?** Mark a card and confirm **Remember Nancy’s dream**. Your guess locks, and Song's prompt appears on the same board. Choose a different image and confirm **Remember Song’s dream**. Both guesses then remain locked until you choose **Reveal their dreams**.

The reveal pairs each guess with the friend's actual Dream, explains the result, and adds +1 per match to your total. **Next day →** becomes available after reveal. Repeat through **Days 2–7**, one concept per day, then choose **Finish week** to see **The dream fades.** and your total out of 12. **Begin a new week** clears the previous week and returns to Day 1 with fresh hands, friend selections, and a hidden order. There are no simulated friend scores or standings.

**Look closer** optionally enlarges a marked image without committing it. Locked images remain inspectable by tapping them; Escape or **Return to your cards** closes inspection. Returning to the beginning and entering the week preserves the day, current friend, board order, guesses, reveal, and score. Refreshing also resets the demonstration to Day 1.

```powershell
npm run typecheck
npm test
npm run build
npm run preview
```

The build includes TypeScript checks and writes production assets to `dist/`. Preview serves that build locally. Tests use Node's built-in runner and TypeScript stripping, with no added test dependency. Forty tests cover dealing, exposure, selection/replacement, simulated friends, strict decoys, stable boards, assignment locking, delayed reveal, 0/1/2-point scoring, all six rounds, and fresh restart, including invalid/repeated commands and exhaustion. Browser checks cover six phone/tablet/desktop widths, touch/keyboard interaction, focus, double activation, navigation stability, all six guessing days, displayed score calculations, the week ending, and restart.

Temporary artwork is original code-authored SVG geometry, not AI-generated images. See [artwork provenance and regeneration](public/artwork/README.md); it is a fixture collection rather than the final visual identity.

## Documentation

- [Game design](docs/GAME_DESIGN.md): confirmed rules, prototype assumptions, unresolved questions, and future ideas.
- [Prototype plan](docs/PROTOTYPE_PLAN.md): milestones, completion criteria, and architecture direction.
- [Art direction](docs/ART_DIRECTION.md): visual identity, mobile presentation, writing, and animation.
- [Agent instructions](AGENTS.md): guidance for future contributors and Codex sessions.

Dreamerie owns its game rules and player data. Accounts, groups, networking, and production infrastructure come later. PWA installation, native apps, and Discord are possible future directions; Discord is an optional integration and never a requirement for play.
