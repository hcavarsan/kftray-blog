// Plugin to set meta tags for multilingual content
export default defineNuxtPlugin((nuxtApp) => {
  // Add a hook when the app is created
  nuxtApp.hook('app:created', () => {
    const route = useRoute();
    
    // Only process for blog post pages with language query
    if (!route.path.startsWith('/blog/posts/') || !route.query.lang) {
      return;
    }
    
    // Get SSR context data if available
    const ssrContext = (process.server && nuxtApp.ssrContext) ? nuxtApp.ssrContext : null;
    const context = ssrContext?.event?.context || {};
    
    // If we have title/description from the middleware, use them for tags
    if (context.title && context.description) {
      useHead({
        title: context.title,
        meta: [
          { name: 'description', content: context.description },
          { property: 'og:title', content: context.title },
          { property: 'og:description', content: context.description }
        ]
      });
    }
  });
});