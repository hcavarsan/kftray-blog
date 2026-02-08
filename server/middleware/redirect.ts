export default defineEventHandler(async (event) => {
	const url = getRequestURL(event)
	const path = url.pathname
	const query = getQuery(event)

	// If we have a language query, redirect to the language-prefixed path
	if (query.lang) {
		const lang = query.lang as string

		// Only handle known languages
		if (!['en', 'es', 'pt'].includes(lang)) {
			return
		}

		// Skip if already in language path
		if (path.startsWith(`/${lang}/`)) {
			return
		}

		// For blog posts, handle specially
		if (path.startsWith('/blog/posts/')) {
			const pathParts = path.split('/')
			const filename = pathParts[pathParts.length - 1]

			// Create target path with language prefix for the post
			const targetPath = `/blog/posts/${lang}/${filename}`

			// Check if the post exists in the language folder in content structure
			try {
				// The actual content is in content/99.blog/posts/pt/filename.md
				const contentPath = `99.blog/posts/${lang}/${filename}.md`
				const storage = useStorage('content')

				// First check direct path
				let exists = await storage.hasItem(contentPath)

				if (!exists) {
					// Try listing all files in the language directory
					const files = await storage.getKeys(`99.blog/posts/${lang}`)

					// See if any match our filename (fuzzy match)
					exists = files.some((file) => file.endsWith(`/${filename}.md`))
				}

				if (exists) {
					// Create new query object without the lang parameter
					const newQuery = { ...query }
					delete newQuery.lang

					// Create target URL without lang parameter
					const targetUrl = new URL(url)
					targetUrl.pathname = targetPath

					// Only add search parameters if there are any left
					if (Object.keys(newQuery).length > 0) {
						targetUrl.search = new URLSearchParams(newQuery).toString()
					} else {
						targetUrl.search = ''
					}

					// Use temporary redirect to avoid caching (302) since we're still developing
					return sendRedirect(event, targetUrl.toString(), 302)
				}
			} catch {
				// Silently continue if file check fails
			}
		} else {
			// For other pages, simply prefix with language
			const targetPath = `/${lang}${path}`

			// Create new query object without the lang parameter
			const newQuery = { ...query }
			delete newQuery.lang

			// Create target URL without lang parameter
			const targetUrl = new URL(url)
			targetUrl.pathname = targetPath

			// Only add search parameters if there are any left
			if (Object.keys(newQuery).length > 0) {
				targetUrl.search = new URLSearchParams(newQuery).toString()
			} else {
				targetUrl.search = ''
			}

			// Use temporary redirect to avoid caching (302) since we're still developing
			return sendRedirect(event, targetUrl.toString(), 302)
		}
	}
})
