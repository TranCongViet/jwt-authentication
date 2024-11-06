import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/jwt-authentication/",
  plugins: [react()],
  server: {
    port: 5173, // Thay đổi port tại đây
  },
})
