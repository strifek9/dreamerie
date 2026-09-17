# Illustration prompts

The user requested 120 original abstract and surreal illustrations for Dreamerie,
using their two storybook references and Dixit's associative storytelling as
inspiration. The latest direction requires broad color and emotional variety,
including funny, joyful, sad, unsettling and deliberately confusing imagery.
See [ART_DIRECTION.md](../ART_DIRECTION.md).

`prompts.json` records the generation instructions and scene inventory. Where a
card has `prompt`, that is the complete prompt used. Otherwise its prompt is
`basePrompt` followed by `scene`. Card 001 established the initial illustrated
style from the two user-provided references. The other initial cards (002–005,
008–010) used that image as a style reference. The remaining cards use independent
prompts with broader palettes and more abstraction after the user's refinements.
Descriptions are reviewed separately and can differ from the requested scene
when the generated image differs.

All cards use the built-in image-generation tool, one original image per card.
The game contains no generation service, API key or remote artwork dependency.
Only IDs, image paths and visual descriptions reach runtime card metadata.
Emotional and palette notes do not define meanings or correct answers.

The current separate welcome illustration depicts a moonlit doorway, impossible
cloud stairs and a creature asleep on a crescent moon in blue/violet storybook
gouache. Its exact built-in generation prompt is `welcome-moonlight-prompt.txt`.
The earlier garden welcome image and `welcome-prompt.txt` remain archived. It is excluded
from the deck so welcome decoration cannot expose future decoys.

Asset files and checksums are in `public/artwork/`; see its README for import and
metadata synchronization instructions. The original user references are not
redistributed. Broader commercial release sourcing and licensing decisions remain
open, as documented in the game design.
