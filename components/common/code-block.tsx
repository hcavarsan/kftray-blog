export function CodeBlock({ children }: { children: React.ReactNode }) {
	return (
		<div className="overflow-x-auto rounded-md bg-dark-base p-3 font-mono text-sm text-text-primary">
			{children}
		</div>
	)
}
