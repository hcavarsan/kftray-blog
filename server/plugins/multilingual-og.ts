// Server plugin to handle multilingual OG tags for initial page load
import { createError, defineEventHandler } from 'h3'

export default defineNitroPlugin((nitroApp) => {
  // Add a hook to intercept the page rendering
  nitroApp.hooks.hook('render:html', async (html, { event }) => {
    if (!event) return
    
    const url = event.path || ''
    
    // Only handle language-specific blog post URLs
    const langMatch = url.match(/^\/blog\/posts\/(es|pt)\//)
    if (!langMatch) {
      return
    }
    
    // Get the storage instance to access content files
    const storage = useStorage()
    
    // Extract the language code and post basename from the URL
    const pathParts = url.split('/')
    const langDir = pathParts[3] // 'es' or 'pt'
    const basename = pathParts[pathParts.length - 1].split('?')[0] // Remove any query params
    
    try {
      // Try to load the translated content file using the correct content path
      const contentPath = `content:99.blog/posts/${langDir}/${basename}.md`
      
      // Check if the translated content exists
      const exists = await storage.hasItem(contentPath)
      
      if (exists) {
        // Read the content file
        const content = await storage.getItem(contentPath)
        
        if (content && content.title && content.description) {
          // Replace the OG meta tags in the HTML
          const ogTitleRegex = /<meta property="og:title" content="([^"]+)">/g
          const ogDescRegex = /<meta property="og:description" content="([^"]+)">/g
          const twitterTitleRegex = /<meta name="twitter:title" content="([^"]+)">/g
          const twitterDescRegex = /<meta name="twitter:description" content="([^"]+)">/g
          const descRegex = /<meta name="description" content="([^"]+)">/g
          
          // Replace the title tags
          html.head = html.head
            .replace(ogTitleRegex, `<meta property="og:title" content="${content.title}">`)
            .replace(twitterTitleRegex, `<meta name="twitter:title" content="${content.title}">`)
          
          // Replace the description tags
          html.head = html.head
            .replace(ogDescRegex, `<meta property="og:description" content="${content.description}">`)
            .replace(twitterDescRegex, `<meta name="twitter:description" content="${content.description}">`)
            .replace(descRegex, `<meta name="description" content="${content.description}">`)
        }
      }
    } catch (error) {
      console.error('Error processing multilingual OG tags:', error)
    }
  })
})