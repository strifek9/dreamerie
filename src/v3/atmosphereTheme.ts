// Decoration follows the public title only, never the answer labels or geometry.
export function atmosphereFor(title: string): 'water' | 'clouds' | 'leaves' | 'stars' {
  if (/\b(?:rain|seas?|oceans?|rivers?|water|ponds?|lakes?|tides?|shores?|gondolas?|jellyfish|archipelago)\b/i.test(title)) return 'water'
  if (/\b(?:clouds?|sky|winds?|kites?|balloons?|flying|flight|rainbows?)\b/i.test(title)) return 'clouds'
  if (/\b(?:gardens?|flowers?|forests?|leaf|leaves|trees?|orchards?|seeds?|mushrooms?|petals?|cherry|cherries)\b/i.test(title)) return 'leaves'
  return 'stars'
}
