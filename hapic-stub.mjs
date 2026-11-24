// 临时桩：模拟 HAPIC 语音服务协议（用于前端联调验证，验证后删除）
import { createServer } from 'node:http'
import { randomUUID } from 'node:crypto'

const PORT = 4173
const token = 'stub-session-token'
const conversationId = 'conv-stub-001'
const messages = [
  { id: 'u1', role: 'user', text: '今天天气怎么样？', createdAt: 1 },
  { id: 'a1', role: 'assistant', text: '今天晴，26°C，微风，很适合出门走走。', createdAt: 2 },
  { id: 's1', role: 'system', text: 'hidden system note', createdAt: 3 },
]
const REPLIES = [
  '好啊，散步听起来很舒服。',
  '嗯，我在听。您接着说。',
  '记下了，晚上散步注意安全。',
]

createServer((req, res) => {
  const host = req.headers.host ?? ''
  const origin = 'http://' + host
  const loopback = /^127\.0\.0\.1:\d{1,5}$/.test(host)
  if (!loopback || (req.headers.origin && req.headers.origin !== origin)) {
    res.writeHead(403, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ error: 'local_origin_required' }))
    return
  }
  const url = new URL(req.url ?? '/', origin)
  const send = (status, value) => {
    res.writeHead(status, { 'content-type': 'application/json' })
    res.end(JSON.stringify(value))
  }

  if (req.method === 'GET' && url.pathname === '/api/session') {
    send(200, { token, conversationId, messageCursor: null })
    return
  }
  if (req.headers['x-hapic-session'] !== token) {
    send(401, { error: 'local_session_required' })
    return
  }
  if (req.method === 'GET' && url.pathname === '/api/status') {
    send(200, { ttsEnabled: false, voicePreferencesAvailable: false, repeatAvailable: false, audioOutputTarget: 'server' })
    return
  }
  if (req.method === 'GET' && url.pathname === '/api/messages') {
    send(200, { conversationId, messages, nextCursor: null, hasMore: false })
    return
  }
  if (req.method === 'POST' && url.pathname === '/api/text') {
    let body = ''
    req.on('data', (c) => { body += c })
    req.on('end', () => {
      const { text } = JSON.parse(body || '{}')
      const userMsg = { id: `u${randomUUID().slice(0, 6)}`, role: 'user', text: String(text), createdAt: Date.now() }
      const reply = { id: `a${randomUUID().slice(0, 6)}`, role: 'assistant', text: `小伴说：${REPLIES[Math.floor(Math.random() * REPLIES.length)]}`, createdAt: Date.now() + 1 }
      messages.push(userMsg, reply)
      send(200, { conversationId, assistantText: reply.text })
    })
    return
  }
  send(404, { error: 'not_found' })
}).listen(PORT, '127.0.0.1', () => console.log(`HAPIC stub on 127.0.0.1:${PORT}`))
