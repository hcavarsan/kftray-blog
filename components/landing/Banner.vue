<script setup lang="ts">
defineProps({
  badgeText: {
    type: String,
    default: undefined,
  },
  text: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: undefined,
  },
  linkText: {
    type: String,
    default: 'Check it out!',
  },
})
</script>

<template>
  <div class="banner-container">
    <span v-if="badgeText" class="badge">
      {{ badgeText }}
    </span>
    <span class="banner-text">
      {{ text }}
    </span>
    <NuxtLink v-if="link" :href="link" target="_blank" class="banner-link">
      {{ linkText }}
    </NuxtLink>
  </div>
</template>

<style scoped>
.banner-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: rgba(249, 250, 251, 0.9);
  border-bottom: 1px solid rgba(229, 231, 235, 0.6);
  backdrop-filter: blur(8px);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -0.01em;
  transition: all 0.3s ease;
}

@media (max-width: 1023px) {
  .banner-container {
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem 1rem;
    text-align: center;
    font-size: 0.75rem;
  }
  
  .badge {
    margin-right: 0;
    margin-bottom: 0;
    padding: 0.125rem 0.5rem;
    font-size: 0.625rem;
  }
  
  .banner-text {
    margin-right: 0;
    font-size: 0.75rem;
    line-height: 1.3;
  }
  
  .banner-link {
    font-size: 0.75rem;
    margin-top: 0.125rem;
  }
}

@media (prefers-color-scheme: dark) {
  .banner-container {
    background-color: rgba(24, 24, 24, 0.9);
    border-bottom-color: rgba(48, 48, 48, 0.6);
  }
}

:global(.dark) .banner-container {
  background-color: rgba(24, 24, 24, 0.9);
  border-bottom-color: rgba(48, 48, 48, 0.6);
}

.badge {
  margin-right: 0.75rem;
  padding: 0.25rem 0.625rem;
  background-color: rgb(107, 114, 128);
  color: white;
  border-radius: 0.375rem;
  font-family: inherit;
  font-size: 0.6875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.2;
}

@media (prefers-color-scheme: dark) {
  .badge {
    background-color: rgb(75, 85, 99);
  }
}

:global(.dark) .badge {
  background-color: rgb(75, 85, 99);
}

.banner-text {
  color: rgb(107, 114, 128);
  margin-right: 0.5rem;
  font-family: inherit;
  line-height: inherit;
  letter-spacing: inherit;
}

@media (prefers-color-scheme: dark) {
  .banner-text {
    color: rgb(163, 163, 163);
  }
}

:global(.dark) .banner-text {
  color: rgb(163, 163, 163);
}

.banner-link {
  color: rgb(75, 85, 99);
  text-decoration: none;
  font-family: inherit;
  font-weight: 500;
  line-height: inherit;
  letter-spacing: inherit;
  transition: color 0.2s ease;
}

.banner-link:hover {
  color: rgb(55, 65, 81);
  text-decoration: underline;
}

@media (prefers-color-scheme: dark) {
  .banner-link {
    color: rgb(209, 213, 219);
  }
  
  .banner-link:hover {
    color: rgb(229, 231, 235);
  }
}

:global(.dark) .banner-link {
  color: rgb(209, 213, 219);
}

:global(.dark) .banner-link:hover {
  color: rgb(229, 231, 235);
}
</style>
