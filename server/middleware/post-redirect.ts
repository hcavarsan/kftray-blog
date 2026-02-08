// Middleware to maintain clean URLs for language-specific paths
export default defineEventHandler(async (event) => {
	const url = getRequestURL(event)
	const path = url.pathname
	const query = getQuery(event)

	// Handle query parameter for language if it reaches this middleware (fallback)
	if (path.startsWith('/blog/posts/') && query.lang) {
		const lang = query.lang as string

		// Only handle known languages
		if (!['en', 'es', 'pt'].includes(lang)) {
			return
		}

		// Skip if already in language path
		if (path.match(/^\/blog\/posts\/(en|es|pt)\//)) {
			return
		}

		// Extract filename
		const pathParts = path.split('/')
		const filename = pathParts[pathParts.length - 1]

		// Create target path with language prefix
		const targetPath = `/blog/posts/${lang}/${filename}`

		// Create new query object without lang parameter
		const newQuery = { ...query }
		delete newQuery.lang

		// Create clean URL
		const targetUrl = new URL(url)
		targetUrl.pathname = targetPath

		// Only add search parameters if there are any left
		if (Object.keys(newQuery).length > 0) {
			targetUrl.search = new URLSearchParams(newQuery).toString()
		} else {
			targetUrl.search = ''
		}

		// Always redirect to clean URL
		return sendRedirect(event, targetUrl.toString(), 302)
	}
})
