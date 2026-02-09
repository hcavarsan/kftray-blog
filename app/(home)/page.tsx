import { Code, Download, FileOutput, Github, RefreshCw, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const features = [
	{
		icon: Github,
		title: 'GitHub Sync',
		description:
			'Store and sync port-forward configurations via Git. Share setups across your entire team effortlessly.',
	},
	{
		icon: RefreshCw,
		title: 'Auto-Reconnect',
		description:
			'Connections drop? kftray detects failures and re-establishes port-forwards automatically.',
	},
	{
		icon: Code,
		title: 'Proxy & UDP Support',
		description:
			'Forward HTTP traffic through a proxy server. Full support for UDP port-forwarding via kftray-server.',
	},
	{
		icon: Download,
		title: 'Import / Export',
		description:
			'Easily import and export your port-forward configurations as JSON for backup or sharing.',
	},
	{
		icon: FileOutput,
		title: 'Multiple Configs',
		description:
			'Manage hundreds of port-forward configs from a single system tray interface. Start all at once or individually.',
	},
	{
		icon: Users,
		title: 'Team Collaboration',
		description:
			'Share configurations through Git repositories. Everyone on the team stays in sync with the same setups.',
	},
]

export default function HomePage() {
	return (
		<main className="flex flex-1 flex-col">
			<section className="flex flex-col items-center justify-center gap-8 px-6 py-24 text-center md:py-32">
				<div className="flex flex-col items-center gap-6">
					<h1 className="max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
						kftray - <span className="text-accent">kubectl port-forward</span> on steroids
					</h1>
					<p className="max-w-2xl text-lg text-fd-muted-foreground md:text-xl">
						Manage and share multiple kubectl port-forward configurations with ease. A
						cross-platform system tray app and CLI for Kubernetes port forwarding.
					</p>
				</div>
				<div className="flex flex-wrap items-center justify-center gap-4">
					<Link
						href="/docs"
						data-umami-event="cta-get-started"
						className="cursor-pointer rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-dark-base transition-colors hover:bg-accent-hover"
					>
						Get started
					</Link>
					<Link
						href="/downloads"
						data-umami-event="cta-download"
						className="rounded-lg border border-fd-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-fd-accent"
					>
						Download
					</Link>
				</div>
			</section>

			<section className="-mt-14 mx-auto w-full max-w-7xl px-4 pb-20">
				<Image
					src="https://raw.githubusercontent.com/hcavarsan/kftray-blog/refs/heads/main/public/img/kftools.webp"
					alt="kftray and kftui tools overview"
					width={1400}
					height={788}
					className="w-full rounded-2xl border border-fd-border"
					priority
					unoptimized
				/>
			</section>

			<section className="mx-auto w-full max-w-6xl px-6 pb-24">
				<h2 className="sr-only">Features</h2>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="flex flex-col gap-3 rounded-xl border border-fd-border bg-fd-card p-6"
						>
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
								<feature.icon className="h-5 w-5" />
							</div>
							<h3 className="text-lg font-semibold">{feature.title}</h3>
							<p className="text-sm leading-relaxed text-fd-muted-foreground">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</section>
		</main>
	)
}
