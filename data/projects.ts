export type ProjectCategory =
  | "backend"
  | "fullstack"
  | "frontend"
  | "mobile"
  | "extension"
  | "devops"
  | "knowledge_base"
  | "discord_bot"
  | "php";

export interface Project {
  id: number;
  pinned: boolean;
  image: string;
  category: ProjectCategory;
  year: string;
  tags: string[];
  technologies: string[];
  demo?: string;
  github?: string;
  githubs?: { label: "frontend" | "backend"; url: string }[];
  features?: string[];
  /** The project page groups its tech stack by these headings (portfolio.techStack.<key>). */
  techStack: { key: string; items: string[] }[];
  /** The architecture is a pre-rendered diagram (assets/diagrams/p<id>.svg) … */
  diagram?: boolean;
  /** … or a screenshot. */
  architectureImage?: string;
}

const projects: Project[] = [
  {
    id: 17,
    pinned: true,
    image: "/logos/project17.png",
    category: "backend",
    year: "2026",
    tags: ["Go", "Microservices"],
    technologies: [
      "Go",
      "PostgreSQL",
      "Redis",
      "Kafka",
      "Transactional Outbox",
      "Prometheus",
      "k6",
    ],
    demo: "https://crypto-exchange.liu-yucheng.com",
    githubs: [
      {
        label: "frontend",
        url: "https://github.com/RayLiu1999/cyptocurrency-exchange-frontend",
      },
      {
        label: "backend",
        url: "https://github.com/RayLiu1999/cyptocurrency-exchange-backend",
      },
    ],
    diagram: true,
    techStack: [
      { key: "backend", items: ["Go 1.25", "Gin", "Price-Time Priority", "Leader Election"] },
      { key: "database", items: ["PostgreSQL", "Redis", "pgx v5"] },
      { key: "messaging", items: ["Kafka / Redpanda", "Transactional Outbox", "Atomic Settlement", "Idempotency"] },
      { key: "deployment", items: ["Docker", "AWS ECS", "Terraform", "ecspresso"] },
      { key: "monitoring", items: ["Prometheus", "Grafana", "CloudWatch", "k6"] },
    ],
  },
  {
    id: 8,
    pinned: false,
    image: "/logos/project8.png",
    category: "mobile",
    year: "2026",
    tags: ["Mobile", "Python"],
    technologies: [
      "Flutter",
      "Dart",
      "Riverpod",
      "just_audio",
      "Drift",
      "FastAPI",
      "yt-dlp",
      "Docker",
    ],
    github: "https://github.com/RayLiu1999/muon",
    diagram: true,
    techStack: [
      { key: "mobile_framework", items: ["Flutter", "Dart", "Riverpod"] },
      { key: "audio_playback", items: ["just_audio", "audio_service", "video_player"] },
      { key: "local_database", items: ["Drift (SQLite)"] },
      { key: "backend", items: ["Python", "FastAPI"] },
      { key: "media_processing", items: ["yt-dlp", "ffmpeg"] },
      { key: "deployment", items: ["Docker Compose"] },
    ],
  },
  {
    id: 18,
    pinned: false,
    image: "/logos/project18.png",
    category: "extension",
    year: "2026",
    tags: ["Go", "Extension"],
    technologies: [
      "JavaScript",
      "Chrome Extension API",
      "Web Audio API",
      "Go",
      "WebSocket",
      "Deepgram STT API",
      "Google Translate API",
      "DeepL API",
    ],
    github: "https://github.com/RayLiu1999/yt-realtime-subtitles",
    diagram: true,
    techStack: [
      { key: "extension", items: ["JavaScript", "Chrome Extension API", "Web Audio API"] },
      { key: "backend", items: ["Go", "WebSocket"] },
      { key: "ai_service", items: ["Deepgram STT API", "Google Translate", "DeepL API"] },
    ],
  },
  {
    id: 10,
    pinned: false,
    image: "/logos/project10.png",
    category: "devops",
    year: "2026",
    tags: ["DevOps"],
    technologies: [
      "K3s",
      "Tailscale",
      "Cloudflare Tunnel",
      "ArgoCD",
      "Prometheus",
      "Grafana",
      "Loki",
      "rclone",
    ],
    diagram: true,
    techStack: [
      { key: "container_orchestration", items: ["K3s", "ArgoCD", "Traefik"] },
      { key: "networking", items: ["Tailscale", "Cloudflare Tunnel"] },
      { key: "monitoring", items: ["Prometheus", "Grafana", "Node Exporter"] },
      { key: "log_management", items: ["Loki", "Promtail"] },
      { key: "database", items: ["PostgreSQL 16", "MongoDB 8", "Redis 7"] },
      { key: "backup", items: ["rclone", "OVH S3", "Google Drive"] },
      { key: "tools", items: ["Bash", "Docker"] },
    ],
  },
  {
    id: 11,
    pinned: false,
    image: "/logos/project11.png",
    category: "devops",
    year: "2026",
    tags: ["DevOps"],
    technologies: [
      "ArgoCD",
      "Kustomize",
      "kubeseal",
      "GitHub Actions",
      "GHCR",
      "K3s",
    ],
    diagram: true,
    techStack: [
      { key: "gitops", items: ["ArgoCD", "App-of-Apps Pattern"] },
      { key: "container_orchestration", items: ["K3s", "Kustomize"] },
      { key: "secret_management", items: ["kubeseal", "Bitnami Sealed Secrets"] },
      { key: "deployment", items: ["GitHub Actions", "GHCR", "Docker"] },
    ],
  },
  {
    id: 16,
    pinned: false,
    image: "/logos/project16.png",
    category: "devops",
    year: "2026",
    tags: ["DevOps"],
    technologies: [
      "GCP",
      "Docker Compose",
      "Cloudflare Tunnel",
      "WARP",
      "Socat",
      "Ubuntu",
    ],
    github: "https://github.com/RayLiu1999/gcp-free-stack",
    diagram: true,
    techStack: [
      { key: "container_orchestration", items: ["Docker", "Docker Compose", "Portainer"] },
      { key: "networking", items: ["Cloudflare Tunnel", "Cloudflare WARP", "Socat", "Cloudflare Workers"] },
      { key: "monitoring", items: ["Uptime Kuma", "Umami", "Dash."] },
      { key: "deployment", items: ["GCP e2-micro", "GCP IAP", "Ubuntu", "systemd"] },
    ],
  },
  {
    id: 12,
    pinned: false,
    image: "/logos/project12.png",
    category: "fullstack",
    year: "2026",
    tags: ["React", "Python"],
    technologies: [
      "React 18",
      "TypeScript",
      "Vite",
      "TailwindCSS",
      "Recharts",
      "FastAPI",
      "PostgreSQL",
      "Redis",
    ],
    demo: "https://lazybacktest.liu-yucheng.com/",
    diagram: true,
    techStack: [
      { key: "frontend", items: ["React 18", "TypeScript", "Vite", "TailwindCSS"] },
      { key: "visualization", items: ["Recharts"] },
      { key: "backend", items: ["Python 3.11+", "FastAPI", "SQLAlchemy", "Alembic"] },
      { key: "data_analysis", items: ["Pandas", "NumPy"] },
      { key: "financial_data", items: ["yfinance"] },
      { key: "database", items: ["PostgreSQL", "Redis", "SQLite (test)"] },
      { key: "deployment", items: ["Docker Compose", "Nginx"] },
    ],
  },
  {
    id: 13,
    pinned: false,
    image: "/logos/project13.png",
    category: "frontend",
    year: "2026",
    tags: ["React"],
    technologies: [
      "React 19",
      "TypeScript",
      "Vite",
      "TailwindCSS",
      "Zustand",
      "framer-motion",
      "Docker",
    ],
    demo: "https://leetcode.liu-yucheng.com/",
    techStack: [
      { key: "frontend_framework", items: ["React 19", "TypeScript", "Vite 7", "TailwindCSS 4"] },
      { key: "state_management", items: ["Zustand"] },
      { key: "tools", items: ["react-markdown", "rehype-highlight", "highlight.js", "framer-motion"] },
      { key: "deployment", items: ["Docker", "Nginx"] },
    ],
  },
  {
    id: 14,
    pinned: false,
    image: "/logos/project14.png",
    category: "fullstack",
    year: "2026",
    tags: ["React", "Node.js"],
    technologies: [
      "React 19",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "D3",
      "Docker",
    ],
    demo: "https://guitar.liu-yucheng.com/",
    techStack: [
      { key: "frontend_framework", items: ["React 19", "TypeScript", "Vite", "TailwindCSS"] },
      { key: "visualization", items: ["react-force-graph-2d (D3)", "react-activity-calendar", "Recharts"] },
      { key: "backend", items: ["Node.js", "Express", "TypeScript"] },
      { key: "database", items: ["MongoDB", "Mongoose"] },
      { key: "deployment", items: ["Docker Compose", "Nginx"] },
    ],
  },
  {
    id: 15,
    pinned: false,
    image: "/logos/project15.png",
    category: "knowledge_base",
    year: "2026",
    tags: ["Go"],
    technologies: ["Markdown", "Go", "GitHub"],
    github: "https://github.com/RayLiu1999/senior_interview",
    techStack: [
      { key: "content", items: ["Markdown"] },
      { key: "tools", items: ["Go (code examples)", "GitHub"] },
    ],
  },
  {
    id: 4,
    pinned: false,
    image: "/logos/project4.png",
    category: "extension",
    year: "2025",
    tags: ["Extension", "Node.js"],
    technologies: [
      "JavaScript",
      "Chrome Extension API",
      "n8n",
      "yt-dlp",
      "Docker Compose",
      "Webhook",
    ],
    github: "https://github.com/RayLiu1999/youtube-extension",
    architectureImage: "/archs/project4-sa.png",
    techStack: [
      { key: "extension", items: ["JavaScript", "Chrome Extension API"] },
      { key: "workflow", items: ["n8n", "yt-dlp", "Docker Compose"] },
      { key: "ai_service", items: ["Webhook"] },
    ],
  },
  {
    id: 2,
    pinned: false,
    image: "/logos/project3.png",
    category: "fullstack",
    year: "2025",
    tags: ["Vue / Nuxt", "Node.js"],
    technologies: [
      "Nuxt 3",
      "Node.js (ESM)",
      "PostgreSQL",
      "Drizzle ORM",
      "MinIO (S3)",
      "ArgoCD",
      "Prometheus",
      "Grafana",
    ],
    demo: "https://gf-soap.com",
    architectureImage: "/archs/project3-sa.png",
    techStack: [
      { key: "client_side", items: ["Nuxt 3", "Tailwind CSS", "TypeScript"] },
      { key: "backend", items: ["Node.js (ESM)", "Express", "Drizzle ORM", "PostgreSQL", "MinIO (S3)"] },
      { key: "deployment_management", items: ["Kubernetes (k3s)", "ArgoCD (GitOps)", "GitHub Actions"] },
      { key: "monitoring", items: ["Prometheus", "Grafana"] },
    ],
  },
  {
    id: 1,
    pinned: true,
    image: "/logos/project1.png",
    category: "fullstack",
    year: "2024",
    tags: ["Vue / Nuxt", "Go"],
    technologies: [
      "Vue 3",
      "TypeScript",
      "Go",
      "Gin",
      "MongoDB",
      "Redis",
      "Redis Pub/Sub",
      "K3s",
      "ArgoCD",
      "Prometheus",
    ],
    demo: "https://chat-app.liu-yucheng.com",
    githubs: [
      {
        label: "frontend",
        url: "https://github.com/RayLiu1999/chat_app_frontend",
      },
      { label: "backend", url: "https://github.com/RayLiu1999/chat_app_backend" },
    ],
    diagram: true,
    techStack: [
      { key: "frontend", items: ["Vue 3", "TypeScript", "Element Plus", "Pinia", "UnoCSS"] },
      { key: "backend", items: ["Go 1.25", "Gin", "gorilla/websocket", "JWT", "Redis Pub/Sub"] },
      { key: "database", items: ["MongoDB", "Redis"] },
      { key: "container_orchestration", items: ["K3s", "HPA", "Kustomize", "ArgoCD"] },
      { key: "monitoring", items: ["Prometheus", "pprof", "k6"] },
    ],
  },
  {
    id: 3,
    pinned: false,
    image: "/logos/project2.png",
    category: "frontend",
    year: "2024",
    tags: ["Vue / Nuxt"],
    technologies: ["Vue 3", "Vuex", "Vite", "Stockfish.js", "Docker"],
    demo: "https://chess.liu-yucheng.com",
    github: "https://github.com/RayLiu1999/chess-in-vue",
    architectureImage: "/archs/project2-sa.png",
    techStack: [
      { key: "frontend_framework", items: ["Vue 3", "Vuex 4", "Vite"] },
      { key: "ai_engine", items: ["Stockfish.js"] },
      { key: "deployment", items: ["Docker"] },
    ],
  },
  {
    id: 5,
    pinned: false,
    image: "/logos/project7.png",
    category: "discord_bot",
    year: "2023",
    tags: ["Bot", "Node.js"],
    technologies: [
      "Node.js",
      "Discord.js v14",
      "MongoDB",
      "Cheerio",
      "Puppeteer",
      "PM2",
      "Docker",
    ],
    github: "https://github.com/RayLiu1999/yt_discord_bot",
    architectureImage: "/archs/project7-sa.png",
    techStack: [
      { key: "core_tech", items: ["Node.js", "Discord.js v14", "JavaScript (ES Modules)"] },
      { key: "crawler_tech", items: ["node-fetch", "Cheerio", "Puppeteer"] },
      { key: "database", items: ["MongoDB", "Mongoose"] },
      { key: "deployment_management", items: ["PM2", "Docker"] },
    ],
  },
  {
    id: 6,
    pinned: false,
    image: "/logos/project5.png",
    category: "php",
    year: "2022",
    tags: ["PHP"],
    technologies: ["PHP", "MySQL", "Composer", "Apache"],
    github: "https://github.com/RayLiu1999/e-commerce-cart",
    demo: "https://e-commerce-cart.liu-yucheng.com",
    features: [
      "MVC 架構",
      "購物車系統",
      "用戶管理",
      "商品管理",
      "Session 管理",
    ],
    architectureImage: "/archs/project5-sa.png",
    techStack: [
      { key: "backend", items: ["PHP", "MySQL"] },
      { key: "tools", items: ["Composer", "Apache"] },
    ],
  },
  {
    id: 7,
    pinned: false,
    image: "/logos/project6.png",
    category: "php",
    year: "2022",
    tags: ["PHP"],
    technologies: ["PHP", "MySQL", "JavaScript", "Gulp", "Prepros"],
    demo: "https://pomodoro.liu-yucheng.com",
    github: "https://github.com/RayLiu1999/tomato-clock",
    architectureImage: "/archs/project6-sa.png",
    techStack: [
      { key: "backend", items: ["PHP", "MySQL"] },
      { key: "dev_tools", items: ["JavaScript", "Gulp", "Prepros"] },
    ],
  },
];

export const PROJECTS = projects.sort((a, b) => {
  if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
  return Number(b.year) - Number(a.year);
});

export function projectById(id: number): Project | undefined {
  return PROJECTS.find((project) => project.id === id);
}

export const INVENTORY_IDS = [12, 15, 8, 18, 13, 14, 2, 4, 5, 3, 6, 7];

