// 统一的 SVG 图标集（描边风格，视觉重量与 Figma 稿一致）
export type IconName =
  | 'back' | 'close' | 'chevron-right' | 'search' | 'play' | 'pause'
  | 'mic' | 'speaker' | 'heart-pulse' | 'gear' | 'plus' | 'check'
  | 'moon' | 'watch' | 'lock' | 'refresh' | 'brain' | 'bars' | 'info'
  | 'sun' | 'edit' | 'trash' | 'family' | 'wind' | 'book' | 'music' | 'history'

const PATHS: Record<IconName, string> = {
  back: 'M15 6l-6 6 6 6',
  close: 'M7 7l10 10M17 7L7 17',
  'chevron-right': 'M10 6l6 6-6 6',
  search: 'M11 4a7 7 0 1 0 4.9 12l4.6 4.6M11 4a7 7 0 0 1 4.9 12M11 4a7 7 0 0 0-4.9 12',
  play: 'M9 6.5v11l9-5.5z',
  pause: 'M8.5 6.5v11M15.5 6.5v11',
  mic: 'M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM6 11a6 6 0 0 0 12 0M12 17v3.5',
  speaker: 'M4 9.5v5h3.5L13 19V5L7.5 9.5H4zM16.5 9a4.5 4.5 0 0 1 0 6M19 6.5a8 8 0 0 1 0 11',
  'heart-pulse': 'M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10zM7 12h3l1.5-2.5 2 4L15 12h2.5',
  gear: 'M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zM19 12a7 7 0 0 0-.14-1.4l2-1.55-2-3.46-2.35.95a7 7 0 0 0-2.42-1.4L13.7 2.6h-3.4l-.4 2.54a7 7 0 0 0-2.4 1.4l-2.36-.95-2 3.46 2 1.55a7 7 0 0 0 0 2.8l-2 1.55 2 3.46 2.35-.95a7 7 0 0 0 2.42 1.4l.39 2.54h3.4l.4-2.54a7 7 0 0 0 2.4-1.4l2.36.95 2-3.46-2-1.55c.1-.45.14-.92.14-1.4z',
  plus: 'M12 5v14M5 12h14',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  moon: 'M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z',
  watch: 'M8 3.5h8M8 20.5h8M7 6.5h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2zM10.5 11.5l1.5 1.5 3-3',
  lock: 'M7 10.5V8a5 5 0 0 1 10 0v2.5M6.5 10.5h11v9h-11zM12 14.5v2.5',
  refresh: 'M20 12a8 8 0 1 1-2.34-5.66M20 3.5V8h-4.5',
  brain: 'M9.5 4A2.5 2.5 0 0 0 7 6.5c-1.8.5-3 2-3 4A4 4 0 0 0 5 17.6 3.6 3.6 0 0 0 8.5 21c1 0 1.8-.4 2.5-1V5.5A3 3 0 0 0 9.5 4zM14.5 4A2.5 2.5 0 0 1 17 6.5c1.8.5 3 2 3 4a4 4 0 0 1-1 7.1 3.6 3.6 0 0 1-3.5 3.4c-1 0-1.8-.4-2.5-1V5.5a3 3 0 0 1 1.5-1.5z',
  bars: 'M5 20v-8M12 20V5M19 20v-11',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 10.5V16M12 7.6v.4',
  sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 2.5V4.5M12 19.5v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2.5 12h2M19.5 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  edit: 'M4 20h4.5L20 8.5a2.1 2.1 0 0 0-3-3L5.5 17 4 20zM14.5 7.5l3 3',
  trash: 'M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13M10.5 11v5M13.5 11v5',
  family: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5M16 11.5a2.5 2.5 0 1 0-2-4M15.5 14.7c2.7.3 5 2.2 5 5.3',
  wind: 'M3.5 8.5h9a3 3 0 1 0-3-3M3.5 12.5h14a3 3 0 1 1-3 3M3.5 16.5h6',
  book: 'M5 4.5h10a2 2 0 0 1 2 2V19a2 2 0 0 0-2-2H5zM17 17.5a2 2 0 0 1 2-2',
  music: 'M9 18.5V6l10-2v12.5M9 18.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM19 16.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z',
  history: 'M4 12a8 8 0 1 1 2.34 5.66M4 12H7.5M4 12V8.5M12 7.5V12l3.5 2.2',
}

interface IconProps {
  name: IconName
  size?: number
  strokeWidth?: number
  filled?: boolean
  style?: React.CSSProperties
}

export function Icon({ name, size = 22, strokeWidth = 1.8, filled = false, style }: IconProps) {
  const d = PATHS[name]
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden
    >
      <path d={d} />
    </svg>
  )
}

/* 人物头像占位（无照片素材时用 SVG 示意） */
export function PersonGlyph({ size = 40, hair = true }: { size?: number; hair?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="19" r="8.5" fill="currentColor" opacity="0.9" />
      {hair && <path d="M15.5 19a8.5 8.5 0 0 1 17 0c-1.5-3.5-4.5-5-8.5-5s-7 1.5-8.5 5z" fill="currentColor" opacity="0.55" />}
      <path d="M8 44c1.5-8 7-12 16-12s14.5 4 16 12z" fill="currentColor" opacity="0.9" />
    </svg>
  )
}
