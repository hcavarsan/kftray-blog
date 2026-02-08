'use client'

import { useEffect } from 'react'

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<main className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
			<div className="mx-auto max-w-md">
				<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 mx-auto">
					<svg
						className="h-8 w-8 text-red-500"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						role="img"
						aria-label="Error"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
						/>
					</svg>
				</div>
				<h1 className="mb-2 text-2xl font-bold tracking-tight text-fd-foreground">
					Something went wrong
				</h1>
				<p className="mb-8 text-fd-muted-foreground">
					An unexpected error occurred. Please try again.
				</p>
				<button
					type="button"
					onClick={reset}
					className="cursor-pointer rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-dark-base transition-colors hover:bg-accent-hover"
				>
					Try again
				</button>
			</div>
		</main>
	)
}
