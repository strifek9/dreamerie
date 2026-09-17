# Dreamerie art direction

## Identity

Dreamerie should feel like an illustrated dream journal, surreal gallery, or quiet nighttime storybook: artistic, mysterious, calm, whimsical, slightly magical, and emotionally evocative. Develop an original identity; do not imitate the exact style of an existing commercial game.

Artwork is the star. UI provides enough structure to choose, remember, and recognize images while leaving room for personal interpretation.

### Confirmed visual refresh

The user requested 120 actual illustrated art cards and a richer, magical interface. Their supplied references combine expressive storybook characters with decorative fantasy shapes and textured painted surfaces. Keep the work stylized and two-dimensional, never hyperrealistic or rendered like a photograph. Dixit is inspiration for open-ended visual storytelling; create original imagery rather than recreating its cards.

Variety is essential. Include joyful, sad, funny, tender, lonely, restless, eerie, hopeful and bittersweet scenes. Use a wide spectrum of colors: vivid primaries, pinks, greens, oranges, purples, luminous pastels, pale compositions and darker paintings. No single palette should dominate the whole deck. Emotional notes guide art production, not categories, labels or correct gameplay answers.

Mix readable surreal scenes with more abstract and confusing art: impossible perspective, shifting scale, ambiguous silhouettes, fragmented shapes, unexpected empty space, and objects transforming into one another. Some cards can feel unresolved or contradictory. Avoid making all images literal, cute, densely decorated or comforting. Each image should support several interpretations.

The surrounding interface uses warm parchment, deep teal, plum and restrained gold ornament. Its stable palette supports the deck's much broader colors. Give the artwork room; decorative details must not hide choices or compete with the images.

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

## Artwork-first UI

- Use restrained surfaces, generous spacing, and readable typography.
- Use deep teal surroundings, warm parchment surfaces, plum accents and restrained gold details with sufficient contrast. Keep the card palette much broader than the interface palette.
- Let images carry richness and color. Avoid bright arcade styling, dense dashboards, excess buttons/panels, a technology-heavy appearance, and gratuitous gradients.
- Frame cards consistently without cropping defining details. Clear selection/lock markers should not cover important artwork.
- Keep unnecessary scores/statistics away from the selection experience; results belong in reveal/completion states.

## Mobile presentation

Design at phone width first. A two-column, three-row six-card gallery is a useful starting exploration, not a fixed rule. Verify that images remain appreciable on small screens. Allow scrolling rather than shrinking everything to fit one viewport. Consider deliberate inspection before commitment.

All primary actions work by tapping with comfortable targets and no hover dependence. Keyboard focus, selection, availability, and locked states must be understandable. Separate image inspection from commitment. Progressively enhance galleries and spacing for tablet/desktop.

Use concise visual descriptions for accessibility without prescribing image meaning or revealing answers. Correctness and locks need text/symbols as well as color. Keep surrounding text short so artwork stays prominent.

## UI writing

Weekly preparation uses one continuous page: the week's six concepts, the current Dream prompt, and a six-card hand. Start with “You dream of TIME. What does that look like to you?” A player marks an image and confirms inline; the prompt advances to the next setup concept and a replacement enters the same hand. Enlargement is optional and never required to commit a choice. Avoid separate introduction, gallery, and selection steps that require players to navigate back and forth. Keep the hidden daily order separate from this visible setup sequence.

Quietly narrate entering, experiencing, and remembering Dreams. Use short, understandable, elegant phrases. Do not stack metaphors or turn instructions into riddles. Essential errors may be direct, such as “That dream is already assigned.”

Day 1 ends with the preparation completion state; do not show friends' guessing prompts that day. Keep the development-only day control small and in the top right. From Day 2, show one friend's prompt at a time. Confirming Nancy's guess changes the prompt to Song's for the same concept, preserves all six images in their positions, and labels Nancy's committed guess as locked. These labels describe the player's guesses, never the true image owners. Offer “Unlock Nancy’s guess” (or Song's) until reveal. Tapping a tentative selection again clears it; unlocking restores the relevant prompt and focus without erasing other confirmed guesses. Use gender-neutral “their” in the question for every friend.

Keep the user's Dream in the first slot of the six-image board during guessing and reveal. Use a distinct teal border and an explicit “Your Dream · View only” label below the image; preserve the artwork's color and detail. Tapping or keyboard activation enlarges it without choosing a guess. The other five slots contain two friends' Dreams and three decoys. Do not use a separate own-Dream sidebar in the round workspace.

After both guesses, “Reveal their dreams” keeps the same six cards in place. Add actual owners' names or “Decoy” below their images and retain “Your guess: Nancy” or Song on the guessed cards. Show correctness and +1 or 0 points in text below the board. Friends' ownership and decoy labels remain absent before reveal; the user's own card is the deliberate exception. The week ends with a recap containing the user's Dreams and friends' actual/guessed image pairs.

After entering the week, do not offer “Return to the beginning” navigation. Keep progression within preparation, guessing, reveal, and the ending. Closing optional image inspection still returns to the current cards.

| Moment | Preferred language |
| --- | --- |
| Beginning | “A new Dreamerie begins.” |
| Weekly introduction | “This week, you will dream of...” |
| Selection | “You dream of TIME. What does it look like?” |
| Choice remembered | “Your dream is remembered.” |
| Setup complete | “Your dreams are remembered.” |
| Guess Nancy | “Nancy dreamt of FREEDOM. What did their dream look like?” |
| Guess Song | “Song dreamt of FREEDOM. What did their dream look like?” |
| Correct reveal | “You remembered.” |
| Incorrect reveal | “The dream escaped you.” |
| Waiting, when relevant | “The others are still dreaming.” |
| Ending | “The dream fades.” |

Avoid “These are your six words,” “Select an image for TIME,” or generic “Waiting for other players.” Use appropriate pronouns for actual players when supported; these examples describe prototype characters. Do not repeat atmospheric copy after every tap.

## Animation

Prototype 0.1 prioritizes gameplay. Gentle fades, cards drifting into place, softly disappearing choices, quiet replacements, and subtle reveals may later support the mood. Avoid elaborate effects, distracting motion, mandatory waits, or obscuring locked choices. Respect reduced motion and preserve focus.

## Local artwork and provenance

The visual refresh replaces the original geometric placeholders with 120 locally stored raster illustrations. Keep unique compositions and useful visual descriptions. Do not distinguish friends' cards or decoys through separate visual styles. Keep emotional and palette notes out of runtime card metadata; they are production guidance only.

The user's explicit request authorizes AI generation of development artwork for this refresh, superseding the earlier placeholder-only restriction. Record exact prompts, source generation filenames and asset hashes. The application serves bundled images and contains no generation API or credentials. Commercial release sourcing, licensing and artist collaboration still require later decisions. User-supplied reference images guide style only and are not redistributed as game assets.
