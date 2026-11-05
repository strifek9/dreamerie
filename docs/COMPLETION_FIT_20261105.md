# Completion image fit — November 5, 2026

Base: `8dcdd1a90b0cb4c419709697a1466a6f0accdb4f`, verified remote main.
Implementation uses a clean isolated checkout; `D:/Dreamerie` and the November 2 checkout remain unchanged.

Both comparison paintings now return to centered 100% fit when the round enters
results, for either the fifth confirmed guess or expiry. The existing result
effect closes any expanded viewer, preview or help. It also resets the shared
image view once, keyed only to the phase transition. Result updates and later
zoom/pan/marker inspection do not reset it. The two comparison canvases remount
on completion, clearing in-flight pointer/pinch/hold state so an unfinished
gesture cannot put the old zoom back.

No scoring, five-confirmation limit, deadline, session schema, storage namespace,
saved guesses, sharing, layout or artwork changes are part of the fit repair.

Validation before artwork integration:

- All 117 existing unit tests passed.
- Typecheck, standard production build and Pages build passed. Existing large
  chunk advisory remains. Pages audit: 967 saved IDs / 383 current cards;
  native lossless assets and calendar dependencies through 2046 verified.
- `node scripts/validateLandscapeCollection.mjs` passed all 120 historical pairs.
- `scripts/qaCompletionFit.mjs` is a dependency-free CDP regression harness.
  It requires an isolated Chromium profile on port 9455; defaults to local dev
  on 4178. Set `QA_ORIGIN` to an exact static build or production origin.
  It replaces saves only in that disposable browser profile, fixes its local
  clock to November 5, and advances the clock for expiry rather than pausing
  or changing the application deadline.
- Desktop 1440×1000 and touch-emulated 390×844 cover fifth confirmation inline
  and in an expanded Memory viewer, expiry during active drag/pinch, expanded Dream
  viewer, help, landing preview, interrupted focus/visibility, and another-tab
  completion. All verify both paintings fitted, viewer closed, saved guesses
  and original start preserved, and later result zoom/marker inspection usable.
  Touch additionally verifies first pinch from fit and one-finger result scroll.
- Internal evidence: `.validation/completion-fit/browser-qa.json` and four
  desktop/touch screenshots. Screenshots were visually inspected.

Sandbox process spawning initially returned `EPERM` for tests/build; approved
execution outside that restriction succeeded. No permissions or dependencies
were changed. Physical Samsung hardware and native OS interruptions remain
unverified; touch checks use Chromium emulation.

The exact Pages output also passed the same browser suite. Evidence JSON records
the tested origin. The existing Pages project and Pages-only Wrangler 4.149.0
workflow were verified read-only. Before changes, production served
`app-BFiRhBnx.js` (SHA256 `824b855a5edbcd707faa21cb226c43c796c6291950012e262dfe638b526ba733`).

Otter integration is blocked: the parent supplied Library item
`libfile_84f7d5b8679c8191b39e2daee076ca1d`, filename
`dream-043-paddle-connection-source-v5.png`, expected SHA256
`d08652bf0f5aeecefe7de1e9a0f039a36f4105acb6f35863601f580df5d71e36`.
The current Library materialization helper failed on Windows while applying
metadata: `AttributeError: module 'os' has no attribute 'setxattr'`. It installed
no consumer-local PNG, so corrected pixels/dimensions/hash have not been
independently verified or integrated. No fallback transfer was attempted.
An authorized compatibility check found no usable existing Linux runtime:
`wsl --list --verbose` exits 1 with installation/help text and there is no
registered `HKCU/Software/Microsoft/Windows/CurrentVersion/Lxss` key. No
`bash`, `sh`, Docker or Podman executable was available on PATH; standard
Cygwin/MSYS/Git Linux-like Python locations were absent. The installed Python
reports `win32`, `setxattr: False`. Nothing was installed or reconfigured.
The transfer remains stopped; metadata was not saved.
The planned source override is only `v4-dream-043/change-4`, preserving its
hitbox, feather, label, original and four other differences. Keep the old source
and immutable crop; add a versioned source/delivery and regenerate its audit.
Since geometry/scoring stay identical, no saved-card ID change is needed.

The initial publication handoff was denied pending explicit approval. The user
subsequently answered “Yes you may” to committing, pushing and publishing this
zoom fix and the paddle repair once integrated to `https://dreamerie.pages.dev`.
The parent forwarded that approval and requested a safe zoom-only release when
the exact paddle repair remained unavailable. The PNG remains absent from
`C:/Users/Kou/Downloads/dream-043-paddle-connection-source-v5.png`; the release
therefore includes only completion fit. The paddle is not represented as fixed.
Exact hosted verification is recorded after publication below.
Existing target: `https://dreamerie.pages.dev`.
Build using `DREAMERIE_PUBLIC_ORIGIN=https://dreamerie.pages.dev npm run build:pages`.
Publish the exact verified main commit with the existing Pages-only Wrangler
installation/configuration. Old Worker/Render hosts and settings remain intact.
