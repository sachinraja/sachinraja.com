import { allPosts } from 'content-collections'
import Link from 'next/link'
import { Socials } from '@/components/socials'
import { getReleasedPosts } from '@/lib/utils'

export default function HomePage() {
	const releasedPosts = getReleasedPosts(allPosts)

	return (
		<main className="m-10">
			<h1 className="text-3xl mb-4">Sachin Raja</h1>

			<ul className="flex flex-col gap-2">
				{releasedPosts.map((post) => (
					<li key={post.slug}>
						<div className="flex flex-row items-center gap-2 text-lg">
							<time
								className="font-mono"
								dateTime={post.publishedAt.toISOString()}
							>
								{post.publishedAt.toLocaleDateString('en-us', {
									month: '2-digit',
									year: '2-digit',
								})}
							</time>
							<Link href={`/${post.slug}`}>
								<h2 className="border-b-1">{post.title}</h2>
							</Link>
						</div>
					</li>
				))}
			</ul>

			<footer className="mt-5">
				<Socials />
			</footer>
		</main>
	)
}
