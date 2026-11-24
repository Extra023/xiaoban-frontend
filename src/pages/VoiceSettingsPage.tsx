import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/ui'
import { Head, Block, Row, BlockBtn, BottomBar } from '../components/blocks'

/** 13 字和声音（v4 长滚动：两项常用 + 更多设置 + 删除偏好） */
export default function VoiceSettingsPage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <TopBar title="字和声音" backTo="/settings" />
      <div className="page-body scroll">
        <Block>
          <Row title="字的大小" sub="当前：标准大字" action="改为更大" />
          <Row title="说话速度" sub="当前：正常" action="改为慢一点" />
        </Block>
        <Head>更多设置 · 向下查看</Head>
        <Block>
          <Row title="称呼：王爷爷" />
          <BlockBtn label="修改称呼" />
          <Row title="语言：简体中文" />
          <div className="blk-note">可以说“叫我王爷爷”或“说得慢一点”。小伴会请您确认，确认后才生效。</div>
        </Block>
        <Block>
          <div className="blk-note">先查看要删除的偏好，再次确认后才删除；取消会保留原设置。</div>
          <BlockBtn label="查看并确认删除" />
        </Block>
      </div>
      <BottomBar left="暂不修改" right="保存设置" onLeft={() => navigate('/settings')} onRight={() => navigate('/settings')} />
    </div>
  )
}
