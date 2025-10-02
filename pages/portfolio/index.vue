<template>
  <div class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-coffee-800 dark:text-white mb-4">作品集</h1>
        <p class="text-coffee-600 dark:text-gray-400 max-w-2xl mx-auto">
          展示我在前端與後端開發領域的專案經驗與技術成果
        </p>
      </div>

      <!-- Filter -->
      <div class="mb-8">
        <div class="flex flex-wrap justify-center gap-4">
          <button 
            v-for="tag in allTags" 
            :key="tag"
            @click="toggleTag(tag)"
            :class="[
              'px-6 py-2 rounded-full font-semibold transition-colors',
              selectedTags.includes(tag)
                ? 'bg-coffee-600 dark:bg-blue-600 text-white' 
                : 'bg-coffee-100 dark:bg-gray-700 text-coffee-700 dark:text-gray-300 hover:bg-coffee-200 dark:hover:bg-gray-600'
            ]"
          >
            {{ tag }}
          </button>
        </div>
        <div v-if="selectedTags.length > 0" class="text-center mt-4">
          <button 
            @click="selectedTags = []"
            class="text-sm text-coffee-600 dark:text-blue-400 hover:underline"
          >
            清除所有篩選
          </button>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="project in filteredProjects" 
          :key="project.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <NuxtLink :to="`/portfolio/${project.id}`" class="block">
            <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover hover:scale-105 transition-transform duration-300">
          </NuxtLink>
          <div class="p-6">
            <div class="flex items-center justify-between mb-2">
              <span class="px-3 py-1 bg-coffee-100 dark:bg-gray-700 text-coffee-700 dark:text-gray-300 text-sm rounded-full">
                {{ project.category }}
              </span>
              <span class="text-coffee-500 dark:text-gray-400 text-sm">{{ project.year }}</span>
            </div>
            <h3 class="text-xl font-semibold text-coffee-800 dark:text-white mb-2">{{ project.title }}</h3>
            <p class="text-coffee-600 dark:text-gray-300 mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span 
                v-for="tech in project.technologies" 
                :key="tech" 
                class="px-2 py-1 bg-coffee-50 dark:bg-gray-700 text-coffee-600 dark:text-gray-300 text-xs rounded"
              >
                {{ tech }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <NuxtLink 
                :to="`/portfolio/${project.id}`" 
                class="text-coffee-600 dark:text-blue-400 hover:text-coffee-800 dark:hover:text-blue-300 font-semibold"
              >
                查看詳情 →
              </NuxtLink>
              <div class="flex gap-2">
                <a v-if="project.github" :href="project.github" target="_blank" class="text-coffee-500 dark:text-gray-400 hover:text-coffee-700 dark:hover:text-gray-300">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
                  </svg>
                </a>
                <template v-if="project.githubs">
                  <a v-for="(github, index) in project.githubs" 
                     :key="index" 
                     :href="github.url" 
                     target="_blank" 
                     class="relative group text-coffee-500 dark:text-gray-400 hover:text-coffee-700 dark:hover:text-gray-300"
                     :title="github.name">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
                    </svg>
                  </a>
                </template>
                <a v-if="project.demo" :href="project.demo" target="_blank" class="text-coffee-500 dark:text-gray-400 hover:text-coffee-700 dark:hover:text-gray-300">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
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

const selectedTags = ref([])

const projects = [
  {
    id: 1,
    title: 'Discord 風格聊天應用',
    description: '模仿 Discord 架構的即時聊天應用，支援伺服器、頻道、私訊、好友系統，採用 Vue 3 + Go 開發',
    image: '/project1.png',
    category: '全端開發',
    year: '2024',
    tags: ['Vue', 'Go', 'WebSocket'],
    technologies: ['Vue 3', 'TypeScript', 'Go', 'Gin', 'MongoDB', 'Redis', 'WebSocket', 'JWT', 'Element Plus'],
    demo: 'https://chat-app.liu-yucheng.com',
    githubs: [
      { name: '前端', url: 'https://github.com/RayLiu1999/chat_app_frontend' },
      { name: '後端', url: 'https://github.com/RayLiu1999/chat_app_backend' }
    ],
  },
  {
    id: 2,
    title: '綠芬芳手工皂電商網站',
    description: '使用 Nuxt.js 3 建構的手工皂電商平台，包含前台、後台管理和 RESTful API',
    image: '/project3.png',
    category: '全端開發',
    year: '2025',
    tags: ['Nuxt.js', 'Node.js', 'Express.js'],
    technologies: ['Nuxt.js 3', 'Tailwind CSS', 'TypeScript', 'Express.js', 'Gin', 'MySQL', 'JWT', 'reCAPTCHA'],
    demo: 'https://gf-soap.com',
  },
  {
    id: 3,
    title: 'Vue 國際象棋遊戲',
    description: '使用 Vue 3 開發的網頁版國際象棋遊戲，整合 Stockfish 引擎提供 AI 對戰功能',
    image: '/project2.png',
    category: '前端',
    year: '2024',
    tags: ['Vue', '遊戲開發'],
    technologies: ['Vue 3', 'Vuex', 'Vite', 'Stockfish.js', 'Docker'],
    demo: 'https://chess.liu-yucheng.com',
    github: 'https://github.com/RayLiu1999/chess-in-vue',
  },
  {
    id: 4,
    title: 'YouTube 影片下載擴充功能',
    description: 'Chrome 擴充功能，支援 YouTube 影片下載和 AI 總結功能，整合 n8n 工作流自動化',
    image: '/project4.png',
    category: '瀏覽器擴充功能',
    year: '2025',
    tags: ['瀏覽器擴充功能', '工具/自動化', 'n8n'],
    technologies: ['JavaScript', 'Chrome Extension API', 'n8n', 'yt-dlp', 'Docker Compose', 'Webhook'],
    github: 'https://github.com/RayLiu1999/youtube-extension',
  },
  {
    id: 5,
    title: 'YouTube Discord Bot',
    description: 'Discord Bot，自動爬取 YouTube 頻道的最新影片和直播，並推送到指定頻道',
    image: '/project7.png',
    category: 'Discord Bot',
    year: '2023',
    tags: ['Discord Bot', 'Node.js', '工具/自動化'],
    technologies: ['Node.js', 'Discord.js', 'PM2', 'YouTube API', 'Puppeteer', 'JavaScript'],
    github: 'https://github.com/RayLiu1999/yt_discord_bot',
  },
  {
    id: 6,
    title: 'PHP 簡易電商購物車',
    description: '使用 PHP 開發的簡易電商系統，包含商品瀏覽、購物車、用戶註冊登入等基本功能',
    image: '/project5.png',
    category: 'PHP',
    year: '2022',
    tags: ['PHP', 'MySQL'],
    technologies: ['PHP', 'MySQL', 'Composer', 'Apache'],
    github: 'https://github.com/RayLiu1999/e-commerce-cart',
    demo: 'https://e-commerce-cart.liu-yucheng.com',
    features: ['MVC 架構', '購物車系統', '用戶管理', '商品管理', 'Session 管理']
  },
  {
    id: 7,
    title: '番茄鐘生產力應用',
    description: '基於番茄工作法的生產力管理應用，幫助用戶管理任務與專注時間',
    image: '/project6.png',
    category: 'PHP',
    year: '2022',
    tags: ['PHP', 'MySQL'],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'Gulp', 'Prepros'],
    demo: 'https://pomodoro.liu-yucheng.com',
    github: 'https://github.com/RayLiu1999/tomato-clock',
  },
]

