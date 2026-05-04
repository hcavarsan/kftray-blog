import type { ReactNode } from 'react'

interface TimelineProps {
	children: ReactNode
}

interface TimelineItemProps {
	version: string
	title: string
	children: ReactNode
}

export function Timeline({ children }: TimelineProps) {
	return <div className="not-prose my-8 flex flex-col gap-0">{children}</div>
}

export function TimelineItem({ version, title, children }: TimelineItemProps) {
	return (
		<div className="group relative flex gap-4 pb-8 last:pb-0">
			<div className="flex flex-col items-center">
				<div className="z-10 size-3 shrink-0 rounded-full bg-accent" />
				<div className="w-px grow bg-border group-last:hidden" />
			</div>
			<div className="-mt-0.5 flex flex-col gap-1 pb-2">
				<div className="flex items-center gap-2">
					<span className="rounded-md bg-accent-muted px-2 py-0.5 text-xs font-medium text-accent">
						{version}
					</span>
					<span className="font-semibold text-text-primary">{title}</span>
				</div>
				<div className="text-sm leading-relaxed text-text-secondary">{children}</div>
			</div>
		</div>
	)
}
