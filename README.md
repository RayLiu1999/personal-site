# Ray Liu - 後端工程師個人網站 ☕

> 一個充滿個人風格的後端工程師作品展示網站，以咖啡色系為主調，展現專業技能與個人特色。

這是一個使用 **Nuxt 3** + **Tailwind CSS** 建構的現代化個人網站，結合了專業展示與個人風格，支援多語言和深色模式。

## ✨ 核心功能

### 🏠 **首頁 (Home Page)**
- 🎯 精簡有力的自我介紹，突出後端工程師身份
- 💼 核心技術棧展示 (Node.js, Python, SQL, etc.)
- 🚀 精選專案預覽，展示實戰經驗
- 📊 技術領域圖示化展示
- 🎨 響應式卡片佈局，支援任意數量專案居中顯示

### 💼 **作品集 (Portfolio)**
- 📋 完整專案列表，包含詳細技術說明
- � 每個專案都有對應的詳細頁面
- 💻 技術棧標籤化顯示
- 📁 專案分類與篩選功能
- 🖼️ 專案截圖與 Demo 連結

### 👨‍💻 **關於我 (About Me)**
- 🎭 **全新個人化風格**：從嚴肅履歷轉向輕鬆有趣的自我介紹
- 🧠 個人程式設計哲學與價值觀
- ⚡ 核心技能樹狀圖展示
- 📚 持續學習的技術棧擴展
- 🎯 職涯目標與個人願景

### 📧 **聯絡頁面 (Contact)**
- 📝 **安全聯絡表單**：整合 Google reCAPTCHA v3 防機器人驗證
- 🛡️ 完整的後端驗證機制
- 💌 友善的聯絡訊息引導
- ⚡ 即時表單驗證與錯誤提示
- 📱 手機版優化的表單設計

### 🌐 **全域功能**
- 🗣️ **多語言支援**：繁體中文 / English 切換
- 🎨 **深色/淺色模式**：自動適應系統偏好設定
- 📱 **社交連結側邊欄**：Gmail、GitHub、LinkedIn 快速聯絡
- 🎭 **微動畫效果**：頁面切換、hover 效果、載入動畫
- 📱 **手機版優化**：響應式設計，社交資訊整合到 footer

## 🎨 設計亮點

### ☕ **咖啡色系美學**
- 🎯 溫暖的咖啡色調為主色系 (`coffee-50` ~ `coffee-900`)
- 🌙 深色模式使用 Blue 系色彩，提供舒適的夜間瀏覽體驗
- 🎨 專業而溫馨的視覺設計，展現個人品味

### 📱 **現代響應式設計**
- 💻 完全適配桌面、平板、手機三種裝置
- 🔄 Mobile-first 設計理念
- 🎭 社交側邊欄在手機版自動隱藏，資訊移至 footer
- 📐 Flexbox 與 Grid 混合佈局，確保內容完美呈現

### ✨ **互動體驗升級**
- 🎬 **精緻微動畫**：頁面載入、hover 效果、按鈕點擊回饋
- 🎯 **智慧導航**：底線滑動效果，視覺化顯示當前頁面
- 🎨 **漸進式載入**：頁面切換動畫，提升使用者體驗
- 🎭 **社交互動**：側邊欄 hover 放大效果，增加互動樂趣

### 🛡️ **安全性與效能**
- 🔒 Google reCAPTCHA v2 整合，防止垃圾郵件
- ⚡ Nuxt 3 SSR/SSG 支援，優化 SEO 與載入速度
- 🎯 圖片最佳化與懶載入
- 📦 程式碼分割與樹搖優化

## 🔧 技術棧

