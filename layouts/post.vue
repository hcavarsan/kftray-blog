<script setup lang="ts">
import FormatDate from "~/components/common/FormatDate.vue";
import BlogComments from "~/components/blog/BlogComments.vue";

const { page } = useContent()
</script>

<template>
  <div class="relative">
    <LandingBanner badge-text="Release v0.14.9" text="A new version of kftray has been released."
      link="https://github.com/hcavarsan/kftray/releases/tag/v0.14.9" link-text="Check it out →" />
  </div>
  <div class="relative min-h-[91vh] overflow-hidden">
    <div class="relative HeaderContainer">
      <NuxtLink href="/blog"
        class="group inline-flex items-center gap-2 px-4 py-2 text-sm my-6 text-white/80 hover:text-white transition-all duration-300">
        <Icon name="heroicons-solid:arrow-left" />
        Back to overview
      </NuxtLink>
    </div>
    <div class="relative PostContainer">
      <header class="mb-16">
        <div class="max-w-3xl mx-auto">
          <p class="text-sm text-white/70 mb-4">
            Published on <FormatDate :date="new Date(page.timestamp * 1000)" />
          </p>
          <h1 class="text-3xl md:text-5xl font-light leading-tight mb-8 tracking-tight text-white">
            {{page.title}}
          </h1>
          <div class="flex items-center gap-4 border-t border-white/10 pt-6">
            <NuxtLink :href="page.avatarLink" target="_blank">
              <img class="w-12 h-12 rounded-full" :src="page.avatar" :alt="page.author">
            </NuxtLink>
            <div>
              <NuxtLink :href="page.avatarLink" target="_blank" class="hover:text-white/90">
                <span class="block font-normal text-white/80">{{page.author}}</span>
              </NuxtLink>
              <p class="text-sm text-white/70">{{page.position}}</p>
            </div>
          </div>
        </div>
      </header>
      <article class="prose dark:prose-invert lg:prose-lg max-w-3xl mx-auto pb-20 custom-prose">
        <slot />
        <BlogComments />
      </article>
    </div>
  </div>
</template>

<style>
/* Using higher specificity and !important where needed */
.custom-prose {
  color: rgba(255, 255, 255, 0.8) !important;
}

.custom-prose h1,
.custom-prose h2,
.custom-prose h3,
.custom-prose h4,
.custom-prose h5,
.custom-prose h6 {
  color: white !important;
  font-weight: 300 !important;
}

.custom-prose p {
  color: rgba(255, 255, 255, 0.8) !important;
  font-weight: 300 !important;
}

.custom-prose strong {
  color: white !important;
  font-weight: 400 !important;
}

.custom-prose a {
  color: #89b4fa !important;
  text-decoration: none !important;
  font-weight: 400 !important;
}

.custom-prose a:hover {
  color: #b4befe !important;
}

.custom-prose ul,
.custom-prose ol {
  color: rgba(255, 255, 255, 0.8) !important;
}

.custom-prose li {
  color: rgba(255, 255, 255, 0.8) !important;
  font-weight: 300 !important;
}

.custom-prose blockquote {
  color: rgba(255, 255, 255, 0.7) !important;
  border-left-color: #89b4fa !important;
  font-style: italic !important;
}

.custom-prose code::before,
.custom-prose code::after {
  content: "" !important;
}

.custom-prose :not(pre) > code {
  color: #89b4fa !important;
  background: rgba(255, 255, 255, 0.1) !important;
  padding: 2px 6px !important;
  border-radius: 4px !important;
  font-weight: 400 !important;
  font-size: 0.875em !important;
}

.custom-prose pre > code {
  background: transparent !important;
  padding: 0 !important;
  border-radius: 0 !important;
  color: rgba(255, 255, 255, 0.8) !important;
}

