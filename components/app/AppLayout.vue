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

<style scoped>
.app-layout main {
  min-height: calc(100vh - 48px - var(--footer-height, 60px));
}

@media (min-width: 768px) {
  .app-layout main {
    min-height: calc(100vh - 52px - var(--footer-height, 60px));
  }
}
</style>
