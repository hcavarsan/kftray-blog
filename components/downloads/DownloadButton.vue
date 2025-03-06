<template>
  <div :class="['download-button mb-2', { 'highlighted': highlighted }]">
    <a 
      :href="downloadUrl" 
      class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors min-w-[220px] h-10"
      :class="highlighted 
        ? 'bg-kftray-green-700 text-white hover:bg-kftray-green-800 dark:bg-kftray-green-800 dark:hover:bg-kftray-green-900' 
        : 'bg-pickled-bluewood-100 text-pickled-bluewood-800 hover:bg-pickled-bluewood-200 dark:bg-pickled-bluewood-700 dark:hover:bg-pickled-bluewood-600 dark:text-white'"
      target="_blank"
    >
      <font-awesome-icon icon="fa-solid fa-download" class="w-4" />
      <span class="truncate">{{ buttonText }}</span>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  app: {
    type: String,
    required: true,
    validator: (value) => ['kftray', 'kftui'].includes(value)
  },
  os: {
    type: String,
    required: true,
    validator: (value) => ['darwin', 'linux', 'windows', 'unknown'].includes(value)
  },
  arch: {
    type: String,
    required: true,
    validator: (value) => ['amd64', 'arm64'].includes(value)
  },
  version: {
    type: String,
    required: true
  },
  highlighted: {
    type: Boolean,
    default: false
  },
  appImage: {
    type: Boolean,
    default: false
  }
})

const osDisplayNames = {
  darwin: 'macOS',
  linux: 'Linux',
  windows: 'Windows',
  unknown: 'Unknown OS'
}

const archDisplayNames = {
  amd64: 'x64',
  arm64: 'ARM64'
}

const fileName = computed(() => {
  // Handle kftray
  if (props.app === 'kftray') {
    if (props.os === 'darwin') {
      return `kftray_${props.version.replace('v', '')}_universal.dmg` // macOS universal binary
    } else if (props.os === 'linux') {
      if (props.appImage) {
        // AppImage format
        return `kftray_${props.version.replace('v', '')}_${props.arch === 'amd64' ? 'amd64' : 'aarch64'}.AppImage`
      } else {
        // Tarball format for Linux
        return `kftray_${props.version.replace('v', '')}_${props.arch === 'amd64' ? 'amd64' : 'aarch64'}.AppImage.tar.gz`
      }
    } else if (props.os === 'windows') {
      // Windows installer
      return `kftray_${props.version.replace('v', '')}_${props.arch === 'amd64' ? 'x64' : 'arm64'}-setup.exe`
    }
  } 
  // Handle kftui
  else if (props.app === 'kftui') {
    if (props.os === 'darwin') {
      return 'kftui_macos_universal'
    } else if (props.os === 'linux') {
      return `kftui_linux_${props.arch === 'amd64' ? 'amd64' : 'arm64'}`
    } else if (props.os === 'windows') {
      return `kftui_windows_${props.arch === 'amd64' ? 'x86_64' : 'x86'}.exe`
    }
  }
  
  // Default fallback (should never reach here with proper validation)
  return `${props.app}_${props.version.replace('v', '')}_unknown`
})

const downloadUrl = computed(() => {
  return `https://github.com/hcavarsan/kftray/releases/download/v${props.version.replace('v', '')}/${fileName.value}`
})

const buttonText = computed(() => {
  // For highlighted system-specific downloads
  if (props.highlighted) {
    return `Download ${props.app} for ${osDisplayNames[props.os]} (${archDisplayNames[props.arch]})`
  }
  
  // Different text for different file types
  if (props.app === 'kftray') {
    if (props.os === 'darwin') {
      return `${props.app} for macOS (Universal)`
    } else if (props.os === 'linux') {
      if (props.appImage) {
        return `${props.app} AppImage (${archDisplayNames[props.arch]})`
      } else {
        return `${props.app} tarball (${archDisplayNames[props.arch]})`
      }
    } else if (props.os === 'windows') {
      return `${props.app} for Windows (${archDisplayNames[props.arch]})`
    }
  } else if (props.app === 'kftui') {
    if (props.os === 'darwin') {
      return `${props.app} for macOS (Universal)`
    } else if (props.os === 'linux') {
      return `${props.app} for Linux (${archDisplayNames[props.arch]})`
    } else if (props.os === 'windows') {
      return `${props.app} for Windows (${archDisplayNames[props.arch]})`
    }
  }
  
  // Default fallback
  return `${props.app} for ${osDisplayNames[props.os]} (${archDisplayNames[props.arch]})`
})
</script>

<style scoped>
/* Simplified style without hover effects */
</style>