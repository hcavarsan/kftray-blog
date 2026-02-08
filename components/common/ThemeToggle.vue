<script setup lang="ts">
const colorMode = useColorMode()

const modes = ['light', 'system', 'dark'] as const

const activeIndex = computed(() => {
	const pref = colorMode.preference
	if (pref === 'light') return 0
	if (pref === 'dark') return 2
	return 1
})

function setMode(mode: string) {
	colorMode.preference = mode
}
</script>

<template>
  <div
    class="theme-toggle"
    role="radiogroup"
    aria-label="Color theme"
  >
    <div class="toggle-track">
      <div
        class="toggle-indicator"
        :style="{ transform: `translateX(${activeIndex * 28}px)` }"
      />
      <button
        v-for="(mode, i) in modes"
        :key="mode"
        :aria-label="`${mode} theme`"
        :aria-checked="activeIndex === i"
        role="radio"
        class="toggle-segment"
        :class="{ active: activeIndex === i }"
        @click="setMode(mode)"
      >
        <Icon
          v-if="mode === 'light'"
          name="uil:sun"
          class="toggle-icon"
        />
        <Icon
          v-else-if="mode === 'system'"
          name="uil:desktop"
          class="toggle-icon"
        />
        <Icon
          v-else
          name="uil:moon"
          class="toggle-icon"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
}

.toggle-track {
  position: relative;
  display: flex;
  align-items: center;
  width: 84px;
  height: 28px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 9999px;
  padding: 0;
}

.toggle-indicator {
  position: absolute;
  left: 1px;
  width: 26px;
  height: 26px;
  background: white;
  border-radius: 9999px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 1;
}

.toggle-segment {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: rgb(163, 163, 163);
  transition: color 0.2s ease;
}

.toggle-segment.active {
  color: rgb(64, 64, 64);
}

.toggle-segment:focus-visible {
  outline: 2px solid rgb(59, 130, 246);
  outline-offset: -2px;
  border-radius: 9999px;
}

.toggle-icon {
  width: 0.875rem !important;
  height: 0.875rem !important;
  min-width: 0.875rem;
  min-height: 0.875rem;
}
</style>

<style>
.dark .toggle-track {
  background: rgba(255, 255, 255, 0.06);
}

.dark .toggle-indicator {
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.dark .toggle-segment {
  color: rgb(115, 115, 115);
}

.dark .toggle-segment.active {
  color: rgb(229, 231, 235);
}
</style>
