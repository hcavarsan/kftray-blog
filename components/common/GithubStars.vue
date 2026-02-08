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
  gap: 0.3125rem;
  height: 28px;
  padding: 0 0.5rem;
  color: rgb(100, 100, 100);
  transition: all 0.2s ease;
  border-radius: 0.4375rem;
  font-size: 0.6875rem;
  font-weight: 400;
  line-height: 1;
  user-select: none;
  text-decoration: none;
}

.github-button:hover {
  color: rgb(50, 50, 50);
  background: rgba(0, 0, 0, 0.04);
}

.github-icon {
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
}

.star-text {
  font-weight: 500;
  display: none;
  font-size: 0.6875rem;
}

@media (min-width: 640px) {
  .star-text {
    display: block;
  }
}

.star-count {
  font-weight: 400;
  font-size: 0.625rem;
  color: inherit;
  line-height: 1;
  opacity: 0.7;
}
</style>

<style>
.dark .github-button {
  color: rgb(180, 180, 180);
}

.dark .github-button:hover {
  color: rgb(240, 240, 240);
  background: rgba(255, 255, 255, 0.06);
}
</style>
