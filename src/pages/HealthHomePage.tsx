import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/ui'
import { Head, Block, Row } from '../components/blocks'

/** 19 健康首页（v4 长滚动：模块宫格 + 常用记录 + 更多 + 其他服务） */
export default function HealthHomePage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <TopBar title="健康与记录" backTo="/" tone="teal" />
      <div className="page-body scroll">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 10 }}>
          <button className="card" style={{ padding: '14px 16px', textAlign: 'left', border: 'none' }} onClick={() => navigate('/sleep/pick')}>
            <div style={{ fontSize: 19.5, fontWeight: 800 }}>睡眠</div>
            <div className="blk-row-sub">助眠、睡眠记录</div>
          </button>
          <button className="card" style={{ padding: '14px 16px', textAlign: 'left', border: 'none' }} onClick={() => navigate('/health/device')}>
            <div style={{ fontSize: 19.5, fontWeight: 800 }}>设备与资料</div>
            <div className="blk-row-sub">设备、健康资料</div>
          </button>
          {(['运动', '饮食', '生理指标', '预约'] as const).map((t) => (
            <button key={t} className="card" style={{ padding: '14px 16px', textAlign: 'left', border: 'none', opacity: 0.55, cursor: 'default' }}>
              <div style={{ fontSize: 19.5, fontWeight: 800 }}>{t}</div>
              <div className="blk-row-sub">即将开放</div>
            </button>
          ))}
        </div>
        <Block>
          <Row title="早晨说说睡得怎样" sub="自填感受 · 可跳过" action="填写" tone="teal" onClick={() => navigate('/health/feedback')} />
          <Row title="查看睡眠记录" sub="自己的感受与设备估算分开看" action="查看" tone="teal" onClick={() => navigate('/health/data')} />
          <Row title="连接设备（可选）" sub="当前未连接 · 向下还有更多" action="连接" tone="teal" onClick={() => navigate('/health/device')} />
        </Block>
        <Head>更多</Head>
        <Block>
          <Row title="睡前放松" sub="首页也可直达 · 无设备也能听" action="去听" tone="teal" onClick={() => navigate('/sleep/pick')} />
          <Row title="助眠内容与场景" sub="故事、雨声、放松引导与自主搭配" action="选择" tone="teal" onClick={() => navigate('/sleep/pick')} />
          <Row title="数据管理" sub="自填记录、设备估算与授权管理" action="查看" tone="teal" onClick={() => navigate('/health/me')} />
          <Row title="私密医疗记录" sub="未授权 · 按特定目的单独授权" action="管理" tone="teal" onClick={() => navigate('/health/medical')} />
        </Block>
        <Head>其他健康服务</Head>
        <Block>
          {(['运动', '饮食', '生理指标', '预约'] as const).map((t, i) => (
            <Row key={t} title={t} sub="即将开放" {...(i < 3 ? {} : {})} />
          ))}
        </Block>
      </div>
    </div>
  )
}
