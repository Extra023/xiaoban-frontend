import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/ui'
import { Block } from '../components/blocks'

/** 07 助眠入口 · 睡眠监测确认（v4：监测可选，不连接也能用） */
export default function SleepMonitorPage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <TopBar title="睡眠监测（可选）" backTo="/" tone="purple" />
      <div className="page-body scroll">
        <Block title="当前未连接设备 · 监测未开启" />
        <Block>
          <div className="blk-note">心率、呼吸须设备支持并单独授权。</div>
          <div className="blk-note">可随时撤回，关闭不影响常用助眠。</div>
        </Block>
      </div>
      <div className="page-bottom">
        <button className="btn btn-purple-soft btn-block" onClick={() => navigate('/health/device')}>去连接设备</button>
        <button className="btn btn-purple btn-block" onClick={() => navigate('/sleep/pick')}>暂不开启</button>
      </div>
    </div>
  )
}
