import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'spa-fallback',
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && !req.url.startsWith('/assets') && !req.url.startsWith('/static') && !req.url.includes('.')) {
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
