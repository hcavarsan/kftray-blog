import { Star } from 'lucide-react'
import { getGithubStars } from '@/lib/github'

function formatStars(count: number): string {
	if (count >= 1000) {
		return `${(count / 1000).toFixed(1)}k`
	}
	return String(count)
}

export async function GithubStars() {
	const stars = await getGithubStars()

	return (
		<a
			href="https://github.com/hcavarsan/kftray"
			target="_blank"
			rel="noopener noreferrer"
			className="inline-flex items-center gap-1.5 rounded-md border border-fd-border px-2.5 py-1 text-xs font-normal text-fd-muted-foreground transition-colors hover:border-fd-ring hover:text-fd-foreground md:gap-2 md:px-3 md:text-sm"
		>
			<Star className="h-4 w-4 shrink-0" />
			<span className="hidden sm:inline">Star</span>
			{stars !== null && (
				<span className="inline-flex items-center rounded bg-fd-muted px-1.5 py-0.5 text-[0.6875rem] leading-none text-fd-muted-foreground md:text-xs">
					{formatStars(stars)}
				</span>
			)}
		</a>
	)
}
