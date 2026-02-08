<script setup lang="ts">
const props = defineProps<{
	text?: string
}>()

const cleanText = computed(() => {
	if (!props.text) return ''

	return props.text.replace(/[\u201C\u201D]/g, '"').replace(/[\u2018\u2019]/g, "'")
})
</script>

<template>
  <p>
    <slot>{{ cleanText }}</slot>
  </p>
</template>
