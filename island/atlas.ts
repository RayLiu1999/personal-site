import { mulberry32 } from './rand'

// One 128×128 canvas of 16×16 procedural pixel tiles. Tile indices:
//  0 grass top   1 grass side   2 dirt        3 stone       4 cobble      5 log side    6 log top     7 planks
//  8 leaves      9 stone brick 10 bookshelf  11 lamp       12 hopper     13 server     14 iron       15 path top
// 16 path side  17 water       18 title      19 redstone   20 glass      21 spruce     23 piston     24 piston top
// 25 dispenser
export const TILE = 16
export const ATLAS_COLS = 8

let cached: HTMLCanvasElement | null = null

export function getAtlas(): HTMLCanvasElement {
  if (cached) return cached
  const atlas = document.createElement('canvas')
  atlas.width = atlas.height = 128
  const ctx = atlas.getContext('2d')!

  type Px = (x: number, y: number, c: string) => void
  type TileFn = (x: number, y: number, px: Px, pick: (a: string[]) => string, R: () => number, clear: (x: number, y: number) => void) => void
  function tile(i: number, fn: TileFn) {
    const ox = (i % 8) * 16, oy = Math.floor(i / 8) * 16, R = mulberry32(i * 977 + 13)
    const px: Px = (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(ox + x, oy + y, 1, 1) }
    const clear = (x: number, y: number) => ctx.clearRect(ox + x, oy + y, 1, 1)
    const pick = (a: string[]) => a[Math.floor(R() * a.length)]
    for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) fn(x, y, px, pick, R, clear)
  }

  const G = ['#5f9e3b', '#56923a', '#6aad45', '#4d8634']
  const D = ['#866043', '#7a5539', '#94704f', '#6b4a32']
  const S = ['#7f7f7f', '#757575', '#8a8a8a', '#6e6e6e']
  const PL = ['#a2804c', '#9a7846', '#ab8853']
  const dripRow = mulberry32(5)
  const drip = [...Array(16)].map(() => dripRow() < 0.55)

  tile(0, (x, y, px, pick) => px(x, y, pick(G)))
  tile(1, (x, y, px, pick) => px(x, y, y < 3 || (y === 3 && drip[x]) ? pick(G) : pick(D)))
  tile(2, (x, y, px, pick, R) => px(x, y, R() < 0.06 ? '#a08060' : pick(D)))
  tile(3, (x, y, px, pick) => px(x, y, pick(S)))
  const cob = mulberry32(44)
  const cpts = [...Array(9)].map(() => [cob() * 16, cob() * 16, ['#7a7a7a', '#6a6a6a', '#858585', '#727272'][Math.floor(cob() * 4)]] as [number, number, string])
  const cobble: TileFn = (x, y, px) => {
    let d1 = 99, d2 = 99, c = '#777'
    for (const p of cpts) { const d = Math.hypot(x - p[0], y - p[1]); if (d < d1) { d2 = d1; d1 = d; c = p[2] } else if (d < d2) d2 = d }
    px(x, y, d2 - d1 < 1.1 ? '#4c4c4c' : c)
  }
  tile(4, cobble)
  tile(5, (x, y, px, pick, R) => px(x, y, ['#6b5130', '#5b4428', '#7a5d38', '#5b4428'][x % 4 === 0 ? 1 : R() < 0.2 ? 3 : x % 3 === 0 ? 2 : 0]))
  tile(6, (x, y, px) => { const d = Math.max(Math.abs(x - 7.5), Math.abs(y - 7.5)); px(x, y, d > 7 ? '#5b4428' : Math.floor(d) % 2 ? '#b39060' : '#9c7a4c') })
  const planks: TileFn = (x, y, px, pick) => { const band = Math.floor(y / 4); px(x, y, y % 4 === 3 ? '#7a5f36' : x === (band * 7 + 3) % 16 ? '#7a5f36' : pick(PL)) }
  tile(7, planks)
  tile(8, (x, y, px, pick, R, clear) => { R() < 0.16 ? clear(x, y) : px(x, y, pick(['#3c7a2b', '#33692a', '#4a8c36', '#2f6224'])) })
  tile(9, (x, y, px, pick) => {
    const row = y < 8 ? 0 : 1
    const mortar = y === 7 || y === 15 || (row === 0 && x === 15) || (row === 1 && x === 7)
    px(x, y, mortar ? '#575757' : y === 0 || y === 8 ? '#9e9e9e' : pick(S))
  })
  const BOOKS = ['#8b2f2f', '#2f4f8b', '#2f7a3f', '#8b6f2f', '#5a2f7a', '#a0522d', '#3a6b6b']
  const bk = mulberry32(77)
  const shelf: string[] = []
  ;[[1, 6], [9, 14]].forEach(([a, b]) => {
    let x = 1
    while (x < 15) {
      const w = 1 + (bk() < 0.5 ? 1 : 0), c = BOOKS[Math.floor(bk() * BOOKS.length)], top = a + (bk() < 0.4 ? 1 : 0)
      for (let xx = x; xx < Math.min(x + w, 15); xx++) for (let y = a; y <= b; y++) shelf[y * 16 + xx] = y < top ? '#2b1d10' : xx === x + w - 1 && w > 1 ? '#00000000' : c
      x += w
    }
  })
  tile(10, (x, y, px, pick) => {
    if (y === 0 || y === 15 || y === 7 || y === 8 || x === 0 || x === 15) return px(x, y, y === 7 || y === 8 ? '#8f6d3e' : pick(PL))
    const c = shelf[y * 16 + x]
    px(x, y, !c || c === '#00000000' ? '#3a2a18' : c)
  })
  tile(11, (x, y, px, pick) => {
    const edge = x === 0 || y === 0 || x === 15 || y === 15, grid = x === 7 || x === 8 || y === 7 || y === 8
    px(x, y, edge ? '#7a4a1e' : grid ? '#c27c32' : pick(['#f9d27a', '#ffe6a3', '#f2c160']))
  })
  tile(12, (x, y, px, pick) => {
    const rim = ((x === 3 || x === 12) && y >= 3 && y <= 12) || ((y === 3 || y === 12) && x >= 3 && x <= 12)
    px(x, y, y === 0 ? '#5a5a5a' : rim ? '#262626' : pick(['#3c3c3c', '#363636', '#424242']))
  })
  const srv = mulberry32(91)
  const leds = [...Array(4)].map(() => [srv() < 0.75 ? '#4dff88' : '#ffc04d', srv() < 0.8 ? '#4dff88' : '#ff5a4d'])
  tile(13, (x, y, px) => {
    const u = Math.floor(y / 4), r = y % 4
    let c = '#26292f'
    if (r === 0) c = '#3a3f47'
    else if (r === 3) c = '#17191d'
    else if (x >= 1 && x <= 9) c = x % 2 ? '#14161a' : '#2b2f36'
    else if (r === 1 && x === 12) c = leds[u][0]
    else if (r === 1 && x === 14) c = leds[u][1]
    px(x, y, c)
  })
  tile(14, (x, y, px, pick) => px(x, y, x === 0 || y === 0 ? '#f5f5f5' : x === 15 || y === 15 ? '#a8a8a8' : pick(['#dedede', '#d4d4d4', '#e8e8e8'])))
  const PT = ['#a68d58', '#9a8250', '#b09862', '#8f7848']
  tile(15, (x, y, px, pick) => px(x, y, pick(PT)))
  tile(16, (x, y, px, pick, R) => px(x, y, y === 0 || (y === 1 && R() < 0.5) ? pick(PT) : pick(D)))
  tile(17, (x, y, px, pick) => px(x, y, pick(['#3d66cc', '#3a5fc0', '#4874dc', '#335ab8'])))
  tile(18, (x, y, px, pick) => px(x, y, y < 2 ? '#d6d6d6' : x < 2 ? '#c0c0c0' : y > 13 || x > 13 ? '#5c5c5c' : pick(['#a0a0a0', '#989898', '#a8a8a8'])))
  tile(19, (x, y, px, pick, R) => px(x, y, R() < 0.08 ? '#e04a2a' : pick(['#a3170c', '#b8210f', '#8f1209', '#c42a14'])))
  tile(20, (x, y, px, _pick, _R, clear) => {
    const b = x === 0 || x === 15 || y === 0 || y === 15
    const st = (x + y === 7 && x > 2 && x < 6) || (x + y === 23 && x > 10 && x < 14)
    b ? px(x, y, '#dbeef3') : st ? px(x, y, '#ffffff') : clear(x, y)
  })
  tile(21, (x, y, px, pick) => { const band = Math.floor(y / 4); px(x, y, y % 4 === 3 ? '#3f2a17' : x === (band * 5 + 2) % 16 ? '#3f2a17' : pick(['#6b4a2b', '#60422a', '#73502f'])) })
  tile(23, (x, y, px, pick, R, clear) => { if (y < 4) return planks(x, y, px, pick, R, clear); if (y === 4) return px(x, y, '#3a3a3a'); px(x, y, pick(['#7a7a7a', '#6e6e6e', '#848484'])) })
  tile(24, (x, y, px, pick, R, clear) => { if (x >= 5 && x <= 10 && y >= 5 && y <= 10) return px(x, y, x === 5 || y === 5 ? '#efefef' : '#c9c9c9'); planks(x, y, px, pick, R, clear) })
  tile(25, (x, y, px, pick, R, clear) => { if (x >= 5 && x <= 10 && y >= 4 && y <= 11) return px(x, y, x >= 6 && x <= 9 && y >= 5 && y <= 10 ? '#111' : '#262626'); cobble(x, y, px, pick, R, clear) })

  cached = atlas
  return atlas
}

