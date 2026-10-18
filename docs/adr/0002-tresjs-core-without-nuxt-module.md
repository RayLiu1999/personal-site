---
status: superseded by ADR-0003
---

# 在 Nuxt 3 上直接使用 `@tresjs/core`，不裝 `@tresjs/nuxt` 模組

`@tresjs/nuxt` 5.x 依賴 `@nuxt/kit` 4.x，需要 Nuxt 4；本專案目前是 Nuxt 3.17。舊版 `@tresjs/nuxt` 4.0 綁定 core 4.3，之後不會再更新。因此我們直接使用 `@tresjs/core` 5 與 `@tresjs/cientos`（只要求 Vue ≥ 3.5.17），包在只在瀏覽器端執行的元件中。少了模組，只是少了自動匯入與 devtools 整合。

升級 Nuxt 4 是獨立的任務，不和改版綁在一起，出問題時才分得清是哪一邊造成的。升級完成後可以改回官方模組，屆時將本 ADR 標記為 superseded。
