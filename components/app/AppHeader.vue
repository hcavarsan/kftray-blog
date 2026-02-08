<script setup lang="ts">
import GithubStars from '~/components/common/GithubStars.vue'
import SbomLink from '~/components/common/SbomLink.vue'
import ThemeToggle from '~/components/common/ThemeToggle.vue'

const { config } = useDocus()
const { navigation } = useContent()
const { hasDocSearch } = useDocSearch()

const hasDialog = computed(() => navigation.value?.length > 1 || navigation.value?.[0]?.children?.length)

// Fallback release info
const fallbackRelease = {
	badgeText: 'Release v0.21.0',
	text: 'A new version of kftray has been released.',
	link: 'https://github.com/hcavarsan/kftray/releases/tag/v0.21.0',
	linkText: 'Check it out →',
}

const latestRelease = ref(null)
const isLoading = ref(true)

const currentBanner = computed(() => {
	if (isLoading.value || !latestRelease.value) {
		return fallbackRelease
	}

	return {
		badgeText: `Release ${latestRelease.value.tag_name}`,
		text: `${latestRelease.value.name || 'A new version of kftray'} has been released.`,
		link: latestRelease.value.html_url,
		linkText: 'Check it out →',
	}
})

// Fetch latest release on mount
onMounted(async () => {
	try {
		const response = await fetch('https://api.github.com/repos/hcavarsan/kftray/releases/latest')
		if (response.ok) {
			const release = await response.json()
			latestRelease.value = release
		}
	} catch {
		// Silently fall back to hardcoded release
	} finally {
		isLoading.value = false
	}
})

defineProps({
	...variants,
})
</script>

<template>
  <div>

    <header class="app-header" :class="{ 'has-dialog': hasDialog }">
      <Container :fluid="config?.header?.fluid">
        <div class="section left">
          <AppHeaderDialog v-if="hasDialog" />
          <AppHeaderLogo />
        </div>

        <div class="section center">
          <AppHeaderLogo v-if="hasDialog" />
          <AppHeaderNavigation />
          <SbomLink class="sbom-link" />
        </div>

        <div class="section right">
          <div class="right-toolbar">
            <AppDocSearch v-if="hasDocSearch" />
            <AppSearch
              v-else
              :fuse="config.fuse"
            />
            <span class="toolbar-divider" />
            <GithubStars class="github-stars" />
            <div class="social-icons">
              <AppSocialIcons />
            </div>
            <span class="toolbar-divider" />
            <ThemeToggle class="theme-toggle-desktop" />
          </div>
        </div>
      </Container>

    </header>
	<LandingBanner
      v-if="currentBanner"
      :badge-text="currentBanner.badgeText"
      :text="currentBanner.text"
      :link="currentBanner.link"
      :link-text="currentBanner.linkText"
    />
  </div>
</template>

<style scoped>
.section.left :deep(.navbar-logo) {
  display: block;
}

.section.center :deep(.navbar-logo) {
  display: none;
}

:deep(.icon) {
  width: 0.75rem;
  height: 0.75rem;
  min-width: 0.75rem;
  min-height: 0.75rem;
}

header {
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.85);
  height: 48px;
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  header {
    height: 52px;
  }
}

header .container {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 0.5rem;
  padding: 0 1rem;
  align-items: center;
}

@media (min-width: 768px) {
  header .container {
    gap: 0.75rem;
    padding: 0 1.5rem;
  }
}

@media (min-width: 1024px) {
  header .container {
    padding: 0 2.5rem;
  }
}

header .section {
  display: flex;
  align-items: center;
  flex: none;
  min-width: 0;
  min-height: 0;
}

header .section.left {
  grid-column: span 3 / span 3;
}

@media (min-width: 768px) {
  header .section.left {
    grid-column: span 3 / span 3;
  }
}

header .section.center {
  grid-column: span 6 / span 6;
  justify-content: center;
  overflow: hidden;
}

@media (min-width: 768px) {
  header .section.center {
    grid-column: span 5 / span 5;
    justify-content: center;
  }
}

