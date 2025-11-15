import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api-myapp.up.railway.app', // your backend
        changeOrigin: true,
        secure: true,
      },
      '/sanctum': {
        target: 'https://api-myapp.up.railway.app', // backend for CSRF
        changeOrigin: true,
        secure: true,
      },
      '/login': {
        target: 'https://api-myapp.up.railway.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
