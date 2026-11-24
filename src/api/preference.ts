import { registerMock, request } from './client'
import { db } from './db'
import type { ChatStyle, InteractionPreference, LifeInterests, PersonalityPreference } from './types'

registerMock('GET', '/preference/interaction', () => db.preference.interaction)
registerMock('PUT', '/preference/nickname', (body) => {
  const { nickname } = (body ?? {}) as { nickname: string }
  db.preference.interaction.nickname = nickname
  db.home.greeting = db.home.greeting.replace(/，.+$/, `，${nickname}`)
  return db.preference.interaction
})
registerMock('GET', '/preference/life', () => db.preference.life)
registerMock('POST', '/preference/life', (body) => {
  const { kind, value } = (body ?? {}) as { kind: keyof LifeInterests; value: string }
  if (!db.preference.life[kind].includes(value)) db.preference.life[kind].push(value)
  return db.preference.life
})
registerMock('DELETE', '/preference/life', (body) => {
  const { kind, value } = (body ?? {}) as { kind: keyof LifeInterests; value: string }
  db.preference.life[kind] = db.preference.life[kind].filter((v) => v !== value)
  return db.preference.life
})
registerMock('GET', '/preference/personality', () => db.preference.personality)
registerMock('PUT', '/preference/personality', (body) => {
  const { style } = (body ?? {}) as { style: ChatStyle }
  db.preference.personality.style = style
  return db.preference.personality
})

/** 交互偏好（称呼） */
export function getInteraction(): Promise<InteractionPreference> {
  return request('GET', '/preference/interaction')
}
export function saveNickname(nickname: string): Promise<InteractionPreference> {
  return request('PUT', '/preference/nickname', { nickname })
}

/** 生活与兴趣 */
export function getLifeInterests(): Promise<LifeInterests> {
  return request('GET', '/preference/life')
}
export function addLifeItem(kind: keyof LifeInterests, value: string): Promise<LifeInterests> {
  return request('POST', '/preference/life', { kind, value })
}
export function removeLifeItem(kind: keyof LifeInterests, value: string): Promise<LifeInterests> {
  return request('DELETE', '/preference/life', { kind, value })
}

/** 个性反馈（聊天风格） */
export function getPersonality(): Promise<PersonalityPreference> {
  return request('GET', '/preference/personality')
}
export function savePersonality(style: ChatStyle): Promise<PersonalityPreference> {
  return request('PUT', '/preference/personality', { style })
}
