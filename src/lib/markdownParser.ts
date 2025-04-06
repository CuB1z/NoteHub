import matter from "gray-matter";
import { marked, Token, Tokens } from "marked"
import markedKatex from "marked-katex-extension";
import { gfmHeadingId } from "marked-gfm-heading-id";

interface MarkdownLink {
    href: string;
    text: string;
}

interface ParsedData {
    frontmatter: Record<string, any> | null,
    content: string | null
}

/**
 * Parses a Markdown file and extracts its frontmatter metadata and content.
 * 
 * @param {string} markdownContent - The Markdown content as a string.
 * @returns {Object} An object containing the frontmatter and content.
 */
export function parseMarkdown(markdownContent: string | null): ParsedData {
    if (!markdownContent) return { frontmatter: null, content: null };
    
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

    renderer.paragraph = ({ tokens }: { tokens: any[] }) => {
        const hasInlineImage = tokens.some(token => {
            if (token.type === "image") return true;
            if (token.type === "link" && token.text.startsWith("![")) return true;
            return false;
        });

        if (hasInlineImage) {
            const cleanedTokens = tokens.filter(token => token.type !== "br");
            const images = cleanedTokens.map(token => {
                if (token.type === "link") {
                    return renderer.link({ href: token.href, text: token.text } as Tokens.Link);
                }

                if (token.type === "image") {
                    return `<img src="${token.href}" alt="${token.text}" />`;
                }
            }).join('');

            return `<p class="inline-images">${images}</p>`;
        }

        return `<p>${tokens.map(token => token.text).join(' ')}</p>`;
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