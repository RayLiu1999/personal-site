<template>
  <IslandPanel :view="view" :title="title" :sub="sub" :icon="project.image" wide>
    <NuxtLink :to="linkTo(view)" class="mc-btn small back">
      {{ t('island.project.back', { name: backName }) }}
    </NuxtLink>

    <p class="lead">{{ text('description') }}</p>
    <div v-if="links.length" class="links">
      <a v-for="link in links" :key="link.url" :href="link.url" class="mc-btn small" target="_blank" rel="noopener">
        {{ link.label }}
      </a>
    </div>

    <h2 class="sec">{{ t('portfolio.project.overview') }}</h2>
    <p>{{ text('overview') }}</p>

    <h2 class="sec">{{ t('portfolio.project.challenges') }}</h2>
    <ol class="quests">
      <li v-for="challenge in challenges" :key="challenge.title">
        <h3>{{ challenge.title }}</h3>
        <p>{{ challenge.problem }}</p>
        <p class="fix">
          <b>{{ t('portfolio.project.solutionLabel') }}</b>
          {{ challenge.solution }}
        </p>
      </li>
    </ol>

    <template v-if="diagram || project.architectureImage">
      <h2 class="sec">{{ t('portfolio.project.architecture') }}</h2>
      <button type="button" class="arch" :aria-label="`${archLabel} · ${t('island.project.enlarge')}`" @click="openArch">
        <span v-if="diagram" class="diagram" v-html="diagram" />
        <img v-else :src="project.architectureImage" alt="" loading="lazy">
        <small aria-hidden="true">{{ t('island.project.enlarge') }}</small>
      </button>
      <p>{{ text('architectureDescription') }}</p>
    </template>

    <h2 class="sec">{{ t('portfolio.project.learnings') }}</h2>
    <p>{{ text('learnings') }}</p>

    <h2 class="sec">{{ t('portfolio.project.techStack') }}</h2>
    <div class="groups">
      <div v-for="group in project.techStack" :key="group.key">
        <h3>{{ t(`portfolio.techStack.${group.key}`) }}</h3>
        <div class="chips">
          <span v-for="item in group.items" :key="item" class="chip">{{ item }}</span>
        </div>
      </div>
    </div>

    <nav class="pager" :aria-label="t('island.project.pager')">
      <NuxtLink v-if="prev" :to="localePath(`/portfolio/${prev.id}`)" class="flag prev">
        <span class="go" aria-hidden="true">‹</span>
        <img :src="prev.image" alt="">
        <span class="t">
          <small>{{ t('island.project.prev') }}</small>
          <b>{{ projectTitle(prev) }}</b>
        </span>
      </NuxtLink>
      <NuxtLink v-if="next" :to="localePath(`/portfolio/${next.id}`)" class="flag next">
        <img :src="next.image" alt="">
        <span class="t">
          <small>{{ t('island.project.next') }}</small>
          <b>{{ projectTitle(next) }}</b>
        </span>
        <span class="go" aria-hidden="true">›</span>
      </NuxtLink>
    </nav>

    <dialog ref="lightbox" class="lightbox gui" :aria-label="archLabel" @click.self="lightbox?.close()" @close="archOpen = false">
      <button class="mc-btn square small" type="button" :aria-label="t('island.close')" @click="lightbox?.close()">✕</button>
      <div v-if="archOpen" class="lightbox-body">
        <div v-if="diagram" class="diagram" :style="{ '--w': `${diagramWidth}px` }" v-html="diagram" />
        <img v-else :src="project.architectureImage" :alt="archLabel">
      </div>
    </dialog>
  </IslandPanel>
</template>

<script setup>
import { PROJECT_ORDER, machineOf } from '~/composables/useIsland'
import { projectById } from '~/data/projects'

definePageMeta({ layout: 'island', landmark: 'factory', subpage: true })

// Diagrams are pre-rendered SVGs (scripts/render-diagrams.mjs), inlined so island.css can colour them for day and night.
const diagrams = import.meta.glob('../../assets/diagrams/*.svg', { query: '?raw', import: 'default' })

const route = useRoute()
const config = useRuntimeConfig()
const { t, tm } = useI18n()
const localePath = useLocalePath()
const { view, linkTo } = useIsland()

const id = /^\d+$/.test(route.params.id) ? Number(route.params.id) : NaN
const project = projectById(id)
if (!project) throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })

const key = `portfolio.items.p${id}`
const text = (field) => t(`${key}.${field}`)
const projectTitle = (p) => t(`portfolio.items.p${p.id}.title`)
const title = computed(() => text('title'))
const sub = computed(() => `${t(`portfolio.categories.${project.category}`)} · ${project.year}`)
const machine = machineOf(id)
const backName = computed(() => (machine ? t(`island.mc.${machine}`) : t('island.lm.factory.name')))

const links = computed(() => [
  ...(project.demo ? [{ label: t('portfolio.project.liveDemo'), url: project.demo }] : []),
  ...(project.github ? [{ label: t('portfolio.project.githubSource'), url: project.github }] : []),
  ...(project.githubs ?? []).map((repo) => ({ label: t(`${key}.githubs.${repo.label}`), url: repo.url }))
])

const challenges = computed(() => {
  // tm() hands back the key itself while a locale is still loading.
  const list = tm(`${key}.challenges`)
  return (Array.isArray(list) ? list : []).map((_, i) => ({
    title: t(`${key}.challenges[${i}].title`),
    problem: t(`${key}.challenges[${i}].problem`),
    solution: t(`${key}.challenges[${i}].solution`)
  }))
})

const at = PROJECT_ORDER.indexOf(id)
const prev = at > 0 ? projectById(PROJECT_ORDER[at - 1]) : null
const next = at >= 0 && at < PROJECT_ORDER.length - 1 ? projectById(PROJECT_ORDER[at + 1]) : null

/* ---------- architecture, enlarged in a dialog ---------- */
const archLabel = computed(() => t('island.project.diagramLabel', { title: title.value }))
const lightbox = ref(null)
const archOpen = ref(false)
function openArch() {
  archOpen.value = true
  lightbox.value?.showModal()
}

useHead(() => ({
  title: `${title.value} - Ray Liu`,
  meta: [
    { name: 'description', content: text('description') },
    { property: 'og:title', content: `${title.value} - Ray Liu` },
    { property: 'og:description', content: text('description') },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: `${config.public.siteUrl}${localePath(`/portfolio/${id}`)}` }
  ]
}))

const diagram = project.diagram ? await diagrams[`../../assets/diagrams/p${id}.svg`]?.() ?? '' : ''
// Enlarged on a phone, a diagram keeps at least its natural width and scrolls sideways.
const diagramWidth = Number(diagram.match(/viewBox="[\d.-]+ [\d.-]+ ([\d.]+)/)?.[1] ?? 0)
</script>
