import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/ui'
import { Head, Block, Row, BlockBtn, BottomBar } from '../components/blocks'

/** 03 陪伴档案（v4 长滚动：档案 + 聊天方式详情 + 生活兴趣 + 我们的故事） */
export default function CompanionPage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <TopBar title="陪伴档案" backTo="/" action="保存" onAction={() => navigate('/')} />
      <div className="page-body scroll">
        <Block>
          <Row title="女儿 — 小芳" sub="语音示例" />
          <BlockBtn label="播放语音示例" />
        </Block>
        <Row title="聊天方式" action="调整" onClick={() => navigate('/prefs/chat')} />
        <Row title="生活与兴趣" action="查看" onClick={() => navigate('/prefs/life')} />

        <div style={{ height: 10 }} />
        <Head>聊天方式 · 详细设置</Head>
        <Block>
          <Row title="亲和度" action="调整" />
          <Row title="幽默感" action="调整" />
          <Row title="语气正式度" action="调整" />
          <Row title="对话频率" action="调整" />
          <div className="blk-note" style={{ margin: '6px 4px 8px' }}>少问问题 · 更活泼 · 更温柔的语气…</div>
          <BlockBtn label="调整本次对话" primary />
          <BlockBtn label="长期调整 · 确认后保存" />
        </Block>

        <Head>生活与兴趣</Head>
        <Block>
          <Row title="兴趣爱好" action="添加" />
          <Row title="日常习惯" action="添加" />
          <Row title="个人故事" action="添加" />
        </Block>

        <Head>我们的故事</Head>
        <Block>
          <div className="blk-note">首次聊天：10 月 10 日</div>
          <div className="blk-note">10 月 15 日 · 学习到最爱食物：饺子</div>
          <div className="blk-note">10 月 18 日 · 设置睡前提醒</div>
          <Row title="版本记录与恢复" sub="可恢复旧版本，恢复前再次确认" action="查看" />
        </Block>
      </div>
      <BottomBar left="完成" onLeft={() => navigate('/')} />
    </div>
  )
}
