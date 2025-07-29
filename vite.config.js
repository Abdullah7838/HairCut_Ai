import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { qrcode } from 'vite-plugin-qrcode' // ✅ use named import!

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),qrcode()],
   server: {
    host: true // 👈 VERY important to make it accessible on your mobile
  }

})
