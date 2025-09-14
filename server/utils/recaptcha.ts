import { RECAPTCHA_VERIFY_URL, RECAPTCHA_ERROR_CODES } from './constants'

export interface RecaptchaVerifyRequest {
  secret: string
  response: string
  remoteip?: string
}

export interface RecaptchaVerifyResponse {
  success: boolean
  challenge_ts?: string
  hostname?: string
  'error-codes'?: string[]
  score?: number
  action?: string
}

export interface RecaptchaValidationResult {
  isValid: boolean
  message: string
  errorCode?: string
}

/**
 * 建立 reCAPTCHA 驗證服務
 */
export function createRecaptchaVerificationService() {
  const runtimeConfig = useRuntimeConfig()
  const secretKey = runtimeConfig.private.recaptchaSecretKey

  if (!secretKey) {
    console.error('reCAPTCHA Secret Key 未設定')
    return null
  }

  return {
    /**
     * 驗證 reCAPTCHA token
     * @param token - reCAPTCHA 回應 token
     * @param clientIP - 客戶端 IP 地址（可選）
     * @returns 驗證結果
     */
    async verifyToken(token: string, clientIP?: string): Promise<RecaptchaValidationResult> {
      try {
        if (!token || token.trim() === '') {
          return {
            isValid: false,
            message: 'reCAPTCHA token 不能為空',
            errorCode: 'missing-input-response'
          }
        }

        // 構建請求參數
        const verifyData: RecaptchaVerifyRequest = {
          secret: secretKey,
          response: token
        }

        // 如果有客戶端 IP，加入驗證
        if (clientIP) {
          verifyData.remoteip = clientIP
        }

        // 發送驗證請求到 Google reCAPTCHA API
        const verifyUrl = new URL(RECAPTCHA_VERIFY_URL)
        const formData = new URLSearchParams()
        
        Object.entries(verifyData).forEach(([key, value]) => {
          if (value) {
            formData.append(key, value)
          }
        })

        console.log('發送 reCAPTCHA 驗證請求:', {
          url: verifyUrl.toString(),
          hasToken: !!token,
          hasIP: !!clientIP
        })

        const response = await fetch(verifyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formData
        })

        if (!response.ok) {
          throw new Error(`reCAPTCHA API 請求失敗: ${response.status} ${response.statusText}`)
        }

        const result: RecaptchaVerifyResponse = await response.json()

        console.log('reCAPTCHA 驗證結果:', {
          success: result.success,
          hostname: result.hostname,
          errorCodes: result['error-codes']
        })

        // 檢查驗證結果
        if (result.success) {
          return {
            isValid: true,
            message: 'reCAPTCHA 驗證成功'
          }
        } else {
          const errorCodes = result['error-codes'] || []
          const errorCode = errorCodes[0] || 'unknown-error'
          const errorMessage = getRecaptchaErrorMessage(errorCode)

          return {
            isValid: false,
            message: errorMessage,
            errorCode
          }
        }

      } catch (error) {
        console.error('reCAPTCHA 驗證錯誤:', error)
        
        return {
          isValid: false,
          message: 'reCAPTCHA 驗證過程發生錯誤，請稍後再試',
          errorCode: 'verification-failed'
        }
      }
    },

    /**
     * 檢查 reCAPTCHA 服務是否可用
     */
    isAvailable(): boolean {
      return !!secretKey
    }
  }
}

/**
 * 根據 reCAPTCHA 錯誤代碼返回友善的錯誤訊息
 */
function getRecaptchaErrorMessage(errorCode: string): string {
  const errorMessages: Record<string, string> = {
    'missing-input-secret': 'reCAPTCHA 設定錯誤：缺少密鑰',
    'invalid-input-secret': 'reCAPTCHA 設定錯誤：密鑰無效',
    'missing-input-response': 'reCAPTCHA 驗證失敗：缺少驗證碼',
    'invalid-input-response': 'reCAPTCHA 驗證失敗：驗證碼無效或已過期',
    'bad-request': 'reCAPTCHA 請求格式錯誤',
    'timeout-or-duplicate': 'reCAPTCHA 驗證超時或重複提交',
    'unknown-error': 'reCAPTCHA 驗證發生未知錯誤'
  }

  return errorMessages[errorCode] || `reCAPTCHA 驗證失敗 (${errorCode})`
}

/**
 * 驗證 reCAPTCHA token 的便捷函數
 * @param token - reCAPTCHA 回應 token
 * @param clientIP - 客戶端 IP 地址（可選）
 * @returns 驗證結果
 */
export async function verifyRecaptcha(token: string, clientIP?: string): Promise<RecaptchaValidationResult> {
  const recaptchaService = createRecaptchaVerificationService()
  
  if (!recaptchaService) {
    return {
      isValid: false,
      message: 'reCAPTCHA 服務未正確設定',
      errorCode: 'service-unavailable'
    }
  }

  return await recaptchaService.verifyToken(token, clientIP)
}