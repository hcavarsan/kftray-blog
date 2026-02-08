<script setup lang="ts">
import type ParsedContent from '@nuxt/content'
import type PropType from 'vue'
import { computed } from 'vue'
import { useRoute } from '#imports'
import FormatDate from '~/components/common/FormatDate.vue'

defineProps({
	post: {
		type: Object as PropType<typeof ParsedContent>,
		required: true,
	},
})

// Get route to access query params
const route = useRoute()

// Get the current language from the URL if available
const currentLang = computed(() => (route.query.lang as string) || '')
</script>

<template>
  <NuxtLink v-if="post && post.published && post._path" 
    :to="currentLang ? { path: post._path, query: { lang: currentLang } } : post._path"
    class="flex flex-col h-full overflow-hidden rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02] bg-white dark:bg-pickled-bluewood-700/50 border border-gray-200 dark:border-pickled-bluewood-600">
    <div class="relative aspect-[16/9] overflow-hidden">
      <img
        :src="post.image"
        :alt="post.title"
        class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>

    <div class="flex flex-col flex-grow p-6">
      <div class="flex-grow">
        <h2 class="mb-3 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ post.title }}
        </h2>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {{ post.description }}
        </p>
      </div>

      <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-pickled-bluewood-600">
        <div class="flex items-center space-x-3">
          <img
            :src="post.avatar"
            class="w-8 h-8 rounded-full ring-2 ring-white dark:ring-pickled-bluewood-600"
            :alt="post.author"
            loading="lazy"
          >
          <span class="text-sm font-medium text-gray-900 dark:text-white">
            {{ post.author }}
          </span>
        </div>
        <time
          :datetime="new Date(post.timestamp * 1000).toISOString()"
          class="text-sm text-gray-500 dark:text-gray-400"
        >
          <FormatDate :date="new Date(post.timestamp * 1000)"/>
        </time>
      </div>
    </div>
  </NuxtLink>
</template>
