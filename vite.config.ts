import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: { strictPort: true },
  build: mode === 'playtest' ? {
    rollupOptions: { input: { app: 'index.html', review: 'v4-review.html' } },
  } : undefined,
}))
