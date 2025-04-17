// Middleware to handle multilingual post URLs
export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  const path = url.pathname;
  
  // If we're on a language-specific post URL, redirect to the base URL with query param
  if (path.match(/^\/blog\/posts\/(en|es|pt)\/.+/)) {
    const pathParts = path.split('/');
    const lang = pathParts[3]; // 'en', 'es', or 'pt'
    const filename = pathParts[4];
    
    // Remove the language segment from the path
    const newPath = `/blog/posts/${filename}`;
    
    // Add the language as a query param
    const query = { ...getQuery(event), lang };
    
    // Create the target URL
    const targetUrl = new URL(url);
    targetUrl.pathname = newPath;
    targetUrl.search = new URLSearchParams(query).toString();
    
    // Redirect to the new URL
    return sendRedirect(event, targetUrl.toString());
  }
})