import { registerMock, request } from './client'
import { db } from './db'
import type {
  DeviceConnection, Feeling, MedicalRecordState, MorningFeedback, SleepHealthData,
} from './types'

function today(): string {
  const d = new Date()
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}
function stamp(hm: string): string {
  return `${today()} · ${hm}`
}

registerMock('GET', '/feedback/morning', (): MorningFeedback => ({ ...db.health.feedback, date: today() }))
registerMock('POST', '/feedback/morning', (body) => {
  const { feeling } = (body ?? {}) as { feeling: Feeling }
  db.health.feedback = { date: today(), saved: [feeling], hasAnswer: true }
  db.health.data.selfReport.recordedAt = stamp('8:10')
  return db.health.feedback
})
registerMock('GET', '/health/device', () => db.health.device)
registerMock('POST', '/health/device/connect', (body) => {
  const { deviceName } = (body ?? {}) as { deviceName: string }
  db.health.device = { connected: true, deviceName }
  db.health.data.deviceEstimate.connected = true
  db.health.data.deviceEstimate.recordedAt = stamp('8:00')
  return db.health.device
})
registerMock('DELETE', '/health/device', () => {
  db.health.device = { connected: false }
  db.health.data.deviceEstimate.connected = false
  return db.health.device
})
registerMock('GET', '/health/sleep-data', (): SleepHealthData => {
  const d = db.health.data
  if (!d.selfReport.recordedAt) d.selfReport.recordedAt = stamp('8:10')
  if (!d.deviceEstimate.recordedAt) d.deviceEstimate.recordedAt = stamp('8:00')
  return d
})
registerMock('GET', '/health/medical', () => db.health.medical)
registerMock('POST', '/health/medical/authorize', () => {
  db.health.medical.authorized = true
  return db.health.medical
})

/** 晨间反馈（今日自述） */
export function getMorningFeedback(): Promise<MorningFeedback> {
  return request('GET', '/feedback/morning')
}
export function submitMorningFeedback(feeling: Feeling): Promise<MorningFeedback> {
  return request('POST', '/feedback/morning', { feeling })
}

/** 健康设备连接状态 */
export function getDeviceConnection(): Promise<DeviceConnection> {
  return request('GET', '/health/device')
}
export function connectDevice(deviceName: string): Promise<DeviceConnection> {
  return request('POST', '/health/device/connect', { deviceName })
}
export function disconnectDevice(): Promise<DeviceConnection> {
  return request('DELETE', '/health/device')
}

/** 睡眠与健康数据（自述 + 设备估算） */
export function getSleepHealthData(): Promise<SleepHealthData> {
  return request('GET', '/health/sleep-data')
}

/** 私密医疗记录状态 */
export function getMedicalRecordState(): Promise<MedicalRecordState> {
  return request('GET', '/health/medical')
}
export function authorizeMedical(): Promise<MedicalRecordState> {
  return request('POST', '/health/medical/authorize')
}
