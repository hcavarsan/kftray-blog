<script setup>
import BlogCard from "~/components/blog/BlogCard.vue";
import { ref, watch, computed } from 'vue';

// Get current language from URL parameter
const route = useRoute();
const lang = ref(route.query.lang ? String(route.query.lang) : 'en');

// Update lang when route query changes
watch(() => route.query.lang, (newLang) => {
  if (newLang && ['en', 'es', 'pt'].includes(String(newLang))) {
    lang.value = String(newLang);
  } else if (!newLang) {
    lang.value = 'en';
  }
});

// Get all blog posts
const { data: allPosts } = await useAsyncData('blog-posts', () => 
  queryContent('blog/posts')
    .sort({ timestamp: -1 })
    .find()
);

// Filter posts based on language
const contentQuery = computed(() => {
  if (!allPosts.value) return [];
  
  if (lang.value === 'en') {
    return allPosts.value.filter(post => !post._path.includes('/es/') && !post._path.includes('/pt/'));
  } else if (lang.value === 'es') {
    return allPosts.value.filter(post => post._path.includes('/es/'));
  } else if (lang.value === 'pt') {
    return allPosts.value.filter(post => post._path.includes('/pt/'));
  }
  
  // Default to English
  return allPosts.value.filter(post => !post._path.includes('/es/') && !post._path.includes('/pt/'));
});
</script>

<template>
  <div class="relative min-h-screen bg-gray-50 dark:bg-pickled-bluewood-900">
    <div class="relative">
		<Ellipsis right="0" width="85%" blur="150px" />
    </div>

    <div class="relative">
      <section class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <!-- Header -->


        <div class="text-center mb-12 sm:mb-16">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Blog
          </h1>
          <p class="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            News about kftray and related topics
          </p>
          
          <!-- Simple language selector -->
          <div class="flex items-center justify-center mt-6 gap-2">
            <button 
              @click="lang = 'en'; $router.push({path: '/blog', query: {lang: 'en'}})" 
              class="px-3 py-1 text-xs uppercase rounded-full"
              :class="lang === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'"
            >
              EN
            </button>
            <button 
              @click="lang = 'es'; $router.push({path: '/blog', query: {lang: 'es'}})" 
              class="px-3 py-1 text-xs uppercase rounded-full"
              :class="lang === 'es' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'"
            >
              ES
            </button>
            <button 
              @click="lang = 'pt'; $router.push({path: '/blog', query: {lang: 'pt'}})" 
              class="px-3 py-1 text-xs uppercase rounded-full"
              :class="lang === 'pt' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'"
            >
              PT
            </button>
          </div>
        </div>

        <!-- Blog Grid -->
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <BlogCard
            v-for="post in contentQuery"
            :key="post._id"
            :post="post"
          />
        </div>

        <!-- Decorative elements -->
		<Ellipsis right="0" width="85%" blur="150px" />
      </section>
    </div>
  </div>
</template>

<style scoped>
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 24rem), 1fr));
  gap: 2rem;
}
</style>
