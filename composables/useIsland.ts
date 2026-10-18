import { shallowRef } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { IslandEngine, ViewId } from '~/island/engine'
import type { BlockType, BuildTool } from '~/island/blocks'
import { INVENTORY_IDS } from '~/data/projects'

export type LandmarkId = 'factory' | 'library' | 'cabin' | 'signpost'
export type MachineId = 'm17' | 'm1' | 'm11' | 'm16'

export const LANDMARK_IDS: LandmarkId[] = ['factory', 'library', 'cabin', 'signpost']
export const MACHINE_IDS: MachineId[] = ['m17', 'm1', 'm11', 'm16']
/** Which projects each flagship machine shows (project ids from data/projects.ts). */
export const MACHINE_PROJECTS: Record<MachineId, number[]> = { m17: [17], m1: [1], m11: [11], m16: [16, 10] }
/** The flagship machine a project is shown on, if any. */
export const machineOf = (projectId: number) => MACHINE_IDS.find(m => MACHINE_PROJECTS[m].includes(projectId)) ?? null
/** Every project in the order the factory lists them: flagship machines first, then the inventory. */
export const PROJECT_ORDER = [...MACHINE_IDS.flatMap(m => MACHINE_PROJECTS[m]), ...INVENTORY_IDS]
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

/**
 * The island view a route stands for: page meta `landmark`, plus a machine inside the factory, picked by `?m=`
 * or by being the page of a project that machine shows.
 */
export function viewFromRoute(route: RouteLocationNormalizedLoaded): ViewId {
  const lm = route.meta.landmark as LandmarkId | undefined
  if (!lm) return 'home'
  if (lm !== 'factory') return lm
  const m = route.query.m
  if (typeof m === 'string' && isMachineId(m)) return m
  const id = route.params.id
  return (typeof id === 'string' && machineOf(Number(id))) || lm
}

/**
 * Where closing the panel leads. A page inside a landmark (page meta `subpage`, like a project page) goes back to
 * the landmark or machine it belongs to, a machine to the factory, and a landmark to the island overview.
 */
export function parentView(route: RouteLocationNormalizedLoaded): ViewId {
  const v = viewFromRoute(route)
  if (route.meta.subpage) return v
  return isMachineId(v) ? 'factory' : 'home'
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
    /** Island sound effects and ambience; off until the visitor turns them on. */
    sound: useState('island-sound', () => false),
    /** Build mode: the visitor places and breaks blocks on the island overview. */
    creative: useState('island-creative', () => false),
    buildType: useState<BlockType>('island-build-type', () => 'grass'),
    buildTool: useState<BuildTool>('island-build-tool', () => 'place'),
    /** Build in first person (mouse and pointer lock available) rather than on the overview. */
    buildFly: useState('island-build-fly', () => false),
    /** Where first person starts: a look-around spot, or null for the middle of the island. */
    fpSpawn: useState<ViewId | null>('island-fp-spawn', () => null),
    /** First-person building currently has the mouse captured. */
    buildLocked: useState('island-build-locked', () => false),
    /** How many blocks the visitor has placed. */
    blockCount: useState('island-block-count', () => 0),
    view: computed(() => viewFromRoute(route)),
    /** The current page sits inside a landmark (a project page, the privacy policy) rather than being one. */
    subpage: computed(() => !!route.meta.subpage),
    /** Link to a view, for NuxtLink `to`. */
    linkTo(id: ViewId) {
      const r = routeForView(id)
      return { path: localePath(r.path), query: r.query }
    },
    go(id: ViewId) {
      const r = routeForView(id)
      return navigateTo({ path: localePath(r.path), query: r.query })
    }
  }
}
