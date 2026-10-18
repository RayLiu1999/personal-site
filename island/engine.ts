import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { getAtlas } from './atlas'
import { buildIslandMeshes, buildWorld, createMaterials, pk } from './world'
import { buildProps } from './props'
import { buildIslanders, type Talker } from './islanders'
import { createSound } from './sound'
import { buildBuilder } from './build'
import { createWalker } from './walker'
import type { BlockType, BuildTool, Placed } from './blocks'
import { angLerp, clamp, easeInOut, lerp, mulberry32 } from './rand'

export type ViewId = 'home' | 'factory' | 'library' | 'cabin' | 'signpost' | 'm17' | 'm1' | 'm11' | 'm16'
export const LANDMARKS = ['factory', 'library', 'cabin', 'signpost'] as const
export const MACHINE_IDS = ['m17', 'm1', 'm11', 'm16'] as const
export const isMachine = (id: string) => (MACHINE_IDS as readonly string[]).includes(id)

export interface IslandText {
  tag(id: ViewId): { name: string; sub?: string }
  npc(key: string): { name: string; lines: string[] }
  sign(): [string, string]
  /** Crosshair hint for what right-click does in first person, e.g. "Right-click · talk to Ada". */
  aim(kind: 'talk' | 'open' | 'ride' | 'dismount', name: string): string
}

export interface IslandOptions {
  canvas: HTMLCanvasElement
  /** Holds the landmark name tags. */
  tagLayer: HTMLElement
  bubble: HTMLElement
  /** Shows what right-click would do in first person. */
  aimHint: HTMLElement | null
  splash: HTMLElement | null
  veil: HTMLElement | null
  skyNight: HTMLElement | null
  /** Rect of the open content panel, so the landmark can be framed beside it; null when closed. */
  panelRect(): DOMRect | null
  /** Screen rects of the fixed HUD (top bar, hotbar, panel…); name tags that would sit under them are hidden. */
  obstacles(): DOMRect[]
  isMobile(): boolean
  text: IslandText
  displayFont: string
  initialView: ViewId
  intro: 'full' | 'short' | 'none'
  night: boolean
  reduceMotion: boolean
  /** Sound effects and ambience; off unless the visitor switched them on. */
  sound: boolean
  /** Blocks the visitor placed in build mode on an earlier visit (validated before use). */
  blocks: unknown
  onNavigate(id: ViewId): void
  onReady(): void
  onIntroSkipped(): void
  onLookAroundChange(id: ViewId | null): void
  onBlocksChange(blocks: Placed[]): void
  /** Whether look-around should become free-roaming first person (a mouse and pointer lock are available). */
  freeRoam(): boolean
  /** A look-around spot was entered with free roaming available; the page turns first person on there. */
  onFirstPerson(at: ViewId): void
  /** First-person building has captured (true) or released (false) the mouse. */
  onBuildLock(locked: boolean): void
  /** The mouse wheel stepped through the block hotbar while building in first person. */
  onBuildCycle(step: number): void
}

/* ---------- camera framings ---------- */
const VIEWS: Record<ViewId | 'intro', { t: [number, number, number]; az: number; el: number; d: number }> = {
  home: { t: [0, 3, -3], az: 0, el: 0.36, d: 56 },
  factory: { t: [-10, 2.2, -7.5], az: -0.28, el: 0.5, d: 24 },
  library: { t: [9.5, 3.4, -10.5], az: 0.32, el: 0.34, d: 20 },
  cabin: { t: [9, 2.8, 6], az: 0.42, el: 0.33, d: 17 },
  signpost: { t: [-6.2, 1.7, 8.4], az: -0.3, el: 0.24, d: 10.5 },
  m17: { t: [-8.5, 2.2, -10], az: -0.12, el: 0.38, d: 11 },
  m1: { t: [-12.5, 1, -5], az: -0.3, el: 0.72, d: 11 },
  m11: { t: [-5, 1.3, -6.5], az: 0.5, el: 0.4, d: 9.5 },
  m16: { t: [-14.3, 2.4, -11], az: -0.35, el: 0.22, d: 9.5 },
  intro: { t: [0, 1, -3], az: -0.75, el: 0.85, d: 110 }
}

// Look-around spots: stand at a fixed eye position inside a landmark and turn your head. m1 rides the minecart.
interface Spot { e?: [number, number, number]; l?: [number, number, number]; light?: [number, number, number]; ride?: boolean; yaw?: number; pitch?: number }
const SPOTS: Partial<Record<ViewId, Spot>> = {
  factory: { e: [-7.6, 2.05, -2.2], l: [-11, 1.4, -9.5] },
  library: { e: [9.2, 2.05, -9.8], l: [9.5, 1.9, -13], light: [9.5, 3, -11] },
  cabin: { e: [9, 2.05, 7.4], l: [9.2, 1.3, 4.6], light: [9, 3, 6] },
  m17: { e: [-8.5, 2.3, -6.6], l: [-8.5, 1.8, -10.5] },
  m11: { e: [-2.7, 2.05, -6.2], l: [-5.3, 1, -6.6] },
  m16: { e: [-13, 2.05, -8.2], l: [-14.5, 2.1, -11.5], light: [-13, 3, -10] },
  m1: { ride: true }
}
for (const s of Object.values(SPOTS)) {
  if (!s || s.ride) continue
  const dx = s.l![0] - s.e![0], dy = s.l![1] - s.e![1], dz = s.l![2] - s.e![2]
  s.yaw = Math.atan2(dx, dz)
  s.pitch = Math.atan2(dy, Math.hypot(dx, dz))
}
export const hasLookAround = (id: string) => id in SPOTS

