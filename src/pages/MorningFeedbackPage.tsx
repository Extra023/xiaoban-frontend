import { useState } from 'react'
import { TopBar } from '../components/ui'
import { Block, BlockBtn, BottomBar } from '../components/blocks'

const MAIN = ['睡得好', '一般', '没睡好']

/** 20 晨间反馈（v4 长滚动：只问一件事 + 更多选填 + 提醒授权 + 更正删除） */
export default function MorningFeedbackPage() {
  const [picked, setPicked] = useState<string | null>(null)

  return (
    <div className="page">
      <TopBar title="晨间反馈" backTo="/health" tone="teal" />
      <div className="page-body scroll">
        <Block title="昨晚睡得怎么样？">
          <div className="blk-note">{picked ? `已选择：${picked}` : '尚未选择 · 选择后才能保存'}</div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            {MAIN.map((m) => (
              <button
                key={m}
                className={`btn btn-block ${picked === m ? 'btn-teal' : 'btn-teal-soft'}`}
                style={{ height: 48 }}
                onClick={() => setPicked(m)}
              >
                {m}
              </button>
            ))}
          </div>
          <BlockBtn label="今天不填" tone="teal" />
        </Block>
        <Block title="自己说的，与设备估计分开">
          <div className="blk-note">示例日期：2026年11月5日（Nov 5）</div>
          <div className="blk-note">目前没有保存答案。跳过或未回答不代表睡着。这是自述，不是诊断。</div>
        </Block>
        <Block title="更多问题 · 都可以不填">
          <div className="blk-note">现在精神怎么样？</div>
          <BlockBtn label="很有精神" tone="teal" />
          <BlockBtn label="还可以" tone="teal" />
          <BlockBtn label="有点累" tone="teal" />
          <div className="blk-note" style={{ marginTop: 8 }}>昨晚醒过吗？</div>
          <BlockBtn label="没有" tone="teal" />
          <BlockBtn label="一次" tone="teal" />
          <BlockBtn label="一次以上" tone="teal" />
          <BlockBtn label="不确定" tone="teal" />
          <div className="blk-note" style={{ marginTop: 8 }}>现在累吗？</div>
          <BlockBtn label="没有" tone="teal" />
          <BlockBtn label="稍微有点" tone="teal" />
          <BlockBtn label="很疲惫" tone="teal" />
        </Block>
        <Block title="提醒由您决定">
          <div className="blk-note">晨间提醒默认关闭。单独授权后才提醒。示例提醒时间：8:00，可修改。睡前提醒与助眠预先授权需另行同意。</div>
          <BlockBtn label="设置晨间提醒" tone="teal" />
          <BlockBtn label="查看助眠预先授权" tone="teal" />
        </Block>
        <Block title="保存后也能修改或删除">
          <div className="blk-note">保留自述来源与日期；设备估计另页记录。删除前再次确认，不把未填内容补成答案。</div>
          <BlockBtn label="修改已保存的自述" tone="teal" />
          <BlockBtn label="删除已保存的自述" tone="teal" />
        </Block>
      </div>
      <BottomBar tone="teal" left="保存感受" onLeft={() => undefined} />
    </div>
  )
}
