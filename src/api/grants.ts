import { registerMock, request } from './client'
import { db } from './db'
import type { Grant, GrantDetail, GrantKey } from './types'

registerMock('GET', '/grants', () => db.grants)
registerMock('GET', '/grants/detail', (body) => {
  const { key } = (body ?? {}) as { key: GrantKey }
  return db.grants.find((g) => g.key === key)?.detail ?? null
})
registerMock('PUT', '/grants/toggle', (body) => {
  const { key, enabled } = (body ?? {}) as { key: GrantKey; enabled: boolean }
  const g = db.grants.find((x) => x.key === key)
  if (g) g.enabled = enabled
  db.dataOverview.grantedCount = db.grants.filter((x) => x.enabled).length
  return g ?? null
})

/** 授权列表（记忆 / 主动关怀 / 工具权限） */
export function getGrants(): Promise<Grant[]> {
  return request('GET', '/grants')
}

/** 单项授权确认页文案 */
export function getGrantDetail(key: GrantKey): Promise<GrantDetail | null> {
  return request('GET', '/grants/detail', { key })
}

/** 设置授权开关（开启前需先经确认页） */
export function setGrant(key: GrantKey, enabled: boolean): Promise<Grant | null> {
  return request('PUT', '/grants/toggle', { key, enabled })
}
