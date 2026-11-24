/* ------------------------------------------------------------
 * 传输层。
 *
 * 当前为 Mock 实现：各 api/*.ts 模块通过 registerMock() 注册
 * 与真实后端一致的端点处理器，页面照常调用 request()。
 *
 * 接入真实后端时：
 *   1. 将 USE_MOCK 改为 false；
 *   2. request() 内部已用 fetch 实现真实 HTTP 调用（可在此补充
 *      鉴权头、错误归一化、超时重试），路由与下方注释清单一致；
 *   3. 删除各模块中的 registerMock 调用（或保留亦可，不会执行）。
 *
 * 预留的 REST 端点清单（供后端实现参考）：
 *   GET    /api/home/state
 *   POST   /api/home/standby             { standby }
 *   GET    /api/chat/messages
 *   GET    /api/chat/latest
 *   POST   /api/chat/messages            { text }
 *   GET    /api/chat/suggestions
 *   GET    /api/companion/profile
 *   PUT    /api/companion/profile          { traits }
 *   POST   /api/companion/voice-sample     { action: 'play'|'stop' }
 *   GET    /api/memory?keyword=&category=
 *   POST   /api/memory                     { content, category }
 *   DELETE /api/memory/:id
 *   GET    /api/memory/:id
 *   POST   /api/memory/:id/confirm
 *   PUT    /api/memory/:id                 { content }   // 更正
 *   GET    /api/settings/overview
 *   GET    /api/sleep/entry
 *   POST   /api/sleep/monitoring           { enabled }
 *   GET    /api/sleep/story
 *   POST   /api/sleep/story/next
 *   POST   /api/sleep/story/playback       { playing }
 *   PUT    /api/sleep/noise                { autoCloseMinutes, playing? }
 *   GET    /api/sleep/tonight
 *   PUT    /api/sleep/tonight              { selected }
 *   GET    /api/sleep/prefs
 *   PUT    /api/sleep/prefs                { relaxWay, voiceStyle }
 *   GET    /api/preference/interaction
 *   PUT    /api/preference/nickname        { nickname }
 *   GET    /api/preference/life
 *   POST   /api/preference/life            { kind, value }
 *   DELETE /api/preference/life            { kind, value }
 *   GET    /api/preference/personality
 *   PUT    /api/preference/personality     { style }
 *   GET    /api/grants
 *   GET    /api/grants/:key/detail
 *   PUT    /api/grants/:key                { enabled }
 *   GET    /api/feedback/morning
 *   POST   /api/feedback/morning           { feeling }
 *   GET    /api/health/device
 *   POST   /api/health/device/connect      { deviceName }
 *   DELETE /api/health/device
 *   GET    /api/health/sleep-data
 *   GET    /api/health/medical
 *   GET    /api/playback/state
 *   POST   /api/playback/stop-all
 *   GET    /api/data/overview
 *
 * 语音服务（HAPIC）另行走 /hapic 代理：
 *   前端 /hapic/* → vite 代理 → 127.0.0.1:4173/api/*（见 vite.config.ts、
 *   api/hapic.ts；适配 ShenSetius/HAPIC 本地语音服务，含自动回退）
 * ---------------------------------------------------------- */

export const USE_MOCK = true
export const API_BASE = '/api'

export async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  if (USE_MOCK) {
    const handler = mockRoutes.get(`${method} ${path}`)
    if (!handler) throw new Error(`[api] 未注册的 Mock 端点: ${method} ${path}`)
    await delay(20 + Math.random() * 40)
    return handler(body) as T
  }
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body != null ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`[api] ${res.status} ${method} ${path}`)
  return res.json() as Promise<T>
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

const mockRoutes = new Map<string, (body?: unknown) => unknown>()

/** 注册 Mock 端点处理器（仅 Mock 模式执行；接入真实后端后不再被调用） */
export function registerMock(method: string, path: string, handler: (body?: unknown) => unknown) {
  mockRoutes.set(`${method} ${path}`, handler)
}
