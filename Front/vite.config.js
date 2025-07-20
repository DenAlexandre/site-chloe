import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
require('dotenv').config();

const port = process.env.PORT || 40174;

export default defineConfig({
  plugins: [vue()],
  server: {
    port: port, // ou n'importe quel port
    host: '0.0.0.0' // pour accéder depuis d'autres machines
  },
    allowedHosts: 'all'
})