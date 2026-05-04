import type { Root } from 'hast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

export const rehypeMermaidWrapper: Plugin<[], Root> = () => (tree) => {
	visit(tree, 'element', (node, index, parent) => {
		if (
			node.tagName !== 'svg' ||
			!parent ||
			index === undefined ||
			!node.properties?.id?.toString().startsWith('mermaid')
		)
			return

		parent.children[index] = {
			type: 'element',
			tagName: 'div',
			properties: { className: ['mermaid-diagram'] },
			children: [node],
		}
	})
}
