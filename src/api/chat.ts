import { registerMock, request } from './client'
import { db } from './db'
import type { ChatMessage } from './types'

registerMock('GET', '/chat/messages', () => db.chat.messages)
registerMock('GET', '/chat/latest', () => db.chat.messages[db.chat.messages.length - 1] ?? null)
registerMock('GET', '/chat/suggestions', () => db.chat.suggestions)
registerMock('POST', '/chat/messages', (body) => {
  const { text } = (body ?? {}) as { text: string }
  const msg: ChatMessage = { id: `m${db.chat.seq++}`, role: 'user', text, createdAt: Date.now() }
  db.chat.messages.push(msg)
  return msg
})
registerMock('POST', '/chat/messages/assistant', (body) => {
  const { text } = (body ?? {}) as { text: string }
  const msg: ChatMessage = { id: `m${db.chat.seq++}`, role: 'assistant', text, audio: true, createdAt: Date.now() }
  db.chat.messages.push(msg)
  return msg
})

/** 消息列表 */
export function getMessages(): Promise<ChatMessage[]> {
  return request('GET', '/chat/messages')
}

/** 最近一条交流（陪伴主页「最近的交流」预览） */
export function getLatestMessage(): Promise<ChatMessage | null> {
  return request('GET', '/chat/latest')
}

/** 推荐话术 */
export function getSuggestions(): Promise<string[]> {
  return request('GET', '/chat/suggestions')
}

/** 发送用户消息（语音转写文本） */
export function sendMessage(text: string): Promise<ChatMessage> {
  return request('POST', '/chat/messages', { text })
}

/** 推送一条小伴回复（真实后端为流式推送，此处预留一次性返回） */
export function pushAssistantReply(text: string): Promise<ChatMessage> {
  return request('POST', '/chat/messages/assistant', { text })
}

/** 预置的示例回复（接入 LLM 服务后由后端生成） */
export const SAMPLE_REPLIES: Record<string, string> = {
  '今天天气怎么样？': '今天晴，26°C，微风，很适合出门走走。',
  '我想念孙女': '念念上周还给您打了电话呢。要不要听听她以前的语音留言？',
  '我们去散步吧？': '好啊，散步听起来很舒服。',
}
export const FALLBACK_REPLY = '嗯，我在听。您接着说。'
