import type { LandscapeDream } from '../v2/landscapeCollection.ts'
import { v4PreviewDreams } from './previewDreams.ts'

const published016 = v4PreviewDreams.find(card => card.id === 'v4-dream-016')!
const published344 = v4PreviewDreams.find(card => card.id === 'v4-dream-344')!

// A separate version preserves the published pair and saved attempts.
// Only the snowflake region uses this new, single-motif source; the original
// painting and the other four authored differences are unchanged.
export const fairnessCorrections309: readonly LandscapeDream[] = [{
  ...published016,
  id: 'v4-fairness-dream-016-v1',
  edits: published016.edits.map(edit => edit.id === 'spout-puff' ? {
    ...edit,
    id: 'spout-inner-spiral',
    label: 'The small spout puff contains one pink spiral curl.',
    box: { left: 760 / 1672, top: 164 / 941, width: 78 / 1672, height: 68 / 941 },
    source: '/artwork/v4/fairness/dream-016-spout-source-v1.png',
    edgeFade: 3,
    // Keep the original puff outline and sky. This interior contour contains
    // only original pink-cloud pixels within a central ellipse.
    maskPath: 'M799 166h1v1h-1z M790 167h15v1h-15z M807 167h2v1h-2z M787 168h25v1h-25z M784 169h31v1h-31z M782 170h35v1h-35z M780 171h39v1h-39z M778 172h43v1h-43z M776 173h47v1h-47z M775 174h49v1h-49z M774 175h51v1h-51z M773 176h53v1h-53z M772 177h55v1h-55z M771 178h57v1h-57z M770 179h59v1h-59z M769 180h61v1h-61z M768 181h63v1h-63z M767 182h65v1h-65z M767 183h65v1h-65z M766 184h67v1h-67z M766 185h67v1h-67z M765 186h69v1h-69z M765 187h69v1h-69z M764 188h71v1h-71z M764 189h71v1h-71z M764 190h71v1h-71z M763 191h73v1h-73z M763 192h73v1h-73z M763 193h73v1h-73z M763 194h73v1h-73z M763 195h73v1h-73z M763 196h73v1h-73z M763 197h73v1h-73z M762 198h75v1h-75z M763 199h73v1h-73z M763 200h73v1h-73z M763 201h73v1h-73z M763 202h73v1h-73z M763 203h73v1h-73z M763 204h73v1h-73z M763 205h73v1h-73z M764 206h71v1h-71z M764 207h71v1h-71z M764 208h71v1h-71z M765 209h69v1h-69z M765 210h69v1h-69z M766 211h67v1h-67z M766 212h67v1h-67z M767 213h65v1h-65z M767 214h65v1h-65z M768 215h63v1h-63z M769 216h61v1h-61z M770 217h59v1h-59z M771 218h57v1h-57z M772 219h55v1h-55z M773 220h53v1h-53z M774 221h51v1h-51z M775 222h49v1h-49z M776 223h47v1h-47z M778 224h23v1h-23z M804 224h8v1h-8z M815 224h6v1h-6z M780 225h19v1h-19z M806 225h4v1h-4z M817 225h2v1h-2z M782 226h17v1h-17z M784 227h14v1h-14z M787 228h10v1h-10z M790 229h6v1h-6z',
  } : edit),
}, {
  ...published344,
  id: 'v4-fairness-dream-344-v1',
  edits: published344.edits.map(edit => edit.id === 'snow' ? {
    ...edit,
    id: 'snow-spiral',
    label: 'The tin snowflake becomes one spiral swirl.',
    source: '/artwork/v4/fairness/dream-344-snow-source-v1.png',
  } : edit),
}]
