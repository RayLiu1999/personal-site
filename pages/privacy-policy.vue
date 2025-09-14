<template>
  <div class="py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-coffee-800 dark:text-white mb-4">
          隱私權政策
        </h1>
        <p class="text-coffee-600 dark:text-gray-400">
          最後更新日期：{{ lastUpdated }}
        </p>
      </div>

      <div class="prose prose-coffee max-w-none text-coffee-600 dark:text-gray-300 leading-relaxed space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border dark:border-gray-700">
        <h2>前言</h2>
        <p>
          歡迎您使用本網站。我們非常重視您的隱私權，因此制定了本隱私權政策，以說明我們如何收集、使用、保護您的個人資訊。
        </p>

        <h2>資訊收集與使用</h2>
        <p>
          當您使用本網站的聯絡表單時，我們會收集您所提供的姓名、電子郵件地址及訊息內容。這些資訊僅用於回覆您的詢問，不會用於任何其他目的。
        </p>

        <h2>Cookie</h2>
        <p>
          本網站可能使用 Cookie 技術，以便提供更個人化的服務。Cookie 是網站伺服器用來和使用者瀏覽器進行溝通的一種技術，它可能在使用者的電腦中儲存某些資訊，但使用者可以經由瀏覽器的設定，取消或限制此項功能。
        </p>

        <h2>Google reCAPTCHA</h2>
        <p>
          本網站為了保護聯絡表單不被垃圾訊息濫用，使用了 Google 提供的 reCAPTCHA v3 服務。這項服務的啟用代表您同意並接受 Google 的
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">隱私權政策</a>
          與
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">服務條款</a>。
          reCAPTCHA 會收集必要的硬體和軟體資訊（例如裝置和應用程式資料）並傳送給 Google 進行分析，以判斷您是否為真人使用者。
        </p>

        <h2>政策修訂</h2>
        <p>
          我們保留隨時修訂本隱私權政策的權利。當我們做出重大修改時，將會在本頁面上公布。
        </p>

        <h2>聯絡我們</h2>
        <p>
          若您對本隱私權政策有任何疑問，歡迎隨時透過<NuxtLink to="/contact" class="text-blue-500 hover:underline">聯絡頁面</NuxtLink>與我聯繫。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const lastUpdated = ref('2025年9月13日');

useHead({
  title: '隱私權政策 - Ray Liu',
  meta: [
    { name: 'description', content: '本網站的隱私權政策，說明我們如何處理您的資料以及 reCAPTCHA 的使用。' }
  ]
})
</script>
