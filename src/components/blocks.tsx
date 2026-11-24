import type { ReactNode } from 'react'

/** 区块标题（如「更多设置 · 向下查看」） */
export function Head({ children }: { children: ReactNode }) {
  return <div className="blk-head">{children}</div>
}

/** 白底圆角区块：可选标题 + 说明文字 + 子内容 */
export function Block({ title, note, children, style }: { title?: ReactNode; note?: ReactNode; children?: ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="blk" style={style}>
      {title != null && <div className="blk-title">{title}</div>}
      {note != null && <div className="blk-note">{note}</div>}
      {children}
    </div>
  )
}

/** 通用行：标题(+副文) + 右侧操作文字 */
export function Row(props: { title: ReactNode; sub?: ReactNode; action?: ReactNode; onClick?: () => void; tone?: string }) {
  return (
    <div className="blk-row" onClick={props.onClick} style={props.onClick ? { cursor: 'pointer' } : undefined}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="blk-row-title">{props.title}</div>
        {props.sub != null && <div className="blk-row-sub">{props.sub}</div>}
      </div>
      {props.action != null && <div className={`blk-row-action ${props.tone ?? ''}`}>{props.action}</div>}
    </div>
  )
}

/** 整宽按钮（区块内，48px 高） */
const BTN_SOFT: Record<string, string> = { orange: 'btn-orange-soft', purple: 'btn-purple-soft', teal: 'btn-teal-soft' }
const BTN_PRI: Record<string, string> = { orange: 'btn-primary', purple: 'btn-purple', teal: 'btn-teal' }
export function BlockBtn(props: { label: ReactNode; primary?: boolean; onClick?: () => void; tone?: 'orange' | 'purple' | 'teal' }) {
  const t = props.tone ?? 'orange'
  return (
    <button className={`btn btn-block ${props.primary ? BTN_PRI[t] : BTN_SOFT[t]}`} style={{ height: 46, marginTop: 4 }} onClick={props.onClick}>
      {props.label}
    </button>
  )
}

/** 底部双按钮（原「常驻大按钮」） */
export function BottomBar(props: { left: ReactNode; right?: ReactNode; onLeft?: () => void; onRight?: () => void; tone?: 'orange' | 'purple' | 'teal' }) {
  const t = props.tone ?? 'orange'
  return (
    <div className="page-bottom">
      {props.right != null ? (
        <>
          <button className={`btn ${BTN_SOFT[t]} btn-block`} onClick={props.onLeft}>{props.left}</button>
          <button className={`btn ${BTN_PRI[t]} btn-block`} onClick={props.onRight}>{props.right}</button>
        </>
      ) : (
        <button className={`btn ${BTN_PRI[t]} btn-block`} onClick={props.onLeft}>{props.left}</button>
      )}
    </div>
  )
}
