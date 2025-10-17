// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-31',
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap'
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
        { name: 'description', content: '您好，我是 Ray Liu，一位熱愛技術的後端工程師。這個網站展示我的專業技能與個人作品，歡迎參觀與交流！' },
        { name: 'keywords', content: 'Ray Liu, 後端工程師, back-end developer, software engineer, portfolio, 程式設計, 作品集' },
        { name: 'author', content: 'Ray Liu' },
        // Open Graph (Facebook)
        { property: 'og:title', content: 'Ray Liu 個人網站' },
        { property: 'og:description', content: '您好，我是 Ray Liu，一位熱愛技術的後端工程師。這個網站展示我的專業技能與個人作品，歡迎參觀與交流！' },
        { property: 'og:image', content: '/og-image.png' },
        { property: 'og:url', content: process.env.SITE_URL || 'https://your-domain.com' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Ray Liu 個人網站' },
        { name: 'twitter:description', content: '您好，我是 Ray Liu，一位熱愛技術的後端工程師。這個網站展示我的專業技能與個人作品，歡迎參觀與交流！' },
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
  // Sitemap 配置
  sitemap: {
    siteUrl: process.env.SITE_URL || 'https://your-domain.com',
    exclude: [
      '/admin/**',
      '/api/**'
    ],
    routes: [
      '/',
      '/about',
      '/contact',
      '/portfolio',
      '/portfolio/chat-app-backend',
      '/portfolio/chat-app-frontend', 
      '/portfolio/chess-in-vue',
      '/portfolio/e-commerce-cart',
      '/portfolio/green-fragrance-soap-admin',
      '/portfolio/green-fragrance-soap-backend',
      '/portfolio/green-fragrance-soap-nuxt',
      '/portfolio/n8n-yt-dlp-docker-compose',
      '/portfolio/tomato-clock',
      '/portfolio/youtube-extension',
      '/portfolio/yt-discord-bot'
    ],
    defaults: {
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date()
    }
  } as any,
  runtimeConfig: {
    private: {
      lineChannelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
      lineChannelSecret: process.env.LINE_CHANNEL_SECRET || '',
      lineUserId: process.env.LINE_USER_ID || '',
      recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY || ''
    },
    public: {
      siteUrl: process.env.SITE_URL || 'https://your-domain.com',
      blogUrl: process.env.BLOG_URL || 'https://your-domain.com',
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY || '',
      contactResponseTime: '通常於 24 小時內回覆您的訊息'
    }
  }
});
