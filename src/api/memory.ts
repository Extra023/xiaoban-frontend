import { registerMock, request } from './client'
import { db } from './db'
import type { Memory, MemoryCategory } from './types'

registerMock('GET', '/memory', (body) => {
  const { keyword = '', category = '全部' } = (body ?? {}) as { keyword?: string; category?: string }
  return db.memory.items.filter((m) => {
    const hitKw = !keyword || m.content.includes(keyword)
    const hitCat = category === '全部' || m.category === category
    return hitKw && hitCat
  })
})
registerMock('GET', '/memory/categories', () => db.memory.categories)
registerMock('POST', '/memory', (body) => {
  const { content, category } = (body ?? {}) as { content: string; category: MemoryCategory }
  const item: Memory = {
    id: `mm${db.memory.seq++}`, content, category,
    source: '手动添加', sourceAt: '今天', confidence: 100, status: 'confirmed',
  }
  db.memory.items.unshift(item)
  return item
})
registerMock('DELETE', '/memory', (body) => {
  const { id } = (body ?? {}) as { id: string }
  db.memory.items = db.memory.items.filter((m) => m.id !== id)
  return { ok: true }
})
registerMock('GET', '/memory/detail', (body) => {
  const { id } = (body ?? {}) as { id: string }
  return db.memory.items.find((m) => m.id === id) ?? null
})
registerMock('POST', '/memory/confirm', (body) => {
  const { id } = (body ?? {}) as { id: string }
  const m = db.memory.items.find((x) => x.id === id)
  if (m) m.status = 'confirmed'
  return m ?? null
})
registerMock('PUT', '/memory/correct', (body) => {
  const { id, content } = (body ?? {}) as { id: string; content: string }
  const m = db.memory.items.find((x) => x.id === id)
  if (m) m.content = content
  return m ?? null
})

/** 记忆列表（支持关键字与分类筛选） */
export function listMemories(keyword = '', category: string = '全部'): Promise<Memory[]> {
  return request('GET', '/memory', { keyword, category })
}

export function listMemoryCategories(): Promise<Array<'全部' | MemoryCategory>> {
  return request('GET', '/memory/categories')
}

/** 新增记忆 */
export function addMemory(content: string, category: MemoryCategory): Promise<Memory> {
  return request('POST', '/memory', { content, category })
}

/** 删除记忆 */
export function deleteMemory(id: string): Promise<{ ok: boolean }> {
  return request('DELETE', '/memory', { id })
}

/** 记忆详情 */
export function getMemory(id: string): Promise<Memory | null> {
  return request('GET', '/memory/detail', { id })
}

/** 确认记忆为事实 */
export function confirmMemory(id: string): Promise<Memory | null> {
  return request('POST', '/memory/confirm', { id })
}

/** 更正记忆内容 */
export function correctMemory(id: string, content: string): Promise<Memory | null> {
  return request('PUT', '/memory/correct', { id, content })
}
