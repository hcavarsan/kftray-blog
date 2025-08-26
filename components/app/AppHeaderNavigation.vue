<script setup lang="ts">
const route = useRoute()
const { navBottomLink } = useContentHelpers()
const { navigation } = useContent()
const { config } = useDocus()

const hasNavigation = computed(() => !!config.value.aside?.level)
const filtered = computed(() => config.value.header?.exclude || [])

const tree = computed(() => {
  return (navigation.value || []).filter((item: any) => {
    if (filtered.value.includes(item._path as never)) { return false }
    return true
  })
})

const isActive = (link: any) => (link.exact ? route.fullPath === link._path : route.fullPath.startsWith(link._path))
</script>

<template>
  <nav v-if="hasNavigation">
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
}

nav ul > * + * {
  margin-left: 0.5rem;
}

nav ul li {
  display: inline-flex;
  gap: 0.25rem;
}

nav .link {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 400;
  color: rgb(156, 163, 175);
  border-radius: 0.3125rem;
  outline: none;
  transition: all 200ms ease;
  text-decoration: none;
}

@media (min-width: 768px) {
  nav .link {
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 0.8125rem;
  }
}

nav .link .icon,
nav .link .fa-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 5px;
}

nav .link:active,
nav .link.active,
nav .link:hover {
  background-color: rgba(249, 250, 251, 0.8);
  color: rgb(107, 114, 128);
}

@media (prefers-color-scheme: dark) {
  nav .link {
    color: rgb(163, 163, 163);
  }
  
  nav .link:active,
  nav .link.active,
  nav .link:hover {
    background-color: rgba(48, 48, 48, 0.6);
    color: rgb(209, 213, 219);
  }
}

:global(.dark) nav .link {
  color: rgb(163, 163, 163);
}

:global(.dark) nav .link:active,
:global(.dark) nav .link.active,
:global(.dark) nav .link:hover {
  background-color: rgba(48, 48, 48, 0.6);
  color: rgb(209, 213, 219);
}

nav .link.active {
  box-shadow: inset 0 1px 3px 0 rgb(0 0 0 / 0.1);
  font-weight: 500;
  color: rgb(75, 85, 99);
}

@media (prefers-color-scheme: dark) {
  nav .link.active {
    color: rgb(229, 231, 235);
  }
}

:global(.dark) nav .link.active {
  color: rgb(229, 231, 235);
}
</style>