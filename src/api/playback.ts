import { registerMock, request } from './client'
import { db } from './db'
import type { DataOverview, PlaybackState } from './types'

registerMock('GET', '/playback/state', (): PlaybackState => ({ ...db.playback }))
registerMock('POST', '/playback/stop-all', () => {
  db.playback = {
    playing: false, stateText: '空闲', taskText: '播放器空闲，没有正在执行的助眠任务。',
    volume: 30, volumeSent: false, timerSet: false, result: '尚无回执', receipt: '',
    favorites: db.playback.favorites,
  }
  db.sleep.storyPlaying = false
  db.sleep.noise.playing = false
  db.sleep.tonight.status = 'idle'
  return db.playback
})
registerMock('POST', '/playback/send-volume', () => {
  db.playback.volumeSent = true
  return db.playback
})
registerMock('POST', '/playback/start-timer', () => {
  db.playback.timerSet = true
  return db.playback
})
registerMock('POST', '/playback/receipt', () => {
  db.playback.result = '已回执'
  db.playback.receipt = '最近一次：播放中 · 音量 30% · 定时 30 分钟'
  return db.playback
})
registerMock('PUT', '/playback/favorite', (body) => {
  const { name, favorited } = (body ?? {}) as { name: string; favorited: boolean }
  const f = db.playback.favorites.find((x) => x.name === name)
  if (f) f.favorited = favorited
  return db.playback
})
registerMock('GET', '/data/overview', (): DataOverview => ({
  ...db.dataOverview,
  grantedCount: db.grants.filter((g) => g.enabled).length,
}))

/** 运行与播放状态 */
export function getPlaybackState(): Promise<PlaybackState> {
  return request('GET', '/playback/state')
}

/** 停止所有播放任务 */
export function stopAllPlayback(): Promise<PlaybackState> {
  return request('POST', '/playback/stop-all')
}

/** 发送音量设置到播放器 */
export function sendVolume(): Promise<PlaybackState> {
  return request('POST', '/playback/send-volume')
}

/** 启动定时关闭 */
export function startTimer(): Promise<PlaybackState> {
  return request('POST', '/playback/start-timer')
}

/** 查询最近一次播放器回执 */
export function fetchReceipt(): Promise<PlaybackState> {
  return request('POST', '/playback/receipt')
}

/** 收藏 / 取消收藏 */
export function setFavorite(name: string, favorited: boolean): Promise<PlaybackState> {
  return request('PUT', '/playback/favorite', { name, favorited })
}

/** 数据与授权总览 */
export function getDataOverview(): Promise<DataOverview> {
  return request('GET', '/data/overview')
}
