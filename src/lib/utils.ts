// import type { Post } from 'content-collections'

import type { ReactNode } from 'react'
import z from 'zod'

const postModules = Object.values(
	import.meta.glob('../content/*.mdx', { eager: true }),
)

// export function filterReleasedPosts(posts: Post[]) {
// 	return posts.filter((post) => !post.draft)
// }

// export function getSortedPosts(posts: Post[]) {
// 	return posts.sort((a, b) => {
// 		return b.publishedAt.getTime() - a.publishedAt.getTime()
// 	})
// }

// export function getReleasedPosts(posts: Post[]) {
// 	return getSortedPosts(filterReleasedPosts(posts))
// }

export const postMetadataSchema = z.object({
	title: z.string(),
	description: z.string(),
	publishedAt: z.coerce.date().transform((date) => {
		// since date is specified in PST we need to add 8 hours to get the correct date in UTC
		const pstDate = new Date(date.getTime() + 8 * 60 * 60 * 1000)
		return pstDate
	}),
	slug: z.string(),
	draft: z.boolean().optional(),
})

export type PostMetadata = z.infer<typeof postMetadataSchema>

export function parsePostModule(mod: unknown) {
	const postMarkdown = mod as { default: () => ReactNode; metadata?: unknown }
	return {
		Component: postMarkdown.default,
		...postMetadataSchema.parse(postMarkdown.metadata),
	}
}

export function getPost(slug: string) {
	return getPosts().find((post) => post.slug === slug) ?? null
}

export function getPosts() {
	return postModules
		.map(parsePostModule)
		.sort(
			(post1, post2) =>
				post2.publishedAt.getTime() - post1.publishedAt.getTime(),
		)
}
