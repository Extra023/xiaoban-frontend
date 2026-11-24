import { useEffect, useState } from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Stage } from './components/Stage'
import { track } from './lib/navStack'

import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import CompanionPage from './pages/CompanionPage'
import MemoryListPage from './pages/MemoryListPage'
import MemoryDetailPage from './pages/MemoryDetailPage'
import SettingsPage from './pages/SettingsPage'
import SleepMonitorPage from './pages/SleepMonitorPage'
import SleepPickPage from './pages/SleepPickPage'
import SleepPlayingPage from './pages/SleepPlayingPage'
import SleepSwapPage from './pages/SleepSwapPage'
import SleepSoundPage from './pages/SleepSoundPage'
import HealthHomePage from './pages/HealthHomePage'
import VoiceSettingsPage from './pages/VoiceSettingsPage'
import LifeInterestsPage from './pages/LifeInterestsPage'
import ChatStylePage from './pages/ChatStylePage'
import PrivacyPage from './pages/PrivacyPage'
import AuthPage from './pages/AuthPage'
import MorningFeedbackPage from './pages/MorningFeedbackPage'
import ConnectDevicePage from './pages/ConnectDevicePage'
import SleepDataPage from './pages/SleepDataPage'
import MedicalPage from './pages/MedicalPage'
import PlaybackStatusPage from './pages/PlaybackStatusPage'
import SleepEndPage from './pages/SleepEndPage'
import MyInfoPage from './pages/MyInfoPage'

import './styles/module1.css'
import './styles/module2.css'
import './styles/module3.css'
import './styles/module4.css'

/** 开发预览导航：便于在设计评审时快速跳转 24 个页面 */
const NAV: Array<{ module: string; items: Array<[string, string]> }> = [
  {
    module: '01 日常',
    items: [
      ['01 陪伴主页', '/'],
      ['02 统一聊天记录', '/chat'],
      ['04 陪伴档案', '/companion'],
      ['05 小伴记住的事', '/memory'],
      ['06 设置', '/settings'],
    ],
  },
  {
    module: '02 助眠',
    items: [
      ['07 先确认睡眠监测', '/sleep/monitor'],
      ['08 选择和播放内容', '/sleep/pick'],
      ['09 正在播放', '/sleep/playing'],
      ['10 换个内容', '/sleep/swap'],
      ['11 声音与定时', '/sleep/sound'],
      ['12 播放情况', '/sleep/playback'],
      ['12b 今晚好眠', '/sleep/end'],
    ],
  },
  {
    module: '03 个人设置',
    items: [
      ['13 字和声音', '/settings/voice'],
      ['14 生活与兴趣（选填）', '/prefs/life'],
      ['15 聊天方式', '/prefs/chat'],
      ['16 提醒和隐私', '/settings/privacy'],
      ['17 单项授权', '/auth'],
      ['18 记忆详情', '/memory/mm1'],
    ],
  },
  {
    module: '04 健康',
    items: [
      ['19 健康首页', '/health'],
      ['20 晨间反馈', '/health/feedback'],
      ['21 睡眠记录', '/health/data'],
      ['22 连接设备', '/health/device'],
      ['23 私密医疗', '/health/medical'],
      ['24 我的信息', '/health/me'],
    ],
  },
]

/** 跟随路由变化维护导航栈（供智能返回判断） */
function NavTracker() {
  const { pathname } = useLocation()
  useEffect(() => {
    track(pathname)
  }, [pathname])
  return null
}

function DevNav() {
  const [open, setOpen] = useState(false)
  return (
    <div className="devnav">
      {open && (
        <div className="devnav-panel">
          {NAV.map((g) => (
            <div key={g.module}>
              <h4>{g.module}</h4>
              {g.items.map(([label, path]) => (
                <Link key={path} to={path} onClick={() => setOpen(false)}>{label}</Link>
              ))}
            </div>
          ))}
        </div>
      )}
      <button onClick={() => setOpen((o) => !o)}>{open ? '收起目录' : '页面目录'}</button>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <NavTracker />
      <Stage>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/companion" element={<CompanionPage />} />
          <Route path="/memory" element={<MemoryListPage />} />
          <Route path="/memory/:id" element={<MemoryDetailPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/sleep/monitor" element={<SleepMonitorPage />} />
          <Route path="/sleep/pick" element={<SleepPickPage />} />
          <Route path="/sleep/playing" element={<SleepPlayingPage />} />
          <Route path="/sleep/swap" element={<SleepSwapPage />} />
          <Route path="/sleep/sound" element={<SleepSoundPage />} />
          <Route path="/sleep/playback" element={<PlaybackStatusPage />} />
          <Route path="/sleep/end" element={<SleepEndPage />} />
          <Route path="/health" element={<HealthHomePage />} />
          <Route path="/settings/voice" element={<VoiceSettingsPage />} />
          <Route path="/prefs/life" element={<LifeInterestsPage />} />
          <Route path="/prefs/chat" element={<ChatStylePage />} />
          <Route path="/settings/privacy" element={<PrivacyPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/health/feedback" element={<MorningFeedbackPage />} />
          <Route path="/health/device" element={<ConnectDevicePage />} />
          <Route path="/health/data" element={<SleepDataPage />} />
          <Route path="/health/medical" element={<MedicalPage />} />
          <Route path="/health/me" element={<MyInfoPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Stage>
      <DevNav />
    </BrowserRouter>
  )
}
