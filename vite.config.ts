import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";


export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    modulePreload: {
      polyfill: false
    }
  }, 
    plugins: [
    react(),
    tailwindcss()
  ],
});