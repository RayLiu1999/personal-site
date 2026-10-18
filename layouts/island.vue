<template>
  <div class="island-root" :class="rootClass">
    <div v-if="!flat" class="island-stage">
      <div class="island-sky day" />
      <div class="island-sky night" />
      <IslandScene />
    </div>

    <header class="hud-top">
      <NuxtLink class="brand" :to="localePath('/')">
        <span>RAY LIU</span><span class="label">{{ t('island.brandSub') }}</span>
      </NuxtLink>
      <div class="hud-actions">
        <button v-if="!flat" class="mc-btn square" type="button" :aria-label="soundLabel" :title="soundLabel" :aria-pressed="sound" @click="toggleSound">
          <svg class="px-icon" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M1 5h2v-1h1v-1h1v-1h2v9h-2v-1h-1v-1h-1v-1h-2z" />
            <path v-if="sound" d="M8 5h1v3H8zM10 3h1v7h-1z" />
            <path v-else d="M8 5h1v1H8zM10 5h1v1h-1zM9 6h1v1H9zM8 7h1v1H8zM10 7h1v1h-1z" />
          </svg>
        </button>
        <button v-if="!flat" class="mc-btn small" type="button" :aria-pressed="creative" @click="toggleCreative">
          {{ t('island.build.btn') }}
        </button>
        <button v-if="!noWebgl" class="mc-btn small" type="button" @click="toggleFlat">
          {{ flat ? t('island.islandBtn') : t('island.flatBtn') }}
        </button>
        <NuxtLink class="mc-btn square" :to="switchLocalePath(otherLocale)" :aria-label="t('island.langLabel')" :title="t('island.langLabel')">
          {{ t('island.langShort') }}
        </NuxtLink>
        <button class="mc-btn square" type="button" :aria-label="timeLabel" :title="timeLabel" @click="toggleDarkMode">
          {{ isDark ? t('island.nightGlyph') : t('island.dayGlyph') }}
        </button>
      </div>
    </header>

    <main :class="{ 'flat-main': flat && view !== 'home' }">
      <slot />
    </main>

    <div v-if="lookAround" class="fp-hud">
      <span>{{ t(`island.fp.where.${lookAround}`) }}</span>
      <small>{{ t('island.fp.hint') }}</small>
      <button ref="fpExit" class="mc-btn small" type="button" @click="engine?.exitLookAround()">{{ t('island.fp.exit') }}</button>
    </div>

    <IslandBuildBar v-if="creative && !flat" />

    <div class="island-toast" :class="{ show: toast.show }" aria-live="polite">{{ toast.text }}</div>
    <IslandHotbar v-if="!creative || flat" />
  </div>
</template>

<script setup lang="ts">
import '~/assets/css/island.css'
import type { LandmarkId } from '~/composables/useIsland'
import { PALETTE } from '~/island/blocks'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { isDark, toggleDarkMode } = useDarkMode()
const { engine, ready, lookAround, flat, noWebgl, sound, creative, buildType, buildTool, buildFly, view, go } = useIsland()

const otherLocale = computed(() => (locale.value === 'en' ? 'zh-tw' : 'en'))
const timeLabel = computed(() => (isDark.value ? t('island.toDay') : t('island.toNight')))
const soundLabel = computed(() => (sound.value ? t('island.soundOff') : t('island.soundOn')))

const rootClass = computed(() => ({
  ready: ready.value,
  flat: flat.value,
  fp: !!lookAround.value,
  creative: creative.value && !flat.value,
  fly: creative.value && buildFly.value && !flat.value,
  'at-home': view.value === 'home',
  'panel-open': view.value !== 'home' && !lookAround.value
}))

/* ---------- flat mode ---------- */
const FLAT_KEY = 'island.flat'
function toggleFlat() {
  flat.value = !flat.value
  try { localStorage.setItem(FLAT_KEY, flat.value ? '1' : '0') } catch { /* storage blocked */ }
  umTrackEvent('island-flat', { on: flat.value })
}

/* ---------- sound ---------- */
const SOUND_KEY = 'island.sound'
function toggleSound() {
  sound.value = !sound.value
  try { localStorage.setItem(SOUND_KEY, sound.value ? '1' : '0') } catch { /* storage blocked */ }
  umTrackEvent('island-sound', { on: sound.value })
}

