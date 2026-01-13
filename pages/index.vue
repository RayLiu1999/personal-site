<template>
  <div>
    <!-- Hero Section -->
    <section
      class="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-coffee-100/50 to-coffee-200/50 dark:from-gray-800/50 dark:to-gray-700/50 transition-colors overflow-hidden">
      <!-- Decorative blobs -->
      <div
        class="absolute top-20 left-20 w-72 h-72 bg-coffee-300/30 rounded-full mix-blend-multiply filter blur-xl animate-blob dark:bg-blue-500/10">
      </div>
      <div
        class="absolute top-20 right-20 w-72 h-72 bg-coffee-400/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 dark:bg-purple-500/10">
      </div>
      <div
        class="absolute -bottom-8 left-1/2 w-72 h-72 bg-coffee-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 dark:bg-teal-500/10">
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div class="text-center">
          <div class="mb-8 relative inline-block group perspective-1000" @mousemove="handleAvatarMove"
            @mouseleave="resetAvatar" ref="avatarContainer">
            <div
              class="w-40 h-40 rounded-full mx-auto shadow-2xl overflow-hidden transform transition-transform duration-100 ease-out border-4 border-coffee-50 dark:border-gray-700"
              :style="avatarStyle">
              <img src="/avatar.jpg" alt="個人頭像" class="w-full h-full object-cover">
            </div>
            <!-- Glow effect -->
            <div
              class="absolute inset-0 rounded-full bg-coffee-400/20 blur-2xl -z-10 group-hover:bg-coffee-500/30 transition-colors duration-500">
            </div>
          </div>


          <h1 class="text-4xl md:text-7xl font-bold text-coffee-800 dark:text-white mb-6 tracking-tight">
            {{ $t('home.hero.greeting') }} <span class="text-coffee-600 dark:text-blue-400">{{ displayedName
            }}</span><span class="animate-pulse">|</span>
          </h1>

          <p class="text-xl md:text-2xl text-coffee-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up"
            style="animation-delay: 0.5s; animation-fill-mode: forwards;">
            {{ $t('home.hero.intro_part1') }}<span class="font-semibold text-coffee-800 dark:text-blue-300">{{
              $t('home.hero.role') }}</span>{{ $t('home.hero.intro_part2') }}
            <br class="hidden md:block" />
            {{ $t('home.hero.intro_part3') }}<span class="highlight-text">{{ $t('home.hero.intro_highlight1')
            }}</span>{{ $t('home.hero.and1') }}<span class="highlight-text">{{ $t('home.hero.intro_highlight2')
              }}</span>{{ $t('home.hero.and2') }}<span class="highlight-text">{{ $t('home.hero.intro_highlight3')
              }}</span>{{ $t('home.hero.intro_part4') }}
          </p>

          <div class="flex flex-col sm:flex-row gap-6 justify-center opacity-0 animate-fade-in-up"
            style="animation-delay: 1s; animation-fill-mode: forwards;">
            <NuxtLink :to="localePath('/portfolio')"
              class="group relative px-8 py-4 bg-coffee-600 dark:bg-blue-600 text-white rounded-lg font-semibold overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <span
                class="absolute inset-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-500 ease-out -translate-x-full skew-x-12"></span>
              <span class="relative flex items-center justify-center gap-2">
                {{ $t('home.hero.viewPortfolio') }}
                <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3">
                  </path>
                </svg>
              </span>
            </NuxtLink>
            <NuxtLink :to="localePath('/contact')"
              class="group px-8 py-4 border-2 border-coffee-600 dark:border-blue-400 text-coffee-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-coffee-600 dark:hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl">
              {{ $t('home.hero.contactMe') }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator - moved outside content div -->
      <div
        class="absolute bottom-4 left-0 right-0 flex justify-center animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity z-20"
        @click="scrollToContent">
        <svg class="w-8 h-8 text-coffee-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>

    <!-- Latest Blog Posts Section -->
    <section id="content" class="py-24 bg-white dark:bg-gray-800 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 scroll-reveal">
          <h2 class="text-4xl font-bold text-coffee-800 dark:text-white mb-4 relative inline-block">
            {{ $t('home.blog.title') }}
            <span
              class="absolute bottom-0 left-0 w-full h-2 bg-coffee-200/50 dark:bg-blue-500/30 -rotate-1 rounded-full"></span>
          </h2>
          <p class="text-xl text-coffee-600 dark:text-gray-400 mt-4">{{ $t('home.blog.subtitle') }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <a v-for="(post, index) in blogPosts" :key="post.id" :href="post.url" target="_blank"
            class="scroll-reveal bg-coffee-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group transform-gpu isolate"
            :style="{ transitionDelay: `${index * 150}ms` }">
            <div class="relative overflow-hidden aspect-video">
              <img :src="post.cover" :alt="post.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out">
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              </div>
            </div>
            <div class="p-8">
              <div class="flex items-center text-coffee-500 dark:text-gray-400 text-sm mb-4">
                <span class="px-3 py-1 bg-white/50 dark:bg-gray-600 rounded-full backdrop-blur-sm">
                  {{ post.date }}
                </span>
              </div>
              <h3
                class="text-xl font-bold text-coffee-800 dark:text-white mb-3 group-hover:text-coffee-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {{ post.title }}
              </h3>
              <p class="text-coffee-600 dark:text-gray-300 text-sm mb-6 line-clamp-3 leading-relaxed">{{ post.excerpt }}
              </p>
              <div
                class="flex items-center text-coffee-600 dark:text-blue-400 font-bold text-sm group-hover:gap-3 transition-all">
                {{ $t('home.blog.readMore') }}
                <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3">
                  </path>
                </svg>
              </div>
            </div>
          </a>
        </div>
        <div class="text-center mt-16 scroll-reveal">
          <a href="https://blog.liu-yucheng.com" target="_blank"
            class="inline-block px-8 py-3 bg-white dark:bg-gray-800 border-2 border-coffee-200 dark:border-gray-600 text-coffee-700 dark:text-gray-300 rounded-lg font-semibold hover:border-coffee-600 dark:hover:border-blue-500 hover:text-coffee-600 dark:hover:text-blue-500 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl">
            {{ $t('home.blog.visitBlog') }} →
          </a>
        </div>
      </div>
    </section>

    <!-- Recent Projects -->
    <section class="py-24 bg-coffee-50 dark:bg-gray-900 transition-colors relative overflow-hidden">
      <!-- Background Decorations -->
      <div
        class="absolute top-0 right-0 w-64 h-64 bg-white/50 dark:bg-white/5 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2">
      </div>
      <div
        class="absolute bottom-0 left-0 w-96 h-96 bg-coffee-200/50 dark:bg-blue-900/10 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2">
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-16 scroll-reveal">
          <h2 class="text-4xl font-bold text-coffee-800 dark:text-white mb-4">{{ $t('home.projects.title') }}</h2>
          <p class="text-xl text-coffee-600 dark:text-gray-400">{{ $t('home.projects.subtitle') }}</p>
        </div>
        <div class="flex flex-wrap justify-center gap-8">
          <div v-for="(project, index) in featuredProjects" :key="project.id"
            class="scroll-reveal bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.34rem)] flex flex-col group transform-gpu isolate"
            :style="{ transitionDelay: `${index * 150}ms` }">
            <NuxtLink :to="localePath(`/portfolio/${project.id}`)" class="block relative overflow-hidden">
              <img :src="project.image" :alt="project.title"
                class="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110">
              <div class="absolute inset-0 bg-coffee-900/0 group-hover:bg-coffee-900/20 transition-colors duration-300">
              </div>
            </NuxtLink>
            <div class="p-8 flex flex-col flex-grow relative">
              <NuxtLink :to="localePath(`/portfolio/${project.id}`)">
                <h3
                  class="text-xl font-bold text-coffee-800 dark:text-white mb-3 group-hover:text-coffee-600 dark:group-hover:text-blue-400 transition-colors">
                  {{ project.title }}</h3>
              </NuxtLink>
              <p class="text-coffee-600 dark:text-gray-300 mb-6 flex-grow leading-relaxed">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2 mb-6">
                <span v-for="tech in project.technologies" :key="tech"
                  class="px-3 py-1 bg-coffee-50 dark:bg-gray-700 text-coffee-600 dark:text-gray-300 text-xs font-medium rounded-full border border-coffee-100 dark:border-gray-600">
                  {{ tech }}
                </span>
              </div>
              <div
                class="flex justify-between items-center mt-auto pt-6 border-t border-coffee-100 dark:border-gray-700">
                <NuxtLink :to="localePath(`/portfolio/${project.id}`)"
                  class="text-coffee-600 dark:text-blue-400 hover:text-coffee-800 dark:hover:text-blue-300 font-bold flex items-center group/link">
                  {{ $t('home.projects.viewDetails') }}
                  <span class="inline-block transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                </NuxtLink>

                <div class="flex gap-3">
                  <a v-if="project.github" :href="project.github" target="_blank"
                    class="p-2 text-coffee-400 dark:text-gray-500 hover:text-coffee-700 dark:hover:text-white hover:bg-coffee-50 dark:hover:bg-gray-700 rounded-full transition-all"
                    title="GitHub Repository">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </a>
                  <template v-if="project.githubs">
                    <a v-for="(github, index) in project.githubs" :key="index" :href="github" target="_blank"
                      class="p-2 text-coffee-400 dark:text-gray-500 hover:text-coffee-700 dark:hover:text-white hover:bg-coffee-50 dark:hover:bg-gray-700 rounded-full transition-all"
                      :title="`GitHub Repository ${index + 1}`">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </a>
                  </template>
                  <a v-if="project.demo" :href="project.demo" target="_blank"
                    class="p-2 text-coffee-400 dark:text-gray-500 hover:text-coffee-700 dark:hover:text-white hover:bg-coffee-50 dark:hover:bg-gray-700 rounded-full transition-all"
                    title="Live Demo">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-16 scroll-reveal">
          <NuxtLink :to="localePath('/portfolio')"
            class="group relative inline-block px-10 py-4 bg-coffee-600 dark:bg-blue-600 text-white rounded-lg font-bold shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <span
              class="absolute inset-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-500 ease-out -translate-x-full skew-x-12"></span>
            <span class="relative">{{ $t('home.projects.viewAll') }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const blogUrl = useRuntimeConfig().public.blogUrl
const siteUrl = useRuntimeConfig().public.siteUrl
const localePath = useLocalePath()


// Typewriter Effect
const displayedName = ref('')
const nameText = 'Ray Liu'
const typeSpeed = 150
const startDelay = 500

const typeWriter = async () => {
  await new Promise(resolve => setTimeout(resolve, startDelay))
  for (let i = 0; i < nameText.length; i++) {
    displayedName.value += nameText[i]
    await new Promise(resolve => setTimeout(resolve, typeSpeed))
  }
}

// 3D Tilt Effect
const avatarContainer = ref(null)
const avatarStyle = ref({})

const handleAvatarMove = (e) => {
  if (!avatarContainer.value) return
  const { left, top, width, height } = avatarContainer.value.getBoundingClientRect()
  const x = (e.clientX - left - width / 2) / 10 // Max rotation devider
  const y = (e.clientY - top - height / 2) / 10

  avatarStyle.value = {
    transform: `rotateY(${x}deg) rotateX(${-y}deg) scale(1.05)`
  }
}

const resetAvatar = () => {
  avatarStyle.value = {
    transform: 'rotateY(0deg) rotateX(0deg) scale(1)'
  }
}

const scrollToContent = () => {
  const content = document.getElementById('content')
  if (content) {
    content.scrollIntoView({ behavior: 'smooth' })
  }
}

// Scroll Animation
const { observe } = useScrollAnimation()

onMounted(() => {
  typeWriter()

  // Initialize scroll observer
  setTimeout(() => {
    const elements = document.querySelectorAll('.scroll-reveal')
    observe(elements)
  }, 100)
})

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

const { t } = useI18n()

const featuredProjects = computed(() => [
  {
    id: 1,
    title: t('portfolio.items.p1.title'),
    description: t('portfolio.items.p1.description'),
    image: '/project1.png',
    category: t('portfolio.categories.fullstack'),
    year: '2024',
    technologies: ['Vue 3', 'Go', 'WebSocket', 'MongoDB'],
    demo: 'https://chat-app.liu-yucheng.com',
    githubs: ['https://github.com/RayLiu1999/chat_app_frontend', 'https://github.com/RayLiu1999/chat_app_backend'],
  },
])
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }

  33% {
    transform: translate(30px, -50px) scale(1.1);
  }

  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }

  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.highlight-text {
  position: relative;
  display: inline-block;
  cursor: default;
}

.highlight-text::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background-color: rgba(143, 114, 90, 0.2);
  z-index: -1;
  transition: height 0.3s ease;
}

.highlight-text:hover::after {
  height: 100%;
}
</style>
