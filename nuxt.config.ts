// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-31',
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n'
  ],
  i18n: {
    locales: [
      {
        code: 'zh-tw',
        name: '繁體中文',
        file: 'zh-tw.json'
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.json'
      }
    ],
    langDir: 'locales/',
    defaultLocale: 'zh-tw',
    strategy: 'prefix_except_default'
  },
  imports: {
    autoImport: true
  },
  app: {
    head: {
      title: 'Ray Liu 個人網站',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Ray Liu 作品集與個人簡介' },
        { name: 'keywords', content: 'Ray Liu, 後端工程師, 程式設計, 作品集' },
        { name: 'author', content: 'Ray Liu' },
        // Open Graph (Facebook)
        { property: 'og:title', content: 'Ray Liu 個人網站' },
        { property: 'og:description', content: 'Ray Liu 作品集與個人簡介' },
        { property: 'og:image', content: '/og-image.png' },
        { property: 'og:url', content: 'https://your-domain.com' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Ray Liu 個人網站' },
        { name: 'twitter:description', content: 'Ray Liu 作品集與個人簡介' },
        { name: 'twitter:image', content: '/og-image.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // 字體載入
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
      ]
    }
  },
  runtimeConfig: {
    private: {
      lineChannelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
      lineChannelSecret: process.env.LINE_CHANNEL_SECRET || '',
      lineUserId: process.env.LINE_USER_ID || '',
      recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY || ''
    },
    
    // 公開變數
    public: {
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY || '',
      contactResponseTime: '通常在 24 小時內回覆'
    }
  }
});