.custom-prose img {
  border-radius: 8px !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.custom-prose hr {
  border-color: rgba(255, 255, 255, 0.1) !important;
}

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

/* Code block styling */
.custom-prose pre {
  background: #1e1e2e !important; /* Catppuccin Mocha base */
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  padding: 1.25rem !important;
  border-radius: 8px !important;
  overflow-x: auto !important;
}

/* HCL specific syntax highlighting */
.custom-prose .language-hcl,
.custom-prose .language-terraform {
  color: #cdd6f4 !important; /* Catppuccin text */
}

.custom-prose .language-hcl .token.property,
.custom-prose .language-terraform .token.property {
  color: #89b4fa !important; /* Catppuccin blue */
}

.custom-prose .language-hcl .token.string,
.custom-prose .language-terraform .token.string {
  color: #a6e3a1 !important; /* Catppuccin green */
}

.custom-prose .language-hcl .token.number,
.custom-prose .language-terraform .token.number {
  color: #fab387 !important; /* Catppuccin peach */
}

.custom-prose .language-hcl .token.keyword,
.custom-prose .language-terraform .token.keyword {
  color: #f38ba8 !important; /* Catppuccin red */
}

.custom-prose .language-hcl .token.punctuation,
.custom-prose .language-terraform .token.punctuation {
  color: #6c7086 !important; /* Catppuccin overlay0 */
}

.custom-prose .language-hcl .token.comment,
.custom-prose .language-terraform .token.comment {
  color: #585b70 !important; /* Catppuccin surface2 */
  font-style: italic !important;
}

/* Add a subtle label for the language */
.custom-prose pre::before {
  content: attr(data-language);
  position: absolute !important;
  top: 0.5rem !important;
  right: 1rem !important;
  font-size: 0.75rem !important;
  color: rgba(255, 255, 255, 0.3) !important;
  font-family: ui-monospace, monospace !important;
}

/* Improve scrollbar for code blocks */
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

/* Folder Tree styling */
.custom-prose .language-tree,
.custom-prose .language-filesystem {
  color: #cdd6f4 !important; /* Base text color */
}

/* Tree structure characters */
.custom-prose .language-tree .token.tree-structure,
.custom-prose .language-filesystem .token.tree-structure {
  color: #6c7086 !important; /* Muted color for │ ├ └ ─ characters */
}

/* Directories */
.custom-prose .language-tree .token.directory,
.custom-prose .language-filesystem .token.directory {
  color: #89b4fa !important; /* Blue for directories */
  font-weight: 500 !important;
}

/* Files */
.custom-prose .language-tree .token.file,
.custom-prose .language-filesystem .token.file {
  color: #cdd6f4 !important; /* Normal text color for files */
}

/* Special files */
.custom-prose .language-tree .token.special-file,
.custom-prose .language-filesystem .token.special-file {
  color: #f9e2af !important; /* Yellow for special files like .git, package.json */
}

/* Hidden files */
.custom-prose .language-tree .token.hidden-file,
.custom-prose .language-filesystem .token.hidden-file {
  color: #7f849c !important; /* Slightly muted for hidden files */
}

/* Size annotations */
.custom-prose .language-tree .token.size,
.custom-prose .language-filesystem .token.size {
  color: #a6e3a1 !important; /* Green for size annotations */
}

/* Permissions and metadata */
.custom-prose .language-tree .token.meta,
.custom-prose .language-filesystem .token.meta {
  color: #f5c2e7 !important; /* Pink for metadata */
}

/* Make the tree structure monospace and preserve whitespace */
.custom-prose pre.language-tree,
.custom-prose pre.language-filesystem {
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Monaco, Consolas, monospace !important;
  white-space: pre !important;
  tab-size: 2 !important;
  background: #1e1e2e !important;
  padding: 1.25rem !important;
}

/* Tree structure styling */
.custom-prose pre[class*='language-tree'] {
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Monaco, Consolas, monospace !important;
  white-space: pre !important;
  tab-size: 2 !important;
  background: #1e1e2e !important;
  padding: 1.25rem !important;
}

.custom-prose .token.tree-structure {
  color: #6c7086 !important; /* Muted color for tree characters */
}

.custom-prose .token.directory {
  color: #89b4fa !important; /* Blue for directories */
  font-weight: 500 !important;
}

.custom-prose .token.file {
  color: #cdd6f4 !important; /* Normal text color for files */
}

.custom-prose .token.special-file {
  color: #f9e2af !important; /* Yellow for special files */
}

.custom-prose .token.size {
  color: #a6e3a1 !important; /* Green for size annotations */
}

.custom-prose .token.comment {
  color: #7f849c !important; /* Muted for comments */
  font-style: italic !important;
}
</style>
