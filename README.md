# DREAMERIE

**How well do you understand the way your friends see the world?**

Dreamerie is a standalone, asynchronous social game about interpreting abstract concepts through surreal images. Players choose images that express their Dreams; later, friends try to recognize those choices. The social reward is discovering why someone saw TIME, LOVE, or HOME in a strange piece of art.

The product is mobile-first and responsive for mobile and desktop web. Artwork leads the experience, supported by a calm interface and short, atmospheric language.

## Current status

Milestone 1 is implemented and awaiting user testing and approval: React + TypeScript + Vite now runs a minimal, mobile-first Dreamerie introduction. The repository initially contained only documentation. Card fixtures and gameplay have not been implemented yet.

Prototype 0.1 uses **React, TypeScript, and Vite**. Later milestones will add local Dream selection and guessing, with Charlie as the human and Nancy and Song as simulated players, temporary placeholder artwork, and +1 point per correctly identified Dream.

## Run locally

Use Node.js 22.12+ and npm (validated with Node 22.18.0 and npm 11.5.2). This satisfies [Vite's Node.js requirements](https://vite.dev/guide/).

```powershell
npm ci
npm run dev
```

Open the local URL printed in the terminal, normally `http://127.0.0.1:5173/`. Press Ctrl+C to stop the server. The current screen is an introduction only; there are no gameplay controls yet.

```powershell
npm run typecheck
npm run build
npm run preview
```

The build includes TypeScript checks and writes production assets to `dist/`. Preview serves that build locally. There is no automated unit-test suite yet; meaningful game-rule tests will be added alongside gameplay. Milestone 1 was checked in headless Edge at 320, 375, 390, 430, 768, and 1440 CSS-pixel widths, with no horizontal overflow, clipped text, or browser runtime errors.

## Documentation

- [Game design](docs/GAME_DESIGN.md): confirmed rules, prototype assumptions, unresolved questions, and future ideas.
- [Prototype plan](docs/PROTOTYPE_PLAN.md): milestones, completion criteria, and architecture direction.
- [Art direction](docs/ART_DIRECTION.md): visual identity, mobile presentation, writing, and animation.
- [Agent instructions](AGENTS.md): guidance for future contributors and Codex sessions.

Dreamerie owns its game rules and player data. Accounts, groups, networking, and production infrastructure come later. PWA installation, native apps, and Discord are possible future directions; Discord is an optional integration and never a requirement for play.
