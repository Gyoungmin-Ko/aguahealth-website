import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'spa-fallback',
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url || ''
          // /api/* 는 SPA 폴백 제외 → 404로 두어 API 호출이 HTML을 받지 않도록 함
          if (url.startsWith('/api/')) return next()
          if (!url.startsWith('/assets') && !url.startsWith('/static') && !url.includes('.')) {
            req.url = '/index.html'
          }
          next()
        })
      }
    }
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
