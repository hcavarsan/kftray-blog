'use client'

import { Maximize, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const BASE = '/video/kftray-intro-v1'

const controlClass =
	'flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white'

type FullscreenVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void }

type LockableOrientation = ScreenOrientation & {
	lock?: (orientation: 'landscape') => Promise<void>
}

export function HeroVideo() {
	const ref = useRef<HTMLVideoElement>(null)
	const [paused, setPaused] = useState(false)
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const video = ref.current
		if (!video) {
			return
		}
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			setPaused(true)
		}
		const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
			threshold: 0.25,
		})
		observer.observe(video)
		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		const video = ref.current
		if (!video) {
			return
		}
		if (visible && !paused) {
			video.play().catch(() => setPaused(true))
		} else {
			video.pause()
		}
	}, [visible, paused])

	const openFullscreen = () => {
		const video = ref.current as FullscreenVideo | null
		if (!video) {
			return
		}
		setPaused(false)
		if (video.requestFullscreen) {
			video
				.requestFullscreen()
				.then(() => (screen.orientation as LockableOrientation).lock?.('landscape'))
				.catch(() => {})
		} else {
			video.webkitEnterFullscreen?.()
		}
	}

	return (
		<div className="relative">
			<video
				ref={ref}
				muted
				loop
				playsInline
				preload="metadata"
				poster={`${BASE}-poster.webp`}
				width={1920}
				height={1080}
				aria-label="kftray and kftui demo"
				className="aspect-video w-full rounded-2xl border border-fd-border bg-dark-base"
			>
				<source src={`${BASE}-720.mp4`} type="video/mp4" media="(max-width: 768px)" />
				<source src={`${BASE}-1080.mp4`} type="video/mp4" />
			</video>
			<div className="absolute right-3 bottom-3 flex gap-2">
				<button
					type="button"
					onClick={openFullscreen}
					aria-label="Watch in full screen"
					data-umami-event="hero-video-fullscreen"
					className={`${controlClass} md:hidden`}
				>
					<Maximize className="h-4 w-4" />
				</button>
				<button
					type="button"
					onClick={() => setPaused((p) => !p)}
					aria-label={paused ? 'Play video' : 'Pause video'}
					data-umami-event={paused ? 'hero-video-play' : 'hero-video-pause'}
					className={controlClass}
				>
					{paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
				</button>
			</div>
		</div>
	)
}
