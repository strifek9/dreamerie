# DREAMERIE

**How well do you understand the way your friends see the world?**

Dreamerie is a standalone, asynchronous social game about interpreting abstract concepts through surreal images. Players choose images that express their Dreams; later, friends try to recognize those choices. The social reward is discovering why someone saw TIME, LOVE, or HOME in a strange piece of art.

The product is mobile-first and responsive for mobile and desktop web. Artwork leads the experience, supported by a calm interface and short, atmospheric language.

## Current status

Milestone 1 is approved. Milestone 2 is implemented and awaiting user testing: the introduction now opens a gallery of Charlie's six cards. A shared pool of 60 local SVG placeholders supplies unique hands for Charlie, Nancy, and Song, with independent per-player exposure tracking. Nancy's and Song's cards remain hidden. Dream selection, guessing, and scoring are not implemented yet.

Prototype 0.1 uses **React, TypeScript, and Vite**. Later milestones will add local Dream selection and guessing, with Charlie as the human and Nancy and Song as simulated players, temporary placeholder artwork, and +1 point per correctly identified Dream.

## Run locally

Use Node.js 22.12+ and npm (validated with Node 22.18.0 and npm 11.5.2). This satisfies [Vite's Node.js requirements](https://vite.dev/guide/).

```powershell
npm ci
npm run dev
```

Open the local URL printed in the terminal, normally `http://127.0.0.1:5173/`. Press Ctrl+C to stop the server. Choose **Enter the gallery**, then tap a card to enlarge it. Close with **Return to your cards** or Escape. Inspection does not select a Dream or change your hand. Returning to the introduction preserves the hand; refreshing creates a new local deal.

```powershell
npm run typecheck
npm test
npm run build
npm run preview
```

The build includes TypeScript checks and writes production assets to `dist/`. Preview serves that build locally. Tests use Node's built-in runner and TypeScript stripping, with no added test dependency. Seven tests cover fixtures, unique dealing, exhaustion, invalid input, reproducibility, and exposure. The gallery was checked in headless Edge at 320, 375, 390, 430, 768, and 1440 CSS-pixel widths, including keyboard inspection, Escape, focus return, and unchanged hands.

Temporary artwork is original code-authored SVG geometry, not AI-generated images. See [artwork provenance and regeneration](public/artwork/README.md); it is a fixture collection rather than the final visual identity.

## Documentation

- [Game design](docs/GAME_DESIGN.md): confirmed rules, prototype assumptions, unresolved questions, and future ideas.
- [Prototype plan](docs/PROTOTYPE_PLAN.md): milestones, completion criteria, and architecture direction.
- [Art direction](docs/ART_DIRECTION.md): visual identity, mobile presentation, writing, and animation.
- [Agent instructions](AGENTS.md): guidance for future contributors and Codex sessions.

Dreamerie owns its game rules and player data. Accounts, groups, networking, and production infrastructure come later. PWA installation, native apps, and Discord are possible future directions; Discord is an optional integration and never a requirement for play.
