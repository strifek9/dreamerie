# Dreamerie art direction

## Current V2 collection — September 25, 2026

The user approved all 120 new landscape pairs as playable daily puzzles, followed by commit, push and deployment to the existing V2 site. This supersedes the historical single-sample/practice milestones below. V1 and the sample assets/data remain preserved.

The runtime catalogue contains 120 native-resolution pairs with five visually reviewed, scene-fitting changes each. Only authored edited regions are overlaid on the untouched original. See [collection QA](artwork/V2_COLLECTION_PROGRESS.md), [final answer audit](artwork/V2_PLAYABLE_AUDIT.json) and [source provenance](artwork/V2_COLLECTION_MANIFEST.json). Difficulty remains an editorial estimate, not measured player performance.

Use the local calendar for one daily card (September 24, 2026 = day 1), wrapping artwork after 120 days with independent per-date attempts. Keep the open round's date fixed until reload. The new collection has its own storage namespace; never erase V1 or previous sample attempts. Review/card overrides and New day are development-only, in-memory controls.

No practice round, no pause: optional ? instructions, exactly five confirmed guesses total, two minutes, circle-overlap hit detection, accuracy first and whole-second time only for ties. Keep both landscape paintings stacked with synchronized zoom/pan and controls outside the artwork. Results reveal all five answers, allow fitted-image page scrolling, and share score/time without spoilers. Preserve the established painterly style and full-resolution PNGs; no new infrastructure or dependencies.

All 38 automated tests, typecheck and build pass. Final browser/deployment verification is recorded in the collection QA and hosting documents. Physical touch gestures and human difficulty calibration remain owner acceptance checks.

## Historical milestones (superseded where they conflict with the collection above)

## V2 landscape art and interface

Answer-review scrolling: at fitted size, gestures starting on either painting scroll the page normally, including wheel/trackpad scrolling. Use the existing + control to enter synchronized detail inspection; Fit or zooming out to 100% restores page scrolling. Explain this with a short contextual hint. Do not change active-round or V1 gestures.

Publication update: the refinement below is now live on the separate V2 site at commit `60ea989`, following explicit user approval. See `docs/HOSTING.md` (or `HOSTING.md` from this directory) for verification; earlier awaiting-publication/practice wording is historical. V1 remains unchanged.

Current refinement: remove the practice round completely. Start is immediately available after artwork loads, with no practice gate or completion flag. A small ? / How to play button opens concise instructions in a keyboard-accessible dialog before or during play. Help never starts, pauses or resets the timer, or changes guesses; it shows the active remaining time and closes on expiry. Remove unused landing bottom padding and use the visible dynamic viewport height for V2, without V1's larger 100vh body floor. Keep scrolling for real overflow (results, enlarged text and small help dialogs), not empty background. V1 is unaffected. Older practice wording below is historical; this local refinement awaits publication.

The current card collection is the visual reference, not something to replace stylistically. Preserve painterly gouache/paper texture, rich varied color, symbolic surreal compositions, simplified readable silhouettes, and the existing storybook feeling. Recompose for a wide frame rather than stretching or cropping portrait cards. This prototype uses card-001 as a style reference for a new scene, A Sea in a Teacup.

Keep both original-resolution 1672×941 PNGs in `public/artwork/v2/`, with prompts and provenance. Do not artificially upscale and call it extra detail, or reduce them to thumbnails. Inspect the smallest clue at zoom. Five scene-fitting edits: full moon to crescent, red sails to gold, one fewer bell flower, one fewer lantern crossbar, star engraving to crescent. Only declared regions from the edited source are composited onto the original; all other pixels stay unchanged. Review boundaries and difficulty with people before more artwork.

The V2 interface stacks the pair, shares pan/zoom, and keeps controls off the paintings. A short native-vector practice is instructional UI only, not replacement game artwork. Plain-language essentials take priority over dreamy copy when explaining guesses and time. Keep the existing reverie poem and understated typography. No pause affordance; Home shows the live remaining time. V1 design instructions below still describe the public release.


## Daily Dream Recall direction

Make the Dreamerie wordmark a keyboard-accessible home link without changing its quiet styling. Returning home preserves the attempt; show Resume or View result as appropriate. Capitalize the result-caption colors: **Found · Green**, **Missed · Red**.

