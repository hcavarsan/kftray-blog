'use client'

import { Apple, ExternalLink, Github, Loader2, Monitor } from 'lucide-react'
import { useState } from 'react'
import { CodeBlock } from '@/components/common/code-block'
import { LinuxIcon } from '@/components/common/linux-icon'
import { DownloadButton } from '@/components/downloads/download-button'
import { useSystemDetection } from '@/hooks/use-system-detection'

function OsSection({
	icon,
	title,
	children,
}: {
	icon: React.ReactNode
	title: string
	children: React.ReactNode
}) {
	return (
		<div className="overflow-hidden rounded-lg border border-fd-border">
			<div className="flex items-center justify-center border-b border-fd-border bg-fd-muted p-3">
				<h4 className="flex items-center gap-2 text-lg font-medium text-fd-foreground">
					{icon}
					{title}
				</h4>
			</div>
			<div className="bg-fd-card p-4">{children}</div>
		</div>
	)
}

export function DownloadManager({ latestVersion }: { latestVersion: string }) {
	const [activeTab, setActiveTab] = useState<'kftray' | 'kftui'>('kftray')
	const { detectedSystem } = useSystemDetection()

	return (
		<div className="mx-auto w-full max-w-5xl rounded-lg">
			<h2 className="sr-only">Download options</h2>
			<div className="mb-12 rounded-lg border border-fd-border bg-fd-card p-8">
				{detectedSystem && (
					<div className="flex flex-col items-center justify-center gap-4 md:flex-row">
						<DownloadButton
							app="kftray"
							os={detectedSystem.os}
							arch={detectedSystem.arch}
							version={latestVersion}
							highlighted
						/>
						<DownloadButton
							app="kftui"
							os={detectedSystem.os}
							arch={detectedSystem.arch}
							version={latestVersion}
							highlighted
						/>
					</div>
				)}
				{!detectedSystem && (
					<div className="text-center text-fd-muted-foreground">
						<Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
						Detecting your system...
					</div>
				)}
			</div>

			<div className="mb-12">
				<div className="mb-8 border-b border-fd-border">
					<div
						role="tablist"
						aria-label="Application selection"
						className="flex justify-center space-x-12"
					>
						<button
							type="button"
							role="tab"
							aria-selected={activeTab === 'kftray'}
							aria-controls="tabpanel-kftray"
							id="tab-kftray"
							onClick={() => setActiveTab('kftray')}
							className={`cursor-pointer border-b-2 px-6 py-3 font-medium transition-colors ${
								activeTab === 'kftray'
									? 'border-accent text-accent font-semibold'
									: 'border-transparent text-fd-muted-foreground'
							}`}
						>
							kftray
						</button>
						<button
							type="button"
							role="tab"
							aria-selected={activeTab === 'kftui'}
							aria-controls="tabpanel-kftui"
							id="tab-kftui"
							onClick={() => setActiveTab('kftui')}
							className={`cursor-pointer border-b-2 px-6 py-3 font-medium transition-colors ${
								activeTab === 'kftui'
									? 'border-accent text-accent font-semibold'
									: 'border-transparent text-fd-muted-foreground'
							}`}
						>
							kftui
						</button>
					</div>
				</div>

				{activeTab === 'kftray' && (
					<div
						id="tabpanel-kftray"
						role="tabpanel"
						aria-labelledby="tab-kftray"
						className="flex flex-col space-y-6"
					>
						<OsSection icon={<Apple className="h-5 w-5" />} title="macOS">
							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<h5 className="mb-3 text-center text-sm font-medium text-fd-muted-foreground">
										Via Homebrew
									</h5>
									<CodeBlock>
										<div>brew tap hcavarsan/kftray</div>
										<div>brew install --cask kftray</div>
									</CodeBlock>
								</div>
								<div>
									<h5 className="mb-3 text-center text-sm font-medium text-fd-muted-foreground">
										Direct Download
									</h5>
									<div className="flex justify-center">
										<DownloadButton app="kftray" os="darwin" arch="amd64" version={latestVersion} />
									</div>
								</div>
							</div>
						</OsSection>

						<OsSection icon={<LinuxIcon className="h-5 w-5" />} title="Linux">
							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<h5 className="mb-3 text-center text-sm font-medium text-fd-muted-foreground">
										Via Homebrew
									</h5>
									<CodeBlock>
										<div>brew tap hcavarsan/kftray</div>
										<div>brew install kftray-linux</div>
									</CodeBlock>
								</div>
								<div>
									<h5 className="mb-3 text-center text-sm font-medium text-fd-muted-foreground">
										Direct Download
									</h5>
									<div className="flex flex-col items-center space-y-4">
										<DownloadButton
											app="kftray"
											os="linux"
											arch="amd64"
											version={latestVersion}
											appImage
										/>
										<DownloadButton
											app="kftray"
											os="linux"
											arch="arm64"
											version={latestVersion}
											appImage
										/>
									</div>
								</div>
							</div>
						</OsSection>

						<OsSection icon={<Monitor className="h-5 w-5" />} title="Windows">
							<h5 className="mb-3 text-center text-sm font-medium text-fd-muted-foreground">
								Direct Download
							</h5>
							<div className="flex flex-col items-center space-y-4">
								<DownloadButton app="kftray" os="windows" arch="amd64" version={latestVersion} />
								<DownloadButton app="kftray" os="windows" arch="arm64" version={latestVersion} />
							</div>
						</OsSection>
					</div>
				)}

				{activeTab === 'kftui' && (
					<div
						id="tabpanel-kftui"
						role="tabpanel"
						aria-labelledby="tab-kftui"
						className="flex flex-col space-y-6"
					>
						<OsSection icon={<Apple className="h-5 w-5" />} title="macOS">
							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<h5 className="mb-3 text-center text-sm font-medium text-fd-muted-foreground">
										Script Installation
									</h5>
									<CodeBlock>
										<div>
											bash &lt;(curl -s
											https://raw.githubusercontent.com/hcavarsan/kftray/main/hacks/kftui_installer.sh)
										</div>
									</CodeBlock>
								</div>
								<div>
									<h5 className="mb-3 text-center text-sm font-medium text-fd-muted-foreground">
										Direct Download
									</h5>
									<div className="flex justify-center">
										<DownloadButton app="kftui" os="darwin" arch="amd64" version={latestVersion} />
									</div>
								</div>
							</div>
						</OsSection>

						<OsSection icon={<LinuxIcon className="h-5 w-5" />} title="Linux">
							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<h5 className="mb-3 text-center text-sm font-medium text-fd-muted-foreground">
										Script Installation
									</h5>
									<CodeBlock>
										<div>
											bash &lt;(curl -s
											https://raw.githubusercontent.com/hcavarsan/kftray/main/hacks/kftui_installer.sh)
										</div>
										<div className="mt-2 text-xs text-text-secondary">or using wget:</div>
										<div className="mt-1">
											bash &lt;(wget -qO-
											https://raw.githubusercontent.com/hcavarsan/kftray/main/hacks/kftui_installer.sh)
										</div>
									</CodeBlock>
								</div>
								<div>
									<h5 className="mb-3 text-center text-sm font-medium text-fd-muted-foreground">
										Direct Download
									</h5>
									<div className="flex flex-col items-center space-y-4">
										<DownloadButton app="kftui" os="linux" arch="amd64" version={latestVersion} />
										<DownloadButton app="kftui" os="linux" arch="arm64" version={latestVersion} />
									</div>
								</div>
							</div>
						</OsSection>

						<OsSection icon={<Monitor className="h-5 w-5" />} title="Windows">
							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<h5 className="mb-3 text-center text-sm font-medium text-fd-muted-foreground">
										PowerShell Script
									</h5>
									<CodeBlock>
										<div>
											Invoke-Expression ((New-Object
											System.Net.WebClient).DownloadString(&apos;https://raw.githubusercontent.com/hcavarsan/kftray/main/hacks/kftui_installer.ps1&apos;))
										</div>
									</CodeBlock>
								</div>
								<div>
									<h5 className="mb-3 text-center text-sm font-medium text-fd-muted-foreground">
										Direct Download
									</h5>
									<div className="flex flex-col items-center space-y-4">
										<DownloadButton app="kftui" os="windows" arch="amd64" version={latestVersion} />
										<DownloadButton app="kftui" os="windows" arch="386" version={latestVersion} />
									</div>
								</div>
							</div>
						</OsSection>

						<OsSection icon={null} title="Post-Installation">
							<p className="mb-3 text-fd-muted-foreground">
								After installation, restart your terminal and verify:
							</p>
							<CodeBlock>
								<div>kftui</div>
							</CodeBlock>
						</OsSection>
					</div>
				)}
			</div>

			<div className="rounded-lg border border-fd-border bg-fd-card p-8 text-center">
				<h3 className="mb-4 flex items-center justify-center gap-2 text-xl font-bold text-fd-foreground">
					<Github className="h-5 w-5" />
					All Releases
				</h3>
				<p className="mx-auto mb-6 max-w-xl text-fd-muted-foreground">
					View all releases, release notes, and additional download options on the GitHub releases
					page.
				</p>
				<a
					href="https://github.com/hcavarsan/kftray/releases"
					target="_blank"
					rel="noopener noreferrer"
					className="cursor-pointer inline-flex items-center gap-2 rounded-md bg-dark-surface px-5 py-2 font-medium text-text-primary transition-colors hover:bg-dark-control"
				>
					<ExternalLink className="h-4 w-4" />
					Visit GitHub Releases
				</a>
			</div>
		</div>
	)
}
