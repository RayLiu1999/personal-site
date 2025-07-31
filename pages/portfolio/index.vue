<template>
  <div class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-coffee-800 dark:text-white mb-4">作品集</h1>
        <p class="text-coffee-600 dark:text-gray-400 max-w-2xl mx-auto">
          展示我在後端開發領域的專案經驗與技術成果
        </p>
      </div>

      <!-- Filter -->
      <div class="mb-8">
        <div class="flex flex-wrap justify-center gap-4">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-6 py-2 rounded-full font-semibold transition-colors',
              selectedCategory === category 
                ? 'bg-coffee-600 dark:bg-blue-600 text-white' 
                : 'bg-coffee-100 dark:bg-gray-700 text-coffee-700 dark:text-gray-300 hover:bg-coffee-200 dark:hover:bg-gray-600'
            ]"
          >
            {{ category }}
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
          <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover">
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
const selectedCategory = ref('全部')

const categories = ['全部', 'Web API', '微服務', '資料庫設計', 'DevOps', '系統架構']

const projects = [
  {
    id: 1,
    title: 'E-commerce API 系統',
    description: '高併發電商後端系統，支援百萬級用戶同時在線，包含完整的訂單、支付、庫存管理功能',
    image: '/project1.jpg',
    category: 'Web API',
    year: '2024',
    technologies: ['Node.js', 'Express.js', 'Redis', 'MySQL', 'Docker', 'JWT'],
    github: 'https://github.com/example/ecommerce-api',
    demo: 'https://api.example.com'
  },
  {
    id: 2,
    title: '微服務架構平台',
    description: '基於 Kubernetes 的微服務架構，提升系統可擴展性，支援自動擴縮容與服務發現',
    image: '/project2.jpg',
    category: '微服務',
    year: '2024',
    technologies: ['Python', 'FastAPI', 'Kubernetes', 'PostgreSQL', 'RabbitMQ', 'Prometheus'],
    github: 'https://github.com/example/microservices-platform'
  },
  {
    id: 3,
    title: '即時數據分析系統',
    description: '大數據處理與即時分析平台，處理 TB 級數據，提供即時報表與預警功能',
    image: '/project3.jpg',
    category: '系統架構',
    year: '2023',
    technologies: ['Java', 'Spring Boot', 'Kafka', 'Elasticsearch', 'MongoDB', 'Grafana'],
    github: 'https://github.com/example/realtime-analytics'
  },
  {
    id: 4,
    title: '分散式快取系統',
    description: '高效能分散式快取解決方案，支援多種快取策略與自動故障轉移',
    image: '/project4.jpg',
    category: '系統架構',
    year: '2023',
    technologies: ['Go', 'Redis Cluster', 'Consul', 'Docker Swarm'],
    github: 'https://github.com/example/distributed-cache'
  },
  {
    id: 5,
    title: 'CI/CD 自動化平台',
    description: '企業級 CI/CD 平台，支援多種程式語言與部署環境，提升開發效率',
    image: '/project5.jpg',
    category: 'DevOps',
    year: '2023',
    technologies: ['Jenkins', 'GitLab CI', 'Ansible', 'Terraform', 'AWS', 'Helm'],
    github: 'https://github.com/example/cicd-platform'
  },
  {
    id: 6,
    title: '金融交易系統',
    description: '高頻交易後端系統，毫秒級響應時間，確保交易安全與資料一致性',
    image: '/project6.jpg',
    category: 'Web API',
    year: '2022',
    technologies: ['C++', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Nginx'],
    github: 'https://github.com/example/trading-system'
  }
]

const filteredProjects = computed(() => {
  if (selectedCategory.value === '全部') {
    return projects
  }
  return projects.filter(project => project.category === selectedCategory.value)
})
</script>
