import type { MetadataRoute } from 'next'
import { blogSource, source } from '@/lib/source'

const BASE_URL = 'https://kftray.app'

export default function sitemap(): MetadataRoute.Sitemap {
	const docPages = source.getPages().map((page) => ({
		url: `${BASE_URL}${page.url}`,
		lastModified: new Date(),
		changeFrequency: 'weekly' as const,
		priority: 0.8,
	}))

	const blogPages = blogSource.getPages().map((page) => ({
		url: `${BASE_URL}${page.url}`,
		lastModified: new Date(),
		changeFrequency: 'monthly' as const,
		priority: 0.6,
	}))

	return [
		{
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `${BASE_URL}/blog`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.7,
		},
		{
			url: `${BASE_URL}/downloads`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.9,
		},
		...docPages,
		...blogPages,
	]
}
