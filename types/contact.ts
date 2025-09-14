export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
  recaptchaToken?: string
}

export interface ContactResponse {
  success: boolean
  message: string
  data?: {
    id: string
    timestamp: string
  }
}

export interface ContactError {
  statusCode: number
  statusMessage: string
}

export interface ValidationResult {
  isValid: boolean
  message: string
  errors?: Record<string, string>
}

export interface EmailNotification {
  from: string
  name: string
  subject: string
  message: string
}