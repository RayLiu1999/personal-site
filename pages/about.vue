<template>
  <div class="py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-coffee-800 dark:text-white mb-4">{{ $t('about.header.title') }}</h1>
        <p class="text-lg text-coffee-600 dark:text-gray-400">{{ $t('about.header.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- My Story -->
          <section class="mb-12">
            <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border dark:border-gray-700">
              <div class="flex items-center mb-6">
                <img src="/avatar.jpg" alt="Ray Liu" class="w-24 h-24 rounded-full mr-6 object-cover shadow-md">
                <div>
                  <h2 class="text-2xl font-bold text-coffee-800 dark:text-white mb-2">{{ $t('about.story.title') }}</h2>
                  <p class="text-coffee-500 dark:text-gray-400">{{ $t('about.story.subtitle') }}</p>
                </div>
              </div>
              <div class="prose prose-coffee max-w-none text-coffee-600 dark:text-gray-300 leading-relaxed space-y-4">
                <p>{{ $t('about.story.p1') }}</p>
                <p>{{ $t('about.story.p2') }}</p>
                <p>{{ $t('about.story.p3') }}</p>
                <p>{{ $t('about.story.p4') }}</p>
              </div>
            </div>
          </section>

          <!-- My Philosophy -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-coffee-800 dark:text-white mb-6 text-center lg:text-left">{{
              $t('about.philosophy.title') }}</h2>
            <div class="space-y-6">
              <div v-for="item in philosophy" :key="item.title"
                class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700 flex items-start">
                <div class="flex-shrink-0 mr-5">
                  <div class="w-12 h-12 rounded-full bg-coffee-100 dark:bg-gray-700 flex items-center justify-center">
                    <svg class="w-6 h-6 text-coffee-600 dark:text-blue-400" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24" v-html="item.icon"></svg>
                  </div>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-coffee-800 dark:text-white">{{ item.title }}</h3>
                  <p class="text-coffee-600 dark:text-gray-300 mt-1">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- My Tech Toolbox -->
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700 mb-6">
            <h3 class="text-lg font-semibold text-coffee-800 dark:text-white mb-4">{{ $t('about.sidebar.toolbox') }}
            </h3>
            <div class="space-y-5">
              <div v-for="skillCategory in skills" :key="skillCategory.category">
                <h4 class="font-medium text-coffee-700 dark:text-gray-300 mb-3">{{ skillCategory.category }}</h4>
                <div class="flex flex-wrap gap-2">
                  <span v-for="skill in skillCategory.items" :key="skill"
                    class="px-3 py-1 bg-coffee-100 dark:bg-gray-700 text-coffee-700 dark:text-gray-300 text-sm rounded-full font-medium">
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Languages -->
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700 mb-6">
            <h3 class="text-lg font-semibold text-coffee-800 dark:text-white mb-4">{{ $t('about.sidebar.languages') }}
            </h3>
            <div class="space-y-3">
              <div v-for="lang in languages" :key="lang.name" class="flex items-center justify-between">
                <span class="text-coffee-600 dark:text-gray-300">{{ lang.name }}</span>
                <span class="px-3 py-1 text-xs rounded-full font-semibold" :class="lang.style">
                  {{ lang.level }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl
const { t } = useI18n()

const philosophy = computed(() => [
  {
    title: t('about.philosophy.items.craft.title'),
    description: t('about.philosophy.items.craft.description'),
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" />'
  },
  {
    title: t('about.philosophy.items.pragmatic.title'),
    description: t('about.philosophy.items.pragmatic.description'),
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3" />'
  },
  {
    title: t('about.philosophy.items.learning.title'),
    description: t('about.philosophy.items.learning.description'),
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />'
  }
])

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
  { name: t('about.sidebar.lang_items.chinese'), level: t('about.sidebar.lang_items.native'), style: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
  { name: t('about.sidebar.lang_items.english'), level: t('about.sidebar.lang_items.basic'), style: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
  { name: t('about.sidebar.lang_items.japanese'), level: t('about.sidebar.lang_items.basic'), style: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' }
])

// SEO Meta 設定
useHead({
  title: t('about.header.title'),
  meta: [
    {
      name: 'description',
      content: t('about.header.subtitle')
    },
    {
      name: 'keywords',
      content: 'Ray Liu 簡介, 後端工程師背景, 程式設計師故事, 技術哲學, 職涯發展, 個人經歷'
    },
    // Open Graph
    {
      property: 'og:title',
      content: t('about.header.title')
    },
    {
      property: 'og:description',
      content: t('about.header.subtitle')
    },
    {
      property: 'og:type',
      content: 'profile'
    },
    {
      property: 'og:url',
      content: `${siteUrl}/about`
    }
  ]
})
</script>
