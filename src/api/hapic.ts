import type { ChatMessage } from './types'

/* ------------------------------------------------------------
 * HAPIC 语音服务适配层。
 *
 * 对接语音组同学的本地服务（ShenSetius/HAPIC，默认 127.0.0.1:4173，
 * 对方仓库执行 `npm run voice:local` 启动，详见其 docs/operations/LOCAL_VOICE.md）。
 *
 * 链路：前端 fetch('/hapic/*') → vite 代理 → 127.0.0.1:4173/api/*
 * （代理负责改写 Host/Origin 以通过 HAPIC 的本地回环校验）。
 *
 * 服务不在线时各方法抛错，由 api/chat.ts 回退到 Mock，不影响演示。
 * ------------------------------------------------------------ */

const BASE = '/hapic'
const TIMEOUT_MS = 2500
const TURN_TIMEOUT_MS = 30000

let sessionToken: string | null = null
let onlineCache: { at: number; value: boolean } = { at: 0, value: false }

async function hapicFetch<T>(path: string, init: RequestInit = {}, timeoutMs = TIMEOUT_MS): Promise<T> {
  const token = await ensureSession()
  const ctrl = new AbortController()
  const t = window.setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetch(`${BASE}${path}`, {
      ...init,
      signal: ctrl.signal,
      headers: {
        'Content-Type': 'application/json',
        'x-hapic-session': token,
        ...(init.headers ?? {}),
      },
    })
    if (!res.ok) throw new Error(`[hapic] ${res.status} ${path}`)
    return (await res.json()) as T
  } finally {
    window.clearTimeout(t)
  }
}

/** GET /api/session 取会话令牌（HAPIC 其余端点要求 x-hapic-session 头） */
async function ensureSession(): Promise<string> {
  if (sessionToken) return sessionToken
  const ctrl = new AbortController()
  const t = window.setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(`${BASE}/session`, { signal: ctrl.signal })
    if (!res.ok) throw new Error(`[hapic] ${res.status} /session`)
    const data = (await res.json()) as { token: string }
    sessionToken = data.token
    return sessionToken
  } finally {
    window.clearTimeout(t)
  }
}

/** 探测语音服务是否在线（结果缓存 5 秒，避免反复探测） */
export async function isHapicOnline(): Promise<boolean> {
  if (Date.now() - onlineCache.at < 5000) return onlineCache.value
  let ok = false
  try {
    await hapicFetch('/status')
    ok = true
  } catch {
    ok = false
  }
  onlineCache = { at: Date.now(), value: ok }
  return ok
}

export interface HapicVoiceStatus {
  ttsEnabled: boolean
  voicePreferencesAvailable: boolean
  audioOutputTarget: string
}

/** GET /api/status：TTS / 语音能力状态（Qwen TTS 启用前 ttsEnabled=false） */
export function getVoiceStatus(): Promise<HapicVoiceStatus> {
  return hapicFetch('/status')
}

/**
 * POST /api/text：一轮文字对话。
 * HAPIC 内部走 Letta Agent（当前模型 deepseek/deepseek-flash），同步返回小伴回复。
 */
export async function sendTextTurn(text: string): Promise<{ conversationId: string; assistantText: string }> {
  return hapicFetch<{ conversationId: string; assistantText: string }>('/text', {
    method: 'POST',
    body: JSON.stringify({ text }),
  }, TURN_TIMEOUT_MS)
}

interface HapicMessage {
  id: string
  text: string
  /** HAPIC 消息流为助手输出（不含用户消息），无 role 字段 */
  createdAt?: string | number
}

/** GET /api/messages：拉取真实会话历史（HAPIC 该端点返回小伴的回复消息） */
export async function listMessages(): Promise<ChatMessage[]> {
  const r = await hapicFetch<{ messages: HapicMessage[] }>('/messages')
  return r.messages.map((m) => ({
    id: String(m.id),
    role: 'assistant' as const,
    text: m.text,
    createdAt: typeof m.createdAt === 'string' ? Date.parse(m.createdAt) || 0 : (m.createdAt ?? 0),
  }))
}
