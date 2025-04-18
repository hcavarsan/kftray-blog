// Server plugin to handle multilingual OG tags for initial page load
import { createError, defineEventHandler, getQuery } from 'h3'

export default defineNitroPlugin((nitroApp) => {
  // Add a hook to intercept the page rendering
  nitroApp.hooks.hook('render:html', async (html, { event }) => {
    if (!event) return
    
    const url = event.path || ''
    const query = getQuery(event)
    const langParam = query.lang
    
    // Only handle blog post URLs with a language parameter
    if (!url.startsWith('/blog/posts/') || !langParam || !['es', 'pt'].includes(String(langParam))) {
      return
    }
    
    // Get the storage instance to access content files
    const storage = useStorage()
    
    // Extract the post basename from the URL
    const pathParts = url.split('/')
    const basename = pathParts[pathParts.length - 1].split('?')[0] // Remove any query params
    
    try {
      // Try to load the translated content file
      const langDir = String(langParam)
      const contentPath = `content:blog/posts/${langDir}/${basename}.md`
      
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