import { HomeLayout } from 'fumadocs-ui/layouts/home'
import type { ReactNode } from 'react'
import { navTitle, siteNavLinks } from '@/lib/nav-links'

export default function BlogLayout({ children }: { children: ReactNode }) {
	return (
		<HomeLayout nav={{ title: navTitle }} links={siteNavLinks} themeSwitch={{ enabled: false }}>
			{children}
		</HomeLayout>
	)
}
