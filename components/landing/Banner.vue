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
  padding: 0.75rem 1rem;
  background-color: rgba(249, 250, 251, 0.9);
  backdrop-filter: blur(8px);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.6875rem;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -0.01em;
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  .banner-container {
    padding: 0.4375rem 1.5rem;
  }
}

@media (min-width: 1024px) {
  .banner-container {
    flex-wrap: wrap;
    padding: 0.75rem 8rem 0.75rem 2.5rem;
  }

  .banner-link {
    flex-basis: 100%;
    text-align: center;
  }
}

@media (max-width: 1023px) {
  .banner-container {
    flex-direction: column;
    gap: 0.1875rem;
    text-align: center;
    justify-content: center;
    font-size: 0.625rem;
  }

  .badge {
    margin-right: 0;
    margin-bottom: 0;
    padding: 0.0625rem 0.375rem;
    font-size: 0.5rem;
  }

  .banner-text {
    margin-right: 0;
    font-size: 0.625rem;
    line-height: 1.3;
  }

  .banner-link {
    font-size: 0.625rem;
    margin-top: 0.0625rem;
  }
}

.badge {
  margin-right: 0.5rem;
  padding: 0.125rem 0.4375rem;
  background-color: rgb(107, 114, 128);
  color: white;
  border-radius: 0.1875rem;
  font-family: inherit;
  font-size: 0.5625rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.2;
}

.banner-text {
  color: rgb(115, 115, 115);
  margin-right: 0.375rem;
  font-family: inherit;
  line-height: inherit;
  letter-spacing: inherit;
}

.banner-link {
  color: rgb(64, 64, 64);
  text-decoration: none;
  font-family: inherit;
  font-weight: 500;
  line-height: inherit;
  letter-spacing: inherit;
  transition: color 0.2s ease;
}

.banner-link:hover {
  color: rgb(23, 23, 23);
  text-decoration: underline;
}
</style>

<style>
.dark .banner-container {
  background-color: rgba(24, 24, 24, 0.9);
}

.dark .badge {
  background-color: rgb(75, 85, 99);
}

.dark .banner-text {
  color: rgb(163, 163, 163);
}

.dark .banner-link {
  color: rgb(209, 213, 219);
}

.dark .banner-link:hover {
  color: rgb(229, 231, 235);
}
</style>
