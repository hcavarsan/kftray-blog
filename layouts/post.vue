<script setup lang="ts">
import BlogComments from "~/components/blog/BlogComments.vue"
import FormatDate from "~/components/common/FormatDate.vue"
import { useContent } from '#imports'

const { page } = useContent()

// Format the timestamp
const formattedDate = computed(() => {
  if (!page.value?.timestamp) return null
  return new Date(page.value.timestamp * 1000)
})
</script>

<template>
  <div>
    <div class="relative">
      <LandingBanner badge-text="Release v0.14.9" text="A new version of kftray has been released."
        link="https://github.com/hcavarsan/kftray/releases/tag/v0.14.9" link-text="Check it out →" />
    </div>

    <div class="relative min-h-[91vh]">
      <!-- Back button -->
      <div class="absolute top-8 left-8 z-20">
        <NuxtLink href="/blog"
          class="group inline-flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:text-white transition-all duration-300 bg-pickled-bluewood-800/50 rounded-full backdrop-blur-sm">
          <Icon name="heroicons-solid:arrow-left" />
          Back to overview
        </NuxtLink>
      </div>

      <!-- Header with Banner -->
      <header class="relative">
        <!-- Banner Image -->
        <div class="relative h-[70vh] w-full overflow-hidden">
          <img v-if="page?.image" :src="page.image" :alt="page.title" class="w-full h-full object-cover blur-[2px]" />
          <div class="absolute inset-0 bg-gradient-to-b from-pickled-bluewood-900/80 via-pickled-bluewood-900/70 to-transparent">
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-pickled-bluewood-900 via-pickled-bluewood-900/90 to-transparent">
          </div>
          <div
            class="absolute inset-0 bg-gradient-to-r from-pickled-bluewood-900/50 via-transparent to-pickled-bluewood-900/50">
          </div>
          <div class="absolute inset-0 bg-pickled-bluewood-900/75 backdrop-blur-sm"></div>
        </div>

        <!-- Post Info -->
        <div class="absolute top-1/2 inset-x-0 transform -translate-y-1/2">
          <div class="max-w-3xl mx-auto px-6">
            <p v-if="formattedDate" class="text-sm text-white/70 mb-4 relative z-10">
              Published on <FormatDate :date="formattedDate" />
            </p>
            <h1 v-if="page?.title" class="text-4xl md:text-6xl font-light leading-tight mb-4 tracking-tight text-white relative z-10">
              {{ page.title }}
            </h1>
            <p v-if="page?.description" class="text-xl text-white/80 mb-8 font-light leading-relaxed relative z-10">
              {{ page.description }}
            </p>
            <div v-if="page?.author" class="flex items-center gap-4 border-t border-white/10 pt-6 relative z-10">
              <NuxtLink :href="page.avatarLink" target="_blank">
                <img class="w-12 h-12 rounded-full ring-2 ring-white/10" :src="page.avatar" :alt="page.author">
              </NuxtLink>
              <div>
                <NuxtLink :href="page.avatarLink" target="_blank" class="hover:text-white/90">
                  <span class="block font-normal text-white/80">{{ page.author }}</span>
                </NuxtLink>
                <p class="text-sm text-white/70">{{ page.position }}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Article Content -->
      <article class="relative z-10 bg-pickled-bluewood-900">
        <div class="max-w-3xl mx-auto px-6 py-16">
          <div class="prose dark:prose-invert lg:prose-lg custom-prose">
            <ContentRenderer v-if="page" :value="page">
              <template #empty>
                <p>No content available.</p>
              </template>
              <template #default="{ value }">
                <ContentRendererMarkdown :value="value" />
              </template>
            </ContentRenderer>
          </div>
          <div class="mt-20">
            <BlogComments />
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
<style>
.custom-prose {
  color: rgba(255, 255, 255, 0.8) !important;
}

/* Headings */
.custom-prose h1,
.custom-prose h2,
.custom-prose h3,
.custom-prose h4,
.custom-prose h5,
.custom-prose h6 {
  color: white !important;
  font-weight: 300 !important;
}

/* Paragraphs and text */
.custom-prose p {
  color: rgba(255, 255, 255, 0.8) !important;
  font-weight: 300 !important;
}

.custom-prose strong {
  color: white !important;
  font-weight: 400 !important;
}

/* Links */
.custom-prose a {
  color: #89b4fa !important;
  text-decoration: none !important;
  font-weight: 400 !important;
}

.custom-prose a:hover {
  color: #b4befe !important;
}

/* Lists */
.custom-prose ul,
.custom-prose ol {
  color: rgba(255, 255, 255, 0.8) !important;
}

.custom-prose li {
  color: rgba(255, 255, 255, 0.8) !important;
  font-weight: 300 !important;
}

/* Blockquotes */
.custom-prose blockquote {
  border-left: 4px solid #89b4fa !important;
  margin: 1.5em 0 !important;
  padding: 1em 0 1em 1em !important;
  font-style: italic !important;
  color: rgba(255, 255, 255, 0.7) !important;
  background: rgba(137, 180, 250, 0.1) !important;
  border-radius: 0 0.5rem 0.5rem 0 !important;
}

.custom-prose blockquote p {
  margin: 0 !important;
}

