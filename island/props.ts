import * as THREE from 'three'
import { blockGeo, type Materials } from './world'
import { lerp, mulberry32 } from './rand'

// Non-voxel animated bits: torches, the four flagship machines, chest, smoke, cabin interior, signpost.

const pixelTex = (cv: HTMLCanvasElement) => {
  const t = new THREE.CanvasTexture(cv)
  t.magFilter = t.minFilter = THREE.NearestFilter
  t.generateMipmaps = false
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

export const lam = (c: number) => new THREE.MeshLambertMaterial({ color: c })
export const emis = (c: number, i = 1) => new THREE.MeshLambertMaterial({ color: c, emissive: c, emissiveIntensity: i })

export function boxIn(parent: THREE.Object3D) {
  return (w: number, h: number, d: number, mat: THREE.Material, x: number, y: number, z: number, p: THREE.Object3D = parent) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
    m.position.set(x, y, z)
    m.castShadow = true
    m.receiveShadow = true
    p.add(m)
    return m
  }
}

export interface PropsFrame { dt: number; clock: number; view: string; nightT: number; rideHidesLetter: boolean }

export function buildProps(MAT: Materials, atlas: HTMLCanvasElement, scene: THREE.Scene, signFont: string) {
  const props = new THREE.Group()
  scene.add(props)
  const box = boxIn(props)
  const M4 = new THREE.Matrix4()

  const flameMat = emis(0xffc35a, 1.2), stickMat = lam(0x6b4a2b)
  const torch = (x: number, z: number, y = 0.5) => {
    box(0.12, 0.6, 0.12, stickMat, x, y + 0.3, z)
    box(0.17, 0.17, 0.17, flameMat, x, y + 0.66, z).castShadow = false
  }
  ;[[-12, -2], [-6, -2], [7, -7], [12, -7], [8, 9], [10, 9], [-8, 9]].forEach(([x, z]) => torch(x, z))
  const lampLights = [[-10, 3.5, -6], [9.5, 3, -6.5], [9, 3, 9.6], [-7, 2.6, 9.4]].map(p => {
    const l = new THREE.PointLight(0xffb35c, 0, 15, 1)
    l.position.set(p[0], p[1], p[2])
    scene.add(l)
    return l
  })

  /* rails + minecart (m1): a rounded loop so the corners curve like real track */
  const railPts: [number, number][] = []
  {
    const x0 = -15, x1 = -10, z0 = -7, z1 = -3, r = 1.3, step = 0.1
    const seg = (ax: number, az: number, bx: number, bz: number) => {
      const n = Math.max(1, Math.round(Math.hypot(bx - ax, bz - az) / step))
      for (let i = 0; i < n; i++) railPts.push([lerp(ax, bx, i / n), lerp(az, bz, i / n)])
    }
    const arc = (cx: number, cz: number, a0: number) => {
      const n = Math.ceil((r * Math.PI) / 2 / step)
      for (let i = 0; i < n; i++) { const a = a0 + (i / n) * Math.PI / 2; railPts.push([cx + Math.cos(a) * r, cz + Math.sin(a) * r]) }
    }
    seg(x0 + r, z0, x1 - r, z0); arc(x1 - r, z0 + r, -Math.PI / 2)
    seg(x1, z0 + r, x1, z1 - r); arc(x1 - r, z1 - r, 0)
    seg(x1 - r, z1, x0 + r, z1); arc(x0 + r, z1 - r, Math.PI / 2)
    seg(x0, z1 - r, x0, z0 + r); arc(x0 + r, z0 + r, Math.PI)
  }
  const RN = railPts.length, railLen = [0]
  for (let i = 1; i <= RN; i++) { const a = railPts[i - 1], b = railPts[i % RN]; railLen.push(railLen[i - 1] + Math.hypot(b[0] - a[0], b[1] - a[1])) }
  const loopLen = railLen[RN]
  function loopPos(s: number) {
    s = ((s % loopLen) + loopLen) % loopLen
    let lo = 0, hi = RN
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (railLen[m] <= s) lo = m; else hi = m }
    const a = railPts[lo], b = railPts[(lo + 1) % RN], k = (s - railLen[lo]) / (railLen[lo + 1] - railLen[lo] || 1)
    return { x: lerp(a[0], b[0], k), z: lerp(a[1], b[1], k), rot: Math.atan2(b[0] - a[0], b[1] - a[1]) }
  }
  {
    const Q = new THREE.Quaternion(), UP = new THREE.Vector3(0, 1, 0), P = new THREE.Vector3(), S = new THREE.Vector3(1, 1, 1)
    const ties = Math.floor(loopLen / 0.5)
    const tieMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.86, 0.05, 0.16), lam(0x6b4a2b), ties)
    for (let i = 0; i < ties; i++) {
      const p = loopPos((i * loopLen) / ties)
      Q.setFromAxisAngle(UP, p.rot); P.set(p.x, 0.525, p.z); M4.compose(P, Q, S); tieMesh.setMatrixAt(i, M4)
    }
    tieMesh.receiveShadow = true
    props.add(tieMesh)
    // Each rail is offset from the centre line along the local normal, so inner and outer curves stay joined.
    const side = (o: number) => railPts.map((p, i) => {
      const a = railPts[(i - 1 + RN) % RN], b = railPts[(i + 1) % RN], dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz)
      return [p[0] + (dz / l) * o, p[1] - (dx / l) * o]
    })
    const railMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.07, 0.06, 1), lam(0xa3a3a3), RN * 2)
    ;[side(0.3), side(-0.3)].forEach((pts, j) => pts.forEach((a, i) => {
      const b = pts[(i + 1) % RN], dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz)
      Q.setFromAxisAngle(UP, Math.atan2(dx, dz)); P.set((a[0] + b[0]) / 2, 0.58, (a[1] + b[1]) / 2)
      M4.compose(P, Q, new THREE.Vector3(1, 1, l + 0.012)); railMesh.setMatrixAt(j * RN + i, M4)
    }))
    railMesh.receiveShadow = true
    props.add(railMesh)
  }
  const cart = new THREE.Group()
  props.add(cart)
  box(0.9, 0.42, 0.66, lam(0x6f6f6f), 0, 0.3, 0, cart)
  box(0.76, 0.05, 0.52, lam(0x3a3a3a), 0, 0.5, 0, cart)
  const envelope = box(0.42, 0.28, 0.3, lam(0xfaf4ea), 0, 0.66, 0, cart)
  const envStripe = box(0.44, 0.06, 0.32, lam(0xa5281b), 0, 0.68, 0, cart)
  const podLights = [[-14, -5], [-11, -5]].map(([x, z]) => box(0.3, 0.1, 0.3, emis(0x66ffd0, 0.2), x, 1.55, z))

  /* matching engine items (m17) */
  const buyMat = emis(0x3ccf5a, 0.35), sellMat = emis(0xe0453a, 0.35), goldMat = emis(0xffcf3a, 0.6)
  const items: { m: THREE.Mesh; kind: 'buy' | 'sell' | 'gold'; ph: number }[] = []
  for (let k = 0; k < 3; k++) {
    items.push({ m: box(0.28, 0.28, 0.28, buyMat, 0, 0, 0), kind: 'buy', ph: k })
    items.push({ m: box(0.28, 0.28, 0.28, sellMat, 0, 0, 0), kind: 'sell', ph: k })
    items.push({ m: box(0.32, 0.32, 0.32, goldMat, 0, 0, 0), kind: 'gold', ph: k })
  }

  /* deploy pipeline (m11) */
  const pkg = box(0.36, 0.36, 0.36, emis(0x5aa9e6, 0.3), -5, 0.68, -8)
  const pistonHead = box(0.14, 0.9, 0.9, lam(0xb08a52), -5.43, 1, -5)
  const deployMat = MAT.glow.clone()
  const deployLamp = new THREE.Mesh(blockGeo(11), deployMat)
  deployLamp.position.set(-4, 1, -5)
  deployLamp.castShadow = true
  props.add(deployLamp)

  /* server LEDs (m16) */
  const ledMats = [emis(0x4dff88, 1.4), emis(0xffc04d, 1.4), emis(0xff5a4d, 1.4)]
  const ledList: { m: THREE.Mesh; ph: number; sp: number }[] = []
  {
    const r = mulberry32(321)
    for (const x of [-15, -14]) for (let y = 1; y <= 3; y++) for (const off of [-0.25, 0.2])
      ledList.push({ m: box(0.08, 0.08, 0.04, ledMats[r() < 0.7 ? 0 : r() < 0.6 ? 1 : 2], x + off, y + 0.2, -10.47), ph: r() * 6, sp: 1 + r() * 4 })
    for (const z of [-12, -11]) for (let y = 1; y <= 3; y++)
      ledList.push({ m: box(0.04, 0.08, 0.08, ledMats[r() < 0.75 ? 0 : 1], -13.47, y + 0.25, z + 0.2), ph: r() * 6, sp: 1 + r() * 4 })
    ledList.forEach(l => (l.m.castShadow = false))
  }

  /* cabin: chest + chimney smoke */
  const chest = new THREE.Group()
  chest.position.set(11, 0.5, 9.05)
  props.add(chest)
  box(0.86, 0.6, 0.86, lam(0x9a6a2c), 0, 0.3, 0, chest)
  const lidPivot = new THREE.Group()
  lidPivot.position.set(0, 0.6, -0.43)
  chest.add(lidPivot)
  box(0.88, 0.24, 0.88, lam(0xae7a34), 0, 0.12, 0.44, lidPivot)
  box(0.12, 0.18, 0.06, lam(0xd8d8d8), 0, 0.02, 0.89, lidPivot)
  const smokeMat = new THREE.MeshLambertMaterial({ color: 0xcfcfcf, transparent: true, opacity: 0.75 })
  const smoke = [...Array(6)].map((_, i) => ({ m: box(0.42, 0.42, 0.42, smokeMat, 10, 8.6, 5), ph: i / 6 }))
  smoke.forEach(s => (s.m.castShadow = false))

  /* cabin interior: floor, bed, desk with a glowing monitor, poster, plant */
  box(2.98, 0.03, 2.98, lam(0x9a7846), 9, 0.515, 6)
  box(1.3, 0.02, 1.1, lam(0x8b3a3a), 9, 0.54, 6.6)
  box(0.92, 0.32, 1.9, lam(0xa2804c), 8, 0.66, 5.5)
  box(0.9, 0.16, 1.42, lam(0xb83a2e), 8, 0.9, 5.74)
  box(0.86, 0.16, 0.42, lam(0xf3ece0), 8, 0.9, 4.82)
  {
    const wood = lam(0x6b4a2b)
    box(0.95, 0.08, 0.95, wood, 10, 1.25, 5)
    for (const dx of [-0.4, 0.4]) for (const dz of [-0.4, 0.4]) box(0.08, 0.72, 0.08, wood, 10 + dx, 0.86, 5 + dz)
    box(0.45, 0.08, 0.45, wood, 9.3, 0.95, 5)
    box(0.08, 0.5, 0.45, wood, 9.08, 1.24, 5)
    for (const dx of [-0.18, 0.18]) for (const dz of [-0.18, 0.18]) box(0.06, 0.44, 0.06, wood, 9.3 + dx, 0.7, 5 + dz)
    const cv = document.createElement('canvas')
    cv.width = 32; cv.height = 20
    const g = cv.getContext('2d')!
    g.fillStyle = '#1d2230'; g.fillRect(0, 0, 32, 20)
    const r = mulberry32(808), cols = ['#7fd1ff', '#ffcf5a', '#c38bff', '#8be08b', '#ff8a7a']
    for (let y = 2; y < 18; y += 2) {
      let x = 2 + Math.floor(r() * 3) * 2
      while (x < 28 && r() < 0.85) { const w = 2 + Math.floor(r() * 6); g.fillStyle = cols[Math.floor(r() * cols.length)]; g.fillRect(x, y, Math.min(w, 30 - x), 1); x += w + 1 }
    }
    const frameM = lam(0x2a2a2e)
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.42, 0.66), [frameM, new THREE.MeshBasicMaterial({ map: pixelTex(cv) }), frameM, frameM, frameM, frameM])
    screen.position.set(10.25, 1.62, 5)
    screen.castShadow = true
    props.add(screen)
    box(0.06, 0.16, 0.06, frameM, 10.25, 1.36, 5)
    box(0.2, 0.03, 0.45, lam(0x5a5a5a), 9.85, 1.305, 5)
    const pc = document.createElement('canvas')
    pc.width = 32; pc.height = 24
    const pg = pc.getContext('2d')!
    pg.fillStyle = '#a5281b'; pg.fillRect(0, 0, 32, 24)
    pg.fillStyle = '#fffaf3'; pg.font = 'bold 12px monospace'; pg.textAlign = 'center'; pg.textBaseline = 'middle'
    pg.fillText('</>', 16, 12)
    const poster = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.6), new THREE.MeshLambertMaterial({ map: pixelTex(pc) }))
    poster.position.set(9.1, 2.15, 4.515)
    props.add(poster)
    box(0.36, 0.34, 0.36, lam(0xa0522d), 8.05, 0.67, 7.05)
    const leaf = new THREE.Mesh(blockGeo(8), MAT.cut)
    leaf.scale.setScalar(0.5)
    leaf.position.set(8.05, 1.1, 7.05)
    props.add(leaf)
  }

  /* library: lectern */
  const lect = new THREE.Mesh(blockGeo(7), MAT.solid)
  lect.scale.set(0.8, 0.8, 0.8)
  lect.position.set(9.5, 0.9, -7.2)
  lect.castShadow = true
  props.add(lect)
  box(0.7, 0.05, 0.5, lam(0xf3ece0), 9.5, 1.34, -7.2).rotation.x = -0.25
  box(0.04, 0.06, 0.5, lam(0x8b2f2f), 9.5, 1.36, -7.2).rotation.x = -0.25

  /* signpost + mailbox */
  box(0.16, 1.4, 0.16, stickMat, -7, 1.2, 8)
  const signCv = document.createElement('canvas')
  signCv.width = 320; signCv.height = 180
  const signTex = new THREE.CanvasTexture(signCv)
  signTex.colorSpace = THREE.SRGBColorSpace
  function drawSign(lines: [string, string]) {
    const g = signCv.getContext('2d')!
    g.imageSmoothingEnabled = false
    g.drawImage(atlas, 7 * 16, 0, 16, 16, 0, 0, 320, 180)
    g.fillStyle = '#2b1d10'; g.textAlign = 'center'; g.textBaseline = 'middle'
    g.font = `54px ${signFont}`; g.fillText(lines[0], 160, 68)
    g.font = `34px ${signFont}`; g.fillText(lines[1], 160, 128)
    signTex.needsUpdate = true
  }
  const pm = lam(0xa2804c)
  const sign = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.95, 0.1), [pm, pm, pm, pm, new THREE.MeshLambertMaterial({ map: signTex }), pm])
  sign.position.set(-7, 2.05, 8.06)
  sign.castShadow = true
  props.add(sign)
  box(0.12, 1, 0.12, stickMat, -5, 1, 8)
  box(0.5, 0.4, 0.72, lam(0x3d3d46), -5, 1.65, 8)
  const flagPivot = new THREE.Group()
  flagPivot.position.set(-4.72, 1.6, 8.2)
  props.add(flagPivot)
  box(0.04, 0.5, 0.06, lam(0xc0392b), 0, 0.25, 0, flagPivot)
  box(0.04, 0.14, 0.18, lam(0xc0392b), 0, 0.43, 0.1, flagPivot)

  let chestOpen = 0, flagUp = 0
  function update(f: PropsFrame) {
    const { dt, clock, view, nightT: n } = f
    lampLights.forEach(l => (l.intensity = n * 12))
    flameMat.emissiveIntensity = lerp(0.9, 1.6, n)

    const cp = loopPos(clock * 2.2)
    cart.position.set(cp.x, 0.5, cp.z)
    cart.rotation.y = cp.rot
    envelope.position.y = 0.66 + Math.sin(clock * 6) * 0.02
    envelope.visible = envStripe.visible = !f.rideHidesLetter
    podLights.forEach(p => {
      const near = Math.hypot(p.position.x - cp.x, p.position.z - cp.z) < 2.4
      const m = p.material as THREE.MeshLambertMaterial
      m.emissiveIntensity += ((near ? 1.6 : 0.15) - m.emissiveIntensity) * Math.min(1, dt * 8)
    })
    for (const it of items) {
      const t = (clock + it.ph) % 3
      if (it.kind === 'gold') {
        const p = (t - 1.5) / 1.4
        it.m.visible = p > 0 && p < 1
        if (it.m.visible) it.m.position.set(-8.5, 0.68 + Math.abs(Math.sin(p * 9)) * 0.06, lerp(-9.3, -6.4, p))
        it.m.rotation.y = clock * 2
      } else {
        const p = t / 1.4
        it.m.visible = p < 1
        const x0 = it.kind === 'buy' ? -13.2 : -3.8, x1 = it.kind === 'buy' ? -9.7 : -7.3
        if (it.m.visible) it.m.position.set(lerp(x0, x1, p), 0.66, -10.5 + (it.kind === 'buy' ? 0.18 : -0.18))
      }
    }
    {
      const t = clock % 3.2
      let px = -5, pz = -8, vis = true
      if (t < 1.2) pz = lerp(-8.4, -5, t / 1.2)
      else if (t < 1.6) { pz = -5; px = lerp(-5, -4.35, (t - 1.2) / 0.4) }
      else vis = false
      pkg.visible = vis
      pkg.position.set(px, 0.68, pz)
      const ext = t < 1.2 ? 0 : t < 1.6 ? (t - 1.2) / 0.4 : t < 1.9 ? 1 : t < 2.3 ? 1 - (t - 1.9) / 0.4 : 0
      pistonHead.position.x = -5.43 + ext * 0.5
      deployMat.emissiveIntensity = t > 1.55 && t < 2.6 ? lerp(1.4, 0.15, (t - 1.55) / 1.05) : 0.15
    }
    ledList.forEach(l => (l.m.visible = Math.sin(clock * l.sp + l.ph) > -0.3))
    smoke.forEach(sm => {
      const p = (clock * 0.35 + sm.ph) % 1
      sm.m.position.set(10 + Math.sin(p * 5 + sm.ph * 9) * 0.3, 8.6 + p * 3.4, 5 - p * 0.6)
      sm.m.scale.setScalar(lerp(1, 0.25, p))
    })
    chestOpen += ((view === 'cabin' ? 1 : 0) - chestOpen) * Math.min(1, dt * 4)
    lidPivot.rotation.x = -chestOpen * 1.15
    flagUp += ((view === 'signpost' ? 1 : 0) - flagUp) * Math.min(1, dt * 4)
    flagPivot.rotation.z = -(1 - flagUp) * Math.PI / 2
    return cp
  }

  return { props, box, loopPos, update, drawSign }
}
