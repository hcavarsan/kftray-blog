import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BlogComments } from '@/components/blog/blog-comments'
import { FormatDate } from '@/components/common/format-date'
import { blogSource } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components'

interface BlogPostPageProps {
	params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params
	const page = blogSource.getPage([slug])

	if (!page) notFound()

	const data = page.data
	const Mdx = data.body

	return (
		<main className="pb-16">
			<div className="relative mb-6 overflow-hidden">
				{data.image && (
					<div className="absolute inset-0">
						<Image
							src={data.image}
							alt={`Cover image for ${data.title}`}
							fill
							className="object-cover blur-sm scale-105"
							priority
						/>
						<div className="absolute inset-0 bg-dark-base/80" />
					</div>
				)}
				{!data.image && <div className="absolute inset-0 bg-dark-base" />}

				<div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-10 md:py-16 lg:px-8">
					<Link
						href="/blog"
						className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
					>
						<ArrowLeft className="h-4 w-4" />
						Back to blog
					</Link>

					<h1 className="mb-4 text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
						{data.title}
					</h1>

					{data.description && (
						<p className="mb-8 max-w-2xl text-lg text-text-secondary">{data.description}</p>
					)}

					<div className="flex items-center gap-4">
						{data.avatar && (
							<Image
								src={data.avatar}
								alt={data.author}
								width={44}
								height={44}
								className="rounded-full ring-2 ring-border"
							/>
						)}
						<div>
							<p className="font-medium text-text-primary">{data.author}</p>
							{data.position && <p className="text-sm text-text-secondary">{data.position}</p>}
						</div>
						<span className="text-border">|</span>
						<time className="text-sm text-text-secondary">
							<FormatDate date={new Date(data.date)} />
						</time>
					</div>
				</div>
			</div>

			<article className="mx-auto w-full max-w-7xl px-6 lg:px-8">
				<div className="prose prose-fd">
					<Mdx components={getMDXComponents()} />
				</div>
			</article>

			<div className="mx-auto mt-16 w-full max-w-7xl px-6 lg:px-8">
				<BlogComments />
			</div>
		</main>
	)
}

export function generateStaticParams() {
	return blogSource.getPages().map((page) => ({
		slug: page.slugs[0],
	}))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
	const { slug } = await params
	const page = blogSource.getPage([slug])

	if (!page) return {}

	const data = page.data

	return {
		title: data.title,
		description: data.description,
		openGraph: {
			title: data.title,
			description: data.description,
			type: 'article',
			url: `/blog/${slug}`,
			authors: [data.author],
			images: data.image
				? [{ url: data.image }]
				: [{ url: `/api/og?title=${encodeURIComponent(data.title)}` }],
		},
	}
}
