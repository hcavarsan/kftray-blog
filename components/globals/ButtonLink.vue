<script setup lang="ts">
defineProps({
	blank: {
		type: Boolean,
		required: false,
		default: false,
	},
	color: {
		type: String,
		default: 'primary',
	},
	href: {
		type: String,
		required: true,
		default: '',
	},
	icon: {
		type: String,
		default: '',
	},
	size: {
		type: String,
		default: 'medium',
	},
	transparent: {
		type: Boolean,
		default: false,
	},
	bold: {
		type: [Boolean, String],
		default: false,
	},
})
</script>

<template>
  <NuxtLink
    class="button-link"
    :class="[`button-${size}`, { 'button-transparent': transparent }]"
    :to="href"
    :target="blank ? '_blank' : undefined"
  >
    <Icon v-if="icon" :name="icon" />
    <ContentSlot :use="$slots.default" unwrap="p ul li" />
  </NuxtLink>
</template>

<style scoped>
.button-link {
  display: inline-flex;
  flex: none;
  align-items: center;
  border-radius: 0.375rem;
  transition: color 100ms ease-in-out;
  font-weight: 700;
  color: #fff;
  background-color: var(--color-primary-600, #4f46e5);
  border: 1px solid transparent;
  text-decoration: none;
}

.button-link:hover {
  background-color: var(--color-primary-500, #6366f1);
}

.button-link:focus {
  border: 1px solid var(--color-primary-600, #4f46e5);
}

.button-link .icon {
  margin-inline-end: 0.25rem;
}

.button-small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.button-medium {
  padding: 0.625rem 1.25rem;
  font-size: 1rem;
  line-height: 1.5rem;
}

.button-large {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.button-giant {
  padding: 1rem 2rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.button-transparent {
  background-color: transparent;
}
</style>
