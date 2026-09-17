/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy()
  ],
  optimizeDeps: {
    include: [
      '@fullcalendar/core',
      '@fullcalendar/react',
      '@fullcalendar/daygrid',
      '@fullcalendar/timegrid',
      '@fullcalendar/list',
      '@fullcalendar/interaction',
    ],
  },
  server: {
    warmup: {
      clientFiles: ['./src/main.tsx', './src/App.tsx', './src/pages/Home.tsx', './src/components/EventCalendar.tsx'],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})
