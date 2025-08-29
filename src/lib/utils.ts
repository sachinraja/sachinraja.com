import type { Post } from 'content-collections'

export function filterReleasedPosts(posts: Post[]) {
	return posts.filter((post) => !post.draft)
}

export function getSortedPosts(posts: Post[]) {
	return posts.sort((a, b) => {
		return b.publishedAt.getTime() - a.publishedAt.getTime()
	})
}

export function getReleasedPosts(posts: Post[]) {
	return getSortedPosts(filterReleasedPosts(posts))
}
