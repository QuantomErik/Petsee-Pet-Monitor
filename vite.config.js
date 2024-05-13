import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/petsee/',
 /*  server: {
    port: 2000,
  }, */
  build: {
    outDir: 'dist',
  }
})
