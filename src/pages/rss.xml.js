import rss from '@astrojs/rss'
import { SITE_TITLE, SITE_DESCRIPTION } from '../config'
import { getPosts } from '../utils'

export async function GET(context) {
  const posts = await getPosts()
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
