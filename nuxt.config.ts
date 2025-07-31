// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-31',
  modules: [
    '@nuxtjs/tailwindcss'
  ],
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
  }
});
