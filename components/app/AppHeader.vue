<script setup lang="ts">
import GithubStars from '~/components/common/GithubStars.vue'
const { config } = useDocus()
const { navigation } = useContent()
const { hasDocSearch } = useDocSearch()

const hasDialog = computed(() => navigation.value?.length > 1 || navigation.value?.[0]?.children?.length)

const currentBanner = computed(() => {
  const now = Date.now()
  return {
    badgeText: "Release v0.16.1",
    text: "A new version of kftray has been released.",
    link: "https://github.com/hcavarsan/kftray/releases/tag/v0.16.1",
    linkText: "Check it out →"
  }
})

defineProps({
  ...variants
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
          <ThemeSelect />
          <AppDocSearch v-if="hasDocSearch" />
          <AppSearch
            v-else
            :fuse="config.fuse"
          />
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

<style scoped lang="ts">
css({
  ':deep(.icon)': {
    width: '{space.4}',
    height: '{space.4}'
  },

  '.navbar-logo': {
    '.left &': {
      '.has-dialog &': {
        display: 'none',
        '@lg': {
          display: 'block'
        }
      },
    },
    '.center &': {
      display: 'block',
      '@lg': {
        display: 'none'
      }
    }
  },

  header: {
    backdropFilter: '{elements.backdrop.filter}',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    width: '100%',
    borderBottom: '1px solid {elements.border.primary.static}',
    backgroundColor: '{elements.backdrop.background}',
    height: '{docus.header.height}',

    '.container': {
      display: 'grid',
      height: '100%',
      gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
      gap: '{space.2}'
    },
    
    '.section': {
      display: 'flex',
      alignItems: 'center',
      flex: 'none',
      '&.left': {
        gridColumn: 'span 4 / span 4',
        '@lg': {
          marginLeft: 0
        },
      },
      '&.center': {
        gridColumn: 'span 4 / span 4',
        justifyContent: 'center',
        flex: '1',
        zIndex: '1'
      },
      '&.right': {
        display: 'flex',
        alignItems: 'center',
        gap: '{space.1}',
        gridColumn: 'span 4 / span 4',
        justifyContent: 'flex-end',
        flex: 'none',
        marginRight: 'calc(0px - {space.4})',
        '.social-icons': {
          display: 'none',
          '@md': {
            display: 'flex',
            alignItems: 'center',
          }
        },
        '.github-stars': {
          order: -1,
          '@md': {
            order: 0
          }
        }
      }
    }
  }
})
</style>
