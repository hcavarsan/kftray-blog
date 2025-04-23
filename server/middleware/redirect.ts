export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  const path = url.pathname;
  const query = getQuery(event);
  
  // If we have a language query, redirect to the language-prefixed path
  if (query.lang) {
    const lang = query.lang as string;
    
    // Only handle known languages
    if (!['en', 'es', 'pt'].includes(lang)) {
      return;
    }

    // Skip if already in language path
    if (path.startsWith(`/${lang}/`)) {
      return;
    }
    
    // For blog posts, handle specially
    if (path.startsWith('/blog/posts/')) {
      const pathParts = path.split('/');
      const filename = pathParts[pathParts.length - 1];
      
      // Create target path with language prefix for the post
      let targetPath = `/blog/posts/${lang}/${filename}`;
      
      // Check if the post exists in the language folder in content structure
      try {
        // Debug: log what we're checking
        console.log(`Checking for translated file at path: 99.blog/posts/${lang}/${filename}.md`);
        
        // The actual content is in content/99.blog/posts/pt/filename.md
        const contentPath = `99.blog/posts/${lang}/${filename}.md`;
        const storage = useStorage('content');
        
        // First check direct path
        let exists = await storage.hasItem(contentPath);
        
        if (!exists) {
          // Log what we're checking next
          console.log(`File not found, trying alternate path checking...`);
          
          // Try listing all files in the language directory
          const files = await storage.getKeys(`99.blog/posts/${lang}`);
          console.log(`Available files in ${lang} directory:`, files);
          
          // See if any match our filename (fuzzy match)
          exists = files.some(file => file.endsWith(`/${filename}.md`));
        }
        
        if (exists) {
          // Create new query object without the lang parameter
          const newQuery = { ...query };
          delete newQuery.lang;
          
          // Create target URL without lang parameter
          const targetUrl = new URL(url);
          targetUrl.pathname = targetPath;
          
          // Only add search parameters if there are any left
          if (Object.keys(newQuery).length > 0) {
            targetUrl.search = new URLSearchParams(newQuery).toString();
          } else {
            targetUrl.search = '';
          }
          
          console.log(`Redirecting to: ${targetUrl.toString()}`);
          
          // Use temporary redirect to avoid caching (302) since we're still developing
          return sendRedirect(event, targetUrl.toString(), 302);
        } else {
          console.log(`No translation found for ${filename} in ${lang}`);
        }
      } catch (e) {
        console.error('Error checking if file exists:', e);
      }
    } else {
      // For other pages, simply prefix with language
      let targetPath = `/${lang}${path}`;
      
      // Create new query object without the lang parameter
      const newQuery = { ...query };
      delete newQuery.lang;
      
      // Create target URL without lang parameter
      const targetUrl = new URL(url);
      targetUrl.pathname = targetPath;
      
      // Only add search parameters if there are any left
      if (Object.keys(newQuery).length > 0) {
        targetUrl.search = new URLSearchParams(newQuery).toString();
      } else {
        targetUrl.search = '';
      }
      
      console.log(`Redirecting to: ${targetUrl.toString()}`);
      
      // Use temporary redirect to avoid caching (302) since we're still developing
      return sendRedirect(event, targetUrl.toString(), 302);
    }
  }
});