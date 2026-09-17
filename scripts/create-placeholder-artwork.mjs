// Original code-authored SVG fixtures. No external images or image-generation service.
import { mkdir, writeFile } from 'node:fs/promises'

const artworkDirectory = new URL('../public/artwork/', import.meta.url)
await mkdir(artworkDirectory, { recursive: true })

const palettes = [
  ['#273344', '#798b92', '#d6bda0'],
  ['#383247', '#a198ab', '#e1c4a1'],
  ['#283e40', '#8da79a', '#e1cfaa'],
  ['#423642', '#b18c95', '#d5c8b2'],
  ['#30374e', '#8c96b2', '#e3cba2'],
  ['#3d4038', '#9fa38c', '#ddc5ad'],
]

const scenes = [
  (v) => ({
    description: `${v + 1} open doorways stand above water, with small moons beyond them.`,
    shapes: Array.from({ length: v + 1 }, (_, j) => {
      const x = 42 + j * (220 / (v + 1))
      const y = 150 + (j % 2) * 30
      return `<path d="M${x} 290V${y}h32v140" fill="none"/><path d="M${x + 32} ${y}l20 -14v140l-20 14" fill="var(--mist)"/><circle cx="${x + 16}" cy="${y + 35}" r="8" fill="var(--light)"/>`
    }).join(''),
  }),
  (v) => ({
    description: `A small house rests on ${v + 2} slender stilts, with a ribbon of water passing through its window.`,
    shapes: `<path d="M92 200v-72l68 -55 68 55v72z" fill="var(--mist)"/><path d="M80 130l80 -65 80 65" fill="none"/><rect x="141" y="130" width="38" height="50" fill="var(--night)"/>${Array.from({ length: v + 2 }, (_, j) => `<path d="M${100 + j * 120 / (v + 1)} 200v${92 + (j % 2) * 22}"/>`).join('')}<path d="M155 153Q${40 + v * 22} 230 210 265T270 315" fill="none" stroke="var(--light)"/>`,
  }),
  (v) => ({
    description: `A stairway with ${v + 5} steps rises toward a suspended ring, above a low bank of clouds.`,
    shapes: `<path d="M50 305${Array.from({ length: v + 5 }, () => 'h22v-22').join('')}" fill="none" stroke-width="5"/><circle cx="${65 + (v + 5) * 22}" cy="${285 - (v + 5) * 22}" r="22" fill="none"/><path d="M32 330q20 -35 50 -10q20 -45 60 -10q30 -35 60 0q40 -25 85 20" fill="var(--mist)"/>`,
  }),
  (v) => ({
    description: `A glass bowl holds ${v + 1} tiny islands, with a crescent hanging inside the glass.`,
    shapes: `<path d="M78 134Q20 285 160 310Q300 285 242 134z" fill="none"/><ellipse cx="160" cy="134" rx="82" ry="18" fill="none"/><path d="M62 238q50 -20 100 0t96 0" fill="none"/>${Array.from({ length: v + 1 }, (_, j) => `<path d="M${80 + j * 150 / (v + 1)} ${265 - (j % 2) * 32}l15 -22 15 22z" fill="var(--mist)"/>`).join('')}<path d="M176 171a23 23 0 1 0 20 32a19 19 0 0 1-20 -32" fill="var(--light)"/>`,
  }),
  (v) => ({
    description: `A whale floats above ${v + 1} suspended lanterns, its tail pointing into the night.`,
    shapes: `<path d="M45 175q40 -75 135 -38q40 17 55 4l22 -40 18 28 -17 37q-25 86 -135 69q-68 -8 -78 -60z" fill="var(--mist)"/><circle cx="80" cy="168" r="3" fill="var(--night)"/><path d="M127 215l40 27 -6 -38" fill="var(--mist)"/>${Array.from({ length: v + 1 }, (_, j) => `<path d="M${70 + j * 175 / (v + 1)} 235v${32 + j * 6}" fill="none"/><rect x="${63 + j * 175 / (v + 1)}" y="${267 + j * 6}" width="14" height="22" rx="6" fill="var(--light)"/>`).join('')}`,
  }),
  (v) => ({
    description: `${v + 1} paper boats drift in a vertical ribbon of water between two distant hills.`,
    shapes: `<path d="M80 32q180 75 25 180t110 170" stroke-width="25" stroke="var(--mist)" fill="none"/>${Array.from({ length: v + 1 }, (_, j) => {
      const x = 120 + (j % 2) * 30
      const y = 96 + j * 235 / (v + 1)
      return `<path d="M${x - 25} ${y}l25 18 25 -18z" fill="var(--light)"/><path d="M${x} ${y}v-22l17 22" fill="none"/>`
    }).join('')}<path d="M20 353l58 -49 20 49M240 353l25 -65 38 65" fill="none"/>`,
  }),
  (v) => ({
    description: `An upside-down tree carries ${v + 3} round stones where its branches meet the sky.`,
    shapes: `<path d="M160 305V120M160 160l-72 -72M160 200l80 -92M160 235l-65 -60M160 125l35 -57" fill="none" stroke-width="5"/>${Array.from({ length: v + 3 }, (_, j) => `<circle cx="${72 + j * 175 / (v + 2)}" cy="${75 + (j % 3) * 33}" r="${11 + (j % 2) * 5}" fill="var(--mist)"/>`).join('')}<path d="M160 305l-45 35m45 -35 42 35m-42 -35 -8 51" fill="none"/>`,
  }),
  (v) => ({
    description: `A chair with ${v + 2} long shadows stands on a narrow floating platform.`,
    shapes: `<path d="M117 213v-100h64v100M110 213h90v18h-90zM120 231v48M185 231v48" fill="none" stroke-width="4"/><path d="M72 279h180l-25 20H95z" fill="var(--mist)"/>${Array.from({ length: v + 2 }, (_, j) => `<path d="M${106 + j * 102 / (v + 1)} 297l${-55 + j * 110 / (v + 1)} 60" fill="none" stroke-width="${2 + j % 3}"/>`).join('')}<circle cx="${90 + v * 22}" cy="70" r="14" fill="var(--light)"/>`,
  }),
  (v) => ({
    description: `An umbrella shelters ${v + 1} small stars while rain rises from the ground around it.`,
    shapes: `<path d="M68 180q92 -145 184 0q-23 -20 -46 0q-23 -20 -46 0q-23 -20 -46 0q-23 -20 -46 0" fill="var(--mist)"/><path d="M160 170v115q0 25 -20 16" fill="none" stroke-width="4"/>${Array.from({ length: v + 1 }, (_, j) => `<path d="M${102 + j * 116 / (v + 1)} ${215 + (j % 2) * 25}l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" fill="var(--light)"/>`).join('')}<path d="M40 320v-34m15 -31v-20m222 72v-33m-15 -32v-25" fill="none"/>`,
  }),
  (v) => ({
    description: `A hanging swing holds ${v + 1} pale spheres above a mountain-shaped shadow.`,
    shapes: `<path d="M92 52v190M228 52v190M82 242h156v13H82z" fill="none" stroke-width="3"/>${Array.from({ length: v + 1 }, (_, j) => `<circle cx="${110 + j * 104 / (v + 1)}" cy="${224 - (j % 2) * 12}" r="${10 + (j % 2) * 3}" fill="var(--light)"/>`).join('')}<path d="M68 340l60 -50 25 20 35 -55 66 85z" fill="var(--mist)"/>`,
  }),
]

