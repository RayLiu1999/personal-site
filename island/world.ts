import * as THREE from 'three'
import { hash2, noise2 } from './rand'

/* ---------- block types ---------- */
type MatKind = 'solid' | 'cut' | 'glow' | 'water'
const BT: Record<string, { f: number | number[]; m?: MatKind }> = {
  grass: { f: [1, 1, 0, 2, 1, 1] }, dirt: { f: 2 }, stone: { f: 3 }, cobble: { f: 4 }, log: { f: [5, 5, 6, 6, 5, 5] },
  planks: { f: 7 }, spruce: { f: 21 }, leaves: { f: 8, m: 'cut' }, brick: { f: 9 }, shelf: { f: [10, 10, 7, 7, 10, 10] },
  lamp: { f: 11, m: 'glow' }, dark: { f: 12 }, server: { f: [13, 13, 12, 12, 13, 13], m: 'glow' }, iron: { f: 14 },
  path: { f: [16, 16, 15, 2, 16, 16] }, water: { f: 17, m: 'water' }, title: { f: 18 }, redstone: { f: 19 },
  glass: { f: 20, m: 'cut' }, piston: { f: [24, 4, 23, 23, 23, 23] }, dispenser: { f: [4, 4, 4, 4, 25, 4] }
}
const occludes = (t: string) => !BT[t].m || BT[t].m === 'glow'

/** A unit cube whose six faces are mapped onto atlas tiles (order: +x −x +y −y +z −z). */
export function blockGeo(faces: number | number[]) {
  const f = Array.isArray(faces) ? faces : [faces, faces, faces, faces, faces, faces]
  const g = new THREE.BoxGeometry(1, 1, 1), uv = g.attributes.uv as THREE.BufferAttribute, e = 0.4 / 128, s = 1 / 8
  for (let k = 0; k < 6; k++) {
    const t = f[k], col = t % 8, row = Math.floor(t / 8)
    for (let i = 0; i < 4; i++) {
      const idx = k * 4 + i, u = uv.getX(idx), v = uv.getY(idx)
      uv.setXY(idx, col * s + e + u * (s - 2 * e), 1 - (row + 1) * s + e + v * (s - 2 * e))
    }
  }
  uv.needsUpdate = true
  return g
}

export function createMaterials(atlas: HTMLCanvasElement) {
  const tex = new THREE.CanvasTexture(atlas)
  tex.magFilter = THREE.NearestFilter
  tex.minFilter = THREE.NearestFilter
  tex.generateMipmaps = false
  tex.colorSpace = THREE.SRGBColorSpace
  return {
    solid: new THREE.MeshLambertMaterial({ map: tex }),
    cut: new THREE.MeshLambertMaterial({ map: tex, alphaTest: 0.5, side: THREE.DoubleSide }),
    glow: new THREE.MeshLambertMaterial({ map: tex, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.45 }),
    water: new THREE.MeshLambertMaterial({ map: tex, transparent: true, opacity: 0.78, depthWrite: false })
  }
}
export type Materials = ReturnType<typeof createMaterials>

/* ---------- voxel world ---------- */
interface Block { x: number; y: number; z: number; t: string; g: 'land' | 'lm' | 'title'; li?: number }

export const R = 25
export const FOOT: Record<string, [number, number, number, number]> = {
  factory: [-16, -4, -13, -2], library: [6, 13, -14, -6], cabin: [6, 12, 3, 9], signpost: [-9, -4, 7, 10]
}
export const pk = (x: number, z: number) => x + '|' + z

