export interface ErrorInfo {
  statusCode: number
  statusMessage: string
  data?: any
}

export function parseError(error: unknown): ErrorInfo {
  // Nuxt createError 生成的錯誤
  if (error && typeof error === 'object') {
    const errorObj = error as any
    
    if ('statusCode' in errorObj && 'statusMessage' in errorObj) {
      return {
        statusCode: typeof errorObj.statusCode === 'number' ? errorObj.statusCode : 500,
        statusMessage: typeof errorObj.statusMessage === 'string' ? errorObj.statusMessage : '系統暫時無法處理您的請求，請稍後再試',
        data: errorObj.data
      }
    }
  }
  
  // 標準 Error 對象
  if (error instanceof Error) {
    return {
      statusCode: 500,
      statusMessage: error.message || '系統暫時無法處理您的請求，請稍後再試'
    }
  }
  
  // 字串錯誤
  if (typeof error === 'string') {
    return {
      statusCode: 500,
      statusMessage: error || '系統暫時無法處理您的請求，請稍後再試'
    }
  }
  
  // 未知錯誤
  return {
    statusCode: 500,
    statusMessage: '系統暫時無法處理您的請求，請稍後再試'
  }
}

export function handleApiError(error: unknown, defaultMessage?: string): never {
  const errorInfo = parseError(error)
  
  if (defaultMessage && errorInfo.statusCode === 500) {
    errorInfo.statusMessage = defaultMessage
  }
  
  throw createError(errorInfo)
}