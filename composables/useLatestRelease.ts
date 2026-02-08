import { onMounted, ref } from 'vue'

export function useLatestRelease() {
	const latestVersion = ref('0.16.1') // Default fallback version
	const isLoading = ref(false)
	const error = ref(null)

	const fetchLatestVersion = async () => {
		if (process.server) return

		isLoading.value = true
		error.value = null

		try {
			const response = await fetch('https://api.github.com/repos/hcavarsan/kftray/releases/latest')

			if (!response.ok) {
				throw new Error(`Failed to fetch latest release: ${response.status}`)
			}

			const data = await response.json()

			if (data?.tag_name) {
				// Remove 'v' prefix if present
				latestVersion.value = data.tag_name.replace(/^v/, '')
			}
		} catch {
			// Silently use fallback version
		} finally {
			isLoading.value = false
		}
	}

	onMounted(() => {
		fetchLatestVersion()
	})

	return {
		latestVersion,
		isLoading,
		error,
		fetchLatestVersion,
	}
}
