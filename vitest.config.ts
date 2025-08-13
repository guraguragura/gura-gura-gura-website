/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    exclude: [
      '**/medusa-backend/**',
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/*.config.*',
      '**/src/components/**',
      '**/src/contexts/**',
      '**/src/hooks/**',
      '**/src/pages/**',
      '**/src/lib/**',
      '**/supabase/**'
    ],
    include: [
      'src/test/**/*.test.{ts,tsx}',
      'src/utils/**/*.test.{ts,tsx}'
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})