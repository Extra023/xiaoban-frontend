import { useEffect, useRef, useState } from 'react'
import { getMessages, pushAssistantReply, sendMessage, sendTextTurnOnline } from '../api/chat'
import { isHapicOnline } from '../api/hapic'
import { FALLBACK_REPLY, SAMPLE_REPLIES } from '../api/chat'
import { isSpeechInputSupported, startSpeechSession } from '../audio/speechInput'
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
  const [listening, setListening] = useState(false)
  const [voiceHint, setVoiceHint] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const stopSpeechRef = useRef<(() => void) | null>(null)
  const hintTimerRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    getMessages().then(setMessages)
    isHapicOnline().then(setOnline)
    return () => {
      stopSpeechRef.current?.()
      window.clearTimeout(hintTimerRef.current)
    }
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  function showVoiceHint(text: string, ms = 4000) {
    setVoiceHint(text)
    window.clearTimeout(hintTimerRef.current)
    hintTimerRef.current = window.setTimeout(() => setVoiceHint(null), ms)
  }

  function toggleListen() {
    if (listening) {
      stopSpeechRef.current?.()
      stopSpeechRef.current = null
      setListening(false)
      return
    }
    if (!isSpeechInputSupported()) {
      showVoiceHint('当前浏览器不支持语音输入，请打字')
      return
    }
    setListening(true)
    showVoiceHint('正在聆听，请说话…', 60000)
    stopSpeechRef.current = startSpeechSession({
      onInterim: (text) => setInput(text),
      onFinal: (text) => {
        setInput(text)
        void send(text)
      },
      onError: (message) => showVoiceHint(message),
      onEnd: () => {
        setListening(false)
        stopSpeechRef.current = null
        setVoiceHint((h) => (h === '正在聆听，请说话…' ? null : h))
      },
    })
  }

  async function send(override?: string) {
    const text = (override ?? input).trim()
    if (!text || sending) return
    setSending(true)
    try {
      let reply: string | null = null
      let failed = false
      try {
        reply = await sendTextTurnOnline(text)
      } catch {
        failed = true
      }
      if (reply != null) {
        // 真实服务：重新拉取会话历史（含双方消息）
        setMessages(await getMessages())
      } else if (!failed) {
        // 本地演示：用户消息 + 示例回复
        const userMsg = await sendMessage(text)
        const replyText = SAMPLE_REPLIES[text] ?? FALLBACK_REPLY
        const aiMsg = await pushAssistantReply(replyText)
        setMessages((prev) => [...prev, userMsg, aiMsg])
      } else {
        // 服务在线但本轮失败（如模型暂不可用）：提示重说
        const userMsg = await sendMessage(text)
        const aiMsg = await pushAssistantReply('小伴这会儿有点没听清，请再说一次。')
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
        <div className={`chat-link${online ? ' on' : ''}${voiceHint ? ' hint' : ''}`}>
          {voiceHint ?? (online == null ? '正在检测语音服务…' : online ? '语音服务已连接 · 小伴实时回复' : '语音服务未连接 · 本地演示模式')}
        </div>
        <div className="chat-inputbar">
          <button
            className={`chat-mic${listening ? ' listening' : ''}`}
            onClick={toggleListen}
            aria-label={listening ? '停止语音输入' : '语音输入'}
            aria-pressed={listening}
          >
            <Icon name="mic" size={22} strokeWidth={2} />
          </button>
          <input
            className="chat-input"
            value={input}
            placeholder={listening ? '正在聆听，请说话…' : '打字或点麦克风和小伴说话…'}
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
