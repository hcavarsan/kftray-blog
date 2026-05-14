import { generateOGImage } from 'fumadocs-ui/og'
import { type NextRequest, NextResponse } from 'next/server'
import { blogSource } from '@/lib/source'
import { site } from '@/lib/site'

export const runtime = 'edge'

interface RouteParams {
	params: Promise<{ slug: string[] }>
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
	const { slug } = await params
	// URL pattern: /og/blog/my-post/image.png
	// slug = ['blog', 'my-post', 'image.png']
	// Strip last element ('image.png') and first element ('blog' prefix)
	const postSlug = slug.slice(1, -1)
	const page = blogSource.getPage(postSlug)

	if (!page) {
		return new NextResponse('Not found', { status: 404 })
	}

	return generateOGImage({
		title: page.data.title,
		description: page.data.description,
		site: site.name,
	})
}

export function generateStaticParams() {
	return blogSource
		.getPages()
		.filter((page) => page.data.published !== false)
		.map((page) => ({
			slug: ['blog', ...page.slugs, 'image.png'],
		}))
}
