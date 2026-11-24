import { TopBar } from '../components/ui'
import { Block, BlockBtn, BottomBar } from '../components/blocks'

/** 21 睡眠记录（v4 长滚动：两种来源分开 + 示例 + 理解边界 + 管理） */
export default function SleepDataPage() {
  return (
    <div className="page">
      <TopBar title="睡眠健康数据" backTo="/health" tone="teal" />
      <div className="page-body scroll">
        <Block title="自己说的">
          <div className="blk-note">来源：本人自述 · 暂无已保存记录</div>
        </Block>
        <Block title="设备估计">
          <div className="blk-note">尚未连接设备 · 没有采集数据</div>
        </Block>
        <Block>
          <div className="blk-note">自述与设备分开看，都不是诊断。</div>
        </Block>
        <Block title="查看示例 · 不是您的实际记录">
          <div className="blk-note">自述示例</div>
          <div className="blk-note">来源：本人自述（示例）2026年11月5日（Nov 5）8:10 睡眠质量：一般 · 早晨疲劳：有</div>
          <div className="blk-note" style={{ marginTop: 8 }}>设备估计示例</div>
          <div className="blk-note">来源：示例来源，非已连接设备。示例更新：2026年11月5日 8:00</div>
          <div className="blk-note">估算睡眠：6小时40分钟 静息心率：68次/分钟 日常活动：3,200步</div>
          <BlockBtn label="退出示例" tone="teal" />
        </Block>
        <Block title="不能据此判断已经睡着">
          <div className="blk-note">设备可能误估睡眠，也可能漏掉清醒时段。播放或停止音频，不是入睡依据。自述与设备估计保持分开，都不是诊断。</div>
        </Block>
        <Block title="陪伴只用获授权的最小摘要">
          <div className="blk-note">需单独授权，例如“您报告感到疲劳”。完整健康记录不会自动进入日常聊天。</div>
          <BlockBtn label="查看摘要使用授权" tone="teal" />
        </Block>
        <Block title="资料由您管理">
          <BlockBtn label="修改自述答案" tone="teal" />
          <BlockBtn label="清除自述数据" tone="teal" />
          <BlockBtn label="清除外部数据" tone="teal" />
          <BlockBtn label="选择保留期限" tone="teal" />
          <div className="blk-note" style={{ marginTop: 6 }}>清除前再次确认资料类别与日期。撤回授权立即停止后续使用，不会自动清除旧资料。</div>
        </Block>
      </div>
      <BottomBar tone="teal" left="查看示例" onLeft={() => undefined} />
    </div>
  )
}
