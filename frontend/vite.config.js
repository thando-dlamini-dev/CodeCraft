import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5500',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Remove /api if backend expects naked paths
      }
    }
  },
  // Explicitly define base URL for production
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
  // Add build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
