import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { ReactNode } from 'react'
import { GithubStars } from '@/components/common/github-stars'
import { SbomLink } from '@/components/common/sbom-link'
import { navTitle } from '@/lib/nav-links'
import { source } from '@/lib/source'

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<DocsLayout
			tree={source.getPageTree()}
			nav={{
				title: navTitle,
				url: '/',
			}}
			links={[
				{
					type: 'menu',
					text: 'Navigate',
					items: [
						{ text: 'Home', description: 'Back to main site', url: '/' },
						{ text: 'Blog', description: 'Articles and tutorials', url: '/blog' },
						{ text: 'Downloads', description: 'Get kftray and kftui', url: '/downloads' },
					],
				},
			]}
			sidebar={{
				defaultOpenLevel: 999,
				footer: (
					<div className="flex items-center gap-2 px-2 md:hidden">
						<SbomLink />
						<GithubStars />
					</div>
				),
			}}
			themeSwitch={{ enabled: false }}
		>
			<div className="fixed right-4 top-3.5 z-50 hidden items-center gap-2 md:flex">
				<SbomLink />
				<GithubStars />
			</div>
			{children}
		</DocsLayout>
	)
}
