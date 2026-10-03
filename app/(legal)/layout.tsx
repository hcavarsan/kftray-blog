import { HomeLayout } from 'fumadocs-ui/layouts/home'
import type { ReactNode } from 'react'
import { navTitle, siteNavLinks } from '@/lib/nav-links'

export default function LegalLayout({ children }: { children: ReactNode }) {
	return (
		<HomeLayout nav={{ title: navTitle }} links={siteNavLinks} themeSwitch={{ enabled: false }}>
			<main className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16 lg:px-8">
				<article className="prose prose-fd">{children}</article>
			</main>
		</HomeLayout>
	)
}
