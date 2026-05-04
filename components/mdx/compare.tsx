import type { ReactNode } from 'react'

interface CompareProps {
	children: ReactNode
}

interface CompareSideProps {
	title?: string
	children: ReactNode
}

export function Compare({ children }: CompareProps) {
	return <div className="my-8 grid grid-cols-1 gap-3 md:grid-cols-2">{children}</div>
}

export function CompareLeft({ title = 'Before', children }: CompareSideProps) {
	return (
		<div className="overflow-hidden rounded-xl border border-border bg-dark-base">
			<div className="not-prose border-b border-border bg-dark-control/50 px-4 py-2.5">
				<span className="text-xs font-medium text-text-secondary">{title}</span>
			</div>
			<div className="prose prose-fd prose-sm p-4">{children}</div>
		</div>
	)
}

export function CompareRight({ title = 'After', children }: CompareSideProps) {
	return (
		<div className="overflow-hidden rounded-xl border border-border bg-dark-base">
			<div className="not-prose border-b border-border bg-dark-control/50 px-4 py-2.5">
				<span className="text-xs font-medium text-text-secondary">{title}</span>
			</div>
			<div className="prose prose-fd prose-sm p-4">{children}</div>
		</div>
	)
}