### 🏗️ **核心技術**
- **前端框架**: [Nuxt 3](https://nuxt.com/) (Vue 3 + TypeScript)
- **樣式框架**: [Tailwind CSS](https://tailwindcss.com/) 3.4+
- **開發語言**: TypeScript + Vue 3 Composition API
- **狀態管理**: Vue 3 Composables (useDarkMode)

### 🌐 **國際化 & 使用者體驗**
- **多語言**: [@nuxtjs/i18n](https://i18n.nuxtjs.org/) (繁中/英文)
- **主題切換**: 深色/淺色模式自動切換
- **動畫庫**: CSS Transitions + Transforms + Keyframes
- **字型**: 系統字型堆疊，支援中英文最佳顯示

### 🛡️ **後端 & 安全性**
- **API 路由**: Nuxt Server Routes (`server/api/`)
- **表單驗證**: Google reCAPTCHA v2 + 自訂驗證邏輯
- **型別安全**: 完整 TypeScript 支援，自訂 interface
- **錯誤處理**: 統一錯誤處理機制

### 📱 **響應式 & 效能**
- **CSS 框架**: Tailwind CSS 響應式斷點
- **圖片最佳化**: Nuxt 內建圖片最佳化
- **SEO**: 動態 meta 標籤 + sitemap 生成
- **部署**: 支援 SSG/SSR，適配 Vercel、Netlify

## 🚀 安裝與使用

### 📋 **環境需求**
- **Node.js**: 18.x 或更高版本
- **套件管理器**: pnpm (推薦) / npm / yarn
- **作業系統**: macOS / Linux / Windows

### ⚡ **快速開始**

1. **複製專案**
```bash
git clone <repository-url>
cd personal-site
```

2. **安裝依賴**
```bash
pnpm install
# 或
npm install
```

3. **環境變數設定**
```bash
# 複製環境變數範本
cp .env.example .env

# 設定 reCAPTCHA 密鑰
NUXT_RECAPTCHA_SECRET_KEY=your_secret_key_here
```

4. **啟動開發伺服器**
```bash
pnpm dev
# 開啟 http://localhost:3000
```

5. **建構生產版本**
```bash
# 生成靜態網站
pnpm generate

# 或建構 SSR 版本
pnpm build
pnpm start
```

### 🔧 **開發指令**
```bash
# 開發模式
pnpm dev

# 型別檢查
pnpm type-check

# 程式碼檢查
pnpm lint

# 預覽生產版本
pnpm preview
```

## ⚙️ 自訂化指南

### 👤 **個人資訊更新**

1. **基本資料**
   - 更新 `layouts/default.vue` 中的 logo 和網站名稱
   - 修改 `pages/index.vue` 中的自我介紹和技能展示
   - 替換 `public/avatar.jpg` 和 `public/logo.png`

2. **關於我頁面**
   - 編輯 `pages/about.vue` 中的個人故事和技能資料
   - 更新 `philosophy` 和 `skills` 陣列內容
   - 調整個人風格和語調

3. **聯絡資訊**
   - 修改 `components/SocialSidebar.vue` 中的社交連結
   - 更新 `layouts/default.vue` footer 中的聯絡方式

### 🎨 **主題客製化**

1. **色彩系統** (`tailwind.config.js`)
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#F3EFEA',   // 背景色
          100: '#E8E0D9',  // 卡片背景
          600: '#8F725A',  // 主要按鈕
          800: '#3D2A23',  // 深色文字
          900: '#211511'   // 最深色
        }
      }
    }
  }
}
```

2. **動畫效果**
   - 調整 `app.vue` 中的全域動畫設定
   - 修改各組件中的 hover 效果和過渡動畫

### 💼 **作品集管理**

1. **新增專案**
   - 在 `pages/portfolio/index.vue` 中更新專案列表
   - 新增專案圖片到 `public/` 資料夾
   - 在 `project_docs/` 中加入專案說明文件

2. **專案詳細頁面**
   - 編輯 `pages/portfolio/[id].vue` 來客製化詳細頁面
   - 使用 Markdown 格式撰寫專案文檔

### 🌐 **多語言設定**

1. **新增語言**
   - 在 `i18n/locales/` 中建立新的語言檔案
   - 更新 `nuxt.config.ts` 中的語言配置
   - 在 `layouts/default.vue` 中加入新語言的選項

2. **翻譯內容**
   - 編輯 `i18n/locales/zh-tw.json` 和 `en.json`
   - 在 Vue 檔案中使用 `$t('key')` 來引用翻譯

### 🛡️ **安全性配置**

1. **reCAPTCHA 設定**
   ```bash
   # .env 檔案
   NUXT_RECAPTCHA_SECRET_KEY=your_secret_key
   ```

2. **聯絡表單客製化**
   - 修改 `server/api/contact.post.ts` 中的處理邏輯
   - 調整 `pages/contact.vue` 中的表單欄位

## 🚀 部署指南

### 🌟 **推薦部署平台**

#### **Vercel (推薦)**
1. 連接 GitHub 倉庫到 [Vercel](https://vercel.com)
2. 自動檢測 Nuxt 3 專案並配置
3. 設定環境變數：`NUXT_RECAPTCHA_SECRET_KEY`
4. 自動部署，支援 preview 分支

#### **Netlify**
1. 連接 GitHub 到 [Netlify](https://netlify.com)
2. 建構設定：
   ```
   Build command: npm run generate
   Publish directory: .output/public
   ```
3. 在 Site settings > Environment variables 中設定 reCAPTCHA 密鑰

#### **手動部署**
```bash
# 生成靜態檔案
pnpm generate

