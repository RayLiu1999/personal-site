<template>
  <IslandPanel
    :view="view"
    :title="t('island.lm.cabin.name')"
    :sub="t('island.lm.cabin.sub')"
  >
    <IslandLookCta :id="view" />
    <div class="hello">
      <img src="/avatar.jpg" :alt="t('about.header.title')" />
      <div>
        <b>{{ t('about.header.title') }}</b>
        <p>{{ t('about.header.subtitle') }}</p>
      </div>
    </div>

    <h2 class="sec">{{ t('about.story.title') }}</h2>
    <p v-for="paragraph in 4" :key="paragraph">{{ t(`about.story.p${paragraph}`) }}</p>

    <h2 class="sec">{{ t('island.cabin.chest') }}</h2>
    <div class="groups">
      <div v-for="group in skills" :key="group.category">
        <h3>{{ group.category }}</h3>
        <div class="chips">
          <span v-for="skill in group.items" :key="skill" class="chip">{{ skill }}</span>
        </div>
      </div>
    </div>

    <h2 class="sec">{{ t('about.philosophy.title') }}</h2>
    <dl class="phil">
      <template v-for="item in philosophy" :key="item.title">
        <dt>{{ item.title }}</dt>
        <dd>{{ item.description }}</dd>
      </template>
    </dl>

    <h2 class="sec">{{ t('about.sidebar.languages') }}</h2>
    <ul class="langs">
      <li v-for="language in languages" :key="language.name">
        <span>{{ language.name }}</span>
        <span class="lvl" :class="{ native: language.native }">{{ language.level }}</span>
      </li>
    </ul>
  </IslandPanel>
</template>

<script setup>
definePageMeta({ layout: 'island', landmark: 'cabin' })

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl
const { t } = useI18n()
const localePath = useLocalePath()
const { view } = useIsland()

const philosophy = computed(() => ['craft', 'pragmatic', 'learning'].map((key) => ({
  title: t(`about.philosophy.items.${key}.title`),
  description: t(`about.philosophy.items.${key}.description`)
})))

const skills = computed(() => [
  {
    category: t('about.sidebar.skills.main'),
    items: ['PHP', 'JavaScript', 'Go', 'TypeScript', 'Node.js']
  },
  {
    category: t('about.sidebar.skills.db'),
    items: ['MySQL', 'Redis', 'MongoDB']
  },
  {
    category: t('about.sidebar.skills.devops'),
    items: ['Docker', 'GCP', 'AWS', 'GitHub Actions', 'GitLab CI/CD']
  }
])

const languages = computed(() => [
  { name: t('about.sidebar.lang_items.chinese'), level: t('about.sidebar.lang_items.native'), native: true },
  { name: t('about.sidebar.lang_items.english'), level: t('about.sidebar.lang_items.basic'), native: false },
  { name: t('about.sidebar.lang_items.japanese'), level: t('about.sidebar.lang_items.basic'), native: false }
])

// SEO Meta 設定
useHead(() => ({
  title: t('about.header.title'),
  meta: [
    { name: 'description', content: t('about.header.subtitle') },
    { name: 'keywords', content: t('island.cabin.seoKeywords') },
    { property: 'og:title', content: t('about.header.title') },
    { property: 'og:description', content: t('about.header.subtitle') },
    { property: 'og:type', content: 'profile' },
    { property: 'og:url', content: `${siteUrl}${localePath('/about')}` }
  ]
}))
</script>
