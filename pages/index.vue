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
            你好，我是<span class="text-coffee-600 dark:text-blue-400">Ray Liu</span>
          </h1>
          <p class="text-xl text-coffee-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            專精於後端系統架構設計、API 開發與資料庫優化，致力於打造高效能、可擴展的解決方案
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

    <!-- Skills Section -->
    <section class="py-16 bg-white dark:bg-gray-800 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-coffee-800 dark:text-white mb-4">技術專長</h2>
          <p class="text-coffee-600 dark:text-gray-400">專精的後端技術與工具</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="skill in skills" :key="skill.name" class="text-center p-6 bg-coffee-50 dark:bg-gray-700 rounded-lg hover:shadow-lg transition-shadow">
            <div class="text-4xl mb-4">{{ skill.icon }}</div>
            <h3 class="text-lg font-semibold text-coffee-800 dark:text-white mb-2">{{ skill.name }}</h3>
            <p class="text-coffee-600 dark:text-gray-300 text-sm">{{ skill.description }}</p>
          </div>
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
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="project in featuredProjects" :key="project.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover">
            <div class="p-6">
              <h3 class="text-xl font-semibold text-coffee-800 dark:text-white mb-2">{{ project.title }}</h3>
              <p class="text-coffee-600 dark:text-gray-300 mb-4">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="tech in project.technologies" :key="tech" class="px-3 py-1 bg-coffee-100 dark:bg-gray-700 text-coffee-700 dark:text-gray-300 text-sm rounded-full">
                  {{ tech }}
                </span>
              </div>
              <NuxtLink :to="`/portfolio/${project.id}`" class="text-coffee-600 dark:text-blue-400 hover:text-coffee-800 dark:hover:text-blue-300 font-semibold">
                查看詳情 →
              </NuxtLink>
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
const skills = [
  {
    name: 'Node.js',
    icon: '🟢',
    description: 'Express.js, Koa.js, NestJS 框架開發'
  },
  {
    name: 'Python',
    icon: '🐍',
    description: 'Django, FastAPI, Flask 後端開發'
  },
  {
    name: 'Database',
    icon: '🗄️',
    description: 'MySQL, PostgreSQL, MongoDB, Redis'
  },
  {
    name: 'DevOps',
    icon: '⚙️',
    description: 'Docker, Kubernetes, CI/CD, AWS'
  }
]

const featuredProjects = [
  {
    id: 1,
    title: 'E-commerce API 系統',
    description: '高併發電商後端系統，支援百萬級用戶同時在線',
    image: '/project1.jpg',
    technologies: ['Node.js', 'Redis', 'MySQL', 'Docker']
  },
  {
    id: 2,
    title: '微服務架構平台',
    description: '基於 Kubernetes 的微服務架構，提升系統可擴展性',
    image: '/project2.jpg',
    technologies: ['Python', 'Kubernetes', 'PostgreSQL', 'RabbitMQ']
  },
  {
    id: 3,
    title: '即時數據分析系統',
    description: '大數據處理與即時分析平台，處理 TB 級數據',
    image: '/project3.jpg',
    technologies: ['Java', 'Kafka', 'Elasticsearch', 'MongoDB']
  }
]
</script>
