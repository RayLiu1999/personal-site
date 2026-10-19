<template>
  <IslandPanel :view="view" :title="t('privacy.title')" :sub="t('island.lm.signpost.name')">
    <NuxtLink :to="linkTo(view)" class="mc-btn small back">
      {{ t('island.project.back', { name: t('island.lm.signpost.name') }) }}
    </NuxtLink>
    <p class="lead">{{ t('island.privacy.updated') }}</p>

    <template v-for="section in ['intro', 'collection', 'cookie']" :key="section">
      <h2 class="sec">{{ t(`privacy.${section}.title`) }}</h2>
      <p>{{ t(`privacy.${section}.content`) }}</p>
    </template>

    <h2 class="sec">{{ t('privacy.recaptcha.title') }}</h2>
    <i18n-t keypath="island.privacy.recaptcha" tag="p" scope="global">
      <template #privacy>
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">{{ t('island.privacy.privacyLink') }}</a>
      </template>
      <template #terms>
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">{{ t('island.privacy.termsLink') }}</a>
      </template>
    </i18n-t>

    <h2 class="sec">{{ t('privacy.revision.title') }}</h2>
    <p>{{ t('privacy.revision.content') }}</p>

    <h2 class="sec">{{ t('privacy.contact.title') }}</h2>
    <i18n-t keypath="island.privacy.contact" tag="p" scope="global">
      <template #link>
        <NuxtLink :to="linkTo(view)">{{ t('island.privacy.contactLink') }}</NuxtLink>
      </template>
    </i18n-t>
  </IslandPanel>
</template>

<script setup>
definePageMeta({ layout: 'island', landmark: 'signpost', subpage: true })

const config = useRuntimeConfig()
const { t } = useI18n()
const localePath = useLocalePath()
const { view, linkTo } = useIsland()

useHead(() => ({
  title: `${t('privacy.title')} - Ray Liu`,
  meta: [
    { name: 'description', content: t('privacy.intro.content') },
    { property: 'og:title', content: `${t('privacy.title')} - Ray Liu` },
    { property: 'og:description', content: t('privacy.intro.content') },
    { property: 'og:url', content: `${config.public.siteUrl}${localePath('/privacy-policy')}` }
  ]
}))
</script>
