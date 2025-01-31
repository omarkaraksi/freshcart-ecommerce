import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://omarkaraksi.github.io/freshcart-ecommerce', // Replace with your repo name

})