const cards = []
for (let sceneIndex = 0; sceneIndex < scenes.length; sceneIndex++) {
  for (let variant = 0; variant < 6; variant++) {
    const number = sceneIndex * 6 + variant + 1
    const id = `card-${String(number).padStart(3, '0')}`
    const [night, mist, light] = palettes[(sceneIndex + variant) % palettes.length]
    const scene = scenes[sceneIndex](variant)
    const stars = Array.from({ length: 9 }, (_, j) => `<circle cx="${25 + (j * 43 + variant * 19) % 270}" cy="${25 + (j * 31 + sceneIndex * 13) % 100}" r="${j % 2 ? 1 : 1.5}" fill="var(--light)" opacity=".55"/>`).join('')
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 400" style="--night:${night};--mist:${mist};--light:${light}">
  <rect width="320" height="400" fill="var(--night)"/>
  ${stars}
  <g stroke="var(--light)" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round">${scene.shapes}</g>
  <path d="M20 368q70 -14 140 0t140 0M20 378q70 -14 140 0t140 0" fill="none" stroke="var(--mist)" opacity=".5"/>
</svg>
`
    await writeFile(new URL(`${id}.svg`, artworkDirectory), svg)
    cards.push({ id, artwork: `/artwork/${id}.svg`, description: scene.description })
  }
}
await writeFile(new URL('placeholder-cards.json', artworkDirectory), `${JSON.stringify(cards, null, 2)}\n`)
console.log(`Created ${cards.length} archived SVG fixtures. The active illustrated deck was not changed.`)
