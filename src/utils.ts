import { getCollection } from 'astro:content'

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-us', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatMonth(date: Date) {
  return date.toLocaleDateString('en-us', {
    month: 'numeric',
  })
}

export function formatYear(date: Date) {
  return date.toLocaleDateString('en-us', {
    year: 'numeric',
  })
}

export function getPosts() {
  if (import.meta.env.DEV) {
    return getCollection('posts')
  }

  return getCollection('posts', ({ data }) => !data.draft)
}
