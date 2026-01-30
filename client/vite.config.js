import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    proxy: {
      // Proxy /cellular requests to the backend server
      '/cellular': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})


