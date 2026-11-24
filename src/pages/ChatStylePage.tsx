import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/ui'
import { Block, BlockBtn, BottomBar } from '../components/blocks'

/** 15 聊天方式（v4 长滚动：只改本次 + 长期单独确认 + 版本记录） */
export default function ChatStylePage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <TopBar title="聊天方式" backTo="/companion" />
      <div className="page-body scroll">
        <Block title="这次想怎么聊？选一种，再点下方应用。">
          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <button className="btn btn-orange-soft btn-block" style={{ height: 48 }}>少问一点</button>
            <button className="btn btn-orange-soft btn-block" style={{ height: 48 }}>只听我说</button>
          </div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
            <button className="btn btn-orange-soft btn-block" style={{ height: 48 }}>活泼一点</button>
            <button className="btn btn-orange-soft btn-block" style={{ height: 48 }}>温柔一点</button>
          </div>
          <div className="blk-note">默认只改本次，对话结束后恢复，不会自动长期保存。</div>
        </Block>
        <Block>
          <div className="blk-note">选择后不会立刻生效，点“应用于本次对话”后才调整。临时调整结束后，已保存的语气设置保持不变。</div>
        </Block>
        <Block title="以后也这样聊？">
          <div className="blk-note">长期保存是另一个选择，默认不选择。先查看所选方式和将替换的设置，再次确认后才更新陪伴档案。取消则保留原设置。</div>
          <BlockBtn label="查看长期保存的内容" />
        </Block>
        <Block title="版本记录 · 示例，未应用">
          <div className="blk-note">当前：陪伴档案设置</div>
          <div className="blk-note">亲和度、幽默感、正式度、聊天频率仍可在资料中查看。本次调整与这些设置配合，不替换长期设置。</div>
          <BlockBtn label="查看陪伴档案设置" onClick={() => navigate('/companion')} />
          <div className="blk-note" style={{ marginTop: 8 }}>之前：原始语气</div>
          <div className="blk-note">先查看版本内容，确认后才恢复。</div>
          <BlockBtn label="查看并恢复原始语气" />
        </Block>
      </div>
      <BottomBar left="应用于本次对话" onLeft={() => navigate('/companion')} />
    </div>
  )
}