**Latest landing polish:** let the untimed painting itself open the viewer and toggle zoom on click/tap; no selection ring, extra Expand button or zoom toolbar in this preview. Bold **remember** in the short rules. Keep the generous painting size and scrolling poem, but anchor Start to the viewport bottom on narrow or short screens with safe-area padding and a restrained gradient. Place X just above the painting's top-right edge, not the far corner of the page or over a clue. Use **The Dream** and **The Memory** for the pair. Saved results replace Dream again with one quiet line saying a new dream awaits tomorrow. This overrides conflicting earlier control placement below.

**Current inspection direction:** keep the comparison page quiet, with one short hint and a restrained, labeled Expand control on each card. Opening the image reveals an edge-to-edge night-colored viewer: uncropped fitted painting, a clearly reachable X, a compact zoom toolbar below, and timer/Remember only during play. Controls occupy their own space rather than covering details. Native modal focus containment and Escape support are required; restore focus and page position on close. Keep page scrolling separate from artwork pan/zoom. Use a simple side-by-side layout whenever width allows it (including portrait tablets above 40rem), stacking only narrow portrait screens. No swipe/flicker comparison or competing panel chrome. This replaces the earlier inline synchronized-zoom guidance below.

The current experience should feel like opening two windows onto the same half-remembered night: quiet, strange, spacious, and intimate. Both artworks occupy most of the screen. Deep indigo surroundings, moonlit ivory, dusty violet, and restrained rose support the pair without turning the interface into a dashboard.

Use generous negative space, one elegant display face, one highly readable sans-serif face, and very little copy. Controls float lightly and remain unmistakable. A pending guess is a luminous ring; found memories become calm checked rings; false memories remain visible but subdued. Nothing should encourage rapid tapping.

The original and altered views share the same composition and dimensions. Exactly five recognizable object details change: for example a blue bow becomes red, two gold buttons become four matching buttons, a glove gains a finger, or an existing moon changes color. Preserve each card's own palette, brushwork, lighting, silhouettes, and visual logic. The red bow and gold buttons are successful examples, not a required palette or formula for every card. Choose interesting details that belong to each individual scene: facial expression, fabric pattern, flower anatomy, architecture, missing components, and celestial motifs. Do not add random props that feel unrelated to the card. Do not substitute circular discoloration, generic filters, or tiny low-contrast artifacts for real answers.

Use a progression from obvious object edits to small, meaningful details. Difficulty should come from observation and scale, not ambiguous damage to the painting. Review generated changes before including a card in rotation; all 120 cards now have authored pairs. The answer ledger in `ARTWORK_REVIEW.md` records the final accepted descriptions; difficulty is an editorial estimate, not playtest calibration. Composite only the five declared edited regions onto the original so everything outside remains identical. Small nested details have hit priority over their enclosing object, including on repeat guesses. Hit regions are normalized to the artwork so they stay aligned through responsive sizing and zoom. Markers must not hide large portions of the image.

At the end, show found regions in green only on the original image (top/left) and missed regions in soft red only on the changed image (bottom/right), with matching numbered descriptions and Found/Missed labels. Keep outlines thin, interiors transparent, and number badges just above the regions. Fade the whole marker, including the badge, completely out and back in over a calm six-second cycle. Keep zoom and a Hide markers control available. With reduced motion, use static outlines and manual hiding. Do not fade the artwork or written explanations.

The opening makes the day's original painting its main focal point. Group the Dreamerie wordmark directly above the small day-number heading and artwork, rather than leaving a detached site header at the top. On phones, show a large uncropped card (up to 20rem wide) followed by the user's reverie poem, short rules and Start. On desktop, grow the painting up to 29rem wide (bounded by viewport height) and place the poem and Start alongside it. Allow normal vertical scrolling on small screens; never shrink the artwork back to a thumbnail just to fit all copy. Landing-page development controls sit below the main composition. The original-card preview is untimed; never show the altered art or answer markers there. Results use five small violet/dark square tiles with check/dash cues, not color alone, and light Share/Copy controls above the answer explanations. Keep the complete text share in an expandable preview rather than repeating it across the screen.

