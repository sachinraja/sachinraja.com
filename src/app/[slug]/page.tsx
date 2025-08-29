import { MDXContent } from '@content-collections/mdx/react'
import { allPosts } from 'content-collections'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ComponentProps } from 'react'
import { Socials } from '@/components/socials'
import { getReleasedPosts } from '@/lib/utils'

export const dynamicParams = false

export function generateStaticParams() {
	return getReleasedPosts(allPosts).map((post) => ({ slug: post.slug }))
}

// stolen from bengubler.com
export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params
	const post = getReleasedPosts(allPosts).find((p) => p.slug === slug)

	if (!post) {
		return {
			title: 'Post Not Found',
		}
	}

	const ogParams = new URLSearchParams({
		title: post.title,
		description: post.description,
		type: 'post',
	})
	const ogImageUrl = `/og?${ogParams.toString()}`

	return {
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
	const post = allPosts.find((post) => post.slug === slug)

	if (!post) return notFound()

	return (
		<main className="m-10">
			<div className="max-w-3xl mx-auto">
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-bold font-mono">{post.title}</h1>
					<time dateTime={post.publishedAt.toISOString()}>
						{post.publishedAt.toLocaleDateString('en-us', {
							day: 'numeric',
							month: 'long',
							year: 'numeric',
						})}
					</time>
				</div>

				<div className="text-lg">
					<MDXContent
						code={post.mdx}
						components={{
							h2(props: ComponentProps<'h2'>) {
								return (
									<h2
										className="text-xl font-semibold font-mono tracking-wider my-2"
										{...props}
									/>
								)
							},
							p(props: ComponentProps<'p'>) {
								return <p className="my-4" {...props} />
							},
							img({ src, ...props }: ComponentProps<typeof Image>) {
								return (
									<Image
										src={src}
										width={1000}
										height={100}
										className="my-4 max-w-full h-auto rounded-lg"
										sizes=""
										{...props}
									/>
								)
							},
							a({ href, ...props }: ComponentProps<typeof Link>) {
								return (
									<Link
										href={href}
										className="text-blue-500 hover:underline"
										{...props}
									/>
								)
							},
							ol(props: ComponentProps<'ol'>) {
								return (
									<ol
										className="list-decimal list-inside my-4 flex flex-col gap-2"
										{...props}
									/>
								)
							},
						}}
					/>
				</div>

				<footer className="mt-5">
					<Socials />
				</footer>
			</div>
		</main>
	)
}