const allTags = computed(() => {
  const tags = new Set()
  projects.forEach(p => {
    p.tags.forEach(t => tags.add(t))
  })
  return ['全部', ...Array.from(tags).sort()]
})

const toggleTag = (tag) => {
  if (tag === '全部') {
    selectedTags.value = []
    return
  }
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

const filteredProjects = computed(() => {
  if (selectedTags.value.length === 0) {
    return projects
  }
  return projects.filter(project => 
    selectedTags.value.every(tag => project.tags.includes(tag))
  )
})

// SEO Meta 設定
useHead({
  title: '作品集 - Ray Liu | 後端工程師專案展示',
  meta: [
    {
      name: 'description',
      content: '瀏覽 Ray Liu 的程式設計作品集，包含全端開發、後端系統、DevOps 自動化等專案。展示使用 Node.js、Python、Vue.js、Docker 等技術的實戰經驗與創新解決方案。'
    },
    {
      name: 'keywords',
      content: 'Ray Liu 作品集, 程式設計專案, 全端開發, 後端系統, Node.js 專案, Python 應用, Vue.js 開發, DevOps 自動化'
    },
    // Open Graph
    {
      property: 'og:title',
      content: '作品集 - Ray Liu 後端工程師'
    },
    {
      property: 'og:description',
      content: '瀏覽 Ray Liu 的程式設計作品集，展示全端開發、後端系統、DevOps 等領域的專業專案。'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: `${siteUrl}/portfolio`
    }
  ]
})
</script>
