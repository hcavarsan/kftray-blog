<script setup lang="ts">
import type { PropType } from 'vue'

type HTMLElementsTags = keyof HTMLElementTagNameMap

defineProps({
	as: {
		type: String as PropType<HTMLElementsTags>,
		required: false,
		default: 'div',
	},
	fluid: {
		type: Boolean,
		default: false,
	},
	padded: {
		type: [Boolean, String],
		default: true,
	},
})
</script>

<template>
  <component 
    :is="as" 
    :class="[
      'container',
      {
        'container-fluid': fluid,
        'container-fixed': !fluid,
        'container-padded': padded
      }
    ]"
  >
    <slot />
  </component>
</template>

<style scoped>
.container {
  margin-inline-start: auto;
  margin-inline-end: auto;
  width: 100%;
}

.container-padded {
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 475px) {
  .container-padded {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 640px) {
  .container-padded {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media (min-width: 768px) {
  .container-padded {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
}

.container-fixed {
  max-width: 80rem;
}
</style>