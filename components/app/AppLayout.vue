<script setup lang="ts">
const { config } = useDocus()

// We'll keep the watch but remove the useHead
watch(
  () => config.value.titleTemplate,
  () => {
    // Empty for now, handled in app.vue
  }
)
</script>

<template>
  <div class="app-layout">
    <AppLoadingBar />
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style lang="ts" scoped>
css({
  '.app-layout': {
    main: {
      minHeight: 'calc(100vh - {docus.header.height} - {docus.footer.height})',
    }
  }
})
</style>
