<template>
  <canvas ref="canvas" class="island-canvas" aria-hidden="true" />
  <div class="island-overlay">
    <div ref="tagLayer" class="island-tags" />
    <div ref="bubble" class="island-bubble" hidden />
    <div class="island-crosshair" />
    <div ref="aimHint" class="island-aim" hidden />
    <button ref="splash" class="island-splash" type="button" :aria-label="t('island.splashLabel')" @click="nextSplash">
      <span>{{ splashText }}</span>
    </button>
  </div>
  <div v-if="introPlaying" class="island-skip">{{ t('island.skip') }}</div>
</template>

<script setup lang="ts">
import type { IslandEngine, ViewId } from '~/island/engine'
import { PALETTE } from '~/island/blocks'

const { t, tm, rt, locale } = useI18n()
const island = useIsland()
const { isDark } = useDarkMode()

const canvas = ref<HTMLCanvasElement>()
const tagLayer = ref<HTMLElement>()
const bubble = ref<HTMLElement>()
const splash = ref<HTMLElement>()
const aimHint = ref<HTMLElement>()
const introPlaying = ref(false)

// tm() returns the key itself while a locale's messages are still loading, so only map real arrays.
const list = (key: string) => { const v = tm(key); return Array.isArray(v) ? v.map(s => rt(s as never)) : [] }
const splashes = computed(() => list('island.splash'))
const splashIdx = ref(Math.floor(Math.random() * 10))
const splashText = computed(() => splashes.value[splashIdx.value % Math.max(1, splashes.value.length)] ?? '')
const nextSplash = () => { splashIdx.value += 1 + Math.floor(Math.random() * 3) }

const mqMobile = import.meta.client ? window.matchMedia('(max-width: 720px)') : null
let engine: IslandEngine | null = null
let disposed = false

const BLOCKS_KEY = 'island.blocks'
const store = {
  get: (k: string) => { try { return localStorage.getItem(k) } catch { return null } },
  set: (k: string, v: string) => { try { localStorage.setItem(k, v) } catch { /* storage blocked */ } }
}

onMounted(async () => {
  const { createIsland } = await import('~/island/engine')
  if (disposed || !canvas.value) return
  const view = island.view.value
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const intro = view !== 'home' || reduceMotion ? 'none' : store.get('island.visited') ? 'short' : 'full'
  introPlaying.value = intro !== 'none'

  engine = createIsland({
    canvas: canvas.value,
    tagLayer: tagLayer.value!,
    bubble: bubble.value!,
    aimHint: aimHint.value ?? null,
    splash: splash.value ?? null,
    veil: null,
    skyNight: document.querySelector<HTMLElement>('.island-sky.night'),
    panelRect: () => document.querySelector('.island-panel:not(.closed)')?.getBoundingClientRect() ?? null,
    obstacles: () => [...document.querySelectorAll('.hud-top > *, .island-hotbar, .fp-hud, .home-hud, .island-panel:not(.closed)')]
      .map(el => el.getBoundingClientRect()),
    isMobile: () => !!mqMobile?.matches,
    text: {
      tag: (id: ViewId) => id.startsWith('m')
        ? { name: t(`island.mc.${id}`) }
        : { name: t(`island.lm.${id}.name`), sub: t(`island.lm.${id}.sub`) },
      npc: (key: string) => ({
        name: t(`island.npc.${key}.name`),
        lines: list(`island.npc.${key}.lines`)
      }),
      sign: () => { const [a = '', b = ''] = list('island.signpost.sign'); return [a, b] },
      aim: (kind, name) => t(`island.aim.${kind}`, { name })
    },
    displayFont: '"Cubic 11", "Noto Sans TC", sans-serif',
    initialView: view,
    intro,
    night: isDark.value,
    reduceMotion,
    sound: island.sound.value,
    blocks: (() => { try { return JSON.parse(store.get(BLOCKS_KEY) ?? 'null') } catch { return null } })(),
    onNavigate: id => {
      umTrackEvent('island-landmark', { id })
      island.go(id)
    },
    onReady: () => {
      island.ready.value = true
      introPlaying.value = false
      store.set('island.visited', '1')
    },
    onIntroSkipped: () => umTrackEvent('island-intro-skip'),
    onLookAroundChange: id => {
      island.lookAround.value = id
      if (id) umTrackEvent('island-look-around', { id })
    },
    onBlocksChange: blocks => {
      island.blockCount.value = blocks.length
      store.set(BLOCKS_KEY, JSON.stringify(blocks))
    },
    freeRoam: () => island.buildFly.value,
    onFirstPerson: at => {
      island.fpSpawn.value = at
      island.creative.value = true
    },
    onBuildLock: locked => { island.buildLocked.value = locked },
    onBuildCycle: step => {
      const i = PALETTE.indexOf(island.buildType.value)
      island.buildType.value = PALETTE[(i + step + PALETTE.length) % PALETTE.length]
    }
  })
  island.blockCount.value = engine.blockCount()
  engine.setCreative(island.creative.value, island.buildFly.value, island.fpSpawn.value)
  engine.setBuildType(island.buildType.value)
  engine.setBuildTool(island.buildTool.value)
  island.engine.value = engine
  // The sign is painted onto a canvas, so repaint once the pixel font has arrived.
  document.fonts?.load('54px "Cubic 11"').then(() => engine?.refreshText()).catch(() => {})
})

watch(island.view, v => engine?.setView(v))
watch(isDark, v => engine?.setNight(v))
watch(island.sound, v => engine?.setSound(v))
watch(island.creative, v => {
  engine?.setCreative(v, island.buildFly.value, island.fpSpawn.value)
  island.fpSpawn.value = null
})
watch(island.buildType, v => engine?.setBuildType(v))
watch(island.buildTool, v => engine?.setBuildTool(v))
watch(locale, () => nextTick(() => engine?.refreshText()))

onBeforeUnmount(() => {
  disposed = true
  engine?.dispose()
  engine = null
  island.engine.value = null
  island.ready.value = false
  island.lookAround.value = null
})
</script>
