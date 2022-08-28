import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import remarkTwoslashPkg from 'remark-shiki-twoslash'

/**
 * @type {typeof remarkTwoslash}
 */
const shikiTwoslash = remarkTwoslashPkg.default

const remarkTwoslash = [shikiTwoslash, { theme: 'github-dark' }]
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
