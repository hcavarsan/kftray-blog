import type { MetadataRoute } from 'next'
import { blogSource, source } from '@/lib/source'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
	const docPages = source.getPages().map((page) => ({
		url: `${site.url}${page.url}`,
		lastModified: new Date(),
		changeFrequency: 'weekly' as const,
		priority: 0.8,
	}))

	const blogPages = blogSource
		.getPages()
		.filter((page) => page.data.published !== false && !page.data.noindex)
		.map((page) => ({
			url: `${site.url}${page.url}`,
			lastModified: new Date(page.data.updated ?? page.data.date),
			changeFrequency: 'monthly' as const,
			priority: 0.6,
		}))

	return [
		{
			url: site.url,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `${site.url}/blog`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.7,
		},
		{
			url: `${site.url}/downloads`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.9,
		},
		...docPages,
		...blogPages,
	]
}
