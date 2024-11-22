<script setup>
import BlogCard from "~/components/blog/BlogCard.vue";

const contentQuery = await queryContent('blog/posts').sort(
    { timestamp: -1, }
).find()
</script>

<template>
  <div class="relative min-h-screen bg-gray-50 dark:bg-pickled-bluewood-900">
    <div class="relative">
		<Ellipsis right="0" width="85%" blur="150px" />
      <LandingBanner
        badge-text="Release v0.15.1"
        text="A new version of kftray has been released."
        link="https://github.com/hcavarsan/kftray/releases/tag/v0.15.1"
        link-text="Check it out →"
      />
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
