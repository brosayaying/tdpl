/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Public base path the site is served from. Defaults to the GitHub
 * project-page shape (`/<repo>/`); set `BASE_PATH=/` for a user/org page
 * or a custom domain. Must start and end with a slash.
 */
const basePath = process.env.BASE_PATH ?? '/tdpl/'

const config = defineConfig({
  base: basePath,
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        // Emit /schedule/index.html etc. so GitHub Pages serves them directly.
        autoSubfolderIndex: true,
        crawlLinks: true,
      },
    }),
    viteReact(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.{ts,tsx}'],
  },
})

export default config
