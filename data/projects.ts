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

