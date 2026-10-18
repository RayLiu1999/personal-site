<template>
  <section class="island-panel gui" :class="{ closed: hidden, expanded }" :aria-labelledby="titleId" :inert="hidden || undefined">
    <button class="grip" type="button" :aria-label="t('island.grip')" @click="expanded = !expanded" />
    <div class="panel-head">
      <img :src="iconSrc" alt="" width="40" height="40">
      <div class="titles">
        <h1 :id="titleId" ref="heading" tabindex="-1">{{ title }}</h1>
        <p>{{ sub }}</p>
      </div>
      <button class="mc-btn small panel-expand" type="button" @click="expanded = !expanded">
        {{ expanded ? t('island.collapse') : t('island.expand') }}
      </button>
      <NuxtLink v-if="!flat" class="mc-btn square small" :to="closeTo" :aria-label="t('island.close')">✕</NuxtLink>
    </div>
    <div class="panel-body">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ViewId } from '~/island/engine'
import { isoIcon, LANDMARK_ICON_TILES } from '~/island/atlas'

const props = defineProps<{ view: ViewId; title: string; sub: string; icon?: string }>()

const { t } = useI18n()
const localePath = useLocalePath()
const { flat, lookAround } = useIsland()

const titleId = 'island-panel-title'
const heading = ref<HTMLElement>()
const expanded = ref(false)
// While looking around in first person the panel slides away; it comes back on exit.
const hidden = computed(() => !flat.value && !!lookAround.value)

const closeTo = computed(() => {
  const r = routeForView(isMachineId(props.view) ? 'factory' : 'home')
  return localePath(r.path)
})

// Block icons are drawn from the procedural atlas, which needs a canvas: render them after mount.
const blockIcon = ref('')
const iconSrc = computed(() => props.icon || blockIcon.value || undefined)
onMounted(() => {
  const lm = landmarkOf(props.view)
  if (!props.icon && lm) blockIcon.value = isoIcon(...LANDMARK_ICON_TILES[lm])
  if (!flat.value) heading.value?.focus({ preventScroll: true })
})
</script>
