import rss from '@astrojs/rss'
import { SITE_TITLE, SITE_DESCRIPTION } from '../config'
import { getCollection } from 'astro:content'

export async function GET(context) {
  const posts = await getCollection('posts')
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
    })),
  })
}
