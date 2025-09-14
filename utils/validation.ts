import type { ContactForm, ValidationResult } from '~/types/contact'

export function validateContactForm(data: Partial<ContactForm>): ValidationResult {
  const errors: Record<string, string> = {}
  
  // 姓名驗證
  if (!data.name?.trim()) {
    errors.name = '請輸入您的姓名'
  } else if (data.name.trim().length < 2) {
    errors.name = '姓名至少需要 2 個字元'
  } else if (data.name.trim().length > 50) {
    errors.name = '姓名不能超過 50 個字元'
  }
  
  // 電子郵件驗證
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email?.trim()) {
    errors.email = '請輸入您的電子郵件'
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = '請輸入有效的電子郵件地址'
  }
  
  // 主旨驗證
  if (!data.subject?.trim()) {
    errors.subject = '請輸入訊息主旨'
  } else if (data.subject.trim().length < 5) {
    errors.subject = '主旨至少需要 5 個字元'
  } else if (data.subject.trim().length > 100) {
    errors.subject = '主旨不能超過 100 個字元'
  }
  
  // 訊息驗證
  if (!data.message?.trim()) {
    errors.message = '請輸入您的訊息'
  } else if (data.message.trim().length < 10) {
    errors.message = '訊息至少需要 10 個字元'
  } else if (data.message.trim().length > 1000) {
    errors.message = '訊息不能超過 1000 個字元'
  }

  // reCAPTCHA token 驗證（前端基本驗證）
  // 注意：實際的 reCAPTCHA 驗證在後端進行
  if (process.client && data.recaptchaToken !== undefined && !data.recaptchaToken?.trim()) {
    errors.recaptcha = '請完成 reCAPTCHA 驗證'
  }
  
  const hasErrors = Object.keys(errors).length > 0
  
  return {
    isValid: !hasErrors,
    message: hasErrors ? '請修正表單中的錯誤' : '驗證通過',
    errors: hasErrors ? errors : undefined
  }
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}