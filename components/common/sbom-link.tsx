import { ShieldCheck } from 'lucide-react'

export function SbomLink({ compact }: { compact?: boolean }) {
	if (compact) {
		return (
			<a
				href="https://sbom.kftray.app"
				target="_blank"
				rel="noopener noreferrer"
				title="Security SBOM Report"
				data-umami-event="sbom-click"
				className="inline-flex h-8 w-8 items-center justify-center rounded-md text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
			>
				<ShieldCheck className="h-4 w-4" />
			</a>
		)
	}

	return (
		<a
			href="https://sbom.kftray.app"
			target="_blank"
			rel="noopener noreferrer"
			title="Security SBOM Report"
			data-umami-event="sbom-click"
			className="inline-flex items-center gap-1.5 rounded-md border border-fd-border px-2.5 py-1 text-xs font-normal text-fd-muted-foreground transition-colors hover:border-fd-ring hover:text-fd-foreground md:gap-2 md:px-3 md:text-sm"
		>
			<ShieldCheck className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" />
			<span>SBOM</span>
		</a>
	)
}
