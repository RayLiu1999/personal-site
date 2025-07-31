// ecosystem.config.js
module.exports = {
  apps : [{
    name    : "personal-site", // 你的應用程式名稱
    port    : 8082, // 預設開發環境端口
    script  : "./.output/server/index.mjs", // Nuxt 3 的啟動檔案路徑
    instances: "max", // 建議使用 "max" 來利用所有 CPU 核心
    exec_mode: "cluster", // 如果使用 "max" instances，請設定為 "cluster" 模式

    // 開發環境變數 (可選)
    // env: {
    //   NODE_ENV: "development",
    //   NUXT_PORT: 3000 // 開發環境使用 3000 port
    // },

    // // 生產環境變數 (推薦使用這個，PM2 會自動切換)
    // env_production : {
    //   NODE_ENV: "production",
    //   NUXT_PORT: 8080 // 生產環境使用 8080 port
    //   // 其他生產環境的變數，例如 API_URL 等...
    // }
  }]
};