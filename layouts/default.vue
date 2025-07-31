<template>
  <div class="min-h-screen bg-coffee-50 dark:bg-gray-900 transition-colors">
    <!-- Navigation -->
    <nav class="bg-coffee-800 dark:bg-gray-800 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-coffee-50 dark:text-white text-xl font-bold">
              Ray Liu
            </NuxtLink>
          </div>
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink to="/" class="text-coffee-100 dark:text-gray-300 hover:text-white transition-colors">
              首頁
            </NuxtLink>
            <NuxtLink to="/portfolio" class="text-coffee-100 dark:text-gray-300 hover:text-white transition-colors">
              作品集
            </NuxtLink>
            <NuxtLink to="/about" class="text-coffee-100 dark:text-gray-300 hover:text-white transition-colors">
              關於我
            </NuxtLink>
            <NuxtLink to="https://blog.liu-yucheng.com" target="_blank" class="text-coffee-100 dark:text-gray-300 hover:text-white transition-colors flex items-center">
              部落格
              <svg class="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </NuxtLink>
            <NuxtLink to="/contact" class="text-coffee-100 dark:text-gray-300 hover:text-white transition-colors">
              聯絡我
            </NuxtLink>
            <!-- Dark mode toggle button -->
            <button 
              @click="toggleDarkMode" 
              class="p-2 rounded-lg bg-coffee-700 dark:bg-gray-700 text-coffee-100 dark:text-gray-300 hover:bg-coffee-600 dark:hover:bg-gray-600 transition-colors"
              :title="isDark ? '切換到亮色模式' : '切換到深色模式'"
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
          <NuxtLink to="/" class="block px-3 py-2 text-coffee-100 dark:text-gray-300 hover:text-white">首頁</NuxtLink>
          <NuxtLink to="/portfolio" class="block px-3 py-2 text-coffee-100 dark:text-gray-300 hover:text-white">作品集</NuxtLink>
          <NuxtLink to="/about" class="block px-3 py-2 text-coffee-100 dark:text-gray-300 hover:text-white">關於我</NuxtLink>
          <NuxtLink to="/contact" class="block px-3 py-2 text-coffee-100 dark:text-gray-300 hover:text-white">聯絡我</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-coffee-800 dark:bg-gray-800 text-coffee-100 dark:text-gray-300">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p>&copy; 2024 Ray Liu 個人網站. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const mobileMenuOpen = ref(false)
const { isDark, toggleDarkMode } = useDarkMode()
</script>
