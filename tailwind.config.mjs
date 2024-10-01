import typography from '@tailwindcss/typography'
import { withAlphaValue } from 'tailwindcss/lib/util/withAlphaVariable'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            h2: {
              marginTop: '1.5em',
              marginBottom: '0.5em',
            },
          },
        },
        zinc: {
          css: {
            '--tw-prose-body': withAlphaValue(theme('colors.zinc[300]'), '.9'),
            '--tw-prose-headings': theme('colors.zinc[300]'),
            '--tw-prose-lead': theme('colors.zinc[700]'),
            '--tw-prose-links': withAlphaValue(theme('colors.zinc[300]'), '.9'),
            '--tw-prose-counters': theme('colors.zinc[500]'),
            '--tw-prose-bullets': theme('colors.zinc[500]'),
            '--tw-prose-quotes': withAlphaValue(
              theme('colors.zinc[300]'),
              '.8',
            ),
            '--tw-prose-quote-borders': theme('colors.zinc[400]'),
            '--tw-prose-code': theme('colors.zinc[300]'),
          },
        },
      }),
    },
  },
  plugins: [typography],
}
