import type { Root, Text } from 'mdast'
import { visit } from 'unist-util-visit'

export default function remarkCleanChars() {
	return function transformer(tree: Root) {
		visit(tree, 'text', (node: Text) => {
			if (typeof node.value === 'string') {
				node.value = node.value
					.replace(/[\u201C\u201D]/g, '"')
					.replace(/[\u2018\u2019]/g, "'")
					.replace(/\u2026/g, '...')
					.replace(/\u2013/g, '-')
					.replace(/\u2014/g, '--')
					.replace(/201[CD]/g, '"')
			}
		})
	}
}
