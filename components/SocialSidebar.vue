<template>
  <div class="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:block">
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
          transform hover:scale-110 hover:-translate-x-1
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
    icon: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>'
  }
]
</script>