export function buildWorld() {
  const W = new Map<string, Block>()
  const key = (x: number, y: number, z: number) => x + '|' + y + '|' + z
  const put = (x: number, y: number, z: number, t: string, g: Block['g'] = 'land', extra?: Partial<Block>) =>
    W.set(key(x, y, z), Object.assign({ x, y, z, t, g }, extra))
  const inRect = (x: number, z: number, r: number[], m = 0) => x >= r[0] - m && x <= r[1] + m && z >= r[2] - m && z <= r[3] + m
  const footOf = (x: number, z: number, m?: number) => Object.keys(FOOT).find(k => inRect(x, z, FOOT[k], m))

  const paths = new Set<string>()
  function line(x0: number, z0: number, x1: number, z1: number) {
    let x = x0, z = z0
    paths.add(pk(x, z))
    while (x !== x1 || z !== z1) {
      if (x !== x1) x += Math.sign(x1 - x0)
      else z += Math.sign(z1 - z0)
      paths.add(pk(x, z))
    }
  }
  line(0, -1, -10, -1)
  line(0, -1, 9, -1); line(9, -1, 9, -5)
  line(0, -1, 0, 11); line(0, 11, 9, 11); line(9, 11, 9, 10)
  line(0, 9, -3, 9)
  for (let x = -1; x <= 1; x++) for (let z = -2; z <= 0; z++) paths.add(pk(x, z))
  const pond = (x: number, z: number) => Math.hypot(x - 3.5, z - 2.5) < 2.1

  const tops = new Map<string, number>()
  for (let x = -31; x <= 31; x++) for (let z = -31; z <= 31; z++) {
    const n = noise2(x * 0.13 + 3.1, z * 0.13 - 7.7)
    const d = Math.hypot(x, z * 1.05) - n * 3.2
    const fp = footOf(x, z)
    if (d > R && !fp) continue
    const edge = Math.max(0, R - d)
    const isPath = paths.has(pk(x, z)), isPond = pond(x, z)
    const near = footOf(x, z, 2) || isPath || Math.hypot(x - 3.5, z - 2.5) < 3.8 || Math.hypot(x, z) < 4
    let h = 0
    if (!near && edge > 3) {
      h = Math.max(0, Math.round(noise2(x * 0.08 - 11, z * 0.08 + 5) * 2.4 + 0.25))
      h = Math.min(h, Math.floor((edge - 2) / 1.5))
    }
    const bottom = -Math.round(2 + Math.pow(edge, 1.12) * 0.75 + (noise2(x * 0.27 + 20, z * 0.27) + 1) * 1.6)
    for (let y = bottom; y <= h; y++) {
      let t = y === h ? 'grass' : y >= h - 2 ? 'dirt' : 'stone'
      if (t === 'stone' && hash2(x * 7 + y, z * 3) < 0.12) t = 'cobble'
      if (y === h && isPath) t = 'path'
      if (y === h && fp === 'factory') t = 'brick'
      if (isPond && y >= -1) t = 'water'
      if (isPond && y === -2) t = 'dirt'
      put(x, y, z, t)
    }
    tops.set(pk(x, z), h)
  }

  function tree(x: number, z: number, hgt: number) {
    const y0 = tops.get(pk(x, z))
    if (y0 == null) return
    const top = y0 + hgt
    for (let dy = -2; dy <= 1; dy++) {
      const r = dy <= -1 ? 2 : 1
      for (let dx = -r; dx <= r; dx++) for (let dz = -r; dz <= r; dz++) {
        if (Math.abs(dx) === r && Math.abs(dz) === r && (dy === 1 || hash2(x + dx * 3, z + dz + dy) < 0.5)) continue
        if (dy === 1 && Math.abs(dx) + Math.abs(dz) > 1) continue
        put(x + dx, top + dy, z + dz, 'leaves')
      }
    }
    for (let i = 1; i <= hgt; i++) put(x, y0 + i, z, 'log')
  }
  ;[[-20, 5, 5], [-15, 14, 4], [17, 0, 5], [19, 11, 4], [15, 16, 4], [-21, -7, 5], [18, -14, 4], [1, -17, 5], [-4, -19, 4], [-12, 17, 4]]
    .forEach(a => tree(a[0], a[1], a[2]))

  /* landmarks */
  const L_ = (x: number, y: number, z: number, t: string) => put(x, y, z, t, 'lm')
  // Redstone Factory
  for (let x = -16; x <= -4; x++) { for (let y = 1; y <= 4; y++) L_(x, y, -13, 'brick'); if (x % 2 === 0) L_(x, 5, -13, 'brick') }
  ;[-13, -10, -7].forEach(x => L_(x, 3, -13, 'lamp'))
  for (let z = -12; z <= -9; z++) for (let y = 1; y <= 4; y++) L_(-16, y, z, 'brick')
  for (let y = 1; y <= 4; y++) L_(-12, y, -9, 'log')
  for (let x = -16; x <= -12; x++) for (let z = -13; z <= -9; z++) L_(x, 5, z, 'spruce')
  for (const x of [-15, -14]) for (const z of [-12, -11]) { for (let y = 1; y <= 3; y++) L_(x, y, z, 'server'); L_(x, 4, z, 'iron') }
  for (const x of [-9, -8]) for (const z of [-11, -10]) { for (let y = 1; y <= 3; y++) L_(x, y, z, 'dark'); L_(x, 4, z, 'lamp') }
  L_(-5, 1, -9, 'dispenser'); L_(-6, 1, -5, 'piston')
  L_(-14, 1, -5, 'iron'); L_(-11, 1, -5, 'iron'); L_(-13, 1, -5, 'redstone'); L_(-12, 1, -5, 'redstone')
  // Library
  for (let x = 7; x <= 12; x++) for (let z = -13; z <= -9; z++) for (let y = 1; y <= 4; y++) {
    const edgeX = x === 7 || x === 12, edgeZ = z === -13 || z === -9
    if (!edgeX && !edgeZ) { if (y === 4) L_(x, y, z, 'planks'); continue }
    if (z === -9 && (x === 9 || x === 10) && y <= 2) continue
    let t = edgeX && edgeZ ? 'log' : y === 4 ? 'planks' : 'shelf'
    if (y === 2 && ((z === -9 && (x === 8 || x === 11)) || (edgeX && z === -11))) t = 'glass'
    L_(x, y, z, t)
  }
  for (let x = 8; x <= 11; x++) for (let z = -12; z <= -10; z++) L_(x, 0, z, 'planks')
  ;[[6, 13, -14, -8, 5], [7, 12, -13, -9, 6], [8, 11, -12, -10, 7], [9, 10, -11, -11, 8]].forEach(([x0, x1, z0, z1, y]) => {
    for (let x = x0; x <= x1; x++) for (let z = z0; z <= z1; z++) L_(x, y, z, 'dark')
  })
  // Cabin
  for (let x = 7; x <= 11; x++) for (let z = 4; z <= 8; z++) for (let y = 1; y <= 3; y++) {
    const edgeX = x === 7 || x === 11, edgeZ = z === 4 || z === 8
    if (!edgeX && !edgeZ) continue
    if (z === 8 && x === 9 && y <= 2) continue
    let t = edgeX && edgeZ ? 'log' : 'planks'
    if (y === 2 && ((z === 8 && (x === 8 || x === 10)) || (edgeX && z === 6))) t = 'glass'
    L_(x, y, z, t)
  }
  ;[[3, 9, 4], [4, 8, 5], [5, 7, 6], [6, 6, 7]].forEach(([z0, z1, y]) => {
    for (let x = 6; x <= 12; x++) for (let z = z0; z <= z1; z++) L_(x, y, z, 'spruce')
  })
  for (let y = 4; y <= 8; y++) L_(10, y, 5, 'cobble')

  /* title "RAY LIU" in blocks */
  const GLYPH: Record<string, string[]> = {
    R: ['####.', '#...#', '####.', '#..#.', '#...#'], A: ['.###.', '#...#', '#####', '#...#', '#...#'],
    Y: ['#...#', '.#.#.', '..#..', '..#..', '..#..'], L: ['#....', '#....', '#....', '#....', '#####'],
    I: ['###', '.#.', '.#.', '.#.', '###'], U: ['#...#', '#...#', '#...#', '#...#', '.###.'], ' ': ['..', '..', '..', '..', '..']
  }
  {
    let cx = -18, li = 0
    for (const ch of 'RAY LIU') {
      const g = GLYPH[ch]
      for (let r = 0; r < 5; r++) for (let c = 0; c < g[r].length; c++) if (g[r][c] === '#') for (const z of [-24, -25]) put(cx + c, 16 - r, z, 'title', 'title', { li })
      cx += g[0].length + 1
      if (ch !== ' ') li++
    }
  }
  return { W, key, tops }
}

