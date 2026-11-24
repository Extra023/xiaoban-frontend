/* ============================================================
 * 后端接口类型契约
 * ------------------------------------------------------------
 * 前端所有页面仅依赖本文件与各 api/*.ts 模块导出的函数签名，
 * 不直接触碰传输层。接入真实后端时：
 *   1. 在 client.ts 中将 USE_MOCK 置为 false；
 *   2. 实现 request() 走 HTTP（REST 端点见各模块 JSDoc 注释）；
 *   3. 页面代码零改动。
 * ============================================================ */

/* ---------- 01 基础体验 ---------- */

export interface WeatherInfo {
  text: string      // 晴 / 阴 / 雨 …
  temp: number      // 摄氏度
}

export interface HomeState {
  time: string              // HH:mm，本地时间
  weather: WeatherInfo
  greeting: string          // 小伴在这里陪着您
  subGreeting: string       // 需要时，可以叫一声“小伴”
  standby: boolean          // 常态待机监测（新范式：唤醒词 + 常驻待机）
  wakeWord: string          // 唤醒词，如「小伴」
  recentNote: string        // 最近的交流（陪伴主页卡片，主动关怀提醒）
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
  audio?: boolean           // 语音消息（带波形）
  tag?: string              // 场景标注（如「主动关怀」）
  createdAt: number
}

export interface CompanionProfile {
  id: string
  relation: string          // 女儿
  name: string              // 小芳
  displayName: string       // 女儿 — 小芳
  voiceSampleUrl: string    // 语音示例（预留音频资源地址）
  voiceSamplePlaying: boolean
  traits: string[]          // 个性特征标签
}

export type MemoryCategory = '家庭' | '健康' | '偏好' | '活动'

export interface Memory {
  id: string
  content: string           // 您喜欢吃饺子。
  category: MemoryCategory
  source: string            // 聊天 / 您的对话
  sourceAt: string          // 10月15日
  confidence: number        // 0-100
  status: 'pending' | 'confirmed'
}

export interface SettingsOverview {
  contentLibraryCount: number   // 内容库条目数（预留）
  memoryCount: number
  lastMemorySyncAt: string
}

/* ---------- 02 助眠流程与偏好 ---------- */

export interface SleepEntry {
  monitoringEnabled: boolean
  tonightPlan?: SleepPlan
}

export interface SleepPlan {
  story: StoryInfo
  whiteNoise: WhiteNoiseSetting
}

export interface StoryInfo {
  id: string
  title: string             // 灯笼花园
  durationMin: number       // 8
  source: 'ai' | 'library'  // 智能生成
}

export interface WhiteNoiseSetting {
  playing: boolean
  autoCloseMinutes: number  // 0=关闭 15/30/60
}

export interface TonightNeed {
  options: string[]         // 故事 / 聊天 / 自然音
  selected: string[]
  status: 'idle' | 'playing'
}

export interface SleepPreference {
  relaxWays: string[]       // 故事 / 自然声音 / 无音频
  relaxWay: string
  voiceStyle: string        // 温柔
}

/* ---------- 03 个性化与逐项授权 ---------- */

export interface InteractionPreference {
  nickname: string          // 王爷爷
  nicknameDraft?: string
}

export interface LifeInterests {
  hobbies: string[]
  habits: string[]
}

export type ChatStyle = '少问问题' | '更活泼' | '更温和' | '只听我说'

export interface PersonalityPreference {
  style: ChatStyle
}

export type GrantKey = 'memory' | 'proactive_care' | 'tools'

export interface Grant {
  key: GrantKey
  name: string              // 记忆 / 主动关怀 / 工具权限
  description: string
  enabled: boolean
  detail?: GrantDetail
}

export interface GrantDetail {
  title: string             // 小伴能记住您的兴趣吗？
  purpose: string           // 用途：…
  scope: string             // 范围：…
  legal: string             // 授权有效直到您撤回…
}

/* ---------- 04 反馈、运行与健康数据 ---------- */

export type Feeling = '睡得好' | '一般' | '没睡好'

export interface MorningFeedback {
  date: string              // 2026年11月5日
  saved: Feeling[]
  hasAnswer: boolean
}

export interface DeviceConnection {
  connected: boolean
  deviceName?: string
}

export interface SleepHealthData {
  selfReport: {
    sleepQuality: string    // 一般
    morningFatigue: string  // 有点
    recordedAt: string      // 2026年11月5日 · 8:10
    sample: boolean
  }
  deviceEstimate: {
    connected: boolean
    recordedAt: string      // 2026年11月5日 · 8:00
    sample: boolean
    summary?: string
  }
}

export interface MedicalRecordState {
  authorized: boolean
  records: number           // 记录条数，0 表示暂无
  purpose: string
}

export interface PlaybackState {
  playing: boolean
  stateText: string         // 空闲
  taskText: string          // 无正在执行的助眠任务
  current?: string
  volume: number            // 30
  volumeSent: boolean       // 未发送 · 调整
  timerSet: boolean         // 未启动 · 设置
  result: string            // 尚无回执
  receipt: string           // 最近一次回执内容
  favorites: Array<{ name: string; favorited: boolean }>
}

/** 助眠场景（第二步确认 / 第三步播放 / 内容页推荐共用） */
export interface SleepScene {
  name: string              // 雨夜慢读
  aiSuggested: boolean      // AI 建议 · 待确认
  tags: string[]            // 放松引导 / 音乐/自然声 / 睡前故事
  tag: string               // 当前选中标签
  warm: string              // 温和放松 2 分钟
  story: string             // 灯笼花园 8 分钟
  background: string        // 轻柔雨声
  volume: number            // 30
  autoCloseMinutes: number  // 30
  main: string              // 灯笼花园 · AI 故事
  backgroundState: string   // 轻柔雨声 / 白噪音
}

/** 助眠内容与场景页（原「当晚需求」） */
export interface SleepContent {
  kinds: string[]
  kind: string              // 睡前故事
  sources: string[]
  source: string            // AI 生成
  storyTitle: string        // 灯笼花园
  storyMeta: string         // AI 生成 · 8 分钟 · 温柔讲述
  scenePending: boolean     // 待您确认
}

export interface DataOverview {
  grantedCount: number
  storedEstimates: number
  tips: string
}
