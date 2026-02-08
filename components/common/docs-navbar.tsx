import { GithubStars } from '@/components/common/github-stars'
import { SbomLink } from '@/components/common/sbom-link'

export function DocsNavbar() {
	return (
		<header className="sticky top-0 z-50 flex h-14 items-center justify-end border-b border-fd-border bg-fd-background/80 px-4 backdrop-blur-sm">
			<div className="flex items-center gap-2">
				<SbomLink />
				<GithubStars />
			</div>
		</header>
	)
}
