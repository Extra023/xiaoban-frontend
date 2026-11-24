import { registerMock, request } from './client'
import { db } from './db'
import type {
  SleepEntry, SleepPlan, StoryInfo, WhiteNoiseSetting, TonightNeed, SleepPreference,
  SleepScene, SleepContent,
} from './types'

registerMock('GET', '/sleep/entry', (): SleepEntry => ({ ...db.sleep.entry }))
registerMock('POST', '/sleep/monitoring', (body) => {
  const { enabled } = (body ?? {}) as { enabled: boolean }
  db.sleep.entry.monitoringEnabled = enabled
  return { monitoringEnabled: enabled }
})
registerMock('GET', '/sleep/story', (): StoryInfo & { playing: boolean } => ({
  ...db.sleep.stories[db.sleep.storyIndex],
  playing: db.sleep.storyPlaying,
}))
registerMock('POST', '/sleep/story/next', () => {
  db.sleep.storyIndex = (db.sleep.storyIndex + 1) % db.sleep.stories.length
  return db.sleep.stories[db.sleep.storyIndex]
})
registerMock('POST', '/sleep/story/playback', (body) => {
  const { playing } = (body ?? {}) as { playing: boolean }
  db.sleep.storyPlaying = playing
  return { playing }
})
registerMock('PUT', '/sleep/noise', (body) => {
  const patch = (body ?? {}) as Partial<WhiteNoiseSetting>
  Object.assign(db.sleep.noise, patch)
  return db.sleep.noise
})
registerMock('GET', '/sleep/tonight', () => db.sleep.tonight)
registerMock('PUT', '/sleep/tonight', (body) => {
  const { selected } = (body ?? {}) as { selected: string[] }
  db.sleep.tonight.selected = selected
  return db.sleep.tonight
})
registerMock('GET', '/sleep/prefs', () => db.sleep.prefs)
registerMock('PUT', '/sleep/prefs', (body) => {
  const patch = (body ?? {}) as Partial<SleepPreference>
  Object.assign(db.sleep.prefs, patch)
  return db.sleep.prefs
})
registerMock('GET', '/sleep/plan', (): SleepPlan => ({
  story: db.sleep.stories[db.sleep.storyIndex],
  whiteNoise: db.sleep.noise,
}))
registerMock('GET', '/sleep/scene', () => db.sleep.scene)
registerMock('POST', '/sleep/scene/next', () => {
  const pool = ['山林清晨', '海浪拍岸', '灯火小镇', '星夜湖畔']
  const i = pool.indexOf(db.sleep.scene.name)
  db.sleep.scene.name = pool[(i + 1 + pool.length) % pool.length]
  return db.sleep.scene
})
registerMock('PUT', '/sleep/scene', (body) => {
  const patch = (body ?? {}) as Partial<SleepScene>
  Object.assign(db.sleep.scene, patch)
  return db.sleep.scene
})
registerMock('GET', '/sleep/content', () => db.sleep.content)
registerMock('PUT', '/sleep/content', (body) => {
  const patch = (body ?? {}) as Partial<SleepContent>
  Object.assign(db.sleep.content, patch)
  return db.sleep.content
})

/** 助眠入口状态（健康中心卡片） */
export function getSleepEntry(): Promise<SleepEntry> {
  return request('GET', '/sleep/entry')
}

/** 开启/关闭睡眠监测 */
export function setSleepMonitoring(enabled: boolean): Promise<{ monitoringEnabled: boolean }> {
  return request('POST', '/sleep/monitoring', { enabled })
}

/** 当前睡前故事 */
export function getCurrentStory(): Promise<StoryInfo & { playing: boolean }> {
  return request('GET', '/sleep/story')
}

/** 换一个故事 */
export function nextStory(): Promise<StoryInfo> {
  return request('POST', '/sleep/story/next')
}

/** 故事播放/暂停 */
export function setStoryPlaying(playing: boolean): Promise<{ playing: boolean }> {
  return request('POST', '/sleep/story/playback', { playing })
}

/** 白噪音设置（自动关闭时长 / 播放状态） */
export function setWhiteNoise(patch: Partial<WhiteNoiseSetting>): Promise<WhiteNoiseSetting> {
  return request('PUT', '/sleep/noise', patch)
}

/** 当晚需求 */
export function getTonightNeed(): Promise<TonightNeed> {
  return request('GET', '/sleep/tonight')
}
export function setTonightNeed(selected: string[]): Promise<TonightNeed> {
  return request('PUT', '/sleep/tonight', { selected })
}

/** 助眠偏好 */
export function getSleepPrefs(): Promise<SleepPreference> {
  return request('GET', '/sleep/prefs')
}
export function setSleepPrefs(patch: Partial<SleepPreference>): Promise<SleepPreference> {
  return request('PUT', '/sleep/prefs', patch)
}

/** 今晚的安排（故事 + 白噪音摘要，健康中心「今晚的安排」行） */
export function getSleepPlan(): Promise<SleepPlan> {
  return request('GET', '/sleep/plan')
}

/** 当前助眠场景（第二步确认 / 第三步播放） */
export function getScene(): Promise<SleepScene> {
  return request('GET', '/sleep/scene')
}

/** 换一个推荐场景 */
export function nextScene(): Promise<SleepScene> {
  return request('POST', '/sleep/scene/next')
}

/** 更新场景设置（标签 / 音量 / 定时等） */
export function setScene(patch: Partial<SleepScene>): Promise<SleepScene> {
  return request('PUT', '/sleep/scene', patch)
}

/** 助眠内容与场景页数据（原「当晚需求」） */
export function getSleepContent(): Promise<SleepContent> {
  return request('GET', '/sleep/content')
}
export function setSleepContent(patch: Partial<SleepContent>): Promise<SleepContent> {
  return request('PUT', '/sleep/content', patch)
}
