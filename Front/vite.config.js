import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5174, // ou n'importe quel port
    host: '0.0.0.0' // pour accéder depuis d'autres machines
  }
})