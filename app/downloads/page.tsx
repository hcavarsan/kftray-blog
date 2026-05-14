import type { Metadata } from 'next'
import { DownloadManager } from '@/components/downloads/download-manager'
import { getLatestVersion } from '@/lib/github'
import { site } from '@/lib/site'

export const metadata: Metadata = {
	title: 'Downloads — kftray and kftui',
	description:
		'Download kftray and kftui for macOS, Linux, and Windows. System tray app and CLI for Kubernetes port forwarding.',
	openGraph: {
		title: 'Downloads | kftray',
		description: 'Download kftray and kftui for macOS, Linux, and Windows.',
		url: `${site.url}/downloads`,
		type: 'website',
		siteName: site.name,
		images: [{ url: `${site.url}${site.ogImage}`, width: 1102, height: 584 }],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Downloads | kftray',
		description: 'Download kftray and kftui for macOS, Linux, and Windows.',
		images: [`${site.url}${site.ogImage}`],
	},
	alternates: {
		canonical: `${site.url}/downloads`,
	},
}

export default async function DownloadsPage() {
	const latestVersion = await getLatestVersion()

	return (
		<main className="mx-auto w-full max-w-5xl px-6 py-12 md:py-16 lg:px-8">
			<div className="mb-12 text-center">
				<h1 className="mb-4 text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
					Download kftray & kftui
				</h1>
				<p className="mx-auto max-w-2xl text-lg text-fd-muted-foreground">
					Choose the right version for your operating system.
				</p>
			</div>

			<DownloadManager latestVersion={latestVersion} />
		</main>
	)
}
