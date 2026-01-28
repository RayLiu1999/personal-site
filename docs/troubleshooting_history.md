# K3s 部署排錯與優化技術全紀錄 (Comprehensive Troubleshooting)

這份文件詳盡記錄了從 Docker 遷移至 K3s 過程中處理過的所有問題、解決方案以及關鍵配置細節。

## 1. 網路與路由層 (Traefik & Ingress)

### [已解決] 重定向迴圈 (ERR_TOO_MANY_REDIRECTS)
* **現象**：存取網站時瀏覽器回報過多跳轉。
* **原因**：Cloudflare 開啟了「Always Use HTTPS」，而 Traefik 內部掛載了 `redirect-to-https` 中間件。
* **解決方案**：移除 Traefik 端的中間件。**教訓**：在邊緣節點（Cloudflare）已處理 SSL 的情況下，內部 Ingress 應保持單純。

### [已解決] 排除安全標頭導致的隱形成 404
* **現象**：網站出現 404，且 `Server` 標頭顯示為 `traefik`。
* **原因**：`secure-headers` 中間件中的 `sslRedirect` 設定為 `true`。Cloudflare Tunnel 透過 HTTP 進入叢集後，Traefik 檢測到非 HTTPS 而拒絕請求。
* **解決方案**：在 `secure-headers` 中明確設定 `sslRedirect: false`。

### [已解決] Ingress 入口點 (EntryPoints) 匹配失敗
* **現象**：Cloudflare Tunnel 連線正常，但 Traefik 給出 404。
* **原因**：`IngressRoute` 限定了 `web` 或 `websecure` 入口，但 Tunnel 的內部流量有時無法正確對上這些標記。
* **解決方案**：放寬 `entryPoints` 限制（註解掉該設定），確保所有進入 Traefik 的流量都能根據 `Host` 匹配路由。

---

## 2. 應用程式層 (Nuxt 3 SSR)

### [已解決] 500 系統錯誤 (blogData.value.slice)
* **現象**：首頁崩潰，Log 顯示程式碼嘗試對非陣列執行 `slice`。
* **原因**：
    1. **內部網路解析**：Nuxt 在 SSR 時試圖存取外部 URL (`https://liu-yucheng.com/api/blog`)，但在 Pod 內部無法繞回外部解析。
    2. **嚴謹度不足**：未對 API 回傳結果進行型別驗證。
* **解決方案**：
    1. 將資料抓取改為**相對路徑** `/api/blog` 或**直連外部 JSON**。
    2. 加入防呆檢查：`if (!blogData.value || !Array.isArray(blogData.value))`。

### [已解決] 埠號 (Port) 與環境變數不一致
* **現象**：Pod 顯示 Running 但健康檢查失敗或 404。
* **原因**：`deployment.yaml` 寫的是 3001，但 `configmap.yaml` 設定為 3002，導致 Service 轉發失敗。
* **解決方案**：統一將內部埠號鎖定為 **3002**。

### [已解決] 圖片網址路徑錯誤
* **現象**：圖片網址變為 `your-domain.com` 預設值。
* **解決方案**：在 ConfigMap 加入 **`NUXT_PUBLIC_`** 前綴 (如 `NUXT_PUBLIC_BLOG_URL`)，這是支援 Nuxt 3 Runtime Config 覆寫的必要名稱。

---

## 3. GitOps 與 ArgoCD 運作優化

### [已解決] ArgoCD 無法生成 API Key
* **現象**：GitHub Actions 或 CLI 需要 Token，但 `admin` 帳號沒有 `apiKey` 權限。
* **解決方案**：修改 `argocd-cm` ConfigMap，為 `admin` 加上 `apiKey, login` 權限。
    ```bash
    kubectl patch configmap argocd-cm -n argocd --type merge -p '{"data": {"accounts.admin": "apiKey, login"}}'
    ```

### [產已解決] ArgoCD 同步延時優化
* **現象**：修改 Git 後要等很久才同步。
* **解決方案**：修改 `argocd-cm` 設定 `timeout.reconciliation: 60s` (預設為 3 分鐘)，加速自動同步頻率。

### [已解決] Middleware OutOfSync 錯誤
* **現象**：`real-ip` 中間件與 Git 內容不符。
* **原因**：填寫了無效欄位（如 `forwardedHeaders`），這些不在 Middleware 的 Schema 內。
* **解決方案**：直接移除該無效 Middleware，改由 Kustomize 進行標準化管理。

---

## 4. 映像檔與部署更新機制

### [已解決] 修改代碼但網站沒變
* **原因**：使用 `:latest` 標籤且雖然 ImagePullPolicy 為 Always，但 K8s 沒偵測到 YAML 變化因此未重啟 Pod。
* **解決方案**：導入 **Kustomize**。由 CI 自動修改 `kustomization.yaml` 裡的特定版本號並提交回 Git，由 ArgoCD 偵測到「YAML 實質變動」來觸發自動更新。

### [已鎖定] K8s 節點調調度 (Node Affinity)
* **需求**：專案必須部署在特定的 VPS 節點 (VPS2)。
* **解決方案**：在 `deployment.yaml` 加入 `nodeSelector: kubernetes.io/hostname: vps-670f31cd`。

---

## 5. 安全與架構優化 (Security Improvements)

### [已優化] 移除不安全的「Push-based」部署
* **做法**：刪除了原本透過 SSH 遠端執行 `kubectl apply` 的 `deploy-k8s.yml`。
* **原因**：避免在 CI 中暴露 K8s Secret 或 SSH Key，切換到 ArgoCD 的 Pull-based 模式更符合資安規範。

### [已配置] GitHub Actions 權限調整
* **問題**：CI 執行時報錯無法推送 `kustomization.yaml`。
* **解決方案**：將 `workflow` 的 `permissions` 設定為 `contents: write`，配合 Kustomize 實作自動寫回機制。

---

## 6. 進階架構優化 (Advanced Refactoring)

### [已導入] Kustomize Base/Overlays 結構
* **做法**：將 K8s 配置拆分為 `base/` (通用資源) 與 `overlays/prod/` (環境差異)。
* **優點**：
    1. 實現環境隔離 (Dev/Prod)。
    2. `deployment.yaml` 保持為純淨模板，標籤變動完全由 `kustomization.yaml` 管理。
    3. 方便 CI 透過 `kustomize edit set image` 自動更新版本。

### [已導入] Makefile 祕鑰自動化流程
* **做法**：建立 `Makefile` 並實作 `seal-prod` 指令。
* **優點**：簡化 `kubeseal` 複雜指令，確保祕鑰加密流程精確且可重複。配合 `sealed-secrets-pub.pem` 可實現安全地離線加密。

### [已修正] Git 追蹤策略 (gitignore)
* **做法**：從 `.gitignore` 移除 `/docs` 的排除。
* **原因**：確保技術手冊 (如本文件) 能併入版本控制，實現「文件即代碼」(Documentation as Code)。

---

## 7. 指令速查
* **自動加密祕鑰**：`make seal-prod` (使用公鑰將 `k8s/secret.yaml` 轉為 `sealed-secret.yaml`)
* **強制重新佈署**：`kubectl rollout restart deployment personal-site`
* **查看即時 Log**：`kubectl logs -f deployment/personal-site`
* **檢查解密後的 Secrets**：`kubectl get secrets personal-site-secret -o json`
