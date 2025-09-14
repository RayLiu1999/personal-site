<template>
  <div class="py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-coffee-800 dark:text-white mb-4">聯絡我</h1>
        <p class="text-coffee-600 dark:text-gray-400">歡迎與我討論技術問題或合作機會</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Contact Form -->
        <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border dark:border-gray-700">
          <h2 class="text-2xl font-bold text-coffee-800 dark:text-white mb-6">發送訊息</h2>
          <form @submit.prevent="submitForm" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-coffee-700 dark:text-gray-300 mb-2">姓名</label>
              <input type="text" id="name" v-model="form.name" required
                class="w-full px-4 py-3 border border-coffee-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-coffee-800 dark:text-white rounded-lg focus:ring-2 focus:ring-coffee-500 dark:focus:ring-blue-500 focus:border-transparent"
                placeholder="請輸入您的姓名">
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-coffee-700 dark:text-gray-300 mb-2">電子郵件</label>
              <input type="email" id="email" v-model="form.email" required
                class="w-full px-4 py-3 border border-coffee-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-coffee-800 dark:text-white rounded-lg focus:ring-2 focus:ring-coffee-500 dark:focus:ring-blue-500 focus:border-transparent"
                placeholder="請輸入您的電子郵件">
            </div>

            <div>
              <label for="subject" class="block text-sm font-medium text-coffee-700 dark:text-gray-300 mb-2">主旨</label>
              <input type="text" id="subject" v-model="form.subject" required
                class="w-full px-4 py-3 border border-coffee-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-coffee-800 dark:text-white rounded-lg focus:ring-2 focus:ring-coffee-500 dark:focus:ring-blue-500 focus:border-transparent"
                placeholder="請輸入訊息主旨">
            </div>

            <div>
              <label for="message"
                class="block text-sm font-medium text-coffee-700 dark:text-gray-300 mb-2">訊息內容</label>
              <textarea id="message" v-model="form.message" required rows="6"
                class="w-full px-4 py-3 border border-coffee-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-coffee-800 dark:text-white rounded-lg focus:ring-2 focus:ring-coffee-500 dark:focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="請輸入您想說的話..."></textarea>
            </div>

            <button type="submit" :disabled="isSubmitting"
              class="w-full bg-coffee-600 hover:bg-coffee-700 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-coffee-400 dark:disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              <span v-if="!isSubmitting">發送訊息</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                發送中...
              </span>
            </button>
          </form>

          <!-- Success Message -->
          <div v-if="showSuccess"
            class="mt-6 p-4 bg-green-100 dark:bg-green-800 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-200 rounded-lg">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
              </svg>
              訊息已成功發送！我會盡快回覆您。
            </div>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="space-y-6">
          <!-- Contact Methods -->
          <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border dark:border-gray-700">
            <h2 class="text-2xl font-bold text-coffee-800 dark:text-white mb-6">聯絡方式</h2>
            <div class="space-y-4">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-coffee-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                  <svg class="w-6 h-6 text-coffee-600 dark:text-blue-400" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                    </path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-coffee-800 dark:text-white">電子郵件</h3>
                  <a href="mailto:rayliu219@gmail.com"
                    class="text-coffee-600 dark:text-gray-300 hover:text-coffee-800 dark:hover:text-white">
                    rayliu219@gmail.com
                  </a>
                </div>
              </div>

              <div class="flex items-center">
                <div class="w-12 h-12 bg-coffee-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                  <svg class="w-6 h-6 text-coffee-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-coffee-800 dark:text-white">GitHub</h3>
                  <a href="https://github.com/Rayliu1999" target="_blank"
                    class="text-coffee-600 dark:text-gray-300 hover:text-coffee-800 dark:hover:text-white">
                    github.com/Rayliu1999
                  </a>
                </div>
              </div>

              <div class="flex items-center">
                <div class="w-12 h-12 bg-coffee-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                  <svg class="w-6 h-6 text-coffee-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84">
                    </path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-coffee-800 dark:text-white">LinkedIn</h3>
                  <a href="https://linkedin.com/in/育誠-劉-279634233" target="_blank"
                    class="text-coffee-600 dark:text-gray-300 hover:text-coffee-800 dark:hover:text-white">
                    linkedin.com/in/育誠-劉-279634233
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Availability -->
          <div class="bg-coffee-50 dark:bg-gray-900 p-8 rounded-lg border dark:border-gray-700">
            <h2 class="text-2xl font-bold text-coffee-800 dark:text-white mb-4">合作機會</h2>
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="w-2 h-2 bg-coffee-600 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <h3 class="font-semibold text-coffee-800 dark:text-white">技術諮詢</h3>
                  <p class="text-coffee-600 dark:text-gray-400 text-sm">後端架構設計、系統優化建議</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="w-2 h-2 bg-coffee-600 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <h3 class="font-semibold text-coffee-800 dark:text-white">專案合作</h3>
                  <p class="text-coffee-600 dark:text-gray-400 text-sm">全職或兼職專案開發</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="w-2 h-2 bg-coffee-600 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <h3 class="font-semibold text-coffee-800 dark:text-white">技術分享</h3>
                  <p class="text-coffee-600 dark:text-gray-400 text-sm">演講、工作坊、技術文章</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Response Time -->
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700 text-center">
            <div class="text-coffee-600 dark:text-blue-400 mb-2">
              <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="font-semibold text-coffee-800 dark:text-white mb-1">回覆時間</h3>
            <p class="text-coffee-600 dark:text-gray-400 text-sm">通常在 24 小時內回覆</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// reCAPTCHA 狀態
