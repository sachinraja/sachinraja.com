/** @type {import("prettier").Config} */
export default {
  singleQuote: true,
  semi: false,
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
