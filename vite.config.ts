import fs from 'fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base:'/Frontend/',
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('C:/Users/KEIN/localhost+2-key.pem'),
      cert: fs.readFileSync('C:/Users/KEIN/localhost+2.pem'),
    },
    port: 5173,
  },
  resolve : {
    alias: {
      '@':  path.resolve(__dirname, './src'),
    }
  }
})
