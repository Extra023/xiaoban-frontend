import { registerMock, request } from './client'
import { db } from './db'
import type { CompanionProfile, SettingsOverview } from './types'

registerMock('GET', '/companion/profile', () => db.companion)
registerMock('PUT', '/companion/profile', (body) => {
  const patch = (body ?? {}) as Partial<CompanionProfile>
  Object.assign(db.companion, patch)
  return db.companion
})
registerMock('POST', '/companion/voice-sample', (body) => {
  const { action } = (body ?? {}) as { action: 'play' | 'stop' }
  db.companion.voiceSamplePlaying = action === 'play'
  return { playing: db.companion.voiceSamplePlaying }
})
registerMock('GET', '/settings/overview', (): SettingsOverview => ({
  ...db.settings,
  memoryCount: db.memory.items.length,
}))

/** 陪伴档案（人物设定、语音示例、个性特征） */
export function getCompanionProfile(): Promise<CompanionProfile> {
  return request('GET', '/companion/profile')
}

/** 更新档案（个性特征等） */
export function updateCompanionProfile(patch: Partial<CompanionProfile>): Promise<CompanionProfile> {
  return request('PUT', '/companion/profile', patch)
}

/** 播放/停止语音示例 */
export function playVoiceSample(action: 'play' | 'stop'): Promise<{ playing: boolean }> {
  return request('POST', '/companion/voice-sample', { action })
}

/** 设置页概览数据 */
export function getSettingsOverview(): Promise<SettingsOverview> {
  return request('GET', '/settings/overview')
}
