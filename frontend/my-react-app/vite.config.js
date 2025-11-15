
export default defineConfig({
  plugins: [React()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api-myapp.up.railway.app',  // Your Railway backend URL
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // Optional: Strip /api prefix
      },
      '/sanctum': {
        target: 'https://api-myapp.up.railway.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});