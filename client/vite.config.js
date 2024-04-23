import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    hmr: true,
    proxy: {
      "/api": {
        target: "https://chat-app-orcin-eight.vercel.app",
        changeOrigin: true,
      },
    },
  },
})
