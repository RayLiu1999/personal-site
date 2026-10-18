import * as THREE from 'three'
import { BT, MAX_BLOCKS, PALETTE, isBlockType, type BlockType, type Placed } from './blocks'
import { blockGeo, type Materials } from './world'

// Build mode: visitors add blocks to the island and break the ones they added. The island itself is never changed.
// Placed blocks live in one instanced mesh per block type, sized for the block limit.

const BOUND = { r: 34, yMin: -4, yMax: 24 }
type Box = [[number, number, number], [number, number, number]]

export function buildBuilder(scene: THREE.Scene, MAT: Materials, o: {
  /** Island blocks to build onto (raycast targets). */
  ground: THREE.InstancedMesh[]
  /** Whether the island already has a block in this cell. */
  solid(x: number, y: number, z: number): boolean
  /** Landmark and machine boxes, kept clear so the site's own buildings stay intact. */
  keepClear: Box[]
}) {
  const group = new THREE.Group()
  group.visible = false
  scene.add(group)
  const placed = new Map<string, BlockType>()
  const key = (x: number, y: number, z: number) => x + '|' + y + '|' + z
  const meshes = {} as Record<BlockType, THREE.InstancedMesh>
  for (const t of PALETTE) {
    const def = BT[t]
    const m = new THREE.InstancedMesh(blockGeo(def.f), MAT[def.m || 'solid'], MAX_BLOCKS)
    m.count = 0
    m.castShadow = true
    m.receiveShadow = true
    group.add(m)
    meshes[t] = m
  }
  const targets = [...o.ground, ...Object.values(meshes)]

  const M4 = new THREE.Matrix4(), P = new THREE.Vector3()
  function rebuild(t: BlockType) {
    const m = meshes[t]
    let i = 0
    for (const [k, v] of placed) {
      if (v !== t) continue
      const [x, y, z] = k.split('|').map(Number)
      m.setMatrixAt(i++, M4.makeTranslation(x, y, z))
    }
    m.count = i
    m.instanceMatrix.needsUpdate = true
    // Raycasting culls against the bounding sphere, so it has to follow the instances.
    m.computeBoundingSphere()
  }

  const inside = (x: number, y: number, z: number, [a, b]: Box) => x > a[0] && x < b[0] && y > a[1] && y < b[1] && z > a[2] && z < b[2]
  function canPlace(x: number, y: number, z: number) {
    if (Math.hypot(x, z) > BOUND.r || y < BOUND.yMin || y > BOUND.yMax) return false
    if (o.solid(x, y, z) || placed.has(key(x, y, z))) return false
    return !o.keepClear.some(b => inside(x, y, z, b))
  }

  /* ---------- ghost: where the next click lands ---------- */
  const ghostEdges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.02, 1.02, 1.02)), new THREE.LineBasicMaterial({ color: 0xffffff }))
  const ghostFill = new THREE.Mesh(new THREE.BoxGeometry(1.01, 1.01, 1.01), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18, depthWrite: false }))
  const ghost = new THREE.Group()
  ghost.add(ghostEdges, ghostFill)
  ghost.visible = false
  scene.add(ghost)

  type Target = { x: number; y: number; z: number; remove: boolean; ok: boolean }
  function aim(ray: THREE.Raycaster, remove: boolean): Target | null {
    const hit = ray.intersectObjects(targets, false)[0]
    if (!hit || hit.instanceId == null || !hit.face) return null
    const m = hit.object as THREE.InstancedMesh
    m.getMatrixAt(hit.instanceId, M4)
    P.setFromMatrixPosition(M4)
    const x = Math.round(P.x), y = Math.round(P.y), z = Math.round(P.z)
    if (remove) return { x, y, z, remove, ok: m.parent === group }
    const n = hit.face.normal
    const t = { x: x + Math.round(n.x), y: y + Math.round(n.y), z: z + Math.round(n.z), remove, ok: false }
    t.ok = canPlace(t.x, t.y, t.z) && placed.size < MAX_BLOCKS
    return t
  }

  return {
    group,
    /** Meshes the crosshair can hit: the island and the placed blocks. */
    targets,
    count: () => placed.size,
    has: (x: number, y: number, z: number) => placed.has(key(x, y, z)),
    list: (): Placed[] => [...placed].map(([k, t]) => { const [x, y, z] = k.split('|').map(Number); return [x, y, z, t] }),

    /** Restore saved blocks, skipping anything malformed or no longer allowed. */
    load(data: unknown) {
      if (!Array.isArray(data)) return
      for (const b of data) {
        if (placed.size >= MAX_BLOCKS) break
        if (!Array.isArray(b) || b.length !== 4 || !isBlockType(b[3])) continue
        const [x, y, z] = b
        if (![x, y, z].every(Number.isInteger) || !canPlace(x, y, z)) continue
        placed.set(key(x, y, z), b[3])
      }
      PALETTE.forEach(rebuild)
    },

    /** Move the ghost to the cell under the pointer; null hides it. */
    hover(ray: THREE.Raycaster | null, remove: boolean) {
      const t = ray && aim(ray, remove)
      ghost.visible = !!t && (t.ok || !remove)
      if (!t) return
      ghost.position.set(t.x, t.y, t.z)
      ghostFill.visible = true
      const c = !t.ok ? 0x777777 : remove ? 0xff5a4a : 0xffffff
      ;(ghostEdges.material as THREE.LineBasicMaterial).color.setHex(c)
      ;(ghostFill.material as THREE.MeshBasicMaterial).color.setHex(c)
    },

    /** First person: outline the block under the crosshair, the way Minecraft does. */
    outline(ray: THREE.Raycaster) {
      const t = aim(ray, true)
      ghost.visible = !!t
      if (!t) return
      ghost.position.set(t.x, t.y, t.z)
      ghostFill.visible = false
      ;(ghostEdges.material as THREE.LineBasicMaterial).color.setHex(0x111111)
    },

    /** Place or break the block under the pointer. */
    act(ray: THREE.Raycaster, remove: boolean, type: BlockType, avoid?: (x: number, y: number, z: number) => boolean): 'placed' | 'removed' | 'full' | 'blocked' | null {
      const t = aim(ray, remove)
      if (!t) return null
      if (remove) {
        if (!t.ok) return 'blocked'
        const k = key(t.x, t.y, t.z), was = placed.get(k)!
        placed.delete(k)
        rebuild(was)
        return 'removed'
      }
      if (placed.size >= MAX_BLOCKS) return 'full'
      if (!t.ok || avoid?.(t.x, t.y, t.z)) return 'blocked'
      placed.set(key(t.x, t.y, t.z), type)
      rebuild(type)
      return 'placed'
    },

    clear() {
      placed.clear()
      PALETTE.forEach(rebuild)
    },

    setGhost(on: boolean) { if (!on) ghost.visible = false }
  }
}
