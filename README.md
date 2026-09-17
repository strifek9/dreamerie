# DREAMERIE

**How well do you understand the way your friends see the world?**

Dreamerie is a standalone, asynchronous social game about interpreting abstract concepts through surreal images. Players choose images that express their Dreams; later, friends try to recognize those choices. The social reward is discovering why someone saw TIME, LOVE, or HOME in a strange piece of art.

The product is mobile-first and responsive for mobile and desktop web. Artwork leads the experience, supported by a calm interface and short, atmospheric language.

## Current status

Milestones 1–4 are approved. Milestone 5 is implemented and awaiting user testing: after Charlie's sixth choice, “Your dreams are remembered.” appears in the same preparation page and receives focus. Committed choices stay intact, and the remaining hand has six cards including the final replacement. Display/setup order remains independent of the hidden randomized daily order. A shared pool of 60 local SVG placeholders supplies unique hands for Charlie, Nancy, and Song, with independent per-player exposure tracking. Nancy's and Song's cards remain hidden. Friends' simulated selections, guessing, and scoring come later.

Prototype 0.1 uses **React, TypeScript, and Vite**. Later milestones will add local Dream selection and guessing, with Charlie as the human and Nancy and Song as simulated players, temporary placeholder artwork, and +1 point per correctly identified Dream.

## Run locally

Use Node.js 22.12+ and npm (validated with Node 22.18.0 and npm 11.5.2). This satisfies [Vite's Node.js requirements](https://vite.dev/guide/).

```powershell
npm ci
npm run dev
```

Open the local URL printed in the terminal, normally `http://127.0.0.1:5173/`. Press Ctrl+C to stop the server. Choose **Enter your Dream Week** to see TIME, LOVE, FREEDOM, HOME, FEAR, and CHANGE. No day labels or daily schedule are displayed.

The weekly overview, current prompt, and six cards share one preparation page. It starts with **You dream of TIME. What does that look like to you?** Tap a card to mark it as chosen, then use **Remember this dream** to commit it. The image is replaced in the same slot, and the prompt advances to LOVE in place. **Look closer** optionally enlarges the marked image; **Return to your cards** or Escape closes inspection without committing it. No gallery or setup-page navigation is required between choices. After six choices, **Your dreams are remembered.** appears in place with no further choice controls. The displayed cards are the images left in your hand, not the selected Dreams; they can still be enlarged without changing anything. Returning to the beginning and entering the week again preserves the completion state and hand. Refreshing creates a new local week and clears choices. Guessing is not available yet.

```powershell
npm run typecheck
npm test
npm run build
npm run preview
```

The build includes TypeScript checks and writes production assets to `dist/`. Preview serves that build locally. Tests use Node's built-in runner and TypeScript stripping, with no added test dependency. Seventeen tests cover fixtures, dealing, exposure, schedule separation, and atomic selection/replacement, including invalid or repeated commands and exhaustion. Browser checks cover six phone/tablet/desktop widths, inspection without selection, keyboard commitment, focus, double activation, same-slot replacement, navigation stability, and the sixth-choice boundary.

Temporary artwork is original code-authored SVG geometry, not AI-generated images. See [artwork provenance and regeneration](public/artwork/README.md); it is a fixture collection rather than the final visual identity.

## Documentation

- [Game design](docs/GAME_DESIGN.md): confirmed rules, prototype assumptions, unresolved questions, and future ideas.
- [Prototype plan](docs/PROTOTYPE_PLAN.md): milestones, completion criteria, and architecture direction.
- [Art direction](docs/ART_DIRECTION.md): visual identity, mobile presentation, writing, and animation.
- [Agent instructions](AGENTS.md): guidance for future contributors and Codex sessions.

Dreamerie owns its game rules and player data. Accounts, groups, networking, and production infrastructure come later. PWA installation, native apps, and Discord are possible future directions; Discord is an optional integration and never a requirement for play.
