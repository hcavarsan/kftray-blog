export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  const path = url.pathname;
  const query = getQuery(event);
  
  // If we have a language query on a post page, redirect to the language-specific post
  if (path.startsWith('/blog/posts/') && query.lang) {
    const lang = query.lang as string;
    
    // Only handle known languages
    if (!['en', 'es', 'pt'].includes(lang)) {
      return;
    }
    
    // Only handle if the post is not already in the requested language folder
    const pathParts = path.split('/');
    
    // /blog/posts/en/some-post -> en is at index 3
    if (pathParts.length >= 4) {
      const currentLang = pathParts[3];
      
      // If the language in the URL matches the requested language, no redirect needed
      if (currentLang === lang) {
        return;
      }
      
      // Get the post filename (last part of the path)
      const filename = pathParts[pathParts.length - 1];
      
      // Create the target path
      const targetPath = `/blog/posts/${lang}/${filename}`;
      
      // Check if the target exists before redirecting
      try {
        const storage = useStorage();
        const exists = await storage.hasItem(`content:${targetPath}.md`);
        
        if (exists) {
          return sendRedirect(event, targetPath);
        }
      } catch (e) {
        // If we can't check if the file exists, don't redirect
        console.error('Error checking if file exists:', e);
      }
    }
  }
});