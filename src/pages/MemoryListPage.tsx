import { useNavigate } from 'react-router-dom'
import { listMemories } from '../api/memory'
import { TopBar } from '../components/ui'
import { Block, Row, BlockBtn } from '../components/blocks'
import { useEffect, useState } from 'react'
import type { Memory } from '../api/types'
import { Icon } from '../components/Icon'

/** 04 小伴记住的事（v4 长滚动：搜索 + 记忆条目 + 添加 + 安全说明） */
export default function MemoryListPage() {
  const navigate = useNavigate()
  const [items, setItems] = useState<Memory[]>([])

  useEffect(() => {
    listMemories('').then(setItems)
  }, [])

  return (
    <div className="page">
      <TopBar title="小伴记住的事" backTo="/" />
      <div className="page-body scroll">
        <div className="input" style={{ marginBottom: 10 }}>
          <Icon name="search" size={18} style={{ color: 'var(--ink-3)', flex: 'none' }} />
          <input placeholder="搜索记住的事" />
        </div>
        <Block style={{ padding: '4px 14px' }}>
          {items.map((m, i) => (
            <Row
              key={m.id}
              title={m.content}
              sub={`来源：${m.source} · ${m.sourceAt}`}
              action="查看/更正"
              onClick={() => navigate(`/memory/${m.id}`)}
              {...(i === 0 ? {} : {})}
            />
          ))}
        </Block>
        <BlockBtn label="添加记忆" primary />
        <div className="note" style={{ margin: '4px 4px' }}>先打开该条详情；删除前会再次确认，列表不直接删除。</div>
      </div>
    </div>
  )
}
