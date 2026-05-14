import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { generateOGImage } from 'fumadocs-ui/og'
import { type NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { site } from '@/lib/site'
import { blogSource } from '@/lib/source'

export const runtime = 'nodejs'

const OG_WIDTH = 1200
const OG_HEIGHT = 630

interface RouteParams {
	params: Promise<{ slug: string[] }>
}

async function resizeImage(imageSource: string): Promise<Buffer | null> {
	try {
		let input: Buffer

		if (imageSource.startsWith('http')) {
			const res = await fetch(imageSource)
			if (!res.ok) return null
			input = Buffer.from(await res.arrayBuffer())
		} else {
			const filePath = path.join(process.cwd(), 'public', imageSource)
			input = await readFile(filePath)
		}

		return await sharp(input)
			.resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover', position: 'centre' })
			.png()
			.toBuffer()
	} catch {
		return null
	}
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
	const { slug } = await params
	const postSlug = slug.slice(1, -1)
	const page = blogSource.getPage(postSlug)

	if (!page) {
		return new NextResponse('Not found', { status: 404 })
	}

	// If the post has a cover image, resize/crop it to 1200×630
	if (page.data.image) {
		const resized = await resizeImage(page.data.image)
		if (resized) {
			return new Response(new Uint8Array(resized), {
				headers: {
					'Content-Type': 'image/png',
					'Cache-Control': 'public, max-age=31536000, immutable',
				},
			})
		}
	}

	// No cover image (or resize failed): generate branded text card
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
