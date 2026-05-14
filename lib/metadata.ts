import type { Metadata } from 'next'
import { site } from './site'
import type { BlogPageType } from './source'

/**
 * Resolves the OG image URL for a blog post to an absolute URL.
 *
 * Priority:
 * 1. If `data.image` starts with 'http' → use as-is (already absolute)
 * 2. If `data.image` is truthy (relative path) → prepend site.url
 * 3. Otherwise → use dynamic OG route via site.ogImageUrl
 */
export function resolveOgImage(data: BlogPageType['data'], slug: string): string {
	if (data.image?.startsWith('http')) {
		return data.image
	}
	if (data.image) {
		return `${site.url}${data.image}`
	}
	return site.ogImageUrl(['blog', slug])
}

/**
 * Builds full Next.js Metadata object for a blog post.
 * The root layout provides `title.template`, so we set a plain string here.
 */
export function buildPostMetadata(page: BlogPageType, slug: string): Metadata {
	const { data } = page
	const description = data.description ?? site.description
	const ogImage = resolveOgImage(data, slug)
	const publishedTime = new Date(data.date).toISOString()
	const modifiedTime = data.updated ? new Date(data.updated).toISOString() : publishedTime

	return {
		title: data.title,
		description,
		authors: [{ name: data.author }],
		openGraph: {
			type: 'article',
			title: data.title,
			description,
			url: `${site.url}/blog/${slug}`,
			siteName: site.name,
			images: [{ url: ogImage }],
			publishedTime,
			modifiedTime,
		},
		twitter: {
			card: 'summary_large_image',
			title: data.title,
			description,
			images: [ogImage],
		},
		alternates: {
			canonical: data.canonical ?? `${site.url}/blog/${slug}`,
		},
		robots: data.noindex ? { index: false, follow: false } : undefined,
	}
}

/**
 * Builds JSON-LD structured data for a blog post.
 * Returns [BlogPosting, BreadcrumbList] — render both in a single <script>.
 */
export function buildJsonLd(page: BlogPageType, slug: string): object[] {
	const { data } = page
	const description = data.description ?? site.description
	const ogImage = resolveOgImage(data, slug)
	const publishedTime = new Date(data.date).toISOString()
	const modifiedTime = data.updated ? new Date(data.updated).toISOString() : publishedTime
	const postUrl = `${site.url}/blog/${slug}`

	const blogPosting = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: data.title,
		description,
		image: {
			'@type': 'ImageObject' as const,
			url: ogImage,
			width: 1200,
			height: 630,
		},
		datePublished: publishedTime,
		dateModified: modifiedTime,
		author: {
			'@type': 'Person' as const,
			name: data.author,
			url: data.avatarLink ?? undefined,
		},
		publisher: {
			'@type': 'Organization' as const,
			name: site.name,
			logo: {
				'@type': 'ImageObject' as const,
				url: `${site.url}/img/logo.png`,
			},
		},
		mainEntityOfPage: {
			'@type': 'WebPage' as const,
			'@id': postUrl,
		},
		keywords: data.tags && data.tags.length > 0 ? data.tags.join(', ') : undefined,
	}

	const breadcrumbList = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem' as const,
				position: 1,
				name: 'Home',
				item: site.url,
			},
			{
				'@type': 'ListItem' as const,
				position: 2,
				name: 'Blog',
				item: `${site.url}/blog`,
			},
			{
				'@type': 'ListItem' as const,
				position: 3,
				name: data.title,
				item: postUrl,
			},
		],
	}

	return [blogPosting, breadcrumbList]
}
