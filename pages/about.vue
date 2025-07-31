<template>
  <div class="py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-coffee-800 dark:text-white mb-4">關於我</h1>
        <p class="text-coffee-600 dark:text-gray-400">深入了解我的專業背景與技術經驗</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Introduction -->
          <section class="mb-8">
            <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border dark:border-gray-700">
              <div class="flex items-start mb-6">
                <img src="/avatar.jpg" alt="個人照片" class="w-24 h-24 rounded-full mr-6 object-cover">
                <div>
                  <h2 class="text-2xl font-bold text-coffee-800 dark:text-white mb-2">後端工程師</h2>
                  <p class="text-coffee-600 dark:text-gray-300 mb-2">Senior Backend Developer</p>
                  <p class="text-coffee-500 dark:text-gray-400">5+ 年後端開發經驗</p>
                </div>
              </div>
              <div class="prose prose-coffee max-w-none">
                <p class="text-coffee-600 dark:text-gray-300 leading-relaxed mb-4">
                  我是一名專精於後端系統開發的軟體工程師，擁有 5 年以上的實戰經驗。專長於高併發系統架構設計、微服務開發、資料庫優化與 DevOps 實踐。
                </p>
                <p class="text-coffee-600 dark:text-gray-300 leading-relaxed mb-4">
                  在職業生涯中，我參與過多個大型專案的架構設計與開發，包括電商平台、金融系統、數據分析平台等。善於運用現代化的技術棧解決複雜的業務問題，並持續關注新技術的發展趨勢。
                </p>
                <p class="text-coffee-600 dark:text-gray-300 leading-relaxed">
                  我相信技術應該服務於業務，致力於打造高效能、可維護、可擴展的後端系統，為企業創造實際價值。
                </p>
              </div>
            </div>
          </section>

          <!-- Experience -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-coffee-800 dark:text-white mb-6">工作經驗</h2>
            <div class="space-y-6">
              <div v-for="job in experience" :key="job.company" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-coffee-800 dark:text-white">{{ job.position }}</h3>
                    <p class="text-coffee-600 dark:text-gray-300">{{ job.company }}</p>
                  </div>
                  <span class="text-coffee-500 dark:text-gray-400 text-sm">{{ job.period }}</span>
                </div>
                <p class="text-coffee-600 dark:text-gray-300 mb-4">{{ job.description }}</p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="tech in job.technologies" :key="tech" 
                        class="px-3 py-1 bg-coffee-100 dark:bg-gray-700 text-coffee-700 dark:text-gray-300 text-sm rounded-full">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <!-- Education -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-coffee-800 dark:text-white mb-6">教育背景</h2>
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-lg font-semibold text-coffee-800 dark:text-white">資訊工程學系</h3>
                  <p class="text-coffee-600 dark:text-gray-300">國立台灣大學</p>
                </div>
                <span class="text-coffee-500 dark:text-gray-400 text-sm">2015 - 2019</span>
              </div>
              <p class="text-coffee-600 dark:text-gray-300">
                主修軟體工程、資料結構與演算法、資料庫系統設計。在學期間參與多項專案開發，奠定了紮實的程式設計基礎。
              </p>
            </div>
          </section>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Skills -->
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700 mb-6">
            <h3 class="text-lg font-semibold text-coffee-800 dark:text-white mb-4">技術技能</h3>
            <div class="space-y-4">
              <div v-for="skillCategory in skills" :key="skillCategory.category">
                <h4 class="font-medium text-coffee-700 dark:text-gray-300 mb-2">{{ skillCategory.category }}</h4>
                <div class="space-y-2">
                  <div v-for="skill in skillCategory.items" :key="skill.name" class="flex justify-between items-center">
                    <span class="text-coffee-600 dark:text-gray-300 text-sm">{{ skill.name }}</span>
                    <div class="flex">
                      <div v-for="i in 5" :key="i" 
                           :class="[
                             'w-2 h-2 rounded-full mr-1',
                             i <= skill.level ? 'bg-coffee-600 dark:bg-blue-400' : 'bg-coffee-200 dark:bg-gray-600'
                           ]">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Certifications -->
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700 mb-6">
            <h3 class="text-lg font-semibold text-coffee-800 dark:text-white mb-4">專業證照</h3>
            <div class="space-y-3">
              <div v-for="cert in certifications" :key="cert.name" class="flex items-start">
                <div class="w-3 h-3 bg-coffee-600 dark:bg-blue-400 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                <div>
                  <div class="font-medium text-coffee-800 dark:text-white text-sm">{{ cert.name }}</div>
                  <div class="text-coffee-600 dark:text-gray-400 text-xs">{{ cert.issuer }} • {{ cert.year }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Languages -->
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700 mb-6">
            <h3 class="text-lg font-semibold text-coffee-800 dark:text-white mb-4">語言能力</h3>
            <div class="space-y-3">
              <div v-for="lang in languages" :key="lang.name" class="flex justify-between">
                <span class="text-coffee-600 dark:text-gray-300">{{ lang.name }}</span>
                <span class="text-coffee-800 dark:text-white font-medium">{{ lang.level }}</span>
              </div>
            </div>
          </div>

          <!-- Resume Download -->
          <div class="bg-coffee-600 dark:bg-blue-600 p-6 rounded-lg text-center">
            <h3 class="text-lg font-semibold text-white mb-4">下載履歷</h3>
            <a href="/resume.pdf" download class="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-coffee-600 dark:text-white rounded-lg hover:bg-coffee-50 dark:hover:bg-gray-700 transition-colors">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              PDF 履歷
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const experience = [
  {
    company: 'TechCorp 科技公司',
    position: '資深後端工程師',
    period: '2022 - 現在',
    description: '負責公司核心產品的後端架構設計與開發，領導團隊完成多個大型專案，包括微服務架構改造、高併發系統優化等。',
    technologies: ['Node.js', 'Python', 'Kubernetes', 'PostgreSQL', 'Redis', 'AWS']
  },
  {
    company: 'StartupXYZ 新創公司',
    position: '後端工程師',
    period: '2020 - 2022',
    description: '從零開始建構公司的後端系統，包括 API 設計、資料庫架構、部署流程等。參與產品從 MVP 到規模化的完整過程。',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'Docker', 'Jenkins']
  },
  {
    company: 'WebDev 軟體公司',
    position: '初級後端工程師',
    period: '2019 - 2020',
    description: '參與多個客戶專案的開發，累積了豐富的實戰經驗。主要負責 Web API 開發、資料庫設計與系統整合。',
    technologies: ['PHP', 'Laravel', 'MySQL', 'Linux', 'Git']
  }
]