const TAG_ANCHOR: Partial<Record<ViewId, [number, number, number]>> = {
  factory: [-10, 7.6, -8], library: [9.5, 9.4, -11], cabin: [9, 7.9, 7.4], signpost: [-7, 3.5, 8],
  m17: [-8.5, 5.7, -10.5], m1: [-12.5, 2.3, -5], m11: [-5, 2.5, -7], m16: [-14.5, 6.6, -11.5]
}
const HIT: Partial<Record<ViewId, [[number, number, number], [number, number, number]]>> = {
  factory: [[-16.5, 0.5, -13.5], [-3.5, 6, -1.5]], library: [[6.5, 0.5, -14.5], [13.5, 8.5, -6.5]],
  cabin: [[6.5, 0.5, 3.5], [12.5, 8.5, 9.6]], signpost: [[-8, 0.5, 7.5], [-4.4, 3, 8.6]],
  m17: [[-9.5, 0.5, -11.5], [-7.5, 4.6, -9.5]], m1: [[-15.5, 0.5, -7.5], [-9.5, 1.8, -2.5]],
  m11: [[-6.5, 0.5, -9.5], [-3.5, 1.6, -4.5]], m16: [[-15.5, 0.5, -12.5], [-13.5, 4.6, -10.5]]
}

// Three's physically based lights need π× the legacy intensities to keep the prototype's look.
const PI = Math.PI
const linear = (hex: number) => new THREE.Color().setHex(hex, THREE.LinearSRGBColorSpace)
const DAY = { hs: linear(0xcfe3ff), hg: linear(0x6b5a3a), hi: 0.72 * PI, sc: linear(0xfff1d6), si: 0.95 * PI, fog: new THREE.Color(0xb6d1fb), dir: new THREE.Vector3(-0.55, 0.8, 0.25) }
const NIGHT = { hs: linear(0x4a5a9a), hg: linear(0x1a1410), hi: 0.42 * PI, sc: linear(0x9fb4ff), si: 0.32 * PI, fog: new THREE.Color(0x141c3d), dir: new THREE.Vector3(0.5, 0.75, 0.2) }

