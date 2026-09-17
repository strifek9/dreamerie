# Dreamerie artwork

The active deck uses 120 original generated illustrations in `dreams/card-001.jpg`
through `dreams/card-120.jpg`. The user authorized this development artwork to
replace the geometric placeholders. Each card has its own composition and was
generated separately with the built-in image-generation tool. The art mixes
emotions, palettes and levels of abstraction, with illustrated storybook texture
and open-ended surreal imagery. No photorealism or copies of existing Dixit cards.

Prompts and production direction are recorded in
[`docs/artwork/`](../../docs/artwork/README.md). Each adjacent `.provenance.json`
records its source generation filename, dimensions, byte count and SHA-256 hash.
The original PNG is retained in the generation tool's local output directory;
the repository contains the complete image encoded as JPEG at quality 88,
without cropping, repainting or resizing. No runtime network service is needed.

`dreamerie-garden.jpg` is a separate welcome illustration. It is not a playing
card and cannot be selected or drawn. Do not reuse active deck images as interface
decoration that could expose otherwise unseen decoys.

After generating and reviewing a new local image, import it from PowerShell:

```powershell
./scripts/import-dream-artwork.ps1 -Source 'C:/path/to/generated-image.png' -CardId card-001
```

The import refuses to overwrite existing artwork. Its JPEG encoder uses Windows
System.Drawing and is a development-only helper. Ordinary game development,
building and playing do not require it or depend on Windows.

To validate all 120 files and synchronize their reviewed visual descriptions:

```powershell
node scripts/sync-artwork.mjs
```

All 120 cards share the same allocation pool. Never assign visual families or
emotional categories to specific players or decoys. Descriptions identify visible
objects without prescribing meanings or revealing ownership.

## Archived geometric fixtures

The original 60 code-authored SVG placeholders remain here for provenance. They
are no longer used by the active deck. `scripts/create-placeholder-artwork.mjs`
recreates those SVGs and `placeholder-cards.json`; it cannot overwrite the active
`src/data/cards.ts`. Those original fixtures used no external or AI-generated
images. Neither this archive nor the generated artwork establishes a license for
the entire repository; release artwork sourcing remains a separate decision.
