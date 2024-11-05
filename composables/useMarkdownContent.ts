export const useMarkdownContent = () => {
	const cleanContent = (content: string) => {
	  if (!content) return content

	  return content
		.replace(/[\u201C\u201D]/g, '"')  // Replace smart quotes
		.replace(/[\u2018\u2019]/g, "'")  // Replace smart single quotes
		.replace(/\u2026/g, '...')        // Replace ellipsis
		.replace(/\u2013/g, '-')          // Replace en-dash
		.replace(/\u2014/g, '--')         // Replace em-dash
		.replace(/201[CD]/g, '"')         // Replace other quote variants
	}

	return {
	  cleanContent
	}
  }