The opening may fade gently into the game, but both images stay stationary during play. Marker breathing and zoom easing are subtle and reduced-motion aware. Phone portrait stacks two large images vertically; landscape and desktop keep them side by side. Never alternate, swipe-swap or flicker the images. Retain synchronized zoom and artwork-relative pan through rotation. Use compact sticky controls and a reachable Remember action, with a subtle “Turn sideways for a wider view” hint. At 100%, touch movement scrolls; after zooming, dragging pans and Reset restores scrolling. The pending circle occupies 8% of artwork width on all devices and grows with zoom; its entire area is its hit footprint, not its center or decorative glow. No extra invisible mobile-only allowance.

The prior broad card-deck and social-room direction remains historical reference for `prototype/social-dreams`, not guidance for the primary prototype below.

## Historical social-mode art direction

## Identity

Dreamerie should feel like an illustrated dream journal, surreal gallery, or quiet nighttime storybook: artistic, mysterious, calm, whimsical, slightly magical, and emotionally evocative. Develop an original identity; do not imitate the exact style of an existing commercial game.

Artwork is the star. UI provides enough structure to choose, remember, and recognize images while leaving room for personal interpretation.

### Confirmed visual refresh

The user requested 120 actual illustrated art cards and a richer, magical interface. Their supplied references combine expressive storybook characters with decorative fantasy shapes and textured painted surfaces. Keep the work stylized and two-dimensional, never hyperrealistic or rendered like a photograph. Dixit is inspiration for open-ended visual storytelling; create original imagery rather than recreating its cards.

Variety is essential. Include joyful, sad, funny, tender, lonely, restless, eerie, hopeful and bittersweet scenes. Use a wide spectrum of colors: vivid primaries, pinks, greens, oranges, purples, luminous pastels, pale compositions and darker paintings. No single palette should dominate the whole deck. Emotional notes guide art production, not categories, labels or correct gameplay answers.

Mix readable surreal scenes with more abstract and confusing art: impossible perspective, shifting scale, ambiguous silhouettes, fragmented shapes, unexpected empty space, and objects transforming into one another. Some cards can feel unresolved or contradictory. Avoid making all images literal, cute, densely decorated or comforting. Each image should support several interpretations.

The welcome scene is a separate blue-and-purple painted dreamscape: an impossible doorway, cloud stairs and a creature asleep on the moon. It is never part of the dealt deck.

The surrounding interface uses muted periwinkle surfaces, deep indigo, violet and restrained gold ornament. Its stable palette supports the deck's much broader colors. Give the artwork room; decorative details must not hide choices or compete with the images.

## Symbolism and ambiguity

An image should plausibly evoke several concepts. Meaning comes from the player's choice rather than an obvious answer printed into the illustration. Favor unusual relationships, impossible spaces, symbolic scale, ambiguous memories, and emotionally suggestive details.

| Strong conceptual image | Possible associations |
| --- | --- |
| A child beside an elderly version of themselves | TIME, CHANGE, CHILDHOOD, LOVE |
| Leaves falling upward | TIME, FREEDOM, CHANGE |
| A house disappearing into the ocean | HOME, LOSS, MEMORY, FEAR |
| A person carrying pieces of the moon | LOVE, HOPE, BURDEN, FREEDOM |
| An empty swing casting an adult's shadow | CHILDHOOD, TIME, MEMORY, LOSS |
| A doorway into an old childhood bedroom | HOME, MEMORY, CHANGE |

Avoid relying on a clock for TIME, heart icon for LOVE, labeled house for HOME, or padlock for FEAR. These objects can appear in richer ambiguous compositions, but should not dictate a single obvious interpretation. Avoid concept names, answer labels, or ownership hints in artwork.

## Shared play presentation

Show the creator's chosen mode and a short scoring explanation before an invitee joins. Word of the Day is the default card-only room mode. Explain that six Dreams are prepared today for six later guessing days. Personal preparation offers examples mixing words and phrases. Show personal clues on a restrained periwinkle clue card, with **Which was [name]'s Dream?** as the guessing question. This replaces the older possessive clue heading.

A small book/page cue may animate above preparation prompts when the next Dream opens. Animate only the decorative leaf, never the gallery, and disable the animation for reduced-motion preferences. Keep progress understandable without motion. Hints and results must distinguish ranked-only Word of the Day awards from personal-mode guessing and recognition points.

