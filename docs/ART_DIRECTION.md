# Dreamerie art direction

## Identity

Dreamerie should feel like an illustrated dream journal, surreal gallery, or quiet nighttime storybook: artistic, mysterious, calm, whimsical, slightly magical, and emotionally evocative. Develop an original identity; do not imitate the exact style of an existing commercial game.

Artwork is the star. UI provides enough structure to choose, remember, and recognize images while leaving room for personal interpretation.

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
- Explore a subdued nighttime palette with sufficient contrast; final colors/fonts remain to be developed.
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

Day 1 ends with the preparation completion state; do not show friends' guessing prompts that day. Keep the development-only day control small and in the top right. From Day 2, show one friend's prompt at a time. Confirming Nancy's guess changes the prompt to Song's for the same concept, preserves all six images in their positions, and labels Nancy's committed guess as locked. These labels describe the player's guesses, never the true image owners. Use gender-neutral “their” in the question for every friend.

After both guesses, “Reveal their dreams” shows both friends' results together in the current workspace. Pair “Your guess” with “Their Dream”; describe correctness in text and show +1 or 0 points. Keep the week's score in reveal and ending views. The development control advances through all six rounds and finishes with “The dream fades.” and “Begin a new week.”

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

## Placeholder and final artwork

Use local temporary artwork for Prototype 0.1, with enough distinct images for its allocation/decoy assumptions. Placeholder quality may be modest, but silhouettes/compositions must differ enough to recognize choices. Do not distinguish friends' cards or decoys through separate visual styles.

Do not generate AI artwork in Prototype 0.1. Final sourcing, generation, licensing, artist collaboration, and review remain unresolved. Record temporary assets' provenance/permitted use when introduced. Placeholder art is not the final Dreamerie style.
