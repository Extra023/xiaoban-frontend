import { registerMock, request } from './client'
import { db } from './db'
import type { HomeState } from './types'

function now(): string {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

function homeState(): HomeState {
  return { time: now(), ...db.home }
}

/* ---------- Mock 处理器（真实后端实现 GET /api/home/state 等） ---------- */
registerMock('GET', '/home/state', () => homeState())
registerMock('POST', '/home/standby', (body) => {
  const { standby } = (body ?? {}) as { standby: boolean }
  db.home.standby = standby
  return { standby }
})

/** 首页状态：时间 / 天气 / 待机状态 / 唤醒词 */
export function getHomeState(): Promise<HomeState> {
  return request('GET', '/home/state')
}

/** 进入/退出常态待机（语音开关；真实后端联动唤醒词监测） */
export function setStandby(standby: boolean): Promise<{ standby: boolean }> {
  return request('POST', '/home/standby', { standby })
}