export function createIsland(o: IslandOptions) {
  const { canvas, reduceMotion } = o
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setClearColor(0x000000, 0)
  let pixelRatio = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2)
  renderer.setPixelRatio(pixelRatio)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(40, 1, 0.5, 600)
  scene.fog = new THREE.Fog(0xb6d1fb, 90, 190)
  const fog = scene.fog as THREE.Fog

  const atlas = getAtlas()
  const MAT = createMaterials(atlas)
  const world = buildWorld()
  const island = buildIslandMeshes(world, MAT, scene)
  const P = buildProps(MAT, atlas, scene, o.displayFont)
  const props = P.props
  const groundY = (x: number, z: number) => (world.tops.get(pk(Math.round(x), Math.round(z))) ?? 0) + 0.5
  const people = buildIslanders(props, P.box, groundY, reduceMotion)
  const sfx = createSound()
  sfx.setEnabled(o.sound)
  const builder = buildBuilder(scene, MAT, {
    ground: island.meshes,
    solid: (x, y, z) => world.W.has(world.key(x, y, z)),
    keepClear: Object.values(HIT) as [[number, number, number], [number, number, number]][]
  })
  builder.load(o.blocks)

  /* ---------- sky dressing ---------- */
  // The sky gradient is drawn by WebGL (same colours as the CSS sky shown before the engine loads), so the canvas
  // is opaque and the night bloom has something to blend onto instead of turning transparent pixels grey.
  const SKY_DAY = ['#6f9ff5', '#b6d1fb', '#e3eefc'], SKY_NIGHT = ['#03050f', '#111938', '#1f2a52']
  const skyCv = document.createElement('canvas')
  skyCv.width = 2
  skyCv.height = 256
  const skyTex = new THREE.CanvasTexture(skyCv)
  skyTex.colorSpace = THREE.SRGBColorSpace
  scene.background = skyTex
  const skyC = new THREE.Color(), skyN = new THREE.Color()
  let skyDrawnFor = -1
  function drawSky(n: number) {
    const g = skyCv.getContext('2d')!, grad = g.createLinearGradient(0, 0, 0, 256)
    // Blend in sRGB like the CSS cross-fade did.
    const stop = (i: number) => '#' + skyC.setStyle(SKY_DAY[i], THREE.LinearSRGBColorSpace).lerp(skyN.setStyle(SKY_NIGHT[i], THREE.LinearSRGBColorSpace), n).getHexString(THREE.LinearSRGBColorSpace)
    grad.addColorStop(0, stop(0)); grad.addColorStop(0.58, stop(1)); grad.addColorStop(1, stop(2))
    g.fillStyle = grad
    g.fillRect(0, 0, 2, 256)
    skyTex.needsUpdate = true
    skyDrawnFor = n
  }
  const sunMesh = new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({ color: 0xfff2a8, fog: false }))
  const moonMesh = new THREE.Mesh(new THREE.PlaneGeometry(11, 11), new THREE.MeshBasicMaterial({ color: 0xe9edff, fog: false }))
  scene.add(sunMesh, moonMesh)
  const starGeo = new THREE.BufferGeometry()
  {
    const r = mulberry32(9), p: number[] = []
    for (let i = 0; i < 420; i++) {
      const th = r() * PI * 2, ph = Math.acos(1 - r() * 0.95)
      p.push(Math.sin(ph) * Math.cos(th) * 260, Math.cos(ph) * 260 - 20, Math.sin(ph) * Math.sin(th) * 260)
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(p, 3))
  }
  const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 2, sizeAttenuation: false, transparent: true, opacity: 0, fog: false })
  scene.add(new THREE.Points(starGeo, starMat))
  const cloudMat = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: linear(0xc8d2e4), transparent: true, opacity: 0.86 })
  const clouds: THREE.InstancedMesh[] = []
  {
    const r = mulberry32(55), cg = new THREE.BoxGeometry(3, 1.2, 3), M4 = new THREE.Matrix4()
    for (let c = 0; c < (coarse ? 5 : 8); c++) {
      const cells: [number, number][] = []
      for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) if (Math.hypot((i - 2.5) / 3, (j - 1.5) / 2) < 1 && r() < 0.75) cells.push([i, j])
      const im = new THREE.InstancedMesh(cg, cloudMat, cells.length)
      im.frustumCulled = false
      cells.forEach(([i, j], k) => { M4.makeTranslation(i * 3, 0, j * 3); im.setMatrixAt(k, M4) })
      im.position.set(-90 + r() * 180, 30 + r() * 6, -70 + r() * 90)
      im.userData.v = 0.6 + r() * 0.6
      scene.add(im)
      clouds.push(im)
    }
  }

  /* ---------- lights ---------- */
  const hemi = new THREE.HemisphereLight(DAY.hs, DAY.hg, DAY.hi)
  scene.add(hemi)
  const sun = new THREE.DirectionalLight(DAY.sc, DAY.si)
  sun.castShadow = true
  sun.shadow.mapSize.set(coarse ? 1024 : 2048, coarse ? 1024 : 2048)
  Object.assign(sun.shadow.camera, { left: -34, right: 34, top: 34, bottom: -34, near: 1, far: 240 })
  sun.shadow.bias = -0.0006
  sun.shadow.radius = 3
  sun.target.position.set(0, 0, -3)
  scene.add(sun, sun.target)
  const fpLight = new THREE.PointLight(0xffd9a0, 0, 8, 1)
  scene.add(fpLight)

  /* ---------- name tags ---------- */
  const tags: Partial<Record<ViewId, { el: HTMLButtonElement; p: THREE.Vector3; w: number; h: number }>> = {}
  for (const id of Object.keys(TAG_ANCHOR) as ViewId[]) {
    const b = document.createElement('button')
    b.type = 'button'
    b.className = 'island-tag' + (isMachine(id) ? ' machine' : '')
    b.hidden = true
    b.addEventListener('click', () => o.onNavigate(id))
    o.tagLayer.appendChild(b)
    tags[id] = { el: b, p: new THREE.Vector3(...TAG_ANCHOR[id]!), w: 0, h: 0 }
  }
  function refreshText() {
    for (const id of Object.keys(tags) as ViewId[]) {
      const t = o.text.tag(id), el = tags[id]!.el
      el.replaceChildren(document.createTextNode(t.name))
      if (t.sub) { const s = document.createElement('small'); s.textContent = t.sub; el.appendChild(s) }
      tags[id]!.w = tags[id]!.h = 0 // re-measure with the new text
    }
    P.drawSign(o.text.sign())
    if (talker) showLine(talker, false)
  }

  /* ---------- picking ---------- */
  const hitMeshes: THREE.Mesh[] = []
  const invisible = new THREE.MeshBasicMaterial({ visible: false })
  for (const id of Object.keys(HIT) as ViewId[]) {
    const [a, b] = HIT[id]!
    const m = new THREE.Mesh(new THREE.BoxGeometry(b[0] - a[0], b[1] - a[1], b[2] - a[2]), invisible)
    m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2)
    m.userData.id = id
    scene.add(m)
    hitMeshes.push(m)
  }
  const outline = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)), new THREE.LineBasicMaterial({ color: 0x111111, transparent: true, opacity: 0.75 }))
  outline.visible = false
  scene.add(outline)
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2()
  let hoverId: string | null = null

  const inFactory = () => view === 'factory' || isMachine(view)
  function aimAt(cx: number, cy: number) {
    const r = canvas.getBoundingClientRect()
    ndc.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1)
    ray.setFromCamera(ndc, camera)
    return ray
  }
  function pick(cx: number, cy: number): string | null {
    aimAt(cx, cy)
    const hits = ray.intersectObjects(hitMeshes, false), nh = ray.intersectObjects(people.hits, false)[0]
    if (nh && (!hits.length || nh.distance < hits[0].distance)) return 'npc:' + nh.object.userData.n
    if (!hits.length) return null
    if (fpId) {
      if (!inFactory()) return null
      const m = hits.find(h => isMachine(h.object.userData.id))
      return m && m.object.userData.id !== view ? m.object.userData.id : null
    }
    if (inFactory()) { const m = hits.find(h => isMachine(h.object.userData.id)); if (m) return m.object.userData.id }
    const id = hits[0].object.userData.id
    return isMachine(id) ? 'factory' : id
  }
  function setHover(id: string | null) {
    hoverId = id
    canvas.classList.toggle('hovering', !!id)
    const box = id ? HIT[id as ViewId] : undefined
    if (box) {
      const [a, b] = box
      outline.visible = true
      outline.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2)
      outline.scale.set(b[0] - a[0] + 0.06, b[1] - a[1] + 0.06, b[2] - a[2] + 0.06)
    } else outline.visible = false
  }

  /* ---------- islanders talking ---------- */
  let talker: Talker | null = null
  function showLine(n: Talker, advance = true) {
    const t = o.text.npc(n.key)
    if (!t.lines.length) return
    if (advance) n.line = (n.line + 1) % t.lines.length
    const b = document.createElement('b')
    b.textContent = t.name
    o.bubble.replaceChildren(b, document.createTextNode(t.lines[Math.max(0, n.line)]))
  }
  function talk(i: number) {
    const n = people.talkers[i]
    people.talkers.forEach(m => (m.talk = 0))
    n.talk = 5
    talker = n
    showLine(n)
    sfx.talk(n.key)
  }

  /* ---------- camera ---------- */
  let vw = 1, vh = 1
  const fit = () => { const a = vw / vh; return a < 1.25 ? Math.min(2.3, 1.25 / a) * 0.92 : 1 }
  function viewFor(id: ViewId | 'intro') {
    const v = VIEWS[id], f = fit()
    return { t: new THREE.Vector3(...v.t), az: v.az, el: v.el, d: v.d * (id === 'home' || id === 'intro' ? f : Math.pow(f, 0.7)) }
  }
  let clock = 0
  let view: ViewId = o.initialView
  const cam = viewFor('home')
  let tw: { from: ReturnType<typeof viewFor>; to: ReturnType<typeof viewFor>; start: number; dur: number } | null = null
  function tweenTo(id: ViewId | 'intro', instant: boolean) {
    const to = viewFor(id)
    if (instant) { cam.t.copy(to.t); cam.az = to.az; cam.el = to.el; cam.d = to.d; tw = null; return }
    tw = { from: { t: cam.t.clone(), az: cam.az, el: cam.el, d: cam.d }, to, start: clock, dur: reduceMotion ? 0.01 : 1.25 }
    if (id !== 'intro') sfx.cue('move')
  }
  let dragAz = 0, dragEl = 0, offX = 0, offY = 0

  /* ---------- look-around ---------- */
  let fpId: ViewId | null = null, spot: Spot | null = null, fpK = 0, fpYaw = 0, fpPitch = 0, rideYaw = 0, lastFov = 40
  const fpEye = new THREE.Vector3(), fpDir = new THREE.Vector3(), orbDir = new THREE.Vector3()
  function enterLookAround(id: ViewId) {
    if (!SPOTS[id] || !ready || view !== id || fpId || walk) return
    if (o.freeRoam()) { o.onFirstPerson(id); return }
    spot = SPOTS[id]!
    fpId = id
    fpYaw = 0; fpPitch = 0
    if (spot.ride) rideYaw = P.loopPos(clock * 2.2).rot
    setHover(null)
    sfx.cue('enter')
    o.onLookAroundChange(id)
  }
  function exitLookAround() {
    if (!fpId) return
    fpId = null
    sfx.cue('exit')
    o.onLookAroundChange(null)
  }
  function lookAround(dYaw: number, dPitch: number) {
    if (!fpId) return
    fpYaw += dYaw
    fpPitch = clamp(fpPitch + dPitch, -1.1, 1.1)
  }

  /* ---------- build mode ---------- */
  let creative = false, buildType: BlockType = 'grass', buildTool: BuildTool = 'place', zoom = 1, zoomT = 1
  const breaking = (e: PointerEvent) => buildTool === 'remove' || e.button === 2 || e.shiftKey
  function report(r: ReturnType<typeof builder.act>) {
    if (r === 'placed' || r === 'removed') {
      sfx.cue(r === 'placed' ? 'place' : 'break')
      o.onBlocksChange(builder.list())
    } else if (r) sfx.cue('deny')
  }
  function build(e: PointerEvent) {
    report(builder.act(aimAt(e.clientX, e.clientY), breaking(e), buildType))
    if (e.pointerType === 'mouse') builder.hover(aimAt(e.clientX, e.clientY), breaking(e))
  }

  /* ---------- first person ---------- */
  // With a mouse, first person is one free-roaming mode, Minecraft style: walk, jump and fly around the island,
  // break blocks with the left button, and with the right button talk to islanders, open a landmark or machine,
  // ride the minecart, or place a block. Touch screens keep the fixed look-around spots and the overview builder.
  const REACH = 8
  const walker = createWalker((x, y, z) => {
    if (builder.has(x, y, z)) return true
    const t = world.W.get(world.key(x, y, z))?.t
    return !!t && t !== 'water'
  })
  let walk = false, walkK = 0, locked = false, riding = false, outlineAt = 0, cycleAt = 0
  const walkDir = new THREE.Vector3(), boxes: Partial<Record<ViewId, THREE.Box3>> = {}, hitPoint = new THREE.Vector3()
  for (const id of Object.keys(HIT) as ViewId[]) { const [a, b] = HIT[id]!; boxes[id] = new THREE.Box3(new THREE.Vector3(...a), new THREE.Vector3(...b)) }
  const MOVE_KEYS = ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space', 'ShiftLeft', 'ShiftRight']
  const centreRay = () => { ray.setFromCamera(ndc.set(0, 0), camera); ray.far = REACH; return ray }

  // What the crosshair would use: an islander, a machine or a landmark, unless a block is in the way.
  type Use = { npc: number } | { id: ViewId }
  function useTarget(r: THREE.Raycaster): Use | null {
    const blockHit = r.intersectObjects(builder.targets, false)[0]?.distance ?? Infinity
    let best: Use | null = null, bestD = REACH
    const npc = r.intersectObjects(people.hits, false)[0]
    if (npc && npc.distance < bestD) { best = { npc: npc.object.userData.n }; bestD = npc.distance }
    let inside: ViewId | null = null
    for (const id of Object.keys(boxes) as ViewId[]) {
      const box = boxes[id]!
      if (box.containsPoint(r.ray.origin)) { if (!isMachine(id)) inside = id; continue }
      if (!r.ray.intersectBox(box, hitPoint)) continue
      const d = hitPoint.distanceTo(r.ray.origin)
      // Machines sit inside the factory's box, so they win over it at the same distance.
      if (d < bestD || (isMachine(id) && d <= bestD + 0.01)) { best = { id }; bestD = d }
    }
    if (best && bestD <= blockHit + 0.01) return best
    // Standing inside a building, the building itself is what you use.
    return inside && !best ? { id: inside } : null
  }
  function use(u: Use) {
    if ('npc' in u) { talk(u.npc); return }
    if (u.id === 'm1') { ride(true); return }
    // Its page is already the current one: just free the mouse so its panel shows.
    if (u.id === view) document.exitPointerLock()
    else o.onNavigate(u.id)
  }
  function ride(on: boolean) {
    if (on === riding) return
    riding = on
    if (on) sfx.cue('enter')
    else {
      const c = P.loopPos(clock * 2.2)
      walker.place(c.x, 2.2, c.z, walker.yaw, walker.pitch)
      sfx.cue('exit')
    }
  }
  function walkAct(button: number) {
    if (riding) return
    const r = centreRay()
    if (button === 2) {
      const u = useTarget(r)
      if (u) use(u)
      else report(builder.act(r, false, buildType, walker.overlaps))
    } else if (button === 0) report(builder.act(r, true, buildType))
    r.far = Infinity
    outlineAt = 0
  }
  // Outline what the crosshair points at and name what right-click would do there.
  function updateAim() {
    const r = centreRay(), u = riding ? null : useTarget(r)
    // No outline around a building you are standing inside.
    setHover(u && 'id' in u && !boxes[u.id]!.containsPoint(r.ray.origin) ? u.id : null)
    if (u) builder.setGhost(false)
    else if (!riding) builder.outline(r)
    r.far = Infinity
    if (o.aimHint) {
      const label = riding ? o.text.aim('dismount', '') : !u ? '' : 'npc' in u ? o.text.aim('talk', o.text.npc(people.talkers[u.npc].key).name) : o.text.aim(u.id === 'm1' ? 'ride' : 'open', o.text.tag(u.id).sub ?? o.text.tag(u.id).name)
      o.aimHint.hidden = !label
      o.aimHint.textContent = label
    }
  }
  function lock() {
    try {
      // Newer browsers return a promise that rejects without a recent click; the pause card asks for one then.
      const p = canvas.requestPointerLock() as unknown as Promise<void> | undefined
      p?.catch?.(() => {})
    } catch { /* pointer lock unavailable */ }
  }
  const onLockChange = () => {
    locked = document.pointerLockElement === canvas
    if (locked) (document.activeElement as HTMLElement | null)?.blur?.()
    else walker.clearKeys()
    o.onBuildLock(locked)
  }
  const onKeyDown = (e: KeyboardEvent) => {
    if (!locked || !MOVE_KEYS.includes(e.code)) return
    if (e.code === 'Space') e.preventDefault()
    if (riding) { if (e.code.startsWith('Shift')) ride(false); return }
    walker.keyDown(e.code, performance.now() / 1000)
  }
  const onKeyUp = (e: KeyboardEvent) => walker.keyUp(e.code)
  document.addEventListener('pointerlockchange', onLockChange)
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)

  function spawnAt(at: ViewId | null) {
    const s = at ? SPOTS[at] : undefined
    riding = !!s?.ride
    if (riding) { const c = P.loopPos(clock * 2.2); walker.place(c.x, 2.2, c.z, c.rot, -0.12) }
    else if (s) walker.place(s.e![0], s.e![1], s.e![2], s.yaw!, s.pitch!)
    else walker.place(0, 4, 16, PI, -0.2)
  }

  /** Build mode: first person with a mouse (optionally starting at a look-around spot), the overview otherwise. */
  function setCreative(on: boolean, firstPerson = false, at: ViewId | null = null) {
    if (on === creative) return
    if (on && fpId) exitLookAround()
    creative = on
    walk = on && firstPerson
    setHover(null)
    builder.setGhost(false)
    if (walk) {
      spawnAt(at)
      sfx.cue('enter')
      lock()
    }
    if (!on) {
      if (locked) document.exitPointerLock()
      riding = false
      if (o.aimHint) o.aimHint.hidden = true
      zoomT = 1
      // Unwind any full turns so the camera eases back the short way.
      dragAz = Math.atan2(Math.sin(dragAz), Math.cos(dragAz))
      if (ready) tweenTo(view, false)
    }
  }

  /* ---------- input ---------- */
  let down: { x: number; y: number; lx: number; ly: number; drag: boolean; id: number } | null = null
  const onDown = (e: PointerEvent) => {
    if (!ready) { skipIntro(); return }
    if (walk) {
      // Clicking back into the world recaptures the mouse, which tucks any open panel away again.
      if (locked) walkAct(e.button)
      else lock()
      return
    }
    down = { x: e.clientX, y: e.clientY, lx: e.clientX, ly: e.clientY, drag: false, id: e.pointerId }
  }
  const onMove = (e: PointerEvent) => {
    if (locked) { walker.look(-e.movementX * 0.0025, -e.movementY * 0.0025); return }
    if (down && e.pointerId === down.id) {
      if (!down.drag && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) {
        down.drag = true
        canvas.classList.add('dragging')
        try { canvas.setPointerCapture(e.pointerId) } catch { /* pointer already released */ }
      }
      if (down.drag && fpId) lookAround((e.clientX - down.lx) * 0.005, (e.clientY - down.ly) * 0.004)
      else if (down.drag && creative) {
        // Build mode turns all the way round, so you can build on every side.
        builder.setGhost(false)
        dragAz -= (e.clientX - down.lx) * 0.005
        dragEl = clamp(dragEl + (e.clientY - down.ly) * 0.003, -0.3, 0.75)
      } else if (down.drag) {
        dragAz = clamp(dragAz - (e.clientX - down.lx) * 0.004, -0.6, 0.6)
        dragEl = clamp(dragEl + (e.clientY - down.ly) * 0.003, -0.22, 0.3)
      }
      down.lx = e.clientX
      down.ly = e.clientY
    } else if (ready && e.target === canvas && e.pointerType === 'mouse') {
      if (creative) { if (!walk) builder.hover(aimAt(e.clientX, e.clientY), breaking(e)) }
      else setHover(pick(e.clientX, e.clientY))
    }
  }
  const onUp = (e: PointerEvent) => {
    if (!down || e.pointerId !== down.id) return
    const wasDrag = down.drag
    down = null
    canvas.classList.remove('dragging')
    if (wasDrag || e.target !== canvas) return
    if (creative) { build(e); return }
    const id = pick(e.clientX, e.clientY)
    if (!id) return
    if (id.startsWith('npc:')) talk(+id.slice(4))
    else if (id === view && SPOTS[id as ViewId]) enterLookAround(id as ViewId)
    else o.onNavigate(id as ViewId)
  }
  const onLeave = () => { if (!down) { setHover(null); builder.setGhost(false) } }
  const onWheel = (e: WheelEvent) => {
    if (!ready) skipIntro()
    else if (locked) {
      // Trackpads send a burst of small wheel events, so step at most once per 120 ms.
      if (performance.now() - cycleAt > 120 && Math.abs(e.deltaY) > 2) { cycleAt = performance.now(); o.onBuildCycle(Math.sign(e.deltaY)) }
    } else if (creative && !walk && e.target === canvas) zoomT = clamp(zoomT * Math.exp(e.deltaY * 0.0012), 0.3, 1.25)
  }
  // Right-click breaks blocks in build mode, so keep the browser menu out of the way there.
  const onMenu = (e: MouseEvent) => { if (creative) e.preventDefault() }
  canvas.addEventListener('contextmenu', onMenu)
  canvas.addEventListener('pointerdown', onDown)
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp)
  canvas.addEventListener('pointerleave', onLeave)
  window.addEventListener('wheel', onWheel, { passive: true })

  /* ---------- intro ---------- */
  let introT = 0, introSpeed = o.intro === 'short' ? island.introEnd / 1.1 : 1, ready = false, landed = 0
  function skipIntro() {
    if (ready || introT >= island.introEnd) return
    introT = island.introEnd
    o.onIntroSkipped()
  }
  function finishIntro() {
    ready = true
    island.applyIntro(1e9)
    props.visible = true
    builder.group.visible = true
    // Blocks have settled, so size the bounds build mode raycasts against.
    island.meshes.forEach(m => m.computeBoundingSphere())
    if (o.veil) { o.veil.style.opacity = '0'; setTimeout(() => o.veil && (o.veil.hidden = true), 900) }
    o.onReady()
    tweenTo(view, false)
  }

  /* ---------- day / night ---------- */
  let night = o.night, nightT = night ? 1 : 0

  /* ---------- night glow ---------- */
  // Bloom only runs at night, when lamps, torches and server LEDs are the brightest things on screen;
  // by day the frame is rendered directly and the extra passes cost nothing.
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0, 0.2, 0.75)
  composer.addPass(bloom)
  composer.addPass(new OutputPass())

  /* ---------- adaptive quality ---------- */
  // After the intro, sample the frame rate; if the device can't keep up, first drop the glow, then resolution.
  let glowAllowed = true, sampleStart = -1, sampleFrames = 0
  function watchFrameRate(now: number) {
    if (!ready || document.hidden || tw) { sampleStart = -1; return }
    if (sampleStart < 0) { sampleStart = now; sampleFrames = 0; return }
    sampleFrames++
    const elapsed = now - sampleStart
    if (elapsed < 3000) return
    const fps = (sampleFrames * 1000) / elapsed
    sampleStart = -1
    if (fps >= 40) return
    if (glowAllowed && nightT > 0.02) glowAllowed = false
    else if (pixelRatio > 1) { pixelRatio = 1; renderer.setPixelRatio(1); resize() }
  }

  /* ---------- resize & loop ---------- */
  let blockersAt = -1
  function resize() {
    vw = canvas.clientWidth || innerWidth
    vh = canvas.clientHeight || innerHeight
    renderer.setSize(vw, vh, false)
    composer.setPixelRatio(renderer.getPixelRatio())
    composer.setSize(vw, vh)
    camera.aspect = vw / vh
    camera.updateProjectionMatrix()
    if (!tw && ready) tweenTo(view, true)
    blockersAt = -1
  }
  window.addEventListener('resize', resize)
  resize()

  const camPos = new THREE.Vector3(), dir = new THREE.Vector3(), V = new THREE.Vector3()
  function place(el: HTMLElement, x: number, y: number, extra: string) {
    el.style.transform = `translate(${(x * 0.5 + 0.5) * vw}px,${(-y * 0.5 + 0.5) * vh}px) ${extra}`
  }
  // HUD rects change only on resize or when the panel slides, so refresh them a few times a second
  // instead of forcing a layout read every frame.
  let blockers: DOMRect[] = []
  function tagFits(tg: { el: HTMLElement; w: number; h: number }, x: number, y: number) {
    if (!tg.w) { tg.el.hidden = false; tg.w = tg.el.offsetWidth; tg.h = tg.el.offsetHeight }
    // A tag already hidden needs a little clearance before it comes back, so it doesn't flicker at an edge.
    const m = tg.el.hidden ? 6 : 0
    const l = x - tg.w / 2 - m, r = x + tg.w / 2 + m, t = y - tg.h - m, b = y + m
    if (l < 0 || r > vw || t < 0 || b > vh) return false
    return !blockers.some(k => l < k.right && r > k.left && t < k.bottom && b > k.top)
  }
  function updateOverlay() {
    if (blockersAt < 0 || clock - blockersAt > 0.25) { blockers = o.obstacles(); blockersAt = clock }
    for (const id of Object.keys(tags) as ViewId[]) {
      const tg = tags[id]!
      let show = ready && !creative && id !== view && (isMachine(id) ? inFactory() : !(inFactory() && id === 'factory'))
      if (show) {
        V.copy(tg.p).project(camera)
        show = V.z < 1 && tagFits(tg, (V.x * 0.5 + 0.5) * vw, (-V.y * 0.5 + 0.5) * vh)
      }
      tg.el.hidden = !show
      if (show) place(tg.el, V.x, V.y, 'translate(-50%,-100%)')
      tg.el.classList.toggle('hot', hoverId === id)
    }
    if (o.splash) { V.set(18.6, 17.4, -24).project(camera); place(o.splash, V.x, V.y, 'translate(-50%,-50%) rotate(-16deg)') }
    if (talker && talker.talk <= 0) talker = null
    let show = !!talker && ready
    if (show) { V.copy(talker!.g.position); V.y += talker!.h; V.project(camera); show = V.z < 1 && Math.abs(V.x) < 1.05 && Math.abs(V.y) < 1.05 }
    o.bubble.hidden = !show
    if (show) place(o.bubble, V.x, V.y, 'translate(-50%,calc(-100% - 12px))')
  }

  let last = performance.now(), raf = 0
  function frame(now: number) {
    raf = requestAnimationFrame(frame)
    if (document.hidden) { last = now; return }
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    clock += dt

    if (!ready) {
      introT += dt * introSpeed
      island.applyIntro(introT)
      const before = landed
      while (landed < island.landTimes.length && island.landTimes[landed] <= introT) landed++
      sfx.land(landed - before)
      if (o.veil) o.veil.style.opacity = String(clamp(1 - introT / 0.8, 0, 1))
      props.visible = introT > 2.4
      const k = easeInOut(clamp(introT / island.introEnd, 0, 1)), a = viewFor('intro'), b = viewFor(view)
      cam.t.lerpVectors(a.t, b.t, k); cam.az = lerp(a.az, b.az, k); cam.el = lerp(a.el, b.el, k); cam.d = lerp(a.d, b.d, k)
      if (introT >= island.introEnd) finishIntro()
    }
    if (tw) {
      const p = clamp((clock - tw.start) / tw.dur, 0, 1), e = easeInOut(p)
      cam.t.lerpVectors(tw.from.t, tw.to.t, e)
      cam.az = lerp(tw.from.az, tw.to.az, e); cam.el = lerp(tw.from.el, tw.to.el, e); cam.d = lerp(tw.from.d, tw.to.d, e)
      dragAz *= 1 - Math.min(1, dt * 4); dragEl *= 1 - Math.min(1, dt * 4)
      if (p >= 1) tw = null
    }

    zoom += (zoomT - zoom) * Math.min(1, dt * 8)
    const sway = view === 'home' && !reduceMotion && !creative ? Math.sin(clock * 0.18) * 0.07 : 0
    const az = cam.az + dragAz + sway, el = clamp(cam.el + dragEl, 0.04, 1.25)
    camPos.set(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)).multiplyScalar(cam.d * zoom).add(cam.t)
    camera.position.copy(camPos)
    camera.lookAt(cam.t)

    // blend into the look-around eye
    fpK += ((fpId ? 1 : 0) - fpK) * Math.min(1, reduceMotion ? 1 : dt * 3.2)
    if (fpK < 0.001 && !fpId) { fpK = 0; spot = null }
    const cp = P.loopPos(clock * 2.2)
    if (spot) {
      const k = easeInOut(clamp(fpK, 0, 1))
      let yaw: number, pitch: number
      if (spot.ride) {
        rideYaw = angLerp(rideYaw, cp.rot, Math.min(1, dt * 7))
        fpEye.set(cp.x - Math.sin(rideYaw) * 0.12, 1.45, cp.z - Math.cos(rideYaw) * 0.12)
        yaw = rideYaw + fpYaw
        pitch = -0.12 + fpPitch
      } else {
        fpEye.set(...spot.e!)
        yaw = spot.yaw! + fpYaw
        pitch = spot.pitch! + fpPitch
      }
      pitch = clamp(pitch, -1.35, 1.35)
      fpDir.set(Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch))
      orbDir.copy(cam.t).sub(camPos).normalize().lerp(fpDir, k).normalize()
      camera.position.lerpVectors(camPos, fpEye, k)
      camera.lookAt(camera.position.x + orbDir.x, camera.position.y + orbDir.y, camera.position.z + orbDir.z)
      fpLight.intensity = spot.light ? k * 4 : 0
      if (spot.light) fpLight.position.set(...spot.light)
    } else fpLight.intensity = 0

    // blend into the first-person eye
    walkK += ((walk ? 1 : 0) - walkK) * Math.min(1, reduceMotion ? 1 : dt * 3.2)
    if (walkK < 0.001 && !walk) walkK = 0
    if (walkK > 0) {
      if (riding) walker.eye.set(cp.x, 1.45, cp.z)
      else if (walk && locked && walker.update(dt)) sfx.cue('step')
      const k = easeInOut(clamp(walkK, 0, 1)), yaw = walker.yaw, pitch = walker.pitch
      walkDir.set(Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch))
      orbDir.copy(cam.t).sub(camPos).normalize().lerp(walkDir, k).normalize()
      camera.position.lerpVectors(camPos, walker.eye, k)
      camera.lookAt(camera.position.x + orbDir.x, camera.position.y + orbDir.y, camera.position.z + orbDir.z)
      // Raycasting the whole island is the costly part, so refresh the aim about 20 times a second.
      if (walk && walkK > 0.9 && locked && clock - outlineAt > 0.05) {
        outlineAt = clock
        camera.updateMatrixWorld()
        updateAim()
      }
    }
    const eyeK = Math.max(fpK, walkK)
    const fov = lerp(40, 72, easeInOut(clamp(eyeK, 0, 1)))
    if (Math.abs(fov - lastFov) > 0.01) {
      lastFov = fov
      camera.fov = fov
      camera.near = lerp(0.5, 0.05, eyeK)
      camera.updateProjectionMatrix()
    }

    // shift the view so the landmark stays clear of the panel
    const pr = o.panelRect(), mobile = o.isMobile()
    const tx = pr && !mobile ? (pr.width + 32) / 2 : 0
    const ty = pr && mobile ? (vh - pr.top > 0 ? Math.min(vh * 0.42, (vh - pr.top) / 2) : 0) : 0
    offX += (tx - offX) * Math.min(1, dt * 5)
    offY += (ty - offY) * Math.min(1, dt * 5)
    if (Math.abs(offX) + Math.abs(offY) > 0.5) camera.setViewOffset(vw, vh, offX, offY, vw, vh)
    else camera.clearViewOffset()

    // day / night
    nightT += ((night ? 1 : 0) - nightT) * Math.min(1, reduceMotion ? 1 : dt * 1.6)
    const n = nightT
    hemi.color.copy(DAY.hs).lerp(NIGHT.hs, n)
    hemi.groundColor.copy(DAY.hg).lerp(NIGHT.hg, n)
    hemi.intensity = lerp(DAY.hi, NIGHT.hi, n)
    sun.color.copy(DAY.sc).lerp(NIGHT.sc, n)
    sun.intensity = lerp(DAY.si, NIGHT.si, n)
    dir.copy(DAY.dir).lerp(NIGHT.dir, n).normalize()
    sun.position.copy(dir).multiplyScalar(90).add(sun.target.position)
    fog.color.copy(DAY.fog).lerp(NIGHT.fog, n)
    fog.near = cam.d * 1.5
    fog.far = cam.d * 1.5 + 130
    if (o.skyNight) o.skyNight.style.opacity = n.toFixed(3)
    if (Math.abs(n - skyDrawnFor) > 0.004) drawSky(n)
    starMat.opacity = n
    MAT.glow.emissiveIntensity = lerp(0.45, 1.05, n)
    cloudMat.emissive.setRGB(lerp(0.78, 0.12, n), lerp(0.82, 0.14, n), lerp(0.9, 0.24, n))
    cloudMat.opacity = lerp(0.86, 0.55, n)
    sunMesh.position.set(-90, lerp(70, -60, n), -170)
    moonMesh.position.set(95, lerp(-60, 65, n), -170)
    sunMesh.visible = n < 0.97
    moonMesh.visible = n > 0.03
    sunMesh.lookAt(camera.position)
    moonMesh.lookAt(camera.position)

    // ambient life
    clouds.forEach(c => { c.position.x += dt * c.userData.v; if (c.position.x > 110) c.position.x = -120 })
    P.update({ dt, clock, view, nightT: n, rideHidesLetter: !!(spot && spot.ride && fpK > 0.3) || (riding && walkK > 0.3) })
    people.update(dt, clock, camera)
    sfx.update(dt, n, !!(spot && spot.ride && fpId) || (riding && walk))

    bloom.strength = lerp(0, 0.6, n)
    if (glowAllowed && n > 0.02) composer.render(dt)
    else renderer.render(scene, camera)
    watchFrameRate(now)
    updateOverlay()
  }

  refreshText()
  if (o.intro === 'none') { introT = island.introEnd; island.applyIntro(1e9); if (o.veil) o.veil.hidden = true; finishIntro(); tweenTo(view, true) }
  else { island.applyIntro(0); tweenTo('intro', true) }
  raf = requestAnimationFrame(frame)

  return {
    setView(id: ViewId, instant = false) {
      if (fpId) exitLookAround()
      if (id === view && !instant) return
      view = id
      // In first person a panel opening (from right-clicking a landmark) frees the mouse so the panel shows.
      if (walk && id !== 'home' && locked) document.exitPointerLock()
      if (ready) tweenTo(id, instant)
    },
    setNight(on: boolean) {
      if (on !== night && ready) sfx.cue(on ? 'night' : 'day')
      night = on
    },
    setSound(on: boolean) { sfx.setEnabled(on) },
    setCreative,
    blockCount: () => builder.count(),
    setBuildType(t: BlockType) { buildType = t },
    setBuildTool(t: BuildTool) { buildTool = t },
    zoomBy(f: number) { zoomT = clamp(zoomT * f, 0.3, 1.25) },
    clearBlocks() {
      builder.clear()
      sfx.cue('break')
      o.onBlocksChange([])
    },
    enterLookAround,
    exitLookAround,
    lookAround,
    skipIntro,
    refreshText,
    dispose() {
      cancelAnimationFrame(raf)
      sfx.dispose()
      canvas.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('contextmenu', onMenu)
      document.removeEventListener('pointerlockchange', onLockChange)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      if (locked) document.exitPointerLock()
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('resize', resize)
      for (const t of Object.values(tags)) t?.el.remove()
      island.dispose()
      scene.traverse(obj => {
        const m = obj as THREE.Mesh
        if (m.geometry) m.geometry.dispose()
        const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : []
        for (const mat of mats) { (mat as THREE.MeshLambertMaterial).map?.dispose(); mat.dispose() }
      })
      composer.dispose()
      skyTex.dispose()
      bloom.dispose()
      renderer.dispose()
    }
  }
}

export type IslandEngine = ReturnType<typeof createIsland>
