import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      scopeBehaviour: 'local', // This is the default
    }
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    }
  }
})
