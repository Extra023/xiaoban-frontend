/* ------------------------------------------------------------
 * 轻量导航栈：跟随浏览器历史（history.state.idx）维护页面路径序列，
 * 供「智能返回」判断能否直接 pop 回到父页面。
 * 即使栈偶尔失步，智能返回也会回退到固定父级跳转，行为始终安全。
 * ---------------------------------------------------------- */

const stack: string[] = []
let lastIdx = 0

/** 在每次路由变化时调用（NavTracker） */
export function track(p: string) {
  const idx: number = (window.history.state as { idx?: number } | null)?.idx ?? 0
  if (idx < lastIdx) {
    // 浏览器后退：弹出至当前页
    while (stack.length > 1 && stack[stack.length - 1] !== p) stack.pop()
    if (stack[stack.length - 1] !== p) {
      stack.length = 0
      stack.push(p)
    }
  } else if (idx === lastIdx) {
    // replace：覆盖栈顶
    if (stack.length === 0) stack.push(p)
    else stack[stack.length - 1] = p
  } else {
    // 前进导航
    stack.push(p)
  }
  lastIdx = idx
}

/** 上一个历史记录的路径（可能为 undefined） */
export function prevPath(): string | undefined {
  return stack[stack.length - 2]
}
