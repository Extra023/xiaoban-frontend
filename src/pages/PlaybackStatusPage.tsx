import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/ui'
import { Block, BlockBtn, BottomBar } from '../components/blocks'

/** 12 播放情况（v4 长滚动：空闲示例 + 执行状态 + 回执 + 收藏 + 边界说明） */
export default function PlaybackStatusPage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <TopBar title="播放情况" backTo="/sleep/pick" tone="purple" />
      <div className="page-body scroll">
        <Block title="当前没有声音在播放">
          <div className="blk-note">示例 · 空闲</div>
        </Block>
        <Block title="设置还没有执行">
          <div className="blk-note">音量设置：30% · 未发送、未执行</div>
          <div className="blk-note">定时关闭：30分钟 · 未启动</div>
          <div className="blk-note">这些只是原有示例参数，不代表播放器已更改。播放、暂停、停止和调整统一在助眠页操作。</div>
        </Block>
        <Block title="尚无回执">
          <BlockBtn label="查看操作回执" tone="purple" />
        </Block>
        <Block title="只有您主动选择才收藏">
          <div className="blk-note">灯笼花园 · 故事</div>
          <BlockBtn label="取消收藏（示例）" tone="purple" />
          <div className="blk-note" style={{ marginTop: 10 }}>轻柔雨声 · 自然音</div>
          <BlockBtn label="取消收藏（示例）" tone="purple" />
        </Block>
        <Block title="播放情况不代表睡眠或偏好">
          <div className="blk-note">不能根据播放、停止或任务结束判断您已睡着。结束后清理临时状态，仅保留操作、时间与结果。不会自动生成长期偏好。</div>
        </Block>
      </div>
      <BottomBar tone="purple" left="查看详细状态" right="回到助眠" onLeft={() => history.back()} onRight={() => navigate('/sleep/pick')} />
    </div>
  )
}
