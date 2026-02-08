'use client'

import { useEffect, useRef } from 'react'

function getGiscusTheme(): string {
	if (typeof document === 'undefined') return 'noborder_dark'
	return document.documentElement.classList.contains('light') ? 'noborder_light' : 'noborder_dark'
}

export function BlogComments() {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!containerRef.current) return

		const theme = getGiscusTheme()

		const script = document.createElement('script')
		script.src = 'https://giscus.app/client.js'
		script.setAttribute('data-repo', 'hcavarsan/kftray-blog')
		script.setAttribute('data-repo-id', 'R_kgDOLw9pEw')
		script.setAttribute('data-category', 'General')
		script.setAttribute('data-category-id', 'DIC_kwDOLw9pE84Ce3Af')
		script.setAttribute('data-mapping', 'pathname')
		script.setAttribute('data-strict', '0')
		script.setAttribute('data-reactions-enabled', '1')
		script.setAttribute('data-emit-metadata', '0')
		script.setAttribute('data-input-position', 'top')
		script.setAttribute('data-theme', theme)
		script.setAttribute('data-lang', 'en')
		script.setAttribute('data-loading', 'lazy')
		script.setAttribute('crossorigin', 'anonymous')
		script.async = true

		containerRef.current.appendChild(script)

		const observer = new MutationObserver(() => {
			const newTheme = getGiscusTheme()
			const iframe = containerRef.current?.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
			if (iframe?.contentWindow) {
				iframe.contentWindow.postMessage(
					{ giscus: { setConfig: { theme: newTheme } } },
					'https://giscus.app',
				)
			}
		})

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class'],
		})

		return () => {
			observer.disconnect()
			const giscusFrame = containerRef.current?.querySelector('.giscus')
			if (giscusFrame) giscusFrame.remove()
		}
	}, [])

	return (
		<section aria-label="Comments">
			<h2 className="mb-4 text-lg font-semibold text-fd-foreground">Comments</h2>
			<div ref={containerRef} />
		</section>
	)
}
