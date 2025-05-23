import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Frontend/',
  plugins: [react(),basicSsl()],
  server : {
    https: true,
  },
})
