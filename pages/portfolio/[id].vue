<template>
  <div class="py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="project">
        <!-- Back Button -->
        <div class="mb-8">
          <NuxtLink to="/portfolio" class="inline-flex items-center text-coffee-600 dark:text-blue-400 hover:text-coffee-800 dark:hover:text-blue-300">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            返回作品集
          </NuxtLink>
        </div>

        <!-- Project Header -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <span class="px-4 py-2 bg-coffee-100 dark:bg-gray-700 text-coffee-700 dark:text-gray-300 rounded-full">{{ project.category }}</span>
            <span class="text-coffee-500 dark:text-gray-400">{{ project.year }}</span>
          </div>
          <h1 class="text-4xl font-bold text-coffee-800 dark:text-white mb-4">{{ project.title }}</h1>
          <p class="text-xl text-coffee-600 dark:text-gray-300 mb-6">{{ project.description }}</p>
          
          <!-- Links -->
          <div class="flex gap-4">
            <a v-if="project.github" :href="project.github" target="_blank" 
               class="inline-flex items-center px-6 py-3 bg-coffee-800 dark:bg-blue-600 text-white rounded-lg hover:bg-coffee-900 dark:hover:bg-blue-700 transition-colors">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
              </svg>
              GitHub 源碼
            </a>
            <a v-if="project.demo" :href="project.demo" target="_blank"
               class="inline-flex items-center px-6 py-3 border-2 border-coffee-600 dark:border-blue-400 text-coffee-600 dark:text-blue-400 rounded-lg hover:bg-coffee-600 dark:hover:bg-blue-600 hover:text-white transition-colors">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              線上展示
            </a>
          </div>
        </div>

        <!-- Project Image -->
        <div class="mb-8">
          <img :src="project.image" :alt="project.title" class="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg">
        </div>

        <!-- Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Project Overview -->
            <section class="mb-8">
              <h2 class="text-2xl font-bold text-coffee-800 dark:text-white mb-4">專案概述</h2>
              <div class="prose prose-coffee max-w-none">
                <p class="text-coffee-600 dark:text-gray-300 leading-relaxed">{{ project.overview }}</p>
              </div>
            </section>

            <!-- Technical Challenges -->
            <section class="mb-8">
              <h2 class="text-2xl font-bold text-coffee-800 dark:text-white mb-4">技術挑戰與解決方案</h2>
              <div class="space-y-4">
                <div v-for="challenge in project.challenges" :key="challenge.title" class="bg-coffee-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                  <h3 class="text-lg font-semibold text-coffee-800 dark:text-white mb-2">{{ challenge.title }}</h3>
                  <p class="text-coffee-600 dark:text-gray-300 mb-3">{{ challenge.problem }}</p>
                  <p class="text-coffee-700 dark:text-gray-300"><strong>解決方案：</strong>{{ challenge.solution }}</p>
                </div>
              </div>
            </section>

            <!-- Architecture -->
            <section class="mb-8">
              <h2 class="text-2xl font-bold text-coffee-800 dark:text-white mb-4">系統架構</h2>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700">
                <img :src="project.architecture" alt="系統架構圖" class="w-full rounded-lg">
                <p class="text-coffee-600 dark:text-gray-300 mt-4">{{ project.architectureDescription }}</p>
              </div>
            </section>

            <!-- Learnings -->
            <section class="mb-8">
              <h2 class="text-2xl font-bold text-coffee-800 dark:text-white mb-4">學習與心得</h2>
              <div class="bg-coffee-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                <p class="text-coffee-600 dark:text-gray-300 leading-relaxed">{{ project.learnings }}</p>
              </div>
            </section>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <!-- Tech Stack -->
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700 mb-6">
              <h3 class="text-lg font-semibold text-coffee-800 dark:text-white mb-4">技術棧</h3>
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

            <!-- Project Stats -->
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700 mb-6">
              <h3 class="text-lg font-semibold text-coffee-800 dark:text-white mb-4">專案數據</h3>
              <div class="space-y-3">
                <div v-for="stat in project.stats" :key="stat.label" class="flex justify-between">
                  <span class="text-coffee-600 dark:text-gray-300">{{ stat.label }}</span>
                  <span class="font-semibold text-coffee-800 dark:text-white">{{ stat.value }}</span>
                </div>
              </div>
            </div>

            <!-- Timeline -->
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700">
              <h3 class="text-lg font-semibold text-coffee-800 dark:text-white mb-4">開發時程</h3>
              <div class="space-y-3">
                <div v-for="milestone in project.timeline" :key="milestone.phase" class="flex items-start">
                  <div class="w-3 h-3 bg-coffee-600 dark:bg-blue-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                  <div>
                    <div class="font-medium text-coffee-800 dark:text-white">{{ milestone.phase }}</div>
                    <div class="text-sm text-coffee-600 dark:text-gray-400">{{ milestone.duration }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-16">
        <h1 class="text-2xl font-bold text-coffee-800 dark:text-white">專案不存在</h1>
        <NuxtLink to="/portfolio" class="text-coffee-600 dark:text-blue-400 hover:text-coffee-800 dark:hover:text-blue-300 mt-4 inline-block">
          返回作品集
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const projectId = parseInt(route.params.id)
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

// Mock project data - 實際專案數據
const projects = {
  1: {
    id: 1,
    title: 'Discord 風格聊天應用',
    description: '模仿 Discord 架構的即時聊天應用，支援伺服器、頻道、私訊、好友系統，採用 Vue 3 + Go 開發',
    image: '/project1.png',
    category: '全端開發',
    year: '2024',
    github: 'https://github.com/RayLiu1999/chat_app_frontend',
    overview: '這是一個以 Discord 為樣板製作的即時聊天應用，包含前端（Vue 3）和後端（Go）兩個部分。支援伺服器（Server/Guild）、頻道（Channel/Room）、私訊（DM）、好友系統等完整功能。採用 WebSocket 實現即時通訊，MongoDB 儲存數據，Redis 處理快取和訊息推播。',
    architecture: '/project1.png',
    architectureDescription: '前端使用 Vue 3 + TypeScript，後端採用 Go + Gin 框架，三層架構設計（Controller → Service → Repository），WebSocket 提供即時通訊，MongoDB 儲存聊天記錄，Redis 處理狀態管理。',
    challenges: [
      {
        title: 'WebSocket 連線管理',
        problem: '需要處理多個聊天室的即時訊息推播，確保訊息準確送達到對應的房間成員。',
        solution: '實作 WebSocket 連線池管理，使用 Redis Pub/Sub 進行跨服務的訊息廣播，確保訊息實時性。'
      },
      {
        title: '權限與安全',
        problem: '需要實現複雜的權限系統，包含 JWT 認證、CSRF 防護等安全機制。',
        solution: '採用 Access/Refresh Token 雙重驗證，自訂 Gin Middleware 處理 CSRF Token 驗證。'
      }
    ],
    techStack: [
      {
        name: '前端',
        technologies: ['Vue 3', 'TypeScript', 'Element Plus', 'UnoCSS', 'Pinia']
      },
      {
        name: '後端',
        technologies: ['Go', 'Gin', 'gorilla/websocket', 'JWT', 'Viper']
      },
      {
        name: '資料庫',
        technologies: ['MongoDB', 'Redis']
      }
    ],
    stats: [
      { label: '前端程式碼', value: '15,000+ 行' },
      { label: '後端程式碼', value: '12,000+ 行' },
      { label: '開發週期', value: '4 個月' },
      { label: '支援功能', value: '8+ 模組' }
    ],
    timeline: [
      { phase: '架構設計', duration: '2 週' },
      { phase: '後端開發', duration: '6 週' },
      { phase: '前端開發', duration: '8 週' },
      { phase: '整合測試', duration: '4 週' }
    ],
    learnings: '通過這個專案深入學習了 WebSocket 即時通訊技術，掌握了 Go 語言的 Gin 框架開發，以及 Vue 3 Composition API 的使用。特別是在處理複雜的狀態管理和即時訊息推播方面積累了寶貴經驗。'
  },
  2: {
    id: 2,
    title: 'Vue 國際象棋遊戲',
    description: '使用 Vue 3 開發的網頁版國際象棋遊戲，整合 Stockfish 引擎提供 AI 對戰功能',
    image: '/project2.png',
    category: '前端',
    year: '2024',
    github: 'https://github.com/RayLiu1999/chess_in_vue',
    overview: '一款使用 Vue 3 和 Vite 開發的網頁版國際象棋遊戲，提供美觀直觀的使用者介面。整合 Stockfish 國際象棋引擎提供 AI 對戰功能，支援完整的國際象棋規則實現，包含可行動位置高亮、FEN 格式棋盤狀態等進階功能。',
    architecture: '/project2.png',
    architectureDescription: '使用 Vue 3 + Vuex 4 進行狀態管理，Stockfish.js 提供 AI 引擎，支援 FEN 格式的棋盤狀態序列化，Docker 容器化部署。',
    challenges: [
      {
        title: '象棋規則實現',
        problem: '需要完整實現國際象棋的複雜規則，包含特殊移動如王車易位、過路兵等。',
        solution: '設計完整的棋子類別系統，實作各種棋子的移動邏輯，並加入規則驗證機制。'
      },
      {
        title: 'AI 引擎整合',
        problem: '需要將 Stockfish 引擎整合到網頁應用中，並處理 AI 運算的異步問題。',
        solution: '使用 Stockfish.js 在瀏覽器中運行引擎，透過 Web Worker 避免阻塞主線程。'
      }
    ],
    techStack: [
      {
        name: '前端框架',
        technologies: ['Vue 3', 'Vuex 4', 'Vite']
      },
      {
        name: 'AI 引擎',
        technologies: ['Stockfish.js', 'Web Worker']
      },
      {
        name: '部署',
        technologies: ['Docker', 'Nginx']
      }
    ],
    stats: [
      { label: '程式碼行數', value: '8,000+' },
      { label: '象棋規則', value: '100% 完整' },
      { label: '開發週期', value: '2 個月' },
      { label: 'AI 強度', value: '專業級' }
    ],
    timeline: [
      { phase: '遊戲邏輯', duration: '3 週' },
      { phase: 'UI 設計', duration: '2 週' },
      { phase: 'AI 整合', duration: '2 週' },
      { phase: '測試優化', duration: '1 週' }
    ],
    learnings: '這個專案讓我深入理解了遊戲邏輯的設計模式，學會了如何處理複雜的狀態管理，以及 AI 引擎的整合技術。特別是在效能優化和使用者體驗設計方面有了顯著提升。'
  },
  3: {
    id: 3,
    title: '綠芬芳手工皂電商網站',
    description: '使用 Nuxt.js 3 建構的手工皂電商平台，包含前台、後台管理和 RESTful API',
    image: '/project3.png',
    category: '全端開發',
    year: '2025',
    demo: 'https://gf-soap.com',
    overview: '一個完整的電商平台解決方案，包含使用 Nuxt.js 3 開發的前台網站、Vue.js 管理後台，以及 Node.js 開發的 RESTful API。支援動態內容管理、SEO 最佳化、產品管理等電商功能。',
    architecture: '/project3.png',
    architectureDescription: '前台使用 Nuxt.js 3 進行 SSG 靜態生成，管理後台採用 Vue.js SPA，後端 API 使用 Node.js + Express.js 框架，MySQL 資料庫，整合 Google reCAPTCHA 安全防護。',
    challenges: [
      {
        title: 'SEO 最佳化',
        problem: '電商網站需要良好的搜尋引擎排名，傳統 SPA 難以滿足 SEO 需求。',
        solution: '採用 Nuxt.js 3 的 SSG 模式，自動生成 Sitemap，實作動態 meta 標籤和結構化資料。'
      },
      {
        title: '內容管理系統',
        problem: '需要讓非技術人員能夠輕鬆管理網站內容和產品資訊。',
        solution: '開發直觀的管理後台，支援所見即所得編輯器，圖片上傳，產品管理等功能。'
      }
    ],
    techStack: [
      {
        name: '前台',
        technologies: ['Nuxt.js 3', 'Tailwind CSS', 'TypeScript']
      },
      {
        name: '後台',
        technologies: ['Vue.js', 'Element Plus', 'Axios']
      },
      {
        name: '後端',
        technologies: ['Go', 'Gin', 'MySQL', 'JWT', 'GORM']
      }
    ],
    stats: [
      { label: '前台頁面', value: '15+ 頁' },
      { label: 'API 端點', value: '30+' },
      { label: '開發週期', value: '5 個月' },
      { label: '管理功能', value: '20+ 模組' }
    ],
    timeline: [
      { phase: 'API 設計', duration: '3 週' },
      { phase: '後台開發', duration: '6 週' },
      { phase: '前台開發', duration: '8 週' },
      { phase: '整合部署', duration: '3 週' }
    ],
    learnings: '通過這個專案掌握了現代化的前端開發工作流程，深入理解了 SSG 的優勢和 SEO 最佳化技巧。同時也提升了全端開發的能力，學會了如何設計易用的管理介面。'
  },
  4: {
    id: 4,
    title: 'YouTube 影片下載擴充功能',
    description: 'Chrome 擴充功能，支援 YouTube 影片下載和 AI 總結功能，整合 n8n 工作流自動化',
    image: '/project4.png',
    category: '瀏覽器擴充功能',
    year: '2024',
    github: 'https://github.com/RayLiu1999/youtube-extension',
    overview: '一個功能豐富的 Chrome 擴充功能，不僅支援 YouTube 影片的多品質下載，還整合了 AI 影片總結功能。使用 n8n 工作流自動化平台處理下載和總結任務，支援線上和本地兩種運行模式。',
    architecture: '/project4.png',
    architectureDescription: '擴充功能使用 Chrome Extension API，透過 Webhook 與 n8n 工作流通訊，後端使用 yt-dlp 進行影片下載，AI 模型處理影片總結。',
    challenges: [
      {
        title: '跨域通訊',
        problem: '瀏覽器擴充功能需要與外部 API 服務進行安全的跨域通訊。',
        solution: '使用 Chrome Extension 的 background script 處理 API 請求，配置適當的權限和 CSP 政策。'
      },
      {
        title: '工作流整合',
        problem: '需要將複雜的影片處理流程自動化，包含下載、轉檔、AI 分析等步驟。',
        solution: '使用 n8n 設計完整的工作流，透過 Webhook 觸發，Docker Compose 部署相關服務。'
      }
    ],
    techStack: [
      {
        name: '擴充功能',
        technologies: ['JavaScript', 'Chrome Extension API', 'Manifest V3']
      },
      {
        name: '工作流',
        technologies: ['n8n', 'yt-dlp', 'ffmpeg', 'Docker Compose']
      },
      {
        name: 'AI 服務',
        technologies: ['Webhook', 'RESTful API']
      }
    ],
    stats: [
      { label: '支援格式', value: 'MP4/MP3' },
      { label: '品質選項', value: '4 種' },
      { label: '開發週期', value: '3 個月' },
      { label: '工作流步驟', value: '10+' }
    ],
    timeline: [
      { phase: '擴充功能開發', duration: '4 週' },
      { phase: 'n8n 工作流', duration: '3 週' },
      { phase: 'AI 整合', duration: '3 週' },
      { phase: '測試部署', duration: '2 週' }
    ],
    learnings: '這個專案讓我學會了瀏覽器擴充功能的開發，掌握了工作流自動化的設計思維，以及如何整合不同的服務和 API 來實現複雜的功能需求。'
  },
  5: {
    id: 5,
    title: 'PHP 簡易電商購物車',
    description: '使用 PHP 開發的簡易電商系統，包含商品瀏覽、購物車、用戶註冊登入等基本功能',
    image: '/project5.png',
    category: 'PHP',
    year: '2024',
    github: 'https://github.com/RayLiu1999/e-commerce-cart',
    demo: 'https://e-commerce-cart.liu-yucheng.com',
    overview: '一個使用 PHP 開發的簡易電商購物車系統，採用 MVC 架構模式。包含商品瀏覽、購物車管理、用戶註冊登入、訂單處理等電商基本功能。適合學習 PHP 開發和電商系統設計的入門專案。',
    architecture: '/project5.png',
    architectureDescription: '採用 MVC 架構，Controllers 處理請求路由，Models 負責資料處理，Views 渲染頁面。使用 Composer 管理依賴，Apache 服務器部署。',
    challenges: [
      {
        title: 'Session 管理',
        problem: '需要安全地管理用戶登入狀態和購物車數據的持久化。',
        solution: '使用 PHP Session 機制結合資料庫儲存，確保購物車數據的安全性和持久性。'
      },
      {
        title: 'MVC 架構實現',
        problem: '如何在 PHP 中實現清晰的 MVC 架構分離。',
        solution: '設計路由系統，實作 Controller 基類，Model 類別處理資料庫操作，View 負責模板渲染。'
      }
    ],
    techStack: [
      {
        name: '後端',
        technologies: ['PHP 7.4+', 'MySQL', 'Apache']
      },
      {
        name: '前端',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap']
      },
      {
        name: '工具',
        technologies: ['Composer', 'Git']
      }
    ],
    stats: [
      { label: '程式碼行數', value: '5,000+' },
      { label: '功能模組', value: '6 個' },
      { label: '開發週期', value: '1 個月' },
      { label: '資料表', value: '8 張' }
    ],
    timeline: [
      { phase: '資料庫設計', duration: '1 週' },
      { phase: '後端開發', duration: '2 週' },
      { phase: '前端整合', duration: '1 週' }
    ],
    learnings: '通過這個專案加深了對 PHP 語言和 MVC 架構的理解，學會了如何設計簡潔的資料庫結構，以及電商系統的基本業務邏輯實現。'
  },
  6: {
    id: 6,
    title: '番茄鐘生產力應用',
    description: '基於番茄工作法的生產力管理應用，幫助用戶管理任務與專注時間',
    image: '/project6.png',
    category: 'PHP',
    year: '2023',
    github: 'https://github.com/RayLiu1999/tomato-clock',
    demo: 'https://pomodoro.liu-yucheng.com',
    overview: '一個基於番茄工作法的生產力管理應用，幫助用戶提升專注力和工作效率。支援任務管理、番茄計時器、專注統計等功能。使用 PHP 後端開發，提供響應式的使用者介面。',
    architecture: '/project6.png',
    architectureDescription: '使用 PHP + MySQL 後端，前端採用響應式設計，支援 Gulp 和 Prepros 熱重整開發環境。',
    challenges: [
      {
        title: '計時器準確性',
        problem: '需要確保番茄鐘計時的準確性，即使在瀏覽器後台運行也要保持同步。',
        solution: '使用 JavaScript 定時器結合服務器時間校對，確保計時準確性。'
      },
      {
        title: '數據統計',
        problem: '需要為用戶提供有意義的專注時間統計和分析。',
        solution: '設計統計演算法，提供日、週、月的專注時間報表和趨勢分析。'
      }
    ],
    techStack: [
      {
        name: '後端',
        technologies: ['PHP', 'MySQL']
      },
      {
        name: '前端',
        technologies: ['HTML5', 'CSS3', 'JavaScript']
      },
      {
        name: '開發工具',
        technologies: ['Gulp', 'Prepros', 'Apache']
      }
    ],
    stats: [
      { label: '計時精度', value: '秒級' },
      { label: '統計維度', value: '多時間區間' },
      { label: '開發週期', value: '3 週' },
      { label: '響應式支援', value: '完整' }
    ],
    timeline: [
      { phase: '功能設計', duration: '1 週' },
      { phase: '核心開發', duration: '1.5 週' },
      { phase: '介面優化', duration: '0.5 週' }
    ],
    learnings: '通過開發這個應用，學會了如何設計簡潔有效的時間管理工具，掌握了前端計時器的實現技巧，以及數據統計和視覺化的基本方法。'
  },
  7: {
    id: 7,
    title: 'YouTube Discord 機器人',
    description: 'Discord 機器人，自動爬取 YouTube 頻道的最新影片和直播，並推送到指定頻道',
    image: '/project7.png',
    category: 'Discord 機器人',
    year: '2024',
    github: 'https://github.com/RayLiu1999/yt_discord_bot',
    overview: '這是一個自動化的 Discord 機器人，專門用於爬取 YouTube 頻道的最新影片和直播內容，並將其推送到指定的 Discord 頻道。機器人支援自動排程（每小時整點和半點檢查）和手動觸發，並具備完整的頻道管理功能，避免重複推送相同內容。',
    architecture: '/project7.png',
    architectureDescription: '使用 Node.js + Discord.js 開發，支援 Fetch API 和 Puppeteer 兩種爬蟲模式，透過 PM2 進行程序管理，定時任務確保穩定運行。',
    challenges: [
      {
        title: 'YouTube 爬蟲實現',
        problem: '需要穩定地爬取 YouTube 頻道內容，並處理各種反爬蟲機制。',
        solution: '實作雙重爬蟲策略：Fetch API 作為主要方式，Puppeteer 作為備用方案，確保爬取穩定性。'
      },
      {
        title: '重複內容避免',
        problem: '需要追蹤已推送的影片，避免重複通知用戶。',
        solution: '建立本地快取機制，記錄已推送內容的 ID，並實作智能過濾算法。'
      },
      {
        title: '定時任務管理',
        problem: '需要確保機器人能夠穩定地執行定時檢查任務，不受服務重啟影響。',
        solution: '使用 PM2 進行程序管理，配置自動重啟和錯誤處理機制。'
      }
    ],
    techStack: [
      {
        name: '核心技術',
        technologies: ['Node.js', 'Discord.js', 'JavaScript']
      },
      {
        name: '爬蟲技術',
        technologies: ['YouTube API', 'Puppeteer', 'Fetch API']
      },
      {
        name: '部署管理',
        technologies: ['PM2', 'Linux Cron']
      }
    ],
    stats: [
      { label: '支援指令', value: '10+' },
      { label: '爬蟲模式', value: '2 種' },
      { label: '開發週期', value: '3 週' },
      { label: '檢查頻率', value: '每 30 分鐘' }
    ],
    timeline: [
      { phase: 'Discord 機器人框架', duration: '1 週' },
      { phase: '爬蟲功能開發', duration: '1 週' },
      { phase: '定時任務與部署', duration: '1 週' }
    ],
    learnings: '這個專案讓我深入學習了 Discord 機器人開發、網頁爬蟲技術，以及自動化任務的設計。特別是在處理反爬蟲機制和確保服務穩定性方面積累了寶貴經驗。'
  }
}

const project = projects[projectId] || null
let description = ''
let keywords = ''

if (project) {
  description = project.description;
} else {
  description = '抱歉，您要查看的專案不存在。';
}

if (project) {
  keywords = `${project.title}`;
  if (Array.isArray(project.technologies)) {
    keywords += `, ${project.technologies.join(', ')}`
  }
  keywords += `, ${project.category}, Ray Liu 專案`
}

// SEO Meta 設定
useHead({
  title: project ? `${project.title} - Ray Liu 作品集` : '專案不存在 - Ray Liu',
  meta: [
    {
      name: 'description',
      content: description,
    },
    {
      name: 'keywords',
      content: keywords,
    },
    // Open Graph
    {
      property: 'og:title',
      content: project ? `${project.title} - Ray Liu 作品集` : '專案不存在'
    },
    {
      property: 'og:description',
      content: project ? project.description : '抱歉，您要查看的專案不存在。'
    },
    {
      property: 'og:type',
      content: 'article'
    },
    {
      property: 'og:url',
      content: `${siteUrl}/portfolio/${projectId}`
    },
    {
      property: 'og:image',
      content: project ? `${siteUrl}${project.image}` : `${siteUrl}/og-image.png`
    },
    // Article specific
    {
      property: 'article:author',
      content: 'Ray Liu'
    },
    {
      property: 'article:section',
      content: project?.category || '程式設計'
    }
  ]
})
</script>
