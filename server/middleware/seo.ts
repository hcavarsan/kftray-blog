// Middleware to enhance SEO for multilingual content
export default defineEventHandler(async (event) => {
  // Get the URL and path
  const url = getRequestURL(event);
  const path = url.pathname;
  
  // Only handle language-specific blog post URLs
  if (!path.match(/^\/blog\/posts\/(es|pt)\//)) {
    return;
  }
  
  // Skip the middleware for API requests and assets
  if (path.includes('/_nuxt/') || path.includes('/api/') || 
      path.includes('.js') || path.includes('.css') || path.includes('.ico')) {
    return;
  }
  
  try {
    // Extract the language code and post basename
    const pathParts = path.split('/');
    const langCode = pathParts[3]; // 'es' or 'pt'
    const basename = pathParts[pathParts.length - 1];
    
    // Look for translated content in the correct content path
    const translatedPath = `99.blog/posts/${langCode}/${basename}.md`;
    
    // Use storage to check if file exists
    const storage = useStorage('content');
    const exists = await storage.hasItem(translatedPath);
    
    if (exists) {
      // Read the file but only extract the needed fields
      const content = await storage.getItem(translatedPath);
      
      if (content && content.title && content.description) {
        // Store the translated title and description in context
        event.context.title = content.title;
        event.context.description = content.description;
      }
    }
  } catch (error) {
    // Silently fail to avoid blocking the request
    console.error('Error in SEO middleware:', error);
  }
})