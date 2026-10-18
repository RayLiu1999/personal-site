// Block definitions, kept free of three.js so Vue components can use them without pulling in the engine.

export type MatKind = 'solid' | 'cut' | 'glow' | 'water'

/** Atlas tiles per block (one tile, or six in the order +x −x +y −y +z −z) and the material it renders with. */
export const BT: Record<string, { f: number | number[]; m?: MatKind }> = {
  grass: { f: [1, 1, 0, 2, 1, 1] }, dirt: { f: 2 }, stone: { f: 3 }, cobble: { f: 4 }, log: { f: [5, 5, 6, 6, 5, 5] },
  planks: { f: 7 }, spruce: { f: 21 }, leaves: { f: 8, m: 'cut' }, brick: { f: 9 }, shelf: { f: [10, 10, 7, 7, 10, 10] },
  lamp: { f: 11, m: 'glow' }, dark: { f: 12 }, server: { f: [13, 13, 12, 12, 13, 13], m: 'glow' }, iron: { f: 14 },
  path: { f: [16, 16, 15, 2, 16, 16] }, water: { f: 17, m: 'water' }, title: { f: 18 }, redstone: { f: 19 },
  glass: { f: 20, m: 'cut' }, piston: { f: [24, 4, 23, 23, 23, 23] }, dispenser: { f: [4, 4, 4, 4, 25, 4] }
}

export const faces = (t: string) => { const f = BT[t].f; return Array.isArray(f) ? f : [f, f, f, f, f, f] }

/* ---------- build mode ---------- */
/** Blocks a visitor can place in build mode, in hotbar order (keys 1–9). */
export const PALETTE = ['grass', 'dirt', 'stone', 'planks', 'log', 'brick', 'leaves', 'glass', 'lamp'] as const
export type BlockType = (typeof PALETTE)[number]
export type Placed = [number, number, number, BlockType]
export const MAX_BLOCKS = 500
export type BuildTool = 'place' | 'remove'

export const isBlockType = (t: unknown): t is BlockType => (PALETTE as readonly unknown[]).includes(t)
