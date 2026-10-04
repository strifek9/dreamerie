import type { LandscapeDream } from '../v2/landscapeCollection.ts'

// Unreleased Version 4 proofs. These are deliberately outside the daily
// rotation; ?dream=v4-dream-001 is a local editorial/playtest preview.
// Only the five clipped regions of the edited source appear in The Memory.
const altered = '/artwork/v4/collection/dream-002-altered-source-v4.png'
const fishSource = '/artwork/v4/collection/dream-002-fish-source-v4.png'
const bowSource = '/artwork/v4/collection/dream-002-bow-source-v4.png'
const lilySource = '/artwork/v4/collection/dream-002-lily-source-v4.png'

export const v4PreviewDreams: readonly LandscapeDream[] = [{
  id: 'v4-dream-001',
  title: 'The Orchard of Sleeping Clocks',
  original: '/artwork/v4/collection/dream-001-original-v4.png',
  altered: '/artwork/v4/collection/dream-001-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'fox-tail-scale-rim',
      label: "The fox's white tail spills over the brass scale rim.",
      difficulty: 'Easy',
      box: { left: 650 / 1672, top: 517 / 941, width: 213 / 1672, height: 166 / 941 },
      edgeFade: 12,
    },
    {
      id: 'vine-ladder-rung',
      label: "A green vine loops around the ladder's middle rung.",
      difficulty: 'Medium',
      box: { left: 548 / 1672, top: 304 / 941, width: 164 / 1672, height: 86 / 941 },
      source: '/artwork/v4/collection/dream-001-ladder-vine-source-v4.png',
      edgeFade: 12,
    },
    {
      id: 'clock-hand-twig',
      label: "The upper pear-clock's minute hand sprouts leaves.",
      difficulty: 'Hard',
      box: { left: 841 / 1672, top: 158 / 941, width: 116 / 1672, height: 90 / 941 },
      source: '/artwork/v4/collection/dream-001-clock-twig-source-v4.png',
      edgeFade: 10,
    },
    {
      id: 'droplet-reflection',
      label: 'The middle water drop reflects a tiny pear-clock.',
      difficulty: 'Very hard',
      box: { left: 1162 / 1672, top: 550 / 941, width: 79 / 1672, height: 76 / 941 },
      edgeFade: 8,
    },
    {
      id: 'embroidered-crossing',
      label: "The embroidered sprig's stem crosses the lace hem.",
      difficulty: 'Dreamlike',
      box: { left: 270 / 1672, top: 775 / 941, width: 175 / 1672, height: 150 / 941 },
      edgeFade: 12,
    },
  ],
}, {
  id: 'v4-dream-002',
  title: 'The Seamstress of Rain',
  original: '/artwork/v4/collection/dream-002-original-v4.png',
  altered,
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'shawl-crescent',
      label: "The shawl's middle ivory patch becomes a crescent.",
      difficulty: 'Easy',
      box: { left: 453 / 1672, top: 355 / 941, width: 90 / 1672, height: 105 / 941 },
      source: altered,
      edgeFade: 8,
    },
    {
      id: 'paper-fish',
      label: "The top paper fish's broad folded face turns gold.",
      difficulty: 'Medium',
      box: { left: 975 / 1672, top: 355 / 941, width: 56 / 1672, height: 47 / 941 },
      source: fishSource,
      edgeFade: 3,
    },
    {
      id: 'cloud-stitches',
      label: 'A run of the cloud seam is cross-stitched.',
      difficulty: 'Hard',
      box: { left: 1030 / 1672, top: 65 / 941, width: 165 / 1672, height: 160 / 941 },
      source: altered,
      edgeFade: 8,
    },
    {
      id: 'parasol-bow',
      label: "The parasol's large bow crosses the next ivory fold.",
      difficulty: 'Very hard',
      box: { left: 1252 / 1672, top: 730 / 941, width: 110 / 1672, height: 150 / 941 },
      source: bowSource,
      edgeFade: 12,
    },
    {
      id: 'lily-stitches',
      label: 'Four straight stitches on the lily pad become cross-stitches.',
      difficulty: 'Dreamlike',
      box: { left: 730 / 1672, top: 708 / 941, width: 95 / 1672, height: 75 / 941 },
      source: lilySource,
      edgeFade: 12,
    },
  ],
}, {
  id: 'v4-dream-003',
  title: 'The Train Beneath the Pillow',
  original: '/artwork/v4/collection/dream-003-original-v4.png',
  altered: '/artwork/v4/collection/dream-003-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'steam-over-pillow',
      label: "The train's steam spills over the top of the blue pillow.",
      difficulty: 'Easy',
      box: { left: 758 / 1672, top: 135 / 941, width: 345 / 1672, height: 289 / 941 },
      source: '/artwork/v4/collection/dream-003-steam-source-v4.png',
      edgeFade: 16,
    },
    {
      id: 'bell-beads-swing-left',
      label: "The station bell's two beads swing to the left.",
      difficulty: 'Medium',
      box: { left: 1278 / 1672, top: 186 / 941, width: 177 / 1672, height: 173 / 941 },
      source: '/artwork/v4/collection/dream-003-bell-source-v4.png',
      edgeFade: 10,
    },
    {
      id: 'pillow-pinwheel',
      label: 'An ivory blossom on the pillow curls into a pinwheel.',
      difficulty: 'Hard',
      box: { left: 447 / 1672, top: 112 / 941, width: 146 / 1672, height: 119 / 941 },
      edgeFade: 13,
    },
    {
      id: 'carriage-window-order',
      label: 'A dark window interrupts the glowing carriage row.',
      difficulty: 'Very hard',
      box: { left: 674 / 1672, top: 429 / 941, width: 246 / 1672, height: 106 / 941 },
      edgeFade: 13,
    },
    {
      id: 'ticket-through-handle',
      label: 'A blank train ticket threads through the suitcase handle.',
      difficulty: 'Dreamlike',
      box: { left: 423 / 1672, top: 798 / 941, width: 272 / 1672, height: 136 / 941 },
      source: '/artwork/v4/collection/dream-003-ticket-source-v4.png',
      edgeFade: 11,
    },
  ],
}, {
  id: 'v4-dream-004',
  title: 'The Door to the Sea',
  original: '/artwork/v4/collection/dream-004-original-v4.png',
  altered: '/artwork/v4/collection/dream-004-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'wave-crosses-threshold',
      label: 'A sea wave splashes over the door’s near threshold stone.',
      difficulty: 'Easy',
      box: { left: 395 / 1672, top: 601 / 941, width: 228 / 1672, height: 153 / 941 },
      edgeFade: 15,
    },
    {
      id: 'gull-lifts-wing',
      label: 'The middle fence gull lifts a wing over the rail.',
      difficulty: 'Medium',
      box: { left: 1370 / 1672, top: 455 / 941, width: 151 / 1672, height: 104 / 941 },
      source: '/artwork/v4/collection/dream-004-gull-shoe-source-v4.png',
      edgeFade: 12,
    },
    {
      id: 'fish-ribbon-wrist',
      label: 'The fish’s ribbon loops around the girl’s raised wrist.',
      difficulty: 'Hard',
      box: { left: 954 / 1672, top: 258 / 941, width: 85 / 1672, height: 107 / 941 },
      source: '/artwork/v4/collection/dream-004-wrist-ribbon-source-v4.png',
      edgeFade: 9,
    },
    {
      id: 'ribbon-under-shoe-buckle',
      label: 'A violet ribbon threads under the shoe’s buckle.',
      difficulty: 'Very hard',
      box: { left: 1183 / 1672, top: 705 / 941, width: 157 / 1672, height: 111 / 941 },
      source: '/artwork/v4/collection/dream-004-gull-shoe-source-v4.png',
      edgeFade: 11,
    },
    {
      id: 'shell-pearl',
      label: 'The purple shell opens to reveal a tiny ivory pearl.',
      difficulty: 'Dreamlike',
      box: { left: 1342 / 1672, top: 775 / 941, width: 172 / 1672, height: 88 / 941 },
      source: '/artwork/v4/collection/dream-004-shell-open-pearl-source-v4.png',
      edgeFade: 10,
    },
  ],
}, {
  id: 'v4-dream-005',
  title: 'The House That Walked Away',
  original: '/artwork/v4/collection/dream-005-original-v4.png',
  altered: '/artwork/v4/collection/dream-005-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'bird-looks-down',
      label: 'The chimney bird looks down at the walking house.',
      difficulty: 'Easy',
      box: { left: 966 / 1672, top: 22 / 941, width: 84 / 1672, height: 94 / 941 },
      edgeFade: 8,
    },
    {
      id: 'pink-stream-through-bridge',
      label: 'A pink stream winds through the leftmost bridge arch.',
      difficulty: 'Medium',
      box: { left: 451 / 1672, top: 506 / 941, width: 48 / 1672, height: 72 / 941 },
      source: '/artwork/v4/collection/dream-005-bridge-arch-source-v4.png',
      edgeFade: 8,
    },
    {
      id: 'bootlace-bow',
      label: 'A tied bow appears on the walking house’s left boot.',
      difficulty: 'Hard',
      box: { left: 618 / 1672, top: 594 / 941, width: 113 / 1672, height: 117 / 941 },
      edgeFade: 10,
    },
    {
      id: 'umbrella-snail-spiral',
      label: 'The umbrella’s middle dot curls into a snail-shell spiral.',
      difficulty: 'Very hard',
      box: { left: 1481 / 1672, top: 652 / 941, width: 62 / 1672, height: 63 / 941 },
      source: '/artwork/v4/collection/dream-005-umbrella-spiral-source-v4b.png',
      edgeFade: 7,
    },
    {
      id: 'snail-carries-door',
      label: 'A miniature purple door appears in the snail’s shell.',
      difficulty: 'Dreamlike',
      box: { left: 104 / 1672, top: 647 / 941, width: 131 / 1672, height: 110 / 941 },
      source: '/artwork/v4/collection/dream-005-snail-door-source-v4.png',
      edgeFade: 10,
    },
  ],
}, {
  id: 'v4-dream-006',
  title: 'The Unbuttoned Horizon',
  original: '/artwork/v4/collection/dream-006-original-v4.png',
  altered: '/artwork/v4/collection/dream-006-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'chair-cloth-fold',
      label: 'The chair cloth folds back to show a tiny stitched star.',
      difficulty: 'Easy',
      box: { left: 91 / 1672, top: 638 / 941, width: 132 / 1672, height: 156 / 941 },
      source: '/artwork/v4/collection/dream-006-chair-fold-source-v4.png',
      edgeFade: 11,
    },
    {
      id: 'needle-at-buttonhole',
      label: 'A copper needle crosses the lower buttonhole.',
      difficulty: 'Medium',
      box: { left: 582 / 1672, top: 528 / 941, width: 103 / 1672, height: 108 / 941 },
      source: '/artwork/v4/collection/dream-006-needle-source-v4.png',
      edgeFade: 10,
    },
    {
      id: 'pennant-around-mast',
      label: "The boat's red pennant curls around its mast.",
      difficulty: 'Hard',
      box: { left: 696 / 1672, top: 319 / 941, width: 91 / 1672, height: 60 / 941 },
      source: '/artwork/v4/collection/dream-006-pennant-source-v4.png',
      edgeFade: 8,
    },
    {
      id: 'pebble-sail-reflection',
      label: "A pebble in the cuff pool reflects the boat's little sail.",
      difficulty: 'Very hard',
      box: { left: 1331 / 1672, top: 638 / 941, width: 110 / 1672, height: 111 / 941 },
      edgeFade: 10,
    },
    {
      id: 'cuff-button-wave',
      label: "The cuff button's cross-stitch becomes a curled loop.",
      difficulty: 'Dreamlike',
      box: { left: 1530 / 1672, top: 670 / 941, width: 82 / 1672, height: 81 / 941 },
      source: '/artwork/v4/collection/dream-006-cuff-button-source-v4.png',
      edgeFade: 9,
    },
  ],
}, {
  id: 'v4-dream-007',
  title: "The Whale's Conservatory",
  original: '/artwork/v4/collection/dream-007-original-v4.png',
  altered: '/artwork/v4/collection/dream-007-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'moon-in-fishbowl',
      label: 'A crescent moon appears behind the goldfish in its bowl.',
      difficulty: 'Easy',
      box: { left: 187 / 1672, top: 487 / 941, width: 225 / 1672, height: 247 / 941 },
      source: '/artwork/v4/collection/dream-007-bowl-crescent-source-v4.png',
      edgeFade: 13,
    },
    {
      id: 'teapot-over-roof',
      label: "The teapot's water arches over the conservatory roof.",
      difficulty: 'Medium',
      box: { left: 988 / 1672, top: 13 / 941, width: 469 / 1672, height: 464 / 941 },
      edgeFade: 15,
    },
    {
      id: 'door-ajar',
      label: 'The red conservatory door stands ajar.',
      difficulty: 'Hard',
      box: { left: 866 / 1672, top: 200 / 941, width: 116 / 1672, height: 194 / 941 },
      edgeFade: 10,
    },
    {
      id: 'tail-moon-fish',
      label: 'A tiny orange fish swims inside the moon on the whale’s tail.',
      difficulty: 'Very hard',
      box: { left: 210 / 1672, top: 183 / 941, width: 153 / 1672, height: 137 / 941 },
      source: '/artwork/v4/collection/dream-007-tail-fish-source-v4.png',
      edgeFade: 11,
    },
    {
      id: 'orange-stems-braid',
      label: 'The orange tree grows a braided central stem.',
      difficulty: 'Dreamlike',
      box: { left: 773 / 1672, top: 55 / 941, width: 164 / 1672, height: 141 / 941 },
      source: '/artwork/v4/collection/dream-007-tree-stems-source-v4.png',
      edgeFade: 11,
    },
  ],
}, {
  id: 'v4-dream-008',
  title: 'A Pocket Full of Winter',
  original: '/artwork/v4/collection/dream-008-original-v4.png',
  altered: '/artwork/v4/collection/dream-008-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'scarf-around-mitten',
      label: "The rabbit's yellow scarf drapes over the mitten thumb.",
      difficulty: 'Easy',
      box: { left: 290 / 1672, top: 245 / 941, width: 270 / 1672, height: 300 / 941 },
      edgeFade: 16,
    },
    {
      id: 'pine-through-cuff',
      label: "A snowy pine reaches across the mitten's knitted cuff.",
      difficulty: 'Medium',
      box: { left: 612 / 1672, top: 340 / 941, width: 213 / 1672, height: 280 / 941 },
      edgeFade: 14,
    },
    {
      id: 'star-twine',
      label: "The red star's string loops twice around the branch.",
      difficulty: 'Hard',
      box: { left: 1320 / 1672, top: 48 / 941, width: 155 / 1672, height: 133 / 941 },
      edgeFade: 8,
    },
    {
      id: 'snow-handle',
      label: "The falling snow curls through the blue cup's handle.",
      difficulty: 'Very hard',
      box: { left: 1305 / 1672, top: 405 / 941, width: 285 / 1672, height: 265 / 941 },
      edgeFade: 12,
    },
    {
      id: 'acorn-pine',
      label: 'A miniature pine sprouts from the acorn.',
      difficulty: 'Dreamlike',
      box: { left: 1478 / 1672, top: 678 / 941, width: 136 / 1672, height: 147 / 941 },
      edgeFade: 8,
    },
  ],
}, {
  id: 'v4-dream-009',
  title: 'The Umbrella Orchestra',
  original: '/artwork/v4/collection/dream-009-original-v4.png',
  altered: '/artwork/v4/collection/dream-009-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'trumpet-tassel',
      label: "The trumpet's tassel hangs from inside its bell.",
      difficulty: 'Easy',
      box: { left: 1367 / 1672, top: 266 / 941, width: 82 / 1672, height: 148 / 941 },
      edgeFade: 9,
    },
    {
      id: 'mallet-pink-canopy',
      label: "The drummer's raised mallet touches the pink umbrella.",
      difficulty: 'Medium',
      box: { left: 990 / 1672, top: 302 / 941, width: 125 / 1672, height: 105 / 941 },
      source: '/artwork/v4/collection/dream-009-mallet-source-v4.png',
      edgeFade: 10,
    },
    {
      id: 'drum-spiral',
      label: 'The star on the drum curls into a spiral.',
      difficulty: 'Hard',
      box: { left: 905 / 1672, top: 420 / 941, width: 89 / 1672, height: 88 / 941 },
      source: '/artwork/v4/collection/dream-009-drum-spiral-source-v4.png',
      edgeFade: 8,
    },
    {
      id: 'piano-key-rhythm',
      label: 'The black keys on the near bridge change their rhythm.',
      difficulty: 'Very hard',
      box: { left: 164 / 1672, top: 657 / 941, width: 399 / 1672, height: 130 / 941 },
      edgeFade: 12,
    },
    {
      id: 'arch-vine-notes',
      label: 'A vine through the arch curls into musical notes.',
      difficulty: 'Dreamlike',
      box: { left: 439 / 1672, top: 51 / 941, width: 67 / 1672, height: 184 / 941 },
      source: '/artwork/v4/collection/dream-009-arch-note-refined-source-v4.png',
      edgeFade: 7,
    },
  ],
}, {
  id: 'v4-dream-010',
  title: 'The Mirror of Paper Wings',
  original: '/artwork/v4/collection/dream-010-original-v4.png',
  altered: '/artwork/v4/collection/dream-010-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'paper-wing-frame',
      label: "The paper bird's wing folds over the mirror rim.",
      difficulty: 'Easy',
      box: { left: 546 / 1672, top: 136 / 941, width: 196 / 1672, height: 237 / 941 },
      edgeFade: 12,
    },
    {
      id: 'key-under-cushion',
      label: "The key's end slips beneath a cushion fold.",
      difficulty: 'Medium',
      box: { left: 1288 / 1672, top: 680 / 941, width: 218 / 1672, height: 130 / 941 },
      edgeFade: 12,
    },
    {
      id: 'bird-in-water',
      label: 'The watering can reflects the paper bird.',
      difficulty: 'Hard',
      box: { left: 142 / 1672, top: 568 / 941, width: 202 / 1672, height: 75 / 941 },
      source: '/artwork/v4/collection/dream-010-can-reflection-source-v4.png',
      edgeFade: 9,
    },
    {
      id: 'window-vine-crossing',
      label: 'The ivy crosses in front of the window frame.',
      difficulty: 'Very hard',
      box: { left: 255 / 1672, top: 75 / 941, width: 155 / 1672, height: 246 / 941 },
      source: '/artwork/v4/collection/dream-010-window-vine-source-v4.png',
      edgeFade: 10,
    },
    {
      id: 'framed-star',
      label: "The picture's gold star touches the crescent.",
      difficulty: 'Dreamlike',
      box: { left: 1109 / 1672, top: 30 / 941, width: 122 / 1672, height: 220 / 941 },
      source: '/artwork/v4/collection/dream-010-framed-star-source-v4.png',
      edgeFade: 10,
    },
  ],
}, {
  id: 'v4-dream-011',
  title: 'The Shell Library',
  original: '/artwork/v4/collection/dream-011-original-v4.png',
  altered: '/artwork/v4/collection/dream-011-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'compass-toward-wave',
      label: "The red book's compass points toward the wave bottle.",
      difficulty: 'Very hard',
      box: { left: 385 / 1672, top: 162 / 941, width: 81 / 1672, height: 133 / 941 },
      source: '/artwork/v4/collection/dream-011-compass-source-v4.png',
      edgeFade: 8,
    },
    {
      id: 'pearl-order',
      label: "The cabinet's silver shell badge has a heart-shaped central lobe.",
      difficulty: 'Easy',
      box: { left: 784 / 1672, top: 710 / 941, width: 78 / 1672, height: 58 / 941 },
      source: '/artwork/v4/collection/dream-011-single-object-source-v4b.png',
      edgeFade: 3,
    },
    {
      id: 'fish-through-shell',
      label: 'A golden fish peeks from behind the shell rim.',
      difficulty: 'Hard',
      box: { left: 1482 / 1672, top: 103 / 941, width: 106 / 1672, height: 101 / 941 },
      edgeFade: 9,
    },
    {
      id: 'armillary-inner-ring',
      label: "The armillary's inner ring tilts the other way.",
      difficulty: 'Very hard',
      box: { left: 866 / 1672, top: 430 / 941, width: 92 / 1672, height: 104 / 941 },
      source: '/artwork/v4/collection/dream-011-armillary-source-v4.png',
      edgeFade: 10,
    },
    {
      id: 'book-tail-diagram',
      label: 'A book diagram changes to a curled otter.',
      difficulty: 'Dreamlike',
      box: { left: 958 / 1672, top: 558 / 941, width: 92 / 1672, height: 87 / 941 },
      source: '/artwork/v4/collection/dream-011-book-diagram-source-v4.png',
      edgeFade: 8,
    },
  ],
}, {
  id: 'v4-dream-012',
  title: 'The Tailor of a Cloth River',
  original: '/artwork/v4/collection/dream-012-original-v4.png',
  altered: '/artwork/v4/collection/dream-012-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'thread-through-scissors',
      label: "The ivory thread loops through the scissors' finger ring.",
      difficulty: 'Easy',
      box: { left: 1107 / 1672, top: 48 / 941, width: 137 / 1672, height: 115 / 941 },
      edgeFade: 8,
    },
    {
      id: 'sock-stripes-spiral',
      label: "The sock's blue stripes twist around its cuff.",
      difficulty: 'Medium',
      box: { left: 188 / 1672, top: 565 / 941, width: 92 / 1672, height: 192 / 941 },
      edgeFade: 8,
    },
    {
      id: 'offcut-joins-river',
      label: 'A blue cloth offcut curls into the river instead of drifting free.',
      difficulty: 'Hard',
      box: { left: 883 / 1672, top: 500 / 941, width: 165 / 1672, height: 83 / 941 },
      edgeFade: 9,
    },
    {
      id: 'river-hem-fold',
      label: 'The cloth river folds back into a hem as it leaves the board.',
      difficulty: 'Very hard',
      box: { left: 665 / 1672, top: 445 / 941, width: 96 / 1672, height: 116 / 941 },
      source: '/artwork/v4/collection/dream-012-cloth-hem-source-v4.png',
      edgeFade: 8,
    },
    {
      id: 'paper-boat-fold',
      label: "The little paper boat's triangular fold overlaps the other way.",
      difficulty: 'Dreamlike',
      box: { left: 869 / 1672, top: 595 / 941, width: 93 / 1672, height: 79 / 941 },
      source: '/artwork/v4/collection/dream-012-boat-fold-source-v4.png',
      edgeFade: 7,
    },
  ],
}, {
  id: 'v4-dream-013',
  title: 'The Strawberry Lighthouse',
  original: '/artwork/v4/collection/dream-013-original-v4.png',
  altered: '/artwork/v4/collection/dream-013-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'sail-around-mast',
      label: "The mouse's sail wraps around its mast.",
      difficulty: 'Easy',
      box: { left: 287 / 1672, top: 478 / 941, width: 212 / 1672, height: 161 / 941 },
      edgeFade: 10,
    },
    {
      id: 'cloud-crosses-beam',
      label: "A strawberry cloud drifts across the lighthouse's beam.",
      difficulty: 'Medium',
      box: { left: 1190 / 1672, top: 0 / 941, width: 482 / 1672, height: 242 / 941 },
      edgeFade: 14,
    },
    {
      id: 'leaf-bow-curl',
      label: "The leaf boat's bow curls back on itself.",
      difficulty: 'Hard',
      box: { left: 638 / 1672, top: 646 / 941, width: 89 / 1672, height: 104 / 941 },
      source: '/artwork/v4/collection/dream-013-leaf-bow-source-v4.png',
      edgeFade: 8,
    },
    {
      id: 'window-diagonal-bars',
      label: "The lighthouse window's crossbars turn diagonally.",
      difficulty: 'Very hard',
      box: { left: 1064 / 1672, top: 259 / 941, width: 101 / 1672, height: 92 / 941 },
      source: '/artwork/v4/collection/dream-013-window-source-v4.png',
      edgeFade: 9,
    },
    {
      id: 'heart-cross-grain-inlay',
      label: "The pier post's heart becomes a cross-grain inlay.",
      difficulty: 'Dreamlike',
      box: { left: 1470 / 1672, top: 545 / 941, width: 64 / 1672, height: 114 / 941 },
      source: '/artwork/v4/collection/dream-013-heart-grain-source-v4.png',
      edgeFade: 7,
    },
  ],
}, {
  id: 'v4-dream-014',
  title: 'The Stone Balloon Seller',
  original: '/artwork/v4/collection/dream-014-original-v4.png',
  altered: '/artwork/v4/collection/dream-014-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'light-through-stone-crack',
      label: 'Sunset light shines through the largest stone balloon.',
      difficulty: 'Easy',
      box: { left: 920 / 1672, top: 0 / 941, width: 213 / 1672, height: 235 / 941 },
      edgeFade: 12,
    },
    {
      id: 'balloon-in-tree-shadow',
      label: 'A pair of balloon shadows appears beside the tree.',
      difficulty: 'Medium',
      box: { left: 275 / 1672, top: 721 / 941, width: 189 / 1672, height: 113 / 941 },
      edgeFade: 11,
    },
    {
      id: 'bird-wing-under-fold',
      label: "The paper bird's blue wing folds beneath its body.",
      difficulty: 'Hard',
      box: { left: 1195 / 1672, top: 762 / 941, width: 154 / 1672, height: 120 / 941 },
      source: '/artwork/v4/collection/dream-014-bird-source-v4.png',
      edgeFade: 8,
    },
    {
      id: 'chair-slat-weaves-rail',
      label: "The chair's left back slat climbs over the top rail.",
      difficulty: 'Very hard',
      box: { left: 1438 / 1672, top: 545 / 941, width: 112 / 1672, height: 105 / 941 },
      source: '/artwork/v4/collection/dream-014-chair-source-v4.png',
      edgeFade: 8,
    },
    {
      id: 'string-around-cuff',
      label: "A balloon string loops around the woman's raised coat cuff.",
      difficulty: 'Dreamlike',
      box: { left: 729 / 1672, top: 444 / 941, width: 92 / 1672, height: 104 / 941 },
      source: '/artwork/v4/collection/dream-014-cuff-source-v4.png',
      edgeFade: 8,
    },
  ],
}, {
  id: 'v4-dream-015',
  title: 'The Moon Laundress',
  original: '/artwork/v4/collection/dream-015-original-v4.png',
  altered: '/artwork/v4/collection/dream-015-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'moon-folds-over-line',
      label: 'A full-moon cloth folds over the washing line.',
      difficulty: 'Easy',
      box: { left: 1030 / 1672, top: 200 / 941, width: 199 / 1672, height: 220 / 941 },
      source: '/artwork/v4/collection/dream-015-moon-fold-source-v4.png',
      edgeFade: 11,
    },
    {
      id: 'crescent-in-basin',
      label: 'The copper basin reflects a crescent instead of a full moon.',
      difficulty: 'Medium',
      box: { left: 1053 / 1672, top: 674 / 941, width: 199 / 1672, height: 85 / 941 },
      edgeFade: 9,
    },
    {
      id: 'towel-around-basket-rim',
      label: 'The embroidered towel loops around the basket rim.',
      difficulty: 'Hard',
      box: { left: 176 / 1672, top: 656 / 941, width: 237 / 1672, height: 161 / 941 },
      edgeFade: 9,
    },
    {
      id: 'paw-behind-clothespin',
      label: "The badger grips the clothespin from behind the line.",
      difficulty: 'Very hard',
      box: { left: 823 / 1672, top: 215 / 941, width: 101 / 1672, height: 132 / 941 },
      source: '/artwork/v4/collection/dream-015-paw-source-v4.png',
      edgeFade: 8,
    },
    {
      id: 'vine-around-clothespin',
      label: 'The trailing vine winds around the last clothesline pin.',
      difficulty: 'Dreamlike',
      box: { left: 1356 / 1672, top: 130 / 941, width: 154 / 1672, height: 118 / 941 },
      source: '/artwork/v4/collection/dream-015-vine-pin-source-v4.png',
      edgeFade: 9,
    },
  ],
}, {
  id: 'v4-dream-016',
  title: 'The Teapot Volcano',
  original: '/artwork/v4/collection/dream-016-original-v4.png',
  altered: '/artwork/v4/collection/dream-016-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'cherry-steam-spiral',
      label: 'The pink steam curls around the blue cherry.',
      difficulty: 'Easy',
      box: { left: 1255 / 1672, top: 0 / 941, width: 230 / 1672, height: 155 / 941 },
      edgeFade: 10,
    },
    {
      id: 'spout-puff',
      label: 'The teapot blows a different curling puff of steam.',
      difficulty: 'Medium',
      box: { left: 728 / 1672, top: 133 / 941, width: 153 / 1672, height: 159 / 941 },
      edgeFade: 9,
    },
    {
      id: 'goat-climbs-sugar',
      label: 'The middle goat lifts its front hoof onto the next sugar cube.',
      difficulty: 'Hard',
      box: { left: 654 / 1672, top: 439 / 941, width: 145 / 1672, height: 125 / 941 },
      edgeFade: 8,
    },
    {
      id: 'spoon-heart-turns',
      label: "The wooden spoon's heart-shaped opening turns upright.",
      difficulty: 'Very hard',
      box: { left: 1217 / 1672, top: 784 / 941, width: 334 / 1672, height: 147 / 941 },
      edgeFade: 10,
    },
    {
      id: 'diamond-scroll-overlap',
      label: "A leafy scroll reaches across the teapot's ivory diamond.",
      difficulty: 'Dreamlike',
      box: { left: 973 / 1672, top: 305 / 941, width: 270 / 1672, height: 236 / 941 },
      edgeFade: 11,
    },
  ],
}, {
  id: 'v4-dream-017',
  title: 'The Deer Who Carried Autumn',
  original: '/artwork/v4/collection/dream-017-original-v4.png',
  altered: '/artwork/v4/collection/dream-017-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'ribbon-around-antler',
      label: 'The red ribbon winds around the near antler branch.',
      difficulty: 'Easy',
      box: { left: 347 / 1672, top: 176 / 941, width: 290 / 1672, height: 192 / 941 },
      edgeFade: 12,
    },
    {
      id: 'blossom-over-sash',
      label: 'A flowering twig crosses in front of the open window sash.',
      difficulty: 'Medium',
      box: { left: 1122 / 1672, top: 86 / 941, width: 306 / 1672, height: 223 / 941 },
      edgeFade: 13,
    },
    {
      id: 'frog-reflection',
      label: "The frog's reflection has little deer antlers.",
      difficulty: 'Hard',
      box: { left: 1264 / 1672, top: 764 / 941, width: 222 / 1672, height: 165 / 941 },
      edgeFade: 9,
    },
    {
      id: 'second-crescent',
      label: 'A second little crescent appears in the oval picture.',
      difficulty: 'Very hard',
      box: { left: 75 / 1672, top: 49 / 941, width: 188 / 1672, height: 238 / 941 },
      edgeFade: 10,
    },
    {
      id: 'leaf-boat',
      label: 'One floating autumn leaf folds into a tiny boat.',
      difficulty: 'Dreamlike',
      box: { left: 867 / 1672, top: 710 / 941, width: 173 / 1672, height: 115 / 941 },
      edgeFade: 8,
    },
  ],
}, {
  id: 'v4-dream-018',
  title: 'The Staircase of Somewhere',
  original: '/artwork/v4/collection/dream-018-original-v4.png',
  altered: '/artwork/v4/collection/dream-018-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'floating-stone-tilts',
      label: 'One floating stepping stone tips to show its glowing underside.',
      difficulty: 'Easy',
      box: { left: 524 / 1672, top: 51 / 941, width: 136 / 1672, height: 80 / 941 },
      source: '/artwork/v4/collection/dream-018-tilted-stone-source-v4.png',
      edgeFade: 8,
    },
    {
      id: 'plant-root-around-step',
      label: 'The hanging plant’s root winds around a stair.',
      difficulty: 'Medium',
      box: { left: 1268 / 1672, top: 270 / 941, width: 323 / 1672, height: 265 / 941 },
      edgeFade: 12,
    },
    {
      id: 'shoe-lace-through-footprint',
      label: 'The red shoe’s lace threads through a glowing footprint.',
      difficulty: 'Hard',
      box: { left: 202 / 1672, top: 88 / 941, width: 173 / 1672, height: 115 / 941 },
      source: '/artwork/v4/collection/dream-018-shoe-lace-source-v4.png',
      edgeFade: 8,
    },
    {
      id: 'book-scarf-around-stair',
      label: 'The little blue book’s scarf loops around the stair above it.',
      difficulty: 'Very hard',
      box: { left: 169 / 1672, top: 437 / 941, width: 456 / 1672, height: 184 / 941 },
      source: '/artwork/v4/collection/dream-018-book-scarf-source-v4.png',
      edgeFade: 10,
    },
    {
      id: 'rail-through-keyhole',
      label: "The handrail's little brass spiral curls the other way.",
      difficulty: 'Dreamlike',
      box: { left: 782 / 1672, top: 295 / 941, width: 62 / 1672, height: 58 / 941 },
      source: '/artwork/v4/collection/dream-018-rail-scroll-source-v4b.png',
      edgeFade: 5,
    },
  ],
}, {
  id: 'v4-dream-019',
  title: 'The Kettle Kite',
  original: '/artwork/v4/collection/dream-019-original-v4.png',
  altered: '/artwork/v4/collection/dream-019-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'ribbon-through-handle',
      label: "The kite's red ribbon loops through the kettle handle.",
      difficulty: 'Easy',
      box: { left: 1026 / 1672, top: 20 / 941, width: 184 / 1672, height: 230 / 941 },
      edgeFade: 11,
    },
    {
      id: 'fox-thread-loop',
      label: "The fox's thread winds under its forelegs.",
      difficulty: 'Medium',
      box: { left: 854 / 1672, top: 429 / 941, width: 309 / 1672, height: 208 / 941 },
      edgeFade: 15,
    },
    {
      id: 'napkin-cloud',
      label: 'The floating napkin catches on a cloud curl.',
      difficulty: 'Hard',
      box: { left: 1410 / 1672, top: 30 / 941, width: 245 / 1672, height: 224 / 941 },
      edgeFade: 10,
    },
    {
      id: 'quilt-roof-fold',
      label: 'The stitched green roof folds back above the little doorway.',
      difficulty: 'Very hard',
      box: { left: 610 / 1672, top: 637 / 941, width: 309 / 1672, height: 209 / 941 },
      edgeFade: 14,
    },
    {
      id: 'pinwheel-order',
      label: "The picnic pinwheel's red and yellow blades trade order.",
      difficulty: 'Dreamlike',
      box: { left: 166 / 1672, top: 536 / 941, width: 167 / 1672, height: 162 / 941 },
      edgeFade: 9,
    },
  ],
}, {
  id: 'v4-dream-020',
  title: 'The Butterfly Museum',
  original: '/artwork/v4/collection/dream-020-original-v4.png',
  altered: '/artwork/v4/collection/dream-020-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'butterfly-reflection-in-dome',
      label: 'The giant blue butterfly wing has a second reflection inside its dome.',
      difficulty: 'Easy',
      box: { left: 393 / 1672, top: 168 / 941, width: 136 / 1672, height: 233 / 941 },
      edgeFade: 9,
    },
    {
      id: 'pearl-size-order',
      label: "The cabinet's gold butterfly emblem tilts diagonally.",
      difficulty: 'Medium',
      box: { left: 1344 / 1672, top: 584 / 941, width: 131 / 1672, height: 102 / 941 },
      source: '/artwork/v4/collection/dream-020-single-object-source-v4b.png',
      edgeFade: 3,
    },
    {
      id: 'statue-folded-wing',
      label: 'The marble angel folds one wing around its arm.',
      difficulty: 'Hard',
      box: { left: 715 / 1672, top: 247 / 941, width: 119 / 1672, height: 240 / 941 },
      edgeFade: 8,
    },
    {
      id: 'elephant-wing-over-saddle',
      label: 'The elephant folds one butterfly wing across its saddle.',
      difficulty: 'Very hard',
      box: { left: 835 / 1672, top: 377 / 941, width: 190 / 1672, height: 222 / 941 },
      source: '/artwork/v4/collection/dream-020-wing-source-v4.png',
      edgeFade: 10,
    },
    {
      id: 'crescent-through-leaves',
      label: 'A little brass crescent hooks into the cabinet’s leaf carving.',
      difficulty: 'Dreamlike',
      box: { left: 465 / 1672, top: 682 / 941, width: 145 / 1672, height: 158 / 941 },
      source: '/artwork/v4/collection/dream-020-crescent-source-v4.png',
      edgeFade: 9,
    },
  ],
}, {
  id: 'v4-dream-074',
  title: 'The Folded Horizon',
  original: '/artwork/v4/collection/dream-074-original-v4.png',
  altered: '/artwork/v4/collection/dream-074-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'crane-wings',
      label: "The paper crane's wings fold downward.",
      difficulty: 'Easy',
      box: { left: 1084 / 1672, top: 143 / 941, width: 170 / 1672, height: 151 / 941 },
      edgeFade: 10,
    },
    {
      id: 'train-order',
      label: "The rear blue carriage has a red side panel.",
      difficulty: 'Medium',
      box: { left: 1020 / 1672, top: 476 / 941, width: 22 / 1672, height: 40 / 941 },
      source: '/artwork/v4/collection/dream-074-single-object-source-v4b.png',
      edgeFade: 2,
    },
    {
      id: 'ladder-fold',
      label: 'A paper fold drapes over the top of the ladder.',
      difficulty: 'Hard',
      box: { left: 1056 / 1672, top: 390 / 941, width: 283 / 1672, height: 176 / 941 },
      edgeFade: 14,
    },
    {
      id: 'window-mullion',
      label: "The red window's inner bar runs diagonally.",
      difficulty: 'Very hard',
      box: { left: 421 / 1672, top: 361 / 941, width: 55 / 1672, height: 80 / 941 },
      edgeFade: 7,
    },
    {
      id: 'curled-scrap',
      label: "The loose paper scrap's left tip curls upward.",
      difficulty: 'Dreamlike',
      box: { left: 1435 / 1672, top: 783 / 941, width: 177 / 1672, height: 101 / 941 },
      source: '/artwork/v4/collection/dream-074-scrap-source-v4.png',
      edgeFade: 9,
    },
  ],
}, {
  id: 'v4-dream-133',
  title: 'The Doorbell at the End of Sleep',
  original: '/artwork/v4/collection/dream-133-original-v4.png',
  altered: '/artwork/v4/collection/dream-133-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'waking-eye',
      label: 'The sleeping door opens one eye.',
      difficulty: 'Easy',
      box: { left: 836 / 1672, top: 418 / 941, width: 250 / 1672, height: 182 / 941 },
      edgeFade: 10,
    },
    {
      id: 'bell-flower-leaf',
      label: "The bell-flower's leaf curls toward the door.",
      difficulty: 'Medium',
      box: { left: 1308 / 1672, top: 252 / 941, width: 102 / 1672, height: 139 / 941 },
      edgeFade: 10,
    },
    {
      id: 'key-teeth',
      label: "The floor key's teeth face up instead of down.",
      difficulty: 'Hard',
      box: { left: 488 / 1672, top: 782 / 941, width: 179 / 1672, height: 84 / 941 },
      source: '/artwork/v4/collection/dream-133-key-source-v4.png',
      edgeFade: 8,
    },
    {
      id: 'pillow-shadow',
      label: 'The key-shaped pillow shadow becomes a bell.',
      difficulty: 'Very hard',
      box: { left: 1164 / 1672, top: 553 / 941, width: 151 / 1672, height: 97 / 941 },
      source: '/artwork/v4/collection/dream-133-shadow-source-v4.png',
      edgeFade: 10,
    },
    {
      id: 'wedge-stripes',
      label: 'The striped wedge reverses its dark and light order.',
      difficulty: 'Dreamlike',
      box: { left: 1322 / 1672, top: 684 / 941, width: 195 / 1672, height: 108 / 941 },
      edgeFade: 8,
    },
  ],
}, {
  id: 'v4-dream-155',
  title: "The Mountain's Lost Mitten",
  original: '/artwork/v4/collection/dream-155-original-v4.png',
  altered: '/artwork/v4/collection/dream-155-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'mountain-eye',
      label: 'The sleeping mountain opens one eye.',
      difficulty: 'Easy',
      box: { left: 499 / 1672, top: 198 / 941, width: 107 / 1672, height: 101 / 941 },
      edgeFade: 8,
    },
    {
      id: 'yarn-to-case',
      label: 'The loose yarn threads through the suitcase handle.',
      difficulty: 'Medium',
      box: { left: 220 / 1672, top: 564 / 941, width: 175 / 1672, height: 86 / 941 },
      maskPath: 'M245 579 L305 578 L355 605 L423 628 L489 645 L542 642 L597 611 L657 542 L676 548 L614 631 L551 664 L485 674 L414 648 L344 625 L294 604 L245 614 Z',
      edgeFade: 0,
    },
    {
      id: 'case-label',
      label: 'The suitcase label pictures a mitten instead of mountains.',
      difficulty: 'Hard',
      box: { left: 265 / 1672, top: 653 / 941, width: 111 / 1672, height: 109 / 941 },
      edgeFade: 8,
    },
    {
      id: 'shadow-thumb',
      label: "The mitten's distant shadow points its thumb the other way.",
      difficulty: 'Very hard',
      box: { left: 1193 / 1672, top: 468 / 941, width: 375 / 1672, height: 195 / 941 },
      edgeFade: 18,
    },
    {
      id: 'cuff-knit',
      label: 'The ivory cuff is woven into a different raised cable pattern.',
      difficulty: 'Dreamlike',
      box: { left: 498 / 1672, top: 442 / 941, width: 219 / 1672, height: 228 / 941 },
      edgeFade: 12,
    },
  ],
}, {
  id: 'v4-dream-173',
  title: 'The Doorway of Missing Corners',
  original: '/artwork/v4/collection/dream-173-original-v4.png',
  altered: '/artwork/v4/collection/dream-173-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'scarf-through-chest',
      label: "The scarf passes through the figure's empty chest.",
      difficulty: 'Easy',
      box: { left: 369 / 1672, top: 406 / 941, width: 369 / 1672, height: 280 / 941 },
      edgeFade: 18,
    },
    {
      id: 'striped-cushion',
      label: "The high chair's blue and ivory cushion bands reverse order.",
      difficulty: 'Medium',
      box: { left: 1370 / 1672, top: 75 / 941, width: 243 / 1672, height: 155 / 941 },
      edgeFade: 12,
    },
    {
      id: 'fitted-piece',
      label: 'One floating puzzle piece turns flat against the doorway edge.',
      difficulty: 'Hard',
      box: { left: 1098 / 1672, top: 201 / 941, width: 102 / 1672, height: 100 / 941 },
      edgeFade: 9,
    },
    {
      id: 'cushion-echo',
      label: "The floating chair's cushion gains a stitched missing-corner shape.",
      difficulty: 'Very hard',
      box: { left: 565 / 1672, top: 119 / 941, width: 152 / 1672, height: 68 / 941 },
      source: '/artwork/v4/collection/dream-173-cushion-source-v4.png',
      edgeFade: 7,
    },
    {
      id: 'key-shadow',
      label: "The triangular key's shadow becomes a hollow triangle.",
      difficulty: 'Dreamlike',
      box: { left: 1342 / 1672, top: 833 / 941, width: 116 / 1672, height: 98 / 941 },
      edgeFade: 7,
    },
  ],
}, {
  id: 'v4-dream-197',
  title: 'The Hour That Fell Out',
  original: '/artwork/v4/collection/dream-197-original-v4.png',
  altered: '/artwork/v4/collection/dream-197-ribbon-clean-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'ribbon-around-spoon',
      label: "The ivory ribbon loops around the spoon's handle.",
      difficulty: 'Easy',
      box: { left: 820 / 1672, top: 465 / 941, width: 310 / 1672, height: 375 / 941 },
      edgeFade: 17,
    },
    {
      id: 'chain-through-ring',
      label: "The watch's chain threads through its winding ring.",
      difficulty: 'Medium',
      box: { left: 775 / 1672, top: 0, width: 570 / 1672, height: 275 / 941 },
      source: '/artwork/v4/collection/dream-197-chain-source-v4.png',
      edgeFade: 13,
    },
    {
      id: 'ladder-reflection',
      label: 'The paper ladder appears in the spoon bowl reflection.',
      difficulty: 'Hard',
      box: { left: 1135 / 1672, top: 505 / 941, width: 195 / 1672, height: 165 / 941 },
      source: '/artwork/v4/collection/dream-197-reflection-source-v4.png',
      edgeFade: 9,
    },
    {
      id: 'rung-under-rail',
      label: "One brass rung slips behind the paper ladder's right rail.",
      difficulty: 'Very hard',
      box: { left: 1340 / 1672, top: 345 / 941, width: 235 / 1672, height: 190 / 941 },
      source: '/artwork/v4/collection/dream-197-ladder-source-v4.png',
      edgeFade: 9,
    },
    {
      id: 'hour-tick-order',
      label: "The noon tick on the watch face is shorter.",
      difficulty: 'Dreamlike',
      box: { left: 576 / 1672, top: 198 / 941, width: 21 / 1672, height: 41 / 941 },
      source: '/artwork/v4/collection/dream-197-single-object-source-v4b.png',
      edgeFade: 3,
    },
  ],
}, {
  id: 'v4-dream-237',
  title: 'The Bell Without a Sound',
  original: '/artwork/v4/collection/dream-237-original-v4.png',
  altered: '/artwork/v4/collection/dream-237-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'bell-clapper',
      label: "The bell's brass clapper hangs below its rim.",
      difficulty: 'Easy',
      box: { left: 660 / 1672, top: 327 / 941, width: 165 / 1672, height: 235 / 941 },
      edgeFade: 12,
    },
    {
      id: 'card-note',
      label: 'The paper note slips behind the folded card.',
      difficulty: 'Medium',
      box: { left: 1015 / 1672, top: 109 / 941, width: 340 / 1672, height: 281 / 941 },
      edgeFade: 14,
    },
    {
      id: 'bowl-note',
      label: "The bowl's paper note hooks over a different part of its rim.",
      difficulty: 'Hard',
      box: { left: 1483 / 1672, top: 176 / 941, width: 185 / 1672, height: 188 / 941 },
      edgeFade: 10,
    },
    {
      id: 'ribbon-loop',
      label: 'The velvet ribbon threads under its own loop.',
      difficulty: 'Very hard',
      box: { left: 913 / 1672, top: 397 / 941, width: 412 / 1672, height: 240 / 941 },
      edgeFade: 18,
    },
    {
      id: 'book-emblem',
      label: "The blue book's embossed flower gains curled leaves above and below.",
      difficulty: 'Dreamlike',
      box: { left: 119 / 1672, top: 57 / 941, width: 135 / 1672, height: 209 / 941 },
      source: '/artwork/v4/collection/dream-237-book-source-v4.png',
      edgeFade: 9,
    },
  ],
}, {
  id: 'v4-dream-270',
  title: 'The Monster and the Timid Thunder',
  original: '/artwork/v4/collection/dream-270-original-v4.png',
  altered: '/artwork/v4/collection/dream-270-altered-source-v4.png',
  aspectRatio: 1672 / 941,
  edits: [
    {
      id: 'shadow-cloud',
      label: "The monster's shadow cradles a cloud-shaped echo.",
      difficulty: 'Easy',
      box: { left: 1080 / 1672, top: 270 / 941, width: 360 / 1672, height: 270 / 941 },
      edgeFade: 13,
    },
    {
      id: 'shy-lightning',
      label: 'The shy lightning curls up into the lampshade.',
      difficulty: 'Medium',
      box: { left: 685 / 1672, top: 370 / 941, width: 135 / 1672, height: 300 / 941 },
      edgeFade: 10,
    },
    {
      id: 'cord-under-fringe',
      label: "The lamp cord slips under the rug's fringe.",
      difficulty: 'Hard',
      box: { left: 1320 / 1672, top: 760 / 941, width: 225 / 1672, height: 120 / 941 },
      source: '/artwork/v4/collection/dream-270-cord-source-v4.png',
      edgeFade: 10,
    },
    {
      id: 'framed-stars',
      label: 'Three little stars in the oval frame descend diagonally.',
      difficulty: 'Very hard',
      box: { left: 1560 / 1672, top: 77 / 941, width: 112 / 1672, height: 135 / 941 },
      source: '/artwork/v4/collection/dream-270-stars-source-v4.png',
      edgeFade: 7,
    },
    {
      id: 'cloth-hem',
      label: "The folded cloth's hem trades curls for pointed stitching.",
      difficulty: 'Dreamlike',
      box: { left: 975 / 1672, top: 788 / 941, width: 245 / 1672, height: 147 / 941 },
      edgeFade: 9,
    },
  ],
},
{
  "id": "v4-dream-021",
  "title": "The Baker of Sunsets",
  "original": "/artwork/v4/collection/dream-021-original-v4.png",
  "altered": "/artwork/v4/collection/dream-021-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "rolling-pin-tie",
      "label": "A blue string bow wraps the rolling pin instead of its white band.",
      "difficulty": "Easy",
      "edgeFade": 8,
      "box": {
        "left": 0.20933014354066987,
        "top": 0.7481402763018066,
        "width": 0.07775119617224881,
        "height": 0.13602550478214664
      }
    },
    {
      "id": "oven-knob-crescent",
      "label": "The golden oven knob carries a dark crescent engraving.",
      "difficulty": "Medium",
      "edgeFade": 8,
      "box": {
        "left": 0.7972488038277512,
        "top": 0.10839532412327312,
        "width": 0.05921052631578947,
        "height": 0.10839532412327312
      }
    },
    {
      "id": "tray-rolled-lip",
      "label": "The baking tray's right rim curls downward.",
      "difficulty": "Hard",
      "edgeFade": 6,
      "box": {
        "left": 0.791267942583732,
        "top": 0.5398512221041445,
        "width": 0.04066985645933014,
        "height": 0.08076514346439957
      }
    },
    {
      "id": "cherry-stem-loop",
      "label": "The middle cherry's stem curls into a loop.",
      "difficulty": "Very hard",
      "edgeFade": 6,
      "box": {
        "left": 0.34748803827751196,
        "top": 0.769394261424017,
        "width": 0.08014354066985646,
        "height": 0.1232731137088204
      }
    },
    {
      "id": "apron-crescent-up",
      "label": "The apron crescent opens upward like a bowl.",
      "difficulty": "Dreamlike",
      "edgeFade": 7,
      "box": {
        "left": 0.5311004784688995,
        "top": 0.6227417640807651,
        "width": 0.046052631578947366,
        "height": 0.07545164718384698
      }
    }
  ]
},
{
  "id": "v4-dream-022",
  "title": "The Snail Observatory",
  "original": "/artwork/v4/collection/dream-022-original-v4.png",
  "altered": "/artwork/v4/collection/dream-022-altered-source-v4.png",
  "aspectRatio": 1.7768331562167907,
  "edits": [
    {
      "id": "change-5",
      "label": "A crescent groove is carved across the middle pale path stone.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.7057416267942583,
        "top": 0.8129649309245484,
        "width": 0.0687799043062201,
        "height": 0.0818278427205101
      }
    },
    {
      "id": "change-2",
      "label": "A crescent reflection glows inside the telescope lens.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.4055023923444976,
        "top": 0.025504782146652496,
        "width": 0.03648325358851675,
        "height": 0.08289054197662062
      }
    },
    {
      "id": "change-3",
      "label": "The gold triangle on the door points downward.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.35047846889952156,
        "top": 0.2252922422954304,
        "width": 0.03588516746411483,
        "height": 0.061636556854410204
      }
    },
    {
      "id": "change-4",
      "label": "The window's middle mullion runs diagonally.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.27452153110047844,
        "top": 0.2104144527098831,
        "width": 0.037679425837320576,
        "height": 0.0871413390010627
      }
    },
    {
      "id": "change-1",
      "label": "A leafy vine threads through the pot's round handle.",
      "difficulty": "Dreamlike",
      "edgeFade": 7,
      "box": {
        "left": 0.05263157894736842,
        "top": 0.6822529224229543,
        "width": 0.14952153110047847,
        "height": 0.3177470775770457
      }
    }
  ]
},
{
  "id": "v4-dream-023",
  "title": "The Pocket of Rain",
  "original": "/artwork/v4/collection/dream-023-original-v4.png",
  "altered": "/artwork/v4/collection/dream-023-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "sock-turn",
      "label": "The striped sock points its toe to the right.",
      "difficulty": "Easy",
      "edgeFade": 7,
      "box": {
        "left": 0.3020334928229665,
        "top": 0.1997874601487779,
        "width": 0.08552631578947369,
        "height": 0.18597236981934112
      }
    },
    {
      "id": "lighthouse-dome",
      "label": "The lighthouse has a teal dome instead of a red pointed roof.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.3570574162679426,
        "top": 0.061636556854410204,
        "width": 0.04366028708133971,
        "height": 0.08501594048884166
      }
    },
    {
      "id": "boat-bench",
      "label": "A lengthwise bench replaces the boat\u2019s crosswise benches.",
      "difficulty": "Hard",
      "edgeFade": 7,
      "box": {
        "left": 0.5017942583732058,
        "top": 0.5292242295430393,
        "width": 0.12021531100478469,
        "height": 0.18384697130712008
      }
    },
    {
      "id": "rope-eight",
      "label": "The rope coil forms two loops with a crossing in the middle.",
      "difficulty": "Very hard",
      "edgeFade": 7,
      "box": {
        "left": 0.8911483253588517,
        "top": 0.6588735387885228,
        "width": 0.10885167464114832,
        "height": 0.11158342189160468
      },
      "source": "/artwork/v4/collection/dream-023-knot-full-source-v4.png"
    },
    {
      "id": "button-slit",
      "label": "The lowest purple button has a vertical slit.",
      "difficulty": "Dreamlike",
      "edgeFade": 5,
      "box": {
        "left": 0.5101674641148325,
        "top": 0.40807651434643993,
        "width": 0.030502392344497607,
        "height": 0.061636556854410204
      }
    }
  ]
},
{
  "id": "v4-dream-024",
  "title": "The Fox's Paper Moon",
  "original": "/artwork/v4/collection/dream-024-original-v4.png",
  "altered": "/artwork/v4/collection/dream-024-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The bridge's middle arch carries a falling curtain of water.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.7308612440191388,
        "top": 0.3751328374070138,
        "width": 0.0430622009569378,
        "height": 0.10520722635494155
      }
    },
    {
      "id": "change-2",
      "label": "The left paper star has a long downward-pointing fold.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.5287081339712919,
        "top": 0.691817215727949,
        "width": 0.05921052631578947,
        "height": 0.08607863974495218
      }
    },
    {
      "id": "change-3",
      "label": "The red thread loops beneath the spool instead of around its left side.",
      "difficulty": "Hard",
      "edgeFade": 5,
      "box": {
        "left": 0.18720095693779903,
        "top": 0.6301806588735388,
        "width": 0.08074162679425838,
        "height": 0.11052072263549416
      }
    },
    {
      "id": "change-4",
      "label": "A raised paper flap peaks above the fox's gripping paw.",
      "difficulty": "Very hard",
      "edgeFade": 5,
      "box": {
        "left": 0.3409090909090909,
        "top": 0.4452709883103082,
        "width": 0.04844497607655503,
        "height": 0.08395324123273114
      }
    },
    {
      "id": "change-5",
      "label": "The table diamond's orange and dark halves trade sides.",
      "difficulty": "Dreamlike",
      "edgeFade": 5,
      "box": {
        "left": 0.4431818181818182,
        "top": 0.8342189160467588,
        "width": 0.039473684210526314,
        "height": 0.06907545164718384
      }
    }
  ]
},
{
  "id": "v4-dream-027",
  "title": "The Penguin's Summer",
  "original": "/artwork/v4/collection/dream-027-original-v4.png",
  "altered": "/artwork/v4/collection/dream-027-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "A sailboat is painted on the red beach ball.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.5819377990430622,
        "top": 0.6333687566418703,
        "width": 0.09449760765550239,
        "height": 0.155154091392136
      }
    },
    {
      "id": "change-2",
      "label": "The striped straw curls over the lemon garnish.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.3277511961722488,
        "top": 0.3528161530286929,
        "width": 0.05263157894736842,
        "height": 0.1030818278427205
      }
    },
    {
      "id": "change-3",
      "label": "A lemon slice passes through the pitcher's glass handle.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.20813397129186603,
        "top": 0.7088204038257173,
        "width": 0.04904306220095694,
        "height": 0.1073326248671626
      }
    },
    {
      "id": "change-4",
      "label": "A shell-shaped impression appears inside the shovel scoop.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7619617224880383,
        "top": 0.8289054197662061,
        "width": 0.056220095693779906,
        "height": 0.08076514346439957
      }
    },
    {
      "id": "change-5",
      "label": "The right lemon face divides into three curved fan sections.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.37200956937799046,
        "top": 0.7906482465462275,
        "width": 0.04665071770334928,
        "height": 0.06482465462274177
      }
    }
  ]
},
{
  "id": "v4-dream-028",
  "title": "The Swan Station",
  "original": "/artwork/v4/collection/dream-028-original-v4.png",
  "altered": "/artwork/v4/collection/dream-028-altered-source-v4.png",
  "aspectRatio": 1671 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "A gold key is painted on the flag.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.42010771992818674,
        "top": 0.08820403825717323,
        "width": 0.06941950927588271,
        "height": 0.07438894792773645
      }
    },
    {
      "id": "change-2",
      "label": "The rope passes through the mooring ring and drops down the post.",
      "difficulty": "Medium",
      "edgeFade": 6,
      "box": {
        "left": 0.44165170556552963,
        "top": 0.667375132837407,
        "width": 0.06762417713943747,
        "height": 0.21253985122210414
      }
    },
    {
      "id": "change-3",
      "label": "The right blue ribbon tail threads through its own loop.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.13464991023339318,
        "top": 0.7470775770456961,
        "width": 0.023937761819269897,
        "height": 0.14027630180658873
      }
    },
    {
      "id": "change-4",
      "label": "Concentric rings replace the door window's radial spokes.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.42848593656493117,
        "top": 0.4527098831030818,
        "width": 0.03710353081986834,
        "height": 0.0669500531349628
      }
    },
    {
      "id": "change-5",
      "label": "An arched window is reflected in the water below the swan.",
      "difficulty": "Dreamlike",
      "edgeFade": 5,
      "box": {
        "left": 0.6463195691202872,
        "top": 0.6907545164718385,
        "width": 0.045481747456612806,
        "height": 0.08395324123273114
      }
    }
  ]
},
{
  "id": "v4-dream-037",
  "title": "The Whale's Bookmark",
  "original": "/artwork/v4/collection/dream-037-original-v4.png",
  "altered": "/artwork/v4/collection/dream-037-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "ring",
      "label": "The book-cover crescent closes into a ring.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.16447368421052633,
        "top": 0.5270988310308182,
        "width": 0.09808612440191387,
        "height": 0.1944739638682253
      }
    },
    {
      "id": "handle",
      "label": "The cup handle's upper curl closes into an extra loop.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.9007177033492823,
        "top": 0.6928799149840595,
        "width": 0.06220095693779904,
        "height": 0.1381509032943677
      }
    },
    {
      "id": "flame",
      "label": "The tall candle flame leans left.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.840311004784689,
        "top": 0.49840595111583424,
        "width": 0.023923444976076555,
        "height": 0.06269925611052073
      }
    },
    {
      "id": "bookmark",
      "label": "The bookmark folds over itself at the bottom crossing.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.3546650717703349,
        "top": 0.8533475026567482,
        "width": 0.10526315789473684,
        "height": 0.061636556854410204
      }
    },
    {
      "id": "leaf-curl",
      "label": "One gold leaf above the whale's eye curls into a spiral.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.618421052631579,
        "top": 0.34537725823591925,
        "width": 0.03229665071770335,
        "height": 0.03719447396386823
      }
    }
  ]
},
{
  "id": "v4-dream-025",
  "title": "The Violin Orchard",
  "original": "/artwork/v4/collection/dream-025-original-v4.png",
  "altered": "/artwork/v4/collection/dream-025-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The violin's gold heart hangs point upward.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.1519138755980861,
        "top": 0.27948990435706694,
        "width": 0.05861244019138756,
        "height": 0.12964930924548354
      }
    },
    {
      "id": "change-2",
      "label": "The water stream rises in an arch before falling.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.1854066985645933,
        "top": 0.6514346439957492,
        "width": 0.1034688995215311,
        "height": 0.20935175345377258
      }
    },
    {
      "id": "change-3",
      "label": "The basket clasp bears two facing crescents instead of a star.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8504784688995215,
        "top": 0.8289054197662061,
        "width": 0.03708133971291866,
        "height": 0.08501594048884166
      }
    },
    {
      "id": "change-4",
      "label": "The hat ribbon crosses in front of the raccoon's right ear.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.3827751196172249,
        "top": 0.4675876726886291,
        "width": 0.046052631578947366,
        "height": 0.09032943676939426
      }
    },
    {
      "id": "change-5",
      "label": "The middle violin's right sound hole is a straight slot.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.486244019138756,
        "top": 0.4867162592986185,
        "width": 0.017942583732057416,
        "height": 0.06057385759829968
      }
    }
  ]
},
{
  "id": "v4-dream-026",
  "title": "The House Beneath the Hat",
  "original": "/artwork/v4/collection/dream-026-original-v4.png",
  "altered": "/artwork/v4/collection/dream-026-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The chair-back triangular opening points downward.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.19318181818181818,
        "top": 0.6312433581296493,
        "width": 0.025119617224880382,
        "height": 0.048884165781083955
      }
    },
    {
      "id": "change-2",
      "label": "The round window's crossbars meet diagonally.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.5933014354066986,
        "top": 0.5196599362380446,
        "width": 0.04784688995215311,
        "height": 0.09351753453772582
      }
    },
    {
      "id": "change-3",
      "label": "A long open gap separates the rays of the chair shadow.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.2631578947368421,
        "top": 0.8161530286928799,
        "width": 0.5442583732057417,
        "height": 0.18384697130712008
      }
    },
    {
      "id": "change-4",
      "label": "A red loop encircles the middle pearl.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6561004784688995,
        "top": 0.3283740701381509,
        "width": 0.03708133971291866,
        "height": 0.07226354941551541
      }
    },
    {
      "id": "change-5",
      "label": "The hat-band pin has its crossbar at the top.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.7446172248803827,
        "top": 0.3985122210414453,
        "width": 0.02751196172248804,
        "height": 0.048884165781083955
      }
    }
  ]
},
{
  "id": "v4-dream-029",
  "title": "The Room of Slow Fish",
  "original": "/artwork/v4/collection/dream-029-original-v4.png",
  "altered": "/artwork/v4/collection/dream-029-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "An open door is painted on the large orange fish.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.465311004784689,
        "top": 0.19128586609989373,
        "width": 0.0645933014354067,
        "height": 0.14984059511158343
      }
    },
    {
      "id": "change-2",
      "label": "A curling tea stream rises from the cup.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.041866028708133975,
        "top": 0.5270988310308182,
        "width": 0.06279904306220095,
        "height": 0.07863974495217853
      }
    },
    {
      "id": "change-3",
      "label": "The middle tassel cord loops through the right gold bead.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.28827751196172247,
        "top": 0.6344314558979809,
        "width": 0.04844497607655503,
        "height": 0.05844845908607864
      }
    },
    {
      "id": "change-4",
      "label": "A curved gold latch lever extends across the window frame joint.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8606459330143541,
        "top": 0.23910733262486716,
        "width": 0.04784688995215311,
        "height": 0.06907545164718384
      }
    },
    {
      "id": "change-5",
      "label": "The lowest small yellow fish near the window faces left.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.6261961722488039,
        "top": 0.23273113708820403,
        "width": 0.05442583732057416,
        "height": 0.04250797024442083
      }
    }
  ]
},
{
  "id": "v4-dream-031",
  "title": "The Lampshade Forest",
  "original": "/artwork/v4/collection/dream-031-original-v4.png",
  "altered": "/artwork/v4/collection/dream-031-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The hanging crescent becomes a hollow diamond.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.9114832535885168,
        "top": 0.5462274176408076,
        "width": 0.05143540669856459,
        "height": 0.1126461211477152
      }
    },
    {
      "id": "change-2",
      "label": "A curved chain links the three hanging globes.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.7799043062200957,
        "top": 0.40807651434643993,
        "width": 0.05263157894736842,
        "height": 0.14133900106269925
      }
    },
    {
      "id": "change-3",
      "label": "The scarf tree embroidery branches downward.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.34330143540669855,
        "top": 0.30924548352816156,
        "width": 0.04425837320574163,
        "height": 0.08395324123273114
      }
    },
    {
      "id": "change-4",
      "label": "The foreground shade flower petals form a balanced cross.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.06339712918660287,
        "top": 0.4495217853347503,
        "width": 0.03708133971291866,
        "height": 0.06907545164718384
      }
    },
    {
      "id": "change-5",
      "label": "The ankle charm is an upward triangle.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.48863636363636365,
        "top": 0.8214665249734325,
        "width": 0.02332535885167464,
        "height": 0.039319872476089264
      }
    }
  ]
},
{
  "id": "v4-dream-032",
  "title": "The Glove That Held the Sea",
  "original": "/artwork/v4/collection/dream-032-original-v4.png",
  "altered": "/artwork/v4/collection/dream-032-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The small stone mound becomes a double arch bridge.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.5843301435406698,
        "top": 0.6588735387885228,
        "width": 0.09928229665071771,
        "height": 0.07545164718384698
      }
    },
    {
      "id": "change-2",
      "label": "The red sail bulges outward instead of forming a straight triangle.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.5287081339712919,
        "top": 0.2975557917109458,
        "width": 0.05980861244019139,
        "height": 0.1275239107332625
      }
    },
    {
      "id": "change-3",
      "label": "The upper white ladder rung slopes down toward the right.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.9258373205741627,
        "top": 0.5090329436769394,
        "width": 0.02332535885167464,
        "height": 0.024442082890541977
      }
    },
    {
      "id": "change-4",
      "label": "The brass cuff dial pointer turns toward the lower left.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.4007177033492823,
        "top": 0.7438894792773645,
        "width": 0.03648325358851675,
        "height": 0.05526036131774708
      }
    },
    {
      "id": "change-5",
      "label": "The boat pennant flies left instead of right.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.5370813397129187,
        "top": 0.26567481402763016,
        "width": 0.03349282296650718,
        "height": 0.02975557917109458
      }
    }
  ]
},
{
  "id": "v4-dream-033",
  "title": "The Marmalade Planet",
  "original": "/artwork/v4/collection/dream-033-original-v4.png",
  "altered": "/artwork/v4/collection/dream-033-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The cup handle curls outward at its top.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.7380382775119617,
        "top": 0.49946865037194477,
        "width": 0.08373205741626795,
        "height": 0.14133900106269925
      }
    },
    {
      "id": "change-2",
      "label": "The scarf crescent faces left.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.28588516746411485,
        "top": 0.410201912858661,
        "width": 0.05502392344497608,
        "height": 0.06907545164718384
      }
    },
    {
      "id": "change-3",
      "label": "The right blueberry calyx is a hollow circle.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.21351674641148324,
        "top": 0.6822529224229543,
        "width": 0.025119617224880382,
        "height": 0.036131774707757705
      }
    },
    {
      "id": "change-4",
      "label": "The spoon reflects a blue crescent.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5938995215311005,
        "top": 0.3145589798087141,
        "width": 0.05263157894736842,
        "height": 0.07226354941551541
      }
    },
    {
      "id": "change-5",
      "label": "The jar string loop opens into a broader oval.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.16447368421052633,
        "top": 0.4665249734325186,
        "width": 0.02930622009569378,
        "height": 0.04782146652497343
      }
    }
  ]
},
{
  "id": "v4-dream-034",
  "title": "The Umbrella Lake",
  "original": "/artwork/v4/collection/dream-034-original-v4.png",
  "altered": "/artwork/v4/collection/dream-034-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "beak",
      "label": "The heron opens its beak.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.6698564593301436,
        "top": 0.036131774707757705,
        "width": 0.06698564593301436,
        "height": 0.061636556854410204
      }
    },
    {
      "id": "window",
      "label": "The round window crossbars form an X.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.2811004784688995,
        "top": 0.26461211477151964,
        "width": 0.045454545454545456,
        "height": 0.09458023379383634
      }
    },
    {
      "id": "crescent",
      "label": "The front-panel crescent becomes silvery blue.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4922248803827751,
        "top": 0.6163655685441021,
        "width": 0.050239234449760764,
        "height": 0.08501594048884166
      }
    },
    {
      "id": "reflection",
      "label": "The left water lily reflects a closed bud.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.1895933014354067,
        "top": 0.42401700318809776,
        "width": 0.049641148325358854,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "latch",
      "label": "The central door latch forms a ring around the bar.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.35645933014354064,
        "top": 0.3273113708820404,
        "width": 0.038875598086124404,
        "height": 0.03825717321997875
      }
    }
  ]
},
{
  "id": "v4-dream-035",
  "title": "The Last Stair at Sea",
  "original": "/artwork/v4/collection/dream-035-original-v4.png",
  "altered": "/artwork/v4/collection/dream-035-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "door",
      "label": "The door star becomes a crescent.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.6572966507177034,
        "top": 0.0818278427205101,
        "width": 0.028708133971291867,
        "height": 0.0669500531349628
      }
    },
    {
      "id": "sail",
      "label": "The toy boat's sail billows to the left of its mast.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.39952153110047844,
        "top": 0.43358129649309246,
        "width": 0.061004784688995214,
        "height": 0.06588735387885228
      }
    },
    {
      "id": "hat",
      "label": "The paper hat's central flap folds downward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4820574162679426,
        "top": 0.3145589798087141,
        "width": 0.02930622009569378,
        "height": 0.03825717321997875
      }
    },
    {
      "id": "float",
      "label": "The upper blue boot float becomes diamond-shaped.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.3965311004784689,
        "top": 0.6631243358129649,
        "width": 0.020933014354066987,
        "height": 0.03506907545164718
      }
    },
    {
      "id": "towel",
      "label": "The top towel's middle blue stripe bends into a zigzag.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.1901913875598086,
        "top": 0.7396386822529224,
        "width": 0.04844497607655503,
        "height": 0.04994686503719448
      }
    }
  ]
},
{
  "id": "v4-dream-036",
  "title": "The Rabbit's Cloud Picnic",
  "original": "/artwork/v4/collection/dream-036-original-v4.png",
  "altered": "/artwork/v4/collection/dream-036-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "spout",
      "label": "The teapot spout bends downward.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.6788277511961722,
        "top": 0.45164718384697133,
        "width": 0.038875598086124404,
        "height": 0.07332624867162593
      }
    },
    {
      "id": "fruit",
      "label": "The held strawberry's leafy crown points sideways.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7296650717703349,
        "top": 0.357066950053135,
        "width": 0.03648325358851675,
        "height": 0.06588735387885228
      }
    },
    {
      "id": "blanket",
      "label": "The left blanket diamond has parallel bands instead of spokes.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5287081339712919,
        "top": 0.5270988310308182,
        "width": 0.06698564593301436,
        "height": 0.09351753453772582
      }
    },
    {
      "id": "strap",
      "label": "The basket strap passes beneath the rim.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.819377990430622,
        "top": 0.49946865037194477,
        "width": 0.03349282296650718,
        "height": 0.08289054197662062
      }
    },
    {
      "id": "bow",
      "label": "The left bow loop has a round opening.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.47368421052631576,
        "top": 0.1944739638682253,
        "width": 0.03648325358851675,
        "height": 0.057385759829968117
      }
    }
  ]
},
{
  "id": "v4-dream-038",
  "title": "The Mirror in the Dunes",
  "original": "/artwork/v4/collection/dream-038-original-v4.png",
  "altered": "/artwork/v4/collection/dream-038-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "moon",
      "label": "The reflected crescent faces the other way.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.39354066985645936,
        "top": 0.34643995749202977,
        "width": 0.0430622009569378,
        "height": 0.06801275239107332
      }
    },
    {
      "id": "latch",
      "label": "The box latch swings sideways.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.6471291866028708,
        "top": 0.7577045696068013,
        "width": 0.045454545454545456,
        "height": 0.05526036131774708
      }
    },
    {
      "id": "strap",
      "label": "The glove cuff strap crosses diagonally over the cuff.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7793062200956937,
        "top": 0.7481402763018066,
        "width": 0.0651913875598086,
        "height": 0.0818278427205101
      }
    },
    {
      "id": "reflection",
      "label": "The bright reflected wave trail bends to the right.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.32057416267942584,
        "top": 0.5982996811902231,
        "width": 0.11064593301435406,
        "height": 0.11902231668437832
      }
    },
    {
      "id": "shell",
      "label": "The small shell has more closely spaced ribs.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.33791866028708134,
        "top": 0.8023379383634431,
        "width": 0.05442583732057416,
        "height": 0.08289054197662062
      }
    }
  ]
},
{
  "id": "v4-dream-039",
  "title": "The Apricot Airship",
  "original": "/artwork/v4/collection/dream-039-original-v4.png",
  "altered": "/artwork/v4/collection/dream-039-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "hole",
      "label": "The leaf's heart-shaped opening becomes a diamond.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.4557416267942584,
        "top": 0.07970244420828905,
        "width": 0.03827751196172249,
        "height": 0.07438894792773645
      }
    },
    {
      "id": "bow",
      "label": "The middle basket tassel is tied with a bow.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.263755980861244,
        "top": 0.7130712008501594,
        "width": 0.045454545454545456,
        "height": 0.09032943676939426
      }
    },
    {
      "id": "pennant",
      "label": "The red pennant folds over its rope attachment.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.17882775119617225,
        "top": 0.310308182784272,
        "width": 0.03708133971291866,
        "height": 0.0669500531349628
      }
    },
    {
      "id": "star",
      "label": "The paper star's folds meet above and left of center.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.2834928229665072,
        "top": 0.6131774707757705,
        "width": 0.05143540669856459,
        "height": 0.08607863974495218
      }
    },
    {
      "id": "bridge",
      "label": "The stone bridge arch splits into two openings.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.8241626794258373,
        "top": 0.7895855472901169,
        "width": 0.05143540669856459,
        "height": 0.06588735387885228
      }
    }
  ]
},
{
  "id": "v4-dream-040",
  "title": "The Porcelain Weather",
  "original": "/artwork/v4/collection/dream-040-original-v4.png",
  "altered": "/artwork/v4/collection/dream-040-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "braided-tassel",
      "label": "The hanging white tassel becomes a twisted braid.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.69377990430622,
        "top": 0.46971307120085015,
        "width": 0.028708133971291867,
        "height": 0.13177470775770456
      },
      "source": "/artwork/v4/collection/dream-040-refine-source-v4.png"
    },
    {
      "id": "center-drop",
      "label": "The middle raindrop points downward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.4449760765550239,
        "top": 0.2688629117959617,
        "width": 0.01854066985645933,
        "height": 0.06376195536663125
      }
    },
    {
      "id": "star-turn",
      "label": "The cage-door star points downward.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5179425837320574,
        "top": 0.1785334750265675,
        "width": 0.04066985645933014,
        "height": 0.08395324123273114
      }
    },
    {
      "id": "square-buckle",
      "label": "The saddle buckle sits square instead of diagonally.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5143540669856459,
        "top": 0.4729011689691817,
        "width": 0.031698564593301434,
        "height": 0.057385759829968117
      }
    },
    {
      "id": "neck-leaf",
      "label": "The lower blue neck leaf points right instead of down.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.6190191387559809,
        "top": 0.38682252922422955,
        "width": 0.025119617224880382,
        "height": 0.031880977683315624
      },
      "source": "/artwork/v4/collection/dream-040-refine-source-v4.png"
    }
  ]
},
{
  "id": "v4-dream-041",
  "title": "The Clockmaker's Nest",
  "original": "/artwork/v4/collection/dream-041-original-v4.png",
  "altered": "/artwork/v4/collection/dream-041-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "ring-key",
      "label": "The loose winding key has a round handle.",
      "difficulty": "Easy",
      "edgeFade": 6,
      "box": {
        "left": 0.7296650717703349,
        "top": 0.793836344314559,
        "width": 0.08732057416267942,
        "height": 0.1275239107332625
      }
    },
    {
      "id": "ribbon-loop",
      "label": "The loose ribbon end curls into a loop.",
      "difficulty": "Medium",
      "edgeFade": 7,
      "box": {
        "left": 0.49700956937799046,
        "top": 0.7810839532412327,
        "width": 0.18241626794258373,
        "height": 0.17003188097768332
      }
    },
    {
      "id": "watch-hands",
      "label": "The red watch hands point up and down.",
      "difficulty": "Hard",
      "edgeFade": 5,
      "box": {
        "left": 0.2840909090909091,
        "top": 0.5037194473963869,
        "width": 0.0819377990430622,
        "height": 0.153028692879915
      }
    },
    {
      "id": "egg-wave",
      "label": "The right egg has a wavy brown stripe.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.40251196172248804,
        "top": 0.614240170031881,
        "width": 0.05263157894736842,
        "height": 0.08289054197662062
      }
    },
    {
      "id": "watch-moon",
      "label": "The blue watch's crescent opens to the left.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.41866028708133973,
        "top": 0.536663124335813,
        "width": 0.03409090909090909,
        "height": 0.05951115834218916
      },
      "source": "/artwork/v4/collection/dream-041-refine-source-v4.png"
    }
  ]
},
{
  "id": "v4-dream-042",
  "title": "The Window That Walked",
  "original": "/artwork/v4/collection/dream-042-original-v4.png",
  "altered": "/artwork/v4/collection/dream-042-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "dog-tail",
      "label": "The paper dog's tail folds downward.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.6710526315789473,
        "top": 0.6822529224229543,
        "width": 0.05442583732057416,
        "height": 0.16259298618490967
      }
    },
    {
      "id": "hat-ribbon",
      "label": "The hat ribbon curls into a loop.",
      "difficulty": "Medium",
      "edgeFade": 6,
      "box": {
        "left": 0.7200956937799043,
        "top": 0.19659936238044634,
        "width": 0.145933014354067,
        "height": 0.1647183846971307
      }
    },
    {
      "id": "shutter-crescent",
      "label": "The shutter's crescent handle opens to the left.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5245215311004785,
        "top": 0.24442082890541977,
        "width": 0.03648325358851675,
        "height": 0.07438894792773645
      }
    },
    {
      "id": "postcard-stamp",
      "label": "The lowest flying postcard has its stamp at the lower corner.",
      "difficulty": "Very hard",
      "edgeFade": 5,
      "box": {
        "left": 0.32715311004784686,
        "top": 0.6036131774707758,
        "width": 0.0651913875598086,
        "height": 0.09458023379383634
      }
    },
    {
      "id": "sock-ribs",
      "label": "The sock's knitting runs in horizontal rows.",
      "difficulty": "Dreamlike",
      "edgeFade": 5,
      "box": {
        "left": 0.24222488038277512,
        "top": 0.6822529224229543,
        "width": 0.05861244019138756,
        "height": 0.14665249734325186
      }
    }
  ]
},
{
  "id": "v4-dream-044",
  "title": "The Theatre of Moths",
  "original": "/artwork/v4/collection/dream-044-original-v4.png",
  "altered": "/artwork/v4/collection/dream-044-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The large foreground moth right antenna ends in a curl.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.2703349282296651,
        "top": 0.5579171094580234,
        "width": 0.09928229665071771,
        "height": 0.10945802337938364
      }
    },
    {
      "id": "change-2",
      "label": "The dancer mask crescent faces left.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.5550239234449761,
        "top": 0.29330499468650373,
        "width": 0.038875598086124404,
        "height": 0.077577045696068
      }
    },
    {
      "id": "change-3",
      "label": "The left leaf droplet reflects a four point star.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.10107655502392345,
        "top": 0.5324123273113709,
        "width": 0.031698564593301434,
        "height": 0.05100956429330499
      }
    },
    {
      "id": "change-4",
      "label": "The middle footlight reflection is a crescent.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5741626794258373,
        "top": 0.6376195536663124,
        "width": 0.026913875598086126,
        "height": 0.04569606801275239
      }
    },
    {
      "id": "change-5",
      "label": "The right chair crown jewel is a diamond.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.8110047846889952,
        "top": 0.79596174282678,
        "width": 0.02751196172248804,
        "height": 0.04782146652497343
      }
    }
  ]
},
{
  "id": "v4-dream-046",
  "title": "The Peach Umbrella Parade",
  "original": "/artwork/v4/collection/dream-046-original-v4.png",
  "altered": "/artwork/v4/collection/dream-046-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The deer umbrella bears a crescent instead of a star.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.5322966507177034,
        "top": 0.04675876726886291,
        "width": 0.06578947368421052,
        "height": 0.11052072263549416
      }
    },
    {
      "id": "change-2",
      "label": "The deer's umbrella handle closes into a loop.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.5891148325358851,
        "top": 0.4314558979808714,
        "width": 0.061004784688995214,
        "height": 0.08820403825717323
      }
    },
    {
      "id": "change-3",
      "label": "The rabbit scarf's loose end curls upward.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.145933014354067,
        "top": 0.48459086078639746,
        "width": 0.11602870813397129,
        "height": 0.1179596174282678
      }
    },
    {
      "id": "change-4",
      "label": "The squirrel scarf hangs as one broad downward fold.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8672248803827751,
        "top": 0.6354941551540914,
        "width": 0.04425837320574163,
        "height": 0.09670563230605739
      }
    },
    {
      "id": "change-5",
      "label": "The mouse pocket has a plus-shaped stitch.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.7248803827751196,
        "top": 0.7906482465462275,
        "width": 0.025717703349282296,
        "height": 0.04994686503719448
      }
    }
  ]
},
{
  "id": "v4-dream-043",
  "title": "The Otter's Lemon Boat",
  "original": "/artwork/v4/collection/dream-043-original-v4.png",
  "altered": "/artwork/v4/collection/dream-043-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The crab right front claw points upward.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.8516746411483254,
        "top": 0.4569606801275239,
        "width": 0.05442583732057416,
        "height": 0.14665249734325186
      }
    },
    {
      "id": "change-2",
      "label": "The bucket emblem forms an upward three-lobed shape.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.47787081339712917,
        "top": 0.5377258235919234,
        "width": 0.03349282296650718,
        "height": 0.057385759829968117
      }
    },
    {
      "id": "change-3",
      "label": "The picnic cup emblem is a crescent.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.9120813397129187,
        "top": 0.5611052072263549,
        "width": 0.022129186602870814,
        "height": 0.03719447396386823
      }
    },
    {
      "id": "change-4",
      "label": "The paddle central groove curves in an S.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.29366028708133973,
        "top": 0.6482465462274176,
        "width": 0.05263157894736842,
        "height": 0.10945802337938364
      }
    },
    {
      "id": "change-5",
      "label": "The small upper branch leaf is pink and points upward.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.8205741626794258,
        "top": 0.02975557917109458,
        "width": 0.022727272727272728,
        "height": 0.04144527098831031
      }
    }
  ]
},
{
  "id": "v4-dream-045",
  "title": "The Chair Above the Rain",
  "original": "/artwork/v4/collection/dream-045-original-v4.png",
  "altered": "/artwork/v4/collection/dream-045-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The chair back opening is a rounded square.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.5083732057416268,
        "top": 0.23698193411264612,
        "width": 0.04126794258373206,
        "height": 0.07438894792773645
      }
    },
    {
      "id": "change-2",
      "label": "The paper cat tail curls upward behind its body.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.5263157894736842,
        "top": 0.31243358129649307,
        "width": 0.026913875598086126,
        "height": 0.06482465462274177
      }
    },
    {
      "id": "change-3",
      "label": "The mug handle curves upward into a hook.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7685406698564593,
        "top": 0.43358129649309246,
        "width": 0.017344497607655503,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "change-4",
      "label": "The upright boot red heel stripe slopes upward.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7613636363636364,
        "top": 0.7640807651434643,
        "width": 0.037679425837320576,
        "height": 0.05419766206163656
      }
    },
    {
      "id": "change-5",
      "label": "The sail has a diagonal blue seam.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.2595693779904306,
        "top": 0.7173219978746015,
        "width": 0.029904306220095694,
        "height": 0.08820403825717323
      }
    }
  ]
},
{
  "id": "v4-dream-047",
  "title": "The Whale in the Attic",
  "original": "/artwork/v4/collection/dream-047-original-v4.png",
  "altered": "/artwork/v4/collection/dream-047-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The whale's eye is open.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.5717703349282297,
        "top": 0.4580233793836344,
        "width": 0.04007177033492823,
        "height": 0.05951115834218916
      }
    },
    {
      "id": "change-2",
      "label": "The jug's left handle curls into an open hook.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.2021531100478469,
        "top": 0.7768331562167906,
        "width": 0.026913875598086126,
        "height": 0.06482465462274177
      }
    },
    {
      "id": "change-3",
      "label": "The chest keyhole lies horizontally.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7924641148325359,
        "top": 0.8299681190223167,
        "width": 0.02332535885167464,
        "height": 0.04250797024442083
      }
    },
    {
      "id": "change-4",
      "label": "The whale ribbon loops behind the upper fin.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.2452153110047847,
        "top": 0.44739638682252925,
        "width": 0.2805023923444976,
        "height": 0.2359192348565356
      }
    },
    {
      "id": "change-5",
      "label": "The armillary sphere's upright ring crosses in front of its tilted ring.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.050239234449760764,
        "top": 0.3889479277364506,
        "width": 0.11004784688995216,
        "height": 0.1891604675876727
      }
    }
  ]
},
{
  "id": "v4-dream-048",
  "title": "The Handful of Horizons",
  "original": "/artwork/v4/collection/dream-048-original-v4.png",
  "altered": "/artwork/v4/collection/dream-048-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The pedestal inset is a downward-pointing triangle.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.47667464114832536,
        "top": 0.7109458023379384,
        "width": 0.06997607655502393,
        "height": 0.12114771519659936
      }
    },
    {
      "id": "change-2",
      "label": "The key's teeth point above its shaft.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7099282296650717,
        "top": 0.8682252922422954,
        "width": 0.039473684210526314,
        "height": 0.06801275239107332
      }
    },
    {
      "id": "change-3",
      "label": "The wristband's end curls into a loop.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5077751196172249,
        "top": 0.487778958554729,
        "width": 0.04485645933014354,
        "height": 0.07438894792773645
      }
    },
    {
      "id": "change-4",
      "label": "The red ribbon is tied around the key shaft.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7505980861244019,
        "top": 0.8129649309245484,
        "width": 0.2494019138755981,
        "height": 0.13602550478214664
      }
    },
    {
      "id": "change-5",
      "label": "The ring has a triangular red gemstone.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.36901913875598086,
        "top": 0.1891604675876727,
        "width": 0.04126794258373206,
        "height": 0.06482465462274177
      }
    }
  ]
},
{
  "id": "v4-dream-049",
  "title": "The Strawberry Post Office",
  "original": "/artwork/v4/collection/dream-049-original-v4.png",
  "altered": "/artwork/v4/collection/dream-049-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "bag-moon",
      "label": "The mailbag's star becomes a crescent.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.340311004784689,
        "top": 0.5855472901168969,
        "width": 0.04784688995215311,
        "height": 0.08289054197662062
      }
    },
    {
      "id": "bell-clapper",
      "label": "The bell's clapper leans to the right.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.20334928229665072,
        "top": 0.39638682252922425,
        "width": 0.03708133971291866,
        "height": 0.04250797024442083
      }
    },
    {
      "id": "envelope-flap",
      "label": "The cloud envelope's flap folds closed.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5705741626794258,
        "top": 0.21891604675876727,
        "width": 0.0950956937799043,
        "height": 0.1179596174282678
      }
    },
    {
      "id": "knocker-hinge",
      "label": "The door knocker's hinge tilts right.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.22667464114832536,
        "top": 0.47927736450584485,
        "width": 0.025717703349282296,
        "height": 0.044633368756641874
      }
    },
    {
      "id": "quill-nib",
      "label": "The quill nib curls upward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.07954545454545454,
        "top": 0.8522848034006376,
        "width": 0.037679425837320576,
        "height": 0.05100956429330499
      }
    }
  ]
},
{
  "id": "v4-dream-051",
  "title": "The Umbrella's Shadow",
  "original": "/artwork/v4/collection/dream-051-original-v4.png",
  "altered": "/artwork/v4/collection/dream-051-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "shadow-beak",
      "label": "The bird shadow's beak hooks downward.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.5735645933014354,
        "top": 0.6705632306057385,
        "width": 0.060406698564593304,
        "height": 0.08076514346439957
      }
    },
    {
      "id": "conch-mouth",
      "label": "The conch shell's opening turns toward the viewer.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.06160287081339713,
        "top": 0.7151965993623804,
        "width": 0.06997607655502393,
        "height": 0.08820403825717323
      }
    },
    {
      "id": "chair-brace",
      "label": "The chair's side brace slopes upward instead of downward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.812200956937799,
        "top": 0.6716259298618491,
        "width": 0.05921052631578947,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "strap-pin",
      "label": "The umbrella buckle has a horizontal fastening pin.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7272727272727273,
        "top": 0.2252922422954304,
        "width": 0.026913875598086126,
        "height": 0.04569606801275239
      }
    },
    {
      "id": "fan-ridge",
      "label": "The fan shell's central groove curves like an S.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.16925837320574164,
        "top": 0.8331562167906482,
        "width": 0.025717703349282296,
        "height": 0.08395324123273114
      }
    }
  ]
},
{
  "id": "v4-dream-053",
  "title": "The Swan's Secret Wardrobe",
  "original": "/artwork/v4/collection/dream-053-original-v4.png",
  "altered": "/artwork/v4/collection/dream-053-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "ribbon",
      "label": "The swan's right bow tail curls upward at its tip.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.5466507177033493,
        "top": 0.4357066950053135,
        "width": 0.04007177033492823,
        "height": 0.1742826780021254
      }
    },
    {
      "id": "collar",
      "label": "The winter coat's fur collar closes into a ring.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.6202153110047847,
        "top": 0.3517534537725824,
        "width": 0.06698564593301436,
        "height": 0.08607863974495218
      }
    },
    {
      "id": "handle",
      "label": "The drawer's crescent handle becomes a symmetrical bowl.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.31698564593301437,
        "top": 0.5356004250797024,
        "width": 0.05442583732057416,
        "height": 0.09351753453772582
      }
    },
    {
      "id": "vent",
      "label": "The cabinet's triangular vent points downward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7159090909090909,
        "top": 0.6822529224229543,
        "width": 0.038875598086124404,
        "height": 0.06801275239107332
      }
    },
    {
      "id": "lamp",
      "label": "The upper pearl lamp gains a pointed tip.",
      "difficulty": "Dreamlike",
      "edgeFade": 2,
      "box": {
        "left": 0.173444976076555,
        "top": 0.1392136025504782,
        "width": 0.019138755980861243,
        "height": 0.02975557917109458
      }
    }
  ]
},
{
  "id": "v4-dream-054",
  "title": "The Lost Sock Archipelago",
  "original": "/artwork/v4/collection/dream-054-original-v4.png",
  "altered": "/artwork/v4/collection/dream-054-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "sun",
      "label": "The sun becomes a glowing ring.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.16148325358851676,
        "top": 0.39107332624867164,
        "width": 0.07236842105263158,
        "height": 0.11902231668437832
      }
    },
    {
      "id": "patch",
      "label": "The sock's heel patch has spiral stitches.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.3869617224880383,
        "top": 0.3028692879914984,
        "width": 0.09150717703349283,
        "height": 0.1434643995749203
      }
    },
    {
      "id": "sail",
      "label": "The boat's right sail billows outward.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.20035885167464115,
        "top": 0.5642933049946866,
        "width": 0.04066985645933014,
        "height": 0.11902231668437832
      }
    },
    {
      "id": "shutter",
      "label": "A slanted shutter closes part of the sock's window.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.361244019138756,
        "top": 0.09458023379383634,
        "width": 0.02751196172248804,
        "height": 0.04994686503719448
      }
    },
    {
      "id": "starfish",
      "label": "The starfish curls its upper arm to the right.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.7816985645933014,
        "top": 0.8289054197662061,
        "width": 0.026913875598086126,
        "height": 0.052072263549415514
      }
    }
  ]
},
{
  "id": "v4-dream-055",
  "title": "The Tortoise's Kite Festival",
  "original": "/artwork/v4/collection/dream-055-original-v4.png",
  "altered": "/artwork/v4/collection/dream-055-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "A coiled conch shell replaces the fan-shaped shell.",
      "difficulty": "Easy",
      "edgeFade": 6,
      "box": {
        "left": 0.3068181818181818,
        "top": 0.5419766206163655,
        "width": 0.11423444976076555,
        "height": 0.13177470775770456
      }
    },
    {
      "id": "change-2",
      "label": "The turtle's scarf knot loops through itself.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.6985645933014354,
        "top": 0.6588735387885228,
        "width": 0.07476076555023924,
        "height": 0.12433581296493093
      }
    },
    {
      "id": "change-3",
      "label": "A cloud is drawn on the girl's sweater.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4300239234449761,
        "top": 0.24867162592986186,
        "width": 0.04066985645933014,
        "height": 0.057385759829968117
      }
    },
    {
      "id": "change-4",
      "label": "The red leaf kite's central gold vein curls into a spiral.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6267942583732058,
        "top": 0.053134962805526036,
        "width": 0.08074162679425838,
        "height": 0.09883103081827843
      }
    },
    {
      "id": "change-5",
      "label": "The dog's tongue curls upward toward its nose.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.5998803827751196,
        "top": 0.44208289054197664,
        "width": 0.025717703349282296,
        "height": 0.04250797024442083
      }
    }
  ]
},
{
  "id": "v4-dream-056",
  "title": "The Lantern Keeper's Fox",
  "original": "/artwork/v4/collection/dream-056-original-v4.png",
  "altered": "/artwork/v4/collection/dream-056-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "An arched bridge is painted on the purple lantern roof.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.6381578947368421,
        "top": 0.2454835281615303,
        "width": 0.07535885167464115,
        "height": 0.077577045696068
      }
    },
    {
      "id": "change-2",
      "label": "A stepped waterfall flows inside the left lantern.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.12320574162679426,
        "top": 0.6556854410201913,
        "width": 0.07595693779904306,
        "height": 0.1381509032943677
      }
    },
    {
      "id": "change-3",
      "label": "The scarf fringe threads into a braid.",
      "difficulty": "Hard",
      "edgeFade": 5,
      "box": {
        "left": 0.6495215311004785,
        "top": 0.822529224229543,
        "width": 0.12200956937799043,
        "height": 0.12008501594048884
      }
    },
    {
      "id": "change-4",
      "label": "A round pull ring hangs from the pink door handle.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4055023923444976,
        "top": 0.3846971307120085,
        "width": 0.022727272727272728,
        "height": 0.048884165781083955
      }
    },
    {
      "id": "change-5",
      "label": "The rightmost acorn cap scales curl into a spiral.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.9216507177033493,
        "top": 0.5557917109458024,
        "width": 0.04366028708133971,
        "height": 0.08820403825717323
      }
    }
  ]
},
{
  "id": "v4-dream-057",
  "title": "The Door in the Pillow",
  "original": "/artwork/v4/collection/dream-057-original-v4.png",
  "altered": "/artwork/v4/collection/dream-057-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "A blue ladder is stitched above the door.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.5376794258373205,
        "top": 0.13177470775770456,
        "width": 0.05861244019138756,
        "height": 0.11689691817215728
      }
    },
    {
      "id": "change-2",
      "label": "The shell door knob opens to reveal a pearl.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.638755980861244,
        "top": 0.4505844845908608,
        "width": 0.037679425837320576,
        "height": 0.08076514346439957
      }
    },
    {
      "id": "change-3",
      "label": "The slipper's cream band threads through its own knot.",
      "difficulty": "Hard",
      "edgeFade": 5,
      "box": {
        "left": 0.8116028708133971,
        "top": 0.7810839532412327,
        "width": 0.06339712918660287,
        "height": 0.10414452709883103
      }
    },
    {
      "id": "change-4",
      "label": "The door's wood grain curls into a spiral knot.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6202153110047847,
        "top": 0.5738575982996812,
        "width": 0.04126794258373206,
        "height": 0.11370882040382571
      }
    },
    {
      "id": "change-5",
      "label": "One wave in the doorway curls into a breaking spiral.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.5269138755980861,
        "top": 0.640807651434644,
        "width": 0.06937799043062201,
        "height": 0.04782146652497343
      }
    }
  ]
},
{
  "id": "v4-dream-058",
  "title": "The Cherries That Rang",
  "original": "/artwork/v4/collection/dream-058-original-v4.png",
  "altered": "/artwork/v4/collection/dream-058-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "left-clapper",
      "label": "The left cherry bell's clapper swings left.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.4084928229665072,
        "top": 0.20085015940488843,
        "width": 0.09569377990430622,
        "height": 0.14984059511158343
      }
    },
    {
      "id": "closed-mouth",
      "label": "The squirrel closes its singing mouth.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.26854066985645936,
        "top": 0.31562167906482463,
        "width": 0.03827751196172249,
        "height": 0.06588735387885228
      }
    },
    {
      "id": "boat-sail",
      "label": "The largest cup boat's main sail bows left.",
      "difficulty": "Hard",
      "edgeFade": 5,
      "box": {
        "left": 0.5544258373205742,
        "top": 0.6078639744952179,
        "width": 0.08552631578947369,
        "height": 0.12646121147715197
      }
    },
    {
      "id": "braid-tassel",
      "label": "The blue hanging tassel is braided.",
      "difficulty": "Very hard",
      "edgeFade": 5,
      "box": {
        "left": 0.29545454545454547,
        "top": 0.434643995749203,
        "width": 0.07236842105263158,
        "height": 0.15834218916046758
      }
    },
    {
      "id": "cherry-stem",
      "label": "The middle cake's cherry stem curls into a spiral.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.194377990430622,
        "top": 0.691817215727949,
        "width": 0.03110047846889952,
        "height": 0.07970244420828905
      }
    }
  ]
},
{
  "id": "v4-dream-059",
  "title": "The Library of Feathers",
  "original": "/artwork/v4/collection/dream-059-original-v4.png",
  "altered": "/artwork/v4/collection/dream-059-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "curved-quill",
      "label": "The middle quill bends its tip to the left.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.07595693779904306,
        "top": 0.436769394261424,
        "width": 0.0651913875598086,
        "height": 0.25398512221041447
      },
      "source": "/artwork/v4/collection/dream-059-quill-selected-source-v4.png"
    },
    {
      "id": "open-beak",
      "label": "The peacock opens its beak.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.7374401913875598,
        "top": 0.3145589798087141,
        "width": 0.031698564593301434,
        "height": 0.04994686503719448
      }
    },
    {
      "id": "ajar-book",
      "label": "The red book's cover opens to reveal cream pages.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.3923444976076555,
        "top": 0.24442082890541977,
        "width": 0.06638755980861244,
        "height": 0.15621679064824653
      }
    },
    {
      "id": "knotted-tassel",
      "label": "The shelf tassel is tied into a knot.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.31758373205741625,
        "top": 0.434643995749203,
        "width": 0.029904306220095694,
        "height": 0.08926673751328375
      }
    },
    {
      "id": "moon-medallion",
      "label": "The neck medallion has an upward-facing crescent.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.7117224880382775,
        "top": 0.5356004250797024,
        "width": 0.03349282296650718,
        "height": 0.08076514346439957
      }
    }
  ]
},
{
  "id": "v4-dream-060",
  "title": "The Mountain in the Cupboard",
  "original": "/artwork/v4/collection/dream-060-original-v4.png",
  "altered": "/artwork/v4/collection/dream-060-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "goat-turn",
      "label": "The mountain goat faces right.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.7081339712918661,
        "top": 0.23379383634431455,
        "width": 0.05741626794258373,
        "height": 0.10201912858660998
      }
    },
    {
      "id": "mitten-thumb",
      "label": "The hanging mitten's thumb points left.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.409688995215311,
        "top": 0.6099893730074389,
        "width": 0.05861244019138756,
        "height": 0.11689691817215728
      }
    },
    {
      "id": "thermos-lid",
      "label": "The thermos lid sits unscrewed and tilted.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.24162679425837322,
        "top": 0.6811902231668437,
        "width": 0.041866028708133975,
        "height": 0.0669500531349628
      }
    },
    {
      "id": "stone-rings",
      "label": "The largest blue stone has rings instead of branching veins.",
      "difficulty": "Very hard",
      "edgeFade": 5,
      "box": {
        "left": 0.5825358851674641,
        "top": 0.6238044633368757,
        "width": 0.07476076555023924,
        "height": 0.1030818278427205
      }
    },
    {
      "id": "knob-spiral",
      "label": "The coral door knob has a spiral on its face.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.4258373205741627,
        "top": 0.3698193411264612,
        "width": 0.03349282296650718,
        "height": 0.0669500531349628
      }
    }
  ]
},
{
  "id": "v4-dream-061",
  "title": "The Sea Beneath the Carpet",
  "original": "/artwork/v4/collection/dream-061-original-v4.png",
  "altered": "/artwork/v4/collection/dream-061-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The painted cloud curls into a spiral.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.49940191387559807,
        "top": 0.0,
        "width": 0.12141148325358851,
        "height": 0.16790648246546228
      }
    },
    {
      "id": "change-2",
      "label": "The chair front stretcher slopes upward.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.1375598086124402,
        "top": 0.412327311370882,
        "width": 0.09150717703349283,
        "height": 0.07226354941551541
      }
    },
    {
      "id": "change-3",
      "label": "The slipper pompom becomes a spiral rosette.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8732057416267942,
        "top": 0.4729011689691817,
        "width": 0.041866028708133975,
        "height": 0.06376195536663125
      }
    },
    {
      "id": "change-4",
      "label": "The key right tooth points diagonally upward.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8953349282296651,
        "top": 0.25292242295430395,
        "width": 0.02930622009569378,
        "height": 0.05526036131774708
      }
    },
    {
      "id": "change-5",
      "label": "The right sail contains a crescent opening.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.7129186602870813,
        "top": 0.6227417640807651,
        "width": 0.023923444976076555,
        "height": 0.05526036131774708
      }
    }
  ]
},
{
  "id": "v4-dream-062",
  "title": "The Umbrella Jellyfish",
  "original": "/artwork/v4/collection/dream-062-original-v4.png",
  "altered": "/artwork/v4/collection/dream-062-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The canopy large crescent opens upward.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.5047846889952153,
        "top": 0.19766206163655686,
        "width": 0.05442583732057416,
        "height": 0.0924548352816153
      }
    },
    {
      "id": "change-2",
      "label": "The fish upper fin folds into a rounded shape.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.7033492822966507,
        "top": 0.24017003188097769,
        "width": 0.0645933014354067,
        "height": 0.06482465462274177
      }
    },
    {
      "id": "change-3",
      "label": "The pearl reflects a blue fish.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8307416267942583,
        "top": 0.667375132837407,
        "width": 0.04425837320574163,
        "height": 0.07863974495217853
      }
    },
    {
      "id": "change-4",
      "label": "The lantern bottom ring opens into curled hooks.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.854066985645933,
        "top": 0.2678002125398512,
        "width": 0.042464114832535885,
        "height": 0.06482465462274177
      }
    },
    {
      "id": "change-5",
      "label": "The hanging shell charm has a spiral groove.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.3361244019138756,
        "top": 0.5982996811902231,
        "width": 0.039473684210526314,
        "height": 0.07013815090329437
      }
    }
  ]
},
{
  "id": "v4-dream-064",
  "title": "The Keeper of Empty Birdcages",
  "original": "/artwork/v4/collection/dream-064-original-v4.png",
  "altered": "/artwork/v4/collection/dream-064-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The foreground blossom's stamens curl into a spiral.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.13277511961722488,
        "top": 0.6992561105207227,
        "width": 0.08313397129186603,
        "height": 0.1636556854410202
      }
    },
    {
      "id": "change-2",
      "label": "The hanging cage door swings inward.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.1722488038277512,
        "top": 0.21360255047821466,
        "width": 0.12141148325358851,
        "height": 0.15409139213602552
      }
    },
    {
      "id": "change-3",
      "label": "The hood tassel hangs from an open gold loop.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.38098086124401914,
        "top": 0.3177470775770457,
        "width": 0.05442583732057416,
        "height": 0.11583421891604676
      }
    },
    {
      "id": "change-4",
      "label": "The chest-held cage's horizontal hoop is braided.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5753588516746412,
        "top": 0.47502656748140276,
        "width": 0.09928229665071771,
        "height": 0.0563230605738576
      }
    },
    {
      "id": "change-5",
      "label": "A crescent glint reflects inside the green brooch.",
      "difficulty": "Dreamlike",
      "edgeFade": 2,
      "box": {
        "left": 0.5747607655502392,
        "top": 0.3379383634431456,
        "width": 0.01555023923444976,
        "height": 0.036131774707757705
      }
    }
  ]
},
{
  "id": "v4-dream-065",
  "title": "The Cloud in the Shoe",
  "original": "/artwork/v4/collection/dream-065-original-v4.png",
  "altered": "/artwork/v4/collection/dream-065-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The red boot patch opens like a hinged flap.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.7440191387559809,
        "top": 0.5313496280552603,
        "width": 0.07834928229665072,
        "height": 0.13708820403825717
      }
    },
    {
      "id": "change-2",
      "label": "The watering can's spout bends downward.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.7655502392344498,
        "top": 0.7460148777895855,
        "width": 0.07416267942583732,
        "height": 0.15727948990435706
      }
    },
    {
      "id": "change-3",
      "label": "The right shoelace loop threads through itself.",
      "difficulty": "Hard",
      "edgeFade": 5,
      "box": {
        "left": 0.5633971291866029,
        "top": 0.34643995749202977,
        "width": 0.07416267942583732,
        "height": 0.28480340063761955
      }
    },
    {
      "id": "change-4",
      "label": "A white ladder is painted on the foreground rock.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.12320574162679426,
        "top": 0.7906482465462275,
        "width": 0.0430622009569378,
        "height": 0.09351753453772582
      }
    },
    {
      "id": "change-5",
      "label": "One intact purple ladder rung arches upward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8534688995215312,
        "top": 0.5345377258235919,
        "width": 0.04904306220095694,
        "height": 0.04675876726886291
      }
    }
  ]
},
{
  "id": "v4-dream-067",
  "title": "The Sleeping Constellation",
  "original": "/artwork/v4/collection/dream-067-original-v4.png",
  "altered": "/artwork/v4/collection/dream-067-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "closed-cushion-eye",
      "label": "The cushion's embroidered eye closes.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.6728468899521531,
        "top": 0.4909670563230606,
        "width": 0.11842105263157894,
        "height": 0.10095642933049948
      }
    },
    {
      "id": "bear-eye",
      "label": "The bear opens its left eye.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.7482057416267942,
        "top": 0.383634431455898,
        "width": 0.02930622009569378,
        "height": 0.04357066950053135
      }
    },
    {
      "id": "crescent-turn",
      "label": "The hanging crescent opens left.",
      "difficulty": "Hard",
      "edgeFade": 5,
      "box": {
        "left": 0.8564593301435407,
        "top": 0.08926673751328375,
        "width": 0.0651913875598086,
        "height": 0.12327311370882041
      }
    },
    {
      "id": "globe-axis",
      "label": "The armillary's inner axis slopes down to the right.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.9078947368421053,
        "top": 0.6546227417640808,
        "width": 0.05861244019138756,
        "height": 0.09458023379383634
      }
    },
    {
      "id": "heart-pull",
      "label": "The lamp pull has a hollow heart shape.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.10047846889952153,
        "top": 0.43358129649309246,
        "width": 0.029904306220095694,
        "height": 0.08076514346439957
      },
      "source": "/artwork/v4/collection/dream-067-refine-source-v4.png"
    }
  ]
},
{
  "id": "v4-dream-070",
  "title": "The Mapmaker's Owl",
  "original": "/artwork/v4/collection/dream-070-original-v4.png",
  "altered": "/artwork/v4/collection/dream-070-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The wax seal bears a crescent.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.20574162679425836,
        "top": 0.8065887353878852,
        "width": 0.06937799043062201,
        "height": 0.09776833156216791
      }
    },
    {
      "id": "change-2",
      "label": "The compass's blue needle points to the upper right.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.8421052631578947,
        "top": 0.6907545164718385,
        "width": 0.08014354066985646,
        "height": 0.11689691817215728
      }
    },
    {
      "id": "change-3",
      "label": "The lamp flame curls to the left.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8086124401913876,
        "top": 0.18278427205100956,
        "width": 0.045454545454545456,
        "height": 0.11583421891604676
      }
    },
    {
      "id": "change-4",
      "label": "The map waterfall curls upward into a crest.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6626794258373205,
        "top": 0.6907545164718385,
        "width": 0.06638755980861244,
        "height": 0.14133900106269925
      }
    },
    {
      "id": "change-5",
      "label": "The paper roll contains an angular square spiral.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.7673444976076556,
        "top": 0.5409139213602551,
        "width": 0.03110047846889952,
        "height": 0.05526036131774708
      }
    }
  ]
},
{
  "id": "v4-dream-052",
  "title": "The Mouse Who Watered Stars",
  "original": "/artwork/v4/collection/dream-052-original-v4.png",
  "altered": "/artwork/v4/collection/dream-052-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "tail",
      "label": "The mouse's tail curls into an angular loop.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.2583732057416268,
        "top": 0.3283740701381509,
        "width": 0.0819377990430622,
        "height": 0.1902231668437832
      }
    },
    {
      "id": "moon",
      "label": "The large pot's crescent opens to the left.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.5657894736842105,
        "top": 0.6641870350690755,
        "width": 0.06638755980861244,
        "height": 0.09883103081827843
      }
    },
    {
      "id": "keyhole",
      "label": "The door's diamond keyhole becomes a heart.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.20514354066985646,
        "top": 0.22422954303931988,
        "width": 0.028110047846889953,
        "height": 0.06482465462274177
      }
    },
    {
      "id": "print",
      "label": "The can's printed daisy grows a hooked stem.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.45394736842105265,
        "top": 0.40063761955366634,
        "width": 0.023923444976076555,
        "height": 0.06057385759829968
      }
    },
    {
      "id": "heart",
      "label": "The blue heart on the overalls points upward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.35825358851674644,
        "top": 0.4314558979808714,
        "width": 0.028708133971291867,
        "height": 0.053134962805526036
      }
    }
  ]
},
{
  "id": "v4-dream-063",
  "title": "The Biscuit Train",
  "original": "/artwork/v4/collection/dream-063-original-v4.png",
  "altered": "/artwork/v4/collection/dream-063-altered-source-v4.png",
  "aspectRatio": 1671 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The locomotive biscuit mouth frowns.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.6283662477558348,
        "top": 0.36769394261424015,
        "width": 0.03231597845601436,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "change-2",
      "label": "The cab window crossbar rises diagonally.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.36385397965290245,
        "top": 0.27417640807651433,
        "width": 0.04009575104727708,
        "height": 0.077577045696068
      }
    },
    {
      "id": "change-3",
      "label": "The spoon bowl gleam curls into a spiral.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7857570317175344,
        "top": 0.7417640807651434,
        "width": 0.07959305804907241,
        "height": 0.09564293304994687
      }
    },
    {
      "id": "change-4",
      "label": "The mouse bow upper petal has a blue seam.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.48114901256732495,
        "top": 0.22741764080765142,
        "width": 0.022142429682824656,
        "height": 0.03719447396386823
      }
    },
    {
      "id": "change-5",
      "label": "The front gold wheel hub gleam forms a crescent.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.4506283662477558,
        "top": 0.4718384697130712,
        "width": 0.022740873728306403,
        "height": 0.04250797024442083
      }
    }
  ]
},
{
  "id": "v4-dream-030",
  "title": "The Little Comet Gardener",
  "original": "/artwork/v4/collection/dream-030-original-v4.png",
  "altered": "/artwork/v4/collection/dream-030-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "eye",
      "label": "The turtle opens its eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.8235645933014354,
        "top": 0.5143464399574921,
        "width": 0.060406698564593304,
        "height": 0.061636556854410204
      }
    },
    {
      "id": "vine",
      "label": "A vine threads through the watering can\u2019s handle.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.09389952153110048,
        "top": 0.3294367693942614,
        "width": 0.061004784688995214,
        "height": 0.10520722635494155
      }
    },
    {
      "id": "star",
      "label": "The coat\u2019s white star has a hollow center.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.2834928229665072,
        "top": 0.25398512221041447,
        "width": 0.041866028708133975,
        "height": 0.07863974495217853
      }
    },
    {
      "id": "crescent",
      "label": "The front pot\u2019s golden crescent opens to the left.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.36483253588516745,
        "top": 0.5260361317747078,
        "width": 0.037679425837320576,
        "height": 0.04782146652497343
      }
    },
    {
      "id": "rose",
      "label": "The watering-can nozzle holes form a spiral.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.17165071770334928,
        "top": 0.31562167906482463,
        "width": 0.035287081339712915,
        "height": 0.057385759829968117
      }
    }
  ]
},
{
  "id": "v4-dream-050",
  "title": "The River in the Piano",
  "original": "/artwork/v4/collection/dream-050-original-v4.png",
  "altered": "/artwork/v4/collection/dream-050-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "ring",
      "label": "The piano's crescent closes into a ring.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.44198564593301437,
        "top": 0.565356004250797,
        "width": 0.0430622009569378,
        "height": 0.08395324123273114
      }
    },
    {
      "id": "swan-head",
      "label": "The swan looks right over its shoulder.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.638755980861244,
        "top": 0.37300743889479276,
        "width": 0.04784688995215311,
        "height": 0.0765143464399575
      }
    },
    {
      "id": "ribbon-weave",
      "label": "The ribbon tail passes behind the music stand's rail.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.3654306220095694,
        "top": 0.46546227417640806,
        "width": 0.050239234449760764,
        "height": 0.13496280552603612
      }
    },
    {
      "id": "strut-clasp",
      "label": "A brass clasp wraps around the piano's lid support.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8498803827751196,
        "top": 0.179596174282678,
        "width": 0.03588516746411483,
        "height": 0.05844845908607864
      }
    },
    {
      "id": "bench-medallion",
      "label": "The bench's front medallion becomes a diamond.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.32894736842105265,
        "top": 0.9096705632306057,
        "width": 0.022129186602870814,
        "height": 0.044633368756641874
      }
    }
  ]
},
{
  "id": "v4-dream-066",
  "title": "The Banana Gondola",
  "original": "/artwork/v4/collection/dream-066-original-v4.png",
  "altered": "/artwork/v4/collection/dream-066-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The blue petal folds into a little boat.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.7667464114832536,
        "top": 0.6971307120085016,
        "width": 0.09928229665071771,
        "height": 0.1179596174282678
      }
    },
    {
      "id": "change-2",
      "label": "The red hat tassel threads through its own loop.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.2757177033492823,
        "top": 0.2879914984059511,
        "width": 0.050239234449760764,
        "height": 0.10414452709883103
      }
    },
    {
      "id": "change-3",
      "label": "The paddle ends in a broad curved blade.",
      "difficulty": "Hard",
      "edgeFade": 5,
      "box": {
        "left": 0.3253588516746411,
        "top": 0.6865037194473964,
        "width": 0.0819377990430622,
        "height": 0.14133900106269925
      }
    },
    {
      "id": "change-4",
      "label": "A crescent glows inside the lantern pane.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.11064593301435406,
        "top": 0.45164718384697133,
        "width": 0.03409090909090909,
        "height": 0.06907545164718384
      }
    },
    {
      "id": "change-5",
      "label": "A pale heart appears on the banana's black tip.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.6285885167464115,
        "top": 0.39638682252922425,
        "width": 0.02033492822966507,
        "height": 0.03506907545164718
      }
    }
  ]
},
{
  "id": "v4-dream-068",
  "title": "The Hat Full of Rainbows",
  "original": "/artwork/v4/collection/dream-068-original-v4.png",
  "altered": "/artwork/v4/collection/dream-068-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "tail-spiral",
      "label": "The walking lizard's tail curls into a spiral.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.47787081339712917,
        "top": 0.4569606801275239,
        "width": 0.0819377990430622,
        "height": 0.09351753453772582
      }
    },
    {
      "id": "arched-chair",
      "label": "The chair has an arched top rail.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.7816985645933014,
        "top": 0.25292242295430395,
        "width": 0.06160287081339713,
        "height": 0.08820403825717323
      }
    },
    {
      "id": "scarf-knots",
      "label": "The teal scarf's fringe forms knotted loops.",
      "difficulty": "Hard",
      "edgeFade": 5,
      "box": {
        "left": 0.1632775119617225,
        "top": 0.922422954303932,
        "width": 0.14832535885167464,
        "height": 0.07332624867162593
      }
    },
    {
      "id": "spool-groove",
      "label": "The spool has concentric grooves on its wooden end.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.23803827751196172,
        "top": 0.7885228480340064,
        "width": 0.03827751196172249,
        "height": 0.0924548352816153
      },
      "source": "/artwork/v4/collection/dream-068-refine-source-v4.png"
    },
    {
      "id": "buckle-tab",
      "label": "The hat buckle gains a fastening tongue on its left side.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.35645933014354064,
        "top": 0.11477151965993623,
        "width": 0.0430622009569378,
        "height": 0.06907545164718384
      }
    }
  ]
},
{
  "id": "v4-dream-069",
  "title": "The Sunflower Ferris Wheel",
  "original": "/artwork/v4/collection/dream-069-original-v4.png",
  "altered": "/artwork/v4/collection/dream-069-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "closed-gondola-door",
      "label": "The upper-right gondola's door swings closed.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.5155502392344498,
        "top": 0.1742826780021254,
        "width": 0.07416267942583732,
        "height": 0.14665249734325186
      }
    },
    {
      "id": "hub-crescent",
      "label": "The sunflower hub has a crescent instead of a heart.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.32177033492822965,
        "top": 0.3432518597236982,
        "width": 0.06698564593301436,
        "height": 0.10626992561105207
      },
      "source": "/artwork/v4/collection/dream-069-refine-source-v4.png"
    },
    {
      "id": "closed-fist",
      "label": "The top-left mouse closes its waving hand into a fist.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.2410287081339713,
        "top": 0.09670563230605739,
        "width": 0.028708133971291867,
        "height": 0.05100956429330499
      },
      "source": "/artwork/v4/collection/dream-069-hand-source-v4.png"
    },
    {
      "id": "stone-spiral",
      "label": "The nearest pink stone has an engraved spiral.",
      "difficulty": "Very hard",
      "edgeFade": 5,
      "box": {
        "left": 0.7715311004784688,
        "top": 0.8501594048884166,
        "width": 0.20035885167464115,
        "height": 0.10520722635494155
      }
    },
    {
      "id": "star-leaf-hole",
      "label": "The foreground leaf has a star-shaped hole.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.1076555023923445,
        "top": 0.8193411264612115,
        "width": 0.04066985645933014,
        "height": 0.0818278427205101
      }
    }
  ]
},
{
  "id": "v4-dream-071",
  "title": "The Blue Door's Reflection",
  "original": "/artwork/v4/collection/dream-071-original-v4.png",
  "altered": "/artwork/v4/collection/dream-071-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The mail-slot flap lies closed against the door.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.4599282296650718,
        "top": 0.38575982996811903,
        "width": 0.05861244019138756,
        "height": 0.06057385759829968
      }
    },
    {
      "id": "change-2",
      "label": "The doorknob is faceted.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.5227272727272727,
        "top": 0.34962805526036134,
        "width": 0.023923444976076555,
        "height": 0.039319872476089264
      }
    },
    {
      "id": "change-3",
      "label": "The door crescent faces the other way.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.46291866028708134,
        "top": 0.15834218916046758,
        "width": 0.04665071770334928,
        "height": 0.11052072263549416
      }
    },
    {
      "id": "change-4",
      "label": "The reflected track curves to the left.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4623205741626794,
        "top": 0.8756641870350691,
        "width": 0.07775119617224881,
        "height": 0.06588735387885228
      }
    },
    {
      "id": "change-5",
      "label": "The upper hinge has a diagonal central joint.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.41088516746411485,
        "top": 0.12433581296493093,
        "width": 0.025717703349282296,
        "height": 0.06907545164718384
      }
    }
  ]
},
{
  "id": "v4-dream-072",
  "title": "The Pomegranate Circus",
  "original": "/artwork/v4/collection/dream-072-original-v4.png",
  "altered": "/artwork/v4/collection/dream-072-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The blue flag droops downward.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.25299043062200954,
        "top": 0.21679064824654623,
        "width": 0.12619617224880383,
        "height": 0.20935175345377258
      }
    },
    {
      "id": "change-2",
      "label": "The flying mouse passes in front of the hoop's left edge.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.6214114832535885,
        "top": 0.5526036131774708,
        "width": 0.037679425837320576,
        "height": 0.08076514346439957
      }
    },
    {
      "id": "change-3",
      "label": "The white bow's right loop folds downward.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.9114832535885168,
        "top": 0.14027630180658873,
        "width": 0.06578947368421052,
        "height": 0.14240170031880978
      }
    },
    {
      "id": "change-4",
      "label": "The bell's clapper leans to the left.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7763157894736842,
        "top": 0.25823591923485656,
        "width": 0.038875598086124404,
        "height": 0.04569606801275239
      }
    },
    {
      "id": "change-5",
      "label": "The drum gold chevron dips at the center instead of rising.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.6566985645933014,
        "top": 0.7725823591923485,
        "width": 0.04844497607655503,
        "height": 0.08076514346439957
      }
    }
  ]
},
{
  "id": "v4-dream-073",
  "title": "The Garden of Spectacles",
  "original": "/artwork/v4/collection/dream-073-original-v4.png",
  "altered": "/artwork/v4/collection/dream-073-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "bench-cutout",
      "label": "The bench's heart cutout becomes a diamond.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.7057416267942583,
        "top": 0.7045696068012752,
        "width": 0.04007177033492823,
        "height": 0.06376195536663125
      }
    },
    {
      "id": "collar-knot",
      "label": "The rabbit's collar turns white.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.7446172248803827,
        "top": 0.4952178533475027,
        "width": 0.04485645933014354,
        "height": 0.04994686503719448
      }
    },
    {
      "id": "fountain-jet",
      "label": "The fountain jet arches to the left.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5598086124401914,
        "top": 0.4580233793836344,
        "width": 0.09150717703349283,
        "height": 0.16259298618490967
      }
    },
    {
      "id": "hinge",
      "label": "The spectacle hinge folds inward.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.20454545454545456,
        "top": 0.2146652497343252,
        "width": 0.03708133971291866,
        "height": 0.1179596174282678
      }
    },
    {
      "id": "spiral",
      "label": "The stone's spiral curls in the opposite direction.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.9013157894736842,
        "top": 0.5972369819341127,
        "width": 0.056818181818181816,
        "height": 0.08501594048884166
      }
    }
  ]
},
{
  "id": "v4-dream-075",
  "title": "The Teaspoon Skiers",
  "original": "/artwork/v4/collection/dream-075-original-v4.png",
  "altered": "/artwork/v4/collection/dream-075-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "star",
      "label": "The golden star has four points.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.5514354066985646,
        "top": 0.27523910733262485,
        "width": 0.11543062200956938,
        "height": 0.19128586609989373
      }
    },
    {
      "id": "scarf",
      "label": "The red scarf loops beneath the penguin's wing.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.3014354066985646,
        "top": 0.3942614240170032,
        "width": 0.060406698564593304,
        "height": 0.1339001062699256
      }
    },
    {
      "id": "ski-tip",
      "label": "The far green ski's inner curl becomes triangular.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.45753588516746413,
        "top": 0.7130712008501594,
        "width": 0.028110047846889953,
        "height": 0.05951115834218916
      }
    },
    {
      "id": "handle-brace",
      "label": "The mug handle has a diagonal brace.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.854066985645933,
        "top": 0.7236981934112646,
        "width": 0.07476076555023924,
        "height": 0.1275239107332625
      }
    },
    {
      "id": "mitten-pattern",
      "label": "The large red mitten's white pattern becomes wavy.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.08133971291866028,
        "top": 0.7417640807651434,
        "width": 0.05562200956937799,
        "height": 0.09670563230605739
      }
    }
  ]
},
{
  "id": "v4-dream-076",
  "title": "The Velvet Moon Hotel",
  "original": "/artwork/v4/collection/dream-076-original-v4.png",
  "altered": "/artwork/v4/collection/dream-076-altered-source-v4.png",
  "aspectRatio": 1671 / 941,
  "edits": [
    {
      "id": "cushion-ring",
      "label": "The chair's crescent cushion closes into a ring.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.8473967684021544,
        "top": 0.47927736450584485,
        "width": 0.05206463195691203,
        "height": 0.0924548352816153
      }
    },
    {
      "id": "minute-hand",
      "label": "The clock's long hand points downward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7504488330341114,
        "top": 0.1997874601487779,
        "width": 0.020945541591861162,
        "height": 0.1275239107332625
      }
    },
    {
      "id": "crest-tip",
      "label": "The bird's longest crest feather curls at its tip.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7241172950329144,
        "top": 0.35812964930924546,
        "width": 0.041891083183722325,
        "height": 0.044633368756641874
      }
    },
    {
      "id": "lantern-pin",
      "label": "The hanging lantern has a sideways fastening pin.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.3064033512866547,
        "top": 0.6461211477151966,
        "width": 0.028126870137642132,
        "height": 0.03719447396386823
      }
    },
    {
      "id": "tieback-loop",
      "label": "The curtain tieback forms an extra loop.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.9138240574506283,
        "top": 0.4027630180658874,
        "width": 0.02333931777378815,
        "height": 0.061636556854410204
      }
    }
  ]
},
{
  "id": "v4-dream-077",
  "title": "The Umbrella Inside the Hourglass",
  "original": "/artwork/v4/collection/dream-077-original-v4.png",
  "altered": "/artwork/v4/collection/dream-077-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "handle",
      "label": "The red umbrella handle bends into squared corners.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.0729665071770335,
        "top": 0.7683315621679064,
        "width": 0.07416267942583732,
        "height": 0.09564293304994687
      }
    },
    {
      "id": "canopy",
      "label": "The right umbrella panel has a scalloped lower edge.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.43720095693779903,
        "top": 0.5600425079702445,
        "width": 0.046052631578947366,
        "height": 0.11902231668437832
      }
    },
    {
      "id": "dial",
      "label": "The hourglass dial slot turns horizontal.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.527511961722488,
        "top": 0.7874601487778958,
        "width": 0.03229665071770335,
        "height": 0.06057385759829968
      }
    },
    {
      "id": "bow",
      "label": "The boot's right bow loop narrows behind the crossing lace.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7476076555023924,
        "top": 0.7077577045696068,
        "width": 0.050239234449760764,
        "height": 0.08607863974495218
      }
    },
    {
      "id": "pebble",
      "label": "The pebble's blue mark becomes a crescent.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.9072966507177034,
        "top": 0.8873538788522848,
        "width": 0.0215311004784689,
        "height": 0.03294367693942614
      }
    }
  ]
},
{
  "id": "v4-dream-080",
  "title": "The Drawer of Snow",
  "original": "/artwork/v4/collection/dream-080-original-v4.png",
  "altered": "/artwork/v4/collection/dream-080-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The lizard tail tip curls into a loop.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.7996411483253588,
        "top": 0.3783209351753454,
        "width": 0.03110047846889952,
        "height": 0.12858660998937302
      }
    },
    {
      "id": "change-2",
      "label": "The top drawer knob has a faceted outline.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.3815789473684211,
        "top": 0.19872476089266738,
        "width": 0.03648325358851675,
        "height": 0.06482465462274177
      }
    },
    {
      "id": "change-3",
      "label": "The thermos lid reflection forms a wave.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.13636363636363635,
        "top": 0.461211477151966,
        "width": 0.04366028708133971,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "change-4",
      "label": "The mitten snowflake becomes a hollow diamond.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7685406698564593,
        "top": 0.46439957492029754,
        "width": 0.02332535885167464,
        "height": 0.07013815090329437
      }
    },
    {
      "id": "change-5",
      "label": "The right sled runner curls outward.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.5759569377990431,
        "top": 0.5260361317747078,
        "width": 0.038875598086124404,
        "height": 0.06801275239107332
      }
    }
  ]
},
{
  "id": "v4-dream-081",
  "title": "The Umbrella Repair Shop",
  "original": "/artwork/v4/collection/dream-081-original-v4.png",
  "altered": "/artwork/v4/collection/dream-081-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The scissor right finger loop has an angular outline.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.6955741626794258,
        "top": 0.8437832093517534,
        "width": 0.08014354066985646,
        "height": 0.07120085015940489
      }
    },
    {
      "id": "change-2",
      "label": "The mug crescent opens upward.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.090311004784689,
        "top": 0.7821466524973433,
        "width": 0.046052631578947366,
        "height": 0.08926673751328375
      }
    },
    {
      "id": "change-3",
      "label": "The spool thread crosses diagonally.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.49940191387559807,
        "top": 0.7545164718384697,
        "width": 0.04844497607655503,
        "height": 0.09032943676939426
      }
    },
    {
      "id": "change-4",
      "label": "Only the left bottle lightning curls in an S.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.757177033492823,
        "top": 0.39744952178533477,
        "width": 0.02631578947368421,
        "height": 0.07013815090329437
      }
    },
    {
      "id": "change-5",
      "label": "The umbrella patch corners are rounded.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.3923444976076555,
        "top": 0.4622741764080765,
        "width": 0.09330143540669857,
        "height": 0.1849096705632306
      }
    }
  ]
},
{
  "id": "v4-dream-082",
  "title": "The Shadow's Shoes",
  "original": "/artwork/v4/collection/dream-082-original-v4.png",
  "altered": "/artwork/v4/collection/dream-082-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The front shoe buckle is oval.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.3875598086124402,
        "top": 0.7375132837407014,
        "width": 0.05382775119617225,
        "height": 0.06907545164718384
      }
    },
    {
      "id": "change-2",
      "label": "The hat shadow has a tall cylindrical crown.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.8397129186602871,
        "top": 0.06588735387885228,
        "width": 0.06279904306220095,
        "height": 0.09776833156216791
      }
    },
    {
      "id": "change-3",
      "label": "The shadow umbrella ribs curve across its canopy.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5035885167464115,
        "top": 0.01487778958554729,
        "width": 0.15669856459330145,
        "height": 0.1891604675876727
      }
    },
    {
      "id": "change-4",
      "label": "The shoehorn tip curves upward.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.31758373205741625,
        "top": 0.361317747077577,
        "width": 0.03827751196172249,
        "height": 0.06588735387885228
      }
    },
    {
      "id": "change-5",
      "label": "The glove thumb is shorter and bends inward.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.26913875598086123,
        "top": 0.40913921360255046,
        "width": 0.02033492822966507,
        "height": 0.06376195536663125
      }
    }
  ]
},
{
  "id": "v4-dream-083",
  "title": "The Pancake Observatory",
  "original": "/artwork/v4/collection/dream-083-original-v4.png",
  "altered": "/artwork/v4/collection/dream-083-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The large planet's syrup ring threads into its own loop.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.8869617224880383,
        "top": 0.11158342189160468,
        "width": 0.10107655502392345,
        "height": 0.11902231668437832
      }
    },
    {
      "id": "change-2",
      "label": "The butter pat rolls into a single scroll.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.26674641148325356,
        "top": 0.35812964930924546,
        "width": 0.07894736842105263,
        "height": 0.08926673751328375
      }
    },
    {
      "id": "change-3",
      "label": "The strawberry seeds follow a spiral.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.16626794258373206,
        "top": 0.31668437832093516,
        "width": 0.0729665071770335,
        "height": 0.11477151965993623
      }
    },
    {
      "id": "change-4",
      "label": "One fork tine curls inward.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.12320574162679426,
        "top": 0.17534537725823593,
        "width": 0.056818181818181816,
        "height": 0.1030818278427205
      }
    },
    {
      "id": "change-5",
      "label": "A pancake stack reflects inside the telescope lens.",
      "difficulty": "Dreamlike",
      "edgeFade": 2,
      "box": {
        "left": 0.4826555023923445,
        "top": 0.12646121147715197,
        "width": 0.01555023923444976,
        "height": 0.07013815090329437
      }
    }
  ]
},
{
  "id": "v4-dream-084",
  "title": "The Heron's Glasshouse",
  "original": "/artwork/v4/collection/dream-084-original-v4.png",
  "altered": "/artwork/v4/collection/dream-084-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "A heron is engraved on the watering can.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.05382775119617225,
        "top": 0.7173219978746015,
        "width": 0.09569377990430622,
        "height": 0.17747077577045697
      }
    },
    {
      "id": "change-2",
      "label": "The heron's long head plumes thread through their own knot.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.3199760765550239,
        "top": 0.32624867162592985,
        "width": 0.05562200956937799,
        "height": 0.12327311370882041
      }
    },
    {
      "id": "change-3",
      "label": "The lily's upper petal rolls into a tube.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7954545454545454,
        "top": 0.6461211477151966,
        "width": 0.049641148325358854,
        "height": 0.12008501594048884
      }
    },
    {
      "id": "change-4",
      "label": "The pot's rim crack forks into branches.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.9288277511961722,
        "top": 0.6301806588735388,
        "width": 0.042464114832535885,
        "height": 0.15621679064824653
      }
    },
    {
      "id": "change-5",
      "label": "A curved latch lever rises from the round window's center.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.16566985645933013,
        "top": 0.1434643995749203,
        "width": 0.04007177033492823,
        "height": 0.09458023379383634
      }
    }
  ]
},
{
  "id": "v4-dream-085",
  "title": "The Moon Behind the Coat",
  "original": "/artwork/v4/collection/dream-085-original-v4.png",
  "altered": "/artwork/v4/collection/dream-085-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The chair back has a keyhole-shaped opening.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.27212918660287083,
        "top": 0.6036131774707758,
        "width": 0.04066985645933014,
        "height": 0.0924548352816153
      }
    },
    {
      "id": "change-2",
      "label": "The left coat cuff threads through its own knot.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.3953349282296651,
        "top": 0.4059511158342189,
        "width": 0.05861244019138756,
        "height": 0.1179596174282678
      }
    },
    {
      "id": "change-3",
      "label": "The moon pocket's lip folds outward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5502392344497608,
        "top": 0.4399574920297556,
        "width": 0.06160287081339713,
        "height": 0.044633368756641874
      }
    },
    {
      "id": "change-4",
      "label": "A red heart is stitched near the coat hem.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5508373205741627,
        "top": 0.7109458023379384,
        "width": 0.03648325358851675,
        "height": 0.05526036131774708
      }
    },
    {
      "id": "change-5",
      "label": "The coat hook curls into a figure-eight loop.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.5035885167464115,
        "top": 0.012752391073326248,
        "width": 0.029904306220095694,
        "height": 0.07863974495217853
      }
    }
  ]
},
{
  "id": "v4-dream-086",
  "title": "The Pear-Slice Playground",
  "original": "/artwork/v4/collection/dream-086-original-v4.png",
  "altered": "/artwork/v4/collection/dream-086-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The ball's white band zigzags.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.8588516746411483,
        "top": 0.2869287991498406,
        "width": 0.05861244019138756,
        "height": 0.10945802337938364
      }
    },
    {
      "id": "change-2",
      "label": "The ladder's third rung sags in the middle.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.159688995215311,
        "top": 0.2667375132837407,
        "width": 0.0861244019138756,
        "height": 0.07226354941551541
      }
    },
    {
      "id": "change-3",
      "label": "The paper hat's tip folds downward.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5771531100478469,
        "top": 0.46865037194473963,
        "width": 0.06638755980861244,
        "height": 0.10414452709883103
      }
    },
    {
      "id": "change-4",
      "label": "The frog raises one foreleg.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8666267942583732,
        "top": 0.7778958554729012,
        "width": 0.05083732057416268,
        "height": 0.08395324123273114
      }
    },
    {
      "id": "change-5",
      "label": "The bell's clapper tilts to the right.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.5113636363636364,
        "top": 0.41339001062699254,
        "width": 0.02452153110047847,
        "height": 0.04250797024442083
      }
    }
  ]
},
{
  "id": "v4-dream-087",
  "title": "The Portrait That Dreamed",
  "original": "/artwork/v4/collection/dream-087-original-v4.png",
  "altered": "/artwork/v4/collection/dream-087-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The lampshade trim has angular zigzags.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.03229665071770335,
        "top": 0.3985122210414453,
        "width": 0.19138755980861244,
        "height": 0.08395324123273114
      }
    },
    {
      "id": "change-2",
      "label": "The butterfly book clasp folds its wings together.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.5454545454545454,
        "top": 0.8490967056323061,
        "width": 0.04066985645933014,
        "height": 0.077577045696068
      }
    },
    {
      "id": "change-3",
      "label": "A crescent glows in the garden water reflection.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6854066985645934,
        "top": 0.5823591923485654,
        "width": 0.049641148325358854,
        "height": 0.077577045696068
      }
    },
    {
      "id": "change-4",
      "label": "The pearl earring is teardrop shaped.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.37679425837320574,
        "top": 0.4495217853347503,
        "width": 0.019138755980861243,
        "height": 0.04782146652497343
      }
    },
    {
      "id": "change-5",
      "label": "The garden bird opens its beak.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.7320574162679426,
        "top": 0.24654622741764082,
        "width": 0.02033492822966507,
        "height": 0.03719447396386823
      }
    }
  ]
},
{
  "id": "v4-dream-089",
  "title": "The Raspberry Rocket",
  "original": "/artwork/v4/collection/dream-089-original-v4.png",
  "altered": "/artwork/v4/collection/dream-089-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "scarf-loop",
      "label": "The red scarf curls into a loop.",
      "difficulty": "Easy",
      "edgeFade": 6,
      "box": {
        "left": 0.35645933014354064,
        "top": 0.21147715196599362,
        "width": 0.1339712918660287,
        "height": 0.1339001062699256
      }
    },
    {
      "id": "moon-reflection",
      "label": "The porthole reflects a cream crescent instead of clouds.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.5998803827751196,
        "top": 0.3198724760892667,
        "width": 0.0867224880382775,
        "height": 0.14771519659936239
      }
    },
    {
      "id": "nose-bands",
      "label": "The nose cone has gold bands.",
      "difficulty": "Hard",
      "edgeFade": 5,
      "box": {
        "left": 0.7135167464114832,
        "top": 0.1785334750265675,
        "width": 0.10227272727272728,
        "height": 0.1902231668437832
      }
    },
    {
      "id": "mouse-eye",
      "label": "The mouse opens its left eye.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5089712918660287,
        "top": 0.1902231668437832,
        "width": 0.026913875598086126,
        "height": 0.04357066950053135
      }
    },
    {
      "id": "fin-veins",
      "label": "The foreground leaf fin's veins curve into loops.",
      "difficulty": "Dreamlike",
      "edgeFade": 5,
      "box": {
        "left": 0.3570574162679426,
        "top": 0.44739638682252925,
        "width": 0.14832535885167464,
        "height": 0.24229543039319873
      }
    }
  ]
},
{
  "id": "v4-dream-079",
  "title": "The Harp of Branches",
  "original": "/artwork/v4/collection/dream-079-original-v4.png",
  "altered": "/artwork/v4/collection/dream-079-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "scroll",
      "label": "The harp's lower frame curls into an upright scroll.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.3845693779904306,
        "top": 0.5132837407013815,
        "width": 0.05083732057416268,
        "height": 0.12114771519659936
      }
    },
    {
      "id": "ribbon",
      "label": "The right ribbon tail curls into a closed loop.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.6094497607655502,
        "top": 0.27948990435706694,
        "width": 0.05801435406698564,
        "height": 0.11689691817215728
      }
    },
    {
      "id": "mouth",
      "label": "The fox opens its mouth to sing.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.2111244019138756,
        "top": 0.42720510095642933,
        "width": 0.03588516746411483,
        "height": 0.0563230605738576
      }
    },
    {
      "id": "acorn",
      "label": "The hanging acorn points upward.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6369617224880383,
        "top": 0.12646121147715197,
        "width": 0.03409090909090909,
        "height": 0.0818278427205101
      }
    },
    {
      "id": "reflection",
      "label": "A closed bud appears beneath the nearest right lotus.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.8444976076555024,
        "top": 0.9117959617428267,
        "width": 0.049641148325358854,
        "height": 0.05951115834218916
      }
    }
  ]
},
{
  "id": "v4-dream-088",
  "title": "The River's Thread",
  "original": "/artwork/v4/collection/dream-088-original-v4.png",
  "altered": "/artwork/v4/collection/dream-088-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The blue rock patch is round.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.8672248803827751,
        "top": 0.8320935175345378,
        "width": 0.04844497607655503,
        "height": 0.0818278427205101
      }
    },
    {
      "id": "change-2",
      "label": "The glove's white thumb bends upward.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.125,
        "top": 0.6514346439957492,
        "width": 0.08313397129186603,
        "height": 0.17640807651434645
      }
    },
    {
      "id": "change-3",
      "label": "The spool opening is keyhole shaped.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.2494019138755981,
        "top": 0.10520722635494155,
        "width": 0.02751196172248804,
        "height": 0.10201912858660998
      }
    },
    {
      "id": "change-4",
      "label": "The bent needle tip forms a closed loop.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.15311004784688995,
        "top": 0.8469713071200851,
        "width": 0.05263157894736842,
        "height": 0.07332624867162593
      }
    },
    {
      "id": "change-5",
      "label": "A crescent appears in the river reflection under the bridge.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.6453349282296651,
        "top": 0.4527098831030818,
        "width": 0.04724880382775119,
        "height": 0.052072263549415514
      }
    }
  ]
},
{
  "id": "v4-dream-090",
  "title": "The Badger's Fog Ferry",
  "original": "/artwork/v4/collection/dream-090-original-v4.png",
  "altered": "/artwork/v4/collection/dream-090-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "anchor-fluke",
      "label": "The anchor's right fluke points downward.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.1423444976076555,
        "top": 0.620616365568544,
        "width": 0.07416267942583732,
        "height": 0.10626992561105207
      }
    },
    {
      "id": "braided-tassel",
      "label": "The orange mast tassel is braided.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.13157894736842105,
        "top": 0.19341126461211477,
        "width": 0.06160287081339713,
        "height": 0.15834218916046758
      }
    },
    {
      "id": "badger-eye",
      "label": "The badger closes its visible eye.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4258373205741627,
        "top": 0.3230605738575983,
        "width": 0.02452153110047847,
        "height": 0.03400637619553666
      }
    },
    {
      "id": "square-patch",
      "label": "The badger's sleeve patch sits square.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.3708133971291866,
        "top": 0.44314558979808716,
        "width": 0.04126794258373206,
        "height": 0.06907545164718384
      }
    },
    {
      "id": "moon-embroidery",
      "label": "The sail's crescent has gold vine embroidery.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.23863636363636365,
        "top": 0.10626992561105207,
        "width": 0.08971291866028708,
        "height": 0.19766206163655686
      },
      "source": "/artwork/v4/collection/dream-090-moon-selected-source-v4.png"
    }
  ]
},
{
  "id": "v4-dream-095",
  "title": "The Tangerine Tuba",
  "original": "/artwork/v4/collection/dream-095-original-v4.png",
  "altered": "/artwork/v4/collection/dream-095-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The orange bell's segments curl into a spiral.",
      "difficulty": "Easy",
      "edgeFade": 6,
      "box": {
        "left": 0.4407894736842105,
        "top": 0.04144527098831031,
        "width": 0.10825358851674641,
        "height": 0.3698193411264612
      }
    },
    {
      "id": "change-2",
      "label": "A wooden gate lowers inside the bridge arch.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.7452153110047847,
        "top": 0.5557917109458024,
        "width": 0.10047846889952153,
        "height": 0.07013815090329437
      }
    },
    {
      "id": "change-3",
      "label": "The large lily pad on the right rolls into a tube.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7924641148325359,
        "top": 0.7789585547290117,
        "width": 0.10645933014354067,
        "height": 0.06269925611052073
      }
    },
    {
      "id": "change-4",
      "label": "The stool seat has a crescent-shaped opening.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.05143540669856459,
        "top": 0.7098831030818279,
        "width": 0.05083732057416268,
        "height": 0.04250797024442083
      }
    },
    {
      "id": "change-5",
      "label": "Leaf veins branch inside the vest's heart emblem.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.25,
        "top": 0.49415515409139216,
        "width": 0.04425837320574163,
        "height": 0.06907545164718384
      }
    }
  ]
},
{
  "id": "v4-dream-096",
  "title": "The Clock in the Lily",
  "original": "/artwork/v4/collection/dream-096-original-v4.png",
  "altered": "/artwork/v4/collection/dream-096-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The upper lily petal tip rolls inward into a tube.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.5496411483253588,
        "top": 0.1030818278427205,
        "width": 0.07535885167464115,
        "height": 0.19659936238044634
      }
    },
    {
      "id": "change-2",
      "label": "The antler's gold ring threads into a figure-eight loop.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.8732057416267942,
        "top": 0.39107332624867164,
        "width": 0.029904306220095694,
        "height": 0.09032943676939426
      }
    },
    {
      "id": "change-3",
      "label": "Concentric rings circle the clock face.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.29784688995215314,
        "top": 0.22422954303931988,
        "width": 0.08133971291866028,
        "height": 0.1487778958554729
      }
    },
    {
      "id": "change-4",
      "label": "The gate's diamond latch opens on its hinge.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.36782296650717705,
        "top": 0.4505844845908608,
        "width": 0.02930622009569378,
        "height": 0.0563230605738576
      }
    },
    {
      "id": "change-5",
      "label": "The foreground lily pad veins curl into a spiral.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.2230861244019139,
        "top": 0.8278427205100957,
        "width": 0.12021531100478469,
        "height": 0.04994686503719448
      }
    }
  ]
},
{
  "id": "v4-dream-078",
  "title": "The Peach Pit Planetarium",
  "original": "/artwork/v4/collection/dream-078-original-v4.png",
  "altered": "/artwork/v4/collection/dream-078-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "cap",
      "label": "The red telescope cap becomes hexagonal.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.5891148325358851,
        "top": 0.383634431455898,
        "width": 0.05502392344497608,
        "height": 0.14027630180658873
      }
    },
    {
      "id": "moon",
      "label": "The hanging crescent opens downward.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.23624401913875598,
        "top": 0.30818278427205104,
        "width": 0.049641148325358854,
        "height": 0.09351753453772582
      }
    },
    {
      "id": "page",
      "label": "The folded page corner curls up from the book.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.2930622009569378,
        "top": 0.7077577045696068,
        "width": 0.04126794258373206,
        "height": 0.077577045696068
      }
    },
    {
      "id": "lantern",
      "label": "The lantern's star becomes a crescent.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.15370813397129188,
        "top": 0.5929861849096706,
        "width": 0.02631578947368421,
        "height": 0.0563230605738576
      }
    },
    {
      "id": "buckle",
      "label": "The telescope strap's square buckle becomes a ring.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.47368421052631576,
        "top": 0.536663124335813,
        "width": 0.02332535885167464,
        "height": 0.04994686503719448
      }
    }
  ]
},
{
  "id": "v4-dream-091",
  "title": "The Room at the End of the Ribbon",
  "original": "/artwork/v4/collection/dream-091-original-v4.png",
  "altered": "/artwork/v4/collection/dream-091-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "key-eight",
      "label": "The floating key has a two-loop handle.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.43241626794258375,
        "top": 0.4357066950053135,
        "width": 0.05382775119617225,
        "height": 0.10520722635494155
      }
    },
    {
      "id": "climber-scarf",
      "label": "The paper climber's scarf curls into a loop.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.38636363636363635,
        "top": 0.6195536663124336,
        "width": 0.09389952153110048,
        "height": 0.09458023379383634
      }
    },
    {
      "id": "reflected-door",
      "label": "The door's reflection stands ajar.",
      "difficulty": "Hard",
      "edgeFade": 5,
      "box": {
        "left": 0.6142344497607656,
        "top": 0.8108395324123273,
        "width": 0.060406698564593304,
        "height": 0.12646121147715197
      },
      "source": "/artwork/v4/collection/dream-091-star-refine-source-v4.png"
    },
    {
      "id": "rug-loops",
      "label": "The room rug has looped fringe.",
      "difficulty": "Very hard",
      "edgeFade": 5,
      "box": {
        "left": 0.5227272727272727,
        "top": 0.5982996811902231,
        "width": 0.11124401913875598,
        "height": 0.09883103081827843
      }
    },
    {
      "id": "chair-slats",
      "label": "The chair back has two upright slats instead of three.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.6973684210526315,
        "top": 0.4197662061636557,
        "width": 0.042464114832535885,
        "height": 0.07332624867162593
      }
    }
  ]
},
{
  "id": "v4-dream-097",
  "title": "The Folded Sea",
  "original": "/artwork/v4/collection/dream-097-original-v4.png",
  "altered": "/artwork/v4/collection/dream-097-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The cloth hem threads through its own knot.",
      "difficulty": "Easy",
      "edgeFade": 7,
      "box": {
        "left": 0.0651913875598086,
        "top": 0.7013815090329437,
        "width": 0.11961722488038277,
        "height": 0.2316684378320935
      }
    },
    {
      "id": "change-2",
      "label": "One end of the paper boat curls into a loop.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.8726076555023924,
        "top": 0.5483528161530287,
        "width": 0.046052631578947366,
        "height": 0.07120085015940489
      }
    },
    {
      "id": "change-3",
      "label": "A foamy wave crest curls into a spiral.",
      "difficulty": "Hard",
      "edgeFade": 5,
      "box": {
        "left": 0.2811004784688995,
        "top": 0.4165781083953241,
        "width": 0.08791866028708134,
        "height": 0.1434643995749203
      }
    },
    {
      "id": "change-4",
      "label": "The chest lock has a keyhole-shaped opening.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8893540669856459,
        "top": 0.820403825717322,
        "width": 0.01674641148325359,
        "height": 0.05100956429330499
      }
    },
    {
      "id": "change-5",
      "label": "An inner round mullion circles the small house window.",
      "difficulty": "Dreamlike",
      "edgeFade": 2,
      "box": {
        "left": 0.6590909090909091,
        "top": 0.2051009564293305,
        "width": 0.020933014354066987,
        "height": 0.039319872476089264
      }
    }
  ]
},
{
  "id": "v4-dream-101",
  "title": "The Telephone That Grew Leaves",
  "original": "/artwork/v4/collection/dream-101-original-v4.png",
  "altered": "/artwork/v4/collection/dream-101-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The rightmost leaf tip curls upward.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.6734449760765551,
        "top": 0.6992561105207227,
        "width": 0.12320574162679426,
        "height": 0.12964930924548354
      }
    },
    {
      "id": "change-2",
      "label": "The tassel fringe curls upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.22966507177033493,
        "top": 0.8554729011689692,
        "width": 0.07236842105263158,
        "height": 0.08395324123273114
      }
    },
    {
      "id": "change-3",
      "label": "The rotary dial stop points inward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4988038277511962,
        "top": 0.5696068012752391,
        "width": 0.06638755980861244,
        "height": 0.07863974495217853
      }
    },
    {
      "id": "change-4",
      "label": "The upper receiver grille holes form an X.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.38516746411483255,
        "top": 0.23379383634431455,
        "width": 0.03827751196172249,
        "height": 0.061636556854410204
      }
    },
    {
      "id": "change-5",
      "label": "The cord forms a small loop before the tassel.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.1901913875598086,
        "top": 0.7927736450584485,
        "width": 0.04665071770334928,
        "height": 0.06269925611052073
      }
    }
  ]
},
{
  "id": "v4-dream-098",
  "title": "The Honeycomb Railway",
  "original": "/artwork/v4/collection/dream-098-original-v4.png",
  "altered": "/artwork/v4/collection/dream-098-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The flag has a rounded fly edge.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.659688995215311,
        "top": 0.1594048884165781,
        "width": 0.06997607655502393,
        "height": 0.0924548352816153
      }
    },
    {
      "id": "change-2",
      "label": "The front wheel has curved spiral spokes.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.340311004784689,
        "top": 0.22954303931987247,
        "width": 0.03827751196172249,
        "height": 0.0669500531349628
      }
    },
    {
      "id": "change-3",
      "label": "The hanging honey drop curls right.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.2631578947368421,
        "top": 0.39213602550478216,
        "width": 0.034688995215311005,
        "height": 0.08926673751328375
      }
    },
    {
      "id": "change-4",
      "label": "The headlamp reflects a blue cloud.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.28588516746411485,
        "top": 0.1381509032943677,
        "width": 0.029904306220095694,
        "height": 0.057385759829968117
      }
    },
    {
      "id": "change-5",
      "label": "The butterfly wing has one blue oval spot.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.23026315789473684,
        "top": 0.077577045696068,
        "width": 0.028110047846889953,
        "height": 0.057385759829968117
      }
    }
  ]
},
{
  "id": "v4-dream-100",
  "title": "The Window in the Sandal",
  "original": "/artwork/v4/collection/dream-100-original-v4.png",
  "altered": "/artwork/v4/collection/dream-100-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The buckle pin points down to the lower strap.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.22667464114832536,
        "top": 0.2592986184909671,
        "width": 0.03648325358851675,
        "height": 0.10201912858660998
      }
    },
    {
      "id": "change-2",
      "label": "The open shutter has a diagonal central bar.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.43480861244019137,
        "top": 0.38788522848034007,
        "width": 0.02930622009569378,
        "height": 0.0818278427205101
      }
    },
    {
      "id": "change-3",
      "label": "The parcel bow forms a figure eight.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.28648325358851673,
        "top": 0.7151965993623804,
        "width": 0.06399521531100479,
        "height": 0.06057385759829968
      }
    },
    {
      "id": "change-4",
      "label": "The mug has a vertical blue stripe.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7787081339712919,
        "top": 0.6535600425079703,
        "width": 0.030502392344497607,
        "height": 0.05100956429330499
      }
    },
    {
      "id": "change-5",
      "label": "The front parasol panel has a chevron fold.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.7685406698564593,
        "top": 0.48034006376195537,
        "width": 0.03588516746411483,
        "height": 0.09139213602550478
      }
    }
  ]
},
{
  "id": "v4-dream-102",
  "title": "The Violinist on the Moonfish",
  "original": "/artwork/v4/collection/dream-102-original-v4.png",
  "altered": "/artwork/v4/collection/dream-102-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The violin case is open.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.4072966507177033,
        "top": 0.3283740701381509,
        "width": 0.13576555023923445,
        "height": 0.1636556854410202
      }
    },
    {
      "id": "change-2",
      "label": "The fish tail bears a gold star.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.23086124401913877,
        "top": 0.3336875664187035,
        "width": 0.04904306220095694,
        "height": 0.11052072263549416
      }
    },
    {
      "id": "change-3",
      "label": "The ribbon's far-left tip curls into a loop.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.14952153110047847,
        "top": 0.052072263549415514,
        "width": 0.15789473684210525,
        "height": 0.11158342189160468
      }
    },
    {
      "id": "change-4",
      "label": "The fish opens its mouth.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.881578947368421,
        "top": 0.5982996811902231,
        "width": 0.04366028708133971,
        "height": 0.11689691817215728
      }
    },
    {
      "id": "change-5",
      "label": "The pearl hair ornament is teardrop shaped.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.5795454545454546,
        "top": 0.1392136025504782,
        "width": 0.01854066985645933,
        "height": 0.03825717321997875
      }
    }
  ]
},
{
  "id": "v4-dream-107",
  "title": "The Curtain of Small Oceans",
  "original": "/artwork/v4/collection/dream-107-original-v4.png",
  "altered": "/artwork/v4/collection/dream-107-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The blue floor tile opens on a hinge.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.8373205741626795,
        "top": 0.8023379383634431,
        "width": 0.1255980861244019,
        "height": 0.155154091392136
      }
    },
    {
      "id": "change-2",
      "label": "The red curtain ribbon threads through its own knot.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.10466507177033493,
        "top": 0.46546227417640806,
        "width": 0.08074162679425838,
        "height": 0.23485653560042508
      }
    },
    {
      "id": "change-3",
      "label": "The chair seat's white band threads through its own knot.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.756578947368421,
        "top": 0.6482465462274176,
        "width": 0.09270334928229665,
        "height": 0.08076514346439957
      }
    },
    {
      "id": "change-4",
      "label": "A wave between the central curtains curls into a spiral.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.4019138755980861,
        "top": 0.46971307120085015,
        "width": 0.05741626794258373,
        "height": 0.12646121147715197
      }
    },
    {
      "id": "change-5",
      "label": "The left frame foot has a keyhole-shaped cutout.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.16148325358851676,
        "top": 0.7502656748140276,
        "width": 0.025717703349282296,
        "height": 0.0765143464399575
      }
    }
  ]
},
{
  "id": "v4-dream-108",
  "title": "The Stag's Velvet Library",
  "original": "/artwork/v4/collection/dream-108-original-v4.png",
  "altered": "/artwork/v4/collection/dream-108-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The scarf\u2019s free tail crosses the deer\u2019s back.",
      "difficulty": "Easy",
      "edgeFade": 7,
      "box": {
        "left": 0.31758373205741625,
        "top": 0.5685441020191286,
        "width": 0.37978468899521534,
        "height": 0.3007438894792774
      }
    },
    {
      "id": "change-2",
      "label": "The large mushroom cap rim rolls upward.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.8110047846889952,
        "top": 0.7151965993623804,
        "width": 0.16507177033492823,
        "height": 0.1594048884165781
      }
    },
    {
      "id": "change-3",
      "label": "A tree with curled roots is embossed on the upper coral book.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.17165071770334928,
        "top": 0.09139213602550478,
        "width": 0.07834928229665072,
        "height": 0.1594048884165781
      }
    },
    {
      "id": "change-4",
      "label": "The foreground purple book clasp opens on its hinge.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.27870813397129185,
        "top": 0.7991498405951116,
        "width": 0.037679425837320576,
        "height": 0.09351753453772582
      }
    },
    {
      "id": "change-5",
      "label": "The antler's crescent pendant turns into a thin oval hoop.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.5478468899521531,
        "top": 0.32624867162592985,
        "width": 0.049641148325358854,
        "height": 0.09670563230605739
      }
    }
  ]
},
{
  "id": "v4-dream-110",
  "title": "The Staircase in the Sleeve",
  "original": "/artwork/v4/collection/dream-110-original-v4.png",
  "altered": "/artwork/v4/collection/dream-110-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "chair-slats",
      "label": "The purple chair has upright back slats.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.13875598086124402,
        "top": 0.5324123273113709,
        "width": 0.07236842105263158,
        "height": 0.15196599362380447
      }
    },
    {
      "id": "bird-wings",
      "label": "The paper bird lowers its wings.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.5299043062200957,
        "top": 0.4218916046758767,
        "width": 0.08732057416267942,
        "height": 0.1073326248671626
      }
    },
    {
      "id": "diamond-cloth",
      "label": "The slipper's blue cloth has diamond checks.",
      "difficulty": "Hard",
      "edgeFade": 5,
      "box": {
        "left": 0.6907894736842105,
        "top": 0.8076514346439958,
        "width": 0.08552631578947369,
        "height": 0.09670563230605739
      }
    },
    {
      "id": "watch-hand",
      "label": "The pocket watch's long hand points downward.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5723684210526315,
        "top": 0.11477151965993623,
        "width": 0.039473684210526314,
        "height": 0.07120085015940489
      }
    },
    {
      "id": "slipper-keyhole",
      "label": "The slipper toe has a keyhole-shaped opening.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.5849282296650717,
        "top": 0.8235919234856536,
        "width": 0.03349282296650718,
        "height": 0.05100956429330499
      }
    }
  ]
},
{
  "id": "v4-dream-105",
  "title": "The Seahorse Carousel",
  "original": "/artwork/v4/collection/dream-105-original-v4.png",
  "altered": "/artwork/v4/collection/dream-105-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "tail",
      "label": "The central seahorse's tail curls farther to the right.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.47906698564593303,
        "top": 0.61211477151966,
        "width": 0.0867224880382775,
        "height": 0.09351753453772582
      }
    },
    {
      "id": "lantern",
      "label": "The left large lantern has horizontal bands instead of diamond lattice.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.40131578947368424,
        "top": 0.30924548352816156,
        "width": 0.04066985645933014,
        "height": 0.07120085015940489
      }
    },
    {
      "id": "pearl",
      "label": "The pearl in the small shell becomes a teardrop.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.881578947368421,
        "top": 0.844845908607864,
        "width": 0.041866028708133975,
        "height": 0.08289054197662062
      }
    },
    {
      "id": "saddle",
      "label": "The central saddle's pattern becomes a butterfly motif.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5089712918660287,
        "top": 0.46971307120085015,
        "width": 0.04485645933014354,
        "height": 0.07438894792773645
      }
    },
    {
      "id": "lock",
      "label": "The shell lock has a horizontal slot instead of a keyhole.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.5203349282296651,
        "top": 0.8235919234856536,
        "width": 0.025119617224880382,
        "height": 0.04250797024442083
      }
    }
  ]
},
{
  "id": "v4-dream-099",
  "title": "The Pearl Diver's Umbrella",
  "original": "/artwork/v4/collection/dream-099-original-v4.png",
  "altered": "/artwork/v4/collection/dream-099-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The foreground shell ribs curl into a spiral.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.0005980861244019139,
        "top": 0.769394261424017,
        "width": 0.1118421052631579,
        "height": 0.1689691817215728
      }
    },
    {
      "id": "change-2",
      "label": "The umbrella moon points upward.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.6848086124401914,
        "top": 0.077577045696068,
        "width": 0.04485645933014354,
        "height": 0.06801275239107332
      }
    },
    {
      "id": "closed-hand",
      "label": "The diver closes her outstretched empty hand into a fist.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.17822966507177032,
        "top": 0.4771519659936238,
        "width": 0.06399521531100479,
        "height": 0.05526036131774708
      },
      "source": "/artwork/v4/collection/dream-099-hand-native-source-source-v4.png"
    },
    {
      "id": "change-3",
      "label": "The blue pearl reflects a stone arch.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5699760765550239,
        "top": 0.1997874601487779,
        "width": 0.03588516746411483,
        "height": 0.061636556854410204
      }
    },
    {
      "id": "change-4",
      "label": "The cloak brooch has a diagonal pin.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.3977272727272727,
        "top": 0.4314558979808714,
        "width": 0.023923444976076555,
        "height": 0.04357066950053135
      }
    }
  ]
},
{
  "id": "v4-dream-092",
  "title": "The Waffle Windmill",
  "original": "/artwork/v4/collection/dream-092-original-v4.png",
  "altered": "/artwork/v4/collection/dream-092-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "window-cross",
      "label": "The round window cross turns diagonally.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.4043062200956938,
        "top": 0.3336875664187035,
        "width": 0.046052631578947366,
        "height": 0.09139213602550478
      }
    },
    {
      "id": "diamond-seed",
      "label": "The cream-ringed strawberry seed becomes a diamond.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.14952153110047847,
        "top": 0.7800212539851222,
        "width": 0.034688995215311005,
        "height": 0.07438894792773645
      }
    },
    {
      "id": "open-fox-eye",
      "label": "The fox opens its eye.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7745215311004785,
        "top": 0.49946865037194477,
        "width": 0.017344497607655503,
        "height": 0.030818278427205102
      }
    },
    {
      "id": "slotted-axle",
      "label": "The windmill axle cap has a horizontal screw slot.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.409688995215311,
        "top": 0.1849096705632306,
        "width": 0.028708133971291867,
        "height": 0.04994686503719448
      }
    },
    {
      "id": "waffle-brace",
      "label": "One blue waffle cell gains a diagonal brace.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.5287081339712919,
        "top": 0.025504782146652496,
        "width": 0.030502392344497607,
        "height": 0.04357066950053135
      }
    }
  ]
},
{
  "id": "v4-dream-093",
  "title": "The Paper Swan's Tailor",
  "original": "/artwork/v4/collection/dream-093-original-v4.png",
  "altered": "/artwork/v4/collection/dream-093-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "open-eye",
      "label": "The paper swan opens its golden eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.7440191387559809,
        "top": 0.14558979808714134,
        "width": 0.02452153110047847,
        "height": 0.04782146652497343
      }
    },
    {
      "id": "thimble-crescent",
      "label": "The thimble carries a crescent instead of a star.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.3038277511961722,
        "top": 0.8065887353878852,
        "width": 0.035287081339712915,
        "height": 0.07013815090329437
      }
    },
    {
      "id": "upright-handle",
      "label": "The upper scissors handle stands upright.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.40370813397129185,
        "top": 0.8257173219978746,
        "width": 0.04665071770334928,
        "height": 0.07332624867162593
      }
    },
    {
      "id": "horizontal-wrap",
      "label": "One spool winding runs horizontally.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.07057416267942583,
        "top": 0.6822529224229543,
        "width": 0.06698564593301436,
        "height": 0.025504782146652496
      }
    },
    {
      "id": "thread-loop",
      "label": "The sewing thread loops around the paper point.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.4700956937799043,
        "top": 0.32518597236981933,
        "width": 0.022129186602870814,
        "height": 0.039319872476089264
      }
    }
  ]
},
{
  "id": "v4-dream-094",
  "title": "The Ladder That Became Rain",
  "original": "/artwork/v4/collection/dream-094-original-v4.png",
  "altered": "/artwork/v4/collection/dream-094-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "pendant-diamond",
      "label": "The hanging gold disc becomes a diamond.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.7930622009569378,
        "top": 0.153028692879915,
        "width": 0.04844497607655503,
        "height": 0.11370882040382571
      }
    },
    {
      "id": "sloping-rung",
      "label": "The blue ladder rung slopes upward to the right.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.46351674641148327,
        "top": 0.3708820403825717,
        "width": 0.05741626794258373,
        "height": 0.06588735387885228
      }
    },
    {
      "id": "hooked-handle",
      "label": "The watering-can handle hooks around the ladder rail.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5233253588516746,
        "top": 0.11902231668437832,
        "width": 0.05442583732057416,
        "height": 0.05419766206163656
      }
    },
    {
      "id": "sloping-boot-band",
      "label": "The boot band slopes down to the right.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7577751196172249,
        "top": 0.5717321997874601,
        "width": 0.04904306220095694,
        "height": 0.04782146652497343
      }
    },
    {
      "id": "reflection-curl",
      "label": "The reflected handrail ends in a spiral curl.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.5651913875598086,
        "top": 0.9139213602550478,
        "width": 0.03827751196172249,
        "height": 0.06057385759829968
      }
    }
  ]
},
{
  "id": "v4-dream-103",
  "title": "The Macaron Meadow",
  "original": "/artwork/v4/collection/dream-103-original-v4.png",
  "altered": "/artwork/v4/collection/dream-103-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The butter square turns into a diamond.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.8289473684210527,
        "top": 0.361317747077577,
        "width": 0.05801435406698564,
        "height": 0.09883103081827843
      }
    },
    {
      "id": "change-2",
      "label": "The cup handle opens at the bottom.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.8433014354066986,
        "top": 0.8119022316684378,
        "width": 0.03349282296650718,
        "height": 0.08076514346439957
      }
    },
    {
      "id": "change-3",
      "label": "The upper scarf tail folds downward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.26435406698564595,
        "top": 0.4218916046758767,
        "width": 0.05083732057416268,
        "height": 0.10095642933049948
      }
    },
    {
      "id": "change-4",
      "label": "The front waterfall curls into an upward wave crest.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5430622009569378,
        "top": 0.6110520722635494,
        "width": 0.07177033492822966,
        "height": 0.15727948990435706
      }
    },
    {
      "id": "change-5",
      "label": "The basket button has one vertical slot.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.909688995215311,
        "top": 0.7151965993623804,
        "width": 0.03827751196172249,
        "height": 0.061636556854410204
      }
    }
  ]
},
{
  "id": "v4-dream-109",
  "title": "The Kiwi Rowing Club",
  "original": "/artwork/v4/collection/dream-109-original-v4.png",
  "altered": "/artwork/v4/collection/dream-109-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The front blue paddle has a hollow cupped blade.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.3277511961722488,
        "top": 0.6269925611052072,
        "width": 0.13636363636363635,
        "height": 0.22210414452709884
      }
    },
    {
      "id": "change-2",
      "label": "The flag's free end rolls into a tube.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.7416267942583732,
        "top": 0.34962805526036134,
        "width": 0.09569377990430622,
        "height": 0.11583421891604676
      }
    },
    {
      "id": "change-3",
      "label": "The scarf fringe braids into a plait.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.2673444976076555,
        "top": 0.20191285866099895,
        "width": 0.10107655502392345,
        "height": 0.11902231668437832
      }
    },
    {
      "id": "change-4",
      "label": "The mouse's tail threads through its own knot.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.21232057416267944,
        "top": 0.4505844845908608,
        "width": 0.05741626794258373,
        "height": 0.11370882040382571
      }
    },
    {
      "id": "change-5",
      "label": "The bell's clapper curls into a loop.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.6842105263157895,
        "top": 0.5462274176408076,
        "width": 0.03349282296650718,
        "height": 0.06588735387885228
      }
    }
  ]
},
{
  "id": "v4-dream-111",
  "title": "The Cloud Collector's Bicycle",
  "original": "/artwork/v4/collection/dream-111-original-v4.png",
  "altered": "/artwork/v4/collection/dream-111-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "lantern-flame",
      "label": "The lantern flame leans left.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.09868421052631579,
        "top": 0.15409139213602552,
        "width": 0.03409090909090909,
        "height": 0.07120085015940489
      }
    },
    {
      "id": "cloud-spiral",
      "label": "The central bottle holds a spiral cloud.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.507177033492823,
        "top": 0.3390010626992561,
        "width": 0.03708133971291866,
        "height": 0.06482465462274177
      }
    },
    {
      "id": "boot-bow",
      "label": "The upper boot has a bow.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.3456937799043062,
        "top": 0.6439957492029755,
        "width": 0.05143540669856459,
        "height": 0.07545164718384698
      }
    },
    {
      "id": "bell-star",
      "label": "The bell carries a star engraving.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.4491626794258373,
        "top": 0.4293304994686504,
        "width": 0.025717703349282296,
        "height": 0.044633368756641874
      },
      "source": "/artwork/v4/collection/dream-111-refine-source-v4.png"
    },
    {
      "id": "leaf-veins",
      "label": "The lapel leaf has horizontal veins.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.38217703349282295,
        "top": 0.2678002125398512,
        "width": 0.02033492822966507,
        "height": 0.04994686503719448
      }
    }
  ]
},
{
  "id": "v4-dream-112",
  "title": "The Lemon-Slice Swing",
  "original": "/artwork/v4/collection/dream-112-original-v4.png",
  "altered": "/artwork/v4/collection/dream-112-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "tail-bow",
      "label": "The tail ribbon has two loops.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.25717703349282295,
        "top": 0.47502656748140276,
        "width": 0.07535885167464115,
        "height": 0.1849096705632306
      }
    },
    {
      "id": "mug-handle",
      "label": "The mug handle is on the right.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.8098086124401914,
        "top": 0.71413390010627,
        "width": 0.09868421052631579,
        "height": 0.10626992561105207
      },
      "source": "/artwork/v4/collection/dream-112-mug-selected-source-v4.png"
    },
    {
      "id": "rope-loop",
      "label": "The left rope knot has a closed loop.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.2565789473684211,
        "top": 0.09351753453772582,
        "width": 0.0430622009569378,
        "height": 0.11477151965993623
      }
    },
    {
      "id": "fox-eye",
      "label": "The fox's right eye is open.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.4180622009569378,
        "top": 0.30818278427205104,
        "width": 0.02332535885167464,
        "height": 0.04675876726886291
      }
    },
    {
      "id": "flower-veins",
      "label": "The yellow flower has curved veins.",
      "difficulty": "Dreamlike",
      "edgeFade": 5,
      "box": {
        "left": 0.06937799043062201,
        "top": 0.7502656748140276,
        "width": 0.10466507177033493,
        "height": 0.1891604675876727
      }
    }
  ]
},
{
  "id": "v4-dream-116",
  "title": "The Umbrella at the End of the Hall",
  "original": "/artwork/v4/collection/dream-116-original-v4.png",
  "altered": "/artwork/v4/collection/dream-116-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The falling water twists into a helical ribbon.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.4677033492822967,
        "top": 0.46971307120085015,
        "width": 0.060406698564593304,
        "height": 0.29330499468650373
      }
    },
    {
      "id": "change-2",
      "label": "The chair\u2019s right gold rail curls inward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.21889952153110048,
        "top": 0.5441020191285866,
        "width": 0.030502392344497607,
        "height": 0.15834218916046758
      }
    },
    {
      "id": "change-3",
      "label": "The umbrella handle forms a heart-shaped crook.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.49401913875598086,
        "top": 0.015940488841657812,
        "width": 0.06339712918660287,
        "height": 0.11477151965993623
      }
    },
    {
      "id": "change-4",
      "label": "The bowl's white band weaves into a braid.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4485645933014354,
        "top": 0.767268862911796,
        "width": 0.1034688995215311,
        "height": 0.05100956429330499
      }
    },
    {
      "id": "change-5",
      "label": "The umbrella strap end opens outward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.4826555023923445,
        "top": 0.38682252922422955,
        "width": 0.05382775119617225,
        "height": 0.04994686503719448
      }
    }
  ]
},
{
  "id": "v4-dream-117",
  "title": "The Fox and the Porcelain Forest",
  "original": "/artwork/v4/collection/dream-117-original-v4.png",
  "altered": "/artwork/v4/collection/dream-117-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "An orange key is painted inside the large right spoon.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.8044258373205742,
        "top": 0.057385759829968117,
        "width": 0.09988038277511961,
        "height": 0.21360255047821466
      }
    },
    {
      "id": "change-2",
      "label": "The mushroom cap's notched edge rolls inward.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.14354066985645933,
        "top": 0.6684378320935175,
        "width": 0.05861244019138756,
        "height": 0.12008501594048884
      }
    },
    {
      "id": "change-3",
      "label": "The scarf's pale vine pattern braids together.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.27392344497607657,
        "top": 0.3655685441020191,
        "width": 0.1471291866028708,
        "height": 0.12008501594048884
      }
    },
    {
      "id": "change-4",
      "label": "The bell opens on its hinge.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4694976076555024,
        "top": 0.5292242295430393,
        "width": 0.038875598086124404,
        "height": 0.077577045696068
      }
    },
    {
      "id": "change-5",
      "label": "The left spoon's upper flower curls into a spiral.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.21949760765550239,
        "top": 0.08289054197662062,
        "width": 0.05921052631578947,
        "height": 0.09564293304994687
      }
    }
  ]
},
{
  "id": "v4-dream-122",
  "title": "The Ballroom of Unworn Shoes",
  "original": "/artwork/v4/collection/dream-122-original-v4.png",
  "altered": "/artwork/v4/collection/dream-122-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The lace fan folds narrower.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.007177033492822967,
        "top": 0.2922422954303932,
        "width": 0.1417464114832536,
        "height": 0.14558979808714134
      }
    },
    {
      "id": "change-2",
      "label": "The music-box crank handle points upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.8851674641148325,
        "top": 0.47502656748140276,
        "width": 0.09868421052631579,
        "height": 0.11052072263549416
      }
    },
    {
      "id": "change-3",
      "label": "The cream boot lace closes into a loop.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4055023923444976,
        "top": 0.20297555791710944,
        "width": 0.05263157894736842,
        "height": 0.2561105207226355
      }
    },
    {
      "id": "change-4",
      "label": "The front purple shoe gem becomes a teardrop.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.12619617224880383,
        "top": 0.79596174282678,
        "width": 0.02631578947368421,
        "height": 0.05419766206163656
      }
    },
    {
      "id": "change-5",
      "label": "The rear blue shoe heel curves inward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8576555023923444,
        "top": 0.7683315621679064,
        "width": 0.03409090909090909,
        "height": 0.08501594048884166
      }
    }
  ]
},
{
  "id": "v4-dream-119",
  "title": "The Room Inside the Ribbon Knot",
  "original": "/artwork/v4/collection/dream-119-original-v4.png",
  "altered": "/artwork/v4/collection/dream-119-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "diagonal-window",
      "label": "The round window cross turns diagonally.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.6022727272727273,
        "top": 0.2678002125398512,
        "width": 0.05741626794258373,
        "height": 0.1275239107332625
      }
    },
    {
      "id": "chevron-seat",
      "label": "The chair seat stripes form chevrons.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.5490430622009569,
        "top": 0.4442082890541977,
        "width": 0.05143540669856459,
        "height": 0.030818278427205102
      }
    },
    {
      "id": "open-backpack",
      "label": "The traveler's backpack flap folds open.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.25,
        "top": 0.5749202975557917,
        "width": 0.02631578947368421,
        "height": 0.04569606801275239
      }
    },
    {
      "id": "tilted-loop",
      "label": "The lantern hanging loop tilts sideways.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5119617224880383,
        "top": 0.43889479277364507,
        "width": 0.01854066985645933,
        "height": 0.02763018065887354
      }
    },
    {
      "id": "curled-bow",
      "label": "The boat's right bow tip curls inward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.9545454545454546,
        "top": 0.7130712008501594,
        "width": 0.022727272727272728,
        "height": 0.044633368756641874
      }
    }
  ]
},
{
  "id": "v4-dream-104",
  "title": "The Doorway of Falling Feathers",
  "original": "/artwork/v4/collection/dream-104-original-v4.png",
  "altered": "/artwork/v4/collection/dream-104-altered-source-v4.png",
  "aspectRatio": 1671 / 941,
  "edits": [
    {
      "id": "knob",
      "label": "The red doorknob becomes hexagonal.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.5984440454817475,
        "top": 0.4357066950053135,
        "width": 0.025134649910233394,
        "height": 0.048884165781083955
      }
    },
    {
      "id": "rail",
      "label": "The stool's lower right rail slopes upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.14602034709754638,
        "top": 0.7332624867162593,
        "width": 0.06283662477558348,
        "height": 0.1030818278427205
      }
    },
    {
      "id": "feather",
      "label": "The blue feather's shaft branches into a fork.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.3794135248354279,
        "top": 0.8214665249734325,
        "width": 0.061639736684619986,
        "height": 0.0669500531349628
      }
    },
    {
      "id": "handle",
      "label": "The mug's small right handle disappears.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.16337522441651706,
        "top": 0.5770456960680127,
        "width": 0.022142429682824656,
        "height": 0.05951115834218916
      }
    },
    {
      "id": "boat",
      "label": "The paper boat's front-panel pattern becomes a spiral.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8300418910831837,
        "top": 0.8395324123273114,
        "width": 0.02872531418312388,
        "height": 0.044633368756641874
      }
    }
  ]
},
{
  "id": "v4-dream-123",
  "title": "The Sea in the Thimble",
  "original": "/artwork/v4/collection/dream-123-original-v4.png",
  "altered": "/artwork/v4/collection/dream-123-altered-source-v4.png",
  "aspectRatio": 1672 / 940,
  "edits": [
    {
      "id": "change-1",
      "label": "The comb has a crescent cutout.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.38995215311004783,
        "top": 0.28617021276595744,
        "width": 0.04066985645933014,
        "height": 0.08404255319148936
      }
    },
    {
      "id": "change-2",
      "label": "The spool aperture becomes a keyhole.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.867822966507177,
        "top": 0.09787234042553192,
        "width": 0.07177033492822966,
        "height": 0.1829787234042553
      }
    },
    {
      "id": "change-3",
      "label": "The pearl becomes a droplet.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.09330143540669857,
        "top": 0.32872340425531915,
        "width": 0.056818181818181816,
        "height": 0.10425531914893617
      }
    },
    {
      "id": "change-4",
      "label": "The upper fabric stitch bends into a zigzag.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8522727272727273,
        "top": 0.5414893617021277,
        "width": 0.09330143540669857,
        "height": 0.12872340425531914
      }
    },
    {
      "id": "change-5",
      "label": "The loose hair curl forms a closed ring.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.37021531100478466,
        "top": 0.07553191489361702,
        "width": 0.02631578947368421,
        "height": 0.047872340425531915
      }
    }
  ]
},
{
  "id": "v4-dream-106",
  "title": "The Honey Bear's Balloon",
  "original": "/artwork/v4/collection/dream-106-original-v4.png",
  "altered": "/artwork/v4/collection/dream-106-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "heart",
      "label": "The blue basket heart points upward.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.36004784688995217,
        "top": 0.6089266737513284,
        "width": 0.05442583732057416,
        "height": 0.09032943676939426
      }
    },
    {
      "id": "lock",
      "label": "The basket padlock becomes round.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.41626794258373206,
        "top": 0.5685441020191286,
        "width": 0.02930622009569378,
        "height": 0.057385759829968117
      }
    },
    {
      "id": "scarf",
      "label": "The scarf passes in front of the suspension rope.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.2822966507177033,
        "top": 0.4760892667375133,
        "width": 0.025717703349282296,
        "height": 0.0563230605738576
      }
    },
    {
      "id": "drop",
      "label": "The lower honey drop curls into a hook.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.3708133971291866,
        "top": 0.1902231668437832,
        "width": 0.03349282296650718,
        "height": 0.08076514346439957
      }
    },
    {
      "id": "leaf",
      "label": "The left leaf pennant has two parallel veins.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.49401913875598086,
        "top": 0.2359192348565356,
        "width": 0.04366028708133971,
        "height": 0.12327311370882041
      }
    }
  ]
},
{
  "id": "v4-dream-113",
  "title": "The Mirror's Forgotten Handle",
  "original": "/artwork/v4/collection/dream-113-original-v4.png",
  "altered": "/artwork/v4/collection/dream-113-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The medallion reflects a red desert arch.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.562799043062201,
        "top": 0.015940488841657812,
        "width": 0.04007177033492823,
        "height": 0.06907545164718384
      }
    },
    {
      "id": "change-2",
      "label": "The shorter key tooth bends upward.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.29066985645933013,
        "top": 0.1636556854410202,
        "width": 0.022727272727272728,
        "height": 0.05526036131774708
      }
    },
    {
      "id": "change-3",
      "label": "The compact sun becomes a crescent ornament.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.4192583732057416,
        "top": 0.8788522848034006,
        "width": 0.02930622009569378,
        "height": 0.04782146652497343
      }
    },
    {
      "id": "change-4",
      "label": "The hat band has a zigzag seam.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.49282296650717705,
        "top": 0.4760892667375133,
        "width": 0.046052631578947366,
        "height": 0.04782146652497343
      }
    },
    {
      "id": "change-5",
      "label": "The white glove tip has a crescent notch.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.31399521531100477,
        "top": 0.8671625929861849,
        "width": 0.03289473684210526,
        "height": 0.039319872476089264
      }
    }
  ]
},
{
  "id": "v4-dream-114",
  "title": "The Orchard of Lantern Birds",
  "original": "/artwork/v4/collection/dream-114-original-v4.png",
  "altered": "/artwork/v4/collection/dream-114-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The largest bird opens its beak.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.30801435406698563,
        "top": 0.07970244420828905,
        "width": 0.034688995215311005,
        "height": 0.057385759829968117
      }
    },
    {
      "id": "change-2",
      "label": "The pearl reflects a pink blossom.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.2494019138755981,
        "top": 0.48884165781083955,
        "width": 0.03409090909090909,
        "height": 0.06482465462274177
      }
    },
    {
      "id": "change-3",
      "label": "The bird doorway star becomes a crescent.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5083732057416268,
        "top": 0.3028692879914984,
        "width": 0.02452153110047847,
        "height": 0.05526036131774708
      }
    },
    {
      "id": "change-4",
      "label": "The chair arm tip curls into a spiral.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7589712918660287,
        "top": 0.7151965993623804,
        "width": 0.03289473684210526,
        "height": 0.05526036131774708
      }
    },
    {
      "id": "change-5",
      "label": "The lily pad has an upper left notch.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.5328947368421053,
        "top": 0.8044633368756642,
        "width": 0.0729665071770335,
        "height": 0.04675876726886291
      }
    }
  ]
},
{
  "id": "v4-dream-115",
  "title": "The Cherry Pie Moon",
  "original": "/artwork/v4/collection/dream-115-original-v4.png",
  "altered": "/artwork/v4/collection/dream-115-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The mug handle curls inward.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.8014354066985646,
        "top": 0.3028692879914984,
        "width": 0.03648325358851675,
        "height": 0.09564293304994687
      }
    },
    {
      "id": "change-2",
      "label": "The spoon reflects a blue star.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.7505980861244019,
        "top": 0.47502656748140276,
        "width": 0.06339712918660287,
        "height": 0.07120085015940489
      }
    },
    {
      "id": "change-3",
      "label": "The cherry leaf has a heart shaped notch.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.10047846889952153,
        "top": 0.6068012752391073,
        "width": 0.04366028708133971,
        "height": 0.06376195536663125
      }
    },
    {
      "id": "change-4",
      "label": "The squirrel front paw curls into a rounded fist.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5938995215311005,
        "top": 0.2624867162592986,
        "width": 0.04665071770334928,
        "height": 0.05100956429330499
      }
    },
    {
      "id": "change-5",
      "label": "One scarf star becomes an outline.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.8522727272727273,
        "top": 0.23273113708820403,
        "width": 0.025717703349282296,
        "height": 0.052072263549415514
      }
    }
  ]
},
{
  "id": "v4-dream-120",
  "title": "The Last Lantern Before Morning",
  "original": "/artwork/v4/collection/dream-120-original-v4.png",
  "altered": "/artwork/v4/collection/dream-120-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "ring-finial",
      "label": "The lantern crescent finial becomes a ring.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.5873205741626795,
        "top": 0.0,
        "width": 0.0687799043062201,
        "height": 0.10201912858660998
      }
    },
    {
      "id": "heart-clasp",
      "label": "The coat clasp carries a heart.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.39952153110047844,
        "top": 0.3953241232731137,
        "width": 0.0215311004784689,
        "height": 0.048884165781083955
      }
    },
    {
      "id": "swinging-handle",
      "label": "The coral handle's bottom loop swings left.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4659090909090909,
        "top": 0.5706695005313497,
        "width": 0.03409090909090909,
        "height": 0.044633368756641874
      }
    },
    {
      "id": "leaf-vein-pattern",
      "label": "The coat leaf's vein pattern gains branches.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.23684210526315788,
        "top": 0.8289054197662061,
        "width": 0.045454545454545456,
        "height": 0.10201912858660998
      }
    },
    {
      "id": "folded-moth",
      "label": "The small moth folds its wings upright.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.5777511961722488,
        "top": 0.4707757704569607,
        "width": 0.038875598086124404,
        "height": 0.06801275239107332
      }
    }
  ]
},
{
  "id": "v4-dream-121",
  "title": "The Robot Who Misplaced Tuesday",
  "original": "/artwork/v4/collection/dream-121-original-v4.png",
  "altered": "/artwork/v4/collection/dream-121-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "floppy-ear",
      "label": "The toy rabbit's left ear folds down.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.17763157894736842,
        "top": 0.1030818278427205,
        "width": 0.019138755980861243,
        "height": 0.04994686503719448
      }
    },
    {
      "id": "leaning-grip",
      "label": "The spinning top's red grip leans left.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.31758373205741625,
        "top": 0.39213602550478216,
        "width": 0.04784688995215311,
        "height": 0.061636556854410204
      }
    },
    {
      "id": "turned-keyhole",
      "label": "The chest lock opening turns sideways.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5490430622009569,
        "top": 0.5579171094580234,
        "width": 0.019138755980861243,
        "height": 0.03719447396386823
      }
    },
    {
      "id": "open-toolbox-latch",
      "label": "The toolbox latch hinges open.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8217703349282297,
        "top": 0.7736450584484591,
        "width": 0.03708133971291866,
        "height": 0.06269925611052073
      }
    },
    {
      "id": "upright-nut",
      "label": "The loose nut stands upright on its edge.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.49521531100478466,
        "top": 0.873538788522848,
        "width": 0.038875598086124404,
        "height": 0.07013815090329437
      }
    }
  ]
},
{
  "id": "v4-dream-124",
  "title": "The Monster's Quiet Lesson",
  "original": "/artwork/v4/collection/dream-124-original-v4.png",
  "altered": "/artwork/v4/collection/dream-124-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The ball has a crescent motif.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.27093301435406697,
        "top": 0.8650371944739639,
        "width": 0.039473684210526314,
        "height": 0.0669500531349628
      }
    },
    {
      "id": "change-2",
      "label": "The metronome pendulum leans left.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.23444976076555024,
        "top": 0.14665249734325186,
        "width": 0.05980861244019139,
        "height": 0.1126461211477152
      }
    },
    {
      "id": "change-3",
      "label": "The model boat right sail folds down.",
      "difficulty": "Hard",
      "edgeFade": 1,
      "box": {
        "left": 0.32057416267942584,
        "top": 0.23273113708820403,
        "width": 0.017942583732057416,
        "height": 0.06801275239107332
      }
    },
    {
      "id": "change-4",
      "label": "The hanging sock heel folds outward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5765550239234449,
        "top": 0.09139213602550478,
        "width": 0.05442583732057416,
        "height": 0.10201912858660998
      }
    },
    {
      "id": "change-5",
      "label": "The toy rabbit bow end curls into a loop.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8343301435406698,
        "top": 0.8299681190223167,
        "width": 0.035287081339712915,
        "height": 0.04569606801275239
      }
    }
  ]
},
{
  "id": "v4-dream-125",
  "title": "The Cowboy and the Folded Distance",
  "original": "/artwork/v4/collection/dream-125-original-v4.png",
  "altered": "/artwork/v4/collection/dream-125-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "door-ajar",
      "label": "The blue door stands ajar.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.8809808612440191,
        "top": 0.5409139213602551,
        "width": 0.042464114832535885,
        "height": 0.12646121147715197
      }
    },
    {
      "id": "hat-loops",
      "label": "The hat band has closed loops.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.13935406698564592,
        "top": 0.767268862911796,
        "width": 0.145933014354067,
        "height": 0.06057385759829968
      }
    },
    {
      "id": "canteen-cap",
      "label": "The canteen cap tilts sideways.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.14055023923444976,
        "top": 0.4962805526036132,
        "width": 0.03588516746411483,
        "height": 0.05419766206163656
      }
    },
    {
      "id": "horse-eye",
      "label": "The hobbyhorse eye is closed.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.17942583732057416,
        "top": 0.31562167906482463,
        "width": 0.017942583732057416,
        "height": 0.023379383634431455
      }
    },
    {
      "id": "buckle-moon",
      "label": "The buckle carries a crescent.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.30023923444976075,
        "top": 0.40807651434643993,
        "width": 0.03409090909090909,
        "height": 0.061636556854410204
      }
    }
  ]
},
{
  "id": "v4-dream-126",
  "title": "The Aquarium of Forgotten Passwords",
  "original": "/artwork/v4/collection/dream-126-original-v4.png",
  "altered": "/artwork/v4/collection/dream-126-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "fish-fin",
      "label": "The large fish folds its top fin down.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.24222488038277512,
        "top": 0.11689691817215728,
        "width": 0.10107655502392345,
        "height": 0.2199787460148778
      }
    },
    {
      "id": "octopus-eye",
      "label": "The octopus closes its right eye.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.645933014354067,
        "top": 0.5685441020191286,
        "width": 0.028110047846889953,
        "height": 0.057385759829968117
      }
    },
    {
      "id": "shell-spiral",
      "label": "The shell spiral curls the other way.",
      "difficulty": "Hard",
      "edgeFade": 5,
      "box": {
        "left": 0.029904306220095694,
        "top": 0.7279489904357067,
        "width": 0.09210526315789473,
        "height": 0.1594048884165781
      }
    },
    {
      "id": "mug-moon",
      "label": "The mug carries a crescent moon.",
      "difficulty": "Very hard",
      "edgeFade": 5,
      "box": {
        "left": 0.8660287081339713,
        "top": 0.4399574920297556,
        "width": 0.04485645933014354,
        "height": 0.08289054197662062
      }
    },
    {
      "id": "mouse-wheel",
      "label": "The mouse wheel lies sideways.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.7793062200956937,
        "top": 0.5185972369819342,
        "width": 0.035287081339712915,
        "height": 0.04569606801275239
      }
    }
  ]
},
{
  "id": "v4-dream-127",
  "title": "The Staircase That Was Afraid",
  "original": "/artwork/v4/collection/dream-127-original-v4.png",
  "altered": "/artwork/v4/collection/dream-127-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "scarf-loops",
      "label": "The scarf fringe forms closed loops.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.1674641148325359,
        "top": 0.5079702444208289,
        "width": 0.037679425837320576,
        "height": 0.0818278427205101
      }
    },
    {
      "id": "bunny-ears",
      "label": "The bronze bunny folds its ears back.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.8989234449760766,
        "top": 0.4505844845908608,
        "width": 0.038875598086124404,
        "height": 0.0563230605738576
      }
    },
    {
      "id": "slipper-strap",
      "label": "The slipper has a loop strap.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.375,
        "top": 0.5770456960680127,
        "width": 0.053229665071770335,
        "height": 0.05526036131774708
      },
      "source": "/artwork/v4/collection/dream-127-slipper-selected-source-v4.png"
    },
    {
      "id": "knob-keyhole",
      "label": "The door knob has a keyhole.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.06578947368421052,
        "top": 0.36769394261424015,
        "width": 0.023923444976076555,
        "height": 0.04250797024442083
      }
    },
    {
      "id": "portrait-tail",
      "label": "The painted cat has a raised curved tail.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.5639952153110048,
        "top": 0.02763018065887354,
        "width": 0.01375598086124402,
        "height": 0.04782146652497343
      }
    }
  ]
},
{
  "id": "v4-dream-128",
  "title": "The Librarian of Thunder",
  "original": "/artwork/v4/collection/dream-128-original-v4.png",
  "altered": "/artwork/v4/collection/dream-128-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "bell",
      "label": "The desk bell becomes conical.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.7942583732057417,
        "top": 0.720510095642933,
        "width": 0.06818181818181818,
        "height": 0.11477151965993623
      }
    },
    {
      "id": "lightning",
      "label": "The teacup lightning bends its lowest segment left.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.20035885167464115,
        "top": 0.26567481402763016,
        "width": 0.10406698564593302,
        "height": 0.11902231668437832
      }
    },
    {
      "id": "key",
      "label": "The hanging key's lower teeth point left.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5586124401913876,
        "top": 0.6992561105207227,
        "width": 0.03708133971291866,
        "height": 0.0563230605738576
      }
    },
    {
      "id": "stool",
      "label": "The stool's handhold becomes a crescent slot.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7021531100478469,
        "top": 0.4527098831030818,
        "width": 0.038875598086124404,
        "height": 0.03719447396386823
      }
    },
    {
      "id": "quill",
      "label": "The white quill's shaft branches inside the vane.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.6046650717703349,
        "top": 0.8618490967056323,
        "width": 0.02631578947368421,
        "height": 0.06482465462274177
      }
    }
  ]
},
{
  "id": "v4-dream-129",
  "title": "The Suitcase That Stayed Home",
  "original": "/artwork/v4/collection/dream-129-original-v4.png",
  "altered": "/artwork/v4/collection/dream-129-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "cushion",
      "label": "The cushion stripes form chevrons.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.5035885167464115,
        "top": 0.36238044633368754,
        "width": 0.0867224880382775,
        "height": 0.13071200850159406
      }
    },
    {
      "id": "window",
      "label": "The window mullion leans diagonally.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.6668660287081339,
        "top": 0.20297555791710944,
        "width": 0.04066985645933014,
        "height": 0.15409139213602552
      }
    },
    {
      "id": "lace",
      "label": "The left boot lace forms bow loops.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.15729665071770335,
        "top": 0.740701381509033,
        "width": 0.090311004784689,
        "height": 0.11158342189160468
      }
    },
    {
      "id": "key",
      "label": "The loose key's bow becomes hexagonal.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.37260765550239233,
        "top": 0.8820403825717322,
        "width": 0.03708133971291866,
        "height": 0.04250797024442083
      }
    },
    {
      "id": "lock",
      "label": "The left suitcase lock has a horizontal slot.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.5263157894736842,
        "top": 0.7343251859723698,
        "width": 0.03289473684210526,
        "height": 0.03719447396386823
      }
    }
  ]
},
{
  "id": "v4-dream-130",
  "title": "The Ninja of Soft Footsteps",
  "original": "/artwork/v4/collection/dream-130-original-v4.png",
  "altered": "/artwork/v4/collection/dream-130-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "bow",
      "label": "The red bow's left loop folds sideways.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.3869617224880383,
        "top": 0.20297555791710944,
        "width": 0.05083732057416268,
        "height": 0.0924548352816153
      }
    },
    {
      "id": "broom",
      "label": "The broom shadow fringes curl upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.2410287081339713,
        "top": 0.3007438894792774,
        "width": 0.05861244019138756,
        "height": 0.12008501594048884
      }
    },
    {
      "id": "petal",
      "label": "The floor emblem's upper petal curls inward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8672248803827751,
        "top": 0.43889479277364507,
        "width": 0.03110047846889952,
        "height": 0.07013815090329437
      }
    },
    {
      "id": "ring",
      "label": "The chest pull becomes a pointed loop.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.9078947368421053,
        "top": 0.2614240170031881,
        "width": 0.03708133971291866,
        "height": 0.06376195536663125
      }
    },
    {
      "id": "bell",
      "label": "The waist bell has a horizontal opening.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.42045454545454547,
        "top": 0.359192348565356,
        "width": 0.02930622009569378,
        "height": 0.048884165781083955
      }
    }
  ]
},
{
  "id": "v4-dream-131",
  "title": "The Elevator to the Bottom Drawer",
  "original": "/artwork/v4/collection/dream-131-original-v4.png",
  "altered": "/artwork/v4/collection/dream-131-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "A continuous spiral is stitched into the oven mitten.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.5795454545454546,
        "top": 0.31668437832093516,
        "width": 0.0735645933014354,
        "height": 0.18172157279489903
      }
    },
    {
      "id": "change-2",
      "label": "The treasure chest lid opens.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.5466507177033493,
        "top": 0.7715196599362381,
        "width": 0.09150717703349283,
        "height": 0.11583421891604676
      }
    },
    {
      "id": "change-3",
      "label": "The top drawer pull coils inward.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8857655502392344,
        "top": 0.048884165781083955,
        "width": 0.07655502392344497,
        "height": 0.13071200850159406
      }
    },
    {
      "id": "change-4",
      "label": "The bathtub faucet curls into a spiral.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.41088516746411485,
        "top": 0.025504782146652496,
        "width": 0.04665071770334928,
        "height": 0.0924548352816153
      }
    },
    {
      "id": "change-5",
      "label": "The toy elephant's trunk curls into a loop.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.40311004784689,
        "top": 0.7895855472901169,
        "width": 0.028708133971291867,
        "height": 0.0563230605738576
      }
    }
  ]
},
{
  "id": "v4-dream-132",
  "title": "The Dragon Who Collected Apologies",
  "original": "/artwork/v4/collection/dream-132-original-v4.png",
  "altered": "/artwork/v4/collection/dream-132-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "A blue spiral is painted inside the plate.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.5927033492822966,
        "top": 0.7502656748140276,
        "width": 0.16686602870813397,
        "height": 0.07438894792773645
      }
    },
    {
      "id": "change-2",
      "label": "The large mug handle forms a figure eight.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.9509569377990431,
        "top": 0.4442082890541977,
        "width": 0.04904306220095694,
        "height": 0.20297555791710944
      }
    },
    {
      "id": "change-3",
      "label": "The red thread ties itself into a knot.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.3977272727272727,
        "top": 0.8788522848034006,
        "width": 0.04844497607655503,
        "height": 0.06057385759829968
      }
    },
    {
      "id": "change-4",
      "label": "A crescent is reflected in the teal bottle.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.9001196172248804,
        "top": 0.3177470775770457,
        "width": 0.04425837320574163,
        "height": 0.07970244420828905
      }
    },
    {
      "id": "change-5",
      "label": "The blue stripe on the loose shard becomes a braid.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.4772727272727273,
        "top": 0.8374070138150903,
        "width": 0.07595693779904306,
        "height": 0.061636556854410204
      }
    }
  ]
},
{
  "id": "v4-dream-134",
  "title": "The Market of Borrowed Faces",
  "original": "/artwork/v4/collection/dream-134-original-v4.png",
  "altered": "/artwork/v4/collection/dream-134-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The gold container's lid hinges open.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.02631578947368421,
        "top": 0.5334750265674814,
        "width": 0.09748803827751196,
        "height": 0.20828905419766205
      }
    },
    {
      "id": "change-2",
      "label": "A spiral replaces the cracks in the hand mirror.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.18421052631578946,
        "top": 0.7013815090329437,
        "width": 0.09988038277511961,
        "height": 0.13283740701381508
      }
    },
    {
      "id": "change-3",
      "label": "The brown satchel's flap opens.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7177033492822966,
        "top": 0.5132837407013815,
        "width": 0.05382775119617225,
        "height": 0.14027630180658873
      }
    },
    {
      "id": "change-4",
      "label": "The mask ribbon ties itself into a knot.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6285885167464115,
        "top": 0.22210414452709884,
        "width": 0.046052631578947366,
        "height": 0.16684378320935175
      }
    },
    {
      "id": "change-5",
      "label": "A crescent replaces the sun on the stool.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.7482057416267942,
        "top": 0.7290116896918172,
        "width": 0.0687799043062201,
        "height": 0.04144527098831031
      }
    }
  ]
},
{
  "id": "v4-dream-135",
  "title": "The Wrestler and the Silk Knot",
  "original": "/artwork/v4/collection/dream-135-original-v4.png",
  "altered": "/artwork/v4/collection/dream-135-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The wooden fork closes into an eyelet.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.7123205741626795,
        "top": 0.5579171094580234,
        "width": 0.05502392344497608,
        "height": 0.3018065887353879
      }
    },
    {
      "id": "change-2",
      "label": "The buckle has a crescent aperture.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.4395933014354067,
        "top": 0.5377258235919234,
        "width": 0.04844497607655503,
        "height": 0.09776833156216791
      }
    },
    {
      "id": "change-3",
      "label": "The boot lace forms parallel bars.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.13098086124401914,
        "top": 0.6461211477151966,
        "width": 0.08971291866028708,
        "height": 0.15196599362380447
      }
    },
    {
      "id": "change-4",
      "label": "The snail's right antenna curls downward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7978468899521531,
        "top": 0.638682252922423,
        "width": 0.028110047846889953,
        "height": 0.0563230605738576
      }
    },
    {
      "id": "change-5",
      "label": "The knee patch gains a diagonal stripe.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.21232057416267944,
        "top": 0.46971307120085015,
        "width": 0.09150717703349283,
        "height": 0.15090329436769395
      }
    }
  ]
},
{
  "id": "v4-dream-136",
  "title": "The Astronaut's Bathwater",
  "original": "/artwork/v4/collection/dream-136-original-v4.png",
  "altered": "/artwork/v4/collection/dream-136-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The submarine front window becomes a crescent.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.840311004784689,
        "top": 0.45908607863974493,
        "width": 0.02452153110047847,
        "height": 0.04569606801275239
      }
    },
    {
      "id": "change-2",
      "label": "The loose glove thumb points upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.52811004784689,
        "top": 0.7438894792773645,
        "width": 0.038875598086124404,
        "height": 0.07013815090329437
      }
    },
    {
      "id": "change-3",
      "label": "The floating teapot spout bends downward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.507177033492823,
        "top": 0.2731137088204038,
        "width": 0.025717703349282296,
        "height": 0.06907545164718384
      }
    },
    {
      "id": "change-4",
      "label": "The soap has a diamond groove.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.08373205741626795,
        "top": 0.21679064824654623,
        "width": 0.04126794258373206,
        "height": 0.0563230605738576
      }
    },
    {
      "id": "change-5",
      "label": "The ladder lowest rung bends into a U.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.40311004784689,
        "top": 0.21891604675876727,
        "width": 0.02930622009569378,
        "height": 0.040382571732199786
      }
    }
  ]
},
{
  "id": "v4-dream-137",
  "title": "The Octopus Who Rehearsed Tomorrow",
  "original": "/artwork/v4/collection/dream-137-original-v4.png",
  "altered": "/artwork/v4/collection/dream-137-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The red button holes become a single slot.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.37440191387559807,
        "top": 0.820403825717322,
        "width": 0.034688995215311005,
        "height": 0.06057385759829968
      }
    },
    {
      "id": "change-2",
      "label": "The suspended triangle becomes a square.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.4742822966507177,
        "top": 0.48884165781083955,
        "width": 0.056220095693779906,
        "height": 0.08926673751328375
      }
    },
    {
      "id": "change-3",
      "label": "The bow tie right wing folds downward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.3492822966507177,
        "top": 0.35494155154091395,
        "width": 0.020933014354066987,
        "height": 0.05951115834218916
      }
    },
    {
      "id": "change-4",
      "label": "The left stage lamp shutter covers the right side.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.07535885167464115,
        "top": 0.7608926673751328,
        "width": 0.046052631578947366,
        "height": 0.1594048884165781
      }
    },
    {
      "id": "change-5",
      "label": "The blue cup right handle opens.",
      "difficulty": "Dreamlike",
      "edgeFade": 1,
      "box": {
        "left": 0.611244019138756,
        "top": 0.34643995749202977,
        "width": 0.008971291866028708,
        "height": 0.024442082890541977
      }
    }
  ]
},
{
  "id": "v4-dream-141",
  "title": "The Chess Piece That Grew Tired",
  "original": "/artwork/v4/collection/dream-141-original-v4.png",
  "altered": "/artwork/v4/collection/dream-141-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The cheek loop has a diagonal crossbar.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.5532296650717703,
        "top": 0.25292242295430395,
        "width": 0.05861244019138756,
        "height": 0.10945802337938364
      }
    },
    {
      "id": "change-2",
      "label": "The red blanket patch has a crescent embroidery.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.5460526315789473,
        "top": 0.6259298618490967,
        "width": 0.05502392344497608,
        "height": 0.11583421891604676
      }
    },
    {
      "id": "change-3",
      "label": "The upper blanket button becomes a two hole toggle.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6303827751196173,
        "top": 0.6684378320935175,
        "width": 0.03349282296650718,
        "height": 0.05526036131774708
      }
    },
    {
      "id": "change-4",
      "label": "The mug reflects a blue arched window.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8600478468899522,
        "top": 0.2911795961742827,
        "width": 0.03349282296650718,
        "height": 0.06376195536663125
      }
    },
    {
      "id": "change-5",
      "label": "The far chair arm tip has a carved crescent.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.25717703349282295,
        "top": 0.40913921360255046,
        "width": 0.031698564593301434,
        "height": 0.06269925611052073
      }
    }
  ]
},
{
  "id": "v4-dream-142",
  "title": "The Gardener of Broken Machines",
  "original": "/artwork/v4/collection/dream-142-original-v4.png",
  "altered": "/artwork/v4/collection/dream-142-altered-source-v4.png",
  "aspectRatio": 1672 / 940,
  "edits": [
    {
      "id": "change-1",
      "label": "The large wheel has spiral spokes.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.6519138755980861,
        "top": 0.05106382978723404,
        "width": 0.09150717703349283,
        "height": 0.19042553191489361
      }
    },
    {
      "id": "change-2",
      "label": "The toaster lever slopes down to the right.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.5364832535885168,
        "top": 0.6329787234042553,
        "width": 0.05442583732057416,
        "height": 0.09787234042553192
      }
    },
    {
      "id": "change-3",
      "label": "The apron patch has a gold zigzag embroidery.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.4084928229665072,
        "top": 0.5127659574468085,
        "width": 0.04066985645933014,
        "height": 0.07127659574468086
      }
    },
    {
      "id": "change-4",
      "label": "The screwdriver handle has a diagonal groove.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.2805023923444976,
        "top": 0.7723404255319148,
        "width": 0.08552631578947369,
        "height": 0.05851063829787234
      }
    },
    {
      "id": "change-5",
      "label": "The foremost washer has a triangular hole.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.5765550239234449,
        "top": 0.9085106382978724,
        "width": 0.026913875598086126,
        "height": 0.029787234042553193
      }
    }
  ]
},
{
  "id": "v4-dream-143",
  "title": "The Castle Inside the Sandwich",
  "original": "/artwork/v4/collection/dream-143-original-v4.png",
  "altered": "/artwork/v4/collection/dream-143-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The olive flag flies left with a curved edge.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.6519138755980861,
        "top": 0.0,
        "width": 0.10705741626794259,
        "height": 0.09989373007438895
      }
    },
    {
      "id": "change-2",
      "label": "The blue castle window has a diagonal mullion.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.49282296650717705,
        "top": 0.3071200850159405,
        "width": 0.023923444976076555,
        "height": 0.08395324123273114
      }
    },
    {
      "id": "change-3",
      "label": "The left lettuce curtain tie is braided.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.38636363636363635,
        "top": 0.3931987247608927,
        "width": 0.04784688995215311,
        "height": 0.05100956429330499
      }
    },
    {
      "id": "change-4",
      "label": "The left throne back has a diamond inset.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5089712918660287,
        "top": 0.43783209351753455,
        "width": 0.025717703349282296,
        "height": 0.061636556854410204
      }
    },
    {
      "id": "change-5",
      "label": "The napkin ring reflects a blue crescent.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.9246411483253588,
        "top": 0.7619553666312433,
        "width": 0.05203349282296651,
        "height": 0.10626992561105207
      }
    }
  ]
},
{
  "id": "v4-dream-144",
  "title": "The Coat That Remembered Winter",
  "original": "/artwork/v4/collection/dream-144-original-v4.png",
  "altered": "/artwork/v4/collection/dream-144-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "scarf-loops",
      "label": "The scarf fringe forms closed loops.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.6967703349282297,
        "top": 0.4357066950053135,
        "width": 0.07117224880382775,
        "height": 0.1179596174282678
      }
    },
    {
      "id": "key-oval",
      "label": "The gold key has an oval handle.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.8181818181818182,
        "top": 0.20828905419766205,
        "width": 0.0430622009569378,
        "height": 0.077577045696068
      }
    },
    {
      "id": "chest-handle",
      "label": "The chest handle arches upward.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.2553827751196172,
        "top": 0.6737513283740701,
        "width": 0.05562200956937799,
        "height": 0.08395324123273114
      },
      "source": "/artwork/v4/collection/dream-144-refine-source-v4.png"
    },
    {
      "id": "skate-bow",
      "label": "The skate laces form a bow.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.715311004784689,
        "top": 0.722635494155154,
        "width": 0.029904306220095694,
        "height": 0.06376195536663125
      }
    },
    {
      "id": "button-holes",
      "label": "The blue button has two holes.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.43899521531100477,
        "top": 0.3645058448459086,
        "width": 0.03409090909090909,
        "height": 0.06057385759829968
      }
    }
  ]
},
{
  "id": "v4-dream-145",
  "title": "The Polite Creature Under the Bed",
  "original": "/artwork/v4/collection/dream-145-original-v4.png",
  "altered": "/artwork/v4/collection/dream-145-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "closed-eye",
      "label": "The creature closes its golden eye.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.3211722488038278,
        "top": 0.39213602550478216,
        "width": 0.06638755980861244,
        "height": 0.10520722635494155
      }
    },
    {
      "id": "car-door",
      "label": "The toy car door stands open.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.8708133971291866,
        "top": 0.7704569606801275,
        "width": 0.06578947368421052,
        "height": 0.13708820403825717
      }
    },
    {
      "id": "sock-diamonds",
      "label": "The sock has knitted diamonds.",
      "difficulty": "Hard",
      "edgeFade": 5,
      "box": {
        "left": 0.034688995215311005,
        "top": 0.7757704569606801,
        "width": 0.326555023923445,
        "height": 0.16259298618490967
      }
    },
    {
      "id": "tray-handle",
      "label": "The tray handle is rounded.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5711722488038278,
        "top": 0.4665249734325186,
        "width": 0.06638755980861244,
        "height": 0.08501594048884166
      }
    },
    {
      "id": "heart-patch",
      "label": "The sleeve patch is heart-shaped.",
      "difficulty": "Dreamlike",
      "edgeFade": 5,
      "box": {
        "left": 0.21650717703349281,
        "top": 0.5855472901168969,
        "width": 0.06997607655502393,
        "height": 0.14558979808714134
      }
    }
  ]
},
{
  "id": "v4-dream-146",
  "title": "The Museum of Unfinished Dances",
  "original": "/artwork/v4/collection/dream-146-original-v4.png",
  "altered": "/artwork/v4/collection/dream-146-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "ribbon-curl",
      "label": "The gold ribbon curls inward at the bottom.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.31399521531100477,
        "top": 0.2614240170031881,
        "width": 0.10586124401913875,
        "height": 0.16259298618490967
      }
    },
    {
      "id": "hand-fist",
      "label": "The central dancer closes its hand.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.55622009569378,
        "top": 0.23804463336875664,
        "width": 0.03648325358851675,
        "height": 0.04675876726886291
      }
    },
    {
      "id": "key-oval",
      "label": "The harlequin key has one oval loop.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.09808612440191387,
        "top": 0.5589798087141339,
        "width": 0.03229665071770335,
        "height": 0.10201912858660998
      }
    },
    {
      "id": "shoe-strap",
      "label": "The rear red shoe strap is unbuckled.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8516746411483254,
        "top": 0.6801275239107333,
        "width": 0.03708133971291866,
        "height": 0.06907545164718384
      }
    },
    {
      "id": "hub-crescent",
      "label": "The gold sculpture hub carries a crescent.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.6686602870813397,
        "top": 0.4707757704569607,
        "width": 0.023923444976076555,
        "height": 0.04569606801275239
      }
    }
  ]
},
{
  "id": "v4-dream-138",
  "title": "The Marble That Held a Grudge",
  "original": "/artwork/v4/collection/dream-138-original-v4.png",
  "altered": "/artwork/v4/collection/dream-138-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "smiling-marble",
      "label": "The face inside the marble smiles.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.4569377990430622,
        "top": 0.5759829968119022,
        "width": 0.05980861244019139,
        "height": 0.05526036131774708
      }
    },
    {
      "id": "leaning-bridge-post",
      "label": "One middle bridge post leans diagonally.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.27870813397129185,
        "top": 0.22954303931987247,
        "width": 0.03289473684210526,
        "height": 0.09032943676939426
      }
    },
    {
      "id": "slotted-wheel-cap",
      "label": "The wheel axle cap gains a screw slot.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.20334928229665072,
        "top": 0.7024442082890542,
        "width": 0.03349282296650718,
        "height": 0.05951115834218916
      }
    },
    {
      "id": "triangle-washer",
      "label": "The gold washer has a triangular hole.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8080143540669856,
        "top": 0.8703506907545164,
        "width": 0.06997607655502393,
        "height": 0.06588735387885228
      }
    },
    {
      "id": "open-chest-latch",
      "label": "The chest latch hinges open.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8851674641148325,
        "top": 0.16790648246546228,
        "width": 0.0651913875598086,
        "height": 0.11158342189160468
      }
    }
  ]
},
{
  "id": "v4-dream-139",
  "title": "The Seam Between Two Rooms",
  "original": "/artwork/v4/collection/dream-139-original-v4.png",
  "altered": "/artwork/v4/collection/dream-139-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "heart-eyelet",
      "label": "The left zipper pull has a heart-shaped eyelet.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.333133971291866,
        "top": 0.36238044633368754,
        "width": 0.028708133971291867,
        "height": 0.04994686503719448
      }
    },
    {
      "id": "sideways-pull",
      "label": "The right zipper pull swings to the left.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.5478468899521531,
        "top": 0.27948990435706694,
        "width": 0.11004784688995216,
        "height": 0.18172157279489903
      }
    },
    {
      "id": "open-cat-eyes",
      "label": "The cat opens its eyes.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.0430622009569378,
        "top": 0.4909670563230606,
        "width": 0.02452153110047847,
        "height": 0.025504782146652496
      }
    },
    {
      "id": "cushion-star",
      "label": "The red cushion carries a gold star.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7296650717703349,
        "top": 0.8905419766206164,
        "width": 0.029904306220095694,
        "height": 0.05419766206163656
      }
    },
    {
      "id": "diagonal-shade-pleats",
      "label": "The lampshade pleats run diagonally.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8409090909090909,
        "top": 0.32624867162592985,
        "width": 0.10944976076555024,
        "height": 0.1339001062699256
      }
    }
  ]
},
{
  "id": "v4-dream-140",
  "title": "The Jellyfish Laundrette",
  "original": "/artwork/v4/collection/dream-140-original-v4.png",
  "altered": "/artwork/v4/collection/dream-140-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "surprised-mouth",
      "label": "The pink jellyfish opens a surprised round mouth.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.42822966507177035,
        "top": 0.255047821466525,
        "width": 0.01854066985645933,
        "height": 0.031880977683315624
      }
    },
    {
      "id": "faceted-stopper",
      "label": "The laundry bottle stopper becomes faceted.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.22069377990430622,
        "top": 0.024442082890541977,
        "width": 0.02930622009569378,
        "height": 0.04250797024442083
      }
    },
    {
      "id": "sock-crescent",
      "label": "The blue sock toe carries a cream crescent.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.15849282296650719,
        "top": 0.8777895855472901,
        "width": 0.028110047846889953,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "double-loop-spring",
      "label": "The clothespin spring has two clear loops.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.47129186602870815,
        "top": 0.0924548352816153,
        "width": 0.02033492822966507,
        "height": 0.04994686503719448
      }
    },
    {
      "id": "slotted-wheel-cap",
      "label": "The smaller washer wheel cap has a screw slot.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.5765550239234449,
        "top": 0.43889479277364507,
        "width": 0.022727272727272728,
        "height": 0.03825717321997875
      }
    }
  ]
},
{
  "id": "v4-dream-147",
  "title": "The Iceberg in the Kitchen Drawer",
  "original": "/artwork/v4/collection/dream-147-original-v4.png",
  "altered": "/artwork/v4/collection/dream-147-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "ring",
      "label": "The drawer pull becomes a squared loop.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.7099282296650717,
        "top": 0.6928799149840595,
        "width": 0.0729665071770335,
        "height": 0.1339001062699256
      }
    },
    {
      "id": "fork",
      "label": "The fork's rightmost tine curls inward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.298444976076555,
        "top": 0.38257173219978746,
        "width": 0.031698564593301434,
        "height": 0.0765143464399575
      }
    },
    {
      "id": "flipper",
      "label": "The walrus's front flipper curls upward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6016746411483254,
        "top": 0.3889479277364506,
        "width": 0.05861244019138756,
        "height": 0.09776833156216791
      }
    },
    {
      "id": "tray",
      "label": "The front tray compartment gains a diagonal ridge.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5873205741626795,
        "top": 0.48990435706695007,
        "width": 0.05382775119617225,
        "height": 0.061636556854410204
      }
    },
    {
      "id": "mitt",
      "label": "The oven mitt has parallel curved seams.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8032296650717703,
        "top": 0.018065887353878853,
        "width": 0.17165071770334928,
        "height": 0.18278427205100956
      }
    }
  ]
},
{
  "id": "v4-dream-148",
  "title": "The Umbrella That Wanted to Swim",
  "original": "/artwork/v4/collection/dream-148-original-v4.png",
  "altered": "/artwork/v4/collection/dream-148-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "handle",
      "label": "The umbrella hook curls into a spiral.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.409688995215311,
        "top": 0.15409139213602552,
        "width": 0.06818181818181818,
        "height": 0.1275239107332625
      }
    },
    {
      "id": "tentacle",
      "label": "The outer right tentacle tip coils closed.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.902511961722488,
        "top": 0.6758767268862912,
        "width": 0.05263157894736842,
        "height": 0.09351753453772582
      }
    },
    {
      "id": "anchor",
      "label": "The anchor's right fluke points down.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.22129186602870812,
        "top": 0.8299681190223167,
        "width": 0.02631578947368421,
        "height": 0.08820403825717323
      }
    },
    {
      "id": "scarf",
      "label": "The scarf's left tip curls upward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.031698564593301434,
        "top": 0.22848034006376194,
        "width": 0.056220095693779906,
        "height": 0.08501594048884166
      }
    },
    {
      "id": "cube",
      "label": "The gold ferrule opening becomes triangular.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.180622009569378,
        "top": 0.7481402763018066,
        "width": 0.01854066985645933,
        "height": 0.03506907545164718
      }
    }
  ]
},
{
  "id": "v4-dream-149",
  "title": "The Kitchen of Upside-Down Tempers",
  "original": "/artwork/v4/collection/dream-149-original-v4.png",
  "altered": "/artwork/v4/collection/dream-149-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "sun",
      "label": "The kite sun winks and smiles.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.4706937799043062,
        "top": 0.5536663124335813,
        "width": 0.034688995215311005,
        "height": 0.06482465462274177
      }
    },
    {
      "id": "whisk",
      "label": "The whisk wires twist into an hourglass.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.23444976076555024,
        "top": 0.15409139213602552,
        "width": 0.09330143540669857,
        "height": 0.19659936238044634
      }
    },
    {
      "id": "bowl",
      "label": "The small floating bowl has chevron bands.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.486244019138756,
        "top": 0.024442082890541977,
        "width": 0.05263157894736842,
        "height": 0.07970244420828905
      }
    },
    {
      "id": "spout",
      "label": "The teapot spout turns downward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7009569377990431,
        "top": 0.61211477151966,
        "width": 0.02332535885167464,
        "height": 0.044633368756641874
      }
    },
    {
      "id": "ladle",
      "label": "The ladle handle has a triangular opening.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.9055023923444976,
        "top": 0.3134962805526036,
        "width": 0.019138755980861243,
        "height": 0.03825717321997875
      }
    }
  ]
},
{
  "id": "v4-dream-150",
  "title": "The Last Seat in the Mirror",
  "original": "/artwork/v4/collection/dream-150-original-v4.png",
  "altered": "/artwork/v4/collection/dream-150-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The white chair back aperture is round.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.4473684210526316,
        "top": 0.5334750265674814,
        "width": 0.04844497607655503,
        "height": 0.09351753453772582
      }
    },
    {
      "id": "change-2",
      "label": "The key bit becomes a hook.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.09210526315789473,
        "top": 0.8076514346439958,
        "width": 0.031698564593301434,
        "height": 0.031880977683315624
      }
    },
    {
      "id": "change-3",
      "label": "The reflected pennant tip curls upward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.47787081339712917,
        "top": 0.04994686503719448,
        "width": 0.090311004784689,
        "height": 0.06801275239107332
      }
    },
    {
      "id": "change-4",
      "label": "The blanket lower stitch becomes a U loop.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8211722488038278,
        "top": 0.8044633368756642,
        "width": 0.028708133971291867,
        "height": 0.06057385759829968
      }
    },
    {
      "id": "change-5",
      "label": "The pitcher spout bends downward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8911483253588517,
        "top": 0.2826780021253985,
        "width": 0.038875598086124404,
        "height": 0.07226354941551541
      }
    }
  ]
},
{
  "id": "v4-dream-151",
  "title": "The Crocodile's Porcelain Smile",
  "original": "/artwork/v4/collection/dream-151-original-v4.png",
  "altered": "/artwork/v4/collection/dream-151-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The jar knob becomes a hollow ring.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.15789473684210525,
        "top": 0.6801275239107333,
        "width": 0.03349282296650718,
        "height": 0.06376195536663125
      }
    },
    {
      "id": "change-2",
      "label": "One comb tooth curls into a U.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.3229665071770335,
        "top": 0.869287991498406,
        "width": 0.034688995215311005,
        "height": 0.0765143464399575
      }
    },
    {
      "id": "change-3",
      "label": "The bow loose tail folds upward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.08732057416267942,
        "top": 0.3485653560042508,
        "width": 0.11423444976076555,
        "height": 0.26992561105207225
      }
    },
    {
      "id": "change-4",
      "label": "The reflected eye opens.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8564593301435407,
        "top": 0.10201912858660998,
        "width": 0.04844497607655503,
        "height": 0.06057385759829968
      }
    },
    {
      "id": "change-5",
      "label": "The loose cup right handle opens.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.7643540669856459,
        "top": 0.8916046758767269,
        "width": 0.017942583732057416,
        "height": 0.04994686503719448
      }
    }
  ]
},
{
  "id": "v4-dream-152",
  "title": "The Ferryman of Echoes",
  "original": "/artwork/v4/collection/dream-152-original-v4.png",
  "altered": "/artwork/v4/collection/dream-152-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The oar blade aperture becomes a star.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.49940191387559807,
        "top": 0.6833156216790648,
        "width": 0.031698564593301434,
        "height": 0.05844845908607864
      }
    },
    {
      "id": "change-2",
      "label": "The large bell clapper swings left.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.333133971291866,
        "top": 0.5600425079702445,
        "width": 0.06339712918660287,
        "height": 0.07013815090329437
      }
    },
    {
      "id": "change-3",
      "label": "The coat patch has a diagonal cross seam.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.24880382775119617,
        "top": 0.412327311370882,
        "width": 0.04665071770334928,
        "height": 0.0924548352816153
      }
    },
    {
      "id": "change-4",
      "label": "The right antenna bends downward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.2894736842105263,
        "top": 0.010626992561105207,
        "width": 0.0861244019138756,
        "height": 0.16684378320935175
      }
    },
    {
      "id": "change-5",
      "label": "The suspension hook tip closes into a loop.",
      "difficulty": "Dreamlike",
      "edgeFade": 2,
      "box": {
        "left": 0.0645933014354067,
        "top": 0.2592986184909671,
        "width": 0.017344497607655503,
        "height": 0.025504782146652496
      }
    }
  ]
},
{
  "id": "v4-dream-157",
  "title": "The Peacock Who Shed Colors",
  "original": "/artwork/v4/collection/dream-157-original-v4.png",
  "altered": "/artwork/v4/collection/dream-157-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "clip-open",
      "label": "The red clothespin opens wider.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.8839712918660287,
        "top": 0.14133900106269925,
        "width": 0.04904306220095694,
        "height": 0.09351753453772582
      }
    },
    {
      "id": "peacock-eye",
      "label": "The peacock closes its eye.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.5998803827751196,
        "top": 0.11052072263549416,
        "width": 0.022727272727272728,
        "height": 0.04994686503719448
      }
    },
    {
      "id": "spool-cross",
      "label": "The spool thread winds in crosses.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5675837320574163,
        "top": 0.8490967056323061,
        "width": 0.05861244019138756,
        "height": 0.08926673751328375
      }
    },
    {
      "id": "mirror-beak",
      "label": "The reflected beak is open.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.2619617224880383,
        "top": 0.824654622741764,
        "width": 0.02631578947368421,
        "height": 0.05526036131774708
      }
    },
    {
      "id": "vase-spiral",
      "label": "The vase has a spiral groove.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.944377990430622,
        "top": 0.5069075451647184,
        "width": 0.05562200956937799,
        "height": 0.20828905419766205
      }
    }
  ]
},
{
  "id": "v4-dream-158",
  "title": "The Sandwich Between Floors",
  "original": "/artwork/v4/collection/dream-158-original-v4.png",
  "altered": "/artwork/v4/collection/dream-158-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "chair-slat",
      "label": "The chair has one wide back slat.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.4449760765550239,
        "top": 0.4952178533475027,
        "width": 0.029904306220095694,
        "height": 0.06057385759829968
      }
    },
    {
      "id": "pot-lid",
      "label": "The saucepan lid tilts open.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.4288277511961722,
        "top": 0.3687566418703507,
        "width": 0.022129186602870814,
        "height": 0.05100956429330499
      },
      "source": "/artwork/v4/collection/dream-158-refine-source-v4.png"
    },
    {
      "id": "towel-fringe",
      "label": "The towel hem has knotted fringe.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6901913875598086,
        "top": 0.5536663124335813,
        "width": 0.05263157894736842,
        "height": 0.05419766206163656
      }
    },
    {
      "id": "mug-handle",
      "label": "The table mug has a right handle.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5215311004784688,
        "top": 0.463336875664187,
        "width": 0.025717703349282296,
        "height": 0.03825717321997875
      }
    },
    {
      "id": "call-crescent",
      "label": "The left elevator button has a crescent.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.05502392344497608,
        "top": 0.3645058448459086,
        "width": 0.02631578947368421,
        "height": 0.06269925611052073
      }
    }
  ]
},
{
  "id": "v4-dream-159",
  "title": "The Sock Puppet's Rebellion",
  "original": "/artwork/v4/collection/dream-159-original-v4.png",
  "altered": "/artwork/v4/collection/dream-159-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "mouth-smile",
      "label": "The puppet closes its mouth.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.32894736842105265,
        "top": 0.19341126461211477,
        "width": 0.11782296650717704,
        "height": 0.12221041445270989
      }
    },
    {
      "id": "tassel-loops",
      "label": "The left curtain tassel forms loops.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.04126794258373206,
        "top": 0.28055260361317746,
        "width": 0.0735645933014354,
        "height": 0.17747077577045697
      }
    },
    {
      "id": "box-lid",
      "label": "The wooden box lid is lowered.",
      "difficulty": "Hard",
      "edgeFade": 5,
      "box": {
        "left": 0.8223684210526315,
        "top": 0.7885228480340064,
        "width": 0.09748803827751196,
        "height": 0.13602550478214664
      }
    },
    {
      "id": "heart-patch",
      "label": "The puppet patch is heart-shaped.",
      "difficulty": "Very hard",
      "edgeFade": 5,
      "box": {
        "left": 0.43241626794258375,
        "top": 0.5430393198724761,
        "width": 0.0645933014354067,
        "height": 0.179596174282678
      }
    },
    {
      "id": "button-stitches",
      "label": "The gold eye has parallel stitches.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.3833732057416268,
        "top": 0.08926673751328375,
        "width": 0.05203349282296651,
        "height": 0.08395324123273114
      }
    }
  ]
},
{
  "id": "v4-dream-160",
  "title": "The Museum of Misplaced Gravity",
  "original": "/artwork/v4/collection/dream-160-original-v4.png",
  "altered": "/artwork/v4/collection/dream-160-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The valve wheel spokes curve.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.5873205741626795,
        "top": 0.7162592986184909,
        "width": 0.07894736842105263,
        "height": 0.15090329436769395
      }
    },
    {
      "id": "change-2",
      "label": "The clock hand points upper left.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.9258373205741627,
        "top": 0.5929861849096706,
        "width": 0.05921052631578947,
        "height": 0.1030818278427205
      }
    },
    {
      "id": "change-3",
      "label": "The cup handle opens at the bottom.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6794258373205742,
        "top": 0.4952178533475027,
        "width": 0.016148325358851676,
        "height": 0.05100956429330499
      }
    },
    {
      "id": "change-4",
      "label": "The bag clasp becomes a diamond.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.1728468899521531,
        "top": 0.6110520722635494,
        "width": 0.023923444976076555,
        "height": 0.048884165781083955
      }
    },
    {
      "id": "change-5",
      "label": "The open book page tip folds down.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.9055023923444976,
        "top": 0.03400637619553666,
        "width": 0.02452153110047847,
        "height": 0.07332624867162593
      }
    }
  ]
},
{
  "id": "v4-dream-163",
  "title": "The Tail of the Queue",
  "original": "/artwork/v4/collection/dream-163-original-v4.png",
  "altered": "/artwork/v4/collection/dream-163-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The left round card has an oval blue reflection.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.0861244019138756,
        "top": 0.4505844845908608,
        "width": 0.04066985645933014,
        "height": 0.07438894792773645
      }
    },
    {
      "id": "change-2",
      "label": "The clock long hand bends into an elbow.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.7547846889952153,
        "top": 0.052072263549415514,
        "width": 0.028110047846889953,
        "height": 0.07438894792773645
      }
    },
    {
      "id": "change-3",
      "label": "The coat peg crescent points up.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.2799043062200957,
        "top": 0.0,
        "width": 0.03588516746411483,
        "height": 0.0669500531349628
      }
    },
    {
      "id": "change-4",
      "label": "The center mint card has a diagonal slit.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.4874401913875598,
        "top": 0.42826780021253985,
        "width": 0.03648325358851675,
        "height": 0.06588735387885228
      }
    },
    {
      "id": "change-5",
      "label": "The desk bell pushbutton is pointed.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.9049043062200957,
        "top": 0.793836344314559,
        "width": 0.02332535885167464,
        "height": 0.04569606801275239
      }
    }
  ]
},
{
  "id": "v4-dream-164",
  "title": "The Violin That Grew Quiet",
  "original": "/artwork/v4/collection/dream-164-original-v4.png",
  "altered": "/artwork/v4/collection/dream-164-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "One tuning key has butterfly wings.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.15490430622009568,
        "top": 0.09989373007438895,
        "width": 0.04904306220095694,
        "height": 0.08289054197662062
      }
    },
    {
      "id": "change-2",
      "label": "The rosin reflects an ear silhouette.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.8319377990430622,
        "top": 0.538788522848034,
        "width": 0.042464114832535885,
        "height": 0.03294367693942614
      }
    },
    {
      "id": "change-3",
      "label": "The rosin lid has a diagonal gold stripe.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8755980861244019,
        "top": 0.5015940488841658,
        "width": 0.07775119617224881,
        "height": 0.11583421891604676
      }
    },
    {
      "id": "change-4",
      "label": "The bow frog medallion becomes a crescent.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8385167464114832,
        "top": 0.71413390010627,
        "width": 0.02631578947368421,
        "height": 0.039319872476089264
      }
    },
    {
      "id": "change-5",
      "label": "The large bridge hole is rounded square.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.5221291866028708,
        "top": 0.31243358129649307,
        "width": 0.023923444976076555,
        "height": 0.05419766206163656
      }
    }
  ]
},
{
  "id": "v4-dream-165",
  "title": "The Sphinx at the Vending Machine",
  "original": "/artwork/v4/collection/dream-165-original-v4.png",
  "altered": "/artwork/v4/collection/dream-165-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The red vending button is concave.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.7972488038277512,
        "top": 0.31243358129649307,
        "width": 0.049641148325358854,
        "height": 0.0924548352816153
      }
    },
    {
      "id": "change-2",
      "label": "The triangular opening has a crossbar.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.7996411483253588,
        "top": 0.6004250797024442,
        "width": 0.056220095693779906,
        "height": 0.07438894792773645
      }
    },
    {
      "id": "change-3",
      "label": "The wall patch has a curved S seam.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7918660287081339,
        "top": 0.09776833156216791,
        "width": 0.07236842105263158,
        "height": 0.11370882040382571
      }
    },
    {
      "id": "change-4",
      "label": "The lamp cap has a crescent inlay.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.18899521531100477,
        "top": 0.04994686503719448,
        "width": 0.049641148325358854,
        "height": 0.0563230605738576
      }
    },
    {
      "id": "change-5",
      "label": "The stone has a triangular reflection.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.4300239234449761,
        "top": 0.46439957492029754,
        "width": 0.041866028708133975,
        "height": 0.052072263549415514
      }
    }
  ]
},
{
  "id": "v4-dream-161",
  "title": "The Hedgehog's Unfinished Armor",
  "original": "/artwork/v4/collection/dream-161-original-v4.png",
  "altered": "/artwork/v4/collection/dream-161-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The scissors blades open.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.5639952153110048,
        "top": 0.7545164718384697,
        "width": 0.11722488038277512,
        "height": 0.11158342189160468
      }
    },
    {
      "id": "change-2",
      "label": "The door knob becomes a ring pull.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.8379186602870813,
        "top": 0.14984059511158343,
        "width": 0.03827751196172249,
        "height": 0.09776833156216791
      }
    },
    {
      "id": "change-3",
      "label": "The upper paper lapel folds outward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4964114832535885,
        "top": 0.2614240170031881,
        "width": 0.07775119617224881,
        "height": 0.11902231668437832
      }
    },
    {
      "id": "change-4",
      "label": "The front bobbin cap has a slot.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6130382775119617,
        "top": 0.8862911795961743,
        "width": 0.03648325358851675,
        "height": 0.05844845908607864
      }
    },
    {
      "id": "change-5",
      "label": "The left shoulder portrait winks.",
      "difficulty": "Dreamlike",
      "edgeFade": 2,
      "box": {
        "left": 0.23803827751196172,
        "top": 0.5005313496280552,
        "width": 0.01674641148325359,
        "height": 0.022316684378320937
      }
    }
  ]
},
{
  "id": "v4-dream-176",
  "title": "The Teacup That Refused Its Handle",
  "original": "/artwork/v4/collection/dream-176-original-v4.png",
  "altered": "/artwork/v4/collection/dream-176-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "chair-back",
      "label": "The rocking chair has a tall wooden back.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.7619617224880383,
        "top": 0.34537725823591925,
        "width": 0.08253588516746412,
        "height": 0.22104144527098832
      }
    },
    {
      "id": "tongs-closed",
      "label": "The sugar tongs\u2019 jaws draw closer together.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.6907894736842105,
        "top": 0.7151965993623804,
        "width": 0.12739234449760767,
        "height": 0.14665249734325186
      }
    },
    {
      "id": "jar-knob",
      "label": "The jar lid knob tilts left.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.02332535885167464,
        "top": 0.023379383634431455,
        "width": 0.06638755980861244,
        "height": 0.08076514346439957
      }
    },
    {
      "id": "spoon-heart",
      "label": "The spoon handle hole is heart-shaped.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.48325358851674644,
        "top": 0.8756641870350691,
        "width": 0.050239234449760764,
        "height": 0.05419766206163656
      }
    },
    {
      "id": "cube-dent",
      "label": "The sugar cube has a curved indentation.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.5789473684210527,
        "top": 0.71413390010627,
        "width": 0.046052631578947366,
        "height": 0.07120085015940489
      }
    }
  ]
},
{
  "id": "v4-dream-162",
  "title": "The Submarine in the Soap Bubble",
  "original": "/artwork/v4/collection/dream-162-original-v4.png",
  "altered": "/artwork/v4/collection/dream-162-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The soap emblem becomes a spiral.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.061004784688995214,
        "top": 0.71413390010627,
        "width": 0.08133971291866028,
        "height": 0.1381509032943677
      }
    },
    {
      "id": "change-2",
      "label": "The periscope mouth bends downward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.4491626794258373,
        "top": 0.31243358129649307,
        "width": 0.038875598086124404,
        "height": 0.0765143464399575
      }
    },
    {
      "id": "change-3",
      "label": "The faucet wing tip folds downward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7093301435406698,
        "top": 0.0021253985122210413,
        "width": 0.09330143540669857,
        "height": 0.10414452709883103
      }
    },
    {
      "id": "change-4",
      "label": "The bubble blower loop opens.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.291866028708134,
        "top": 0.18597236981934112,
        "width": 0.061004784688995214,
        "height": 0.11370882040382571
      }
    },
    {
      "id": "change-5",
      "label": "The orange fish opens its mouth.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.4958133971291866,
        "top": 0.48352816153028694,
        "width": 0.019736842105263157,
        "height": 0.039319872476089264
      }
    }
  ]
},
{
  "id": "v4-dream-118",
  "title": "The Watermelon Gondoliers",
  "original": "/artwork/v4/collection/dream-118-original-v4.png",
  "altered": "/artwork/v4/collection/dream-118-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "A compass rose is painted on the green leaf sail.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.3708133971291866,
        "top": 0.155154091392136,
        "width": 0.1297846889952153,
        "height": 0.2454835281615303
      }
    },
    {
      "id": "change-2",
      "label": "The lantern door swings outward.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.27631578947368424,
        "top": 0.2263549415515409,
        "width": 0.07834928229665072,
        "height": 0.10626992561105207
      }
    },
    {
      "id": "change-3",
      "label": "The green tassel curls into a loop.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6543062200956937,
        "top": 0.5611052072263549,
        "width": 0.06339712918660287,
        "height": 0.09989373007438895
      }
    },
    {
      "id": "change-4",
      "label": "The hat feather curls inward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.20394736842105263,
        "top": 0.33156216790648246,
        "width": 0.04784688995215311,
        "height": 0.06588735387885228
      }
    },
    {
      "id": "change-5",
      "label": "Linked circles weave across the red scarf.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.4072966507177033,
        "top": 0.5696068012752391,
        "width": 0.0651913875598086,
        "height": 0.04357066950053135
      }
    }
  ]
},
{
  "id": "v4-dream-169",
  "title": "The Camel's Last Hump",
  "original": "/artwork/v4/collection/dream-169-original-v4.png",
  "altered": "/artwork/v4/collection/dream-169-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "minute-hand-down",
      "label": "The clock's long minute hand points down.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.2446172248803828,
        "top": 0.04250797024442083,
        "width": 0.01854066985645933,
        "height": 0.09989373007438895
      }
    },
    {
      "id": "sideways-keyhole",
      "label": "The hump lock's keyhole turns sideways.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7236842105263158,
        "top": 0.6163655685441021,
        "width": 0.0215311004784689,
        "height": 0.03294367693942614
      }
    },
    {
      "id": "outward-suitcase-handle",
      "label": "The suitcase handle folds outward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.09629186602870814,
        "top": 0.7683315621679064,
        "width": 0.06399521531100479,
        "height": 0.13071200850159406
      }
    },
    {
      "id": "curled-right-boot",
      "label": "The hump's right boot toe curls upward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7655502392344498,
        "top": 0.742826780021254,
        "width": 0.030502392344497607,
        "height": 0.07438894792773645
      }
    },
    {
      "id": "heart-tag",
      "label": "The luggage tag becomes a heart.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.6118421052631579,
        "top": 0.5749202975557917,
        "width": 0.039473684210526314,
        "height": 0.08926673751328375
      }
    }
  ]
},
{
  "id": "v4-dream-153",
  "title": "The Beekeeper of Static",
  "original": "/artwork/v4/collection/dream-153-original-v4.png",
  "altered": "/artwork/v4/collection/dream-153-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The toolbox handle becomes a closed oval ring.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.053229665071770335,
        "top": 0.6758767268862912,
        "width": 0.09748803827751196,
        "height": 0.11158342189160468
      }
    },
    {
      "id": "change-2",
      "label": "The spatula blade's tip rolls into a tube.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.8552631578947368,
        "top": 0.1785334750265675,
        "width": 0.0645933014354067,
        "height": 0.17534537725823593
      }
    },
    {
      "id": "change-3",
      "label": "The gold switch lever forms a loop.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.26973684210526316,
        "top": 0.718384697130712,
        "width": 0.03648325358851675,
        "height": 0.11902231668437832
      }
    },
    {
      "id": "change-4",
      "label": "A crescent is reflected in the hanging lamp.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8265550239234449,
        "top": 0.05100956429330499,
        "width": 0.039473684210526314,
        "height": 0.10095642933049948
      }
    },
    {
      "id": "change-5",
      "label": "The upper control dial has a three-spoke pointer.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.7517942583732058,
        "top": 0.29968119022316686,
        "width": 0.050239234449760764,
        "height": 0.0818278427205101
      }
    }
  ]
},
{
  "id": "v4-dream-170",
  "title": "The Lighthouse in the Fingertip",
  "original": "/artwork/v4/collection/dream-170-original-v4.png",
  "altered": "/artwork/v4/collection/dream-170-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "upright-button-stitch",
      "label": "The cuff button stitches form a plus sign.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.07177033492822966,
        "top": 0.4814027630180659,
        "width": 0.046052631578947366,
        "height": 0.09032943676939426
      }
    },
    {
      "id": "left-pennant",
      "label": "The boat pennant points left.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.6489234449760766,
        "top": 0.37725823591923485,
        "width": 0.050239234449760764,
        "height": 0.04569606801275239
      }
    },
    {
      "id": "figure-eight-thread",
      "label": "The blue thread loop forms a figure eight.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.0,
        "top": 0.7470775770456961,
        "width": 0.1303827751196172,
        "height": 0.1179596174282678
      }
    },
    {
      "id": "hexagonal-thimble-base",
      "label": "The thimble base becomes hexagonal.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.15430622009569378,
        "top": 0.8267800212539851,
        "width": 0.11602870813397129,
        "height": 0.07332624867162593
      }
    },
    {
      "id": "diagonal-window-braces",
      "label": "The lighthouse window gains diagonal braces.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.6046650717703349,
        "top": 0.09989373007438895,
        "width": 0.03648325358851675,
        "height": 0.07226354941551541
      }
    }
  ]
},
{
  "id": "v4-dream-172",
  "title": "The Sloth Who Hurried Slowly",
  "original": "/artwork/v4/collection/dream-172-original-v4.png",
  "altered": "/artwork/v4/collection/dream-172-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The brass bell has a crosswise bar handle.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.025119617224880382,
        "top": 0.640807651434644,
        "width": 0.06698564593301436,
        "height": 0.061636556854410204
      }
    },
    {
      "id": "change-2",
      "label": "The slipper patch has a crescent embroidery.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.39055023923444976,
        "top": 0.7056323060573858,
        "width": 0.04366028708133971,
        "height": 0.06376195536663125
      }
    },
    {
      "id": "change-3",
      "label": "The hourglass falling stream curves like an S.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6979665071770335,
        "top": 0.6663124335812965,
        "width": 0.025717703349282296,
        "height": 0.08395324123273114
      }
    },
    {
      "id": "change-4",
      "label": "The scarf clasp thread slopes diagonally.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.27452153110047844,
        "top": 0.3294367693942614,
        "width": 0.034688995215311005,
        "height": 0.04569606801275239
      }
    },
    {
      "id": "change-5",
      "label": "The cushion button has a diagonal slot.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.04844497607655503,
        "top": 0.19234856535600425,
        "width": 0.02751196172248804,
        "height": 0.05419766206163656
      }
    }
  ]
},
{
  "id": "v4-dream-174",
  "title": "The Chef Who Stirred a Spiral",
  "original": "/artwork/v4/collection/dream-174-original-v4.png",
  "altered": "/artwork/v4/collection/dream-174-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The stirring spoon has a crescent opening.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.49940191387559807,
        "top": 0.667375132837407,
        "width": 0.03648325358851675,
        "height": 0.07226354941551541
      }
    },
    {
      "id": "change-2",
      "label": "The apron medallion shows a gold stepped spiral.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.2811004784688995,
        "top": 0.30818278427205104,
        "width": 0.02751196172248804,
        "height": 0.04675876726886291
      }
    },
    {
      "id": "change-3",
      "label": "The central pot lid handle tilts left.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.562799043062201,
        "top": 0.29330499468650373,
        "width": 0.02930622009569378,
        "height": 0.04144527098831031
      }
    },
    {
      "id": "change-4",
      "label": "One tall spatula slot zigzags.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.9599282296650717,
        "top": 0.052072263549415514,
        "width": 0.034688995215311005,
        "height": 0.11689691817215728
      }
    },
    {
      "id": "change-5",
      "label": "The counter lid top knob is conical.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.028110047846889953,
        "top": 0.6896918172157279,
        "width": 0.03110047846889952,
        "height": 0.05951115834218916
      }
    }
  ]
},
{
  "id": "v4-dream-175",
  "title": "The Polar Bear's Warm Shadow",
  "original": "/artwork/v4/collection/dream-175-original-v4.png",
  "altered": "/artwork/v4/collection/dream-175-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "One knitting needle has a diamond end cap.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.17404306220095694,
        "top": 0.4059511158342189,
        "width": 0.03409090909090909,
        "height": 0.05844845908607864
      }
    },
    {
      "id": "change-2",
      "label": "The yarn bowl guide curls inward.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.09928229665071771,
        "top": 0.6354941551540914,
        "width": 0.03648325358851675,
        "height": 0.0818278427205101
      }
    },
    {
      "id": "change-3",
      "label": "The windowsill mug shows a gold crescent.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.025119617224880382,
        "top": 0.16259298618490967,
        "width": 0.031698564593301434,
        "height": 0.053134962805526036
      }
    },
    {
      "id": "change-4",
      "label": "The chair brace has an arched notch.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8809808612440191,
        "top": 0.4463336875664187,
        "width": 0.046052631578947366,
        "height": 0.06482465462274177
      }
    },
    {
      "id": "change-5",
      "label": "The small wall print moon becomes a crescent.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.7147129186602871,
        "top": 0.1126461211477152,
        "width": 0.02452153110047847,
        "height": 0.04357066950053135
      }
    }
  ]
},
{
  "id": "v4-dream-177",
  "title": "The Railway of Sleeping Giants",
  "original": "/artwork/v4/collection/dream-177-original-v4.png",
  "altered": "/artwork/v4/collection/dream-177-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "rabbit-eye",
      "label": "The giant rabbit opens its eye.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.6453349282296651,
        "top": 0.0765143464399575,
        "width": 0.03588516746411483,
        "height": 0.05526036131774708
      }
    },
    {
      "id": "robot-key",
      "label": "The robot key has one round loop.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.8773923444976076,
        "top": 0.2252922422954304,
        "width": 0.06160287081339713,
        "height": 0.10839532412327312
      }
    },
    {
      "id": "sign-train",
      "label": "The warning sign shows a locomotive.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6345693779904307,
        "top": 0.3793836344314559,
        "width": 0.030502392344497607,
        "height": 0.05526036131774708
      }
    },
    {
      "id": "case-handle",
      "label": "The suitcase handle lies on its front.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6351674641148325,
        "top": 0.5441020191285866,
        "width": 0.045454545454545456,
        "height": 0.06801275239107332
      },
      "source": "/artwork/v4/collection/dream-177-refine-source-v4.png"
    },
    {
      "id": "block-moon",
      "label": "The rail block has a crescent inset.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.6854066985645934,
        "top": 0.7545164718384697,
        "width": 0.03349282296650718,
        "height": 0.053134962805526036
      }
    }
  ]
},
{
  "id": "v4-dream-179",
  "title": "The Angler of Loose Buttons",
  "original": "/artwork/v4/collection/dream-179-original-v4.png",
  "altered": "/artwork/v4/collection/dream-179-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The case clasp has a crescent aperture.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.6028708133971292,
        "top": 0.3708820403825717,
        "width": 0.05203349282296651,
        "height": 0.07120085015940489
      }
    },
    {
      "id": "change-2",
      "label": "The loose white button has a single slot.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.02033492822966507,
        "top": 0.5462274176408076,
        "width": 0.06698564593301436,
        "height": 0.026567481402763018
      }
    },
    {
      "id": "change-3",
      "label": "The thread spool winding runs diagonally.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7242822966507177,
        "top": 0.06376195536663125,
        "width": 0.09868421052631579,
        "height": 0.1944739638682253
      }
    },
    {
      "id": "change-4",
      "label": "The left antenna tip curls upward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.3570574162679426,
        "top": 0.048884165781083955,
        "width": 0.16267942583732056,
        "height": 0.23804463336875664
      }
    },
    {
      "id": "change-5",
      "label": "The gold pin head becomes a teardrop.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.9533492822966507,
        "top": 0.08820403825717323,
        "width": 0.014952153110047847,
        "height": 0.030818278427205102
      }
    }
  ]
},
{
  "id": "v4-dream-154",
  "title": "The Girl Who Carried the Ceiling",
  "original": "/artwork/v4/collection/dream-154-original-v4.png",
  "altered": "/artwork/v4/collection/dream-154-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "A braid runs along the pillow's central stripe.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.8391148325358851,
        "top": 0.7481402763018066,
        "width": 0.04904306220095694,
        "height": 0.15196599362380447
      }
    },
    {
      "id": "change-2",
      "label": "A crescent is painted on the upside-down lampshade.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.6543062200956937,
        "top": 0.2603613177470776,
        "width": 0.05562200956937799,
        "height": 0.07120085015940489
      }
    },
    {
      "id": "change-3",
      "label": "The hanging bag's flap opens.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6985645933014354,
        "top": 0.6822529224229543,
        "width": 0.04784688995215311,
        "height": 0.1487778958554729
      }
    },
    {
      "id": "change-4",
      "label": "The overall pocket's upper edge folds outward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.34629186602870815,
        "top": 0.43251859723698194,
        "width": 0.04425837320574163,
        "height": 0.06376195536663125
      }
    },
    {
      "id": "change-5",
      "label": "The loose shoelace ties itself into a knot.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.37440191387559807,
        "top": 0.9383634431455898,
        "width": 0.061004784688995214,
        "height": 0.04782146652497343
      }
    }
  ]
},
{
  "id": "v4-dream-166",
  "title": "The Raincoat's Indoor Parade",
  "original": "/artwork/v4/collection/dream-166-original-v4.png",
  "altered": "/artwork/v4/collection/dream-166-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "canopy",
      "label": "The umbrella stand's right canopy tip curls upward.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.08313397129186603,
        "top": 0.33156216790648246,
        "width": 0.034688995215311005,
        "height": 0.06482465462274177
      }
    },
    {
      "id": "drain",
      "label": "The floor drain has parallel bars.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7942583732057417,
        "top": 0.7162592986184909,
        "width": 0.08074162679425838,
        "height": 0.04357066950053135
      }
    },
    {
      "id": "bluehood",
      "label": "The blue hood rim folds inward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5131578947368421,
        "top": 0.13496280552603612,
        "width": 0.029904306220095694,
        "height": 0.057385759829968117
      }
    },
    {
      "id": "hood",
      "label": "The red hood seam has chain stitches.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.2583732057416268,
        "top": 0.04357066950053135,
        "width": 0.07715311004784689,
        "height": 0.10945802337938364
      }
    },
    {
      "id": "lamp",
      "label": "The ceiling lamp shade becomes straight-sided.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8433014354066986,
        "top": 0.01700318809776833,
        "width": 0.049641148325358854,
        "height": 0.05100956429330499
      }
    }
  ]
},
{
  "id": "v4-dream-167",
  "title": "The Paper Tiger's Gentle Bite",
  "original": "/artwork/v4/collection/dream-167-original-v4.png",
  "altered": "/artwork/v4/collection/dream-167-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "tail",
      "label": "The tiger's tail tip curls into a closed loop.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.8923444976076556,
        "top": 0.04144527098831031,
        "width": 0.07715311004784689,
        "height": 0.15727948990435706
      }
    },
    {
      "id": "cord",
      "label": "The white cord gains a tied bow.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.4300239234449761,
        "top": 0.44739638682252925,
        "width": 0.06279904306220095,
        "height": 0.11689691817215728
      }
    },
    {
      "id": "ear",
      "label": "The paper deer's upper ear folds sideways.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.31220095693779903,
        "top": 0.4452709883103082,
        "width": 0.04665071770334928,
        "height": 0.09032943676939426
      }
    },
    {
      "id": "button",
      "label": "The brown button has one cross-shaped opening.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8397129186602871,
        "top": 0.8416578108395324,
        "width": 0.06160287081339713,
        "height": 0.07226354941551541
      }
    },
    {
      "id": "fastener",
      "label": "The gold fastener head becomes a hollow diamond.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.3373205741626794,
        "top": 0.1594048884165781,
        "width": 0.04844497607655503,
        "height": 0.10201912858660998
      }
    }
  ]
},
{
  "id": "v4-dream-168",
  "title": "The Diver of Unmade Beds",
  "original": "/artwork/v4/collection/dream-168-original-v4.png",
  "altered": "/artwork/v4/collection/dream-168-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "sail",
      "label": "The toy ship's sail billows right.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.25,
        "top": 0.6248671625929861,
        "width": 0.06937799043062201,
        "height": 0.12008501594048884
      }
    },
    {
      "id": "ear",
      "label": "The stuffed bunny's far ear curls downward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.791267942583732,
        "top": 0.3475026567481403,
        "width": 0.053229665071770335,
        "height": 0.07226354941551541
      }
    },
    {
      "id": "block",
      "label": "The block's blue rabbit sits upright.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5382775119617225,
        "top": 0.5111583421891605,
        "width": 0.03289473684210526,
        "height": 0.08076514346439957
      }
    },
    {
      "id": "grille",
      "label": "The helmet side grille has diagonal bars.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.361244019138756,
        "top": 0.2592986184909671,
        "width": 0.03648325358851675,
        "height": 0.061636556854410204
      }
    },
    {
      "id": "patch",
      "label": "The duvet patch's lower seam has crossed stitches.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8235645933014354,
        "top": 0.17109458023379384,
        "width": 0.0735645933014354,
        "height": 0.08501594048884166
      }
    }
  ]
},
{
  "id": "v4-dream-178",
  "title": "The Painter of Invisible Windows",
  "original": "/artwork/v4/collection/dream-178-original-v4.png",
  "altered": "/artwork/v4/collection/dream-178-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "cushion-diamonds",
      "label": "The armchair cushion has diamond checks.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.4126794258373206,
        "top": 0.13283740701381508,
        "width": 0.04904306220095694,
        "height": 0.06588735387885228
      }
    },
    {
      "id": "cat-eye",
      "label": "The cat closes its eye.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.14055023923444976,
        "top": 0.5196599362380446,
        "width": 0.025119617224880382,
        "height": 0.03400637619553666
      }
    },
    {
      "id": "tray-oval",
      "label": "The paint tray has an oval handle.",
      "difficulty": "Hard",
      "edgeFade": 5,
      "box": {
        "left": 0.9210526315789473,
        "top": 0.7683315621679064,
        "width": 0.056818181818181816,
        "height": 0.09032943676939426
      }
    },
    {
      "id": "towel-loops",
      "label": "The bath towel has knotted fringe.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8098086124401914,
        "top": 0.5823591923485654,
        "width": 0.035287081339712915,
        "height": 0.04357066950053135
      }
    },
    {
      "id": "brush-hole",
      "label": "The brush handle hole is round.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.7159090909090909,
        "top": 0.28374070138150903,
        "width": 0.0215311004784689,
        "height": 0.039319872476089264
      }
    }
  ]
},
{
  "id": "v4-dream-156",
  "title": "The Dinner That Floated Away",
  "original": "/artwork/v4/collection/dream-156-original-v4.png",
  "altered": "/artwork/v4/collection/dream-156-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The floating tablecloth's front corner rolls into a tube.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.7284688995215312,
        "top": 0.3230605738575983,
        "width": 0.11244019138755981,
        "height": 0.11370882040382571
      }
    },
    {
      "id": "change-2",
      "label": "The chair towel's loose end ties into a knot.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.7703349282296651,
        "top": 0.6036131774707758,
        "width": 0.050239234449760764,
        "height": 0.13708820403825717
      }
    },
    {
      "id": "change-3",
      "label": "The pitcher handle forms a figure eight.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8995215311004785,
        "top": 0.691817215727949,
        "width": 0.04425837320574163,
        "height": 0.14984059511158343
      }
    },
    {
      "id": "change-4",
      "label": "The service bell's dome hinges open.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6907894736842105,
        "top": 0.5249734325185972,
        "width": 0.04784688995215311,
        "height": 0.08820403825717323
      }
    },
    {
      "id": "change-5",
      "label": "The chair\u2019s lower crossbar bows upward and turns green.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.6190191387559809,
        "top": 0.8034006376195537,
        "width": 0.09988038277511961,
        "height": 0.06801275239107332
      }
    }
  ]
},
{
  "id": "v4-dream-171",
  "title": "The Orchestra of Unopened Letters",
  "original": "/artwork/v4/collection/dream-171-original-v4.png",
  "altered": "/artwork/v4/collection/dream-171-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "star-wax-seal",
      "label": "The wax seal carries an embossed star.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.5221291866028708,
        "top": 0.3241232731137088,
        "width": 0.039473684210526314,
        "height": 0.07120085015940489
      }
    },
    {
      "id": "pointing-glove",
      "label": "The conductor points one finger upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.6357655502392344,
        "top": 0.1997874601487779,
        "width": 0.04665071770334928,
        "height": 0.0871413390010627
      }
    },
    {
      "id": "open-valve-cover",
      "label": "The brass valve's front cover hangs open.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8791866028708134,
        "top": 0.6950053134962806,
        "width": 0.05502392344497608,
        "height": 0.16259298618490967
      }
    },
    {
      "id": "diamond-mallet",
      "label": "The right mallet has a diamond-shaped head.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8971291866028708,
        "top": 0.14558979808714134,
        "width": 0.056818181818181816,
        "height": 0.12433581296493093
      }
    },
    {
      "id": "forked-pen-nib",
      "label": "The fountain pen nib splits into two tips.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.4772727272727273,
        "top": 0.04994686503719448,
        "width": 0.037679425837320576,
        "height": 0.08501594048884166
      }
    }
  ]
},
{
  "id": "v4-dream-180",
  "title": "The Carnival Folded in a Fan",
  "original": "/artwork/v4/collection/dream-180-original-v4.png",
  "altered": "/artwork/v4/collection/dream-180-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The card motif becomes a crescent.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.23684210526315788,
        "top": 0.798087141339001,
        "width": 0.03708133971291866,
        "height": 0.05951115834218916
      }
    },
    {
      "id": "change-2",
      "label": "The fan hinge gem becomes round.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.49282296650717705,
        "top": 0.8150903294367694,
        "width": 0.03708133971291866,
        "height": 0.06482465462274177
      }
    },
    {
      "id": "change-3",
      "label": "The carousel rabbit ear bends downward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4090909090909091,
        "top": 0.23698193411264612,
        "width": 0.03289473684210526,
        "height": 0.06057385759829968
      }
    },
    {
      "id": "change-4",
      "label": "The tightrope mouse tail curls upward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6124401913875598,
        "top": 0.2051009564293305,
        "width": 0.056220095693779906,
        "height": 0.06907545164718384
      }
    },
    {
      "id": "change-5",
      "label": "The upper wheel bucket has a gold chevron.",
      "difficulty": "Dreamlike",
      "edgeFade": 2,
      "box": {
        "left": 0.2751196172248804,
        "top": 0.38575982996811903,
        "width": 0.02033492822966507,
        "height": 0.02975557917109458
      }
    }
  ]
},
{
  "id": "v4-dream-181",
  "title": "The Alien Who Unrolled the Hallway",
  "original": "/artwork/v4/collection/dream-181-original-v4.png",
  "altered": "/artwork/v4/collection/dream-181-altered-source-v4.png",
  "aspectRatio": 1672 / 940,
  "edits": [
    {
      "id": "change-1",
      "label": "The door knocker ring opens at the bottom.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.17105263157894737,
        "top": 0.1851063829787234,
        "width": 0.05203349282296651,
        "height": 0.09361702127659574
      }
    },
    {
      "id": "change-2",
      "label": "The umbrella handle bends into an S.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.9204545454545454,
        "top": 0.2404255319148936,
        "width": 0.05502392344497608,
        "height": 0.16702127659574467
      }
    },
    {
      "id": "change-3",
      "label": "The left head tendril curls upward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.24401913875598086,
        "top": 0.09893617021276596,
        "width": 0.07655502392344497,
        "height": 0.17872340425531916
      }
    },
    {
      "id": "change-4",
      "label": "The right white shoe has parallel lacing.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.10227272727272728,
        "top": 0.5297872340425532,
        "width": 0.025717703349282296,
        "height": 0.035106382978723406
      }
    },
    {
      "id": "change-5",
      "label": "The door knob becomes faceted.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.1297846889952153,
        "top": 0.2925531914893617,
        "width": 0.023923444976076555,
        "height": 0.05106382978723404
      }
    }
  ]
},
{
  "id": "v4-dream-182",
  "title": "Footprints in the Fishing Net",
  "original": "/artwork/v4/collection/dream-182-original-v4.png",
  "altered": "/artwork/v4/collection/dream-182-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The far footprint reflects a ringed planet.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.08971291866028708,
        "top": 0.14133900106269925,
        "width": 0.03289473684210526,
        "height": 0.04569606801275239
      }
    },
    {
      "id": "change-2",
      "label": "The middle reflected crescent is larger.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.2374401913875598,
        "top": 0.35812964930924546,
        "width": 0.028708133971291867,
        "height": 0.04569606801275239
      }
    },
    {
      "id": "change-3",
      "label": "The thermos cap has a curved carrying hook.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8744019138755981,
        "top": 0.24867162592986186,
        "width": 0.05442583732057416,
        "height": 0.07013815090329437
      }
    },
    {
      "id": "change-4",
      "label": "The nearest crab claw is open.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8708133971291866,
        "top": 0.7120085015940489,
        "width": 0.04904306220095694,
        "height": 0.06801275239107332
      }
    },
    {
      "id": "change-5",
      "label": "The pocket stone has a gold diagonal seam.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.6758373205741627,
        "top": 0.3517534537725824,
        "width": 0.04126794258373206,
        "height": 0.09670563230605739
      }
    }
  ]
},
{
  "id": "v4-dream-183",
  "title": "The Computer That Lost Its Marbles",
  "original": "/artwork/v4/collection/dream-183-original-v4.png",
  "altered": "/artwork/v4/collection/dream-183-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The amber marble reflects a blue fish.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.4055023923444976,
        "top": 0.7853347502656748,
        "width": 0.04844497607655503,
        "height": 0.07545164718384698
      }
    },
    {
      "id": "change-2",
      "label": "The red power rocker tilts inward at the bottom.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.736244019138756,
        "top": 0.16259298618490967,
        "width": 0.02930622009569378,
        "height": 0.077577045696068
      }
    },
    {
      "id": "change-3",
      "label": "The front drawer has a triangular pull.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5430622009569378,
        "top": 0.7906482465462275,
        "width": 0.022727272727272728,
        "height": 0.04250797024442083
      }
    },
    {
      "id": "change-4",
      "label": "The mouse scroll wheel has an oval opening.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8839712918660287,
        "top": 0.5823591923485654,
        "width": 0.02452153110047847,
        "height": 0.053134962805526036
      }
    },
    {
      "id": "change-5",
      "label": "One notebook antenna curls into a spiral.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.2840909090909091,
        "top": 0.9054197662061636,
        "width": 0.029904306220095694,
        "height": 0.0669500531349628
      }
    }
  ]
},
{
  "id": "v4-dream-184",
  "title": "The Braid That Held the Bridge",
  "original": "/artwork/v4/collection/dream-184-original-v4.png",
  "altered": "/artwork/v4/collection/dream-184-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The first envelope wax seal has a crescent.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.46351674641148327,
        "top": 0.4027630180658874,
        "width": 0.029904306220095694,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "change-2",
      "label": "The second envelope bow turns sideways.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.5825358851674641,
        "top": 0.4920297555791711,
        "width": 0.04066985645933014,
        "height": 0.0669500531349628
      }
    },
    {
      "id": "change-3",
      "label": "The third seal reflects a blue arched window.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7380382775119617,
        "top": 0.5090329436769394,
        "width": 0.023923444976076555,
        "height": 0.04994686503719448
      }
    },
    {
      "id": "change-4",
      "label": "An extra white strap crosses the upper boot.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.23444976076555024,
        "top": 0.7332624867162593,
        "width": 0.03229665071770335,
        "height": 0.036131774707757705
      }
    },
    {
      "id": "change-5",
      "label": "The arm badge flower stem curls right.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.16507177033492823,
        "top": 0.22316684378320936,
        "width": 0.022727272727272728,
        "height": 0.03506907545164718
      }
    }
  ]
},
{
  "id": "v4-dream-188",
  "title": "The Photographer Outside the Photograph",
  "original": "/artwork/v4/collection/dream-188-original-v4.png",
  "altered": "/artwork/v4/collection/dream-188-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "clip-open",
      "label": "The left clothespin opens wider.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.03110047846889952,
        "top": 0.0010626992561105207,
        "width": 0.03349282296650718,
        "height": 0.11583421891604676
      }
    },
    {
      "id": "timer-hand",
      "label": "The timer's long hand points right.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.8092105263157895,
        "top": 0.18703506907545164,
        "width": 0.0651913875598086,
        "height": 0.11052072263549416
      },
      "source": "/artwork/v4/collection/dream-188-timer-selected-source-v4.png"
    },
    {
      "id": "bottle-cap",
      "label": "The amber bottle cap tilts left.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7697368421052632,
        "top": 0.06057385759829968,
        "width": 0.056818181818181816,
        "height": 0.08820403825717323
      }
    },
    {
      "id": "glass-scale",
      "label": "The glass vessel has diagonal scale marks.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.05263157894736842,
        "top": 0.49840595111583424,
        "width": 0.02631578947368421,
        "height": 0.1742826780021254
      }
    },
    {
      "id": "camera-moon",
      "label": "The camera dial carries a crescent.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.07894736842105263,
        "top": 0.6737513283740701,
        "width": 0.029904306220095694,
        "height": 0.036131774707757705
      }
    }
  ]
},
{
  "id": "v4-dream-185",
  "title": "The Kite That Swallowed the Wind",
  "original": "/artwork/v4/collection/dream-185-original-v4.png",
  "altered": "/artwork/v4/collection/dream-185-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "eye",
      "label": "The kite's left eye closes in a wink.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.35586124401913877,
        "top": 0.20403825717321997,
        "width": 0.06698564593301436,
        "height": 0.06269925611052073
      }
    },
    {
      "id": "arrow",
      "label": "The weather arrow's lower barb curls upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7105263157894737,
        "top": 0.14771519659936239,
        "width": 0.0651913875598086,
        "height": 0.08395324123273114
      }
    },
    {
      "id": "cap",
      "label": "The chimney cap supports slant diagonally.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5526315789473685,
        "top": 0.33049946865037194,
        "width": 0.12021531100478469,
        "height": 0.0871413390010627
      }
    },
    {
      "id": "spool",
      "label": "The spool thread is cross-wound.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7117224880382775,
        "top": 0.5324123273113709,
        "width": 0.06279904306220095,
        "height": 0.0924548352816153
      }
    },
    {
      "id": "patch",
      "label": "The kite patch's right corner curls upward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.2900717703349282,
        "top": 0.37300743889479276,
        "width": 0.037679425837320576,
        "height": 0.0818278427205101
      }
    }
  ]
},
{
  "id": "v4-dream-186",
  "title": "The Mermaid and the Silent Keys",
  "original": "/artwork/v4/collection/dream-186-original-v4.png",
  "altered": "/artwork/v4/collection/dream-186-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "page",
      "label": "The right music page's lower corner folds up.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.5538277511961722,
        "top": 0.2263549415515409,
        "width": 0.034688995215311005,
        "height": 0.057385759829968117
      }
    },
    {
      "id": "cushion",
      "label": "The piano cushion has chevron folds.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.22547846889952153,
        "top": 0.5642933049946866,
        "width": 0.13696172248803828,
        "height": 0.05844845908607864
      }
    },
    {
      "id": "handle",
      "label": "The chest ring pull becomes pointed.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.04724880382775119,
        "top": 0.6535600425079703,
        "width": 0.025119617224880382,
        "height": 0.08289054197662062
      }
    },
    {
      "id": "pendulum",
      "label": "The metronome pendulum tilts left.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6429425837320574,
        "top": 0.12964930924548354,
        "width": 0.05203349282296651,
        "height": 0.11052072263549416
      }
    },
    {
      "id": "seahorse",
      "label": "The piano seahorse lower curve swings left.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.6967703349282297,
        "top": 0.09139213602550478,
        "width": 0.03110047846889952,
        "height": 0.09458023379383634
      }
    }
  ]
},
{
  "id": "v4-dream-194",
  "title": "The City on the Tongue of a Shoe",
  "original": "/artwork/v4/collection/dream-194-original-v4.png",
  "altered": "/artwork/v4/collection/dream-194-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "A blue spiral is painted on the shoe's rubber toe.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.16267942583732056,
        "top": 0.6567481402763018,
        "width": 0.16626794258373206,
        "height": 0.1997874601487779
      }
    },
    {
      "id": "change-2",
      "label": "The mug handle forms a figure eight.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.14114832535885166,
        "top": 0.0,
        "width": 0.0651913875598086,
        "height": 0.1742826780021254
      }
    },
    {
      "id": "change-3",
      "label": "The loose shoelace knots itself near its metal tip.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6261961722488039,
        "top": 0.7821466524973433,
        "width": 0.0861244019138756,
        "height": 0.14133900106269925
      }
    },
    {
      "id": "change-4",
      "label": "The rooftop towel's loose end ties into a knot.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5938995215311005,
        "top": 0.16259298618490967,
        "width": 0.04126794258373206,
        "height": 0.18809776833156217
      }
    },
    {
      "id": "change-5",
      "label": "The tongue patch's upper-right corner folds outward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.4288277511961722,
        "top": 0.03719447396386823,
        "width": 0.03827751196172249,
        "height": 0.11158342189160468
      }
    }
  ]
},
{
  "id": "v4-dream-189",
  "title": "The Bicycle That Pedaled Backwards",
  "original": "/artwork/v4/collection/dream-189-original-v4.png",
  "altered": "/artwork/v4/collection/dream-189-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "pedal-up",
      "label": "The red bicycle pedal stands upright.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.4258373205741627,
        "top": 0.5451647183846972,
        "width": 0.05203349282296651,
        "height": 0.10945802337938364
      }
    },
    {
      "id": "stone-eye",
      "label": "The left stone closes one eye.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.145933014354067,
        "top": 0.4622741764080765,
        "width": 0.022727272727272728,
        "height": 0.04357066950053135
      }
    },
    {
      "id": "mug-diamonds",
      "label": "The mug has red diamond motifs.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.0,
        "top": 0.7895855472901169,
        "width": 0.04784688995215311,
        "height": 0.1073326248671626
      }
    },
    {
      "id": "knocker-heart",
      "label": "The green door has a heart knocker.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.012559808612440191,
        "top": 0.0563230605738576,
        "width": 0.035287081339712915,
        "height": 0.07226354941551541
      }
    },
    {
      "id": "bell-moon",
      "label": "The bicycle bell carries a crescent.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.6949760765550239,
        "top": 0.155154091392136,
        "width": 0.022129186602870814,
        "height": 0.039319872476089264
      }
    }
  ]
},
{
  "id": "v4-dream-201",
  "title": "The Angry Accordion",
  "original": "/artwork/v4/collection/dream-201-original-v4.png",
  "altered": "/artwork/v4/collection/dream-201-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The bellows patch has a cross seam.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.5502392344497608,
        "top": 0.46014877789585545,
        "width": 0.06578947368421052,
        "height": 0.12008501594048884
      }
    },
    {
      "id": "change-2",
      "label": "The right wooden foot curls upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.5610047846889952,
        "top": 0.7832093517534537,
        "width": 0.07595693779904306,
        "height": 0.11689691817215728
      }
    },
    {
      "id": "change-3",
      "label": "The strap buckle has a crescent aperture.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.27392344497607657,
        "top": 0.4208289054197662,
        "width": 0.039473684210526314,
        "height": 0.07120085015940489
      }
    },
    {
      "id": "change-4",
      "label": "The table fork tines curl upward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.04425837320574163,
        "top": 0.4218916046758767,
        "width": 0.04485645933014354,
        "height": 0.0563230605738576
      }
    },
    {
      "id": "change-5",
      "label": "The shelf cup handle opens.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8797846889952153,
        "top": 0.0924548352816153,
        "width": 0.026913875598086126,
        "height": 0.0563230605738576
      }
    }
  ]
},
{
  "id": "v4-dream-202",
  "title": "The Snail Who Outgrew the Spiral",
  "original": "/artwork/v4/collection/dream-202-original-v4.png",
  "altered": "/artwork/v4/collection/dream-202-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The round window mullion forms an S.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.20992822966507177,
        "top": 0.3740701381509033,
        "width": 0.05980861244019139,
        "height": 0.12964930924548354
      }
    },
    {
      "id": "change-2",
      "label": "The middle door knob becomes a ring pull.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.46830143540669855,
        "top": 0.5738575982996812,
        "width": 0.02033492822966507,
        "height": 0.04675876726886291
      }
    },
    {
      "id": "change-3",
      "label": "The scarf free end folds upward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8444976076555024,
        "top": 0.34643995749202977,
        "width": 0.13875598086124402,
        "height": 0.32199787460148777
      }
    },
    {
      "id": "change-4",
      "label": "The right antenna tip bends downward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8175837320574163,
        "top": 0.19872476089266738,
        "width": 0.06638755980861244,
        "height": 0.12433581296493093
      }
    },
    {
      "id": "change-5",
      "label": "The bag clasp becomes a crescent.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.7458133971291866,
        "top": 0.5802337938363443,
        "width": 0.028708133971291867,
        "height": 0.05100956429330499
      }
    }
  ]
},
{
  "id": "v4-dream-195",
  "title": "The Cartographer of Crumpled Air",
  "original": "/artwork/v4/collection/dream-195-original-v4.png",
  "altered": "/artwork/v4/collection/dream-195-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "A crescent is reflected in the iron's teal body.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.2069377990430622,
        "top": 0.4250797024442083,
        "width": 0.1034688995215311,
        "height": 0.09670563230605739
      }
    },
    {
      "id": "change-2",
      "label": "The gold paperweight container's lid hinges open.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.11483253588516747,
        "top": 0.6099893730074389,
        "width": 0.09688995215311005,
        "height": 0.1785334750265675
      }
    },
    {
      "id": "change-3",
      "label": "The book's retaining strap ties itself into a knot.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.16028708133971292,
        "top": 0.8990435706695006,
        "width": 0.049641148325358854,
        "height": 0.077577045696068
      }
    },
    {
      "id": "change-4",
      "label": "The red compass needle curls into a loop.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7655502392344498,
        "top": 0.5005313496280552,
        "width": 0.04366028708133971,
        "height": 0.0871413390010627
      }
    },
    {
      "id": "change-5",
      "label": "The sand falls in a helix inside the hourglass.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.94377990430622,
        "top": 0.6599362380446334,
        "width": 0.03409090909090909,
        "height": 0.10095642933049948
      }
    }
  ]
},
{
  "id": "v4-dream-187",
  "title": "The Dragon in the Matchbox",
  "original": "/artwork/v4/collection/dream-187-original-v4.png",
  "altered": "/artwork/v4/collection/dream-187-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "disk",
      "label": "The ceramic disk has a curved pinwheel motif.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.7063397129186603,
        "top": 0.7598299681190224,
        "width": 0.11483253588516747,
        "height": 0.12858660998937302
      }
    },
    {
      "id": "wing",
      "label": "The dragon wing's rib branches into a Y.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.26016746411483255,
        "top": 0.1849096705632306,
        "width": 0.18301435406698566,
        "height": 0.22210414452709884
      }
    },
    {
      "id": "match",
      "label": "The held match head curls downward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5855263157894737,
        "top": 0.37194473963868224,
        "width": 0.04784688995215311,
        "height": 0.09883103081827843
      }
    },
    {
      "id": "shadow",
      "label": "The mantel cat shadow's tail curls upward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8630382775119617,
        "top": 0.023379383634431455,
        "width": 0.038875598086124404,
        "height": 0.10520722635494155
      }
    },
    {
      "id": "box",
      "label": "The matchbox corner folds out into a flap.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.3803827751196172,
        "top": 0.8097768331562167,
        "width": 0.05083732057416268,
        "height": 0.10095642933049948
      }
    }
  ]
},
{
  "id": "v4-dream-191",
  "title": "The Mask That Blushed Alone",
  "original": "/artwork/v4/collection/dream-191-original-v4.png",
  "altered": "/artwork/v4/collection/dream-191-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "open-eye",
      "label": "The seated mask opens one eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.4533492822966507,
        "top": 0.3018065887353879,
        "width": 0.03648325358851675,
        "height": 0.07013815090329437
      }
    },
    {
      "id": "reflection-frown",
      "label": "The reflected mask frowns.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.45873205741626794,
        "top": 0.8129649309245484,
        "width": 0.053229665071770335,
        "height": 0.0765143464399575
      }
    },
    {
      "id": "heart-hole",
      "label": "The hanging mask has a heart-shaped hole.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.26973684210526316,
        "top": 0.1594048884165781,
        "width": 0.03229665071770335,
        "height": 0.07438894792773645
      }
    },
    {
      "id": "diamond-button",
      "label": "The chair button becomes a diamond.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.48983253588516745,
        "top": 0.1647183846971307,
        "width": 0.029904306220095694,
        "height": 0.05951115834218916
      }
    },
    {
      "id": "curled-tail",
      "label": "The bow\u2019s right tail curls upward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.6106459330143541,
        "top": 0.0669500531349628,
        "width": 0.026913875598086126,
        "height": 0.06588735387885228
      }
    }
  ]
},
{
  "id": "v4-dream-203",
  "title": "The Bedtime Bureau of Lost Socks",
  "original": "/artwork/v4/collection/dream-203-original-v4.png",
  "altered": "/artwork/v4/collection/dream-203-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The middle ladder rung curves into a U.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.06638755980861244,
        "top": 0.5887353878852285,
        "width": 0.08014354066985646,
        "height": 0.07970244420828905
      }
    },
    {
      "id": "change-2",
      "label": "The yellow sock opens one embroidered eye.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.6907894736842105,
        "top": 0.34006376195536664,
        "width": 0.02033492822966507,
        "height": 0.04782146652497343
      }
    },
    {
      "id": "change-3",
      "label": "The plant pot has a crescent motif.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.2021531100478469,
        "top": 0.8055260361317748,
        "width": 0.026913875598086126,
        "height": 0.04250797024442083
      }
    },
    {
      "id": "change-4",
      "label": "The upper robot antenna bends downward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8050239234449761,
        "top": 0.1126461211477152,
        "width": 0.02751196172248804,
        "height": 0.05100956429330499
      }
    },
    {
      "id": "change-5",
      "label": "The cream sock diamond gains a gold cross seam.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.4479665071770335,
        "top": 0.8055260361317748,
        "width": 0.038875598086124404,
        "height": 0.08289054197662062
      }
    }
  ]
},
{
  "id": "v4-dream-192",
  "title": "The Night Shift of the Sunflower",
  "original": "/artwork/v4/collection/dream-192-original-v4.png",
  "altered": "/artwork/v4/collection/dream-192-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "clock-eye",
      "label": "The clock opens one eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.6034688995215312,
        "top": 0.2826780021253985,
        "width": 0.05263157894736842,
        "height": 0.1073326248671626
      }
    },
    {
      "id": "sunflower-eye",
      "label": "The sunflower opens one eye.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.33133971291866027,
        "top": 0.1849096705632306,
        "width": 0.02452153110047847,
        "height": 0.05100956429330499
      }
    },
    {
      "id": "down-nozzle",
      "label": "The oil can\u2019s nozzle bends downward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.37739234449760767,
        "top": 0.7290116896918172,
        "width": 0.0867224880382775,
        "height": 0.153028692879915
      }
    },
    {
      "id": "square-cog",
      "label": "The lower cog has a square opening.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4479665071770335,
        "top": 0.48459086078639746,
        "width": 0.02751196172248804,
        "height": 0.05526036131774708
      }
    },
    {
      "id": "hex-screw",
      "label": "The cover\u2019s upper-right screw becomes hexagonal.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.5328947368421053,
        "top": 0.6928799149840595,
        "width": 0.019138755980861243,
        "height": 0.036131774707757705
      }
    }
  ]
},
{
  "id": "v4-dream-193",
  "title": "The Girl Who Unzipped the Rain",
  "original": "/artwork/v4/collection/dream-193-original-v4.png",
  "altered": "/artwork/v4/collection/dream-193-altered-source-v4.png",
  "aspectRatio": 1672 / 940,
  "edits": [
    {
      "id": "closed-smile",
      "label": "The girl closes her smile.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.32894736842105265,
        "top": 0.16063829787234044,
        "width": 0.03409090909090909,
        "height": 0.04468085106382979
      }
    },
    {
      "id": "folded-point",
      "label": "The paper boat\u2019s right point folds down.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.6746411483253588,
        "top": 0.2968085106382979,
        "width": 0.034688995215311005,
        "height": 0.09361702127659574
      }
    },
    {
      "id": "triangle-pull",
      "label": "The zipper pull has a triangular opening.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.48145933014354064,
        "top": 0.3021276595744681,
        "width": 0.03110047846889952,
        "height": 0.059574468085106386
      }
    },
    {
      "id": "zigzag-boot",
      "label": "One boot\u2019s orange stripe carries a zigzag.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.19796650717703348,
        "top": 0.6702127659574468,
        "width": 0.05861244019138756,
        "height": 0.06702127659574468
      }
    },
    {
      "id": "eight-cord",
      "label": "The cuff cord forms a figure-eight loop.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.423444976076555,
        "top": 0.28297872340425534,
        "width": 0.02452153110047847,
        "height": 0.06808510638297872
      }
    }
  ]
},
{
  "id": "v4-dream-190",
  "title": "The Weight of One Feather",
  "original": "/artwork/v4/collection/dream-190-original-v4.png",
  "altered": "/artwork/v4/collection/dream-190-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "shadow-mouth",
      "label": "The giant hippo shadow opens its mouth.",
      "difficulty": "Easy",
      "edgeFade": 5,
      "box": {
        "left": 0.8941387559808612,
        "top": 0.37619553666312433,
        "width": 0.10047846889952153,
        "height": 0.18172157279489903
      }
    },
    {
      "id": "ribbon-loop",
      "label": "The red ribbon curls into a closed loop.",
      "difficulty": "Medium",
      "edgeFade": 5,
      "box": {
        "left": 0.30322966507177035,
        "top": 0.7173219978746015,
        "width": 0.10287081339712918,
        "height": 0.18172157279489903
      }
    },
    {
      "id": "finial-ring",
      "label": "The brass finial is an open diamond.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.4533492822966507,
        "top": 0.008501594048884165,
        "width": 0.03708133971291866,
        "height": 0.08501594048884166
      }
    },
    {
      "id": "hippo-eye",
      "label": "The porcelain hippo closes its eye.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6244019138755981,
        "top": 0.23804463336875664,
        "width": 0.022129186602870814,
        "height": 0.03294367693942614
      }
    },
    {
      "id": "gauge-needle",
      "label": "The scale needle points right.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.4647129186602871,
        "top": 0.1594048884165781,
        "width": 0.04844497607655503,
        "height": 0.07120085015940489
      },
      "source": "/artwork/v4/collection/dream-190-gauge-selected-source-v4.png"
    }
  ]
},
{
  "id": "v4-dream-196",
  "title": "The Monster Who Feared Balloons",
  "original": "/artwork/v4/collection/dream-196-original-v4.png",
  "altered": "/artwork/v4/collection/dream-196-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "A crescent is reflected in the pink balloon.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.37440191387559807,
        "top": 0.13177470775770456,
        "width": 0.05502392344497608,
        "height": 0.17003188097768332
      }
    },
    {
      "id": "change-2",
      "label": "The hanging sock ties itself into a knot.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.041866028708133975,
        "top": 0.5536663124335813,
        "width": 0.0819377990430622,
        "height": 0.19872476089266738
      }
    },
    {
      "id": "change-3",
      "label": "The loose blue yarn ties itself into a knot.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.13516746411483255,
        "top": 0.900106269925611,
        "width": 0.049641148325358854,
        "height": 0.06907545164718384
      }
    },
    {
      "id": "change-4",
      "label": "The sewn patch's upper-right corner folds outward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.20095693779904306,
        "top": 0.5749202975557917,
        "width": 0.04066985645933014,
        "height": 0.0818278427205101
      }
    },
    {
      "id": "change-5",
      "label": "A white spiral is painted on the pink floor ball.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.8648325358851675,
        "top": 0.7768331562167906,
        "width": 0.08313397129186603,
        "height": 0.1742826780021254
      }
    }
  ]
},
{
  "id": "v4-dream-198",
  "title": "The Skateboarder and the Borrowed Horizon",
  "original": "/artwork/v4/collection/dream-198-original-v4.png",
  "altered": "/artwork/v4/collection/dream-198-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The nearest wheel has spiral spokes.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.5849282296650717,
        "top": 0.69394261424017,
        "width": 0.031698564593301434,
        "height": 0.05844845908607864
      }
    },
    {
      "id": "change-2",
      "label": "The front knee pad has a gold crescent.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.5149521531100478,
        "top": 0.3475026567481403,
        "width": 0.03110047846889952,
        "height": 0.06057385759829968
      }
    },
    {
      "id": "change-3",
      "label": "The streetlamp globe reflects an orange horizon.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.9168660287081339,
        "top": 0.14133900106269925,
        "width": 0.04007177033492823,
        "height": 0.05951115834218916
      }
    },
    {
      "id": "change-4",
      "label": "The balcony cat tail curls up.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.15669856459330145,
        "top": 0.07332624867162593,
        "width": 0.026913875598086126,
        "height": 0.08395324123273114
      }
    },
    {
      "id": "change-5",
      "label": "The left shoe bow loop stands upright.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.5950956937799043,
        "top": 0.5281615302869288,
        "width": 0.030502392344497607,
        "height": 0.061636556854410204
      }
    }
  ]
},
{
  "id": "v4-dream-199",
  "title": "The Octagon That Wanted a Hug",
  "original": "/artwork/v4/collection/dream-199-original-v4.png",
  "altered": "/artwork/v4/collection/dream-199-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "One cheek spiral becomes a crescent embroidery.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.34748803827751196,
        "top": 0.3804463336875664,
        "width": 0.03409090909090909,
        "height": 0.06588735387885228
      }
    },
    {
      "id": "change-2",
      "label": "The left yellow friend patch has a sewn leaf.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.2063397129186603,
        "top": 0.6950053134962806,
        "width": 0.030502392344497607,
        "height": 0.06907545164718384
      }
    },
    {
      "id": "change-3",
      "label": "The blue friend badge leaf has wider branches.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.9090909090909091,
        "top": 0.6280552603613178,
        "width": 0.031698564593301434,
        "height": 0.07013815090329437
      }
    },
    {
      "id": "change-4",
      "label": "The measuring tape spool hole has a diagonal bar.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7661483253588517,
        "top": 0.8384697130712009,
        "width": 0.019138755980861243,
        "height": 0.06907545164718384
      }
    },
    {
      "id": "change-5",
      "label": "One corner bead reflects a blue heart.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.21291866028708134,
        "top": 0.230605738575983,
        "width": 0.02033492822966507,
        "height": 0.03719447396386823
      }
    }
  ]
},
{
  "id": "v4-dream-204",
  "title": "The Violinist and the Unheard Color",
  "original": "/artwork/v4/collection/dream-204-original-v4.png",
  "altered": "/artwork/v4/collection/dream-204-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The violin left sound hole curls into a spiral.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.30741626794258375,
        "top": 0.5239107332624867,
        "width": 0.04485645933014354,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "change-2",
      "label": "The reflected face winks.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.6142344497607656,
        "top": 0.2316684378320935,
        "width": 0.030502392344497607,
        "height": 0.03825717321997875
      }
    },
    {
      "id": "change-3",
      "label": "The brush bristles curl downward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.09449760765550239,
        "top": 0.2359192348565356,
        "width": 0.03229665071770335,
        "height": 0.077577045696068
      }
    },
    {
      "id": "change-4",
      "label": "The paint bowl rim has a pouring notch.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7470095693779905,
        "top": 0.8777895855472901,
        "width": 0.07834928229665072,
        "height": 0.0669500531349628
      }
    },
    {
      "id": "change-5",
      "label": "The cuff button has a vertical slot.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.04425837320574163,
        "top": 0.793836344314559,
        "width": 0.02033492822966507,
        "height": 0.03719447396386823
      }
    }
  ]
},
{
  "id": "v4-dream-200",
  "title": "The Lighthouse Keeper's Missing Stair",
  "original": "/artwork/v4/collection/dream-200-original-v4.png",
  "altered": "/artwork/v4/collection/dream-200-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The boat bow spiral becomes a painted fish.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.6686602870813397,
        "top": 0.6854410201912858,
        "width": 0.04665071770334928,
        "height": 0.06801275239107332
      }
    },
    {
      "id": "change-2",
      "label": "The boat cushion has a blue seam.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.5418660287081339,
        "top": 0.512221041445271,
        "width": 0.060406698564593304,
        "height": 0.057385759829968117
      }
    },
    {
      "id": "change-3",
      "label": "One window crossbar arches upward.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6549043062200957,
        "top": 0.1891604675876727,
        "width": 0.028110047846889953,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "change-4",
      "label": "The brass lamp mount reflects a blue crescent.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.9138755980861244,
        "top": 0.20403825717321997,
        "width": 0.028110047846889953,
        "height": 0.04994686503719448
      }
    },
    {
      "id": "change-5",
      "label": "The coat cuff button has an X slot.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.08911483253588516,
        "top": 0.3134962805526036,
        "width": 0.02033492822966507,
        "height": 0.036131774707757705
      }
    }
  ]
},
{
  "id": "v4-dream-205",
  "title": "The Pear That Contained a Winter",
  "original": "/artwork/v4/collection/dream-205-original-v4.png",
  "altered": "/artwork/v4/collection/dream-205-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The door plate has a crescent aperture.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.743421052631579,
        "top": 0.5472901168969182,
        "width": 0.02452153110047847,
        "height": 0.08395324123273114
      }
    },
    {
      "id": "change-2",
      "label": "The leaf tip folds upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.6848086124401914,
        "top": 0.820403825717322,
        "width": 0.07535885167464115,
        "height": 0.12964930924548354
      }
    },
    {
      "id": "change-3",
      "label": "The pear stem curls downward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5382775119617225,
        "top": 0.0021253985122210413,
        "width": 0.07894736842105263,
        "height": 0.1073326248671626
      }
    },
    {
      "id": "change-4",
      "label": "The inner window mullion forms an S.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5089712918660287,
        "top": 0.3931987247608927,
        "width": 0.03110047846889952,
        "height": 0.15409139213602552
      }
    },
    {
      "id": "change-5",
      "label": "The cup has a red zigzag stripe.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.9222488038277512,
        "top": 0.19128586609989373,
        "width": 0.03409090909090909,
        "height": 0.3687566418703507
      }
    }
  ]
},
{
  "id": "v4-dream-207",
  "title": "The Elevator Button's Day Off",
  "original": "/artwork/v4/collection/dream-207-original-v4.png",
  "altered": "/artwork/v4/collection/dream-207-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "surprised-rest",
      "label": "The resting button\u2019s mouth forms an O.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.23983253588516745,
        "top": 0.37300743889479276,
        "width": 0.04126794258373206,
        "height": 0.039319872476089264
      }
    },
    {
      "id": "smiling-wall",
      "label": "The bottom wall button smiles.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.729066985645933,
        "top": 0.8193411264612115,
        "width": 0.03229665071770335,
        "height": 0.057385759829968117
      }
    },
    {
      "id": "right-straw",
      "label": "The straw\u2019s elbow turns right.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.04485645933014354,
        "top": 0.4197662061636557,
        "width": 0.06997607655502393,
        "height": 0.061636556854410204
      }
    },
    {
      "id": "banded-fan",
      "label": "The fan\u2019s stripes run across its pleats.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.29545454545454547,
        "top": 0.2104144527098831,
        "width": 0.13157894736842105,
        "height": 0.14240170031880978
      }
    },
    {
      "id": "cross-screw",
      "label": "The rim screw has a cross-shaped slot.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.4748803827751196,
        "top": 0.32624867162592985,
        "width": 0.02930622009569378,
        "height": 0.07120085015940489
      }
    }
  ]
},
{
  "id": "v4-dream-213",
  "title": "Carrying Yesterday's Puddle",
  "original": "/artwork/v4/collection/dream-213-original-v4.png",
  "altered": "/artwork/v4/collection/dream-213-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "cat-eyes",
      "label": "The cat closes its eyes.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.1255980861244019,
        "top": 0.3538788522848034,
        "width": 0.034688995215311005,
        "height": 0.03825717321997875
      }
    },
    {
      "id": "rail-loop",
      "label": "The railing tip forms a closed oval.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.09330143540669857,
        "top": 0.153028692879915,
        "width": 0.031698564593301434,
        "height": 0.06588735387885228
      }
    },
    {
      "id": "latch-up",
      "label": "The window latch points upward.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.777511961722488,
        "top": 0.06907545164718384,
        "width": 0.04007177033492823,
        "height": 0.09776833156216791
      }
    },
    {
      "id": "boot-heart",
      "label": "The boot tab has a heart-shaped opening.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.49940191387559807,
        "top": 0.8235919234856536,
        "width": 0.023923444976076555,
        "height": 0.04782146652497343
      }
    },
    {
      "id": "water-spiral",
      "label": "The puddle ripple curls into a spiral.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.5843301435406698,
        "top": 0.6429330499468651,
        "width": 0.06698564593301436,
        "height": 0.06269925611052073
      }
    }
  ]
},
{
  "id": "v4-dream-209",
  "title": "The Mirror That Needed Glasses",
  "original": "/artwork/v4/collection/dream-209-original-v4.png",
  "altered": "/artwork/v4/collection/dream-209-altered-source-v4.png",
  "aspectRatio": 1672 / 940,
  "edits": [
    {
      "id": "square-handle",
      "label": "The jug\u2019s handle becomes a squared loop.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.11363636363636363,
        "top": 0.42021276595744683,
        "width": 0.04485645933014354,
        "height": 0.10638297872340426
      }
    },
    {
      "id": "raised-ring",
      "label": "The right drawer ring swings upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.8797846889952153,
        "top": 0.8159574468085107,
        "width": 0.04425837320574163,
        "height": 0.11808510638297873
      }
    },
    {
      "id": "cone-finial",
      "label": "The large jar\u2019s lid has a pointed finial.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8277511961722488,
        "top": 0.4702127659574468,
        "width": 0.028708133971291867,
        "height": 0.052127659574468084
      }
    },
    {
      "id": "star-bead",
      "label": "The lamp\u2019s pull bead becomes a star.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.9479665071770335,
        "top": 0.3170212765957447,
        "width": 0.02452153110047847,
        "height": 0.043617021276595745
      }
    },
    {
      "id": "reflected-knob",
      "label": "The reflected door\u2019s knob moves left.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.6172248803827751,
        "top": 0.2797872340425532,
        "width": 0.028110047846889953,
        "height": 0.03723404255319149
      }
    }
  ]
},
{
  "id": "v4-dream-214",
  "title": "The Laundry of Borrowed Shadows",
  "original": "/artwork/v4/collection/dream-214-original-v4.png",
  "altered": "/artwork/v4/collection/dream-214-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "shadow-tail",
      "label": "The hanging cat shadow curls its tail into a loop.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.6555023923444976,
        "top": 0.33049946865037194,
        "width": 0.05263157894736842,
        "height": 0.24017003188097769
      }
    },
    {
      "id": "dial-handle",
      "label": "A horizontal handle crosses the washer dial.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.29485645933014354,
        "top": 0.15090329436769395,
        "width": 0.05143540669856459,
        "height": 0.07863974495217853
      }
    },
    {
      "id": "cat-wink",
      "label": "The white cat closes one eye.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7009569377990431,
        "top": 0.6259298618490967,
        "width": 0.028110047846889953,
        "height": 0.040382571732199786
      }
    },
    {
      "id": "pocket-scallop",
      "label": "The apron pocket has a scalloped opening.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.47906698564593303,
        "top": 0.47502656748140276,
        "width": 0.060406698564593304,
        "height": 0.11477151965993623
      }
    },
    {
      "id": "box-crescent",
      "label": "The box crescent is larger and farther left.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.15311004784688995,
        "top": 0.04144527098831031,
        "width": 0.045454545454545456,
        "height": 0.07226354941551541
      }
    }
  ]
},
{
  "id": "v4-dream-206",
  "title": "The Umbrella Repair of Dreams",
  "original": "/artwork/v4/collection/dream-206-original-v4.png",
  "altered": "/artwork/v4/collection/dream-206-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The cat opens one green eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.08313397129186603,
        "top": 0.6588735387885228,
        "width": 0.028708133971291867,
        "height": 0.03825717321997875
      }
    },
    {
      "id": "change-2",
      "label": "The umbrella handle closes into a ring.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.5442583732057417,
        "top": 0.11052072263549416,
        "width": 0.09449760765550239,
        "height": 0.1902231668437832
      }
    },
    {
      "id": "change-3",
      "label": "A rain drop becomes a tapered icicle.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5191387559808612,
        "top": 0.461211477151966,
        "width": 0.022727272727272728,
        "height": 0.08289054197662062
      }
    },
    {
      "id": "change-4",
      "label": "The cardigan button has crossed thread.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.21351674641148324,
        "top": 0.4665249734325186,
        "width": 0.030502392344497607,
        "height": 0.057385759829968117
      }
    },
    {
      "id": "change-5",
      "label": "The jar lid has an oval vent.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.9348086124401914,
        "top": 0.5589798087141339,
        "width": 0.04665071770334928,
        "height": 0.03294367693942614
      }
    }
  ]
},
{
  "id": "v4-dream-208",
  "title": "The Puppeteer of Gentle Thunder",
  "original": "/artwork/v4/collection/dream-208-original-v4.png",
  "altered": "/artwork/v4/collection/dream-208-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "checker-patch",
      "label": "The knee patch carries a checkerboard.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.34748803827751196,
        "top": 0.6981934112646121,
        "width": 0.056818181818181816,
        "height": 0.08607863974495218
      }
    },
    {
      "id": "surprised-cloud",
      "label": "The cloud\u2019s mouth forms an O.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.5328947368421053,
        "top": 0.28374070138150903,
        "width": 0.028708133971291867,
        "height": 0.04144527098831031
      }
    },
    {
      "id": "hook-lightning",
      "label": "The lightning prop\u2019s tip bends upward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6172248803827751,
        "top": 0.8459086078639745,
        "width": 0.08552631578947369,
        "height": 0.11902231668437832
      }
    },
    {
      "id": "square-spool",
      "label": "The rope spool has a square center hole.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.17583732057416268,
        "top": 0.6865037194473964,
        "width": 0.042464114832535885,
        "height": 0.025504782146652496
      }
    },
    {
      "id": "tilted-handle",
      "label": "The lantern\u2019s handle tips left.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.1118421052631579,
        "top": 0.06588735387885228,
        "width": 0.039473684210526314,
        "height": 0.05844845908607864
      }
    }
  ]
},
{
  "id": "v4-dream-216",
  "title": "A Saddle for the Tide",
  "original": "/artwork/v4/collection/dream-216-original-v4.png",
  "altered": "/artwork/v4/collection/dream-216-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "A spiral is tooled into the saddle's leather flap.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.4784688995215311,
        "top": 0.36344314558979807,
        "width": 0.04425837320574163,
        "height": 0.12008501594048884
      }
    },
    {
      "id": "change-2",
      "label": "The wall lantern's front door hinges open.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.8038277511961722,
        "top": 0.04675876726886291,
        "width": 0.0735645933014354,
        "height": 0.1126461211477152
      }
    },
    {
      "id": "change-3",
      "label": "The right stall blanket's loose end ties into a knot.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.930622009569378,
        "top": 0.767268862911796,
        "width": 0.0651913875598086,
        "height": 0.2199787460148778
      }
    },
    {
      "id": "change-4",
      "label": "The stirrup's footplate hinges downward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.45514354066985646,
        "top": 0.5887353878852285,
        "width": 0.053229665071770335,
        "height": 0.0669500531349628
      }
    },
    {
      "id": "change-5",
      "label": "The door's ring handle forms a figure eight.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.13875598086124402,
        "top": 0.461211477151966,
        "width": 0.03409090909090909,
        "height": 0.10520722635494155
      }
    }
  ]
},
{
  "id": "v4-dream-210",
  "title": "The Library Beneath the Chessboard",
  "original": "/artwork/v4/collection/dream-210-original-v4.png",
  "altered": "/artwork/v4/collection/dream-210-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "bulb",
      "label": "The upper pawn light becomes a crescent.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.39832535885167464,
        "top": 0.01700318809776833,
        "width": 0.045454545454545456,
        "height": 0.07970244420828905
      }
    },
    {
      "id": "rook",
      "label": "The rook's front crown tooth folds inward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.6483253588516746,
        "top": 0.16046758767268862,
        "width": 0.023923444976076555,
        "height": 0.06376195536663125
      }
    },
    {
      "id": "globe",
      "label": "The library globe gains a diagonal gold brace.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.2565789473684211,
        "top": 0.6291179596174282,
        "width": 0.05382775119617225,
        "height": 0.09564293304994687
      }
    },
    {
      "id": "clasp",
      "label": "The teal book clasp swings open.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.861244019138756,
        "top": 0.6089266737513284,
        "width": 0.07117224880382775,
        "height": 0.07013815090329437
      }
    },
    {
      "id": "rung",
      "label": "The top ladder rung bows upward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.6291866028708134,
        "top": 0.40488841657810837,
        "width": 0.04485645933014354,
        "height": 0.04782146652497343
      }
    }
  ]
},
{
  "id": "v4-dream-211",
  "title": "Applause for an Empty Stage",
  "original": "/artwork/v4/collection/dream-211-original-v4.png",
  "altered": "/artwork/v4/collection/dream-211-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "antenna",
      "label": "The robot antenna tilts left.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.3534688995215311,
        "top": 0.12008501594048884,
        "width": 0.04904306220095694,
        "height": 0.06482465462274177
      }
    },
    {
      "id": "paper",
      "label": "The middle booklet's cover corner curls upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.41327751196172247,
        "top": 0.8108395324123273,
        "width": 0.056220095693779906,
        "height": 0.06482465462274177
      }
    },
    {
      "id": "hanger",
      "label": "The far-right hanger hook coils closed.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.9629186602870813,
        "top": 0.4250797024442083,
        "width": 0.03708133971291866,
        "height": 0.0669500531349628
      }
    },
    {
      "id": "rope",
      "label": "The curtain tie diagonal strand passes under its loop.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.011961722488038277,
        "top": 0.15090329436769395,
        "width": 0.06339712918660287,
        "height": 0.1179596174282678
      }
    },
    {
      "id": "light",
      "label": "The spotlight's lower flap folds upward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.1339712918660287,
        "top": 0.11477151965993623,
        "width": 0.06818181818181818,
        "height": 0.07332624867162593
      }
    }
  ]
},
{
  "id": "v4-dream-212",
  "title": "The Moth Behind the Velvet Door",
  "original": "/artwork/v4/collection/dream-212-original-v4.png",
  "altered": "/artwork/v4/collection/dream-212-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "antenna",
      "label": "The moth's right antenna curls upward.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.41148325358851673,
        "top": 0.11902231668437832,
        "width": 0.11423444976076555,
        "height": 0.15834218916046758
      }
    },
    {
      "id": "spot",
      "label": "The left wing eyespot ring opens to the right.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.16566985645933013,
        "top": 0.436769394261424,
        "width": 0.07775119617224881,
        "height": 0.12539851222104145
      }
    },
    {
      "id": "knob",
      "label": "The door knob has a fluted rim.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7135167464114832,
        "top": 0.4250797024442083,
        "width": 0.05801435406698564,
        "height": 0.09776833156216791
      }
    },
    {
      "id": "cord",
      "label": "The upper pink cord knot forms a closed loop.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7751196172248804,
        "top": 0.28480340063761955,
        "width": 0.060406698564593304,
        "height": 0.10095642933049948
      }
    },
    {
      "id": "reflection",
      "label": "The reflected eyespot center becomes diamond-shaped.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.6584928229665071,
        "top": 0.4952178533475027,
        "width": 0.03827751196172249,
        "height": 0.1073326248671626
      }
    }
  ]
},
{
  "id": "v4-dream-215",
  "title": "Where the Dice Sleep",
  "original": "/artwork/v4/collection/dream-215-original-v4.png",
  "altered": "/artwork/v4/collection/dream-215-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "sleeper-awake",
      "label": "The upper-left sleeper opens its eyes.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.4677033492822967,
        "top": 0.2975557917109458,
        "width": 0.034688995215311005,
        "height": 0.02975557917109458
      }
    },
    {
      "id": "cup-handle",
      "label": "The bedside cup handle points left.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.5334928229665071,
        "top": 0.49415515409139216,
        "width": 0.03110047846889952,
        "height": 0.044633368756641874
      }
    },
    {
      "id": "footboard-heart",
      "label": "The upper-left footboard has a heart cutout.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.45394736842105265,
        "top": 0.4303931987247609,
        "width": 0.08373205741626795,
        "height": 0.06057385759829968
      }
    },
    {
      "id": "blanket-moons",
      "label": "Crescent moons appear in the red blanket embroidery.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.4665071770334928,
        "top": 0.5844845908607864,
        "width": 0.08851674641148326,
        "height": 0.15196599362380447
      }
    },
    {
      "id": "lamp-scallop",
      "label": "The upper bedside lampshade has a scalloped rim.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.5263157894736842,
        "top": 0.21253985122210414,
        "width": 0.03409090909090909,
        "height": 0.05844845908607864
      }
    }
  ]
},
{
  "id": "v4-dream-225",
  "title": "The Wardrobe's Winter Breath",
  "original": "/artwork/v4/collection/dream-225-original-v4.png",
  "altered": "/artwork/v4/collection/dream-225-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The larger button eye has parallel stitches.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.5891148325358851,
        "top": 0.19234856535600425,
        "width": 0.030502392344497607,
        "height": 0.05419766206163656
      }
    },
    {
      "id": "change-2",
      "label": "The cat opens one green eye.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.6190191387559809,
        "top": 0.8235919234856536,
        "width": 0.019138755980861243,
        "height": 0.02763018065887354
      }
    },
    {
      "id": "change-3",
      "label": "The key has a square bow.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.14354066985645933,
        "top": 0.361317747077577,
        "width": 0.025717703349282296,
        "height": 0.05526036131774708
      }
    },
    {
      "id": "change-4",
      "label": "The nearest slipper bears a crescent.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.3444976076555024,
        "top": 0.8788522848034006,
        "width": 0.06698564593301436,
        "height": 0.09139213602550478
      }
    },
    {
      "id": "change-5",
      "label": "The cup handle closes into a solid knob.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.9425837320574163,
        "top": 0.5313496280552603,
        "width": 0.022727272727272728,
        "height": 0.04782146652497343
      }
    }
  ]
},
{
  "id": "v4-dream-217",
  "title": "The Telephone That Wanted to Listen",
  "original": "/artwork/v4/collection/dream-217-original-v4.png",
  "altered": "/artwork/v4/collection/dream-217-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "A crescent replaces the fishbowl's window reflection.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.8151913875598086,
        "top": 0.310308182784272,
        "width": 0.10586124401913875,
        "height": 0.24973432518597238
      }
    },
    {
      "id": "change-2",
      "label": "The front receiver's faceplate hinges open.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.4366028708133971,
        "top": 0.29330499468650373,
        "width": 0.09150717703349283,
        "height": 0.1381509032943677
      }
    },
    {
      "id": "change-3",
      "label": "The gold container's lid hinges open.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.0,
        "top": 0.5717321997874601,
        "width": 0.11303827751196172,
        "height": 0.3188097768331562
      }
    },
    {
      "id": "change-4",
      "label": "The purple cloth's loose corner ties into a knot.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8253588516746412,
        "top": 0.8172157279489904,
        "width": 0.11423444976076555,
        "height": 0.18278427205100956
      }
    },
    {
      "id": "change-5",
      "label": "A spiral is engraved into the dial's center disk.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.39712918660287083,
        "top": 0.5270988310308182,
        "width": 0.06638755980861244,
        "height": 0.10201912858660998
      }
    }
  ]
},
{
  "id": "v4-dream-226",
  "title": "The Potato Who Held the Door",
  "original": "/artwork/v4/collection/dream-226-original-v4.png",
  "altered": "/artwork/v4/collection/dream-226-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The leaf tip curls downward.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.4180622009569378,
        "top": 0.03294367693942614,
        "width": 0.07236842105263158,
        "height": 0.16259298618490967
      }
    },
    {
      "id": "change-2",
      "label": "The door knob has a square grip.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.5113636363636364,
        "top": 0.25292242295430395,
        "width": 0.04007177033492823,
        "height": 0.09670563230605739
      }
    },
    {
      "id": "change-3",
      "label": "The curtain tassel has a rounded fringe.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6680622009569378,
        "top": 0.2879914984059511,
        "width": 0.03648325358851675,
        "height": 0.10201912858660998
      }
    },
    {
      "id": "change-4",
      "label": "The plate rim has a pouring notch.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.13098086124401914,
        "top": 0.5430393198724761,
        "width": 0.04665071770334928,
        "height": 0.0765143464399575
      }
    },
    {
      "id": "change-5",
      "label": "The ticket border dips into a V.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.2811004784688995,
        "top": 0.7523910733262487,
        "width": 0.026913875598086126,
        "height": 0.039319872476089264
      }
    }
  ]
},
{
  "id": "v4-dream-219",
  "title": "The Snowman's Warm Footsteps",
  "original": "/artwork/v4/collection/dream-219-original-v4.png",
  "altered": "/artwork/v4/collection/dream-219-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The mitten patch is a crescent.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.7942583732057417,
        "top": 0.32624867162592985,
        "width": 0.02631578947368421,
        "height": 0.05419766206163656
      }
    },
    {
      "id": "change-2",
      "label": "The carrot tip bends upward.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.75,
        "top": 0.0924548352816153,
        "width": 0.04007177033492823,
        "height": 0.04569606801275239
      }
    },
    {
      "id": "change-3",
      "label": "One berry has a larger white reflection.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.05980861244019139,
        "top": 0.19872476089266738,
        "width": 0.02033492822966507,
        "height": 0.03719447396386823
      }
    },
    {
      "id": "change-4",
      "label": "The coal button has an X groove.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.645933014354067,
        "top": 0.3283740701381509,
        "width": 0.023923444976076555,
        "height": 0.04250797024442083
      }
    },
    {
      "id": "change-5",
      "label": "The scarf has a gold star embroidery.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.6124401913875598,
        "top": 0.2879914984059511,
        "width": 0.02751196172248804,
        "height": 0.048884165781083955
      }
    }
  ]
},
{
  "id": "v4-dream-220",
  "title": "The Alien and the Stuck Hiccup",
  "original": "/artwork/v4/collection/dream-220-original-v4.png",
  "altered": "/artwork/v4/collection/dream-220-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The trapped bubble reflects a blue crescent.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.5239234449760766,
        "top": 0.4293304994686504,
        "width": 0.07177033492822966,
        "height": 0.13177470775770456
      }
    },
    {
      "id": "change-2",
      "label": "The vending lever curves right.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.6913875598086124,
        "top": 0.24442082890541977,
        "width": 0.060406698564593304,
        "height": 0.2359192348565356
      }
    },
    {
      "id": "change-3",
      "label": "The top antenna curls inward.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.28289473684210525,
        "top": 0.28055260361317746,
        "width": 0.028708133971291867,
        "height": 0.06057385759829968
      }
    },
    {
      "id": "change-4",
      "label": "The coin has an engraved star.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.31698564593301437,
        "top": 0.5313496280552603,
        "width": 0.035287081339712915,
        "height": 0.07013815090329437
      }
    },
    {
      "id": "change-5",
      "label": "The pushbutton has a diagonal groove.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.4144736842105263,
        "top": 0.3443145589798087,
        "width": 0.02631578947368421,
        "height": 0.0669500531349628
      }
    }
  ]
},
{
  "id": "v4-dream-221",
  "title": "The Staircase in the Ribbon",
  "original": "/artwork/v4/collection/dream-221-original-v4.png",
  "altered": "/artwork/v4/collection/dream-221-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The cushion has a sewn gold crescent.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.9354066985645934,
        "top": 0.8012752391073327,
        "width": 0.038875598086124404,
        "height": 0.07438894792773645
      }
    },
    {
      "id": "change-2",
      "label": "The stool brace arches upward.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.05203349282296651,
        "top": 0.7545164718384697,
        "width": 0.06279904306220095,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "change-3",
      "label": "The right waist bow loop turns sideways.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.3660287081339713,
        "top": 0.27417640807651433,
        "width": 0.02452153110047847,
        "height": 0.057385759829968117
      }
    },
    {
      "id": "change-4",
      "label": "The standing shoe has a diagonal seam.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.4246411483253589,
        "top": 0.7088204038257173,
        "width": 0.028110047846889953,
        "height": 0.05526036131774708
      }
    },
    {
      "id": "change-5",
      "label": "The hairpin head becomes a heart.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.19078947368421054,
        "top": 0.8947927736450585,
        "width": 0.02452153110047847,
        "height": 0.03719447396386823
      }
    }
  ]
},
{
  "id": "v4-dream-222",
  "title": "The Turtle's Vacant Room",
  "original": "/artwork/v4/collection/dream-222-original-v4.png",
  "altered": "/artwork/v4/collection/dream-222-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "closed-eye",
      "label": "The turtle closes its eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.23444976076555024,
        "top": 0.24973432518597238,
        "width": 0.05203349282296651,
        "height": 0.07226354941551541
      }
    },
    {
      "id": "upright-handle",
      "label": "The moving box\u2019s handle stands vertically.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.8672248803827751,
        "top": 0.6801275239107333,
        "width": 0.07236842105263158,
        "height": 0.10201912858660998
      }
    },
    {
      "id": "turned-mug",
      "label": "The mug\u2019s handle turns to the left.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6273923444976076,
        "top": 0.40170031880977686,
        "width": 0.03827751196172249,
        "height": 0.039319872476089264
      }
    },
    {
      "id": "diagonal-window",
      "label": "The room window\u2019s bars form an X.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5777511961722488,
        "top": 0.24973432518597238,
        "width": 0.030502392344497607,
        "height": 0.07120085015940489
      }
    },
    {
      "id": "sideways-keyhole",
      "label": "The hatch lock\u2019s keyhole turns sideways.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.687200956937799,
        "top": 0.12008501594048884,
        "width": 0.030502392344497607,
        "height": 0.04994686503719448
      }
    }
  ]
},
{
  "id": "v4-dream-223",
  "title": "The Eraser That Lost the Mountain",
  "original": "/artwork/v4/collection/dream-223-original-v4.png",
  "altered": "/artwork/v4/collection/dream-223-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "zigzag-band",
      "label": "The eraser\u2019s band carries a zigzag groove.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.8343301435406698,
        "top": 0.3602550478214665,
        "width": 0.11543062200956938,
        "height": 0.21679064824654623
      }
    },
    {
      "id": "forked-summit",
      "label": "The tallest mountain summit forks.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.48086124401913877,
        "top": 0.06588735387885228,
        "width": 0.06997607655502393,
        "height": 0.1339001062699256
      }
    },
    {
      "id": "curled-shaving",
      "label": "The pink shaving curls inward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8642344497607656,
        "top": 0.6174282678002125,
        "width": 0.1166267942583732,
        "height": 0.16790648246546228
      }
    },
    {
      "id": "arched-rung",
      "label": "One ladder rung bows downward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.41088516746411485,
        "top": 0.5143464399574921,
        "width": 0.028708133971291867,
        "height": 0.048884165781083955
      }
    },
    {
      "id": "folded-clip",
      "label": "The binder clip\u2019s front handle folds down.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.7649521531100478,
        "top": 0.0,
        "width": 0.07834928229665072,
        "height": 0.12008501594048884
      }
    }
  ]
},
{
  "id": "v4-dream-224",
  "title": "The Cathedral of Small Repairs",
  "original": "/artwork/v4/collection/dream-224-original-v4.png",
  "altered": "/artwork/v4/collection/dream-224-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "slit-pupil",
      "label": "The whale\u2019s pupil narrows to a slit.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.20394736842105263,
        "top": 0.28374070138150903,
        "width": 0.04066985645933014,
        "height": 0.048884165781083955
      }
    },
    {
      "id": "curled-tail",
      "label": "The mouse\u2019s tail curls inward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7141148325358851,
        "top": 0.4729011689691817,
        "width": 0.06818181818181818,
        "height": 0.153028692879915
      }
    },
    {
      "id": "star-spool",
      "label": "The spool has a star-shaped center hole.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5059808612440191,
        "top": 0.7290116896918172,
        "width": 0.03588516746411483,
        "height": 0.07120085015940489
      }
    },
    {
      "id": "tilted-lantern",
      "label": "One cathedral lantern tilts left.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5376794258373205,
        "top": 0.23273113708820403,
        "width": 0.03708133971291866,
        "height": 0.11583421891604676
      }
    },
    {
      "id": "raised-scarf",
      "label": "The scarf\u2019s free end points upward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.6794258373205742,
        "top": 0.463336875664187,
        "width": 0.03409090909090909,
        "height": 0.077577045696068
      }
    }
  ]
},
{
  "id": "v4-dream-227",
  "title": "The Rabbit Who Outgrew the Trick",
  "original": "/artwork/v4/collection/dream-227-original-v4.png",
  "altered": "/artwork/v4/collection/dream-227-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The rabbit closes its visible eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.41566985645933013,
        "top": 0.14452709883103082,
        "width": 0.035287081339712915,
        "height": 0.07863974495217853
      }
    },
    {
      "id": "change-2",
      "label": "The hat bow has one loop.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.5532296650717703,
        "top": 0.4760892667375133,
        "width": 0.041866028708133975,
        "height": 0.10520722635494155
      }
    },
    {
      "id": "change-3",
      "label": "The drawer knob forms a heart.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.305622009569378,
        "top": 0.7545164718384697,
        "width": 0.060406698564593304,
        "height": 0.09989373007438895
      }
    },
    {
      "id": "change-4",
      "label": "The cloth corner folds upward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.060406698564593304,
        "top": 0.7236981934112646,
        "width": 0.12619617224880383,
        "height": 0.19659936238044634
      }
    },
    {
      "id": "change-5",
      "label": "The paper riser has a crescent recess.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.694377990430622,
        "top": 0.6843783209351754,
        "width": 0.03708133971291866,
        "height": 0.07226354941551541
      }
    }
  ]
},
{
  "id": "v4-dream-234",
  "title": "The Octopus and the Stubborn Knot",
  "original": "/artwork/v4/collection/dream-234-original-v4.png",
  "altered": "/artwork/v4/collection/dream-234-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The lower eye winks.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.3438995215311005,
        "top": 0.34962805526036134,
        "width": 0.06339712918660287,
        "height": 0.09989373007438895
      }
    },
    {
      "id": "change-2",
      "label": "The octopus mouth smiles.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.41088516746411485,
        "top": 0.3698193411264612,
        "width": 0.034688995215311005,
        "height": 0.07332624867162593
      }
    },
    {
      "id": "change-3",
      "label": "The bath plug has a crescent recess.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6501196172248804,
        "top": 0.7353878852284803,
        "width": 0.046052631578947366,
        "height": 0.10201912858660998
      }
    },
    {
      "id": "change-4",
      "label": "The soap bears a pressed heart.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.025717703349282296,
        "top": 0.018065887353878853,
        "width": 0.06997607655502393,
        "height": 0.07545164718384698
      }
    },
    {
      "id": "change-5",
      "label": "The faucet mouth has a zigzag lip.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.6608851674641149,
        "top": 0.04144527098831031,
        "width": 0.07775119617224881,
        "height": 0.0924548352816153
      }
    }
  ]
},
{
  "id": "v4-dream-228",
  "title": "The Clockwork Orchard in a Lunchbox",
  "original": "/artwork/v4/collection/dream-228-original-v4.png",
  "altered": "/artwork/v4/collection/dream-228-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "gear",
      "label": "The left orange gear has swept curved spokes.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.26016746411483255,
        "top": 0.26567481402763016,
        "width": 0.05980861244019139,
        "height": 0.10626992561105207
      }
    },
    {
      "id": "key",
      "label": "The pear winding key has a diamond bow.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.8181818181818182,
        "top": 0.2911795961742827,
        "width": 0.04425837320574163,
        "height": 0.08076514346439957
      }
    },
    {
      "id": "latch",
      "label": "The lunchbox clasp flips open.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.3708133971291866,
        "top": 0.6801275239107333,
        "width": 0.05203349282296651,
        "height": 0.18384697130712008
      }
    },
    {
      "id": "beetle-key",
      "label": "The beetle key upper opening becomes triangular.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5897129186602871,
        "top": 0.34643995749202977,
        "width": 0.028110047846889953,
        "height": 0.057385759829968117
      }
    },
    {
      "id": "reflection",
      "label": "The upper spoon reflects window panes.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.36483253588516745,
        "top": 0.053134962805526036,
        "width": 0.07535885167464115,
        "height": 0.08076514346439957
      }
    }
  ]
},
{
  "id": "v4-dream-235",
  "title": "The Long Way Around a Button",
  "original": "/artwork/v4/collection/dream-235-original-v4.png",
  "altered": "/artwork/v4/collection/dream-235-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The left sewing cord ties a knot.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.5699760765550239,
        "top": 0.15409139213602552,
        "width": 0.0729665071770335,
        "height": 0.11370882040382571
      }
    },
    {
      "id": "change-2",
      "label": "The front maze doorway has a pointed arch.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.4748803827751196,
        "top": 0.4707757704569607,
        "width": 0.11423444976076555,
        "height": 0.21891604675876727
      }
    },
    {
      "id": "change-3",
      "label": "The right antenna curls into a hook.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.40370813397129185,
        "top": 0.4814027630180659,
        "width": 0.034688995215311005,
        "height": 0.06588735387885228
      }
    },
    {
      "id": "change-4",
      "label": "The scroll end forms a star.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.3187799043062201,
        "top": 0.536663124335813,
        "width": 0.035287081339712915,
        "height": 0.07863974495217853
      }
    },
    {
      "id": "change-5",
      "label": "The backpack buckle forms a triangle.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.21830143540669855,
        "top": 0.6227417640807651,
        "width": 0.03409090909090909,
        "height": 0.07013815090329437
      }
    }
  ]
},
{
  "id": "v4-dream-218",
  "title": "The Barber of Tangled Roads",
  "original": "/artwork/v4/collection/dream-218-original-v4.png",
  "altered": "/artwork/v4/collection/dream-218-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "Gold chains replace the bowtie's circle pattern.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.284688995215311,
        "top": 0.3698193411264612,
        "width": 0.15490430622009568,
        "height": 0.1392136025504782
      }
    },
    {
      "id": "change-2",
      "label": "The large green jar's lid hinges open.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.8636363636363636,
        "top": 0.6790648246546227,
        "width": 0.13636363636363635,
        "height": 0.21147715196599362
      }
    },
    {
      "id": "change-3",
      "label": "Only the upper scissors blade pivots open.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.30741626794258375,
        "top": 0.8055260361317748,
        "width": 0.13277511961722488,
        "height": 0.12114771519659936
      }
    },
    {
      "id": "change-4",
      "label": "A teal crescent is painted on the hanging lamp.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.9389952153110048,
        "top": 0.08820403825717323,
        "width": 0.05502392344497608,
        "height": 0.10095642933049948
      }
    },
    {
      "id": "change-5",
      "label": "The comb's far end rolls into a hollow tube.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.52811004784689,
        "top": 0.29011689691817216,
        "width": 0.045454545454545456,
        "height": 0.09351753453772582
      }
    }
  ]
},
{
  "id": "v4-dream-229",
  "title": "The Quietest Argument",
  "original": "/artwork/v4/collection/dream-229-original-v4.png",
  "altered": "/artwork/v4/collection/dream-229-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "lever",
      "label": "The rug door knob becomes a left-facing lever.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.44258373205741625,
        "top": 0.4962805526036132,
        "width": 0.04904306220095694,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "patch",
      "label": "The blue creature patch triangle points down.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.1638755980861244,
        "top": 0.27948990435706694,
        "width": 0.026913875598086126,
        "height": 0.044633368756641874
      }
    },
    {
      "id": "tote",
      "label": "The hanging tote handle is knotted.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6220095693779905,
        "top": 0.16684378320935175,
        "width": 0.025119617224880382,
        "height": 0.044633368756641874
      }
    },
    {
      "id": "art",
      "label": "The framed gold triangle has an arched cutout.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7523923444976076,
        "top": 0.22422954303931988,
        "width": 0.05143540669856459,
        "height": 0.04782146652497343
      }
    },
    {
      "id": "chest",
      "label": "The chest carrying handle folds flat.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.55622009569378,
        "top": 0.4070138150903294,
        "width": 0.03289473684210526,
        "height": 0.03719447396386823
      }
    }
  ]
},
{
  "id": "v4-dream-230",
  "title": "The Diver at the Keyhole",
  "original": "/artwork/v4/collection/dream-230-original-v4.png",
  "altered": "/artwork/v4/collection/dream-230-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "grille",
      "label": "The helmet side grille forms an X.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.4007177033492823,
        "top": 0.15409139213602552,
        "width": 0.06698564593301436,
        "height": 0.15196599362380447
      }
    },
    {
      "id": "knob",
      "label": "The door knob has a sun engraving.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7284688995215312,
        "top": 0.12858660998937302,
        "width": 0.042464114832535885,
        "height": 0.10414452709883103
      }
    },
    {
      "id": "clasp",
      "label": "The wrist clasp flips up open.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.3092105263157895,
        "top": 0.6216790648246546,
        "width": 0.03708133971291866,
        "height": 0.06907545164718384
      }
    },
    {
      "id": "lamp",
      "label": "The lampshade right edge curls upward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.2236842105263158,
        "top": 0.15090329436769395,
        "width": 0.023923444976076555,
        "height": 0.03719447396386823
      }
    },
    {
      "id": "vent",
      "label": "The helmet top vent becomes hexagonal.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.5610047846889952,
        "top": 0.026567481402763018,
        "width": 0.049641148325358854,
        "height": 0.06588735387885228
      }
    }
  ]
},
{
  "id": "v4-dream-231",
  "title": "The Lemon's Long Afternoon",
  "original": "/artwork/v4/collection/dream-231-original-v4.png",
  "altered": "/artwork/v4/collection/dream-231-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The paper boat sail bulges right.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.1118421052631579,
        "top": 0.6620616365568545,
        "width": 0.09569377990430622,
        "height": 0.15196599362380447
      }
    },
    {
      "id": "change-2",
      "label": "The spoon bowl reflects a blue arc.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.7027511961722488,
        "top": 0.6450584484590861,
        "width": 0.03229665071770335,
        "height": 0.11477151965993623
      }
    },
    {
      "id": "change-3",
      "label": "The left sandal strap curls sideways.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7691387559808612,
        "top": 0.6896918172157279,
        "width": 0.03588516746411483,
        "height": 0.0765143464399575
      }
    },
    {
      "id": "change-4",
      "label": "The bowl motif stem curls inward.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.009569377990430622,
        "top": 0.19553666312433582,
        "width": 0.03349282296650718,
        "height": 0.11158342189160468
      }
    },
    {
      "id": "change-5",
      "label": "The chair hinge screw has an X groove.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.23983253588516745,
        "top": 0.4399574920297556,
        "width": 0.016148325358851676,
        "height": 0.03294367693942614
      }
    }
  ]
},
{
  "id": "v4-dream-239",
  "title": "The Train That Waited for Its Tracks",
  "original": "/artwork/v4/collection/dream-239-original-v4.png",
  "altered": "/artwork/v4/collection/dream-239-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "surprised-snail",
      "label": "The front snail\u2019s mouth forms an O.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.6166267942583732,
        "top": 0.6269925611052072,
        "width": 0.03827751196172249,
        "height": 0.048884165781083955
      }
    },
    {
      "id": "cross-lamp",
      "label": "The locomotive lamp gains an X guard.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.4126794258373206,
        "top": 0.2199787460148778,
        "width": 0.031698564593301434,
        "height": 0.05844845908607864
      }
    },
    {
      "id": "louver-grille",
      "label": "The cowcatcher\u2019s center has horizontal louvers.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.388755980861244,
        "top": 0.4707757704569607,
        "width": 0.0645933014354067,
        "height": 0.11477151965993623
      }
    },
    {
      "id": "square-axle",
      "label": "The front spool\u2019s axle cap becomes square.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5424641148325359,
        "top": 0.49840595111583424,
        "width": 0.03110047846889952,
        "height": 0.04675876726886291
      }
    },
    {
      "id": "crown-rim",
      "label": "The chimney rim has pointed scallops.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.34748803827751196,
        "top": 0.10945802337938364,
        "width": 0.07117224880382775,
        "height": 0.04994686503719448
      }
    }
  ]
},
{
  "id": "v4-dream-232",
  "title": "The Postman of Unsent Echoes",
  "original": "/artwork/v4/collection/dream-232-original-v4.png",
  "altered": "/artwork/v4/collection/dream-232-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The letter slot has a diagonal crossbar.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.11244019138755981,
        "top": 0.2146652497343252,
        "width": 0.06399521531100479,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "change-2",
      "label": "The doorknob reflects a blue crescent.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.22188995215311005,
        "top": 0.1997874601487779,
        "width": 0.022129186602870814,
        "height": 0.048884165781083955
      }
    },
    {
      "id": "change-3",
      "label": "The right ribbon bow loop points upward.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.9533492822966507,
        "top": 0.4867162592986185,
        "width": 0.031698564593301434,
        "height": 0.048884165781083955
      }
    },
    {
      "id": "change-4",
      "label": "The bag buckle tongue turns diagonally.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.2111244019138756,
        "top": 0.5696068012752391,
        "width": 0.025717703349282296,
        "height": 0.040382571732199786
      }
    },
    {
      "id": "change-5",
      "label": "The cuff button has an X slot.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.35107655502392343,
        "top": 0.5015940488841658,
        "width": 0.022727272727272728,
        "height": 0.04144527098831031
      }
    }
  ]
},
{
  "id": "v4-dream-233",
  "title": "The Tent That Camped Indoors",
  "original": "/artwork/v4/collection/dream-233-original-v4.png",
  "altered": "/artwork/v4/collection/dream-233-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The right slipper has a gold crescent.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.2535885167464115,
        "top": 0.8235919234856536,
        "width": 0.035287081339712915,
        "height": 0.05100956429330499
      }
    },
    {
      "id": "change-2",
      "label": "The suspended mug handle curls inward.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.611244019138756,
        "top": 0.33475026567481403,
        "width": 0.01854066985645933,
        "height": 0.04675876726886291
      }
    },
    {
      "id": "change-3",
      "label": "The upper clock hand bends in an elbow.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.24760765550239233,
        "top": 0.11052072263549416,
        "width": 0.02033492822966507,
        "height": 0.03506907545164718
      }
    },
    {
      "id": "change-4",
      "label": "The tent toggle has a diagonal slit.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5,
        "top": 0.05419766206163656,
        "width": 0.02751196172248804,
        "height": 0.031880977683315624
      }
    },
    {
      "id": "change-5",
      "label": "The pullchain ball reflects a blue crescent.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.6483253588516746,
        "top": 0.5823591923485654,
        "width": 0.017942583732057416,
        "height": 0.03400637619553666
      }
    }
  ]
},
{
  "id": "v4-dream-238",
  "title": "The Eel in the Extension Cord",
  "original": "/artwork/v4/collection/dream-238-original-v4.png",
  "altered": "/artwork/v4/collection/dream-238-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "closed-eye",
      "label": "The eel closes its eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.6979665071770335,
        "top": 0.44314558979808716,
        "width": 0.031698564593301434,
        "height": 0.04675876726886291
      }
    },
    {
      "id": "bolt-switch",
      "label": "The rocker switch carries a lightning symbol.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.05502392344497608,
        "top": 0.22741764080765142,
        "width": 0.04724880382775119,
        "height": 0.0924548352816153
      }
    },
    {
      "id": "turned-wheel",
      "label": "The mouse wheel turns across the seam.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.791267942583732,
        "top": 0.485653560042508,
        "width": 0.05442583732057416,
        "height": 0.0818278427205101
      }
    },
    {
      "id": "square-spiral",
      "label": "The paperclip\u2019s outer curl becomes square.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.34629186602870815,
        "top": 0.8278427205100957,
        "width": 0.056220095693779906,
        "height": 0.09670563230605739
      }
    },
    {
      "id": "sideways-socket",
      "label": "The center socket\u2019s slots form a sideways pattern.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.1686602870813397,
        "top": 0.32199787460148777,
        "width": 0.04844497607655503,
        "height": 0.08820403825717323
      }
    }
  ]
},
{
  "id": "v4-dream-236",
  "title": "The Child Who Folded the Afternoon",
  "original": "/artwork/v4/collection/dream-236-original-v4.png",
  "altered": "/artwork/v4/collection/dream-236-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The puppy's right ear folds upward.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.12260765550239235,
        "top": 0.5536663124335813,
        "width": 0.05263157894736842,
        "height": 0.12646121147715197
      }
    },
    {
      "id": "change-2",
      "label": "The train chimney bends sideways.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.19677033492822968,
        "top": 0.4112646121147715,
        "width": 0.03229665071770335,
        "height": 0.05526036131774708
      }
    },
    {
      "id": "change-3",
      "label": "The wall sail bears a crescent opening.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5095693779904307,
        "top": 0.01700318809776833,
        "width": 0.03289473684210526,
        "height": 0.05100956429330499
      }
    },
    {
      "id": "change-4",
      "label": "The green cube has a diamond recess.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.27212918660287083,
        "top": 0.7545164718384697,
        "width": 0.034688995215311005,
        "height": 0.03825717321997875
      }
    },
    {
      "id": "change-5",
      "label": "The red cube has a circular side aperture.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.2326555023923445,
        "top": 0.5759829968119022,
        "width": 0.01674641148325359,
        "height": 0.039319872476089264
      }
    }
  ]
},
{
  "id": "v4-dream-240",
  "title": "The Kangaroo's Spare Afternoon",
  "original": "/artwork/v4/collection/dream-240-original-v4.png",
  "altered": "/artwork/v4/collection/dream-240-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "closed-eye",
      "label": "The kangaroo closes one eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.34868421052631576,
        "top": 0.11370882040382571,
        "width": 0.034688995215311005,
        "height": 0.053134962805526036
      }
    },
    {
      "id": "swept-tassel",
      "label": "The tassel\u2019s fringe sweeps left.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.48564593301435405,
        "top": 0.6227417640807651,
        "width": 0.06399521531100479,
        "height": 0.0924548352816153
      }
    },
    {
      "id": "braced-lantern",
      "label": "The wall lantern gains an X brace.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.14294258373205743,
        "top": 0.12433581296493093,
        "width": 0.031698564593301434,
        "height": 0.0669500531349628
      }
    },
    {
      "id": "lattice-chair",
      "label": "The right theater chair has a diamond lattice.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.3929425837320574,
        "top": 0.4675876726886291,
        "width": 0.034688995215311005,
        "height": 0.053134962805526036
      }
    },
    {
      "id": "square-ring",
      "label": "The held curtain ring becomes square.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.4868421052631579,
        "top": 0.14133900106269925,
        "width": 0.03110047846889952,
        "height": 0.0765143464399575
      }
    }
  ]
},
{
  "id": "v4-dream-241",
  "title": "The Stairwell in the Apricot",
  "original": "/artwork/v4/collection/dream-241-original-v4.png",
  "altered": "/artwork/v4/collection/dream-241-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "A spiral groove winds across the apricot pit.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.09868421052631579,
        "top": 0.05526036131774708,
        "width": 0.15789473684210525,
        "height": 0.21679064824654623
      }
    },
    {
      "id": "change-2",
      "label": "The blue napkin's loose tip ties itself into a knot.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.49760765550239233,
        "top": 0.7056323060573858,
        "width": 0.14055023923444976,
        "height": 0.29436769394261425
      }
    },
    {
      "id": "change-3",
      "label": "A compass rose replaces the cup's blue leaf motif.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7954545454545454,
        "top": 0.04250797024442083,
        "width": 0.14354066985645933,
        "height": 0.21253985122210414
      }
    },
    {
      "id": "change-4",
      "label": "The key's bow becomes an open crescent.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.9156698564593302,
        "top": 0.4782146652497343,
        "width": 0.08433014354066985,
        "height": 0.13283740701381508
      }
    },
    {
      "id": "change-5",
      "label": "One ladder rung hinges upward at its free end.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.6351674641148325,
        "top": 0.4197662061636557,
        "width": 0.05562200956937799,
        "height": 0.08607863974495218
      }
    }
  ]
},
{
  "id": "v4-dream-244",
  "title": "The Dresser of Unmade Waves",
  "original": "/artwork/v4/collection/dream-244-original-v4.png",
  "altered": "/artwork/v4/collection/dream-244-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "pull",
      "label": "The top left shell pull hangs upside down.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.5586124401913876,
        "top": 0.21891604675876727,
        "width": 0.041866028708133975,
        "height": 0.06057385759829968
      }
    },
    {
      "id": "horse",
      "label": "The seahorse tail curls to the right.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.9204545454545454,
        "top": 0.24017003188097769,
        "width": 0.030502392344497607,
        "height": 0.06588735387885228
      }
    },
    {
      "id": "sail",
      "label": "The model boat right sail curves inward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7165071770334929,
        "top": 0.0,
        "width": 0.028110047846889953,
        "height": 0.08289054197662062
      }
    },
    {
      "id": "needle",
      "label": "The compass needle has a bold left arrowhead.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.07057416267942583,
        "top": 0.7917109458023379,
        "width": 0.03827751196172249,
        "height": 0.03506907545164718
      }
    },
    {
      "id": "moon",
      "label": "The chair blanket moon opens left.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.9521531100478469,
        "top": 0.5451647183846972,
        "width": 0.025119617224880382,
        "height": 0.04994686503719448
      }
    }
  ]
},
{
  "id": "v4-dream-245",
  "title": "The Violin Case Migration",
  "original": "/artwork/v4/collection/dream-245-original-v4.png",
  "altered": "/artwork/v4/collection/dream-245-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "sticker",
      "label": "The red case sticker shows an arched bridge.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.4605263157894737,
        "top": 0.5154091392136025,
        "width": 0.046052631578947366,
        "height": 0.08076514346439957
      }
    },
    {
      "id": "handle",
      "label": "The green case handle swings outward left.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.5986842105263158,
        "top": 0.4399574920297556,
        "width": 0.042464114832535885,
        "height": 0.17534537725823593
      }
    },
    {
      "id": "clock",
      "label": "The clock hands form a right angle.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.56877990430622,
        "top": 0.11689691817215728,
        "width": 0.03648325358851675,
        "height": 0.07863974495217853
      }
    },
    {
      "id": "clef",
      "label": "The rack plaque clef has a broad round curl.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.25299043062200954,
        "top": 0.6950053134962806,
        "width": 0.02033492822966507,
        "height": 0.077577045696068
      }
    },
    {
      "id": "wave",
      "label": "The black case wave crest curls inward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8014354066985646,
        "top": 0.6546227417640808,
        "width": 0.0215311004784689,
        "height": 0.04144527098831031
      }
    }
  ]
},
{
  "id": "v4-dream-247",
  "title": "The Walrus's Paper Fan",
  "original": "/artwork/v4/collection/dream-247-original-v4.png",
  "altered": "/artwork/v4/collection/dream-247-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The fish biscuit mouth opens in a smile.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.5729665071770335,
        "top": 0.8533475026567482,
        "width": 0.03289473684210526,
        "height": 0.04250797024442083
      }
    },
    {
      "id": "change-2",
      "label": "The fan bow gains an upright loop.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.5604066985645934,
        "top": 0.6726886291179596,
        "width": 0.039473684210526314,
        "height": 0.08395324123273114
      }
    },
    {
      "id": "change-3",
      "label": "The compass red needle bends in an elbow.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8863636363636364,
        "top": 0.7874601487778958,
        "width": 0.038875598086124404,
        "height": 0.03506907545164718
      }
    },
    {
      "id": "change-4",
      "label": "The parcel cord crosses diagonally.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.046052631578947366,
        "top": 0.824654622741764,
        "width": 0.0861244019138756,
        "height": 0.09776833156216791
      }
    },
    {
      "id": "change-5",
      "label": "The compass winding loop reflects blue.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.9425837320574163,
        "top": 0.7481402763018066,
        "width": 0.03409090909090909,
        "height": 0.05526036131774708
      }
    }
  ]
},
{
  "id": "v4-dream-250",
  "title": "The Last Drop of the Elevator",
  "original": "/artwork/v4/collection/dream-250-original-v4.png",
  "altered": "/artwork/v4/collection/dream-250-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The near pulley has curved spokes.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.4605263157894737,
        "top": 0.007438894792773645,
        "width": 0.0430622009569378,
        "height": 0.1179596174282678
      }
    },
    {
      "id": "change-2",
      "label": "A ladder rung arches upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.5944976076555024,
        "top": 0.44314558979808716,
        "width": 0.038875598086124404,
        "height": 0.04782146652497343
      }
    },
    {
      "id": "change-3",
      "label": "The right door handle closes into a loop.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5107655502392344,
        "top": 0.5536663124335813,
        "width": 0.020933014354066987,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "change-4",
      "label": "The left bubble becomes leaf-shaped.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.39174641148325356,
        "top": 0.4537725823591923,
        "width": 0.02631578947368421,
        "height": 0.07863974495217853
      }
    },
    {
      "id": "change-5",
      "label": "The bollard cap is hollow.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8965311004784688,
        "top": 0.7056323060573858,
        "width": 0.04665071770334928,
        "height": 0.05100956429330499
      }
    }
  ]
},
{
  "id": "v4-dream-253",
  "title": "The Dragon's Unsent Letter",
  "original": "/artwork/v4/collection/dream-253-original-v4.png",
  "altered": "/artwork/v4/collection/dream-253-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "closed-eye",
      "label": "The dragon closes one eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.4874401913875598,
        "top": 0.1891604675876727,
        "width": 0.03648325358851675,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "crescent-seal",
      "label": "The wax seal bears a crescent.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.4916267942583732,
        "top": 0.6004250797024442,
        "width": 0.07834928229665072,
        "height": 0.13071200850159406
      }
    },
    {
      "id": "diamond-pillow",
      "label": "The armchair pillow turns to a diamond.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7147129186602871,
        "top": 0.332624867162593,
        "width": 0.038875598086124404,
        "height": 0.05844845908607864
      }
    },
    {
      "id": "sideways-twig",
      "label": "The stamp\u2019s engraved twig lies sideways.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.08552631578947369,
        "top": 0.34537725823591925,
        "width": 0.05263157894736842,
        "height": 0.1339001062699256
      }
    },
    {
      "id": "hooked-opener",
      "label": "The letter opener\u2019s lower tip curls upward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.6435406698564593,
        "top": 0.8852284803400637,
        "width": 0.08971291866028708,
        "height": 0.10520722635494155
      }
    }
  ]
},
{
  "id": "v4-dream-254",
  "title": "The Sock Ferryman",
  "original": "/artwork/v4/collection/dream-254-original-v4.png",
  "altered": "/artwork/v4/collection/dream-254-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "surprised-mouth",
      "label": "The ferryman\u2019s mouth forms an O.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.3116028708133971,
        "top": 0.23485653560042508,
        "width": 0.02930622009569378,
        "height": 0.0563230605738576
      }
    },
    {
      "id": "sideways-bell",
      "label": "The bell turns to face left.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.22248803827751196,
        "top": 0.23485653560042508,
        "width": 0.046052631578947366,
        "height": 0.10520722635494155
      }
    },
    {
      "id": "swept-tassel",
      "label": "The loafer\u2019s tassel sweeps right.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4491626794258373,
        "top": 0.5696068012752391,
        "width": 0.07834928229665072,
        "height": 0.1073326248671626
      }
    },
    {
      "id": "heart-latch",
      "label": "The boat latch has a heart-shaped opening.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.29485645933014354,
        "top": 0.640807651434644,
        "width": 0.04066985645933014,
        "height": 0.09989373007438895
      }
    },
    {
      "id": "round-pull",
      "label": "The distant zipper pull has a round opening.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.7828947368421053,
        "top": 0.20085015940488843,
        "width": 0.02631578947368421,
        "height": 0.04569606801275239
      }
    }
  ]
},
{
  "id": "v4-dream-248",
  "title": "The Workshop of Lost Corners",
  "original": "/artwork/v4/collection/dream-248-original-v4.png",
  "altered": "/artwork/v4/collection/dream-248-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The lower scissor handle becomes triangular.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.409688995215311,
        "top": 0.7353878852284803,
        "width": 0.08313397129186603,
        "height": 0.09351753453772582
      }
    },
    {
      "id": "change-2",
      "label": "The coffee reflects a blue crescent.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.09808612440191387,
        "top": 0.40170031880977686,
        "width": 0.05143540669856459,
        "height": 0.057385759829968117
      }
    },
    {
      "id": "change-3",
      "label": "The spool hole has a diagonal crossbar.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6794258373205742,
        "top": 0.5409139213602551,
        "width": 0.025717703349282296,
        "height": 0.03400637619553666
      }
    },
    {
      "id": "change-4",
      "label": "The stool triangle has a zigzag seam.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6836124401913876,
        "top": 0.30605738575983,
        "width": 0.056220095693779906,
        "height": 0.09139213602550478
      }
    },
    {
      "id": "change-5",
      "label": "The thimble has a triangular cutout.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.3277511961722488,
        "top": 0.5132837407013815,
        "width": 0.026913875598086126,
        "height": 0.04250797024442083
      }
    }
  ]
},
{
  "id": "v4-dream-249",
  "title": "The Blanket That Grew a Backbone",
  "original": "/artwork/v4/collection/dream-249-original-v4.png",
  "altered": "/artwork/v4/collection/dream-249-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The wooden toy tail curls upward.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.0,
        "top": 0.69394261424017,
        "width": 0.04126794258373206,
        "height": 0.12964930924548354
      }
    },
    {
      "id": "change-2",
      "label": "The stone motif becomes a crescent.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.125,
        "top": 0.793836344314559,
        "width": 0.03349282296650718,
        "height": 0.04782146652497343
      }
    },
    {
      "id": "change-3",
      "label": "The bedpost ball reflects a blue crescent.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8492822966507177,
        "top": 0.7236981934112646,
        "width": 0.020933014354066987,
        "height": 0.06376195536663125
      }
    },
    {
      "id": "change-4",
      "label": "The blanket button has a diagonal crossbar.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.4150717703349282,
        "top": 0.4293304994686504,
        "width": 0.028110047846889953,
        "height": 0.048884165781083955
      }
    },
    {
      "id": "change-5",
      "label": "The middle hanging star has a slit.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.3211722488038278,
        "top": 0.07438894792773645,
        "width": 0.023923444976076555,
        "height": 0.04250797024442083
      }
    }
  ]
},
{
  "id": "v4-dream-246",
  "title": "The Girl Who Lent Her Reflection",
  "original": "/artwork/v4/collection/dream-246-original-v4.png",
  "altered": "/artwork/v4/collection/dream-246-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "reflection",
      "label": "The reflection smiles with visible teeth.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.5376794258373205,
        "top": 0.359192348565356,
        "width": 0.03409090909090909,
        "height": 0.03719447396386823
      }
    },
    {
      "id": "jar",
      "label": "The silver jar relief becomes a heart.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.14473684210526316,
        "top": 0.34643995749202977,
        "width": 0.03349282296650718,
        "height": 0.05526036131774708
      }
    },
    {
      "id": "book",
      "label": "The top book crescent opens the other way.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.046052631578947366,
        "top": 0.7513283740701382,
        "width": 0.05203349282296651,
        "height": 0.05100956429330499
      }
    },
    {
      "id": "charm",
      "label": "The hanging crescent opens left.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8289473684210527,
        "top": 0.13602550478214664,
        "width": 0.031698564593301434,
        "height": 0.07226354941551541
      }
    },
    {
      "id": "brush",
      "label": "The hairbrush handle has an interlaced braid.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.3145933014354067,
        "top": 0.8916046758767269,
        "width": 0.090311004784689,
        "height": 0.04994686503719448
      }
    }
  ]
},
{
  "id": "v4-dream-251",
  "title": "The Lobster's Small Apology",
  "original": "/artwork/v4/collection/dream-251-original-v4.png",
  "altered": "/artwork/v4/collection/dream-251-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The nearer lobster eye winks.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.30023923444976075,
        "top": 0.13071200850159406,
        "width": 0.0430622009569378,
        "height": 0.06907545164718384
      }
    },
    {
      "id": "change-2",
      "label": "The cup handle opens into a hook.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.34748803827751196,
        "top": 0.29861849096705634,
        "width": 0.03349282296650718,
        "height": 0.08076514346439957
      }
    },
    {
      "id": "change-3",
      "label": "The spoon bowl has a heart aperture.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.3397129186602871,
        "top": 0.8384697130712009,
        "width": 0.04126794258373206,
        "height": 0.06269925611052073
      }
    },
    {
      "id": "change-4",
      "label": "The tin shell ribs curl into a spiral.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.9114832535885168,
        "top": 0.5015940488841658,
        "width": 0.05980861244019139,
        "height": 0.1179596174282678
      }
    },
    {
      "id": "change-5",
      "label": "The napkin sail bows inward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8438995215311005,
        "top": 0.871413390010627,
        "width": 0.037679425837320576,
        "height": 0.08395324123273114
      }
    }
  ]
},
{
  "id": "v4-dream-256",
  "title": "The Bathtub's Second Shore",
  "original": "/artwork/v4/collection/dream-256-original-v4.png",
  "altered": "/artwork/v4/collection/dream-256-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "cottage-door",
      "label": "The yellow cottage door stands ajar.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.3456937799043062,
        "top": 0.04782146652497343,
        "width": 0.023923444976076555,
        "height": 0.06376195536663125
      }
    },
    {
      "id": "sail-left",
      "label": "The striped sail has two white bands.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.7081339712918661,
        "top": 0.46546227417640806,
        "width": 0.04904306220095694,
        "height": 0.09776833156216791
      }
    },
    {
      "id": "jar-lid",
      "label": "The turquoise jar has a glass lid.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8941387559808612,
        "top": 0.02975557917109458,
        "width": 0.038875598086124404,
        "height": 0.06269925611052073
      }
    },
    {
      "id": "gull-beak",
      "label": "The seagull opens its beak.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5807416267942583,
        "top": 0.3379383634431456,
        "width": 0.023923444976076555,
        "height": 0.026567481402763018
      }
    },
    {
      "id": "brush-heart",
      "label": "The brush handle hole becomes heart-shaped.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.1166267942583732,
        "top": 0.563230605738576,
        "width": 0.022129186602870814,
        "height": 0.03506907545164718
      }
    }
  ]
},
{
  "id": "v4-dream-255",
  "title": "The Mouse and the Heavy Feather",
  "original": "/artwork/v4/collection/dream-255-original-v4.png",
  "altered": "/artwork/v4/collection/dream-255-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "closed-eye",
      "label": "The mouse closes its eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.27392344497607657,
        "top": 0.41339001062699254,
        "width": 0.028110047846889953,
        "height": 0.03294367693942614
      }
    },
    {
      "id": "upright-acorn",
      "label": "The cup\u2019s engraved acorn points upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7894736842105263,
        "top": 0.6259298618490967,
        "width": 0.037679425837320576,
        "height": 0.0818278427205101
      }
    },
    {
      "id": "triangle-key",
      "label": "The winding key\u2019s upper hole becomes triangular.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.14952153110047847,
        "top": 0.43889479277364507,
        "width": 0.031698564593301434,
        "height": 0.05526036131774708
      }
    },
    {
      "id": "crescent-book",
      "label": "The blue book\u2019s star becomes a crescent.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.25179425837320574,
        "top": 0.09564293304994687,
        "width": 0.08552631578947369,
        "height": 0.18278427205100956
      }
    },
    {
      "id": "cross-hub",
      "label": "One cart wheel\u2019s hub has a cross-shaped slot.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.3953349282296651,
        "top": 0.71413390010627,
        "width": 0.02452153110047847,
        "height": 0.039319872476089264
      }
    }
  ]
},
{
  "id": "v4-dream-252",
  "title": "The Baker of Square Bubbles",
  "original": "/artwork/v4/collection/dream-252-original-v4.png",
  "altered": "/artwork/v4/collection/dream-252-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The cat closes its nearer eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.215311004784689,
        "top": 0.26567481402763016,
        "width": 0.028708133971291867,
        "height": 0.03825717321997875
      }
    },
    {
      "id": "change-2",
      "label": "The sprayer spout curls into a hook.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.2625598086124402,
        "top": 0.6068012752391073,
        "width": 0.03588516746411483,
        "height": 0.05419766206163656
      }
    },
    {
      "id": "change-3",
      "label": "The whisk wires form a helix.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7159090909090909,
        "top": 0.15834218916046758,
        "width": 0.041866028708133975,
        "height": 0.11158342189160468
      }
    },
    {
      "id": "change-4",
      "label": "The cutter rim has a V notch.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.340311004784689,
        "top": 0.7268862911795961,
        "width": 0.03708133971291866,
        "height": 0.06057385759829968
      }
    },
    {
      "id": "change-5",
      "label": "The mitt has a spiral stitch.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.9461722488038278,
        "top": 0.6184909670563231,
        "width": 0.028110047846889953,
        "height": 0.04675876726886291
      }
    }
  ]
},
{
  "id": "v4-dream-257",
  "title": "The Pomegranate's Private Theater",
  "original": "/artwork/v4/collection/dream-257-original-v4.png",
  "altered": "/artwork/v4/collection/dream-257-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "lens-cap",
      "label": "The left opera-glass barrel has a pearl-white cap.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.7948564593301436,
        "top": 0.30818278427205104,
        "width": 0.06578947368421052,
        "height": 0.04994686503719448
      }
    },
    {
      "id": "curtain-loop",
      "label": "A braided loop surrounds the left curtain tassel.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.3116028708133971,
        "top": 0.3846971307120085,
        "width": 0.02751196172248804,
        "height": 0.06376195536663125
      }
    },
    {
      "id": "stage-heart",
      "label": "The hanging stage ring becomes heart-shaped.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.42105263157894735,
        "top": 0.2412327311370882,
        "width": 0.03289473684210526,
        "height": 0.057385759829968117
      }
    },
    {
      "id": "chair-moon",
      "label": "The front center-left seatback bears a golden crescent.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.4007177033492823,
        "top": 0.6631243358129649,
        "width": 0.0215311004784689,
        "height": 0.04250797024442083
      }
    },
    {
      "id": "medal-mask",
      "label": "The medal bears a smiling theater mask.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.7739234449760766,
        "top": 0.8384697130712009,
        "width": 0.056818181818181816,
        "height": 0.09883103081827843
      }
    }
  ]
},
{
  "id": "v4-dream-242",
  "title": "A Robot Learning to Float",
  "original": "/artwork/v4/collection/dream-242-original-v4.png",
  "altered": "/artwork/v4/collection/dream-242-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The drain cover hinges open.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.0,
        "top": 0.5759829968119022,
        "width": 0.20095693779904306,
        "height": 0.36238044633368754
      }
    },
    {
      "id": "change-2",
      "label": "The hanging orange towel ties itself into a knot.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.6226076555023924,
        "top": 0.12008501594048884,
        "width": 0.06937799043062201,
        "height": 0.14558979808714134
      }
    },
    {
      "id": "change-3",
      "label": "The right cork float's white band becomes a braid.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6148325358851675,
        "top": 0.4771519659936238,
        "width": 0.08133971291866028,
        "height": 0.1902231668437832
      }
    },
    {
      "id": "change-4",
      "label": "A spiral groove is cut into the soap.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8803827751196173,
        "top": 0.7385759829968119,
        "width": 0.07775119617224881,
        "height": 0.06482465462274177
      }
    },
    {
      "id": "change-5",
      "label": "The bathtub's front foot curls into a closed loop.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.40311004784689,
        "top": 0.24335812964930925,
        "width": 0.0430622009569378,
        "height": 0.0818278427205101
      }
    }
  ]
},
{
  "id": "v4-dream-262",
  "title": "The Clock That Ate Its Hands",
  "original": "/artwork/v4/collection/dream-262-original-v4.png",
  "altered": "/artwork/v4/collection/dream-262-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "wink",
      "label": "The clock left eye closes in a wink.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.3307416267942584,
        "top": 0.16578108395324123,
        "width": 0.0729665071770335,
        "height": 0.10626992561105207
      }
    },
    {
      "id": "smile",
      "label": "The pendulum mouth becomes a smile.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7398325358851675,
        "top": 0.6705632306057385,
        "width": 0.028708133971291867,
        "height": 0.03294367693942614
      }
    },
    {
      "id": "key",
      "label": "The floor key upper opening is triangular.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.06698564593301436,
        "top": 0.7948990435706695,
        "width": 0.038875598086124404,
        "height": 0.05844845908607864
      }
    },
    {
      "id": "scroll",
      "label": "The clock left scroll curls into a spiral.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.20813397129186603,
        "top": 0.6556854410201913,
        "width": 0.05083732057416268,
        "height": 0.13071200850159406
      }
    },
    {
      "id": "rope",
      "label": "The curtain rope crossing changes its weave.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.9300239234449761,
        "top": 0.3443145589798087,
        "width": 0.06997607655502393,
        "height": 0.08820403825717323
      }
    }
  ]
},
{
  "id": "v4-dream-268",
  "title": "The Shoemaker of Empty Footsteps",
  "original": "/artwork/v4/collection/dream-268-original-v4.png",
  "altered": "/artwork/v4/collection/dream-268-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The foremost glass shoe curls its toe upward.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.7057416267942583,
        "top": 0.7821466524973433,
        "width": 0.09330143540669857,
        "height": 0.1487778958554729
      }
    },
    {
      "id": "change-2",
      "label": "The cobbler closes one eye.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.4611244019138756,
        "top": 0.15834218916046758,
        "width": 0.03289473684210526,
        "height": 0.04782146652497343
      }
    },
    {
      "id": "change-3",
      "label": "The awl handle has a carved crescent.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.42822966507177035,
        "top": 0.696068012752391,
        "width": 0.07476076555023924,
        "height": 0.06482465462274177
      }
    },
    {
      "id": "change-4",
      "label": "The spool end cap forms a star.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6016746411483254,
        "top": 0.8055260361317748,
        "width": 0.04665071770334928,
        "height": 0.10414452709883103
      }
    },
    {
      "id": "change-5",
      "label": "The hanging footprint has a diamond heel mark.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.6836124401913876,
        "top": 0.22316684378320936,
        "width": 0.02751196172248804,
        "height": 0.06588735387885228
      }
    }
  ]
},
{
  "id": "v4-dream-259",
  "title": "The Cabinet of Borrowed Thunder",
  "original": "/artwork/v4/collection/dream-259-original-v4.png",
  "altered": "/artwork/v4/collection/dream-259-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The mug motif becomes a gold star.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.13935406698564592,
        "top": 0.5781083953241233,
        "width": 0.04066985645933014,
        "height": 0.07120085015940489
      }
    },
    {
      "id": "change-2",
      "label": "The magnifying glass reflects a blue crescent.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.5215311004784688,
        "top": 0.4059511158342189,
        "width": 0.02631578947368421,
        "height": 0.04782146652497343
      }
    },
    {
      "id": "change-3",
      "label": "One ladder brace arches upward.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.46351674641148327,
        "top": 0.6641870350690755,
        "width": 0.045454545454545456,
        "height": 0.05100956429330499
      }
    },
    {
      "id": "change-4",
      "label": "The lantern lattice has a diagonal crossbar.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7296650717703349,
        "top": 0.8044633368756642,
        "width": 0.05143540669856459,
        "height": 0.1126461211477152
      }
    },
    {
      "id": "change-5",
      "label": "One cabinet pull has an X engraving.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.7948564593301436,
        "top": 0.3655685441020191,
        "width": 0.01854066985645933,
        "height": 0.025504782146652496
      }
    }
  ]
},
{
  "id": "v4-dream-258",
  "title": "The Boy Who Walked the Tablecloth",
  "original": "/artwork/v4/collection/dream-258-original-v4.png",
  "altered": "/artwork/v4/collection/dream-258-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "chair-crossbar",
      "label": "The chair back has a broad horizontal crossbar.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.5023923444976076,
        "top": 0.2624867162592986,
        "width": 0.10705741626794259,
        "height": 0.2454835281615303
      },
      "source": "/artwork/v4/collection/dream-258-chair-selected-source-v4.png"
    },
    {
      "id": "shoe-unfastened",
      "label": "The raised shoe strap stands unfastened.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.8624401913875598,
        "top": 0.7098831030818279,
        "width": 0.034688995215311005,
        "height": 0.0818278427205101
      }
    },
    {
      "id": "tureen-lid",
      "label": "The tureen lid tilts open.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.22248803827751196,
        "top": 0.18809776833156217,
        "width": 0.09389952153110048,
        "height": 0.06801275239107332
      }
    },
    {
      "id": "dog-wink",
      "label": "The dog closes one eye.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.07894736842105263,
        "top": 0.46439957492029754,
        "width": 0.019736842105263157,
        "height": 0.03506907545164718
      }
    },
    {
      "id": "sweater-leaf",
      "label": "The sweater has a leaf motif with a curled stem.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.819377990430622,
        "top": 0.2518597236981934,
        "width": 0.03827751196172249,
        "height": 0.0871413390010627
      }
    }
  ]
},
{
  "id": "v4-dream-260",
  "title": "The Bell Pepper's Silent Bell",
  "original": "/artwork/v4/collection/dream-260-original-v4.png",
  "altered": "/artwork/v4/collection/dream-260-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The key bow has a diagonal crossbar.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.8630382775119617,
        "top": 0.12964930924548354,
        "width": 0.04665071770334928,
        "height": 0.07013815090329437
      }
    },
    {
      "id": "change-2",
      "label": "The bell interior reflects a blue crescent.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.6220095693779905,
        "top": 0.9022316684378321,
        "width": 0.04724880382775119,
        "height": 0.053134962805526036
      }
    },
    {
      "id": "change-3",
      "label": "The bowl motif stem curls inward.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.11303827751196172,
        "top": 0.822529224229543,
        "width": 0.034688995215311005,
        "height": 0.0669500531349628
      }
    },
    {
      "id": "change-4",
      "label": "The stool cushion has a gold zigzag seam.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8133971291866029,
        "top": 0.5642933049946866,
        "width": 0.041866028708133975,
        "height": 0.09032943676939426
      }
    },
    {
      "id": "change-5",
      "label": "The picture pin has an X slot.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.6925837320574163,
        "top": 0.036131774707757705,
        "width": 0.025119617224880382,
        "height": 0.044633368756641874
      }
    }
  ]
},
{
  "id": "v4-dream-261",
  "title": "The Hermit Crab's Waiting Room",
  "original": "/artwork/v4/collection/dream-261-original-v4.png",
  "altered": "/artwork/v4/collection/dream-261-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The glass pebble reflects a gold star.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.8409090909090909,
        "top": 0.7396386822529224,
        "width": 0.041866028708133975,
        "height": 0.06376195536663125
      }
    },
    {
      "id": "change-2",
      "label": "The left chair armrest arches upward.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.18361244019138756,
        "top": 0.3230605738575983,
        "width": 0.03588516746411483,
        "height": 0.05844845908607864
      }
    },
    {
      "id": "change-3",
      "label": "The wooden sign has an S-shaped groove.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.3875598086124402,
        "top": 0.19766206163655686,
        "width": 0.04724880382775119,
        "height": 0.039319872476089264
      }
    },
    {
      "id": "change-4",
      "label": "The lamp shade reflects a blue crescent.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.22727272727272727,
        "top": 0.14027630180658873,
        "width": 0.0215311004784689,
        "height": 0.03825717321997875
      }
    },
    {
      "id": "change-5",
      "label": "The doorknob has an X groove.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.45215311004784686,
        "top": 0.2678002125398512,
        "width": 0.022727272727272728,
        "height": 0.03719447396386823
      }
    }
  ]
},
{
  "id": "v4-dream-263",
  "title": "The Staircase on the Back of a Stamp",
  "original": "/artwork/v4/collection/dream-263-original-v4.png",
  "altered": "/artwork/v4/collection/dream-263-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "seal",
      "label": "The wax seal branch stem curls into a spiral.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.10526315789473684,
        "top": 0.24867162592986186,
        "width": 0.037679425837320576,
        "height": 0.06801275239107332
      }
    },
    {
      "id": "clip",
      "label": "The paperclip inner end curls upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.17404306220095694,
        "top": 0.7300743889479278,
        "width": 0.028708133971291867,
        "height": 0.04994686503719448
      }
    },
    {
      "id": "chair",
      "label": "The tiny chair right arm ends in a scroll.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.48863636363636365,
        "top": 0.6184909670563231,
        "width": 0.034688995215311005,
        "height": 0.04994686503719448
      }
    },
    {
      "id": "lid",
      "label": "The ink bottle lid has a crescent ridge.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8833732057416268,
        "top": 0.0,
        "width": 0.11244019138755981,
        "height": 0.08820403825717323
      }
    },
    {
      "id": "stair",
      "label": "The paper stair front lip bows upward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.631578947368421,
        "top": 0.6450584484590861,
        "width": 0.07834928229665072,
        "height": 0.061636556854410204
      }
    }
  ]
},
{
  "id": "v4-dream-265",
  "title": "The Seamstress of Warm Shadows",
  "original": "/artwork/v4/collection/dream-265-original-v4.png",
  "altered": "/artwork/v4/collection/dream-265-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "open-smile",
      "label": "The seamstress opens her smile.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.6148325358851675,
        "top": 0.22316684378320936,
        "width": 0.042464114832535885,
        "height": 0.0563230605738576
      }
    },
    {
      "id": "pointed-bulb",
      "label": "The lamp\u2019s bulb has a pointed flame shape.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.1937799043062201,
        "top": 0.18384697130712008,
        "width": 0.06698564593301436,
        "height": 0.09351753453772582
      }
    },
    {
      "id": "square-spool",
      "label": "The spool has a square center hole.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.2589712918660287,
        "top": 0.5961742826780021,
        "width": 0.019736842105263157,
        "height": 0.044633368756641874
      }
    },
    {
      "id": "cross-thimble",
      "label": "The thimble\u2019s top has a cross-shaped opening.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.23385167464114834,
        "top": 0.6981934112646121,
        "width": 0.022727272727272728,
        "height": 0.023379383634431455
      }
    },
    {
      "id": "slotted-pivot",
      "label": "The scissors\u2019 pivot has an X slot.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.125,
        "top": 0.8299681190223167,
        "width": 0.020933014354066987,
        "height": 0.025504782146652496
      }
    }
  ]
},
{
  "id": "v4-dream-269",
  "title": "The Window in the Accordion",
  "original": "/artwork/v4/collection/dream-269-original-v4.png",
  "altered": "/artwork/v4/collection/dream-269-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The chair back bears a spiral.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.4611244019138756,
        "top": 0.4442082890541977,
        "width": 0.025717703349282296,
        "height": 0.06057385759829968
      }
    },
    {
      "id": "change-2",
      "label": "The pendant tilts sideways.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.45933014354066987,
        "top": 0.255047821466525,
        "width": 0.04904306220095694,
        "height": 0.08926673751328375
      }
    },
    {
      "id": "change-3",
      "label": "The mirror reflects a crescent.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.34688995215311,
        "top": 0.31668437832093516,
        "width": 0.014952153110047847,
        "height": 0.057385759829968117
      }
    },
    {
      "id": "change-4",
      "label": "The candle wick curls into a loop.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.9407894736842105,
        "top": 0.13177470775770456,
        "width": 0.020933014354066987,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "change-5",
      "label": "The top bass button becomes square.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.7763157894736842,
        "top": 0.3432518597236982,
        "width": 0.01854066985645933,
        "height": 0.036131774707757705
      }
    }
  ]
},
{
  "id": "v4-dream-264",
  "title": "The Elephant's Glass Slippers",
  "original": "/artwork/v4/collection/dream-264-original-v4.png",
  "altered": "/artwork/v4/collection/dream-264-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "heel",
      "label": "The right glass slipper heel twists into a spiral.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.7278708133971292,
        "top": 0.6014877789585548,
        "width": 0.035287081339712915,
        "height": 0.11902231668437832
      }
    },
    {
      "id": "bow",
      "label": "The elephant right bow loop curls downward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.3965311004784689,
        "top": 0.3475026567481403,
        "width": 0.038875598086124404,
        "height": 0.09564293304994687
      }
    },
    {
      "id": "box",
      "label": "The jewelry box lid flips open.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.10825358851674641,
        "top": 0.02975557917109458,
        "width": 0.04844497607655503,
        "height": 0.04782146652497343
      }
    },
    {
      "id": "brush",
      "label": "The brush back has a gold crescent.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8803827751196173,
        "top": 0.7449521785334751,
        "width": 0.04724880382775119,
        "height": 0.048884165781083955
      }
    },
    {
      "id": "ribbon",
      "label": "The blue ribbon arch has an overhand knot.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.48504784688995217,
        "top": 0.8522848034006376,
        "width": 0.12260765550239235,
        "height": 0.1275239107332625
      }
    }
  ]
},
{
  "id": "v4-dream-272",
  "title": "The Dragon's Bread Basket",
  "original": "/artwork/v4/collection/dream-272-original-v4.png",
  "altered": "/artwork/v4/collection/dream-272-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "dragon-eye",
      "label": "The dragon opens its eye.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.34688995215311,
        "top": 0.14133900106269925,
        "width": 0.06279904306220095,
        "height": 0.07120085015940489
      }
    },
    {
      "id": "dragon-paw",
      "label": "The raised forepaw curls toward the chest.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.39712918660287083,
        "top": 0.38575982996811903,
        "width": 0.0735645933014354,
        "height": 0.1806588735387885
      }
    },
    {
      "id": "loaf-slashes",
      "label": "The flour loaf has three parallel slashes.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5526315789473685,
        "top": 0.25292242295430395,
        "width": 0.16028708133971292,
        "height": 0.23698193411264612
      }
    },
    {
      "id": "tin-heart",
      "label": "The tin handle hole becomes heart-shaped.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7751196172248804,
        "top": 0.019128586609989374,
        "width": 0.023923444976076555,
        "height": 0.04782146652497343
      }
    },
    {
      "id": "knife-moon",
      "label": "The knife handle has a crescent inlay.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.9395933014354066,
        "top": 0.4303931987247609,
        "width": 0.022129186602870814,
        "height": 0.044633368756641874
      }
    }
  ]
},
{
  "id": "v4-dream-266",
  "title": "The Umbilical of the City",
  "original": "/artwork/v4/collection/dream-266-original-v4.png",
  "altered": "/artwork/v4/collection/dream-266-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "spiral-dial",
      "label": "The telephone dial\u2019s center bears a spiral.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.20813397129186603,
        "top": 0.40807651434643993,
        "width": 0.06399521531100479,
        "height": 0.11477151965993623
      }
    },
    {
      "id": "raised-stop",
      "label": "The dial\u2019s finger stop curls upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.27811004784689,
        "top": 0.4569606801275239,
        "width": 0.04724880382775119,
        "height": 0.08607863974495218
      }
    },
    {
      "id": "braced-lantern",
      "label": "The hanging lantern gains an X brace.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.9288277511961722,
        "top": 0.3602550478214665,
        "width": 0.03409090909090909,
        "height": 0.07120085015940489
      }
    },
    {
      "id": "round-door",
      "label": "The little house\u2019s right opening becomes round.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6220095693779905,
        "top": 0.8565356004250797,
        "width": 0.02332535885167464,
        "height": 0.04250797024442083
      }
    },
    {
      "id": "triangle-key",
      "label": "The key\u2019s bow becomes triangular.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.0819377990430622,
        "top": 0.798087141339001,
        "width": 0.050239234449760764,
        "height": 0.07013815090329437
      }
    }
  ]
},
{
  "id": "v4-dream-267",
  "title": "The Toad's Porcelain Throne",
  "original": "/artwork/v4/collection/dream-267-original-v4.png",
  "altered": "/artwork/v4/collection/dream-267-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "narrow-eye",
      "label": "The toad\u2019s pupil narrows to a slit.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.4730861244019139,
        "top": 0.0871413390010627,
        "width": 0.03289473684210526,
        "height": 0.05100956429330499
      }
    },
    {
      "id": "round-spoon",
      "label": "The spoon\u2019s bowl becomes round.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.6106459330143541,
        "top": 0.7725823591923485,
        "width": 0.09270334928229665,
        "height": 0.15834218916046758
      }
    },
    {
      "id": "horizontal-leaf",
      "label": "The top cup\u2019s leaf motif lies horizontally.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.409688995215311,
        "top": 0.3198724760892667,
        "width": 0.11722488038277512,
        "height": 0.12221041445270989
      }
    },
    {
      "id": "zigzag-bowl",
      "label": "The lowest bowl\u2019s border forms a zigzag.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.39952153110047844,
        "top": 0.8363443145589798,
        "width": 0.20992822966507177,
        "height": 0.05419766206163656
      }
    },
    {
      "id": "crescent-crown",
      "label": "The crown\u2019s velvet panel bears a crescent.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.4820574162679426,
        "top": 0.026567481402763018,
        "width": 0.025119617224880382,
        "height": 0.052072263549415514
      }
    }
  ]
},
{
  "id": "v4-dream-271",
  "title": "The Girl and the Unfinished Zebra",
  "original": "/artwork/v4/collection/dream-271-original-v4.png",
  "altered": "/artwork/v4/collection/dream-271-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The zebra closes its visible eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.39832535885167464,
        "top": 0.14240170031880978,
        "width": 0.026913875598086126,
        "height": 0.04144527098831031
      }
    },
    {
      "id": "change-2",
      "label": "The first strip hem folds upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.6584928229665071,
        "top": 0.34643995749202977,
        "width": 0.049641148325358854,
        "height": 0.1339001062699256
      }
    },
    {
      "id": "change-3",
      "label": "The door knocker opens into a hook.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.9401913875598086,
        "top": 0.38788522848034007,
        "width": 0.03648325358851675,
        "height": 0.077577045696068
      }
    },
    {
      "id": "change-4",
      "label": "The apron pocket bears heart stitching.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5867224880382775,
        "top": 0.5430393198724761,
        "width": 0.031698564593301434,
        "height": 0.06057385759829968
      }
    },
    {
      "id": "change-5",
      "label": "The pot rim has a pouring notch.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.03648325358851675,
        "top": 0.48034006376195537,
        "width": 0.03827751196172249,
        "height": 0.06057385759829968
      }
    }
  ]
},
{
  "id": "v4-dream-243",
  "title": "The Ceiling's Missing Tooth",
  "original": "/artwork/v4/collection/dream-243-original-v4.png",
  "altered": "/artwork/v4/collection/dream-243-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The cotton jar's glass lid is hinged open.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.0,
        "top": 0.34006376195536664,
        "width": 0.07177033492822966,
        "height": 0.10201912858660998
      }
    },
    {
      "id": "change-2",
      "label": "The oval mirror reflects a crescent.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.11483253588516747,
        "top": 0.3475026567481403,
        "width": 0.0645933014354067,
        "height": 0.14558979808714134
      }
    },
    {
      "id": "change-3",
      "label": "The hanging trolley towel ties through its own knot.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7075358851674641,
        "top": 0.6801275239107333,
        "width": 0.11363636363636363,
        "height": 0.28374070138150903
      }
    },
    {
      "id": "change-4",
      "label": "The patient's bib has a purple diamond lattice.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.39952153110047844,
        "top": 0.46865037194473963,
        "width": 0.145933014354067,
        "height": 0.1636556854410202
      }
    },
    {
      "id": "change-5",
      "label": "The ceiling tile's right corner curls into a hollow lip.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.49760765550239233,
        "top": 0.061636556854410204,
        "width": 0.07894736842105263,
        "height": 0.14558979808714134
      }
    }
  ]
},
{
  "id": "v4-dream-273",
  "title": "The Piano That Crossed the Hall",
  "original": "/artwork/v4/collection/dream-273-original-v4.png",
  "altered": "/artwork/v4/collection/dream-273-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "bench-diamonds",
      "label": "The bench cushion has pale diamond motifs.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.8313397129186603,
        "top": 0.6131774707757705,
        "width": 0.1686602870813397,
        "height": 0.15727948990435706
      }
    },
    {
      "id": "page-curl",
      "label": "The score's upper-right page corner curls backward.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.7296650717703349,
        "top": 0.23910733262486716,
        "width": 0.03289473684210526,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "fish-mouth",
      "label": "The fish narrows its open mouth.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5645933014354066,
        "top": 0.14240170031880978,
        "width": 0.02033492822966507,
        "height": 0.04994686503719448
      }
    },
    {
      "id": "key-heart",
      "label": "The hanging piano key bears a black heart.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5921052631578947,
        "top": 0.0765143464399575,
        "width": 0.025717703349282296,
        "height": 0.08076514346439957
      }
    },
    {
      "id": "shell-coil",
      "label": "The front shell wheel has a tighter central coil.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.4605263157894737,
        "top": 0.7555791710945803,
        "width": 0.060406698564593304,
        "height": 0.1275239107332625
      }
    }
  ]
},
{
  "id": "v4-dream-278",
  "title": "The Diver Who Watered the Attic",
  "original": "/artwork/v4/collection/dream-278-original-v4.png",
  "altered": "/artwork/v4/collection/dream-278-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "grille",
      "label": "The front helmet grille becomes an X.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.37799043062200954,
        "top": 0.10520722635494155,
        "width": 0.03827751196172249,
        "height": 0.06588735387885228
      }
    },
    {
      "id": "sail",
      "label": "The main sail lower corner folds upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.6088516746411483,
        "top": 0.22422954303931988,
        "width": 0.03648325358851675,
        "height": 0.07545164718384698
      }
    },
    {
      "id": "globe",
      "label": "The armillary center ball has a spiral.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7296650717703349,
        "top": 0.3517534537725824,
        "width": 0.03349282296650718,
        "height": 0.06482465462274177
      }
    },
    {
      "id": "starfish",
      "label": "The starfish right arm curls upward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.15370813397129188,
        "top": 0.6981934112646121,
        "width": 0.025717703349282296,
        "height": 0.05951115834218916
      }
    },
    {
      "id": "rope",
      "label": "The crate rope loop forms an overhand knot.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.9072966507177034,
        "top": 0.6822529224229543,
        "width": 0.07236842105263158,
        "height": 0.07438894792773645
      }
    }
  ]
},
{
  "id": "v4-dream-284",
  "title": "The Rabbit's Uncooperative Reflection",
  "original": "/artwork/v4/collection/dream-284-original-v4.png",
  "altered": "/artwork/v4/collection/dream-284-altered-source-v4.png",
  "aspectRatio": 1672 / 940,
  "edits": [
    {
      "id": "change-1",
      "label": "The reflected rabbit opens the book.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.6919856459330144,
        "top": 0.31382978723404253,
        "width": 0.11363636363636363,
        "height": 0.1829787234042553
      }
    },
    {
      "id": "change-2",
      "label": "The real rabbit mouth smiles.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.3068181818181818,
        "top": 0.3723404255319149,
        "width": 0.04126794258373206,
        "height": 0.05531914893617021
      }
    },
    {
      "id": "change-3",
      "label": "The brush bristle tips curl.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5610047846889952,
        "top": 0.8148936170212766,
        "width": 0.12679425837320574,
        "height": 0.08404255319148936
      }
    },
    {
      "id": "change-4",
      "label": "The jar finial forms a ring.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.41327751196172247,
        "top": 0.5468085106382978,
        "width": 0.03229665071770335,
        "height": 0.06382978723404255
      }
    },
    {
      "id": "change-5",
      "label": "The pendant bears a crescent motif.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.06220095693779904,
        "top": 0.22340425531914893,
        "width": 0.025717703349282296,
        "height": 0.07765957446808511
      }
    }
  ]
},
{
  "id": "v4-dream-274",
  "title": "The Librarian of Pebble Voices",
  "original": "/artwork/v4/collection/dream-274-original-v4.png",
  "altered": "/artwork/v4/collection/dream-274-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "eye-slit",
      "label": "The librarian narrows one eye to a slit.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.5639952153110048,
        "top": 0.2624867162592986,
        "width": 0.0645933014354067,
        "height": 0.07226354941551541
      }
    },
    {
      "id": "brush-loops",
      "label": "The hanging brush bristles form loops.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.8175837320574163,
        "top": 0.31243358129649307,
        "width": 0.05263157894736842,
        "height": 0.1030818278427205
      }
    },
    {
      "id": "curtain-knot",
      "label": "The dotted-stone box's left curtain is gathered into a knot.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6220095693779905,
        "top": 0.7077577045696068,
        "width": 0.02751196172248804,
        "height": 0.16046758767268862
      }
    },
    {
      "id": "stone-feather",
      "label": "The held green stone bears a feather.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5771531100478469,
        "top": 0.5047821466524973,
        "width": 0.07535885167464115,
        "height": 0.11583421891604676
      }
    },
    {
      "id": "canister-heart",
      "label": "The left canister knob becomes a heart ring.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.08074162679425838,
        "top": 0.3995749202975558,
        "width": 0.025717703349282296,
        "height": 0.052072263549415514
      }
    }
  ]
},
{
  "id": "v4-dream-279",
  "title": "The Beetle's Folded Bridge",
  "original": "/artwork/v4/collection/dream-279-original-v4.png",
  "altered": "/artwork/v4/collection/dream-279-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "tack",
      "label": "The distant tack head becomes hexagonal.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.8546650717703349,
        "top": 0.24229543039319873,
        "width": 0.08791866028708134,
        "height": 0.1636556854410202
      }
    },
    {
      "id": "antenna",
      "label": "The beetle upper antenna tip hooks downward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.4503588516746411,
        "top": 0.33475026567481403,
        "width": 0.03409090909090909,
        "height": 0.061636556854410204
      }
    },
    {
      "id": "strap",
      "label": "The left bridge strap has a chevron flap.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.2111244019138756,
        "top": 0.10839532412327312,
        "width": 0.038875598086124404,
        "height": 0.11902231668437832
      }
    },
    {
      "id": "road",
      "label": "The sloping road dash becomes a chevron.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6070574162679426,
        "top": 0.3379383634431456,
        "width": 0.056220095693779906,
        "height": 0.07226354941551541
      }
    },
    {
      "id": "clip",
      "label": "The paperclip lower bend curls inward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.22188995215311005,
        "top": 0.8533475026567482,
        "width": 0.031698564593301434,
        "height": 0.06269925611052073
      }
    }
  ]
},
{
  "id": "v4-dream-281",
  "title": "The Acrobat Made of Mittens",
  "original": "/artwork/v4/collection/dream-281-original-v4.png",
  "altered": "/artwork/v4/collection/dream-281-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "crescent-leg",
      "label": "The red leg mitten bears a crescent.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.43241626794258375,
        "top": 0.39744952178533477,
        "width": 0.04724880382775119,
        "height": 0.0871413390010627
      }
    },
    {
      "id": "curled-thumb",
      "label": "The head mitten\u2019s thumb curls downward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.4772727272727273,
        "top": 0.08607863974495218,
        "width": 0.038875598086124404,
        "height": 0.08607863974495218
      }
    },
    {
      "id": "diagonal-spool",
      "label": "The spool\u2019s winding runs diagonally.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.35825358851674644,
        "top": 0.6950053134962806,
        "width": 0.11064593301435406,
        "height": 0.20191285866099895
      }
    },
    {
      "id": "heart-latch",
      "label": "The chest\u2019s central latch has a heart opening.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.10705741626794259,
        "top": 0.5398512221041445,
        "width": 0.02930622009569378,
        "height": 0.08289054197662062
      }
    },
    {
      "id": "straight-band",
      "label": "The chair mitten\u2019s lowest band straightens.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.7535885167464115,
        "top": 0.5738575982996812,
        "width": 0.0735645933014354,
        "height": 0.052072263549415514
      }
    }
  ]
},
{
  "id": "v4-dream-275",
  "title": "The Cello's Broken Silence",
  "original": "/artwork/v4/collection/dream-275-original-v4.png",
  "altered": "/artwork/v4/collection/dream-275-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The rosin surface reflects a blue crescent.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.20334928229665072,
        "top": 0.8384697130712009,
        "width": 0.03588516746411483,
        "height": 0.03719447396386823
      }
    },
    {
      "id": "change-2",
      "label": "The left case clasp turns diagonally.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.770933014354067,
        "top": 0.46546227417640806,
        "width": 0.030502392344497607,
        "height": 0.0563230605738576
      }
    },
    {
      "id": "change-3",
      "label": "One chair brace arches upward.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5825358851674641,
        "top": 0.3942614240170032,
        "width": 0.06339712918660287,
        "height": 0.04250797024442083
      }
    },
    {
      "id": "change-4",
      "label": "The chair scarf has gold star embroidery.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7045454545454546,
        "top": 0.26567481402763016,
        "width": 0.03588516746411483,
        "height": 0.06376195536663125
      }
    },
    {
      "id": "change-5",
      "label": "The bow frog medallion becomes a diamond.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.14354066985645933,
        "top": 0.7035069075451648,
        "width": 0.01375598086124402,
        "height": 0.031880977683315624
      }
    }
  ]
},
{
  "id": "v4-dream-276",
  "title": "The Porcupine's Spare Keys",
  "original": "/artwork/v4/collection/dream-276-original-v4.png",
  "altered": "/artwork/v4/collection/dream-276-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The carrying handle forms a narrower arch.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.7057416267942583,
        "top": 0.23804463336875664,
        "width": 0.16686602870813397,
        "height": 0.11902231668437832
      }
    },
    {
      "id": "change-2",
      "label": "The top key reflects a blue crescent.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.2278708133971292,
        "top": 0.1381509032943677,
        "width": 0.020933014354066987,
        "height": 0.06482465462274177
      }
    },
    {
      "id": "change-3",
      "label": "The clover key has a triangular opening.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.13875598086124402,
        "top": 0.2869287991498406,
        "width": 0.023923444976076555,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "change-4",
      "label": "The leather key fob has a gold zigzag seam.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8301435406698564,
        "top": 0.9128586609989373,
        "width": 0.026913875598086126,
        "height": 0.061636556854410204
      }
    },
    {
      "id": "change-5",
      "label": "One trunk rivet has an X groove.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.902511961722488,
        "top": 0.4569606801275239,
        "width": 0.019138755980861243,
        "height": 0.04250797024442083
      }
    }
  ]
},
{
  "id": "v4-dream-277",
  "title": "The Peach Pit Observatory",
  "original": "/artwork/v4/collection/dream-277-original-v4.png",
  "altered": "/artwork/v4/collection/dream-277-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The spoon reflects a blue crescent.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.3157894736842105,
        "top": 0.8320935175345378,
        "width": 0.05442583732057416,
        "height": 0.07226354941551541
      }
    },
    {
      "id": "change-2",
      "label": "The telescope wheel has crossed bars.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.26674641148325356,
        "top": 0.38150903294367694,
        "width": 0.025119617224880382,
        "height": 0.044633368756641874
      }
    },
    {
      "id": "change-3",
      "label": "The middle ladder rung arches upward.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.4019138755980861,
        "top": 0.47927736450584485,
        "width": 0.02930622009569378,
        "height": 0.026567481402763018
      }
    },
    {
      "id": "change-4",
      "label": "The stool top has a gold star.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.3397129186602871,
        "top": 0.485653560042508,
        "width": 0.028708133971291867,
        "height": 0.026567481402763018
      }
    },
    {
      "id": "change-5",
      "label": "The blue book spine has a gold zigzag.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.37200956937799046,
        "top": 0.3889479277364506,
        "width": 0.014952153110047847,
        "height": 0.06057385759829968
      }
    }
  ]
},
{
  "id": "v4-dream-280",
  "title": "The Refrigerator's Small Volcano",
  "original": "/artwork/v4/collection/dream-280-original-v4.png",
  "altered": "/artwork/v4/collection/dream-280-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "flow",
      "label": "The front jelly flow curls into a closed loop.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.48564593301435405,
        "top": 0.565356004250797,
        "width": 0.10107655502392345,
        "height": 0.1073326248671626
      }
    },
    {
      "id": "handle",
      "label": "The green casserole lid has an upright loop.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.6339712918660287,
        "top": 0.37619553666312433,
        "width": 0.04126794258373206,
        "height": 0.04675876726886291
      }
    },
    {
      "id": "spatula",
      "label": "The teal spatula slots curve.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.020933014354066987,
        "top": 0.09458023379383634,
        "width": 0.042464114832535885,
        "height": 0.09032943676939426
      }
    },
    {
      "id": "cherry",
      "label": "The sugar pot red finial becomes a heart.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.11722488038277512,
        "top": 0.40063761955366634,
        "width": 0.026913875598086126,
        "height": 0.04144527098831031
      }
    },
    {
      "id": "cheese",
      "label": "The cheese front hole becomes triangular.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.5998803827751196,
        "top": 0.7821466524973433,
        "width": 0.030502392344497607,
        "height": 0.04994686503719448
      }
    }
  ]
},
{
  "id": "v4-dream-285",
  "title": "The Mechanical Swan's Laundry",
  "original": "/artwork/v4/collection/dream-285-original-v4.png",
  "altered": "/artwork/v4/collection/dream-285-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The swan gear has curved spokes.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.27811004784689,
        "top": 0.2869287991498406,
        "width": 0.04904306220095694,
        "height": 0.1179596174282678
      }
    },
    {
      "id": "change-2",
      "label": "The nearest clothespin jaws open wider.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.8433014354066986,
        "top": 0.6705632306057385,
        "width": 0.05502392344497608,
        "height": 0.13602550478214664
      }
    },
    {
      "id": "change-3",
      "label": "The coral towel hem folds upward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.0819377990430622,
        "top": 0.6312433581296493,
        "width": 0.10227272727272728,
        "height": 0.1806588735387885
      }
    },
    {
      "id": "change-4",
      "label": "The detergent label forms a crescent.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.05801435406698564,
        "top": 0.2263549415515409,
        "width": 0.02631578947368421,
        "height": 0.06482465462274177
      }
    },
    {
      "id": "change-5",
      "label": "The cart wheel has a spiral brass hub.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8941387559808612,
        "top": 0.6153028692879915,
        "width": 0.035287081339712915,
        "height": 0.05419766206163656
      }
    }
  ]
},
{
  "id": "v4-dream-287",
  "title": "The Boy Who Collected Doorways",
  "original": "/artwork/v4/collection/dream-287-original-v4.png",
  "altered": "/artwork/v4/collection/dream-287-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The lantern's glass door opens to the left.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.049641148325358854,
        "top": 0.7236981934112646,
        "width": 0.12440191387559808,
        "height": 0.2263549415515409
      }
    },
    {
      "id": "change-2",
      "label": "The knee patch bears an embroidered spiral.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.2332535885167464,
        "top": 0.5908607863974495,
        "width": 0.05442583732057416,
        "height": 0.09670563230605739
      }
    },
    {
      "id": "change-3",
      "label": "The wall knocker's ring twists into a figure eight.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.016148325358851676,
        "top": 0.11158342189160468,
        "width": 0.04784688995215311,
        "height": 0.1434643995749203
      }
    },
    {
      "id": "change-4",
      "label": "The little mustard door has a crescent cutout.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.75,
        "top": 0.5217853347502657,
        "width": 0.03110047846889952,
        "height": 0.0669500531349628
      }
    },
    {
      "id": "change-5",
      "label": "The held blue door's window bars form a diagonal cross.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.3869617224880383,
        "top": 0.27948990435706694,
        "width": 0.04784688995215311,
        "height": 0.10626992561105207
      }
    }
  ]
},
{
  "id": "v4-dream-290",
  "title": "The Curtain's One Good Eye",
  "original": "/artwork/v4/collection/dream-290-original-v4.png",
  "altered": "/artwork/v4/collection/dream-290-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "left-loops",
      "label": "The left tassel fringe forms braided loops.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.0,
        "top": 0.3931987247608927,
        "width": 0.1166267942583732,
        "height": 0.3007438894792774
      }
    },
    {
      "id": "weight-open",
      "label": "The curtain weight lid stands ajar.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.7816985645933014,
        "top": 0.6748140276301806,
        "width": 0.11722488038277512,
        "height": 0.1275239107332625
      }
    },
    {
      "id": "rod-ring",
      "label": "The brass rod tip becomes a closed ring.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7816985645933014,
        "top": 0.13177470775770456,
        "width": 0.07775119617224881,
        "height": 0.155154091392136
      }
    },
    {
      "id": "right-braid",
      "label": "The right tassel fringe becomes one thick braid.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.9150717703349283,
        "top": 0.6057385759829969,
        "width": 0.08492822966507177,
        "height": 0.23804463336875664
      }
    },
    {
      "id": "reflection-knot",
      "label": "The reflected right stage curtain is tied back.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.5532296650717703,
        "top": 0.38150903294367694,
        "width": 0.060406698564593304,
        "height": 0.1742826780021254
      }
    }
  ]
},
{
  "id": "v4-dream-288",
  "title": "The Whale in the Measuring Jug",
  "original": "/artwork/v4/collection/dream-288-original-v4.png",
  "altered": "/artwork/v4/collection/dream-288-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The origami whale's tail folds into a paper fan.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.3409090909090909,
        "top": 0.007438894792773645,
        "width": 0.12739234449760767,
        "height": 0.1902231668437832
      }
    },
    {
      "id": "change-2",
      "label": "A crescent reflects in the bowl's water beside the boat.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.9150717703349283,
        "top": 0.5037194473963869,
        "width": 0.08492822966507177,
        "height": 0.09032943676939426
      }
    },
    {
      "id": "change-3",
      "label": "The shell's ribs wind into a spiral.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8492822966507177,
        "top": 0.7045696068012752,
        "width": 0.1375598086124402,
        "height": 0.1742826780021254
      }
    },
    {
      "id": "change-4",
      "label": "The map's left corner rolls into a hollow curl.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.486244019138756,
        "top": 0.8065887353878852,
        "width": 0.13576555023923445,
        "height": 0.15834218916046758
      }
    },
    {
      "id": "change-5",
      "label": "The jug's spout curls into a hollow lip.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.11483253588516747,
        "top": 0.1636556854410202,
        "width": 0.05801435406698564,
        "height": 0.13602550478214664
      }
    }
  ]
},
{
  "id": "v4-dream-291",
  "title": "The Baker's Floating Apron",
  "original": "/artwork/v4/collection/dream-291-original-v4.png",
  "altered": "/artwork/v4/collection/dream-291-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "jug-ferns",
      "label": "The small jug has three fern fronds.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.09389952153110048,
        "top": 0.7513283740701382,
        "width": 0.08911483253588516,
        "height": 0.12433581296493093
      }
    },
    {
      "id": "kettle-lid",
      "label": "The kettle lid stands ajar.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.09449760765550239,
        "top": 0.0,
        "width": 0.07894736842105263,
        "height": 0.07438894792773645
      }
    },
    {
      "id": "bow-loop",
      "label": "The apron bow has a broader slanting loop.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.21710526315789475,
        "top": 0.2731137088204038,
        "width": 0.13995215311004786,
        "height": 0.22422954303931988
      }
    },
    {
      "id": "whisk-coil",
      "label": "The whisk wires form a spiral.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8373205741626795,
        "top": 0.20722635494155153,
        "width": 0.0430622009569378,
        "height": 0.11158342189160468
      }
    },
    {
      "id": "board-heart",
      "label": "The tall board handle has a heart-shaped hole.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.9545454545454546,
        "top": 0.06907545164718384,
        "width": 0.02452153110047847,
        "height": 0.04994686503719448
      }
    }
  ]
},
{
  "id": "v4-dream-296",
  "title": "The Lost Property of the Centipede",
  "original": "/artwork/v4/collection/dream-296-original-v4.png",
  "altered": "/artwork/v4/collection/dream-296-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "handle",
      "label": "The suitcase handle arches upward.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.008971291866028708,
        "top": 0.24442082890541977,
        "width": 0.0687799043062201,
        "height": 0.07226354941551541
      }
    },
    {
      "id": "antenna",
      "label": "The left antenna stalk forms a loop.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.458133971291866,
        "top": 0.2104144527098831,
        "width": 0.03827751196172249,
        "height": 0.0563230605738576
      }
    },
    {
      "id": "cuff",
      "label": "The yellow boot rim folds outward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6608851674641149,
        "top": 0.31668437832093516,
        "width": 0.06279904306220095,
        "height": 0.057385759829968117
      }
    },
    {
      "id": "lace",
      "label": "The sneaker top lace forms a broad left loop.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.9013157894736842,
        "top": 0.4208289054197662,
        "width": 0.04485645933014354,
        "height": 0.040382571732199786
      }
    },
    {
      "id": "buckle",
      "label": "The brown boot buckle tilts into a diamond.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8217703349282297,
        "top": 0.4293304994686504,
        "width": 0.025717703349282296,
        "height": 0.048884165781083955
      }
    }
  ]
},
{
  "id": "v4-dream-286",
  "title": "The Stool That Needed a Rest",
  "original": "/artwork/v4/collection/dream-286-original-v4.png",
  "altered": "/artwork/v4/collection/dream-286-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The stool mouth opens in a yawn.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.5705741626794258,
        "top": 0.2635494155154091,
        "width": 0.03409090909090909,
        "height": 0.048884165781083955
      }
    },
    {
      "id": "change-2",
      "label": "The right sock cuff folds downward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.645933014354067,
        "top": 0.47396386822529224,
        "width": 0.05263157894736842,
        "height": 0.08607863974495218
      }
    },
    {
      "id": "change-3",
      "label": "The mug handle opens into a hook.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.1638755980861244,
        "top": 0.26461211477151964,
        "width": 0.026913875598086126,
        "height": 0.044633368756641874
      }
    },
    {
      "id": "change-4",
      "label": "The lamp rim has a V notch.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8020334928229665,
        "top": 0.1073326248671626,
        "width": 0.045454545454545456,
        "height": 0.0669500531349628
      }
    },
    {
      "id": "change-5",
      "label": "The cushion button has a diamond aperture.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.19078947368421054,
        "top": 0.8405951115834219,
        "width": 0.030502392344497607,
        "height": 0.0563230605738576
      }
    }
  ]
},
{
  "id": "v4-dream-282",
  "title": "The Sailor Inside the Shell Button",
  "original": "/artwork/v4/collection/dream-282-original-v4.png",
  "altered": "/artwork/v4/collection/dream-282-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "crescent-sail",
      "label": "The sail bears a navy crescent.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.6423444976076556,
        "top": 0.23379383634431455,
        "width": 0.04904306220095694,
        "height": 0.1179596174282678
      }
    },
    {
      "id": "raised-scarf",
      "label": "The sailor\u2019s scarf tail lifts upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.5251196172248804,
        "top": 0.2858660998937301,
        "width": 0.0430622009569378,
        "height": 0.08289054197662062
      }
    },
    {
      "id": "turned-fluke",
      "label": "The anchor\u2019s right fluke curls outward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.23145933014354067,
        "top": 0.5345377258235919,
        "width": 0.05442583732057416,
        "height": 0.20403825717321997
      }
    },
    {
      "id": "square-wheel",
      "label": "The wheel\u2019s central cap becomes square.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5927033492822966,
        "top": 0.40063761955366634,
        "width": 0.020933014354066987,
        "height": 0.039319872476089264
      }
    },
    {
      "id": "star-button",
      "label": "The brass button bears a raised star.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.09150717703349283,
        "top": 0.09351753453772582,
        "width": 0.06220095693779904,
        "height": 0.09989373007438895
      }
    }
  ]
},
{
  "id": "v4-dream-292",
  "title": "The Fork That Learned to Branch",
  "original": "/artwork/v4/collection/dream-292-original-v4.png",
  "altered": "/artwork/v4/collection/dream-292-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "walnut-crack",
      "label": "The walnut opens along a dark seam.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.025717703349282296,
        "top": 0.34006376195536664,
        "width": 0.11064593301435406,
        "height": 0.15090329436769395
      }
    },
    {
      "id": "purple-loop",
      "label": "The purple ribbon tail forms a hanging loop.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.680622009569378,
        "top": 0.4303931987247609,
        "width": 0.04904306220095694,
        "height": 0.12858660998937302
      }
    },
    {
      "id": "white-twist",
      "label": "The white ribbon twists into a corkscrew.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6578947368421053,
        "top": 0.22741764080765142,
        "width": 0.0867224880382775,
        "height": 0.08289054197662062
      }
    },
    {
      "id": "pink-loop",
      "label": "The pink ribbon tail curls upward into a loop.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7936602870813397,
        "top": 0.09670563230605739,
        "width": 0.06279904306220095,
        "height": 0.16578108395324123
      }
    },
    {
      "id": "fork-moon",
      "label": "The fork handle has a crescent engraving.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.08313397129186603,
        "top": 0.7619553666312433,
        "width": 0.11124401913875598,
        "height": 0.14027630180658873
      }
    }
  ]
},
{
  "id": "v4-dream-298",
  "title": "The Chessboard's Day Off",
  "original": "/artwork/v4/collection/dream-298-original-v4.png",
  "altered": "/artwork/v4/collection/dream-298-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "ear",
      "label": "The knight visible ear folds forward.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.32954545454545453,
        "top": 0.16046758767268862,
        "width": 0.05442583732057416,
        "height": 0.09458023379383634
      }
    },
    {
      "id": "lever",
      "label": "The rook door knob becomes a left lever.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7494019138755981,
        "top": 0.2603613177470776,
        "width": 0.031698564593301434,
        "height": 0.031880977683315624
      }
    },
    {
      "id": "tile",
      "label": "The loose front tile corner curls up.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.444377990430622,
        "top": 0.7970244420828906,
        "width": 0.06937799043062201,
        "height": 0.09458023379383634
      }
    },
    {
      "id": "hinge",
      "label": "The ramp hinge pin bows upward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5855263157894737,
        "top": 0.7492029755579172,
        "width": 0.05143540669856459,
        "height": 0.06057385759829968
      }
    },
    {
      "id": "cross",
      "label": "The king crown cross has a round opening.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.05442583732057416,
        "top": 0.03294367693942614,
        "width": 0.020933014354066987,
        "height": 0.03825717321997875
      }
    }
  ]
},
{
  "id": "v4-dream-289",
  "title": "The Unwinding Gorilla",
  "original": "/artwork/v4/collection/dream-289-original-v4.png",
  "altered": "/artwork/v4/collection/dream-289-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The bench blanket's hanging end passes through its own knot.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.05801435406698564,
        "top": 0.6068012752391073,
        "width": 0.10287081339712918,
        "height": 0.3368756641870351
      }
    },
    {
      "id": "change-2",
      "label": "The hanging wall rope threads through its own coil in a knot.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.10047846889952153,
        "top": 0.206163655685441,
        "width": 0.04665071770334928,
        "height": 0.13708820403825717
      }
    },
    {
      "id": "change-3",
      "label": "The crate's wooden front bears a carved spiral.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8654306220095693,
        "top": 0.7151965993623804,
        "width": 0.06638755980861244,
        "height": 0.11370882040382571
      }
    },
    {
      "id": "change-4",
      "label": "The rug's left corner rolls up to reveal its underside.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4276315789473684,
        "top": 0.8660998937300743,
        "width": 0.2607655502392344,
        "height": 0.1339001062699256
      }
    },
    {
      "id": "change-5",
      "label": "The tool tin's right rim curls into a hollow spout.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.05502392344497608,
        "top": 0.33156216790648246,
        "width": 0.03827751196172249,
        "height": 0.05526036131774708
      }
    }
  ]
},
{
  "id": "v4-dream-293",
  "title": "The Octopus's Invisible Suit",
  "original": "/artwork/v4/collection/dream-293-original-v4.png",
  "altered": "/artwork/v4/collection/dream-293-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The iron reflects a blue crescent.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.4599282296650718,
        "top": 0.59192348565356,
        "width": 0.02631578947368421,
        "height": 0.05100956429330499
      }
    },
    {
      "id": "change-2",
      "label": "The upper scissor handle becomes triangular.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.11961722488038277,
        "top": 0.7598299681190224,
        "width": 0.06937799043062201,
        "height": 0.06057385759829968
      }
    },
    {
      "id": "change-3",
      "label": "The dresser pull arches upward.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.9389952153110048,
        "top": 0.4218916046758767,
        "width": 0.041866028708133975,
        "height": 0.04782146652497343
      }
    },
    {
      "id": "change-4",
      "label": "The spool hole has a wooden crossbar.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.056220095693779906,
        "top": 0.7173219978746015,
        "width": 0.026913875598086126,
        "height": 0.02975557917109458
      }
    },
    {
      "id": "change-5",
      "label": "One jacket body button has an X groove.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.6255980861244019,
        "top": 0.6280552603613178,
        "width": 0.017942583732057416,
        "height": 0.031880977683315624
      }
    }
  ]
},
{
  "id": "v4-dream-297",
  "title": "The Compass That Pointed Inward",
  "original": "/artwork/v4/collection/dream-297-original-v4.png",
  "altered": "/artwork/v4/collection/dream-297-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "ring",
      "label": "The compass carrying ring becomes hexagonal.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.24342105263157895,
        "top": 0.0,
        "width": 0.12260765550239235,
        "height": 0.14558979808714134
      }
    },
    {
      "id": "tail",
      "label": "The paper lizard tail curls downward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.47787081339712917,
        "top": 0.5058448459086079,
        "width": 0.0861244019138756,
        "height": 0.1126461211477152
      }
    },
    {
      "id": "key",
      "label": "The loose key bow becomes diamond-shaped.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6830143540669856,
        "top": 0.7045696068012752,
        "width": 0.07655502392344497,
        "height": 0.10839532412327312
      }
    },
    {
      "id": "crescent",
      "label": "The loose crescent has diagonal engraved stripes.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.04485645933014354,
        "top": 0.7608926673751328,
        "width": 0.07535885167464115,
        "height": 0.12008501594048884
      }
    },
    {
      "id": "spout",
      "label": "The bottle mouth has a right pouring lip.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8935406698564593,
        "top": 0.5547290116896918,
        "width": 0.04007177033492823,
        "height": 0.06482465462274177
      }
    }
  ]
},
{
  "id": "v4-dream-299",
  "title": "The Alligator's Knitted River",
  "original": "/artwork/v4/collection/dream-299-original-v4.png",
  "altered": "/artwork/v4/collection/dream-299-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The alligator closes its nearer eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.31100478468899523,
        "top": 0.11689691817215728,
        "width": 0.04366028708133971,
        "height": 0.061636556854410204
      }
    },
    {
      "id": "change-2",
      "label": "The bridge handrail end curls into a loop.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.5669856459330144,
        "top": 0.536663124335813,
        "width": 0.050239234449760764,
        "height": 0.06907545164718384
      }
    },
    {
      "id": "change-3",
      "label": "The chest latch swings sideways.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8755980861244019,
        "top": 0.34537725823591925,
        "width": 0.05980861244019139,
        "height": 0.10414452709883103
      }
    },
    {
      "id": "change-4",
      "label": "The upper needle has a star end cap.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.3534688995215311,
        "top": 0.8119022316684378,
        "width": 0.04904306220095694,
        "height": 0.09032943676939426
      }
    },
    {
      "id": "change-5",
      "label": "The toy boat's right sail curves.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.9533492822966507,
        "top": 0.5504782146652497,
        "width": 0.04665071770334928,
        "height": 0.1647183846971307
      }
    }
  ]
},
{
  "id": "v4-dream-283",
  "title": "The Melon of Folded Maps",
  "original": "/artwork/v4/collection/dream-283-original-v4.png",
  "altered": "/artwork/v4/collection/dream-283-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "standing-seed",
      "label": "The loose seed stands upright.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.31638755980861244,
        "top": 0.5876726886291179,
        "width": 0.049641148325358854,
        "height": 0.0924548352816153
      }
    },
    {
      "id": "folded-map",
      "label": "The foreground map\u2019s inner fold becomes triangular.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7314593301435407,
        "top": 0.8320935175345378,
        "width": 0.04784688995215311,
        "height": 0.10201912858660998
      }
    },
    {
      "id": "crescent-bowl",
      "label": "The bowl bears a carved crescent.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.895933014354067,
        "top": 0.43251859723698194,
        "width": 0.06279904306220095,
        "height": 0.09989373007438895
      }
    },
    {
      "id": "square-loop",
      "label": "The lower scroll\u2019s cord curls into a square loop.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.3026315789473684,
        "top": 0.2784272051009564,
        "width": 0.05083732057416268,
        "height": 0.04994686503719448
      }
    },
    {
      "id": "star-rivet",
      "label": "The knife\u2019s existing rivet becomes a silver star.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.23145933014354067,
        "top": 0.822529224229543,
        "width": 0.03588516746411483,
        "height": 0.039319872476089264
      }
    }
  ]
},
{
  "id": "v4-dream-294",
  "title": "The Girl Who Pulled the Horizon Closer",
  "original": "/artwork/v4/collection/dream-294-original-v4.png",
  "altered": "/artwork/v4/collection/dream-294-altered-source-v4.png",
  "aspectRatio": 1672 / 940,
  "edits": [
    {
      "id": "change-1",
      "label": "The reel crossbrace arches upward.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.36004784688995217,
        "top": 0.6148936170212767,
        "width": 0.11363636363636363,
        "height": 0.05851063829787234
      }
    },
    {
      "id": "change-2",
      "label": "The shell opening reflects a blue arc.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.8032296650717703,
        "top": 0.8914893617021277,
        "width": 0.0215311004784689,
        "height": 0.03723404255319149
      }
    },
    {
      "id": "change-3",
      "label": "The starfish has a central spiral pattern.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8809808612440191,
        "top": 0.7351063829787234,
        "width": 0.014952153110047847,
        "height": 0.02872340425531915
      }
    },
    {
      "id": "change-4",
      "label": "The waist sash has gold embroidery.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.2159090909090909,
        "top": 0.3574468085106383,
        "width": 0.023923444976076555,
        "height": 0.036170212765957444
      }
    },
    {
      "id": "change-5",
      "label": "The axle cap has a triangular slot.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.4491626794258373,
        "top": 0.36914893617021277,
        "width": 0.017344497607655503,
        "height": 0.030851063829787233
      }
    }
  ]
},
{
  "id": "v4-dream-295",
  "title": "The Pear's Secret Stair",
  "original": "/artwork/v4/collection/dream-295-original-v4.png",
  "altered": "/artwork/v4/collection/dream-295-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The coffee reflects a blue crescent.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.8157894736842105,
        "top": 0.589798087141339,
        "width": 0.034688995215311005,
        "height": 0.030818278427205102
      }
    },
    {
      "id": "change-2",
      "label": "The trunk handle has a wider curved grip.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.26854066985645936,
        "top": 0.6865037194473964,
        "width": 0.0687799043062201,
        "height": 0.061636556854410204
      }
    },
    {
      "id": "change-3",
      "label": "The candlestick foot has a gold star.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.06937799043062201,
        "top": 0.6599362380446334,
        "width": 0.02930622009569378,
        "height": 0.05100956429330499
      }
    },
    {
      "id": "change-4",
      "label": "One key opening becomes triangular.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.09688995215311005,
        "top": 0.8480340063761955,
        "width": 0.029904306220095694,
        "height": 0.03294367693942614
      }
    },
    {
      "id": "change-5",
      "label": "One pear window crossbar arches upward.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.4910287081339713,
        "top": 0.19872476089266738,
        "width": 0.02751196172248804,
        "height": 0.024442082890541977
      }
    }
  ]
},
{
  "id": "v4-dream-300",
  "title": "The Hallway That Hid in a Book",
  "original": "/artwork/v4/collection/dream-300-original-v4.png",
  "altered": "/artwork/v4/collection/dream-300-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The blue door has a hanging pull ring.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.36901913875598086,
        "top": 0.40913921360255046,
        "width": 0.028110047846889953,
        "height": 0.08395324123273114
      }
    },
    {
      "id": "change-2",
      "label": "The nearest left flame bends sideways.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.41566985645933013,
        "top": 0.23273113708820403,
        "width": 0.03708133971291866,
        "height": 0.06057385759829968
      }
    },
    {
      "id": "change-3",
      "label": "The left lens reflects a crescent.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.35586124401913877,
        "top": 0.7066950053134963,
        "width": 0.03289473684210526,
        "height": 0.05951115834218916
      }
    },
    {
      "id": "change-4",
      "label": "The stamp face bears a spiral.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8157894736842105,
        "top": 0.8267800212539851,
        "width": 0.04724880382775119,
        "height": 0.1126461211477152
      }
    },
    {
      "id": "change-5",
      "label": "The key bow forms a heart.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.060406698564593304,
        "top": 0.7215727948990436,
        "width": 0.06399521531100479,
        "height": 0.077577045696068
      }
    }
  ]
},
{
  "id": "v4-dream-302",
  "title": "The Girl and the Sleeping Weather",
  "original": "/artwork/v4/collection/dream-302-original-v4.png",
  "altered": "/artwork/v4/collection/dream-302-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "boat-sail",
      "label": "The blanket boat has a single sail right of its mast.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.687799043062201,
        "top": 0.5823591923485654,
        "width": 0.07834928229665072,
        "height": 0.11689691817215728
      }
    },
    {
      "id": "butterfly-fold",
      "label": "The hanging butterfly folds its left wings inward.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.2027511961722488,
        "top": 0.09139213602550478,
        "width": 0.056220095693779906,
        "height": 0.16259298618490967
      }
    },
    {
      "id": "mug-fern",
      "label": "The windowsill mug bears a fern frond.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8708133971291866,
        "top": 0.2157279489904357,
        "width": 0.04066985645933014,
        "height": 0.07332624867162593
      }
    },
    {
      "id": "cloud-wink",
      "label": "The little rain cloud closes one eye.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.2159090909090909,
        "top": 0.6014877789585548,
        "width": 0.016148325358851676,
        "height": 0.026567481402763018
      }
    },
    {
      "id": "lace-heart",
      "label": "The boot lace loop becomes heart-shaped.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.2069377990430622,
        "top": 0.7417640807651434,
        "width": 0.03229665071770335,
        "height": 0.05419766206163656
      }
    }
  ]
},
{
  "id": "v4-dream-301",
  "title": "The Goblin's Porcelain Balloon",
  "original": "/artwork/v4/collection/dream-301-original-v4.png",
  "altered": "/artwork/v4/collection/dream-301-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The hat tip curls upward.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.16267942583732056,
        "top": 0.17109458023379384,
        "width": 0.23863636363636365,
        "height": 0.21679064824654623
      }
    },
    {
      "id": "change-2",
      "label": "The porcelain handle opens into a hook.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7805023923444976,
        "top": 0.10095642933049948,
        "width": 0.06160287081339713,
        "height": 0.11583421891604676
      }
    },
    {
      "id": "change-3",
      "label": "The right boot toe straightens.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.527511961722488,
        "top": 0.8437832093517534,
        "width": 0.07535885167464115,
        "height": 0.0669500531349628
      }
    },
    {
      "id": "change-4",
      "label": "The vest button has a clover aperture.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.37021531100478466,
        "top": 0.6057385759829969,
        "width": 0.02930622009569378,
        "height": 0.057385759829968117
      }
    },
    {
      "id": "change-5",
      "label": "The white cushion corner folds outward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8355263157894737,
        "top": 0.798087141339001,
        "width": 0.08373205741626795,
        "height": 0.08289054197662062
      }
    }
  ]
},
{
  "id": "v4-dream-305",
  "title": "The Onion's Empty Ballroom",
  "original": "/artwork/v4/collection/dream-305-original-v4.png",
  "altered": "/artwork/v4/collection/dream-305-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "peel",
      "label": "The left loose peel tip curls into a spiral.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.2589712918660287,
        "top": 0.7810839532412327,
        "width": 0.05921052631578947,
        "height": 0.09564293304994687
      }
    },
    {
      "id": "chair",
      "label": "The chair back upholstery becomes a heart.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.36363636363636365,
        "top": 0.5356004250797024,
        "width": 0.03349282296650718,
        "height": 0.0669500531349628
      }
    },
    {
      "id": "pearl",
      "label": "The left pearl front has a spiral groove.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6997607655502392,
        "top": 0.79596174282678,
        "width": 0.034688995215311005,
        "height": 0.06588735387885228
      }
    },
    {
      "id": "root",
      "label": "The longest right root tip curls into a loop.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.9479665071770335,
        "top": 0.59192348565356,
        "width": 0.04366028708133971,
        "height": 0.05419766206163656
      }
    },
    {
      "id": "reflection",
      "label": "The chair reflected leg curls into a hook.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.39055023923444976,
        "top": 0.6695005313496281,
        "width": 0.02452153110047847,
        "height": 0.05526036131774708
      }
    }
  ]
},
{
  "id": "v4-dream-306",
  "title": "The Fisher of Loose Tiles",
  "original": "/artwork/v4/collection/dream-306-original-v4.png",
  "altered": "/artwork/v4/collection/dream-306-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "magnet",
      "label": "The magnet bridge becomes flat-topped.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.6034688995215312,
        "top": 0.461211477151966,
        "width": 0.05861244019138756,
        "height": 0.08820403825717323
      }
    },
    {
      "id": "claw",
      "label": "The hammer claw hooks upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.3277511961722488,
        "top": 0.769394261424017,
        "width": 0.04844497607655503,
        "height": 0.10201912858660998
      }
    },
    {
      "id": "cup",
      "label": "The cup handle curls into a spiral.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.18301435406698566,
        "top": 0.7035069075451648,
        "width": 0.042464114832535885,
        "height": 0.09351753453772582
      }
    },
    {
      "id": "knocker",
      "label": "The door knocker ring becomes hexagonal.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.0861244019138756,
        "top": 0.044633368756641874,
        "width": 0.04904306220095694,
        "height": 0.08501594048884166
      }
    },
    {
      "id": "tile",
      "label": "The bucket tile flower becomes a star.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.4437799043062201,
        "top": 0.3655685441020191,
        "width": 0.05263157894736842,
        "height": 0.09139213602550478
      }
    }
  ]
},
{
  "id": "v4-dream-314",
  "title": "The Seahorse's Pocket Watch",
  "original": "/artwork/v4/collection/dream-314-original-v4.png",
  "altered": "/artwork/v4/collection/dream-314-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "closed-eye",
      "label": "The seahorse closes its eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.3857655502392344,
        "top": 0.14558979808714134,
        "width": 0.039473684210526314,
        "height": 0.07226354941551541
      }
    },
    {
      "id": "square-ring",
      "label": "The watch\u2019s hanging ring becomes square.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.5574162679425837,
        "top": 0.31137088204038255,
        "width": 0.06220095693779904,
        "height": 0.08501594048884166
      }
    },
    {
      "id": "triangle-shell",
      "label": "The shell\u2019s opening folds into a triangle.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8594497607655502,
        "top": 0.7258235919234857,
        "width": 0.04904306220095694,
        "height": 0.08607863974495218
      }
    },
    {
      "id": "crescent-lamp",
      "label": "The lampshade bears a teal crescent.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5843301435406698,
        "top": 0.4920297555791711,
        "width": 0.030502392344497607,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "star-plate",
      "label": "The cupboard\u2019s top plate bears a star.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.5245215311004785,
        "top": 0.4952178533475027,
        "width": 0.02930622009569378,
        "height": 0.04994686503719448
      }
    }
  ]
},
{
  "id": "v4-dream-315",
  "title": "The Spool at the End of the Tunnel",
  "original": "/artwork/v4/collection/dream-315-original-v4.png",
  "altered": "/artwork/v4/collection/dream-315-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "diamond-opening",
      "label": "The spool\u2019s inner opening becomes a diamond.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.11543062200956938,
        "top": 0.24442082890541977,
        "width": 0.05502392344497608,
        "height": 0.17534537725823593
      }
    },
    {
      "id": "handle-bar",
      "label": "The upper scissors handle gains a crossbar.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.10047846889952153,
        "top": 0.6046758767268863,
        "width": 0.04724880382775119,
        "height": 0.07970244420828905
      }
    },
    {
      "id": "raised-hem",
      "label": "The ribbon\u2019s far-right hem folds upward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.90311004784689,
        "top": 0.6875664187035069,
        "width": 0.09150717703349283,
        "height": 0.1339001062699256
      }
    },
    {
      "id": "star-button",
      "label": "The loose button bears an engraved star.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.562799043062201,
        "top": 0.8831030818278427,
        "width": 0.035287081339712915,
        "height": 0.04144527098831031
      }
    },
    {
      "id": "hex-pivot",
      "label": "The scissors pivot becomes a hexagonal bolt.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.21830143540669855,
        "top": 0.7003188097768331,
        "width": 0.03708133971291866,
        "height": 0.04357066950053135
      }
    }
  ]
},
{
  "id": "v4-dream-308",
  "title": "The Clockwork Cherry",
  "original": "/artwork/v4/collection/dream-308-original-v4.png",
  "altered": "/artwork/v4/collection/dream-308-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The closed cherry's bright reflection forms a crescent.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.26136363636363635,
        "top": 0.3177470775770457,
        "width": 0.10526315789473684,
        "height": 0.19128586609989373
      }
    },
    {
      "id": "change-2",
      "label": "The leaf's broad tip curls into a hollow tube.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.04485645933014354,
        "top": 0.5504782146652497,
        "width": 0.1417464114832536,
        "height": 0.19872476089266738
      }
    },
    {
      "id": "change-3",
      "label": "The red peel threads through its own loop.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8522727272727273,
        "top": 0.718384697130712,
        "width": 0.14772727272727273,
        "height": 0.281615302869288
      }
    },
    {
      "id": "change-4",
      "label": "The loose gear's inner spokes curve into a spiral.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.05921052631578947,
        "top": 0.822529224229543,
        "width": 0.09150717703349283,
        "height": 0.09351753453772582
      }
    },
    {
      "id": "change-5",
      "label": "The winding key's right bow opens into a crescent.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.5005980861244019,
        "top": 0.05419766206163656,
        "width": 0.07535885167464115,
        "height": 0.14133900106269925
      }
    }
  ]
},
{
  "id": "v4-dream-316",
  "title": "The Hippo's Small Orchestra",
  "original": "/artwork/v4/collection/dream-316-original-v4.png",
  "altered": "/artwork/v4/collection/dream-316-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "closed-eye",
      "label": "The hippo closes one eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.4473684210526316,
        "top": 0.16578108395324123,
        "width": 0.028110047846889953,
        "height": 0.040382571732199786
      }
    },
    {
      "id": "round-spoon",
      "label": "The conductor\u2019s spoon becomes a round ladle.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.37200956937799046,
        "top": 0.015940488841657812,
        "width": 0.05442583732057416,
        "height": 0.09139213602550478
      }
    },
    {
      "id": "crescent-bow",
      "label": "The bow tie\u2019s left wing bears a crescent.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4569377990430622,
        "top": 0.361317747077577,
        "width": 0.030502392344497607,
        "height": 0.06801275239107332
      }
    },
    {
      "id": "square-knob",
      "label": "The drawer knob becomes square.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.46411483253588515,
        "top": 0.9319872476089267,
        "width": 0.04485645933014354,
        "height": 0.06801275239107332
      }
    },
    {
      "id": "triangle-hole",
      "label": "The chopping board\u2019s hanging hole becomes triangular.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.27452153110047844,
        "top": 0.17747077577045697,
        "width": 0.017344497607655503,
        "height": 0.03719447396386823
      }
    }
  ]
},
{
  "id": "v4-dream-311",
  "title": "The Caterpillar's Glass House",
  "original": "/artwork/v4/collection/dream-311-original-v4.png",
  "altered": "/artwork/v4/collection/dream-311-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The brass button reflects a blue crescent.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.7739234449760766,
        "top": 0.7715196599362381,
        "width": 0.04485645933014354,
        "height": 0.1030818278427205
      }
    },
    {
      "id": "change-2",
      "label": "The left leaf has a gold S vein.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.04366028708133971,
        "top": 0.281615302869288,
        "width": 0.049641148325358854,
        "height": 0.26992561105207225
      }
    },
    {
      "id": "change-3",
      "label": "The purple cushion has gold star embroidery.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6172248803827751,
        "top": 0.4814027630180659,
        "width": 0.03588516746411483,
        "height": 0.05951115834218916
      }
    },
    {
      "id": "change-4",
      "label": "The curtain knob has a triangular opening.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.21710526315789475,
        "top": 0.4112646121147715,
        "width": 0.025119617224880382,
        "height": 0.04250797024442083
      }
    },
    {
      "id": "change-5",
      "label": "The large latch pin has an X slot.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.5221291866028708,
        "top": 0.4208289054197662,
        "width": 0.023923444976076555,
        "height": 0.04250797024442083
      }
    }
  ]
},
{
  "id": "v4-dream-312",
  "title": "The Door That Grew Tired of Knocking",
  "original": "/artwork/v4/collection/dream-312-original-v4.png",
  "altered": "/artwork/v4/collection/dream-312-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The wooden mitten motif becomes a crescent.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.49820574162679426,
        "top": 0.5239107332624867,
        "width": 0.03409090909090909,
        "height": 0.061636556854410204
      }
    },
    {
      "id": "change-2",
      "label": "The mug handle curls inward.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.9467703349282297,
        "top": 0.32624867162592985,
        "width": 0.03588516746411483,
        "height": 0.08820403825717323
      }
    },
    {
      "id": "change-3",
      "label": "The knocker pivot reflects a blue crescent.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.527511961722488,
        "top": 0.361317747077577,
        "width": 0.023923444976076555,
        "height": 0.048884165781083955
      }
    },
    {
      "id": "change-4",
      "label": "The front slipper has a gold zigzag seam.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.12081339712918661,
        "top": 0.718384697130712,
        "width": 0.049641148325358854,
        "height": 0.07120085015940489
      }
    },
    {
      "id": "change-5",
      "label": "The upper hinge pin has an X groove.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.6435406698564593,
        "top": 0.21679064824654623,
        "width": 0.017942583732057416,
        "height": 0.04250797024442083
      }
    }
  ]
},
{
  "id": "v4-dream-303",
  "title": "The Mountain in the Typewriter",
  "original": "/artwork/v4/collection/dream-303-original-v4.png",
  "altered": "/artwork/v4/collection/dream-303-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "lever-left",
      "label": "The typewriter return lever points left.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.16088516746411483,
        "top": 0.1381509032943677,
        "width": 0.12380382775119617,
        "height": 0.1997874601487779
      }
    },
    {
      "id": "mug-heart",
      "label": "The coffee mug handle has a heart-shaped opening.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.025119617224880382,
        "top": 0.02975557917109458,
        "width": 0.0687799043062201,
        "height": 0.14133900106269925
      }
    },
    {
      "id": "lens-spiral",
      "label": "The magnified contour lines form a spiral.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.06160287081339713,
        "top": 0.28374070138150903,
        "width": 0.09928229665071771,
        "height": 0.14558979808714134
      }
    },
    {
      "id": "key-moon",
      "label": "A right-side key bears a crescent.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5173444976076556,
        "top": 0.6822529224229543,
        "width": 0.03349282296650718,
        "height": 0.05419766206163656
      }
    },
    {
      "id": "screw-star",
      "label": "The brass sharpener screw has a star-shaped recess.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.1034688995215311,
        "top": 0.8512221041445271,
        "width": 0.01854066985645933,
        "height": 0.030818278427205102
      },
      "source": "/artwork/v4/collection/dream-303-star-refine-source-v4.png"
    }
  ]
},
{
  "id": "v4-dream-307",
  "title": "The Wolf Who Packed the Wind",
  "original": "/artwork/v4/collection/dream-307-original-v4.png",
  "altered": "/artwork/v4/collection/dream-307-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "scarf",
      "label": "The bench scarf end forms an overhand knot.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.08732057416267942,
        "top": 0.5026567481402763,
        "width": 0.06339712918660287,
        "height": 0.0871413390010627
      }
    },
    {
      "id": "wind",
      "label": "The upper wind tip closes into a loop.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.8074162679425837,
        "top": 0.2678002125398512,
        "width": 0.05921052631578947,
        "height": 0.08607863974495218
      }
    },
    {
      "id": "leaf",
      "label": "The loose right leaf stem curls into a spiral.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7589712918660287,
        "top": 0.79596174282678,
        "width": 0.038875598086124404,
        "height": 0.07332624867162593
      }
    },
    {
      "id": "tag",
      "label": "The luggage tag lower corner folds upward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.9401913875598086,
        "top": 0.5047821466524973,
        "width": 0.02751196172248804,
        "height": 0.05419766206163656
      }
    },
    {
      "id": "buckle",
      "label": "The central strap buckle frame becomes octagonal.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.527511961722488,
        "top": 0.5951115834218916,
        "width": 0.04844497607655503,
        "height": 0.07863974495217853
      }
    }
  ]
},
{
  "id": "v4-dream-309",
  "title": "The Ladder's Nightgown",
  "original": "/artwork/v4/collection/dream-309-original-v4.png",
  "altered": "/artwork/v4/collection/dream-309-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The chair blanket's free end passes through its own knot.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.8032296650717703,
        "top": 0.6461211477151966,
        "width": 0.0819377990430622,
        "height": 0.21253985122210414
      }
    },
    {
      "id": "change-2",
      "label": "The chest latch swings open to the left.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.9120813397129187,
        "top": 0.6896918172157279,
        "width": 0.0645933014354067,
        "height": 0.10626992561105207
      }
    },
    {
      "id": "change-3",
      "label": "The hanging bag bears gold spiral embroidery.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.14413875598086123,
        "top": 0.2624867162592986,
        "width": 0.041866028708133975,
        "height": 0.0818278427205101
      }
    },
    {
      "id": "change-4",
      "label": "The mug's handle forms a continuous figure eight.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.12679425837320574,
        "top": 0.6036131774707758,
        "width": 0.02332535885167464,
        "height": 0.08076514346439957
      }
    },
    {
      "id": "change-5",
      "label": "The lampshade's lower right hem rolls into a hollow lip.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.08014354066985646,
        "top": 0.5143464399574921,
        "width": 0.04844497607655503,
        "height": 0.0669500531349628
      }
    }
  ]
},
{
  "id": "v4-dream-313",
  "title": "The Violinist of Cardboard Rain",
  "original": "/artwork/v4/collection/dream-313-original-v4.png",
  "altered": "/artwork/v4/collection/dream-313-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The metal tub reflects a blue crescent.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.6010765550239234,
        "top": 0.8629117959617428,
        "width": 0.1076555023923445,
        "height": 0.0871413390010627
      }
    },
    {
      "id": "change-2",
      "label": "The paper boat has a gold star.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.9192583732057417,
        "top": 0.5844845908607864,
        "width": 0.026913875598086126,
        "height": 0.05419766206163656
      }
    },
    {
      "id": "change-3",
      "label": "The trunk clasp tilts to the right.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.019138755980861243,
        "top": 0.7800212539851222,
        "width": 0.02751196172248804,
        "height": 0.06588735387885228
      }
    },
    {
      "id": "change-4",
      "label": "The tape roll opening has a crossbar.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.026913875598086126,
        "top": 0.49415515409139216,
        "width": 0.038875598086124404,
        "height": 0.026567481402763018
      }
    },
    {
      "id": "change-5",
      "label": "The left strap button has an X groove.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.24222488038277512,
        "top": 0.5005313496280552,
        "width": 0.02033492822966507,
        "height": 0.03719447396386823
      }
    }
  ]
},
{
  "id": "v4-dream-321",
  "title": "The Fox's Velvet Passport",
  "original": "/artwork/v4/collection/dream-321-original-v4.png",
  "altered": "/artwork/v4/collection/dream-321-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "closed-eye",
      "label": "The fox closes one eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.49760765550239233,
        "top": 0.24442082890541977,
        "width": 0.0430622009569378,
        "height": 0.05419766206163656
      }
    },
    {
      "id": "horizontal-twig",
      "label": "The pendant\u2019s twig lies horizontally.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.08791866028708134,
        "top": 0.3708820403825717,
        "width": 0.050239234449760764,
        "height": 0.0765143464399575
      }
    },
    {
      "id": "round-lantern",
      "label": "The passport\u2019s lantern becomes round.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5299043062200957,
        "top": 0.4814027630180659,
        "width": 0.031698564593301434,
        "height": 0.061636556854410204
      }
    },
    {
      "id": "crescent-cup",
      "label": "The travel cup bears a crescent.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.9342105263157895,
        "top": 0.5802337938363443,
        "width": 0.04485645933014354,
        "height": 0.08820403825717323
      }
    },
    {
      "id": "square-button",
      "label": "The passport strap\u2019s button becomes square.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8068181818181818,
        "top": 0.5154091392136025,
        "width": 0.025119617224880382,
        "height": 0.044633368756641874
      }
    }
  ]
},
{
  "id": "v4-dream-304",
  "title": "The Turtle's Umbrella Stand",
  "original": "/artwork/v4/collection/dream-304-original-v4.png",
  "altered": "/artwork/v4/collection/dream-304-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "knocker-raised",
      "label": "The door knocker ring is raised horizontally.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.031698564593301434,
        "top": 0.1636556854410202,
        "width": 0.0950956937799043,
        "height": 0.2911795961742827
      }
    },
    {
      "id": "mini-door",
      "label": "The tall purple miniature door is closed.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.45633971291866027,
        "top": 0.02763018065887354,
        "width": 0.06578947368421052,
        "height": 0.16046758767268862
      }
    },
    {
      "id": "umbrella-twist",
      "label": "The cream umbrella has spiral folds.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.513755980861244,
        "top": 0.20403825717321997,
        "width": 0.07057416267942583,
        "height": 0.1742826780021254
      }
    },
    {
      "id": "turtle-eye",
      "label": "The turtle closes its eye.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.3480861244019139,
        "top": 0.594048884165781,
        "width": 0.034688995215311005,
        "height": 0.05100956429330499
      }
    },
    {
      "id": "shell-tulip",
      "label": "The left-front shell panel bears a tulip.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.4826555023923445,
        "top": 0.6248671625929861,
        "width": 0.056818181818181816,
        "height": 0.11902231668437832
      }
    }
  ]
},
{
  "id": "v4-dream-310",
  "title": "The Robot Who Ironed the Sea",
  "original": "/artwork/v4/collection/dream-310-original-v4.png",
  "altered": "/artwork/v4/collection/dream-310-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The striped wall towel's free end passes through its own knot.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.04485645933014354,
        "top": 0.23485653560042508,
        "width": 0.06578947368421052,
        "height": 0.18384697130712008
      }
    },
    {
      "id": "change-2",
      "label": "The leftmost toy boat's sail folds into an accordion fan.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7374401913875598,
        "top": 0.24760892667375134,
        "width": 0.07834928229665072,
        "height": 0.14027630180658873
      }
    },
    {
      "id": "change-3",
      "label": "The apron pocket bears a blue compass rose.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.3355263157894737,
        "top": 0.2763018065887354,
        "width": 0.04665071770334928,
        "height": 0.06907545164718384
      }
    },
    {
      "id": "change-4",
      "label": "A crescent reflects on the small metal bucket.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.13875598086124402,
        "top": 0.1891604675876727,
        "width": 0.03588516746411483,
        "height": 0.06269925611052073
      }
    },
    {
      "id": "change-5",
      "label": "The front basket towel's lower left corner curls upward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.9019138755980861,
        "top": 0.5526036131774708,
        "width": 0.04007177033492823,
        "height": 0.08926673751328375
      }
    }
  ]
},
{
  "id": "v4-dream-318",
  "title": "The Umbrella Made of Windows",
  "original": "/artwork/v4/collection/dream-318-original-v4.png",
  "altered": "/artwork/v4/collection/dream-318-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The pane moon becomes a star.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.3660287081339713,
        "top": 0.14984059511158343,
        "width": 0.04724880382775119,
        "height": 0.09351753453772582
      }
    },
    {
      "id": "change-2",
      "label": "The paper boat lifts its bow.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.6226076555023924,
        "top": 0.5302869287991498,
        "width": 0.056818181818181816,
        "height": 0.07332624867162593
      }
    },
    {
      "id": "change-3",
      "label": "The umbrella handle tip spirals inward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.35167464114832536,
        "top": 0.7492029755579172,
        "width": 0.05861244019138756,
        "height": 0.10945802337938364
      }
    },
    {
      "id": "change-4",
      "label": "The curtain clasp becomes a heart.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5705741626794258,
        "top": 0.3368756641870351,
        "width": 0.03110047846889952,
        "height": 0.04569606801275239
      }
    },
    {
      "id": "change-5",
      "label": "The fallen leaf tip folds backward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.590311004784689,
        "top": 0.8437832093517534,
        "width": 0.09330143540669857,
        "height": 0.07013815090329437
      }
    }
  ]
},
{
  "id": "v4-dream-320",
  "title": "The Drawer That Held Its Breath",
  "original": "/artwork/v4/collection/dream-320-original-v4.png",
  "altered": "/artwork/v4/collection/dream-320-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "closed-eye",
      "label": "The knitted sheep closes one eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.26913875598086123,
        "top": 0.29011689691817216,
        "width": 0.01555023923444976,
        "height": 0.026567481402763018
      }
    },
    {
      "id": "curled-tail",
      "label": "The paper fish\u2019s tail curls downward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.5657894736842105,
        "top": 0.1647183846971307,
        "width": 0.08433014354066985,
        "height": 0.09351753453772582
      }
    },
    {
      "id": "square-knob",
      "label": "The open drawer\u2019s knob becomes square.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.375,
        "top": 0.6344314558979809,
        "width": 0.04485645933014354,
        "height": 0.0765143464399575
      }
    },
    {
      "id": "crescent-cup",
      "label": "The cup bears a crescent.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8923444976076556,
        "top": 0.8395324123273114,
        "width": 0.031698564593301434,
        "height": 0.05951115834218916
      }
    },
    {
      "id": "star-book",
      "label": "The book\u2019s blue cover bears a star.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.902511961722488,
        "top": 0.46546227417640806,
        "width": 0.03409090909090909,
        "height": 0.057385759829968117
      }
    }
  ]
},
{
  "id": "v4-dream-322",
  "title": "The Marble Mason's Soft Wall",
  "original": "/artwork/v4/collection/dream-322-original-v4.png",
  "altered": "/artwork/v4/collection/dream-322-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "closed-eye",
      "label": "The mason closes one eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.4569377990430622,
        "top": 0.18278427205100956,
        "width": 0.020933014354066987,
        "height": 0.044633368756641874
      }
    },
    {
      "id": "triangle-cavity",
      "label": "The slab\u2019s cavity forms a triangle.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7302631578947368,
        "top": 0.12858660998937302,
        "width": 0.06578947368421052,
        "height": 0.1647183846971307
      }
    },
    {
      "id": "crescent-bucket",
      "label": "The hanging bucket bears a crescent.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8785885167464115,
        "top": 0.12539851222104145,
        "width": 0.03229665071770335,
        "height": 0.06376195536663125
      }
    },
    {
      "id": "star-mallet",
      "label": "The mallet head bears a carved star.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7870813397129187,
        "top": 0.6631243358129649,
        "width": 0.06160287081339713,
        "height": 0.07332624867162593
      }
    },
    {
      "id": "hex-pivot",
      "label": "The bench pivot becomes hexagonal.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.10107655502392345,
        "top": 0.5207226354941552,
        "width": 0.022129186602870814,
        "height": 0.03294367693942614
      }
    }
  ]
},
{
  "id": "v4-dream-317",
  "title": "The Child Who Untied the Path",
  "original": "/artwork/v4/collection/dream-317-original-v4.png",
  "altered": "/artwork/v4/collection/dream-317-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The wagon grip becomes an oval loop.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.23026315789473684,
        "top": 0.01700318809776833,
        "width": 0.06638755980861244,
        "height": 0.08820403825717323
      }
    },
    {
      "id": "change-2",
      "label": "The shell spiral becomes a heart groove.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.04066985645933014,
        "top": 0.79596174282678,
        "width": 0.0430622009569378,
        "height": 0.061636556854410204
      }
    },
    {
      "id": "change-3",
      "label": "The fallen leaf tip curls upward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.13875598086124402,
        "top": 0.7215727948990436,
        "width": 0.0950956937799043,
        "height": 0.09564293304994687
      }
    },
    {
      "id": "change-4",
      "label": "The nearest wheel has a star hub.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.20514354066985646,
        "top": 0.4729011689691817,
        "width": 0.03349282296650718,
        "height": 0.06801275239107332
      }
    },
    {
      "id": "change-5",
      "label": "The nearest boot has a broad lace bow.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.3223684210526316,
        "top": 0.565356004250797,
        "width": 0.06339712918660287,
        "height": 0.10520722635494155
      }
    }
  ]
},
{
  "id": "v4-dream-329",
  "title": "The Shell That Listened Back",
  "original": "/artwork/v4/collection/dream-329-original-v4.png",
  "altered": "/artwork/v4/collection/dream-329-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "crank-up",
      "label": "The gramophone crank grip points upward.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.8744019138755981,
        "top": 0.5844845908607864,
        "width": 0.08552631578947369,
        "height": 0.16259298618490967
      }
    },
    {
      "id": "ear-reversed",
      "label": "The orange ear symbol faces the other way.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.35287081339712917,
        "top": 0.11583421891604676,
        "width": 0.07117224880382775,
        "height": 0.2263549415515409
      }
    },
    {
      "id": "rung-twist",
      "label": "The stool's front rung has spiral carving.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.23624401913875598,
        "top": 0.8671625929861849,
        "width": 0.11901913875598086,
        "height": 0.0818278427205101
      }
    },
    {
      "id": "record-moon",
      "label": "The record's center label becomes a crescent.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7900717703349283,
        "top": 0.5111583421891605,
        "width": 0.06220095693779904,
        "height": 0.040382571732199786
      }
    },
    {
      "id": "shell-spiral",
      "label": "The little shell bears an orange spiral.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.77811004784689,
        "top": 0.8044633368756642,
        "width": 0.06638755980861244,
        "height": 0.08501594048884166
      }
    }
  ]
},
{
  "id": "v4-dream-319",
  "title": "The Starfish's Five Empty Gloves",
  "original": "/artwork/v4/collection/dream-319-original-v4.png",
  "altered": "/artwork/v4/collection/dream-319-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The starfish mouth smiles.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.49760765550239233,
        "top": 0.3028692879914984,
        "width": 0.045454545454545456,
        "height": 0.040382571732199786
      }
    },
    {
      "id": "change-2",
      "label": "The soap corner folds inward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7422248803827751,
        "top": 0.3198724760892667,
        "width": 0.08433014354066985,
        "height": 0.12008501594048884
      }
    },
    {
      "id": "change-3",
      "label": "The lace glove bow has flattened loops.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.31279904306220097,
        "top": 0.6163655685441021,
        "width": 0.10586124401913875,
        "height": 0.12114771519659936
      }
    },
    {
      "id": "change-4",
      "label": "The mitten patch becomes a crescent.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4706937799043062,
        "top": 0.6195536663124336,
        "width": 0.06698564593301436,
        "height": 0.12646121147715197
      }
    },
    {
      "id": "change-5",
      "label": "The clothespin jaws open.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8642344497607656,
        "top": 0.798087141339001,
        "width": 0.10167464114832536,
        "height": 0.20191285866099895
      }
    }
  ]
},
{
  "id": "v4-dream-323",
  "title": "The Lemon That Kept the Rain",
  "original": "/artwork/v4/collection/dream-323-original-v4.png",
  "altered": "/artwork/v4/collection/dream-323-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The spoon bowl reflects a blue crescent.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.6638755980861244,
        "top": 0.6865037194473964,
        "width": 0.07894736842105263,
        "height": 0.05419766206163656
      }
    },
    {
      "id": "change-2",
      "label": "The lemon door has a carved gold star.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.47547846889952156,
        "top": 0.27417640807651433,
        "width": 0.030502392344497607,
        "height": 0.07332624867162593
      }
    },
    {
      "id": "change-3",
      "label": "The jar lid has a diagonal gold bar.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7057416267942583,
        "top": 0.2911795961742827,
        "width": 0.05980861244019139,
        "height": 0.028692879914984058
      }
    },
    {
      "id": "change-4",
      "label": "The large water drop has a crescent reflection.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.19856459330143542,
        "top": 0.7906482465462275,
        "width": 0.025119617224880382,
        "height": 0.024442082890541977
      }
    },
    {
      "id": "change-5",
      "label": "The lower hinge pin has an X slot.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.45933014354066987,
        "top": 0.3230605738575983,
        "width": 0.013157894736842105,
        "height": 0.020191285866099893
      }
    }
  ]
},
{
  "id": "v4-dream-324",
  "title": "The Girl Who Borrowed a Dragon's Nap",
  "original": "/artwork/v4/collection/dream-324-original-v4.png",
  "altered": "/artwork/v4/collection/dream-324-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The dragon opens its visible eye.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.4784688995215311,
        "top": 0.2146652497343252,
        "width": 0.038875598086124404,
        "height": 0.08395324123273114
      }
    },
    {
      "id": "change-2",
      "label": "The mug handle curls inward.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.15251196172248804,
        "top": 0.6971307120085016,
        "width": 0.02631578947368421,
        "height": 0.05844845908607864
      }
    },
    {
      "id": "change-3",
      "label": "The chest pull becomes triangular.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.04784688995215311,
        "top": 0.6716259298618491,
        "width": 0.03409090909090909,
        "height": 0.057385759829968117
      }
    },
    {
      "id": "change-4",
      "label": "The bedpost cap reflects a blue crescent.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.17643540669856458,
        "top": 0.2104144527098831,
        "width": 0.022129186602870814,
        "height": 0.040382571732199786
      }
    },
    {
      "id": "change-5",
      "label": "The inner braid tie has gold X stitching.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.3815789473684211,
        "top": 0.4399574920297556,
        "width": 0.02033492822966507,
        "height": 0.031880977683315624
      }
    }
  ]
},
{
  "id": "v4-dream-325",
  "title": "The Squid at the Switchboard",
  "original": "/artwork/v4/collection/dream-325-original-v4.png",
  "altered": "/artwork/v4/collection/dream-325-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The front blue shell reflects a gold crescent.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.7727272727272727,
        "top": 0.71413390010627,
        "width": 0.045454545454545456,
        "height": 0.12221041445270989
      }
    },
    {
      "id": "change-2",
      "label": "The lantern has a diagonal lattice bar.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.04784688995215311,
        "top": 0.5090329436769394,
        "width": 0.04485645933014354,
        "height": 0.07013815090329437
      }
    },
    {
      "id": "change-3",
      "label": "The nearest lever has a triangular loop.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.19916267942583732,
        "top": 0.6036131774707758,
        "width": 0.034688995215311005,
        "height": 0.06269925611052073
      }
    },
    {
      "id": "change-4",
      "label": "The top-right socket has a diagonal bar.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7308612440191388,
        "top": 0.1179596174282678,
        "width": 0.025119617224880382,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "change-5",
      "label": "The corner pivot bolt has an X slot.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.7769138755980861,
        "top": 0.5982996811902231,
        "width": 0.023923444976076555,
        "height": 0.04357066950053135
      }
    }
  ]
},
{
  "id": "v4-dream-326",
  "title": "The Chair's Glass Lake",
  "original": "/artwork/v4/collection/dream-326-original-v4.png",
  "altered": "/artwork/v4/collection/dream-326-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "cherry",
      "label": "The cherry stem curls into a loop.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.09210526315789473,
        "top": 0.742826780021254,
        "width": 0.02930622009569378,
        "height": 0.077577045696068
      }
    },
    {
      "id": "vein",
      "label": "The pebble vein forms a Y fork.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.34330143540669855,
        "top": 0.6663124335812965,
        "width": 0.06279904306220095,
        "height": 0.077577045696068
      }
    },
    {
      "id": "sail",
      "label": "The real sail has a diagonal seam stripe.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6118421052631579,
        "top": 0.38575982996811903,
        "width": 0.03349282296650718,
        "height": 0.04994686503719448
      }
    },
    {
      "id": "reflection",
      "label": "The reflected sail right edge curves inward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6124401913875598,
        "top": 0.5419766206163655,
        "width": 0.034688995215311005,
        "height": 0.11052072263549416
      }
    },
    {
      "id": "bench",
      "label": "The tiny bench seat bows upward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.26973684210526316,
        "top": 0.13283740701381508,
        "width": 0.10526315789473684,
        "height": 0.052072263549415514
      }
    }
  ]
},
{
  "id": "v4-dream-327",
  "title": "The Bear Who Tucked in the Stairs",
  "original": "/artwork/v4/collection/dream-327-original-v4.png",
  "altered": "/artwork/v4/collection/dream-327-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "finial",
      "label": "The stair finial becomes an acorn.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.6985645933014354,
        "top": 0.14452709883103082,
        "width": 0.06339712918660287,
        "height": 0.12114771519659936
      }
    },
    {
      "id": "scarf",
      "label": "The blue scarf middle forms an overhand knot.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.125,
        "top": 0.3177470775770457,
        "width": 0.05382775119617225,
        "height": 0.10095642933049948
      }
    },
    {
      "id": "lever",
      "label": "The left door knob becomes a left lever.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.016148325358851676,
        "top": 0.3687566418703507,
        "width": 0.05263157894736842,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "roof",
      "label": "The house nightlight roof arches.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8253588516746412,
        "top": 0.5844845908607864,
        "width": 0.05143540669856459,
        "height": 0.06269925611052073
      }
    },
    {
      "id": "stitch",
      "label": "The cream quilt patch has an X stitch.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.4449760765550239,
        "top": 0.6110520722635494,
        "width": 0.04485645933014354,
        "height": 0.08289054197662062
      }
    }
  ]
},
{
  "id": "v4-dream-335",
  "title": "The Robot's Paper Heartbeat",
  "original": "/artwork/v4/collection/dream-335-original-v4.png",
  "altered": "/artwork/v4/collection/dream-335-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "open-mouth",
      "label": "The robot opens its mouth.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.3911483253588517,
        "top": 0.2720510095642933,
        "width": 0.025717703349282296,
        "height": 0.04144527098831031
      }
    },
    {
      "id": "inverted-heart",
      "label": "The drawn heart turns upside down.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.6668660287081339,
        "top": 0.32199787460148777,
        "width": 0.05263157894736842,
        "height": 0.1073326248671626
      }
    },
    {
      "id": "square-spool",
      "label": "The thread spool\u2019s opening becomes square.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.9055023923444976,
        "top": 0.6439957492029755,
        "width": 0.02930622009569378,
        "height": 0.024442082890541977
      }
    },
    {
      "id": "cross-screw",
      "label": "The chest screw has an X slot.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.27631578947368424,
        "top": 0.3783209351753454,
        "width": 0.028110047846889953,
        "height": 0.053134962805526036
      }
    },
    {
      "id": "hex-pivot",
      "label": "The scissors pivot becomes a hexagonal head.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.3450956937799043,
        "top": 0.8363443145589798,
        "width": 0.022129186602870814,
        "height": 0.02763018065887354
      }
    }
  ]
},
{
  "id": "v4-dream-328",
  "title": "The Clockmaker's Loose Afternoon",
  "original": "/artwork/v4/collection/dream-328-original-v4.png",
  "altered": "/artwork/v4/collection/dream-328-altered-source-v4.png",
  "aspectRatio": 1672 / 940,
  "edits": [
    {
      "id": "cup",
      "label": "The tool mug handle curls into a spiral.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.1507177033492823,
        "top": 0.6446808510638298,
        "width": 0.05562200956937799,
        "height": 0.11702127659574468
      }
    },
    {
      "id": "pendulum",
      "label": "The wall pendulum disk has a crescent relief.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7595693779904307,
        "top": 0.22446808510638297,
        "width": 0.046052631578947366,
        "height": 0.09042553191489362
      }
    },
    {
      "id": "loop",
      "label": "The loose clock lid has a square lifting loop.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6028708133971292,
        "top": 0.776595744680851,
        "width": 0.04126794258373206,
        "height": 0.07446808510638298
      }
    },
    {
      "id": "hourglass",
      "label": "The hourglass top plate left lip curls up.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8989234449760766,
        "top": 0.39680851063829786,
        "width": 0.04366028708133971,
        "height": 0.06382978723404255
      }
    },
    {
      "id": "tweezers",
      "label": "The tweezers joined end opens into a hook.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.7296650717703349,
        "top": 0.7968085106382978,
        "width": 0.05083732057416268,
        "height": 0.06489361702127659
      }
    }
  ]
},
{
  "id": "v4-dream-330",
  "title": "The Goose's Crooked Key",
  "original": "/artwork/v4/collection/dream-330-original-v4.png",
  "altered": "/artwork/v4/collection/dream-330-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "key-oval",
      "label": "The key bow forms one closed oval.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.4874401913875598,
        "top": 0.361317747077577,
        "width": 0.10885167464114832,
        "height": 0.23698193411264612
      }
    },
    {
      "id": "cord-loop",
      "label": "The hanging burgundy cord has a loop knot.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.8851674641148325,
        "top": 0.11370882040382571,
        "width": 0.04485645933014354,
        "height": 0.12433581296493093
      }
    },
    {
      "id": "goose-eye",
      "label": "The goose closes its eye.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6100478468899522,
        "top": 0.18384697130712008,
        "width": 0.025119617224880382,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "tag-feather",
      "label": "The brass tag bears a feather.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8953349282296651,
        "top": 0.33475026567481403,
        "width": 0.04007177033492823,
        "height": 0.10520722635494155
      }
    },
    {
      "id": "hinge-diamond",
      "label": "The middle upper-hinge rivet is diamond shaped.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.7906698564593302,
        "top": 0.46865037194473963,
        "width": 0.019138755980861243,
        "height": 0.025504782146652496
      }
    }
  ]
},
{
  "id": "v4-dream-331",
  "title": "The Elevator in the Cabbage",
  "original": "/artwork/v4/collection/dream-331-original-v4.png",
  "altered": "/artwork/v4/collection/dream-331-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "napkin-unfold",
      "label": "The napkin unfolds its right flap.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.5305023923444976,
        "top": 0.4782146652497343,
        "width": 0.09868421052631579,
        "height": 0.12221041445270989
      }
    },
    {
      "id": "bar-bowed",
      "label": "The elevator safety bar bows downward.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.423444976076555,
        "top": 0.4707757704569607,
        "width": 0.06638755980861244,
        "height": 0.04250797024442083
      }
    },
    {
      "id": "wheel-three",
      "label": "The pulley wheel has three spokes.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.4180622009569378,
        "top": 0.15090329436769395,
        "width": 0.04366028708133971,
        "height": 0.077577045696068
      }
    },
    {
      "id": "floor-flower",
      "label": "The elevator floor motif has four rounded petals.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.43241626794258375,
        "top": 0.5717321997874601,
        "width": 0.08074162679425838,
        "height": 0.07863974495217853
      }
    },
    {
      "id": "rivet-crescent",
      "label": "The knife handle rivet is a crescent.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.13456937799043062,
        "top": 0.8926673751328374,
        "width": 0.026913875598086126,
        "height": 0.04569606801275239
      }
    }
  ]
},
{
  "id": "v4-dream-332",
  "title": "The Boy Who Pressed the Silence",
  "original": "/artwork/v4/collection/dream-332-original-v4.png",
  "altered": "/artwork/v4/collection/dream-332-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The apron bears stitched gold compass embroidery.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.3349282296650718,
        "top": 0.5642933049946866,
        "width": 0.090311004784689,
        "height": 0.16790648246546228
      }
    },
    {
      "id": "change-2",
      "label": "The stained cloth's free end threads through its own knot.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.2595693779904306,
        "top": 0.8352816153028693,
        "width": 0.09748803827751196,
        "height": 0.1339001062699256
      }
    },
    {
      "id": "change-3",
      "label": "Only the scissors' right blade pivots outward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7936602870813397,
        "top": 0.19553666312433582,
        "width": 0.08552631578947369,
        "height": 0.20828905419766205
      }
    },
    {
      "id": "change-4",
      "label": "A crescent reflects on the dark ink bowl.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.12200956937799043,
        "top": 0.8119022316684378,
        "width": 0.03708133971291866,
        "height": 0.061636556854410204
      }
    },
    {
      "id": "change-5",
      "label": "The brush jar's right rim curls into a hollow lip.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.07834928229665072,
        "top": 0.640807651434644,
        "width": 0.03588516746411483,
        "height": 0.06907545164718384
      }
    }
  ]
},
{
  "id": "v4-dream-333",
  "title": "The Antelope's Unfinished Sweater",
  "original": "/artwork/v4/collection/dream-333-original-v4.png",
  "altered": "/artwork/v4/collection/dream-333-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The green pillow bears gold compass embroidery.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.756578947368421,
        "top": 0.5026567481402763,
        "width": 0.13516746411483255,
        "height": 0.23273113708820403
      }
    },
    {
      "id": "change-2",
      "label": "The chair throw's end passes through its own knot.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.8917464114832536,
        "top": 0.41339001062699254,
        "width": 0.10645933014354067,
        "height": 0.230605738575983
      }
    },
    {
      "id": "change-3",
      "label": "The table cloth's right corner rolls into a hollow tube.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.16028708133971292,
        "top": 0.8746014877789585,
        "width": 0.06818181818181818,
        "height": 0.12539851222104145
      }
    },
    {
      "id": "change-4",
      "label": "The sweater's purple stitched band forms an interlaced braid.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.43480861244019137,
        "top": 0.6099893730074389,
        "width": 0.19796650717703348,
        "height": 0.14984059511158343
      }
    },
    {
      "id": "change-5",
      "label": "The basket handle threads through its own woven knot.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.08433014354066985,
        "top": 0.39744952178533477,
        "width": 0.07057416267942583,
        "height": 0.15090329436769395
      }
    }
  ]
},
{
  "id": "v4-dream-334",
  "title": "The Box of Unfallen Rain",
  "original": "/artwork/v4/collection/dream-334-original-v4.png",
  "altered": "/artwork/v4/collection/dream-334-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The crimson cloth's end passes through its own knot.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.3235645933014354,
        "top": 0.7311370882040382,
        "width": 0.2075358851674641,
        "height": 0.2688629117959617
      }
    },
    {
      "id": "change-2",
      "label": "The box's brass latch swings open to the left.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.3803827751196172,
        "top": 0.4718384697130712,
        "width": 0.13098086124401914,
        "height": 0.15727948990435706
      }
    },
    {
      "id": "change-3",
      "label": "The envelope's upper left corner curls upward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5311004784688995,
        "top": 0.6971307120085016,
        "width": 0.21291866028708134,
        "height": 0.153028692879915
      }
    },
    {
      "id": "change-4",
      "label": "A crescent reflects inside the bowl's water puddle.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.16447368421052633,
        "top": 0.8310308182784272,
        "width": 0.03409090909090909,
        "height": 0.05844845908607864
      }
    },
    {
      "id": "change-5",
      "label": "The key's right bow opens into a crescent gap.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.9533492822966507,
        "top": 0.5982996811902231,
        "width": 0.03409090909090909,
        "height": 0.09564293304994687
      }
    }
  ]
},
{
  "id": "v4-dream-336",
  "title": "The Pineapple's Attic Window",
  "original": "/artwork/v4/collection/dream-336-original-v4.png",
  "altered": "/artwork/v4/collection/dream-336-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "horizontal-clasp",
      "label": "The chest clasp lies horizontally.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.8594497607655502,
        "top": 0.4675876726886291,
        "width": 0.10107655502392345,
        "height": 0.1742826780021254
      }
    },
    {
      "id": "window-brace",
      "label": "The window\u2019s upper-right pane gains a diagonal brace.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.5735645933014354,
        "top": 0.15409139213602552,
        "width": 0.028708133971291867,
        "height": 0.06482465462274177
      }
    },
    {
      "id": "triangle-roll",
      "label": "The hanging rug\u2019s inner fold becomes triangular.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.45933014354066987,
        "top": 0.5111583421891605,
        "width": 0.04007177033492823,
        "height": 0.10520722635494155
      }
    },
    {
      "id": "diamond-spool",
      "label": "The rope spool\u2019s opening becomes a diamond.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8104066985645934,
        "top": 0.740701381509033,
        "width": 0.03648325358851675,
        "height": 0.09989373007438895
      }
    },
    {
      "id": "crescent-pitcher",
      "label": "The pitcher bears a teal crescent.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.03827751196172249,
        "top": 0.4218916046758767,
        "width": 0.028708133971291867,
        "height": 0.05844845908607864
      }
    }
  ]
},
{
  "id": "v4-dream-337",
  "title": "The Girl Who Swept Up the Tide",
  "original": "/artwork/v4/collection/dream-337-original-v4.png",
  "altered": "/artwork/v4/collection/dream-337-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "down-lever",
      "label": "The refrigerator lever points downward.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.15430622009569378,
        "top": 0.2826780021253985,
        "width": 0.06698564593301436,
        "height": 0.08820403825717323
      }
    },
    {
      "id": "blue-sail",
      "label": "The postcard\u2019s right sail turns blue.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.17523923444976078,
        "top": 0.025504782146652496,
        "width": 0.03289473684210526,
        "height": 0.04675876726886291
      }
    },
    {
      "id": "triangle-shell",
      "label": "The spiral shell\u2019s opening becomes triangular.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7649521531100478,
        "top": 0.8990435706695006,
        "width": 0.03289473684210526,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "crescent-dot",
      "label": "One pitcher dot becomes a crescent.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.05382775119617225,
        "top": 0.057385759829968117,
        "width": 0.019736842105263157,
        "height": 0.03400637619553666
      }
    },
    {
      "id": "triangle-handle",
      "label": "The dustpan handle\u2019s hole becomes triangular.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.47248803827751196,
        "top": 0.5759829968119022,
        "width": 0.017942583732057416,
        "height": 0.02975557917109458
      }
    }
  ]
},
{
  "id": "v4-dream-338",
  "title": "The Chameleon's Spare Coat",
  "original": "/artwork/v4/collection/dream-338-original-v4.png",
  "altered": "/artwork/v4/collection/dream-338-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The lower pink pocket has gold star embroidery.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.7027511961722488,
        "top": 0.6333687566418703,
        "width": 0.04007177033492823,
        "height": 0.07332624867162593
      }
    },
    {
      "id": "change-2",
      "label": "The hanger gains an arched crossbar.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.6142344497607656,
        "top": 0.153028692879915,
        "width": 0.07655502392344497,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "change-3",
      "label": "The upper coat button reflects a blue crescent.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6148325358851675,
        "top": 0.38788522848034007,
        "width": 0.020933014354066987,
        "height": 0.04250797024442083
      }
    },
    {
      "id": "change-4",
      "label": "The purse motif becomes a gold crescent.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.9210526315789473,
        "top": 0.38788522848034007,
        "width": 0.045454545454545456,
        "height": 0.09458023379383634
      }
    },
    {
      "id": "change-5",
      "label": "The left mirror pivot has an X groove.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.02930622009569378,
        "top": 0.24760892667375134,
        "width": 0.025717703349282296,
        "height": 0.04675876726886291
      }
    }
  ]
},
{
  "id": "v4-dream-339",
  "title": "The Bridge Inside a Biscuit",
  "original": "/artwork/v4/collection/dream-339-original-v4.png",
  "altered": "/artwork/v4/collection/dream-339-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The spoon bowl has a blue curved reflection.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.8660287081339713,
        "top": 0.6004250797024442,
        "width": 0.10645933014354067,
        "height": 0.10414452709883103
      }
    },
    {
      "id": "change-2",
      "label": "One bridge plank has a carved gold star.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.42822966507177035,
        "top": 0.46971307120085015,
        "width": 0.025717703349282296,
        "height": 0.04144527098831031
      }
    },
    {
      "id": "change-3",
      "label": "The painted saucer stem curls into an S.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6489234449760766,
        "top": 0.10520722635494155,
        "width": 0.05741626794258373,
        "height": 0.11158342189160468
      }
    },
    {
      "id": "change-4",
      "label": "One biscuit hole is crossed by a dough bar.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.17942583732057416,
        "top": 0.35812964930924546,
        "width": 0.049641148325358854,
        "height": 0.06588735387885228
      }
    },
    {
      "id": "change-5",
      "label": "The front-left bridge post has a triangular notch.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.2822966507177033,
        "top": 0.34962805526036134,
        "width": 0.016148325358851676,
        "height": 0.028692879914984058
      }
    }
  ]
},
{
  "id": "v4-dream-340",
  "title": "The Monster Who Held the Ceiling",
  "original": "/artwork/v4/collection/dream-340-original-v4.png",
  "altered": "/artwork/v4/collection/dream-340-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The chair cushion has gold star embroidery.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.35287081339712917,
        "top": 0.6057385759829969,
        "width": 0.039473684210526314,
        "height": 0.039319872476089264
      }
    },
    {
      "id": "change-2",
      "label": "The mug handle curls inward.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.1680622009569378,
        "top": 0.5154091392136025,
        "width": 0.02332535885167464,
        "height": 0.044633368756641874
      }
    },
    {
      "id": "change-3",
      "label": "The front chair brace arches upward.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.28169856459330145,
        "top": 0.7502656748140276,
        "width": 0.06758373205741627,
        "height": 0.07013815090329437
      }
    },
    {
      "id": "change-4",
      "label": "The lantern cap reflects a blue crescent.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.029904306220095694,
        "top": 0.35069075451647186,
        "width": 0.050239234449760764,
        "height": 0.040382571732199786
      }
    },
    {
      "id": "change-5",
      "label": "The chest clasp tongue tilts to the right.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.7721291866028708,
        "top": 0.7109458023379384,
        "width": 0.03289473684210526,
        "height": 0.06482465462274177
      }
    }
  ]
},
{
  "id": "v4-dream-341",
  "title": "The Jellyfish's Dry Umbrella",
  "original": "/artwork/v4/collection/dream-341-original-v4.png",
  "altered": "/artwork/v4/collection/dream-341-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The bubble carries a heart-shaped pebble.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.7715311004784688,
        "top": 0.15834218916046758,
        "width": 0.039473684210526314,
        "height": 0.06269925611052073
      }
    },
    {
      "id": "change-2",
      "label": "The paper seahorse closes its raised hand.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.652511961722488,
        "top": 0.3018065887353879,
        "width": 0.03648325358851675,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "change-3",
      "label": "The scallop rim lifts upward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.02631578947368421,
        "top": 0.6110520722635494,
        "width": 0.09150717703349283,
        "height": 0.08395324123273114
      }
    },
    {
      "id": "change-4",
      "label": "The vase has a crescent glaze motif.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7494019138755981,
        "top": 0.7587672688629118,
        "width": 0.04784688995215311,
        "height": 0.08607863974495218
      }
    },
    {
      "id": "change-5",
      "label": "One chair-scarf fringe tip curls into a hook.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8546650717703349,
        "top": 0.8331562167906482,
        "width": 0.0215311004784689,
        "height": 0.0669500531349628
      }
    }
  ]
},
{
  "id": "v4-dream-342",
  "title": "The Tailor of Crumpled Distance",
  "original": "/artwork/v4/collection/dream-342-original-v4.png",
  "altered": "/artwork/v4/collection/dream-342-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The lamp bulb has a pointed tip.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.05143540669856459,
        "top": 0.15409139213602552,
        "width": 0.03110047846889952,
        "height": 0.06907545164718384
      }
    },
    {
      "id": "change-2",
      "label": "The foreground scissors open upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.2075358851674641,
        "top": 0.767268862911796,
        "width": 0.15370813397129188,
        "height": 0.1997874601487779
      }
    },
    {
      "id": "change-3",
      "label": "The road dash bends into a direction arrow.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.3833732057416268,
        "top": 0.6663124335812965,
        "width": 0.038875598086124404,
        "height": 0.07545164718384698
      }
    },
    {
      "id": "change-4",
      "label": "The green spool has a square aperture.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.17404306220095694,
        "top": 0.9181721572794899,
        "width": 0.03229665071770335,
        "height": 0.07545164718384698
      }
    },
    {
      "id": "change-5",
      "label": "The fabric roll flap tip curls upward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.833732057416268,
        "top": 0.8012752391073327,
        "width": 0.12679425837320574,
        "height": 0.1647183846971307
      }
    }
  ]
},
{
  "id": "v4-dream-343",
  "title": "The Walnut's Moonless Night",
  "original": "/artwork/v4/collection/dream-343-original-v4.png",
  "altered": "/artwork/v4/collection/dream-343-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The book opens its front cover.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.4784688995215311,
        "top": 0.4112646121147715,
        "width": 0.0729665071770335,
        "height": 0.0818278427205101
      }
    },
    {
      "id": "change-2",
      "label": "The door knob becomes a crescent lever.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7392344497607656,
        "top": 0.3528161530286929,
        "width": 0.042464114832535885,
        "height": 0.0563230605738576
      }
    },
    {
      "id": "change-3",
      "label": "The lantern carrying loop spirals inward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6602870813397129,
        "top": 0.32624867162592985,
        "width": 0.02452153110047847,
        "height": 0.04994686503719448
      }
    },
    {
      "id": "change-4",
      "label": "The hanging bag flap opens upward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4485645933014354,
        "top": 0.25717321997874604,
        "width": 0.05263157894736842,
        "height": 0.10414452709883103
      }
    },
    {
      "id": "change-5",
      "label": "The cup flower becomes a six-point star.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8779904306220095,
        "top": 0.8129649309245484,
        "width": 0.06220095693779904,
        "height": 0.0871413390010627
      }
    }
  ]
},
{
  "id": "v4-dream-344",
  "title": "The Penguin Who Sorted Warmth",
  "original": "/artwork/v4/collection/dream-344-original-v4.png",
  "altered": "/artwork/v4/collection/dream-344-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "stopper",
      "label": "The hot-water bottle stopper becomes triangular.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.18839712918660287,
        "top": 0.5579171094580234,
        "width": 0.056220095693779906,
        "height": 0.08289054197662062
      }
    },
    {
      "id": "scarf",
      "label": "The penguin trailing scarf forms a knot.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.28827751196172247,
        "top": 0.46971307120085015,
        "width": 0.06698564593301436,
        "height": 0.10626992561105207
      }
    },
    {
      "id": "cloth",
      "label": "The airborne blanket right tip curls into a loop.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7727272727272727,
        "top": 0.018065887353878853,
        "width": 0.031698564593301434,
        "height": 0.05526036131774708
      }
    },
    {
      "id": "sun",
      "label": "The jar sun disk has a smiling face.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.05562200956937799,
        "top": 0.08926673751328375,
        "width": 0.028708133971291867,
        "height": 0.048884165781083955
      }
    },
    {
      "id": "snow",
      "label": "The tin snowflake becomes a spiral swirl.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.061004784688995214,
        "top": 0.3028692879914984,
        "width": 0.04066985645933014,
        "height": 0.077577045696068
      }
    }
  ]
},
{
  "id": "v4-dream-345",
  "title": "The Doorway in the Measuring Tape",
  "original": "/artwork/v4/collection/dream-345-original-v4.png",
  "altered": "/artwork/v4/collection/dream-345-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "ring",
      "label": "The nearer scissors ring becomes angular.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.812200956937799,
        "top": 0.4452709883103082,
        "width": 0.12081339712918661,
        "height": 0.19659936238044634
      }
    },
    {
      "id": "awl",
      "label": "The awl handle has a spiral groove.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.0645933014354067,
        "top": 0.8278427205100957,
        "width": 0.1722488038277512,
        "height": 0.14240170031880978
      }
    },
    {
      "id": "thimble",
      "label": "The thimble base has chevron relief.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.17464114832535885,
        "top": 0.4357066950053135,
        "width": 0.08133971291866028,
        "height": 0.07120085015940489
      }
    },
    {
      "id": "spool",
      "label": "The thread spool top hole becomes triangular.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8492822966507177,
        "top": 0.0,
        "width": 0.05861244019138756,
        "height": 0.05419766206163656
      }
    },
    {
      "id": "lamp",
      "label": "The inner lamp shade right edge curls upward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.5352870813397129,
        "top": 0.153028692879915,
        "width": 0.020933014354066987,
        "height": 0.04250797024442083
      }
    }
  ]
},
{
  "id": "v4-dream-346",
  "title": "The Girl and the Broken Rainbow Ladder",
  "original": "/artwork/v4/collection/dream-346-original-v4.png",
  "altered": "/artwork/v4/collection/dream-346-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "handle",
      "label": "The tool caddy handle arches upward.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.02930622009569378,
        "top": 0.49415515409139216,
        "width": 0.11004784688995216,
        "height": 0.061636556854410204
      }
    },
    {
      "id": "hair",
      "label": "The hair ribbon left tail curls into a spiral.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.25179425837320574,
        "top": 0.26567481402763016,
        "width": 0.041866028708133975,
        "height": 0.08289054197662062
      }
    },
    {
      "id": "ring",
      "label": "The nearer scissors ring becomes diamond-shaped.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.03289473684210526,
        "top": 0.8140276301806588,
        "width": 0.06758373205741627,
        "height": 0.05951115834218916
      }
    },
    {
      "id": "knot",
      "label": "The blue floor ribbon forms an overhand knot.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.10645933014354067,
        "top": 0.8150903294367694,
        "width": 0.10107655502392345,
        "height": 0.11370882040382571
      }
    },
    {
      "id": "bowl",
      "label": "The small bowl front has a blue crescent.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.2679425837320574,
        "top": 0.8384697130712009,
        "width": 0.031698564593301434,
        "height": 0.03400637619553666
      }
    }
  ]
},
{
  "id": "v4-dream-347",
  "title": "The Snail's Velvet Drum",
  "original": "/artwork/v4/collection/dream-347-original-v4.png",
  "altered": "/artwork/v4/collection/dream-347-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "hooked-antenna",
      "label": "The snail\u2019s right antenna curls downward.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.5944976076555024,
        "top": 0.33049946865037194,
        "width": 0.06399521531100479,
        "height": 0.12327311370882041
      }
    },
    {
      "id": "crescent-drum",
      "label": "The drumhead bears a teal crescent.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.24162679425837322,
        "top": 0.3421891604675877,
        "width": 0.03708133971291866,
        "height": 0.1689691817215728
      }
    },
    {
      "id": "star-weight",
      "label": "The velvet weight bears a stitched star.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7123205741626795,
        "top": 0.23273113708820403,
        "width": 0.05442583732057416,
        "height": 0.09989373007438895
      }
    },
    {
      "id": "pointed-drop",
      "label": "The water droplet rises into a point.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.9001196172248804,
        "top": 0.7991498405951116,
        "width": 0.04066985645933014,
        "height": 0.07438894792773645
      }
    },
    {
      "id": "triangle-bell",
      "label": "The bell\u2019s sound hole becomes triangular.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.1291866028708134,
        "top": 0.6354941551540914,
        "width": 0.02751196172248804,
        "height": 0.05844845908607864
      }
    }
  ]
},
{
  "id": "v4-dream-348",
  "title": "The Alien's Empty Picnic",
  "original": "/artwork/v4/collection/dream-348-original-v4.png",
  "altered": "/artwork/v4/collection/dream-348-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "closed-eye",
      "label": "The alien closes one eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.37559808612440193,
        "top": 0.20828905419766205,
        "width": 0.05861244019138756,
        "height": 0.11902231668437832
      }
    },
    {
      "id": "vertical-orbit",
      "label": "The bottle planet\u2019s ring turns vertical.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.8797846889952153,
        "top": 0.718384697130712,
        "width": 0.06578947368421052,
        "height": 0.13496280552603612
      }
    },
    {
      "id": "star-ball",
      "label": "The ball bears a pale star.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8522727272727273,
        "top": 0.04250797024442083,
        "width": 0.05921052631578947,
        "height": 0.11158342189160468
      }
    },
    {
      "id": "sideways-latch",
      "label": "The latch\u2019s top plate becomes a horizontal bar.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.45933014354066987,
        "top": 0.665249734325186,
        "width": 0.04007177033492823,
        "height": 0.06376195536663125
      }
    },
    {
      "id": "diamond-buckle",
      "label": "The backpack buckle\u2019s opening becomes a diamond.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.07894736842105263,
        "top": 0.08501594048884166,
        "width": 0.04007177033492823,
        "height": 0.08289054197662062
      }
    }
  ]
},
{
  "id": "v4-dream-349",
  "title": "The Sparrow's Wooden Ocean",
  "original": "/artwork/v4/collection/dream-349-original-v4.png",
  "altered": "/artwork/v4/collection/dream-349-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "closed-eye",
      "label": "The sparrow closes its eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.43899521531100477,
        "top": 0.12221041445270989,
        "width": 0.025717703349282296,
        "height": 0.04357066950053135
      }
    },
    {
      "id": "angular-shaving",
      "label": "The leftmost shaving coils into an angular loop.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.4958133971291866,
        "top": 0.7747077577045696,
        "width": 0.08552631578947369,
        "height": 0.14027630180658873
      }
    },
    {
      "id": "star-jar",
      "label": "The paint jar bears a pale star.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.056818181818181816,
        "top": 0.6057385759829969,
        "width": 0.05203349282296651,
        "height": 0.11477151965993623
      }
    },
    {
      "id": "crescent-handle",
      "label": "The clamp handle bears a carved crescent.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8995215311004785,
        "top": 0.1487778958554729,
        "width": 0.05263157894736842,
        "height": 0.1179596174282678
      }
    },
    {
      "id": "hex-rivet",
      "label": "The clamp rivet becomes hexagonal.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.937799043062201,
        "top": 0.4952178533475027,
        "width": 0.034688995215311005,
        "height": 0.061636556854410204
      }
    }
  ]
},
{
  "id": "v4-dream-350",
  "title": "The Teaspoon's Long Journey",
  "original": "/artwork/v4/collection/dream-350-original-v4.png",
  "altered": "/artwork/v4/collection/dream-350-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "towel-roll",
      "label": "The towel's upper fold rolls outward.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.0,
        "top": 0.5377258235919234,
        "width": 0.3815789473684211,
        "height": 0.4622741764080765
      },
      "source": "/artwork/v4/collection/dream-350-towel-assembled-source-v4.png"
    },
    {
      "id": "bench-tilt",
      "label": "The station bench backrest reclines.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.8313397129186603,
        "top": 0.2688629117959617,
        "width": 0.10586124401913875,
        "height": 0.12646121147715197
      }
    },
    {
      "id": "spoon-moon",
      "label": "The spoon bowl has a crescent engraving.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.13277511961722488,
        "top": 0.3421891604675877,
        "width": 0.09449760765550239,
        "height": 0.1030818278427205
      }
    },
    {
      "id": "arch-point",
      "label": "The central spoon-handle arch becomes pointed.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.48086124401913877,
        "top": 0.24229543039319873,
        "width": 0.11782296650717704,
        "height": 0.15727948990435706
      }
    },
    {
      "id": "knob-spiral",
      "label": "The lid knob bears a blue spiral.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.8923444976076556,
        "top": 0.5749202975557917,
        "width": 0.056220095693779906,
        "height": 0.07226354941551541
      }
    }
  ]
},
{
  "id": "v4-dream-351",
  "title": "The Child Who Wore the Hallway",
  "original": "/artwork/v4/collection/dream-351-original-v4.png",
  "altered": "/artwork/v4/collection/dream-351-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "window-shut",
      "label": "The right cardboard window shutters close.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.5759569377990431,
        "top": 0.43889479277364507,
        "width": 0.03827751196172249,
        "height": 0.1179596174282678
      }
    },
    {
      "id": "umbrella-loop",
      "label": "The umbrella handle curls into a complete loop.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.819377990430622,
        "top": 0.31668437832093516,
        "width": 0.04724880382775119,
        "height": 0.0924548352816153
      }
    },
    {
      "id": "sun-waves",
      "label": "The painted sun has wavy rays.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.33851674641148327,
        "top": 0.27523910733262485,
        "width": 0.053229665071770335,
        "height": 0.12858660998937302
      }
    },
    {
      "id": "key-heart",
      "label": "The hanging key bow is heart shaped.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8235645933014354,
        "top": 0.08289054197662062,
        "width": 0.03229665071770335,
        "height": 0.05526036131774708
      }
    },
    {
      "id": "buckle-diamond",
      "label": "The satchel buckle is diamond shaped.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.05263157894736842,
        "top": 0.6450584484590861,
        "width": 0.02930622009569378,
        "height": 0.05526036131774708
      }
    }
  ]
},
{
  "id": "v4-dream-353",
  "title": "The Apple That Forgot to Fall",
  "original": "/artwork/v4/collection/dream-353-original-v4.png",
  "altered": "/artwork/v4/collection/dream-353-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The wooden spoon has a gold crescent inlay.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.7260765550239234,
        "top": 0.5844845908607864,
        "width": 0.11004784688995216,
        "height": 0.10520722635494155
      }
    },
    {
      "id": "change-2",
      "label": "The lowest ladder rung arches upward.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.19976076555023922,
        "top": 0.7587672688629118,
        "width": 0.0687799043062201,
        "height": 0.06482465462274177
      }
    },
    {
      "id": "change-3",
      "label": "The cabinet knob has a gold star.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6519138755980861,
        "top": 0.9277364505844846,
        "width": 0.0430622009569378,
        "height": 0.07120085015940489
      }
    },
    {
      "id": "change-4",
      "label": "The hanging water drop has a blue reflection.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.10526315789473684,
        "top": 0.3368756641870351,
        "width": 0.017344497607655503,
        "height": 0.040382571732199786
      }
    },
    {
      "id": "change-5",
      "label": "One middle rung endcap has an X groove.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.26854066985645936,
        "top": 0.69394261424017,
        "width": 0.017344497607655503,
        "height": 0.03294367693942614
      }
    }
  ]
},
{
  "id": "v4-dream-354",
  "title": "The Locksmith's Soft Keyhole",
  "original": "/artwork/v4/collection/dream-354-original-v4.png",
  "altered": "/artwork/v4/collection/dream-354-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The knitted key smiles.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.5299043062200957,
        "top": 0.42401700318809776,
        "width": 0.02930622009569378,
        "height": 0.03400637619553666
      }
    },
    {
      "id": "change-2",
      "label": "The spool opening has a wooden crossbar.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.09569377990430622,
        "top": 0.6493092454835282,
        "width": 0.03588516746411483,
        "height": 0.10095642933049948
      }
    },
    {
      "id": "change-3",
      "label": "The key handle has purple star embroidery.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.3361244019138756,
        "top": 0.4399574920297556,
        "width": 0.04844497607655503,
        "height": 0.09989373007438895
      }
    },
    {
      "id": "change-4",
      "label": "The upper hinge screw has a blue reflection.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8253588516746412,
        "top": 0.18172157279489903,
        "width": 0.02631578947368421,
        "height": 0.052072263549415514
      }
    },
    {
      "id": "change-5",
      "label": "The lower hinge screw has an X slot.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.8253588516746412,
        "top": 0.4038257173219979,
        "width": 0.028110047846889953,
        "height": 0.06057385759829968
      }
    }
  ]
},
{
  "id": "v4-dream-355",
  "title": "The Robot Who Bottled a Sigh",
  "original": "/artwork/v4/collection/dream-355-original-v4.png",
  "altered": "/artwork/v4/collection/dream-355-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The tray reflects a blue crescent.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.4772727272727273,
        "top": 0.8809776833156217,
        "width": 0.12619617224880383,
        "height": 0.06801275239107332
      }
    },
    {
      "id": "change-2",
      "label": "The chest latch has a triangular loop.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.8642344497607656,
        "top": 0.8002125398512221,
        "width": 0.03588516746411483,
        "height": 0.06269925611052073
      }
    },
    {
      "id": "change-3",
      "label": "The tongs handle has a diagonal crossbar.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6716507177033493,
        "top": 0.8799149840595112,
        "width": 0.031698564593301434,
        "height": 0.02975557917109458
      }
    },
    {
      "id": "change-4",
      "label": "The globe stand has a gold star.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.17464114832535885,
        "top": 0.7577045696068013,
        "width": 0.022129186602870814,
        "height": 0.025504782146652496
      }
    },
    {
      "id": "change-5",
      "label": "The hanging caliper pivot has an X slot.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.17763157894736842,
        "top": 0.14240170031880978,
        "width": 0.016148325358851676,
        "height": 0.02975557917109458
      }
    }
  ]
},
{
  "id": "v4-dream-352",
  "title": "The Manta Ray's Curtains",
  "original": "/artwork/v4/collection/dream-352-original-v4.png",
  "altered": "/artwork/v4/collection/dream-352-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "cushion-curl",
      "label": "The stool cushion's left end curls upward.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.7147129186602871,
        "top": 0.6057385759829969,
        "width": 0.06160287081339713,
        "height": 0.04250797024442083
      },
      "source": "/artwork/v4/collection/dream-352-cushion-assembled-source-v4.png"
    },
    {
      "id": "stand-moon",
      "label": "The music tray has a crescent openwork motif.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.7894736842105263,
        "top": 0.5228480340063762,
        "width": 0.07236842105263158,
        "height": 0.07863974495217853
      }
    },
    {
      "id": "tassel-loop",
      "label": "The far-right curtain tassel forms a braided loop.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.9234449760765551,
        "top": 0.41764080765143463,
        "width": 0.030502392344497607,
        "height": 0.09032943676939426
      }
    },
    {
      "id": "piano-moon",
      "label": "The piano lid has a gold crescent inlay.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.16686602870813397,
        "top": 0.49946865037194477,
        "width": 0.03409090909090909,
        "height": 0.04782146652497343
      }
    },
    {
      "id": "manta-eye",
      "label": "The manta closes its eye.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.5370813397129187,
        "top": 0.18703506907545164,
        "width": 0.028110047846889953,
        "height": 0.04250797024442083
      }
    }
  ]
},
{
  "id": "v4-dream-356",
  "title": "The Otter's Dry Waterfall",
  "original": "/artwork/v4/collection/dream-356-original-v4.png",
  "altered": "/artwork/v4/collection/dream-356-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The basket's front panel has a diamond wicker weave.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.39174641148325356,
        "top": 0.6248671625929861,
        "width": 0.3618421052631579,
        "height": 0.23379383634431455
      }
    },
    {
      "id": "change-2",
      "label": "The loose rope threads through its own coil in a knot.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.03648325358851675,
        "top": 0.7375132837407014,
        "width": 0.16686602870813397,
        "height": 0.13496280552603612
      }
    },
    {
      "id": "change-3",
      "label": "The miniature bridge's center deck hinges upward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.506578947368421,
        "top": 0.39107332624867164,
        "width": 0.22069377990430622,
        "height": 0.20085015940488843
      }
    },
    {
      "id": "change-4",
      "label": "The wooden stick bears an incised spiral.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.23444976076555024,
        "top": 0.7810839532412327,
        "width": 0.07117224880382775,
        "height": 0.07863974495217853
      }
    },
    {
      "id": "change-5",
      "label": "The left rock face bears a shallow crescent groove.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.030502392344497607,
        "top": 0.46865037194473963,
        "width": 0.07117224880382775,
        "height": 0.1487778958554729
      }
    }
  ]
},
{
  "id": "v4-dream-357",
  "title": "The Cucumber's Long Corridor",
  "original": "/artwork/v4/collection/dream-357-original-v4.png",
  "altered": "/artwork/v4/collection/dream-357-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The lower cloth's upper fold rolls into a hollow curl.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.17523923444976078,
        "top": 0.6588735387885228,
        "width": 0.09150717703349283,
        "height": 0.20085015940488843
      }
    },
    {
      "id": "change-2",
      "label": "A crescent reflects on the drinking glass.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.12619617224880383,
        "top": 0.053134962805526036,
        "width": 0.04665071770334928,
        "height": 0.12964930924548354
      }
    },
    {
      "id": "change-3",
      "label": "Only the far purple door's left leaf swings open.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6716507177033493,
        "top": 0.18597236981934112,
        "width": 0.03289473684210526,
        "height": 0.12433581296493093
      }
    },
    {
      "id": "change-4",
      "label": "The nearest wall lamp glows as a crescent.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4342105263157895,
        "top": 0.538788522848034,
        "width": 0.03229665071770335,
        "height": 0.1073326248671626
      }
    },
    {
      "id": "change-5",
      "label": "The nearest cucumber slice's left rind curls into a hollow lip.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8953349282296651,
        "top": 0.6068012752391073,
        "width": 0.06279904306220095,
        "height": 0.1891604675876727
      }
    }
  ]
},
{
  "id": "v4-dream-359",
  "title": "The Chandelier That Needed Shoes",
  "original": "/artwork/v4/collection/dream-359-original-v4.png",
  "altered": "/artwork/v4/collection/dream-359-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The blue slipper star becomes a crescent.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.3630382775119617,
        "top": 0.6078639744952179,
        "width": 0.0430622009569378,
        "height": 0.07013815090329437
      }
    },
    {
      "id": "change-2",
      "label": "The white slipper bow becomes a loose knot.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7200956937799043,
        "top": 0.6748140276301806,
        "width": 0.06638755980861244,
        "height": 0.10414452709883103
      }
    },
    {
      "id": "change-3",
      "label": "The hatbox lid rim lifts upward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.9090909090909091,
        "top": 0.45589798087141337,
        "width": 0.09090909090909091,
        "height": 0.08395324123273114
      }
    },
    {
      "id": "change-4",
      "label": "The left candle wick curls into a spiral.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.31220095693779903,
        "top": 0.019128586609989374,
        "width": 0.03648325358851675,
        "height": 0.06482465462274177
      }
    },
    {
      "id": "change-5",
      "label": "The checked slipper button becomes square.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.5424641148325359,
        "top": 0.7577045696068013,
        "width": 0.025717703349282296,
        "height": 0.04994686503719448
      }
    }
  ]
},
{
  "id": "v4-dream-360",
  "title": "The Badger's Folded Winter",
  "original": "/artwork/v4/collection/dream-360-original-v4.png",
  "altered": "/artwork/v4/collection/dream-360-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The box pine emblem becomes a crescent.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.6830143540669856,
        "top": 0.06907545164718384,
        "width": 0.04366028708133971,
        "height": 0.11583421891604676
      }
    },
    {
      "id": "change-2",
      "label": "The snow drawer pull stands upright.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.44557416267942584,
        "top": 0.5526036131774708,
        "width": 0.0651913875598086,
        "height": 0.12646121147715197
      }
    },
    {
      "id": "change-3",
      "label": "The left boot top lace forms a broad bow.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.0035885167464114833,
        "top": 0.5069075451647184,
        "width": 0.0651913875598086,
        "height": 0.09670563230605739
      }
    },
    {
      "id": "change-4",
      "label": "The scoop rim curls inward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7494019138755981,
        "top": 0.16790648246546228,
        "width": 0.035287081339712915,
        "height": 0.0563230605738576
      }
    },
    {
      "id": "change-5",
      "label": "The striped towel corner folds outward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8361244019138756,
        "top": 0.8108395324123273,
        "width": 0.11244019138755981,
        "height": 0.13496280552603612
      }
    }
  ]
},
{
  "id": "v4-dream-361",
  "title": "The Peach-Colored Echo",
  "original": "/artwork/v4/collection/dream-361-original-v4.png",
  "altered": "/artwork/v4/collection/dream-361-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The horn mounting knob becomes a gear.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.02332535885167464,
        "top": 0.39744952178533477,
        "width": 0.04844497607655503,
        "height": 0.09458023379383634
      }
    },
    {
      "id": "change-2",
      "label": "The tassel cord opens into a hook.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.06578947368421052,
        "top": 0.6344314558979809,
        "width": 0.07236842105263158,
        "height": 0.06801275239107332
      }
    },
    {
      "id": "change-3",
      "label": "The right binder clip ring folds flat.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.30741626794258375,
        "top": 0.6291179596174282,
        "width": 0.06399521531100479,
        "height": 0.08607863974495218
      }
    },
    {
      "id": "change-4",
      "label": "The scarf corner rolls outward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7613636363636364,
        "top": 0.6684378320935175,
        "width": 0.090311004784689,
        "height": 0.2603613177470776
      }
    },
    {
      "id": "change-5",
      "label": "The horn leaf motif curls into a spiral.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.5442583732057417,
        "top": 0.32199787460148777,
        "width": 0.04366028708133971,
        "height": 0.08607863974495218
      }
    }
  ]
},
{
  "id": "v4-dream-362",
  "title": "The Girl Who Mended the Floor",
  "original": "/artwork/v4/collection/dream-362-original-v4.png",
  "altered": "/artwork/v4/collection/dream-362-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "ring",
      "label": "The lower scissors ring becomes angular.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.05562200956937799,
        "top": 0.5876726886291179,
        "width": 0.06638755980861244,
        "height": 0.07332624867162593
      }
    },
    {
      "id": "groove",
      "label": "The chisel handle has a spiral groove.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.12619617224880383,
        "top": 0.6907545164718385,
        "width": 0.07117224880382775,
        "height": 0.12114771519659936
      }
    },
    {
      "id": "lever",
      "label": "The cabinet knob becomes a left lever.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7834928229665071,
        "top": 0.022316684378320937,
        "width": 0.06220095693779904,
        "height": 0.06057385759829968
      }
    },
    {
      "id": "cloth",
      "label": "The stool cloth dangling tip curls into a loop.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.14354066985645933,
        "top": 0.1636556854410202,
        "width": 0.037679425837320576,
        "height": 0.06588735387885228
      }
    },
    {
      "id": "moon",
      "label": "The hidden moon disk has a crescent smile.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.41626794258373206,
        "top": 0.7662061636556854,
        "width": 0.05083732057416268,
        "height": 0.0563230605738576
      }
    }
  ]
},
{
  "id": "v4-dream-363",
  "title": "The Gecko's Heavy Envelope",
  "original": "/artwork/v4/collection/dream-363-original-v4.png",
  "altered": "/artwork/v4/collection/dream-363-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "seal",
      "label": "The wax seal has a spiral relief.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.7248803827751196,
        "top": 0.359192348565356,
        "width": 0.05741626794258373,
        "height": 0.11158342189160468
      }
    },
    {
      "id": "tile",
      "label": "The loose tile center flower becomes a crescent.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.8247607655502392,
        "top": 0.767268862911796,
        "width": 0.13098086124401914,
        "height": 0.11158342189160468
      }
    },
    {
      "id": "key",
      "label": "The loose key bow becomes octagonal.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.0,
        "top": 0.7555791710945803,
        "width": 0.11244019138755981,
        "height": 0.10839532412327312
      }
    },
    {
      "id": "rope",
      "label": "The tabletop rope loop has an overhand knot.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.06758373205741627,
        "top": 0.46971307120085015,
        "width": 0.060406698564593304,
        "height": 0.06269925611052073
      }
    },
    {
      "id": "eye",
      "label": "The gecko eye pupil becomes a horizontal slit.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.2236842105263158,
        "top": 0.27098831030818277,
        "width": 0.02751196172248804,
        "height": 0.030818278427205102
      }
    }
  ]
},
{
  "id": "v4-dream-364",
  "title": "The Cupboard's Last Warm Light",
  "original": "/artwork/v4/collection/dream-364-original-v4.png",
  "altered": "/artwork/v4/collection/dream-364-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "knob",
      "label": "The drawer knob has a crescent print.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.5047846889952153,
        "top": 0.6078639744952179,
        "width": 0.046052631578947366,
        "height": 0.08289054197662062
      }
    },
    {
      "id": "heart",
      "label": "The jewelry box relief becomes a heart.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.4874401913875598,
        "top": 0.09776833156216791,
        "width": 0.03648325358851675,
        "height": 0.05951115834218916
      }
    },
    {
      "id": "cuff",
      "label": "The wool sock cuff folds outward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.19497607655502391,
        "top": 0.6950053134962806,
        "width": 0.09330143540669857,
        "height": 0.09458023379383634
      }
    },
    {
      "id": "lace",
      "label": "The lace tip curls into a loop.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6214114832535885,
        "top": 0.6110520722635494,
        "width": 0.03349282296650718,
        "height": 0.06801275239107332
      }
    },
    {
      "id": "clasp",
      "label": "The chest clasp flips open.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.9330143540669856,
        "top": 0.46546227417640806,
        "width": 0.035287081339712915,
        "height": 0.14133900106269925
      }
    }
  ]
},
{
  "id": "v4-dream-365",
  "title": "The Door We Left Ajar",
  "original": "/artwork/v4/collection/dream-365-original-v4.png",
  "altered": "/artwork/v4/collection/dream-365-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "crescent-moon",
      "label": "The framed moon becomes a crescent.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.30801435406698563,
        "top": 0.08395324123273114,
        "width": 0.03588516746411483,
        "height": 0.06801275239107332
      }
    },
    {
      "id": "open-envelope",
      "label": "The envelope\u2019s flap opens upright.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7811004784688995,
        "top": 0.7789585547290117,
        "width": 0.10705741626794259,
        "height": 0.11689691817215728
      }
    },
    {
      "id": "star-sail",
      "label": "The toy boat\u2019s right sail bears a star.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.1303827751196172,
        "top": 0.6907545164718385,
        "width": 0.019736842105263157,
        "height": 0.048884165781083955
      }
    },
    {
      "id": "square-knob",
      "label": "The foreground door knob becomes square.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.45873205741626794,
        "top": 0.38150903294367694,
        "width": 0.025717703349282296,
        "height": 0.053134962805526036
      }
    },
    {
      "id": "heart-keyhole",
      "label": "The chest latch has a heart-shaped keyhole.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.9007177033492823,
        "top": 0.6748140276301806,
        "width": 0.019138755980861243,
        "height": 0.03400637619553666
      }
    }
  ]
},
{
  "id": "v4-dream-halloween",
  "title": "The Street That Curled into Halloween",
  "original": "/artwork/v4/collection/dream-halloween-original-v4.png",
  "altered": "/artwork/v4/collection/dream-halloween-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "round-mouth",
      "label": "The ghost\u2019s mouth forms a small O.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.23863636363636365,
        "top": 0.3708820403825717,
        "width": 0.025119617224880382,
        "height": 0.040382571732199786
      }
    },
    {
      "id": "curled-tail",
      "label": "The road cat\u2019s tail tip curls downward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7547846889952153,
        "top": 0.32199787460148777,
        "width": 0.028708133971291867,
        "height": 0.07013815090329437
      }
    },
    {
      "id": "crescent-hat",
      "label": "The witch\u2019s hat bears a crescent.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4437799043062201,
        "top": 0.4250797024442083,
        "width": 0.035287081339712915,
        "height": 0.07332624867162593
      }
    },
    {
      "id": "square-knocker",
      "label": "The door knocker becomes square.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.09988038277511961,
        "top": 0.32624867162592985,
        "width": 0.056818181818181816,
        "height": 0.1030818278427205
      }
    },
    {
      "id": "cross-panel",
      "label": "The robot\u2019s brass side panel has an X slot.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.5950956937799043,
        "top": 0.5802337938363443,
        "width": 0.022727272727272728,
        "height": 0.04357066950053135
      }
    }
  ]
},
{
  "id": "v4-dream-christmas",
  "title": "The Elves' First Presents",
  "original": "/artwork/v4/collection/dream-christmas-original-v4.png",
  "altered": "/artwork/v4/collection/dream-christmas-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "awake-cat",
      "label": "The sleeping cat opens one eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.5514354066985646,
        "top": 0.5409139213602551,
        "width": 0.014952153110047847,
        "height": 0.022316684378320937
      }
    },
    {
      "id": "closed-whale",
      "label": "The floating whale closes its eye.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.46710526315789475,
        "top": 0.44208289054197664,
        "width": 0.01555023923444976,
        "height": 0.025504782146652496
      }
    },
    {
      "id": "crescent-stocking",
      "label": "The white stocking bears a crescent.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8761961722488039,
        "top": 0.33156216790648246,
        "width": 0.031698564593301434,
        "height": 0.0818278427205101
      }
    },
    {
      "id": "inverted-tree",
      "label": "The red mug\u2019s tree points downward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.9641148325358851,
        "top": 0.6981934112646121,
        "width": 0.03588516746411483,
        "height": 0.0871413390010627
      }
    },
    {
      "id": "star-flame",
      "label": "The lantern\u2019s flame forms a star.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.8875598086124402,
        "top": 0.17640807651434645,
        "width": 0.01674641148325359,
        "height": 0.04994686503719448
      }
    }
  ]
},
{
  "id": "v4-dream-valentines",
  "title": "The Path Our Shadows Remember",
  "original": "/artwork/v4/collection/dream-valentines-original-v4.png",
  "altered": "/artwork/v4/collection/dream-valentines-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The gift box has a gold star.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.12799043062200957,
        "top": 0.7800212539851222,
        "width": 0.020933014354066987,
        "height": 0.036131774707757705
      }
    },
    {
      "id": "change-2",
      "label": "The key bow has a diagonal bar.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.2230861244019139,
        "top": 0.8065887353878852,
        "width": 0.03349282296650718,
        "height": 0.04250797024442083
      }
    },
    {
      "id": "change-3",
      "label": "The left wax seal has a blue reflection.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.24700956937799043,
        "top": 0.17321997874601489,
        "width": 0.014354066985645933,
        "height": 0.024442082890541977
      }
    },
    {
      "id": "change-4",
      "label": "One boot heel curls inward.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.38098086124401914,
        "top": 0.5398512221041445,
        "width": 0.01375598086124402,
        "height": 0.02975557917109458
      }
    },
    {
      "id": "change-5",
      "label": "The coat gains a button with an X groove.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.4868421052631579,
        "top": 0.24760892667375134,
        "width": 0.012559808612440191,
        "height": 0.024442082890541977
      }
    }
  ]
},
{
  "id": "v4-dream-st-patricks",
  "title": "The Staircase of Lucky Coins",
  "original": "/artwork/v4/collection/dream-st-patricks-original-v4.png",
  "altered": "/artwork/v4/collection/dream-st-patricks-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The held mug has a blue crescent reflection.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.47607655502392343,
        "top": 0.1997874601487779,
        "width": 0.034688995215311005,
        "height": 0.04250797024442083
      }
    },
    {
      "id": "change-2",
      "label": "The left pot handle becomes triangular.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.3672248803827751,
        "top": 0.5079702444208289,
        "width": 0.039473684210526314,
        "height": 0.07226354941551541
      }
    },
    {
      "id": "change-3",
      "label": "The door pull curls inward.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5472488038277512,
        "top": 0.6450584484590861,
        "width": 0.01674641148325359,
        "height": 0.03719447396386823
      }
    },
    {
      "id": "change-4",
      "label": "One foreground coin has a star.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.562200956937799,
        "top": 0.7460148777895855,
        "width": 0.025717703349282296,
        "height": 0.028692879914984058
      }
    },
    {
      "id": "change-5",
      "label": "The front shoe buckle has a diagonal bar.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.3026315789473684,
        "top": 0.691817215727949,
        "width": 0.03110047846889952,
        "height": 0.04250797024442083
      }
    }
  ]
},
{
  "id": "v4-dream-independence",
  "title": "Fireworks Beneath the Water",
  "original": "/artwork/v4/collection/dream-independence-original-v4.png",
  "altered": "/artwork/v4/collection/dream-independence-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The lantern has crossed diagonal lattice bars.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.0735645933014354,
        "top": 0.6482465462274176,
        "width": 0.02452153110047847,
        "height": 0.09564293304994687
      }
    },
    {
      "id": "change-2",
      "label": "The pitcher handle curls inward.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.37799043062200954,
        "top": 0.6896918172157279,
        "width": 0.023923444976076555,
        "height": 0.07013815090329437
      }
    },
    {
      "id": "change-3",
      "label": "The front post top has a gold ring reflection.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.2793062200956938,
        "top": 0.8267800212539851,
        "width": 0.05442583732057416,
        "height": 0.03400637619553666
      }
    },
    {
      "id": "change-4",
      "label": "The rightmost cup has a blue star.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.41208133971291866,
        "top": 0.7555791710945803,
        "width": 0.017344497607655503,
        "height": 0.028692879914984058
      }
    },
    {
      "id": "change-5",
      "label": "The picnic basket clasp has an X groove.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.26973684210526316,
        "top": 0.7024442082890542,
        "width": 0.014354066985645933,
        "height": 0.03400637619553666
      }
    }
  ]
},
{
  "id": "v4-dream-veterans",
  "title": "The Long Way Home",
  "original": "/artwork/v4/collection/dream-veterans-original-v4.png",
  "altered": "/artwork/v4/collection/dream-veterans-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "closed-eye",
      "label": "The puppy closes one eye.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.6028708133971292,
        "top": 0.3485653560042508,
        "width": 0.026913875598086126,
        "height": 0.03719447396386823
      }
    },
    {
      "id": "left-clapper",
      "label": "The porch bell\u2019s clapper swings left.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.652511961722488,
        "top": 0.16578108395324123,
        "width": 0.03409090909090909,
        "height": 0.04569606801275239
      }
    },
    {
      "id": "crescent-bowl",
      "label": "The water bowl bears a teal crescent.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.125,
        "top": 0.7470775770456961,
        "width": 0.03708133971291866,
        "height": 0.07863974495217853
      }
    },
    {
      "id": "heart-tag",
      "label": "The puppy\u2019s collar tag becomes a heart.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.5849282296650717,
        "top": 0.48034006376195537,
        "width": 0.02631578947368421,
        "height": 0.04675876726886291
      }
    },
    {
      "id": "star-flame",
      "label": "The lantern\u2019s candle flame forms a star.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.930622009569378,
        "top": 0.8129649309245484,
        "width": 0.02930622009569378,
        "height": 0.061636556854410204
      }
    }
  ]
},
{
  "id": "v4-dream-thanksgiving",
  "title": "The Turkeys' Harvest Feast",
  "original": "/artwork/v4/collection/dream-thanksgiving-original-v4.png",
  "altered": "/artwork/v4/collection/dream-thanksgiving-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "spoon-raised",
      "label": "The cranberry spoon handle rises steeply.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.6429425837320574,
        "top": 0.565356004250797,
        "width": 0.07117224880382775,
        "height": 0.1030818278427205
      },
      "source": "/artwork/v4/collection/dream-thanksgiving-spoon-assembled-source-v4.png"
    },
    {
      "id": "gravy-heart",
      "label": "The gravy boat handle forms a heart.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.3050239234449761,
        "top": 0.7077577045696068,
        "width": 0.028708133971291867,
        "height": 0.05844845908607864
      }
    },
    {
      "id": "pastry-curl",
      "label": "The central pastry leaf curls its tip.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5,
        "top": 0.6057385759829969,
        "width": 0.03229665071770335,
        "height": 0.06376195536663125
      }
    },
    {
      "id": "young-eye",
      "label": "The youngest turkey closes its eye.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.7302631578947368,
        "top": 0.32199787460148777,
        "width": 0.028708133971291867,
        "height": 0.04994686503719448
      }
    },
    {
      "id": "brooch-star",
      "label": "Grandma's brooch is a six-pointed star.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.23145933014354067,
        "top": 0.3517534537725824,
        "width": 0.02452153110047847,
        "height": 0.04782146652497343
      }
    }
  ]
},
{
  "id": "v4-dream-easter",
  "title": "The Garden Inside the Egg",
  "original": "/artwork/v4/collection/dream-easter-original-v4.png",
  "altered": "/artwork/v4/collection/dream-easter-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "wheel-three",
      "label": "The cart wheel has three spokes.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.8086124401913876,
        "top": 0.824654622741764,
        "width": 0.09868421052631579,
        "height": 0.1689691817215728
      }
    },
    {
      "id": "egg-crescents",
      "label": "The purple egg bears cream crescents.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.6297846889952153,
        "top": 0.8629117959617428,
        "width": 0.06698564593301436,
        "height": 0.13708820403825717
      }
    },
    {
      "id": "door-closes",
      "label": "The wooden egg-house door swings toward the opening.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.8092105263157895,
        "top": 0.4920297555791711,
        "width": 0.0861244019138756,
        "height": 0.20191285866099895
      },
      "source": "/artwork/v4/collection/dream-easter-door-assembled-source-v4.png"
    },
    {
      "id": "rabbit-wink",
      "label": "The rabbit closes its rightmost eye.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.6010765550239234,
        "top": 0.21360255047821466,
        "width": 0.022129186602870814,
        "height": 0.04250797024442083
      }
    },
    {
      "id": "bow-fold",
      "label": "The basket bow's right loop folds inward.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.15011961722488038,
        "top": 0.6397449521785334,
        "width": 0.03289473684210526,
        "height": 0.06482465462274177
      }
    }
  ]
},
{
  "id": "v4-dream-memorial",
  "title": "The Light We Keep",
  "original": "/artwork/v4/collection/dream-memorial-original-v4.png",
  "altered": "/artwork/v4/collection/dream-memorial-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "chair",
      "label": "The chair opening becomes pointed.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.14055023923444976,
        "top": 0.17321997874601489,
        "width": 0.07177033492822966,
        "height": 0.19553666312433582
      }
    },
    {
      "id": "shawl",
      "label": "The shawl corner curls upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.3199760765550239,
        "top": 0.7236981934112646,
        "width": 0.08552631578947369,
        "height": 0.2518597236981934
      }
    },
    {
      "id": "lily",
      "label": "The nearest lily petals fold inward.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8068181818181818,
        "top": 0.8012752391073327,
        "width": 0.0735645933014354,
        "height": 0.10520722635494155
      }
    },
    {
      "id": "ring",
      "label": "The lantern carrying ring becomes diamond-shaped.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4461722488038278,
        "top": 0.22104144527098832,
        "width": 0.04007177033492823,
        "height": 0.06801275239107332
      }
    },
    {
      "id": "clasp",
      "label": "The keepsake clasp flips upward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.39055023923444976,
        "top": 0.4952178533475027,
        "width": 0.02332535885167464,
        "height": 0.06801275239107332
      }
    }
  ]
},
{
  "id": "v4-dream-juneteenth",
  "title": "The Door That Became the Horizon",
  "original": "/artwork/v4/collection/dream-juneteenth-original-v4.png",
  "altered": "/artwork/v4/collection/dream-juneteenth-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "quilt",
      "label": "The quilt crescent becomes a sun.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.6172248803827751,
        "top": 0.7332624867162593,
        "width": 0.09090909090909091,
        "height": 0.14452709883103082
      }
    },
    {
      "id": "kite",
      "label": "The blue kite star has a heart-shaped center.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7900717703349283,
        "top": 0.12327311370882041,
        "width": 0.05083732057416268,
        "height": 0.08501594048884166
      }
    },
    {
      "id": "key",
      "label": "The key bow becomes diamond-shaped.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.17643540669856458,
        "top": 0.8023379383634431,
        "width": 0.05562200956937799,
        "height": 0.07545164718384698
      }
    },
    {
      "id": "clasp",
      "label": "The chest clasp flips upward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.19557416267942584,
        "top": 0.6631243358129649,
        "width": 0.042464114832535885,
        "height": 0.09670563230605739
      }
    },
    {
      "id": "handle",
      "label": "The door handle curls upward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.3038277511961722,
        "top": 0.3846971307120085,
        "width": 0.03827751196172249,
        "height": 0.0669500531349628
      }
    }
  ]
},
{
  "id": "v4-dream-october-observance",
  "title": "The River Inside a Leaf",
  "original": "/artwork/v4/collection/dream-october-observance-original-v4.png",
  "altered": "/artwork/v4/collection/dream-october-observance-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "lid",
      "label": "The seed-box lid motif becomes an acorn.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.02631578947368421,
        "top": 0.5844845908607864,
        "width": 0.1291866028708134,
        "height": 0.11370882040382571
      }
    },
    {
      "id": "sail",
      "label": "The boat sail billows left.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.5616028708133971,
        "top": 0.24229543039319873,
        "width": 0.04904306220095694,
        "height": 0.10520722635494155
      }
    },
    {
      "id": "rose",
      "label": "The can spout has a perforated watering rose.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.2242822966507177,
        "top": 0.4442082890541977,
        "width": 0.046052631578947366,
        "height": 0.08076514346439957
      }
    },
    {
      "id": "handle",
      "label": "The mug handle becomes triangular.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.37559808612440193,
        "top": 0.7778958554729012,
        "width": 0.037679425837320576,
        "height": 0.09032943676939426
      }
    },
    {
      "id": "latch",
      "label": "The seed box latch flips upward.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.18660287081339713,
        "top": 0.8002125398512221,
        "width": 0.03409090909090909,
        "height": 0.05951115834218916
      }
    }
  ]
},
{
  "id": "v4-dream-new-years-eve",
  "title": "The Midnight Ball That Became a Planet",
  "original": "/artwork/v4/collection/dream-new-years-eve-original-v4.png",
  "altered": "/artwork/v4/collection/dream-new-years-eve-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The DJ earcup star becomes a crescent.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.04844497607655503,
        "top": 0.41445270988310307,
        "width": 0.0430622009569378,
        "height": 0.0818278427205101
      }
    },
    {
      "id": "change-2",
      "label": "The long clock hand bends into a hook.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.6064593301435407,
        "top": 0.22741764080765142,
        "width": 0.05263157894736842,
        "height": 0.1647183846971307
      }
    },
    {
      "id": "change-3",
      "label": "The party horn spiral opens into a hook.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7230861244019139,
        "top": 0.3007438894792774,
        "width": 0.04485645933014354,
        "height": 0.08820403825717323
      }
    },
    {
      "id": "change-4",
      "label": "The purple hat-tip ornament becomes a heart.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.3415071770334928,
        "top": 0.31668437832093516,
        "width": 0.03409090909090909,
        "height": 0.05844845908607864
      }
    },
    {
      "id": "change-5",
      "label": "One bow-tie star becomes a crescent.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.5657894736842105,
        "top": 0.6344314558979809,
        "width": 0.019736842105263157,
        "height": 0.028692879914984058
      }
    }
  ]
},
{
  "id": "v4-dream-mlk",
  "title": "The Bridge We Make Together",
  "original": "/artwork/v4/collection/dream-mlk-original-v4.png",
  "altered": "/artwork/v4/collection/dream-mlk-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The boat's central fold bends forward.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.6584928229665071,
        "top": 0.7003188097768331,
        "width": 0.04844497607655503,
        "height": 0.09351753453772582
      }
    },
    {
      "id": "change-2",
      "label": "The teal door knob becomes a crescent lever.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.8744019138755981,
        "top": 0.2614240170031881,
        "width": 0.03409090909090909,
        "height": 0.044633368756641874
      }
    },
    {
      "id": "change-3",
      "label": "The paperclip opens at its upper end.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.9156698564593302,
        "top": 0.5855472901168969,
        "width": 0.06818181818181818,
        "height": 0.07863974495217853
      }
    },
    {
      "id": "change-4",
      "label": "The lantern carrying ring spirals inward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.14952153110047847,
        "top": 0.1487778958554729,
        "width": 0.037679425837320576,
        "height": 0.0669500531349628
      }
    },
    {
      "id": "change-5",
      "label": "The spool core aperture becomes a heart.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.042464114832535885,
        "top": 0.09883103081827843,
        "width": 0.038875598086124404,
        "height": 0.03400637619553666
      }
    }
  ]
},
{
  "id": "v4-dream-presidents",
  "title": "The Library of Impossible Pages",
  "original": "/artwork/v4/collection/dream-presidents-original-v4.png",
  "altered": "/artwork/v4/collection/dream-presidents-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The inkwell lid lowers toward closing.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.030502392344497607,
        "top": 0.6291179596174282,
        "width": 0.0819377990430622,
        "height": 0.12327311370882041
      }
    },
    {
      "id": "change-2",
      "label": "The white quill tip curls upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.17882775119617225,
        "top": 0.7460148777895855,
        "width": 0.08433014354066985,
        "height": 0.09032943676939426
      }
    },
    {
      "id": "change-3",
      "label": "The book's gold branch curls into a spiral.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.24760765550239233,
        "top": 0.5334750265674814,
        "width": 0.046052631578947366,
        "height": 0.11902231668437832
      }
    },
    {
      "id": "change-4",
      "label": "The bookmark plate bears a crescent.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6297846889952153,
        "top": 0.6780021253985122,
        "width": 0.05263157894736842,
        "height": 0.08289054197662062
      }
    },
    {
      "id": "change-5",
      "label": "The lamp pull weight becomes a heart.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.9270334928229665,
        "top": 0.4495217853347503,
        "width": 0.02631578947368421,
        "height": 0.04994686503719448
      }
    }
  ]
},
{
  "id": "v4-dream-mothers",
  "title": "The Home Inside Her Card",
  "original": "/artwork/v4/collection/dream-mothers-original-v4.png",
  "altered": "/artwork/v4/collection/dream-mothers-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "jam-spiral",
      "label": "The toast jam forms a spiral.",
      "difficulty": "Easy",
      "edgeFade": 4,
      "box": {
        "left": 0.28827751196172247,
        "top": 0.6737513283740701,
        "width": 0.060406698564593304,
        "height": 0.04357066950053135
      }
    },
    {
      "id": "cup-heart",
      "label": "The teacup handle forms a heart.",
      "difficulty": "Medium",
      "edgeFade": 4,
      "box": {
        "left": 0.458133971291866,
        "top": 0.6354941551540914,
        "width": 0.03648325358851675,
        "height": 0.06907545164718384
      }
    },
    {
      "id": "door-ajar",
      "label": "The floating house's heart door opens slightly.",
      "difficulty": "Hard",
      "edgeFade": 4,
      "box": {
        "left": 0.49760765550239233,
        "top": 0.26567481402763016,
        "width": 0.028708133971291867,
        "height": 0.08395324123273114
      }
    },
    {
      "id": "bow-fold",
      "label": "The gift bow's left loop folds inward.",
      "difficulty": "Very hard",
      "edgeFade": 4,
      "box": {
        "left": 0.5358851674641149,
        "top": 0.7534537725823592,
        "width": 0.05083732057416268,
        "height": 0.07332624867162593
      }
    },
    {
      "id": "cat-awake",
      "label": "The cat opens its leftmost eye.",
      "difficulty": "Dreamlike",
      "edgeFade": 4,
      "box": {
        "left": 0.08971291866028708,
        "top": 0.5143464399574921,
        "width": 0.019736842105263157,
        "height": 0.030818278427205102
      }
    }
  ]
},
{
  "id": "v4-dream-358",
  "title": "The Dancer with Two Left Shadows",
  "original": "/artwork/v4/collection/dream-358-original-v4.png",
  "altered": "/artwork/v4/collection/dream-358-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The floor ribbon's free end threads through its own knot.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.2494019138755981,
        "top": 0.895855472901169,
        "width": 0.10287081339712918,
        "height": 0.06801275239107332
      }
    },
    {
      "id": "change-2",
      "label": "The curtain tassel's fringe passes through its own loop.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.025717703349282296,
        "top": 0.35600425079702447,
        "width": 0.041866028708133975,
        "height": 0.10839532412327312
      }
    },
    {
      "id": "change-3",
      "label": "One lower gold star on the ball becomes a spiral emblem.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.8606459330143541,
        "top": 0.6769394261424017,
        "width": 0.049641148325358854,
        "height": 0.0924548352816153
      }
    },
    {
      "id": "change-4",
      "label": "The mandolin wooden face bears an incised compass rose.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.07057416267942583,
        "top": 0.8161530286928799,
        "width": 0.03409090909090909,
        "height": 0.05844845908607864
      }
    },
    {
      "id": "change-5",
      "label": "The left chest's latch swings open.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.023923444976076555,
        "top": 0.5738575982996812,
        "width": 0.0430622009569378,
        "height": 0.053134962805526036
      }
    }
  ]
},
{
  "id": "v4-dream-labor",
  "title": "The Workshop That Fixed Monday",
  "original": "/artwork/v4/collection/dream-labor-original-v4.png",
  "altered": "/artwork/v4/collection/dream-labor-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The wrench upper jaw closes into a ring.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.201555023923445,
        "top": 0.4760892667375133,
        "width": 0.05442583732057416,
        "height": 0.11158342189160468
      }
    },
    {
      "id": "change-2",
      "label": "The crane hook opens at its right side.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.7733253588516746,
        "top": 0.14027630180658873,
        "width": 0.045454545454545456,
        "height": 0.09883103081827843
      }
    },
    {
      "id": "change-3",
      "label": "The teal helmet gear badge becomes a crescent.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.4318181818181818,
        "top": 0.31137088204038255,
        "width": 0.02332535885167464,
        "height": 0.04569606801275239
      }
    },
    {
      "id": "change-4",
      "label": "The cream robot's right eye winks.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.6435406698564593,
        "top": 0.5685441020191286,
        "width": 0.0215311004784689,
        "height": 0.03719447396386823
      }
    },
    {
      "id": "change-5",
      "label": "The red toolbox front latch turns sideways.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.854066985645933,
        "top": 0.7853347502656748,
        "width": 0.031698564593301434,
        "height": 0.0563230605738576
      }
    }
  ]
},
{
  "id": "v4-dream-fathers",
  "title": "Dad's Kite Could Carry a Lake",
  "original": "/artwork/v4/collection/dream-fathers-original-v4.png",
  "altered": "/artwork/v4/collection/dream-fathers-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "scarf",
      "label": "Dad's loose scarf end curls upward.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.11602870813397129,
        "top": 0.39213602550478216,
        "width": 0.11064593301435406,
        "height": 0.22848034006376194
      }
    },
    {
      "id": "card",
      "label": "The cub card paw print becomes a star.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.4838516746411483,
        "top": 0.5727948990435706,
        "width": 0.03229665071770335,
        "height": 0.06588735387885228
      }
    },
    {
      "id": "mug",
      "label": "The mug pine print becomes an oak leaf.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.06698564593301436,
        "top": 0.7311370882040382,
        "width": 0.03289473684210526,
        "height": 0.06588735387885228
      }
    },
    {
      "id": "sail",
      "label": "The boat left sail billows outward.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.7236842105263158,
        "top": 0.09883103081827843,
        "width": 0.045454545454545456,
        "height": 0.07013815090329437
      }
    },
    {
      "id": "bird",
      "label": "The high seagull raises its wings.",
      "difficulty": "Dreamlike",
      "edgeFade": 1,
      "box": {
        "left": 0.8139952153110048,
        "top": 0.008501594048884165,
        "width": 0.04366028708133971,
        "height": 0.04994686503719448
      }
    }
  ]
},
{
  "id": "v4-dream-new-years",
  "title": "The Year Unrolls at Dawn",
  "original": "/artwork/v4/collection/dream-new-years-original-v4.png",
  "altered": "/artwork/v4/collection/dream-new-years-altered-source-v4.png",
  "aspectRatio": 1672 / 941,
  "edits": [
    {
      "id": "change-1",
      "label": "The wall lantern's glass door hinges open to the left.",
      "difficulty": "Easy",
      "edgeFade": 3,
      "box": {
        "left": 0.22188995215311005,
        "top": 0.06376195536663125,
        "width": 0.0861244019138756,
        "height": 0.1636556854410202
      }
    },
    {
      "id": "change-2",
      "label": "The first winter calendar panel's upper right corner curls upward.",
      "difficulty": "Medium",
      "edgeFade": 3,
      "box": {
        "left": 0.4366028708133971,
        "top": 0.008501594048884165,
        "width": 0.046052631578947366,
        "height": 0.12327311370882041
      }
    },
    {
      "id": "change-3",
      "label": "The chair's gold party hat tip curls into a hollow lip.",
      "difficulty": "Hard",
      "edgeFade": 3,
      "box": {
        "left": 0.09868421052631579,
        "top": 0.7098831030818279,
        "width": 0.038875598086124404,
        "height": 0.0818278427205101
      }
    },
    {
      "id": "change-4",
      "label": "The door knocker's ring forms a continuous figure eight.",
      "difficulty": "Very hard",
      "edgeFade": 3,
      "box": {
        "left": 0.0430622009569378,
        "top": 0.10095642933049948,
        "width": 0.037679425837320576,
        "height": 0.09989373007438895
      }
    },
    {
      "id": "change-5",
      "label": "The party horn bell's inner reflection changes from a spiral to a crescent.",
      "difficulty": "Dreamlike",
      "edgeFade": 3,
      "box": {
        "left": 0.4485645933014354,
        "top": 0.28480340063761955,
        "width": 0.03409090909090909,
        "height": 0.06269925611052073
      }
    }
  ]
}]
