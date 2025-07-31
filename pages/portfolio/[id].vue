<template>
  <div class="py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="project">
        <!-- Back Button -->
        <div class="mb-8">
          <NuxtLink to="/portfolio" class="inline-flex items-center text-coffee-600 hover:text-coffee-800">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            返回作品集
          </NuxtLink>
        </div>

        <!-- Project Header -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <span class="px-4 py-2 bg-coffee-100 text-coffee-700 rounded-full">{{ project.category }}</span>
            <span class="text-coffee-500">{{ project.year }}</span>
          </div>
          <h1 class="text-4xl font-bold text-coffee-800 mb-4">{{ project.title }}</h1>
          <p class="text-xl text-coffee-600 mb-6">{{ project.description }}</p>
          
          <!-- Links -->
          <div class="flex gap-4">
            <a v-if="project.github" :href="project.github" target="_blank" 
               class="inline-flex items-center px-6 py-3 bg-coffee-800 text-white rounded-lg hover:bg-coffee-900 transition-colors">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
              </svg>
              GitHub 源碼
            </a>
            <a v-if="project.demo" :href="project.demo" target="_blank"
               class="inline-flex items-center px-6 py-3 border-2 border-coffee-600 text-coffee-600 rounded-lg hover:bg-coffee-600 hover:text-white transition-colors">
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
              <h2 class="text-2xl font-bold text-coffee-800 mb-4">專案概述</h2>
              <div class="prose prose-coffee max-w-none">
                <p class="text-coffee-600 leading-relaxed">{{ project.overview }}</p>
              </div>
            </section>

            <!-- Technical Challenges -->
            <section class="mb-8">
              <h2 class="text-2xl font-bold text-coffee-800 mb-4">技術挑戰與解決方案</h2>
              <div class="space-y-4">
                <div v-for="challenge in project.challenges" :key="challenge.title" class="bg-coffee-50 p-6 rounded-lg">
                  <h3 class="text-lg font-semibold text-coffee-800 mb-2">{{ challenge.title }}</h3>
                  <p class="text-coffee-600 mb-3">{{ challenge.problem }}</p>
                  <p class="text-coffee-700"><strong>解決方案：</strong>{{ challenge.solution }}</p>
                </div>
              </div>
            </section>

            <!-- Architecture -->
            <section class="mb-8">
              <h2 class="text-2xl font-bold text-coffee-800 mb-4">系統架構</h2>
              <div class="bg-white p-6 rounded-lg shadow-sm border">
                <img :src="project.architecture" alt="系統架構圖" class="w-full rounded-lg">
                <p class="text-coffee-600 mt-4">{{ project.architectureDescription }}</p>
              </div>
            </section>

            <!-- Learnings -->
            <section class="mb-8">
              <h2 class="text-2xl font-bold text-coffee-800 mb-4">學習與心得</h2>
              <div class="bg-coffee-50 p-6 rounded-lg">
                <p class="text-coffee-600 leading-relaxed">{{ project.learnings }}</p>
              </div>
            </section>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <!-- Tech Stack -->
            <div class="bg-white p-6 rounded-lg shadow-sm border mb-6">
              <h3 class="text-lg font-semibold text-coffee-800 mb-4">技術棧</h3>
              <div class="space-y-3">
                <div v-for="category in project.techStack" :key="category.name">
                  <h4 class="font-medium text-coffee-700 mb-2">{{ category.name }}</h4>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="tech in category.technologies" :key="tech" 
                          class="px-3 py-1 bg-coffee-100 text-coffee-700 text-sm rounded-full">
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Project Stats -->
            <div class="bg-white p-6 rounded-lg shadow-sm border mb-6">
              <h3 class="text-lg font-semibold text-coffee-800 mb-4">專案數據</h3>
              <div class="space-y-3">
                <div v-for="stat in project.stats" :key="stat.label" class="flex justify-between">
                  <span class="text-coffee-600">{{ stat.label }}</span>
                  <span class="font-semibold text-coffee-800">{{ stat.value }}</span>
                </div>
              </div>
            </div>

            <!-- Timeline -->
            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <h3 class="text-lg font-semibold text-coffee-800 mb-4">開發時程</h3>
              <div class="space-y-3">
                <div v-for="milestone in project.timeline" :key="milestone.phase" class="flex items-start">
                  <div class="w-3 h-3 bg-coffee-600 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                  <div>
                    <div class="font-medium text-coffee-800">{{ milestone.phase }}</div>
                    <div class="text-sm text-coffee-600">{{ milestone.duration }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-16">
        <h1 class="text-2xl font-bold text-coffee-800">專案不存在</h1>
        <NuxtLink to="/portfolio" class="text-coffee-600 hover:text-coffee-800 mt-4 inline-block">
          返回作品集
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const projectId = parseInt(route.params.id)

// Mock project data - 在實際應用中，這些數據會從 API 或 CMS 獲取
const projects = {
  1: {
    id: 1,
    title: 'E-commerce API 系統',
    description: '高併發電商後端系統，支援百萬級用戶同時在線，包含完整的訂單、支付、庫存管理功能',
    image: '/project1.jpg',
    category: 'Web API',
    year: '2024',
    github: 'https://github.com/example/ecommerce-api',
    demo: 'https://api.example.com',
    overview: '這是一個為大型電商平台設計的高併發後端系統，能夠處理百萬級用戶同時在線的場景。系統採用微服務架構，包含用戶管理、商品管理、訂單處理、支付系統、庫存管理等核心模組。通過 Redis 集群實現分散式快取，MySQL 讀寫分離提升資料庫性能，並使用 Docker 容器化部署確保系統的可擴展性。',
    architecture: '/architecture1.jpg',
    architectureDescription: '系統採用分層架構設計，API Gateway 作為統一入口，後端服務通過 Load Balancer 分散請求，Redis 集群提供快取服務，MySQL 主從架構確保資料一致性。',
    challenges: [
      {
        title: '高併發處理',
        problem: '在促銷活動期間，系統需要處理瞬間湧入的大量請求，傳統架構無法承受如此高的併發量。',
        solution: '實施 Redis 分散式快取、資料庫讀寫分離、以及基於 Nginx 的負載均衡，將系統 QPS 提升至 50,000+。'
      },
      {
        title: '庫存一致性',
        problem: '在高併發場景下，如何確保庫存數據的一致性，避免超賣問題。',
        solution: '採用 Redis 分散式鎖 + 資料庫樂觀鎖的雙重保障機制，確保庫存操作的原子性。'
      }
    ],
    techStack: [
      {
        name: '後端框架',
        technologies: ['Node.js', 'Express.js', 'Koa.js']
      },
      {
        name: '資料庫',
        technologies: ['MySQL', 'Redis', 'MongoDB']
      },
      {
        name: '部署運維',
        technologies: ['Docker', 'Nginx', 'PM2']
      }
    ],
    stats: [
      { label: '程式碼行數', value: '50,000+' },
      { label: '支援 QPS', value: '50,000' },
      { label: '開發週期', value: '6 個月' },
      { label: '團隊規模', value: '5 人' }
    ],
    timeline: [
      { phase: '需求分析', duration: '2 週' },
      { phase: '架構設計', duration: '3 週' },
      { phase: '核心開發', duration: '16 週' },
      { phase: '測試部署', duration: '3 週' }
    ],
    learnings: '通過這個專案，我深入學習了高併發系統的設計原則，掌握了分散式快取、資料庫優化、負載均衡等關鍵技術。特別是在處理庫存一致性問題時，讓我對分散式系統的 CAP 理論有了更深刻的理解。此外，也提升了我在系統監控、性能調優方面的能力。'
  },
  2: {
    id: 2,
    title: '微服務架構平台',
    description: '基於 Kubernetes 的微服務架構，提升系統可擴展性，支援自動擴縮容與服務發現',
    image: '/project2.jpg',
    category: '微服務',
    year: '2024',
    github: 'https://github.com/example/microservices-platform',
    overview: '這是一個企業級微服務架構平台，基於 Kubernetes 構建，支援自動擴縮容、服務發現、配置管理等功能。平台包含 API Gateway、服務註冊中心、配置中心、監控系統等核心組件，為企業提供完整的微服務解決方案。',
    architecture: '/architecture2.jpg',
    architectureDescription: '採用雲原生架構，Kubernetes 作為容器編排平台，Istio 提供服務網格功能，Prometheus + Grafana 實現監控告警。',
    challenges: [
      {
        title: '服務治理',
        problem: '隨著微服務數量增加，服務間的依賴關係變得複雜，難以管理和監控。',
        solution: '引入 Istio 服務網格，實現流量管理、安全策略、可觀測性的統一管理。'
      }
    ],
    techStack: [
      {
        name: '容器化',
        technologies: ['Kubernetes', 'Docker', 'Helm']
      },
      {
        name: '服務網格',
        technologies: ['Istio', 'Envoy']
      },
      {
        name: '監控',
        technologies: ['Prometheus', 'Grafana', 'Jaeger']
      }
    ],
    stats: [
      { label: '微服務數量', value: '20+' },
      { label: '容器實例', value: '100+' },
      { label: '開發週期', value: '8 個月' },
      { label: '團隊規模', value: '8 人' }
    ],
    timeline: [
      { phase: '架構設計', duration: '4 週' },
      { phase: '基礎設施', duration: '8 週' },
      { phase: '服務開發', duration: '20 週' },
      { phase: '測試上線', duration: '4 週' }
    ],
    learnings: '這個專案讓我深入了解了雲原生技術棧，特別是 Kubernetes 的高級特性和 Istio 服務網格的應用。學會了如何設計可擴展的微服務架構，以及如何實現有效的服務治理和監控。'
  }
}

const project = projects[projectId] || null

// SEO
useHead({
  title: project ? `${project.title} - 作品集` : '專案不存在',
  meta: [
    { name: 'description', content: project ? project.description : '專案不存在' }
  ]
})
</script>
