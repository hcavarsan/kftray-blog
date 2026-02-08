// Server plugin to transform OG tags in HTML output
export default defineNitroPlugin((nitro) => {
	// Add a hook to transform the HTML before it's sent to the browser
	nitro.hooks.hook('render:html', (html, { event }) => {
		// Check if we have title/description in the context
		const title = event?.context?.title
		const description = event?.context?.description

		if (!title || !description) {
			return
		}

		// Replace the OG tags in the HTML with the translated values
		const ogTitlePattern = /<meta\s+property="og:title"\s+content="([^"]+)"/
		const ogDescPattern = /<meta\s+property="og:description"\s+content="([^"]+)"/
		const twitterTitlePattern = /<meta\s+name="twitter:title"\s+content="([^"]+)"/
		const twitterDescPattern = /<meta\s+name="twitter:description"\s+content="([^"]+)"/
		const descPattern = /<meta\s+name="description"\s+content="([^"]+)"/

		// Replace each tag if found
		if (ogTitlePattern.test(html.head)) {
			html.head = html.head.replace(ogTitlePattern, `<meta property="og:title" content="${title}"`)
		}

		if (ogDescPattern.test(html.head)) {
			html.head = html.head.replace(ogDescPattern, `<meta property="og:description" content="${description}"`)
		}

		if (twitterTitlePattern.test(html.head)) {
			html.head = html.head.replace(twitterTitlePattern, `<meta name="twitter:title" content="${title}"`)
		}

		if (twitterDescPattern.test(html.head)) {
			html.head = html.head.replace(twitterDescPattern, `<meta name="twitter:description" content="${description}"`)
		}

		if (descPattern.test(html.head)) {
			html.head = html.head.replace(descPattern, `<meta name="description" content="${description}"`)
		}
	})
})
