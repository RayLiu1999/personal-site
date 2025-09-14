<template>
  <div class="fixed right-4 top-1/2 -translate-y-1/2 z-50">
    <div class="flex flex-col items-center space-y-4">
      <a 
        v-for="item in socialLinks" 
        :key="item.name"
        :href="item.url" 
        target="_blank" 
        :title="item.name"
        class="
          w-12 h-12 
          bg-white dark:bg-gray-800 
          hover:bg-coffee-100 dark:hover:bg-gray-700
          shadow-lg 
          rounded-full 
          flex items-center justify-center 
          text-coffee-600 dark:text-gray-300 
          hover:text-coffee-800 dark:hover:text-white
          transition-all duration-300
          transform hover:scale-110
          border border-coffee-100 dark:border-gray-700
        "
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" v-html="item.icon"></svg>
      </a>
    </div>
  </div>
</template>

<script setup>
const socialLinks = [
  {
    name: 'Email',
    url: 'mailto:rayliu219@gmail.com',
    icon: '<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/Rayliu1999',
    icon: '<path d="M12 1.27a11 11 0 00-3.48 21.46c.55.1.73-.24.73-.53v-1.84c-3.03.66-3.67-1.47-3.67-1.47-.5-1.27-1.22-1.61-1.22-1.61-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.56 1.2 3.18.92.1-.72.38-1.2.7-1.48-2.42-.28-4.97-1.2-4.97-5.38 0-1.19.42-2.16 1.12-2.92-.11-.28-.48-1.38.1-2.88 0 0 .91-.29 3 .91a10.5 10.5 0 015.46 0c2.09-1.2 3-.91 3-.91.58 1.5.21 2.6.1 2.88.7.76 1.12 1.73 1.12 2.92 0 4.19-2.55 5.1-4.99 5.38.39.33.73.98.73 1.98v2.91c0 .29.18.63.73.53A11 11 0 0012 1.27z"/>'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/育誠-劉-279634233',
    icon: '<path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-7 6.67h-2.5v7h2.5v-7zm-1.25-1.84a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17 10.33c-1.43 0-2.1.7-2.44 1.32h-.07v-1.15h-2.5v7h2.5v-3.5c0-.93.18-1.83 1.33-1.83s1.16.9 1.16 1.9v3.43h2.5v-4.07c0-2.2-1.18-3.27-2.98-3.27z"/>'
  }
]
</script>
