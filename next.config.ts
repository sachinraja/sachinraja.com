import { withContentCollections } from '@content-collections/next'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	rewrites: async () => [
		{
			source: '/resume',
			destination: '/resume.pdf',
		},
	],
}

export default withContentCollections(nextConfig)