const iconCache: Record<string, string> = {}

/** Isometric block icon (for the hotbar and panel headers) drawn from atlas tiles. */
export function isoIcon(top: number, left: number, right: number): string {
  const k = `${top}-${left}-${right}`
  if (iconCache[k]) return iconCache[k]
  const atlas = getAtlas()
  const c = document.createElement('canvas')
  c.width = c.height = 32
  const g = c.getContext('2d')!
  g.imageSmoothingEnabled = false
  const face = (t: number, m: number[], shade: number) => {
    g.setTransform(m[0], m[1], m[2], m[3], m[4], m[5])
    g.drawImage(atlas, (t % 8) * 16, Math.floor(t / 8) * 16, 16, 16, 0, 0, 16, 16)
    if (shade) { g.fillStyle = `rgba(0,0,0,${shade})`; g.fillRect(0, 0, 16, 16) }
  }
  face(top, [14 / 16, -7 / 16, 14 / 16, 7 / 16, 2, 9], 0)
  face(left, [14 / 16, 7 / 16, 0, 15 / 16, 2, 9], 0.22)
  face(right, [14 / 16, -7 / 16, 0, 15 / 16, 16, 16], 0.42)
  return (iconCache[k] = c.toDataURL())
}

export const LANDMARK_ICON_TILES: Record<string, [number, number, number]> = {
  factory: [11, 11, 11],
  library: [7, 10, 10],
  cabin: [6, 5, 5],
  signpost: [7, 7, 7]
}
