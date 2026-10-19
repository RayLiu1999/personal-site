# 整站只用浮空島一套版面，不用 Tailwind

取代 [ADR 0001](0001-island-as-navigation-with-html-panels.md) 中「`/portfolio/[id]` 與 `/privacy-policy` 維持一般 2D 頁面」的部分。

改版後還會被訪問到的舊頁面只剩作品頁和隱私權政策。保留舊的 2D 版面，代表要同時維護兩套導覽、兩套深色模式、兩套樣式，而且訪客從浮空島點進作品頁時，風格會整個斷掉。所以這兩頁也改成浮空島的子頁：鏡頭停在它所屬的地標或旗艦機器，內容放進內容面板，返回時回到該地標。錯誤頁則是唯一不渲染 3D 的頁面，用同一套像素 GUI 樣式，確保永遠載得出來。

舊版面拿掉之後，Tailwind 只剩一個用途：它的 preflight（全域 reset）。浮空島的樣式全寫在 `assets/css/island.css`，沒有用到任何 utility class，但 Tailwind 每頁仍內嵌約 18 KB 的基底樣式，還多一個建構步驟和設定檔。因此改成在 `island.css` 開頭放一小段 reset，只保留浮空島樣式依賴的那幾條 preflight 規則。

## Considered Options

- **作品頁保留 2D 版面，只換配色**：兩套版面仍要分開維護，從 3D 進入 2D 的斷裂感也還在。
- **保留 Tailwind，之後新元件用 utility class 寫**：等於同時有兩種樣式寫法；浮空島的 GUI 樣式（像素邊框、內陰影）用 utility 寫反而更長。

## Consequences

- 新頁面一律用 `island` layout，並在 page meta 標上 `landmark`；掛在地標底下的頁面再加上 `subpage: true`，關閉面板與 Esc 就會回到該地標。
- `island.css` 是全站唯一的樣式表（`island` layout 與 `error.vue` 以 `<style src>` 引入，讓 SSR 內嵌、不會先閃出無樣式的畫面），開頭的 reset 會影響所有元素。
- 移除 Tailwind 前後逐頁截圖比對（平面版全頁，加上 3D 模式的內容面板、HUD 與快捷欄），畫面沒有差異。
