<template>
  <div class="min-h-screen bg-coffee-50 dark:bg-gray-900 transition-colors">
    <!-- Social Sidebar -->
    <SocialSidebar />

    <!-- Navigation -->
    <nav class="bg-coffee-800 dark:bg-gray-800 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink :to="localePath('/')" class="text-coffee-50 dark:text-white text-xl font-bold">
              Ray Liu
            </NuxtLink>
          </div>
          <div class="hidden md:flex items-center space-x-6">
            <NuxtLink :to="localePath('/')" class="relative text-coffee-100 dark:text-gray-300 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 hover:drop-shadow-lg group">
              {{ $t('nav.home') }}
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-coffee-200 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </NuxtLink>
            <NuxtLink :to="localePath('/portfolio')" class="relative text-coffee-100 dark:text-gray-300 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 hover:drop-shadow-lg group">
              {{ $t('nav.portfolio') }}
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-coffee-200 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </NuxtLink>
            <NuxtLink :to="localePath('/about')" class="relative text-coffee-100 dark:text-gray-300 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 hover:drop-shadow-lg group">
              {{ $t('nav.about') }}
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-coffee-200 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </NuxtLink>
            <NuxtLink to="https://blog.liu-yucheng.com" target="_blank" class="relative text-coffee-100 dark:text-gray-300 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 hover:drop-shadow-lg group flex items-center">
              {{ $t('nav.blog') }}
              <svg class="h-4 w-4 ml-1 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-coffee-200 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </NuxtLink>
            <NuxtLink :to="localePath('/contact')" class="relative text-coffee-100 dark:text-gray-300 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 hover:drop-shadow-lg group">
              {{ $t('nav.contact') }}
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-coffee-200 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </NuxtLink>
            
            <!-- Language switcher -->
            <!-- <div class="relative" ref="languageDropdown">
              <button 
                @click="toggleLanguageDropdown" 
                class="flex items-center space-x-2 bg-coffee-700 dark:bg-gray-700 hover:bg-coffee-600 dark:hover:bg-gray-600 text-coffee-100 dark:text-gray-300 rounded-lg px-3 py-2 text-sm transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-coffee-500 dark:focus:ring-blue-500"
                :title="$t('ui.language')"
              >
                <span class="font-medium">{{ currentLanguage.short }}</span>
                <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': languageDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                v-show="languageDropdownOpen"
                class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-coffee-200 dark:border-gray-600 py-1 z-50 transform transition-all duration-200 origin-top-right"
                :class="languageDropdownOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
              >
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  @click="switchLanguage(lang.code)"
                  class="w-full flex items-center space-x-3 px-4 py-2 text-sm text-coffee-800 dark:text-gray-200 hover:bg-coffee-100 dark:hover:bg-gray-700 transition-colors duration-150"
                  :class="{ 'bg-coffee-50 dark:bg-gray-700': locale === lang.code }"
                >
                  <span class="font-medium">{{ lang.name }}</span>
                  <svg v-if="locale === lang.code" class="w-4 h-4 text-coffee-600 dark:text-blue-400 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div> -->
            <!-- Dark mode toggle button -->
            <button 
              @click="toggleDarkMode" 
              class="p-2 rounded-lg bg-coffee-700 dark:bg-gray-700 text-coffee-100 dark:text-gray-300 hover:bg-coffee-600 dark:hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 hover:rotate-12 hover:shadow-lg"
              :title="isDark ? $t('ui.toggleLightMode') : $t('ui.toggleDarkMode')"
            >
              <!-- Sun icon for light mode -->
              <svg v-if="isDark" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <!-- Moon icon for dark mode -->
              <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
          </div>
          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center space-x-2">
            <!-- Mobile dark mode toggle -->
            <button 
              @click="toggleDarkMode" 
              class="p-2 rounded-lg bg-coffee-700 dark:bg-gray-700 text-coffee-100 dark:text-gray-300"
            >
              <svg v-if="isDark" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-coffee-100 dark:text-gray-300">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <!-- Mobile menu -->
      <div v-show="mobileMenuOpen" class="md:hidden bg-coffee-700 dark:bg-gray-700">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink :to="localePath('/')" @click="mobileMenuOpen = false" class="block px-3 py-2 text-coffee-100 dark:text-gray-300 hover:text-white hover:bg-coffee-600 dark:hover:bg-gray-600 rounded-md transition-all duration-200">{{ $t('nav.home') }}</NuxtLink>
          <NuxtLink :to="localePath('/portfolio')" @click="mobileMenuOpen = false" class="block px-3 py-2 text-coffee-100 dark:text-gray-300 hover:text-white hover:bg-coffee-600 dark:hover:bg-gray-600 rounded-md transition-all duration-200">{{ $t('nav.portfolio') }}</NuxtLink>
          <NuxtLink :to="localePath('/about')" @click="mobileMenuOpen = false" class="block px-3 py-2 text-coffee-100 dark:text-gray-300 hover:text-white hover:bg-coffee-600 dark:hover:bg-gray-600 rounded-md transition-all duration-200">{{ $t('nav.about') }}</NuxtLink>
          <NuxtLink to="https://blog.liu-yucheng.com" target="_blank" @click="mobileMenuOpen = false" class="block px-3 py-2 text-coffee-100 dark:text-gray-300 hover:text-white hover:bg-coffee-600 dark:hover:bg-gray-600 rounded-md transition-all duration-200">{{ $t('nav.blog') }}</NuxtLink>
          <NuxtLink :to="localePath('/contact')" @click="mobileMenuOpen = false" class="block px-3 py-2 text-coffee-100 dark:text-gray-300 hover:text-white hover:bg-coffee-600 dark:hover:bg-gray-600 rounded-md transition-all duration-200">{{ $t('nav.contact') }}</NuxtLink>
          <!-- Mobile language switcher -->
          <!-- <div class="px-3 py-2">
            <div class="text-coffee-200 dark:text-gray-400 text-xs font-medium mb-2">{{ $t('ui.language') }}</div>
            <div class="space-y-1">
              <button
                v-for="lang in languages"
                :key="lang.code"
                @click="switchLanguage(lang.code)"
                class="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-all duration-150"
                :class="locale === lang.code 
                  ? 'bg-coffee-600 dark:bg-gray-600 text-white' 
                  : 'text-coffee-100 dark:text-gray-300 hover:bg-coffee-600 dark:hover:bg-gray-600'"
              >
                <span class="font-medium">{{ lang.name }}</span>
                <svg v-if="locale === lang.code" class="w-4 h-4 text-white ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div> -->
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main ref="mainContent" class="page-enter-active">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-coffee-800 dark:bg-gray-800 text-coffee-100 dark:text-gray-300">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="text-center space-y-2">
          <p>&copy; 2025 Ray Liu {{ $t('footer.copyright') }}</p>
          <div class="flex justify-center space-x-6 text-sm">
            <NuxtLink :to="localePath('/privacy-policy')" class="hover:text-white transition-colors">
              {{ $t('footer.privacyPolicy') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const mobileMenuOpen = ref(false)
const languageDropdownOpen = ref(false)
const languageDropdown = ref(null)
const { isDark, toggleDarkMode } = useDarkMode()
const mainContent = ref(null)

// i18n
const { locale, setLocale } = useI18n()
const localePath = useLocalePath()

// 語言選項
const languages = [
  {
    code: 'zh-tw',
    name: '繁體中文',
    short: '中',
  },
  {
    code: 'en',
    name: 'English',
    short: 'EN',
  }
]

// 當前語言
const currentLanguage = computed(() => {
  return languages.find(lang => lang.code === locale.value) || languages[0]
})

// 切換語言下拉選單
const toggleLanguageDropdown = () => {
  languageDropdownOpen.value = !languageDropdownOpen.value
}

// 語言切換函數
const switchLanguage = (langCode) => {
  setLocale(langCode)
  languageDropdownOpen.value = false
  mobileMenuOpen.value = false
}

// 點擊外部關閉下拉選單
const handleClickOutside = (event) => {
  if (languageDropdown.value && !languageDropdown.value.contains(event.target)) {
    languageDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 監聽路由變化來觸發動畫
const route = useRoute()
watch(() => route.path, () => {
  if (mainContent.value) {
    // 移除動畫 class
    mainContent.value.classList.remove('page-enter-active')
    // 強制重新渲染
    void mainContent.value.offsetHeight
    // 重新添加動畫 class
    mainContent.value.classList.add('page-enter-active')
  }
}, { immediate: false })
</script>