/* ---------- instanced meshes + falling-block intro ---------- */
const DIRS = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]
const FALL = 0.6

export function buildIslandMeshes(world: ReturnType<typeof buildWorld>, MAT: Materials, scene: THREE.Scene) {
  const { W, key } = world
  const byType: Record<string, Block[]> = {}
  for (const b of W.values()) {
    let vis = false
    for (const d of DIRS) {
      const n = W.get(key(b.x + d[0], b.y + d[1], b.z + d[2]))
      if (!n || !occludes(n.t) || b.t === 'water') { vis = true; break }
    }
    if (vis) (byType[b.t] = byType[b.t] || []).push(b)
  }
  const meshes: { mesh: THREE.InstancedMesh; n: number; xs: Float32Array; ys: Float32Array; zs: Float32Array; del: Float32Array }[] = []
  let maxDelay = 0
  const M4 = new THREE.Matrix4(), C = new THREE.Color()
  for (const t in byType) {
    const list = byType[t], n = list.length, def = BT[t]
    const mesh = new THREE.InstancedMesh(blockGeo(def.f), MAT[def.m || 'solid'], n)
    mesh.frustumCulled = false
    mesh.castShadow = t !== 'water'
    mesh.receiveShadow = true
    if (t === 'water') mesh.renderOrder = 2
    const xs = new Float32Array(n), ys = new Float32Array(n), zs = new Float32Array(n), del = new Float32Array(n)
    list.forEach((b, i) => {
      xs[i] = b.x; ys[i] = b.y; zs[i] = b.z
      const r = hash2(b.x * 13 + b.y, b.z * 7 - b.y)
      if (b.g === 'title') del[i] = 2.5 + (b.li || 0) * 0.12 + r * 0.12
      else if (b.g === 'lm') del[i] = 1.7 + (b.y - 1) * 0.08 + r * 0.45
      else del[i] = 0.1 + (Math.hypot(b.x, b.z) / R) * 1.45 + r * 0.35
      maxDelay = Math.max(maxDelay, del[i])
      let shade = 0.93 + r * 0.07
      if (b.y < 0) shade *= 0.68 + 0.32 * Math.max(0, 1 + b.y / 16)
      // Per-instance shade is a plain multiplier, not a colour, so keep it out of colour management.
      C.setRGB(shade, shade, shade, THREE.LinearSRGBColorSpace)
      mesh.setColorAt(i, C)
      M4.makeTranslation(b.x, b.y, b.z)
      mesh.setMatrixAt(i, M4)
    })
    mesh.instanceColor!.needsUpdate = true
    scene.add(mesh)
    meshes.push({ mesh, n, xs, ys, zs, del })
  }
  const introEnd = maxDelay + FALL + 0.15
  // When each block touches down, in order, so the intro can make a sound as blocks land.
  const landTimes = Float32Array.from(meshes.flatMap(d => Array.from(d.del, t => t + FALL))).sort()
  function applyIntro(t: number) {
    for (const d of meshes) {
      const { mesh, n, xs, ys, zs, del } = d
      for (let i = 0; i < n; i++) {
        const p = (t - del[i]) / FALL
        let s: number, y = ys[i]
        if (p <= 0) { s = 0.0001; y += 30 }
        else if (p >= 1) s = 1
        else { const e = 1 - Math.pow(1 - p, 3); s = Math.min(1, 0.35 + p * 1.3); y += (1 - e) * 30 }
        M4.makeScale(s, s, s)
        M4.setPosition(xs[i], y, zs[i])
        mesh.setMatrixAt(i, M4)
      }
      mesh.instanceMatrix.needsUpdate = true
    }
  }
  function dispose() {
    for (const d of meshes) { d.mesh.geometry.dispose(); d.mesh.dispose() }
  }
  return { introEnd, landTimes, applyIntro, dispose }
}
