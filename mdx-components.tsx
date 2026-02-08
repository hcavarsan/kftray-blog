import defaultMdxComponents from 'fumadocs-ui/mdx'
import type { MDXComponents } from 'mdx/types'
import { BlogImage } from '@/components/mdx/blog-image'
import { Mermaid } from '@/components/mdx/mermaid'
import { YouTubeEmbed } from '@/components/mdx/youtube-embed'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		BlogImage,
		Mermaid,
		YouTubeEmbed,
		...components,
	}
}
