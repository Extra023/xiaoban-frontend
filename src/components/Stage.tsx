import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export const STAGE_W = 540
export const STAGE_H = 360

/**
 * 舞台容器：按 Figma 画框尺寸 540×360 等比缩放，适配任意窗口。
 */
export function Stage({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const fit = () => {
      const s = Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H)
      setScale(Math.max(0.2, s))
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  return (
    <div className="stage-viewport">
      <div
        className="stage"
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  )
}
