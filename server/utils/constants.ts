export const CONTACT_FORM_LIMITS = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  SUBJECT_MIN_LENGTH: 5,
  SUBJECT_MAX_LENGTH: 100,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 1000
} as const

export const API_MESSAGES = {
  SUCCESS: '訊息已成功發送！感謝您的聯絡，我會盡快回覆。',
  VALIDATION_ERROR: '請修正表單中的錯誤',
  SERVER_ERROR: '系統暫時無法處理您的請求，請稍後再試',
  RATE_LIMIT: '請求過於頻繁，請稍後再試'
} as const

export const CONTACT_INFO = {
  EMAIL: 'rayliu219@gmail.com',
  RESPONSE_TIME: '通常在 24 小時內回覆',
  AVAILABILITY: [
    '全端 Web 應用開發',
    'API 設計與後端服務',
    '系統架構諮詢',
    '技術指導與 Code Review'
  ]
} as const

export const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'

export const RECAPTCHA_ERROR_CODES = {
  'missing-input-secret': 'reCAPTCHA 設定錯誤：缺少密鑰',
  'invalid-input-secret': 'reCAPTCHA 設定錯誤：密鑰無效',
  'missing-input-response': 'reCAPTCHA 驗證失敗：缺少驗證碼',
  'invalid-input-response': 'reCAPTCHA 驗證失敗：驗證碼無效或已過期',
  'bad-request': 'reCAPTCHA 請求格式錯誤',
  'timeout-or-duplicate': 'reCAPTCHA 驗證超時或重複提交',
  'unknown-error': 'reCAPTCHA 驗證發生未知錯誤'
} as const