# 部署 .output/public/ 資料夾到任何靜態主機
```

### 🔧 **環境變數配置**
```bash
# 生產環境必須設定
NUXT_RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# 可選設定
NUXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 📊 **效能最佳化建議**
- ✅ 使用 `nuxt generate` 生成靜態網站
- ✅ 圖片使用 WebP 格式並壓縮
- ✅ 啟用 CDN 和快取設定
- ✅ 監控 Core Web Vitals 指標

## 📁 專案結構

```
personal-site/
├── 📂 components/           # 可重用組件
│   └── SocialSidebar.vue   # 社交連結側邊欄
├── 📂 composables/          # Vue 組合式函數
│   └── useDarkMode.ts      # 深色模式管理
├── 📂 i18n/                # 國際化設定
│   └── locales/            # 語言檔案
├── 📂 layouts/              # 佈局模板
│   └── default.vue         # 主要佈局
├── 📂 pages/                # 路由頁面
│   ├── index.vue           # 首頁
│   ├── about.vue           # 關於我
│   ├── contact.vue         # 聯絡頁面
│   └── portfolio/          # 作品集
├── 📂 public/               # 靜態資源
│   ├── logo.png            # 網站 Logo
│   ├── avatar.jpg          # 個人照片
│   └── project*.png        # 專案截圖
├── 📂 server/               # 後端 API
│   ├── api/                # API 端點
│   └── utils/              # 工具函數
├── 📂 types/                # TypeScript 類型定義
└── 📂 utils/                # 通用工具函數
```

## 🔧 常見問題解決

### Q: reCAPTCHA 驗證失敗
**A:** 檢查 `.env` 檔案中的 `NUXT_RECAPTCHA_SECRET_KEY` 是否正確設定

### Q: 深色模式狀態不持久
**A:** 確保瀏覽器支援 localStorage，並檢查 `useDarkMode.ts` 設定

### Q: 多語言切換後頁面報錯
**A:** 確認所有語言檔案中的 key 都有對應的翻譯內容

### Q: 手機版社交連結不見了
**A:** 社交連結在手機版會自動移至 footer，這是響應式設計的一部分

## 📄 授權資訊

```
MIT License

Copyright (c) 2024 Ray Liu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🤝 支援與貢獻

### 💬 **聯絡方式**
- 📧 Email: 透過網站聯絡表單
- 💼 LinkedIn: [Professional Profile]
- 🐙 GitHub: [Source Code & Issues]

### 🐛 **回報問題**
1. 在 GitHub 上建立 Issue
2. 詳細描述問題和重現步驟
3. 提供系統環境資訊

### 🎯 **功能建議**
歡迎提交 Pull Request 或建立 Feature Request！

---

**🚀 打造屬於你的專業程式設計師品牌網站！**

> 這不只是一個網站，更是你技術實力與個人風格的完美展現 ✨
