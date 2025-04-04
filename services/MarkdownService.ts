import matter from "gray-matter";
import { marked } from "marked"
import markedKatex from "marked-katex-extension";
import { gfmHeadingId } from "marked-gfm-heading-id";

interface MarkdownLink {
    href: string;
    text: string;
}

/**
 * Parses a Markdown file and extracts its frontmatter metadata and content.
 * 
 * @param {string} markdownContent - The Markdown content as a string.
 * @returns {Object} An object containing the frontmatter and content.
 */
export function parseMarkdown(markdownContent: string) {
    const { data: frontmatter, content: content} = matter(markdownContent);
    const parsedContent = parseMarkdownContent(content);

    return {
        frontmatter: frontmatter,
        content: parsedContent,
    };
}

function createCustomRenderer() {
    const renderer = new marked.Renderer();

    renderer.link = ({ href, text }: MarkdownLink) => {
        if (href.startsWith("http")) {
            return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
        } else if (href.startsWith("#")) {
            const newHref = href
                .toLocaleLowerCase()
                .replace(/ /g, "-")
                .replace(/%20/g, "-")
                .replace(/[(¿?)]/g, "");

            return `<a href="${newHref}">${text}</a>`;
        } else {
            return `<a href="${href}">${text}</a>`;
        }
    }

    return renderer;
}

function parseMarkdownContent(markdown: string): string {
    const renderer = createCustomRenderer();

    marked.use(markedKatex({ throwOnError: false }));
    marked.use(gfmHeadingId());
    marked.use({ renderer });
    return marked.parse(markdown, {
        async: false,
        breaks: true,
        gfm: true,
    });
}