<template>
  <div class="py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-coffee-800 dark:text-white mb-4">
          {{ $t('privacy.title') }}
        </h1>
        <p class="text-coffee-600 dark:text-gray-400">
          {{ $t('privacy.lastUpdated') }}{{ $t('ui.punctuation.colon', '：') }}{{ lastUpdated }}
        </p>
      </div>

      <div
        class="prose prose-coffee max-w-none text-coffee-600 dark:text-gray-300 leading-relaxed space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border dark:border-gray-700">
        <h2>{{ $t('privacy.intro.title') }}</h2>
        <p>{{ $t('privacy.intro.content') }}</p>

        <h2>{{ $t('privacy.collection.title') }}</h2>
        <p>{{ $t('privacy.collection.content') }}</p>

        <h2>{{ $t('privacy.cookie.title') }}</h2>
        <p>{{ $t('privacy.cookie.content') }}</p>

        <h2>{{ $t('privacy.recaptcha.title') }}</h2>
        <p v-html="$t('privacy.recaptcha.content')"></p>

        <h2>{{ $t('privacy.revision.title') }}</h2>
        <p>{{ $t('privacy.revision.content') }}</p>

        <h2>{{ $t('privacy.contact.title') }}</h2>
        <p v-html="$t('privacy.contact.content')"></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const { t } = useI18n()
const localePath = useLocalePath()

// Assuming lastUpdated date format might need localization, but for now specific date.
// If multi-lingual date needed, I should split date components or use a different string.
// "2025年9月13日" (Sept 13, 2025). 
// I'll keep it simple or format it if locale changes?
// For now let's manually change if EN:
const locale = useI18n().locale
const lastUpdated = computed(() => {
  return locale.value === 'en' ? 'September 13, 2025' : '2025年9月13日'
})

useHead({
  title: t('privacy.title') + ' - Ray Liu',
  meta: [
    { name: 'description', content: t('privacy.intro.content') }
  ]
})
</script>
