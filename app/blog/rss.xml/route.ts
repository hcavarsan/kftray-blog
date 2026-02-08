import { blogSource } from '@/lib/source'

const BASE_URL = 'https://kftray.app'

export function GET() {
	const pages = blogSource
		.getPages()
		.filter((page) => page.data.published !== false)
		.sort((a, b) => {
			const dateA = new Date(a.data.date)
			const dateB = new Date(b.data.date)
			return dateB.getTime() - dateA.getTime()
		})

	const items = pages
		.map((page) => {
			const pubDate = new Date(page.data.date).toUTCString()
			const url = `${BASE_URL}${page.url}`

			return `		<item>
			<title><![CDATA[${page.data.title}]]></title>
			<link>${url}</link>
			<guid isPermaLink="true">${url}</guid>
			<pubDate>${pubDate}</pubDate>
			${page.data.description ? `<description><![CDATA[${page.data.description}]]></description>` : ''}
			${page.data.author ? `<author>${page.data.author}</author>` : ''}
		</item>`
		})
		.join('\n')

	const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>kftray Blog</title>
		<link>${BASE_URL}/blog</link>
		<description>Updates, tutorials, and insights about kftray and Kubernetes port forwarding.</description>
		<language>en</language>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		<atom:link href="${BASE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
	</channel>
</rss>`

	return new Response(feed, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=3600',
		},
	})
}
