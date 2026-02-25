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
		publishedAt: z.coerce.date().transform((date) => {
			// since date is specified in PST we need to add 8 hours to get the correct date in UTC
			const pstDate = new Date(date.getTime() + 8 * 60 * 60 * 1000)
			return pstDate
		}),
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
