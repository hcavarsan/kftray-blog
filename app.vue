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
const baseUrl = process.dev ? 'http://localhost:3000' : 'https://kftray.app'
const route = useRoute()
const { page } = useContent()

// Configure head with template
useHead({
  htmlAttrs: {
    lang: 'en',
    'data-theme': 'dark'
  },
  titleTemplate: '%s · kftray',
  templateParams: {
    separator: '·',
    siteName: 'kftray'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/img/kftray.png'
    }
  ],
  meta: [
    // Basic meta
    { name: 'description', content: page.value?.description || 'A modern Kubernetes port-forward UI manager' },

    // Open Graph
    { property: 'og:title', content: page.value?.title || 'kftray' },
    { property: 'og:description', content: page.value?.description || 'A modern Kubernetes port-forward UI manager' },
    { property: 'og:image', content: `${baseUrl}${page.value?.image || '/img/kftray-head.webp'}` },
    { property: 'og:url', content: `${baseUrl}${route.path}` },
    { property: 'og:type', content: route.path.includes('/blog/posts/') ? 'article' : 'website' },
    { property: 'og:site_name', content: 'kftray' },

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: page.value?.title || 'kftray' },
    { name: 'twitter:description', content: page.value?.description || 'A modern Kubernetes port-forward UI manager' },
    { name: 'twitter:image', content: `${baseUrl}${page.value?.image || '/img/kftray-head.webp'}` },
    { name: 'twitter:site', content: '@kftray' },
    { name: 'twitter:creator', content: '@kftray' },
  ]
})
</script>
