import { useEffect, useRef, useState } from 'react'
import { getMessages } from '../api/chat'
import type { ChatMessage } from '../api/types'
import { TopBar } from '../components/ui'
import { Icon } from '../components/Icon'

/** 02 统一聊天记录（递进页：从陪伴主页进入，主页不再直接展示对话） */
export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [muted, setMuted] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getMessages().then(setMessages)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

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
        <div className="chat-hint">
          交流记录会持续保留<br />也可以直接叫“小伴”继续聊
        </div>
      </div>
    </div>
  )
}
