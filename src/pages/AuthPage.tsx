import { useNavigate } from 'react-router-dom'
import { setGrant } from '../api/grants'
import { TopBar } from '../components/ui'
import { Block, BlockBtn, BottomBar } from '../components/blocks'

/** 17 单项授权（v4：仅询问兴趣记忆 + 撤回删除分开） */
export default function AuthPage() {
  const navigate = useNavigate()

  function allow(granted: boolean) {
    if (granted) void setGrant('memory', true)
    navigate('/settings/privacy')
  }

  return (
    <div className="page">
      <TopBar title="单项授权" backTo="/settings/privacy" />
      <div className="page-body scroll">
        <Block title="要让小伴记住兴趣吗？">
          <div className="blk-note">用途：让今后的聊天更贴合您的兴趣。</div>
          <div className="blk-note">范围：仅保存您明确确认的兴趣。</div>
          <div className="blk-note">不含健康或医疗信息，不授权其他项目。</div>
          <div className="blk-note">有效期：直到您撤回。</div>
          <div className="blk-note" style={{ marginTop: 6 }}>暂不记住，也能继续聊天和使用基础助眠。</div>
        </Block>
        <Block title="每次保存或使用前，都检查授权" />
        <Block title="撤回：停止后续收集和使用">
          <div className="blk-note">撤回不会自动删除已保存的兴趣。若要移除已存记忆，请另行选择删除。</div>
          <BlockBtn label="查看或撤回记忆授权" />
          <BlockBtn label="查看已保存记忆与删除选项" onClick={() => navigate('/memory')} />
        </Block>
      </div>
      <BottomBar left="暂不记住" right="同意记住" onLeft={() => allow(false)} onRight={() => allow(true)} />
    </div>
  )
}
