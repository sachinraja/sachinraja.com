import {
  getCollection,
  type CollectionEntry,
  type ContentEntryMap,
} from 'astro:content'

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-us', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function formatMonth(date: Date) {
  return date.toLocaleDateString('en-us', {
    month: '2-digit',
    timeZone: 'UTC',
  })
}

export function formatYear(date: Date) {
  return date.toLocaleDateString('en-us', {
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function getPosts() {
  if (import.meta.env.DEV) {
    return getCollection('posts')
  }

  return getCollection('posts', ({ data }) => !data.draft)
}

export function sortPosts(posts: CollectionEntry<'posts'>[]) {
  return posts.sort((a, b) => {
    return (
      new Date(b.data.publishedAt).getTime() -
      new Date(a.data.publishedAt).getTime()
    )
  })
}
