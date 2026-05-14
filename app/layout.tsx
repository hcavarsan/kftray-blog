import './global.css'
import { RootProvider } from 'fumadocs-ui/provider/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import type { ReactNode } from 'react'
import { site } from '@/lib/site'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
	title: {
		template: '%s | kftray',
		default: site.title,
	},
	description: site.description,
	metadataBase: new URL(site.url),
	openGraph: {
		title: site.title,
		description: site.description,
		url: site.url,
		siteName: site.name,
		type: 'website',
		images: [{ url: site.ogImage, width: 1200, height: 630 }],
	},
	twitter: {
		card: 'summary_large_image',
		title: site.title,
		description: site.description,
		images: [site.ogImage],
	},
	alternates: {
		types: {
			'application/rss+xml': '/blog/rss.xml',
		},
	},
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" className={`${inter.variable} dark`} style={{ colorScheme: 'dark' }}>
			<body className="flex min-h-screen flex-col">
				<RootProvider
					theme={{
						enabled: true,
						forcedTheme: 'dark',
						enableSystem: false,
						disableTransitionOnChange: true,
					}}
				>
					{children}
				</RootProvider>
				{process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
					<Script
						src="https://umami.cavarsa.app/script.js"
						data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
						data-domains="kftray.app"
						data-exclude-search="true"
						data-exclude-hash="true"
						data-do-not-track="true"
						data-performance="true"
						strategy="afterInteractive"
					/>
				)}
			</body>
		</html>
	)
}
