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
  const safeUrl = url?.href || baseUrl;

  const timestamp = pageData.timestamp || Math.floor(Date.now() / 1000);

  return {
    title: safeTitle,
    description: safeDescription,

    // Open Graph
    ogType: 'article',
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
    twitterTitle: safeTitle,
    twitterDescription: safeDescription,
    twitterImage: safeImage,
    twitterImageAlt: safeTitle,
    twitterSite: '@kftray',
    twitterCreator: '@kftray',
    twitterDomain: 'kftray.app',

    // Additional meta based on your blog format
    author: pageData.author || 'Henrique Cavarsan',
    robots: pageData.published ? 'index, follow' : 'noindex, nofollow',
    viewport: 'width=device-width, initial-scale=1',
    canonical: safeUrl,

    // Article specific meta
    articlePublishedTime: new Date(timestamp * 1000).toISOString(),
    ogArticlePublishedTime: new Date(timestamp * 1000).toISOString(),
    datePublished: new Date(timestamp * 1000).toISOString(),

    // Additional article metadata
    ...(pageData.position && {
      articleSection: pageData.position
    }),
    ...(pageData.avatar && {
      authorImage: pageData.avatar
    }),
    ...(pageData.avatarLink && {
      authorUrl: pageData.avatarLink
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
