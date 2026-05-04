'use client'

import { X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

export function MermaidZoom() {
	const [isOpen, setIsOpen] = useState(false)
	const contentRef = useRef<HTMLDivElement>(null)
	const svgSourceRef = useRef('')
	const [scale, setScale] = useState(1)
	const [translate, setTranslate] = useState({ x: 0, y: 0 })
	const lastTouchRef = useRef<{ dist: number; x: number; y: number } | null>(null)
	const lastTapRef = useRef(0)

	const close = useCallback(() => {
		setIsOpen(false)
		setScale(1)
		setTranslate({ x: 0, y: 0 })
	}, [])

	const resetTransform = useCallback(() => {
		setScale(1)
		setTranslate({ x: 0, y: 0 })
	}, [])

	useEffect(() => {
		function handleClick(e: MouseEvent) {
			const target = e.target as HTMLElement
			const diagram = target.closest('.mermaid-diagram')
			if (!diagram) return

			svgSourceRef.current = diagram.innerHTML
			setIsOpen(true)
		}

		document.addEventListener('click', handleClick, true)
		return () => document.removeEventListener('click', handleClick, true)
	}, [])

	useEffect(() => {
		if (!isOpen) return

		const node = contentRef.current
		if (node) {
			node.innerHTML = svgSourceRef.current
			const svg = node.querySelector('svg')
			if (svg) {
				svg.setAttribute('width', '100%')
				svg.setAttribute('height', '100%')
				svg.removeAttribute('style')
				svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
			}
		}

		function handleEscape(e: KeyboardEvent) {
			if (e.key === 'Escape') close()
		}

		document.addEventListener('keydown', handleEscape)
		return () => document.removeEventListener('keydown', handleEscape)
	}, [isOpen, close])

	function getTouchDistance(t0: React.Touch, t1: React.Touch) {
		const dx = t0.clientX - t1.clientX
		const dy = t0.clientY - t1.clientY
		return Math.sqrt(dx * dx + dy * dy)
	}

	function handleTouchStart(e: React.TouchEvent) {
		if (e.touches.length === 2) {
			lastTouchRef.current = {
				dist: getTouchDistance(e.touches[0], e.touches[1]),
				x: translate.x,
				y: translate.y,
			}
		} else if (e.touches.length === 1) {
			const now = Date.now()
			if (now - lastTapRef.current < 300) {
				if (scale > 1) {
					resetTransform()
				} else {
					setScale(2.5)
				}
			}
			lastTapRef.current = now
			lastTouchRef.current = {
				dist: 0,
				x: e.touches[0].clientX - translate.x,
				y: e.touches[0].clientY - translate.y,
			}
		}
	}

	function handleTouchMove(e: React.TouchEvent) {
		if (e.touches.length === 2 && lastTouchRef.current) {
			const newDist = getTouchDistance(e.touches[0], e.touches[1])
			const ratio = newDist / lastTouchRef.current.dist
			setScale((prev) => Math.min(Math.max(prev * ratio, 0.5), 5))
			lastTouchRef.current.dist = newDist
		} else if (e.touches.length === 1 && scale > 1 && lastTouchRef.current) {
			setTranslate({
				x: e.touches[0].clientX - lastTouchRef.current.x,
				y: e.touches[0].clientY - lastTouchRef.current.y,
			})
		}
	}

	function handleWheel(e: React.WheelEvent) {
		e.preventDefault()
		const delta = e.deltaY > 0 ? 0.9 : 1.1
		setScale((prev) => Math.min(Math.max(prev * delta, 0.5), 5))
	}

	if (!isOpen) return null

	return (
		<div
			role="dialog"
			aria-modal="true"
			className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-dark-base/95"
			onClick={(e) => {
				const target = e.target as HTMLElement
				if (
					!target.closest('svg') &&
					!target.closest('button') &&
					!target.closest('[data-zoom-content]')
				) {
					close()
				}
			}}
			onKeyDown={(e) => {
				if (e.key === 'Escape') close()
			}}
		>
			<div className="absolute right-4 top-4 z-10 flex items-center gap-2">
				{scale > 1 && (
					<button
						type="button"
						aria-label="Reset zoom"
						onClick={resetTransform}
						className="rounded-lg bg-dark-surface px-3 py-1.5 text-xs text-text-secondary transition-colors hover:text-text-primary"
					>
						Reset
					</button>
				)}
				<button
					type="button"
					aria-label="Close"
					onClick={close}
					className="rounded-lg p-2 text-text-secondary transition-colors hover:text-text-primary"
				>
					<X className="h-5 w-5" />
				</button>
			</div>

			<p className="mb-3 text-xs text-text-secondary md:hidden">Pinch or double-tap to zoom</p>

			<div
				className="flex h-[80vh] w-[90vw] cursor-grab items-center justify-center overflow-hidden active:cursor-grabbing md:h-[85vh]"
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onWheel={handleWheel}
			>
				<div
					ref={contentRef}
					data-zoom-content
					className="h-full w-full transition-transform duration-75 [&_svg]:h-full [&_svg]:w-full"
					style={{
						transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
					}}
				/>
			</div>
		</div>
	)
}
