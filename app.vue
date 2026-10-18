<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Share-card tags need absolute URLs, so build them from the runtime site URL (nuxt.config head is fixed at build time).
const siteUrl = useRuntimeConfig().public.siteUrl
// useI18n isn't auto-imported into app.vue by @nuxtjs/i18n, so read the locale from the i18n plugin instead.
const { locale } = useNuxtApp().$i18n
const route = useRoute()
useHead(() => {
  const image = `${siteUrl}/og/island-${locale.value}.jpg`
  return {
    meta: [
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:url', content: `${siteUrl}${route.path}` },
      { name: 'twitter:image', content: image }
    ]
  }
})
</script>

<style>
.grecaptcha-badge {
  visibility: hidden;
}

/* Page load animation */
.page-enter-active {
  animation: page-fade-in-up 0.6s ease-out;
}

@keyframes page-fade-in-up {
  from {
    opacity: 0;
    transform: translateY(15px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>