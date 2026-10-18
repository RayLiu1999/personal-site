<template>
  <IslandPanel
    :view="view"
    :title="machine ? t(`island.mc.${machine}`) : t('island.lm.factory.name')"
    :sub="machine ? `${t('island.lm.factory.name')} · ${t('island.lm.factory.sub')}` : t('island.lm.factory.sub')"
    :icon="machineProjects[0]?.image"
  >
    <NuxtLink
      v-if="machine"
      :to="localePath('/portfolio')"
      class="mc-btn small back"
    >
      {{ t('island.machine.back') }}
    </NuxtLink>
    <IslandLookCta :id="view" />

    <template v-if="machine">
      <p class="how">
        <b>{{ t('island.machine.how') }}</b>
        {{ t(`island.metaphor.${machine}`) }}
      </p>

      <article v-for="project in machineProjects" :key="project.id" class="proj">
        <div class="proj-head">
          <img :src="project.image" alt="" />
          <div>
            <h3>{{ projectTitle(project) }}</h3>
            <p class="meta">{{ projectCategory(project) }} · {{ project.year }}</p>
          </div>
        </div>
        <p>{{ t(`portfolio.items.p${project.id}.description`) }}</p>
        <div class="chips">
          <span v-for="technology in project.technologies" :key="technology" class="chip">
            {{ technology }}
          </span>
        </div>
        <div class="links">
          <a
            v-if="project.demo"
            :href="project.demo"
            class="mc-btn small"
            target="_blank"
            rel="noopener"
          >
            {{ t('island.factory.demo') }}
          </a>
          <a
            v-if="project.github"
            :href="project.github"
            class="mc-btn small"
            target="_blank"
            rel="noopener"
          >
            {{ t('island.factory.github') }}
          </a>
          <a
            v-for="repository in project.githubs"
            :key="repository.url"
            :href="repository.url"
            class="mc-btn small"
            target="_blank"
            rel="noopener"
          >
            {{ t('island.factory.github') }} · {{ t(`island.factory.${repository.label}`) }}
          </a>
          <NuxtLink :to="localePath(`/portfolio/${project.id}`)" class="mc-btn small">
            {{ t('island.factory.detail') }}
          </NuxtLink>
        </div>
      </article>
    </template>

    <template v-else>
      <p class="lead">{{ t('island.factory.lead') }}</p>
      <h2 class="sec">
        {{ t('island.factory.flag') }}
        <small v-if="!flat">{{ t('island.factory.flagHint') }}</small>
      </h2>
      <div class="flag-list">
        <NuxtLink
          v-for="flagship in machines"
          :key="flagship.id"
          :to="{ path: localePath('/portfolio'), query: { m: flagship.id } }"
          class="flag"
        >
          <img :src="flagship.projects[0].image" alt="" />
          <span class="t">
            <b>{{ t(`island.mc.${flagship.id}`) }}</b>
            <small>{{ flagship.projects.map(projectTitle).join(' ＋ ') }}</small>
          </span>
          <span class="go" aria-hidden="true">›</span>
        </NuxtLink>
      </div>

      <h2 class="sec">
        {{ t('island.factory.inv') }}
        <small>{{ inventory.length }}</small>
      </h2>
      <div class="inv">
        <NuxtLink
          v-for="project in inventory"
          :key="project.id"
          :to="localePath(`/portfolio/${project.id}`)"
          :aria-label="`${projectTitle(project)} · ${projectCategory(project)}`"
          class="slot"
          @pointerenter="hoveredProject = project"
          @pointerleave="hoveredProject = null"
          @focus="focusedProject = project"
          @blur="focusedProject = null"
        >
          <img :src="project.image" alt="" />
        </NuxtLink>
      </div>
      <p class="readout" aria-live="polite">
        <template v-if="activeProject">
          <b>{{ projectTitle(activeProject) }}</b>
          <small>{{ projectCategory(activeProject) }}</small>
        </template>
        <template v-else>{{ t('island.factory.readout') }}</template>
      </p>
    </template>
  </IslandPanel>
</template>

<script setup>
import { INVENTORY_IDS, projectById } from '~/data/projects';
import { MACHINE_IDS, MACHINE_PROJECTS, isMachineId } from '~/composables/useIsland';

definePageMeta({ layout: 'island', landmark: 'factory' });

const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl;
const { t } = useI18n();
const localePath = useLocalePath();
const { view, flat } = useIsland();

const machine = computed(() => isMachineId(view.value) ? view.value : null);
const projectsForMachine = (id) => MACHINE_PROJECTS[id].map(projectById);
const machines = MACHINE_IDS.map((id) => ({ id, projects: projectsForMachine(id) }));
const machineProjects = computed(() => machine.value ? projectsForMachine(machine.value) : []);
const inventory = INVENTORY_IDS.map(projectById);
const projectTitle = (project) => t(`portfolio.items.p${project.id}.title`);
const projectCategory = (project) => t(`portfolio.categories.${project.category}`);

const hoveredProject = ref(null);
const focusedProject = ref(null);
const activeProject = computed(() => hoveredProject.value || focusedProject.value);

// SEO Meta 設定
useHead(() => ({
  title: t('island.factory.seoTitle', { title: t('portfolio.title') }),
  meta: [
    { name: 'description', content: t('portfolio.subtitle') },
    { name: 'keywords', content: t('island.factory.seoKeywords') },
    { property: 'og:title', content: t('island.factory.seoOgTitle', { title: t('portfolio.title') }) },
    { property: 'og:description', content: t('portfolio.subtitle') },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteUrl}${localePath('/portfolio')}` },
  ],
}));
</script>
