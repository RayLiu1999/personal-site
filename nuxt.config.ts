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
      title: '後端工程師個人網站',
      meta: [
        { name: 'description', content: '後端工程師作品集與個人簡介' }
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
