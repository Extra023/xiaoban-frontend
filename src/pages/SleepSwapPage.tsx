import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/ui'
import { Head, Block, Row } from '../components/blocks'

/** 10 换个内容（v4 长滚动：内容入口 + 更多 + 自己搭配 + 推荐 + 提醒边界） */
export default function SleepSwapPage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <TopBar title="换个内容" backTo="/sleep/pick" tone="purple" />
      <div className="page-body scroll">
        <Block>
          <Row title="听睡前故事" action="选择" tone="purple" />
          <Row title="听雨声" action="选择" tone="purple" />
          <Row title="跟着放松" sub="舒缓引导 · 向下还有更多内容" action="选择" tone="purple" />
        </Block>
        <Head>更多内容</Head>
        <Block>
          <Row title="聊一会儿" action="聊天" tone="purple" />
          <Row title="音乐与自然声" sub="音乐、森林、海浪等声音" action="选择" tone="purple" />
          <Row title="固定故事" action="查看" tone="purple" />
          <Row title="为我新编故事" sub="AI生成 · 明确标注来源" action="选择" tone="purple" />
        </Block>
        <Block title="灯笼花园 · 8分钟">
          <div className="blk-note">为您新编的温柔故事 · 示例</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
            <button className="btn btn-purple-soft btn-block" style={{ height: 48 }}>试听</button>
            <button className="btn btn-purple-soft btn-block" style={{ height: 48 }}>换一个</button>
          </div>
        </Block>
        <Head>自己搭配</Head>
        <Block>
          <Row title="自由组合" sub="引导、故事与背景 · 可单独关闭背景" action="调整" tone="purple" />
        </Block>
        <Block title="雨夜慢读 · AI推荐示例">
          <div className="blk-note">温和放松2分钟，再听灯笼花园8分钟；可配轻柔雨声。只是建议，不自动执行。</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
            <button className="btn btn-purple btn-block" style={{ height: 48 }}>选这个内容</button>
            <button className="btn btn-purple-soft btn-block" style={{ height: 48 }}>换个推荐</button>
          </div>
        </Block>
        <Block>
          <Row title="声音与定时" sub="本次音量30% · 默认30分钟关闭" action="更改" tone="purple" onClick={() => navigate('/sleep/sound')} />
        </Block>
        <Head>可选提醒与晨间反馈</Head>
        <Block>
          <Row title="睡前提醒" sub="未授权 · 当前关闭" action="设置" tone="purple" />
        </Block>
        <Block>
          <div className="blk-note">睡前提醒和后续关怀均须预先单独授权，可随时撤回。不从沉默或播放推断就寝、入睡。</div>
          <div className="blk-note">本次临时选择在结束后清除；保存长期偏好需另行明确确认。</div>
        </Block>
        <Block>
          <Row title="早晨说说睡得怎样" sub="可跳过 · 主观感受与设备数据分开" action="填写" tone="purple" onClick={() => navigate('/health/feedback')} />
        </Block>
      </div>
    </div>
  )
}
