<script setup lang="ts">
import FormatDate from "~/components/common/FormatDate.vue";
import BlogComments from "~/components/blog/BlogComments.vue";

const { page } = useContent()
</script>

<template>
  <div class="relative">
<LandingBanner badge-text="Release v0.10.0" text="A new version of kftray has been released." link="https://github.com/hcavarsan/kftray/releases/tag/v0.10.0" link-text="Check it out →"  />
</div>
  <div class="relative min-h-[91vh] overflow-hidden">
    <div class="absolute -top-[30vh] left-0 select-none">
    </div>
    <div class="relative HeaderContainer">
      <NuxtLink href="/blog" class="flex items-center gap-1 my-6">
        <Icon name="heroicons-solid:arrow-left" />
        Back to overview
      </NuxtLink>
    </div>
    <div class="relative PostContainer pt-4">
      <header class="flex items-center justify-between mb-4 lg:mb-6 not-format">
        <div class="w-full">
          <div class="mb-4">
            <p class="font-light text-gray-500 dark:text-gray-400 text-md">
              Published on <FormatDate :date="new Date(page.timestamp * 1000)" />
            </p>
            <h1 class="text-2xl font-extrabold leading-tight lg:mb-6 lg:text-4xl text-gray-900 dark:text-white">
              {{page.title}}
            </h1>
          </div>
          <address class="flex items-center not-italic w-full">
            <div class="flex items-center mr-3 text-sm text-gray-900 dark:text-white w-full">
              <NuxtLink :href="page.avatarLink" target="_blank">
                <img class="mr-4 w-12 h-12 rounded-full" :src="page.avatar" :alt="page.author">
              </NuxtLink>
              <div class="flex items-end justify-between w-full ml-2">
                <NuxtLink :href="page.avatarLink" target="_blank">
                  <span rel="author" class="text-base font-bold text-gray-900 dark:text-white">
                    {{page.author}}
                  </span>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    {{page.position}}
                  </p>
                </NuxtLink>
              </div>
            </div>
          </address>
        </div>
      </header>
      <article class="pb-[70px]">
	  <Ellipsis right="0" width="85%" blur="150px" />
        <slot />
		<Ellipsis left="0px" width="60rem" top="60rem" blur="150px" />
		<BlogComments />
      </article>
    </div>
  </div>
</template>

<style scoped>
.HeaderContainer {
  max-width: 87rem;
  margin: auto auto;

  @apply px-12 xl:px-0;
}

.PostContainer {
  max-width: 58rem;
  margin: auto auto 5rem;

  @apply px-12 xl:px-0;
}
</style>
