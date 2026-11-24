// 生成本周进展 Word 文档（表格版）
// 运行：node scripts/gen-weekly-report.mjs
import { writeFileSync } from 'node:fs'
import {
  AlignmentType, BorderStyle, Document, HeadingLevel, Packer, Paragraph,
  ShadingType, Table, TableCell, TableRow, TextRun, WidthType,
} from 'docx'

const FONT = 'Microsoft YaHei'
const ORANGE = 'C96A10'
const ORANGE_BG = 'FDF3E3'
const LINE = 'E3D9C4'
const INK = '29231A'
const GRAY = '6F6759'

const run = (text, opts = {}) => new TextRun({ text, font: FONT, color: INK, size: 21, ...opts })
const cell = (text, { width, bold = false, color = INK, bg, align = AlignmentType.LEFT } = {}) =>
  new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: bg ? { type: ShadingType.CLEAR, fill: bg } : undefined,
    margins: { top: 90, bottom: 90, left: 140, right: 140 },
    children: [new Paragraph({ alignment: align, children: [run(text, { bold, color })] })],
  })

const borders = {
  top: { style: BorderStyle.SINGLE, size: 4, color: LINE },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: LINE },
  left: { style: BorderStyle.SINGLE, size: 4, color: LINE },
  right: { style: BorderStyle.SINGLE, size: 4, color: LINE },
  insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: LINE },
  insideVertical: { style: BorderStyle.SINGLE, size: 4, color: LINE },
}

/* ---------- 表一：本周工作总览 ---------- */
const summaryRows = [
  ['Figma v0.2 全面更新同步', '7 页', '逐屏比对设计更新，助眠模块按「内容、场景与控制」重构，2 页新增、5 页改版'],
  ['点击交互优化', '16 处', '全部交互改乐观更新（先响应、后台同步），Mock 延迟降至 20–60ms，点击即时反馈'],
  ['助眠模块滑动修复', '4 页', '改「内容滚动 + 底栏固定」结构，修复底部操作条被裁切；全 24 页滚动容器审计'],
  ['返回逻辑智能升级', '4 类场景', '导航栈追踪 + 智能返回（pop/固定双模），返回保留页面状态、历史无重复堆积'],
]
const W1 = [2800, 1100, 5126]
const summaryTable = new Table({
  borders,
  rows: [
    new TableRow({
      tableHeader: true,
      children: [
        cell('工作项', { width: W1[0], bold: true, color: ORANGE, bg: ORANGE_BG, align: AlignmentType.CENTER }),
        cell('规模', { width: W1[1], bold: true, color: ORANGE, bg: ORANGE_BG, align: AlignmentType.CENTER }),
        cell('内容', { width: W1[2], bold: true, color: ORANGE, bg: ORANGE_BG, align: AlignmentType.CENTER }),
      ],
    }),
    ...summaryRows.map((r) => new TableRow({
      children: [
        cell(r[0], { width: W1[0], bold: true }),
        cell(r[1], { width: W1[1], align: AlignmentType.CENTER }),
        cell(r[2], { width: W1[2], color: GRAY }),
      ],
    })),
  ],
})

/* ---------- 表二：设计稿同步明细 ---------- */
const CHANGES = [
  ['09 助眠第二步', '改版', '睡前故事 → 确认场景：雨夜慢读场景卡（AI 建议·待确认）、内容标签、组合信息（温和放松 2 分钟 → 灯笼花园 8 分钟）、调整内容与组合 / 换个推荐'],
  ['10 助眠第三步', '改版', '定时白噪音 → 场景播放：主内容 / 背景独立切换、音量步进、定时关闭、收藏此场景 / 喜欢 / 不太适合'],
  ['11 助眠内容与场景', '新增', '替代「当晚需求」：内容类型与故事来源选择、故事卡（试听 / 换一个）、小伴推荐场景卡（待您确认）、睡前提醒与睡眠反馈说明'],
  ['23 助眠功能执行状态', '新增', '替代「运行与播放」：播放 / 暂停 / 停止控制、音量与定时发送状态、执行结果与回执、用户主动收藏示例、合规说明'],
  ['07 健康中心', '更新', '卡片副标题更新；入口「今晚的安排」改为「助眠内容与场景」'],
  ['12 助眠偏好', '更新', '新增「偏好可以慢慢形成」说明条（选择统计须授权、长期保存需确认）'],
  ['19 晨间反馈', '更新', '新增「主观感受单独记录」说明条（自述与设备数据分录、预先授权）'],
]
const W2 = [2300, 1000, 5726]
const detailTable = new Table({
  borders,
  rows: [
    new TableRow({
      tableHeader: true,
      children: [
        cell('页面', { width: W2[0], bold: true, color: ORANGE, bg: ORANGE_BG, align: AlignmentType.CENTER }),
        cell('变更类型', { width: W2[1], bold: true, color: ORANGE, bg: ORANGE_BG, align: AlignmentType.CENTER }),
        cell('变更要点', { width: W2[2], bold: true, color: ORANGE, bg: ORANGE_BG, align: AlignmentType.CENTER }),
      ],
    }),
    ...CHANGES.map((r) => new TableRow({
      children: [
        cell(r[0], { width: W2[0], bold: true }),
        cell(r[1], { width: W2[1], align: AlignmentType.CENTER, color: r[1] === '新增' ? ORANGE : GRAY, bold: r[1] === '新增' }),
        cell(r[2], { width: W2[2], color: GRAY }),
      ],
    })),
  ],
})

/* ---------- 文档 ---------- */
const doc = new Document({
  sections: [{
    children: [
      new Paragraph({
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        children: [run('前端进展 · 本周简述', { size: 40, bold: true, color: ORANGE })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [run('老年陪伴应用「小伴」 前端 v0.2 ｜ Figma 更新同步与体验优化 ｜ 2026 第 46 周（11.09 — 11.15）', { size: 20, color: GRAY })],
      }),
      new Paragraph({
        spacing: { before: 160, after: 80 },
        children: [run('一、本周工作总览', { size: 26, bold: true })],
      }),
      summaryTable,
      new Paragraph({
        spacing: { before: 240, after: 80 },
        children: [run('二、设计稿同步明细（7 页）', { size: 26, bold: true })],
      }),
      detailTable,
      new Paragraph({
        spacing: { before: 240 },
        children: [run('配套：接口层新增场景 / 内容与执行状态 Mock 端点（累计 55+）；全部页面浏览器实测通过，生产构建正常。', { size: 18, color: GRAY })],
      }),
    ],
  }],
})

const out = 'C:\\Users\\Yang\\Desktop\\小伴前端-本周进展-2026W46.docx'
const buffer = await Packer.toBuffer(doc)
writeFileSync(out, buffer)
console.log('written:', out, buffer.length, 'bytes')
