export default function DownloadsLoading() {
	return (
		<main className="mx-auto w-full max-w-5xl px-6 py-12 md:py-16 lg:px-8">
			<div className="mb-12 text-center">
				<div className="mx-auto mb-4 h-10 w-2/3 animate-pulse rounded bg-fd-muted" />
				<div className="mx-auto h-6 w-1/2 animate-pulse rounded bg-fd-muted" />
			</div>

			<div className="mx-auto max-w-4xl rounded-lg">
				<div className="mb-12 rounded-lg border border-fd-border bg-fd-card p-8">
					<div className="flex flex-col items-center justify-center gap-4 md:flex-row">
						<div className="h-10 w-56 animate-pulse rounded-md bg-fd-muted" />
						<div className="h-10 w-56 animate-pulse rounded-md bg-fd-muted" />
					</div>
				</div>

				<div className="mb-8 border-b border-fd-border">
					<div className="flex justify-center space-x-12 pb-3">
						<div className="h-6 w-16 animate-pulse rounded bg-fd-muted" />
						<div className="h-6 w-16 animate-pulse rounded bg-fd-muted" />
					</div>
				</div>

				<div className="flex flex-col space-y-6">
					{[1, 2, 3].map((i) => (
						<div key={i} className="overflow-hidden rounded-lg border border-fd-border">
							<div className="flex items-center justify-center border-b border-fd-border bg-fd-muted p-3">
								<div className="h-6 w-24 animate-pulse rounded bg-fd-muted-foreground/20" />
							</div>
							<div className="bg-fd-card p-4">
								<div className="grid gap-6 md:grid-cols-2">
									<div className="h-20 animate-pulse rounded bg-fd-muted" />
									<div className="h-20 animate-pulse rounded bg-fd-muted" />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	)
}
