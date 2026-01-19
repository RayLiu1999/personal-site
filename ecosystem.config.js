module.exports = {
  apps: [{
    name: "personal-site", // 你的應用程式名稱
    script: "./server/index.mjs", // Nuxt 3 的啟動檔案路徑

    // 實例配置
    instances: "max", // 或使用 "max" 來使用所有 CPU 核心
    exec_mode: "cluster",

    // 環境變數
    env: {
      NODE_ENV: "production",
      PORT: process.env.PORT || 3000,
    },

    // 重啟配置
    max_memory_restart: "1G", // 記憶體超過 1GB 時重啟
    min_uptime: "5s", // 最小運行時間（開發環境縮短）
    max_restarts: 20, // 最大重啟次數（開發環境增加）
    cron_restart: "10 0 * * *", // 凌晨12:10重啟

    // 自動重啟
    autorestart: true,
    restart_delay: 2000, // 重啟延遲 2 秒（開發環境縮短）

    // 進程配置
    kill_timeout: 5000, // 強制關閉超時
    listen_timeout: 8000, // 監聽超時

    // 其他配置
    source_map_support: true,
    disable_source_map_support: false,

    // 健康檢查
    health_check_grace_period: 3000,

    // 日誌輪轉
    log_type: "json",

    // 時區
    time: true
  }]
};