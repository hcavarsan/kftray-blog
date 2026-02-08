const GITHUB_REPO = 'hcavarsan/kftray'

export async function getGithubStars(): Promise<number | null> {
	try {
		const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
			next: { revalidate: 3600 },
		})
		if (!res.ok) return null
		const data = await res.json()
		return data.stargazers_count ?? null
	} catch {
		return null
	}
}

export async function getLatestVersion(): Promise<string> {
	try {
		const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`, {
			next: { revalidate: 3600 },
		})
		if (!res.ok) return '0.16.1'
		const data = await res.json()
		if (data?.tag_name) {
			return data.tag_name.replace(/^v/, '')
		}
		return '0.16.1'
	} catch {
		return '0.16.1'
	}
}
