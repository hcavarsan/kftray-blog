export default function BlogPostLoading() {
	return (
		<main className="pb-16">
			<div className="relative mb-12 overflow-hidden">
				<div className="absolute inset-0 bg-dark-base" />
				<div className="relative z-10 mx-auto max-w-4xl px-6 py-16 md:py-24">
					<div className="mb-8 h-4 w-24 animate-pulse rounded bg-text-secondary/20" />
					<div className="mb-4 h-10 w-3/4 animate-pulse rounded bg-text-secondary/20" />
					<div className="mb-8 h-6 w-1/2 animate-pulse rounded bg-text-secondary/10" />
					<div className="flex items-center gap-4">
						<div className="h-11 w-11 animate-pulse rounded-full bg-text-secondary/20" />
						<div className="h-4 w-32 animate-pulse rounded bg-text-secondary/20" />
					</div>
				</div>
			</div>
			<div className="mx-auto w-full max-w-3xl space-y-4 px-6 lg:px-8">
				<div className="h-4 w-full animate-pulse rounded bg-fd-muted" />
				<div className="h-4 w-5/6 animate-pulse rounded bg-fd-muted" />
				<div className="h-4 w-4/6 animate-pulse rounded bg-fd-muted" />
				<div className="h-4 w-full animate-pulse rounded bg-fd-muted" />
				<div className="h-4 w-3/4 animate-pulse rounded bg-fd-muted" />
			</div>
		</main>
	)
}
