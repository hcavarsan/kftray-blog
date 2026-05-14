import type { Metadata } from 'next'
import { BlogCard } from '@/components/blog/blog-card'
import { site } from '@/lib/site'
import type { BlogPageType } from '@/lib/source'
import { blogSource } from '@/lib/source'

export const metadata: Metadata = {
	title: 'Blog — Articles and Updates',
	description:
		'Technical articles on Kubernetes port forwarding, kubectl debugging, HTTP traffic logging, and kftray release updates.',
	openGraph: {
		title: 'Blog | kftray',
		description:
			'Technical articles on Kubernetes port forwarding, kubectl debugging, HTTP traffic logging, and kftray release updates.',
		url: `${site.url}/blog`,
		type: 'website',
		siteName: site.name,
		images: [{ url: `${site.url}${site.ogImage}`, width: 1102, height: 584 }],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Blog | kftray',
		description:
			'Technical articles on Kubernetes port forwarding, kubectl debugging, HTTP traffic logging, and kftray release updates.',
		images: [`${site.url}${site.ogImage}`],
	},
	alternates: {
		canonical: `${site.url}/blog`,
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
					Technical articles on Kubernetes port forwarding, kubectl debugging, HTTP traffic logging,
					and kftray release updates.
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
