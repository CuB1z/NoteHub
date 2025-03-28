
const matter = require('gray-matter');

/**
 * Parses a Markdown file and extracts its frontmatter metadata and content.
 * 
 * @param {string} markdownContent - The Markdown content as a string.
 * @returns {Object} An object containing the frontmatter and content.
 */
function parseMarkdown(markdownContent) {
    const parsed = matter(markdownContent);
    return {
        frontmatter: parsed.data,
        content: parsed.content
    };
}

module.exports = {
    parseMarkdown
};