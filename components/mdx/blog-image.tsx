import Image from 'next/image'

interface BlogImageProps {
	src: string
	alt: string
}

const isGif = (src: string) => src.endsWith('.gif')

export function BlogImage({ src, alt }: BlogImageProps) {
	return (
		<div className="my-6 text-center">
			<Image
				src={src}
				alt={alt}
				width={800}
				height={450}
				className="mx-auto rounded-[10px] border border-border"
				unoptimized={isGif(src)}
			/>
		</div>
	)
}
