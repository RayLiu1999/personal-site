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

    <div class="island-toast" :class="{ show: toast.show }" aria-live="polite">{{ toast.text }}</div>
    <IslandHotbar />
  </div>
</template>

<script setup lang="ts">
import '~/assets/css/island.css'
import type { LandmarkId } from '~/composables/useIsland'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { isDark, toggleDarkMode } = useDarkMode()
const { engine, ready, lookAround, flat, noWebgl, view, go } = useIsland()

const otherLocale = computed(() => (locale.value === 'en' ? 'zh-tw' : 'en'))
const timeLabel = computed(() => (isDark.value ? t('island.toDay') : t('island.toNight')))

const rootClass = computed(() => ({
  ready: ready.value,
  flat: flat.value,
  fp: !!lookAround.value,
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
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>
