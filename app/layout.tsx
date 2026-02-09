import './global.css'
import { RootProvider } from 'fumadocs-ui/provider/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import type { ReactNode } from 'react'
import { UmamiTracker } from '@/components/common/umami-tracker'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
	title: {
		template: '%s | kftray',
		default: 'kftray - kubectl port-forward on steroids',
	},
	description:
		'Manage and share multiple kubectl port-forward configurations with ease. A cross-platform system tray app and CLI for Kubernetes port forwarding.',
	metadataBase: new URL('https://kftray.app'),
	openGraph: {
		title: 'kftray - kubectl port-forward on steroids',
		description: 'Manage and share multiple kubectl port-forward configurations with ease.',
		url: 'https://kftray.app',
		siteName: 'kftray',
		type: 'website',
		images: [{ url: '/img/kftray-head.png', width: 1200, height: 630 }],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'kftray - kubectl port-forward on steroids',
		description: 'Manage and share multiple kubectl port-forward configurations with ease.',
		images: ['/img/kftray-head.png'],
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
			<head />
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
				<Script
					src="/u/script.js"
					data-website-id={
						process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ?? '70662892-98e8-48ce-bde0-d360b7a0d0fc'
					}
					data-domains="kftray.app"
					data-do-not-track="true"
					data-exclude-search="true"
					data-auto-track="false"
					strategy="afterInteractive"
				/>
				<UmamiTracker />
			</body>
		</html>
	)
}
