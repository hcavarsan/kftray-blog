<script setup lang="ts">
const { config } = useDocus()
useHead({
  link: [{
    rel: 'search',
    type: 'application/opensearchdescription+xml',
    href: 'opensearch.xml'
  }, { rel: 'icon', type: 'image/png', href: '/img/favicon.ico' }
  ]
})

</script>

<template>

  <div class="page-layout">
  <div class="relative">
<LandingBanner badge-text="Release v0.11.1" text="A new version of kftray has been released." link="https://github.com/hcavarsan/kftray/releases/tag/v0.11.1" link-text="Check it out →"  />
</div>
    <Container
      :fluid="config?.main?.fluid"
      :padded="config?.main?.padded"
    >
      <article>
        <slot />
      </article>
    </Container>
  </div>
</template>

<style lang="ts" scoped>
css({
'.page-layout': {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative'
}
})
</style>