Show the room's authoritative cutoff near the host controls as a date and **12:00 AM · Chicago time**, with phase-specific wording for preparation, next-day opening or week ending. Keep space reserved and avoid a ticking countdown that distracts from the artwork. Explain that deadlines reveal and advance automatically, and keep earlier results inspectable when a player returns after rollover.

Private rooms use actual display names and the six stable roster accents; Nancy and Song belong only to explicitly labeled solo practice. Keep readiness compact and expandable, with host progression in the header. Saving feedback follows server acceptance; uncertain saves offer a deliberate retry. Explain early closure and zero missed-day points clearly without exposing future clues or implying that disconnecting alone loses a day.

Keep the host's permanent room-close action below gameplay, separate from daily reveal/progression. A focused confirmation defaults to “Keep dreaming,” supports Escape and explains that only revealed results remain for seven days; stale confirmations require review. Closed rooms retain inspectable revealed cards. Expired rooms say “This room has faded.” and offer “Gather in another room,” without stale gameplay controls. Show lobby/recap expiry compactly in Chicago time. A lost session must explain that the old seat cannot be recovered; temporary disconnection must preserve accepted choices.

Keep the same six cards stationary through locks, unlocks and reveal. Results remain above the board; long clues/results may scroll inside the reserved, keyboard-accessible summary area. After reveal, label actual Dreams even when the player left that guess unanswered. Decoys remain indistinguishable until reveal. Personal recaps include inspectable cards and explicit missed-day results.

## Artwork-first UI

- Use restrained surfaces, generous spacing, and readable typography.
- Use deep indigo surroundings, muted periwinkle surfaces, violet accents and restrained gold details with sufficient contrast. Keep the card palette much broader than the interface palette.
- Let images carry richness and color. Avoid bright arcade styling, dense dashboards, excess buttons/panels, a technology-heavy appearance, and gratuitous gradients.
- Frame cards consistently without cropping defining details. Clear selection/lock markers should not cover important artwork.
- Keep unnecessary scores/statistics away from the selection experience; results belong in reveal/completion states.

## Mobile presentation

Design at phone width first. A two-column, three-row six-card gallery is a useful starting exploration, not a fixed rule. Verify that images remain appreciable on small screens. Allow scrolling rather than shrinking everything to fit one viewport. Consider deliberate inspection before commitment.

All primary actions work by tapping with comfortable targets and no hover dependence. Keyboard focus, selection, availability, and locked states must be understandable. Separate image inspection from commitment. Progressively enhance galleries and spacing for tablet/desktop.

Use concise visual descriptions for accessibility without prescribing image meaning or revealing answers. Correctness and locks need text/symbols as well as color. Keep surrounding text short so artwork stays prominent. Reserve space for selection, ownership and lock labels and unlock controls: marking or clearing a choice must not move the cards. Preserve scroll position as prompts change. Keep confirmation and the current prompt within reach while browsing, with enough scroll clearance for keyboard focus. Compact the overview and spacing before reducing image sizes. Use three larger cards per row on tablet and desktop, and two on phones. Keep the confirmation button compact and centered. Place an always-visible, keyboard-accessible magnifier beneath each image, outside its artwork. Holding for about half a second and releasing may also inspect; scrolling or a cancelled pointer must cancel that gesture. Inspection must preserve any tentative selection and return focus and scroll position on close. A hold is an optional shortcut, never the only route to inspection.

## UI writing

Refer to player-written text as **dream clues** and the illustrated choices as **dream cards** in player-facing prompts, hints, errors and accessible labels. Personal-mode guessing uses “Nancy’s Dream Clue” and “Select their Dream Card.” Make the active dream clue larger than body copy (24–32px), with readable wrapping. After a successful preparation commitment, show “Your dream clue and dream card are remembered.” with a check mark above the preparation progress; keep it visible after the sixth save. Reserve its space to prevent moving the cards and announce saves through a polite status region. Do not show success before a pair is committed.

Use matching size and weight for **Describe Your Dream Clue** above the input and **Select a Dream Card** above the cards. These are the two primary preparation tasks. The confirmation caption reads **Your clue and card**.

Keep personal preparation concise: omit “A word, a sentence. An image only you could choose.” and place “Select a Dream Card” directly above the image cards.

