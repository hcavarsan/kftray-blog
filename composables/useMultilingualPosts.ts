import { computed, ref } from 'vue'
import { useContent, useRoute } from '#imports'

export function useMultilingualPosts() {
	const route = useRoute()
	const { page } = useContent()

	// Get language from URL path
	const currentLang = computed(() => {
		// Check for language in URL path segments
		const pathSegments = route.path.split('/').filter(Boolean)

		// If path starts with a language code, use it
		if (pathSegments.length > 0 && ['en', 'es', 'pt'].includes(pathSegments[0])) {
			return pathSegments[0]
		}

		// For blog posts, check if it's in a language folder
		if (route.path.includes('/blog/posts/')) {
			const pathParts = route.path.split('/')
			const langIndex = pathParts.indexOf('posts') + 1

			if (langIndex < pathParts.length && ['en', 'es', 'pt'].includes(pathParts[langIndex])) {
				return pathParts[langIndex]
			}
		}

		// Default to English
		return 'en'
	})

	// Extract the slug from the current page path
	const currentSlug = computed(() => {
		if (!page.value?._path) return ''

		// Get the filename without extension from the path
		const pathParts = page.value._path.split('/')
		return pathParts[pathParts.length - 1]
	})

	// Find matching language versions of the current post
	const findLanguageVersions = async () => {
		// Skip if no slug
		if (!currentSlug.value) return []

		// Define language file paths to search - these match the URL routes, not content paths
		const langPaths = {
			en: `/blog/posts/${currentSlug.value}`,
			es: `/blog/posts/es/${currentSlug.value}`,
			pt: `/blog/posts/pt/${currentSlug.value}`,
		}

		// Define content paths to check existence - these are the actual paths in the content directory
		const contentPaths = {
			en: `99.blog/posts/${currentSlug.value}`,
			es: `99.blog/posts/es/${currentSlug.value}`,
			pt: `99.blog/posts/pt/${currentSlug.value}`,
		}

		const versions = []
		const storage = useStorage('content')

		// Find each language version
		for (const [lang, path] of Object.entries(langPaths)) {
			try {
				// Check if the content file exists in the storage
				const exists = await storage.hasItem(`${contentPaths[lang]}.md`)

				if (exists) {
					versions.push({
						lang,
						path, // URL path to the language version
						exists: true,
					})
				} else {
					versions.push({
						lang,
						path,
						exists: false,
					})
				}
			} catch {
				// Version doesn't exist
				versions.push({
					lang,
					path,
					exists: false,
				})
			}
		}

		return versions
	}

	// Return available language versions as a computed property
	const languageVersions = ref([])

	// Function to load language versions
	const loadLanguageVersions = async () => {
		languageVersions.value = await findLanguageVersions()
	}

	return {
		currentSlug,
		currentLang,
		languageVersions,
		loadLanguageVersions,
	}
}
