export * from './contact'
// export * from './api'

// 其他通用型別
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}