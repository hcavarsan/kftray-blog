'use client'

import { useEffect, useState } from 'react'

interface DetectedSystem {
	os: 'darwin' | 'linux' | 'windows' | 'unknown'
	arch: 'amd64' | 'arm64'
}

interface UseSystemDetectionResult {
	detectedSystem: DetectedSystem | null
}

export function useSystemDetection(): UseSystemDetectionResult {
	const [detectedSystem, setDetectedSystem] = useState<DetectedSystem | null>(null)

	useEffect(() => {
		const userAgent = navigator.userAgent.toLowerCase()
		let os: DetectedSystem['os'] = 'unknown'
		let arch: DetectedSystem['arch'] = 'amd64'

		if (userAgent.includes('win')) {
			os = 'windows'
		} else if (userAgent.includes('mac')) {
			os = 'darwin'
		} else if (userAgent.includes('linux')) {
			os = 'linux'
		}

		if (userAgent.includes('arm') || userAgent.includes('aarch64')) {
			arch = 'arm64'
		}

		if (os === 'darwin') {
			// Apple Silicon Macs report as 'MacIntel' but have maxTouchPoints > 0.
			// This is the most reliable client-side heuristic available.
			if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 0) {
				arch = 'arm64'
			}
		}

		setDetectedSystem({ os, arch })
	}, [])

	return { detectedSystem }
}
