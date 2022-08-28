import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  site: 'https://s4n.land',
  integrations: [tailwind(), mdx(), sitemap()],
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
})
