<template>
  <div class="py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="project">
        <!-- Back Button -->
        <div class="mb-8">
          <NuxtLink
            :to="localePath('/portfolio')"
            class="inline-flex items-center text-coffee-600 dark:text-blue-400 hover:text-coffee-800 dark:hover:text-blue-300"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            {{ $t("portfolio.project.backToPortfolio") }}
          </NuxtLink>
        </div>

        <!-- Project Header -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <span
              class="px-4 py-2 bg-coffee-100 dark:bg-gray-700 text-coffee-700 dark:text-gray-300 rounded-full"
              >{{ project.category }}</span
            >
            <span class="text-coffee-500 dark:text-gray-400">{{
              project.year
            }}</span>
          </div>
          <h1 class="text-4xl font-bold text-coffee-800 dark:text-white mb-4">
            {{ project.title }}
          </h1>
          <p class="text-xl text-coffee-600 dark:text-gray-300 mb-6">
            {{ project.description }}
          </p>

          <!-- Links -->
          <div class="flex flex-wrap gap-4">
            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              class="inline-flex items-center justify-center px-6 py-3 bg-coffee-800 dark:bg-blue-600 text-white rounded-lg hover:bg-coffee-900 dark:hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              {{ $t("portfolio.project.githubSource") }}
            </a>
            <template v-if="project.githubs">
              <a
                v-for="(github, index) in project.githubs"
                :key="index"
                :href="github.url"
                target="_blank"
                class="relative group inline-flex items-center justify-center px-6 py-3 bg-coffee-800 dark:bg-blue-600 text-white rounded-lg hover:bg-coffee-900 dark:hover:bg-blue-700 transition-colors w-full sm:w-auto"
                :title="github.name"
              >
                <svg
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                {{ github.name }}
              </a>
            </template>
            <a
              v-if="project.demo"
              :href="project.demo"
              target="_blank"
              class="inline-flex items-center justify-center px-6 py-3 border-2 border-coffee-600 dark:border-blue-400 text-coffee-600 dark:text-blue-400 rounded-lg hover:bg-coffee-600 dark:hover:bg-blue-600 hover:text-white transition-colors w-full sm:w-auto"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
              {{ $t("portfolio.project.liveDemo") }}
            </a>
          </div>
        </div>

        <!-- Project Image -->
        <div class="mb-8">
          <img
            :src="project.image"
            :alt="project.title"
            class="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg cursor-pointer"
            @click="openLightbox(project.image)"
          />
        </div>

        <!-- Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Project Overview -->
            <section class="mb-8">
              <h2
                class="text-2xl font-bold text-coffee-800 dark:text-white mb-4"
              >
                {{ $t("portfolio.project.overview") }}
              </h2>
              <div class="prose prose-coffee max-w-none">
                <p class="text-coffee-600 dark:text-gray-300 leading-relaxed">
                  {{ project.overview }}
                </p>
              </div>
            </section>

            <!-- Technical Challenges -->
            <section class="mb-8">
              <h2
                class="text-2xl font-bold text-coffee-800 dark:text-white mb-4"
              >
                {{ $t("portfolio.project.challenges") }}
              </h2>
              <div class="space-y-4">
                <div
                  v-for="challenge in project.challenges"
                  :key="challenge.title"
                  class="bg-coffee-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700"
                >
                  <h3
                    class="text-lg font-semibold text-coffee-800 dark:text-white mb-2"
                  >
                    {{ challenge.title }}
                  </h3>
                  <p class="text-coffee-600 dark:text-gray-300 mb-3">
                    {{ challenge.problem }}
                  </p>
                  <div class="text-coffee-700 dark:text-gray-300">
                    <strong class="block mb-2">{{
                      $t("portfolio.project.solutionLabel")
                    }}</strong>
                    <div
                      v-html="challenge.solution"
                      class="solution-content prose prose-coffee dark:prose-invert max-w-none"
                    ></div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Architecture -->
            <section
              v-if="project.architecture || project.mermaid"
              class="mb-8"
            >
              <h2
                class="text-2xl font-bold text-coffee-800 dark:text-white mb-4"
              >
                {{ $t("portfolio.project.architecture") }}
              </h2>
              <div
                class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700"
              >
                <ClientOnly v-if="project.mermaid">
                  <MermaidDiagram :code="project.mermaid" />
                </ClientOnly>
                <img
                  v-else-if="project.architecture"
                  :src="project.architecture"
                  alt="系統架構圖"
                  class="w-full rounded-lg cursor-pointer"
                  @click="openLightbox(project.architecture)"
                />
                <p class="text-coffee-600 dark:text-gray-300 mt-4">
                  {{ project.architectureDescription }}
                </p>
              </div>
            </section>

            <!-- Learnings -->
            <section class="mb-8">
              <h2
                class="text-2xl font-bold text-coffee-800 dark:text-white mb-4"
              >
                {{ $t("portfolio.project.learnings") }}
              </h2>
              <div
                class="bg-coffee-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700"
              >
                <p class="text-coffee-600 dark:text-gray-300 leading-relaxed">
                  {{ project.learnings }}
                </p>
              </div>
            </section>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <!-- Tech Stack -->
            <div
              class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700 mb-6"
            >
              <h3
                class="text-lg font-semibold text-coffee-800 dark:text-white mb-4"
              >
                {{ $t("portfolio.project.techStack") }}
              </h3>
              <div class="space-y-3">
                <div v-for="category in project.techStack" :key="category.name">
                  <h4
                    class="font-medium text-coffee-700 dark:text-gray-300 mb-2"
                  >
                    {{ category.name }}
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tech in category.technologies"
                      :key="tech"
                      class="px-3 py-1 bg-coffee-100 dark:bg-gray-700 text-coffee-700 dark:text-gray-300 text-sm rounded-full"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Lightbox -->
        <div
          v-if="isLightboxOpen"
          class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          @click="closeLightbox"
        >
          <img
            :src="lightboxImage"
            alt="Zoomed Image"
            class="max-w-full max-h-full object-contain"
            @click.stop
          />
          <button
            @click="closeLightbox"
            class="absolute top-4 right-4 text-white text-3xl"
          >
            &times;
          </button>
        </div>
      </div>

      <div v-else class="text-center py-16">
        <h1 class="text-2xl font-bold text-coffee-800 dark:text-white">
          {{ $t("portfolio.project.notFound") }}
        </h1>
        <NuxtLink
          :to="localePath('/portfolio')"
          class="text-coffee-600 dark:text-blue-400 hover:text-coffee-800 dark:hover:text-blue-300 mt-4 inline-block"
        >
          {{ $t("portfolio.project.backToPortfolio") }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isLightboxOpen = ref(false);
const lightboxImage = ref("");

const openLightbox = (image) => {
  lightboxImage.value = image;
  isLightboxOpen.value = true;
};

const closeLightbox = () => {
  isLightboxOpen.value = false;
};

const route = useRoute();
const projectId = parseInt(route.params.id);
const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl;
const { t, tm } = useI18n();
const localePath = useLocalePath();

// Construct project data from i18n
const project = computed(() => {
  const key = `portfolio.items.p${projectId}`;

  // Hardcoded check for valid ID range based on known projects
  if (projectId < 1 || projectId > 18) return null;

  try {
    const title = t(`${key}.title`);
    // If title equals the key, it means translation missing
    if (title === `${key}.title`) return null;

    // Static Data Map with challenges count and techStack structure
    const staticData = {
      1: {
        image: "/logos/project1.png",
        year: "2024",
        demo: "https://chat-app.liu-yucheng.com",
        githubs: [
          {
            key: "frontend",
            url: "https://github.com/RayLiu1999/chat_app_frontend",
          },
          {
            key: "backend",
            url: "https://github.com/RayLiu1999/chat_app_backend",
          },
        ],
        categoryKey: "fullstack",
        challengesCount: 5,
        mermaid: `graph TD
  Client[Browser / SPA] -->|HTTP / WebSocket| LB[K3s Service / Ingress]
  LB --> PodA[chat-app Pod A]
  LB --> PodB[chat-app Pod B]
  LB --> PodC[chat-app Pod C]
  PodA <-->|Publish / Subscribe| Redis[(Redis Pub/Sub + Cache)]
  PodB <-->|Publish / Subscribe| Redis
  PodC <-->|Publish / Subscribe| Redis
  PodA --> Mongo[(MongoDB)]
  PodB --> Mongo
  PodC --> Mongo
  PodA --> Files[(Uploads / Object Storage Provider)]
  PodB --> Files
  PodC --> Files
  Argo[ArgoCD + Kustomize] --> LB
  HPA[HPA 2-10 Pods] --> PodA
  HPA --> PodB
  HPA --> PodC`,
        techStack: [
          {
            nameKey: "frontend",
            technologies: [
              "Vue 3",
              "TypeScript",
              "Element Plus",
              "Pinia",
              "UnoCSS",
            ],
          },
          {
            nameKey: "backend",
            technologies: [
              "Go 1.25",
              "Gin",
              "gorilla/websocket",
              "JWT",
              "Redis Pub/Sub",
            ],
          },
          { nameKey: "database", technologies: ["MongoDB", "Redis"] },
          {
            nameKey: "container_orchestration",
            technologies: ["K3s", "HPA", "Kustomize", "ArgoCD"],
          },
          {
            nameKey: "monitoring",
            technologies: ["Prometheus", "pprof", "k6"],
          },
        ],
      },
      2: {
        image: "/logos/project3.png",
        year: "2025",
        demo: "https://gf-soap.com",
        architecture: "/archs/project3-sa.png",
        categoryKey: "fullstack",
        challengesCount: 3,
        techStack: [
          {
            nameKey: "client_side",
            technologies: ["Nuxt 3", "Tailwind CSS", "TypeScript"],
          },
          {
            nameKey: "backend",
            technologies: [
              "Node.js (ESM)",
              "Express",
              "Drizzle ORM",
              "PostgreSQL",
              "MinIO (S3)",
            ],
          },
          {
            nameKey: "deployment_management",
            technologies: [
              "Kubernetes (k3s)",
              "ArgoCD (GitOps)",
              "GitHub Actions",
            ],
          },
          { nameKey: "monitoring", technologies: ["Prometheus", "Grafana"] },
        ],
      },
      3: {
        image: "/logos/project2.png",
        year: "2024",
        demo: "https://chess.liu-yucheng.com",
        github: "https://github.com/RayLiu1999/chess-in-vue",
        architecture: "/archs/project2-sa.png",
        categoryKey: "frontend",
        challengesCount: 2,
        techStack: [
          {
            nameKey: "frontend_framework",
            technologies: ["Vue 3", "Vuex 4", "Vite"],
          },
          { nameKey: "ai_engine", technologies: ["Stockfish.js"] },
          { nameKey: "deployment", technologies: ["Docker"] },
        ],
      },
      4: {
        image: "/logos/project4.png",
        year: "2025",
        github: "https://github.com/RayLiu1999/youtube-extension",
        architecture: "/archs/project4-sa.png",
        categoryKey: "extension",
        challengesCount: 2,
        techStack: [
          {
            nameKey: "extension",
            technologies: ["JavaScript", "Chrome Extension API"],
          },
          {
            nameKey: "workflow",
            technologies: ["n8n", "yt-dlp", "Docker Compose"],
          },
          { nameKey: "ai_service", technologies: ["Webhook"] },
        ],
      },
      5: {
        image: "/logos/project7.png",
        year: "2023",
        github: "https://github.com/RayLiu1999/yt_discord_bot",
        architecture: "/archs/project7-sa.png",
        categoryKey: "discord_bot",
        challengesCount: 3,
        techStack: [
          {
            nameKey: "core_tech",
            technologies: [
              "Node.js",
              "Discord.js v14",
              "JavaScript (ES Modules)",
            ],
          },
          {
            nameKey: "crawler_tech",
            technologies: ["node-fetch", "Cheerio", "Puppeteer"],
          },
          { nameKey: "database", technologies: ["MongoDB", "Mongoose"] },
          { nameKey: "deployment_management", technologies: ["PM2", "Docker"] },
        ],
      },
      6: {
        image: "/logos/project5.png",
        year: "2022",
        github: "https://github.com/RayLiu1999/e-commerce-cart",
        demo: "https://e-commerce-cart.liu-yucheng.com",
        architecture: "/archs/project5-sa.png",
        categoryKey: "php",
        challengesCount: 2,
        techStack: [
          { nameKey: "backend", technologies: ["PHP", "MySQL"] },
          { nameKey: "tools", technologies: ["Composer", "Apache"] },
        ],
      },
      7: {
        image: "/logos/project6.png",
        year: "2022",
        github: "https://github.com/RayLiu1999/tomato-clock",
        demo: "https://pomodoro.liu-yucheng.com",
        architecture: "/archs/project6-sa.png",
        categoryKey: "php",
        challengesCount: 2,
        techStack: [
          { nameKey: "backend", technologies: ["PHP", "MySQL"] },
          {
            nameKey: "dev_tools",
            technologies: ["JavaScript", "Gulp", "Prepros"],
          },
        ],
      },
      8: {
        image: "/logos/project8.png",
        year: "2026",
        categoryKey: "mobile",
        challengesCount: 3,
        mermaid: `graph TD\n  subgraph Client [Flutter App]\n    UI[Riverpod UI] --> Player[just_audio / video_player]\n    UI --> DB[(Drift SQLite)]\n    UI --> API_Client[Dio HTTP]\n  end\n  subgraph Server [FastAPI Backend]\n    API_Client -->|REST API| API_Server[FastAPI]\n    API_Server --> YTDLP[yt-dlp]\n    YTDLP -.->|Download| YouTube[YouTube]\n  end`,
        techStack: [
          {
            nameKey: "mobile_framework",
            technologies: ["Flutter", "Dart", "Riverpod"],
          },
          {
            nameKey: "audio_playback",
            technologies: ["just_audio", "audio_service", "video_player"],
          },
          { nameKey: "local_database", technologies: ["Drift (SQLite)"] },
          { nameKey: "backend", technologies: ["Python", "FastAPI"] },
          { nameKey: "media_processing", technologies: ["yt-dlp", "ffmpeg"] },
          { nameKey: "deployment", technologies: ["Docker Compose"] },
        ],
        github: "https://github.com/RayLiu1999/muon",
      },
      10: {
        image: "/logos/project10.png",
        year: "2026",
        categoryKey: "devops",
        challengesCount: 3,
        mermaid: `graph TD\n  Internet -->|Cloudflare Tunnel| CF[Cloudflared]\n  CF --> Traefik[Traefik Ingress]\n  subgraph VPS-1 [OVH Master Node]\n    Traefik\n    Argocd[ArgoCD]\n    Prom[Prometheus/Grafana]\n  end\n  subgraph VPS-2 [OVH Worker Node]\n    App[User Apps]\n  end\n  VPS-1 -.->|Tailscale Mesh 100.x.x.x| VPS-2\n  Traefik --> Argocd\n  Traefik --> App`,
        techStack: [
          {
            nameKey: "container_orchestration",
            technologies: ["K3s", "ArgoCD", "Traefik"],
          },
          {
            nameKey: "networking",
            technologies: ["Tailscale", "Cloudflare Tunnel"],
          },
          {
            nameKey: "monitoring",
            technologies: ["Prometheus", "Grafana", "Node Exporter"],
          },
          { nameKey: "log_management", technologies: ["Loki", "Promtail"] },
          {
            nameKey: "database",
            technologies: ["PostgreSQL 16", "MongoDB 8", "Redis 7"],
          },
          {
            nameKey: "backup",
            technologies: ["rclone", "OVH S3", "Google Drive"],
          },
          { nameKey: "tools", technologies: ["Bash", "Docker"] },
        ],
      },
      11: {
        image: "/logos/project11.png",
        year: "2026",
        categoryKey: "devops",
        challengesCount: 3,
        mermaid: `graph TD\n  Developer -->|Git Push| GitRepo[GitHub Repository]\n  GitRepo -->|Webhook / Poll| Argo[ArgoCD]\n  Argo -->|1. Sync| RootApp[Root Application]\n  RootApp -->|2. Generate| ProjectApps[Project Apps Apps/A, B, C]\n  ProjectApps -->|3. Deploy| K3s[K3s Cluster]\n  GHCR[GHCR] -->|Pull Image| K3s\n  CI[GitHub Actions] -.->|Update Tag| GitRepo`,
        techStack: [
          {
            nameKey: "gitops",
            technologies: ["ArgoCD", "App-of-Apps Pattern"],
          },
          {
            nameKey: "container_orchestration",
            technologies: ["K3s", "Kustomize"],
          },
          {
            nameKey: "secret_management",
            technologies: ["kubeseal", "Bitnami Sealed Secrets"],
          },
          {
            nameKey: "deployment",
            technologies: ["GitHub Actions", "GHCR", "Docker"],
          },
        ],
      },
      12: {
        image: "/logos/project12.png",
        year: "2026",
        demo: "https://lazybacktest.liu-yucheng.com/",
        categoryKey: "fullstack",
        challengesCount: 3,
        mermaid: `graph TD\n  User -->|React UI| Vite[Vite SPA]\n  Vite -->|REST API| API[FastAPI Backend]\n  API -->|Strategy/Grid Search| Pandas[Pandas Engine]\n  API <--> DB[(PostgreSQL)]\n  API -.->|Fetch History| YF[yfinance API]`,
        techStack: [
          {
            nameKey: "frontend",
            technologies: ["React 18", "TypeScript", "Vite", "TailwindCSS"],
          },
          { nameKey: "visualization", technologies: ["Recharts"] },
          {
            nameKey: "backend",
            technologies: ["Python 3.11+", "FastAPI", "SQLAlchemy", "Alembic"],
          },
          { nameKey: "data_analysis", technologies: ["Pandas", "NumPy"] },
          { nameKey: "financial_data", technologies: ["yfinance"] },
          {
            nameKey: "database",
            technologies: ["PostgreSQL", "Redis", "SQLite (test)"],
          },
          { nameKey: "deployment", technologies: ["Docker Compose", "Nginx"] },
        ],
      },
      13: {
        image: "/logos/project13.png",
        year: "2026",
        demo: "https://leetcode.liu-yucheng.com/",
        categoryKey: "frontend",
        challengesCount: 2,
        techStack: [
          {
            nameKey: "frontend_framework",
            technologies: ["React 19", "TypeScript", "Vite 7", "TailwindCSS 4"],
          },
          { nameKey: "state_management", technologies: ["Zustand"] },
          {
            nameKey: "tools",
            technologies: [
              "react-markdown",
              "rehype-highlight",
              "highlight.js",
              "framer-motion",
            ],
          },
          { nameKey: "deployment", technologies: ["Docker", "Nginx"] },
        ],
      },
      14: {
        image: "/logos/project14.png",
        year: "2026",
        demo: "https://guitar.liu-yucheng.com/",
        categoryKey: "fullstack",
        challengesCount: 3,
        techStack: [
          {
            nameKey: "frontend_framework",
            technologies: ["React 19", "TypeScript", "Vite", "TailwindCSS"],
          },
          {
            nameKey: "visualization",
            technologies: [
              "react-force-graph-2d (D3)",
              "react-activity-calendar",
              "Recharts",
            ],
          },
          {
            nameKey: "backend",
            technologies: ["Node.js", "Express", "TypeScript"],
          },
          { nameKey: "database", technologies: ["MongoDB", "Mongoose"] },
          { nameKey: "deployment", technologies: ["Docker Compose", "Nginx"] },
        ],
      },
      15: {
        image: "/logos/project15.png",
        year: "2026",
        github: "https://github.com/RayLiu1999/senior_interview",
        categoryKey: "knowledge_base",
        challengesCount: 2,
        techStack: [
          { nameKey: "content", technologies: ["Markdown"] },
          { nameKey: "tools", technologies: ["Go (code examples)", "GitHub"] },
        ],
      },
      16: {
        image: "/logos/project16.png",
        year: "2026",
        github: "https://github.com/RayLiu1999/gcp-free-stack",
        categoryKey: "devops",
        challengesCount: 3,
        mermaid: `graph TD\n  User -->|IPv4/IPv6| CF[Cloudflare Edge]\n  subgraph GCP ["GCP e2-micro VM - IPv6 Only"]\n    CF -->|Cloudflare Tunnel| Tunnel[cloudflared container]\n    Tunnel --> Nginx[Nginx / Traefik]\n    Nginx --> App1[Uptime Kuma]\n    Nginx --> App2[Umami / Homer]\n    App1 --> |IPv4 Monitor| Socat[Socat 4001]\n    Docker[Docker Daemon] -->|Pull| WARP[WARP Proxy 4000]\n    Socat --> WARP\n  end\n  WARP -->|Internet Outbound| Target[GitHub / IPv4 Targets]`,
        techStack: [
          {
            nameKey: "container_orchestration",
            technologies: ["Docker", "Docker Compose", "Portainer"],
          },
          {
            nameKey: "networking",
            technologies: [
              "Cloudflare Tunnel",
              "Cloudflare WARP",
              "Socat",
              "Cloudflare Workers",
            ],
          },
          {
            nameKey: "monitoring",
            technologies: ["Uptime Kuma", "Umami", "Dash."],
          },
          {
            nameKey: "deployment",
            technologies: ["GCP e2-micro", "GCP IAP", "Ubuntu", "systemd"],
          },
        ],
      },
      17: {
        image: "/logos/project17.png",
        year: "2026",
        demo: "https://crypto-exchange.liu-yucheng.com",
        githubs: [
          {
            key: "frontend",
            url: "https://github.com/RayLiu1999/cyptocurrency-exchange-frontend",
          },
          {
            key: "backend",
            url: "https://github.com/RayLiu1999/cyptocurrency-exchange-backend",
          },
        ],
        categoryKey: "backend",
        challengesCount: 5,
        mermaid: `graph TD\n  Client[Frontend / Trader UI] -->|HTTP / WS| Gateway[gateway]\n  Gateway -->|REST / Idempotency / Rate Limit| Order[order-service]\n  Gateway <-->|WS Proxy| Market[market-data-service]\n  Order -->|TX1 Lock Funds + Create Order + Outbox| DB[(PostgreSQL)]\n  Order -->|Sliding Window / Idempotency Cache| Redis[(Redis)]\n  Order -->|Outbox Worker| Kafka[(Kafka / Redpanda)]\n  Kafka -->|exchange.orders| Matching[matching-engine]\n  Matching -->|Leader Election + Fencing| DB\n  Matching -->|Warm Start / Active Orders| DB\n  Matching -->|Orderbook Snapshot| Redis\n  Matching -->|settlements / trades / orderbook| Kafka\n  Kafka -->|exchange.settlements| Order\n  Kafka -->|orderbook / trades / order_updates| Market\n  Market -->|Realtime Push| Client`,
        techStack: [
          {
            nameKey: "backend",
            technologies: [
              "Go 1.25",
              "Gin",
              "Price-Time Priority",
              "Leader Election",
            ],
          },
          {
            nameKey: "database",
            technologies: ["PostgreSQL", "Redis", "pgx v5"],
          },
          {
            nameKey: "messaging",
            technologies: [
              "Kafka / Redpanda",
              "Transactional Outbox",
              "Atomic Settlement",
              "Idempotency",
            ],
          },
          {
            nameKey: "deployment",
            technologies: ["Docker", "AWS ECS", "Terraform", "ecspresso"],
          },
          {
            nameKey: "monitoring",
            technologies: ["Prometheus", "Grafana", "CloudWatch", "k6"],
          },
        ],
      },
      18: {
        image: "/logos/project18.png",
        year: "2026",
        github: "https://github.com/RayLiu1999/yt-realtime-subtitles",
        categoryKey: "extension",
        challengesCount: 3,
        mermaid: `graph TD
    A[YouTube Video / Live] -->|Web Audio API| B(Content Script)
    B -->|WebSocket Buffer| C[Go Backend]
    C -->|Streaming API| D[Deepgram Nova-2 STT]
    D -->|Transcript| C
    C --> E{Round-Robin Load Balancer}
    E -->|Primary| F[Google Translate]
    E -->|Failover| G[DeepL API]
    F --> C
    G --> C
    C -->|Translation Data| B
    B -->|DOM Update| H[Draggable Subtitles]`,
        techStack: [
          {
            nameKey: "extension",
            technologies: [
              "JavaScript",
              "Chrome Extension API",
              "Web Audio API",
            ],
          },
          { nameKey: "backend", technologies: ["Go", "WebSocket"] },
          {
            nameKey: "ai_service",
            technologies: ["Deepgram STT API", "Google Translate", "DeepL API"],
          },
        ],
      },
    };

    const staticP = staticData[projectId];
    if (!staticP) return null;

    // Build challenges array using indexed t() calls
    const challenges = [];
    for (let i = 0; i < staticP.challengesCount; i++) {
      const challengeTitle = t(`${key}.challenges[${i}].title`);
      if (challengeTitle !== `${key}.challenges[${i}].title`) {
        challenges.push({
          title: challengeTitle,
          problem: t(`${key}.challenges[${i}].problem`),
          solution: t(`${key}.challenges[${i}].solution`),
        });
      }
    }

    // Build techStack array using staticData structure and translate category names
    const techStack = staticP.techStack.map((cat) => ({
      name: t(`portfolio.techStack.${cat.nameKey}`),
      technologies: cat.technologies,
    }));

    // Construct merged project
    const p = {
      ...staticP,
      title: t(`${key}.title`),
      description: t(`${key}.description`),
      overview: t(`${key}.overview`),
      architectureDescription: t(`${key}.architectureDescription`),
      learnings: t(`${key}.learnings`),
      category: t(`portfolio.categories.${staticP.categoryKey}`),
      challenges,
      techStack,
    };

    // Fix githubs translation if present
    if (staticP.githubs) {
      p.githubs = staticP.githubs.map((g) => ({
        name: t(`${key}.githubs.${g.key}`),
        url: g.url,
      }));
    }

    return p;
  } catch (e) {
    console.error(e);
    return null;
  }
});

// SEO Meta Update
useHead(() => {
  const p = project.value;
  return {
    title: p
      ? `${p.title} - Ray Liu`
      : t("portfolio.project.notFound") + " - Ray Liu",
    meta: [
      { name: "description", content: p ? p.description : "" },
      {
        property: "og:title",
        content: p ? `${p.title} - Ray Liu` : t("portfolio.project.notFound"),
      },
      { property: "og:description", content: p ? p.description : "" },
      {
        property: "og:image",
        content: p ? `${siteUrl}${p.image}` : `${siteUrl}/og-image.png`,
      },
    ],
  };
});
</script>

<style scoped>
.solution-content :deep(ul) {
  @apply list-disc pl-6 space-y-2 mt-2;
}

.solution-content :deep(ol) {
  @apply list-decimal pl-6 space-y-2 mt-2;
}

.solution-content :deep(li) {
  @apply text-coffee-700 dark:text-gray-300 leading-relaxed;
}

.solution-content :deep(p) {
  @apply mb-2;
}
</style>
