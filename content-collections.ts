import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { z } from 'zod'

// for more information on configuration, visit:
// https://www.content-collections.dev/docs/configuration

const posts = defineCollection({
	name: 'posts',
	directory: 'content',
	include: '**/*.md',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishedAt: z.coerce.date(),
		slug: z.string(),
		draft: z.boolean().optional(),
	}),
	transform: async (document, context) => {
		const mdx = await compileMDX(context, document)
		return {
			...document,
			mdx,
		}
	},
})

export default defineConfig({
	collections: [posts],
})
