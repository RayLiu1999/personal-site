<template>
  <header v-if="flat" class="flat-hero">
    <h1 class="flat-title">RAY LIU<span class="fsplash" aria-hidden="true">{{ splash }}</span></h1>
    <p class="intro"><IntroText /></p>
    <div class="ctas">
      <NuxtLink class="mc-btn" :to="localePath('/portfolio')">{{ t('island.viewWork') }}</NuxtLink>
      <NuxtLink class="mc-btn" :to="localePath('/contact')">{{ t('island.contactMe') }}</NuxtLink>
    </div>
  </header>
  <div v-if="flat" class="flat-ground" />
  <div v-if="flat && (noWebgl || flatAuto)" class="flat-main">
    <!-- Says why the page is flat; a visitor who switched to flat themselves needs no explanation. -->
    <p class="note gui" style="padding: 10px 14px">{{ t(noWebgl ? 'island.flatNote.webgl' : 'island.flatNote.motion') }}</p>
  </div>

  <section v-if="!flat" class="home-hud">
    <h1 class="sr-only">{{ t('island.srTitle') }}</h1>
    <p class="intro"><IntroText /></p>
    <div class="ctas">
      <NuxtLink class="mc-btn" :to="localePath('/portfolio')">{{ t('island.viewWork') }}</NuxtLink>
      <NuxtLink class="mc-btn" :to="localePath('/contact')">{{ t('island.contactMe') }}</NuxtLink>
    </div>
    <p class="hint">{{ t('island.hint') }}</p>
  </section>
</template>

<script setup lang="ts">
const { t, tm, rt } = useI18n()
const localePath = useLocalePath()
const { flat, flatAuto, noWebgl } = useIsland()

const splash = computed(() => { const v = tm('island.splash'); return Array.isArray(v) && v.length ? rt(v[0] as never) : '' })

// The intro sentence highlights a few words; translate with marker placeholders, then swap the markers for elements.
const HIGHLIGHT: Record<string, [string, string]> = { role: ['strong', 'island.introRole'], a: ['mark', 'island.introA'], b: ['mark', 'island.introB'], c: ['mark', 'island.introC'] }
const IntroText = () => {
  const marks = Object.fromEntries(Object.keys(HIGHLIGHT).map(k => [k, `\u0001${k}\u0001`]))
  return t('island.intro', marks).split('\u0001').map((part, i) => {
    if (i % 2 === 0) return part
    const [tag, key] = HIGHLIGHT[part]
    return h(tag, t(key))
  })
}
</script>
