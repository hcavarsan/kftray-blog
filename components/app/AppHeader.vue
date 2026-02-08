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

    <header :class="{ 'has-dialog': hasDialog }">
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
          <div class="theme-select-wrapper">
            <ThemeSelect />
          </div>
          <AppDocSearch v-if="hasDocSearch" />
          <AppSearch
            v-else
            :fuse="config.fuse"
          />
          <SbomLink class="sbom-link" />
          <GithubStars class="github-stars" />
          <div class="social-icons">
            <AppSocialIcons />
          </div>
        </div>
		<div class="banner-container"></div>

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
/* Logo visibility logic */
.section.left :deep(.navbar-logo) {
  display: block;
}

.has-dialog .section.left :deep(.navbar-logo) {
  display: block;
}

@media (min-width: 1024px) {
  .has-dialog .section.left :deep(.navbar-logo) {
    display: block;
  }
}

.section.center :deep(.navbar-logo) {
  display: none;
}

@media (min-width: 1024px) {
  .section.center :deep(.navbar-logo) {
    display: none;
  }
}

:deep(.icon) {
  width: 1.25rem;
  height: 1.25rem;
  min-width: 1.25rem;
  min-height: 1.25rem;
}

@media (max-width: 767px) {
  :deep(.icon) {
    width: 1.5rem;
    height: 1.5rem;
    min-width: 1.5rem;
    min-height: 1.5rem;
  }
}

header {
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  border-bottom: 1px solid rgba(229, 231, 235, 0.8);
  background-color: rgba(255, 255, 255, 0.85);
  height: 56px;
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  header {
    height: 60px;
  }
}

@media (prefers-color-scheme: dark) {
  header {
    border-bottom-color: rgba(24, 24, 24, 0.7);
    background-color: rgba(12, 12, 12, 0.96);
  }
}

:global(.dark) header {
  border-bottom-color: rgba(24, 24, 24, 0.7);
  background-color: rgba(12, 12, 12, 0.96);
}

header .container {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 0.5rem;
  padding: 0.5rem 0;
}

@media (min-width: 768px) {
  header .container {
    gap: 0.75rem;
    padding: 0.5rem 0;
  }
}

header .section {
  display: flex;
  align-items: center;
  flex: none;
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

@media (min-width: 1024px) {
  header .section.left {
    margin-left: 0;
  }
}

header .section.center {
  grid-column: span 6 / span 6;
  justify-content: flex-start;
  flex: 1;
  z-index: 1;
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
  gap: 0.5rem;
  grid-column: span 3 / span 3;
  justify-content: flex-end;
  flex: none;
  margin-right: calc(0px - 0.5rem);
}

@media (min-width: 768px) {
  header .section.right {
    grid-column: span 4 / span 4;
  }
}

@media (min-width: 768px) {
  header .section.right {
    gap: 0.75rem;
    margin-right: calc(0px - 1rem);
  }
}

header .section.right .social-icons {
  display: flex;
  align-items: center;
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

header .section.right .sbom-link {
  order: -2;
}

header .section.right .github-stars {
  order: -1;
}

@media (min-width: 768px) {
  header .section.right .sbom-link {
    order: 0;
  }

  header .section.right .github-stars {
    order: 0;
  }
}
</style>
