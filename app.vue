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

// Helper function to format image URL with forced absolute URLs
const formatImageUrl = (imagePath) => {
  // Always log the input
  console.log('Formatting Image URL:', {
    input: imagePath,
    env: process.dev ? 'development' : 'production',
    isSSR: process.server
  })

  if (!imagePath) {
    const defaultUrl = `${metaBaseUrl}/img/kftray-head.webp`
    console.log('Using default image:', defaultUrl)
    return defaultUrl
  }

  if (imagePath.startsWith('http')) {
    console.log('Already absolute URL:', imagePath)
    return imagePath
  }

  // Ensure the path starts with a slash
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`

  // Always use metaBaseUrl for absolute URLs
  const fullUrl = `${metaBaseUrl}${cleanPath}`

  try {
    const imageUrl = new URL(fullUrl)

    // Add parameters
    imageUrl.searchParams.set('w', '1200')
    imageUrl.searchParams.set('auto', 'compress,format')

    // Add cache buster in development
    if (process.dev) {
      imageUrl.searchParams.set('_', Date.now().toString())
    }

    const finalUrl = imageUrl.toString()
    console.log('Final formatted URL:', {
      original: imagePath,
      clean: cleanPath,
      final: finalUrl,
      isSSR: process.server
    })

    return finalUrl
  } catch (error) {
    console.error('URL formatting error:', error)
    return fullUrl
  }
}

// Get image paths - make it reactive
const fullImageUrl = computed(() => {
  const imagePath = page.value?.image || '/img/kftray-head.png'
  return formatImageUrl(imagePath)
})

const thumbnailUrl = computed(() => fullImageUrl.value)

// Environment logging
console.log('Meta Configuration:', {
  isDev: process.dev,
  isSSR: process.server,
  baseUrl,
  metaBaseUrl,
  currentUrl: url.toString(),
  pageImage: page.value?.image,
  formattedImage: fullImageUrl.value
})

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
      href: unref(thumbnailUrl)
    }
  ],
  meta: [
    // Basic meta
    { name: 'description', content: page.value?.description || 'A modern Kubernetes port-forward UI manager' },

    // Reddit specific
    { name: 'thumbnail', content: unref(thumbnailUrl) },
    { property: 'reddit:image', content: unref(thumbnailUrl) },
    { property: 'reddit:thumbnail', content: unref(thumbnailUrl) },

    // Open Graph
    { property: 'og:title', content: page.value?.title || 'kftray' },
    { property: 'og:description', content: page.value?.description || 'A modern Kubernetes port-forward UI manager' },
    { property: 'og:image', content: unref(fullImageUrl) },
    { property: 'image', content: unref(fullImageUrl) },
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
    { name: 'twitter:image', content: unref(fullImageUrl) },
    { name: 'twitter:image:width', content: '1200' },
    { name: 'twitter:image:height', content: '630' },
    { name: 'twitter:site', content: '@kftray' },
    { name: 'twitter:creator', content: '@kftray' },
    { name: 'twitter:image:alt', content: page.value?.imageAlt || page.value?.title || 'kftray' },
  ]
})
</script>
