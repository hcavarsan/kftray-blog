'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'

interface YouTubeEmbedProps {
	id: string
	title?: string
}

export function YouTubeEmbed({ id, title = 'YouTube video' }: YouTubeEmbedProps) {
	const [isLoaded, setIsLoaded] = useState(false)

	const handleLoad = useCallback(() => {
		setIsLoaded(true)
	}, [])

	const thumbnailUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`

	return (
		<div className="not-prose relative my-6 overflow-hidden rounded-xl border border-fd-border">
			<div className="relative aspect-video w-full">
				{isLoaded ? (
					<iframe
						src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
						title={title}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						className="absolute inset-0 h-full w-full"
					/>
				) : (
					<button
						type="button"
						onClick={handleLoad}
						className="group absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center bg-dark-base"
						aria-label={`Play ${title}`}
					>
						<Image
							src={thumbnailUrl}
							alt={title}
							fill
							sizes="(max-width: 768px) 100vw, 768px"
							className="object-cover transition-opacity group-hover:opacity-80"
							loading="lazy"
							unoptimized
						/>
						<div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-red-600 transition-opacity group-hover:opacity-80">
							<svg viewBox="0 0 24 24" fill="white" className="ml-1 h-7 w-7" aria-hidden="true">
								<path d="M8 5v14l11-7z" />
							</svg>
						</div>
					</button>
				)}
			</div>
		</div>
	)
}