const recaptchaToken = ref('')
const recaptchaLoaded = ref(false)

// 表單提交狀態
const isSubmitting = ref(false)
const showSuccess = ref(false)

const submitForm = async () => {
  // 檢查 reCAPTCHA
  if (!recaptchaToken.value) {
    alert('請完成 reCAPTCHA 驗證')
    return
  }

  isSubmitting.value = true

  try {
    // 重新獲取 reCAPTCHA token
    if (typeof window !== 'undefined' && window.grecaptcha) {
      const config = useRuntimeConfig()
      const siteKey = config.public.recaptchaSiteKey
      
      const token = await window.grecaptcha.execute(siteKey, { action: 'contact_form' })
      recaptchaToken.value = token
      if (token) {
        console.log('reCAPTCHA token for submission:', token.substring(0, 20) + '...')
      } else {
        console.error('reCAPTCHA returned null token for submission')
      }
    }

    await $fetch('/api/contact', {
      method: 'POST',
      body: form.value,
      headers: {
        'Content-Type': 'application/json',
        'X-Recaptcha-Token': recaptchaToken.value
      }
    })

    // 重置表單
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }

    // 清除 reCAPTCHA token
    recaptchaToken.value = ''

    // 顯示成功訊息
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)

  } catch (error) {
    console.error('發送失敗:', error)
  } finally {
    isSubmitting.value = false
  }
}

// 載入 reCAPTCHA
const loadRecaptcha = () => {
  if (typeof window !== 'undefined' && !recaptchaLoaded.value) {
    const config = useRuntimeConfig()
    const siteKey = config.public.recaptchaSiteKey

    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.defer = true
    script.onload = () => {
      recaptchaLoaded.value = true
      initRecaptcha()
    }
    script.onerror = (error) => {
      console.error('Failed to load reCAPTCHA script:', error)
    }
    document.head.appendChild(script)
  }
}

// 初始化 reCAPTCHA
const initRecaptcha = () => {
  if (typeof window !== 'undefined' && window.grecaptcha) {
    const config = useRuntimeConfig()
    const siteKey = config.public.recaptchaSiteKey

    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(siteKey, { action: 'contact_form' })
        .then(token => {
          recaptchaToken.value = token
        })
        .catch(error => {
          console.error('reCAPTCHA execute error:', error)
        })
    })
  } else {
    console.error('grecaptcha not available')
  }
}

onMounted(() => {
  // 載入 reCAPTCHA
  loadRecaptcha()
})

// SEO
useHead({
  title: '聯絡我 - 後端工程師個人網站',
  meta: [
    { name: 'description', content: '歡迎與我討論技術問題或合作機會' }
  ]
})
</script>
