<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-coffee-100 to-coffee-200 dark:from-gray-800 dark:to-gray-700 py-20 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="mb-8">
            <img src="/avatar.jpg" alt="個人頭像" class="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg object-cover">
          </div>
          <h1 class="text-4xl md:text-6xl font-bold text-coffee-800 dark:text-white mb-6">
            Hi, 我是<span class="text-coffee-600 dark:text-blue-400">Ray Liu</span>
          </h1>
          <p class="text-xl text-coffee-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            我是一名熱愛技術的後端工程師，無論是前端、後端、DevOps 都蠻有興趣。我目前專注於高效能系統的研究與應用，讓自己有能力打造穩定且高效的系統。
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/portfolio" class="bg-coffee-600 hover:bg-coffee-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              查看作品集
            </NuxtLink>
            <NuxtLink to="/contact" class="border-2 border-coffee-600 dark:border-blue-400 text-coffee-600 dark:text-blue-400 hover:bg-coffee-600 dark:hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              聯絡我
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Blog Posts Section -->
    <section class="py-16 bg-white dark:bg-gray-800 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-coffee-800 dark:text-white mb-4">部落格最新文章</h2>
          <p class="text-coffee-600 dark:text-gray-400">分享技術與日常生活</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <a v-for="post in blogPosts" :key="post.id" :href="post.url" target="_blank" 
             class="bg-coffee-50 dark:bg-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div class="relative overflow-hidden">
              <img :src="post.cover" :alt="post.title" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300">
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div class="p-6">
              <div class="flex items-center text-coffee-500 dark:text-gray-400 text-sm mb-3">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                {{ post.date }}
              </div>
              <h3 class="text-lg font-semibold text-coffee-800 dark:text-white mb-2 group-hover:text-coffee-600 dark:group-hover:text-blue-400 transition-colors">
                {{ post.title }}
              </h3>
              <p class="text-coffee-600 dark:text-gray-300 text-sm mb-4">{{ post.excerpt }}</p>
              <div class="flex items-center text-coffee-600 dark:text-blue-400 font-semibold text-sm group-hover:gap-2 transition-all">
                閱讀更多
                <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </a>
        </div>
        <div class="text-center mt-12">
          <a href="https://blog.liu-yucheng.com" target="_blank" 
             class="inline-block bg-coffee-600 hover:bg-coffee-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            前往部落格
          </a>
        </div>
      </div>
    </section>

    <!-- Recent Projects -->
    <section class="py-16 bg-coffee-50 dark:bg-gray-900 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-coffee-800 dark:text-white mb-4">精選作品</h2>
          <p class="text-coffee-600 dark:text-gray-400">最新的專案成果</p>
        </div>
        <div class="flex flex-wrap justify-center gap-8">
          <div v-for="project in featuredProjects" :key="project.id" 
               class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.34rem)] flex flex-col">
            <NuxtLink :to="`/portfolio/${project.id}`" class="block">
              <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover hover:scale-105 transition-transform duration-300">
            </NuxtLink>
            <div class="p-6 flex flex-col flex-grow">
              <h3 class="text-xl font-semibold text-coffee-800 dark:text-white mb-2">{{ project.title }}</h3>
              <p class="text-coffee-600 dark:text-gray-300 mb-4 flex-grow">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="tech in project.technologies" :key="tech" class="px-3 py-1 bg-coffee-100 dark:bg-gray-700 text-coffee-700 dark:text-gray-300 text-sm rounded-full">
                  {{ tech }}
                </span>
              </div>
              <div class="flex justify-between items-center mt-auto pt-4 border-t border-coffee-100 dark:border-gray-700">
                <NuxtLink :to="`/portfolio/${project.id}`" class="text-coffee-600 dark:text-blue-400 hover:text-coffee-800 dark:hover:text-blue-300 font-semibold">
                  查看詳情 →
                </NuxtLink>
                <div class="flex gap-2">
                  <a v-if="project.github" :href="project.github" target="_blank" class="text-coffee-500 dark:text-gray-400 hover:text-coffee-700 dark:hover:text-gray-300" title="GitHub Repository">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
                    </svg>
                  </a>
                  <template v-if="project.githubs">
                    <a v-for="(github, index) in project.githubs" :key="index" :href="github" target="_blank" class="text-coffee-500 dark:text-gray-400 hover:text-coffee-700 dark:hover:text-gray-300" :title="`GitHub Repository ${index + 1}`">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
                      </svg>
                    </a>
                  </template>
                  <a v-if="project.demo" :href="project.demo" target="_blank" class="text-coffee-500 dark:text-gray-400 hover:text-coffee-700 dark:hover:text-gray-300" title="Live Demo">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-12">
          <NuxtLink to="/portfolio" class="bg-coffee-600 hover:bg-coffee-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            查看所有作品
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const blogUrl = useRuntimeConfig().public.blogUrl
const siteUrl = useRuntimeConfig().public.siteUrl

// 從 API 獲取部落格文章
const { data: blogData } = await useFetch(`${siteUrl}/api/blog`, {
  server: true,
  lazy: false,
})

const blogPosts = computed(() => {
  if (!blogData.value) return []
  
  return blogData.value.slice(0, 3).map((post, index) => ({
    id: index + 1,
    title: post.title,
    excerpt: post.excerpt,
    cover: `${blogUrl}${post.cover}`,
    url: `${blogUrl}/${post.path}`,
    date: new Date(post.date).toLocaleDateString('zh-TW', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    })
  }))
})

const featuredProjects = [
  {
    id: 1,
    title: 'Discord 風格聊天應用',
    description: '模仿 Discord 架構的即時聊天應用，支援伺服器、頻道、私訊、好友系統，採用 Vue 3 + Go 開發',
    image: '/project1.png',
    category: '全端開發',
    year: '2024',
    technologies: ['Vue 3', 'TypeScript', 'Go', 'Gin', 'MongoDB', 'Redis', 'WebSocket', 'JWT', 'Element Plus'],
    demo: 'https://chat-app.liu-yucheng.com',
    githubs: ['https://github.com/RayLiu1999/chat_app_frontend', 'https://github.com/RayLiu1999/chat_app_backend'],
  },
  // {
  //   id: 2,
  //   title: '綠芬芳手工皂電商網站',
  //   description: '使用 Nuxt.js 3 建構的手工皂電商平台，包含前台、後台管理和 RESTful API',
  //   image: '/project3.png',
  //   category: '全端開發',
  //   year: '2025',
  //   technologies: ['Nuxt.js 3', 'Vue 3', 'TypeScript', 'Node.js', 'Express.js', 'MySQL'],
  //   demo: 'https://gf-soap.com',
  // },
  // {
  //   id: 2,
  //   title: 'Vue 國際象棋遊戲',
  //   description: '使用 Vue 3 開發的網頁版國際象棋遊戲，整合 Stockfish 引擎提供 AI 對戰功能',
  //   image: '/project2.png',
  //   category: '前端',
  //   year: '2024',
  //   technologies: ['Vue 3', 'Vuex', 'Vite', 'Stockfish.js', 'Docker'],
  //   demo: 'https://chess.liu-yucheng.com',
  //   github: 'https://github.com/RayLiu1999/chess-in-vue',
  //   features: ['完整象棋規則', 'AI 對戰', '可行動位置高亮', 'FEN 格式支援', '響應式設計']
  // },
]
</script>
