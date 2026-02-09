import Image from 'next/image'
import Link from 'next/link'
import { FormatDate } from '@/components/common/format-date'

interface BlogCardProps {
	page: {
		url: string
		data: {
			title: string
			description?: string
			image?: string
			date: string | Date
			author: string
			avatar?: string
		}
	}
}

export function BlogCard({ page }: BlogCardProps) {
	const { url, data } = page

	return (
		<Link
			href={url}
			data-umami-event="blog-post-click"
			data-umami-event-title={data.title}
			className="group flex flex-col overflow-hidden rounded-xl border border-fd-border bg-fd-card transition-colors duration-300 hover:bg-dark-control cursor-pointer"
		>
			<div className="relative aspect-[16/9] overflow-hidden">
				{data.image ? (
					<Image
						src={data.image}
						alt={data.title}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
						className="object-cover"
						loading="lazy"
					/>
				) : (
					<div className="flex h-full items-center justify-center bg-dark-base">
						<span className="text-4xl font-bold text-accent/30">kftray</span>
					</div>
				)}
				<div className="absolute inset-0 bg-dark-base/20" />
			</div>

			<div className="flex flex-1 flex-col p-6">
				<div className="flex-1">
					<h2 className="mb-3 text-xl font-bold tracking-tight text-fd-foreground">{data.title}</h2>
					{data.description && (
						<p className="mb-4 line-clamp-2 text-sm text-fd-muted-foreground">{data.description}</p>
					)}
				</div>

				<div className="flex items-center justify-between border-t border-fd-border pt-4">
					<div className="flex items-center gap-3">
						{data.avatar && (
							<Image
								src={data.avatar}
								alt={data.author}
								width={32}
								height={32}
								className="rounded-full ring-2 ring-fd-background"
								loading="lazy"
							/>
						)}
						<span className="text-sm font-medium text-fd-foreground">{data.author}</span>
					</div>
					<time className="text-sm text-fd-muted-foreground">
						<FormatDate date={new Date(data.date)} />
					</time>
				</div>
			</div>
		</Link>
	)
}
