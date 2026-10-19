# Ray Liu 的浮空島

後端工程師 Ray Liu 的個人網站：https://liu-yucheng.com

首頁是一座受 Minecraft 啟發的方塊浮空島，也是整個網站的導覽地圖。點擊地標，鏡頭會飛過去，接著浮出該區塊的內容面板：紅石工廠是作品集，圖書館是部落格，小屋是關於我，告示牌是聯絡。用詞定義見 [`GLOSSARY.md`](GLOSSARY.md)，架構決策見 [`docs/adr/`](docs/adr/)。

## 功能

- **浮空島導覽**：開場時方塊落下組成島嶼；有晝夜（即淺色／深色主題）、走動的島民與音效。
- **內容面板**：內容都是 SSR 的 HTML，不畫在 canvas 上，所以 SEO 與無障礙不受 3D 影響。
- **作品頁**（`/portfolio/<id>`）：旗艦作品停在它的機器前，其他作品停在紅石工廠；架構圖可以點擊放大。
- **第一人稱模式**（有滑鼠時）：在島上走動、跳躍、飛行和蓋方塊；觸控裝置改用定點環顧與全景建造。
- **平面版**：不支援 WebGL 或偏好減少動態時，改用內容相同的像素風 2D 版面。
- **多語系**：繁體中文（預設）與英文。
- **聯絡表單**：使用 reCAPTCHA v3 驗證，訊息透過 LINE Bot 轉發。

## 技術

- [Nuxt 3](https://nuxt.com/)（SSR）、Vue 3、TypeScript
- [three.js](https://threejs.org/)：浮空島引擎在 `island/`，不依賴 Vue，在瀏覽器端動態載入（[ADR 0003](docs/adr/0003-plain-threejs-engine.md)）
- [@nuxtjs/i18n](https://i18n.nuxtjs.org/)、[@nuxtjs/sitemap](https://nuxtseo.com/sitemap)、[nuxt-umami](https://github.com/ijkml/nuxt-umami)
- 樣式全在 `assets/css/island.css`，不用 CSS 框架（[ADR 0004](docs/adr/0004-single-island-layout-no-tailwind.md)）
- 像素字型：[Cubic 11（俐方體11號）](https://github.com/ACh-K/Cubic-11)，SIL OFL 1.1

## 開發

需要 Node.js 22（見 `.nvmrc`）與 pnpm（版本由 `package.json` 的 `packageManager` 指定，可用 `corepack enable` 啟用）。

```bash
pnpm install
cp .env.example .env   # 填入 reCAPTCHA 與 LINE Bot 金鑰
pnpm dev               # http://localhost:3000
pnpm build             # 輸出到 .output/，以 node .output/server/index.mjs 啟動
```

環境變數：

| 變數 | 用途 |
| --- | --- |
| `SITE_URL` | 網站網址，用於分享預覽與 sitemap |
| `RECAPTCHA_SITE_KEY`、`RECAPTCHA_SECRET_KEY` | 聯絡表單的 reCAPTCHA v3 |
| `LINE_CHANNEL_ACCESS_TOKEN`、`LINE_CHANNEL_SECRET`、`LINE_USER_ID` | 把聯絡表單訊息轉發到 LINE |

## 專案結構

```
island/                 浮空島引擎（three.js）：地形、地標、島民、鏡頭、第一人稱、建造、音效
components/island/      Vue 端：場景掛載、內容面板、快捷欄、HUD
layouts/island.vue      全站唯一的版面
pages/                  各地標的內容面板；portfolio/[id].vue 是作品頁
error.vue               404 與錯誤頁（不載入 3D）
data/projects.ts        作品資料（文字放在 i18n）
i18n/locales/           繁中與英文文案
assets/css/island.css   全站樣式
assets/diagrams/        預先渲染的架構圖 SVG
server/api/             聯絡表單、健康檢查、metrics
scripts/                架構圖與字型子集的產生腳本
```

## 內容維護

- **新增作品**：在 `data/projects.ts` 加一筆，並在兩個語系檔的 `portfolio.items.p<id>` 加上文字。要放進物品欄就加到 `INVENTORY_IDS`，要做成旗艦機器則改 `composables/useIsland.ts` 的 `MACHINE_PROJECTS`。sitemap 會自動列出新作品。
- **架構圖**：Mermaid 原始碼放在 `scripts/diagrams/p<id>.mmd`，執行 `node scripts/render-diagrams.mjs` 產生 SVG（需要本機 Chrome），再到作品資料設 `diagram: true`。
- **新文案用到新字**：重新產生像素字型子集，見 [`public/fonts/README.md`](public/fonts/README.md)。

## 部署

推到 `main` 後，GitHub Actions 建置 Docker 映像並推到 GHCR，Argo CD Image Updater 會把新的 tag 寫進 GitOps 倉庫，再由 Argo CD 部署到 K3s。

## 授權

程式碼採 MIT License。Cubic 11 字型採 SIL Open Font License 1.1（`public/fonts/Cubic-11-OFL.txt`）。
