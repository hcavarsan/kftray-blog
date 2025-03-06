<template>
  <div class="download-manager">
    <!-- Detected System Section -->
    <div class="detected-os bg-white border border-pickled-bluewood-100 p-8 rounded-lg mb-12 dark:bg-pickled-bluewood-800 dark:border-pickled-bluewood-700">
      <div v-if="isLoading" class="flex items-center justify-center text-pickled-bluewood-500 dark:text-pickled-bluewood-300">
        <font-awesome-icon icon="fa-solid fa-circle-notch" class="animate-spin mr-2" />
        Loading latest version...
      </div>
      <div v-else-if="detectedSystem" class="flex flex-col md:flex-row items-center justify-center gap-4">
        <downloads-download-button
          :app="'kftray'"
          :os="detectedSystem.os"
          :arch="detectedSystem.arch"
          :version="latestVersion"
          highlighted
        />
        <downloads-download-button
          :app="'kftui'"
          :os="detectedSystem.os"
          :arch="detectedSystem.arch"
          :version="latestVersion"
          highlighted
        />
      </div>
      <div v-else class="text-center text-pickled-bluewood-500 dark:text-pickled-bluewood-300">
        <font-awesome-icon icon="fa-solid fa-circle-notch" class="animate-spin mr-2" />
        Detecting your system...
      </div>
    </div>

    <!-- Installation Methods -->
    <div class="installation-methods mb-12">

      <!-- Tabs -->
      <div class="mb-8">
        <div class="border-b border-pickled-bluewood-200 dark:border-pickled-bluewood-700">
          <nav class="flex justify-center space-x-12">
            <button
              @click="activeTab = 'kftray'"
              :class="[
                'py-3 px-6 font-medium border-b-2 transition-colors',
                activeTab === 'kftray'
                  ? 'border-kftray-green-600 text-kftray-green-700 dark:text-kftray-green-400 dark:border-kftray-green-500'
                  : 'border-transparent text-pickled-bluewood-500 dark:text-pickled-bluewood-400'
              ]"
            >
              kftray
            </button>
            <button
              @click="activeTab = 'kftui'"
              :class="[
                'py-3 px-6 font-medium border-b-2 transition-colors',
                activeTab === 'kftui'
                  ? 'border-kftray-green-600 text-kftray-green-700 dark:text-kftray-green-400 dark:border-kftray-green-500'
                  : 'border-transparent text-pickled-bluewood-500 dark:text-pickled-bluewood-400'
              ]"
            >
              kftui
            </button>
          </nav>
        </div>
      </div>

      <!-- Tab Content -->
      <div v-if="activeTab === 'kftray'" class="tab-content">

        <div class="flex flex-col space-y-6">
          <!-- macOS Homebrew -->
          <div class="install-option">
            <div class="os-header flex items-center justify-center bg-pickled-bluewood-50 dark:bg-pickled-bluewood-900 p-3 rounded-t-lg border-b border-pickled-bluewood-100 dark:border-pickled-bluewood-700">
              <h4 class="text-lg font-medium text-pickled-bluewood-800 dark:text-white">
                <font-awesome-icon icon="fa-brands fa-apple" class="mr-2" />
                macOS
              </h4>
            </div>

            <!-- Content section with side-by-side layout -->
            <div class="p-4 bg-white dark:bg-pickled-bluewood-800">
              <!-- Two-column Grid -->
              <div class="grid md:grid-cols-2 gap-6">
                <!-- Homebrew Column -->
                <div>
                  <div class="section-label mb-3 flex items-center">
                    <div class="w-full h-px bg-pickled-bluewood-100 dark:bg-pickled-bluewood-700"></div>
                    <div class="px-4 font-medium text-sm text-pickled-bluewood-500 dark:text-pickled-bluewood-300 whitespace-nowrap">Via Homebrew</div>
                    <div class="w-full h-px bg-pickled-bluewood-100 dark:bg-pickled-bluewood-700"></div>
                  </div>

                  <div class="code-block bg-pickled-bluewood-900 text-white p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <div>brew tap hcavarsan/kftray</div>
                    <div>brew install --cask kftray</div>
                  </div>
                </div>

                <!-- Direct Download Column -->
                <div>
                  <div class="section-label mb-3 flex items-center">
                    <div class="w-full h-px bg-pickled-bluewood-100 dark:bg-pickled-bluewood-700"></div>
                    <div class="px-4 font-medium text-sm text-pickled-bluewood-500 dark:text-pickled-bluewood-300 whitespace-nowrap">Direct Download</div>
                    <div class="w-full h-px bg-pickled-bluewood-100 dark:bg-pickled-bluewood-700"></div>
                  </div>

                  <div class="flex justify-center">
                    <downloads-download-button app="kftray" os="darwin" arch="amd64" :version="latestVersion" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Linux Homebrew -->
          <div class="install-option">
            <div class="os-header flex items-center justify-center bg-pickled-bluewood-50 dark:bg-pickled-bluewood-900 p-3 rounded-t-lg border-b border-pickled-bluewood-100 dark:border-pickled-bluewood-700">
              <h4 class="text-lg font-medium text-pickled-bluewood-800 dark:text-white">
                <font-awesome-icon icon="fa-brands fa-linux" class="mr-2" />
                Linux
              </h4>
            </div>

            <!-- Content section with side-by-side layout -->
            <div class="p-4 bg-white dark:bg-pickled-bluewood-800">
              <!-- Two-column Grid -->
              <div class="grid md:grid-cols-2 gap-6">
                <!-- Homebrew Column -->
                <div>
                  <div class="section-label mb-3 flex items-center">
                    <div class="w-full h-px bg-pickled-bluewood-100 dark:bg-pickled-bluewood-700"></div>
                    <div class="px-4 font-medium text-sm text-pickled-bluewood-500 dark:text-pickled-bluewood-300 whitespace-nowrap">Via Homebrew</div>
                    <div class="w-full h-px bg-pickled-bluewood-100 dark:bg-pickled-bluewood-700"></div>
                  </div>

                  <div class="code-block bg-pickled-bluewood-900 text-white p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <div>brew tap hcavarsan/kftray</div>
                    <div>brew install kftray-linux</div>
                  </div>
                </div>

                <!-- Direct Download Column -->
                <div>
                  <div class="section-label mb-3 flex items-center">
                    <div class="w-full h-px bg-pickled-bluewood-100 dark:bg-pickled-bluewood-700"></div>
                    <div class="px-4 font-medium text-sm text-pickled-bluewood-500 dark:text-pickled-bluewood-300 whitespace-nowrap">Direct Download</div>
                    <div class="w-full h-px bg-pickled-bluewood-100 dark:bg-pickled-bluewood-700"></div>
                  </div>

                  <div class="flex flex-col items-center space-y-4">
                    <downloads-download-button app="kftray" os="linux" arch="amd64" :version="latestVersion" appImage />
                    <downloads-download-button app="kftray" os="linux" arch="arm64" :version="latestVersion" appImage />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Windows -->
          <div class="install-option">
            <div class="os-header flex items-center justify-center bg-pickled-bluewood-50 dark:bg-pickled-bluewood-900 p-3 rounded-t-lg border-b border-pickled-bluewood-100 dark:border-pickled-bluewood-700">
              <h4 class="text-lg font-medium text-pickled-bluewood-800 dark:text-white">
                <font-awesome-icon icon="fa-brands fa-windows" class="mr-2" />
                Windows
              </h4>
            </div>

            <!-- Content section with centered layout -->
            <div class="p-4 bg-white dark:bg-pickled-bluewood-800">
              <div class="section-label mb-3 flex items-center">
                <div class="w-full h-px bg-pickled-bluewood-100 dark:bg-pickled-bluewood-700"></div>
                <div class="px-4 font-medium text-sm text-pickled-bluewood-500 dark:text-pickled-bluewood-300 whitespace-nowrap">Direct Download</div>
                <div class="w-full h-px bg-pickled-bluewood-100 dark:bg-pickled-bluewood-700"></div>
              </div>

              <div class="flex flex-col md:flex-row items-center justify-center gap-4">
                <downloads-download-button app="kftray" os="windows" arch="amd64" :version="latestVersion" />
                <downloads-download-button app="kftray" os="windows" arch="arm64" :version="latestVersion" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'kftui'" class="tab-content">


        <div class="flex flex-col space-y-6">
          <!-- macOS -->
          <div class="install-option">
            <div class="os-header flex items-center justify-center bg-pickled-bluewood-50 dark:bg-pickled-bluewood-900 p-3 rounded-t-lg border-b border-pickled-bluewood-100 dark:border-pickled-bluewood-700">
              <h4 class="text-lg font-medium text-pickled-bluewood-800 dark:text-white">
                <font-awesome-icon icon="fa-brands fa-apple" class="mr-2" />
                macOS
              </h4>
            </div>

            <!-- Content section with side-by-side layout -->
            <div class="p-4 bg-white dark:bg-pickled-bluewood-800">
              <!-- Two-column Grid -->
              <div class="grid md:grid-cols-2 gap-6">
                <!-- Script Installation Column -->
                <div>
                  <div class="section-label mb-3 flex items-center">
                    <div class="w-full h-px bg-pickled-bluewood-100 dark:bg-pickled-bluewood-700"></div>
                    <div class="px-4 font-medium text-sm text-pickled-bluewood-500 dark:text-pickled-bluewood-300 whitespace-nowrap">Script Installation</div>
                    <div class="w-full h-px bg-pickled-bluewood-100 dark:bg-pickled-bluewood-700"></div>
                  </div>

                  <div class="code-block bg-pickled-bluewood-900 text-white p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <div>bash &lt;(curl -s https://raw.githubusercontent.com/hcavarsan/kftray/main/hacks/kftui_installer.sh)</div>
                  </div>
                </div>

                <!-- Direct Download Column -->
                <div>
                  <div class="section-label mb-3 flex items-center">
                    <div class="w-full h-px bg-pickled-bluewood-100 dark:bg-pickled-bluewood-700"></div>
                    <div class="px-4 font-medium text-sm text-pickled-bluewood-500 dark:text-pickled-bluewood-300 whitespace-nowrap">Direct Download</div>
                    <div class="w-full h-px bg-pickled-bluewood-100 dark:bg-pickled-bluewood-700"></div>
                  </div>

                  <div class="flex justify-center">
                    <downloads-download-button app="kftui" os="darwin" arch="amd64" :version="latestVersion" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Linux -->
          <div class="install-option">
            <div class="os-header flex items-center justify-center bg-pickled-bluewood-50 dark:bg-pickled-bluewood-900 p-3 rounded-t-lg border-b border-pickled-bluewood-100 dark:border-pickled-bluewood-700">
              <h4 class="text-lg font-medium text-pickled-bluewood-800 dark:text-white">
                <font-awesome-icon icon="fa-brands fa-linux" class="mr-2" />
                Linux
              </h4>
            </div>

            <!-- Content section with side-by-side layout -->
            <div class="p-4 bg-white dark:bg-pickled-bluewood-800">
              <!-- Two-column Grid -->
              <div class="grid md:grid-cols-2 gap-6">
                <!-- Script Installation Column -->
                <div>
                  <div class="section-label mb-3 flex items-center">
                    <div class="w-full h-px bg-pickled-bluewood-100 dark:bg-pickled-bluewood-700"></div>
                    <div class="px-4 font-medium text-sm text-pickled-bluewood-500 dark:text-pickled-bluewood-300 whitespace-nowrap">Script Installation</div>
                    <div class="w-full h-px bg-pickled-bluewood-100 dark:bg-pickled-bluewood-700"></div>
                  </div>

                  <div class="code-block bg-pickled-bluewood-900 text-white p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <div>bash &lt;(curl -s https://raw.githubusercontent.com/hcavarsan/kftray/main/hacks/kftui_installer.sh)</div>
                    <div class="mt-2 text-xs text-gray-300">or using wget:</div>
                    <div class="mt-1">bash &lt;(wget -qO- https://raw.githubusercontent.com/hcavarsan/kftray/main/hacks/kftui_installer.sh)</div>
                  </div>
                </div>

                <!-- Direct Download Column -->
                <div>
                  <div class="section-label mb-3 flex items-center">
                    <div class="w-full h-px bg-pickled-bluewood-100 dark:bg-pickled-bluewood-700"></div>
                    <div class="px-4 font-medium text-sm text-pickled-bluewood-500 dark:text-pickled-bluewood-300 whitespace-nowrap">Direct Download</div>
                    <div class="w-full h-px bg-pickled-bluewood-100 dark:bg-pickled-bluewood-700"></div>
                  </div>

                  <div class="flex flex-col items-center space-y-4">
                    <downloads-download-button app="kftui" os="linux" arch="amd64" :version="latestVersion" />
                    <downloads-download-button app="kftui" os="linux" arch="arm64" :version="latestVersion" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Windows -->
          <div class="install-option">
            <div class="os-header flex items-center justify-center bg-pickled-bluewood-50 dark:bg-pickled-bluewood-900 p-3 rounded-t-lg border-b border-pickled-bluewood-100 dark:border-pickled-bluewood-700">
              <h4 class="text-lg font-medium text-pickled-bluewood-800 dark:text-white">
                <font-awesome-icon icon="fa-brands fa-windows" class="mr-2" />
                Windows
              </h4>
            </div>

            <!-- Content section with side-by-side layout -->
            <div class="p-4 bg-white dark:bg-pickled-bluewood-800">
              <!-- Two-column Grid -->
              <div class="grid md:grid-cols-2 gap-6">
                <!-- Script Installation Column -->
                <div>
                  <div class="section-label mb-3 flex items-center">
                    <div class="w-full h-px bg-pickled-bluewood-100 dark:bg-pickled-bluewood-700"></div>
                    <div class="px-4 font-medium text-sm text-pickled-bluewood-500 dark:text-pickled-bluewood-300 whitespace-nowrap">PowerShell Script</div>
                    <div class="w-full h-px bg-pickled-bluewood-100 dark:bg-pickled-bluewood-700"></div>
                  </div>

                  <div class="code-block bg-pickled-bluewood-900 text-white p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <div>Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/hcavarsan/kftray/main/hacks/kftui_installer.ps1'))</div>
                  </div>
                </div>

                <!-- Direct Download Column -->
                <div>
                  <div class="section-label mb-3 flex items-center">
                    <div class="w-full h-px bg-pickled-bluewood-100 dark:bg-pickled-bluewood-700"></div>
                    <div class="px-4 font-medium text-sm text-pickled-bluewood-500 dark:text-pickled-bluewood-300 whitespace-nowrap">Direct Download</div>
                    <div class="w-full h-px bg-pickled-bluewood-100 dark:bg-pickled-bluewood-700"></div>
                  </div>

                  <div class="flex flex-col items-center space-y-4">
                    <downloads-download-button app="kftui" os="windows" arch="amd64" :version="latestVersion" />
                    <downloads-download-button app="kftui" os="windows" arch="386" :version="latestVersion" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Verification -->
          <div class="install-option mt-6">
            <div class="os-header flex items-center justify-center bg-pickled-bluewood-50 dark:bg-pickled-bluewood-900 p-3 rounded-t-lg border-b border-pickled-bluewood-100 dark:border-pickled-bluewood-700">
              <h4 class="text-lg font-medium text-pickled-bluewood-800 dark:text-white">
                Post-Installation
              </h4>
            </div>

            <div class="p-4 bg-white dark:bg-pickled-bluewood-800">
              <p class="mb-3 text-pickled-bluewood-600 dark:text-pickled-bluewood-300">After installation, restart your terminal and verify the installation:</p>
              <div class="code-block bg-pickled-bluewood-900 text-white p-3 rounded-md font-mono text-sm overflow-x-auto">
                <div>kftui</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- All Releases Section -->
    <div class="mt-16 bg-white p-8 rounded-lg border border-pickled-bluewood-100 dark:bg-pickled-bluewood-800 dark:border-pickled-bluewood-700 text-center">
      <h3 class="text-xl font-bold mb-4 text-pickled-bluewood-700 dark:text-white">
        <font-awesome-icon icon="fa-brands fa-github" class="mr-2" />
        All Releases
      </h3>
      <p class="mb-6 text-pickled-bluewood-600 dark:text-pickled-bluewood-300 max-w-xl mx-auto">
        View all releases, release notes, and additional download options on the GitHub releases page.
      </p>
      <a
        href="https://github.com/hcavarsan/kftray/releases"
        target="_blank"
        class="inline-flex items-center gap-2 px-5 py-2 bg-pickled-bluewood-700 text-white rounded-md font-medium dark:bg-pickled-bluewood-600"
      >
        <font-awesome-icon icon="fa-solid fa-external-link-alt" />
        Visit GitHub Releases
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSystemDetection } from '~/composables/useSystemDetection'
import { useLatestRelease } from '~/composables/useLatestRelease'

const { detectedSystem } = useSystemDetection()
const { latestVersion, isLoading } = useLatestRelease()

// Tab system for installation options
const activeTab = ref('kftray')
</script>

<style scoped>
.download-manager {
  @apply rounded-lg max-w-4xl mx-auto;
}

/* Detected OS section */
.detected-os {
  @apply rounded-lg shadow-sm;
}

/* Code block styling */
.code-block {
  @apply bg-pickled-bluewood-900 text-white p-3 rounded-md font-mono text-sm;
}

/* Installation options */
.install-option {
  @apply overflow-hidden rounded-lg shadow-sm border border-pickled-bluewood-100 dark:border-pickled-bluewood-700;
}

.os-header {
  @apply bg-pickled-bluewood-50 dark:bg-pickled-bluewood-900;
}

/* Section labels with lines */
.section-label {
  @apply flex items-center;
}

/* Tabs */
.tab-content {
  @apply transition-opacity duration-300;
}

/* Dark mode styles */
.dark .code-block {
  @apply bg-pickled-bluewood-800 border border-pickled-bluewood-700;
}
</style>
