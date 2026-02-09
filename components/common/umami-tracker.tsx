'use client'

import { useUmamiPageTracker } from '@/hooks/use-umami-page-tracker'

export function UmamiTracker() {
	useUmamiPageTracker()
	return null
}
