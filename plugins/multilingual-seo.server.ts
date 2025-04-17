// Server plugin to handle multilingual SEO
export default defineNuxtPlugin({
  name: 'multilingual-seo',
  enforce: 'pre',
  setup(nuxtApp) {
    nuxtApp.hook('app:created', async () => {
      // Get the current route
      const route = useRoute();
      const path = route.path;
      const query = route.query;
      const langQuery = query.lang;
      
      // Only handle blog post URLs
      if (!path.startsWith('/blog/posts/')) {
        return;
      }
      
      // Extract the post slug from the path
      const pathParts = path.split('/');
      const slug = pathParts[pathParts.length - 1];
      let translatedContent = null;
      
      // Try to find the post in the requested language
      if (langQuery && ['es', 'pt'].includes(langQuery.toString())) {
        try {
          const lang = langQuery.toString();
          const langPath = `/blog/posts/${lang}/${slug}`;
          
          try {
            // Load the translated content
            const content = await queryContent(langPath).find();
            if (content.length > 0) {
              translatedContent = content[0];
            }
          } catch (e) {
            console.error('Error loading translated content for SEO:', e);
          }
        } catch (e) {
          console.error('Error in multilingual SEO plugin:', e);
        }
      }
      
      // If we found translated content, update the meta tags
      if (translatedContent) {
        // Add alternate language link tags
        const alternateLinks = [
          { rel: 'alternate', hreflang: 'en', href: `${path}` },
          { rel: 'alternate', hreflang: 'es', href: `${path}?lang=es` },
          { rel: 'alternate', hreflang: 'pt', href: `${path}?lang=pt` }
        ];
        
        useHead({
          title: translatedContent.title,
          meta: [
            { name: 'description', content: translatedContent.description },
            { property: 'og:title', content: translatedContent.title },
            { property: 'og:description', content: translatedContent.description },
            { name: 'twitter:title', content: translatedContent.title },
            { name: 'twitter:description', content: translatedContent.description }
          ],
          link: alternateLinks
        });
      }
    });
  }
});