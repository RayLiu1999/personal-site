<template>
  <canvas ref="canvas" class="island-canvas" aria-hidden="true" />
  <div class="island-overlay">
    <div ref="tagLayer" class="island-tags" />
    <div ref="bubble" class="island-bubble" hidden />
    <div class="island-crosshair" />
    <button ref="splash" class="island-splash" type="button" :aria-label="t('island.splashLabel')" @click="nextSplash">
      <span>{{ splashText }}</span>
    </button>
  </div>
  <div v-if="introPlaying" class="island-skip">{{ t('island.skip') }}</div>
</template>

<script setup lang="ts">
import type { IslandEngine, ViewId } from '~/island/engine'

const { t, tm, rt, locale } = useI18n()
const island = useIsland()
const { isDark } = useDarkMode()

const canvas = ref<HTMLCanvasElement>()
const tagLayer = ref<HTMLElement>()
const bubble = ref<HTMLElement>()
const splash = ref<HTMLElement>()
const introPlaying = ref(false)

// tm() returns the key itself while a locale's messages are still loading, so only map real arrays.
const list = (key: string) => { const v = tm(key); return Array.isArray(v) ? v.map(s => rt(s as never)) : [] }
const splashes = computed(() => list('island.splash'))
// Always open on the first splash (the job title) so visitors see the role first; clicking cycles the rest.
const splashIdx = ref(0)
const splashText = computed(() => splashes.value[splashIdx.value % Math.max(1, splashes.value.length)] ?? '')
const nextSplash = () => { splashIdx.value += 1 + Math.floor(Math.random() * 3) }

const mqMobile = import.meta.client ? window.matchMedia('(max-width: 720px)') : null
let engine: IslandEngine | null = null
let disposed = false

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
    splash: splash.value ?? null,
    veil: null,
    skyNight: document.querySelector<HTMLElement>('.island-sky.night'),
    panelRect: () => document.querySelector('.island-panel:not(.closed)')?.getBoundingClientRect() ?? null,
    isMobile: () => !!mqMobile?.matches,
    text: {
      tag: (id: ViewId) => id.startsWith('m')
        ? { name: t(`island.mc.${id}`) }
        : { name: t(`island.lm.${id}.name`), sub: t(`island.lm.${id}.sub`) },
      npc: (key: string) => ({
        name: t(`island.npc.${key}.name`),
        lines: list(`island.npc.${key}.lines`)
      }),
      sign: () => { const [a = '', b = ''] = list('island.signpost.sign'); return [a, b] }
    },
    displayFont: '"Cubic 11", "Noto Sans TC", sans-serif',
    initialView: view,
    intro,
    night: isDark.value,
    reduceMotion,
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
    }
  })
  island.engine.value = engine
  // The sign is painted onto a canvas, so repaint once the pixel font has arrived.
  document.fonts?.load('54px "Cubic 11"').then(() => engine?.refreshText()).catch(() => {})
})

watch(island.view, v => engine?.setView(v))
watch(isDark, v => engine?.setNight(v))
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
