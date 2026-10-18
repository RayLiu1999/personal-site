# 浮空島直接用 three.js 寫成命令式引擎，不用 TresJS

取代 [ADR 0002](0002-tresjs-core-without-nuxt-module.md)。

做完原型後才發現，浮空島幾乎沒有適合寫成宣告式元件的部分：
- 地形是程式產生的數千個方塊，必須用 InstancedMesh 逐一寫入矩陣。
- 開場、機器、島民、礦車都在同一個每幀迴圈裡更新。
- 鏡頭要自己處理面板偏移（`setViewOffset`）和第一人稱的視角融合。

改用 TresJS 的話，這些都得包進 `<primitive>` 和 `useLoop`，多一層抽象卻換不到好處，還要配合它的鏡頭與 render loop 規則。所以引擎放在 `island/`，是一組不依賴 Vue 的 three.js 模組，由 `components/island/IslandScene.client.vue` 在瀏覽器端用動態 import 載入，透過回呼通知 Vue 換頁與狀態變化。Vue 只負責 HTML：內容面板、快捷欄、HUD。

## Consequences

- three.js 只在瀏覽器端、文字面板渲染完之後才下載，不會拖慢首屏文字。
- 之後的後製特效（P2）用 three 官方的 `EffectComposer`；建造模式（P4）用 three 的 `Raycaster` 對 InstancedMesh 取方塊與面。兩者都不需要 TresJS。
- 升級 Nuxt 4 時不必再回頭評估 `@tresjs/nuxt`。
