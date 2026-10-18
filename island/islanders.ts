import * as THREE from 'three'
import { angLerp, lerp } from './rand'
import { lam } from './props'

// Islanders (島民): original blocky characters that walk set routes near their landmark and talk when clicked.

type Box = (w: number, h: number, d: number, mat: THREE.Material, x: number, y: number, z: number, p?: THREE.Object3D) => THREE.Mesh
type Route = number[][] // [x, z] or [x, z, faceX, faceZ] — the optional pair is where to look while waiting there

export interface Talker {
  key: string
  g: THREE.Group
  h: number
  talk: number
  line: number
  x: number
  z: number
  yaw: number
}

function faceTex(skin: string, hair: string, eye: string, extra?: (g: CanvasRenderingContext2D) => void) {
  const c = document.createElement('canvas')
  c.width = c.height = 8
  const g = c.getContext('2d')!
  g.fillStyle = skin; g.fillRect(0, 0, 8, 8)
  g.fillStyle = hair; g.fillRect(0, 0, 8, 2); g.fillRect(0, 2, 1, 1); g.fillRect(7, 2, 1, 1)
  g.fillStyle = '#ffffff'; g.fillRect(1, 4, 2, 1); g.fillRect(5, 4, 2, 1)
  g.fillStyle = eye; g.fillRect(2, 4, 1, 1); g.fillRect(5, 4, 1, 1)
  g.fillStyle = 'rgba(0,0,0,.28)'; g.fillRect(3, 6, 2, 1)
  if (extra) extra(g)
  const t = new THREE.CanvasTexture(c)
  t.magFilter = t.minFilter = THREE.NearestFilter
  t.generateMipmaps = false
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

interface Look {
  skin: string; hair: string; eye?: string; shirt: number; pants: number
  face?: (g: CanvasRenderingContext2D) => void
  gear?: (g: THREE.Group, head: THREE.Mesh, arms: THREE.Group[], box: Box) => void
}

const ISLANDERS: { key: string; speed: number; route: Route; look: Look }[] = [
  {
    key: 'eng', speed: 1.1, route: [[-7.4, -4.4], [-7.3, -7.8], [-11, -8.4, -14.5, -11.5]],
    look: {
      skin: '#e8b98f', hair: '#4a2f1b', shirt: 0x3c6fb0, pants: 0x2c4f80,
      gear: (g, h, _a, box) => { box(0.5, 0.14, 0.5, lam(0xf2c230), 0, 0.27, 0, h); box(0.56, 0.04, 0.6, lam(0xf2c230), 0, 0.21, 0.03, h); box(0.47, 0.12, 0.27, lam(0xd9822b), 0, 1.05, 0, g) }
    }
  },
  {
    key: 'lib', speed: 0.85, route: [[12, -5.5, 9.5, -7.2], [10.15, -6.3], [10.15, -11.2, 9.5, -13]],
    look: {
      skin: '#f1c9a5', hair: '#d9d4cc', shirt: 0x6a4c93, pants: 0x4a3568,
      face: g => { g.fillStyle = '#2b1d10'; g.fillRect(0, 3, 8, 1); g.fillRect(3, 4, 2, 1) },
      gear: (_g, _h, arms, box) => { box(0.3, 0.36, 0.1, lam(0x8b2f2f), 0, -0.42, 0.16, arms[1]) }
    }
  },
  {
    key: 'post', speed: 1.3, route: [[-5.5, 9.3, -5, 8], [-3, 9.1], [0, 9], [0, 1.5, 0, -3]],
    look: {
      skin: '#c98e64', hair: '#2b1d10', shirt: 0x34558b, pants: 0x2b3550,
      gear: (g, h, _a, box) => {
        box(0.48, 0.12, 0.48, lam(0xb8322a), 0, 0.27, 0, h); box(0.48, 0.04, 0.22, lam(0xb8322a), 0, 0.22, 0.32, h)
        box(0.12, 0.38, 0.36, lam(0x8b5a2b), -0.31, 0.82, 0, g); box(0.5, 0.05, 0.28, lam(0x6b4a2b), 0, 1.15, 0, g)
      }
    }
  },
  {
    key: 'hiker', speed: 1.2, route: [[-9.5, -1.2, -15, -1], [-2, -1.2], [0.2, 0.5], [0.2, 10.8], [8.6, 10.9, 9, 8]],
    look: {
      skin: '#a8714a', hair: '#5b3a1e', shirt: 0x5d8a3c, pants: 0x6b5232,
      gear: (g, _h, _a, box) => { box(0.4, 0.5, 0.2, lam(0x8b5a2b), 0, 0.95, -0.24, g); box(0.42, 0.1, 0.22, lam(0xc9a76a), 0, 1.25, -0.24, g) }
    }
  }
]

export function buildIslanders(parent: THREE.Group, box: Box, groundY: (x: number, z: number) => number, reduceMotion: boolean) {
  const invisible = new THREE.MeshBasicMaterial({ visible: false })

  const npcs = ISLANDERS.map((c, i) => {
    const o = c.look
    const g = new THREE.Group()
    const skin = lam(parseInt(o.skin.slice(1), 16)), hairM = lam(parseInt(o.hair.slice(1), 16)), shirt = lam(o.shirt), pants = lam(o.pants), shoes = lam(0x3a2a1e)
    const face = new THREE.MeshLambertMaterial({ map: faceTex(o.skin, o.hair, o.eye || '#2b1d10', o.face) })
    const legs: THREE.Group[] = [], arms: THREE.Group[] = []
    for (const sx of [-0.11, 0.11]) {
      const p = new THREE.Group(); p.position.set(sx, 0.62, 0); g.add(p)
      box(0.2, 0.52, 0.22, pants, 0, -0.26, 0, p); box(0.21, 0.1, 0.23, shoes, 0, -0.57, 0, p)
      legs.push(p)
    }
    box(0.46, 0.6, 0.26, shirt, 0, 0.92, 0, g)
    for (const sx of [-0.31, 0.31]) {
      const p = new THREE.Group(); p.position.set(sx, 1.18, 0); g.add(p)
      box(0.15, 0.46, 0.18, shirt, 0, -0.21, 0, p); box(0.15, 0.12, 0.18, skin, 0, -0.5, 0, p)
      arms.push(p)
    }
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.44, 0.44), [skin, skin, hairM, skin, face, hairM])
    head.position.y = 1.45
    head.castShadow = true
    g.add(head)
    o.gear?.(g, head, arms, box)
    parent.add(g)
    return { key: c.key, route: c.route, speed: c.speed, g, legs, arms, head, h: 1.95, i: 0, dir: 1, wait: 1 + i * 0.8, phase: 0, amp: 0, yaw: 0, talk: 0, line: -1, x: c.route[0][0], z: c.route[0][1] }
  })

  function chicken(x: number, z: number) {
    const g = new THREE.Group(), w = lam(0xf4f1ea), y = lam(0xe8a33a)
    box(0.36, 0.3, 0.5, w, 0, 0.38, 0, g); box(0.05, 0.24, 0.05, y, -0.08, 0.12, 0, g); box(0.05, 0.24, 0.05, y, 0.08, 0.12, 0, g)
    const head = new THREE.Group(); head.position.set(0, 0.55, 0.22); g.add(head)
    box(0.22, 0.28, 0.2, w, 0, 0.08, 0, head); box(0.12, 0.07, 0.12, y, 0, 0.06, 0.15, head); box(0.06, 0.1, 0.04, lam(0xc0392b), 0, -0.04, 0.12, head)
    for (const sx of [-0.111, 0.111]) box(0.01, 0.05, 0.05, lam(0x111111), sx, 0.14, 0.04, head)
    parent.add(g)
    return { key: 'hen', g, head, h: 1.05, x, z, tx: x, tz: z, yaw: 0, wait: Math.random() * 2, talk: 0, line: -1, seed: Math.random() * 9 }
  }
  const hens = [chicken(2.5, 7), chicken(4, 8.5)]

  const talkers: Talker[] = [...npcs, ...hens]
  const hits: THREE.Mesh[] = []
  talkers.forEach((n, i) => {
    const hen = n.key === 'hen'
    const m = new THREE.Mesh(new THREE.BoxGeometry(hen ? 0.7 : 0.8, hen ? 0.8 : 1.8, hen ? 0.7 : 0.8), invisible)
    m.position.y = hen ? 0.4 : 0.9
    m.userData.n = i
    n.g.add(m)
    hits.push(m)
  })

  const turnTo = (n: { yaw: number; g: THREE.Group }, target: number, dt: number) => {
    n.yaw = angLerp(n.yaw, target, Math.min(1, dt * 7))
    n.g.rotation.y = n.yaw
  }
  const settle = (n: { g: THREE.Group; x: number; z: number }, dt: number, bob = 0) => {
    const gy = groundY(n.x, n.z)
    n.g.position.set(n.x, lerp(n.g.position.y || gy, gy, Math.min(1, dt * 10)) + bob, n.z)
  }

  function update(dt: number, clock: number, camera: THREE.Camera) {
    const faceCam = (n: Talker) => turnTo(n, Math.atan2(camera.position.x - n.x, camera.position.z - n.z), dt)
    for (const n of npcs) {
      let moving = false
      if (n.talk > 0) { n.talk -= dt; faceCam(n) }
      else if (n.wait > 0 || reduceMotion) {
        n.wait -= dt
        const w = n.route[n.i]
        if (w.length > 2) turnTo(n, Math.atan2(w[2] - n.x, w[3] - n.z), dt)
      } else {
        const ni = n.i + n.dir, tg = n.route[ni], dx = tg[0] - n.x, dz = tg[1] - n.z, d = Math.hypot(dx, dz), step = n.speed * dt
        if (d <= step) {
          n.x = tg[0]; n.z = tg[1]; n.i = ni
          if (ni === 0 || ni === n.route.length - 1) { n.dir = -n.dir; n.wait = 2.5 + Math.random() * 3 }
        } else { n.x += (dx / d) * step; n.z += (dz / d) * step; moving = true; turnTo(n, Math.atan2(dx, dz), dt) }
      }
      if (moving) n.phase += dt * n.speed * 6.5
      n.amp += ((moving ? 1 : 0) - n.amp) * Math.min(1, dt * 8)
      const sw = Math.sin(n.phase) * 0.6 * n.amp
      n.legs[0].rotation.x = sw; n.legs[1].rotation.x = -sw
      n.arms[0].rotation.x = -sw; n.arms[1].rotation.x = sw * (n.key === 'lib' ? 0.3 : 1)
      n.head.rotation.y = n.talk > 0 ? 0 : Math.sin(clock * 0.7 + n.speed * 9) * 0.3 * (1 - n.amp)
      settle(n, dt, Math.abs(Math.sin(n.phase)) * 0.05 * n.amp)
    }
    for (const c of hens) {
      if (c.talk > 0) { c.talk -= dt; faceCam(c); c.head.rotation.x = 0 }
      else if (c.wait > 0 || reduceMotion) { c.wait -= dt; c.head.rotation.x = Math.max(0, Math.sin(clock * 7 + c.seed)) * 0.8 }
      else {
        const dx = c.tx - c.x, dz = c.tz - c.z, d = Math.hypot(dx, dz), step = 0.7 * dt
        if (d <= step) { c.wait = 1.5 + Math.random() * 3.5; c.tx = 1.4 + Math.random() * 3.6; c.tz = 5.4 + Math.random() * 4.2 }
        else { c.x += (dx / d) * step; c.z += (dz / d) * step; turnTo(c, Math.atan2(dx, dz), dt) }
        c.head.rotation.x = 0
      }
      settle(c, dt)
    }
  }

  return { talkers, hits, update }
}
