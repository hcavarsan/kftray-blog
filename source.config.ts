import { defineCollections, defineConfig, defineDocs } from 'fumadocs-mdx/config'
import rehypeMermaid from 'rehype-mermaid'
import { z } from 'zod'
import { rehypeMermaidWrapper } from './lib/rehype-mermaid-wrapper'

export const docs = defineDocs({
	dir: 'content/docs',
})

export const blog = defineCollections({
	type: 'doc',
	dir: 'content/blog',
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		image: z.string().optional(),
		date: z.string().date().or(z.date()),
		author: z.string(),
		position: z.string().optional(),
		avatar: z.string().optional(),
		avatarLink: z.string().optional(),
		published: z.boolean().default(true),
	}),
})

export default defineConfig({
	mdxOptions: {
		rehypePlugins: (v) => [
			[
				rehypeMermaid,
				{
					strategy: 'inline-svg',
					mermaidConfig: {
						theme: 'base',
						themeVariables: {
							background: '#1a1a1a',
							primaryColor: '#2a2a2d',
							primaryTextColor: '#c0c0c0',
							primaryBorderColor: '#333333',
							secondaryColor: '#222225',
							secondaryTextColor: '#c0c0c0',
							secondaryBorderColor: '#333333',
							tertiaryColor: '#1a1a1a',
							tertiaryTextColor: '#888888',
							tertiaryBorderColor: '#2a2a2d',
							lineColor: '#555555',
							textColor: '#c0c0c0',
							mainBkg: '#2a2a2d',
							nodeBorder: '#333333',
							clusterBkg: '#222225',
							clusterBorder: '#333333',
							titleColor: '#c0c0c0',
							edgeLabelBackground: '#1a1a1a',
							nodeTextColor: '#c0c0c0',
							sectionBkgColor: '#222225',
							altSectionBkgColor: '#1a1a1a',
							gridColor: '#2a2a2d',
							taskBorderColor: '#333333',
							taskBkgColor: '#2a2a2d',
							activeTaskBorderColor: '#555555',
							activeTaskBkgColor: '#333333',
							doneTaskBkgColor: '#222225',
							doneTaskBorderColor: '#333333',
							taskTextColor: '#c0c0c0',
							sectionBkgColor2: '#1a1a1a',
							fontFamily: 'ui-sans-serif, system-ui, sans-serif',
							fontSize: '16px',
						},
						flowchart: { useMaxWidth: true, curve: 'basis', padding: 20 },
						gantt: {
							useMaxWidth: true,
							barHeight: 32,
							fontSize: 14,
							barGap: 6,
							topPadding: 40,
							sectionFontSize: 14,
						},
						block: { useMaxWidth: true, padding: 16 },
						sequence: {
							useMaxWidth: true,
							mirrorActors: false,
							messageFontSize: 15,
							actorFontSize: 15,
							noteFontSize: 14,
						},
					},
				},
			],
			rehypeMermaidWrapper,
			...v,
		],
	},
})
