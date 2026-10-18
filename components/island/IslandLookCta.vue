<template>
  <div v-if="available" class="fp-cta">
    <button class="mc-btn small" type="button" @click="enter">{{ ride ? t('island.fp.ride') : t('island.fp.enter') }}</button>
    <small>{{ ride ? t('island.fp.rideHint') : t('island.fp.enterHint') }}</small>
  </div>
</template>

<script setup lang="ts">
import type { ViewId } from '~/island/engine'

const props = defineProps<{ id: ViewId }>()

const { t } = useI18n()
const { engine, ready, flat } = useIsland()

const ride = computed(() => props.id === 'm1')
// Only offered once the 3D island is running; flat mode and SSR show nothing.
const available = computed(() => !flat.value && ready.value && !!engine.value && LOOK_AROUND_IDS.includes(props.id))
const enter = () => engine.value?.enterLookAround(props.id)
</script>
