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
  const safeTitle = pageData.title || title;
  const safeDescription = pageData.description || description;
  const safeImage = getImageUrl(pageData.image);

  return {
    // Basic meta tags
    title: safeTitle,
    description: safeDescription,

    // Open Graph
    ogTitle: safeTitle,
    ogDescription: safeDescription,
    ogImage: safeImage,
    ogUrl: url?.href || baseUrl,
    ogType: pageData.type === 'post' ? 'article' : 'website',
    ogSiteName: 'Kftray',
    ogLocale: 'en_US',

    // Twitter
    twitterCard: 'summary_large_image',
    twitterTitle: safeTitle,
    twitterDescription: safeDescription,
    twitterImage: safeImage,
    twitterSite: '@kftray',
    twitterCreator: '@kftray',
    twitterDomain: 'kftray.app',

    // Additional meta
    author: pageData.author || 'Henrique Cavarsan',
    robots: 'index, follow',
    viewport: 'width=device-width, initial-scale=1',
    canonical: url?.href || baseUrl,

    // Article specific meta (only added if they exist)
    ...(formattedDate?.value && {
      articlePublishedTime: formattedDate.value.toISOString(),
      ogArticlePublishedTime: formattedDate.value.toISOString(),
      datePublished: formattedDate.value.toISOString()
    }),
    ...(pageData.updatedAt && {
      articleModifiedTime: pageData.updatedAt,
      ogArticleModifiedTime: pageData.updatedAt,
      dateModified: pageData.updatedAt
    }),
    ...(pageData.author && {
      articleAuthor: pageData.author,
      ogArticleAuthor: pageData.author
    }),
    ...(pageData.category && {
      articleSection: pageData.category
    }),
    ...(pageData.tags && {
      articleTag: pageData.tags
    })
  }
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