Use **First Dream**, **Second Dream**, through **Sixth Dream** for personal Dream slots, in prompts and the recap. The clue field's placeholder is “Tell us about your dream... but leave some to the imagination.” in a softer but readable color than entered text. Single words, short phrases and sentences are all welcome; simulated clues should mix examples such as Hope, Freedom and Love with longer thoughts. A tentative guessing choice reads “Selected for Nancy” (or the current friend's name), describing a guess rather than ownership. Preparation uses “Selected.” At reveal, label decoys **A Stranger’s Dream**, including accessible labels; this is atmospheric wording for the existing decoys, not another simulated player. Reserve room for the longer captions so selection and reveal do not change card dimensions.

The reversible **Your own dream clues** experiment removes the large preparation overview, six-slot list, repeated instructions and divider. Use a compact “Dream 1 of 6” progress line above “First Dream”, updating through the sixth Dream and showing completion after all six. The current Dream name is the page heading. Place the larger, prominent instruction “Write a dream clue and choose its dream card.” directly beneath it. Keep the character counter below the input, and place “Tap to choose. Hold to look closer.” beside “Select a Dream Card” immediately above the cards. Original shared-word mode retains its concept overview. Show a labeled, 80-character word/sentence field with a visible counter beside the hand; the player may write or choose the image first. Keep text outside the artwork, wrap long unbroken text, and reserve prompt space so changing friends does not move cards. Prompt “Nancy’s Dream Clue” followed by their clue and “Select their Dream Card.” Preserve clues verbatim after whitespace normalization, without uppercasing sentences. Include each person's words in the recap next to their Dream. Help must explain both guessing and recognition points, the everyone-correct exception, and the experimental maximum of 3 points per day / 18 per week. Original mode keeps its existing wording and 2 / 12 maxima.

Offer **Your own words · experiment** and **Original shared words** on the welcome screen. A footer switch must explicitly say that it starts a new week. This is a prototype comparison control; switching clears local progress rather than changing active-week rules.

Weekly preparation uses one continuous page: the week's six concepts, the current Dream prompt, and a six-card hand. Start with “You dream of TIME. What does that look like to you?” A player marks an image and confirms inline; the prompt advances to the next setup concept and a replacement enters the same hand. Enlargement is optional and never required to commit a choice. Avoid separate introduction, gallery, and selection steps that require players to navigate back and forth. Keep the hidden daily order separate from this visible setup sequence.

Quietly narrate entering, experiencing, and remembering Dreams. Use short, understandable, elegant phrases. Do not stack metaphors or turn instructions into riddles. Essential errors may be direct, such as “That dream is already assigned.”

