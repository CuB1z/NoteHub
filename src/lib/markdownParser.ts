import matter from "gray-matter";
import { marked, Token, Tokens } from "marked"
import markedKatex from "marked-katex-extension";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { MarkdownHeading } from "@/types/MarkdownHeading";

interface MarkdownLink {
    href: string;
    text: string;
}

interface ParsedData {
    frontmatter: Record<string, any> | null,
    content: string | null,
    headings: MarkdownHeading[]
}

/**
 * Parses a Markdown file and extracts its frontmatter metadata and content.
 * 
 * @param {string} markdownContent - The Markdown content as a string.
 * @param {string} baseUrl - The base URL for the repository.
 * @returns {Object} An object containing the frontmatter and content.
 */
export function parseMarkdown(markdownContent: string | null, baseUrl: string): ParsedData {
    if (!markdownContent) return { frontmatter: null, content: null, headings: [] };

    const { data: frontmatter, content: content } = matter(markdownContent);
    const parsedContent = parseMarkdownContent(content, baseUrl);
    const headings = extractHeadings(content);

    return {
        frontmatter: frontmatter,
        content: parsedContent,
        headings: headings
    };
}

function extractHeadings(markdown: string): MarkdownHeading[] {
    const headings: MarkdownHeading[] = [];

    marked.lexer(markdown).forEach((token: Token) => {
        if (token.type === "heading") {
            const heading = token as Tokens.Heading;
            headings.push({
                id: normalizeHeadingId(heading.text),
                text: heading.text,
                depth: heading.depth,
            });
        }
    });

    return headings;
}

function createCustomRenderer(baseUrl: string) {
    const renderer = new marked.Renderer();

    renderer.link = ({ href, text }: MarkdownLink) => {
        console.log("Link:", href, text);
        if (text.startsWith("![") && text.includes("](")) {
            const imageMarkdown = text.match(/!\[(.*?)\]\((.*?)\)/);
            if (imageMarkdown) {
                const altText = imageMarkdown[1];
                const imageUrl = imageMarkdown[2];
                return `<a href="${href}" target="_blank" rel="noopener noreferrer"><img src="${imageUrl}" alt="${altText}" /></a>`;
            }
        }

        if (href.startsWith("http")) {
            return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
        } else if (href.startsWith("#")) {
            const newHref = "#" + normalizeHeadingId(href.slice(1));
            return `<a href="${newHref}">${text}</a>`;
        } else {
            return `<a href="/${baseUrl}?path=${encodeURIComponent(href)}">${text}</a>`;
        }
    }

    return renderer;
}

function normalizeHeadingId(text: string): string {
    return text
        .toLocaleLowerCase()
        .replace(/ /g, "-")
        .replace(/%20/g, "-")
        .replace(/[(¿?)]/g, "")
        .replace(/[^\w-]+/g, "");
}

function parseMarkdownContent(markdown: string, baseUrl: string): string {
    const renderer = createCustomRenderer(baseUrl);

    marked.use(markedKatex({ throwOnError: false }));
    marked.use(gfmHeadingId());
    marked.use({ renderer });

    return marked.parse(markdown, {
        async: false,
        breaks: true,
        gfm: true,
    });
}