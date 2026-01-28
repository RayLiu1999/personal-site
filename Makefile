# 變數定義
CERT = k8s/sealed-secrets-pub.pem
SECRET_SRC = k8s/secret.yaml
SEALED_PROD = k8s/overlays/prod/sealed-secret.yaml

.PHONY: help fetch-cert seal-prod

help:
	@echo "K8s 祕鑰管理指令："
	@echo "  make fetch-cert  - 從叢集獲取 Sealed Secrets 公鑰 (需設定 KUBECONFIG)"
	@echo "  make seal-prod   - 使用公鑰加密 k8s/secret.yaml 並產出 prod 的 sealed-secret.yaml"

# 獲取公鑰 (如果您已經手動執行過，這只是備份)
fetch-cert:
	kubeseal --fetch-cert > $(CERT)
	@echo "公鑰已更新: $(CERT)"

# 加密正式環境秘密
# 注意：這裡會自動找對應的公鑰進行離線加密，安全性最高
seal-prod: $(SECRET_SRC) $(CERT)
	@echo "正在加密 $(SECRET_SRC) -> $(SEALED_PROD)..."
	kubeseal --format=yaml --cert=$(CERT) < $(SECRET_SRC) > $(SEALED_PROD)
	@echo "加密完成！現在您可以放心地提交 $(SEALED_PROD) 至 Git。"

# 防止誤將未加密的 secret.yaml 提交 (輔助檢查)
check-git-safety:
	@if git status | grep -q "k8s/secret.yaml"; then \
		echo "警告：發現未加密的 secret.yaml 在 Git 追蹤範圍內，請確保它已被列入 .gitignore！"; \
	fi
