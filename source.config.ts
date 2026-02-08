import { defineCollections, defineConfig, defineDocs } from 'fumadocs-mdx/config'
import { z } from 'zod'

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

export default defineConfig({})
