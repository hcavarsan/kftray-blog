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
const url = useRequestURL()
const metaBaseUrl = 'https://kftray.app'
const baseUrl = process.dev ? 'http://localhost:3000' : metaBaseUrl
const route = useRoute()
const { page } = useContent()

// Helper function to format image URL
const formatImageUrl = (imagePath) => {
  if (!imagePath) return `${metaBaseUrl}/img/kftray-head.webp`
  if (imagePath.startsWith('http')) return imagePath

  // Ensure the path starts with a slash
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`

  // Add image processing parameters like Hashnode
  const imageUrl = new URL(`${metaBaseUrl}${cleanPath}`)
  imageUrl.searchParams.append('w', '1200')
  imageUrl.searchParams.append('auto', 'compress,format')

  return imageUrl.toString()
}

// Get image paths
const imagePath = page.value?.image || '/img/kftray-head.png'
const fullImageUrl = formatImageUrl(imagePath)
const thumbnailUrl = fullImageUrl



useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/img/logo.png'
    },
    {
      rel: 'apple-touch-icon',
      href: '/img/logo.png'
    },
    {
      rel: 'image_src',
      href: thumbnailUrl
    }
  ],
  meta: [
    // Basic meta
    { name: 'description', content: page.value?.description || 'A modern Kubernetes port-forward UI manager' },

    // Reddit specific
    { name: 'thumbnail', content: thumbnailUrl },
    { property: 'reddit:image', content: thumbnailUrl },
    { property: 'reddit:thumbnail', content: thumbnailUrl },

    // Open Graph
    { property: 'og:title', content: page.value?.title || 'kftray' },
    { property: 'og:description', content: page.value?.description || 'A modern Kubernetes port-forward UI manager' },
    { property: 'og:image', content: fullImageUrl },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:url', content: `${metaBaseUrl}${route.path}` },
    { property: 'og:type', content: route.path.includes('/blog/posts/') ? 'article' : 'website' },
    { property: 'og:site_name', content: 'kftray' },
    { property: 'og:image:alt', content: page.value?.imageAlt || page.value?.title || 'kftray' },

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: page.value?.title || 'kftray' },
    { name: 'twitter:description', content: page.value?.description || 'A modern Kubernetes port-forward UI manager' },
    { name: 'twitter:image', content: fullImageUrl },
    { name: 'twitter:image:width', content: '1200' },
    { name: 'twitter:image:height', content: '630' },
    { name: 'twitter:site', content: '@kftray' },
    { name: 'twitter:creator', content: '@kftray' },
    { name: 'twitter:image:alt', content: page.value?.imageAlt || page.value?.title || 'kftray' },
  ]
})
</script>
