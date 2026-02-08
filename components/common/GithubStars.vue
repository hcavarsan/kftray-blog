<template>
  <a
    href="https://github.com/hcavarsan/kftray"
    target="_blank"
    rel="noopener"
    class="github-button"
  >
    <Icon
      name="uil:github"
      class="github-icon"
    />
    <span class="star-text">Star</span>
    <span
      v-if="stars"
      class="star-count"
    >{{ formatStars(stars) }}</span>
  </a>
</template>

<script setup lang="ts">
const stars = ref<number | null>(null)

function formatStars(count: number) {
	if (count >= 1000) {
		return `${(count / 1000).toFixed(1)}k`
	}
	return count
}

onMounted(async () => {
	try {
		const response = await fetch('https://api.github.com/repos/hcavarsan/kftray')
		const data = await response.json()
		stars.value = data.stargazers_count
	} catch {
		// Silently fail - stars will just not show
	}
})
</script>

<style scoped>
.github-button {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  height: 1.75rem;
  padding: 0 0.625rem;
  color: rgb(156, 163, 175);
  transition: all 0.2s ease;
  border: 1px solid rgb(209, 213, 219);
  border-radius: 0.3125rem;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1;
  user-select: none;
  text-decoration: none;
}

@media (min-width: 768px) {
  .github-button {
    height: 2rem;
    padding: 0 0.75rem;
    font-size: 0.8125rem;
    gap: 0.5rem;
  }
}

@media (prefers-color-scheme: dark) {
  .github-button {
    color: rgb(163, 163, 163);
    border-color: rgba(64, 64, 64, 0.4);
  }
}

:global(.dark) .github-button {
  color: rgb(163, 163, 163);
  border-color: rgba(64, 64, 64, 0.4);
}

.github-button:hover {
  color: rgb(75, 85, 99);
  border-color: rgb(156, 163, 175);
  background: rgba(249, 250, 251, 0.8);
}

@media (prefers-color-scheme: dark) {
  .github-button:hover {
    color: rgb(209, 213, 219);
    border-color: rgba(75, 75, 75, 0.6);
    background: rgba(48, 48, 48, 0.4);
  }
}

:global(.dark) .github-button:hover {
  color: rgb(209, 213, 219);
  border-color: rgba(75, 75, 75, 0.6);
  background: rgba(48, 48, 48, 0.4);
}

.github-button:active {
  transform: translateY(1px);
}

.github-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.star-text {
  font-weight: 400;
  display: none;
  font-size: inherit;
}

@media (min-width: 640px) {
  .star-text {
    display: block;
  }
}

.star-count {
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  height: 1.125rem;
  padding: 0 0.375rem;
  background: rgba(229, 231, 235, 0.8);
  color: rgb(107, 114, 128);
  border-radius: 0.25rem;
  border: 1px solid rgba(209, 213, 219, 0.6);
  font-size: 0.6875rem;
  line-height: 1;
}

@media (min-width: 768px) {
  .star-count {
    height: 1.25rem;
    padding: 0 0.5rem;
    font-size: 0.75rem;
  }
}

@media (prefers-color-scheme: dark) {
  .star-count {
    background: rgba(48, 48, 48, 0.3);
    border-color: rgba(64, 64, 64, 0.4);
    color: rgb(163, 163, 163);
  }
}

:global(.dark) .star-count {
  background: rgba(48, 48, 48, 0.3);
  border-color: rgba(64, 64, 64, 0.4);
  color: rgb(163, 163, 163);
}
</style>
