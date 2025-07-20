import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { SERVEUR_PORT_FRONT } from './src/constants.js'

export default defineConfig({
  plugins: [vue()],
  allowedHosts: 'all'
})