/* ---------- build mode ---------- */
// Building happens on the island overview, so turning it on flies home first; leaving home ends it.
async function toggleCreative() {
  if (creative.value) { creative.value = false; return }
  if (view.value !== 'home') await go('home')
  creative.value = true
  umTrackEvent('island-build')
}
watch([view, flat], ([v, f]) => { if (v !== 'home' || f) creative.value = false })

function onBuildKey(e: KeyboardEvent) {
  const k = e.key
  if (k === 'Escape') { e.preventDefault(); creative.value = false; return }
  const n = parseInt(k, 10)
  if (n >= 1 && n <= PALETTE.length) { buildType.value = PALETTE[n - 1]; buildTool.value = 'place'; return }
  if (k === 'x' || k === 'X') buildTool.value = buildTool.value === 'remove' ? 'place' : 'remove'
  else if (k === '+' || k === '=') engine.value?.zoomBy(0.8)
  else if (k === '-' || k === '_') engine.value?.zoomBy(1.25)
}

/* ---------- toast with the landmark name ---------- */
const toast = reactive({ text: '', show: false })
let toastTimer: ReturnType<typeof setTimeout> | undefined
watch(() => landmarkOf(view.value), (lm, prev) => {
  if (!lm || lm === prev || flat.value) return
  toast.text = `${t(`island.lm.${lm}.name`)} · ${t(`island.lm.${lm}.sub`)}`
  toast.show = true
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.show = false), 1500)
})

/* ---------- look-around: move focus to the exit button and back ---------- */
const fpExit = ref<HTMLButtonElement>()
watch(lookAround, id => { if (id) nextTick(() => fpExit.value?.focus({ preventScroll: true })) })

/* ---------- keyboard ---------- */
function onKey(e: KeyboardEvent) {
  const el = e.target as HTMLElement | null
  if (!flat.value && engine.value && !ready.value) { engine.value.skipIntro(); return }
  if (el?.closest?.('input, textarea, select') || e.metaKey || e.ctrlKey || e.altKey) return
  if (creative.value && !flat.value) { onBuildKey(e); return }
  const k = e.key
  if (lookAround.value) {
    if (k === 'Escape' || k === 'f' || k === 'F') { e.preventDefault(); engine.value?.exitLookAround(); return }
    if (k === 'ArrowLeft' || k === 'ArrowRight') { e.preventDefault(); engine.value?.lookAround(k === 'ArrowLeft' ? 0.25 : -0.25, 0); return }
    if (k === 'ArrowUp' || k === 'ArrowDown') { e.preventDefault(); engine.value?.lookAround(0, k === 'ArrowUp' ? 0.2 : -0.2); return }
  }
  if ((k === 'f' || k === 'F') && !flat.value && LOOK_AROUND_IDS.includes(view.value)) { engine.value?.enterLookAround(view.value); return }
  if (k === 'Escape') {
    if (view.value !== 'home') { e.preventDefault(); go(isMachineId(view.value) ? 'factory' : 'home') }
    return
  }
  const n = parseInt(k, 10)
  if (n >= 1 && n <= 4) { go(LANDMARK_IDS[n - 1]); return }
  if ((k === 'ArrowRight' || k === 'ArrowLeft') && !el?.closest?.('.island-panel') && !flat.value) {
    const cur = LANDMARK_IDS.indexOf(landmarkOf(view.value) as LandmarkId), d = k === 'ArrowRight' ? 1 : -1
    go(LANDMARK_IDS[cur < 0 ? (d > 0 ? 0 : 3) : (cur + d + 4) % 4])
  }
}

onMounted(() => {
  // Decided after hydration so the server HTML (island layout) always matches the first client render.
  if (!webglAvailable()) {
    noWebgl.value = true
    flat.value = true
  } else {
    let saved: string | null = null
    try { saved = localStorage.getItem(FLAT_KEY) } catch { /* storage blocked */ }
    flat.value = saved ? saved === '1' : window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
  try { sound.value = localStorage.getItem(SOUND_KEY) === '1' } catch { /* storage blocked */ }
  buildFly.value = window.matchMedia('(pointer: fine)').matches && 'requestPointerLock' in HTMLElement.prototype
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>
