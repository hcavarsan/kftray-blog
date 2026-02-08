import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { ReactNode } from 'react'
import { DocsNavbar } from '@/components/common/docs-navbar'
import { navTitle } from '@/lib/nav-links'
import { source } from '@/lib/source'

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<DocsLayout
			tree={source.getPageTree()}
			nav={{
				title: navTitle,
				component: <DocsNavbar />,
			}}
			links={[
				{ text: 'Docs', url: '/docs', on: 'menu' },
				{ text: 'Blog', url: '/blog', on: 'menu' },
				{ text: 'Downloads', url: '/downloads', on: 'menu' },
			]}
			themeSwitch={{ enabled: false }}
		>
			{children}
		</DocsLayout>
	)
}
