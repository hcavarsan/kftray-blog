import Link from 'next/link'
import { GithubStars } from '@/components/common/github-stars'
import { SbomLink } from '@/components/common/sbom-link'

const navLinks = [
	{ text: 'Home', url: '/' },
	{ text: 'Blog', url: '/blog' },
	{ text: 'Downloads', url: '/downloads' },
]

export function DocsNavbar() {
	return (
		<header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-fd-border bg-fd-background/80 px-4 backdrop-blur-sm">
			<nav className="ml-2 flex items-center gap-4">
				{navLinks.map((link) => (
					<Link
						key={link.url}
						href={link.url}
						className="text-sm font-medium text-fd-muted-foreground transition-colors hover:text-fd-foreground"
					>
						{link.text}
					</Link>
				))}
			</nav>
			<div className="flex items-center gap-2">
				<SbomLink />
				<GithubStars />
			</div>
		</header>
	)
}
