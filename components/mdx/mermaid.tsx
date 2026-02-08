'use client'

import { useEffect, useId, useRef, useState } from 'react'

interface MermaidProps {
	children: React.ReactNode
}

export function Mermaid({ children }: MermaidProps) {
	const code = typeof children === 'string' ? children.trim() : String(children).trim()
	const containerRef = useRef<HTMLDivElement>(null)
	const [error, setError] = useState<string | null>(null)
	const uniqueId = `mermaid-${useId().replace(/:/g, '')}`

	useEffect(() => {
		let cancelled = false

		async function renderDiagram() {
			try {
				const mermaid = (await import('mermaid')).default
				mermaid.initialize({
					startOnLoad: false,
					theme: 'dark',
					fontFamily: 'inherit',
				})

				const { svg } = await mermaid.render(uniqueId, code)
				if (!cancelled && containerRef.current) {
					containerRef.current.innerHTML = svg
				}
			} catch (err) {
				if (!cancelled) {
					setError(err instanceof Error ? err.message : 'Failed to render diagram')
				}
			}
		}

		renderDiagram()
		return () => {
			cancelled = true
		}
	}, [code, uniqueId])

	if (error) {
		return (
			<pre className="overflow-x-auto rounded-lg border border-fd-border bg-fd-muted p-4 text-sm">
				<code>{code}</code>
			</pre>
		)
	}

	return (
		<div
			ref={containerRef}
			className="my-6 flex justify-center overflow-x-auto rounded-lg border border-fd-border bg-fd-muted p-4 [&_svg]:max-w-full"
		/>
	)
}
