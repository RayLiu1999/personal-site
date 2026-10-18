<template>
  <IslandPanel
    :view="view"
    :title="t('island.lm.library.name')"
    :sub="t('island.lm.library.sub')"
  >
    <IslandLookCta :id="view" />
    <p class="lead">{{ t('island.library.lead') }}</p>
    <ol v-if="blogPosts.length" class="books">
      <li v-for="(post, index) in blogPosts" :key="post.path">
        <a :href="post.url" target="_blank" rel="noopener">
          <span
            class="spine"
            :style="{ '--c': bookColors[index % bookColors.length] }"
            aria-hidden="true"
          ></span>
          <span>
            <time :datetime="post.date">{{ post.date }}</time>
            <b>{{ post.title }}</b>
          </span>
        </a>
      </li>
    </ol>
    <p v-else class="note">{{ t('island.library.empty') }}</p>
    <div class="links">
      <a :href="blogUrl" class="mc-btn" target="_blank" rel="noopener">
        {{ t('island.library.more') }}
      </a>
    </div>
  </IslandPanel>
</template>

<script setup>
definePageMeta({ layout: 'island', landmark: 'library' });

const { t } = useI18n();
const localePath = useLocalePath();
const { view } = useIsland();
const config = useRuntimeConfig();
const blogUrl = config.public.blogUrl;
const siteUrl = config.public.siteUrl;
const bookColors = ['#8b2f2f', '#2f4f8b', '#2f7a3f', '#8b6f2f', '#5a2f7a'];

const { data: blogData, error } = await useFetch('/api/blog', {
  server: true,
  lazy: false,
});

const blogPosts = computed(() => {
  if (error.value || !Array.isArray(blogData.value)) return [];

  return blogData.value
    .filter((post) => post && typeof post.title === 'string' && typeof post.path === 'string' && !Number.isNaN(new Date(post.date).getTime()))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
    .map((post) => ({
      title: post.title,
      path: post.path,
      date: new Date(post.date).toISOString().slice(0, 10),
      url: `${blogUrl}/${post.path}`,
    }));
});

useHead(() => ({
  title: t('island.library.seoTitle'),
  meta: [
    { name: 'description', content: t('island.library.seoDescription') },
    { property: 'og:title', content: t('island.library.seoTitle') },
    { property: 'og:description', content: t('island.library.seoDescription') },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteUrl}${localePath('/blog')}` },
  ],
}));
</script>

