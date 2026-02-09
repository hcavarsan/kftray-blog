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
			sidebar={{
				defaultOpenLevel: 999,
			}}
			themeSwitch={{ enabled: false }}
		>
			{children}
		</DocsLayout>
	)
}
