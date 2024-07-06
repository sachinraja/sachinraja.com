import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), sitemap()],
  site: 'https://sachinraja.com',
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
    },
  },
})
