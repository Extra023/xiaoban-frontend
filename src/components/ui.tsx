import type { ReactNode } from 'react'
import { Icon } from './Icon'
import type { IconName } from './Icon'
import { useSmartBack } from '../hooks/useSmartBack'

type Tone = 'orange' | 'purple' | 'teal' | 'red' | 'ink'

interface TopBarProps {
  title?: ReactNode
  onBack?: () => void
  action?: ReactNode
  actionTone?: Tone
  onAction?: () => void
  right?: ReactNode
  backTo?: string
  /** 返回药丸色调（v3 统一返回按钮） */
  tone?: 'orange' | 'purple' | 'teal'
}

/** 通用顶栏：返回药丸 + 居中标题 + 右侧操作 */
export function TopBar({ title, onBack, action, actionTone = 'orange', onAction, right, backTo, tone = 'orange' }: TopBarProps) {
  const smartBack = useSmartBack(backTo ?? '/')
  const handleBack = () => {
    if (onBack) return onBack()
    smartBack()
  }
  return (
    <div className="topbar">
      <div className="topbar-side">
        <button className={`back-pill t-${tone}`} onClick={handleBack} aria-label="返回">
          <Icon name="back" size={15} strokeWidth={2.2} />
          返回
        </button>
      </div>
      {title != null && <div className="topbar-title">{title}</div>}
      <div className="topbar-side topbar-right">
        {action != null && (
          <button className={`topbar-action t-${actionTone}`} onClick={onAction}>
            {action}
          </button>
        )}
        {right}
      </div>
    </div>
  )
}

/** 列表行 */
export function ListRow(props: {
  icon?: IconName
  iconTone?: 'orange' | 'purple' | 'teal'
  title: ReactNode
  sub?: ReactNode
  extra?: ReactNode
  onClick?: () => void
  right?: ReactNode
}) {
  return (
    <div className="row" onClick={props.onClick} style={props.onClick ? { cursor: 'pointer' } : undefined}>
      {props.icon && (
        <div className={`row-icon ${props.iconTone ?? 'orange'}`}>
          <Icon name={props.icon} size={21} />
        </div>
      )}
      <div className="row-main">
        <div className="row-title">{props.title}</div>
        {props.sub != null && <div className="row-sub">{props.sub}</div>}
      </div>
      {props.extra != null && <div className="row-extra">{props.extra}</div>}
      {props.right ?? (
        <div className="row-chevron">
          <Icon name="chevron-right" size={18} />
        </div>
      )}
    </div>
  )
}

/** 开关（带状态文案） */
export function Toggle(props: { on: boolean; onChange: (on: boolean) => void; stateText?: string; tone?: 'orange' | 'purple' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {props.stateText != null && <span className="toggle-state">{props.stateText}</span>}
      <button
        className={`toggle ${props.on ? 'on' : ''} ${props.tone === 'purple' ? 'on-purple' : ''}`}
        onClick={(e) => {
          e.stopPropagation()
          props.onChange(!props.on)
        }}
        aria-pressed={props.on}
      />
    </div>
  )
}

/** 步骤指示点 */
export function StepDots({ total, current }: { total: number; current: number }) {
  return (
    <span className="stepdots">
      {Array.from({ length: total }, (_, i) => (
        <i key={i} className={i === current ? 'on' : ''} />
      ))}
    </span>
  )
}

/** 聊天/语音波形 */
export function WaveBars({ playing = false, n = 5 }: { playing?: boolean; n?: number }) {
  const heights = [7, 12, 9, 13, 8, 11, 6, 12]
  return (
    <span className={`waveform ${playing ? 'playing' : ''}`}>
      {Array.from({ length: n }, (_, i) => (
        <i key={i} style={{ height: heights[i % heights.length] }} />
      ))}
    </span>
  )
}

/** 头像占位 */
export function Avatar({ size = 64, kind = 'female', badge }: { size?: number; kind?: 'female' | 'elder'; badge?: ReactNode }) {
  return (
    <div style={{ position: 'relative', flex: 'none', width: size, height: size }}>
      <div className={`avatar ${kind === 'female' ? 'avatar-female' : 'avatar-elder'}`} style={{ width: size, height: size }}>
        <Icon name="family" size={size * 0.52} strokeWidth={0} filled style={{ opacity: 0.9 }} />
      </div>
      {badge}
    </div>
  )
}
