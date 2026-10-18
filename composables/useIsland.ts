import { shallowRef } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { IslandEngine, ViewId } from '~/island/engine'

export type LandmarkId = 'factory' | 'library' | 'cabin' | 'signpost'
export type MachineId = 'm17' | 'm1' | 'm11' | 'm16'

export const LANDMARK_IDS: LandmarkId[] = ['factory', 'library', 'cabin', 'signpost']
export const MACHINE_IDS: MachineId[] = ['m17', 'm1', 'm11', 'm16']
/** Which projects each flagship machine shows (project ids from data/projects.ts). */
export const MACHINE_PROJECTS: Record<MachineId, number[]> = { m17: [17], m1: [1], m11: [11], m16: [16, 10] }
/** Spots that support look-around (first person). Mirrors SPOTS in island/engine.ts. */
export const LOOK_AROUND_IDS: ViewId[] = ['factory', 'library', 'cabin', 'm17', 'm1', 'm11', 'm16']

const LANDMARK_PATH: Record<LandmarkId, string> = { factory: '/portfolio', library: '/blog', cabin: '/about', signpost: '/contact' }

/** Cheap capability check; kept out of the engine so it does not pull in three.js. */
export function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export const isMachineId = (id: string): id is MachineId => (MACHINE_IDS as string[]).includes(id)

/** The island view a route stands for: page meta `landmark`, plus `?m=` for a machine inside the factory. */
export function viewFromRoute(route: RouteLocationNormalizedLoaded): ViewId {
  const lm = route.meta.landmark as LandmarkId | undefined
  if (!lm) return 'home'
  const m = route.query.m
  if (lm === 'factory' && typeof m === 'string' && isMachineId(m)) return m
  return lm
}

export function routeForView(id: ViewId) {
  if (id === 'home') return { path: '/' }
  if (isMachineId(id)) return { path: '/portfolio', query: { m: id } }
  return { path: LANDMARK_PATH[id as LandmarkId] }
}

/** The landmark a view belongs to (machines belong to the factory). */
export const landmarkOf = (id: ViewId): LandmarkId | null => (id === 'home' ? null : isMachineId(id) ? 'factory' : (id as LandmarkId))

// The engine is a plain object living outside Vue's reactivity; one per tab.
const engine = shallowRef<IslandEngine | null>(null)

export function useIsland() {
  const localePath = useLocalePath()
  const route = useRoute()
  return {
    engine,
    /** Intro finished and the 3D island is interactive. */
    ready: useState('island-ready', () => false),
    /** The spot being looked around in first person, or null. */
    lookAround: useState<ViewId | null>('island-look-around', () => null),
    /** Flat mode: no WebGL, reduced motion, or the visitor asked for it. */
    flat: useState('island-flat', () => false),
    /** 3D is unavailable on this device, so flat mode cannot be turned off. */
    noWebgl: useState('island-no-webgl', () => false),
    view: computed(() => viewFromRoute(route)),
    go(id: ViewId) {
      const r = routeForView(id)
      return navigateTo({ path: localePath(r.path), query: r.query })
    }
  }
}
