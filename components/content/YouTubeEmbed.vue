<template>
  <div class="youtube-embed-wrapper">
    <div v-if="!loaded" class="relative bg-gray-800 aspect-video flex items-center justify-center cursor-pointer border rounded-lg overflow-hidden" @click="loadVideo">
      <div class="absolute inset-0">
        <img 
          :src="`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`"
          :alt="`Play ${videoId}`"
          class="w-full h-full object-cover"
          @error="(e) => e.target.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`"
        />
      </div>
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-all transform hover:scale-105">
          <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
          </svg>
        </div>
      </div>
    </div>
    
    <div v-if="loaded" class="aspect-video bg-black rounded-lg overflow-hidden">
      <iframe
        :src="`https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`"
        class="w-full h-full"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
	videoId: string
}

defineProps<Props>()
const loaded = ref(false)

const loadVideo = () => {
	loaded.value = true
}
</script>