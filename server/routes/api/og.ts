// Server API route to handle OG images with language support
export default defineEventHandler(async (event) => {
  // Get the URL and path information
  const url = getRequestURL(event);
  
  // Extract language from path for language-specific URLs
  const langMatch = url.pathname.match(/^\/blog\/posts\/(es|pt)\//);
  const langFromPath = langMatch ? langMatch[1] : null;
  
  // Only handle blog post URLs
  if (!url.pathname.startsWith('/blog/posts/')) {
    return;
  }
  
  // Extract the post slug from the path
  const pathParts = url.pathname.split('/');
  const slug = pathParts[pathParts.length - 1];
  let translatedContent = null;
  
  // Try to find the post in the language from the path
  if (langFromPath) {
    try {
      // Use the correct content path structure
      const contentPath = `99.blog/posts/${langFromPath}/${slug}`;
      const storage = useStorage('content');
      const exists = await storage.hasItem(`${contentPath}.md`);
      
      if (exists) {
        // Load the translated content
        translatedContent = await queryContent(contentPath).findOne();
      }
    } catch (e) {
      console.error('Error loading translated content for OG tags:', e);
    }
  }
  
  // If we found translated content, update the head meta tags
  if (translatedContent) {
    // Get the translated title and description
    const title = translatedContent.title;
    const description = translatedContent.description;
    
    // Update the head meta tags
    useHead({
      title,
      meta: [
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description }
      ]
    });
  }
});