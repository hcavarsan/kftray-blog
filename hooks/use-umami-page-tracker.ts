'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

declare global {
	interface Window {
		umami?: {
			track: {
				(): void
				(event: string, data?: Record<string, string | number>): void
				(callback: (props: Record<string, unknown>) => Record<string, unknown>): void
			}
		}
	}
}

export function useUmamiPageTracker() {
	const pathname = usePathname()

	useEffect(() => {
		if (!pathname || typeof window === 'undefined') return
		window.umami?.track()
	}, [pathname])
}
