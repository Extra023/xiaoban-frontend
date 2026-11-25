/* 助眠音频引擎：真实氛围音（Mixkit 录音）+ 程序化生成音 + 故事语音朗读 */

let ambience: HTMLAudioElement | null = null
let volume = 0.3

export type AmbienceKind = 'rain' | 'forest' | 'white'

/** 场景清单：真实录音来自 Mixkit（Mixkit License，免费可商用、无需署名） */
export const AMBIENCE_SCENES: Record<AmbienceKind, { src: string; label: string }> = {
  rain: { src: '/audio/rain-loop.mp3', label: '自然雨声' },
  forest: { src: '/audio/forest-rain.mp3', label: '森林夜雨' },
  white: { src: '/audio/white.wav', label: '舒缓白噪音' },
}

/** 《灯笼花园》睡前故事稿（温和慢节奏，约 2 分钟） */
export const LANTERN_STORY = `灯笼花园。

王爷爷年轻的时候，院子里有一棵老槐树。每到夏天的晚上，他就搬一张竹椅，坐在树下乘凉。

有一天，飞来一只小小的灯笼。灯笼不是买的，是萤火虫聚成的，一亮一亮，像挂在空中的小星星。

王爷爷伸手，那只小灯笼就落在他的手背上。它不烫，软软的，像一滴温热的光。

从那以后，每到傍晚，萤火虫们就排成一队，从河边飞回来，在王爷爷的院子里开一个小小的灯会。它们绕着老槐树转三圈，就停在篱笆上，一排一排，像挂起来的小灯笼。

王爷爷给它们讲年轻时候的事。讲他怎么种那棵槐树，讲第一次下雨的时候，泥土地里冒出来的蘑菇。萤火虫听不懂，可是它们一直亮着，一闪，一闪，好像在说：我们听着呢，您慢慢讲。

后来王爷爷搬进了楼房，院子没有了，老槐树也留在了记忆里。可是每年夏天，他还是会在阳台上放一小碟清水。到了夜里，总有那么一两只萤火虫，飞过林立的高楼，找到那碟水，亮一亮，像是告诉他：灯笼花园还在呢，老朋友。

王爷爷闭上眼睛。水碟里映着灯光，也映着一点点小小的、温暖的光。

睡吧。灯笼都亮着呢。晚安。`

export function getVolume(): number {
  return volume
}

export function setVolume(v: number): void {
  volume = Math.max(0, Math.min(1, v))
  if (ambience) ambience.volume = volume
}

export function pauseAmbience(): void {
  ambience?.pause()
}

export function resumeAmbience(): void {
  void ambience?.play().catch(() => undefined)
}

/** 循环播放氛围音 */
export function playAmbience(kind: AmbienceKind): void {
  stopAmbience()
  const el = new Audio(AMBIENCE_SCENES[kind].src)
  el.loop = true
  el.volume = volume
  void el.play().catch(() => undefined)
  ambience = el
}

export function stopAmbience(): void {
  if (ambience) {
    ambience.pause()
    ambience.src = ''
    ambience = null
  }
}

export function isAmbienceOn(): boolean {
  return ambience != null
}

/** 朗读睡前故事（浏览器内置中文语音，慢速柔和） */
export function narrateStory(text: string = LANTERN_STORY): void {
  const synth = window.speechSynthesis
  if (!synth) return
  synth.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'zh-CN'
  u.rate = 0.9
  u.pitch = 1
  u.volume = Math.max(0.4, volume)
  synth.speak(u)
}

export function pauseNarration(): void {
  window.speechSynthesis?.pause()
}

export function resumeNarration(): void {
  window.speechSynthesis?.resume()
}

export function stopNarration(): void {
  window.speechSynthesis?.cancel()
}

/** 停止全部播放 */
export function stopAll(): void {
  stopAmbience()
  stopNarration()
}
