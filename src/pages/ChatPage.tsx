import { useEffect, useRef, useState } from 'react'
import { getMessages, pushAssistantReply, sendMessage, sendTextTurnOnline } from '../api/chat'
import { isHapicOnline } from '../api/hapic'
import { FALLBACK_REPLY, SAMPLE_REPLIES } from '../api/chat'
import type { ChatMessage } from '../api/types'
import { TopBar } from '../components/ui'
import { Icon } from '../components/Icon'

/** 02 统一聊天记录（递进页：从陪伴主页进入；HAPIC 在线时为真实对话） */
export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [muted, setMuted] = useState(false)
  const [online, setOnline] = useState<boolean | null>(null)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getMessages().then(setMessages)
    isHapicOnline().then(setOnline)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  async function send() {
    const text = input.trim()
    if (!text || sending) return
    setSending(true)
    try {
      const reply = await sendTextTurnOnline(text)
      if (reply != null) {
        // 真实服务：重新拉取会话历史（含双方消息）
        setMessages(await getMessages())
      } else {
        // 本地演示：用户消息 + 示例回复
        const userMsg = await sendMessage(text)
        const replyText = SAMPLE_REPLIES[text] ?? FALLBACK_REPLY
        const aiMsg = await pushAssistantReply(replyText)
        setMessages((prev) => [...prev, userMsg, aiMsg])
      }
      setInput('')
    } finally {
      setSending(false)
    }
  }

  const now = new Date()

  return (
    <div className="page">
      <TopBar
        title="与小伴的交流"
        backTo="/"
        right={(
          <button
            className="back-pill t-orange"
            style={muted ? { opacity: 0.55 } : undefined}
            onClick={() => setMuted((m) => !m)}
            aria-label="语音开关"
          >
            <Icon name="speaker" size={14} strokeWidth={2} /> 声音
          </button>
        )}
      />
      <div className="page-body">
        <div className="chathd-date">今天 · {String(now.getHours()).padStart(2, '0')}:{String(now.getMinutes()).padStart(2, '0')}</div>
        <div className="chat-scroll" ref={scrollRef}>
          {messages.map((m) => m.role === 'assistant' ? (
            <div key={m.id} className="bubble-ai">
              <span className="chat-ai-avatar" style={{ marginTop: 2 }}>
                <Icon name="family" size={16} strokeWidth={0} filled />
              </span>
              <span className="bubble-ai-body">
                {m.text}
                {m.tag && <span className="bubble-tag">{m.tag}</span>}
              </span>
            </div>
          ) : (
            <div key={m.id} className="bubble-user">{m.text}</div>
          ))}
        </div>
        <div className={`chat-link${online ? ' on' : ''}`}>
          {online == null ? '正在检测语音服务…' : online ? '语音服务已连接 · 小伴实时回复' : '语音服务未连接 · 本地演示模式'}
        </div>
        <div className="chat-inputbar">
          <input
            className="chat-input"
            value={input}
            placeholder="打字和小伴说话…"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') void send() }}
          />
          <button className="btn btn-primary chat-send" disabled={sending || !input.trim()} onClick={() => void send()}>
            发送
          </button>
        </div>
      </div>
    </div>
  )
}
