import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import remarkTwoslashPkg from 'remark-shiki-twoslash'

/**
 * @type {import('remark-shiki-twoslash').Options}
 */
const shikiConfig = {
  theme: 'github-dark',
}
const remarkTwoslash = [remarkTwoslashPkg.default, shikiConfig]

// https://astro.build/config
export default defineConfig({
  site: 'https://s4n.land',
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkTwoslash],
  },
  integrations: [
    tailwind(),
    mdx({
      remarkPlugins: [remarkTwoslash],
    }),
    sitemap(),
  ],
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
})
