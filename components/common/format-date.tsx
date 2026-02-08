interface FormatDateProps {
	date: Date
}

const formatter = new Intl.DateTimeFormat('en-US', {
	day: 'numeric',
	month: 'short',
	year: 'numeric',
})

export function FormatDate({ date }: FormatDateProps) {
	return (
		<time dateTime={date.toISOString()} title={date.toDateString()}>
			{formatter.format(date)}
		</time>
	)
}
