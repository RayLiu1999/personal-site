import { validateContactForm } from '~/utils/validation'
import { createLineNotificationService } from '../utils/line'
import { getClientIP } from '../utils/common'
import { handleApiError } from '../utils/error'
import { verifyRecaptcha } from '../utils/recaptcha'

export default defineEventHandler(async (event) => {
  try {
    // 解析請求資料
    const body = await readBody(event)
    const clientIP = getClientIP(event)
    
    // reCAPTCHA 驗證
    if (body.recaptchaToken) {
      console.log('開始 reCAPTCHA 驗證')
      const recaptchaResult = await verifyRecaptcha(body.recaptchaToken, clientIP)
      
      if (!recaptchaResult.isValid) {
        console.error('reCAPTCHA 驗證失敗:', recaptchaResult.message)
        throw createError({
          statusCode: 400,
          statusMessage: 'reCAPTCHA 驗證失敗',
          data: { 
            error: 'recaptcha_failed',
            message: recaptchaResult.message,
            errorCode: recaptchaResult.errorCode
          }
        })
      }
      
      console.log('reCAPTCHA 驗證成功')
    } else {
      console.warn('未提供 reCAPTCHA token，跳過驗證')
    }
    
    // 資料驗證
    const validation = validateContactForm(body)
    if (!validation.isValid) {
      throw createError({
        statusCode: 400,
        statusMessage: validation.message,
        data: { errors: validation.errors }
      })
    }

    const { name, email, subject, message } = body
    const timestamp = new Date().toLocaleString('zh-TW', {
      timeZone: 'Asia/Taipei',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    
    // 記錄聯絡請求
    console.log('聯絡表單提交:', {
      name,
      email,
      subject,
      timestamp,
      ip: clientIP
    })
    
    // 準備 LINE 通知資料
    const contactData = {
      name,
      email,
      subject,
      message,
      timestamp,
      ip: clientIP
    }
    
    // 發送 LINE 通知
    const lineService = createLineNotificationService()
    if (lineService) {
      try {
        // 優先使用 Rich Message
        await lineService.sendRichContactNotification(contactData)
      } catch (lineError) {
        console.error('LINE 通知發送失敗:', lineError)
        throw createError({
          statusCode: 500,
          statusMessage: 'LINE 通知發送失敗',
          data: { error: 'line_notification_failed', message: '無法發送 LINE 通知' }
        })
      }
    }
    
    // 模擬處理時間
    await new Promise(resolve => setTimeout(resolve, 800))
    
    return {
      success: true,
      message: '訊息已成功發送！感謝您的聯絡，我會盡快回覆。',
      data: {
        id: `msg_${Date.now()}`,
        timestamp: new Date().toISOString()
      }
    }
    
  } catch (error) {
    console.error('聯絡表單錯誤:', error)

    handleApiError(error, '系統暫時無法處理您的請求，請稍後再試')
  }
})