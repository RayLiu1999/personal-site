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
          <!-- What we can talk about -->
          <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border dark:border-gray-700">
            <h2 class="text-2xl font-bold text-coffee-800 dark:text-white mb-6">我們可以聊些什麼？</h2>
            <div class="space-y-5">
              <div class="flex items-start">
                <div class="w-12 h-12 bg-coffee-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg class="w-6 h-6 text-coffee-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-coffee-800 dark:text-white">聊聊技術</h3>
                  <p class="text-coffee-600 dark:text-gray-400 text-sm">從後端架構、系統設計到 DevOps，我都樂於交流。</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="w-12 h-12 bg-coffee-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg class="w-6 h-6 text-coffee-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-coffee-800 dark:text-white">有趣的專案</h3>
                  <p class="text-coffee-600 dark:text-gray-400 text-sm">有好點子或需要技術夥伴嗎？我很感興趣！</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="w-12 h-12 bg-coffee-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg class="w-6 h-6 text-coffee-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 3v4a2 2 0 01-2 2H5a2 2 0 01-2-2V3m18 0l-6 6M3 3l6 6m0 0V3m0 6v4a2 2 0 002 2h4a2 2 0 002-2V9"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-coffee-800 dark:text-white">喝杯咖啡</h3>
                  <p class="text-coffee-600 dark:text-gray-400 text-sm">如果你在附近，我們可以約個時間，聊聊任何事。</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Response Time -->
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700 text-center">
            <h3 class="font-semibold text-coffee-800 dark:text-white mb-2">訊息回覆</h3>
            <p class="text-coffee-600 dark:text-gray-400 text-sm">
              通常在 24 小時內回覆。<br>
              如果沒回，可能是我正在專心寫扣或是在探索新的咖啡店！☕️
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

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

// SEO Meta 設定
useHead({
  title: '聯絡我 - Ray Liu | 後端工程師合作洽談',
  meta: [
    {
      name: 'description',
      content: '歡迎與 Ray Liu 討論技術問題、專案合作或工作機會。透過安全的聯絡表單快速聯繫，我會在 24 小時內回覆您的訊息。專業的後端工程師，樂意協助解決技術挑戰。'
    },
    {
      name: 'keywords',
      content: '聯絡 Ray Liu, 技術合作, 專案洽談, 後端工程師聯絡, 工作機會, 技術諮詢'
    },
    // Open Graph
    {
      property: 'og:title',
      content: '聯絡我 - Ray Liu 後端工程師'
    },
    {
      property: 'og:description',
      content: '歡迎與我討論技術問題、專案合作或工作機會，24 小時內快速回覆。'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: `${siteUrl}/contact`
    }
  ]
})
</script>
