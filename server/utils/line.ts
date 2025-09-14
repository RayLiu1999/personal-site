import {
  messagingApi,
} from '@line/bot-sdk'

// 介面定義維持不變
interface LineNotificationConfig {
  channelAccessToken: string
  channelSecret: string // channelSecret 在 pushMessage 中其實用不到，但保留彈性
  userId: string
}

interface ContactMessage {
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
  ip?: string
}

export class LineNotificationService {
  // 1. ✅ client 的型別改為新版的 MessagingApiClient
  private client: messagingApi.MessagingApiClient
  private userId: string

  constructor(config: LineNotificationConfig) {
    // 2. ✅ 使用新版的方式建立 client
    this.client = new messagingApi.MessagingApiClient({
      channelAccessToken: config.channelAccessToken
    })
    this.userId = config.userId
  }

  async sendContactNotification(contactData: ContactMessage): Promise<void> {
    try {
      const messageContent = this.formatContactMessage(contactData)

      // 3. ✅ 將字串包裝成 TextMessage 物件
      const message: messagingApi.TextMessage = {
        type: 'text',
        text: messageContent
      }

      // 4. ✅ 使用新版 pushMessage 的參數格式 { to, messages }
      await this.client.pushMessage({
        to: this.userId,
        messages: [message] // messages 必須是陣列
      })

      console.log('LINE 通知發送成功')
    } catch (error: any) {
      // 加上更詳細的錯誤日誌
      console.error('LINE 通知發送失敗:', error.originalError?.response.data || error)
      throw new Error('LINE 通知發送失敗')
    }
  }

  async sendRichContactNotification(contactData: ContactMessage): Promise<void> {
    try {
      // 為了型別安全，將 Flex Message 物件賦予型別
      const flexMessage: messagingApi.FlexMessage = {
        type: 'flex',
        altText: `新的聯絡表單訊息來自 ${contactData.name}`,
        contents: {
          type: 'bubble',
          // ... (Flex Message 的內容結構不變) ...
          header: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: '🔔 新的聯絡表單',
                weight: 'bold',
                color: '#1DB446',
                size: 'md'
              }
            ],
            backgroundColor: '#F0F8FF'
          },
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'box',
                layout: 'baseline',
                contents: [
                  {
                    type: 'text',
                    text: '👤 姓名:',
                    weight: 'bold',
                    color: '#666666',
                    flex: 2
                  },
                  {
                    type: 'text',
                    text: contactData.name,
                    flex: 5,
                    wrap: true
                  }
                ],
                margin: 'md'
              },
              {
                type: 'box',
                layout: 'baseline',
                contents: [
                  {
                    type: 'text',
                    text: '📧 信箱:',
                    weight: 'bold',
                    color: '#666666',
                    flex: 2
                  },
                  {
                    type: 'text',
                    text: contactData.email,
                    flex: 5,
                    wrap: true,
                    color: '#0084FF'
                  }
                ],
                margin: 'md'
              },
              {
                type: 'box',
                layout: 'baseline',
                contents: [
                  {
                    type: 'text',
                    text: '📝 主旨:',
                    weight: 'bold',
                    color: '#666666',
                    flex: 2
                  },
                  {
                    type: 'text',
                    text: contactData.subject,
                    flex: 5,
                    wrap: true
                  }
                ],
                margin: 'md'
              },
              {
                type: 'separator',
                margin: 'md'
              },
              {
                type: 'text',
                text: '💬 訊息內容:',
                weight: 'bold',
                color: '#666666',
                margin: 'md'
              },
              {
                type: 'text',
                text: contactData.message,
                wrap: true,
                margin: 'sm',
                color: '#333333'
              }
            ]
          },
          footer: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: `⏰ ${contactData.timestamp}`,
                size: 'xs',
                color: '#999999',
                align: 'center'
              }
            ]
          }
        }
      }

      // ✅ 同樣使用新版 pushMessage 的參數格式
      await this.client.pushMessage({
        to: this.userId,
        messages: [flexMessage]
      })

      console.log('LINE Rich 通知發送成功')
    } catch (error: any) {
      console.error('LINE Rich 通知發送失敗:', error.originalError?.response.data || error)
      // 降級到簡單文字訊息
      console.log('嘗試降級傳送純文字訊息...')
      await this.sendContactNotification(contactData)
    }
  }

  private formatContactMessage(contactData: ContactMessage): string {
    return `🔔 新的聯絡表單訊息

👤 姓名: ${contactData.name}
📧 電子郵件: ${contactData.email}
📝 主旨: ${contactData.subject}

💬 訊息內容:
${contactData.message}

⏰ 接收時間: ${contactData.timestamp}
🌍 IP 地址: ${contactData.ip || '未知'}`
  }
}

// 這個工廠函數的邏輯是正確的，不需要修改
// 它會與上面修改好的 Class 正常協作
export function createLineNotificationService(): LineNotificationService | null {
  const config = useRuntimeConfig()
  const privateConfig = config.private || {}
  
  const {
    lineChannelAccessToken,
    lineChannelSecret,
    lineUserId
  } = privateConfig

  if (!lineChannelAccessToken || !lineChannelSecret || !lineUserId) {
    console.warn('LINE 設定不完整，跳過 LINE 通知')
    return null
  }

  return new LineNotificationService({
    channelAccessToken: lineChannelAccessToken as string,
    channelSecret: lineChannelSecret as string,
    userId: lineUserId as string
  })
}