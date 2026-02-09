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
				{
					type: 'custom',
					secondary: true,
					children: <SbomLink />,
				},
				{
					type: 'custom',
					secondary: true,
					children: <GithubStars />,
				},
			]}
			sidebar={{
				defaultOpenLevel: 999,
			}}
			themeSwitch={{ enabled: false }}
		>
			{children}
		</DocsLayout>
	)
}
