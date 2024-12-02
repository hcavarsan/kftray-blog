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
const baseUrl = process.client ? window.location.origin : 'https://kftray.app'

useSeoMeta({
  title,
  description,

  // OpenGraph
  ogTitle: title,
  ogDescription: description,
  ogImage: image,
  ogUrl: 'https://kftray.app',
  ogType: 'website',
  ogSiteName: 'Kftray',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: 'Kftray Preview Image',

  // Twitter
  twitterCard: 'summary_large_image',
  twitterSite: '@kftray',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: image,
  twitterImageAlt: 'Kftray Preview Image',
  twitterDomain: 'kftray.app',
  twitterUrl: 'https://kftray.app',

  // Additional meta tags for better SEO
  author: 'Henrique Cavarsan',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  'format-detection': 'telephone=no',
  canonical: 'https://kftray.app',
})

useHead({
  title,
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
      rel: 'canonical',
      href: 'https://kftray.app'
    }
  ],
  meta: [
    {
      name: 'description',
      content: description
    },
    {
      name: 'theme-color',
      content: '#0FCF97'
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent'
    }
  ]
})
</script>
