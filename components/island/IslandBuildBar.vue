<template>
  <div class="fp-hud build-hud">
    <span>{{ t('island.build.title') }}</span>
    <small>{{ coarse ? t('island.build.hintTouch') : t('island.build.hint') }}</small>
    <span class="build-count" :class="{ full: blockCount >= MAX_BLOCKS }">{{ blockCount }} / {{ MAX_BLOCKS }}</span>
    <button ref="done" class="mc-btn small" type="button" @click="creative = false">{{ t('island.build.done') }}</button>
  </div>

  <div class="build-tools">
    <button class="mc-btn small" type="button" :aria-pressed="buildTool === 'remove'" @click="buildTool = buildTool === 'remove' ? 'place' : 'remove'">
      {{ buildTool === 'remove' ? t('island.build.remove') : t('island.build.place') }}
    </button>
    <button class="mc-btn small square" type="button" :aria-label="t('island.build.zoomOut')" :title="t('island.build.zoomOut')" @click="engine?.zoomBy(1.25)">-</button>
    <button class="mc-btn small square" type="button" :aria-label="t('island.build.zoomIn')" :title="t('island.build.zoomIn')" @click="engine?.zoomBy(0.8)">+</button>
    <button class="mc-btn small" type="button" :disabled="!blockCount" @click="clearAll">
      {{ confirming ? t('island.build.clearConfirm') : t('island.build.clear') }}
    </button>
  </div>

  <nav class="island-hotbar blocks" :aria-label="t('island.build.palette')">
    <button
      v-for="(b, i) in PALETTE"
      :key="b"
      class="slot-btn"
      type="button"
      :aria-pressed="buildType === b"
      :aria-label="t(`island.build.blocks.${b}`)"
      :title="t(`island.build.blocks.${b}`)"
      @click="pickBlock(b)"
    >
      <span class="num">{{ i + 1 }}</span>
      <img v-if="icons[b]" :src="icons[b]" alt="" width="36" height="36">
    </button>
  </nav>
</template>

<script setup lang="ts">
import { isoIcon } from '~/island/atlas'
import { MAX_BLOCKS, PALETTE, faces, type BlockType } from '~/island/blocks'

const { t } = useI18n()
const { engine, creative, buildType, buildTool, blockCount } = useIsland()

const coarse = ref(false)
const icons = ref<Partial<Record<BlockType, string>>>({})
const done = ref<HTMLButtonElement>()
onMounted(() => {
  coarse.value = window.matchMedia('(pointer: coarse)').matches
  icons.value = Object.fromEntries(PALETTE.map(b => { const f = faces(b); return [b, isoIcon(f[2], f[4], f[0])] }))
  done.value?.focus({ preventScroll: true })
})

function pickBlock(b: BlockType) {
  buildType.value = b
  buildTool.value = 'place'
}

// Clearing takes a second press, so a stray tap can't wipe out the visitor's build.
const confirming = ref(false)
let confirmTimer: ReturnType<typeof setTimeout> | undefined
function clearAll() {
  if (!confirming.value) {
    confirming.value = true
    confirmTimer = setTimeout(() => (confirming.value = false), 3000)
    return
  }
  clearTimeout(confirmTimer)
  confirming.value = false
  engine.value?.clearBlocks()
  umTrackEvent('island-build-clear')
}
onBeforeUnmount(() => clearTimeout(confirmTimer))
</script>
