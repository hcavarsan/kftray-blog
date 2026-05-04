'use client'

import { Download } from 'lucide-react'

interface DownloadMarkdownProps {
	contentPath: string
	filename: string
}

export function DownloadMarkdown({ contentPath, filename }: DownloadMarkdownProps) {
	const handleDownload = async () => {
		const res = await fetch(`/api/raw/${contentPath}`)
		if (!res.ok) return

		const blob = await res.blob()
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = `${filename}.md`
		a.click()
		URL.revokeObjectURL(url)
	}

	return (
		<button
			type="button"
			onClick={handleDownload}
			title="Download as Markdown"
			aria-label="Download as Markdown"
			className="inline-flex items-center text-text-secondary transition-colors hover:text-text-primary"
		>
			<Download className="h-4 w-4" />
		</button>
	)
}
