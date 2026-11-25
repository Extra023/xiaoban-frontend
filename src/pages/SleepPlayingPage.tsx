import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/ui'
import { Head, Block, Row, BlockBtn, BottomBar } from '../components/blocks'
import {
  getVolume, pauseAmbience,
  playAmbience, resumeAmbience, setVolume, stopAll,
} from '../audio/sleepAudio'

/** 09 正在播放（舒缓白噪音，循环播放） */
export default function SleepPlayingPage() {
  const navigate = useNavigate()
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [vol, setVol] = useState(Math.round(getVolume() * 100))
  const [soundOn, setSoundOn] = useState(true)
  const [minutesLeft, setMinutesLeft] = useState<number | null>(null)
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => () => {
    window.clearInterval(timerRef.current)
    stopAll()
  }, [])

  function start() {
    if (soundOn) playAmbience('white')
    setStarted(true)
    setPlaying(true)
  }

  function togglePlay() {
    if (!started) return start()
    if (playing) {
      pauseAmbience()
      setPlaying(false)
    } else {
      resumeAmbience()
      setPlaying(true)
    }
  }

  function changeVolume(delta: number) {
    const next = Math.max(0, Math.min(100, vol + delta))
    setVol(next)
    setVolume(next / 100)
  }

  function toggleTimer() {
    if (minutesLeft != null) {
      window.clearInterval(timerRef.current)
      setMinutesLeft(null)
      return
    }
    setMinutesLeft(30)
    timerRef.current = window.setInterval(() => {
      setMinutesLeft((m) => {
        if (m == null) return null
        if (m <= 1) {
          window.clearInterval(timerRef.current)
          stopAll()
          navigate('/sleep/end')
          return 0
        }
        return m - 1
      })
    }, 60000)
  }

  function toggleSound() {
    setSoundOn((on) => {
      const next = !on
      if (started && playing) {
        if (next) playAmbience('white')
        else pauseAmbience()
      }
      return next
    })
  }

  function endPlayback() {
    window.clearInterval(timerRef.current)
    stopAll()
    navigate('/sleep/end')
  }

  const statusText = !started
    ? '点下方「开始播放」收听'
    : playing
      ? '正在播放 · 返回不等于停止'
      : '已暂停 · 点「继续」接着听'

  return (
    <div className="page">
      <TopBar title="正在播放" backTo="/sleep/pick" tone="purple" />
      <div className="page-body scroll">
        <Block title="舒缓白噪音">
          <div className="blk-note">{statusText}</div>
        </Block>
        {!started && (
          <button className="btn btn-purple btn-block" style={{ height: 56, marginBottom: 10 }} onClick={start}>
            ▶ 开始播放
          </button>
        )}
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <button className="btn btn-purple-soft btn-block" style={{ height: 48 }} onClick={() => changeVolume(-10)}>声音小一点</button>
          <button className="btn btn-purple-soft btn-block" style={{ height: 48 }} onClick={() => changeVolume(10)}>声音大一点</button>
        </div>
        <div style={{ textAlign: 'center', fontSize: 15, color: 'var(--purple-d)', fontWeight: 600, marginBottom: 10 }}>
          音量 {vol}%
        </div>
        <BlockBtn
          label={minutesLeft != null ? `定时关闭 · 剩余 ${minutesLeft} 分钟` : '30分钟关闭'}
          tone="purple"
          onClick={toggleTimer}
        />
        <div style={{ height: 10 }} />
        <Head>更多播放选项 · 向下查看</Head>
        <Block>
          <div className="blk-note">也可以直接说：“暂停”“停止”或“声音小一点”。</div>
        </Block>
        <Block>
          <Row title="收藏此场景" sub="仅作偏好线索，不自动长期保存" action="收藏" tone="purple" />
          <Row title="换个内容" action="选择" tone="purple" onClick={() => navigate('/sleep/swap')} />
          <Row
            title="关闭声音"
            sub={soundOn ? '暂停白噪音，需要时再开启' : '声音已关闭'}
            action={soundOn ? '关闭' : '开启'}
            tone="purple"
            onClick={toggleSound}
          />
          <Row title="自己搭配" sub="调整引导、故事与背景的顺序" action="调整" tone="purple" />
        </Block>
        <Head>本次内容合适吗？</Head>
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <button className="btn btn-purple-soft btn-block" style={{ height: 48 }}>喜欢</button>
          <button className="btn btn-purple-soft btn-block" style={{ height: 48 }}>不太适合</button>
        </div>
        <Block>
          <div className="blk-note">不凭沉默、播放时长或定时推断入睡。故事结束后雨声可继续至定时关闭。收藏和评价不自动保存为长期偏好。</div>
        </Block>
        <Block>
          <Row title="早晨说说睡得怎样" sub="主观感受与设备数据分开 · 可跳过" action="填写" tone="purple" onClick={() => navigate('/health/feedback')} />
        </Block>
      </div>
      <BottomBar
        tone="purple"
        left={playing ? '暂停' : '继续'}
        right="结束播放"
        onLeft={togglePlay}
        onRight={endPlayback}
      />
    </div>
  )
}
