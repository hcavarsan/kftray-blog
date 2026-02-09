import * as AccordionComponents from 'fumadocs-ui/components/accordion'
import * as FilesComponents from 'fumadocs-ui/components/files'
import * as StepsComponents from 'fumadocs-ui/components/steps'
import * as TabsComponents from 'fumadocs-ui/components/tabs'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import type { MDXComponents } from 'mdx/types'
import { BlogImage } from '@/components/mdx/blog-image'
import { Mermaid } from '@/components/mdx/mermaid'
import { YouTubeEmbed } from '@/components/mdx/youtube-embed'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		...TabsComponents,
		...StepsComponents,
		...AccordionComponents,
		...FilesComponents,
		BlogImage,
		Mermaid,
		YouTubeEmbed,
		...components,
	}
}
