<script setup lang="ts">
const route = useRoute()
const { navBottomLink } = useContentHelpers()
const { navigation } = useContent()
const { config } = useDocus()

const hasNavigation = computed(() => !!config.value.aside?.level)
const filtered = computed(() => config.value.header?.exclude || [])

interface NavItem {
	_path: string
	exact?: boolean
	title?: string
	icon?: string
	redirect?: string
	children?: unknown[]
}

const tree = computed(() => {
	return (navigation.value || []).filter((item: NavItem) => {
		if (filtered.value.includes(item._path as never)) {
			return false
		}
		return true
	})
})

const isActive = (link: NavItem) => (link.exact ? route.fullPath === link._path : route.fullPath.startsWith(link._path))
</script>

<template>
  <nav v-if="hasNavigation" class="app-nav">
    <ul>
      <li v-for="link in tree" :key="link._path">
        <NuxtLink class="link" :to="link.redirect ? link.redirect : navBottomLink(link)" :class="{ active: isActive(link) }">
          <Icon v-if="link.icon" :name="link.icon" class="icon" />
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  display: none;
}

@media (min-width: 1024px) {
  nav {
    display: block;
  }
}

nav ul {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  gap: 0.125rem;
}

nav ul li {
  display: inline-flex;
}

nav .link {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  height: 28px;
  padding: 0 0.625rem;
  font-size: 0.75rem;
  font-weight: 400;
  color: rgb(115, 115, 115);
  border-radius: 0.25rem;
  outline: none;
  transition: all 200ms ease;
  text-decoration: none;
  line-height: 1;
}

nav .link .icon,
nav .link .fa-icon {
  display: inline-block;
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
}

nav .link:active,
nav .link.active,
nav .link:hover {
  background-color: rgba(0, 0, 0, 0.04);
  color: rgb(64, 64, 64);
}

nav .link.active {
  font-weight: 500;
  color: rgb(64, 64, 64);
}
</style>

<style>
.dark .app-nav .link {
  color: rgb(163, 163, 163);
}

.dark .app-nav .link:active,
.dark .app-nav .link.active,
.dark .app-nav .link:hover {
  background-color: rgba(255, 255, 255, 0.06);
  color: rgb(229, 231, 235);
}

.dark .app-nav .link.active {
  color: rgb(229, 231, 235);
}
</style>