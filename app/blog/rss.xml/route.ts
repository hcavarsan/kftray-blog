import { blogSource } from '@/lib/source'
import { site } from '@/lib/site'

export function GET() {
	const pages = blogSource
		.getPages()
		.filter((page) => page.data.published !== false && !page.data.noindex)
		.sort((a, b) => {
			const dateA = new Date(a.data.date)
			const dateB = new Date(b.data.date)
			return dateB.getTime() - dateA.getTime()
		})

	const items = pages
		.map((page) => {
			const pubDate = new Date(page.data.date).toUTCString()
			const url = `${site.url}${page.url}`

			return `		<item>
			<title><![CDATA[${page.data.title}]]></title>
			<link>${url}</link>
			<guid isPermaLink="true">${url}</guid>
			<pubDate>${pubDate}</pubDate>
			${page.data.description ? `<description><![CDATA[${page.data.description}]]></description>` : ''}
			<content:encoded><![CDATA[${page.data.description ?? ''}

<p><a href="${site.url}${page.url}">Read the full article on kftray.app →</a></p>]]></content:encoded>
			${page.data.author ? `<dc:creator><![CDATA[${page.data.author}]]></dc:creator>` : ''}
		</item>`
		})
		.join('\n')

	const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
	<channel>
		<title>kftray Blog</title>
		<link>${site.url}/blog</link>
		<description>Updates, tutorials, and insights about kftray and Kubernetes port forwarding.</description>
		<language>en</language>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		<atom:link href="${site.url}/blog/rss.xml" rel="self" type="application/rss+xml" />
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
