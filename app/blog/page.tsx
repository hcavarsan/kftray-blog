import type { Metadata } from 'next'
import { BlogCard } from '@/components/blog/blog-card'
import type { BlogPageType } from '@/lib/source'
import { blogSource } from '@/lib/source'

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Updates, tutorials, and insights about kftray and Kubernetes port forwarding.',
	openGraph: {
		title: 'Blog | kftray',
		description: 'Updates, tutorials, and insights about kftray and Kubernetes port forwarding.',
		images: [{ url: '/api/og?title=Blog' }],
	},
}

export default function BlogPage() {
	const allPages: BlogPageType[] = blogSource.getPages()
	const pages = allPages
		.filter((page) => page.data.published !== false)
		.sort((a, b) => {
			const dateA = new Date(a.data.date)
			const dateB = new Date(b.data.date)
			return dateB.getTime() - dateA.getTime()
		})

	return (
		<main className="mx-auto w-full max-w-7xl px-6 py-12 md:py-16 lg:px-8">
			<div className="mb-12 text-center">
				<h1 className="mb-4 text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
					Blog
				</h1>
				<p className="mx-auto max-w-2xl text-lg text-fd-muted-foreground">
					Updates, tutorials, and insights about kftray and Kubernetes port forwarding.
				</p>
			</div>

			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{pages.map((page) => (
					<BlogCard key={page.url} page={page} />
				))}
			</div>

			{pages.length === 0 && (
				<p className="py-20 text-center text-fd-muted-foreground">
					No blog posts yet. Check back soon!
				</p>
			)}
		</main>
	)
}
