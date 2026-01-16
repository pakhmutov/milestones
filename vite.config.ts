import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import { resolve } from 'path'


export default defineConfig({
  plugins: [react(), svgr({
      svgrOptions: { exportType: 'default' },
      include: '**/*.svg',
  })],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})
