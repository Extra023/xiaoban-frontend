import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/ui'
import { Block, BottomBar } from '../components/blocks'

/** 08 选择助眠内容（v4：推荐卡片 + 可选调整 + 就听这个） */
export default function SleepPickPage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <TopBar title="睡前放松" backTo="/sleep/monitor" tone="purple" />
      <div className="page-body scroll">
        <Block title="灯笼花园 · 温柔故事 8分钟">
          <div className="blk-note">为您新编的故事 · 示例</div>
          <div className="blk-note">故事结束后，轻柔雨声继续至定时关闭。</div>
        </Block>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-purple-soft btn-block" style={{ height: 48 }} onClick={() => navigate('/sleep/swap')}>换个内容</button>
          <button className="btn btn-purple-soft btn-block" style={{ height: 48 }} onClick={() => navigate('/sleep/sound')}>声音与定时</button>
        </div>
      </div>
      <BottomBar left="就听这个" tone="purple" onLeft={() => navigate('/sleep/playing')} />
    </div>
  )
}
