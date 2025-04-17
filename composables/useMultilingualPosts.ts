import { computed, ref } from 'vue'
import { useContent, useRoute } from '#imports'

export function useMultilingualPosts() {
  const route = useRoute()
  const { page } = useContent()
  
  // Current language from URL parameter
  const currentLang = computed(() => route.query.lang || 'en')
  
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
    
    // Define language file paths to search
    const langPaths = {
      en: `/blog/posts/en/${currentSlug.value}`,
      es: `/blog/posts/es/${currentSlug.value}`,
      pt: `/blog/posts/pt/${currentSlug.value}`
    }
    
    const versions = []
    
    // Find each language version
    for (const [lang, path] of Object.entries(langPaths)) {
      try {
        const content = await queryContent(path).find()
        if (content.length > 0) {
          versions.push({
            lang,
            path, // Direct path to the language version
            exists: true
          })
        } else {
          versions.push({
            lang,
            path,
            exists: false
          })
        }
      } catch (error) {
        // Version doesn't exist
        versions.push({
          lang,
          path,
          exists: false
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
    loadLanguageVersions
  }
}