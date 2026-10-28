import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Footer } from '@/components/socials'
import { getPost, getPosts } from '@/lib/utils'

export const dynamicParams = false

export async function generateStaticParams() {
	return getPosts()
		.filter((post) => !post.draft)
		.map((post) => ({ slug: post.slug }))
}

// stolen from bengubler.com
export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params
	const post = getPost(slug)
	if (!post || post.draft) return notFound()

	const ogParams = new URLSearchParams({
		title: post.title,
		description: post.description,
	})
	const ogImageUrl = `/og?${ogParams.toString()}`

	return {
		metadataBase: new URL('https://sachinraja.com'),
		title: post.title,
		description: post.description,
		authors: [{ name: 'Sachin Raja', url: 'https://sachinraja.com' }],
		openGraph: {
			title: post.title,
			description: post.description,
			type: 'article',
			publishedTime: post.publishedAt.toISOString(),
			authors: ['Sachin Raja'],
			images: [
				{
					url: ogImageUrl,
					width: 1200,
					height: 630,
					alt: post.title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: post.title,
			description: post.description,
			creator: '@s4chinraja',
			images: [ogImageUrl],
		},
	}
}

export default async function BlogPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const post = getPost(slug)
	if (!post || post.draft) return notFound()

	return (
		<main className="m-10">
			<div className="max-w-3xl mx-auto">
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-bold font-mono">{post.title}</h1>
					<time dateTime={new Date(post.publishedAt).toISOString()}>
						{new Date(post.publishedAt).toLocaleDateString('en-us', {
							day: 'numeric',
							month: 'long',
							year: 'numeric',
						})}
					</time>
				</div>

				<div className="mt-2 prose lg:prose-lg prose-invert prose-headings:font-mono prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base">
					<post.Component />
				</div>

				<footer className="mt-5">
					<Footer />
				</footer>
			</div>
		</main>
	)
}
