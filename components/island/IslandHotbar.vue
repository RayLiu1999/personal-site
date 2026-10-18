<template>
  <nav class="island-hotbar" :aria-label="t('island.nav')">
    <NuxtLink
      v-for="(id, i) in LANDMARK_IDS"
      :key="id"
      class="slot-btn"
      :to="slotTo(id)"
      :aria-current="current === id ? 'page' : undefined"
      :aria-label="`${t(`island.lm.${id}.name`)} · ${t(`island.lm.${id}.sub`)}`"
      :title="`${t(`island.lm.${id}.name`)} · ${t(`island.lm.${id}.sub`)}`"
    >
      <span class="num">{{ i + 1 }}</span>
      <img v-if="icons[id]" :src="icons[id]" alt="" width="36" height="36">
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import { isoIcon, LANDMARK_ICON_TILES } from '~/island/atlas'
import type { LandmarkId } from '~/composables/useIsland'

const { t } = useI18n()
const localePath = useLocalePath()
const { view, flat } = useIsland()

const current = computed(() => landmarkOf(view.value))
// Pressing the slot of the landmark you are at takes you back to the island overview, like toggling a hotbar item.
const slotTo = (id: LandmarkId) => {
  const r = routeForView(current.value === id && !flat.value ? 'home' : id)
  return localePath(r.path)
}

const icons = ref<Partial<Record<LandmarkId, string>>>({})
onMounted(() => {
  icons.value = Object.fromEntries(LANDMARK_IDS.map(id => [id, isoIcon(...LANDMARK_ICON_TILES[id])]))
})
</script>
