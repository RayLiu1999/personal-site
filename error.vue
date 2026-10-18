<template>
  <div class="island-root flat void-page">
    <main class="void">
      <img v-if="block" :src="block" alt="" class="void-block" width="72" height="72">
      <p class="void-code">{{ error.statusCode }}</p>
      <h1>{{ missing ? t('island.error.voidTitle') : t('island.error.title') }}</h1>
      <p>{{ missing ? t('island.error.voidBody') : t('island.error.body') }}</p>
      <button class="mc-btn" type="button" @click="home">{{ t('island.error.home') }}</button>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'
import { faces } from '~/island/blocks'
import { isoIcon } from '~/island/atlas'

// Shown for a missing page or a server error. A flat page on purpose: no 3D, so it always loads.
const props = defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()
const missing = computed(() => props.error.statusCode === 404)
const home = () => clearError({ redirect: localePath('/') })

useHead(() => ({
  title: `${missing.value ? t('island.error.voidTitle') : t('island.error.title')} - Ray Liu`,
  meta: [{ name: 'robots', content: 'noindex' }]
}))

// A lone grass block drifting in the void; drawn from the block atlas, which needs a canvas.
const block = ref('')
onMounted(() => {
  const f = faces('grass')
  block.value = isoIcon(f[2], f[4], f[0])
})
</script>

<!-- As an SFC style block so SSR inlines it: an error page must never paint unstyled. -->
<style src="~/assets/css/island.css"></style>
