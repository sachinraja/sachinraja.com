import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	rewrites: async () => [
		{
			source: '/resume',
			destination: '/resume.pdf',
		},
	],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'sachinraja.com',
			},
		],
	},
}

const withMDX = createMDX({
	options: {
		rehypePlugins: [['@shikijs/rehype', { theme: 'github-dark' }]],
	},
})

export default withMDX(nextConfig)
