// 生成助眠氛围音：雨声 / 白噪音 / 粉噪音（30 秒无缝循环，22050Hz 单声道 16bit WAV）
// 用法：node scripts/gen-sleep-audio.mjs
import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const SR = 22050
const SECONDS = 30
const N = SR * SECONDS
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'audio')
mkdirSync(OUT, { recursive: true })

let seed = 42
function rand() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff }

// 无缝化：把末尾 1 秒与开头 1 秒等功率交叉淡化，保证循环无爆音
function seamless(buf) {
  const fade = SR
  for (let i = 0; i < fade; i++) {
    const t = i / fade
    buf[i] = buf[i] * t + buf[N - fade + i] * (1 - t)
  }
  return buf.subarray(0, N - fade)
}

function whiteNoise() {
  const b = new Float32Array(N)
  for (let i = 0; i < N; i++) b[i] = rand() * 2 - 1
  return b
}

// 布朗噪声：白噪声积分 + 泄漏，低频浑厚（雨底噪）
function brownNoise(leak = 0.02) {
  const b = new Float32Array(N)
  let last = 0
  for (let i = 0; i < N; i++) {
    last = (last + 0.02 * (rand() * 2 - 1)) / (1 + leak)
    b[i] = last * 6
  }
  return b
}

// 舒缓白噪音：白噪声经低通柔化（去掉刺耳高频）+ 呼吸式缓慢起伏
function soothingWhite() {
  const b = new Float32Array(N)
  let lp = 0
  const alpha = 0.055 // 一阶低通系数，约 800Hz 截止：保留柔和气流感，去掉嘶声
  for (let i = 0; i < N; i++) {
    lp += alpha * ((rand() * 2 - 1) - lp)
    // 14 秒一个呼吸周期：0.82 → 1.0 缓慢起伏
    const breathe = 0.82 + 0.18 * (0.5 + 0.5 * Math.sin((i / SR) * 2 * Math.PI / 14))
    b[i] = lp * breathe * 2.2
  }
  return b
}

// 粉噪音：Paul Kellet 近似，频谱柔和
function pinkNoise() {
  const b = new Float32Array(N)
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
  for (let i = 0; i < N; i++) {
    const w = rand() * 2 - 1
    b0 = 0.99886 * b0 + w * 0.0555179
    b1 = 0.99332 * b1 + w * 0.0750759
    b2 = 0.969 * b2 + w * 0.153852
    b3 = 0.8665 * b3 + w * 0.3104856
    b4 = 0.55 * b4 + w * 0.5329522
    b5 = -0.7616 * b5 - w * 0.016898
    b[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11
    b6 = w * 0.115926
  }
  return b
}

// 雨声 = 布朗底噪 + 慢速起伏 + 随机雨滴颗粒（短促高频衰减）
function rainNoise() {
  const b = brownNoise(0.03)
  for (let i = 0; i < N; i++) {
    const swell = 0.85 + 0.15 * Math.sin((i / SR) * 2 * Math.PI / 11) // 11 秒缓慢起伏
    b[i] *= swell
  }
  // 雨滴：每 0.05-0.15s 一个，指数衰减高频颗粒
  let pos = 0
  while (pos < N - 800) {
    const len = 300 + Math.floor(rand() * 500)
    const amp = 0.15 + rand() * 0.3
    for (let j = 0; j < len && pos + j < N; j++) {
      b[pos + j] += (rand() * 2 - 1) * amp * Math.exp(-j / (len / 5))
    }
    pos += len + Math.floor(rand() * (SR * 0.1))
  }
  return b
}

function normalize(b, peak = 0.85) {
  let max = 0
  for (let i = 0; i < b.length; i++) max = Math.max(max, Math.abs(b[i]))
  const g = peak / (max || 1)
  for (let i = 0; i < b.length; i++) b[i] *= g
  return b
}

function toWav(b) {
  const data = seamless(Float32Array.from(b))
  const buf = Buffer.alloc(44 + data.length * 2)
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + data.length * 2, 4); buf.write('WAVE', 8)
  buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22)
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34)
  buf.write('data', 36); buf.writeUInt32LE(data.length * 2, 40)
  for (let i = 0; i < data.length; i++) {
    buf.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(data[i] * 32767))), 44 + i * 2)
  }
  return buf
}

const assets = {
  'rain.wav': normalize(rainNoise()),
  'white.wav': normalize(soothingWhite(), 0.7),
  'pink.wav': normalize(pinkNoise()),
}
for (const [name, buf] of Object.entries(assets)) {
  writeFileSync(join(OUT, name), toWav(buf))
  console.log('written', name)
}
