import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMemory, deleteMemory, correctMemory } from '../api/memory'
import type { Memory } from '../api/types'
import { TopBar } from '../components/ui'
import { Block, BlockBtn, BottomBar } from '../components/blocks'

/** 18 记忆详情（v4 长滚动：事实 + 更正复核 + 撤回删除分开 + 危险区） */
export default function MemoryDetailPage() {
  const { id = '' } = useParams()
  const [memory, setMemory] = useState<Memory | null>(null)
  const [correcting, setCorrecting] = useState(false)
  const [draft, setDraft] = useState('')

  useEffect(() => {
    getMemory(id).then(setMemory)
  }, [id])

  function remove() {
    void deleteMemory(id)
    history.back()
  }

  function correct() {
    if (!draft.trim() || !memory) return
    const content = draft.trim()
    setCorrecting(false)
    setMemory({ ...memory, content })
    void correctMemory(id, content)
  }

  return (
    <div className="page">
      <TopBar title="记忆详情" backTo="/memory" />
      <div className="page-body scroll">
        <Block>
          <div className="blk-note">已确认事实 · 示例</div>
          <div className="blk-title">{memory?.content ?? '您喜欢吃饺子'}</div>
          <div className="blk-note">来源：{memory?.source ?? '您的对话'} · {memory?.sourceAt ?? '10月15日'}</div>
        </Block>
        <Block title="更正前，请您复核">
          <div className="blk-note">新内容先请您确认，确认后才替换旧信息；不确认则保留原内容。</div>
          <BlockBtn label="复核更正内容" onClick={() => { setDraft(memory?.content ?? ''); setCorrecting(true) }} />
        </Block>
        {correcting && (
          <Block>
            <div className="life-inline" style={{ display: 'flex', gap: 8 }}>
              <div className="input" style={{ flex: 1 }}>
                <input autoFocus value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && correct()} />
              </div>
              <button className="btn btn-primary btn-sm" style={{ height: 46 }} onClick={correct}>保存</button>
            </div>
          </Block>
        )}
        <Block title="待确认：暂无事实">
          <div className="blk-note">内容含糊时先询问您。模糊候选项不会保存，也不会作为事实使用；推测与已确认事实分开。</div>
        </Block>
        <Block title="撤回授权，不等于删除记忆">
          <div className="blk-note">撤回记忆授权，会停止后续收集和使用，但不会自动删除已经存储的内容。</div>
          <BlockBtn label="查看或撤回记忆授权" />
        </Block>
        <Block title="删除这条记忆">
          <div className="blk-note">删除后，这条已存细节不会再用于未来对话。删除与撤回授权分开处理。</div>
          <div className="blk-note">先核对这条记忆，下一步再次确认后才删除；取消则保留。</div>
          <BlockBtn label="查看并再次确认删除" onClick={remove} />
        </Block>
      </div>
      <BottomBar left="返回" right="内容不对，改一下" onLeft={() => history.back()} onRight={() => { setDraft(memory?.content ?? ''); setCorrecting(true) }} />
    </div>
  )
}
