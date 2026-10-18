import * as THREE from 'three'
import { clamp } from './rand'

// The first-person body, Minecraft style: walks with gravity and jumps, and double-tapping Space toggles flying
// (Space rises, Shift sinks). Landing on the ground ends a flight. It collides with blocks but not with props.
// The body is a 0.6 × 1.8 box with the eye 1.62 above the feet; blocks are unit cells centred on integers.

const EYE = 1.62, HALF = 0.3, HEAD = 0.18, EPS = 1e-4
const WALK = 4.3, FLY = 9, FLY_V = 6, GRAVITY = 28, JUMP = 8.4, DOUBLE_TAP = 0.3

export function createWalker(solidAt: (x: number, y: number, z: number) => boolean) {
  const eye = new THREE.Vector3(), vel = new THREE.Vector3(), wish = new THREE.Vector3(), spawn = new THREE.Vector3()
  const keys = new Set<string>()
  let yaw = Math.PI, pitch = -0.2, flying = false, onGround = false, spaceAt = -1, stepIn = 0

  const cells = (lo: number, hi: number) => [Math.floor(lo + 0.5 + EPS), Math.floor(hi + 0.5 - EPS)]
  function bodyHits() {
    const [x0, x1] = cells(eye.x - HALF, eye.x + HALF), [y0, y1] = cells(eye.y - EYE, eye.y + HEAD), [z0, z1] = cells(eye.z - HALF, eye.z + HALF)
    for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) for (let z = z0; z <= z1; z++) if (solidAt(x, y, z)) return true
    return false
  }
  function moveAxis(axis: 'x' | 'y' | 'z', d: number) {
    if (!d) return
    eye[axis] += d
    if (!bodyHits()) return
    eye[axis] -= d
    vel[axis] = 0
    if (axis === 'y' && d < 0) {
      onGround = true
      flying = false
    }
  }

  return {
    eye,
    get yaw() { return yaw },
    get pitch() { return pitch },
    get flying() { return flying },

    /** Stand at an eye position (nudged up out of any block) and remember it as the respawn point. */
    place(x: number, y: number, z: number, yaw0: number, pitch0: number) {
      eye.set(x, y, z)
      for (let i = 0; i < 400 && bodyHits(); i++) eye.y += 0.1
      yaw = yaw0
      pitch = pitch0
      vel.set(0, 0, 0)
      flying = false
      spawn.copy(eye)
    },
    look(dYaw: number, dPitch: number) {
      yaw += dYaw
      pitch = clamp(pitch + dPitch, -1.5, 1.5)
    },
    keyDown(code: string, now: number) {
      if (code === 'Space' && !keys.has('Space')) {
        if (now - spaceAt < DOUBLE_TAP) { flying = !flying; vel.y = 0; spaceAt = -1 }
        else spaceAt = now
      }
      keys.add(code)
    },
    keyUp(code: string) { keys.delete(code) },
    clearKeys() { keys.clear() },
    /** Whether a block in this cell would overlap the body (so it can't be placed there). */
    overlaps(x: number, y: number, z: number) {
      return Math.abs(x - eye.x) < 0.5 + HALF && Math.abs(z - eye.z) < 0.5 + HALF && y + 0.5 > eye.y - EYE && y - 0.5 < eye.y + HEAD
    },

    /** Advance one frame; returns true on a frame where a footstep should sound. */
    update(dt: number) {
      const f = +keys.has('KeyW') - +keys.has('KeyS'), r = +keys.has('KeyD') - +keys.has('KeyA')
      const up = keys.has('Space'), down = keys.has('ShiftLeft') || keys.has('ShiftRight')
      const sy = Math.sin(yaw), cy = Math.cos(yaw)
      wish.set(sy * f - cy * r, 0, cy * f + sy * r)
      if (f || r) wish.normalize().multiplyScalar(flying ? FLY : WALK)
      // Full control on the ground and in flight, a little in mid-jump.
      const grip = Math.min(1, dt * (flying ? 6 : onGround ? 14 : 3))
      vel.x += (wish.x - vel.x) * grip
      vel.z += (wish.z - vel.z) * grip
      if (flying) vel.y += ((+up - +down) * FLY_V - vel.y) * Math.min(1, dt * 8)
      else {
        if (onGround && up) vel.y = JUMP
        vel.y = Math.max(-40, vel.y - GRAVITY * dt)
      }
      // Move in short slices so a long frame can't carry the body through a block.
      const n = Math.max(1, Math.ceil((vel.length() * dt) / 0.25))
      onGround = false
      for (let i = 0; i < n; i++) { moveAxis('x', (vel.x * dt) / n); moveAxis('y', (vel.y * dt) / n); moveAxis('z', (vel.z * dt) / n) }
      const h = Math.hypot(eye.x, eye.z)
      if (h > 60) { eye.x *= 60 / h; eye.z *= 60 / h }
      eye.y = Math.min(eye.y, 40)
      // Fell off the island: back to where this visit started.
      if (eye.y < -40) { eye.copy(spawn); vel.set(0, 0, 0) }

      const moving = onGround && Math.hypot(vel.x, vel.z) > 1
      stepIn = moving ? stepIn - dt : 0
      if (moving && stepIn <= 0) { stepIn = 0.42; return true }
      return false
    }
  }
}

export type Walker = ReturnType<typeof createWalker>
