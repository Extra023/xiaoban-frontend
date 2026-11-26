/* 语音输入：浏览器 Web Speech API（与对方 HAPIC 本地页同一技术路线——
 * 服务端只接收最终识别文字，不接收原始录音）。
 * 仅负责"用户说话 → 文字"，不负责唤醒词与连续对话（后续再移植）。 */

interface SpeechRecognitionResultItem { transcript: string }
interface SpeechRecognitionResult { isFinal: boolean; 0: SpeechRecognitionResultItem; length: number }
interface SpeechRecognitionEvent {
  resultIndex: number
  results: { length: number; [index: number]: SpeechRecognitionResult }
}
interface SpeechRecognitionErrorEvent { error: string }

interface SpeechRecognitionInstance {
  lang: string
  interimResults: boolean
  continuous: boolean
  maxAlternatives: number
  onresult: ((e: SpeechRecognitionEvent) => void) | null
  onerror: ((e: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
  start(): void
  stop(): void
  abort(): void
}

type SpeechRecognitionCtor = new () => SpeechRecognitionInstance

function getCtor(): SpeechRecognitionCtor | null {
  const w = window as unknown as { SpeechRecognition?: SpeechRecognitionCtor; webkitSpeechRecognition?: SpeechRecognitionCtor }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

/** 当前浏览器是否支持语音识别（Edge/Chrome 支持） */
export function isSpeechInputSupported(): boolean {
  return getCtor() != null
}

export interface SpeechSessionHandlers {
  /** 识别中的临时文字（实时上屏） */
  onInterim?: (text: string) => void
  /** 一句最终文字（自动提交） */
  onFinal?: (text: string) => void
  /** 识别结束（无论成败） */
  onEnd?: () => void
  /** 出错（如网络/权限/不支持） */
  onError?: (message: string) => void
}

/** 开始一轮语音识别；返回停止函数。autoStopOnFinal=true 时识别到最终句自动结束。 */
export function startSpeechSession(handlers: SpeechSessionHandlers): () => void {
  const Ctor = getCtor()
  if (!Ctor) {
    handlers.onError?.('当前浏览器不支持语音识别')
    handlers.onEnd?.()
    return () => undefined
  }
  const rec = new Ctor()
  rec.lang = 'zh-CN'
  rec.interimResults = true
  rec.continuous = false
  rec.maxAlternatives = 1

  let gotFinal = false
  rec.onresult = (e) => {
    let interim = ''
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const r = e.results[i]
      const text = r[0]?.transcript ?? ''
      if (r.isFinal) {
        gotFinal = true
        handlers.onFinal?.(text)
      } else {
        interim += text
      }
    }
    if (interim) handlers.onInterim?.(interim)
  }
  rec.onerror = (e) => {
    const msg = e.error === 'not-allowed' || e.error === 'service-not-allowed'
      ? '麦克风权限被拒绝，请允许后重试'
      : e.error === 'network'
        ? '语音识别需要联网，请检查网络'
        : e.error === 'no-speech'
          ? '没有听清，请再试一次'
          : `语音识别出错（${e.error}）`
    handlers.onError?.(msg)
  }
  rec.onend = () => handlers.onEnd?.()

  try {
    rec.start()
  } catch {
    handlers.onError?.('无法启动语音识别')
    handlers.onEnd?.()
  }

  return () => {
    try {
      if (gotFinal) rec.stop()
      else rec.abort()
    } catch { /* ignore */ }
  }
}
