# 小伴 · 适老化智能陪伴应用（前端原型 v0.2）

面向 65 岁以上老年用户的语音陪伴应用前端原型。围绕「语音对话、睡前助眠、健康记录」三大核心场景设计，全站遵循适老化交互规范（大字体、高对比、大按钮、语音优先、渐进披露）。

## 四大功能模块

| 模块 | 页面 | 路由 |
| --- | --- | --- |
| 01 语音 | 陪伴主页、统一聊天记录、陪伴档案、小伴记住的事、设置 | `/`、`/chat`、`/companion`、`/memory`、`/settings` |
| 02 助眠 | 助眠入口、选择内容、正在播放、换个内容、声音与定时、播放情况、今晚好眠（结束页） | `/sleep/*` |
| 03 个人设置 | 字和声音、生活与兴趣、聊天方式、提醒和隐私、单项授权、记忆详情 | `/settings/voice`、`/prefs/*`、`/auth` |
| 04 健康 | 健康首页、晨间反馈、睡眠记录、连接设备、私密医疗、我的信息 | `/health/*` |

共 24 个页面，与 Figma 设计稿「前端v0.2」（4 分区 24 帧）一一对应。

## 技术栈

- React 18 + TypeScript + Vite
- React Router（22 条路由 + 导航栈智能返回）
- 自研 blocks 组件库：Block / Row / BlockBtn / BottomBar，支持橙 / 紫 / 青三主题
- Mock 接口层（55+ 端点，含 20–60ms 模拟延迟），无真实后端

## 适老化设计规范

- 正文 ≥16.5px、标题 ≥19.5px，可一键放大至 23px
- 主文字 `#29231A` / 米白底 `#FFF9F3`，模块强调色橙 `#9A3412`、紫 `#7C3AED`、青 `#0F766E`，对比度 ≥4.5:1
- 触控目标 ≥56px（常驻主按钮 64px），间距 ≥16px
- 点击乐观更新，反馈 ≤100ms；返回行为全站统一

## 本地运行

```bash
npm install
npm run dev      # 开发预览，页面目录可直达全部 24 页
npm run build    # 生产构建（tsc + vite）
```

## 语音服务对接（HAPIC）

语音对话由语音组同学的 [ShenSetius/HAPIC](https://github.com/ShenSetius/HAPIC) 本地服务提供（Letta Agent + DeepSeek，后续含 Qwen TTS 语音合成）。

```
前端 fetch('/hapic/*') ──vite 代理──▶ http://127.0.0.1:4173/api/*（HAPIC 本地服务）
```

**启动对方服务**（详见其仓库 docs/operations/LOCAL_VOICE.md）：克隆后 `npm ci`，复制 `.env.example` 为 `.env.local` 填写模型配置，执行 `npm run voice:local`（默认 `127.0.0.1:4173`）。

**已对接端点**（适配层 `src/api/hapic.ts`）：

| HAPIC 端点 | 用途 |
| --- | --- |
| `GET /api/session` | 取会话令牌（`x-hapic-session` 头） |
| `POST /api/text` | 一轮文字对话，同步返回小伴回复 |
| `GET /api/messages` | 拉取真实会话历史（自动过滤系统消息） |
| `GET /api/status` | TTS / 语音能力状态 |

**自动回退**：服务在线时聊天记录页展示真实对话与"语音服务已连接"；检测不到服务时自动切换到本地演示模式（示例话术），汇报、离线开发不受影响。

**本地联调桩**：`npm run stub:hapic` 在本机 4173 端口启动一个同协议的模拟服务，用于无对方环境时验证前端链路。

浏览器音频播放（Qwen TTS 启用后走 `GET /api/voice/browser-output/*`）已在适配层预留，待语音组开启 `HAPIC_QWEN_TTS_ENABLED=1` 后接通。

## 说明

当前为设计验证原型：数据均为 Mock，语音、设备监测、记忆学习等功能为接口预留，后续接入真实后端。设计稿见 Figma「前端v0.2」。