.custom-prose blockquote strong {
  color: rgba(255, 255, 255, 0.9) !important;
}

/* Inline code */
.custom-prose :not(pre) > code {
  color: #89b4fa !important;
  background: rgba(255, 255, 255, 0.1) !important;
  padding: 2px 6px !important;
  border-radius: 4px !important;
  font-weight: 400 !important;
  font-size: 0.875em !important;
}

/* Code blocks */
.custom-prose pre {
  background: #1e1e2e !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  padding: 1.25rem !important;
  border-radius: 8px !important;
  overflow-x: auto !important;
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Monaco, Consolas, monospace !important;
}

/* Syntax highlighting */
.custom-prose .hljs {
  color: #cdd6f4 !important;
}

.custom-prose .hljs-keyword {
  color: #f38ba8 !important;
}

.custom-prose .hljs-string {
  color: #a6e3a1 !important;
}

.custom-prose .hljs-number {
  color: #fab387 !important;
}

.custom-prose .hljs-comment {
  color: #585b70 !important;
  font-style: italic !important;
}

.custom-prose .hljs-title {
  color: #89b4fa !important;
}

.custom-prose .hljs-attr {
  color: #89dceb !important;
}

.custom-prose .hljs-built_in {
  color: #f5c2e7 !important;
}

/* Tree/Filesystem specific */
.custom-prose .language-tree,
.custom-prose .language-filesystem {
  white-space: pre !important;
  tab-size: 2 !important;
}

.custom-prose .language-tree .tree-structure,
.custom-prose .language-filesystem .tree-structure {
  color: #6c7086 !important;
}

.custom-prose .language-tree .directory,
.custom-prose .language-filesystem .directory {
  color: #89b4fa !important;
  font-weight: 500 !important;
}

.custom-prose .language-tree .file,
.custom-prose .language-filesystem .file {
  color: #cdd6f4 !important;
}

.custom-prose .language-tree .special-file,
.custom-prose .language-filesystem .special-file {
  color: #f9e2af !important;
}

.custom-prose .language-tree .size,
.custom-prose .language-filesystem .size {
  color: #a6e3a1 !important;
}

/* Tables */
.custom-prose table {
  border-color: rgba(255, 255, 255, 0.1) !important;
}

.custom-prose th {
  color: white !important;
  font-weight: 400 !important;
}

.custom-prose td {
  color: rgba(255, 255, 255, 0.8) !important;
}

/* Scrollbar styling */
.custom-prose pre::-webkit-scrollbar {
  height: 8px !important;
}

.custom-prose pre::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05) !important;
  border-radius: 4px !important;
}

.custom-prose pre::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1) !important;
  border-radius: 4px !important;
}

.custom-prose pre::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2) !important;
}

/* Layout specific */
.HeaderContainer {
  position: relative;
  z-index: 10;
}

.PostContainer {
  position: relative;
  z-index: 10;
}

.prose {
  max-width: none;
}

.bg-pickled-bluewood-900 {
  margin-top: -20rem;
  position: relative;
}

.custom-prose blockquote {
  position: relative;
  margin: 1.5em 0 !important;
  padding: 1em 1em 1em 2em !important;
  border-left: 4px solid #89b4fa !important;
  background: rgba(137, 180, 250, 0.1) !important;
  border-radius: 0 0.5rem 0.5rem 0 !important;
  font-style: normal !important;
}

/* Remove default quote marks */
.custom-prose blockquote::before,
.custom-prose blockquote::after,
.custom-prose blockquote p::before,
.custom-prose blockquote p::after,
.custom-prose blockquote [data-v-fec8c867]::before,
.custom-prose blockquote [data-v-fec8c867]::after,
.custom-prose blockquote [data-v-9caa2399]::before,
.custom-prose blockquote [data-v-9caa2399]::after,
.custom-prose blockquote _moz_generated_content_before,
.custom-prose blockquote _moz_generated_content_after {
  content: none !important;
  display: none !important;
}

/* Style blockquote text */
.custom-prose blockquote p {
  margin: 0 !important;
  padding: 0 !important;
  color: rgba(255, 255, 255, 0.8) !important;
  font-size: 1.1em !important;
  line-height: 1.6 !important;
  font-style: italic !important;
}

/* Style nested elements */
.custom-prose blockquote * {
  color: rgba(255, 255, 255, 0.8) !important;
}

.custom-prose blockquote strong {
  color: rgba(255, 255, 255, 0.9) !important;
  font-weight: 600 !important;
}

/* Remove any unwanted generated content */
.custom-prose *::before,
.custom-prose *::after {
  display: none !important;
}

/* Additional specificity for Mozilla */
.custom-prose blockquote:-moz-any-link,
.custom-prose blockquote::-moz-any-link {
  quotes: none !important;
}

/* Force remove quotes */
.custom-prose blockquote {
  quotes: none !important;
}

/* Override any theme-specific styles */
.prose blockquote,
.dark\:prose-invert blockquote {
  quotes: none !important;
  font-style: normal !important;
}

/* Target specific Vue-generated attributes */
[data-v-fec8c867],
[data-v-9caa2399] {
  quotes: none !important;
}
</style>
