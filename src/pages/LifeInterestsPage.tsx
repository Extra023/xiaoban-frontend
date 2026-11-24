import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/ui'
import { Block, BlockBtn, BottomBar } from '../components/blocks'

/** 14 生活与兴趣（v4 长滚动：自愿选择 + 已确认事实 + 待确认） */
export default function LifeInterestsPage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <TopBar title="生活与兴趣" backTo="/companion" />
      <div className="page-body scroll">
        <Block>
          <BlockBtn label="选择兴趣爱好" />
          <BlockBtn label="添加日常习惯" />
          <BlockBtn label="添加生活故事" />
          <div className="blk-note">除非必要，请勿填写他人的私人信息、地址或医疗信息。</div>
        </Block>
        <Block title="已确认事实 · 示例">
          <div className="blk-note">您喜欢饺子。</div>
          <div className="blk-note">来源：对话 · 10月15日 · 示例记录</div>
          <BlockBtn label="编辑这条内容" />
          <BlockBtn label="查看并确认删除" />
        </Block>
        <Block title="待确认：暂无内容">
          <div className="blk-note">所有变更先请您确认。只有您明确确认并同意保存的信息，才会成为长期记忆。</div>
          <BlockBtn label="查看待确认的更改" />
        </Block>
      </div>
      <BottomBar left="以后再说" onLeft={() => navigate('/companion')} />
    </div>
  )
}
