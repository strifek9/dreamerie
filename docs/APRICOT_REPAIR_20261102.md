# Apricot Airship repair — November 2, 2026

User authorized fixing and republishing both November 1 Daily Dream #39 defects.
Base: 2c42677be502e8e02518d1dbf6dbeed0f5d7573b. Existing desktop checkout was clean and retained unchanged; release work uses an isolated checkout.

The pennant's source had shifted relative to the clipping rectangle, creating a notch and a detached rope fragment. Native localized recomposition aligns the existing pixels at that seam. The hitbox remains x299–361, y292–355; source pixels outside are exactly original, and the other four delivered patches are byte identical. The immutable old delivery is retained in provenance; the repaired delivery has a versioned URL. No artwork was generated.

The global 0.04-width circle overlap allowance extended 66.88 native pixels beyond the star box and admitted mouse guesses. Fresh rounds use v4-fairness-dream-039-v1 with an eight-pixel star allowance. Every other clue retains its allowance, geometry, and scoring behavior. Original v4-dream-039 saves retain their scoring tolerance because saved coordinates are replayed on reload. The visual pennant repair applies to both versions. Storage, five guesses, deadline, layout, and history are unchanged.

Validation:
- 117 tests pass, including mouse misses, star boundaries/allowance, repeat uniqueness, corrected 4/5, retained 5/5, and saved in-progress identity/deadline.
- Typecheck and Pages production build pass; 967 resolvable saved IDs, 383 current cards, 4,620 files, 1,599,627,780 bytes; native lossless image and artifact hashes verified. All calendar delivery dependencies through 2046 are covered.
- Isolated Edge headless desktop 1440px and touch-emulated phone 390px: actual production canvas taps, fresh 4/5, old 5/5, reload, zoom controls and expanded Memory. Screenshots inspected; no JavaScript exceptions. Physical phones remain untested.
- Browser harness in apricot-repair-20261102/browser-qa.mjs requires an isolated CDP browser on port9447 and local exact Pages build on4177. QA_ORIGIN can target production; it changes localStorage only in that isolated browser profile and fixes its local clock to November1.

The initial Pages build lacked DREAMERIE_PUBLIC_ORIGIN; it passed after using the existing https://dreamerie.pages.dev origin. Initial CLI project lookup could not verify the proxy certificate; the existing trusted CA bundle restored authenticated access with TLS verification enabled. No credentials/scopes/settings were changed.
