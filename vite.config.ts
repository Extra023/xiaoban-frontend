import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // HAPIC 本地语音服务（语音组仓库 ShenSetius/HAPIC，`npm run voice:local`，默认 4173 端口）。
      // HAPIC 强制校验 Host=127.0.0.1:端口 且 Origin 同源，代理需改写这两个头；
      // 前端统一以 /hapic/* 访问，代理重写为 /api/*。
      '/hapic': {
        target: 'http://127.0.0.1:4173',
        changeOrigin: true,
        headers: { Origin: 'http://127.0.0.1:4173' },
        rewrite: (p) => p.replace(/^\/hapic/, '/api'),
      },
    },
  },
})
