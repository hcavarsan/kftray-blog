import { Download } from 'lucide-react'

type OsType = 'darwin' | 'linux' | 'windows' | 'unknown'
type ArchType = 'amd64' | 'arm64' | '386'
type AppType = 'kftray' | 'kftui'

interface DownloadButtonProps {
	app: AppType
	os: OsType
	arch: ArchType
	version: string
	highlighted?: boolean
	appImage?: boolean
}

const osDisplayNames: Record<string, string> = {
	darwin: 'macOS',
	linux: 'Linux',
	windows: 'Windows',
	unknown: 'Unknown OS',
}

const archDisplayNames: Record<string, string> = {
	amd64: 'x64',
	arm64: 'ARM64',
	'386': 'x86',
}

function getFileName(
	app: AppType,
	os: OsType,
	arch: ArchType,
	version: string,
	appImage?: boolean,
): string {
	const v = version.replace('v', '')

	if (app === 'kftray') {
		if (os === 'darwin') return `kftray_${v}_universal.dmg`
		if (os === 'linux') {
			const linuxArch = arch === 'amd64' ? 'amd64' : 'aarch64'
			return appImage
				? `kftray_${v}_${linuxArch}.AppImage`
				: `kftray_${v}_${linuxArch}.AppImage.tar.gz`
		}
		if (os === 'windows') {
			const winArch = arch === 'amd64' ? 'x64' : 'arm64'
			return `kftray_${v}_${winArch}-setup.exe`
		}
	}

	if (app === 'kftui') {
		if (os === 'darwin') return 'kftui_macos_universal'
		if (os === 'linux') return `kftui_linux_${arch === 'amd64' ? 'amd64' : 'arm64'}`
		if (os === 'windows') return `kftui_windows_${arch === 'amd64' ? 'x86_64' : 'x86'}.exe`
	}

	return `${app}_${v}_unknown`
}

function getButtonText(
	app: AppType,
	os: OsType,
	arch: ArchType,
	highlighted?: boolean,
	appImage?: boolean,
): string {
	if (highlighted) {
		return `Download ${app} for ${osDisplayNames[os]} (${archDisplayNames[arch] ?? arch})`
	}

	if (app === 'kftray') {
		if (os === 'darwin') return `${app} for macOS (Universal)`
		if (os === 'linux') {
			return appImage
				? `${app} AppImage (${archDisplayNames[arch] ?? arch})`
				: `${app} tarball (${archDisplayNames[arch] ?? arch})`
		}
		if (os === 'windows') return `${app} for Windows (${archDisplayNames[arch] ?? arch})`
	}

	if (app === 'kftui') {
		if (os === 'darwin') return `${app} for macOS (Universal)`
		if (os === 'linux') return `${app} for Linux (${archDisplayNames[arch] ?? arch})`
		if (os === 'windows') return `${app} for Windows (${archDisplayNames[arch] ?? arch})`
	}

	return `${app} for ${osDisplayNames[os]} (${archDisplayNames[arch] ?? arch})`
}

export function DownloadButton({
	app,
	os,
	arch,
	version,
	highlighted,
	appImage,
}: DownloadButtonProps) {
	const fileName = getFileName(app, os, arch, version, appImage)
	const downloadUrl = `https://github.com/hcavarsan/kftray/releases/download/v${version.replace('v', '')}/${fileName}`
	const buttonText = getButtonText(app, os, arch, highlighted, appImage)

	return (
		<div className="mb-2">
			<a
				href={downloadUrl}
				target="_blank"
				rel="noopener noreferrer"
				data-umami-event="download"
				data-umami-event-app={app}
				data-umami-event-os={osDisplayNames[os]}
				data-umami-event-arch={archDisplayNames[arch] ?? arch}
				data-umami-event-version={version}
				className={`cursor-pointer inline-flex h-10 min-w-[220px] items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
					highlighted
						? 'bg-accent text-dark-base hover:bg-accent-hover'
						: 'bg-fd-muted text-fd-foreground hover:bg-fd-accent'
				}`}
			>
				<Download className="h-4 w-4" />
				<span className="truncate">{buttonText}</span>
			</a>
		</div>
	)
}
