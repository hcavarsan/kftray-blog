// Server API route to handle OG images with language support
export default defineEventHandler(async (event) => {
  // Get the URL and query parameters
  const url = getRequestURL(event);
  const query = getQuery(event);
  const langQuery = query.lang;
  
  // Only handle blog post URLs
  if (!url.pathname.startsWith('/blog/posts/')) {
    return;
  }
  
  // Extract the post slug from the path
  const pathParts = url.pathname.split('/');
  const slug = pathParts[pathParts.length - 1];
  let translatedContent = null;
  
  // Try to find the post in the requested language
  if (langQuery && ['es', 'pt'].includes(langQuery.toString())) {
    try {
      const lang = langQuery.toString();
      const langPath = `/blog/posts/${lang}/${slug}`;
      const storage = useStorage();
      const exists = await storage.hasItem(`content:${langPath}.md`);
      
      if (exists) {
        // Load the translated content
        translatedContent = await queryContent(langPath).findOne();
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