header .section.right {
  display: flex;
  align-items: center;
  gap: 0;
  grid-column: span 3 / span 3;
  justify-content: flex-end;
  flex: none;
}

@media (min-width: 768px) {
  header .section.right {
    grid-column: span 4 / span 4;
    gap: 0;
  }
}

.right-toolbar {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 0.625rem;
  padding: 3px 4px;
  height: 34px;
}

.toolbar-divider {
  width: 1px;
  height: 16px;
  background: rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
  margin: 0 2px;
}

header .section.right .social-icons {
  display: flex;
  align-items: center;
  gap: 2px;
}

.theme-toggle-desktop {
  display: flex;
  align-items: center;
}

.section.right :deep(.DocSearch-Button),
.section.right :deep([class*="search"]) {
  height: 28px !important;
  min-height: 28px;
  border-radius: 0.4375rem;
  font-size: 0.75rem;
}

.section.right :deep(button[aria-label="Search"]) {
  padding: 0 !important;
}

.section.right :deep(.content) {
  border: none !important;
  border-radius: 0.4375rem !important;
  padding: 0.25rem 0.625rem !important;
  gap: 0.25rem !important;
  font-size: 0.6875rem !important;
  height: 28px;
  display: inline-flex !important;
  align-items: center !important;
  background: transparent;
}

.section.right :deep(.content:hover) {
  background: rgba(0, 0, 0, 0.04);
}

.section.right :deep(.content > .icon:first-child) {
  display: none !important;
}

.section.right :deep(.content > span:nth-child(2)) {
  display: none !important;
}

.section.right :deep(.content > span:nth-child(3)) {
  display: flex !important;
  align-items: center;
  gap: 0.1875rem;
}

.section.right :deep(.content kbd) {
  font-size: 0.6875rem;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace;
  padding: 0;
  border: none;
  background: none;
  color: rgb(100, 100, 100);
  line-height: 1;
  font-weight: 500;
}

.social-icons :deep(a),
.social-icons :deep(button) {
  width: 28px !important;
  height: 28px !important;
  min-width: 28px;
  min-height: 28px;
  padding: 0 !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.4375rem;
  color: rgb(100, 100, 100);
  transition: all 0.2s ease;
}

.social-icons :deep(a:hover),
.social-icons :deep(button:hover) {
  background: rgba(0, 0, 0, 0.04);
  color: rgb(50, 50, 50);
}

.social-icons :deep(.icon),
.social-icons :deep(svg) {
  width: 0.875rem !important;
  height: 0.875rem !important;
}

.section.left :deep(.navbar-logo img),
.section.center :deep(.navbar-logo img) {
  height: 32px;
  width: auto;
}

@media (max-width: 767px) {
  header .section.right .social-icons {
    display: none;
  }

  header .section.right .theme-toggle-desktop {
    display: none;
  }

  header .section.right .github-stars {
    display: none;
  }

  .toolbar-divider {
    display: none;
  }

  .right-toolbar {
    background: transparent;
    padding: 0;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  header .section.right .social-icons {
    display: none;
  }
}

.section.center .sbom-link {
  display: none;
}

@media (min-width: 1024px) {
  .section.center .sbom-link {
    display: inline-flex;
  }
}
</style>

<style>
.dark .app-header {
  background-color: rgba(12, 12, 12, 0.96);
}

.dark .right-toolbar {
  background: rgba(255, 255, 255, 0.04);
}

.dark .toolbar-divider {
  background: rgba(255, 255, 255, 0.06);
}

.dark .section.right .content {
  background: transparent !important;
  border: none !important;
}

.dark .section.right .content:hover {
  background: rgba(255, 255, 255, 0.06) !important;
}

.dark .section.right .content kbd {
  color: rgb(180, 180, 180);
}

.dark .social-icons a,
.dark .social-icons button {
  color: rgb(180, 180, 180) !important;
}

.dark .social-icons a:hover,
.dark .social-icons button:hover {
  background: rgba(255, 255, 255, 0.06) !important;
  color: rgb(240, 240, 240) !important;
}
</style>
