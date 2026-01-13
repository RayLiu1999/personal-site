<template>
  <div class="py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="project">
        <!-- Back Button -->
        <div class="mb-8">
          <NuxtLink :to="localePath('/portfolio')"
            class="inline-flex items-center text-coffee-600 dark:text-blue-400 hover:text-coffee-800 dark:hover:text-blue-300">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            {{ $t('portfolio.project.backToPortfolio') }}
          </NuxtLink>
        </div>

        <!-- Project Header -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <span class="px-4 py-2 bg-coffee-100 dark:bg-gray-700 text-coffee-700 dark:text-gray-300 rounded-full">{{
              project.category }}</span>
            <span class="text-coffee-500 dark:text-gray-400">{{ project.year }}</span>
          </div>
          <h1 class="text-4xl font-bold text-coffee-800 dark:text-white mb-4">{{ project.title }}</h1>
          <p class="text-xl text-coffee-600 dark:text-gray-300 mb-6">{{ project.description }}</p>

          <!-- Links -->
          <div class="flex gap-4">
            <a v-if="project.github" :href="project.github" target="_blank"
              class="inline-flex items-center px-6 py-3 bg-coffee-800 dark:bg-blue-600 text-white rounded-lg hover:bg-coffee-900 dark:hover:bg-blue-700 transition-colors">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clip-rule="evenodd"></path>
              </svg>
              {{ $t('portfolio.project.githubSource') }}
            </a>
            <template v-if="project.githubs">
              <a v-for="(github, index) in project.githubs" :key="index" :href="github.url" target="_blank"
                class="relative group inline-flex items-center px-6 py-3 bg-coffee-800 dark:bg-blue-600 text-white rounded-lg hover:bg-coffee-900 dark:hover:bg-blue-700 transition-colors"
                :title="github.name">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clip-rule="evenodd"></path>
                </svg>
                {{ github.name }}
              </a>
            </template>
            <a v-if="project.demo" :href="project.demo" target="_blank"
              class="inline-flex items-center px-6 py-3 border-2 border-coffee-600 dark:border-blue-400 text-coffee-600 dark:text-blue-400 rounded-lg hover:bg-coffee-600 dark:hover:bg-blue-600 hover:text-white transition-colors">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              {{ $t('portfolio.project.liveDemo') }}
            </a>
          </div>
        </div>

        <!-- Project Image -->
        <div class="mb-8">
          <img :src="project.image" :alt="project.title"
            class="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg cursor-pointer"
            @click="openLightbox(project.image)">
        </div>

        <!-- Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Project Overview -->
            <section class="mb-8">
              <h2 class="text-2xl font-bold text-coffee-800 dark:text-white mb-4">{{ $t('portfolio.project.overview') }}
              </h2>
              <div class="prose prose-coffee max-w-none">
                <p class="text-coffee-600 dark:text-gray-300 leading-relaxed">{{ project.overview }}</p>
              </div>
            </section>

            <!-- Technical Challenges -->
            <section class="mb-8">
              <h2 class="text-2xl font-bold text-coffee-800 dark:text-white mb-4">{{ $t('portfolio.project.challenges')
                }}</h2>
              <div class="space-y-4">
                <div v-for="challenge in project.challenges" :key="challenge.title"
                  class="bg-coffee-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                  <h3 class="text-lg font-semibold text-coffee-800 dark:text-white mb-2">{{ challenge.title }}</h3>
                  <p class="text-coffee-600 dark:text-gray-300 mb-3">{{ challenge.problem }}</p>
                  <div class="text-coffee-700 dark:text-gray-300">
                    <strong class="block mb-2">{{ $t('portfolio.project.solutionLabel') }}</strong>
                    <div v-html="challenge.solution"
                      class="solution-content prose prose-coffee dark:prose-invert max-w-none">
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Architecture -->
            <section v-if="project.architecture" class="mb-8">
              <h2 class="text-2xl font-bold text-coffee-800 dark:text-white mb-4">{{
                $t('portfolio.project.architecture') }}
              </h2>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700">
                <img :src="project.architecture" alt="系統架構圖" class="w-full rounded-lg cursor-pointer"
                  @click="openLightbox(project.architecture)">
                <p class="text-coffee-600 dark:text-gray-300 mt-4">{{ project.architectureDescription }}</p>
              </div>
            </section>

            <!-- Learnings -->
            <section class="mb-8">
              <h2 class="text-2xl font-bold text-coffee-800 dark:text-white mb-4">{{ $t('portfolio.project.learnings')
                }}</h2>
              <div class="bg-coffee-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                <p class="text-coffee-600 dark:text-gray-300 leading-relaxed">{{ project.learnings }}</p>
              </div>
            </section>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <!-- Tech Stack -->
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700 mb-6">
              <h3 class="text-lg font-semibold text-coffee-800 dark:text-white mb-4">{{
                $t('portfolio.project.techStack') }}
              </h3>
              <div class="space-y-3">
                <div v-for="category in project.techStack" :key="category.name">
                  <h4 class="font-medium text-coffee-700 dark:text-gray-300 mb-2">{{ category.name }}</h4>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="tech in category.technologies" :key="tech"
                      class="px-3 py-1 bg-coffee-100 dark:bg-gray-700 text-coffee-700 dark:text-gray-300 text-sm rounded-full">
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Lightbox -->
        <div v-if="isLightboxOpen" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          @click="closeLightbox">
          <img :src="lightboxImage" alt="Zoomed Image" class="max-w-full max-h-full object-contain" @click.stop>
          <button @click="closeLightbox" class="absolute top-4 right-4 text-white text-3xl">&times;</button>
        </div>
      </div>

      <div v-else class="text-center py-16">
        <h1 class="text-2xl font-bold text-coffee-800 dark:text-white">{{ $t('portfolio.project.notFound') }}</h1>
        <NuxtLink :to="localePath('/portfolio')"
          class="text-coffee-600 dark:text-blue-400 hover:text-coffee-800 dark:hover:text-blue-300 mt-4 inline-block">
          {{ $t('portfolio.project.backToPortfolio') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isLightboxOpen = ref(false)
const lightboxImage = ref('')

const openLightbox = (image) => {
  lightboxImage.value = image
  isLightboxOpen.value = true
}

const closeLightbox = () => {
  isLightboxOpen.value = false
}

const route = useRoute()
const projectId = parseInt(route.params.id)
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl
const { t, tm } = useI18n()
const localePath = useLocalePath()

// Construct project data from i18n
const project = computed(() => {
  const key = `portfolio.items.p${projectId}`

  // Hardcoded check for valid ID range based on known projects
  if (projectId < 1 || projectId > 7) return null;

  try {
    const title = t(`${key}.title`)
    // If title equals the key, it means translation missing
    if (title === `${key}.title`) return null

    // Static Data Map with challenges count and techStack structure
    const staticData = {
      1: {
        image: '/project1.png',
        year: '2024',
        demo: 'https://chat-app.liu-yucheng.com',
        githubs: [
          { key: 'frontend', url: 'https://github.com/RayLiu1999/chat_app_frontend' },
          { key: 'backend', url: 'https://github.com/RayLiu1999/chat_app_backend' }
        ],
        architecture: '/project1-sa.png',
        categoryKey: 'fullstack',
        challengesCount: 5,
        techStack: [
          { nameKey: 'frontend', technologies: ['Vue 3', 'TypeScript', 'Element Plus', 'Pinia'] },
          { nameKey: 'backend', technologies: ['Go', 'Gin', 'WebSocket', 'JWT', 'Redis'] },
          { nameKey: 'database', technologies: ['MongoDB', 'Redis'] }
        ]
      },
      2: {
        image: '/project3.png',
        year: '2025',
        demo: 'https://gf-soap.com',
        architecture: '/project3-sa.png',
        categoryKey: 'fullstack',
        challengesCount: 2,
        techStack: [
          { nameKey: 'client_side', technologies: ['Nuxt.js 3', 'Tailwind CSS', 'TypeScript'] },
          { nameKey: 'admin_panel', technologies: ['Vue 3', 'Element Plus', 'Vite'] },
          { nameKey: 'backend', technologies: ['Express.js', 'MySQL', 'JWT', 'reCAPTCHA'] }
        ]
      },
      3: {
        image: '/project2.png',
        year: '2024',
        demo: 'https://chess.liu-yucheng.com',
        github: 'https://github.com/RayLiu1999/chess-in-vue',
        architecture: '/project2-sa.png',
        categoryKey: 'frontend',
        challengesCount: 2,
        techStack: [
          { nameKey: 'frontend_framework', technologies: ['Vue 3', 'Vuex 4', 'Vite'] },
          { nameKey: 'ai_engine', technologies: ['Stockfish.js'] },
          { nameKey: 'deployment', technologies: ['Docker'] }
        ]
      },
      4: {
        image: '/project4.png',
        year: '2025',
        github: 'https://github.com/RayLiu1999/youtube-extension',
        architecture: '/project4-sa.png',
        categoryKey: 'extension',
        challengesCount: 2,
        techStack: [
          { nameKey: 'extension', technologies: ['JavaScript', 'Chrome Extension API'] },
          { nameKey: 'workflow', technologies: ['n8n', 'yt-dlp', 'Docker Compose'] },
          { nameKey: 'ai_service', technologies: ['Webhook'] }
        ]
      },
      5: {
        image: '/project7.png',
        year: '2023',
        github: 'https://github.com/RayLiu1999/yt_discord_bot',
        architecture: '/project7-sa.png',
        categoryKey: 'discord_bot',
        challengesCount: 3,
        techStack: [
          { nameKey: 'core_tech', technologies: ['Node.js', 'Discord.js', 'JavaScript'] },
          { nameKey: 'crawler_tech', technologies: ['Puppeteer', 'YouTube API'] },
          { nameKey: 'deployment_management', technologies: ['PM2'] }
        ]
      },
      6: {
        image: '/project5.png',
        year: '2022',
        github: 'https://github.com/RayLiu1999/e-commerce-cart',
        demo: 'https://e-commerce-cart.liu-yucheng.com',
        architecture: '/project5-sa.png',
        categoryKey: 'php',
        challengesCount: 2,
        techStack: [
          { nameKey: 'backend', technologies: ['PHP', 'MySQL'] },
          { nameKey: 'tools', technologies: ['Composer', 'Apache'] }
        ]
      },
      7: {
        image: '/project6.png',
        year: '2022',
        github: 'https://github.com/RayLiu1999/tomato-clock',
        demo: 'https://pomodoro.liu-yucheng.com',
        architecture: '/project6-sa.png',
        categoryKey: 'php',
        challengesCount: 2,
        techStack: [
          { nameKey: 'backend', technologies: ['PHP', 'MySQL'] },
          { nameKey: 'dev_tools', technologies: ['JavaScript', 'Gulp', 'Prepros'] }
        ]
      }
    }

    const staticP = staticData[projectId]
    if (!staticP) return null

    // Build challenges array using indexed t() calls
    const challenges = []
    for (let i = 0; i < staticP.challengesCount; i++) {
      const challengeTitle = t(`${key}.challenges[${i}].title`)
      if (challengeTitle !== `${key}.challenges[${i}].title`) {
        challenges.push({
          title: challengeTitle,
          problem: t(`${key}.challenges[${i}].problem`),
          solution: t(`${key}.challenges[${i}].solution`)
        })
      }
    }

    // Build techStack array using staticData structure and translate category names
    const techStack = staticP.techStack.map(cat => ({
      name: t(`portfolio.techStack.${cat.nameKey}`),
      technologies: cat.technologies
    }))

    // Construct merged project
    const p = {
      ...staticP,
      title: t(`${key}.title`),
      description: t(`${key}.description`),
      overview: t(`${key}.overview`),
      architectureDescription: t(`${key}.architectureDescription`),
      learnings: t(`${key}.learnings`),
      category: t(`portfolio.categories.${staticP.categoryKey}`),
      challenges,
      techStack
    }

    // Fix githubs translation if present
    if (staticP.githubs) {
      p.githubs = staticP.githubs.map(g => ({
        name: t(`${key}.githubs.${g.key}`),
        url: g.url
      }))
    }

    return p
  } catch (e) {
    console.error(e)
    return null
  }
})

// SEO Meta Update
useHead(() => {
  const p = project.value
  return {
    title: p ? `${p.title} - Ray Liu` : t('portfolio.project.notFound') + ' - Ray Liu',
    meta: [
      { name: 'description', content: p ? p.description : '' },
      { property: 'og:title', content: p ? `${p.title} - Ray Liu` : t('portfolio.project.notFound') },
      { property: 'og:description', content: p ? p.description : '' },
      { property: 'og:image', content: p ? `${siteUrl}${p.image}` : `${siteUrl}/og-image.png` }
    ]
  }
})
</script>

<style scoped>
.solution-content :deep(ul) {
  @apply list-disc pl-6 space-y-2 mt-2;
}

.solution-content :deep(ol) {
  @apply list-decimal pl-6 space-y-2 mt-2;
}

.solution-content :deep(li) {
  @apply text-coffee-700 dark:text-gray-300 leading-relaxed;
}

.solution-content :deep(p) {
  @apply mb-2;
}
</style>
