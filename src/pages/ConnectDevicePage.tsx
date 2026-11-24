import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/ui'
import { Block, BlockBtn, BottomBar } from '../components/blocks'

/** 22 连接设备（v4 长滚动：自愿连接 + 逐项授权 + 保留与停止） */
export default function ConnectDevicePage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <TopBar title="连接设备" backTo="/health" tone="teal" />
      <div className="page-body scroll">
        <Block title="没有设备也能用">
          <div className="blk-note">基础助眠、日常陪伴和晨间自述都不需要连接设备。</div>
        </Block>
        <Block title="先选来源，再看授权请求">
          <div className="blk-note">可选健康设备或健康数据服务。只显示实际可用选项，不假设已经连接。选择来源不等于同意读取数据。</div>
        </Block>
        <Block title="每类单独同意 · 全部未开启">
          <div className="blk-note">心率 · 未授权</div>
          <div className="blk-note">每分钟心跳数，用于健康总结。先查看用途、范围与期限，再决定。</div>
          <BlockBtn label="查看心率授权" tone="teal" />
          <div className="blk-note" style={{ marginTop: 8 }}>活动 · 未授权</div>
          <div className="blk-note">每日活动总量，用于活动摘要。先查看用途、范围与期限，再决定。</div>
          <BlockBtn label="查看活动授权" tone="teal" />
          <div className="blk-note" style={{ marginTop: 8 }}>设备睡眠估计 · 未授权</div>
          <div className="blk-note">仅用于睡眠摘要，不是诊断。先查看用途、范围与期限，再决定。</div>
          <BlockBtn label="查看设备睡眠估计授权" tone="teal" />
        </Block>
        <Block title="停止同步，不等于删除">
          <div className="blk-note">断开后立即停止后续同步。已经保存的数据不会自动删除。</div>
          <BlockBtn label="断开连接并停止同步" tone="teal" />
          <div className="blk-note" style={{ marginTop: 8 }}>已同步数据的保留期限需单独选择。</div>
          <BlockBtn label="选择保留期限" tone="teal" />
          <BlockBtn label="查看或删除已存数据" tone="teal" />
          <div className="blk-note" style={{ marginTop: 6 }}>删除前再次确认具体数据与日期。</div>
        </Block>
      </div>
      <BottomBar tone="teal" left="暂不连接" right="选择设备或服务" onLeft={() => navigate('/health')} onRight={() => undefined} />
    </div>
  )
}
