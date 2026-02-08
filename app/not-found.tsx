import Link from 'next/link'

export default function NotFound() {
	return (
		<main className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
			<div className="mx-auto max-w-md">
				<p className="mb-2 text-7xl font-extrabold text-accent">404</p>
				<h1 className="mb-2 text-2xl font-bold tracking-tight text-fd-foreground">
					Page not found
				</h1>
				<p className="mb-8 text-fd-muted-foreground">
					The page you are looking for does not exist or has been moved.
				</p>
				<Link
					href="/"
					className="cursor-pointer rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-dark-base transition-colors hover:bg-accent-hover"
				>
					Go home
				</Link>
			</div>
		</main>
	)
}
