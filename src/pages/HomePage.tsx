import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getHomeState, setStandby } from '../api/home'
import { getLatestMessage } from '../api/chat'
import { Icon } from '../components/Icon'
import type { ChatMessage, HomeState } from '../api/types'

/**
 * 01 陪伴主页（语音模块 · 新范式：唤醒词 + 常态待机监测）
 * 不再有「开始说话 / 说完了」流程；语音开关只切换待机/聆听状态。
 * 聊天记录降级为递进页（查看聊天记录进入）。
 */
export default function HomePage() {
  const navigate = useNavigate()
  const [state, setState] = useState<HomeState | null>(null)
  const [latest, setLatest] = useState<ChatMessage | null>(null)
  const [hearing, setHearing] = useState(false)
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    getHomeState().then(setState)
    getLatestMessage().then(setLatest)
    return () => window.clearTimeout(timerRef.current)
  }, [])

  /** 语音开关：安静待命 ↔ 正在聆听（模拟唤醒词触发，数秒后自动回待命） */
  function toggleVoice() {
    if (hearing) {
      window.clearTimeout(timerRef.current)
      setHearing(false)
      void setStandby(true)
      return
    }
    setHearing(true)
    void setStandby(false)
    timerRef.current = window.setTimeout(() => setHearing(false), 5000)
  }

  const weather = state?.weather ?? { text: '晴', temp: 26 }

  return (
    <div className="page">
      <div className="page-body home-page">
        <div className="home-top">
          <span className="home-weather">
            <Icon name="sun" size={15} />
            {weather.text} {weather.temp}°C
          </span>
          <button className="back-pill t-orange" onClick={() => navigate('/settings')}>设置</button>
        </div>

        <div className="home-main" style={{ gap: 14 }}>
          <div className="home-avatar" style={{ width: 72, height: 72 }}>
            <Icon name="family" size={32} strokeWidth={0} filled style={{ opacity: 0.9 }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="home-hello">{state?.greeting ?? '小伴在这里陪着您'}</div>
            <div className="home-sub">
              需要时，可以叫一声“{state?.wakeWord ?? '小伴'}”
            </div>
            <button className={`voice-pill${hearing ? ' on' : ''}`} onClick={toggleVoice} aria-pressed={hearing}>
              <Icon name={hearing ? 'pause' : 'moon'} size={15} strokeWidth={2.2} />
              {hearing ? '正在聆听…' : '安静待命'}
            </button>
          </div>
          <div className="card home-recent">
            <div className="home-recent-label">最近的交流</div>
            <div className="home-recent-text">{state?.wakeWord ?? '小伴'}：{state?.recentNote ?? latest?.text ?? '下午散步回来，记得喝点水呀。'}</div>
          </div>
        </div>

        <button className="btn btn-primary btn-block btn-lg" onClick={() => navigate('/chat')}>
          <Icon name="history" size={22} strokeWidth={2} />
          查看聊天记录
        </button>
        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          <button className="btn btn-orange-soft btn-block" onClick={() => navigate('/sleep/monitor')}>助眠</button>
          <button className="btn btn-orange-soft btn-block" onClick={() => navigate('/health')}>健康</button>
        </div>
      </div>
    </div>
  )
}
