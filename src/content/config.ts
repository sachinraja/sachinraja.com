import { z, defineCollection } from 'astro:content'

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.date(),
    draft: z.boolean().optional(),
  }),
})

export const collections = {
  posts: postsCollection,
}
