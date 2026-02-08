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
  height: 28px;
  padding: 0 0.625rem;
  color: rgb(115, 115, 115);
  transition: all 0.2s ease;
  border: 1px solid rgba(229, 231, 235, 0.6);
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1;
  user-select: none;
  text-decoration: none;
}

.github-button:hover {
  color: rgb(64, 64, 64);
  border-color: rgba(209, 213, 219, 0.8);
  background: rgba(0, 0, 0, 0.04);
}

.github-button:active {
  transform: translateY(1px);
}

.github-icon {
  width: 0.875rem;
  height: 0.875rem;
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
  background: rgba(229, 231, 235, 0.5);
  color: rgb(115, 115, 115);
  border-radius: 0.25rem;
  border: 1px solid rgba(229, 231, 235, 0.4);
  font-size: 0.625rem;
  line-height: 1;
}
</style>

<style>
.dark .github-button {
  color: rgb(163, 163, 163);
  border-color: rgba(64, 64, 64, 0.3);
}

.dark .github-button:hover {
  color: rgb(229, 231, 235);
  border-color: rgba(75, 75, 75, 0.5);
  background: rgba(255, 255, 255, 0.06);
}

.dark .star-count {
  background: rgba(48, 48, 48, 0.3);
  border-color: rgba(64, 64, 64, 0.3);
  color: rgb(163, 163, 163);
}
</style>
