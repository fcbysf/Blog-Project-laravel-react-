import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API calls to your backend
      '/api': {
        target: 'https://api-myapp.up.railway.app',
        changeOrigin: true,
        secure: true,
      },
      // Proxy Sanctum CSRF calls
      '/sanctum': {
        target: 'https://api-myapp.up.railway.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
