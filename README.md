# 後端工程師個人網站

這是一個使用 Nuxt 3 + Tailwind CSS 3 建構的後端工程師個人網站，展示專業技能、作品集與個人經歷。

## 功能特色

### 🏠 首頁 (Home Page)
- 簡潔的自我介紹，突出後端工程師背景
- 技術專長展示
- 精選作品預覽
- 引導訪客查看作品集的 CTA

### 💼 作品集頁面 (Portfolio Page)
- 作品列表：以卡片形式展示各個專案
- 篩選/分類功能：依照專案類型進行篩選
- 專案詳細資訊：技術棧、GitHub 連結等

### 📄 作品詳細頁面 (Project Detail Page)
- 專案完整描述與背景
- 技術棧詳細列表
- 解決的技術挑戰
- 系統架構圖
- 學習心得分享

### 👨‍💻 關於我頁面 (About Me Page)
- 詳細的專業背景介紹
- 工作經驗時間軸
- 技能評估圖表
- 專業證照展示
- 履歷下載功能

### 📧 聯絡我頁面 (Contact Page)
- 聯絡表單
- 多種聯絡方式
- 合作機會說明
- 回覆時間承諾

## 設計特色

### 🎨 咖啡色系主題
- 使用溫暖的咖啡色調作為主色系
- 從淺到深的咖啡色漸層
- 專業而溫和的視覺效果

### 📱 響應式設計 (RWD)
- 完全適配桌面、平板、手機
- 流暢的使用者體驗
- 現代化的 UI 設計

### ⚡ 性能優化
- Nuxt 3 的 SSR/SSG 支援
- 圖片懶載入
- 程式碼分割

## 技術棧

- **前端框架**: Nuxt 3
- **樣式框架**: Tailwind CSS 3
- **開發語言**: Vue 3 + TypeScript
- **部署**: 支援 Netlify、Vercel 等平台

## 安裝與使用

### 環境需求
- Node.js 16.x 或更高版本
- npm 或 yarn

### 安裝步驟

1. 安裝依賴
```bash
npm install
```

2. 啟動開發伺服器
```bash
npm run dev
```

3. 建構生產版本
```bash
npm run build
```

4. 啟動生產伺服器
```bash
npm run start
```

## 自訂化指南

### 修改個人資訊
1. 更新 `pages/index.vue` 中的個人介紹
2. 修改 `pages/about.vue` 中的工作經驗和技能
3. 替換 `public/avatar.jpg` 為您的個人照片

### 新增作品
1. 在 `pages/portfolio/index.vue` 中新增專案資料
2. 在 `pages/portfolio/[id].vue` 中新增詳細資訊
3. 新增專案圖片到 `public/` 資料夾

### 修改主題色彩
在 `tailwind.config.js` 中調整 coffee 色系：

```javascript
colors: {
  coffee: {
    50: '#F3EFEA',   // 最淺
    100: '#E8E0D9',
    // ... 其他色階
    900: '#211511'   // 最深
  }
}
```

### 聯絡表單整合
目前聯絡表單為前端模擬，您可以：
1. 整合 Netlify Forms
2. 使用 Formspree 等服務
3. 建立自己的後端 API

## 部署

### Netlify 部署
1. 將程式碼推送到 GitHub
2. 在 Netlify 中連接 GitHub 倉庫
3. 設定建構指令：`npm run build`
4. 設定發布目錄：`.output/public`

### Vercel 部署
1. 安裝 Vercel CLI：`npm i -g vercel`
2. 執行：`vercel`
3. 跟隨指示完成部署

## 授權

MIT License - 您可以自由使用、修改和分發此專案。

## 支援

如果您在使用過程中遇到問題，歡迎：
- 提交 Issue
- 發送郵件諮詢
- 查看 Nuxt 3 官方文檔

---

**打造專屬於您的專業形象網站！** 🚀
