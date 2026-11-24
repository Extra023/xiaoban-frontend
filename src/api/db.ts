import type {
  ChatMessage, CompanionProfile, DataOverview, DeviceConnection, Grant, LifeInterests,
  MedicalRecordState, Memory, MemoryCategory, MorningFeedback, PersonalityPreference,
  PlaybackState, SleepHealthData, SleepPreference, TonightNeed, WhiteNoiseSetting,
  StoryInfo, SettingsOverview, InteractionPreference, HomeState, SleepEntry,
} from './types'

/* ------------------------------------------------------------
 * 内存模拟数据库：替代真实后端存储，会话期间状态可读写。
 * 接入真实后端后本文件可整体删除。
 * ---------------------------------------------------------- */

export const db = {
  home: {
    weather: { text: '晴', temp: 26 },
    greeting: '小伴在这里陪着您',
    subGreeting: '需要时，可以叫一声“小伴”',
    standby: true,
    wakeWord: '小伴',
    recentNote: '下午散步回来，记得喝点水呀。',
  } as Omit<HomeState, 'time'>,

  chat: {
    messages: [
      { id: 'm1', role: 'assistant', text: '王爷爷，今天感觉怎么样？', audio: true, tag: '主动关怀', createdAt: 0 },
      { id: 'm2', role: 'user', text: '今天好多了，想出去散散步。', createdAt: 0 },
      { id: 'm3', role: 'assistant', text: '那挺好的，出门注意慢一点。', audio: true, createdAt: 0 },
    ] as ChatMessage[],
    suggestions: [] as string[],
    seq: 4,
  },

  companion: {
    id: 'c1', relation: '女儿', name: '小芳', displayName: '女儿 — 小芳',
    voiceSampleUrl: '/audio/sample-xiaofang.mp3', voiceSamplePlaying: false,
    traits: ['温和', '耐心', '爱聊天'],
  } as CompanionProfile,

  memory: {
    items: [
      { id: 'mm1', content: '您喜欢吃饺子。', category: '偏好', source: '聊天', sourceAt: '10月15日', confidence: 98, status: 'confirmed' },
      { id: 'mm2', content: '莉莉是您的孙女。', category: '家庭', source: '聊天', sourceAt: '10月15日', confidence: 92, status: 'confirmed' },
      { id: 'mm3', content: '您喜欢早上散步。', category: '活动', source: '聊天', sourceAt: '10月15日', confidence: 95, status: 'confirmed' },
      { id: 'mm4', content: '您的睡觉时间是晚上9:30。', category: '健康', source: '聊天', sourceAt: '10月15日', confidence: 90, status: 'confirmed' },
      { id: 'mm5', content: '家人通常在周日来访。', category: '家庭', source: '聊天', sourceAt: '10月15日', confidence: 90, status: 'confirmed' },
    ] as Memory[],
    categories: ['全部', '家庭', '健康', '偏好', '活动'] as Array<'全部' | MemoryCategory>,
    seq: 5,
  },

  settings: {
    contentLibraryCount: 36,
    lastMemorySyncAt: '今天 08:30',
  } as Omit<SettingsOverview, 'memoryCount'>,

  sleep: {
    entry: { monitoringEnabled: false } as SleepEntry,
    stories: [
      { id: 's1', title: '灯笼花园', durationMin: 8, source: 'ai' },
      { id: 's2', title: '月光下的小镇', durationMin: 12, source: 'ai' },
      { id: 's3', title: '海边的灯塔', durationMin: 10, source: 'ai' },
      { id: 's4', title: '森林里的熊先生', durationMin: 9, source: 'ai' },
    ] as StoryInfo[],
    storyIndex: 0,
    storyPlaying: false,
    noise: { playing: false, autoCloseMinutes: 30 } as WhiteNoiseSetting,
    tonight: { options: ['故事', '聊天', '自然音'], selected: ['故事'], status: 'idle' } as TonightNeed,
    prefs: { relaxWays: ['故事', '自然声音', '无音频'], relaxWay: '故事', voiceStyle: '温柔' } as SleepPreference,
    /* 助眠场景（v0.2 更新：第二步确认场景 / 第三步场景播放 共用） */
    scene: {
      name: '雨夜慢读', aiSuggested: true, confirmed: false,
      tags: ['放松引导', '音乐/自然声', '睡前故事'], tag: '放松引导',
      warm: '温和放松 2 分钟', story: '灯笼花园 8 分钟',
      background: '轻柔雨声', volume: 30, autoCloseMinutes: 30,
      main: '灯笼花园 · AI 故事', backgroundState: '轻柔雨声 / 白噪音',
    },
    /* 助眠内容与场景（v0.2 更新：原「当晚需求」页） */
    content: {
      kinds: ['放松引导', '音乐/自然声', '睡前故事', '聊天'], kind: '睡前故事',
      sources: ['固定内容', 'AI 生成', '由您选择'], source: 'AI 生成',
      storyTitle: '灯笼花园', storyMeta: 'AI 生成 · 8 分钟 · 温柔讲述',
      scenePending: true,
    },
  },

  preference: {
    interaction: { nickname: '王爷爷' } as InteractionPreference,
    life: { hobbies: ['音乐', '烹饪'], habits: ['晨练'] } as LifeInterests,
    personality: { style: '少问问题' } as PersonalityPreference,
  },

  grants: [
    {
      key: 'memory', name: '记忆', description: '只保留您确认的信息', enabled: false,
      detail: {
        title: '小伴能记住您的兴趣吗？',
        purpose: '用途：让今后的对话更贴合您的兴趣。',
        scope: '范围：仅存储您明确确认的兴趣。',
        legal: '授权有效直到您撤回。不会存储健康或医疗数据。',
      },
    },
    {
      key: 'proactive_care', name: '主动关怀', description: '允许小伴开始温和的关怀提醒', enabled: false,
      detail: {
        title: '允许小伴主动关心您吗？',
        purpose: '用途：在合适的时候给您温和的提醒与问候。',
        scope: '范围：仅发送关怀提醒，不读取其他数据。',
        legal: '授权有效直到您撤回。不会存储健康或医疗数据。',
      },
    },
    {
      key: 'tools', name: '工具权限', description: '按工具逐一选择', enabled: false,
    },
  ] as Grant[],

  health: {
    feedback: { date: '', saved: [], hasAnswer: false } as MorningFeedback,
    device: { connected: false } as DeviceConnection,
    data: {
      selfReport: { sleepQuality: '一般', morningFatigue: '有点', recordedAt: '', sample: true },
      deviceEstimate: { connected: false, recordedAt: '', sample: true, summary: '深睡偏少 · 夜间醒来 2 次' },
    } as SleepHealthData,
    medical: {
      authorized: false, records: 0,
      purpose: '仅在您明确需要时保存必要的医疗信息，用于提醒与应急参考。',
    } as MedicalRecordState,
  },

  playback: {
    playing: false, stateText: '空闲', taskText: '播放器空闲，没有正在执行的助眠任务。',
    volume: 30, volumeSent: false, timerSet: false,
    result: '尚无回执', receipt: '',
    favorites: [
      { name: '灯笼花园 · 故事', favorited: true },
      { name: '轻柔雨声 · 自然音', favorited: true },
    ],
  } as PlaybackState,

  dataOverview: {
    grantedCount: 0, storedEstimates: 12,
    tips: '撤回授权与删除已存储数据是两个独立操作。',
  } as DataOverview,
}
