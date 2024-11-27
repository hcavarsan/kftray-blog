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
useSeoMeta({
  ogTitle: 'Manage and share multiple kubectl port-forward in the menu bar',
  ogDescription: 'kubectl port-forward manager, with support for UDP and proxy connections through k8s clusters',
  ogImage: '/img/kftray-head.webp',
  ogUrl: 'https://kftray.app',
  ogType: 'website',
  ogSiteName: 'Kftray',
  twitterSite: '@kftray',
  twitterTitle: 'Manage and share multiple kubectl port-forward in the menu bar',
  twitterDescription: 'kubectl port-forward manager, with support for UDP and proxy connections through k8s clusters',
  twitterImage: '/img/kftray-head.webp',
  twitterImageAlt: 'Kftray Image',
  twitterCard: 'summary'
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
    }
  ],
  meta: [
    {
      name: 'title',
      content: 'Manage and share multiple kubectl port-forward in the menu bar'
    },
    {
      name: 'description',
      content: 'kubectl port-forward manager, with support for UDP and proxy connections through k8s clusters'
    }
  ]
})
</script>
