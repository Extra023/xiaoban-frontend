import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/ui'
import { Head, Block, Row, BlockBtn } from '../components/blocks'

/** 05 设置（v4 长滚动：概览行 + 字和声音 + 睡前设置 + 隐私与提醒 + 更多功能 + 重置） */
export default function SettingsPage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <TopBar title="设置" backTo="/" />
      <div className="page-body scroll">
        <Row title="字和声音" action="调整" onClick={() => navigate('/settings/voice')} />
        <Row title="睡前设置" action="调整" onClick={() => navigate('/sleep/sound')} />
        <Row title="隐私与提醒" action="查看" onClick={() => navigate('/settings/privacy')} />

        <div style={{ height: 10 }} />
        <Head>字和声音</Head>
        <Block>
          <Row title="字体大小" sub="默认：大号" action="调整" />
          <Row title="高对比度" action="调整" />
          <Row title="语音速度" sub="0.8x · 1.0x · 1.5x" action="选择" />
          <Row title="语言与昵称" action="调整" />
        </Block>

        <Head>睡前设置</Head>
        <Block>
          <div className="blk-note">睡前放松由您主动开始；修改设置不会自动播放。</div>
          <Row title="音频与语气" action="选择" />
          <Row title="播放音量" action="调整" />
          <Row title="定时关闭" action="设置" />
          <Row title="助眠执行状态" sub="查看播放、音量、定时与执行回执" action="查看" onClick={() => navigate('/sleep/playback')} />
        </Block>

        <Head>隐私与提醒</Head>
        <Block>
          <div className="blk-note">授权由您决定，确认后开启；不默认同意。</div>
          <Row title="用药提醒授权" action="设置" />
          <Row title="天气提醒授权" action="设置" />
          <Row title="主动关怀与静默时段" action="设置" />
          <Row title="数据与授权管理" sub="授权记录与已存数据" action="查看" />
          <Row title="语音数据" sub="30 天后自动删除" action="查看" />
        </Block>

        <Head>更多功能</Head>
        <Block>
          <Row title="内容库" action="查看" />
          <Row title="小伴记住的事" action="查看" onClick={() => navigate('/memory')} />
          <Row title="更新记忆" action="更新" />
          <Row title="工具权限" sub="逐项说明用途，需您确认" action="设置" />
          <Row title="执行记录" action="查看" />
        </Block>

        <Block>
          <div className="blk-note">重置会影响现有设置与数据；请先查看说明，二次确认后才执行。</div>
          <BlockBtn label="重置小伴 · 需二次确认" />
        </Block>
      </div>
    </div>
  )
}
