import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Using a custom domain: serve from root
  base: '/',            // or just delete this line entirely (default is '/')
})
