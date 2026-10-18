<template>
  <IslandPanel
    :view="view"
    :title="t('island.lm.signpost.name')"
    :sub="t('island.lm.signpost.sub')"
  >
    <p class="lead">{{ t('contact.header.subtitle') }}</p>
    <form class="form" :aria-busy="isSubmitting" novalidate @submit.prevent="submitForm">
      <div class="field">
        <label for="contact-name">{{ t('contact.form.name') }}</label>
        <input
          id="contact-name"
          v-model="form.name"
          name="name"
          type="text"
          autocomplete="name"
          required
          :placeholder="t('contact.form.namePlaceholder')"
        />
      </div>
      <div class="field">
        <label for="contact-email">{{ t('contact.form.email') }}</label>
        <input
          id="contact-email"
          v-model="form.email"
          name="email"
          type="email"
          autocomplete="email"
          required
          :placeholder="t('contact.form.emailPlaceholder')"
        />
      </div>
      <div class="field">
        <label for="contact-subject">{{ t('contact.form.subject') }}</label>
        <input
          id="contact-subject"
          v-model="form.subject"
          name="subject"
          type="text"
          required
          :placeholder="t('contact.form.subjectPlaceholder')"
        />
      </div>
      <div class="field">
        <label for="contact-message">{{ t('contact.form.message') }}</label>
        <textarea
          id="contact-message"
          v-model="form.message"
          name="message"
          rows="5"
          required
          :placeholder="t('contact.form.messagePlaceholder')"
        ></textarea>
      </div>
      <div>
        <button class="mc-btn" type="submit" :disabled="isSubmitting">
          {{ t(isSubmitting ? 'contact.form.sending' : 'contact.form.submit') }}
        </button>
      </div>
      <p class="form-status" role="status" aria-atomic="true">
        {{ formStatus ? t(formStatus) : '' }}
      </p>
    </form>

    <h2 class="sec">{{ t('island.signpost.direct') }}</h2>
    <ul class="direct">
      <li>
        <span>{{ t('island.signpost.emailLabel') }}</span>
        <code ref="emailText">{{ contactEmail }}</code>
        <button class="mc-btn small" type="button" @click="copyEmail">
          {{ t(`island.signpost.${copyState}`) }}
        </button>
      </li>
      <li>
        <a href="https://github.com/Rayliu1999" target="_blank" rel="noopener">
          {{ t('island.signpost.githubLabel') }}
        </a>
      </li>
      <li>
        <a href="https://linkedin.com/in/育誠-劉-279634233" target="_blank" rel="noopener">
          {{ t('island.signpost.linkedinLabel') }}
        </a>
      </li>
    </ul>
    <p class="note">
      {{ responseTime }}
      <NuxtLink :to="localePath('/privacy-policy')">{{ t('island.signpost.privacy') }}</NuxtLink>
    </p>
  </IslandPanel>
</template>

<script setup>
definePageMeta({ layout: 'island', landmark: 'signpost' })

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl
const siteKey = config.public.recaptchaSiteKey
const { t } = useI18n()
const localePath = useLocalePath()
const { view } = useIsland()

const form = ref({ name: '', email: '', subject: '', message: '' })
const recaptchaToken = ref('')
const recaptchaLoaded = ref(false)
const isSubmitting = ref(false)
const formStatus = ref('')
let successTimer

const submitForm = async (event) => {
  if (isSubmitting.value) return
  clearTimeout(successTimer)

  if (Object.values(form.value).some((value) => !value.trim())) {
    formStatus.value = 'island.signpost.missing'
    return
  }
  if (!event.currentTarget.checkValidity()) {
    formStatus.value = 'island.signpost.invalidEmail'
    return
  }
  if (!recaptchaLoaded.value || typeof window === 'undefined' || !window.grecaptcha) {
    formStatus.value = 'island.signpost.recaptchaRequired'
    return
  }

  isSubmitting.value = true
  formStatus.value = ''

  try {
    // 每次提交都取得新的 reCAPTCHA token。
    recaptchaToken.value = await window.grecaptcha.execute(siteKey, { action: 'contact_form' })
    if (!recaptchaToken.value) {
      formStatus.value = 'island.signpost.recaptchaRequired'
      return
    }

    await $fetch('/api/contact', {
      method: 'POST',
      body: form.value,
      headers: {
        'Content-Type': 'application/json',
        'X-Recaptcha-Token': recaptchaToken.value
      }
    })

    form.value = { name: '', email: '', subject: '', message: '' }
    recaptchaToken.value = ''
    formStatus.value = 'contact.form.success'
    successTimer = setTimeout(() => { formStatus.value = '' }, 5000)
  } catch {
    formStatus.value = 'contact.form.error'
  } finally {
    isSubmitting.value = false
  }
}

const initRecaptcha = () => {
  if (typeof window === 'undefined' || !window.grecaptcha) return

  window.grecaptcha.ready(() => {
    recaptchaLoaded.value = true
    window.grecaptcha.execute(siteKey, { action: 'contact_form' })
      .then((token) => { recaptchaToken.value = token })
      .catch(() => { formStatus.value = 'island.signpost.recaptchaError' })
  })
}

const loadRecaptcha = () => {
  if (typeof window === 'undefined' || recaptchaLoaded.value) return
  if (window.grecaptcha) {
    initRecaptcha()
    return
  }

  const script = document.createElement('script')
  script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
  script.async = true
  script.defer = true
  script.onload = initRecaptcha
  script.onerror = () => { formStatus.value = 'island.signpost.recaptchaError' }
  document.head.appendChild(script)
}

const contactEmail = 'rayliu219@gmail.com'
const emailText = ref(null)
const copyState = ref('copy')
let copyTimer

const copyEmail = async () => {
  clearTimeout(copyTimer)
  try {
    await navigator.clipboard.writeText(contactEmail)
    copyState.value = 'copied'
    copyTimer = setTimeout(() => { copyState.value = 'copy' }, 1500)
  } catch {
    if (emailText.value) {
      const range = document.createRange()
      range.selectNodeContents(emailText.value)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
    }
    copyState.value = 'copyFail'
    copyTimer = setTimeout(() => { copyState.value = 'copy' }, 2200)
  }
}

const responseTime = computed(() => t('contact.sidebar.response.desc').replace(/<br\s*\/?>/gi, ' '))

onMounted(loadRecaptcha)
onBeforeUnmount(() => {
  clearTimeout(successTimer)
  clearTimeout(copyTimer)
})

// SEO Meta 設定
useHead(() => ({
  title: t('island.signpost.seoTitle', { title: t('contact.header.title') }),
  meta: [
    { name: 'description', content: t('contact.header.subtitle') },
    { name: 'keywords', content: t('island.signpost.seoKeywords') },
    { property: 'og:title', content: t('island.signpost.seoOgTitle', { title: t('contact.header.title') }) },
    { property: 'og:description', content: t('contact.header.subtitle') },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteUrl}${localePath('/contact')}` }
  ]
}))
</script>
