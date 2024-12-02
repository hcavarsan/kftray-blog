<template>
  <AppLayout class="min-h-screen bg-white dark:bg-pickled-bluewood-900">
    <NuxtPage />
  </AppLayout>
</template>

<style>
nav {
  @apply hidden lg:block
}

.container {
  @apply max-w-[85em] !important;
}

.aside-nav {
  @apply xl:pr-[20px] !important;
}


.BrandingText {
  background: linear-gradient(to right, #81F6D4 10%, #12a87b 40%, #0FCF97 60%, #81F6D4 90%);
  background-size: 200% auto;
  background-position: 100% center;

  color: #000;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

body {
  @apply bg-white dark:bg-pickled-bluewood-900;
}

:root {
  color-scheme: light dark;
}
</style>

<script setup>
const title =  '🦀 ⚡ kubectl port forward manager, with support for UDP and proxy connections through k8s cluster'
const description = 'Manage and share multiple kubectl port-forward in the menu bar'
const image = 'https://repository-images.githubusercontent.com/723535263/f96a73f1-01f5-42bc-8239-dbc22dd3c4ef'

const url = useRequestURL()
const baseUrl = url.origin || 'https://kftray.app'

const page = useRoute()

const formattedDate = computed(() => {
  if (!page?.value?.date) return null;
  try {
    return new Date(page.value.date);
  } catch {
    return null;
  }
});

useSeoMeta(() => {
  // Ensure we have valid data
  const pageData = page?.value || {};
  const currentRoute = useRoute();
  const safeTitle = pageData.title || title;
  const safeDescription = pageData.description || description;

  // Determine if we're on a blog post
  const isBlogPost = currentRoute.path.includes('/blog/posts/');

  // Get the full URL
  const safeUrl = new URL(currentRoute.path, 'https://kftray.app').href;

  // Helper function to ensure absolute URLs for images
  const getAbsoluteImageUrl = (imagePath) => {
    if (!imagePath) return 'https://kftray.app/img/kftray-logo.webp'; // default image
    if (imagePath.startsWith('http')) return imagePath;
    return `https://kftray.app${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  const safeImage = getAbsoluteImageUrl(pageData.image);

  return {
    title: safeTitle,
    description: safeDescription,

    // Open Graph
    ogType: isBlogPost ? 'article' : 'website',
    ogTitle: safeTitle,
    ogDescription: safeDescription,
    ogUrl: safeUrl,
    ogImage: safeImage,
    ogImageAlt: safeTitle,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogLocale: 'en_US',
    ogSiteName: 'Kftray',

    // Twitter Cards
    twitterCard: 'summary_large_image',
    twitterImage: safeImage,
    twitterImageAlt: safeTitle,
    twitterTitle: safeTitle,
    twitterDescription: safeDescription,
    twitterSite: '@kftray',
    twitterCreator: '@kftray',
    twitterDomain: 'kftray.app',

    // Additional meta
    author: pageData.author || 'Henrique Cavarsan',
    viewport: 'width=device-width, initial-scale=1',
    robots: pageData.published === false ? 'noindex, nofollow' : 'index, follow',
    canonical: safeUrl,

    // Article specific meta (only for blog posts)
    ...(isBlogPost && {
      articlePublishedTime: new Date(pageData.timestamp * 1000).toISOString(),
      ogArticlePublishedTime: new Date(pageData.timestamp * 1000).toISOString(),
      datePublished: new Date(pageData.timestamp * 1000).toISOString(),
      articleSection: pageData.position || 'Blog',
      articleAuthor: pageData.author || 'Henrique Cavarsan'
    })
  };
});

const getImageUrl = (pageImage) => {
  try {
    if (!pageImage) return image;
    return pageImage.startsWith('http') ? pageImage : `${baseUrl}${pageImage}`;
  } catch {
    return image;
  }
};
</script>
