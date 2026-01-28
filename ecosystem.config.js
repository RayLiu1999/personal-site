module.exports = {
  apps: [{
    name: "personal-site",
    script: "./server/index.mjs",

    // 執行模式：單實例使用 fork 模式，開銷較低
    instances: 1,
    exec_mode: "fork",

    // 環境變數
    env: {
      NODE_ENV: "production",
      PORT: 3002,
    },

    // 記憶體管理：Nuxt 3 生產環境通常 100-200MB，設 300M 可及早發現洩漏
    max_memory_restart: "300M",

    // 重啟策略
    min_uptime: "10s",       // 最小運行時間，避免啟動失敗時無限重啟
    max_restarts: 10,        // 最大重啟次數
    restart_delay: 3000,     // 重啟間隔 3 秒
    autorestart: true,

    // 進程配置
    kill_timeout: 5000,
    listen_timeout: 8000,

    // 生產環境停用 source map 以減少記憶體與 CPU 開銷
    source_map_support: false,

    // 日誌配置
    log_type: "json",
    time: true,
    merge_logs: true,        // 合併 stdout/stderr 日誌
  }]
};