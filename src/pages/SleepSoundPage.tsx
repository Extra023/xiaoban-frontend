import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/ui'
import { Head, Block, Row, BlockBtn, BottomBar } from '../components/blocks'

/** 11 声音与定时（v4 长滚动：音量/定时 + 放松方式 + 偏好确认 + 可选设置） */
export default function SleepSoundPage() {
  const navigate = useNavigate()
  const [volume, setVolume] = useState(30)

  return (
    <div className="page">
      <TopBar title="声音与定时" backTo="/sleep/pick" tone="purple" />
      <div className="page-body scroll">
        <Block title={`音量 ${volume}%`}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
            <button className="btn btn-purple-soft btn-block" style={{ height: 48 }} onClick={() => setVolume((v) => Math.max(0, v - 10))}>声音小一点</button>
            <button className="btn btn-purple-soft btn-block" style={{ height: 48 }} onClick={() => setVolume((v) => Math.min(100, v + 10))}>声音大一点</button>
          </div>
          <div className="blk-note">完成只改本次 · 向下查看更多选项</div>
        </Block>
        <Block>
          <Row title="当前30分钟关闭" action="更改" tone="purple" />
        </Block>
        <Head>更多声音选项</Head>
        <Block title="什么时候关闭音频？">
          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <button className="btn btn-purple-soft btn-block" style={{ height: 48 }}>不定时（0）</button>
            <button className="btn btn-purple-soft btn-block" style={{ height: 48 }}>15分钟</button>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-purple btn-block" style={{ height: 48 }}>30分钟 · 当前</button>
            <button className="btn btn-purple-soft btn-block" style={{ height: 48 }}>60分钟</button>
          </div>
        </Block>
        <Block title="想怎样放松？不必填写偏好问卷。">
          <BlockBtn label="听故事" tone="purple" />
          <BlockBtn label="听自然声" tone="purple" />
          <BlockBtn label="不播音频" tone="purple" />
          <div className="blk-note" style={{ marginTop: 10 }}>语音风格：温柔</div>
          <BlockBtn label="调整语音风格" tone="purple" />
        </Block>
        <Block title="长期保存前，请再次核对">
          <div className="blk-note">仅在您选择“设为常用”后询问：将故事、温柔语气、音量30%和30分钟关闭设为常用吗？</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
            <button className="btn btn-purple btn-block" style={{ height: 48 }}>确认并保存</button>
            <button className="btn btn-purple-soft btn-block" style={{ height: 48 }}>暂不保存</button>
          </div>
        </Block>
        <Block>
          <Row title="查看已保存偏好" action="查看" tone="purple" />
          <Row title="撤回并删除偏好" sub="随时撤回，不影响基础助眠" action="管理" tone="purple" />
        </Block>
        <Block>
          <div className="blk-note">主动表达、对话反馈、收藏和评价可作为线索。选择与播放统计须单独授权；线索仅供参考，更新长期偏好仍需您确认。</div>
        </Block>
        <Head>可选设置</Head>
        <Block>
          <Row title="睡眠监测（可选）" sub="设备未连接 · 监测未开启" action="设置" tone="purple" onClick={() => navigate('/sleep/monitor')} />
          <Row title="睡前提醒（可选）" sub="未授权 · 当前关闭" action="设置" tone="purple" />
        </Block>
      </div>
      <BottomBar tone="purple" left="完成" right="设为常用" onLeft={() => navigate('/sleep/pick')} onRight={() => navigate('/sleep/pick')} />
    </div>
  )
}
