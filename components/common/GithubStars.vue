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
  } catch (error) {
    console.error('Error fetching GitHub stars:', error)
  }
})
</script>

<style lang="ts" scoped>
css({
  '.github-button': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '{space.2}',
    height: '{space.8}',
    padding: '0 {space.3}',
    color: '{color.gray.500}',
    transition: 'all 0.2s ease',
    border: '1px solid {color.gray.200}',
    borderRadius: '{radii.md}',
    fontSize: '{text.sm.fontSize}',
    lineHeight: 1,
    userSelect: 'none',

    '@dark': {
      color: '{color.gray.400}',
      borderColor: 'rgba(75, 85, 99, 0.2)'
    },

    '&:hover': {
      color: '{color.gray.700}',
      borderColor: '{color.gray.300}',
      background: '{color.gray.50}',
      '@dark': {
        color: '{color.gray.200}',
        borderColor: 'rgba(75, 85, 99, 0.5)',
        background: 'rgba(75, 85, 99, 0.1)'
      }
    },

    '&:active': {
      transform: 'translateY(1px)'
    },

    '.github-icon': {
      width: '{space.4}',
      height: '{space.4}',
      flexShrink: 0
    },
  },

  '.star-text': {
    fontWeight: 500,
    display: 'none',
    '@sm': {
      display: 'block'
    }
  },

  '.star-count': {
    fontWeight: 400,
    display: 'inline-flex',
    alignItems: 'center',
    height: '{space.5}',
    padding: '0 {space.2}',
    background: 'rgba(var(--color-gray-100), 0.7)',
    color: '{color.gray.600}',
    borderRadius: '{radii.md}',
    border: '1px solid {color.gray.100}',
    fontSize: '{text.xs.fontSize}',
    lineHeight: 1,

    '@dark': {
      background: 'rgba(75, 85, 99, 0.15)',
      borderColor: 'rgba(75, 85, 99, 0.2)',
      color: '{color.gray.400}'
    }
  }
})
</style>
