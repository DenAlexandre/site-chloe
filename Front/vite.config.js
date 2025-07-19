import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { SERVEUR_PORT_FRONT } from './src/constants.js'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: SERVEUR_PORT_FRONT, // ou n'importe quel port
    host: '0.0.0.0' // pour accéder depuis d'autres machines
  }
})