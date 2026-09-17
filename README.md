# DREAMERIE

**How well do you understand the way your friends see the world?**

Dreamerie is a standalone, asynchronous social game about interpreting abstract concepts through surreal images. Players choose images that express their Dreams; later, friends try to recognize those choices. The social reward is discovering why someone saw TIME, LOVE, or HOME in a strange piece of art.

The product is mobile-first and responsive for mobile and desktop web. Artwork leads the experience, supported by a calm interface and short, atmospheric language.

## Current status

Milestones 1–5 are approved. Milestone 6 is implemented and awaiting user testing: Nancy and Song each prepare six hidden Dreams using the shared selection and replacement rules. Their random valid choices are local fixtures, not a model of personal interpretation. Charlie's preparation stays on the same page, with six cards throughout and “Your dreams are remembered.” after the final choice. Once everyone is prepared, the first hidden-order concept and Nancy/Song target IDs are ready in local state. No guessing controls or answers are displayed yet. A shared pool of 60 local SVG placeholders preserves unique allocations and independent per-player exposure tracking.

Prototype 0.1 uses **React, TypeScript, and Vite**. Charlie is the human; Nancy and Song are simulated players. Local Dream selection is available; later milestones add guessing and +1 point per correctly identified Dream.

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

The build includes TypeScript checks and writes production assets to `dist/`. Preview serves that build locally. Tests use Node's built-in runner and TypeScript stripping, with no added test dependency. Twenty-two tests cover fixtures, dealing, exposure, schedule separation, atomic selection/replacement, simulated friends, and first-round readiness, including invalid or repeated commands and exhaustion. Browser checks cover six phone/tablet/desktop widths, inspection without selection, keyboard commitment, focus, double activation, same-slot replacement, navigation stability, and the sixth-choice boundary.

Temporary artwork is original code-authored SVG geometry, not AI-generated images. See [artwork provenance and regeneration](public/artwork/README.md); it is a fixture collection rather than the final visual identity.

## Documentation

- [Game design](docs/GAME_DESIGN.md): confirmed rules, prototype assumptions, unresolved questions, and future ideas.
- [Prototype plan](docs/PROTOTYPE_PLAN.md): milestones, completion criteria, and architecture direction.
- [Art direction](docs/ART_DIRECTION.md): visual identity, mobile presentation, writing, and animation.
- [Agent instructions](AGENTS.md): guidance for future contributors and Codex sessions.

Dreamerie owns its game rules and player data. Accounts, groups, networking, and production infrastructure come later. PWA installation, native apps, and Discord are possible future directions; Discord is an optional integration and never a requirement for play.
