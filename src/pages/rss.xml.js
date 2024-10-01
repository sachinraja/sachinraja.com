import rss from '@astrojs/rss'
import { SITE_TITLE, SITE_DESCRIPTION } from '../config'
import { getPosts, sortPosts } from '../utils'

export async function GET(context) {
  const posts = await getPosts()
  const sortedPosts = sortPosts(posts)

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: post.slug,
    })),
  })
}
