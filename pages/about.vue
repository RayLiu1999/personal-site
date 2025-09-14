<template>
  <div class="py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-coffee-800 dark:text-white mb-4">Hello, 我是 Ray Liu</h1>
        <p class="text-lg text-coffee-600 dark:text-gray-400">一個熱愛用程式碼解決問題、創造有趣事物的後端工程師。</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- My Story -->
          <section class="mb-12">
            <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border dark:border-gray-700">
              <div class="flex items-center mb-6">
                <img src="/avatar.jpg" alt="個人照片" class="w-24 h-24 rounded-full mr-6 object-cover shadow-md">
                <div>
                  <h2 class="text-2xl font-bold text-coffee-800 dark:text-white mb-2">我的故事</h2>
                  <p class="text-coffee-500 dark:text-gray-400">從一行程式碼開始的旅程</p>
                </div>
              </div>
              <div class="prose prose-coffee max-w-none text-coffee-600 dark:text-gray-300 leading-relaxed space-y-4">
                <p>
                  你好！我是一名擁有 3 年多實戰經驗的後端工程師。對我來說，程式設計不僅僅是工作，更是一種創造與解決問題的藝術。我對所有新技術都抱持著強烈的好奇心，無論是前端、後端，還是 DevOps 的自動化世界。
                </p>
                <p>
                  我特別喜歡透過 Side Project 來學習，因為我相信這是最扎實、最貼近實戰的成長方式。尤其在 AI 工具日益強大的今天，學習的效率與深度都得到了前所未有的提升，讓我可以更快地將新知識應用到專案中。
                </p>
                <p>
                  工作與學習之餘，我也喜歡動手寫些能為生活帶來便利或純粹趣味的小工具，我相信技術最大的價值，在於它能真正融入日常。
                </p>
                <p>
                  這個網站就是我實踐想法的小天地，歡迎你到處看看！
                </p>
              </div>
            </div>
          </section>

          <!-- My Philosophy -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-coffee-800 dark:text-white mb-6 text-center lg:text-left">我的開發理念</h2>
            <div class="space-y-6">
              <div v-for="item in philosophy" :key="item.title" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700 flex items-start">
                <div class="flex-shrink-0 mr-5">
                  <div class="w-12 h-12 rounded-full bg-coffee-100 dark:bg-gray-700 flex items-center justify-center">
                    <svg class="w-6 h-6 text-coffee-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="item.icon"></svg>
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
            <h3 class="text-lg font-semibold text-coffee-800 dark:text-white mb-4">我的技術工具箱</h3>
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
            <h3 class="text-lg font-semibold text-coffee-800 dark:text-white mb-4">語言能力</h3>
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

const philosophy = [
  {
    title: '程式碼是門手藝',
    description: '我相信好的程式碼不僅要能運作，更應該清晰、優雅且易於維護。',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" />'
  },
  {
    title: '務實的解決方案',
    description: '技術是為了解決問題而生。我專注於尋找最適合當下情境的工具與架構，而非盲目追逐潮流。',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3" />'
  },
  {
    title: '持續學習與分享',
    description: '科技日新月異，我享受不斷學習新知的過程，也樂於與團隊分享，共同成長。',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />'
  }
]

const skills = [
  {
    category: '主力語言',
    items: ['PHP', 'JavaScript', 'Go', 'TypeScript', 'Node.js']
  },
  {
    category: '資料庫與快取',
    items: ['MySQL', 'PostgreSQL', 'Redis', 'MongoDB', 'Elasticsearch']
  },
  {
    category: 'DevOps & Infra',
    items: ['Docker', 'GCP', 'Kubernetes', 'Jenkins', 'Terraform']
  }
]

const languages = [
  { name: '中文', level: '母語', style: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
  { name: '英文', level: '流利', style: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
  { name: '日文', level: '基礎', style: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' }
]

// SEO Meta 設定
useHead({
  title: '關於我 - Ray Liu | 後端工程師個人簡介',
  meta: [
    {
      name: 'description',
      content: '了解 Ray Liu 的程式設計師成長故事與職涯歷程。一個熱愛用程式碼解決問題、創造有趣事物的後端工程師，分享我的技術哲學、核心技能和持續學習的心路歷程。'
    },
    {
      name: 'keywords',
      content: 'Ray Liu 簡介, 後端工程師背景, 程式設計師故事, 技術哲學, 職涯發展, 個人經歷'
    },
    // Open Graph
    {
      property: 'og:title',
      content: '關於我 - Ray Liu 後端工程師'
    },
    {
      property: 'og:description',
      content: '了解 Ray Liu 的程式設計師成長故事，一個熱愛用程式碼解決問題的後端工程師。'
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
