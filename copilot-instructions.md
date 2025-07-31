# Copilot Instructions - 後端工程師個人網站

## 專案概述
這是一個使用 Nuxt 3 + Tailwind CSS 構建的後端工程師個人網站，展示專業經驗、技術技能和作品集。

## 技術棧
- **框架**: Nuxt 3.17.6
- **樣式**: Tailwind CSS 3.4.0
- **語言**: TypeScript
- **部署**: 靜態生成 (SSG)
- **主題**: 支援深色/淺色模式切換

## 專案結構
```
/
├── pages/                 # 路由頁面
│   ├── index.vue         # 首頁
│   ├── about.vue         # 關於我
│   ├── contact.vue       # 聯絡頁面
│   └── portfolio/        # 作品集
├── layouts/              # 佈局組件
│   └── default.vue       # 預設佈局
├── composables/          # 組合式函數
│   └── useDarkMode.ts    # 深色模式邏輯
├── public/               # 靜態資源
└── components/           # 可重用組件 (待建立)
```

## 設計系統

### 色彩方案
#### 淺色模式 (預設)
- **主色調**: Coffee 系列 (`coffee-50` 到 `coffee-900`)
  - `coffee-50`: #F3EFEA (背景)
  - `coffee-100`: #E8E0D9 (淺背景)
  - `coffee-600`: #8F725A (主要按鈕)
  - `coffee-800`: #3D2A23 (深色文字)

#### 深色模式
- **背景**: Gray 系列 (`gray-800`, `gray-900`)
- **強調色**: Blue 系列 (`blue-400`, `blue-600`)
- **文字**: White, `gray-300`

### 響應式設計
- **斷點**: 使用 Tailwind 預設斷點 (sm, md, lg, xl)
- **行動優先**: 所有組件都採用 mobile-first 設計
- **導航**: 桌面版水平導航，手機版漢堡選單

## 開發規範

### Vue 3 Composition API
- 使用 `<script setup>` 語法
- 組合式函數放在 `composables/` 目錄
- 響應式資料使用 `ref()` 和 `reactive()`

### 樣式規範
```vue
<!-- 良好的樣式類別組織 -->
<div class="
  flex items-center justify-between
  bg-white dark:bg-gray-800 
  p-6 rounded-lg shadow-sm 
  border dark:border-gray-700
  transition-colors
">
```

### 深色模式實作
- 使用 `dark:` 前綴類別
- 所有元素都要支援深色模式
- 使用 `transition-colors` 提供平滑過渡

### TypeScript
- 使用嚴格的 TypeScript 設定
- 介面定義放在適當位置
- 組合式函數要有適當的類型標註

## 組件開發指南

### 按鈕組件
```vue
<!-- 主要按鈕 -->
<button class="
  bg-coffee-600 hover:bg-coffee-700 
  dark:bg-blue-600 dark:hover:bg-blue-700 
  text-white font-semibold py-3 px-6 rounded-lg 
  transition-colors
">
  按鈕文字
</button>

<!-- 次要按鈕 -->
<button class="
  border-2 border-coffee-600 dark:border-blue-400 
  text-coffee-600 dark:text-blue-400 
  hover:bg-coffee-600 dark:hover:bg-blue-600 hover:text-white 
  py-3 px-6 rounded-lg font-semibold transition-colors
">
  次要按鈕
</button>
```

### 卡片組件
```vue
<div class="
  bg-white dark:bg-gray-800 
  p-6 rounded-lg shadow-sm 
  border dark:border-gray-700
">
  <h3 class="text-lg font-semibold text-coffee-800 dark:text-white mb-2">
    標題
  </h3>
  <p class="text-coffee-600 dark:text-gray-300">
    內容
  </p>
</div>
```

### 表單元素
```vue
<input class="
  w-full px-4 py-3 
  border border-coffee-200 dark:border-gray-600 
  bg-white dark:bg-gray-700 
  text-coffee-800 dark:text-white 
  rounded-lg 
  focus:ring-2 focus:ring-coffee-500 dark:focus:ring-blue-500 
  focus:border-transparent
" />
```

## 內容指南

### 文案風格
- **語調**: 專業但親和，展現技術實力
- **語言**: 繁體中文為主，英文術語保持原文
- **術語**: 使用業界標準技術術語

### SEO 最佳化
- 每個頁面都要有適當的 `useHead()` 設定
- Meta description 控制在 150-160 字元
- 使用語意化的 HTML 標籤

### 效能考量
- 圖片使用適當格式和尺寸
- 懶加載非關鍵資源
- 最小化 JavaScript bundle 大小

## 常用模式

### 頁面結構
```vue
<template>
  <div class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 頁面標題 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-coffee-800 dark:text-white mb-4">
          頁面標題
        </h1>
        <p class="text-coffee-600 dark:text-gray-400">
          頁面描述
        </p>
      </div>
      
      <!-- 主要內容 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 內容區塊 -->
      </div>
    </div>
  </div>
</template>

<script setup>
// SEO 設定
useHead({
  title: '頁面標題 - 後端工程師個人網站',
  meta: [
    { name: 'description', content: '頁面描述' }
  ]
})
</script>
```

### 響應式網格
```vue
<!-- 專案展示網格 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <!-- 卡片項目 -->
</div>

<!-- 雙欄佈局 -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div class="lg:col-span-2">主要內容</div>
  <div class="lg:col-span-1">側邊欄</div>
</div>
```

## 待開發功能建議
1. **組件庫**: 建立可重用的 UI 組件
2. **動畫**: 添加頁面過渡和滾動動畫
3. **國際化**: 支援多語言切換
4. **CMS 整合**: 動態內容管理
5. **效能監控**: 添加分析和監控工具

## 除錯和測試
- 使用 Vue DevTools 進行開發除錯
- 測試深色模式在各種設備上的顯示效果
- 確保所有互動元素都有適當的無障礙標籤
- 驗證響應式設計在不同螢幕尺寸下的表現

## 部署注意事項
- 使用 `nuxt generate` 進行靜態生成
- 確保所有資源路徑正確
- 測試深色模式狀態持久化
- 驗證 SEO meta 標籤正確生成
