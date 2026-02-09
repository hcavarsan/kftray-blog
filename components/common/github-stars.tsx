import { Github, Star } from 'lucide-react'
import { getGithubStars } from '@/lib/github'

function formatStars(count: number): string {
	if (count >= 1000) {
		return `${(count / 1000).toFixed(1)}k`
	}
	return String(count)
}

export async function GithubStars({ compact }: { compact?: boolean }) {
	const stars = await getGithubStars()

	if (compact) {
		return (
			<a
				href="https://github.com/hcavarsan/kftray"
				target="_blank"
				rel="noopener noreferrer"
				title={stars !== null ? `${formatStars(stars)} stars on GitHub` : 'GitHub'}
				data-umami-event="github-star-click"
				className="inline-flex h-8 items-center gap-1 rounded-md px-1.5 text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
			>
				<Github className="h-4 w-4" />
				{stars !== null && <span className="text-xs">{formatStars(stars)}</span>}
			</a>
		)
	}

	return (
		<a
			href="https://github.com/hcavarsan/kftray"
			target="_blank"
			rel="noopener noreferrer"
			data-umami-event="github-star-click"
			className="inline-flex items-center gap-1.5 rounded-md border border-fd-border px-2.5 py-1 text-xs font-normal text-fd-muted-foreground transition-colors hover:border-fd-ring hover:text-fd-foreground md:gap-2 md:px-3 md:text-sm"
		>
			<Star className="h-4 w-4 shrink-0" />
			<span>Star</span>
			{stars !== null && (
				<span className="inline-flex items-center rounded bg-fd-muted px-1.5 py-0.5 text-[0.6875rem] leading-none text-fd-muted-foreground md:text-xs">
					{formatStars(stars)}
				</span>
			)}
		</a>
	)
}