Day 1 ends with the preparation completion state; do not show friends' guessing prompts that day. Keep the development-only day control small and in the top right. From Day 2, show one friend's prompt at a time. Confirming Nancy's guess changes the prompt to Song's for the same concept, preserves all six images in their positions, and labels Nancy's committed guess as locked. These labels describe the player's guesses, never the true image owners. Offer “Unlock Nancy’s guess” (or Song's) until reveal. Tapping a tentative selection again clears it; unlocking restores the relevant prompt and focus without erasing other confirmed guesses. Use gender-neutral “their” in the question for every friend.

Keep the user's Dream in the first slot of the six-image board during guessing and reveal. Use a distinct indigo border and an explicit “Your Dream · View only” label below the image; preserve the artwork's color and detail. Tapping or keyboard activation enlarges it without choosing a guess. The other five slots contain two friends' Dreams and three decoys. Do not use a separate own-Dream sidebar in the round workspace.

Use stable prototype player accents: rose for Nancy and blue for Song. Match each friend's prompt/result name, locked-guess border and lock label. Give “Unlock guess” a compact tinted button with an open-lock icon and an accessible name such as “Unlock Nancy’s guess.” Keep the touch target at least 44px high and within the reserved revision area. Names and explicit lock text remain essential; color is supplementary. Add the border only after that guess is confirmed, remove it when unlocked, and retain its guess identity after reveal. Never color unrevealed cards using their actual owners. Keep border and padding totals constant so the artwork does not resize.

The full palette has six slots, in order: indigo, rose, blue, amber, forest and plum. Assign accents by player ID using the stable roster order, not hardcoded display-name CSS selectors. Charlie uses indigo; future fourth, fifth and sixth players can use the remaining slots. This supplies presentation colors without adding players or resolving the production group-size rules. Keep all six text accents readable on both the main surface and their tinted buttons.

Place a 44px “?” scoring-help button at the top left beside the wordmark. Its accessible name is “How scoring works.” Open a native modal dialog with concise scoring rules, initial focus at its heading and inert background controls. Clearly label the 2-per-day/12-per-week maximum as specific to the current two-friend prototype. Escape or “Back to dreaming” returns focus and preserves gameplay and scroll position; on short screens the explanation can scroll within the dialog.

After both guesses, “Reveal their dreams” keeps the same six cards in place. Add actual owners' names or “A Stranger’s Dream” below their images and retain “Your guess: Nancy” or Song on the guessed cards. Place the results between “The dream comes into focus.” and the “Dreams remembered” count, above the cards: each friend's name, dream clue where applicable, correctness and +1 or 0 points, followed by friends' guesses about the user's Dream and its recognition points in personal mode. Use two result columns on phones, up to three on tablets and up to five on wide screens; wrap long clues without clipping. Reserve header space through guessing and reveal to keep the cards stationary. Five-friend presentation readiness does not expand the current three-player simulation. Friends' ownership and decoy labels remain absent before reveal; the user's own card is the deliberate exception. The week ends with a recap containing the user's Dreams and friends' actual/guessed image pairs.

After entering the week, do not offer “Return to the beginning” navigation. Keep progression within preparation, guessing, reveal, and the ending. Closing optional image inspection still returns to the current cards.

Introduce the player in the help as a **Dreamier**, someone who can see others' dreams. Preserve that spelling. All final-review artwork, including friends' actual Dreams and the user's guessed images, supports the same optional tap/hold/keyboard inspection as the own-Dream reference. Keep images lazily loaded in the long recap, preserve their full composition, and return focus and scroll position when inspection closes.

After reveal, describe each simulated friend's recognition plainly: “Nancy recognized your Dream.” or “Song chose another dream.” In the final recap, group their guessed images under “Your Dream through their eyes,” with names and inspection controls. Before reveal, keep their guesses and recognition hidden. Help should explain that these prototype guesses are random.

| Moment | Preferred language |
| --- | --- |
| Beginning | “A new Dreamerie begins.” |
| Weekly introduction | “This week, you will dream of...” |
| Selection | “You dream of TIME. What does it look like?” |
| Choice remembered | “Your dream is remembered.” |
| Setup complete | “Your dreams are remembered.” |
| Guess Nancy | “Nancy dreamt of FREEDOM. Select their Dream Card.” |
| Guess Song | “Song dreamt of FREEDOM. Select their Dream Card.” |
| Correct reveal | “You remembered.” |
| Incorrect reveal | “The dream escaped you.” |
| Waiting, when relevant | “The others are still dreaming.” |
| Ending | “The dream fades.” |

Avoid “These are your six words,” “Select an image for TIME,” or generic “Waiting for other players.” Use appropriate pronouns for actual players when supported; these examples describe prototype characters. Do not repeat atmospheric copy after every tap.

## Animation

Prototype 0.1 prioritizes gameplay. Milestone 12 uses brief 140-260ms opacity and color/shadow changes for prompts, loaded replacement artwork, selection/lock labels and explicit reveals. Keep card positions and dimensions stationary during selection, deselection, replacement, locking and reveal; do not add drifting cards or transitions that reflow the grid. Avoid elaborate effects, distracting motion, mandatory waits, or obscuring locked choices. Respect reduced motion and preserve focus. Enable effects only when the user has no reduced-motion preference; otherwise show every update immediately. Keep headings, controls and unchanged card images mounted, and never use animation completion or delays to advance gameplay or allow input.

## Local artwork and provenance

The visual refresh replaces the original geometric placeholders with 120 locally stored raster illustrations. Keep unique compositions and useful visual descriptions. Do not distinguish friends' cards or decoys through separate visual styles. Keep emotional and palette notes out of runtime card metadata; they are production guidance only.

The user's explicit request authorizes AI generation of development artwork for this refresh, superseding the earlier placeholder-only restriction. Record exact prompts, source generation filenames and asset hashes. The application serves bundled images and contains no generation API or credentials. Commercial release sourcing, licensing and artist collaboration still require later decisions. User-supplied reference images guide style only and are not redistributed as game assets.
