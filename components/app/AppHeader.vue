<script setup lang="ts">
import GithubStars from '~/components/common/GithubStars.vue'
import SbomLink from '~/components/common/SbomLink.vue'

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
        </div>

        <div class="section right">
          <AppDocSearch v-if="hasDocSearch" />
          <AppSearch
            v-else
            :fuse="config.fuse"
          />
          <div class="theme-select-wrapper">
            <ThemeSelect />
          </div>
          <SbomLink class="sbom-link" />
          <GithubStars class="github-stars" />
          <div class="social-icons">
            <AppSocialIcons />
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
  width: 0.875rem;
  height: 0.875rem;
  min-width: 0.875rem;
  min-height: 0.875rem;
}

header {
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  border-bottom: 1px solid rgba(229, 231, 235, 0.8);
  background-color: rgba(255, 255, 255, 0.85);
  height: 44px;
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  header {
    height: 48px;
  }
}

header .container {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 0.375rem;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  header .container {
    gap: 0.5rem;
    padding: 0 1.5rem;
  }
}

@media (min-width: 1024px) {
  header .container {
    padding: 0 2rem;
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
    grid-column: span 4 / span 4;
  }
}

header .section.center {
  grid-column: span 6 / span 6;
  justify-content: flex-start;
  overflow: hidden;
}

@media (min-width: 768px) {
  header .section.center {
    grid-column: span 4 / span 4;
    justify-content: center;
  }
}

header .section.right {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  grid-column: span 3 / span 3;
  justify-content: flex-end;
  flex: none;
}

@media (min-width: 768px) {
  header .section.right {
    grid-column: span 4 / span 4;
    gap: 0.375rem;
  }
}

header .section.right .social-icons {
  display: flex;
  align-items: center;
}

.theme-select-wrapper {
  display: flex;
  align-items: center;
}

.theme-select-wrapper :deep(button),
.theme-select-wrapper :deep(.theme-select) {
  width: 28px !important;
  height: 28px !important;
  min-width: 28px;
  min-height: 28px;
  padding: 0 !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  border: 1px solid rgba(229, 231, 235, 0.6);
  color: rgb(115, 115, 115);
  background: transparent;
  transition: all 0.2s ease;
}

.theme-select-wrapper :deep(button:hover) {
  background: rgba(0, 0, 0, 0.04);
  color: rgb(64, 64, 64);
}

.theme-select-wrapper :deep(button .icon),
.theme-select-wrapper :deep(button svg) {
  width: 0.875rem !important;
  height: 0.875rem !important;
}

.section.right :deep(.DocSearch-Button),
.section.right :deep([class*="search"]) {
  height: 28px !important;
  min-height: 28px;
  border-radius: 0.375rem;
  font-size: 0.75rem;
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
  border-radius: 0.375rem;
  color: rgb(115, 115, 115);
  transition: all 0.2s ease;
}

.social-icons :deep(a:hover),
.social-icons :deep(button:hover) {
  background: rgba(0, 0, 0, 0.04);
  color: rgb(64, 64, 64);
}

.social-icons :deep(.icon),
.social-icons :deep(svg) {
  width: 0.875rem !important;
  height: 0.875rem !important;
}

.section.left :deep(.navbar-logo img),
.section.center :deep(.navbar-logo img) {
  height: 24px;
  width: auto;
}

@media (max-width: 767px) {
  header .section.right .social-icons {
    display: none;
  }

  header .section.right .theme-select-wrapper {
    display: none;
  }

  header .section.right .sbom-link {
    display: none;
  }

  header .section.right .github-stars {
    display: none;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  header .section.right .social-icons {
    display: none;
  }

  header .section.right .sbom-link {
    display: none;
  }
}
</style>

<style>
.dark .app-header {
  border-bottom-color: rgba(24, 24, 24, 0.7);
  background-color: rgba(12, 12, 12, 0.96);
}

.dark .theme-select-wrapper button,
.dark .theme-select-wrapper .theme-select {
  border-color: rgba(64, 64, 64, 0.3) !important;
  color: rgb(163, 163, 163) !important;
}

.dark .theme-select-wrapper button:hover {
  background: rgba(255, 255, 255, 0.06) !important;
  color: rgb(229, 231, 235) !important;
}

.dark .social-icons a,
.dark .social-icons button {
  color: rgb(163, 163, 163) !important;
}

.dark .social-icons a:hover,
.dark .social-icons button:hover {
  background: rgba(255, 255, 255, 0.06) !important;
  color: rgb(229, 231, 235) !important;
}
</style>
