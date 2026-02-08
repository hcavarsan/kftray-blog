<script setup lang="ts">
import GithubStars from '~/components/common/GithubStars.vue'
import SbomLink from '~/components/common/SbomLink.vue'

const { navigation } = useContent()
const { config } = useDocus()

const show = ref(false)

const filtered = computed(() => config.value.aside?.exclude || [])

interface NavItem {
	_path: string
	[key: string]: unknown
}

const links = computed(() => {
	return (navigation.value || []).filter((item: NavItem) => !filtered.value.includes(item._path))
})

const { close, open } = useMenu()

watch(show, (v) => {
	if (v) {
		open()
		document.body.style.overflow = 'hidden'
	} else {
		close()
		document.body.style.overflow = ''
	}
})

onBeforeUnmount(() => {
	document.body.style.overflow = ''
})
</script>

<template>
  <button
    aria-label="Menu"
    class="menu-trigger"
    @click="show = true"
  >
    <Icon
      name="heroicons-outline:menu"
      aria-hidden="true"
    />
  </button>

  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <teleport to="body">
    <transition name="dialog">
      <nav
        v-if="show"
        class="dialog"
        @click="show = false"
      >
        <div class="dialog-panel" @click.stop>
          <div class="dialog-header">
            <button
              aria-label="Close menu"
              class="close-btn"
              @click="show = false"
            >
              <Icon
                name="heroicons-outline:x"
                aria-hidden="true"
              />
            </button>
          </div>

          <div class="dialog-body">
            <DocsAsideTree :links="links" />
          </div>

          <div class="dialog-footer">
            <div class="footer-actions">
              <ThemeSelect />
              <SbomLink />
              <GithubStars />
            </div>
            <div class="footer-socials">
              <AppSocialIcons />
            </div>
          </div>
        </div>
      </nav>
    </transition>
  </teleport>
</template>

<style scoped>
.menu-trigger {
  position: relative;
  z-index: 10;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border-radius: 0.25rem;
  color: rgb(115, 115, 115);
  transition: all 0.2s ease;
}

@media (min-width: 1024px) {
  .menu-trigger {
    display: none;
  }
}

.menu-trigger:hover {
  background: rgba(0, 0, 0, 0.04);
  color: rgb(64, 64, 64);
}

.dialog {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: flex-start;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
}

@media (min-width: 1024px) {
  .dialog {
    display: none;
  }
}

.dialog-panel {
  max-width: 85vw;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  padding: 0 1rem;
  background-color: rgb(255, 255, 255);
}

@media (min-width: 640px) {
  .dialog-panel {
    max-width: 24rem;
    padding: 0 1.5rem;
  }
}

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.25s ease;
}

.dialog-enter-active .dialog-panel {
  transition: transform 0.25s ease-out;
}

.dialog-leave-active .dialog-panel {
  transition: transform 0.2s ease-in;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-from .dialog-panel,
.dialog-leave-to .dialog-panel {
  transform: translateX(-100%);
}

.dialog-header {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid transparent;
}

.close-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border-radius: 0.25rem;
  color: rgb(115, 115, 115);
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.04);
  color: rgb(64, 64, 64);
}

.dialog-body {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0;
}

.dialog-footer {
  border-top: 1px solid rgba(229, 231, 235, 0.8);
  padding: 0.75rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.footer-actions {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  flex-wrap: wrap;
}

.footer-actions :deep(button),
.footer-actions :deep(.theme-select) {
  height: 24px !important;
  min-height: 24px;
}

.footer-socials {
  display: flex;
  align-items: center;
}

.footer-socials :deep(a) {
  width: 24px;
  height: 24px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  color: rgb(115, 115, 115);
  transition: all 0.2s ease;
}

.footer-socials :deep(a:hover) {
  background: rgba(0, 0, 0, 0.04);
  color: rgb(64, 64, 64);
}

:deep(.icon) {
  width: 0.75rem;
  height: 0.75rem;
}
</style>

<style>
.dark .menu-trigger {
  color: rgb(163, 163, 163);
}

.dark .menu-trigger:hover {
  background: rgba(255, 255, 255, 0.06);
  color: rgb(229, 231, 235);
}

.dark .dialog {
  background-color: rgba(0, 0, 0, 0.5);
}

.dark .dialog-panel {
  background-color: rgb(10, 10, 10);
}

.dark .close-btn {
  color: rgb(163, 163, 163);
}

.dark .close-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  color: rgb(229, 231, 235);
}

.dark .dialog-footer {
  border-top-color: rgba(64, 64, 64, 0.4);
}

.dark .footer-socials a {
  color: rgb(163, 163, 163) !important;
}

.dark .footer-socials a:hover {
  background: rgba(255, 255, 255, 0.06) !important;
  color: rgb(229, 231, 235) !important;
}
</style>