const skills = [
  {
    category: '程式語言',
    items: [
      { name: 'JavaScript/Node.js', level: 5 },
      { name: 'Python', level: 4 },
      { name: 'Java', level: 4 },
      { name: 'Go', level: 3 },
      { name: 'PHP', level: 3 }
    ]
  },
  {
    category: '資料庫',
    items: [
      { name: 'MySQL', level: 5 },
      { name: 'PostgreSQL', level: 4 },
      { name: 'Redis', level: 4 },
      { name: 'MongoDB', level: 3 },
      { name: 'Elasticsearch', level: 3 }
    ]
  },
  {
    category: 'DevOps',
    items: [
      { name: 'Docker', level: 4 },
      { name: 'Kubernetes', level: 4 },
      { name: 'AWS', level: 3 },
      { name: 'Jenkins', level: 3 },
      { name: 'Terraform', level: 2 }
    ]
  }
]

const certifications = [
  {
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    year: '2023'
  },
  {
    name: 'Certified Kubernetes Administrator',
    issuer: 'Cloud Native Computing Foundation',
    year: '2022'
  },
  {
    name: 'Oracle Certified Professional',
    issuer: 'Oracle',
    year: '2021'
  }
]

const languages = [
  { name: '中文', level: '母語' },
  { name: '英文', level: '流利' },
  { name: '日文', level: '基礎' }
]

// SEO
useHead({
  title: '關於我 - 後端工程師個人網站',
  meta: [
    { name: 'description', content: '了解我的專業背景、工作經驗與技術技能' }
  ]
})
</script>
