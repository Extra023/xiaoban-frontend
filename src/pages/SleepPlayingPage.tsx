import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/ui'
import { Head, Block, Row, BlockBtn, BottomBar } from '../components/blocks'

/** 09 正在播放（v4 长滚动：播放状态 + 更多选项 + 评价 + 隐私边界） */
export default function SleepPlayingPage() {
  const navigate = useNavigate()
  const [playing, setPlaying] = useState(true)

  return (
    <div className="page">
      <TopBar title="正在播放" backTo="/sleep/pick" tone="purple" />
      <div className="page-body scroll">
        <Block title="灯笼花园 + 轻柔雨声">
          <div className="blk-note">{playing ? '示例播放状态 · 返回不等于停止' : '已暂停 · 示例'}</div>
        </Block>
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <button className="btn btn-purple-soft btn-block" style={{ height: 48 }}>声音小一点</button>
          <button className="btn btn-purple-soft btn-block" style={{ height: 48 }}>声音大一点</button>
        </div>
        <BlockBtn label="30分钟关闭" tone="purple" />
        <div style={{ height: 10 }} />
        <Head>更多播放选项 · 向下查看</Head>
        <Block>
          <div className="blk-note">也可以说：“暂停”“停止”或“声音小一点”。</div>
        </Block>
        <Block>
          <Row title="收藏此场景" sub="仅作偏好线索，不自动长期保存" action="收藏" tone="purple" />
          <Row title="换个内容" action="选择" tone="purple" onClick={() => navigate('/sleep/swap')} />
          <Row title="单独关闭背景" sub="只关轻柔雨声，保留故事" action="关闭" tone="purple" />
          <Row title="自己搭配" sub="调整引导、故事与背景的顺序" action="调整" tone="purple" />
        </Block>
        <Head>本次内容合适吗？</Head>
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <button className="btn btn-purple-soft btn-block" style={{ height: 48 }}>喜欢</button>
          <button className="btn btn-purple-soft btn-block" style={{ height: 48 }}>不太适合</button>
        </div>
        <Block>
          <div className="blk-note">不凭沉默、播放时长或定时推断入睡。故事结束后雨声可继续至定时关闭。收藏和评价不自动保存为长期偏好。</div>
        </Block>
        <Block>
          <Row title="早晨说说睡得怎样" sub="主观感受与设备数据分开 · 可跳过" action="填写" tone="purple" onClick={() => navigate('/health/feedback')} />
        </Block>
      </div>
      <BottomBar
        tone="purple"
        left={playing ? '暂停' : '继续'}
        right="结束播放"
        onLeft={() => setPlaying((p) => !p)}
        onRight={() => navigate('/sleep/end')}
      />
    </div>
  )
}
