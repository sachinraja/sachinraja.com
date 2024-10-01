import { getCollection } from 'astro:content'

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
    month: 'numeric',
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
